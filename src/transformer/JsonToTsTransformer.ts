import * as ts from 'typescript';
import { TWPropertyDefinition, TWBaseTypes, TWFieldAspects } from './TWCoreTypes';

export class JsonThingToTsTransformer {
    /**
     * Transforms a Thingworx property definition entity into a typescript class property definition.
     *
     * @param propertyDefinition Parameter definition on the native Thingworx format
     * @returns Typescript definition of the parameter
     */
    public parsePropertyDefinition(propertyDefinition: TWPropertyDefinition, currentValue?: any): ts.PropertyDeclaration {
        const decorators: ts.Decorator[] = [];
        const modifiers: ts.Modifier[] = [];
        // handle the `isPersistent` aspect that maps directly into an decorator
        if (propertyDefinition.aspects.isPersistent) {
            decorators.push(ts.factory.createDecorator(ts.factory.createIdentifier('persistent')));
        }
        // handle the `isLogged` aspect that maps directly into an decorator
        if (propertyDefinition.aspects.isLogged) {
            decorators.push(ts.factory.createDecorator(ts.factory.createIdentifier('logged')));
        }
        // handle the `minimumValue` aspect that maps directly into an decorator with a single param
        if (propertyDefinition.aspects.minimumValue) {
            decorators.push(
                ts.factory.createDecorator(
                    ts.factory.createCallExpression(ts.factory.createIdentifier('minimumValue'), undefined, [
                        ts.factory.createNumericLiteral(propertyDefinition.aspects.minimumValue),
                    ]),
                ),
            );
        }
        // handle the `maximumValue` aspect that maps directly into an decorator with a single param
        if (propertyDefinition.aspects.maximumValue) {
            decorators.push(
                ts.factory.createDecorator(
                    ts.factory.createCallExpression(ts.factory.createIdentifier('maximumValue'), undefined, [
                        ts.factory.createNumericLiteral(propertyDefinition.aspects.maximumValue),
                    ]),
                ),
            );
        }
        // handle the `units` aspect that maps directly into an decorator with a single param
        if (propertyDefinition.aspects.units) {
            decorators.push(
                ts.factory.createDecorator(
                    ts.factory.createCallExpression(ts.factory.createIdentifier('unit'), undefined, [
                        ts.factory.createStringLiteral(propertyDefinition.aspects.units),
                    ]),
                ),
            );
        }
        // handle the `dataChangeType` aspect that maps directly into an decorator with two parameters
        if (propertyDefinition.aspects.dataChangeType) {
            const decoratorArguments: ts.Expression[] = [ts.factory.createStringLiteral(propertyDefinition.aspects.dataChangeType)];
            if (propertyDefinition.aspects.dataChangeThreshold != undefined) {
                decoratorArguments.push(ts.factory.createNumericLiteral(propertyDefinition.aspects.dataChangeThreshold));
            }
            decorators.push(
                ts.factory.createDecorator(
                    ts.factory.createCallExpression(ts.factory.createIdentifier('dataChangeType'), undefined, decoratorArguments),
                ),
            );
        }
        // handle the `isRemote` aspect that maps directly into an decorator with parameters. A corresponding `remoteBinding` property must exist on the propertyDefinition
        // todo: handle the kepware specific decorators. This are currently not supported in the reverse conversion
        // todo: On 9.2, there does not seem to a remote binding attribute on the property definition, but rather a special top level `propertyBindings` property
        // an idea would be to inject the remote binding information directly here
        if (propertyDefinition.aspects.isRemote && propertyDefinition.remoteBinding) {
            const remoteArgs: ts.ObjectLiteralElementLike[] = [];
            const handledRemoteBindingKeys = ['pushType', 'pushThreshold', 'startType', 'foldType', 'cacheTime', 'timeout'];
            // the source name is either present in the remote binding definition, or the name of the property itself
            const remoteSourceName = propertyDefinition.remoteBinding.sourceName || propertyDefinition.name;
            for (const key in propertyDefinition.remoteBinding) {
                if (handledRemoteBindingKeys.indexOf(key) != -1) {
                    remoteArgs.push(
                        ts.factory.createPropertyAssignment(key, this.createNodeLiteral(propertyDefinition.remoteBinding[key])),
                    );
                }
            }

            const remoteDecorator = ts.factory.createDecorator(
                ts.factory.createCallExpression(ts.factory.createIdentifier('remote'), undefined, [
                    ts.factory.createStringLiteral(remoteSourceName),
                    ts.factory.createObjectLiteralExpression(remoteArgs),
                ]),
            );
            decorators.push(remoteDecorator);
        }
        // handle the local binding metadata. This maps into a decorator with two parameters
        // todo: On 9.2, there does not seem to a local binding attribute on the property definition, but rather a special top level `propertyBindings` property
        if (propertyDefinition.localBinding) {
            const remoteDecorator = ts.factory.createDecorator(
                ts.factory.createCallExpression(ts.factory.createIdentifier('local'), undefined, [
                    ts.factory.createStringLiteral(propertyDefinition.localBinding.sourceThingName),
                    ts.factory.createStringLiteral(propertyDefinition.localBinding.sourceName),
                ]),
            );
            decorators.push(remoteDecorator);
        }
        // todo: should default value be used as an aspect or as an property initializer
        if (propertyDefinition.aspects.isReadOnly) {
            modifiers.push(ts.factory.createModifier(ts.SyntaxKind.ReadonlyKeyword));
        }
        const initializerValue = currentValue || propertyDefinition.aspects.defaultValue;

        // todo: handle permissions
        const propertyDeclaration = ts.factory.createPropertyDeclaration(
            // maintain a consistent order of decorators
            decorators,
            modifiers,
            propertyDefinition.name,
            initializerValue ? undefined : ts.factory.createToken(ts.SyntaxKind.ExclamationToken),
            this.getTypeNodeFromBaseType(propertyDefinition.baseType, propertyDefinition.aspects),
            initializerValue && this.createNodeLiteral(initializerValue),
        );
        // only add jsdoc on the property, if description exists
        if (propertyDefinition.description) {
            return ts.addSyntheticLeadingComment(
                propertyDeclaration,
                ts.SyntaxKind.MultiLineCommentTrivia,
                this.commentize(propertyDefinition.description),
                true,
            );
        } else {
            return propertyDeclaration;
        }
    }

    /**
     * Obtains the typescript type reference from a given thingworx basetype.
     * * For most basetypes, this is a direct mapping.
     * * For INFOTABLE, use a typeArgument of the datashape (if it exists)
     * * For THINGNAME and THINGTEMPLATENAME, be able to reference a referencing ThingTemplate or ThingShape
     *
     * @param baseTypeName Thingworx basetype name
     * @param aspects field aspects containing information about used datashapes or thingtemplate
     * @returns A ts type reference
     */
    private getTypeNodeFromBaseType(baseTypeName: keyof typeof TWBaseTypes, aspects: TWFieldAspects<unknown>): ts.TypeReferenceNode {
        const typeArguments: ts.TypeNode[] = [];
        if (baseTypeName == TWBaseTypes.INFOTABLE && aspects.dataShape) {
            typeArguments.push(ts.factory.createTypeReferenceNode(aspects.dataShape));
        }
        if (baseTypeName == TWBaseTypes.THINGNAME || baseTypeName == TWBaseTypes.THINGTEMPLATENAME) {
            if (aspects.thingTemplate && aspects.thingShape) {
                typeArguments.push(ts.factory.createTypeReferenceNode(aspects.thingTemplate));
                typeArguments.push(ts.factory.createTypeReferenceNode(aspects.thingShape));
            } else if (aspects.thingTemplate) {
                typeArguments.push(ts.factory.createTypeReferenceNode(aspects.thingTemplate));
            } else if (aspects.thingShape) {
                typeArguments.push(ts.factory.createToken(ts.SyntaxKind.AnyKeyword));
                typeArguments.push(ts.factory.createTypeReferenceNode(aspects.thingShape));
            }
        }
        return ts.factory.createTypeReferenceNode(baseTypeName, typeArguments);
    }

    /**
     * Wraps a given text in JSDoc-like comments
     * @param contents String to include in comments
     * @returns wrapped text
     */
    private commentize(contents: string): string {
        return `*\n * ${contents.replace(/\n/g, '\n * ')}\n `;
    }

    /**
     * Utility function that creates the correct typescript literal for a js primitive
     * @param value Value to wrap in a literal
     * @returns typescript literal with that value
     */
    private createNodeLiteral = function createLiteral(value: string | number | boolean): ts.PrimaryExpression {
        if (typeof value === 'number') {
            return ts.factory.createNumericLiteral(value);
        }
        if (typeof value === 'boolean') {
            return value ? ts.factory.createTrue() : ts.factory.createFalse();
        }
        if (typeof value === 'string') {
            return ts.factory.createStringLiteral(value);
        }
        throw `Cannot convert to literal the type with value '${value}'`;
    };
}
