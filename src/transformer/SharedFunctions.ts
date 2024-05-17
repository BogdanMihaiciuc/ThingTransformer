import * as TS from 'typescript';
import { DiagnosticMessageKind, TWBaseTypes, type TWConfigurationTable, type TWInfoTable } from './TWCoreTypes';
import { ConstantValueUndefined, type TransformerStore } from './ThingTransformer';

/**
 * Defines properties that both UITransformers and ThingTransformers must have to be used
 * with the shared functions.
 */
interface TransformerBase {
    isGlobalFunctionTransformer?: boolean;

    program: TS.Program;
    context: TS.TransformationContext;
    sourceFile?: TS.SourceFile;
    store: TransformerStore;

    positionOffset?: number;
}

/**
 * Throws a formatted error message for the specified AST node.
 * @param node                  The node which caused an error.
 * @param error                 The error message to display.
 * @param sourceFileFallback    An optional fallback source file that will be used if the
 *                              source file cannot be obtained from the node.
 */
export function ThrowErrorForNode(node: TS.Node, error: string, sourceFileFallback?: TS.SourceFile): never {
    const limit = Error.stackTraceLimit;
        try {
            Error.stackTraceLimit = 0;
            const sourceFile = node.getSourceFile() || sourceFileFallback;
            let position: TS.LineAndCharacter | undefined;
            try {
                position = sourceFile.getLineAndCharacterOfPosition(node.getStart());
            }
            catch (ignored) {
                // For synthetic nodes, the line and character positions cannot be determined
            }

            if (position) {
                // Line and character positions are 0-indexed, but we want to display them as 1-indexed, as it's easier for the user
                throw new Error(`Error in file ${sourceFile.fileName}:${position.line + 1}:${position.character + 1}\n\n${error}\n
    Failed parsing at: \n${node.getText()}\n\n`);
            } else {
                throw new Error(`Error in file ${sourceFile?.fileName}\n\n${error}\n`);
            }
        }
        finally {
            Error.stackTraceLimit = limit;
        }
}

// #region Decorator helpers

/**
 * Returns the decorator node with the specified name applied to a node.
 * @param name      The name of the decorator to find.
 * @param node      The node in which to search.
 * @return          A decorator if one is defined on the node, `undefined` otherwise.
 */
export function DecoratorNamed(name: string, node: TS.HasDecorators): TS.Decorator | undefined {
    const decorators = TS.getDecorators(node);
    if (!decorators) return undefined;

    // Getting the decorator name depends on whether the decorator is applied directly or via a
    // decorator factory
    for (const decorator of decorators) {
        if (decorator.expression.kind == TS.SyntaxKind.CallExpression) {
            const callExpression = decorator.expression as TS.CallExpression;
            if (callExpression.expression.getText() == name) {
                return decorator;
            }
        }
        else if (decorator.expression.kind == TS.SyntaxKind.Identifier) {
            const identifierExpression = decorator.expression as TS.Identifier;
            if (identifierExpression.text == name) {
                return decorator;
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
export function HasDecoratorNamed(name: string, node: TS.HasDecorators): boolean {
    return !!DecoratorNamed(name, node);
}

/**
 * Retrieves the arguments of the decorator with the given name, if the decorator exists and is a applied
 * via a decorator factory.
 * @param name      The name of the decorator to find.
 * @param node      The node in which to search.
 * @return          An array of expressions representing the arguments, or `undefined` if they could not be retrieved.
 */
export function ArgumentsOfDecoratorNamed(name: string, node: TS.HasDecorators): TS.NodeArray<TS.Expression> | undefined {
    const decorators = TS.getDecorators(node);
    if (!decorators) return;
    
    for (const decorator of decorators) {
        if (decorator.expression.kind == TS.SyntaxKind.CallExpression) {
            const callExpression = decorator.expression as TS.CallExpression;
            if (callExpression.expression.getText() == name) {
                return callExpression.arguments;
            }
        }
    }
}

// #endregion

// #region Constant values

/**
 * Returns the constant value of the given expression so that it can be inlined.
 * A constant value that must be inlined can occur because of a const enum member or because of
 * an environment variable.
 * @param expression    The expression whose constant value should be evaluated.
 * @param transformer   The transformer instance containing details about the project.
 * @returns             The constant value if it could be resolved, `undefined` otherwise.
 */
export function ConstantOrLiteralValueOfExpression(expression: TS.Expression, transformer: TransformerBase): unknown {
    if (TS.isNumericLiteral(expression)) {
        return parseFloat((expression as TS.NumericLiteral).text);
    }
    else if (TS.isPrefixUnaryExpression(expression) && TS.isNumericLiteral(expression.operand) && expression.operator == TS.SyntaxKind.MinusToken) {
        // check for negative number
        return parseFloat('-' + (expression.operand as TS.NumericLiteral).text);
    }
    else if (TS.isStringLiteral(expression)) {
        return expression.text;
    }
    else if (expression.kind == TS.SyntaxKind.TrueKeyword) {
        return true;
    }
    else if (expression.kind == TS.SyntaxKind.FalseKeyword) {
        return false;
    }
    else if (TS.isPropertyAccessExpression(expression)) {
        return ConstantValueOfExpression(expression, transformer);
    }

    return undefined;
}

/**
 * Returns the constant value of the specified property access expression so that it can be inlined.
 * A constant value that must be inlined can occur because of a const enum member or because of
 * an environment variable.
 * @param expression    The expression whose constant value should be evaluated.
 * @param transformer   The transformer instance containing details about the project.
 * @returns             The constant value if it could be resolved, `undefined` otherwise. If the constant
 *                      value itself should be `undefined`, the constant `ConstantValueUndefined` will be returned.
 */
export function ConstantValueOfExpression(expression: TS.Expression, transformer: TransformerBase): unknown {
    if (expression.kind != TS.SyntaxKind.PropertyAccessExpression) return undefined;

    const propertyAccess = expression as TS.PropertyAccessExpression
    
    const sourceObject = propertyAccess.expression;
    const value = propertyAccess.name.text;

    if (sourceObject.kind == TS.SyntaxKind.PropertyAccessExpression) {
        // If the source object is itself a property acess expression, it may refer to an env variable
        const sourceExpression = sourceObject as TS.PropertyAccessExpression;
        const sourceExpressionSource = sourceExpression.expression.getText();
        const sourceExpressionValue = sourceExpression.name.text;

        if (sourceExpressionSource == 'process' && sourceExpressionValue == 'env') {
            // If the environment variable is not defined, replace the expression with `undefined
            if (!(value in process.env)) {
                // Log a diagnostic message about this value
                const position = transformer.sourceFile && TS.getLineAndCharacterOfPosition(transformer.sourceFile, transformer.positionOffset || 0 + propertyAccess.name.pos);
                transformer.store['@diagnosticMessages'] = transformer.store['@diagnosticMessages'] || [];
                transformer.store['@diagnosticMessages'].push({
                    kind: DiagnosticMessageKind.Warning, 
                    message: `Referenced environment variable ${value} is not defined.`, 
                    file: transformer.sourceFile?.fileName,
                    line: position?.line,
                    column: position?.character
                });
                return ConstantValueUndefined;
            }

            // If this is an environment variable, inline it
            return process.env[value];
        }
    }
    else {
        // Otherwise it may just be a const enum
        const emitResolver: TS.TypeChecker = (transformer.context as any).getEmitResolver();

        if (emitResolver) {
            // If this has an offset defined or is a global function transformer, determine the
            // actual node to use in the original source file
            const hasOffset = transformer.positionOffset && transformer.sourceFile;
            const isGlobalFunctionTransformer = transformer.isGlobalFunctionTransformer && transformer.sourceFile;
            if (hasOffset || isGlobalFunctionTransformer) {
                const originalNode = FindOriginalNodeOfExpression(propertyAccess, transformer);

                // If the source node was found, use it to determine the constant value
                if (originalNode) {
                    return emitResolver.getConstantValue(originalNode);
                }
            }

            // The emit resolver is able to get the constant value directly
            return emitResolver.getConstantValue(propertyAccess);
        }
        else {
            // If the emit resolver isn't available (e.g. due to using TS.transform)
            // Use the type checker to determine if the source object is an enum
            // and find the initializer for its field

            // NOTE: the type checker also has a getConstantValue method, but this
            // does not appear to work when directly called against an enum member access
            // expression
            
            const typeChecker = transformer.program.getTypeChecker();
            const symbol = typeChecker.getSymbolAtLocation(propertyAccess);

            if (symbol && symbol.declarations) {
                // If the symbol has multiple declarations, return the constant value
                // of the first one that can be computed, if any
                for (const declaration of symbol.declarations) {
                    if (
                        TS.isPropertyAccessExpression(declaration) || 
                        TS.isEnumMember(declaration) || 
                        TS.isElementAccessExpression(declaration)
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
 * Find the original node in the original source file that corresponds to the specified expression.
 * 
 * This is used in global function transformers to determine the actual node to use in the original source file.
 * @param expression Expression node in the transformed source file to be matched with the original node.
 * @param transformer The transformer instance containing details about the project.
 * @returns 
 */
export function FindOriginalNodeOfExpression<T extends TS.Expression>(expression: T, transformer: TransformerBase): T | undefined {
    // If this has an offset defined or is a global function transformer, determine the
    // actual node to use in the original source file
    const hasOffset = transformer.positionOffset && transformer.sourceFile;
    const isGlobalFunctionTransformer = transformer.isGlobalFunctionTransformer && transformer.sourceFile;
    if (hasOffset || isGlobalFunctionTransformer) {
        let originalNode: T | undefined;
        const offset = transformer.positionOffset ?? 0;

        /**
         * Verifies if the specified node is the original node in the original source file,
         * otherwise continues to search for it in the specified node's descendants.
         * @param node          The node to verify.
         * @returns             The `node` argument.
         */
        const findNode = (node: TS.Node): void => {
            // If the original node was already found, stop searching
            if (originalNode) {
                return;
            }

            // The original node should have the same syntax kind and position
            if (node.kind == expression.kind && node.pos == offset! + expression.pos) {
                // And additionally the same text
                try {
                    if (node.getText() == expression.getText()) {
                        originalNode = node as T;
                    }
                }
                catch (e) {
                    // getText can fail for certain synthetic nodes, if this happens move on to the next node
                }
            }

            TS.forEachChild(node, findNode);
        }

        // Recursively search for the original node in the original source file
        TS.forEachChild(transformer.sourceFile!, findNode);

        // If the source node was found, use it to determine the constant value
        return originalNode;
    } else {
        return undefined;
    }
        
}

// #endregion

// #region Configuration Tables

/**
 * Returns an array of configuration tables that corresponds to the specified class expression.
 * @param node              The class expression node.
 * @param errorHandler      A handler that is invoked when an error occurs. This function must not return.
 * @returns                 An array of configuration tables.
 */
export function ConfigurationTablesDefinitionWithClassExpression(node: TS.ClassExpression, errorHandler: (node: TS.Node, message: string) => never): TWConfigurationTable[] {
    if (node.name) errorHandler(node, `The argument for the @ConfigurationTables decorator must be an anonymous class.`);
    if (node.heritageClauses) errorHandler(node, `The argument for the @ConfigurationTables decorator must be a root class.`);

    const tables: TWConfigurationTable[] = [];

    for (const member of node.members) {
        if (member.kind == TS.SyntaxKind.MethodDeclaration) errorHandler(node, `The @ConfigurationTables class cannot contain methods.`);

        if (!member.name || member.name.kind != TS.SyntaxKind.Identifier) errorHandler(member, `Configuration table names cannot be computed.`);

        const table: TWConfigurationTable = {
            category: '',
            description: '',
            'isHidden': false,
            name: member.name.text,
            dataShapeName: '',
            isMultiRow: false
        };

        const property = member as TS.PropertyDeclaration;

        const type = property.type as TS.TypeReferenceNode;
        if (!type) errorHandler(member, `Configuration table properties must be typed as either "Table" or "MultiRowTable".`);

        if (property.type!.kind != TS.SyntaxKind.TypeReference) {
            errorHandler(member, `Configuration table properties must be typed as either "Table" or "MultiRowTable".`);
        }

        if (type.typeName.getText() == 'Table') {
            table.isMultiRow = false;
        }
        else if (type.typeName.getText() == 'MultiRowTable') {
            table.isMultiRow = true;
        }
        else {
            errorHandler(member, `Configuration table properties must be typed as either "Table" or "MultiRowTable".`);
        }

        if (!type.typeArguments || type.typeArguments.length != 1) errorHandler(member, `Configuration table properties must have one type parameter representing the data shape name.`);

        const typeArgument = type.typeArguments[0];
        if (typeArgument.kind == TS.SyntaxKind.TypeReference) {
            table.dataShapeName = (typeArgument as TS.TypeReferenceNode).typeName.getText();
        }
        else if (typeArgument.kind == TS.SyntaxKind.LiteralType) {
            table.dataShapeName = ((typeArgument as TS.LiteralTypeNode).literal as TS.StringLiteral).text;
        }
        else {
            errorHandler(member, `The configuration table type argument must be a data shape class reference or exported name.`);
        } 
        
        tables.push(table);
    }

    return tables;
}

// #endregion
// #region Configuration

/**
 * Converts the specified object literal expression to an object literal that can be stringified.
 * @param literal           The literal to convert.
 * @param errorHandler      A handler that is invoked when an error occurs. This function must not return.
 * @param transformer       The transformer for which this conversion is performed.
 * @returns                 An object.
 */
export function ObjectLiteralWithObjectLiteralExpression(literal: TS.ObjectLiteralExpression, errorHandler: (node: TS.Node, message: string) => never, transformer: TransformerBase): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    for (const member of literal.properties) {
        if (member.kind != TS.SyntaxKind.PropertyAssignment) {
            errorHandler(literal, 'Configuration fields must be property assignments');
        }
        if (!member.name || member.name.kind != TS.SyntaxKind.Identifier) errorHandler(member, `Configuration field names cannot be computed.`);

        const name = member.name.text;

        switch (member.initializer.kind) {
            case TS.SyntaxKind.TrueKeyword:
                result[name] = true;
                break;
            case TS.SyntaxKind.FalseKeyword:
                result[name] = false;
                break;
            case TS.SyntaxKind.StringLiteral:
                result[name] = (member.initializer as TS.StringLiteral).text;
                break;
            case TS.SyntaxKind.NumericLiteral:
                result[name] = parseFloat((member.initializer as TS.NumericLiteral).text);
                break;
            case TS.SyntaxKind.PropertyAccessExpression:
                const constant = ConstantValueOfExpression(member.initializer, transformer);
                if (constant === undefined) {
                    errorHandler(member, `Configuration field values must be compile time constants.`)
                }
                if (constant === ConstantValueUndefined) {
                    // If the value is undefined, don't add this key
                    break;
                }
                result[name] = constant;
                break;
            default:
                errorHandler(member, `Configuration field values can only be literal primitives`);
        }
    }

    return result;
}

/**
 * Returns a configuration object for the specified object literal.
 * @param node              The node to visit.
 * @param errorHandler      A handler that is invoked when an error occurs. This function must not return.
 * @param transformer       The transformer for which this configuration is extracted.
 * @returns                 An array of configuration tables.
 */
export function ConfigurationWithObjectLiteralExpression(node: TS.ObjectLiteralExpression, errorHandler: (node: TS.Node, message: string) => never, transformer: TransformerBase): Record<string, TWInfoTable> {
    const configuration = {};

    for (const member of node.properties) {
        if (member.kind == TS.SyntaxKind.MethodDeclaration) errorHandler(node, `The @config object cannot contain methods.`);

        if (member.kind != TS.SyntaxKind.PropertyAssignment) errorHandler(node, `The @config object must contain only property assignments.`);

        if (!member.name || member.name.kind != TS.SyntaxKind.Identifier) errorHandler(member, `Configuration table names cannot be computed.`);

        const name = member.name.text;

        const property = member as TS.PropertyAssignment;

        const table: TWInfoTable = {
            dataShape: {
                fieldDefinitions: {}
            },
            rows: []
        };

        switch (property.initializer.kind) {
            case TS.SyntaxKind.ObjectLiteralExpression:
                table.rows.push(ObjectLiteralWithObjectLiteralExpression(property.initializer as TS.ObjectLiteralExpression, errorHandler, transformer));
                break;
            case TS.SyntaxKind.ArrayLiteralExpression:
                const array = property.initializer as TS.ArrayLiteralExpression;
                for (const element of array.elements) {
                    if (element.kind != TS.SyntaxKind.ObjectLiteralExpression) {
                        errorHandler(array, 'Configuration rows must be object literals.');
                    }
                    table.rows.push(ObjectLiteralWithObjectLiteralExpression(element as TS.ObjectLiteralExpression, errorHandler, transformer));
                }
                break;
            default:
                errorHandler(property, 'Configuration properties must be array or object literals.');
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

        configuration[name] = table;
    }

    return configuration;
}

// #endregion


/**
 * Recursively converts the specified object literal expression to an object literal that can be stringified.
 * @param literal           The literal to convert.
 * @param errorHandler      A handler that is invoked when an error occurs. This function must not return.
 * @param transformer       The transformer for which this conversion is performed.
 * @returns                 An object.
 */
export function JSONWithObjectLiteralExpression(node: TS.ObjectLiteralExpression | TS.ArrayLiteralExpression, errorHandler: (node: TS.Node, message: string) => never, transformer: TransformerBase): Record<string, unknown> | unknown[] {
    if (TS.isObjectLiteralExpression(node)) {
        const result: Record<string, unknown> = {};
        for (const member of node.properties) {
            if (!TS.isPropertyAssignment(member) || !member.name || !(TS.isIdentifier(member.name) || TS.isStringLiteralLike(member.name))) {
                errorHandler(member, `Literal property names must be identifiers or string literals`);
            }

            const name = member.name.text;

            // Skip undefined properties, these are supported by JSON.stringify but don't produce any output
            if (member.initializer.kind == TS.SyntaxKind.UndefinedKeyword) {
                continue;
            }

            if (member.initializer.kind == TS.SyntaxKind.NullKeyword) {
                result[name] = null;
                continue;
            }

            if (TS.isObjectLiteralExpression(member.initializer) || TS.isArrayLiteralExpression(member.initializer)) {
                result[name] = JSONWithObjectLiteralExpression(member.initializer, errorHandler, transformer);
                continue;
            }

            const constant = ConstantOrLiteralValueOfExpression(member.initializer, transformer);
            if (typeof constant === 'undefined') {
                errorHandler(member, `Literal property values must be literals.`);
            }

            result[name] = constant;
        }

        return result;
    }
    else {
        const result: unknown[] = [];

        for (const item of node.elements) {
            if (item.kind == TS.SyntaxKind.UndefinedKeyword) {
                continue;
            }

            if (item.kind == TS.SyntaxKind.NullKeyword) {
                result.push(null);
                continue;
            }

            if (TS.isObjectLiteralExpression(item) || TS.isArrayLiteralExpression(item)) {
                result.push(JSONWithObjectLiteralExpression(item, errorHandler, transformer));
                continue;
            }

            const constant = ConstantOrLiteralValueOfExpression(item, transformer);
            if (typeof constant === 'undefined') {
                errorHandler(item, `Literal property values must be literals.`);
            }

            result.push(constant);
        }

        return result;
    }
}

/**
 * Returns an object representing the given infotable, that can be converted to an XML tag
 * using xml2js.
 * @param infotable         The infotable to convert.
 * @param withOrdinals      Defaults to `false`. If set to `true`, the ordinal property will be specified.
 * @returns                 An object.
 */
export function XMLRepresentationOfInfotable(infotable: TWInfoTable, withOrdinals = false) {
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

export function CreatePrinter(context: TS.TransformationContext): TS.Printer {
    return TS.createPrinter({},
        {
          onEmitNode: context.onEmitNode,
          isEmitNotificationEnabled: context.isEmitNotificationEnabled,
          substituteNode: context.onSubstituteNode,
        });
}