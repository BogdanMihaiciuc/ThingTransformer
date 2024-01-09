import * as TS from 'typescript';
import type { TWConfigurationTable, TWExtractedPermissionLists, TWInfoTable, TWThingTransformer, TWVisibility, TransformerStore } from './ThingTransformer';
import { UIControllerReference, UIJSXAttribute, UIMashupBinding, UIMashupEventBinding, UIReference, UIReferenceInitializerFunction, UIReferenceKind, UIServiceReference, UIWidgetReference, UIBaseTypes, UIWidget, UIMashupContent, UIMashupDataItem } from './UICoreTypes';
import { ArgumentsOfDecoratorNamed, ConfigurationTablesDefinitionWithClassExpression, ConfigurationWithObjectLiteralExpression, ConstantOrLiteralValueOfExpression, DecoratorNamed, HasDecoratorNamed, JSONWithObjectLiteralExpression, ThrowErrorForNode, XMLRepresentationOfInfotable } from './SharedFunctions';
import { Builder } from 'xml2js';
import { UIBMCollectionViewPlugin, UIBMPresentationControllerPlugin, UINavigationPlugin } from './UIBuiltinPlugins';
import type { UIPlugin } from './UIPlugin';
import * as Crypto from 'crypto';
import * as FS from 'fs';
import * as Path from 'path';

/**
 * Causes typescript to treat the specified argument as if it were
 * of the specified generic type.
 * @param v         The value to cast.
 */
function cast<T>(v: unknown): asserts v is T {}

/**
 * Contains the supported identifiers that can be used in global variable initializers.
 */
const UISupportedGlobalInitializers: string[] = [
    UIReferenceInitializerFunction.Service,
    UIReferenceInitializerFunction.Widget,
    UIReferenceInitializerFunction.DynamicService,
    UIReferenceInitializerFunction.Mashup,
    UIReferenceInitializerFunction.Script
];

export class UITransformer {

    program: TS.Program;

    context: TS.TransformationContext;

    /**
     * A dictionary having filenames as keys and UI transformers as values which makes it possible
     * to reuse the UI transformers in the after phase.
     */
    static UITransformers: Record<string, UITransformer> = {};

    /**
     * Contains plugins to further customize the processing of widget JSX elements.
     */
    static plugins: Record<string, UIPlugin> = {
        Navigation: new UINavigationPlugin('MashupName', 'MashupParameters'),
        Navigationfunction: new UINavigationPlugin('TargetMashup', 'MashupParameters'),
        Mashupcontainer: new UINavigationPlugin('Name', 'MashupParameters'),

        BMCollectionView: new UIBMCollectionViewPlugin,
        BMWindowController: new UIBMPresentationControllerPlugin,
        BMPopoverController: new UIBMPresentationControllerPlugin,
    };

    /**
     * The project root path, to which files are written by default.
     */
    root: string;

    /**
     * Set to `true` if this transformer is applied in the after phase. When set to `true`,
     * this transformer will only extract the transpiled service bodies.
     */
    after: boolean;

    /**
     * Set to `true` if this transformer is used during a watch process. When set to `true`,
     * this transformer will only emit declarations.
     */
    watch: boolean;

    /**
     * An object containing instances of the transformer.
     */
    store!: TransformerStore;

    /**
     * The source file used by this transformer.
     */
    sourceFile?: TS.SourceFile;

    /**
     * If specified, the project to which the mashup will be added.
     */
    projectName?: string;

    /**
     * Always empty as mashups cannot define deployment endpoints.
     */
    deploymentEndpoints = [];

    /**
     * A dictionary of runtime permissions to apply to this entity.
     */
    runtimePermissions: TWExtractedPermissionLists = {};

    /**
     * An array of visibility permissions to apply to this entity.
     */
    visibilityPermissions: TWVisibility[] = [];

    /**
     * An array of discovered configuration table definitions.
     */
    configurationTableDefinitions: TWConfigurationTable[] = [];

    /**
     * A map of discovered configuration table values.
     */
    configuration?: Record<string, TWInfoTable>;

    /**
     * If specified and set to `true`, this entity will be an editable extension object.
     */
    editable?: boolean;

    /**
     * The TSDoc documentation that describes the mashup class.
     */
    description?: string;

    /**
     * Whether the mashup is a mashup or master. A mashup is a master if it contains a
     * `Pagemashupcontainer` widget.
     */
    mashupType = 'mashup';

    /**
     * TODO: Set to `false` if the mashup root widget contains no `Flexcontainer` children.
     */
    isFlex = true;

    /**
     * Always `true`. Non-responsive mashups aren't yet supported.
     */
    isResponsive = true;

    /**
     * Set to `true` if this mashup uses a Core UI typescript class. Mashups that use Core UI
     * are allowed to include arbitrary code outside of the usual required structure that this
     * transformer will not modify.
     */
    isBMCoreUIMashup = false;

    /**
     * A map that contains nodes that must be replaced after the initial pass.
     */
    nodeReplacementMap = new Map<TS.Node, TS.Node | undefined>();

    /**
     * If specified, a class node to add the `@TWWidgetDefinition` decorator to. All other decorators
     * will be removed from this node.
     */
    replacementClass?: TS.ClassDeclaration;

    /**
     * A dictionary that contains the binding source references that have been defined globally
     * in the file processed by this transformer.
     */
    references: Record<string, UIReference> = {};

    /**
     * A mapping between controller property names and their nodes that is used to add necessary
     * decorators when these are used in bindings. Only properties without a `@property` or `@twevent` decorator
     * are included in this dictionary.
     */
    controllerProperties: Record<string, TS.PropertyDeclaration> = {};

    /**
     * A mapping between controller method names and their nodes that is used to add necessary decorators
     * when these are used in bindings.
     */
    controllerMethods: Record<string, TS.MethodDeclaration> = {};

    /**
     * The class node used for the mashup.
     */
    mashupClassNode?: TS.ClassLikeDeclaration;

    /**
     * The name of the mashup.
     */
    entityName!: string;

    /**
     * Contains the property bindings extracted from the mashup.
     */
    propertyBindings: UIMashupBinding[] = [];

    /**
     * Contains the event bindings extracted from the mashup.
     */
    eventBindings: UIMashupEventBinding[] = [];

    /**
     * If specified, the custom CSS code specified in the mashup element.
     */
    customCSS?: string;

    /**
     * The root mashup widget containing all other widgets.
     */
    rootWidget!: UIWidget;

    /**
     * For Core UI mashups, the typescript controller widget.
     */
    controllerWidget?: UIWidget;

    /**
     * The ID of the controller widget.
     */
    private _controllerID?: string;
    
    get controllerID(): string {
        if (this._controllerID) {
            return this._controllerID;
        }

        this._controllerID = Object.keys(this.references).find(ref => this.references[ref].kind == UIReferenceKind.Script) ?? 'controller-' + (Crypto as any).randomUUID();
        return this._controllerID;
    }

    /**
     * An array of mashup parameters defined via the `defineParameters` function.
     */
    mashupParameters?: {
        ParameterName: string,
        BaseType: string,
        Description: string,
        Aspects: {
            bindingDirection: 'BOTH',
            dataShape?: string,
            isMandatory: false
        }
    }[];

    /**
     * An object that contains the widget default properties. This must exist in order to process
     * mashups.
     */
    widgetDefaults!: Record<string, Record<string, unknown>>;

    /**
     * An array of globally defined classes. These are first stored in this array to be processed after all other
     * global symbols have been processed to be able to correctly use any global refs defined after the classes.
     */
    classDeclarations: TS.ClassDeclaration[] = [];

    /**
     * A dictionary that contains the types that were determined while processing the mashup structure.
     * Its keys are widget IDs and its values are dictionary having property names as keys and their base types
     * as values.
     */
    private _typeCache: Record<string, Record<string, {baseType: string, fields?:{name: string, baseType: string, dataShape?: string}[]}>> = {};

    /**
     * The root repository path containing the projects the current file is part of.
     */
    private _repoPath!: string;
    get repoPath(): string {
        return this._repoPath;
    }

    set repoPath(path: string) {
        this._repoPath = path;

        let errors: unknown[] = [];

        // When the repo path is set, load the widget defaults
        // Try to load the widget defaults JSON file, combining the standard widgets definition
        // provided by transformer with any environment specific JSON defined in the repo path
        let transformerDefaults;
        try {
            transformerDefaults = require('../../ui/defaults.json');
        }
        catch (e) {
            // This shouldn't happen normally, but in this case it should be possible for
            // the repo to define its own defaults
            errors.push(e);
        }

        let repoDefaults;
        try {
            const defaultsPath = Path.join(path, 'ui-static/defaults.json');
            const repoDefaultsText = FS.readFileSync(defaultsPath, 'utf-8');
            repoDefaults = JSON.parse(repoDefaultsText);
        }
        catch (e) {
            errors.push(e);
        }

        // If no defaults could be loaded, throw directly as mashups cannot be processed
        if (!transformerDefaults && !repoDefaults) {
            throw new Error(`Unable to load the widget defaults. Make sure the project has a "defaults.json" file in the "ui-static" folder in the root of the project. ${errors.join('. ')}`);
        }

        // Merge the defaults
        this.widgetDefaults = Object.assign({}, transformerDefaults, repoDefaults);

        // Thingworx annoyingly sets the default margin to 5 for all widgets which would be unexpected
        // for the JSX declarations so revert it to 0
        for (const key in this.widgetDefaults) {
            this.widgetDefaults[key].Margin = '0';
        }
    }

    constructor(program: TS.Program, context: TS.TransformationContext, root: string, after: boolean, watch: boolean) {
        this.program = program;
        this.context = context;
        this.root = root;
        this.after = after;
        this.watch = watch;
    }

    /**
     * Throws an error related to the specified node, unless the mashup is a
     * core ui mashup that supports additional instructions.
     * @param node          The node that caused the error.
     * @param error         The error description.
     */
    throwNonCoreUIErrorForNode(node: TS.Node, error: string): void | never {
        if (!this.isBMCoreUIMashup) {
            ThrowErrorForNode(node, error, this.sourceFile);
        }
    }
    
    /**
     * Visits the specified node.
     * @param node      The node to visit.
     * @return          The visited node, or a new node that will replace it. 
     */
    visit(node: TS.Node): TS.Node | undefined {
        if (this.after) {
            if (TS.isSourceFile(node)) {
                const filename = node.fileName;

                // If this is a transformer used for emitting, don't visit child nodes
                if (!this.rootWidget) {
                    node = TS.visitEachChild(node, (node) => this.visit(node), this.context) as TS.SourceFile;
                    cast<TS.SourceFile>(node);
                }
    
                // If a previous transformer instance was used to process this file, reuse it for emitting
                const transformer = UITransformer.UITransformers[filename];
                if (transformer && transformer != this) {
                    transformer.after = true;
                    return transformer.visit(node);
                }
    
                if (this.isBMCoreUIMashup && this.controllerWidget) {
                    // There is no processing to be done for UI files in the after phase, but for core ui mashups, the 
                    // compiled code must be saved to the typescript class widget
                    const compiledCode = TS.createPrinter().printNode(TS.EmitHint.Unspecified, node, node);
                    this.controllerWidget.Properties.TranspiledCode = compiledCode;
                }  
            }
            else if (TS.isExportAssignment(node) || TS.isExportDeclaration(node) || TS.isExportSpecifier(node)) {
                // Typescript will see the file as a module and introduce an empty export even if nothing is exported
                // which causes a runtime error when parsing the code
                return undefined;
            }

            return node;
        }

        if (TS.isSourceFile(node)) {
            this.sourceFile = node;

            UITransformer.UITransformers[node.fileName] = this;

            // Run an initial pass of all global statements
            for (const statement of node.statements) {
                this.visitRootNode(statement);
            }

            // Then process any classes
            for (const classDeclaration of this.classDeclarations) {
                this.visitClassDeclaration(classDeclaration);
            }

            const result = TS.visitEachChild(node, (node) => this.visit(node), this.context);

            // If this is a Core UI mashup, store the updated code in the controller widget
            if (this.isBMCoreUIMashup && this.controllerWidget) {
                const updatedCode = TS.createPrinter().printNode(TS.EmitHint.Unspecified, result, result as TS.SourceFile);
                this.controllerWidget.Properties.Code = updatedCode;
            }

            // After fully processing the file, apply any compatible plugins
            if (this.rootWidget) {
                this.applyPostTransformPlugins(this.rootWidget);
            }

            return result;
        }

        const result = TS.visitEachChild(node, node => this.visit(node), this.context);

        // If this node was marked for deletion or replacement, return the replacement
        if (this.nodeReplacementMap.has(node)) {
            return this.nodeReplacementMap.get(node);
        }

        // If this is the class replacement node, set the relevant decorators
        // Unlike other replacement nodes, this will have its child nodes modified as well
        // so it cannot be done through the regular replacement map
        if (node == this.replacementClass) {
            cast<TS.ClassDeclaration>(result);
            return TS.factory.createClassDeclaration(
                [TS.factory.createDecorator(TS.factory.createIdentifier('TWWidgetDefinition'))],
                result.modifiers,
                result.name,
                result.typeParameters,
                result.heritageClauses,
                result.members,
            );
        }

        return result;
    }

    /**
     * Visits a node whose parent is the source file.
     * @param node      The node to visit.
     */
    visitRootNode(node: TS.Node) {
        switch (node.kind) {
            case TS.SyntaxKind.ImportDeclaration: {
                // An import from typescriptwebpacksupport marks this as a core ui mashup
                cast<TS.ImportDeclaration>(node);

                try {
                    // Module specifiers are normally always string literals and dynamic imports won't be visited
                    // by this method
                    if ((node.moduleSpecifier as TS.StringLiteral).text == 'bm-thing-transformer/ui/core-ui') {
                        this.isBMCoreUIMashup = true;
                    }
                }
                catch (e) {
                    ThrowErrorForNode(node, `Unexpected import statement from an unknown module.`, this.sourceFile);
                }

                // Imports for side-effects are not supported by browsers and will be removed
                if (!node.importClause) {
                    this.nodeReplacementMap.set(node, undefined);
                }

                // All other imports should be typed
                // TODO: Should the compiler enforce this?

                break;
            }
            case TS.SyntaxKind.VariableStatement: {
                cast<TS.VariableStatement>(node);
                const isConstant = !!(node.declarationList.flags & TS.NodeFlags.Const);
                let isReferenceDeclaration = true;

                for (const declaration of node.declarationList.declarations) {
                    // Variable declarations must be constants which define services or widgets, except in core ui mode
                    isReferenceDeclaration &&= this.visitReferenceDeclaration(declaration, isConstant);
                }

                // If the declaration list contains only references, remove it entirely
                if (isReferenceDeclaration) {
                    this.nodeReplacementMap.set(node, undefined);
                }
                break;
            }
            case TS.SyntaxKind.ClassDeclaration: {
                // Defer visiting classes until after all other root nodes have been visited
                this.classDeclarations.push(node as TS.ClassDeclaration);
                break;
            }
        }
    }

    /**
     * Visits a globally declared variable declaration node and determines whether it is a
     * reference delcaration. If it is, extracts the reference information from it, otherwise
     * throws an error if not in core ui mode.
     * @param node          The variable declaration node.
     * @param isConstant    If the parent variable statement is a constant.
     * @returns             `true` if the node is reference declaration, `false` otherwise in core ui mode.
     */
    visitReferenceDeclaration(node: TS.VariableDeclaration, isConstant: boolean): boolean {
        // The name must be an identifier and acts as the ID for the widget or service
        if (node.name.kind != TS.SyntaxKind.Identifier) {
            return this.throwNonCoreUIErrorForNode(node, 'Global variables must be constants initialized to widget or service references.'), false;
        }

        // The node must be declared as a constant
        if (!node.modifiers?.find(m => m.kind == TS.SyntaxKind.ConstKeyword) && !isConstant) {
            return this.throwNonCoreUIErrorForNode(node, 'Reference declarations must be constants.'), false;
        }

        // The node must have a call expression initializer that determines the kind of reference
        if (!node.initializer || !TS.isCallExpression(node.initializer)) {
            return this.throwNonCoreUIErrorForNode(node, 'Global variables must be constants initialized to widget or service references.'), false;
        }

        // The call expression must be a supported identifier
        const initializer = node.initializer! as TS.CallExpression;
        if (!TS.isIdentifier(initializer.expression) || !UISupportedGlobalInitializers.includes(initializer.expression.text)) {
            return this.throwNonCoreUIErrorForNode(node, 'Global variables must be initialized with "defineWidget", "defineMashup" or "defineService".'), false;
        }

        // If the variable uses a ref initializer it must be constant even in core ui mode
        if (!isConstant) {
            ThrowErrorForNode(node, 'Reference declarations must be constants.');
        }

        const referenceFunction = initializer.expression.text as UIReferenceInitializerFunction;

        // The call expression must take a single argument
        // TODO: This might in the future support a second argument for developers to specify
        // an export id that is different from the variable name
        if (initializer.arguments.length != 1) {
            ThrowErrorForNode(node, 'The reference initializer must take a single argument.', this.sourceFile);
        }

        const ID = node.name.text;

        const argument = initializer.arguments[0];

        switch (referenceFunction) {
            case UIReferenceInitializerFunction.Service:
            case UIReferenceInitializerFunction.DynamicService: {
                // Services take a property access expression which contains the collection, entity and service name
                if (!TS.isPropertyAccessExpression(argument)) {
                    ThrowErrorForNode(node, 'The service reference initializer must take a complete path to a service in the form of Collection.Entity.service');
                }

                const serviceName = argument.name.text;

                const entityAccess = argument.expression;
                // The entity access expression itself must be either a property access expression or a call expression for dynamic entities
                if (TS.isPropertyAccessExpression(entityAccess)) {
                    const entityName = entityAccess.name.text;

                    if (!TS.isIdentifier(entityAccess.expression)) {
                        ThrowErrorForNode(node, 'The service reference initializer must take a complete path to a service in the form of Collection.Entity.service');
                    }

                    const collection = entityAccess.expression.text;

                    this.references[ID] = {
                        kind: UIReferenceKind.Service,
                        collection,
                        entityName,
                        ID,
                        serviceName,
                        staticParameters: {},
                        entityID: `Data-${collection}-${entityName}`
                    } as UIServiceReference;
                    this.nodeReplacementMap.set(node, undefined);
                }
                else if (TS.isCallExpression(entityAccess)) {
                    // The only supported call is to "dynamicEntity"
                    const fn = entityAccess.expression;
                    if (!TS.isIdentifier(fn) || fn.text != 'dynamicEntity') {
                        ThrowErrorForNode(node, 'Dynamic entities can only be obtained by calling "dynamicEntity".');
                    }

                    const argument = entityAccess.arguments[0];
                    if (entityAccess.arguments.length != 1 || !TS.isPropertyAccessExpression(argument)) {
                        ThrowErrorForNode(node, 'The "dynamicEntity" function can only take a thing shape or thing template argument, accessed through its collection.');
                    }

                    if (!TS.isIdentifier(argument.expression)) {
                        ThrowErrorForNode(node, 'The "dynamicEntity" function can only take a thing shape or thing template argument, accessed through its collection.');
                    }

                    // This is only supported for dynamic services
                    if (referenceFunction != UIReferenceInitializerFunction.DynamicService) {
                        ThrowErrorForNode(node, 'Dynamic entities can only be used with dynamic services.');
                    }

                    const entityName = argument.name.text;
                    const collection = 'Dynamic' + argument.expression.text;

                    // Store the reference and mark this node for deletion
                    this.references[ID] = {
                        kind: UIReferenceKind.Service,
                        collection,
                        entityName,
                        ID,
                        serviceName,
                        isDynamic: true,
                        staticParameters: {},
                        entityID: `Data-${collection}-${entityName}`
                    } as UIServiceReference;

                    this.nodeReplacementMap.set(node, undefined);
                }
                else {
                    // All other cases are an error
                    ThrowErrorForNode(node, 'The service reference initializer must take a complete path to a service in the form of Collection.Entity.service');
                }

                return true;
            }
            case UIReferenceInitializerFunction.Widget: {
                // Widgets take a single identifier argument that represents the widget type
                if (!TS.isIdentifier(argument) && !(TS.isCallExpression(argument) && !argument.arguments?.length && TS.isIdentifier(argument.expression))) {
                    ThrowErrorForNode(node, 'The widget reference initializer must take a single widget class argument.')
                }
                const className = 'arguments' in argument ? (argument.expression as TS.Identifier).text : argument.text;

                // Store the reference and mark this node for deletion
                this.references[ID] = {kind: UIReferenceKind.Widget, ID, className} as UIWidgetReference;

                this.nodeReplacementMap.set(node, undefined);
                return true;
            }
            case UIReferenceInitializerFunction.Mashup: {
                // Mashup parameters take a single anonymous class expression argument that contains the parameters and their types
                if (!TS.isClassExpression(argument)) {
                    ThrowErrorForNode(argument, `The mashup parameters initializer must take a class expression as its argument.`);
                }

                this.visitMashupParametersDeclaration(argument);

                // Store the reference and mark this node for deletion
                this.references[ID] = {kind: UIReferenceKind.Widget, ID, className: 'Mashup'} as UIWidgetReference;
                this.nodeReplacementMap.set(node, undefined);
                return true;
            }
            case UIReferenceInitializerFunction.Script: {
                // Controllers take a single identifier argument that represents the widget type
                if (!TS.isIdentifier(argument)) {
                    ThrowErrorForNode(node, 'The widget reference initializer must take a single widget class argument.')
                }
                const className = argument.text;

                // Store the reference and mark this node for deletion
                this.references[ID] = {kind: UIReferenceKind.Script, ID, className} as UIControllerReference;
                this.nodeReplacementMap.set(node, undefined);
                return true;
            }
        }

        return false;
    }

    /**
     * Visits a class expression that represents a mashup parameter declaration.
     * @param node      The node to visit.
     */
    visitMashupParametersDeclaration(node: TS.ClassExpression) {
        if (node.name) {
            ThrowErrorForNode(node, `The argument for the "defineMashup" function must be an anonymous class.`);
        }
        if (node.heritageClauses) {
            ThrowErrorForNode(node, `The argument for the "defineMashup" function must be a root class.`);
        }

        for (const member of node.members) {
            if (member.kind == TS.SyntaxKind.MethodDeclaration) {
                ThrowErrorForNode(node, `The "defineMashup" class cannot contain methods.`);
            }

            if (!member.name || !TS.isIdentifier(member.name)) {
                ThrowErrorForNode(member, `Mashup parameter names cannot be computed.`);
            }

            const property = member as TS.PropertyDeclaration;

            const type = property.type as TS.TypeReferenceNode;
            if (!type) {
                ThrowErrorForNode(member, `Mashup parameters must be typed.`);
            }

            if (!TS.isTypeReferenceNode(type)) {
                ThrowErrorForNode(member, `Mashup parameters must be typed using thingworx UI base types.`);
            }

            const typeName = type.typeName.getText();
            const baseType = UIBaseTypes[typeName];

            if (!baseType) {
                ThrowErrorForNode(member, `The type "${typeName}" is not a thingworx UI base type.`);
            }
            
            // The generic argument, if specified, is only used for infotables, where it's not optional
            let dataShape;
            if (baseType == 'INFOTABLE') {
                const typeArgument = type.typeArguments?.[0];
                if (!typeArgument) {
                    ThrowErrorForNode(member, `Infotable mashup parameters must specify a data shape.`);
                }

                dataShape = typeArgument.getText();
            }

            // Store the mashup parameter
            this.mashupParameters ??= [];
            this.mashupParameters.push({
                ParameterName: member.name.text,
                BaseType: baseType,
                Description: '',
                Aspects: {
                    dataShape,
                    bindingDirection: 'BOTH',
                    isMandatory: false
                }
            });
        }
    }

    /**
     * Visits the specified class like declaration that is expected to represent the main mashup declaration.
     * Tests if the class represents the main mashup class, and if it isn't, returns a string that describes
     * why it failed the validation.
     * @param node      The class node.
     * @returns         An error that describes why the class isn't the main mashup class, `undefined` otherwise.
     */
    visitClassDeclaration(node: TS.ClassLikeDeclaration): string | undefined {
        // To be the mashup class this must extend from MashupBase or, in core ui mode, MashupController
        const extendsClause = node.heritageClauses?.[0]?.types?.[0];
        if (!extendsClause || !TS.isIdentifier(extendsClause.expression)) {
            return `The mashup class must extend from "MashupBase"${this.isBMCoreUIMashup ? ' or "MashupController"' : ''}.`;
        }

        const baseClass = extendsClause.expression.text;
        if (!(baseClass == 'MashupBase' || (baseClass == 'MashupController' && this.isBMCoreUIMashup))) {
            return `The mashup class must extend from "MashupBase"${this.isBMCoreUIMashup ? ' or "MashupController"' : ''}.`;
        }

        // If the mashup extends from 'MashupController', this must be converted into 'TypescriptWidget' for the runtime
        if (baseClass == 'MashupController') {
            this.nodeReplacementMap.set(extendsClause, TS.factory.createExpressionWithTypeArguments(
                TS.factory.createIdentifier('TypescriptWidget'),
                undefined
            ));

            this.replacementClass = node as TS.ClassDeclaration;
        }

        // Past this point, any error should cause compilation to fail, even in core ui mode

        // Only a single mashup class may be specified
        this.mashupClassNode = node;
        if (!node.name?.text) {
            ThrowErrorForNode(node, `The mashup class must be named.`);
        }
        this.entityName = node.name.text;

        // After the entity name is determined, save this transformer in the store
        if (this.store[this.entityName]) {
            ThrowErrorForNode(node, `An entity named "${this.entityName}" has already been defined in the project.`);
        }
        this.store[this.entityName] = this as unknown as TWThingTransformer;

        // In watch mode, no further processing is required
        if (this.watch) {
            return;
        }

        let hasRenderMashup = false;
        for (const member of node.members) {
            switch (member.kind) {
                case TS.SyntaxKind.MethodDeclaration: {
                    cast<TS.MethodDeclaration>(member);
                    if (!TS.isIdentifier(member.name) || member.name.text != 'renderMashup') {
                        // The only supported method outside of core ui mode is renderMashup
                        if (!this.isBMCoreUIMashup) {
                            ThrowErrorForNode(member, 'Mashup classes may only contain a single "renderMashup" method.');
                        }

                        // In core ui mode, other methods aren't processed at all
                        if (TS.isIdentifier(member.name)) {
                            this.controllerMethods[member.name.text] = member;
                        }
                    }
                    else {
                        // This method, if specified, may only contain a single return statement and nothing else
                        if (!member.body) {
                            ThrowErrorForNode(member, 'The "renderMashup" method must contain a return statement.');
                        }

                        if (member.body.statements.length != 1 || !TS.isReturnStatement(member.body.statements[0])) {
                            ThrowErrorForNode(member, 'The "renderMashup" method may only contain a return statement.');
                        }

                        const returnStatement = member.body.statements[0] as TS.ReturnStatement;
                        if (!returnStatement.expression) {
                            ThrowErrorForNode(returnStatement, 'The "renderMashup" must return the mashup widget hierarchy.');
                        }

                        if (TS.isJsxElement(returnStatement.expression)) {
                            const rootWidget = this.visitMashupHierarchy(returnStatement.expression);
                            if (!rootWidget) {
                                ThrowErrorForNode(returnStatement.expression, `The returned value is not a root widget.`);
                            }

                            this.rootWidget = rootWidget;
                        }

                        hasRenderMashup = true;

                        // Mark this method for removal, it can't be emitted in core ui mode
                        this.nodeReplacementMap.set(member, undefined);
                    }
                    break;
                }
                case TS.SyntaxKind.GetAccessor:
                case TS.SyntaxKind.SetAccessor:
                case TS.SyntaxKind.PropertyDeclaration: {
                    // Properties require core ui
                    if (!this.isBMCoreUIMashup) {
                        ThrowErrorForNode(member, 'Mashup classes may only contain a single "renderMashup" method.');
                    }

                    // If this property already has a property declaration, compile-time specific arguments
                    // must be removed
                    if (HasDecoratorNamed('property', member) || HasDecoratorNamed('twevent', member)) {
                        const propertyDecorator = DecoratorNamed('property', member);
                        if (propertyDecorator && TS.isCallExpression(propertyDecorator.expression)) {
                            // Find the bind argument, if it is used
                            const bindArgument = propertyDecorator.expression.arguments.find(arg => {
                                if (TS.isCallExpression(arg) && arg.expression.getText() == 'bind') {
                                    return arg;
                                }
                            }) as TS.CallExpression;

                            if (!bindArgument) break;

                            // If the bind argument is specified, it needs to follow a specific syntax
                            if (bindArgument.arguments.length != 1) {
                                ThrowErrorForNode(member, `The "bind" property aspect must take a single argument that represents the binding source.`);
                            }

                            // If the bind aspect is specified, it must be applied to a statically named property
                            if (!member.name || !TS.isIdentifier(member.name)) {
                                ThrowErrorForNode(member, `A binding source cannot be applied to a property with a dynamic name.`);
                            }

                            // Extract the binding and store it
                            const binding = this.bindingSourceDetailsForExpression(bindArgument.arguments[0], member.name.text, member);
                            const sourceRef = binding.ref;
                            if (!sourceRef) {
                                ThrowErrorForNode(member, `Unknown binding source specified for controller property.`);
                            }

                            // Determine the source area based on the controller kind
                            const sourceArea = sourceRef.kind == UIReferenceKind.Service ? 'Data' : (sourceRef.className == 'Mashup' ? 'Mashup' : 'UI');

                            this.propertyBindings.push({
                                Id: (Crypto as any).randomUUID(),
                                SourceArea: sourceArea,
                                SourceDetails: binding.sourceSection ?? '',
                                SourceId: sourceRef.ID,
                                SourceSection: sourceRef.kind == UIReferenceKind.Service ? sourceRef.entityID : '',
                                TargetArea: 'UI',
                                TargetId: this.controllerID,
                                TargetSection: '',
                                PropertyMaps: [{
                                    SourceProperty: binding.sourcePropertyName ?? '',
                                    SourcePropertyBaseType: this.baseTypeOfNode(bindArgument.arguments[0]),
                                    SourcePropertyType: binding.sourcePropertyType as 'property' ?? 'property',
                                    SubProperty: binding.subProperty,
                                    TargetProperty: member.name.text,
                                    TargetPropertyBaseType: this.baseTypeOfNode(member),
                                    TargetPropertyType: 'property'
                                }]
                            });

                            // If a bind argument was found, it must be removed; additionally, if no arguments remain, convert to an identifier
                            const remainingArgs = propertyDecorator.expression.arguments.filter(a => a != bindArgument);
                            if (remainingArgs.length) {
                                this.nodeReplacementMap.set(propertyDecorator.expression, TS.factory.createCallExpression(
                                    propertyDecorator.expression.expression,
                                    propertyDecorator.expression.typeArguments,
                                    remainingArgs
                                ));
                            }
                            else {
                                this.nodeReplacementMap.set(propertyDecorator.expression, TS.factory.createIdentifier('property'));
                            }
                        }

                        const eventDecorator = DecoratorNamed('twevent', member);
                        if (eventDecorator && TS.isCallExpression(eventDecorator.expression)) {
                            const args = eventDecorator.expression.arguments;
                            if (args.length != 1) {
                                ThrowErrorForNode(member, `The "@twevent" decorator must take an array of service target as its argument.`);
                            }

                            const arg = args[0];
                            if (!TS.isArrayLiteralExpression(arg)) {
                                ThrowErrorForNode(member, `The "@twevent" decorator must take an array of service target as its argument.`);
                            }

                            // If the twevent decorator is specified, it must be applied to a statically named property
                            if (!member.name || !TS.isIdentifier(member.name)) {
                                ThrowErrorForNode(member, `A binding target cannot be applied to a property with a dynamic name.`);
                            }

                            // A twevent property must be typed to TWEvent and must not be an accessor
                            if (!TS.isPropertyDeclaration(member)) {
                                ThrowErrorForNode(member, `Events cannot be accessors.`);
                            }

                            if (!member.type || !TS.isTypeReferenceNode(member.type) || member.type.typeName.getText() != 'TWEvent') {
                                ThrowErrorForNode(member, `Events must use the "TWEvent" type.`)
                            }

                            // Extract the bindings and store them
                            const targets = this.bindingSourceDetailsForExpression(arg, member.name.text, member);
                            if (!targets.targets) {
                                ThrowErrorForNode(member, `The "@twevent" decorator must take an array of service target as its argument.`);
                            }

                            for (const target of targets.targets) {
                                const ref = this.references[target.ID];
                                if (!ref) {
                                    ThrowErrorForNode(member, `"${target.ID}" is not a known binding target.`);
                                }

                                if (ref.kind != UIReferenceKind.Service && !target.service) {
                                    ThrowErrorForNode(member,  `"Binding target ${ref.ID}" must specify a service name.`);
                                }
                                const targetArea = ref.kind == UIReferenceKind.Service ? 'Data' : (ref.className == 'Mashup' ? 'Mashup' : 'UI');

                                this.eventBindings.push({
                                    EventTriggerArea: 'UI',
                                    EventTriggerEvent: member.name.text,
                                    EventTriggerId: this.controllerID,
                                    EventTriggerSection: '',
                                    EventHandlerService: ref.kind == UIReferenceKind.Service ? ref.serviceName : target.service!,
                                    EventHandlerArea: targetArea,
                                    EventHandlerId: ref.kind == UIReferenceKind.Service ? ref.entityID : ref.ID,
                                    Id: (Crypto as any).randomUUID(),
                                });
                            }

                            // Replace the decorator with a simple identifier
                            this.nodeReplacementMap.set(eventDecorator, TS.factory.createDecorator(TS.factory.createIdentifier('twevent')));
                        }
                        break;
                    }

                    cast<TS.PropertyDeclaration>(member);

                    // Store this node to add the property decorator to it if it is referenced in any binding
                    if (TS.isIdentifier(member.name)) {
                        this.controllerProperties[member.name.text] = member;
                    }

                    break;
                }
                default: {
                    // All other declarations are errors outside of core ui mode
                    if (!this.isBMCoreUIMashup) {
                        ThrowErrorForNode(member, 'Mashup classes may only contain a single "renderMashup" method.');
                    }
                    break;
                }
            }
        }

        this.editable = HasDecoratorNamed('editable', node);

        if (!this.watch) {
            // Determine if any configuration tables, configurations or permissions are defined on the class and mark them for deletion
            let configurationTablesDecorator = DecoratorNamed('ConfigurationTables', node);
            if (configurationTablesDecorator) {
                const configurationArgument = ArgumentsOfDecoratorNamed('ConfigurationTables', node)!;

                if (configurationArgument.length != 1) {
                    ThrowErrorForNode(node, `The @ConfigurationTables decorator must take a single class parameter.`);
                }

                const argument = configurationArgument[0];
                if (!TS.isClassExpression(argument)) {
                    ThrowErrorForNode(node, `The @ConfigurationTables decorator must take a single class parameter.`);
                }

                this.visitConfigurationTablesDefinition(argument);
                this.nodeReplacementMap.set(configurationTablesDecorator, undefined);
            }

            let configurationDecorator = DecoratorNamed('config', node);
            if (configurationDecorator) {
                const configurationArgument = ArgumentsOfDecoratorNamed('config', node)!;

                if (configurationArgument.length != 1) {
                    ThrowErrorForNode(node, `The @config decorator must take a single object literal parameter.`);
                }

                const argument = configurationArgument[0];
                if (!TS.isObjectLiteralExpression(argument)) {
                    ThrowErrorForNode(node, `The @config decorator must take a single object literal parameter.`);
                }

                this.visitConfiguration(argument);
                this.nodeReplacementMap.set(configurationDecorator, undefined);
            }

            //this.runtimePermissions = this.mergePermissionListsForNode([this.runtimePermissions].concat(this.permissionsOfNode(node)), node);

            //this.visibilityPermissions = this.visibilityPermissionsOfKindForNode('visible', node);
        }

        // Defining a mashup class without the renderMashup method is an error
        if (!hasRenderMashup) {
            ThrowErrorForNode(node, 'The mashup class must define a "renderMashup" method.');
        }
    }


    /**
     * Visits a class expression that represents a configuration table definition.
     * @param node      The node to visit.
     */
    visitConfigurationTablesDefinition(node: TS.ClassExpression) { 
        this.configurationTableDefinitions.push(...ConfigurationTablesDefinitionWithClassExpression(node, ThrowErrorForNode));
    }

    /**
     * Visits an object literal expression that represents a configuration table.
     * @param node      The node to visit.
     */
    visitConfiguration(node: TS.ObjectLiteralExpression) {
        this.configuration = ConfigurationWithObjectLiteralExpression(node, ThrowErrorForNode, this);
    }

    /**
     * Recursively visits the specified JSX element and its child elements to construct the mashup widget, service
     * and binding hierarchy.
     * @param node              The node to visit.
     * @param parentElement     The parent JSXElement.
     * @returns                 A widget definition, when visiting widgets, `undefined` otherwise.
     */
    visitMashupHierarchy(node: TS.JsxElement | TS.JsxSelfClosingElement, parentElement?: TS.JsxElement): UIWidget | undefined {
        switch (node.kind) {
            case TS.SyntaxKind.JsxElement:
            case TS.SyntaxKind.JsxSelfClosingElement:
                break;
            default:
                // Any other element cannot be the return type of the render mashup method
                ThrowErrorForNode(node, `Unsupported mashup element. Mashup elements must be JSX elements.`);
        }

        const tagElement = 'openingElement' in node ? node.openingElement : node;

        // Tag names must be identifiers
        if (!TS.isIdentifier(tagElement.tagName)) {
            ThrowErrorForNode(node, 'Widget element names must be identifiers.');
        }

        const tagName = tagElement.tagName.text;

        // If there is no parent element, the root node must be a mashup
        if (!parentElement && tagName != 'Mashup') {
            ThrowErrorForNode(node, 'The root widget must be "Mashup".');
        }

        // Service elements must be children of the Mashup element
        if (tagName == 'Service') {
            if (!parentElement || (parentElement.openingElement.tagName as TS.Identifier).text != 'Mashup') {
                ThrowErrorForNode(node, '"Service" elements may only be declared as direct children of the "Mashup" element.');
            }

            this.visitServiceElement(node);

            return;
        } 

        const widget = this.visitWidgetElement(node, tagName);

        // Invoke the plugin method if one is registered
        if (UITransformer.plugins[tagName]) {
            UITransformer.plugins[tagName].transformerDidProcessWidget?.(this, tagName, node, widget);
        }

        // Visit all children
        if ('children' in node) {
            for (const child of node.children) {
                switch (child.kind) {
                    case TS.SyntaxKind.JsxExpression: {
                        // Expressions are only permitted as children if empty (comments only)
                        if (!child.expression) {
                            break;
                        }
                        ThrowErrorForNode(child, `Unsupported JSX expression. Mashup elements must be JSX elements.`);
                    }
                    case TS.SyntaxKind.JsxElement:
                    case TS.SyntaxKind.JsxSelfClosingElement: {
                        const subWidget = this.visitMashupHierarchy(child, node);
                        if (subWidget) {
                            widget.Widgets.push(subWidget);
                        }
                        break;
                    }
                    case TS.SyntaxKind.JsxText: {
                        // Text is only supported if it contains only whitespaces
                        const text = child.text.trim();
                        if (text) {
                            ThrowErrorForNode(child, `Unsupported JSX child. Mashup elemnts must be JSX elements.`);
                        }
                        break;
                    }
                    default: {
                        // All other JSX children are invalid for mashups
                        ThrowErrorForNode(child, `Unsupported JSX child. Mashup elemnts must be JSX elements.`);
                    }
                }
            }
        }

        // If this is a core ui mashup, create and add a typescript class widget
        if (tagName == 'Mashup' && this.isBMCoreUIMashup) {
            const controllerID = this.controllerID;

            this.controllerWidget = {
                Properties: {
                    Area: "UI",
                    Id: controllerID,
                    DisplayName: controllerID,
                    Type: "BMTypescriptClassHost",
                    __TypeDisplayName: "Typescript Class",
                    Width: 128,
                    Height: 48,
                    Title: this.entityName,
                    Code: '',
                    TranspiledCode: '',
                    Visible: false,
                    Top: 0,
                    Left: 0,
                    'Z-index': 10
                },
                Widgets: []
            };

            widget.Widgets.push(this.controllerWidget);
        }

        // Invoke the plugin method if one is registered
        if (UITransformer.plugins[tagName]) {
            UITransformer.plugins[tagName].transformerDidProcessWidgetChildren?.(this, tagName, node, widget);
        }

        return widget;

    }

    referenceWithJSXRefAttribute(attribute: TS.JsxAttribute | undefined, kind: UIReferenceKind.Service, element: TS.JsxElement | TS.JsxSelfClosingElement): UIServiceReference;
    referenceWithJSXRefAttribute(attribute: TS.JsxAttribute | undefined, kind: UIReferenceKind.Widget, element: TS.JsxElement | TS.JsxSelfClosingElement): UIWidgetReference;
    referenceWithJSXRefAttribute(attribute: TS.JsxAttribute | undefined, kind: UIReferenceKind.Script, element: TS.JsxElement | TS.JsxSelfClosingElement): UIControllerReference;

    /**
     * Returns the UIReference for the specified attribute.
     * @param attribute         The ref attribute.
     * @param kind              The supported reference kind.
     * @param element           The JSX element to which the attribute belongs.
     */
    referenceWithJSXRefAttribute(attribute: TS.JsxAttribute | undefined, kind: UIReferenceKind, element: TS.JsxElement | TS.JsxSelfClosingElement): UIReference {
        // The attribute must be specified if this method is invoked
        if (!attribute) {
            ThrowErrorForNode(element, 'A "ref" attribute must be specified to bind this service to a reference.');
        }

        // The ref attribute must have an initializer
        if (!attribute.initializer || !TS.isJsxExpression(attribute.initializer) || !attribute.initializer.expression) {
            ThrowErrorForNode(attribute, 'The "ref" attribute must be initialized to a reference.')
        }

        // And the initializer must be an identifier for the globally defined reference
        if (!TS.isIdentifier(attribute.initializer.expression)) {
            ThrowErrorForNode(attribute.initializer, 'The "ref" attribute reference must be an identifier previously defined as a file constant.');
        }

        const ID = attribute.initializer.expression.text;
        const reference = this.references[ID];
        if (!reference) {
            ThrowErrorForNode(attribute.initializer, 'The specified reference was not previously defined.');
        }
        else if (reference.kind != kind) {
            ThrowErrorForNode(attribute.initializer, `Expected a reference of kind "${kind}" but encountered a reference of kind "${reference.kind}".`);
        }

        return reference;
    }

    /**
     * Visits and creates the data item corresponding to the specified service element.
     * @param node      The service JSX element.
     */
    visitServiceElement(node: TS.JsxElement | TS.JsxSelfClosingElement) {
        // Services can't contain children
        if ('children' in node && node.children.length) {
            ThrowErrorForNode(node, '"Service" elements cannot contain any children.');
        }

        const attributeNode = 'openingElement' in node ? node.openingElement : node;

        // All property names must be identifiers
        const attributes = attributeNode.attributes.properties as TS.NodeArray<TS.JsxAttribute>;
        attributes.forEach(a => {
            if (TS.isJsxSpreadAttribute(a)) {
                ThrowErrorForNode(a, 'Spread attributes cannot be specified in mashup elements.');
            }
        });

        // A ref must be specified for services to bind it to a data item
        const refAttribute = attributes.find(p => p.name.text == 'ref');
        const ref = this.referenceWithJSXRefAttribute(refAttribute, UIReferenceKind.Service, node);

        // Create bindings or static values for all specified attributes
        for (const attribute of attributes) {
            let name = attribute.name.text;
    
            // Skip the ref attribute that was previously handled
            if (name == 'ref') {
                continue;
            }

            // If the name is dynamic, only use the property name portion of it
            if (name.startsWith('Dynamic:')) {
                name = name.substring('Dynamic:'.length);
            }

            const value = this.valueOfJSXAttribute(attribute);
            if (`value` in value) {
                // If a static value is specified, store it in the ref directly
                ref.staticParameters[name] = value.value;
            }
            else if ('targets' in value) {
                // If an array of targets is specified, this is an event binding
                this.eventBindings.push(...value.targets!.map(target => {
                    const targetRef = this.references[target.ID];

                    // Determine the target area and service if not directly specified
                    let targetService = target.service;
                    let targetArea;
                    let targetID = targetRef.ID;
                    switch(targetRef.kind) {
                        case UIReferenceKind.Service:
                            targetArea = 'Data';
                            targetService = targetRef.serviceName;
                            targetID = targetRef.entityID;
                            break;
                        case UIReferenceKind.Script:
                        case UIReferenceKind.Widget:
                            if (targetRef.className == 'Mashup') {
                                targetArea = 'Mashup';
                            }
                            else {
                                targetArea = 'UI';
                            }
                            break;
                    }

                    if (!targetService) {
                        ThrowErrorForNode(node, `Cannot determine which service to invoke.`);
                    }

                    return {
                        Id: (Crypto as any).randomUUID(),
                        EventTriggerArea: 'Data',
                        EventTriggerEvent: name,
                        EventTriggerId: ref.ID,
                        EventTriggerSection: ref.entityID,
                        EventHandlerService: targetService,
                        EventHandlerArea: targetArea,
                        EventHandlerId: targetID
                    } as UIMashupEventBinding;
                }));
            }
            else {
                // All other cases are property bindings
                cast<Required<UIJSXAttribute>>(value);
                const sourceRef = value.ref;
                let sourceArea;
                let sourceSection = '';

                // Determine the source area based on the source reference
                switch(sourceRef.kind) {
                    case UIReferenceKind.Service:
                        sourceArea = 'Data';
                        sourceSection = sourceRef.entityID;
                        break;
                    case UIReferenceKind.Script:
                    case UIReferenceKind.Widget:
                        if (sourceRef.className == 'Mashup') {
                            sourceArea = 'Mashup';
                        }
                        else {
                            sourceArea = 'UI';
                        }
                        break;
                }
                
                // Add the property binding
                this.propertyBindings.push({
                    Id: (Crypto as any).randomUUID(),
                    TargetArea: 'Data',
                    TargetId: name == 'EntityName' ? 'EntityName' : ref.ID,
                    TargetSection: ref.entityID,
                    SourceArea: sourceArea,
                    SourceDetails: value.sourceSection ?? '',
                    SourceId: sourceRef.ID,
                    SourceSection: sourceSection,
                    PropertyMaps: [{
                        TargetProperty: name,
                        TargetPropertyType: name == 'EntityName' ? 'Entity' : 'Field',
                        TargetPropertyBaseType: this.baseTypeOfNode(attribute.name),
                        SourceProperty: value.sourcePropertyName,
                        SourcePropertyBaseType: this.baseTypeOfNode((attribute.initializer! as TS.JsxExpression).expression!),
                        SourcePropertyType: value.sourcePropertyType as any ?? 'property',
                        SubProperty: value.subProperty
                    }]
                });

            }
        }
    }

    /**
     * Visits and creates the UI item corresponding to the specified service element.
     * @param node          The service JSX element.
     * @param className     The class name of the widget.
     * @returns             A widget element.
     */
    visitWidgetElement(node: TS.JsxElement | TS.JsxSelfClosingElement, className: string): UIWidget {
        const attributeElement = 'openingElement' in node ? node.openingElement : node;

        // Ensure appropriate defaults exist for the widget. If it cannot be found directly, try to look
        // for a widget name with a lowercase first letter
        let baseDefaults;
        if (this.widgetDefaults[className]) {
            baseDefaults = this.widgetDefaults[className];
        }
        else {
            const lowercaseName = className.charAt(0).toLowerCase() + className.substring(1);
            baseDefaults = this.widgetDefaults[lowercaseName];
        }

        // If the defaults can't be determined, a widget cannot be created
        if (!baseDefaults) {
            ThrowErrorForNode(attributeElement.tagName, `Unable to initialize a widget of type "${className}" because no defaults are defined for it.`);
        }

        const widget: UIWidget = {
            Properties: {},
            Widgets: []
        };

        // All property names must be identifiers
        const attributes = attributeElement.attributes.properties as TS.NodeArray<TS.JsxAttribute>;
        attributes.forEach(a => {
            if (TS.isJsxSpreadAttribute(a)) {
                ThrowErrorForNode(a, 'Spread attributes cannot be specified in mashup elements.');
            }
        });

        // The root widget uses a separate section from all the other widgets
        const targetArea = className == 'Mashup' ? 'Mashup' : 'UI';

        // If the widget is a Pagemashupcontainer, this marks the current mashup as a master
        if (className == 'Pagemashupcontainer') {
            this.mashupType = 'target';
        }

        // A ref may be specified for services to bind it to a data item
        const refAttribute = attributes.find(p => p.name.text == 'ref');
        let ref = refAttribute ? this.referenceWithJSXRefAttribute(refAttribute, UIReferenceKind.Widget, node) : undefined;

        // Widget IDs are required to also be valid DOM ids so they must start with letters, while
        // random UUID can start with digits
        const ID = ref?.ID ?? 'widget-' + (Crypto as any).randomUUID() as string;

        // Also determine the types of the widget properties and store them for plugins for retrieve theme
        this._typeCache[ID] = {};

        // Load all properties
        const properties: Record<string, unknown> = {Id: ID};
        for (const attribute of attributes) {
            let name = attribute.name.text;
            let subName;
    
            // Skip the ref attribute that was previously handled
            if (name == 'ref') {
                continue;
            }

            // The "CustomCSS" property of the mashup class is handled separately
            if (name == 'CustomCSS' && className == 'Mashup') {
                // In this case, the value must be a string literal path to the CSS file
                if (!attribute.initializer || !TS.isStringLiteralLike(attribute.initializer)) {
                    ThrowErrorForNode(attribute, 'The "CustomCSS" attrbiute must be specified as a string literal.');
                }

                // Load the CSS file
                const path = Path.resolve(this.sourceFile!.fileName, '../', attribute.initializer.text);
                try {
                    const CSS = FS.readFileSync(path, 'utf-8');
                    this.customCSS = CSS;
                }
                catch (e) {
                    ThrowErrorForNode(attribute, `Unable to load the specified CSS file. ${e}`);
                }
            }

            if (name.startsWith('Dynamic:')) {
                // If the name is dynamic, only use the property name portion of it
                name = name.substring('Dynamic:'.length);
            }
            else if (name.includes(':')) {
                // If the name is namespaced, this is currently only supported for mashups
                // and the namespace indicates the source property name for infotables
                if (className == 'Mashup') {
                    [name, subName] = name.split(':');
                }

                // Otherwise retain the colon in the property name
            }

            const value = this.valueOfJSXAttribute(attribute);
            if (`value` in value) {
                if (subName) {
                    ThrowErrorForNode(attribute, `Namespaced properties can only be initialized to a binding.`);
                }

                // If a static value is specified, store it in the ref directly
                properties[name] = value.value;
            }
            else if ('targets' in value) {
                // If an array of targets is specified, this is an event binding
                this.eventBindings.push(...value.targets!.map(target => {
                    const targetRef = this.references[target.ID];

                    // Determine the target area and service if not directly specified
                    let targetService = target.service;
                    let serviceArea;
                    let targetID = targetRef.ID;
                    switch(targetRef.kind) {
                        case UIReferenceKind.Service:
                            serviceArea = 'Data';
                            targetService = targetRef.serviceName;
                            targetID = targetRef.entityID;
                            break;
                        case UIReferenceKind.Script:
                        case UIReferenceKind.Widget:
                            if (targetRef.className == 'Mashup') {
                                serviceArea = 'Mashup';
                            }
                            else {
                                serviceArea = 'UI';
                            }
                            break;
                    }

                    if (!targetService) {
                        ThrowErrorForNode(node, `Cannot determine which service to invoke.`);
                    }

                    return {
                        Id: (Crypto as any).randomUUID(),
                        EventTriggerArea: targetArea,
                        EventTriggerEvent: name,
                        EventTriggerId: ID,
                        EventTriggerSection: '',
                        EventHandlerService: targetService,
                        EventHandlerArea: serviceArea,
                        EventHandlerId: targetID
                    } as UIMashupEventBinding;
                }));
            }
            else {
                // All other cases are property bindings
                cast<Required<UIJSXAttribute>>(value);
                const sourceRef = value.ref;
                let sourceArea;
                let sourceSection = '';

                // Determine the source area based on the source reference
                switch(sourceRef.kind) {
                    case UIReferenceKind.Service:
                        sourceArea = 'Data';
                        sourceSection = sourceRef.entityID;
                        break;
                    case UIReferenceKind.Script:
                    case UIReferenceKind.Widget:
                        if (sourceRef.className == 'Mashup') {
                            sourceArea = 'Mashup';
                        }
                        else {
                            sourceArea = 'UI';
                        }
                        break;
                }

                // Add the property binding
                this.propertyBindings.push({
                    Id: (Crypto as any).randomUUID(),
                    TargetArea: targetArea,
                    TargetId: ID,
                    TargetSection: '',
                    SourceArea: sourceArea,
                    SourceDetails: value.sourceSection ?? '',
                    SourceId: sourceRef.ID,
                    SourceSection: sourceSection,
                    PropertyMaps: [{
                        TargetProperty: name,
                        TargetPropertyType: 'Field',
                        // The attribute name base type should be provided by the widget or service class or ref
                        TargetPropertyBaseType: this.baseTypeOfNode(attribute.name),
                        TargetSubProperty: subName,
                        SourceProperty: value.sourcePropertyName,
                        // The expression base type should be provided by the initializer. This must be compatible with the
                        // attribute name type, but is not necessarily the same
                        SourcePropertyBaseType: this.baseTypeOfNode((attribute.initializer! as TS.JsxExpression).expression!),
                        SourcePropertyType: value.sourcePropertyType as any ?? 'property',
                        SubProperty: value.subProperty
                    }]
                });
            }

            // If the intializer is not an event binding, try to determine and cache its type
            if ('targets' in value) {
                continue;
            }

            let type;
            try {
                type = this.baseTypeOfNode(attribute.name);
            }
            catch (e) {
                // If the type cannot be determined, it's not an error, just don't cache it
                continue;
            }

            // Certain types of properties also support "fields" which can later be retrieved by plugins
            if (type == 'INFOTABLE') {
                // Infotables can take a data shape as an argument which contains the fields for this property
                const dataShape = this.dataShapeOfNode(attribute.name);

                if (dataShape) {
                    this._typeCache[ID][name] = {baseType: type, fields: this.fieldsOfDataShapeNamed(dataShape)};
                    continue;
                }

                this._typeCache[ID][name] = {baseType: type};
            }
            else if ((type == 'MASHUPNAME' || type == 'STRING') && typeof value.value == 'string') {
                // Mashup names also contain parameter definitions which represent the fields for this property.
                // Because of how certain widgets are typed, the mashup name property can resolve to a string so
                // try to obtain the parameters for both types
                this._typeCache[ID][name] = {baseType: type, fields: this.parametersOfMashupNamed(value.value)}
            }
            else {
                // All other types have no fields
                this._typeCache[ID][name] = {baseType: type};
            }
        }

        // The mashup widget needs an additional property for the parameter definition
        if (this.mashupParameters && className == 'Mashup') {
            properties._currentParameterDefs = this.mashupParameters;
        }

        // Copy the properties, on top of any defaults
        widget.Properties = Object.assign({}, baseDefaults, properties);
        return widget;
    }

    /**
     * Returns an object that describes the value assigned to the specified JSX attribute.
     * The atribute must not be the ref attribute.
     * @param attribute         The JSX attribute.
     */
    valueOfJSXAttribute(attribute: TS.JsxAttribute): UIJSXAttribute {
        let name = attribute.name.text;

        // The ref attribute should not be handled with this method.
        if (name == 'ref') {
            throw new Error('Unexpected ref attribute.');
        }

        // If the attribute is unchecked, remove the "Dynamic:" prefix
        if (name.startsWith('Dynamic:')) {
            name = name.substring('Dynamic:'.length);
        }

        let staticValue: unknown;

        const initializer = attribute.initializer;

        // JSX handles string literals and boolean true literals with a special syntax
        if (!initializer) {
            staticValue = true;
        }
        else if (TS.isStringLiteral(initializer)) {
            staticValue = initializer.text;
        }
        else {
            const expression = initializer.expression;
            if (!expression) {
                ThrowErrorForNode(attribute, `Unexpected empty initializer for attribute "${name}".`);
            }

            staticValue = ConstantOrLiteralValueOfExpression(expression, this);

            if (!staticValue) {
                if (TS.isObjectLiteralExpression(expression)) {
                    // Another option for the static value is an object literal
                    // In this case, the expression must be provided as a JSON string directly
                    const text = expression.getText();
                    try {
                        staticValue = JSON.parse(text);
                    }
                    catch (e) {
                        staticValue = JSONWithObjectLiteralExpression(expression, ThrowErrorForNode, this);

                        if (!staticValue) {
                            ThrowErrorForNode(attribute, `Object literal initializer must use JSON.`);
                        }
                    }
                }
                else if (TS.isCallExpression(expression)) {
                    // JSON content can also be imported via the "importJSON" function
                    if (TS.isIdentifier(expression.expression) && expression.expression.text == 'importJSON') {
                        const pathArgument = expression.arguments[0];
                        if (!TS.isStringLiteralLike(pathArgument)) {
                            ThrowErrorForNode(initializer, `The path for importJSON must be provided as a string literal.`);
                        }

                        // Load the file and ensure it is a valid JSON
                        const path = Path.resolve(this.sourceFile!.fileName, '../', pathArgument.text);
                        try {
                            const text = FS.readFileSync(path, 'utf-8');

                            try {
                                staticValue = JSON.parse(text);
                            }
                            catch (e) {
                                ThrowErrorForNode(initializer, `The specified file does not contain a JSON object. ${e}`);
                            }
                        }
                        catch (e) {
                            ThrowErrorForNode(initializer, `The specified JSON file could not be loaded. ${e}`);
                        }
                    }
                }
            }
        }

        // If a static value could be obtained, return it directly
        if (staticValue !== undefined) {
            return {name, value: staticValue};
        }

        // Otherwise attempt to determine the binding kind. This branch can only be reached if the initializer
        // is a non-empty expression
        const expression = (initializer as TS.JsxExpression).expression!;

        const bindingSource = this.bindingSourceDetailsForExpression(expression, name, attribute);

        // If the binding source is a controller property, verify if it needs a @property decorator
        if (bindingSource.sourcePropertyName && bindingSource.ref?.kind == UIReferenceKind.Script) {
            const propertyNode = this.controllerProperties[bindingSource.sourcePropertyName];

            if (propertyNode) {
                // Mark the property for replacement, then remove it from the dictionary
                this.nodeReplacementMap.set(propertyNode, TS.factory.createPropertyDeclaration(
                    [...(propertyNode.decorators || []), TS.factory.createDecorator(TS.factory.createIdentifier('property'))],
                    propertyNode.modifiers,
                    propertyNode.name,
                    propertyNode.questionToken ?? propertyNode.exclamationToken,
                    propertyNode.type,
                    propertyNode.initializer
                ));

                delete this.controllerProperties[bindingSource.sourcePropertyName];
            }
        }
        // If the binding targets array includes a controller service, decorate it
        else if (bindingSource.targets) {
            for (const target of bindingSource.targets) {
                const ref = this.references[target.ID];
                const methodNode = this.controllerMethods[target.service || ''];

                if (ref.kind == UIReferenceKind.Script && methodNode) {
                    // Mark the method for replacement, then remove it from the dictionary
                    this.nodeReplacementMap.set(methodNode, TS.factory.createMethodDeclaration(
                        [...(methodNode.decorators || []), TS.factory.createDecorator(TS.factory.createIdentifier('service'))],
                        methodNode.modifiers,
                        methodNode.asteriskToken,
                        methodNode.name,
                        methodNode.questionToken,
                        methodNode.typeParameters,
                        methodNode.parameters,
                        methodNode.type,
                        methodNode.body
                    ));

                    delete this.controllerMethods[target.service!];
                }
            }
        }

        return bindingSource;
    }

    /**
     * Returns an UIJSXAttribute that describes the binding encoded in the specified expression.
     * @param name          The name of tr attribute for which this binding is resolved.
     * @param expression    The expression.
     * @param node          If specified, the parent node which will be used when reporting errors.
     * @returns             An object describing the binding details.
     */
    bindingSourceDetailsForExpression(expression: TS.Expression, name: string, node?: TS.Node): UIJSXAttribute {
        node ??= expression;

        // The binding expression may be:
        // - An array for event bindings
        // - A property access expression for property bindings
        if (TS.isPropertyAccessExpression(expression) || TS.isElementAccessExpression(expression)) {

            // Extract the components to determine which kind of binding it is
            const keyPath = this.keyPathForAccessExpression(expression);
            const ID = keyPath[0];
            const ref = this.references[ID];

            // The form the binding may take depends on the reference type
            switch (ref.kind) {
                case UIReferenceKind.Service: {
                    // Services require at least 2 components, of which the second selects between all data and selected rows
                    if (keyPath.length < 2) {
                        ThrowErrorForNode(node, `Service bindings must specify whether to use selected rows or all data.`);
                    }

                    const section = keyPath[1];
                    switch (section) {
                        case 'AllData':
                            // All data bindings can have at most 3 items
                            if (keyPath.length > 3) {
                                ThrowErrorForNode(node, `AllData service bindings have a maximum depth of 3.`);
                            }
                            return {name, ref, sourcePropertyName: keyPath[2] ?? '', sourceSection: 'AllData', sourcePropertyType: 'InfoTable'};
                        case 'SelectedRows':
                            // For selected rows, the binding can have unlimited depth, but every odd index must be `SelectedRows`
                            if (keyPath.some((v, i) => i % 2 == 1 && v != 'SelectedRows')) {
                                ThrowErrorForNode(node, `Service bindings using access chains for selected rows must use the selected rows of all nested infotables.`);
                            }

                            // Additionally, the source property name uses a special syntax for chained access
                            const sourcePropertyName = keyPath.slice(2).map((v, i) => i % 2 ? `[${v}]` : v).join('');
                            return {name, ref, sourcePropertyName, sourceSection: 'SelectedRows', sourcePropertyType: 'InfoTable'};
                        default:
                            ThrowErrorForNode(node, `Service bindings must specify whether to use selected rows or all data.`);
                    }
                }
                case UIReferenceKind.Script:
                case UIReferenceKind.Widget: {
                    const isMashupSource = ('className' in ref) && ref.className == 'Mashup';

                    if (keyPath.length < 2) {
                        ThrowErrorForNode(node, `Unexpected binding source`);
                    }

                    // Only one level of depth is allowed for widgets, except for mashup infotable properties
                    if (keyPath.length != 2 && !isMashupSource) {
                        ThrowErrorForNode(node, `Unexpected binding access chain from a widget source.`);
                    }

                    let sourcePropertyName = keyPath[1];

                    // Longer key paths require the second argument to be AllData or SelectedRows for mashup sources
                    // This works the same as for services
                    if (isMashupSource && keyPath.length > 2) {
                        const section = keyPath[2];
                        switch (section) {
                            case 'AllData': {
                                // All data bindings can have at most 4 items
                                if (keyPath.length > 4) {
                                    ThrowErrorForNode(node, `AllData mashup bindings have a maximum depth of 4.`);
                                }
                                return {name, ref, sourcePropertyName, sourceSection: 'AllData', subProperty: keyPath[3]};
                            }
                            case 'SelectedRows': {
                                // For selected rows, the binding can have unlimited depth, but every even index except 0 must be `SelectedRows`
                                // For simplicity, reuse the service code, but shift the items by 1
                                const subPropertyPath = keyPath.slice(1);
                                if (subPropertyPath.some((v, i) => i % 2 == 1 && v != 'SelectedRows')) {
                                    ThrowErrorForNode(node, `Mashup bindings using access chains for selected rows must use the selected rows of all nested infotables.`);
                                }
    
                                // Additionally, the source property name uses a special syntax for chained access
                                const subProperty = subPropertyPath.slice(2).map((v, i) => i % 2 ? `[${v}]` : v).join('');
                                return {name, ref, sourcePropertyName, sourceSection: 'SelectedRows', subProperty};
                            }
                        }
                    }

                    return {name, ref, sourcePropertyName};
                }
            }
        }
        else if (TS.isArrayLiteralExpression(expression)) {
            // Array literals can contain either identifiers for services or one level of property access for widgets
            return {
                name,
                targets: expression.elements.map(element => {
                    if (TS.isIdentifier(element)) {
                        // Identifiers must point to services
                        const ID = element.text;
                        if (this.references[ID]?.kind != UIReferenceKind.Service) {
                            ThrowErrorForNode(element, `Expected event target to be a backend or widget service. Unexpected target "${ID}" provided.`);
                        }

                        return {ID};
                    }
                    else if (TS.isPropertyAccessExpression(element)) {
                        // The expression must be an identifier that points to a widget or the mashup controller
                        const source = element.expression;
                        if (!TS.isIdentifier(source)) {
                            ThrowErrorForNode(element, `Unknown event target kind. It must be a backend or widget service.`);
                        }

                        const ID = source.text;
                        const reference = this.references[ID];
                        if (reference?.kind == UIReferenceKind.Script) {
                            // Controllers are only supported in core ui mode
                            if (!this.isBMCoreUIMashup) {
                                ThrowErrorForNode(element, `Controller references require Core UI.`);
                            }
                        }
                        else if (reference?.kind != UIReferenceKind.Widget) {
                            ThrowErrorForNode(element, `Expected the service source to be a widget.`);
                        }

                        return {ID, service: element.name.text};
                    }
                    else {
                        ThrowErrorForNode(element, `Expected event target to be a backend or widget service. Unexpected target provided.`)
                    }
                })
            };
        }
        else {
            // All other cases are errors
            ThrowErrorForNode(node, `Unexpected initializer provided for attribute "${name}".`);
        }
    }

    /**
     * Returns an array of strings that represents the key path described by the specified property or element
     * access expresion node. The order of the elements in the array match the order expressed in the source file.
     * The expression must only contain string literals and identifiers.
     * @param expression            The access expression.
     * @returns                     An array containing the variable and properties being accessed, in order.
     */
    keyPathForAccessExpression(expression: TS.PropertyAccessExpression | TS.ElementAccessExpression): string[] {
        let result: string[];
        if (TS.isIdentifier(expression.expression)) {
            // The root item may only be an identifier
            result = [expression.expression.text];
        }
        else if (TS.isPropertyAccessExpression(expression.expression) || TS.isElementAccessExpression(expression.expression)) {
            result = this.keyPathForAccessExpression(expression.expression);
        }
        else {
            ThrowErrorForNode(expression.expression, `Non-literal expression in property access chain.`);
        }

        if (TS.isElementAccessExpression(expression)) {
            if (!TS.isStringLiteralLike(expression.argumentExpression)) {
                ThrowErrorForNode(expression.argumentExpression, `Non-literal expression in property access chain.`);
            }

            result.push(expression.argumentExpression.text);
        }
        else if (TS.isPropertyAccessExpression(expression)) {
            result.push(expression.name.text);
        }

        return result;
    }

    /**
     * Returns the name of the data shape used by the specified node if it is of type `INFOTABLE`.
     * @param node 
     */
    dataShapeOfNode(node: TS.Node): string | undefined {
        const typeChecker = this.program.getTypeChecker();
        let type = typeChecker.getTypeAtLocation(node);

        // If the type is a union (commonly used for properties that can be both bound and set) determine
        // whichever type contains the infotable type
        if (type.isUnion() || type.isIntersection()) {
            for (const subtype of type.types) {
                const typename = typeChecker.typeToString(subtype);
                if (typename.startsWith('INFOTABLE')) {
                    type = subtype;
                    break;
                }
                if (typename.startsWith('JSONInfoTable')) {
                    type = subtype;
                    break;
                }
                else if (typename.startsWith('BindingTarget<INFOTABLE')) {
                    type = subtype;
                    break;
                }
                else if (typename.startsWith('ToBindingTarget<INFOTABLE')) {
                    type = subtype;
                    break;
                }
            }
        }

        // Convert the type to a string and if it is of any supported infotable type, extract its data shape argument
        const typename = typeChecker.typeToString(type);
        if (typename.startsWith('INFOTABLE<')) {
            return typename.substring('INFOTABLE<'.length, typename.length - 1);
        }
        if (typename.startsWith('JSONInfoTable<')) {
            return typename.substring('JSONInfoTable<'.length, typename.length - 1);
        }
        else if (typename.startsWith('BindingTarget<INFOTABLE<')) {
            return typename.substring('BindingTarget<INFOTABLE<'.length, typename.length - 2);
        }
        else if (typename.startsWith('ToBindingTarget<INFOTABLE<')) {
            return typename.substring('ToBindingTarget<INFOTABLE<'.length, typename.length - 2);
        }

        return;
    }

    /**
     * Returns a string that represents the base type associated with the specified node.
     * @param node          The node whose base type should be retrieved.
     */
    baseTypeOfNode(node: TS.Node): string {
        // If the node is a type assertion, use the asserted type
        if (TS.isAsExpression(node) || TS.isTypeAssertionExpression(node)) {
            let baseType: string;
            const type = node.type;
            if (TS.isTypeReferenceNode(type)) {
                // Exclude any generics from the type, unless it is a binding target
                const typeName = type.typeName.getText();
                if (typeName == 'BindingTarget') {
                    // For binding targets, only consider the type argument, removing any additional
                    // generics as before
                    const innerTypeName = type.typeArguments?.[0];
                    if (!innerTypeName) {
                        ThrowErrorForNode(node, `BindingTarget type assertion must specify the type as a generic argument.`);
                    }

                    if (TS.isTypeReferenceNode(innerTypeName)) {
                        baseType = UIBaseTypes[innerTypeName.typeName.getText()];
                    }
                    else {
                        baseType = UIBaseTypes[innerTypeName.getText()];
                    }
                }
                else {
                    baseType = UIBaseTypes[type.typeName.getText()];
                }
            }
            else {
                // Otherwise return the type directly
                baseType = UIBaseTypes[type.getText()];
            }

            // If the type does not map to a base type, report as an error
            if (!baseType) {
                ThrowErrorForNode(node, `Type "${type.getText()}" is not a thingworx UI base type.`);
            }

            return baseType;
        }

        // If not a type assertion, use the type checker to infer the type
        const typeChecker = this.program.getTypeChecker();
        const inferredType = typeChecker.getTypeAtLocation(node);

        const baseType = this.baseTypeOfType(inferredType);

        if (!baseType) {
            ThrowErrorForNode(node, `Unable to obtain the base type of this expression (resolved to "${typeChecker.typeToString(inferredType)}"). Consider adding an explicit type assertion.`);
        }
        return baseType;
    }

    /**
     * Gets the thingworx UI base type corresponding to the specified type.
     * @param type              The type whose thingworx base type should be inferred.
     * @returns                 A string representing the thingworx base type of the type
     *                          or `undefined` if the type could not be determined or is not assignable
     *                          to a thingworx base type.
     */
    private baseTypeOfType(type: TS.Type): string | undefined {
        const typeChecker = this.program.getTypeChecker();

        // Most UI types are unions between the base type and the associated binding target type
        // and also optional; only one of these types is needed
        if (type.isUnion() || type.isIntersection()) {
            // Remove the optional type at the end if specified; it appears that the union order
            // is reversed from the typing order
            const types = type.types.slice().reverse();
            if ((types[types.length - 1].flags & TS.TypeFlags.Undefined) == TS.TypeFlags.Undefined) {
                types.pop();
            }

            // If the remaining final type is a binding target, remove it as well, unless it's the only
            // remaining type
            // let lastType = types[types.length - 1];
            // if (lastType && typeChecker.typeToString(type).startsWith('BindingTarget')) {
            //     if (types.length > 1) {
            //         types.pop();
            //     }
            // }

            if (types.length == 1) {
                // If only one type remains, this will be the type that represents the base type
                type = types[0];
            }
        }

        let typeName = typeChecker.typeToString(type);

        // If the type is a binding target, only the inner type is needed
        if (typeName.startsWith('BindingTarget<')) {
            typeName = typeName.substring('BindingTarget<'.length, typeName.length - 1);
        }

        // If the type is a thingworx generic type, remove the generics
        if (typeName.startsWith('INFOTABLE<') || typeName.startsWith('JSONInfoTable<')) {
            typeName = 'INFOTABLE';
        }
        else if (typeName.startsWith('THINGNAME<')) {
            typeName = 'THINGNAME';
        }
        else if (typeName.startsWith('STRING<')) {
            typeName = 'STRING';
        }
        else if (typeName.startsWith('NUMBER<')) {
            typeName = 'NUMBER';
        }
        else if (typeName.startsWith('TWJSON<')) {
            typeName = 'TWJSON';
        }
        else if (typeName.startsWith('FIELDNAME<')) {
            typeName = 'FIELDNAME';
        }
        else if (typeName.startsWith('ARRAY<')) {
            typeName = 'ARRAY';
        }

        // Map the inferred type to a thingworx base type
        const baseType = UIBaseTypes[typeName];

        // TODO: This automatic detection for primitive convertibles doesn't seem to work
        if (!baseType) {
            // If the type could not determined, try to map to a primitive type
            const flags = type.flags;

            // Test using the flags whether the type can be represented by a primitive type
            // It looks like related flags such as StringLike, StringLiteral and String do not have common bits
            // so it is necessary to check each separately
            if ((flags & TS.TypeFlags.StringLike) == TS.TypeFlags.StringLike) {
                return 'STRING';
            }
            else if ((flags & TS.TypeFlags.NumberLike) == TS.TypeFlags.NumberLike) {
                return 'NUMBER';
            }
            else if ((flags & TS.TypeFlags.BooleanLike) == TS.TypeFlags.BooleanLike) {
                return 'BOOLEAN';
            }
            else if ((flags & TS.TypeFlags.String) == TS.TypeFlags.String) {
                return 'STRING';
            }
            else if ((flags & TS.TypeFlags.Number) == TS.TypeFlags.Number) {
                return 'NUMBER';
            }
            else if ((flags & TS.TypeFlags.Boolean) == TS.TypeFlags.Boolean) {
                return 'BOOLEAN';
            }
            else if ((flags & TS.TypeFlags.StringLiteral) == TS.TypeFlags.StringLiteral) {
                return 'STRING';
            }
            else if ((flags & TS.TypeFlags.NumberLiteral) == TS.TypeFlags.NumberLiteral) {
                return 'NUMBER';
            }
            else if ((flags & TS.TypeFlags.BooleanLiteral) == TS.TypeFlags.BooleanLiteral) {
                return 'BOOLEAN';
            }
            else if ((flags & TS.TypeFlags.Union) == TS.TypeFlags.Union || type.isUnion()) {
                if (!type.isUnion()) {
                    return;
                }

                // If the type is a type union, a valid type would need the union to all have the same type
                const types = type.types;
                if (!types) return;

                // If the types are of the same kind, AND all the flags together and they
                // should AND with the appropriate TypeLike flag at the end
                let finalFlags = types[0]?.flags || 0;
                for (const type of types) {
                    // Exclude optional flags
                    if (type.flags && TS.TypeFlags.Undefined) continue;
                    if (type.flags && TS.TypeFlags.Null) continue;

                    finalFlags &= type.flags;
                }

                if ((finalFlags & TS.TypeFlags.StringLike) == TS.TypeFlags.StringLike) {
                    return 'STRING';
                }
                else if ((finalFlags & TS.TypeFlags.NumberLike) == TS.TypeFlags.NumberLike) {
                    return 'NUMBER';
                }
                else if ((finalFlags & TS.TypeFlags.BooleanLike) == TS.TypeFlags.BooleanLike) {
                    return 'BOOLEAN';
                }
                else if ((finalFlags & TS.TypeFlags.String) == TS.TypeFlags.String) {
                    return 'STRING';
                }
                else if ((finalFlags & TS.TypeFlags.Number) == TS.TypeFlags.Number) {
                    return 'NUMBER';
                }
                else if ((finalFlags & TS.TypeFlags.Boolean) == TS.TypeFlags.Boolean) {
                    return 'BOOLEAN';
                }
                else if ((finalFlags & TS.TypeFlags.StringLiteral) == TS.TypeFlags.StringLiteral) {
                    return 'STRING';
                }
                else if ((finalFlags & TS.TypeFlags.NumberLiteral) == TS.TypeFlags.NumberLiteral) {
                    return 'NUMBER';
                }
                else if ((finalFlags & TS.TypeFlags.BooleanLiteral) == TS.TypeFlags.BooleanLiteral) {
                    return 'BOOLEAN';
                }
            }
        }

        return baseType;
    }

    // #region Compilation result

    /**
     * @deprecated - Use `toDeclaration` instead.
     * 
     * Returns the Thingworx collection declaration of the entity within the file processed by this transformer.
     * @return      The typescript declaration.
     */
    toDefinition(): string {
        return this.toDeclaration();
    }

    /**
     * Returns the Thingworx collection declaration of the entity within the file processed by this transformer.
     * @return      The typescript declaration.
     */
    toDeclaration(): string {
        // If no class was processed, this is an error, but it shouldn't stop the entity declaration phase
        if (!this.entityName) {
            return '';
        }

        return `declare interface Mashups { ${JSON.stringify(this.entityName)}: MashupEntity<{${
            (this.mashupParameters ?? [])
                .map(p => `${JSON.stringify(p.ParameterName)}: ${p.BaseType}${p.Aspects.dataShape ? `<${p.Aspects.dataShape}>` : ''}`)
                .join('; ')
        }}> }`;
    }

    /**
     * Returns the mashup content for this entity.
     * @returns         The mashup content JSON.
     */
    mashupContent(): UIMashupContent {
        const dataItems: Record<string, UIMashupDataItem> = {};

        // The data items are built out of the service references
        for (const ID in this.references) {
            const ref = this.references[ID];
            if (ref.kind != UIReferenceKind.Service) {
                continue;
            }

            dataItems[ref.entityID] ??= {
                EntityName: ref.entityName,
                DataName: ref.entityID,
                EntityType: ref.collection,
                Id: ref.entityID,
                RefreshInterval: 0,
                Services: []
            };

            dataItems[ref.entityID].Services.push({
                APIMethod: 'post',
                Characteristic: 'Services',
                Id: ref.ID,
                Name: ref.ID,
                Target: ref.serviceName,
                Parameters: ref.staticParameters,
                RefreshInterval: 0
            });
        }

        return {
            DataBindings: this.propertyBindings,
            Events: this.eventBindings,
            mashupType: this.mashupType == 'mashup' ? 'mashup' : 'targetmashup',
            UI: this.rootWidget,
            CustomMashupCss: this.customCSS,
            Data: dataItems
        }
    }

    /**
     * Returns the XML entity representation of the file processed by this transformer.
     * @return      An XML.
     */
    toXML(): string {
        if (!this.entityName) {
            throw new Error('Unable to build the XML representation of this mashup because no mashup class has been defined.');
        }

        const XML = {} as any;

        const collectionKind = 'Mashups';
        const entityKind = 'Mashup';
        
        XML.Entities = {};
        XML.Entities[collectionKind] = [];
        XML.Entities[collectionKind][0] = {};
        XML.Entities[collectionKind][0][entityKind] = [{$:{}}];
        
        const entity = XML.Entities[collectionKind][0][entityKind][0];

        entity.$.name = this.entityName;

        if (this.projectName) entity.$.projectName = this.projectName;

        // Tags are yet unsupported
        entity.$.tags = '';

        if (this.editable) entity.$['aspect.isEditableExtensionObject'] = this.editable;
        if (this.description) entity.$.description = this.description;

        entity.$['aspect.isFlex'] = this.isFlex;
        entity.$['aspect.isResponsive'] = this.isResponsive;
        entity.$['aspect.mashupType'] = this.mashupType;

        entity.Owner = [{$: {name: 'Administrator', type: 'User'}}];


        // **********************************  PARAMETER DEFINITIONS  **********************************
        if (this.mashupParameters?.length) {
            entity.ParameterDefinitions = [{FieldDefinition: []}];
            const fields = entity.ParameterDefinitions[0].FieldDefinition;

            let ordinal = 0;
            for (const parameter of this.mashupParameters) {
                fields.push({$: {
                    name: parameter.ParameterName,
                    description: '',
                    baseType: parameter.BaseType,
                    ordinal,
                    'aspect.bindingDirection': parameter.Aspects.bindingDirection,
                    'aspect.dataShape': parameter.Aspects.dataShape,
                    'aspect.isMandatory': parameter.Aspects.isMandatory
                }});
                ordinal++;
            }
        }

        // **********************************  PERMISSIONS  **********************************
        if (this.runtimePermissions.runtime) {
            entity.RunTimePermissions = [{Permissions: []}];

            for (const resource in this.runtimePermissions.runtime) {
                const permissionDefinition = {$: {resourceName: resource}};

                for (const permission in this.runtimePermissions.runtime[resource]) {
                    const principals = this.runtimePermissions.runtime[resource][permission].map(p => ({$: {name: p.principal, type: p.type, isPermitted: p.isPermitted}}));
                    permissionDefinition[permission] = [{Principal: principals}];
                }

                entity.RunTimePermissions[0].Permissions.push(permissionDefinition);
            }
        }

        // **********************************  VISIBILITY  **********************************
        if (this.visibilityPermissions.length) {
            entity.VisibilityPermissions = [{Visibility: []}];
            entity.VisibilityPermissions[0].Visibility[0] = {Principal: this.visibilityPermissions.map(p => ({$: p}))};
        }

        // **********************************  CONFIGURATION TABLES *************************************
        if (this.configurationTableDefinitions.length) {
            entity.ConfigurationTableDefinitions = [{ConfigurationTableDefinition: []}];
            const configurationTableDefinitions = entity.ConfigurationTableDefinitions[0].ConfigurationTableDefinition;

            for (const table of this.configurationTableDefinitions) {
                const configurationTable = {$:{}};
                for (const key in table) {
                    configurationTable.$[key] = table[key];
                }

                configurationTableDefinitions.push(configurationTable);
            }
        }

        // If any configuration is specified, set up a configuration table for it
        if (this.configuration) {
            entity.ConfigurationTables = entity.ConfigurationTables || [
                {
                    ConfigurationTable: []
                }
            ];

            const configurationTable = entity.ConfigurationTables[0].ConfigurationTable as any[];

            for (const tableName of Object.keys(this.configuration)) {
                const table = XMLRepresentationOfInfotable(this.configuration[tableName]);

                table.$.name = tableName;
                table.$.description = '';
                table.$.isMultiRow = String(this.configuration[tableName].rows.length > 1);

                configurationTable.push(table);
            }
        }

        // Mashup content
        entity.mashupContent = [JSON.stringify(this.mashupContent())];

        return (new Builder()).buildObject(XML);
    }

    /**
     * Writes the XML entity representation of the file processed by this transformer to an appropriate file
     * and path based on the entity kind and its name. The path will use the given path as a root.
     * @param path      Defaults the `root` property. The root path.
     */
    write(path: string = `${this.root}/build`): void {
        if (!FS.existsSync(`${path}`)) FS.mkdirSync(`${path}`);
        if (!FS.existsSync(`${path}/Entities`)) FS.mkdirSync(`${path}/Entities`);

        if (!FS.existsSync(`${path}/Entities/Mashups`)) FS.mkdirSync(`${path}/Entities/Mashups`);

        FS.writeFileSync(`${path}/Entities/Mashups/${this.entityName}.xml`, this.toXML());
    }

    // #endregion

    // #region Post transform

    firePostTransformActions(): void {
        // There are no port transform actions to perform for UI files
    }

    /**
     * Applies a plugin to the specified widget after the mashup has been fully processed. Then it
     * recursively applies any matching plugins to descendant widgets.
     * @param widget            The widget to which to apply the plugins.
     */
    applyPostTransformPlugins(widget: UIWidget): void {
        let className = widget.Properties.Type as string;

        // Class names in JSX are required to start with an uppercase character
        // so if it starts with a lowercase letter, uppercase it
        if (className.charAt(0).toLowerCase() == className.charAt(0)) {
            className = className.charAt(0).toUpperCase() + className.substring(1);
        }

        const plugin = UITransformer.plugins[className];

        if (plugin) {
            plugin.transformerProcessingComplete?.(this, className, widget);
        }

        for (const subWidget of widget.Widgets) {
            this.applyPostTransformPlugins(subWidget);
        }
    }

    // #endregion

    // #region API

    /**
     * Returns the parameters of the specified mashup.
     * @param name      The name of the mashups.
     * @returns         An array containing the mashup parameters if the specified mashup was found,
     *                  `undefined` otherwise.
     */
    parametersOfMashupNamed(name: string): {name: string, baseType: string, dataShape?: string}[] | undefined {
        const typeChecker = this.program.getTypeChecker();

        // Get the global Mashups symbol to obtain the associated MashupEntity
        const globalSymbols = typeChecker.getSymbolsInScope(this.sourceFile!, TS.SymbolFlags.Variable);
        const mashups = globalSymbols.find(s => s.escapedName == 'Mashups');
        if (!mashups) {
            return;
        }

        // Find the member with the specified name
        const mashupsType = typeChecker.getDeclaredTypeOfSymbol(mashups);
        if (!mashupsType.isClassOrInterface()) {
            return;
        }
        const mashupEntity = mashupsType.getProperties().find(s => s.escapedName == name);
        if (!mashupEntity) {
            return;
        }

        const declarations = mashupEntity.getDeclarations();
        if (!declarations) {
            return;
        }

        // Get the declaration and the type from it
        for (const declaration of declarations) {
            if (!TS.isPropertyDeclaration(declaration) && !TS.isPropertySignature(declaration)) {
                continue;
            }

            const type = declaration.type;
            if (!type || !TS.isTypeReferenceNode(type)) {
                continue;
            }

            if (type.typeName.getText() != 'MashupEntity') {
                continue;
            }

            const typeArgument = type.typeArguments?.[0];
            if (!typeArgument || !TS.isTypeLiteralNode(typeArgument)) {
                continue;
            }

            const parameters: {name: string, baseType: string, dataShape?: string}[] = [];
            for (const member of typeArgument.members) {
                if (!TS.isPropertySignature(member) || !member.type) {
                    continue;
                }

                if (!TS.isTypeReferenceNode(member.type)) {
                    continue;
                }

                if (member.name && (TS.isStringLiteral(member.name) || TS.isIdentifier(member.name))) {
                    let baseType = UIBaseTypes[member.type.typeName.getText()];
                    let dataShape;

                    if (baseType == 'INFOTABLE' && member.type.typeArguments?.length == 1) {
                        if (TS.isTypeReferenceNode(member.type.typeArguments[0])) {
                            dataShape = member.type.typeArguments[0].getText();
                        }
                    }

                    if (baseType) {
                        parameters.push({name: member.name.text, baseType: member.type.typeName.getText(), dataShape});  
                    } 
                }
            }

            if (parameters.length) {
                return parameters;
            }
        }

    }

    /**
     * Returns the fields of the specified data shape.
     * @param name      The name of the data shape.
     * @returns         An array containing the data shape fields if the specified data shape was found,
     *                  `undefined` otherwise.
     */
    fieldsOfDataShapeNamed(name: string): {name: string, baseType: string, dataShape?: string}[] | undefined {
        const typeChecker = this.program.getTypeChecker();

        // Get the global Mashups symbol to obtain the associated MashupEntity
        const globalSymbols = typeChecker.getSymbolsInScope(this.sourceFile!, TS.SymbolFlags.Variable);
        const dataShapes = globalSymbols.find(s => s.escapedName == 'DataShapes');
        if (!dataShapes) {
            return;
        }

        // Find the member with the specified name
        const dataShapesType = typeChecker.getDeclaredTypeOfSymbol(dataShapes);
        if (!dataShapesType.isClassOrInterface()) {
            return;
        }
        const dataShapeEntity = dataShapesType.getProperties().find(s => s.escapedName == name);
        if (!dataShapeEntity) {
            return;
        }

        const declarations = dataShapeEntity.getDeclarations();
        if (!declarations) {
            return;
        }

        // Get the declaration and the type from it
        for (const declaration of declarations) {
            if (!TS.isPropertyDeclaration(declaration) && !TS.isPropertySignature(declaration)) {
                continue;
            }

            const type = declaration.type;
            if (!type || !TS.isTypeReferenceNode(type)) {
                continue;
            }

            if (type.typeName.getText() != 'DataShapeEntity') {
                continue;
            }

            const typeArgument = type.typeArguments?.[0];
            if (!typeArgument || !TS.isTypeReferenceNode(typeArgument)) {
                continue;
            }

            const sourceType = typeChecker.getTypeAtLocation(typeArgument)?.getSymbol()?.getDeclarations();
            if (!sourceType ) {
                continue;
            }

            for (const declaration of sourceType) {
                if (!TS.isClassDeclaration(declaration)) {
                    continue;
                }

                const parameters: {name: string, baseType: string, dataShape?: string}[] = [];

                // If this is an extended data shape, also obtain the field definitions of the parent data shapes
                let parentParameters: {name: string, baseType: string, dataShape?: string}[] = [];
                const heritage = declaration.heritageClauses?.[0]?.types?.[0]?.expression;
                if (heritage && TS.isCallExpression(heritage)) {
                    for (const argument of heritage.arguments) {
                        const dataShape = argument.getText();
                        const parameters = this.fieldsOfDataShapeNamed(dataShape);

                        if (parameters) {
                            parentParameters = parentParameters.concat(parameters);
                        }
                    }
                }

                for (const member of declaration.members) {
                    if (!TS.isPropertyDeclaration(member) || !TS.isIdentifier(member.name) || !member.type) {
                        continue;
                    }

                    let typeText;
                    if (TS.isTypeReferenceNode(member.type)) {
                        typeText = member.type.typeName.getText();
                    }
                    else {
                        typeText = member.type.getText();
                    }

                    const baseType = UIBaseTypes[typeText];
                    if (!baseType) {
                        continue;
                    }

                    let dataShape;
                    if (TS.isTypeReferenceNode(member.type)) {
                        if (baseType == 'INFOTABLE' && member.type.typeArguments?.length == 1) {
                            if (TS.isTypeReferenceNode(member.type.typeArguments[0])) {
                                dataShape = member.type.typeArguments[0].getText();
                            }
                        }
                    }

                    parameters.push({name: member.name.text, baseType, dataShape});
                }

                if (parameters.length) {
                    return parentParameters.concat(parameters);
                }
            }

        }

    }

    /**
     * Returns an array containing the names of the states in the specified state definition.
     * @param name          The name of the state definition.
     * @returns             An array containing the state names if the specified state definition was found,
     *                      `undefined` otherwise.
     */
    statesOfStateDefinition(name: string): string[] | undefined {
        const typeChecker = this.program.getTypeChecker();

        // Get the global StateDefinitions symbol to obtain the associated StateDefinitionEntity
        const globalSymbols = typeChecker.getSymbolsInScope(this.sourceFile!, TS.SymbolFlags.Variable);
        const stateDefinitions = globalSymbols.find(s => s.escapedName == 'StateDefinitions');
        if (!stateDefinitions) {
            return;
        }

        // Find the member with the specified name
        const stateDefinitionsType = typeChecker.getDeclaredTypeOfSymbol(stateDefinitions);
        if (!stateDefinitionsType.isClassOrInterface()) {
            return;
        }
        const stateDefinitionEntity = stateDefinitionsType.getProperties().find(s => s.escapedName == name);
        if (!stateDefinitionEntity) {
            return;
        }

        const declarations = stateDefinitionEntity.getDeclarations();
        if (!declarations) {
            return;
        }

        // Get the declaration and the type from it
        for (const declaration of declarations) {
            if (!TS.isPropertyDeclaration(declaration) && !TS.isPropertySignature(declaration)) {
                continue;
            }

            const type = declaration.type;
            if (!type || !TS.isTypeReferenceNode(type)) {
                continue;
            }

            if (type.typeName.getText() != 'StateDefinitionEntity') {
                continue;
            }

            const typeArgument = type.typeArguments?.[0];
            if (!typeArgument || !TS.isUnionTypeNode(typeArgument)) {
                continue;
            }

            // The states are encoded in the type argument
            const states: string[] = [];
            for (const member of typeArgument.types) {
                if (!TS.isLiteralTypeNode(member)) {
                    continue;
                }

                const literal = member.literal;
                if (!TS.isLiteralExpression(literal)) {
                    continue;
                }

                states.push(literal.text);
            }

            if (states.length) {
                return states;
            }
        }
    }

    /**
     * Returns the fields associated with specified widget property. A widget property can contain fields in the following cases:
     *  - It is a `MASHUPNAME` property with a literal value
     *  - Is is a bound `INFOTABLE` property
     * @param widget            The widget instance.
     * @param property          The property whose associated fields should be returned.
     * @returns                 An array of field definitions if the property has any, `undefined` otherwise.
     */
    fieldsOfWidgetProperty(widget: UIWidget, property: string): {name: string, baseType: string, dataShape?: string}[] | undefined {
        const type = this._typeCache[widget.Properties.Id as string]?.[property];
        if (type && type.fields) {
            return type.fields;
        }
    }

    // #endregion

}