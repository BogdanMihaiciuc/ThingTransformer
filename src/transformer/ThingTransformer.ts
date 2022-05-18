import * as ts from 'typescript';
import { InlineSQL, MethodHelpers, TWConfig } from '../configuration/TWConfig';
import { TWEntityKind, TWPropertyDefinition, TWServiceDefinition, TWEventDefinition, TWSubscriptionDefinition, TWBaseTypes, TWPropertyDataChangeKind, TWFieldBase, TWPropertyRemoteBinding, TWPropertyRemoteFoldKind, TWPropertyRemotePushKind, TWPropertyRemoteStartKind, TWPropertyBinding, TWSubscriptionSourceKind, TWServiceParameter, TWDataShapeField, TWConfigurationTable, TWRuntimePermissionsList, TWVisibility, TWExtractedPermissionLists, TWRuntimePermissionDeclaration, TWPrincipal, TWPermission, TWUser, TWUserGroup, TWPrincipalBase, TWOrganizationalUnit, TWConnection, TWDataThings, TWInfoTable, GlobalFunction, GlobalFunctionReference, DiagnosticMessage, DiagnosticMessageKind, TWThing } from './TWCoreTypes';
import { Breakpoint } from './DebugTypes';
import { Builder } from 'xml2js';
import * as fs from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';

declare global {
    namespace NodeJS {
        interface Global {
            _TWEntities: any;
        }
    }
}

/**
 * The interface for a store object that is used to hold references to transformers
 * and various project-wide information that should be shared between the transformers.
 */
export interface TransformerStore {
    /**
     * A store that is used to keep references to transformers that represent
     * global code blocks, indexed by the entity to which they will be added.
     */
    '@globalBlocks'?: {
        [key: string]: TWThingTransformer[];
    }

    /**
     * A store that is used to keep references to global functions found throughout
     * the entire project, indexed by their names.
     */
    '@globalFunctions'?: {
        [key: string]: GlobalFunction;
    }

    /**
     * A store that is used to keep track of debug information, indexed by filename.
     */
    '@debugInformation'?: {
        [key: string]: {
            _debugBreakpointCounter: number;
            breakpoints: Breakpoint[];
            breakpointLocations: { [key: number]: { [key:number]: boolean } };
        }
    }

    /**
     * An array of error and warning messages that may be reported after compilation fails.
     */
    '@diagnosticMessages'?: DiagnosticMessage[];

    [key: string]: TWThingTransformer | {
        [key: string]: TWThingTransformer[];
    } | {
        [key: string]: GlobalFunction;
    } | {
        [key: string]: {
            _debugBreakpointCounter: number;
            breakpoints: Breakpoint[];
            breakpointLocations: { [key: number]: { [key:number]: boolean } };
        }
    } | DiagnosticMessage[] | undefined;
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
 * An array of identifiers that represent method helpers.
 */
const MethodHelperIdentifiers = ['METHOD_NAME', 'CLASS_NAME', 'FILE_PATH', 'LOG_PREFIX'];

/**
 * @deprecated No longer used
 * ---
 * If set to `true`, the transformer will create a configuration table containing the debug information
 * for each entity.
 */
const USE_DEBUG_CONFIGURATION_TABLE = false;

/**
 * The interface for the portion of the thing transformer that is used for
 * transforming functions and methods.
 */
interface TWCodeTransformer {

    /**
     * The typescript program.
     */
    program: ts.Program;

    /**
     * The typescript transformation context.
     */
    context: ts.TransformationContext;

    /**
     * The source file node being processed.
     */
    sourceFile?: ts.SourceFile;

    /**
     * The file currently being processed.
     */
    filename?: string;

    /**
     * The path to the repository containing the project currently being processed.
     */
    repoPath: string;

    /**
     * Set to `true` if a debug build should be generated.
     */
    debug?: boolean;

    /**
     * When set to `true`, function declarations in the global scope will be permitted.
     */
    globalFunctionsEnabled?: boolean;

    /**
     * A weak map that contains a mapping between nodes that have been marked for replacement before
     * having been visited.
     */
    nodeReplacementMap: WeakMap<ts.Node, ts.Node>;

    /**
     * A counter that keeps track of each breakpoint location that was added.
     */
    _debugBreakpointCounter: number;

    /**
     * An array of breakpoint locations that have been added in a debug build.
     */
    breakpoints: Breakpoint[];

    /**
     * A map of existing breakpoint locations.
     */
    breakpointLocations: { [key: number]: { [key:number]: boolean } };

    /**
     * An object containing instances of the transformer.
     */
    store: TransformerStore;

    /**
     * Returns a new code transformer that can be used to transform nodes in the given source file.
     * @param source        The source file for which a transfomer should be returned.
     * @returns             A code transformer.
     */
    codeTransformerForSource(this: TWCodeTransformer, source: ts.SourceFile): TWCodeTransformer;

    /**
     * Returns the constant value of the given property access expression so that it can be inlined.
     * A constant value that must be inlined can occur because of a const enum member or because of
     * an environment variable.
     * @param expression    The expression whose constant value should be evaluated.
     * @returns             The constant value if it could be resolved, `undefined` otherwise.
     */
    constantValueOfExpression(this: TWCodeTransformer, expression: ts.Expression): unknown;

    /**
     * Throws a formatted error message for the given AST node.
     * @param node      The node which caused an error.
     * @param error     The error message to display.
     */
    throwErrorForNode(node: ts.Node, error: string): never;

    /**
     * Compiles the given function declaration, saving its result in the global store.
     * @param fn    The function declaration to compile;
     */
    compileGlobalFunction(this: TWCodeTransformer, fn: ts.FunctionDeclaration): void;

    /**
     * Evaluates the given call expression, returning a global function reference if
     * it is a call to a global function.
     * @param expression        The expression to evaluate.
     * @returns                 A function reference if this is a call to a global function,
     *                          `undefined` otherwise.
     */
    evaluateGlobalCallExpression(this: TWCodeTransformer, expression: ts.CallExpression): GlobalFunctionReference | undefined;

    /**
     * Evaluates the given node that is part of a global function and, if appropriate,
     * extracts information out of it into the given global function object.
     * @param node      The node to evaluate.
     * @param fn        The global function object.
     */
    evaluateGlobalFunctionNode(this: TWCodeTransformer, node: ts.Node, fn: GlobalFunction): void;

    /**
     * Visits a node that is in the body of a service or global function code, performing a replacement
     * that is applicable to all build modes.
     * @param node          The node to visit.
     * @returns             The source node, if no replacement is necessary, otherwise a node to replace it.
     */
    visitCodeNode(this: TWCodeTransformer, node: ts.Node): ts.Node;

    /**
     * Visits a node that is part of a global function declaration.
     * @param node      The node.
     * @param fn        The object containing information about the global function.
     * @returns         The transformed node.
     */
    visitGlobalFunctionNode(this: TWCodeTransformer, node: ts.Node, fn: GlobalFunction): ts.Node;

    /**
     * Visits a method node for a release build, performing replacements and extracting references to functions.
     * @param node          The method or function node.
     * @param service       The reference to the service or subscription that
     *                      this method represents. This is used to discover function references.
     * @returns             The transformed node.
     */
    visitMethodNode(this: TWCodeTransformer, node: ts.Node, service?: TWServiceDefinition | TWSubscriptionDefinition): ts.Node | undefined;

    /**
     * Visits a method or global function node for a debug build, adding in debug statements where possible.
     * @param node          The method or function node.
     * @param fn            The object containing information about the global function, if this is invoked
     *                      for a global function, `undefined` otherwise.
     * @param service       If this is invoked for a method, this is a reference to the service or subscription that
     *                      this method represents. This is used to discover function references.
     * @returns             The transformed node.
     */
    visitDebugMethodNode(this: TWCodeTransformer, node: ts.Node, fn?: GlobalFunction, service?: TWServiceDefinition | TWSubscriptionDefinition): ts.Node | undefined;

    /**
     * Returns an expression that represents a debug checkpoint.
     * @param ID            A unique ID that identifies this expression.
     * @returns             A typescript expression.
     */
    debugCheckpointExpression(this: TWCodeTransformer, ID: string): ts.Expression;

    /**
     * Creates a comma expression that adds a debug checkpoint to the given expression.
     * Also stores information about the breakpoint location that was just added.
     * @param expression        The expression to modify. If `undefined`, a new expression will be returned.
     * @param targetNode        When `expression` is `undefined`, the node from which to get the position information.
     * @returns                 A typescript expression.
     */
    commaCheckpointExpression(this: TWCodeTransformer, expression: ts.Expression | undefined, targetNode?: ts.Node): ts.Expression

}

/**
 * The thing transformer is applied to Thingworx source files to convert them into Thingworx XML entities.
 * It can also be used with global files to export symbols into the shared global scope.
 */
export class TWThingTransformer implements TWCodeTransformer {

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
     * The path to the repository containing the typescript project. In multi project mode, this is the
     * path of the source folder containing all of the subprojects.
     */
    repoPath!: string;

    /**
     * when enabled, it indicates that the project name is derived from the root path.
     */
    isAutoProject?: boolean;

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
     * Used for DataShapes. An array of dataShapes shapes that this dataShape extends from
     */
    dataShapes: string[] = [];

    /**
     * A flag that is set to `true` after copying the base data shapes' fields to this data shape.
     */
    dataShapeInheritanceProcessed = false;

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
     * **EXPERIMENTAL!!!**
     *
     * For Things and DataShapes, this triggers the generation of APIs
     */
    exported: boolean = false;

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
     * An object describing which method helper constants may be injected into each service or subscription.
     */
    methodHelpers?: MethodHelpers;

    /**
     * When set to `true`, function declarations in the global scope will be permitted.
     */
    globalFunctionsEnabled?: boolean;

    /**
     * An array of global functions declared in this file.
     */
    globalFunctions: GlobalFunction[] = [];

    /**
     * When set to `true`, SQL statements in javascript services will be permitted.
     */
    inlineSQLOptions?: InlineSQL;

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
     * An array of endpoints that should be invoked after deployment.
     */
    deploymentEndpoints: string[] = [];

    /**
     * A weak map that contains a mapping between nodes that have been marked for replacement before
     * having been visited.
     */
    nodeReplacementMap: WeakMap<ts.Node, ts.Node> = new WeakMap;

    /**
     * A weak map containing the methods that should be visited for extracting referenced functions and performing
     * various replacements. Its values are the services or subscriptions they represent.
     */
    methodNodes: WeakMap<ts.Node, TWServiceDefinition | TWSubscriptionDefinition> = new WeakMap;

    /**
     * A weak map containing the methods that should be visited for adding debug information. Its values
     * are the services or subscriptions they represent.
     */
    debugMethodNodes: WeakMap<ts.Node, TWServiceDefinition | TWSubscriptionDefinition> = new WeakMap;

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
            return TWEntityKind.DataShape;
        }

        this.throwErrorForNode(classNode, `Unknown entity kind for class ${classNode.name}`);
    }


    /**
     * Returns the constant value of the given expression so that it can be inlined.
     * A constant value that must be inlined can occur because of a const enum member or because of
     * an environment variable.
     * @param expression    The expression whose constant value should be evaluated.
     * @returns             The constant value if it could be resolved, `undefined` otherwise.
     */
    constantOrLiteralValueOfExpression(expression: ts.Expression): unknown {
        if (ts.isNumericLiteral(expression)) {
            return parseFloat((expression as ts.NumericLiteral).text);
        }
        else if (ts.isPrefixUnaryExpression(expression) && ts.isNumericLiteral(expression.operand) && expression.operator == ts.SyntaxKind.MinusToken) {
            // check for negative number
            return parseFloat('-' + (expression.operand as ts.NumericLiteral).text);
        }
        else if (ts.isStringLiteral(expression)) {
            return expression.text;
        }
        else if (expression.kind == ts.SyntaxKind.TrueKeyword) {
            return true;
        }
        else if (expression.kind == ts.SyntaxKind.FalseKeyword) {
            return false;
        }
        else if (ts.isPropertyAccessExpression(expression)) {
            return this.constantValueOfExpression(expression);
        }

        return undefined;
    }

    /**
     * Returns the constant value of the given property access expression so that it can be inlined.
     * A constant value that must be inlined can occur because of a const enum member or because of
     * an environment variable.
     * @param expression    The expression whose constant value should be evaluated.
     * @returns             The constant value if it could be resolved, `undefined` otherwise.
     */
    constantValueOfExpression(this: TWCodeTransformer, expression: ts.Expression): unknown {
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
        }
        else {
            // Otherwise it may just be a const enum
            const emitResolver: ts.TypeChecker = (this.context as any).getEmitResolver();

            if (emitResolver) {
                // The emit resolver is able to get the constant value directly
                return emitResolver.getConstantValue(propertyAccess);
            }
            else {
                // If the emit resolver isn't available (e.g. due to using ts.transform)
                // Use the type checker to determine if the source object is an enum
                // and find the initializer for its field

                // NOTE: the type checker also has a getConstantValue method, but this
                // does not appear to work when directly called against an enum member access
                // expression
                
                const typeChecker = this.program.getTypeChecker();
                const symbol = typeChecker.getSymbolAtLocation(propertyAccess);

                if (symbol && symbol.declarations) {
                    // If the symbol has multiple declarations, return the constant value
                    // of the first one that can be computed, if any
                    for (const declaration of symbol.declarations) {
                        if (
                            ts.isPropertyAccessExpression(declaration) || 
                            ts.isEnumMember(declaration) || 
                            ts.isElementAccessExpression(declaration)
                        ) {
                            const constantValue = typeChecker.getConstantValue(declaration);
                            if (constantValue) {
                                return constantValue;
                            }
                        }
                    }
                }
            }
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
                    else if (store['@globalBlocks']?.[globalClass]) {
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

            // In watch mode, the additional transformations below do not affect declarations
            if (this.watch) return ts.visitEachChild(node, node => this.visit(node), this.context);

            // The following transformations only make sense for non-global code
            if (!this.isGlobalCode) {
                // If this is a global function declaration, extract it and discover its dependencies
                if (node.kind == ts.SyntaxKind.FunctionDeclaration && node.parent.kind == ts.SyntaxKind.SourceFile) {

                    const functionName = (node as ts.FunctionDeclaration).name?.text;

                    if (!functionName) {
                        this.throwErrorForNode(node, `Global functions must be named.`)
                    }

                    if (this.store['@globalFunctions']?.[functionName]) {
                        // If this function was already processed, omit it from the result
                        return undefined;
                    }
                    else {
                        // Otherwise compile it and omit it from the result
                        this.compileGlobalFunction(node as ts.FunctionDeclaration);
                        return undefined;
                    }
                }

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
        
                /* TODO: Remove, as this is now handled via applied functions
                if (node.kind == ts.SyntaxKind.ThisKeyword) {
                    return this.visitThisNode(node as ts.ThisExpression);
                }
                */

                if (this.nodeReplacementMap.get(node)) {
                    // If the node was already processed and marked for replacement, return its replacement
                    return this.nodeReplacementMap.get(node);
                }

                // Upon reaching a method declaration that has been marked for debugging
                // start processing in reverse.
                if (this.debugMethodNodes.has(node)) {
                    return this.visitDebugMethodNode(node, undefined, this.debugMethodNodes.get(node));
                }
                // Similar in non-debug mode
                else if (this.methodNodes.has(node)) {
                    return this.visitMethodNode(node, this.methodNodes.get(node));
                }
                
            }
        }

        const result = ts.visitEachChild(node, node => this.visit(node), this.context);

        return result;
    }

    /**
     * @deprecated 
     * This is now handled with an applied function instead of replacing this with me
     * -----
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

        // When the permission decorators are applied to a shape or template's fields it is always
        // interpreted as a runtime instance permission
        let isInstanceMemberPermission = false;
        if (!ts.isClassDeclaration(node) && [TWEntityKind.ThingShape, TWEntityKind.ThingTemplate].includes(this.entityKind)) {
            isInstanceMemberPermission = true;
        }

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

            // For template and thing shape fields, the permission kind is always runtime instance
            if (isInstanceMemberPermission) {
                permissionKind = 'runtimeInstance';
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
                        (store[this.className] as TWThingTransformer).globalBlocks.push(this);
                    }
                    return;
                }
            }
        }

        this.anyNodeVisited = true;

        // The only permitted entries at the source level are class declarations, interface declarations, const enums and import statements
        if (![ts.SyntaxKind.ClassDeclaration, ts.SyntaxKind.InterfaceDeclaration, ts.SyntaxKind.EnumDeclaration, ts.SyntaxKind.ImportClause, ts.SyntaxKind.SingleLineCommentTrivia, ts.SyntaxKind.JSDocComment, ts.SyntaxKind.MultiLineCommentTrivia].includes(node.kind)) {
            // Only allow function declarations if support for them is enabled
            if (node.kind == ts.SyntaxKind.FunctionDeclaration && !this.globalFunctionsEnabled) {
                this.throwErrorForNode(node, `Only classes, interfaces, const enums and import statements are permitted at the root level.`);
            }
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
            else if (ts.isCallExpression(heritage.expression)) {
                // Call expression base classes can only be things, thing templates and datashapes

                const callNode = heritage.expression;
                const callExpressionText = callNode.expression.getText();
                // Ensure that the call signature is of the correct type, and infer the entityKind from it
                if (['ThingTemplateWithShapes', 'ThingTemplateReference', 'ThingTemplateWithShapesReference'].includes(callNode.expression.getText())) {
                    this.entityKind = this.entityKindOfClassNode(classNode);
                    if (this.entityKind != TWEntityKind.Thing && this.entityKind != TWEntityKind.ThingTemplate) {
                        this.throwErrorForNode(node, `Unknown base class for ${classNode.name}. Thing and ThingTemplate classes must extend from a ThingTemplateWithShapes(...) expression, a ThingTemplateWithShapesReference(...) expression, a ThingTemplateReference(...) expression or a base ThingTemplate class.`);
                    }
                }
                // For dataShapes, infer the entity kind from the callExpressionText
                if (['DataShapeBase', 'DataShapeBaseReference'].includes(callExpressionText)) {
                    this.entityKind = TWEntityKind.DataShape;
                }

                if (!this.entityKind) {
                    this.throwErrorForNode(node, `Could not infer entity kind based on parent class ${callExpressionText}`);
                }

                if (callExpressionText == 'DataShapeBase' || callExpressionText == 'DataShapeBaseReference') {
                    if (!callNode.arguments.length) {
                        this.throwErrorForNode(node, `The ${callExpressionText}(...) expression must have at least one DataShape parameter.`);
                    }

                    this.entityKind = TWEntityKind.DataShape;
                    this.dataShapes = callNode.arguments.map(node => (ts.isStringLiteral(node) ? node.text : node.getText()));
                } else if (callExpressionText == 'ThingTemplateWithShapes' || callExpressionText == 'ThingTemplateWithShapesReference') {
                    // Ensure that each parameter is of the correct type
                    if (!callNode.arguments.length) {
                        this.throwErrorForNode(node, `The ${callExpressionText}(...) expression must have at least one ThingTemplate parameter.`);
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
    
                    this.thingShapes = callNode.arguments.slice(1, callNode.arguments.length)
                                            .map(node => (ts.isStringLiteral(node) ? node.text : node.getText()));
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

            this.exported = this.hasDecoratorNamed('exported', classNode);

            if (this.exported && !(this.entityKind == TWEntityKind.Thing || this.entityKind == TWEntityKind.DataShape)) {
                this.throwErrorForNode(node, `Only Things or DataShapes may be exported.`);
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
        
        // Class members with the declare modifier should be ignored
        if (node.modifiers?.some(m => m.kind == ts.SyntaxKind.DeclareKeyword)) {
            return;
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
        }
        else {
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
        const baseType = this.getTypeOfPropertyDeclaration(node);

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
            if (!parseInt(ordinal)) this.throwErrorForNode(node, `Non numeric value specified in ordinal decorator for property ${property.name}: ${baseType}`);
            property.ordinal = parseInt(ordinal);
        }

        // If the field was declared with the override keyword, store this
        // so that a warning is not generated for it
        if (node.modifiers?.some(m => m.kind == ts.SyntaxKind.OverrideKeyword)) {
            property['@isOverriden'] = true;
        }

        // Ensure that the base type is one of the Thingworx Base Types
        if (!(baseType in TWBaseTypes)) {
            this.throwErrorForNode(node, `Unknown baseType for property ${property.name}: ${baseType}`);
        }
        property.baseType = TWBaseTypes[baseType];

        // INFOTABLE can optionally take the data shape as a type argument
        if (TWBaseTypes[baseType] == 'INFOTABLE') {
            const typeArguments = (node.type as ts.TypeReferenceNode)?.typeArguments;
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
            const typeArguments = (node.type as ts.TypeReferenceNode)?.typeArguments;

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
        const baseType = this.getTypeOfPropertyDeclaration(node);

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

        // Properties cannot be overriden
        if (node.modifiers?.some(m => m.kind == ts.SyntaxKind.OverrideKeyword)) {
            this.throwErrorForNode(node, 'Properties cannot be overriden');
        }

        // Create the generic aspects, required for all properties
        property.aspects = {
            cacheTime: 0,
            dataChangeType: TWPropertyDataChangeKind.Value,
            dataChangeThreshold: 0
        };

        // Ensure that the base type is one of the Thingworx Base Types
        if (!(baseType in TWBaseTypes)) {
            this.throwErrorForNode(node, `Unknown baseType for property ${property.name}: ${baseType}`);
        }
        property.baseType = TWBaseTypes[baseType];

        // INFOTABLE can optionally take the data shape as a type argument
        if (TWBaseTypes[baseType] == 'INFOTABLE') {
            const typeArguments = (node.type as ts.TypeReferenceNode)?.typeArguments;
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
            const typeArguments = (node.type as ts.TypeReferenceNode)?.typeArguments;

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
                this.throwErrorForNode(node, 'The unit decorator can only be used with numeric properties.');
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

        property.category = this.getCategoryForNode(node);

        this.runtimePermissions = this.mergePermissionListsForNode([this.runtimePermissions].concat(this.permissionsOfNode(node, node.name.text)), node);

        this.properties.push(property);
    }

    /**
     * Retrieves the baseType of a typescript property declaration.
     * If a declared baseType is not defined, then attempt to infer it from context
     * @param node      Note to verify
     * @returns         BaseType of property
     */
    private getTypeOfPropertyDeclaration(node: ts.PropertyDeclaration): string {
        // If the property has a type explicitly set, then use it
        if (node.type) {
            if (!PermittedTypeNodeKinds.includes(node.type.kind)) {
                this.throwErrorForNode(node, `Unknown baseType for property ${node.name.getText()}: ${node.type.getText()}`);
            }
            const typeNode = node.type as ts.TypeReferenceNode;
            return TypeScriptPrimitiveTypes.includes(typeNode.kind) ? typeNode.getText() : typeNode.typeName.getText();
        }
        else {
            // If a type has not been specified, try to infer it from the context
            const typeChecker = this.program.getTypeChecker();
            const inferredType = typeChecker.getTypeAtLocation(node);
            return typeChecker.typeToString(inferredType);
        }
    }

    /**
     * Gets the inferred type of the given expression.
     * @param expression        The expression whose type should be inferred.
     * @returns                 A string representing the thingwor xbase type of the expression.
     */
    private getBaseTypeOfExpression(expression: ts.Expression): string {
        const typeChecker = this.program.getTypeChecker();
        const inferredType = typeChecker.getTypeAtLocation(expression);
        let typeName = typeChecker.typeToString(inferredType);

        // If the type is a thingworx generic type, remove the generics
        if (typeName.startsWith('INFOTABLE<')) {
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

        return TWBaseTypes[typeName];
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

        // Events cannot be overriden
        if (node.modifiers?.some(m => m.kind == ts.SyntaxKind.OverrideKeyword)) {
            this.throwErrorForNode(node, 'Events cannot be overriden');
        }

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

        event.category = this.getCategoryForNode(node);

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

        const service = {
            aspects: {},
            '@globalFunctions': new Set,
            '@methodHelpers': new Set
        } as TWServiceDefinition;
        if (node.modifiers) for (const modifier of node.modifiers) {
            if (modifier.kind == ts.SyntaxKind.AsyncKeyword) {
                service.aspects = {isAsync: true};
            }
        }
        const originalNode = node;

        // Check for either the override decorator or keyword
        let hasOverrideDecorator = this.hasDecoratorNamed('override', node);
        let hasOverrideKeyword = node.modifiers?.some(m => m.kind == ts.SyntaxKind.OverrideKeyword);

        if (node.name.kind != ts.SyntaxKind.Identifier) this.throwErrorForNode(node, 'Service names cannot be computed property names.');
        service.name = (node.name as ts.Identifier).text;
        service.isAllowOverride = !this.hasDecoratorNamed('final', node);
        service.isOverriden = hasOverrideKeyword || hasOverrideDecorator;
        service.isLocalOnly = false;
        service.isPrivate = false;
        service.isOpen = false;

        // If the override decorator is used, report a warning to replace it with the keyword
        if (hasOverrideDecorator) {
            this.store['@diagnosticMessages'] = this.store['@diagnosticMessages'] || [];
            this.store['@diagnosticMessages'].push({
                kind: DiagnosticMessageKind.Warning,
                message: `Class "${this.className}" is using the @override decorator for "${service.name}", which is deprecated.`
            });
        }

        // Check if the service is a SQL query or command
        const isSQLCommand = this.hasDecoratorNamed('SQLCommand', node);
        const isSQLQuery = this.hasDecoratorNamed('SQLQuery', node);
        const isSQLService = isSQLCommand || isSQLQuery;

        if (this.hasDecoratorNamed('remoteService', node)) {
            // Decorators can't be applied to abstract methods, instead, by convention, the body of the remote
            // service will be ignored

            // Remote services cannot have any other type indentifies, such as SQL decorators
            if (isSQLService) {
                this.throwErrorForNode(node, `The service "${service.name}" cannot be both a remote and a SQL service.`);
            }

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
        else if (isSQLService) {
            // Ensure that only one SQL decorator is used
            if (isSQLCommand && isSQLQuery) {
                this.throwErrorForNode(node, `The service "${service.name}" cannot be both a SQL query and a SQL command.`);
            }

            service.SQLInfo = {
                handler: isSQLCommand ? 'SQLCommand' : 'SQLQuery'
            } as TWServiceDefinition['SQLInfo'];

            this.visitSQLService(node, service);
        }
        else {
            service.code = node.body!.getText();
            if (this.debug) {
                this.debugMethodNodes.set(node, service);
            }
            else {
                this.methodNodes.set(node, service);
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
            }
            else {
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
                
                if (!typeNode) {
                    this.throwErrorForNode(node, `No base type specified for parameter ${parameter.name}.`);
                }

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

        // Read the category value from the decorator
        service.category = this.getCategoryForNode(node);

        this.runtimePermissions = this.mergePermissionListsForNode([this.runtimePermissions].concat(this.permissionsOfNode(node, service.name)), node);

        this.services.push(service);
        return node;
    }

    /**
     * Visits a method declaration that represents a SQL service definition.
     * @param node              The node to visit.
     * @param service           The service definition object.
     */
    visitSQLService(node: ts.MethodDeclaration, service: TWServiceDefinition): void {
        // SQL services must only have a single statement that is a tagged template containing the
        // query or command to execute
        if (node.body!.statements.length != 1) {
            this.throwErrorForNode(node, `A SQL service must have a single statement.`);
        }

        const statement = node.body!.statements[0];

        switch (service.SQLInfo!.handler) {
            case 'SQLCommand':
                // For commands, the single statement must be the tagged template directly
                if (statement.kind != ts.SyntaxKind.ExpressionStatement) {
                    this.throwErrorForNode(node, `A SQL service must have a single tagged template expression statement.`);
                }

                const commandExpression = (statement as ts.ExpressionStatement).expression as ts.TaggedTemplateExpression;
                if (commandExpression.kind != ts.SyntaxKind.TaggedTemplateExpression) {
                    this.throwErrorForNode(node, `A SQL service must have a single tagged template expression statement.`);
                }

                // The tagged statement must use the SQLCommand function
                if (commandExpression.tag.getText() != 'SQLCommand') {
                    this.throwErrorForNode(node, `A SQL command must use the SQLCommand function.`)
                }

                // Get the timeout if specified
                const commandArgs = this.argumentsOfDecoratorNamed('SQLCommand', node);
                if (commandArgs) {
                    const timeout = this.constantOrLiteralValueOfExpression(commandArgs[0]);

                    if (typeof timeout == 'number') {
                        // The timeout may be a finite numeric literal
                        if (Number.isNaN(timeout)) {
                            this.throwErrorForNode(node, 'The timeout must be a numeric compile time constant.');
                        }
                        service.SQLInfo!.timeout = timeout;
                    }
                    else if (typeof timeout == 'string') {
                        // It may also be a number-like compile time constant
                        const numericTimeout = parseFloat(timeout);
                        if (Number.isNaN(numericTimeout)) {
                            this.throwErrorForNode(node, 'The timeout must be a numeric compile time constant.');
                        }

                        service.SQLInfo!.timeout = numericTimeout;
                    }
                    else {
                        // All other values are disallowed
                        this.throwErrorForNode(node, 'The timeout must be a numeric compile time constant.');
                    }
                }

                // Parse the template literal into the SQL code
                service.code = this._parseSQLTemplateLiteral(commandExpression.template);
                break;
            case 'SQLQuery':
                // For queries, the single statement must be a return statement
                if (statement.kind != ts.SyntaxKind.ReturnStatement) {
                    this.throwErrorForNode(node, `A SQL query must return the result of a query.`);
                }

                const returnedExpression = (statement as ts.ReturnStatement).expression;

                // The return statement must return an expression
                if (!returnedExpression) {
                    this.throwErrorForNode(node, `A SQL query must return the result of a query.`);
                }

                // The returned expression must be SQLQuery tagged template expression
                if (returnedExpression.kind != ts.SyntaxKind.TaggedTemplateExpression) {
                    this.throwErrorForNode(node, `A SQL query must return a single tagged template expression statement.`);
                }

                const queryExpression = returnedExpression as ts.TaggedTemplateExpression;

                // The tagged statement must use the SQLQuery function
                if (queryExpression.tag.getText() != 'SQLQuery') {
                    this.throwErrorForNode(node, `A SQL query must use the SQLQuery function.`)
                }

                // Get the max rows and timeout if specified
                const queryArgs = this.argumentsOfDecoratorNamed('SQLQuery', node);
                if (queryArgs) {
                    const timeout = this.constantOrLiteralValueOfExpression(queryArgs[0]);
                    const maxRows = this.constantOrLiteralValueOfExpression(queryArgs[1]);

                    if (typeof timeout == 'number') {
                        // The timeout may be a finite numeric literal
                        if (Number.isNaN(timeout)) {
                            this.throwErrorForNode(node, 'The timeout must be a numeric compile time constant.');
                        }
                        service.SQLInfo!.timeout = timeout;
                    }
                    else if (typeof timeout == 'string') {
                        // It may also be a number-like compile time constant
                        const numericTimeout = parseFloat(timeout);
                        if (Number.isNaN(numericTimeout)) {
                            this.throwErrorForNode(node, 'The timeout must be a numeric compile time constant.');
                        }

                        service.SQLInfo!.timeout = numericTimeout;
                    }
                    else {
                        // All other values are disallowed
                        this.throwErrorForNode(node, 'The timeout must be a numeric compile time constant.');
                    }

                    if (typeof maxRows == 'number') {
                        // The max rows may be a finite numeric literal
                        if (Number.isNaN(maxRows)) {
                            this.throwErrorForNode(node, 'The maxRows must be a numeric compile time constant.');
                        }
                        service.SQLInfo!.maxRows = maxRows;
                    }
                    else if (typeof maxRows == 'string') {
                        // It may also be a number-like compile time constant
                        const numericMaxRows = parseFloat(maxRows);
                        if (Number.isNaN(numericMaxRows)) {
                            this.throwErrorForNode(node, 'The maxRows must be a numeric compile time constant.');
                        }

                        service.SQLInfo!.maxRows = numericMaxRows;
                    }
                    else {
                        // All other values are disallowed
                        this.throwErrorForNode(node, 'The maxRows must be a numeric compile time constant.');
                    }
                }

                // Parse the template literal into the SQL code
                service.code = this._parseSQLTemplateLiteral(queryExpression.template);
                break;
        }
    }

    /**
     * Parses the given template literal as a SQL service body, returning the code
     * that should be used in the service's implementation.
     * @param literal               The template literal to parse.
     * @param parameters            If specified, an array to which the parameters in the service will be added.
     * @param expressions           If specified, an array that will hold the expressions that have been substituted by parameters.
     * @param allowExpressions      If set to `true`, expression will be allowed and will be substituted by generic arguments.
     * @returns                     The code that should be used for the service.
     */
    private _parseSQLTemplateLiteral(literal: ts.TemplateLiteral, parameters?: TWServiceParameter[], expressions?: ts.Expression[], allowExpressions = false): string {
        let result = '';

        // if there are no expressions to substitute, return the literal text directly
        if (literal.kind == ts.SyntaxKind.NoSubstitutionTemplateLiteral) {
            return (literal as ts.NoSubstitutionTemplateLiteral).text;
        }

        const expression = literal as ts.TemplateExpression;

        // Check if the next expression is meant to be a SQL literal
        let isLiteralStart = literal.head.text.endsWith('<<');

        result += literal.head.text;

        // An argument counter used to generate unique argument names
        let argumentCounter = 0;

        for (const span of expression.templateSpans) {
            const expression = span.expression;

            let isNonIdentifier = false;

            // The expressions may only be identifiers, unless allowExpression is set to true
            if (expression.kind != ts.SyntaxKind.Identifier) {
                if (!allowExpressions) {
                    this.throwErrorForNode(expression, `SQL template placeholders may only be identifiers.`);
                }
                else {
                    isNonIdentifier = true;
                }
            }

            // When allowExpressions is set to true, the identifier becomes a generic argument name
            const identifier = allowExpressions ? `param${argumentCounter}` : (expression as ts.Identifier).text;
            argumentCounter++;

            // If a parameters array is specified, create a parameter from the expression
            if (parameters) {
                // If the expression has an explicit type assertion, use the specified type
                let baseType;
                if (expression.kind == ts.SyntaxKind.AsExpression || expression.kind == ts.SyntaxKind.TypeAssertionExpression) {
                    const type = (expression as ts.AsExpression).type;
                    if (ts.isTypeReferenceNode(type)) {
                        // Exclude any generics from type references
                        baseType = TWBaseTypes[type.typeName.getText()];
                    }
                    else {
                        baseType = TWBaseTypes[type.getText()];
                    }
                }
                else {
                    baseType = this.getBaseTypeOfExpression(expression);
                }

                const parameter: TWServiceParameter = {
                    name: identifier,
                    baseType,
                    description: 'Automatically generated parameter',
                    aspects: {},
                    ordinal: argumentCounter
                };

                // If the base type cannot be determined, throw
                if (!parameter.baseType) {
                    this.throwErrorForNode(expression, `The base type of the expression cannot be inferred; consider adding an explicit type assertion`);
                }

                parameters.push(parameter);
                expressions?.push(expression);
            }

            if (isLiteralStart && span.literal.text.startsWith('>>')) {
                // If the previous literal block starts a literal replacement and the next literal
                // block closes it, add the identifier directly
                result += identifier;
            }
            else {
                // Otherwise add it as a prepared statement parameter
                result += `[[${identifier}]]`;
            }

            result += span.literal.text;

            // Check if the next expression is meant to be a SQL literal
            isLiteralStart = span.literal.text.endsWith('<<');
        }

        return result;
    }

    /**
     * Visits a method declaration that represents a subscription definition.
     * @param node      The node to visit.
     */
    visitSubscription(node: ts.MethodDeclaration): ts.MethodDeclaration {
        const subscription = {
            source: '',
            sourceProperty: '',
            '@globalFunctions': new Set,
            '@methodHelpers': new Set
        } as TWSubscriptionDefinition;
        subscription.enabled = true;

        if (this.hasDecoratorNamed('subscription', node) && this.hasDecoratorNamed('localSubscription', node)) {
            this.throwErrorForNode(node, 'A method cannot have both the "subscription" and "localSubscription" decorators applied.');
        }

        // Subscriptions can only be javascript services
        if (this.hasDecoratorNamed('SQLQuery', node) || this.hasDecoratorNamed('SQLCommand', node)) {
            this.throwErrorForNode(node, 'Subscriptions cannot be SQL services.');
        }

        subscription.name = node.name.getText();

        // Subscriptions cannot be overriden
        if (node.modifiers?.some(m => m.kind == ts.SyntaxKind.OverrideKeyword)) {
            this.throwErrorForNode(node, 'Subscriptions cannot be overriden');
        }

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

        if (this.hasDecoratorNamed('category', node)) {
            this.throwErrorForNode(node, `The @category decorator cannot be used on subscriptions.`);
        }

        if (this.debug) {
            this.debugMethodNodes.set(node, subscription);
        }
        else {
            this.methodNodes.set(node, subscription);
        }

        this.subscriptions.push(subscription);
        return node;
    }

    //#region Code transformation

    /**
     * Returns a new code transformer that can be used to transform nodes in the given source file.
     * @param source        The source file for which a transfomer should be returned.
     * @returns             A code transformer.
     */
    codeTransformerForSource(this: TWCodeTransformer, source: ts.SourceFile): TWCodeTransformer {
        // In debug mode, get or create the debug information associated with the given file
        const debugInformation = {
            _debugBreakpointCounter: 0,
            breakpointLocations: [],
            breakpoints: [],
        }

        if (this.store['@debugInformation']?.[source.fileName]) {
            // If a different transformer has already processed parts of this file, load the
            // debug information it saved
            const debugStore = this.store['@debugInformation'][source.fileName];
            Object.assign(debugInformation, {
                _debugBreakpointCounter: debugStore._debugBreakpointCounter,
                breakpointLocations: debugStore.breakpointLocations,
                breakpoints: debugStore.breakpoints,
            });
        }
        else {
            // Otherwise initialize an object describing the debug information for this file
            // and add it to the store
            this.store['@debugInformation'] = this.store['@debugInformation'] || {};
            this.store['@debugInformation'][source.fileName] = {
                _debugBreakpointCounter: debugInformation._debugBreakpointCounter,
                breakpointLocations: debugInformation.breakpointLocations,
                breakpoints: debugInformation.breakpoints
            };
        }

        // Create a new code transformer with the appropriate properties and the methods
        // copied over from this transformer
        const transformer: TWCodeTransformer = {
            _debugBreakpointCounter: debugInformation._debugBreakpointCounter,
            debug: this.debug,
            breakpointLocations: debugInformation.breakpointLocations,
            breakpoints: debugInformation.breakpoints,
            context: this.context,
            nodeReplacementMap: new WeakMap,
            program: this.program,
            repoPath: this.repoPath,
            filename: source.fileName,
            globalFunctionsEnabled: this.globalFunctionsEnabled,
            sourceFile: source,
            store: this.store,
            codeTransformerForSource: this.codeTransformerForSource,
            commaCheckpointExpression: this.commaCheckpointExpression,
            constantValueOfExpression: this.constantValueOfExpression,
            debugCheckpointExpression: this.debugCheckpointExpression,
            compileGlobalFunction: this.compileGlobalFunction,
            evaluateGlobalCallExpression: this.evaluateGlobalCallExpression,
            evaluateGlobalFunctionNode: this.evaluateGlobalFunctionNode,
            throwErrorForNode: this.throwErrorForNode,
            visitCodeNode: this.visitCodeNode,
            visitDebugMethodNode: this.visitDebugMethodNode,
            visitGlobalFunctionNode: this.visitGlobalFunctionNode,
            visitMethodNode: this.visitMethodNode
        };

        return transformer;
    }

    /**
     * Compiles the given global function, storing the result in the global store.
     * @param fn        The function to compile.
     */
    compileGlobalFunction(this: TWCodeTransformer, functionDeclaration: ts.FunctionDeclaration): void {
        const name = functionDeclaration.name!.text;
        const sourceFile = functionDeclaration.getSourceFile();
        const filename = sourceFile.fileName

        if (!this.store['@globalFunctions']?.[name]) {
            const fn = {
                filename,
                dependencies: new Set,
                methodHelperDependencies: new Set,
                sourceFile
            } as GlobalFunction;

            let compiledCode: string | undefined;
            let transformedNode: ts.Node = functionDeclaration;

            // TODO: Create new program from function source and compile independently

            // Create a transformer for the function's source file
            const transformer = this.codeTransformerForSource(sourceFile);

            // Build and transform the function
            ts.transpileModule(
                sourceFile.text.substring(functionDeclaration.getStart(), functionDeclaration.getEnd()),
                {
                    compilerOptions: this.program.getCompilerOptions(),
                    transformers: {
                        before: [(context) => {
                            return (node) => {
                                // Perform standard replacements in the before phase
                                return ts.visitEachChild(node, (node) => {
                                    if (node.kind == ts.SyntaxKind.FunctionDeclaration) {
                                        if (this.debug) {
                                            return transformer.visitDebugMethodNode(node, fn) as ts.FunctionDeclaration;
                                        }
                                        else {
                                            return transformer.visitGlobalFunctionNode(node, fn) as ts.FunctionDeclaration;
                                        }
                                    }
                                }, context);
                            }
                        }],
                        after: [(context) => {
                            return (node) => {
                                const compiledSourceFile = node;

                                // Save this function's emit helpers so they can be added to the services using it
                                fn.emitHelperDependencies = ts.getEmitHelpers(node);

                                // In the after phase, find the compiled function and save its code
                                return ts.visitEachChild(node, (node) => {
                                    if (node.kind == ts.SyntaxKind.FunctionDeclaration) {
                                        const declaration = node as ts.FunctionDeclaration;
                                        if (declaration.name?.text == name) {
                                            // Print and save the compiled function
                                            compiledCode = ts.createPrinter().printNode(ts.EmitHint.Unspecified, node, compiledSourceFile) + '\n';
                                            transformedNode = node;
                                        }
                                    }
                                    return node;
                                }, context);
                            }
                        }]
                    }
                }
            );

            // In debug mode, update the stored debugger state
            if (this.debug) {
                this.store['@debugInformation']![filename]._debugBreakpointCounter = transformer._debugBreakpointCounter;
            }

            // If the function is in the same source as this transformer, update the breakpoint counter
            if (sourceFile == this.sourceFile) {
                this._debugBreakpointCounter = transformer._debugBreakpointCounter;
            }

            // Save the transformation result
            fn.node = functionDeclaration;
            fn.compiledCode = compiledCode;

            
            this.store['@globalFunctions'] = this.store['@globalFunctions'] || {};
            this.store['@globalFunctions'][name] = fn;
        }
    }

    /**
     * Evaluates the given call expression, returning a global function reference if
     * it is a call to a global function.
     * @param expression        The expression to evaluate.
     * @returns                 A function reference if this is a call to a global function,
     *                          `undefined` otherwise.
     */
    evaluateGlobalCallExpression(this: TWCodeTransformer, expression: ts.CallExpression): GlobalFunctionReference | undefined {
        const name = expression.expression as ts.Identifier;
        if (name.kind != ts.SyntaxKind.Identifier) {
            return;
        }

        // Discover where the function comes from to see if it is a global function
        // defined in the project
        const typeChecker = this.program.getTypeChecker();
        const type = typeChecker.getTypeAtLocation(name);
        const symbol = type.getSymbol();

        if (!symbol) {
            return;
        }

        const declarations = symbol.getDeclarations();
        if (declarations) {
            for (const declaration of declarations) {
                if (declaration.kind == ts.SyntaxKind.FunctionDeclaration) {
                    // If the function is an ambient declaration it doesn't need to be inlined
                    const functionDeclaration = declaration as ts.FunctionDeclaration;
                    if (functionDeclaration.modifiers?.some(m => m.kind == ts.SyntaxKind.DeclareKeyword)) {
                        break;
                    }

                    // The function must be declared in the global scope
                    if (functionDeclaration.parent.kind != ts.SyntaxKind.SourceFile) {
                        break;
                    }

                    // Otherwise get the source and name, and add it as a dependency of this function
                    const sourceFile = declaration.getSourceFile();
                    const filename = path.normalize(sourceFile.fileName);
                    const name = functionDeclaration.name?.text;

                    // Validate that the source file is not global code
                    const firstStatement = sourceFile.statements[0];
                    if (ts.isExpressionStatement(firstStatement) && ts.isStringLiteralLike(firstStatement.expression)) {
                        const text = firstStatement.expression.text;
                        const components = text.split(' ');
                        if (components[0] == 'use' && components[1] != 'strict') {
                            // If the function is part of global code, it does not need inlining
                            break;
                        }
                    }

                    // Validate that the source is part of the repo; in multi project mode
                    // this can also be a global function declared in a different project
                    if (!filename.startsWith(this.repoPath)) break;

                    if (name) {
                        // If this function is defined in a different file and hasn't yet been processed, do it now
                        // This is required because otherwise, in the after phase, there will be no reference to this
                        // function that can be inlined
                        if (filename != this.filename) {
                            if (!this.store['@globalFunctions']?.[name]) {
                                this.compileGlobalFunction(functionDeclaration);
                            }
                        }

                        return {name};
                    }
                }
            }
        }
    }

    /**
     * Evaluates the given node that is part of a global function and, if appropriate,
     * extracts information out of it into the given global function object.
     * @param node      The node to evaluate.
     * @param fn        The global function object.
     */
    evaluateGlobalFunctionNode(this: TWCodeTransformer, node: ts.Node, fn: GlobalFunction): void {
        switch (node.kind) {
            case ts.SyntaxKind.FunctionDeclaration:
                // For the root function, extract its name
                // When this node is a function declaration that is being processed from an external file
                // it will be the root node and have no parent
                if (!node.parent || node.parent.kind == ts.SyntaxKind.SourceFile) {
                    const name = (node as ts.FunctionDeclaration).name;
                    if (!name) {
                        this.throwErrorForNode(node, `Global function declarations must be named.`);
                    }

                    fn.name = name.text;
                }
                break;
            case ts.SyntaxKind.CallExpression:
                const callExpression = node as ts.CallExpression;

                // If global functions are not enabled, there's no need to inline global functions
                if (!this.globalFunctionsEnabled) return;

                // Whenever a call expression is encountered, determine if it represents a global
                // function call and if it does, add it to the dependencies of this function
                const dependency = this.evaluateGlobalCallExpression(callExpression);

                if (dependency) {
                    fn.dependencies.add(dependency.name);
                }
            case ts.SyntaxKind.Identifier:
                // For identifiers, verify if they represent helper names and if they do add them
                // as dependencies
                const identifier = node as ts.Identifier;
                if (MethodHelperIdentifiers.includes(identifier.text)) {
                    fn.methodHelperDependencies.add(identifier.text);
                }
        }
    }

    /**
     * Visits a node that is in the body of a service or global function code, performing a replacement
     * that is applicable to all build modes.
     * @param node          The node to visit.
     * @returns             The source node, if no replacement is necessary, otherwise a node to replace it.
     */
    visitCodeNode(this: TWCodeTransformer, node: ts.Node): ts.Node {
        // This function performs the replacements that are common to services and functions
        // in both debug and release modes
        // Currently this is just inlining constant values, but this may expand in the future
        switch (node.kind) {
            case ts.SyntaxKind.PropertyAccessExpression:
                // Inline constant values where possible
                try {
                    const constantValue = this.constantValueOfExpression(node as ts.PropertyAccessExpression);
        
                    if (typeof constantValue == 'string') {
                        return ts.factory.createStringLiteral(constantValue);
                    }
                    else if (typeof constantValue == 'number') {
                        return ts.factory.createNumericLiteral(constantValue.toString());
                    }
                }
                catch (e) {
                    // This will fail for synthetic nodes modified by the transformer, but these will not be
                    // compile time constants, so in this case just return the original node
                    return node;
                }
                break;
        }

        return node;
    }

    /**
     * Visits a node that is part of a global function declaration.
     * @param node      The node.
     * @param fn        The object containing information about the global function.
     * @returns         The transformed node.
     */
    visitGlobalFunctionNode(this: TWCodeTransformer, node: ts.Node, fn: GlobalFunction): ts.Node {
        node = ts.visitEachChild(node, n => this.visitGlobalFunctionNode(n, fn), this.context);

        // If the node has a generic code replacement available, return its replacement directly
        const codeReplacement = this.visitCodeNode(node);
        if (codeReplacement != node) {
            return codeReplacement;
        }

        this.evaluateGlobalFunctionNode(node, fn);

        return node;
    }


    /**
     * Visits the given tagged template literal node and, if necessary, returning a replacement node
     * and creating a SQL service for it.
     * @param node          The node to evaluate.
     * @param service       The service or subscription in which the tagged template was found.
     * @returns             A replacement node if a substitution is necessary, `false` otherwise.
     */
    visitTaggedTemplateLiteralNode(node: ts.TaggedTemplateExpression, service: TWServiceDefinition | TWSubscriptionDefinition): ts.CallExpression | undefined {
        // The tag must be either the SQLQuery or SQLCommand identifier
        const tag = node.tag as ts.Identifier;
        if (tag.kind != ts.SyntaxKind.Identifier) {
            return;
        }

        if (tag.text != 'SQLQuery' && tag.text != 'SQLCommand') return;

        // If inline SQL is disabled, throw an error
        if (!this.inlineSQLOptions?.enabled) {
            this.throwErrorForNode(node, `The ${tag.text} function can only be used in a SQL service.`);
        }

        // Create a new service for this sql statement
        const SQLService: TWServiceDefinition = {
            "@globalFunctions": new Set,
            "@methodHelpers": new Set,
            aspects: {
                isAsync: false
            },
            category: '',
            code: '',
            description: `SQL service generated from the ${service.name} service`,
            isAllowOverride: false,
            isLocalOnly: false,
            isOpen: false,
            isPrivate: false,
            name: `SQL_${service.name}_${(crypto as any).randomUUID()}`,
            parameterDefinitions: [],
            resultType: {} as any,
            SQLInfo: {
                timeout: 60,
                maxRows: 500,
                handler: 'SQLCommand'
            }
        }

        // Extract the appropriate generic arguments
        switch (tag.text) {
            case 'SQLQuery':
                SQLService.SQLInfo!.handler = 'SQLQuery';

                // The SQLQuery must have at least one generic argument specifying
                // the data shape of the returned infotable
                const genericArguments = node.typeArguments;
                if (!genericArguments?.length) {
                    this.throwErrorForNode(node, `The SQLQuery function must specify the return type via a type argument.`);
                }

                const type = genericArguments[0] as ts.TypeReferenceNode;
                if (type.kind != ts.SyntaxKind.TypeReference) {
                    this.throwErrorForNode(node, `The SQLQuery return type must be an identifier.`);
                }

                // Construct the result type
                SQLService.resultType = {
                    baseType: 'INFOTABLE',
                    description: '',
                    name: 'result',
                    ordinal: 0,
                    aspects: {
                        dataShape: type.typeName.getText()
                    }
                }

                // The arguments may also be used to override the timeout and max rows
                const timeout = genericArguments[1] as ts.LiteralTypeNode;
                if (!timeout) break;

                if (timeout.kind != ts.SyntaxKind.LiteralType || !ts.isLiteralExpression(timeout.literal)) {
                    this.throwErrorForNode(node, `The timeout of a SQLQuery must be a numeric literal.`);
                }

                const timeoutValue = parseInt((timeout.literal as ts.LiteralExpression).text);
                if (Number.isNaN(timeoutValue)) {
                    this.throwErrorForNode(node, `The timeout of a SQLQuery must be a numeric literal.`);
                }
                SQLService.SQLInfo!.timeout = timeoutValue;

                // Use a similar logic for the max rows
                const maxRows = genericArguments[2] as ts.LiteralTypeNode;
                if (!maxRows) break;
                
                if (maxRows.kind != ts.SyntaxKind.LiteralType || !ts.isLiteralExpression(maxRows.literal)) {
                    this.throwErrorForNode(node, `The maxRows of a SQLQuery must be a numeric literal.`);
                }

                const maxRowsValue = parseInt((maxRows.literal as ts.LiteralExpression).text);
                if (Number.isNaN(maxRowsValue)) {
                    this.throwErrorForNode(node, `The maxRows of a SQLQuery must be a numeric literal.`);
                }
                SQLService.SQLInfo!.maxRows = maxRowsValue;

                break;
            case 'SQLCommand':
                // The SQLCommand may optionally have its timeout specified via a type argument
                const commandArguments = node.typeArguments;
                if (commandArguments?.length) {
                    const timeout = commandArguments[0] as ts.LiteralTypeNode;
                    if (!timeout) break;

                    if (timeout.kind != ts.SyntaxKind.LiteralType || !ts.isLiteralExpression(timeout.literal)) {
                        this.throwErrorForNode(node, `The timeout of a SQLCommand must be a numeric literal.`);
                    }

                    const timeoutValue = parseInt((timeout.literal as ts.LiteralExpression).text);
                    if (Number.isNaN(timeoutValue)) {
                        this.throwErrorForNode(node, `The timeout of a SQLCommand must be a numeric literal.`);
                    }
                    SQLService.SQLInfo!.timeout = timeoutValue;
                }

                // Construct the result type
                SQLService.resultType = {
                    baseType: 'NUMBER',
                    description: '',
                    name: 'result',
                    ordinal: 0,
                    aspects: {}
                }

                break;
        }

        // Extract the parameters and code from the literal
        const parameters: TWServiceParameter[] = [];
        const expressions: ts.Expression[] = [];
        const code = this._parseSQLTemplateLiteral(node.template, parameters, expressions, true);

        SQLService.code = code;
        SQLService.parameterDefinitions = parameters;

        // Add the SQL service to the entity
        this.services.push(SQLService);

        // Select the appropriate permission kind based on whether this entity is a thing, shape or template
        const permissionKind = this.entityKind == TWEntityKind.Thing ? 'runtime' : 'runtimeInstance';

        // Add the appropriate permissions
        switch (this.inlineSQLOptions.permissions) {
            case 'inherit':
                // If no permissions have been defined, there is nothing to inherit
                if (!this.runtimePermissions[permissionKind]) break;

                // Create a permission object to copy over inherited permissions
                const inheritedPermission: TWExtractedPermissionLists = {
                    [permissionKind]: {
                        [SQLService.name]: {
                            ServiceInvoke: [] as TWPermission[]
                        }
                    } as TWRuntimePermissionsList
                }

                // Find all the service invoke permissions related to the current service
                for (const permission in this.runtimePermissions[permissionKind]) {
                    if (permission == service.name) {
                        const permissionDefinition = this.runtimePermissions[permissionKind]![permission];

                        // If the permission has a ServiceInvoke permission list, create a copy of it for the current service
                        if (permissionDefinition.ServiceInvoke?.length) {
                            inheritedPermission[permissionKind]![SQLService.name].ServiceInvoke.push(...permissionDefinition.ServiceInvoke);
                        }
                    }
                }

                // Merge the permission into the permissions list, if any was copied
                if (inheritedPermission[permissionKind]![SQLService.name].ServiceInvoke.length) {
                    this.mergePermissionListsForNode([this.runtimePermissions, inheritedPermission], node);
                }
                break;
            case 'system':
                // Create a ServiceInvoke permission for the system user
                const systemUserPermission: TWExtractedPermissionLists = {
                    [permissionKind]: {
                        [SQLService.name]: {
                            ServiceInvoke: [{
                                isPermitted: true,
                                principal: 'System',
                                type: 'User'
                            }]
                        }
                    } as TWRuntimePermissionsList
                }

                // Merge the permission into the permissions list
                this.mergePermissionListsForNode([this.runtimePermissions, systemUserPermission], node);
                break;
        }

        // Return a node that represents an invocation of the newly created service
        return ts.factory.createCallExpression(
            ts.factory.createElementAccessExpression(
                ts.factory.createThis(),
                ts.factory.createStringLiteral(SQLService.name)
            ),
            undefined,
            [
                ts.factory.createObjectLiteralExpression(
                    parameters.map((parameter, i) => ts.factory.createPropertyAssignment(
                        parameter.name,
                        expressions[i]
                    ))
                )
            ]
        )
    }

    /**
     * Visits a method node for a release build, performing replacements and extracting references to functions.
     * @param node          The method or function node.
     * @param service       The reference to the service or subscription that
     *                      this method represents. This is used to discover function references.
     * @returns             The transformed node.
     */
    visitMethodNode(this: TWCodeTransformer, node: ts.Node, service?: TWServiceDefinition | TWSubscriptionDefinition): ts.Node | undefined {
        node = ts.visitEachChild(node, n => this.visitMethodNode(n, service), this.context);

        // If the node has been marked for replacement, return its replacement directly
        if (this.nodeReplacementMap.get(node)) {
            return this.nodeReplacementMap.get(node)!;
        }

        // If the node has a generic code replacement available, return its replacement directly
        const codeReplacement = this.visitCodeNode(node);
        if (codeReplacement != node) {
            return codeReplacement;
        }

        switch (node.kind) {
            // Async keywords are only used for metadata and should not emit any code
            case ts.SyntaxKind.AsyncKeyword:
                return;
            case ts.SyntaxKind.CallExpression:
                const n11 = node as ts.CallExpression;

                // If global functions are not enabled, there's no need to inline global functions
                if (!this.globalFunctionsEnabled) return node;

                // If a service is specified, add references to global functions to it so that they can be inlined afterwards
                if (service) {
                    const dependency = this.evaluateGlobalCallExpression(n11);
                    if (dependency) {
                        service['@globalFunctions'].add(dependency.name);
                    }
                }

                return node;
            case ts.SyntaxKind.TaggedTemplateExpression:
                // Tagged templates can represent SQL statements which need to be replaced by service calls
                const template = node as ts.TaggedTemplateExpression;

                if (service) {
                    // If a replacement is found, return it; when the service argument is provided
                    const replacement = (this as TWThingTransformer).visitTaggedTemplateLiteralNode(template, service);
                    if (replacement) {
                        return replacement;
                    }
                }
                return node;
            case ts.SyntaxKind.Identifier:
                // For identifiers, verify if they represent helper names and if they do add them
                // as dependencies
                const identifier = node as ts.Identifier;
                if (MethodHelperIdentifiers.includes(identifier.text)) {
                    service?.['@methodHelpers'].add(identifier.text);
                }
        }

        return node;
    }

    /**
     * Visits a method or global function node for a debug build, adding in debug statements where possible.
     * @param node          The method or function node.
     * @param fn            The object containing information about the global function, if this is invoked
     *                      for a global function, `undefined` otherwise.
     * @param service       If this is invoked for a method, this is a reference to the service or subscription that
     *                      this method represents. This is used to discover function references.
     * @returns             The transformed node.
     */
    visitDebugMethodNode(this: TWCodeTransformer, node: ts.Node, fn?: GlobalFunction, service?: TWServiceDefinition | TWSubscriptionDefinition): ts.Node | undefined {
        node = ts.visitEachChild(node, n => this.visitDebugMethodNode(n, fn, service), this.context);

        // If this visits global function nodes, evaluate the node to extract information about the function.
        if (fn) {
            this.evaluateGlobalFunctionNode(node, fn);
        }

        // If the node has been marked for replacement, return its replacement directly
        if (this.nodeReplacementMap.get(node)) {
            return this.nodeReplacementMap.get(node)!;
        }

        // If the node has a generic code replacement available, return its replacement directly
        const codeReplacement = this.visitCodeNode(node);
        if (codeReplacement != node) {
            return codeReplacement;
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

                // If a service is specified, add references to global functions to it so that they can be inlined afterwards
                if (service && this.globalFunctionsEnabled) {
                    const dependency = this.evaluateGlobalCallExpression(n11);
                    if (dependency) {
                        service['@globalFunctions'].add(dependency.name);
                    }
                }

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
            case ts.SyntaxKind.Identifier:
                const n12 = node as ts.Identifier;
                if (n12.text == '__d') {
                    this.throwErrorForNode(node, `The "__d" identifier is reserved for the debugger in debug builds.`);
                }
                // For identifiers, verify if they represent helper names and if they do add them
                // as dependencies
                if (MethodHelperIdentifiers.includes(n12.text)) {
                    service?.['@methodHelpers'].add(n12.text);
                }
                break;
            case ts.SyntaxKind.TaggedTemplateExpression:
                // Tagged templates can represent SQL statements which need to be replaced by service calls
                const template = node as ts.TaggedTemplateExpression;

                if (service) {
                    // If a replacement is found, return it; when the service argument is provided this is called from
                    // a thing transformer rather than a code transformer
                    const replacement = (this as TWThingTransformer).visitTaggedTemplateLiteralNode(template, service);
                    if (replacement) {
                        return this.commaCheckpointExpression(replacement, node);
                    }
                }
                return node;
        }

        return node;
    }

    /**
     * A counter that keeps track of each breakpoint location that was added.
     */
    _debugBreakpointCounter = 0;

    /**
     * Returns an expression that represents a debug checkpoint.
     * @param ID            A unique ID that identifies this expression.
     * @returns             A typescript expression.
     */
    debugCheckpointExpression(this: TWCodeTransformer, ID: string): ts.Expression {
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
    commaCheckpointExpression(this: TWCodeTransformer, expression: ts.Expression | undefined, targetNode?: ts.Node): ts.Expression {
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

    //#endregion

    /**
     * Creates a flat list of all of the global functions and method helpers that the given method depends on
     * so that they can be inlined to be used at runtime.
     * @param method        The method whose dependencies should be found.
     */
    flattenMethodDependencies(method: TWServiceDefinition | TWSubscriptionDefinition): void {
        let size: number;
        let processedFunctions = new Set;
        do {
            size = method['@globalFunctions'].size;

            // For each function, add all of its dependencies as direct dependencies of the method
            for (const fn of [...method['@globalFunctions']]) {
                // Exclude functions that have already been processed
                if (processedFunctions.has(fn)) continue;

                // Get the global function description from the store and add its dependencies to the method
                const globalFunction = this.store['@globalFunctions']?.[fn] as GlobalFunction;
                // If the function doesn't exist in the store, don't inline it
                if (!globalFunction) continue;

                // If any new dependencies are added here, they will be processed in the next loop
                for (const dependency of globalFunction.dependencies) {
                    method['@globalFunctions'].add(dependency);
                }

                for (const dependency of globalFunction.methodHelperDependencies) {
                    method['@methodHelpers'].add(dependency);
                }

                // Don't process this function again in the next loop
                processedFunctions.add(fn);
            }
        } while (size != method['@globalFunctions'].size);
    }

    /**
     * Injects the method helpers into the already transpiled code of a service or subscription.
     * @param transpiledBody        Transpiled method body.
     * @param name                  Name of the service/subscription.
     * @param entity                Entity this method is a part of.
     * @param method                The definition object for the method.
     * @returns                     New transpiled method body with the helpers injected.
     */
    injectThingworxMethodHelpers(transpiledBody: string, name: string, entity: TWThingTransformer, method: TWServiceDefinition | TWSubscriptionDefinition): string {
        let result = transpiledBody;

        if (!method) return transpiledBody;

        if (this.methodHelpers) {
            // Prefix a new line at the start of the method
            const logPrefix = this.methodHelpers.logPrefix;

            // Get the helpers used by log prefix
            for (const helper of MethodHelperIdentifiers) {
                if (logPrefix?.includes(helper)) {
                    method['@methodHelpers'].add(helper);
                }
            }

            result = '\n' + result;
            if (this.methodHelpers.methodName && method['@methodHelpers'].has('METHOD_NAME')) {
                result = `const METHOD_NAME = "${name}";\n` + result;
            }
            if (this.methodHelpers.className && method['@methodHelpers'].has('CLASS_NAME')) {
                result = `const CLASS_NAME = "${entity.className}";\n` + result;
            }
            if (this.methodHelpers.filePath && method['@methodHelpers'].has('FILE_PATH')) {
                // Relativize the path to the file, to contain it to the project directory
                const relativeFilePath = entity.projectName + '' + entity.filename?.replace(entity.root, '');
                result = `const FILE_PATH = "${relativeFilePath}";\n` + result;
            }
            if (this.methodHelpers.logPrefix && method['@methodHelpers'].has('LOG_PREFIX')) {
                result = "const LOG_PREFIX = " + this.methodHelpers.logPrefix  + ";\n" + result;
            }
        }
        return result;
    }

    /**
     * Copies the global functions that the given method uses to its body so that they can be used at runtime.
     * @param transpiledBody        Transpiled method body.
     * @param method                The definition object for the method.
     * @returns                     New transpiled method body with the helpers injected.
     */
    inlineGlobalFunctions(transpiledBody: string, method: TWServiceDefinition | TWSubscriptionDefinition): string {
        let result = transpiledBody;

        for (const fn of method['@globalFunctions']) {
            // Find the function in the global store
            const globalFunction = this.store['@globalFunctions']?.[fn] as GlobalFunction;
            if (!globalFunction) continue;

            let codeToInline: string;
            if (globalFunction.compiledCode) {
                // If the function was precompiled, emit its compiled node directly
                codeToInline = globalFunction.compiledCode;
            }
            else {
                // Otherwise create an AST from the function's code, then emit it
                // Emit the function and add its code to the service
                const codeToTranspile = ts.createPrinter().printNode(ts.EmitHint.Unspecified, globalFunction.node, globalFunction.sourceFile);
                const transpileResult = ts.transpileModule(codeToTranspile, {
                    compilerOptions: {
                        ...this.program.getCompilerOptions(),
                        noImplicitUseStrict: true,
                        sourceMap: false,
                        noEmitHelpers: true
                    },
                });
    
                // TODO: not sure how to prevent typescript from emitting "use strict" at the beginning of the result
                // remove directly for now
                codeToInline = transpileResult.outputText;
                if (codeToInline.startsWith(`"use strict";`)) {
                    codeToInline = codeToInline.substring(`"use strict";`.length, codeToInline.length);
                }
            }

            result = codeToInline + '\n' + result;
        }

        return result;
    }

    /**
     * Returns the emit result of the body of the specified function declaration. This will strip
     * out the surrounding braces.
     * @param node  The function declaration.
     * @return      The emit result.
     */
    transpiledBodyOfFunctionDeclaration(node: ts.FunctionDeclaration): string {
        const result = ts.createPrinter().printNode(ts.EmitHint.Unspecified, node.body!, (this as any).source);
        return result.substring(1, result.length - 1);
    }

    /**
     * Returns the emit result of the body of the specified function declaration and inlines any helpers necessary
     * for the method to function.
     * @param node      The function declaration.
     * @param method    The service or subscription definition for which to transpile the code.
     * @return          The emit result, with added helpers as necessary.
     */
    transpiledBodyOfThingworxMethod(node: ts.FunctionDeclaration, method: TWServiceDefinition | TWSubscriptionDefinition): string {
        // Get the helpers from this source file and the method's global functions
        const helpers = ts.getEmitHelpers((this as any).source) || [];
        const helpersToInline = new Set<ts.EmitHelper>();

        // Some helper dependencies are not always included, if they
        // are introduced due to customized code
        // NOTE: Because getAllUnscopedEmitHelpers is private, this needs to be retested
        // whenever typescript is updated
        const allHelpers = (ts as any).getAllUnscopedEmitHelpers?.() as Map<string, ts.EmitHelper>;

        // Add helpers used by the global functions called by this method
        for (const functionName of method['@globalFunctions']) {
            const fn = this.store['@globalFunctions']?.[functionName];

            if (fn?.emitHelperDependencies) {
                for (const helper of fn.emitHelperDependencies) {
                    // Check if the method's source already has the helper
                    // Despite having the same code, the function's helper will be different instances
                    // from the source file's helpers
                    const localHelper = helpers.find(h => h.name == helper.name);

                    if (!localHelper) {
                        // If it doesn't inline the function's helper
                        helpers.push(helper);
                        helpersToInline.add(helper);
                    }
                    else {
                        // Otherwise inline the method's helper
                        helpersToInline.add(localHelper);
                    }
                }
            }
        }

        // If no helpers are used, just return the compiled method
        // Note that the __extends helper is always included to implement classes; if it is the only one used, skip searching
        if (!helpers || !helpers.length || (helpers.length == 1 && helpers[0].name == 'typescript:extends')) {
            return this.transpiledBodyOfFunctionDeclaration(node);
        }

        // Some helpers depend on others only via their body text and not via the
        // generated js code
        // This is something I may need to keep up to date.
        // TODO: Need a way to automate this.
        const dependencies = {
            'typescript:read': ['typescript:values'],
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

        // Since typescript only reports the helpers used per file, to avoid overloading
        // services with unnecessary code, it's needed to look up usages for each helper 
        // and only inline those that are actually referenced
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
            if (helpersToInline.size) {
                for (const helper of [...helpersToInline]) {
                    if (!dependencies[helper.name]) continue;
                    for (const dependency of dependencies[helper.name]) {
                        // Look for the dependencies in the locally added helpers
                        let addedDepdency = false;
                        for (const rootHelper of helpers) {
                            if (rootHelper.name == dependency) {
                                helpersToInline.add(rootHelper);
                                addedDepdency = true;
                                break;
                            }
                        }

                        // If the dependency wasn't added, look for it in all possible helpers
                        const dependentHelper = allHelpers.get(dependency);
                        if (dependentHelper) {
                            helpersToInline.add(dependentHelper);
                        }
                    }
                }
            }
        } while (helpersToInline.size != size)

        // After identifying the helpers, join their text and add them to the transpiled method body
        return [...helpersToInline].map(helper => codeMap[helper.name] || helper.text).join('\n\n') + this.transpiledBodyOfFunctionDeclaration(node);
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
            const entity = store[className] as TWThingTransformer;
            if (!entity) return;

            // Find the entity methods for which helpers should be added, to determine
            // which of the helpers it actually references
            const methods = (entity.services as (TWServiceDefinition | TWSubscriptionDefinition)[]).concat(entity.subscriptions);
            const method = methods.find(m => m.name == name);

            if (!method) return;

            this.flattenMethodDependencies(method);

            // Inline any referenced global functions
            let transpiledBody = this.inlineGlobalFunctions(this.transpiledBodyOfThingworxMethod(node, method), method);

            // Then add the helpers; because of the way these are added, the helpers will be the first declarations in the code
            transpiledBody = this.injectThingworxMethodHelpers(transpiledBody, name, entity, method);


            if ('parameterDefinitions' in method) {
                const service = method;
                // If this service is a SQL service, don't use the transpiled code
                if (service.SQLInfo) return;

                //const body = ts.createPrinter().printNode(ts.EmitHint.Unspecified, node.body, (this as any).source);
                service.code = transpiledBody;

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
            else {
                const subscription = method;
                if (this.debug) {
                    // In debug builds, an applied anonymous function is used because this is no longer transformed to me
                    subscription.code = transpiledBody;
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
                    subscription.code = `(function () {${transpiledBody}}).apply(me)`;
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
     * @deprecated Unused, this is now handled via a separate thing that 
     * directly announces itself to the debug server.
     * ---
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
     * Extract the value of the category decorator on the specified node, if it exists
     * @param node Class property or method declaration to extract data from
     * @returns Value of the argument of the category
     */
    private getCategoryForNode(node: ts.MethodDeclaration | ts.PropertyDeclaration): string {
        if (this.hasDecoratorNamed('category', node)) {
            const argument = this.literalArgumentOfDecoratorNamed('category', node);

            if (!argument) {
                this.throwErrorForNode(node, 'The category decorator must have a string literal as its argument');
            }
            return argument;
        }
        return '';
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

    //#region Post transform actions

    /**
     * This method must be called after all files have been processed. 
     * Executes code that relies on all files having been compiled and information on them being available
     */
    firePostTransformActions() {
        this.validateConstraints();
        this.handleDataShapeInheritance();
    }

    /**
     * Handles extending the list of fields that a dataShape has
     * with the one present on the parent.
     * If a field is detected on both the parent and the child, the child definition will be used
     */
    private handleDataShapeInheritance(): void {
        // Only applies to dataShapes
        if (this.entityKind != TWEntityKind.DataShape) {
            return;
        }

        // Only applies if this dataShape was found to extend other dataShapes
        if (this.dataShapes.length == 0) {
            return;
        }

        // If this data shape's inherited fields were already added, stop
        if (this.dataShapeInheritanceProcessed) return;

        const messages = this.store['@diagnosticMessages']!;
        // Create a new fields array that concatenates the existing fields with the ones on the parents
        const fieldNames: Record<string, TWDataShapeField> = this.fields.reduce((o, f) => (o[f.name] = f, o), {});

        // Validate that none of the fields exist on any of the parent thing shapes, if defined
        for (const shape of this.dataShapes) {
            const transformer = this.store[shape] as TWThingTransformer;
            if (transformer) {
                // If inheritance was not processed for this base data shape, do it now
                // to ensure that this data shape also inherits its inherited fields
                if (!transformer.dataShapeInheritanceProcessed) {
                    transformer.handleDataShapeInheritance();
                }

                transformer.fields.forEach(f => {
                    // If the property is already declared on the child, then that definition overrides the one on the parent
                    if (!fieldNames[f.name]) {
                        fieldNames[f.name] = f;
                    }
                    else {
                        // Only warn if the field is not explicitly overriden.
                        if (fieldNames[f.name]['@isOverriden']) return;

                        messages.push({
                            message: `DataShape "${this.className}" contains field "${f.name}" that is also declared on the parent "${shape}". Declaration on the ${this.exportedName} is going to be used. Use the override keyword to suppress this message.`,
                            kind: DiagnosticMessageKind.Warning
                        });
                    }
                })
            }
            else {
                messages.push({
                    message: `DataShapes can only extend other dataShapes declared in the project, and not external ones. DataShape "${this.className}" extends "${shape}".`,
                    kind: DiagnosticMessageKind.Error
                });
            }
        }

        // Update the list of fields on the parents
        this.fields = Object.values(fieldNames);

        // Mark inheritance as done
        this.dataShapeInheritanceProcessed = true;
    }

    /**
     * This method must be called after all files have been processed. Validates, where
     * possible, that constraints that thingworx expects are met and saves the relevant
     * diagnostic messages in the store.
     * If any constraint violations would prevent the project from being imported in thingworx,
     * an error diagnostic message will be saved in the store.
     */
    private validateConstraints() {
        // Initialize the message store if it doesn't exist
        this.store['@diagnosticMessages'] = this.store['@diagnosticMessages'] || [];

        // Validate that thing shapes do not have duplicate fields
        this._validateThingShapeDuplicates(this.className || '');

        // Validate that override and final are used correctly
        this._validateServiceOverrides(this.className || '');
    }

    /**
     * Validates that there are no duplicate non-overriden fields declared in the thing shapes
     * and templates from which this entity inherits, which are permitted by typescript but not by thingworx.
     * @param sourceClassName           The class name for which field names are reported.
     * @param baseFieldNames            If specified, a set of field names to check against.
     */
    private _validateThingShapeDuplicates(sourceClassName: string, baseFieldNames: Record<string, string> = {}): void {
        const messages = this.store['@diagnosticMessages']!;

        // Only things, templates and thing shapes support this currently
        switch (this.entityKind) {
            case TWEntityKind.Thing:
            case TWEntityKind.ThingTemplate:
            case TWEntityKind.ThingShape:
                break;
            default:
                return;
        }

        // A set of field names to be checked for duplicates
        const fieldNames: Record<string, string> = baseFieldNames;

        // Add all property, event and subscription names.
        // If any exist in the base field names, report an error.
        type Field = {name: string, [key: string]: any};
        const nonOverridableFields: Field[] = (this.properties as Field[]).concat(this.events as Field[]).concat(this.subscriptions as Field[]);
        for (const property of nonOverridableFields) {
            if (fieldNames[property.name]) {
                messages.push({
                    message: `Class "${fieldNames[property.name]}" incorrectly overrides property "${property.name}" which is not supported in Thingworx.`,
                    kind: DiagnosticMessageKind.Error
                });
            }
            else {
                fieldNames[property.name] = this.className || '';
            }
        }

        // Add all services, omitting the overriden ones
        for (const service of this.services) {
            if (service.isOverriden) continue;

            if (fieldNames[service.name]) {
                messages.push({
                    message: `Class "${fieldNames[service.name]}" incorrectly overrides service "${service.name}" without using the override keyword.`,
                    kind: DiagnosticMessageKind.Error
                });
            }
            else {
                fieldNames[service.name] = this.className || '';
            }
        }

        // Validate that none of the fields exist on the parent template, if defined
        if (this.thingTemplateName && this.store[this.thingTemplateName]) {
            const transformer = this.store[this.thingTemplateName]! as TWThingTransformer;
            transformer._validateThingShapeDuplicates(sourceClassName, fieldNames);
        }

        // Validate that none of the fields exist on any of the parent thing shapes, if defined
        for (const shape of this.thingShapes) {
            const transformer = this.store[shape] as TWThingTransformer;
            if (transformer) {
                transformer._validateThingShapeDuplicates(sourceClassName, fieldNames);
            }
        }
    }

    /**
     * Validates that services don't override final services and that final services
     * aren't overriden from the base class.
     * @param sourceClassName           The class name for which overriden services are validated.
     * @param overridenServices         A set of service names that were overriden.
     */
    private _validateServiceOverrides(sourceClassName: string, overridenServices: Record<string, string> = {}): void {
        const messages = this.store['@diagnosticMessages']!;

        // Only things, templates and thing shapes support this
        switch (this.entityKind) {
            case TWEntityKind.Thing:
            case TWEntityKind.ThingTemplate:
            case TWEntityKind.ThingShape:
                break;
            default:
                return;
        }

        // Collect all service that are overriden, and report an error for services that were
        // overriden but where the base service is final
        for (const service of this.services) {
            if (service.isOverriden) {
                overridenServices[service.name] = this.className || '';
            }

            if (!service.isAllowOverride && overridenServices[service.name]) {
                messages.push({
                    message: `Class "${overridenServices[service.name]}" incorrectly overrides service "${service.name}" which is final on "${this.className}".`,
                    kind: DiagnosticMessageKind.Error
                });
            }
        }

        // Validate that none of the overriden services are final on the parent thing template, if defined
        if (this.thingTemplateName && this.store[this.thingTemplateName]) {
            const transformer = this.store[this.thingTemplateName]! as TWThingTransformer;
            transformer._validateServiceOverrides(sourceClassName, overridenServices);
        }

        // Validate that none of the overriden services are final on any parent thing shapes, if defined
        for (const shape of this.thingShapes) {
            const transformer = this.store[shape] as TWThingTransformer;
            if (transformer) {
                transformer._validateServiceOverrides(sourceClassName, overridenServices);
            }
        }
    }

    //#endregion

    //#region XML Output

    /**
     * Returns an object representing the given infotable, that can be converted to an XML tag
     * using xml2js.
     * @param infotable         The infotable to convert.
     * @param withOrdinals      Defaults to `false`. If set to `true`, the ordinal property will be specified.
     * @returns                 An object.
     */
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
     * Returns an object that describes the XML structure of the given service's implementation.
     * @param service           The service.
     * @returns                 An implementation object.
     */
    private _implementationOfService(service: TWServiceDefinition) {
        if (!service.SQLInfo) {
            return this._implementationOfJavaScriptService(service);
        }
        else {
            return this._implementationOfSQLService(service);
        }
    }

    /**
     * Returns an object that describes the XML structure of the given javascript service's implementation.
     * @param service           The service.
     * @returns                 An implementation object.
     */
    private _implementationOfJavaScriptService(service: TWServiceDefinition) {
        return {
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
    }


    /**
     * Returns an object that describes the XML structure of the given SQL service's implementation.
     * @param service           The service.
     * @returns                 An implementation object.
     */
    private _implementationOfSQLService(service: TWServiceDefinition) {
        const implementation = {
            $: {
                description: "",
                handlerName: service.SQLInfo!.handler,
                name: service.name
            },
            ConfigurationTables: [
                {
                    ConfigurationTable: [
                        {
                            $: {
                                description: service.SQLInfo!.handler,
                                isMultiRow: "false",
                                name: 'Query',
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
                                                        description: "sql",
                                                        name: "sql",
                                                        ordinal: "0"
                                                    }
                                                },
                                                {
                                                    $: {
                                                        baseType: "NUMBER",
                                                        description: "timeout",
                                                        name: "timeout",
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
                                            sql: [service.code],
                                            timeout: service.SQLInfo!.timeout || 60
                                        } as {
                                            sql: string[],
                                            timeout: number,
                                            maxItems?: number
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        // If the service is a query, it also has a max rows field
        if (service.SQLInfo!.handler == 'SQLQuery') {
            implementation.ConfigurationTables[0].ConfigurationTable[0].DataShape[0].FieldDefinitions[0].FieldDefinition.push({
                $: {
                    baseType: 'NUMBER',
                    description: 'maxItems',
                    name: 'maxItems',
                    ordinal: '0'
                }
            });

            implementation.ConfigurationTables[0].ConfigurationTable[0].Rows[0].Row[0].maxItems = service.SQLInfo!.maxRows || 500;
        }

        return implementation;
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
                    if (key == 'aspects' || key == 'remoteBinding' || key == 'code' || key == 'parameterDefinitions' || key == 'resultType' || key == 'isOverriden' || key == 'SQLInfo' || key.startsWith('@')) continue;
    
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
                const implementation = this._implementationOfService(service);
                
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
                if (key == 'code' || key.startsWith('@')) continue;

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
                if (key == 'aspects' || key.startsWith('@')) continue;

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

    //#endregion

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
    write(path: string = `${this.root}/build`): void {
        if (!fs.existsSync(`${path}`)) fs.mkdirSync(`${path}`);
        if (!fs.existsSync(`${path}/Entities`)) fs.mkdirSync(`${path}/Entities`);

        let entityKind: string = this.entityKind;
        // User lists are to be saved under a "Users" subfolder.
        if (this.entityKind == TWEntityKind.UserList) {
            entityKind = 'User';
        }

        if (!fs.existsSync(`${path}/Entities/${entityKind}s`)) fs.mkdirSync(`${path}/Entities/${entityKind}s`);

        fs.writeFileSync(`${path}/Entities/${entityKind}s/${this.exportedName}.xml`, this.toXML());
    }

}

export { TWConfig, MethodHelpers };

export * from './TWCoreTypes';

export function TWThingTransformerFactory(program: ts.Program, root: string, after: boolean = false, watch: boolean = false, project?: string | TWConfig) {
    return function TWThingTransformerFunction(context: ts.TransformationContext) {
        const transformer = new TWThingTransformer(program, context, root, after, watch);

        // The path normalized for the current platform, this is needed in multi project
        // builds because typescript filenames will also be normalized
        const rootPath = path.normalize(root);

        if (project) {
            if (typeof project == 'string') {
                transformer.projectName = project;
            }
            else {
                // If the project name is "@auto", the project name must be derived from the last
                // component of the root path
                if (project.projectName == '@auto') {
                    transformer.projectName = rootPath.split(path.sep).pop();
                    transformer.repoPath = rootPath.substring(0, rootPath.length - transformer.projectName!.length - 1);
                    transformer.isAutoProject = true;
                }
                else {
                    transformer.projectName = project.projectName;
                    transformer.repoPath = rootPath;
                }
                transformer.experimentalGlobals = project.experimentalGlobals;
                transformer.autoGenerateDataShapeOrdinals = project.autoGenerateDataShapeOrdinals || false;
                transformer.store = project.store;
                transformer.debug = project.debug;
                transformer.generateThingInstances = project.generateThingInstances;
                transformer.methodHelpers = project.methodHelpers;
                transformer.globalFunctionsEnabled = project.globalFunctions;
                transformer.inlineSQLOptions = project.inlineSQL;
            }
        }
    
        return (node: ts.SourceFile) => {
            // Exclude files that originate from other projects, whose path does not contain
            // this project's root path
            if (transformer.isAutoProject && !path.normalize(node.fileName).startsWith(rootPath)) {
                return node;
            }

            if (!after && transformer.debug) {
                // When running in debug mode, a different transformer may have already visited parts of this
                // transformer's file and added debug information to it
                // If that has happened, load the debug state saved by that transformer
                if (transformer.store['@debugInformation']?.[node.fileName]) {
                    const debugStore = transformer.store['@debugInformation'][node.fileName];
                    Object.assign(transformer, {
                        _debugBreakpointCounter: debugStore._debugBreakpointCounter,
                        breakpointLocations: debugStore.breakpointLocations,
                        breakpoints: debugStore.breakpoints,
                    });
                }
            }

            return ts.visitNode(node, node => transformer.visit(node))
        };
    }
}
