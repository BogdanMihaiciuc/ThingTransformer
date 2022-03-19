import * as ts from 'typescript';
import { TWEntityKind, TWPropertyDefinition, TWServiceDefinition, TWEventDefinition, TWSubscriptionDefinition, TWBaseTypes, TWPropertyDataChangeKind, TWFieldBase, TWPropertyRemoteBinding, TWPropertyRemoteFoldKind, TWPropertyRemotePushKind, TWPropertyRemoteStartKind, TWPropertyBinding, TWSubscriptionSourceKind, TWServiceParameter, TWDataShapeField, TWConfigurationTable, TWRuntimePermissionsList, TWVisibility, TWExtractedPermissionLists, TWRuntimePermissionDeclaration, TWPrincipal, TWPermission, TWUser, TWUserGroup, TWPrincipalBase, TWOrganizationalUnit, TWConnection, TWDataThings, TWInfoTable } from './TWCoreTypes';
import { Breakpoint } from './DebugTypes';
import {Builder} from 'xml2js';
import * as fs from 'fs';

declare global {
    namespace NodeJS {
        interface Global {
            _TWEntities: any;
        }
    }
}

/**
 * The primitive type keywords that can be used in function returns.
 */
const TypeScriptReturnPrimitiveTypes = [ts.SyntaxKind.StringKeyword, ts.SyntaxKind.NumberKeyword, ts.SyntaxKind.VoidKeyword, ts.SyntaxKind.BooleanKeyword];

/**
 * The primitive type keywords that can be used anywhere.
 */
const TypeScriptPrimitiveTypes = [ts.SyntaxKind.StringKeyword, ts.SyntaxKind.NumberKeyword, ts.SyntaxKind.BooleanKeyword];

/**
 * The kinds of nodes that are permitted to express Thingworx types.
 */
const PermittedTypeNodeKinds = [...TypeScriptPrimitiveTypes, ts.SyntaxKind.TypeReference];

/**
 * An array of decorator names that are used to specify permissions.
 */
const PermissionDecorators = ['allow', 'deny', 'allowInstance', 'denyInstance'];

/**
 * A constant that defines how many thing instances should be created for a thing template
 * or thing shape when this feature is enabled.
 */
const ThingInstancesToCreate = 5;

/**
 * If set to `true`, the transformer will create a configuration table containing the debug information
 * for each entity.
 */
const USE_DEBUG_CONFIGURATION_TABLE = false;

/**
 * The thing transformer is applied to Thingworx source files to convert them into Thingworx XML entities.
 * It can also be used with global files to export symbols into the shared global scope.
 */
export class TWThingTransformer {

    program: ts.Program;

    context: ts.TransformationContext;

    /**
     * Set to `true` when experimental support for global code is enabled.
     */
    experimentalGlobals?: boolean = false;

    /**
     * Set to `true` when the file parsed by this transformer is global code that should not be evaluated using
     * thingworx rules.
     */
    isGlobalCode?: boolean;

    /**
     * For global files, this is an array of global symbols that should be exported.
     */
    globalSymbols: string[] = [];

    /**
     * Set to `true` after the first root node has been visited.
     */
    anyNodeVisited: boolean = false;

    /**
     * The filename.
     */
    filename?: string;

    /**
     * The source file being processed.
     */
    sourceFile?: ts.SourceFile;

    /**
     * The JSDoc description for this entity.
     */
    description?: string;

    /**
     * The name of the entity to create. For global code, this is the name of the
     * thing to which the global code will be attached.
     */
    className?: string;

    /**
     * The exported name of the entity to use.
     */
    exportedName?: string;

    /**
     * When set to a string, this project will be assigned to the entity.
     */
    projectName?: string;

    /**
     * For things and thing templates, this represents the name of the template from which
     * this entity inherits.
     */
    thingTemplateName?: string;

    /**
     * An array of thing shapes to apply to things and thing templates.
     */
    thingShapes: string[] = [];

    /**
     * The generic argument specified for the thing template, if any.
     */
    genericArgument?: string;

    /**
     * For things, this represents the identifier if it has been set.
     */
    identifier?: string;

    /**
     * For things and thing templates, this represents the assigned value stream, if it has been set.
     */
    valueStream?: string;

    /**
     * For things, this represents the published flag if it has been set.
     */
    published: boolean = false;

    /**
     * Controls whether the class represents an editable extension object.
     */
    editable: boolean = false;

    /**
     * Set to `true` when this transformer first encounters a class.
     * In Thingworx files, only a single class may be declared per file.
     */
    hasClassDefinition = false;

    /**
     * The kind of entity.
     */
    entityKind!: TWEntityKind;

    /**
     * The class node for this entity.
     */
    classNode?: ts.ClassDeclaration;


    /**
     * For model entities, an array of discovered properties.
     */
    properties: TWPropertyDefinition[] = [];


    /**
     * For model entities, an array of discovered services.
     */
    services: TWServiceDefinition[] = [];

    /**
     * For model entities, an array of discovered events.
     */
    events: TWEventDefinition[] = [];

    /**
     * For model entities, an array of discovered subscription.
     */
    subscriptions: TWSubscriptionDefinition[] = [];

    /**
     * An array of global blocks associated with this entity.
     */
    globalBlocks: TWThingTransformer[] = [];

    /**
     * For global code transformers processed in the `after` phase, this is the compiled global code.
     */
    compiledGlobalCode?: string;

    /**
     * For model entities, an array of discovered configuration table definitions.
     */
    configurationTableDefinitions: TWConfigurationTable[] = [];

    /**
     * For model entities, a map of discovered configuration table values.
     */
    configuration?: Record<string, TWInfoTable>;

    /**
     * For data shapes, an array of field definitions.
     */
    fields: TWDataShapeField[] = [];

    /**
     * A dictionary of runtime permissions to apply to this entity.
     */
    runtimePermissions: TWExtractedPermissionLists = {};

    /**
     * An array of visibility permissions to apply to this entity.
     */
    visibilityPermissions: TWVisibility[] = [];

    /**
     * An array of visibility permissions to apply to instances of this entity.
     */
    instanceVisibilityPermissions: TWVisibility[] = [];

    /**
     * A dictionary of users declared in this entity.
     */
    users: { [key: string]: TWUser } = {};

    /**
     * A dictionary of user groups declared in this entity.
     */
    userGroups: { [key: string]: TWUserGroup } = {};

    /**
     * An array of discovered organizational units in this entity.
     */
    orgUnits: TWOrganizationalUnit[] = [];

    /**
     * An array of discovered organizational unit connections in this entity..
     */
    orgConnections: TWConnection[] = [];

    /**
     * When enabled, ordinal values will be generated for data shape fields, in the order in which they
     * appear, starting from 0.
     * 
     * This will not override ordinal values that are explicitly specified via decorators.
     */
    autoGenerateDataShapeOrdinals: boolean = false;

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
    store?: {[key: string]: TWThingTransformer};

    /**
     * An array of endpoints that should be invoked after deployment.
     */
    deploymentEndpoints: string[] = [];

    /**
     * A weak map that contains a mapping between nodes that have been marked for replacement before
     * having been visited.
     */
    nodeReplacementMap: WeakMap<ts.Node, ts.Node> = new WeakMap;

    /**
     * A weak set of the methods that should be visited for adding debug information.
     */
    debugMethodNodes: WeakSet<ts.Node> = new WeakSet;

    /**
     * Set to `true` if this transformer should generate debugging information.
     */
    debug?: boolean;

    /**
     * An array of breakpoint locations that have been added in a debug build.
     */
    breakpoints: Breakpoint[] = [];

    /**
     * A map of existing breakpoint locations.
     */
    breakpointLocations: { [key: number]: { [key:number]: boolean } } = {};

    /**
     * If enabled, when generating the declarations for a thing template or thing shape, the transformer
     * will also declare a number of things that implement them.
     */
    generateThingInstances?: boolean;

    constructor(program: ts.Program, context: ts.TransformationContext, root: string, after: boolean, watch: boolean) {
        this.program = program;
        this.context = context;
        this.root = root;
        this.after = after;
        this.watch = watch;
    }

    /**
     * Throws a formatted error message for the given AST node.
     * @param node      The node which caused an error.
     * @param error     The error message to display.
     */
    throwErrorForNode(node: ts.Node, error: string): never {
        const limit = Error.stackTraceLimit;
        try {
            Error.stackTraceLimit = 0;
            const {line, character} = node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
            throw new Error(`Error in file ${node.getSourceFile().fileName}:${line},${character}\n\n${error}\n
Failed parsing at: \n${node.getText()}\n\n`);
        }
        finally {
            Error.stackTraceLimit = limit;
        }
    }

    /**
     * Returns the TW specific entity kind for the given class declaration based on the applied
     * decorators.
     * @param classNode     The class node.
     * @return              The entity kind.
     */
    entityKindOfClassNode(classNode: ts.ClassDeclaration): TWEntityKind {
        // Determine the kind based on the decorators
        if (!classNode.decorators || !classNode.decorators.length) {
            this.throwErrorForNode(classNode, `Ambiguous class kind ${classNode.name}. Thingworx classes must extend from DataShape, ThingShape or have an entity kind decorator.`);
        }

        let isThing = classNode.decorators.some(decorator => decorator.expression.kind == ts.SyntaxKind.Identifier && decorator.expression.getText() == 'ThingDefinition');
        let isThingTemplate = classNode.decorators.some(decorator => decorator.expression.kind == ts.SyntaxKind.Identifier && decorator.expression.getText() == 'ThingTemplateDefinition');
        let isDataShape = classNode.decorators.some(decorator => decorator.expression.kind == ts.SyntaxKind.Identifier && decorator.expression.getText() == 'DataShapeDefinition');

        const kinds = [isThing, isThingTemplate, isDataShape].filter(b => b);

        // Ensure that there is exactly a single kind specified
        if (kinds.length != 1) {
            this.throwErrorForNode(classNode, `Class ${classNode.name} must have a single entity kind annotation.`);
        }

        if (isThing) {
            return TWEntityKind.Thing;
        } else if (isThingTemplate) {
            return TWEntityKind.ThingTemplate;
        } else if (isDataShape) {
            this.throwErrorForNode(classNode, `Data shape inheritance is not yet supported.`);
            return TWEntityKind.DataShape;
        }

        this.throwErrorForNode(classNode, `Unknown entity kind for class ${classNode.name}`);
    }

    /**
     * Returns the constant value of the given property access expression so that it can be inlined.
     * A constant value that must be inlined can occur because of a const enum member or because of
     * an environment variable.
     * @param expression    The expression whose constant value should be evaluated.
     * @returns             The constant value if it could be resolved, `undefined` otherwise.
     */
    constantValueOfExpression(expression: ts.Expression): unknown {
        if (expression.kind != ts.SyntaxKind.PropertyAccessExpression) return undefined;

        const propertyAccess = expression as ts.PropertyAccessExpression
        
        const sourceObject = propertyAccess.expression;
        const value = propertyAccess.name.text;

        if (sourceObject.kind == ts.SyntaxKind.PropertyAccessExpression) {
            // If the source object is itself a property acess expression, it may refer to an env variable
            const sourceExpression = sourceObject as ts.PropertyAccessExpression;
            const sourceExpressionSource = sourceExpression.expression.getText();
            const sourceExpressionValue = sourceExpression.name.text;

            if (sourceExpressionSource == 'process' && sourceExpressionValue == 'env') {
                // If this is an environment variable, inline it
                return process.env[value];
            }
        } else {
            // Otherwise it may just be a const enum
            return ((this.context as any).getEmitResolver() as ts.TypeChecker).getConstantValue(expression as ts.PropertyAccessExpression);
        }

        return undefined;
    }

    /**
     * Checks whether the given node has a decorator with the given name.
     * @param name      The name of the decorator to find.
     * @param node      The node in which to search.
     * @return          `true` if the decorator was found, `false` otherwise.
     */
    hasDecoratorNamed(name: string, node: ts.Node): boolean {
        if (!node.decorators) return false;

        // Getting the decorator name depends on whether the decorator is applied directly or via a
        // decorator factory
        for (const decorator of node.decorators) {
            if (decorator.expression.kind == ts.SyntaxKind.CallExpression) {
                const callExpression = decorator.expression as ts.CallExpression;
                if (callExpression.expression.getText() == name) {
                    return true;
                }
            }
            else if (decorator.expression.kind == ts.SyntaxKind.Identifier) {
                const identifierExpression = decorator.expression as ts.Identifier;
                if (identifierExpression.text == name) {
                    return true;
                }
            }
        }
        return false;
    }


    /**
     * Retrieves the arguments of the decorator with the given name, if the decorator exists and is a applied
     * via a decorator factory.
     * @param name      The name of the decorator to find.
     * @param node      The node in which to search.
     * @return          An array of expressions representing the arguments, or `undefined` if they could not be retrieved.
     */
    argumentsOfDecoratorNamed(name: string, node: ts.Node): ts.NodeArray<ts.Expression> | undefined {
        if (!node.decorators) return;
        
        for (const decorator of node.decorators) {
            if (decorator.expression.kind == ts.SyntaxKind.CallExpression) {
                const callExpression = decorator.expression as ts.CallExpression;
                if (callExpression.expression.getText() == name) {
                    return callExpression.arguments;
                }
            }
        }
    }

    /**
     * Retrieves the text of the single literal argument of the given decorator. This method will throw if the given
     * decorator factory has no arguments, more than one argument or a non-literal argument.
     * @param name      The name of the decorator to find.
     * @param node      The node in which to search.
     * @return          The text of the literal argument, or `undefined` if the decorator does not exist.
     */
    literalArgumentOfDecoratorNamed(name: string, node: ts.Node): string | undefined {
        if (!this.hasDecoratorNamed(name, node)) return;

        const args = this.argumentsOfDecoratorNamed(name, node);

        if (!args || args.length != 1) {
            this.throwErrorForNode(node, `The @${name} decorator must take a single parameter.`);
        }
        else {
            const argument = args[0];

            if (argument.kind != ts.SyntaxKind.StringLiteral) {
                this.throwErrorForNode(node, `The argument for the @${name} decorator must be a string literal.`);
            }

            const literalArgument = argument as ts.StringLiteral;
            return literalArgument.text;
        }
    }

    /**
     * Retrieves the text of the single numeric argument of the given decorator. This method will throw if the given
     * decorator factory has no arguments, more than one argument or a non-numeric argument.
     * @param name      The name of the decorator to find.
     * @param node      The node in which to search.
     * @return          The text of the numeric argument, or `undefined` if the decorator does not exist.
     */
    numericArgumentOfDecoratorNamed(name: string, node: ts.Node): string | undefined {
        if (!this.hasDecoratorNamed(name, node)) return;

        const args = this.argumentsOfDecoratorNamed(name, node);

        if (!args || args.length != 1) {
            this.throwErrorForNode(node, `The @${name} decorator must take a single parameter.`);
        }
        else {
            const argument = args[0];

            if (ts.isNumericLiteral(argument)) {
                return (argument as ts.NumericLiteral).text;
            }
            else if (ts.isPrefixUnaryExpression(argument) && ts.isNumericLiteral(argument.operand) && argument.operator == ts.SyntaxKind.MinusToken) {// check for negative number
                return '-' + (argument.operand as ts.NumericLiteral).text;
            }
            else {
                this.throwErrorForNode(node, `The argument for the @${name} decorator must be a number.`);
            }
        }
    }

    /**
     * Compiles the global code and sets the `compiledGlobalCode` property.
     * @param node      The source file node.
     */
    compileGlobalCode(node: ts.SourceFile) {
        const compiledCode = ts.createPrinter().printNode(ts.EmitHint.Unspecified, node, node);

        // Note that the exported symbol names are javascript identifiers, so it is safe to use them with dot notation
        this.compiledGlobalCode = compiledCode + '\n\n' + this.globalSymbols.map(symbol => `Object.getPrototypeOf(this).${symbol} = ${symbol};`).join('\n');
    }
    
    /**
     * Visits the given node.
     * @param node      The node to visit.
     * @return          The visited node, or a new node that will replace it. 
     */
    visit(node: ts.Node): ts.Node | undefined {
        if (this.after) {
            if (node.kind == ts.SyntaxKind.SourceFile) {
                (this as any).source = node;

                // Check if this file is global code
                const globalClass = this.getGlobalFileClass(node as ts.SourceFile);
                if (globalClass) {
                    this.isGlobalCode = true;

                    // Find the matching before transformer and replace it by this one
                    const store = this.store || global._TWEntities;
                    let targetArray;
                    if (store[globalClass]) {
                        targetArray = (store[globalClass] as TWThingTransformer).globalBlocks;
                    }
                    else if (store['@globalBlocks'][globalClass]) {
                        targetArray = store['@globalBlocks'][globalClass];
                    }

                    if (targetArray) {
                        const filename = (node as ts.SourceFile).fileName;
                        this.filename = filename;
                        for (let i = 0; i < targetArray.length; i++) {
                            // Find the pre-compilation block and replace it by this one, while copying
                            // the exported symbol names
                            const globalTransformer = targetArray[i];
                            if (globalTransformer.filename == filename) {
                                this.globalSymbols = globalTransformer.globalSymbols;
                                targetArray[i] = this;
                                // Compile the global code so that it can be used directly when creating the XML files
                                this.compileGlobalCode(node as ts.SourceFile);
                                break;
                            }
                        }
                    }
                }
            }

            // This doesn't seem properly documented in typescript.d.ts?
            const transpiledNode = node as any;

            if (!this.isGlobalCode) {
                // After transpilation, methods get turned into function declarations
                // that are assigned to properties
                if (node.kind == ts.SyntaxKind.FunctionExpression && transpiledNode.original && transpiledNode.original.kind == ts.SyntaxKind.MethodDeclaration) {
                    this.visitTranspiledMethod(transpiledNode);
                }
            }
        }
        else {
            if (node.kind == ts.SyntaxKind.SourceFile) {
                this.filename = (node as ts.SourceFile).fileName;
                this.sourceFile = node as ts.SourceFile;
            }

            if (node.parent && node.parent.kind == ts.SyntaxKind.SourceFile) {
                if (this.isGlobalCode) {
                    this.visitGlobalRootNode(node);
                }
                else {
                    this.visitRootNode(node);
                }
            }

            // The following transformations only make sense for non-global code
            if (!this.isGlobalCode) {
                // Async is only included for metadata but cannot be used on the result
                if (node.kind == ts.SyntaxKind.AsyncKeyword) {
                    return undefined;
                }
    
                // Decorators are only included for metadata but cannot be used on the result
                if (node.kind == ts.SyntaxKind.Decorator) {
                    return undefined;
                }
    
                // All enum constants and environment variables should be inlined at this step as the printer is not able to inline them later on
                if (node.kind == ts.SyntaxKind.PropertyAccessExpression) {
                    const constantValue = this.constantValueOfExpression(node as ts.PropertyAccessExpression);
    
                    if (typeof constantValue == 'string') {
                        return ts.factory.createStringLiteral(constantValue);
                    }
                    else if (typeof constantValue == 'number') {
                        return ts.factory.createNumericLiteral(constantValue.toString());
                    }
                }
        
                if (node.kind == ts.SyntaxKind.ThisKeyword) {
                    return this.visitThisNode(node as ts.ThisExpression);
                }

                if (this.nodeReplacementMap.get(node)) {
                    // If the node was already processed and marked for replacement, return its replacement
                    return this.nodeReplacementMap.get(node);
                }

                // Upon reaching a method declaration that has been marked for debugging
                // start processing in reverse.
                if (this.debugMethodNodes.has(node)) {
                    return this.visitMethodNode(node);
                }
                
            }
        }

        const result = ts.visitEachChild(node, node => this.visit(node), this.context);

        return result;
    }

    /**
     * Visits a `this` node and decides whether to replace with `me` or leave it as is. The node will be replaced by
     * `me` if its scope - the closest parent non-arrow function - is a thingworx service.
     * @param node      The node to visit.
     * @return          A node.
     */
    visitThisNode(node: ts.ThisExpression) {
        // Replace the node with "me" if the closest function declaration is the class method
        let parent = node.parent;
        if (parent) do {
            // Nodes within functions don't need replacing
            if (parent.kind == ts.SyntaxKind.FunctionDeclaration || parent.kind == ts.SyntaxKind.FunctionExpression) {
                break;
            }

            // Nodes within the main class methods directly need replacing
            if (parent.kind == ts.SyntaxKind.MethodDeclaration) {
                const method = parent as ts.MethodDeclaration;
                if (method.parent == this.classNode) {
                    return ts.factory.createIdentifier('me');
                }
            }
            parent = parent.parent;
        } while (parent);

        return ts.visitEachChild(node, node => this.visit(node), this.context);
    }

    /**
     * Returns the documentation for the given node, if it exists.
     * @param node      The node whose documentation to get.
     * @return          The documentation, or an empty string if it doesn't exist.
     */
    documentationOfNode(node: ts.Node): string {
        // This method appears to not be included in the type definition
        const documentation = (ts as any).getJSDocCommentsAndTags(node, true) as ts.Node[];

        // Get the first documentation node and use it as the description
        if (documentation.length) {
            for (const documentationNode of documentation) {
                if (documentationNode.kind == ts.SyntaxKind.JSDocComment) {

                    const comment = (documentationNode as ts.JSDoc).comment || '';
                    if (typeof comment != 'string') {
                        return comment.reduce((acc, val) => acc + (val.text), "");
                    }
                    else {
                        return comment;
                    }
                }
            }
        }

        return '';
    }

    /**
     * Constructs and returns a permission declaration object.
     * @returns     A permission declaration object.
     */
    static createPermissionList(): TWRuntimePermissionDeclaration {
        return {
            PropertyRead: [],
            PropertyWrite: [],
            ServiceInvoke: [],
            EventInvoke: [],
            EventSubscribe: []
        } as TWRuntimePermissionDeclaration;
    }

    /**
     * Extracts and returns the visibility permissions of the given kind for the given node.
     * @param kind      The name of the decorator containing the visibility permissions.
     * @param node      The node to which the decorator may be applied.
     * @returns         An array of visibility permissions if any were found, or an empty array otherwise.
     */
    visibilityPermissionsOfKindForNode(kind: string, node: ts.Node): TWVisibility[] {
        const result: TWVisibility[] = [];
        if (this.hasDecoratorNamed(kind, node)) {
            const organizations = this.argumentsOfDecoratorNamed(kind, node);
            if (!organizations || !organizations.length) {
                this.throwErrorForNode(node, `The @${kind} decorator must specify at least one organization.`);
            }

            for (const arg of organizations) {
                if (arg.kind == ts.SyntaxKind.PropertyAccessExpression) {
                    const expression = arg as ts.PropertyAccessExpression;
                    const organization = expression.name.text;
                    if (expression.expression.getText() != 'Organizations') {
                        this.throwErrorForNode(arg, `Organizations specified in the @${kind} decorator must be accessed from the Organizations collection or via the "Unit" function.`);
                    }

                    result.push({isPermitted: true, name: organization, type: 'Organization'});
                }
                else if (arg.kind == ts.SyntaxKind.CallExpression) {
                    const callExpression = arg as ts.CallExpression;

                    if (callExpression.expression.getText() != 'Unit') {
                        this.throwErrorForNode(arg, `Organization units in the @${kind} decorator  must be specified via the "Unit" function.`);
                    }

                    const unitArguments = callExpression.arguments;
                    if (unitArguments.length != 2) {
                        this.throwErrorForNode(arg, `The "Unit" function must take exactly two parameters.`);
                    }

                    const organizationArg = unitArguments[0];
                    const unitArg = unitArguments[1] as ts.StringLiteral;

                    if (unitArg.kind != ts.SyntaxKind.StringLiteral) {
                        this.throwErrorForNode(arg, `The organization unit must be specified as a string literal.`);
                    }

                    const organizationExpression = organizationArg as ts.PropertyAccessExpression;

                    if (organizationArg.kind != ts.SyntaxKind.PropertyAccessExpression || organizationExpression.expression.getText() != 'Organizations') {
                        this.throwErrorForNode(arg, `Organizations specified in the "Unit" function must be accessed from the Organizations collection.`);
                    }

                    const organizationName = organizationExpression.name.text;

                    result.push({isPermitted: true, name: `${organizationName}:${unitArg.text}`, type: 'OrganizationalUnit'})
                }
                else {
                    this.throwErrorForNode(arg, `Organizations specified in the @${kind} decorator must be accessed from the Organizations collection or via the "Unit" function.`);
                }

            }
        }

        return result;
    }

    /**
     * Returns a list of permissions for the given node.
     * @param node          The node whose permissions should be retrieved.
     * @param resource      The resource to which the permissions should refer. If specified and any decorator
     *                      refers to a different resource, this method will throw.
     * @returns             A list of permissions
     */
    permissionsOfNode(node: ts.Node, resource: string = '*'): TWExtractedPermissionLists {
        // Filter out the list of decorators to exclude any non-permission decorators
        const decorators = node.decorators?.filter(d => d.expression.kind == ts.SyntaxKind.CallExpression && PermissionDecorators.includes((d.expression as ts.CallExpression).expression.getText()));
        const result: TWExtractedPermissionLists = {};

        if (!decorators?.length) return result;

        const permissionLists: TWExtractedPermissionLists[] = [];

        for (const decorator of decorators) {
            const text = (decorator.expression as ts.CallExpression).expression.getText();

            // Determine the kind of permission based on the decorator name
            let permissionKind: keyof TWExtractedPermissionLists = 'runtime';
            let permitted = false;
            let targetResource = resource;

            switch (text) {
                case 'allow':
                    permitted = true;
                    permissionKind = 'runtime';
                    break;
                case 'deny':
                    permitted = false;
                    permissionKind = 'runtime';
                    break;
                case 'allowInstance':
                    permitted = true;
                    permissionKind = 'runtimeInstance';
                    break;
                case 'denyInstance':
                    permitted = false;
                    permissionKind = 'runtimeInstance';
                    break;
                default:
                    this.throwErrorForNode(node, `Unkown permission decorator '${text}' specified.`)
            }

            // Determine if this decorator applies to a specific property or to the entire node
            // and extract the specified permissions and users.
            const callExpression = decorator.expression as ts.CallExpression;

            if (!callExpression.arguments.length) this.throwErrorForNode(node, `A permission decorator must have at least one user or group and at least one permission`);
            // The index at which to start looking for users and permissions
            let argumentsIndex = 0;

            // if this decorator refers to a specific field, set it as the resource and look for users and permissions starting at index 1
            const firstArgument = callExpression.arguments[0];
            if (firstArgument.kind == ts.SyntaxKind.StringLiteral) {
                targetResource = (firstArgument as ts.StringLiteral).text;
                argumentsIndex = 1;

                // If the specified resource is not a wildcard and this refers to a different resource, throw
                if (resource != '*' && targetResource != resource) {
                    this.throwErrorForNode(node, `A permission decorator applied to a member cannot refer to a different member.`);
                }
            }

            const permissions: (keyof TWRuntimePermissionDeclaration)[] = [];
            const principals: TWPrincipal[] = [];

            // Extract the users, groups and permissions referenced by this decorator
            for (let i = argumentsIndex; i < callExpression.arguments.length; i++) {
                const argument = callExpression.arguments[i];
                if (argument.kind != ts.SyntaxKind.PropertyAccessExpression) this.throwErrorForNode(node, `Invalid argument '${argument.getText()}' supplied to ${decorator.getText()}`);

                const expression = argument as ts.PropertyAccessExpression;
                const kind = expression.expression.getText();
                const value = expression.name;

                switch (kind) {
                    case 'Permission':
                        permissions.push(value.text as keyof TWRuntimePermissionDeclaration);
                        break;
                    case 'Users':
                    case 'Groups':
                        principals.push({ name: value.text, type: kind.substring(0, kind.length - 1) });
                        break;
                    default:
                        this.throwErrorForNode(node, `Invalid argument '${argument.getText()}' supplied to ${decorator.getText()}`);
                }
            }

            // Convert the lists of permissions and principals into an extracted permissions list
            const permissionList: TWExtractedPermissionLists = {
                [permissionKind]: {
                    [targetResource]: TWThingTransformer.createPermissionList()
                }
            }

            for (const permission of permissions) {
                permissionList[permissionKind]![targetResource][permission] = principals.map(p => ({principal: p.name, type: p.type, isPermitted: permitted}));
            }

            permissionLists.push(permissionList);
        }

        // Merge the lists together
        return this.mergePermissionListsForNode(permissionLists, node);
    }

    /**
     * Merges the given permission lists into a single permission list.
     * @param lists     The lists to merge.
     * @param node      A node to be included in the error message if a validation failure occurs.
     * @returns         The merged list.
     */
    mergePermissionListsForNode(permissionLists: TWExtractedPermissionLists[], node: ts.Node): TWExtractedPermissionLists {
        return permissionLists.reduce((acc, val) => {
            for (const kind in val) {
                // If the given kind isn't specified at all, just copy over from the value
                if (!acc[kind]) {
                    if (!val[kind]) continue;

                    acc[kind] = val[kind];
                    continue;
                }

                // Otherwise merge the lists
                for (const resource in val[kind]!) {
                    // If the given resource isn't specified at all, just copy over from the value
                    if (!acc[kind]![resource]) {
                        acc[kind]![resource] = val[kind]![resource];
                        continue;
                    }
    
                    // If the resource is specified, merge the list of principals
                    for (const key of Object.keys(val[kind]![resource])) {
                        const value: TWPermission[] = acc[kind]![resource][key].concat(val[kind]![resource][key]);
    
                        // Throw if any duplicates are found
                        if (value.filter((p, i) => value.find((p2, i2) => i != i2 && p2.type == p.type && p2.principal == p.principal)).length) {
                            this.throwErrorForNode(node, `Each user or group may only appear a single time per permission in a permissions decorator.`);
                        }
    
                        acc[kind]![resource][key] = value;
                    }
                }
            }

            return acc;
        }, {});
    }

    /**
     * Checks whether the source file processed by this transformer is global code. If it is, this returns
     * the name of the entity to which the global code will be attached.
     * @param node      The source file node.
     * @return          `true` if this file represents global code, `false` otherwise.
     */
    getGlobalFileClass(node: ts.SourceFile): string | undefined {
        // TODO: merge into visitRootNode below
        if (!node.statements.length) return undefined;
        
        const firstStatement = node.statements[0];
        if (firstStatement.kind != ts.SyntaxKind.ExpressionStatement || (firstStatement as ts.ExpressionStatement).expression.kind != ts.SyntaxKind.StringLiteral) return undefined;

        const literalNode = (firstStatement as ts.ExpressionStatement).expression as ts.StringLiteral;
        let literal = literalNode.text;

        // Depending on tsconfig.json, the first statement in the transpiled file may be "use strict"
        if (literal == 'use strict') {
            const secondStatement = node.statements[1];
            if (secondStatement.kind != ts.SyntaxKind.ExpressionStatement || (secondStatement as ts.ExpressionStatement).expression.kind != ts.SyntaxKind.StringLiteral) return undefined;
            const literalNode = (secondStatement as ts.ExpressionStatement).expression as ts.StringLiteral;

            literal = literalNode.text;
        }
        const literalComponents = literal.split(' ');

        if (literalComponents.length == 2 && literalComponents[0] == 'use' && literalComponents[1] != 'strict') {
            return literalComponents[1];
        }

        return undefined;
    }

    /**
     * Visits a node whose parent is the source file.
     * @param node      The node to visit.
     */
    visitRootNode(node: ts.Node) {
        // Check if this file is global code
        if (!this.anyNodeVisited) {
            // A file is considered global code if the first node it contains is a string literal node in the form of
            // 'use <name>', where <name> is any string except 'strict'
            if (node.kind == ts.SyntaxKind.ExpressionStatement && (node as ts.ExpressionStatement).expression.kind == ts.SyntaxKind.StringLiteral) {
                const literal = ((node as ts.ExpressionStatement).expression as ts.StringLiteral).text;
                const literalComponents = literal.split(' ');

                if (literalComponents.length == 2 && literalComponents[0] == 'use' && literalComponents[1] != 'strict') {
                    this.isGlobalCode = true;
                    this.anyNodeVisited = true;
                    this.className = literalComponents[1];

                    // Throw when using global code without the flag
                    if (!this.experimentalGlobals) {
                        this.throwErrorForNode(node, 'Experimental support for global code must be enabled in order to declare global symbols.');
                    }

                    // Throw when a local store is not specified - this likely indicates an old build script that cannot handle the @globalBlocks key
                    if (!this.store) {
                        this.throwErrorForNode(node, 'Experimental support for global code is not compatible with your build script. Ensure the gulpfile is up to date.');
                    }

                    const store = this.store || (global._TWEntities = global._TWEntities || {});
                    store['@globalBlocks'] = store['@globalBlocks'] || {};
                    store['@globalBlocks'][this.className] = store['@globalBlocks'][this.className] || [];
                    store['@globalBlocks'][this.className].push(this);

                    if (store[this.className]) {
                        if ((store[this.className] as TWThingTransformer).entityKind != TWEntityKind.Thing) {
                            this.throwErrorForNode(node, `Blocks of global code can only be attached to thing entities.`);
                        }
                        store[this.className].globalBlocks.push(this);
                    }
                    return;
                }
            }
        }

        this.anyNodeVisited = true;

        // The only permitted entries at the source level are class declarations, interface declarations, const enums and import statements
        if (![ts.SyntaxKind.ClassDeclaration, ts.SyntaxKind.InterfaceDeclaration, ts.SyntaxKind.EnumDeclaration, ts.SyntaxKind.ImportClause, ts.SyntaxKind.SingleLineCommentTrivia, ts.SyntaxKind.JSDocComment, ts.SyntaxKind.MultiLineCommentTrivia].includes(node.kind)) {
            this.throwErrorForNode(node, `Only classes, interfaces, const enums and import statements are permitted at the root level.`);
        }

        // Enums are permitted, but only if they are const
        if (node.kind == ts.SyntaxKind.EnumDeclaration) {
            const enumNode = node as ts.EnumDeclaration;

            if (!enumNode.modifiers || !enumNode.modifiers.some(modifier => modifier.kind == ts.SyntaxKind.ConstKeyword)) {
                this.throwErrorForNode(node, `Enums are only permitted if they are declared const.`);
            }
        }

        // Interface declarations are erased, so they don't need any special handling
        // Import statements are only used for type inference so they are not handled

        if (node.kind == ts.SyntaxKind.ClassDeclaration) {
            const classNode = node as ts.ClassDeclaration;
            if (this.hasClassDefinition) {
                this.throwErrorForNode(node, `Only a single class may be declared in Thingworx files.`);
            }

            this.classNode = classNode;

            if (!classNode.name) {
                this.throwErrorForNode(node, `Thingworx model classes cannot be anonymous.`);
            }

            this.className = classNode.name.text;
            this.exportedName = this.className;

            this.description = this.documentationOfNode(classNode);

            if (this.hasDecoratorNamed('exportName', classNode)) {
                const exportName = this.literalArgumentOfDecoratorNamed('exportName', classNode);
                this.exportedName = exportName;
            }

            // All Thingworx classes are required to inherit from some kind of base class
            if (!classNode.heritageClauses || !classNode.heritageClauses.length) {
                this.throwErrorForNode(node, `Thingworx model classes must inherit from a Thingworx base class.`);
            }

            // Determine the kind of entity this is based on the base class
            const heritage = classNode.heritageClauses[0].types[0];
            // The kind must be either an identifier or a call expression
            if (heritage.expression.kind == ts.SyntaxKind.Identifier) {
                const baseClass = heritage.expression as ts.Identifier;

                if (baseClass.escapedText == 'ThingShapeBase') {
                    this.entityKind = TWEntityKind.ThingShape;
                }
                else if (baseClass.escapedText == 'DataShapeBase') {
                    this.entityKind = TWEntityKind.DataShape;
                }
                else if (baseClass.escapedText == 'UserList') {
                    this.entityKind = TWEntityKind.UserList;
                }
                else if (baseClass.escapedText == 'OrganizationBase') {
                    this.entityKind = TWEntityKind.Organization;
                }
                else {
                    this.entityKind = this.entityKindOfClassNode(classNode);
                    this.thingTemplateName = baseClass.text;

                    // Extract the generic argument in case it needs to be used, if the template is
                    // a data storage type that needs a data shape configuration
                    // In the future this may be expanded to other use cases
                    const genericArguments = heritage.typeArguments;
                    if (genericArguments && genericArguments.length) {
                        const firstArgument = genericArguments[0];

                        if (firstArgument) {
                            this.genericArgument = firstArgument.getText();
                        }
                    }
                }
            }
            else if (heritage.expression.kind == ts.SyntaxKind.CallExpression) {
                // Call expression base classes can only be things or thing templates
                this.entityKind = this.entityKindOfClassNode(classNode);

                if (this.entityKind != TWEntityKind.Thing && this.entityKind != TWEntityKind.ThingTemplate) {
                    this.throwErrorForNode(node, `Extending from expressions is only supported on Things and ThingTemplates.`);
                }

                const callNode = heritage.expression as ts.CallExpression;
                // Ensure that the call signature is of the correct type
                if (callNode.expression.getText() != 'ThingTemplateWithShapes' && callNode.expression.getText() != 'ThingTemplateReference' && callNode.expression.getText() != 'ThingTemplateWithShapesReference') {
                    this.throwErrorForNode(node, `Unknown base class for ${classNode.name}. Thing and ThingTemplate classes must extend from a ThingTemplateWithShapes(...) expression, a ThingTemplateWithShapesReference(...) expression, a ThingTemplateReference(...) expression or a base ThingTemplate class.`);
                }

                if (callNode.expression.getText() == 'ThingTemplateWithShapes' || callNode.expression.getText() == 'ThingTemplateWithShapesReference') {
                    // Ensure that each parameter is of the correct type
                    if (!callNode.arguments.length) {
                        this.throwErrorForNode(node, `The ThingTemplateWithShapes(...) expression must have at least one ThingTemplate parameter.`);
                    }

                    const thingTemplateNode = callNode.arguments[0];
                    if (thingTemplateNode.kind == ts.SyntaxKind.CallExpression) {
                        // A particular case is a data thing that needs a generic which can't be specified directly,
                        // in this case a utility `DataThing` function can be used to obtain a reference to the correct type
                        const callExpression = thingTemplateNode as ts.CallExpression;

                        switch (callExpression.expression.getText()) {
                            case 'DataThing':
                                const args = callExpression.arguments;

                                if (args.length != 2) {
                                    this.throwErrorForNode(heritage, `The "DataThing" function must take two arguments.`);
                                }

                                const templateName = args[0];
                                const dataShapeName = args[1];

                                if (templateName.kind != ts.SyntaxKind.Identifier || dataShapeName.kind != ts.SyntaxKind.Identifier) {
                                    this.throwErrorForNode(heritage, `The "DataThing" function arguments must be identifiers.`);
                                }

                                this.thingTemplateName = templateName.getText();
                                this.genericArgument = dataShapeName.getText();

                                break;
                            default:
                                this.throwErrorForNode(heritage, `Unknown thing template expression "${callExpression.expression.getText()}" used in ThingTemplateWithShapes(...)`);
                        }
                    }
                    else {
                        this.thingTemplateName = callNode.arguments[0].kind == ts.SyntaxKind.StringLiteral ? 
                                                    (callNode.arguments[0] as ts.StringLiteral).text : 
                                                    callNode.arguments[0].getText();
                    }
    
                    this.thingShapes = callNode.arguments.slice(1, callNode.arguments.length).map(node => {
                        if (node.kind == ts.SyntaxKind.StringLiteral) {
                            return (node as ts.StringLiteral).text;
                        }
                        else {
                            return node.getText();
                        }
                    });
                }
                else {
                    if (callNode.arguments.length != 1) this.throwErrorForNode(node, `The ThingTemplateReference(...) expression must have a single string literal parameter.`);

                    if (callNode.arguments[0].kind != ts.SyntaxKind.StringLiteral) this.throwErrorForNode(node, `The ThingTemplateReference(...) expression must have a single string literal parameter.`);

                    this.thingTemplateName = (callNode.arguments[0] as ts.StringLiteral).text;

                    // NOTE: The ThingTemplateReference syntax can't use generics yet
                }


            }

            this.valueStream = this.literalArgumentOfDecoratorNamed('valueStream', classNode);
            this.identifier = this.literalArgumentOfDecoratorNamed('identifier', classNode);

            if (this.valueStream && (this.entityKind != TWEntityKind.Thing && this.entityKind != TWEntityKind.ThingTemplate)) {
                this.throwErrorForNode(node, `The valueStream decorator can only be applied to Things and ThingTemplates.`);
            }

            this.published = !!classNode.decorators && classNode.decorators.some(decorator => decorator.expression.kind == ts.SyntaxKind.Identifier && decorator.expression.getText() == 'published');

            if (this.published && this.entityKind != TWEntityKind.Thing) {
                this.throwErrorForNode(node, `Only Things may be published.`);
            }

            this.editable = !!classNode.decorators && classNode.decorators.some(decorator => decorator.expression.kind == ts.SyntaxKind.Identifier && decorator.expression.getText() == 'editable');

            if (!this.watch) {
                if (this.hasDecoratorNamed('ConfigurationTables', classNode)) {
                    const configurationArgument = this.argumentsOfDecoratorNamed('ConfigurationTables', classNode)!;

                    if (configurationArgument.length != 1) {
                        this.throwErrorForNode(classNode, `The @ConfigurationTables decorator must take a single class parameter.`);
                    }

                    const argument = configurationArgument[0];
                    if (argument.kind != ts.SyntaxKind.ClassExpression) {
                        this.throwErrorForNode(classNode, `The @ConfigurationTables decorator must take a single class parameter.`);
                    }

                    this.visitConfigurationTablesDefinition(argument as ts.ClassExpression);
                }

                if (this.hasDecoratorNamed('config', classNode)) {
                    const configurationArgument = this.argumentsOfDecoratorNamed('config', classNode)!;

                    if (configurationArgument.length != 1) {
                        this.throwErrorForNode(classNode, `The @config decorator must take a single object literal parameter.`);
                    }

                    const argument = configurationArgument[0];
                    if (argument.kind != ts.SyntaxKind.ObjectLiteralExpression) {
                        this.throwErrorForNode(classNode, `The @config decorator must take a single object literal parameter.`);
                    }

                    this.visitConfiguration(argument as ts.ObjectLiteralExpression);
                }

                this.runtimePermissions = this.mergePermissionListsForNode([this.runtimePermissions].concat(this.permissionsOfNode(classNode)), node);

                this.visibilityPermissions = this.visibilityPermissionsOfKindForNode('visible', classNode);
                this.instanceVisibilityPermissions = this.visibilityPermissionsOfKindForNode('visibleInstance', classNode);

                // Instance visibility permissions may only be provided on templates and shapes
                if (this.instanceVisibilityPermissions.length && this.entityKind != TWEntityKind.ThingShape && this.entityKind != TWEntityKind.ThingTemplate) {
                    this.throwErrorForNode(classNode, `Instance permissions may only be set on thing templates and thing shapes.`);
                }
            }

            // In watch mode, it is not needed to visit class members since they are not needed for the declaration files,
            // except for user lists whose members each correspond to an entity and organizations whose units must be specified
            // as type arguments
            if (!this.watch || this.entityKind == TWEntityKind.UserList || this.entityKind == TWEntityKind.Organization) {
                for (const member of classNode.members) {
                    this.visitClassMember(member);
                }
            }
            
            const store = this.store || (global._TWEntities = global._TWEntities || {});
            store[this.className] = this;

            if (store['@globalBlocks'] && store['@globalBlocks'][this.className]) {
                for (const block of store['@globalBlocks'][this.className]) {
                    this.globalBlocks.push(block);
                }
            }

        }
    }

    /**
     * Visits a node whose parent is the source file. This method is only called
     * on global code files.
     * @param node      The node to visit.
     */
    visitGlobalRootNode(node: ts.Node) {
        // The only permitted entries at the source level are declarations; other kinds of executables can only be included as initializers for those declarations
        if (![
            ts.SyntaxKind.ClassDeclaration,
            ts.SyntaxKind.InterfaceDeclaration, 
            ts.SyntaxKind.VariableStatement,
            ts.SyntaxKind.VariableDeclarationList,
            ts.SyntaxKind.VariableDeclaration,
            ts.SyntaxKind.FunctionDeclaration,
            ts.SyntaxKind.EnumDeclaration, 
            ts.SyntaxKind.SingleLineCommentTrivia, 
            ts.SyntaxKind.JSDocComment, 
            ts.SyntaxKind.MultiLineCommentTrivia
        ].includes(node.kind)) {
            this.throwErrorForNode(node, `Only declarations are permitted at the root level.`);
        }

        // Store the symbol name so it can be exported, depending on the syntax kind
        switch (node.kind) {
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.VariableDeclaration:
            case ts.SyntaxKind.EnumDeclaration:
                const declarationNode = node as ts.ClassDeclaration | ts.FunctionDeclaration | ts.EnumDeclaration | ts.FunctionDeclaration;
                if (declarationNode.name) this.globalSymbols.push(declarationNode.name!.text);
                break;
            case ts.SyntaxKind.VariableStatement:
                const variableNode = node as ts.VariableStatement;
                const statementList = variableNode.declarationList;
                for (const declaration of statementList.declarations) {
                    // Binding patterns aren't supported yet
                    if (ts.SyntaxKind.Identifier != declaration.name.kind) continue;
                    this.globalSymbols.push((declaration.name as ts.Identifier).text);
                }
                break;
            case ts.SyntaxKind.VariableDeclarationList:
                const declarationList = node as ts.VariableDeclarationList;
                for (const declaration of declarationList.declarations) {
                    // Binding patterns aren't supported yet
                    if (ts.SyntaxKind.Identifier != declaration.name.kind) continue;
                    this.globalSymbols.push((declaration.name as ts.Identifier).text);
                }
                break;
            // Other kinds don't export anything
            default: break;
        }

    }

    /**
     * Visits a class member. This will invoke one of the specialized visit method depending on the
     * kind of node and class.
     * @param node      The node to visit.
     */
    visitClassMember(node: ts.ClassElement) {
        if (node.kind == ts.SyntaxKind.Constructor) {
            this.throwErrorForNode(node, `Constructors are not supported in Thingworx classes.`);
        }

        if (node.kind == ts.SyntaxKind.PropertyDeclaration) {
            const propertyDeclarationNode = node as ts.PropertyDeclaration;

            if (this.entityKind == TWEntityKind.DataShape) {
                this.visitDataShapeField(propertyDeclarationNode);
            }
            else if (this.entityKind == TWEntityKind.UserList) {
                this.visitUserListField(propertyDeclarationNode);
            }
            else if (this.entityKind == TWEntityKind.Organization) {
                if (node.name?.kind != ts.SyntaxKind.Identifier || (node.name as ts.Identifier)?.text != 'units') {
                    this.throwErrorForNode(node, `Organization classes may only have a single property called "units".`);
                }

                if (!(node as ts.PropertyDeclaration).initializer) {
                    this.throwErrorForNode(node, `The units property must have an initializer.`);
                }

                this.visitOrganizationalUnit((node as ts.PropertyDeclaration).initializer!);
            }
            else {
                this.visitProperty(propertyDeclarationNode);
            }
        }

        if (node.kind == ts.SyntaxKind.MethodDeclaration) {
            if (this.entityKind == TWEntityKind.DataShape) {
                this.throwErrorForNode(node, `Data Shapes cannot contain methods.`);
            }
            if (this.entityKind == TWEntityKind.UserList) {
                this.throwErrorForNode(node, `User lists cannot contain methods.`);
            }
            if (this.entityKind == TWEntityKind.Organization) {
                this.throwErrorForNode(node, `Organizations cannot contain methods.`);
            }
            this.visitMethod(node as ts.MethodDeclaration);
        }
    }

    /**
     * Visits the given organizational unit expression.
     * @param unit      The unit to visit.
     * @param parent    If specified, the parent organizational unit, used to create the required
     *                  connections.
     */
    visitOrganizationalUnit(unit: ts.Expression, parentName?: string) {
        if (unit.kind != ts.SyntaxKind.ObjectLiteralExpression) {
            this.throwErrorForNode(unit, `Organizational units must be specified as object literals.`);
        }

        const unitLiteral = unit as ts.ObjectLiteralExpression;
        const orgUnit = {} as TWOrganizationalUnit;

        for (const member of unitLiteral.properties) {
            if (!member.name || member.name.kind != ts.SyntaxKind.Identifier) {
                this.throwErrorForNode(unit, `Organizational unit properties must be identifiers.`);
            }

            const name = (member.name as ts.Identifier).text;

            if (member.kind != ts.SyntaxKind.PropertyAssignment) {
                this.throwErrorForNode(unit, `Organizational unit properties cannot be setters, getters or methods.`);
            }

            const prop = member as ts.PropertyAssignment;

            switch (name) {
                case 'name':
                    if (prop.initializer.kind != ts.SyntaxKind.StringLiteral) {
                        this.throwErrorForNode(unit, `Organizational unit names must be string literals.`);
                    }
                    orgUnit.name = (prop.initializer as ts.StringLiteral).text;
                    if (orgUnit.name.indexOf(':') != -1) {
                        this.throwErrorForNode(unit, `Organizational unit names cannot contain the ":" character.`);
                    }

                    const description = this.documentationOfNode(prop);
                    if (description) {
                        orgUnit.description = description;
                    }

                    break;
                case 'units':
                    if (!orgUnit.name) {
                        this.throwErrorForNode(unit, `Subunits must be specified after an organizational unit's name.`);
                    }
                    if (prop.initializer.kind != ts.SyntaxKind.ArrayLiteralExpression) {
                        this.throwErrorForNode(unit, `Organizational unit subunits must be specified in an array literal.`);
                    }

                    const subunits = prop.initializer as ts.ArrayLiteralExpression;
                    for (const subunit of subunits.elements) {
                        this.visitOrganizationalUnit(subunit, orgUnit.name);
                    }

                    break;
                case 'members':
                    if (prop.initializer.kind != ts.SyntaxKind.ArrayLiteralExpression) {
                        this.throwErrorForNode(unit, `Organizational unit members must be specified in an array literal.`);
                    }
                    const members = prop.initializer as ts.ArrayLiteralExpression;
                    orgUnit.members = members.elements.map(m => {
                        if (m.kind != ts.SyntaxKind.PropertyAccessExpression) {
                            this.throwErrorForNode(members, `Organizational unit members must be specified via the "Users" and "Groups" collections.`);
                        }

                        const expression = m as ts.PropertyAccessExpression;
                        const kind = expression.expression.getText();
                        const value = expression.name.text;

                        switch (kind) {
                            case 'Users':
                                return {type: 'User', name: value};
                            case 'Groups':
                                return {type: 'Group', name: value};
                            default:
                                this.throwErrorForNode(members, `Organizational unit members must be specified via the "Users" and "Groups" collections.`);
                        }
                    });

                    break;
            }
        }

        if (!orgUnit.name) {
            this.throwErrorForNode(unit, `Organizational units must have a name.`);
        }

        this.orgUnits.push(orgUnit);
        this.orgConnections.push({from: parentName || '', to: orgUnit.name});
    }

    /**
     * Visits a data shape property declaration.
     * @param node      The node to visit.
     */
    visitUserListField(node: ts.PropertyDeclaration) {
        const principal = {} as TWPrincipalBase;
        if (node.name.kind != ts.SyntaxKind.Identifier) {
            this.throwErrorForNode(node, `Computed property names are not supported in Thingwrox classes.`);
        }

        // First obtain the name of the property
        principal.name = node.name.text;

        principal.description = this.documentationOfNode(node);

        if (node.initializer) {
            // Only two types of initializers are permitted in user lists
            // - object literals which describe users
            if (node.initializer.kind == ts.SyntaxKind.ObjectLiteralExpression) {
                const user = principal as TWUser;
                user.extensions = {};

                // Enumerate the members and create the extensions object
                const objectLiteral = node.initializer as ts.ObjectLiteralExpression;
                for (const member of objectLiteral.properties) {
                    if (member.kind == ts.SyntaxKind.MethodDeclaration) {
                        this.throwErrorForNode(node, `User extensions cannot contain methods`);
                    }
                    
                    if (member.kind != ts.SyntaxKind.PropertyAssignment) {
                        this.throwErrorForNode(node, `User extensions keys cannot be setters, getters or shorthand assignments.`);
                    }

                    if (member.name.kind != ts.SyntaxKind.Identifier) {
                        this.throwErrorForNode(node, `User extension property names must be identifiers.`);
                    }

                    const assignment = member as ts.PropertyAssignment;
                    if (assignment.initializer.kind == ts.SyntaxKind.PropertyAccessExpression) {
                        // Const enums need to be resolved early on
                        user.extensions[member.name.text] = this.constantValueOfExpression(assignment.initializer as ts.PropertyAccessExpression);
        
                        // If the value is not a compile time constant, it is not a valid initializer
                        if (user.extensions[member.name.text] === undefined) {
                            this.throwErrorForNode(node, `Unknown initializer for property.`);
                        }
                    }
                    else {
                        user.extensions[member.name.text] = (assignment.initializer as ts.LiteralExpression).text || assignment.initializer.getText();
                    }
                }

                this.users[user.name] = user;
            }
            // - array literals which describe groups
            else if (node.initializer.kind == ts.SyntaxKind.ArrayLiteralExpression) {
                const group = principal as TWUserGroup;
                group.members = [];

                const arrayLiteral = node.initializer as ts.ArrayLiteralExpression;
                for (const member of arrayLiteral.elements) {
                    if (member.kind != ts.SyntaxKind.PropertyAccessExpression) {
                        this.throwErrorForNode(node, `User group members must be user or group references.`);
                    }

                    const expression = member as ts.PropertyAccessExpression;
                    const type = expression.expression.getText();
                    const name = expression.name;

                    if (type != 'Users' && type != 'Groups') {
                        this.throwErrorForNode(node, `User group members must be user or group references.`);
                    }

                    if (name.kind != ts.SyntaxKind.Identifier) {
                        this.throwErrorForNode(node, `User group member names must be identifiers.`);
                    }

                    group.members.push({name: name.text, type})
                }

                this.userGroups[group.name] = group;
            }
        } else {
            // Properties without an initializer default to being treated as users with no extensions
            const user = principal as TWUser;
            user.extensions = {};
            this.users[user.name] = user;
        }

        // Extract the permissions to be applied per user
        this.runtimePermissions = this.mergePermissionListsForNode([this.runtimePermissions].concat(this.permissionsOfNode(node, node.name.text)), node);
    }

    /**
     * Visits a user list property declaration.
     * @param node      The node to visit.
     */
    visitDataShapeField(node: ts.PropertyDeclaration) {
        // Ensure that the property has a type annotation
        if (!node.type) {
            this.throwErrorForNode(node, `Properties must have type annotation in Thingworx classes.`);
        }
        if (!PermittedTypeNodeKinds.includes(node.type.kind)) {
            this.throwErrorForNode(node, `Unknown baseType for property ${node.name.getText()}: ${node.type.getText()}`);
        }

        // Extract the type name
        const typeNode = node.type as ts.TypeReferenceNode;
        const baseType = TypeScriptPrimitiveTypes.includes(typeNode.kind) ? typeNode.getText() : typeNode.typeName.getText();

        const property = {} as TWDataShapeField;
        if (node.name.kind != ts.SyntaxKind.Identifier) {
            this.throwErrorForNode(node, `Computed property names are not supported in Thingwrox classes.`);
        }

        // First obtain the name of the property
        property.name = node.name.text;

        property.description = this.documentationOfNode(node);

        // Create the generic aspects, required for all properties
        property.aspects = {};
        if (this.hasDecoratorNamed('primaryKey', node)) {
            property.aspects.isPrimaryKey = true;
        }

        const ordinal = this.numericArgumentOfDecoratorNamed('ordinal', node);
        if (ordinal) {
            if (!parseInt(ordinal)) this.throwErrorForNode(node, `Non numeric value specified in ordinal decorator for property ${property.name}: ${property.baseType}`);
            property.ordinal = parseInt(ordinal);
        }

        // Ensure that the base type is one of the Thingworx Base Types
        if (!(baseType in TWBaseTypes)) {
            this.throwErrorForNode(node, `Unknown baseType for property ${property.name}: ${property.baseType}`);
        }
        property.baseType = TWBaseTypes[baseType];

        // INFOTABLE can optionally take the data shape as a type argument
        if (TWBaseTypes[baseType] == 'INFOTABLE') {
            const typeArguments = typeNode.typeArguments;
            if (typeArguments) {
                if (typeArguments.length != 1) this.throwErrorForNode(node, `Unknown generics specified for property ${property.name}: ${property.baseType}`);

                if (typeArguments[0].kind == ts.SyntaxKind.LiteralType) {
                    property.aspects.dataShape = ((typeArguments[0] as ts.LiteralTypeNode).literal as ts.StringLiteral).text;
                }
                else {
                    property.aspects.dataShape = typeArguments[0].getText();
                }
            }
        }
        // THINGNAME can optionally take the thing template name and/or thing shape name as a type argument
        else if (TWBaseTypes[baseType] == 'THINGNAME') {
            const typeArguments = typeNode.typeArguments;

            if (typeArguments && typeArguments.length) {
                if (typeArguments.length > 2) this.throwErrorForNode(node, `Unknown generics specified for property ${property.name}: ${property.baseType}`);

                const thingTemplate = typeArguments[0];
                if (thingTemplate.kind == ts.SyntaxKind.LiteralType) {
                    property.aspects.thingTemplate = ((thingTemplate as ts.LiteralTypeNode).literal as ts.StringLiteral).text;
                }

                const thingShape = typeArguments[1];
                if (thingShape && thingShape.kind == ts.SyntaxKind.LiteralType) {
                    property.aspects.thingShape = ((thingShape as ts.LiteralTypeNode).literal as ts.StringLiteral).text;
                }
            }
        }

        if (node.initializer) {
            if (node.initializer.kind == ts.SyntaxKind.PropertyAccessExpression) {
                // Const enums need to be resolved early on
                property.aspects.defaultValue = this.constantValueOfExpression(node.initializer as ts.PropertyAccessExpression);

                // If the value is not a compile time constant, it is not a valod initializer
                if (property.aspects.defaultValue === undefined) {
                    this.throwErrorForNode(node, `Unknown initializer for property.`);
                }
            }
            else if (ts.isNewExpression(node.initializer) && ts.isIdentifier(node.initializer.expression) && node.initializer.expression.escapedText == 'Date') {
                if (node.initializer.arguments && node.initializer.arguments.length == 1 && ts.isStringLiteral(node.initializer.arguments[0])) {
                    property.aspects.defaultValue = new Date(node.initializer.arguments[0].text).toISOString();
                }
                else {
                    this.throwErrorForNode(node, 'Exactly one string literal argument is required when setting Date as default value.');
                }
            }
            else {
                property.aspects.defaultValue = (node.initializer as ts.LiteralExpression).text || node.initializer.getText();
            }
        }

        const permissions = this.permissionsOfNode(node);
        if (Object.keys(permissions).length) {
            this.throwErrorForNode(node, `Permission decorators are not allowed for data shape members.`);
        }

        this.fields.push(property);
    }

    /**
     * Visits a thing, thing template or thing shape property or event.
     * @param node      The node to visit.
     */
    visitProperty(node: ts.PropertyDeclaration) {
        // Ensure that the property has a type annotation
        if (!node.type) {
            this.throwErrorForNode(node, `Properties must have type annotation in Thingworx classes.`);
        }
        if (!PermittedTypeNodeKinds.includes(node.type.kind)) {
            this.throwErrorForNode(node, `Unknown baseType for property ${node.name.getText()}: ${node.type.getText()}`);
        }

        // Extract the type name
        const typeNode = node.type as ts.TypeReferenceNode;
        const baseType = TypeScriptPrimitiveTypes.includes(typeNode.kind) ? typeNode.getText() : typeNode.typeName.getText();

        // The special base type "EVENT" identifies properties that will be converted into events.
        if (baseType == 'EVENT') {
            return this.visitEvent(node);
        }

        const property = {} as TWPropertyDefinition;
        if (node.name.kind != ts.SyntaxKind.Identifier) {
            this.throwErrorForNode(node, `Computed property names are not supported in Thingwrox classes.`);
        }

        // First obtain the name of the property
        property.name = node.name.text;

        property.description = this.documentationOfNode(node);

        // Create the generic aspects, required for all properties
        property.aspects = {
            cacheTime: 0,
            dataChangeType: TWPropertyDataChangeKind.Value,
            dataChangeThreshold: 0
        };

        // Ensure that the base type is one of the Thingworx Base Types
        if (!(baseType in TWBaseTypes)) {
            this.throwErrorForNode(node, `Unknown baseType for property ${property.name}: ${property.baseType}`);
        }
        property.baseType = TWBaseTypes[baseType];

        // INFOTABLE can optionally take the data shape as a type argument
        if (TWBaseTypes[baseType] == 'INFOTABLE') {
            const typeArguments = typeNode.typeArguments;
            if (typeArguments) {
                if (typeArguments.length != 1) this.throwErrorForNode(node, `Unknown generics specified for property ${property.name}: ${property.baseType}`);

                if (typeArguments[0].kind == ts.SyntaxKind.LiteralType) {
                    property.aspects.dataShape = ((typeArguments[0] as ts.LiteralTypeNode).literal as ts.StringLiteral).text;
                }
                else {
                    property.aspects.dataShape = typeArguments[0].getText();
                }
            }
        }
        // THINGNAME can optionally take the thing template name and/or thing shape name as a type argument
        else if (TWBaseTypes[baseType] == 'THINGNAME') {
            const typeArguments = typeNode.typeArguments;

            if (typeArguments && typeArguments.length) {
                if (typeArguments.length > 2) this.throwErrorForNode(node, `Unknown generics specified for property ${property.name}: ${property.baseType}`);

                const thingTemplate = typeArguments[0];
                if (thingTemplate.kind == ts.SyntaxKind.LiteralType) {
                    property.aspects.thingTemplate = ((thingTemplate as ts.LiteralTypeNode).literal as ts.StringLiteral).text;
                }

                const thingShape = typeArguments[1];
                if (thingShape && thingShape.kind == ts.SyntaxKind.LiteralType) {
                    property.aspects.thingShape = ((thingShape as ts.LiteralTypeNode).literal as ts.StringLiteral).text;
                }
            }
        }

        if (node.initializer) {
            if (node.initializer.kind == ts.SyntaxKind.PropertyAccessExpression) {
                // Const enums need to be resolved early on
                property.aspects.defaultValue = this.constantValueOfExpression(node.initializer as ts.PropertyAccessExpression);

                // If the value is not a compile time constant, it is not a valid initializer
                if (property.aspects.defaultValue === undefined) {
                    this.throwErrorForNode(node, `Unknown initializer for property.`);
                }
            }
            else if (ts.isNewExpression(node.initializer) && ts.isIdentifier(node.initializer.expression) && node.initializer.expression.escapedText == 'Date') {
                if (node.initializer.arguments && node.initializer.arguments.length == 1 && ts.isStringLiteral(node.initializer.arguments[0])) {
                    property.aspects.defaultValue = new Date(node.initializer.arguments[0].text).toISOString();
                }
                else {
                    this.throwErrorForNode(node, 'Exactly one string literal argument is required when setting Date as default value.');
                }
            }
            else {
                property.aspects.defaultValue = (node.initializer as ts.LiteralExpression).text || node.initializer.getText();
            }
        }

        // Aspects are specified as decorators
        if (node.decorators) {
            if (this.hasDecoratorNamed('persistent', node)) property.aspects.isPersistent = true;
            if (this.hasDecoratorNamed('logged', node)) property.aspects.isLogged = true;
        }

        // The readonly aspect uses the typescript built-in readonly keyword
        if (node.modifiers) {
            if (node.modifiers.some(modifier => modifier.kind == ts.SyntaxKind.ReadonlyKeyword)) property.aspects.isReadOnly = true;
        }

        // Create a remote binding if it has been specified
        if (this.hasDecoratorNamed('remote', node)) {
            const remoteArguments = this.argumentsOfDecoratorNamed('remote', node)!;

            property.aspects.isRemote = true;
            property.remoteBinding = {} as TWPropertyRemoteBinding;
            property.remoteBinding.name = property.name;

            if (remoteArguments[0].kind != ts.SyntaxKind.StringLiteral) {
                this.throwErrorForNode(node, 'The remote binding source name must be a string literal.');
            }
            property.remoteBinding.sourceName = (remoteArguments[0] as ts.StringLiteral).text;

            // Set up the default values
            property.remoteBinding.timeout = 0;
            property.remoteBinding.foldType = TWPropertyRemoteFoldKind.None;
            property.remoteBinding.pushType = TWPropertyRemotePushKind.Value;
            property.remoteBinding.pushThreshold = '0.0';
            property.remoteBinding.aspects = {
                startType: TWPropertyRemoteStartKind.DefaultValue
            }

            // These exist in exported files, but are not allowed to be in extension files
            /*
            if (this.entityKind == TWEntityKind.Thing) {
                property.remoteBinding.aspects.source = '';
                property.remoteBinding.aspects.tagAddress = '';
            }
            */

            if (remoteArguments.length == 2) {
                if (remoteArguments[1].kind != ts.SyntaxKind.ObjectLiteralExpression) {
                    this.throwErrorForNode(node, 'The aspects of a remote binding decorator must be specified as an object literal.');
                }

                const bindingAspects = remoteArguments[1] as ts.ObjectLiteralExpression;
                for (const bindingAspect of bindingAspects.properties) {
                    if (bindingAspect.kind != ts.SyntaxKind.PropertyAssignment) {
                        this.throwErrorForNode(node, 'The aspects of a remote binding decorator must be literals.');
                    }

                    if (bindingAspect.name.kind != ts.SyntaxKind.Identifier) {
                        this.throwErrorForNode(node, 'Computed property names cannot be used in decorator parameters.');
                    }

                    const name = (bindingAspect.name as ts.Identifier).text;

                    // Undefined aspect values should continue to use the default values
                    if (bindingAspect.initializer.kind == ts.SyntaxKind.UndefinedKeyword) continue;

                    switch (name) {
                        case 'pushType':
                            property.remoteBinding.pushType = (bindingAspect.initializer as ts.StringLiteral).text as TWPropertyRemotePushKind;
                            break;
                        case 'pushThreshold':
                            property.remoteBinding.pushThreshold = bindingAspect.initializer.getText();
                            break;
                        case 'startType':
                            property.remoteBinding.aspects.startType = (bindingAspect.initializer as ts.StringLiteral).text as TWPropertyRemoteStartKind;
                            break;
                        case 'foldType':
                            property.remoteBinding.foldType = (bindingAspect.initializer as ts.StringLiteral).text as TWPropertyRemoteFoldKind;
                            break;
                        case 'cacheTime':
                            property.aspects.cacheTime = parseFloat((bindingAspect.initializer as ts.NumericLiteral).text);
                            break;
                        case 'timeout':
                            property.remoteBinding.timeout = parseFloat((bindingAspect.initializer as ts.NumericLiteral).text);
                            break;
                    }
                }
            }
        }

        // Create a local binding if it has been specified
        if (this.hasDecoratorNamed('local', node)) {
            if (property.remoteBinding) this.throwErrorForNode(node, 'A property cannot be both locally and remotely bound.');

            property.localBinding = {aspects: {}, name: property.name} as TWPropertyBinding;

            const localArguments = this.argumentsOfDecoratorNamed('local', node)!;
            if (localArguments.length != 2) {
                this.throwErrorForNode(node, 'The local binding decorator must have two arguments.');
            }

            for (const argument of localArguments) {
                if (argument.kind != ts.SyntaxKind.StringLiteral) this.throwErrorForNode(node, 'The local binding decorator arguments must be string literals.');
            }

            property.localBinding.sourceThingName = (localArguments[0] as ts.StringLiteral).text;
            property.localBinding.sourceName = (localArguments[1] as ts.StringLiteral).text;
        }

        // Minimum value aspect
        const minimumValue = this.numericArgumentOfDecoratorNamed('minimumValue', node);
        if (minimumValue) {
            if (![TWBaseTypes.INTEGER, TWBaseTypes.LONG, TWBaseTypes.NUMBER, TWBaseTypes.integer, TWBaseTypes.long, TWBaseTypes.number].includes(property.baseType)) {
                this.throwErrorForNode(node, 'The minimum value decorator can only be used with numerical type properties.');
            }

            const minimumValueNum = parseFloat(minimumValue);

            if (isNaN(minimumValueNum)) {
                this.throwErrorForNode(node, `The minimum value decorator argument must be a number.`);
            }

            if (property.aspects.defaultValue && property.aspects.defaultValue < minimumValueNum) {
                this.throwErrorForNode(node, 'The minimum value decorator argument must be less than the default value.');
            }

            property.aspects.minimumValue = minimumValueNum;
        }

        // Maximum value aspect
        const maximumValue = this.numericArgumentOfDecoratorNamed('maximumValue', node);
        if (maximumValue) {
            if (![TWBaseTypes.INTEGER, TWBaseTypes.LONG, TWBaseTypes.NUMBER, TWBaseTypes.integer, TWBaseTypes.long, TWBaseTypes.number].includes(property.baseType)) {
                this.throwErrorForNode(node, 'The minimum value decorator can only be used with numerical type properties.');
            }

            const maximumValueNum = parseFloat(maximumValue);

            if (isNaN(maximumValueNum)) {
                this.throwErrorForNode(node, 'The maximum value decorator argument must be a number.');
            }

            if (property.aspects.defaultValue && property.aspects.defaultValue > maximumValueNum) {
                this.throwErrorForNode(node, 'The maximum value decorator argument must be greater than the default value.');
            }

            if (property.aspects.minimumValue && property.aspects.minimumValue > maximumValueNum) {
                this.throwErrorForNode(node, 'The maximum value for the property must be greater than its minimum value.');
            }

            property.aspects.maximumValue = maximumValueNum;
        }

        // Units aspect
        if (this.hasDecoratorNamed('unit', node)) {
            const argument = this.literalArgumentOfDecoratorNamed('unit', node);

            if (!argument) {
                this.throwErrorForNode(node, 'The unit decorator must have a string literal as its argument');
            }

            if (![TWBaseTypes.INTEGER, TWBaseTypes.LONG, TWBaseTypes.NUMBER].includes(property.baseType)) {
                this.throwErrorForNode(node, 'The minimum value decorator can only be used with numeric properties.');
            }

            property.aspects.units = argument;
        }

        // Set up the data change aspects if specified
        if (this.hasDecoratorNamed('dataChangeType', node)) {
            const dataChangeArguments = this.argumentsOfDecoratorNamed('dataChangeType', node)!;

            if (dataChangeArguments[0].kind != ts.SyntaxKind.StringLiteral) {
                this.throwErrorForNode(node, 'Data change decorator arguments must be string literals.');
            }
            const dataChangeType = dataChangeArguments[0] as ts.StringLiteral;
            property.aspects.dataChangeType = dataChangeType.text as TWPropertyDataChangeKind;

            if (dataChangeArguments[1]) {
                property.aspects.dataChangeThreshold = dataChangeArguments[1].getText();
            }
        }

        this.runtimePermissions = this.mergePermissionListsForNode([this.runtimePermissions].concat(this.permissionsOfNode(node, node.name.text)), node);

        this.properties.push(property);
    }

    /**
     * Visits a property node that represents an event definition.
     * @param node      The node to visit.
     */
    visitEvent(node: ts.PropertyDeclaration) {
        const event = {} as TWEventDefinition;

        if (node.name.kind != ts.SyntaxKind.Identifier) this.throwErrorForNode(node, 'Event names cannot be computed names.');
        event.name = (node.name as ts.Identifier).text;

        event.description = this.documentationOfNode(node);

        const typeNode = node.type as ts.TypeReferenceNode;
        if (typeNode.typeArguments && typeNode.typeArguments.length) {
            if (typeNode.typeArguments[0].kind == ts.SyntaxKind.LiteralType) {
                event.dataShape = ((typeNode.typeArguments[0] as ts.LiteralTypeNode).literal as ts.StringLiteral).text;
            }
            else {
                event.dataShape = typeNode.typeArguments[0].getText();
            }
        }

        if (this.hasDecoratorNamed('remoteEvent', node)) {
            event.remoteBinding = {
                name: event.name,
                sourceName: ''
            }

            const args = this.argumentsOfDecoratorNamed('remoteEvent', node)!;

            if (!args.length || !args) this.throwErrorForNode(node, 'The remote event decorator must have a single argument.');
            const arg = args[0];

            if (arg.kind != ts.SyntaxKind.StringLiteral) this.throwErrorForNode(node, 'The argument for the remoteEvent decorator must be a string literal');

            event.remoteBinding.sourceName = (arg as ts.StringLiteral).text;
        }

        this.runtimePermissions = this.mergePermissionListsForNode([this.runtimePermissions].concat(this.permissionsOfNode(node, node.name.text)), node);

        this.events.push(event);
    }

    getDescription(node?: ts.JSDoc | ts.JSDocTag): string | undefined {
        if (typeof node?.comment != 'string') {
            return node?.comment?.reduce((acc, val) => acc + val.text, "");
        }

        return node?.comment as string;
    }

    /**
     * Visits a service or subscription definition.
     * @param node      The node to visit.
     */
    visitMethod(node: ts.MethodDeclaration): ts.MethodDeclaration {
        if (this.hasDecoratorNamed('subscription', node) || this.hasDecoratorNamed('localSubscription', node)) {
            return this.visitSubscription(node);
        }

        const service = {aspects: {}} as TWServiceDefinition;
        if (node.modifiers) for (const modifier of node.modifiers) {
            if (modifier.kind == ts.SyntaxKind.AsyncKeyword) {
                service.aspects = {isAsync: true};
            }
        }
        const originalNode = node;

        if (node.name.kind != ts.SyntaxKind.Identifier) this.throwErrorForNode(node, 'Service names cannot be computed property names.');
        service.name = (node.name as ts.Identifier).text;
        service.isAllowOverride = !this.hasDecoratorNamed('final', node);
        service.isOverriden = this.hasDecoratorNamed('override', node);
        service.isLocalOnly = false;
        service.isPrivate = false;
        service.isOpen = false;

        if (this.hasDecoratorNamed('remoteService', node)) {
            // Decorators can't be applied to abstract methods, instead, by convention, the body of the remote
            // service will be ignored

            //if (!node.modifiers) this.throwErrorForNode(node, 'Remote services must be declared abstract.');
            /*const isAbstract = node.modifiers.some(modifier => modifier.kind == ts.SyntaxKind.AbstractKeyword);
            if (!isAbstract) this.throwErrorForNode(node, 'Remote services must be declared abstract.');*/

            const args = this.argumentsOfDecoratorNamed('remoteService', node)!;

            service.remoteBinding = {
                name: service.name,
                sourceName: (args[0] as ts.StringLiteral).text,
                timeout: 0,
                enableQueue: false
            }

            if (args.length == 2) {
                if (args[1].kind != ts.SyntaxKind.ObjectLiteralExpression) {
                    this.throwErrorForNode(node, 'Remote service binding aspects must be specified as an object literal.');
                }

                const aspects = args[1] as ts.ObjectLiteralExpression;
                for (const bindingAspect of aspects.properties) {
                    if (bindingAspect.kind != ts.SyntaxKind.PropertyAssignment) {
                        this.throwErrorForNode(node, 'The aspects of a remote binding decorator must be literals.');
                    }

                    if (bindingAspect.name.kind != ts.SyntaxKind.Identifier) {
                        this.throwErrorForNode(node, 'Computed property names cannot be used in decorator parameters.');
                    }

                    const name = (bindingAspect.name as ts.Identifier).text;

                    // Undefined aspect values should continue to use the default values
                    if (bindingAspect.initializer.kind == ts.SyntaxKind.UndefinedKeyword) continue;

                    switch (name) {
                        case 'enableQueue':
                            service.remoteBinding.enableQueue = bindingAspect.initializer.getText() == 'true';
                            break;
                        case 'timeout':
                            service.remoteBinding.timeout = parseFloat(bindingAspect.initializer.getText());
                            break;
                    }
                }
            }
        }
        else {
            service.code = node.body!.getText();
            if (this.debug) {
                this.debugMethodNodes.add(node);
            }
        }

        // Services must always have a single destructured object argument
        if (node.parameters.length > 1) {
            this.throwErrorForNode(node, 'Services an only have a single destructured parameter.');
        }
        else if (node.parameters.length) {
            service.parameterDefinitions = [];

            const argList = node.parameters[0];
            if (argList.name.kind != ts.SyntaxKind.ObjectBindingPattern) {
                this.throwErrorForNode(node, 'The parameter of a service must be a destructured object.');
            }

            if (!argList.type) {
                this.throwErrorForNode(node, 'The parameter of a service must be typed.');
            }

            if (argList.type.kind != ts.SyntaxKind.TypeLiteral && argList.type.kind != ts.SyntaxKind.TypeReference) {
                this.throwErrorForNode(node, 'The type of a service parameter must be a literal or an interface.');
            }

            let type: ts.TypeLiteralNode;

            if (argList.type.kind == ts.SyntaxKind.TypeReference) {
                const typeChecker = this.program.getTypeChecker();
                const symbol = typeChecker.getTypeAtLocation(argList.type);
                if (symbol) {
                    const literalType = symbol;

                    if (!literalType.isClassOrInterface()) {
                        this.throwErrorForNode(node, 'The type of the service parameter list must be a literal or interface.');
                    }

                    const declarations = literalType.getProperties().flatMap(p => p.declarations).filter(d => !!d) as ts.Declaration[];
                    const typeElements = declarations.filter(d => ts.isTypeElement(d)) as ts.TypeElement[];
                    type = ts.factory.createTypeLiteralNode(typeElements);
                }
                else {
                    this.throwErrorForNode(node, 'The type of the service parameter list cannot be resolved.');
                }
            } else {
               type = argList.type as ts.TypeLiteralNode;
            }

            const args = argList.name as ts.ObjectBindingPattern;
            const argTypes = type;

            if (args.elements.length != argTypes.members.length) {
                this.throwErrorForNode(node, 'All service parameters must be destructured.');
            }

            for (const arg of args.elements) {
                const parameter = {aspects: {}} as TWServiceParameter;
                if (arg.name.kind != ts.SyntaxKind.Identifier) this.throwErrorForNode(node, 'Service parameter names cannot be computed property names.');

                parameter.name = arg.name.getText();
                // Find the accompanying type for this parameter
                const type = argTypes.members.find(t => t.name!.getText() == parameter.name) as ts.PropertySignature;
                if (!type) this.throwErrorForNode(node, `Parameter ${parameter.name} is untyped.`);

                const typeNode = type.type as ts.TypeReferenceNode;

                parameter.aspects.isRequired = !type.questionToken;
                const baseType = TypeScriptPrimitiveTypes.includes(typeNode.kind) ? typeNode.getText() : typeNode.typeName.getText();
                if (!(baseType in TWBaseTypes)) {
                    this.throwErrorForNode(node, `Unknown base type ${baseType} specified for parameter ${parameter.name}.`);
                }
                parameter.baseType = TWBaseTypes[baseType];

                if (arg.initializer) {
                    if (arg.initializer.kind == ts.SyntaxKind.PropertyAccessExpression) {
                        // Const enums need to be resolved early on
                        parameter.aspects.defaultValue = this.constantValueOfExpression(arg.initializer as ts.PropertyAccessExpression);

                        // If the value is not a compile time constant, it is not a valid initializer
                        if (parameter.aspects.defaultValue === undefined) {
                            this.throwErrorForNode(arg, `Unknown initializer for argument.`);
                        }
                    }
                    else if (ts.isNewExpression(arg.initializer) && ts.isIdentifier(arg.initializer.expression) && arg.initializer.expression.escapedText == 'Date') {
                        if (arg.initializer.arguments && arg.initializer.arguments.length == 1 && ts.isStringLiteral(arg.initializer.arguments[0])) {
                            parameter.aspects.defaultValue = new Date(arg.initializer.arguments[0].text).toISOString();
                        }
                        else {
                            this.throwErrorForNode(node, 'Exactly one string literal argument is required when setting Date as default value.');
                        }
                    }
                    else {
                        parameter.aspects.defaultValue = (arg.initializer as ts.LiteralExpression).text || arg.initializer.getText();
                    }
                }

                // INFOTABLE can optionally take the data shape as a type argument
                if (TWBaseTypes[baseType] == 'INFOTABLE') {
                    const typeNode = type.type! as ts.NodeWithTypeArguments;
                    const typeArguments = typeNode.typeArguments;
                    if (typeArguments) {
                        if (typeArguments.length != 1) this.throwErrorForNode(node, `Unknown generics specified for parameter ${parameter.name}: ${parameter.baseType}`);

                        if (typeArguments[0].kind == ts.SyntaxKind.LiteralType) {
                            parameter.aspects.dataShape = ((typeArguments[0] as ts.LiteralTypeNode).literal as ts.StringLiteral).text;
                        }
                        else {
                            parameter.aspects.dataShape = typeArguments[0].getText();
                        }
                    }
                }
                // THINGNAME can optionally take the thing template name and/or thing shape name as a type argument
                else if (TWBaseTypes[baseType] == 'THINGNAME') {
                    const typeNode = type.type! as ts.NodeWithTypeArguments;
                    const typeArguments = typeNode.typeArguments;

                    if (typeArguments && typeArguments.length) {
                        if (typeArguments.length > 2) this.throwErrorForNode(node, `Unknown generics specified for parameter ${parameter.name}: ${parameter.baseType}`);

                        const thingTemplate = typeArguments[0];
                        if (thingTemplate.kind == ts.SyntaxKind.LiteralType) {
                            parameter.aspects.thingTemplate = ((thingTemplate as ts.LiteralTypeNode).literal as ts.StringLiteral).text;
                        }

                        const thingShape = typeArguments[1];
                        if (thingShape && thingShape.kind == ts.SyntaxKind.LiteralType) {
                            parameter.aspects.thingShape = ((thingShape as ts.LiteralTypeNode).literal as ts.StringLiteral).text;
                        }
                    }
                }

                service.parameterDefinitions.push(parameter);
            }

            // Mark this node for replacement
            this.nodeReplacementMap.set(originalNode.parameters[0], ts.factory.createParameterDeclaration(
                undefined,
                undefined,
                undefined,
                ts.factory.createObjectBindingPattern([]),
                undefined,
                undefined,
                undefined
            ));
        }
        else {
            service.parameterDefinitions = [];
        }

        if (!node.type) {
            if (!service.aspects.isAsync) {
                this.throwErrorForNode(originalNode, 'The return type of non-async services must be specified.');
            }
            else {
                service.resultType = {} as TWServiceParameter;
                service.resultType.name = 'result';
                service.resultType.baseType = 'NOTHING';
            }
        }
        else {
            service.resultType = {} as TWServiceParameter;
            service.resultType.name = 'result';

            // Don't care about the return type of async services
            if (service.aspects.isAsync) {
                service.resultType.baseType = 'NOTHING';
                if (node.type) {
                    this.throwErrorForNode(originalNode, 'Async services must not have a return type annotation.');
                }
            }
            else {
                const typeNode = node.type as ts.TypeReferenceNode;

                const baseType = TypeScriptReturnPrimitiveTypes.includes(typeNode.kind) ? typeNode.getText() : typeNode.typeName.getText();
                if (!(baseType in TWBaseTypes)) {
                    this.throwErrorForNode(originalNode, `Unknown base type ${baseType} specified for service return type.`);
                }

                // INFOTABLE can optionally take the data shape as a type argument
                if (TWBaseTypes[baseType] == 'INFOTABLE') {
                    const typeNode = node.type! as ts.NodeWithTypeArguments;
                    service.resultType.aspects = service.resultType.aspects || {};
                    const typeArguments = typeNode.typeArguments;
                    if (typeArguments) {
                        if (typeArguments.length != 1) this.throwErrorForNode(originalNode, `Unknown generics specified for service result: ${service.resultType.baseType}`);
    
                        if (typeArguments[0].kind == ts.SyntaxKind.LiteralType) {
                            service.resultType.aspects.dataShape = ((typeArguments[0] as ts.LiteralTypeNode).literal as ts.StringLiteral).text;
                        }
                        else {
                            service.resultType.aspects.dataShape = typeArguments[0].getText();
                        }
                    }
                }
                // THINGNAME can optionally take the thing template name and/or thing shape name as a type argument, however
                // this is not supported by Thingworx in service results, so it is ignored
                else if (TWBaseTypes[baseType] == 'THINGNAME') {
                    const typeNode = node.type! as ts.NodeWithTypeArguments;
                    service.resultType.aspects = service.resultType.aspects || {};
                }
                service.resultType.baseType = TWBaseTypes[baseType];
            }
        }

        const documentation = (ts as any).getJSDocCommentsAndTags(node) as ts.Node[];

        if (documentation && documentation.length) for (const documentationNode of documentation) {
            // Get the first JSDocComment
            if (documentationNode.kind == ts.SyntaxKind.JSDocComment) {
                // Its text represents the service description
                const JSDocComment = documentationNode as ts.JSDoc;
                service.description = this.getDescription(JSDocComment) || '';

                // The various tags represent the parameter and result type descriptions
                if (JSDocComment.tags) for (const tag of JSDocComment.tags) {
                    // The return tag can be applied directly to the result type
                    if (tag.kind == ts.SyntaxKind.JSDocReturnTag) {
                        service.resultType.description = this.getDescription(tag) || '';
                    }
                    // For parameters it is necessary to match each parameter to its corresponding tag
                    else if (tag.kind == ts.SyntaxKind.JSDocParameterTag) {
                        const parameterTag = tag as ts.JSDocParameterTag;

                        for (const parameter of service.parameterDefinitions) {
                            if (parameterTag.name.getText() == parameter.name) {
                                parameter.description = this.getDescription(parameterTag) || '';
                                break;
                            }
                        }
                    }
                }
            }
        }

        // If this service should be used for deployment, add its endpoint
        if (this.hasDecoratorNamed('deploy', originalNode)) {
            if (this.entityKind != TWEntityKind.Thing) {
                this.throwErrorForNode(originalNode, `The @deploy decorator can only be used on thing services.`);
            }

            this.deploymentEndpoints.push(`Things/${this.exportedName}/Services/${service.name}`);
        }

        this.runtimePermissions = this.mergePermissionListsForNode([this.runtimePermissions].concat(this.permissionsOfNode(node, service.name)), node);

        this.services.push(service);
        return node;
    }

    /**
     * Visits a method declaration that represents a subscription definition.
     * @param node      The node to visit.
     */
    visitSubscription(node: ts.MethodDeclaration): ts.MethodDeclaration {
        const subscription = {
            source: '',
            sourceProperty: ''
        } as TWSubscriptionDefinition;
        subscription.enabled = true;

        if (this.hasDecoratorNamed('subscription', node) && this.hasDecoratorNamed('localSubscription', node)) {
            this.throwErrorForNode(node, 'A method cannot have both the "subscription" and "localSubscription" decorators applied.');
        }

        subscription.name = node.name.getText();

        subscription.description = this.documentationOfNode(node);

        if (this.hasDecoratorNamed('localSubscription', node)) {
            subscription.sourceType = this.entityKind as unknown as TWSubscriptionSourceKind;

            const localArguments = this.argumentsOfDecoratorNamed('localSubscription', node)!;
            for (const arg of localArguments) {
                if (arg.kind != ts.SyntaxKind.StringLiteral) this.throwErrorForNode(node, 'The arguments of the localSubscription decorator must be string literals.');
            }

            subscription.eventName = (localArguments[0] as ts.StringLiteral).text;

            if (subscription.eventName == 'DataChange') {
                subscription.sourceProperty = (localArguments[1] as ts.StringLiteral).text;
            }
        }
        else {
            subscription.sourceType = TWSubscriptionSourceKind.Thing;

            const localArguments = this.argumentsOfDecoratorNamed('subscription', node)!;
            for (const arg of localArguments) {
                if (arg.kind != ts.SyntaxKind.StringLiteral) this.throwErrorForNode(node, 'The arguments of the subscription decorator must be string literals.');
            }

            subscription.source = (localArguments[0] as ts.StringLiteral).text;
            subscription.eventName = (localArguments[1] as ts.StringLiteral).text;

            if (subscription.eventName == 'DataChange') {
                subscription.sourceProperty = (localArguments[2] as ts.StringLiteral).text;
            }
        }

        subscription.code = node.body!.getText();

        const permissions = this.permissionsOfNode(node);
        if (Object.keys(permissions).length) {
            this.throwErrorForNode(node, `Permission decorators are not allowed for subscriptions.`);
        }

        if (this.hasDecoratorNamed('deploy', node)) {
            this.throwErrorForNode(node, `The @deploy decorator cannot be used on subscriptions.`);
        }

        if (this.debug) {
            this.debugMethodNodes.add(node);
        }

        this.subscriptions.push(subscription);
        return node;
    }

    visitMethodNode(node: ts.Node): ts.Node | undefined {
        node = ts.visitEachChild(node, n => this.visitMethodNode(n), this.context);

        // If the node has been marked for replacement, return its replacement directly
        if (this.nodeReplacementMap.get(node)) {
            return this.nodeReplacementMap.get(node)!;
        }

        switch (node.kind) {
            case ts.SyntaxKind.AsyncKeyword:
                return;
            case ts.SyntaxKind.PropertyAssignment:
                const n1 = node as ts.PropertyAssignment;
                //return n1;
                return ts.factory.createPropertyAssignment(n1.name, this.commaCheckpointExpression(n1.initializer));
            case ts.SyntaxKind.VariableDeclaration:
                const n2 = node as ts.VariableDeclaration;
                if (n2.initializer) {
                    return ts.factory.createVariableDeclaration(n2.name, n2.exclamationToken, n2.type, this.commaCheckpointExpression(n2.initializer));
                }
                break;
            case ts.SyntaxKind.IfStatement:
                const n4 = node as ts.IfStatement;
                return ts.factory.createIfStatement(this.commaCheckpointExpression(n4.expression), n4.thenStatement, n4.elseStatement);
            case ts.SyntaxKind.ExpressionStatement:
                const n5 = node as ts.ExpressionStatement;
                return ts.factory.createExpressionStatement(this.commaCheckpointExpression(n5.expression, n5));
            case ts.SyntaxKind.WhileStatement:
                const n6 = node as ts.WhileStatement;
                return ts.factory.createWhileStatement(this.commaCheckpointExpression(n6.expression), n6.statement);
            case ts.SyntaxKind.ForStatement:
                const n7 = node as ts.ForStatement;
                return ts.factory.createForStatement(
                    n7.initializer,
                    n7.condition ? this.commaCheckpointExpression(n7.condition) : n7.condition,
                    n7.incrementor ? this.commaCheckpointExpression(n7.incrementor) : n7.incrementor,
                    n7.statement
                );
            case ts.SyntaxKind.DoStatement:
                const n8 = node as ts.DoStatement;
                return ts.factory.createDoStatement(n8.statement, this.commaCheckpointExpression(n8.expression));
            case ts.SyntaxKind.BinaryExpression:
                const n9 = node as ts.BinaryExpression;
                if (n9.operatorToken.kind == ts.SyntaxKind.EqualsToken) {
                    return ts.factory.createBinaryExpression(n9.left, n9.operatorToken, this.commaCheckpointExpression(n9.right));
                }
                break;
            case ts.SyntaxKind.ReturnStatement:
                const n10 = node as ts.ReturnStatement;
                return ts.factory.createReturnStatement(n10.expression ? this.commaCheckpointExpression(n10.expression) : this.commaCheckpointExpression(undefined, n10));
            case ts.SyntaxKind.CallExpression:
                const n11 = node as ts.CallExpression;
                if (n11.parent) {
                    switch (n11.parent.kind) {
                        case ts.SyntaxKind.PropertyDeclaration:
                        case ts.SyntaxKind.VariableDeclaration:
                        case ts.SyntaxKind.ExpressionStatement:
                            return n11;
                        case ts.SyntaxKind.BinaryExpression:
                            const parent = n11.parent as ts.BinaryExpression;
                            if (parent.right == n11 && parent.operatorToken.kind == ts.SyntaxKind.EqualsToken) {
                                return n11;
                            }
                    }
                }
                return this.commaCheckpointExpression(n11);
            case ts.SyntaxKind.PropertyAccessExpression:
                // Inline constant values where possible. In debug builds this will skip the regular visit method
                // TODO: These should be combined into one
                const constantValue = this.constantValueOfExpression(node as ts.PropertyAccessExpression);
    
                if (typeof constantValue == 'string') {
                    return ts.factory.createStringLiteral(constantValue);
                }
                else if (typeof constantValue == 'number') {
                    return ts.factory.createNumericLiteral(constantValue.toString());
                }
                break;
            case ts.SyntaxKind.Identifier:
                const n12 = node as ts.Identifier;
                if (n12.text == '__d') {
                    this.throwErrorForNode(node, `The "__d" identifier is reserved for the debugger in debug builds.`);
                }
        }

        return node;
    }

    /**
     * A counter that keeps track of each breakpoint location that was added.
     */
    private _debugBreakpointCounter = 0;

    /**
     * Returns an expression that represents a debug checkpoint.
     * @param ID            A unique ID that identifies this expression.
     * @returns             A typescript expression.
     */
    debugCheckpointExpression(ID: string): ts.Expression {
        // Essentially returns __d.checkpoint(ID)
        return ts.factory.createCallExpression(
            ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('__d'), 'checkpoint'),
            [], 
            [ts.factory.createStringLiteral(ID, true)]
        );
    }

    /**
     * Creates a comma expression that adds a debug checkpoint to the given expression.
     * Also stores information about the breakpoint location that was just added.
     * @param expression        The expression to modify. If `undefined`, a new expression will be returned.
     * @param targetNode        When `expression` is `undefined`, the node from which to get the position information.
     * @returns                 A typescript expression.
     */
    commaCheckpointExpression(expression: ts.Expression | undefined, targetNode?: ts.Node): ts.Expression {
        this.initDebugConfiguration();

        this._debugBreakpointCounter++;

        if (!expression && !targetNode) {
            throw new Error('Unable to create a breakpoint location without a context');
        }

        let positionNode: ts.Node | undefined = expression;

        if (!positionNode || positionNode.pos == -1 || positionNode.end == -1) {
            // If the expression is a synthetic node, attempt to use the target node instead
            if (targetNode) {
                positionNode = targetNode;
            }
        }

        // If the node is a synthetic node, try to position the breakpoint at the closest non-synthetic parent
        while (positionNode) {
            if (positionNode.pos == -1 || positionNode.end == -1) {
                positionNode = positionNode.parent;
            }
            else {
                break;
            }
        }

        // Create an ID for this breakpoint location
        const ID = this.filename + '-' + this._debugBreakpointCounter;

        if (!positionNode) {
            // If position information cannot be determined, don't add a breakpoint
            if (expression) {
                return expression;
            }
            else {
                return ts.factory.createOmittedExpression();
            }
        }

        // Store information about the breakpoint's location
        const startPosition = positionNode.getStart(this.sourceFile, false);
        const endPosition = positionNode.getEnd();

        const start = ts.getLineAndCharacterOfPosition(this.sourceFile!, startPosition);
        const end = ts.getLineAndCharacterOfPosition(this.sourceFile!, endPosition);

        // NOTE: Lines and characters are 0-indexed by the compiler, but 1-indexed by the debugger
        const breakpoint: Breakpoint = {
            line: start.line + 1,
            column: start.character + 1,
            endLine: end.line + 1,
            endColumn: end.character + 1,
            locationID: ID
        };

        // If a breakpoint at this location already exists, don't add a new one
        if (this.breakpointLocations[breakpoint.line]) {
            if (this.breakpointLocations[breakpoint.line][breakpoint.column!]) {
                if (expression) {
                    return expression;
                }
                else {
                    return ts.factory.createOmittedExpression();
                }
            }
        }

        this.breakpointLocations[breakpoint.line] = this.breakpointLocations[breakpoint.line] || {};
        this.breakpointLocations[breakpoint.line][breakpoint.column!] = true;

        this.breakpoints.push(breakpoint);

        if (expression) {
            return ts.factory.createCommaListExpression([this.debugCheckpointExpression(ID), expression]);
        }
        else {
            return this.debugCheckpointExpression(ID);
        }
    }

    /**
     * Returns the emit result of the body of the specified function declaration. This will strip
     * out the surrounding braces.
     * @param node  The function declaration.
     * @return      The emit result.
     */
    transpiledBodyOfFunctionDelcaration(node: ts.FunctionDeclaration): string {
        const result = ts.createPrinter().printNode(ts.EmitHint.Unspecified, node.body!, (this as any).source);
        return result.substring(1, result.length - 1);
    }

    /**
     * Returns the emit result of the body of the specified function declaration and inlines any helpers necessary
     * for the method to function.
     * @param node  The function declaration.
     * @return      The emit result, with added helpers as necessary.
     */
    transpiledBodyOfThingworxMethod(node: ts.FunctionDeclaration): string {
        // If no helpers are used, just return the compiled method
        const helpers = ts.getEmitHelpers((this as any).source);
        // Note that the __extends helper is always included to implement classes; if it is the only one used, skip searching
        if (!helpers || !helpers.length || (helpers.length == 1 && helpers[0].name == 'typescript:extends')) {
            return this.transpiledBodyOfFunctionDelcaration(node);
        }

        // Some helpers depend on others only via their body text and not via the
        // generated js code
        // This is something I may need to keep up to date.
        // TODO: Need a way to automate this.
        const dependencies = {
            'typescript:read': ['typescrript:values'],
            'typescript:spread': ['typescript:read'],
            'typescript:asyncGenerator': ['typescript:await'],
            'typescript:asyncDelegator': ['typescript:await'],
            'typescript:asyncValues': ['typescript:values']
        }

        // Some helpers can use a little help to work better with thingworx
        // This contains a few replacements for some of the helpers
        const codeMap = {
            // The read helper requires symbol support, but it can work for thingworx with just
            // the __values helper replacing symbols
            'typescript:read': `var __read = (this && this.__read) || function (o, n) {
                var m = typeof Symbol === "function" && o[Symbol.iterator];
                var i = (m ? m.call(o) : __values(o)), r, ar = [], e;
                try {
                    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
                }
                catch (error) { e = { error: error }; }
                finally {
                    try {
                        if (r && !r.done && (m = i["return"])) m.call(i);
                    }
                    finally { if (e) throw e.error; }
                }
                return ar;
            };`
        }

        // Otherwise need to look up usages for each helper and inline it
        const helpersToInline = new Set<ts.EmitHelper>();
        const visitor = (node: ts.Node) => {
            // All helpers so far are global functions, so need to look for function invocations
            if (node.kind == ts.SyntaxKind.CallExpression) {
                const callNode = node as ts.CallExpression;
                
                if (callNode.expression.kind == ts.SyntaxKind.Identifier) {
                    // A helper is considered to be used if the call expression is an identifier
                    // whose text matches the "import name" of the helper
                    const callIdentifier = (callNode.expression as ts.Identifier).text;

                    for (const helper of helpers) {
                        if ((helper as any).importName == callIdentifier) {
                            // If found, add the helper to a set that will be added to the method body directly
                            helpersToInline.add(helper);
                        }
                    }
                }
            }
            node.forEachChild(visitor);
        }
        node.forEachChild(visitor);

        // Need to ensure that all helper dependencies exist in the set
        let size;
        do {
            size = helpersToInline.size;
            if (helpersToInline.size) for (const helper of [...helpersToInline]) {
                if (dependencies[helper.name]) for (const dependency of dependencies[helper.name]) {
                    for (const rootHelper of helpers) {
                        if (rootHelper.name == dependency) helpersToInline.add(rootHelper);
                    }
                }
            }
        } while (helpersToInline.size != size)

        // After identifying the helpers, join their text and add them to the transpiled method body
        return [...helpersToInline].map(helper => codeMap[helper.name] || helper.text).join('\n\n') + this.transpiledBodyOfFunctionDelcaration(node);
    }

    /**
     * Invoked during the after phase. Visits function definitions and identifies which represent service
     * implementations.
     * @param node      The node to visit.
     */
    visitTranspiledMethod(node: any) {
        // Ensure that this is a top-level method
        // Find the original node
        let originalNode = node.original;
        while (originalNode.original) {
            originalNode = originalNode.original;
        }

        const methodNode = originalNode as ts.MethodDeclaration;

        const name = (methodNode.name as ts.Identifier).text;
        if (name) {
            // The parent node should be the classNode whose parent should be the source file
            if (!methodNode.parent) return;
            if (methodNode.parent.kind != ts.SyntaxKind.ClassDeclaration) return;

            const classDeclaration = methodNode.parent;
            if (!classDeclaration.parent) return;
            if (classDeclaration.parent.kind != ts.SyntaxKind.SourceFile) return;
            
            if (!classDeclaration.name) return;
            const className = classDeclaration.name!.text;
            if (!className) return;

            const store = this.store || global._TWEntities;
            const entity = store[className];
            if (!entity) return;

            for (const service of entity.services) {
                if (service.name == name) {
                    //const body = ts.createPrinter().printNode(ts.EmitHint.Unspecified, node.body, (this as any).source);
                    service.code = this.transpiledBodyOfThingworxMethod(node);

                    // In debug mode, additional code is added to activate and deactivate the debugger
                    if (this.debug) {
                        service.code = `
const __d = BMDebuggerRuntime.localDebugger(); 
const __dLogger = __d.getLogger();
__d.retainForService({name: ${JSON.stringify(service.name)}, filename: ${JSON.stringify(entity.sourceFile?.fileName)}, scopeStack: []}); 
try { 
    var result = (function (logger) {${service.code}}).apply(me, [__dLogger]);
} 
finally { 
    __d.release(); 
}`;
                    }
                    else {
                        service.code = `var result = (function () {${service.code}}).apply(me)`;
                    }
                }
            }
            for (const subscription of entity.subscriptions) {
                if (subscription.name == name) {
                    if (this.debug) {
                        // In debug builds, an applied anonymous function is used because this is no longer transformed to me
                        subscription.code = this.transpiledBodyOfThingworxMethod(node);
                        subscription.code = `
const __d = BMDebuggerRuntime.localDebugger(); 
const __dLogger = __d.getLogger();
__d.retainForService({name: ${JSON.stringify(subscription.name)}, filename: ${JSON.stringify(entity.sourceFile?.fileName)}, scopeStack: []}); 
try { 
    (function (logger) {${subscription.code}}).apply(me, [__dLogger]);
} 
finally { 
    __d.release(); 
}`;
                    }
                    else {
                        //const body = ts.createPrinter().printNode(ts.EmitHint.Unspecified, node.body, (this as any).source);
                        subscription.code = this.transpiledBodyOfThingworxMethod(node);
                    }
                }
            }
        }
    }

    /**
     * Visits a class expression that represents a configuration table definition.
     * @param node      The node to visit.
     */
    visitConfigurationTablesDefinition(node: ts.ClassExpression) {
        if (node.name) this.throwErrorForNode(node, `The argument for the @ConfigurationTables decorator must be an anonymous class.`);
        if (node.heritageClauses) this.throwErrorForNode(node, `The argument for the @ConfigurationTables decorator must be a root class.`);

        for (const member of node.members) {
            if (member.kind == ts.SyntaxKind.MethodDeclaration) this.throwErrorForNode(node, `The @ConfigurationTables class cannot contain methods.`);

            if (!member.name || member.name.kind != ts.SyntaxKind.Identifier) this.throwErrorForNode(member, `Configuration table names cannot be computed.`);

            const table: TWConfigurationTable = {
                category: '',
                description: '',
                'isHidden': false,
                name: member.name.text,
                dataShapeName: '',
                isMultiRow: false
            };

            const property = member as ts.PropertyDeclaration;

            const type = property.type as ts.TypeReferenceNode;
            if (!type) this.throwErrorForNode(member, `Configuration table properties must be typed as either "Table" or "MultiRowTable".`);

            if (property.type!.kind != ts.SyntaxKind.TypeReference) {
                this.throwErrorForNode(member, `Configuration table properties must be typed as either "Table" or "MultiRowTable".`);
            }

            if (type.typeName.getText() == 'Table') {
                table.isMultiRow = false;
            }
            else if (type.typeName.getText() == 'MultiRowTable') {
                table.isMultiRow = true;
            }
            else {
                this.throwErrorForNode(member, `Configuration table properties must be typed as either "Table" or "MultiRowTable".`);
            }

            if (!type.typeArguments || type.typeArguments.length != 1) this.throwErrorForNode(member, `Configuration table properties must have one type parameter representing the data shape name.`);

            const typeArgument = type.typeArguments[0];
            if (typeArgument.kind == ts.SyntaxKind.TypeReference) {
                table.dataShapeName = (typeArgument as ts.TypeReferenceNode).typeName.getText();
            }
            else if (typeArgument.kind == ts.SyntaxKind.LiteralType) {
                table.dataShapeName = ((typeArgument as ts.LiteralTypeNode).literal as ts.StringLiteral).text;
            }
            else {
                this.throwErrorForNode(member, `The configuration table type argument must be a data shape class reference or exported name.`);
            } 
            

            this.configurationTableDefinitions.push(table);
        }
    }

    /**
     * Set to `true` when the debug configuration table is created.
     */
    _debugConfigurationInitialized = false;

    /**
     * For debug builds with at least one breakpoint location, creates a configuration table
     * that stores various debug information.
     */
    initDebugConfiguration() {
        if (!USE_DEBUG_CONFIGURATION_TABLE) return;

        if (this._debugConfigurationInitialized) return;
        this._debugConfigurationInitialized = true;

        // Add a configuration table for the breakpoint locations
        this.configurationTableDefinitions.push({
            isHidden: true,
            dataShapeName: 'BMDebuggerBreakpointLocation',
            isMultiRow: true,
            category: 'debug',
            description: 'Contains information about the available breakpoint locations in this entity\'s source file',
            name: '_BMDebuggerBreakpointLocations'
        });

        // Add a configuration table for additional metadata
        this.configurationTableDefinitions.push({
            isHidden: true,
            dataShapeName: 'BMDebugMetadata',
            isMultiRow: false,
            category: 'debug',
            description: 'Contains information that is useful for debugging',
            name: '_BMDebugMetadata'
        })
    }

    /**
     * Visits an object literal expression that represents a configuration table.
     * @param node      The node to visit.
     */
    visitConfiguration(node: ts.ObjectLiteralExpression) {
        this.configuration = {};

        for (const member of node.properties) {
            if (member.kind == ts.SyntaxKind.MethodDeclaration) this.throwErrorForNode(node, `The @config object cannot contain methods.`);

            if (member.kind != ts.SyntaxKind.PropertyAssignment) this.throwErrorForNode(node, `The @config object must contain only property assignments.`);

            if (!member.name || member.name.kind != ts.SyntaxKind.Identifier) this.throwErrorForNode(member, `Configuration table names cannot be computed.`);

            const name = member.name.text;

            const property = member as ts.PropertyAssignment;

            const table: TWInfoTable = {
                dataShape: {
                    fieldDefinitions: {}
                },
                rows: []
            };

            switch (property.initializer.kind) {
                case ts.SyntaxKind.ObjectLiteralExpression:
                    table.rows.push(this.extractObjectLiteral(property.initializer as ts.ObjectLiteralExpression));
                    break;
                case ts.SyntaxKind.ArrayLiteralExpression:
                    const array = property.initializer as ts.ArrayLiteralExpression;
                    for (const element of array.elements) {
                        if (element.kind != ts.SyntaxKind.ObjectLiteralExpression) {
                            this.throwErrorForNode(array, 'Configuration rows must be object literals.');
                        }
                        table.rows.push(this.extractObjectLiteral(element as ts.ObjectLiteralExpression));
                    }
                    break;
                default:
                    this.throwErrorForNode(property, 'Configuration properties must be array or object literals.');
            }

            // Extract the data shape from the first row
            const row = table.rows[0];
            for (const key of Object.keys(row)) {
                table.dataShape.fieldDefinitions[key] = {
                    name: key,
                    description: '',
                    aspects: {},
                    baseType: TWBaseTypes[typeof row[key]],
                    ordinal: 0
                }
            }

            this.configuration[name] = table;
        }
    }

    /**
     * Extracts the given object literal expression to an equivalent object literal.
     * @param literal   The literal to extract.
     * @returns         An object.
     */
    private extractObjectLiteral(literal: ts.ObjectLiteralExpression): Record<string, unknown> {
        const result: Record<string, unknown> = {};

        for (const member of literal.properties) {
            if (member.kind != ts.SyntaxKind.PropertyAssignment) {
                this.throwErrorForNode(literal, 'Configuration fields must be property assignments');
            }
            if (!member.name || member.name.kind != ts.SyntaxKind.Identifier) this.throwErrorForNode(member, `Configuration field names cannot be computed.`);

            const name = member.name.text;

            switch (member.initializer.kind) {
                case ts.SyntaxKind.TrueKeyword:
                    result[name] = true;
                    break;
                case ts.SyntaxKind.FalseKeyword:
                    result[name] = false;
                    break;
                case ts.SyntaxKind.StringLiteral:
                    result[name] = (member.initializer as ts.StringLiteral).text;
                    break;
                case ts.SyntaxKind.NumericLiteral:
                    result[name] = parseFloat((member.initializer as ts.NumericLiteral).text);
                    break;
                case ts.SyntaxKind.PropertyAccessExpression:
                    const constant = this.constantValueOfExpression(member.initializer);
                    if (constant === undefined) {
                        this.throwErrorForNode(member, `Configuration field values must be compile time constants.`)
                    }
                    result[name] = constant;
                    break;
                default:
                    this.throwErrorForNode(member, `Configuration field values can only be literal primitives`);
            }
        }

        return result;
    }

    private XMLRepresentationOfInfotable(infotable: TWInfoTable, withOrdinals = false) {
        return {
            $: {} as Record<string, string>,
            DataShape: [
                {
                    FieldDefinitions: [
                        {
                            FieldDefinition: Object.values(infotable.dataShape.fieldDefinitions).map(f => {
                                const fieldDefinition: any = {
                                    $: {
                                        baseType: f.baseType,
                                        description: f.description,
                                        name: f.name
                                    }
                                };

                                if (withOrdinals) {
                                    fieldDefinition.$.ordinal = f.ordinal
                                }

                                return fieldDefinition;
                            })
                        }
                    ]
                }
            ],
            Rows: [
                {
                    Row: infotable.rows
                }
            ]
        };
    }

    /**
     * Returns the XML entity representation of a thing that is used to initialize the project's
     * debug information when the project is deployed.
     * @param entityName    The name to use for the entity.
     * @param transformers  The transformers from which to obtain debug information.
     * @param projectName   The name of the project to add to the entity.
     */
    static projectDebugThingXML(entityName: string, transformers: TWThingTransformer[], projectName: string = ''): string {
        // Filter the list to only include transformers with debug information
        const debugTransformers = transformers.filter(t => t.filename && t.breakpoints.length);
        const debugData: {[key: string]: Breakpoint[]} = {};

        // Merge the list of breakpoints into a map organized per file
        debugTransformers.forEach(t => {
            debugData[t.filename!] = t.breakpoints;
        });

        // Return the entity
        return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <Entities>
          <Things>
            <Thing name="${entityName}" projectName="${projectName}" tags="Debugger:DebugInfo" enabled="true" identifier="" published="false" thingTemplate="GenericThing" valueStream="">
              <Owner name="Administrator" type="User"/>
              <ThingShape>
                <PropertyDefinitions>
                    <PropertyDefinition
                    aspect.cacheTime="0.0"
                    aspect.dataChangeThreshold="0.0"
                    aspect.dataChangeType="VALUE"
                    aspect.defaultValue=""
                    aspect.isLogged="false"
                    aspect.isPersistent="true"
                    baseType="STRING"
                    category=""
                    description="Contains debug information for the '${projectName}' project."
                    isLocalOnly="false"
                    name="debugInformation"
                    ordinal="0"></PropertyDefinition>
                </PropertyDefinitions>
                <ServiceDefinitions/>
                <ServiceImplementations/>
                <EventDefinitions/>
                <Subscriptions>
                  <Subscription name="__globalBlock__0" description="Global code block generated by TypeScript." enabled="true" eventName="ThingStart" sourceType="Thing">
                    <ServiceImplementation description="" handlerName="Script" name="__globalBlock__0">
                      <ConfigurationTables>
                        <ConfigurationTable description="Script" isMultiRow="false" name="Script" ordinal="0">
                          <DataShape>
                            <FieldDefinitions>
                              <FieldDefinition baseType="STRING" description="code" name="code" ordinal="0"/>
                            </FieldDefinitions>
                          </DataShape>
                          <Rows>
                            <Row>
                              <code>
        BMDebuggerRuntime.registerExtensionPackage(${JSON.stringify(entityName)});
                              </code>
                            </Row>
                          </Rows>
                        </ConfigurationTable>
                      </ConfigurationTables>
                    </ServiceImplementation>
                  </Subscription>
                </Subscriptions>
              </ThingShape>
              <ThingProperties>
                <debugInformation>
                    <Value>
                        <![CDATA[${JSON.stringify(debugData)}]]>
                    </Value>
                    <Timestamp>1970-01-01T02:00:00.000+02:00</Timestamp>
                    <Quality>UNKNOWN</Quality>
                </debugInformation>
              </ThingProperties>
              <PropertyBindings/>
              <RemotePropertyBindings/>
              <RemoteServiceBindings/>
              <RemoteEventBindings/>
            </Thing>
          </Things>
        </Entities>`;
    }

    /**
     * Returns the XML entity representation of the file processed by this transformer.
     * @return      An XML.
     */
    toXML(): string {
        const XML = {} as any;

        if (this.entityKind == TWEntityKind.DataShape) return this.toDataShapeXML();

        if (this.entityKind == TWEntityKind.UserList) return this.toUserListXML();

        if (this.entityKind == TWEntityKind.Organization) return this.toOrganizationXML();

        const collectionKind = this.entityKind + 's';
        const entityKind = this.entityKind;
        
        XML.Entities = {};
        XML.Entities[collectionKind] = [];
        XML.Entities[collectionKind][0] = {};
        XML.Entities[collectionKind][0][entityKind] = [{$:{}}];
        
        const entity = XML.Entities[collectionKind][0][entityKind][0];

        entity.$.name = this.exportedName;

        if (this.projectName) entity.$.projectName = this.projectName;

        // Tags are yet unsupported
        entity.$.tags = '';

        if (this.editable) entity.$['aspect.isEditableExtensionObject'] = this.editable;
        if (this.description) entity.$.description = this.description;

        if (this.entityKind == TWEntityKind.Thing) {
            entity.$.enabled = true;
            entity.$.identifier = this.identifier || '';
            entity.$.published = this.published || false;
        }

        if (this.entityKind != TWEntityKind.ThingShape) {
            entity.$[this.entityKind == TWEntityKind.Thing ? 'thingTemplate' : 'baseThingTemplate'] = this.thingTemplateName || 'GenericThing';
            entity.$.valueStream = this.valueStream || '';
        }

        entity.Owner = [{$: {name: 'Administrator', type: 'User'}}];

        // This level of indirection is only applicable for non-thing shapes
        if (this.entityKind != TWEntityKind.ThingShape) {
            entity.ThingShape = [{}];
        }

        const shape = this.entityKind == TWEntityKind.ThingShape ? entity : entity.ThingShape[0];
        
        // **********************************  PROPERTY DEFINITIONS  **********************************
        shape.PropertyDefinitions = [{}];
        shape.PropertyDefinitions[0].PropertyDefinition = [];
        const propertyDefinitions = shape.PropertyDefinitions[0].PropertyDefinition as any[];

        entity.PropertyBindings = [{PropertyBinding: []}];
        const propertyBindings = entity.PropertyBindings[0].PropertyBinding as any[];

        entity.RemotePropertyBindings = [{RemotePropertyBinding: []}];
        const remotePropertyBindings = entity.RemotePropertyBindings[0].RemotePropertyBinding as any[];

        for (const property of this.properties) {
            const propertyDefinition = {$:{}} as any;
            
            for (const key in property) {
                if (key == 'aspects' || key == 'remoteBinding' || key == 'localBinding') continue;

                propertyDefinition.$[key] = property[key]
            }

            if (property.aspects) {
                for (const key in property.aspects) {
                    propertyDefinition.$['aspect.' + key] = property.aspects[key];
                }
            }

            propertyDefinitions.push(propertyDefinition);

            if (property.remoteBinding) {
                const remoteBinding = {$:{}} as any;

                for (const key in property.remoteBinding) {
                    if (key == 'aspects') continue;
                    remoteBinding.$[key] = property.remoteBinding[key];
                }

                if (property.remoteBinding.aspects) for (const key in property.remoteBinding.aspects) {
                    remoteBinding.$['aspect.' + key] = property.remoteBinding.aspects[key];
                }

                remotePropertyBindings.push(remoteBinding);
            }

            if (property.localBinding) {
                const localBinding = {$:{}} as any;

                for (const key in property.localBinding) {
                    if (key == 'aspects') continue;
                    localBinding.$[key] = property.localBinding[key];
                }

                if (property.localBinding.aspects) for (const key in property.localBinding.aspects) {
                    localBinding.$['aspect.' + key] = property.localBinding.aspects[key];
                }

                propertyBindings.push(localBinding);
            }

        }
        
        // **********************************  SERVICE DEFINITIONS  **********************************
        shape.ServiceDefinitions = [{ServiceDefinition: []}];
        const serviceDefinitions = shape.ServiceDefinitions[0].ServiceDefinition as any[];

        shape.ServiceImplementations = [{ServiceImplementation: []}];
        const serviceImplementations = shape.ServiceImplementations[0].ServiceImplementation as any[];

        entity.RemoteServiceBindings = [{RemoteServiceBinding: []}];
        const remoteServiceBindings = entity.RemoteServiceBindings[0].RemoteServiceBinding as any[];

        for (const service of this.services) {
            // Overriden services only have an implementation
            if (!service.isOverriden) {
                // **********************************  SERVICE DETAILS  **********************************
                const serviceDefinition = {$:{}} as any;
                
                for (const key in service) {
                    if (key == 'aspects' || key == 'remoteBinding' || key == 'code' || key == 'parameterDefinitions' || key == 'resultType' || key == 'isOverriden') continue;
    
                    serviceDefinition.$[key] = service[key];
                }
    
                if (service.aspects) {
                    for (const key in service.aspects) {
                        serviceDefinition.$['aspect.' + key] = service.aspects[key];
                    }
                }
    
                // **********************************  SERVICE RESULT  **********************************
                serviceDefinition.ResultType = [{$:{}}];
                const resultType = serviceDefinition.ResultType[0];
                for (const key in service.resultType) {
                    if (key == 'aspects') continue;
    
                    resultType.$[key] = service.resultType[key];
                }
    
                if (service.resultType.aspects) for (const key in service.resultType.aspects) {
                    resultType.$['aspect.' + key] = service.resultType.aspects[key];
                }
    
                // **********************************  SERVICE PARAMETERS  **********************************
    
                serviceDefinition.ParameterDefinitions = [{FieldDefinition: []}];
                const parameterDefinitions = serviceDefinition.ParameterDefinitions[0].FieldDefinition as any[];
    
                for (const parameter of service.parameterDefinitions) {
                    const parameterDefinition = {$:{}};
    
                    for (const key in parameter) {
                        if (key == 'aspects') continue;
        
                        parameterDefinition.$[key] = parameter[key];
                    }
        
                    if (parameter.aspects) for (const key in parameter.aspects) {
                        parameterDefinition.$['aspect.' + key] = parameter.aspects[key];
                    }
    
                    parameterDefinitions.push(parameterDefinition);
                }
    
                serviceDefinitions.push(serviceDefinition);
            }

            // **********************************  SERVICE IMPLEMENTATION  **********************************
            if (service.remoteBinding) {
                const remoteBinding = {$:{}} as any;

                for (const key in service.remoteBinding) {
                    if (key == 'aspects') continue;
                    remoteBinding.$[key] = service.remoteBinding[key];
                }

                // Service remote bindings don't have aspects

                remoteServiceBindings.push(remoteBinding);
            }
            else {
                // This JSON is just how an infotable appears after conversion from an XML format - copy-pasted from an export
                const implementation = {
                    $: {
                        description: "",
                        handlerName: "Script",
                        name: service.name
                    },
                    ConfigurationTables: [
                        {
                            ConfigurationTable: [
                                {
                                    $: {
                                        description: "Script",
                                        isMultiRow: "false",
                                        name: "Script",
                                        ordinal: "0"
                                    },
                                    DataShape: [
                                        {
                                            FieldDefinitions: [
                                                {
                                                    FieldDefinition: [
                                                        {
                                                            $: {
                                                                baseType: "STRING",
                                                                description: "code",
                                                                name: "code",
                                                                ordinal: "0"
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ],
                                    Rows: [
                                        {
                                            Row: [
                                                {
                                                    code: [service.code]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                };
                
                serviceImplementations.push(implementation);
            }
        }


        // **********************************  EVENT DEFINITIONS  **********************************
        shape.EventDefinitions = [{EventDefinition: []}];
        const eventDefinitions = shape.EventDefinitions[0].EventDefinition as any[];

        entity.RemoteEventBindings = [{RemoteEventBinding: []}];
        const remoteEventBindings = entity.RemoteEventBindings[0].RemoteEventBinding as any[];

        for (const event of this.events) {
            const eventDefinition = {$:{}} as any;
            
            for (const key in event) {
                if (key == 'remoteBinding') continue;

                eventDefinition.$[key] = event[key];
            }

            eventDefinitions.push(eventDefinition);

            if (event.remoteBinding) {
                const remoteBinding = {$:{}} as any;

                for (const key in event.remoteBinding) {
                    if (key == 'aspects') continue;
                    remoteBinding.$[key] = event.remoteBinding[key];
                }

                remoteEventBindings.push(remoteBinding);
            }
        }

        // **********************************  SUBSCRIPTIONS  **********************************
        shape.Subscriptions = [{Subscription: []}];
        const subscriptions = shape.Subscriptions[0].Subscription;

        for (const subscription of this.subscriptions) {
            const subscriptionDefinition = {$:{}} as any;
            
            for (const key in subscription) {
                if (key == 'code') continue;

                subscriptionDefinition.$[key] = subscription[key];
            }

            subscriptionDefinition.ServiceImplementation = [];
            subscriptionDefinition.ServiceImplementation[0] = {
                $: {
                    description: "",
                    handlerName: "Script",
                    name: subscription.name
                },
                ConfigurationTables: [
                    {
                        ConfigurationTable: [
                            {
                                $: {
                                    description: "Script",
                                    isMultiRow: "false",
                                    name: "Script",
                                    ordinal: "0"
                                },
                                DataShape: [
                                    {
                                        FieldDefinitions: [
                                            {
                                                FieldDefinition: [
                                                    {
                                                        $: {
                                                            baseType: "STRING",
                                                            description: "code",
                                                            name: "code",
                                                            ordinal: "0"
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                Rows: [
                                    {
                                        Row: [
                                            {
                                                code: [subscription.code]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };

            subscriptions.push(subscriptionDefinition);
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
        
        if (this.runtimePermissions.runtimeInstance) {
            entity.InstanceRunTimePermissions = [{Permissions: []}];

            for (const resource in this.runtimePermissions.runtimeInstance) {
                const permissionDefinition = {$: {resourceName: resource}};

                for (const permission in this.runtimePermissions.runtimeInstance[resource]) {
                    const principals = this.runtimePermissions.runtimeInstance[resource][permission].map(p => ({$: {name: p.principal, type: p.type, isPermitted: p.isPermitted}}));
                    permissionDefinition[permission] = [{Principal: principals}];
                }

                entity.InstanceRunTimePermissions[0].Permissions.push(permissionDefinition);
            }
        }

        // **********************************  VISIBILITY  **********************************
        if (this.visibilityPermissions.length) {
            entity.VisibilityPermissions = [{Visibility: []}];
            entity.VisibilityPermissions[0].Visibility[0] = {Principal: this.visibilityPermissions.map(p => ({$: p}))};
        }
        
        if (this.instanceVisibilityPermissions.length) {
            entity.InstanceVisibilityPermissions = [{Visibility: []}];
            entity.InstanceVisibilityPermissions[0].Visibility[0] = {Principal: this.instanceVisibilityPermissions.map(p => ({$: p}))};
        }

        // **********************************  GLOBAL CODE  *************************************
        for (let i = 0; i < this.globalBlocks.length; i++) {
            const globalBlock = this.globalBlocks[i];
            const subscriptionDefinition = {$:{
                name: `__globalBlock__` + i,
                description: 'Global code block generated by TypeScript.',
                enabled: true,
                eventName: 'ThingStart',
                sourceType: TWSubscriptionSourceKind.Thing
            }} as any;

            subscriptionDefinition.ServiceImplementation = [];
            subscriptionDefinition.ServiceImplementation[0] = {
                $: {
                    description: "",
                    handlerName: "Script",
                    name: `__globalBlock__` + i
                },
                ConfigurationTables: [
                    {
                        ConfigurationTable: [
                            {
                                $: {
                                    description: "Script",
                                    isMultiRow: "false",
                                    name: "Script",
                                    ordinal: "0"
                                },
                                DataShape: [
                                    {
                                        FieldDefinitions: [
                                            {
                                                FieldDefinition: [
                                                    {
                                                        $: {
                                                            baseType: "STRING",
                                                            description: "code",
                                                            name: "code",
                                                            ordinal: "0"
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                Rows: [
                                    {
                                        Row: [
                                            {
                                                code: [globalBlock.compiledGlobalCode!]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };

            subscriptions.push(subscriptionDefinition);
        }

        // **********************************  THING SHAPES  *************************************
        if (this.thingShapes.length) {
            entity.ImplementedShapes = [{ImplementedShape: []}];
            const implementedShapes = entity.ImplementedShapes[0].ImplementedShape;
            for (const shape of this.thingShapes) {
                implementedShapes.push({$:{name: shape, type: 'ThingShape'}});
            }
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

        // If a generic argument is specified for a data thing, set up a configuration table specifying it
        if (this.entityKind == TWEntityKind.Thing && TWDataThings.includes(this.thingTemplateName!)) {
            entity.ConfigurationTables = [
                {
                    ConfigurationTable: [
                        {
                            $: {
                                description: "Data Shape Configuration",
                                isMultiRow: "false",
                                name: "Settings",
                                ordinal: "0"
                            },
                            DataShape: [
                                {
                                    FieldDefinitions: [
                                        {
                                            FieldDefinition: [
                                                {
                                                    $: {
                                                        'aspect.friendlyName': 'Data Shape',
                                                        baseType: "DATASHAPENAME",
                                                        description: "Data shape",
                                                        name: "dataShape",
                                                        ordinal: "0"
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            Rows: [
                                {
                                    Row: [
                                        {
                                            dataShape: this.genericArgument
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ];
        }

        // If this is a debug build and the debug tables have been initialized, add the appropriate rows
        if (this._debugConfigurationInitialized && USE_DEBUG_CONFIGURATION_TABLE) {
            this.configuration =  this.configuration || {};
            this.configuration._BMDebuggerBreakpointLocations = {
                dataShape: {
                    fieldDefinitions: {
                        line: {name: 'line', baseType: 'NUMBER', aspects: {}, description: '', ordinal: 0},
                        column: {name: 'column', baseType: 'NUMBER', aspects: {}, description: '', ordinal: 1},
                        endLine: {name: 'endLine', baseType: 'NUMBER', aspects: {}, description: '', ordinal: 2},
                        endColumn: {name: 'endColumn', baseType: 'NUMBER', aspects: {}, description: '', ordinal: 3},
                        locationID: {name: 'locationID', baseType: 'STRING', aspects: {}, description: '', ordinal: 4},
                    }
                },
                rows: this.breakpoints as any
            };

            this.configuration._BMDebugMetadata = {
                dataShape: {
                    fieldDefinitions: {
                        fileName: {name: 'fileName', baseType: 'STRING', aspects: {}, description: '', ordinal: 0},
                    }
                },
                rows: [{fileName: this.filename}]
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
                const table = this.XMLRepresentationOfInfotable(this.configuration[tableName]);

                table.$.name = tableName;
                table.$.description = '';
                table.$.isMultiRow = String(this.configuration[tableName].rows.length > 1);

                configurationTable.push(table);
            }
        }

        return (new Builder()).buildObject(XML);
    }

    /**
     * Returns the XML data shape entity representation of the file processed by this transformer.
     * @return      An XML.
     */
    private toDataShapeXML(): string {
        const XML = {} as any;

        const collectionKind = this.entityKind + 's';
        const entityKind = this.entityKind;
        
        XML.Entities = {};
        XML.Entities[collectionKind] = [];
        XML.Entities[collectionKind][0] = {};
        XML.Entities[collectionKind][0][entityKind] = [{$:{baseDataShape: this.thingTemplateName || ''}}];
        
        const entity = XML.Entities[collectionKind][0][entityKind][0];

        entity.$.name = this.exportedName;

        if (this.projectName) entity.$.projectName = this.projectName;
        if (this.editable) entity.$['aspect.isEditableExtensionObject'] = this.editable;

        // Tags are yet unsupported
        entity.$.tags = '';

        if (this.description) entity.$.description = this.description;

        entity.FieldDefinitions = [{FieldDefinition: []}];
        const fieldDefinitions = entity.FieldDefinitions[0].FieldDefinition as any[];

        let ordinal = 0;

        for (const field of this.fields) {
            const fieldDefinition = {$:{}} as any;

            if (this.autoGenerateDataShapeOrdinals && !('ordinal' in <any>field)) {
                field.ordinal = ordinal;
            }

            ordinal++;
            
            for (const key in field) {
                if (key == 'aspects') continue;

                fieldDefinition.$[key] = field[key]
            }

            if (field.aspects) {
                for (const key in field.aspects) {
                    fieldDefinition.$['aspect.' + key] = field.aspects[key];
                }
            }

            fieldDefinitions.push(fieldDefinition);
        }

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

        if (this.visibilityPermissions.length) {
            entity.VisibilityPermissions = [{Visibility: []}];
            entity.VisibilityPermissions[0].Visibility[0] = {Principal: this.visibilityPermissions.map(p => ({$: p}))};
        }

        return (new Builder()).buildObject(XML);
    }

    /**
     * Returns an array of XML entities containing the users and groups in the file processed by this transformer.
     */
    private toUserListXML(): string {
        const XML = {} as any;
        XML.Entities = {};
        XML.Entities.Users = [{}];
        XML.Entities.Users[0].User = [];
        XML.Entities.Groups = [{}];
        XML.Entities.Groups[0].Group = [];

        for (const user in this.users) {
            const collectionKind = 'Users';
            const entityKind = 'User';

            const entity: any = {$: {}};
    
            entity.$.name = user;
            entity.$.locked = 'false';
            entity.$.enabled = 'true';

            if (this.projectName) entity.$.projectName = this.projectName;
            if (this.editable) entity.$['aspect.isEditableExtensionObject'] = this.editable;
    
            // Tags are yet unsupported
            entity.$.tags = '';
    
            if (this.users[user].description) entity.$.description = this.users[user].description;

            // Get the user extensions, if specified and convert
            // them into infotable rows
            const extensions = this.users[user].extensions;
            const extensionsRows: unknown[] = [];
            const updateTime = (new Date).toISOString();
            for (const key in extensions) {
                extensionsRows.push({
                    lastUpdateTime: updateTime,
                    name: key,
                    value: String(extensions[key])
                });
            }

            entity.ConfigurationTables = [
                {
                    ConfigurationTable: [
                        {
                            $: {
                                description: "UserExtensions",
                                isMultiRow: "true",
                                name: "UserExtensions",
                                ordinal: "1",
                                dataShapeName: ''
                            },
                            DataShape: [
                                {
                                    FieldDefinitions: [
                                        {
                                            FieldDefinition: [
                                                {
                                                    $: {
                                                        baseType: "DATETIME",
                                                        description: "Last update time",
                                                        name: "lastUpdateTime",
                                                        ordinal: "3"
                                                    }
                                                },
                                                {
                                                    $: {
                                                        'aspect.isPrimaryKey': 'true',
                                                        baseType: "STRING",
                                                        description: "Name",
                                                        name: "name",
                                                        ordinal: "1"
                                                    }
                                                },
                                                {
                                                    $: {
                                                        baseType: "STRING",
                                                        description: "Value",
                                                        name: "value",
                                                        ordinal: "2"
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            Rows: [
                                {
                                    Row: extensionsRows
                                }
                            ]
                        }
                    ]
                }
            ];

            if (this.runtimePermissions.runtime) {
                entity.RunTimePermissions = [{Permissions: []}];
    
                for (const resource in this.runtimePermissions.runtime) {
                    // For user lists, the resource name represents the entity to which the permissions apply
                    if (resource != user) continue;

                    const permissionDefinition = {$: {resourceName: '*'}};
    
                    for (const permission in this.runtimePermissions.runtime[resource]) {
                        const principals = this.runtimePermissions.runtime[resource][permission].map(p => ({$: {name: p.principal, type: p.type, isPermitted: p.isPermitted}}));
                        permissionDefinition[permission] = [{Principal: principals}];
                    }
    
                    entity.RunTimePermissions[0].Permissions.push(permissionDefinition);
                }
            }

            if (this.visibilityPermissions.length) {
                entity.VisibilityPermissions = [{Visibility: []}];
                entity.VisibilityPermissions[0].Visibility[0] = {Principal: this.visibilityPermissions.map(p => ({$: p}))};
            }

            XML.Entities[collectionKind][0][entityKind].push(entity);

        }

        for (const group in this.userGroups) {
            const collectionKind = 'Groups';
            const entityKind = 'Group';
            
            const entity: any = {$:{}};
    
            entity.$.name = group;

            if (this.projectName) entity.$.projectName = this.projectName;
            if (this.editable) entity.$['aspect.isEditableExtensionObject'] = this.editable;
    
            // Tags are yet unsupported
            entity.$.tags = '';
    
            if (this.userGroups[group].description) entity.$.description = this.userGroups[group].description;

            // Create the memeber list
            const members: unknown[] = [];
            for (const member of this.userGroups[group].members) {
                // Because of the way collections are accessed, the group types will have an extra 's' at the end which must be removed
                members.push({$: {name: member.name, type: member.type.substring(0, member.type.length - 1)}});
            }

            entity.Members = [{}];
            entity.Members[0].Members = [{}];
            entity.Members[0].Members[0].Member = members;

            if (this.runtimePermissions.runtime) {
                entity.RunTimePermissions = [{Permissions: []}];
    
                for (const resource in this.runtimePermissions.runtime) {
                    // For user lists, the resource name represents the entity to which the permissions apply
                    if (resource != group) continue;

                    const permissionDefinition = {$: {resourceName: '*'}};
    
                    for (const permission in this.runtimePermissions.runtime[resource]) {
                        const principals = this.runtimePermissions.runtime[resource][permission].map(p => ({$: {name: p.principal, type: p.type, isPermitted: p.isPermitted}}));
                        permissionDefinition[permission] = [{Principal: principals}];
                    }
    
                    entity.RunTimePermissions[0].Permissions.push(permissionDefinition);
                }
            }

            if (this.visibilityPermissions.length) {
                entity.VisibilityPermissions = [{Visibility: []}];
                entity.VisibilityPermissions[0].Visibility[0] = {Principal: this.visibilityPermissions.map(p => ({$: p}))};
            }

            XML.Entities[collectionKind][0][entityKind].push(entity);
        }

        return (new Builder).buildObject(XML);
    }

    /**
     * Returns the XML organization entity representation of the file processed by this transformer.
     * @return      An XML.
     */
    private toOrganizationXML(): string {
        const XML = {} as any;

        const collectionKind = this.entityKind + 's';
        const entityKind = this.entityKind;
        
        XML.Entities = {};
        XML.Entities[collectionKind] = [];
        XML.Entities[collectionKind][0] = {};
        XML.Entities[collectionKind][0][entityKind] = [{$:{}}];
        
        const entity = XML.Entities[collectionKind][0][entityKind][0];

        entity.$.name = this.exportedName;

        if (this.projectName) entity.$.projectName = this.projectName;
        if (this.editable) entity.$['aspect.isEditableExtensionObject'] = this.editable;

        // Tags are yet unsupported
        entity.$.tags = '';

        if (this.description) entity.$.description = this.description;

        entity.Connections = [{Connection: this.orgConnections.map(c => ({$: c}))}];

        entity.OrganizationalUnits = [{OrganizationalUnit: []}];

        for (const unit of this.orgUnits) {
            const orgUnit = {$: {name: unit.name}, Members: [] as unknown[]} as any;

            if (unit.description) orgUnit.$.description = unit.description;

            orgUnit.Members = [{ Members: [{ Member: unit.members?.map(m => ({$: m})) || [] }] }];

            entity.OrganizationalUnits[0].OrganizationalUnit.push(orgUnit);
        }

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

        if (this.visibilityPermissions.length) {
            entity.VisibilityPermissions = [{Visibility: []}];
            entity.VisibilityPermissions[0].Visibility[0] = {Principal: this.visibilityPermissions.map(p => ({$: p}))};
        }

        return (new Builder()).buildObject(XML);
    }

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
        if (this.entityKind && this.className) {
            if (this.entityKind == TWEntityKind.Thing) {
                return `declare interface ${this.entityKind}s { ${JSON.stringify(this.exportedName)}: ${this.className} }\n\n`;
            }
            else if (this.entityKind == TWEntityKind.UserList) {
                const users = `declare interface Users { ${Object.values(this.users).map(u => `${u.name}: UserEntity;`).join(' ')} }\n\n`;
                const groups = `declare interface Groups { ${Object.values(this.userGroups).map(u => `${u.name}: GroupEntity;`).join(' ')} }\n\n`;
                return users + groups;
            }
            else if (this.entityKind == TWEntityKind.Organization) {
                return `declare interface ${this.entityKind}s { ${JSON.stringify(this.exportedName)}: ${this.entityKind}Entity<${this.orgUnits.map(u => JSON.stringify(u.name)).join(' | ') || 'string'}>}`;
            }
            else {
                let declaration = `declare interface ${this.entityKind}s { ${JSON.stringify(this.exportedName)}: ${this.entityKind}Entity<${this.className}>}`;

                // If enabled, generate dummy things for templates and shapes
                if (this.generateThingInstances) {

                    // For template instances, the things' type is the template class directly
                    if (this.entityKind == TWEntityKind.ThingTemplate) {
                        declaration += '\n\ndeclare interface Things {\n'
                        for (let i = 0; i < ThingInstancesToCreate; i++) {
                            declaration += `\t"${(crypto as any).randomUUID()}": ${this.className};\n`;
                        }
                        declaration += '}\n';
                    }

                    // For shape instances, the things' type is a Generic thing with the shape applied
                    if (this.entityKind == TWEntityKind.ThingShape) {
                        declaration += '\n\ndeclare interface Things {\n'
                        for (let i = 0; i < ThingInstancesToCreate; i++) {
                            declaration += `\t"${(crypto as any).randomUUID()}": GenericThing & ${this.className};\n`;
                        }
                        declaration += '}\n';
                    }
                }

                return declaration;
            }
        }
        else {
            return '';
        }
    }

    /**
     * Writes the XML entity representation of the file processed by this transformer to an appropriate file
     * and path based on the entity kind and its name. The path will use the given path as a root.
     * @param path      Defaults the `root` property. The root path.
     */
    write(path: string = this.root): void {
        if (!fs.existsSync(`${path}/build`)) fs.mkdirSync(`${path}/build`);
        if (!fs.existsSync(`${path}/build/Entities`)) fs.mkdirSync(`${path}/build/Entities`);

        let entityKind: string = this.entityKind;
        // User lists are to be saved under a "Users" subfolder.
        if (this.entityKind == TWEntityKind.UserList) {
            entityKind = 'User';
        }

        if (!fs.existsSync(`${path}/build/Entities/${entityKind}s`)) fs.mkdirSync(`${path}/build/Entities/${entityKind}s`);

        fs.writeFileSync(`${path}/build/Entities/${entityKind}s/${this.exportedName}.xml`, this.toXML());
    }

}

export { TWConfig };

export * from './TWCoreTypes';

export function TWThingTransformerFactory(program: ts.Program, root: string, after: boolean = false, watch: boolean = false, project?: string | TWConfig) {
    return function TWThingTransformerFunction(context: ts.TransformationContext) {
        const transformer = new TWThingTransformer(program, context, root, after, watch);
        if (project) {
            if (typeof project == 'string') {
                transformer.projectName = project;
            }
            else {
                transformer.projectName = project.projectName;
                transformer.experimentalGlobals = project.experimentalGlobals;
                transformer.autoGenerateDataShapeOrdinals = project.autoGenerateDataShapeOrdinals;
                transformer.store = project.store;
                transformer.debug = project.debug;
            }
        }
    
        return (node: ts.Node) => ts.visitNode(node, node => transformer.visit(node));
    }
}