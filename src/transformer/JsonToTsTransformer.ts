import * as ts from 'typescript';
import { cloneNode } from 'ts-clone-node';
import {
    TWPropertyDefinition,
    TWBaseTypes,
    TWFieldAspects,
    TWServiceDefinition,
    TWEventDefinition,
    TWSubscriptionDefinition,
    TWThing,
    TWEntityDefinition,
    TWEntityKind,
    TWThingTemplate,
} from './TWCoreTypes';

export interface TransformerOptions {
    /**
     * String to use to replace invalid characters in entity names
     * For example, in thingworx, a lot of entities have dots as separators.
     * This are, by default replaced with `_`
     */
    entityNameSeparator: string;
}

export class JsonThingToTsTransformer {
    private static DEFAULT_OPTIONS: TransformerOptions = {
        entityNameSeparator: '_',
    };
    /**
     * Constructs a new transformer
     */
    constructor(options?: Partial<TransformerOptions>) {
        this.options = Object.assign({}, options, JsonThingToTsTransformer.DEFAULT_OPTIONS);
    }
    private options: TransformerOptions;

    /**
     * Normalizes the JSON metadata of a entity into an object that the API expects
     * @param thingworxJson JSON definition of the object, as returned by the metadata endpoint
     * @param entityType Type of entity to transform
     * @returns The normalized representation of the Thingworx entity
     */
    public convertThingworxEntity(thingworxJson: any, entityType: TWEntityKind): TWEntityDefinition {
        const definitionsSource =
            entityType == TWEntityKind.Thing || entityType == TWEntityKind.ThingTemplate ? thingworxJson.thingShape : thingworxJson;
        const propertyDefinitions: TWPropertyDefinition[] = Object.entries(definitionsSource.propertyDefinitions).map(([k, v]) => {
            const result: TWPropertyDefinition = Object.assign({}, v as any);
            // information about the remote and local bindings are stored on separate top level properties
            // this brings them together into the same object
            result.remoteBinding = thingworxJson.remotePropertyBindings[k];
            result.localBinding = thingworxJson.propertyBindings[k];
            return result;
        });

        const serviceDefinitions: TWServiceDefinition[] = Object.entries(definitionsSource.serviceDefinitions).map(([k, v]) => {
            const result: TWServiceDefinition = Object.assign({}, v as any);
            // the actual service code (implementation) is stored in the serviceImplementation object
            if (definitionsSource.serviceImplementations[k]) {
                const handlerName = definitionsSource.serviceImplementations[k].handlerName;
                if (handlerName != 'Script') {
                    throw `Service implementation for service "${k}" has the handler set to "${handlerName}". This is not supported.`;
                }
                result.code = definitionsSource.serviceImplementations[k].configurationTables.Script.rows[0].code;
            }
            result.remoteBinding = thingworxJson.remoteServiceBindings[k];
            return result;
        });

        const subscriptionDefinitions: TWSubscriptionDefinition[] = Object.entries(definitionsSource.subscriptions).map(([k, v]) => {
            const result: TWSubscriptionDefinition = Object.assign({}, v as any);
            result.code = (v as any).serviceImplementation.configurationTables.Script.rows[0].code;
            return result;
        });

        const eventDefinitions: TWEventDefinition[] = Object.entries(definitionsSource.eventDefinitions).map(([k, v]) => {
            const result: TWEventDefinition = Object.assign({}, v as any);
            result.remoteBinding = thingworxJson.remoteEventBindings[k];
            return result;
        });

        const baseEntity: TWEntityDefinition = {
            description: thingworxJson.description,
            documentationContent: thingworxJson.documentationContent,
            name: thingworxJson.name,
            project: thingworxJson.projectName,
            tags: thingworxJson.tags,
            aspects: thingworxJson.aspects,
            propertyDefinitions: propertyDefinitions,
            serviceDefinitions: serviceDefinitions,
            eventDefinitions: eventDefinitions,
            subscriptionDefinitions: subscriptionDefinitions,
            kind: entityType,
        };

        if (entityType == TWEntityKind.Thing) {
            return Object.assign(
                {
                    enabled: thingworxJson.enabled === 'true' || thingworxJson.enabled === true,
                    identifier: thingworxJson.identifier,
                    published: thingworxJson.published,
                    valueStream: thingworxJson.valueStream,
                    thingTemplate: thingworxJson.thingTemplate,
                    implementedShapes: Object.keys(thingworxJson.implementedShapes),
                },
                baseEntity,
            ) as TWThing;
        } else if (entityType == TWEntityKind.ThingTemplate) {
            return Object.assign(
                {
                    valueStream: thingworxJson.valueStream,
                    thingTemplate: thingworxJson.baseThingTemplate,
                    implementedShapes: Object.keys(thingworxJson.implementedShapes),
                },
                baseEntity,
            ) as TWThingTemplate;
        } else {
            return baseEntity;
        }
    }

    /**
     * Transforms an entity definition into a typescript class declaration
     * This function expects a valid thingworx definition
     * @param entity Entity to transform
     * @returns the AST of the ClassDeclaration
     */
    public transformThingworxEntity(entity: TWEntityDefinition): ts.ClassDeclaration {
        const decorators: ts.Decorator[] = [];
        const modifiers: ts.Modifier[] = [];
        const heritage: ts.HeritageClause[] = [];
        const members: ts.ClassElement[] = [];
        // set the exportName as the current entity name
        decorators.push(
            ts.factory.createDecorator(
                ts.factory.createCallExpression(ts.factory.createIdentifier('exportName'), undefined, [
                    ts.factory.createStringLiteral(entity.name),
                ]),
            ),
        );
        if (entity.aspects?.isEditableExtensionObject) {
            decorators.push(ts.factory.createDecorator(ts.factory.createIdentifier('editable')));
        }

        if (entity.kind == TWEntityKind.ThingTemplate || entity.kind == TWEntityKind.Thing) {
            const template = entity as TWThingTemplate;
            if (template.valueStream) {
                decorators.push(
                    ts.factory.createDecorator(
                        ts.factory.createCallExpression(ts.factory.createIdentifier('valueStream'), undefined, [
                            ts.factory.createStringLiteral(template.valueStream),
                        ]),
                    ),
                );
            }
            if (template.implementedShapes.length > 0) {
                heritage.push(
                    ts.factory.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
                        ts.factory.createExpressionWithTypeArguments(
                            ts.factory.createCallExpression(ts.factory.createIdentifier('ThingTemplateWithShapes'), undefined, [
                                ts.factory.createIdentifier(template.thingTemplate),
                                ...template.implementedShapes.map((s) => this.createIdentifierFromEntityName(s)),
                            ]),
                            undefined,
                        ),
                    ]),
                );
            } else {
                heritage.push(
                    ts.factory.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
                        ts.factory.createExpressionWithTypeArguments(ts.factory.createIdentifier(template.thingTemplate), undefined),
                    ]),
                );
            }
        }
        if (entity.kind == TWEntityKind.ThingTemplate) {
            decorators.push(ts.factory.createDecorator(ts.factory.createIdentifier('ThingTemplateDefinition')));
        } else if (entity.kind == TWEntityKind.Thing) {
            const thing = entity as TWThing;
            decorators.push(ts.factory.createDecorator(ts.factory.createIdentifier('ThingDefinition')));

            if (thing.published) {
                decorators.push(ts.factory.createDecorator(ts.factory.createIdentifier('published')));
            }
            if (thing.identifier) {
                decorators.push(
                    ts.factory.createDecorator(
                        ts.factory.createCallExpression(ts.factory.createIdentifier('identifier'), undefined, [
                            ts.factory.createNumericLiteral(thing.identifier),
                        ]),
                    ),
                );
            }
        } else if (entity.kind == TWEntityKind.ThingShape) {
            heritage.push(
                ts.factory.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
                    ts.factory.createExpressionWithTypeArguments(ts.factory.createIdentifier('ThingShapeBase'), undefined),
                ]),
            );
        }

        // handle property, service, events and subscriptions
        members.push(...entity.propertyDefinitions.map((p) => this.parsePropertyDefinition(p)));
        members.push(...entity.serviceDefinitions.map((s) => this.parseServiceDefinition(s)));
        members.push(...entity.eventDefinitions.map((e) => this.parseEventDefinition(e)));
        members.push(...entity.subscriptionDefinitions.map((s) => this.parseSubscriptionDefinition(s)));

        const classDeclaration = ts.factory.createClassDeclaration(
            decorators,
            modifiers,
            this.createIdentifierFromEntityName(entity.name),
            undefined,
            heritage,
            members,
        );
        // only add jsdoc on the property, if description exists
        if (entity.description) {
            return ts.addSyntheticLeadingComment(
                classDeclaration,
                ts.SyntaxKind.MultiLineCommentTrivia,
                this.commentize(entity.description),
                true,
            );
        } else {
            return classDeclaration;
        }
    }

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
     * Transforms a Thingworx service definition entity into a typescript class method definition.
     *
     * @param serviceDefinition Service definition on the native Thingworx format
     * @returns Method definition of the service
     */
    public parseServiceDefinition(serviceDefinition: TWServiceDefinition): ts.MethodDeclaration {
        const decorators: ts.Decorator[] = [];
        const modifiers: ts.Modifier[] = [];

        // all async services transform into async methods
        if (serviceDefinition.aspects.isAsync) {
            modifiers.push(ts.factory.createModifier(ts.SyntaxKind.AsyncKeyword));
        }
        // all services that are not overridable get marked as final
        if (!serviceDefinition.isAllowOverride) {
            decorators.push(ts.factory.createDecorator(ts.factory.createIdentifier('final')));
        }
        // all services that override a parent implementation should have a annotation
        if (serviceDefinition.isOverriden) {
            decorators.push(ts.factory.createDecorator(ts.factory.createIdentifier('override')));
        }
        // remote services map into methods with empty bodies, and a decorator @remoteService
        if (serviceDefinition.remoteBinding) {
            const remoteArgs: ts.ObjectLiteralElementLike[] = [];

            if (serviceDefinition.remoteBinding.enableQueue) {
                remoteArgs.push(ts.factory.createPropertyAssignment('enableQueue', ts.factory.createTrue()));
            }
            if (serviceDefinition.remoteBinding.timeout != undefined) {
                remoteArgs.push(
                    ts.factory.createPropertyAssignment(
                        'timeout',
                        ts.factory.createNumericLiteral(serviceDefinition.remoteBinding.timeout),
                    ),
                );
            }
            const remoteSourceName = serviceDefinition.remoteBinding.sourceName || serviceDefinition.name;

            const remoteDecorator = ts.factory.createDecorator(
                ts.factory.createCallExpression(ts.factory.createIdentifier('remoteService'), undefined, [
                    ts.factory.createStringLiteral(remoteSourceName),
                    ts.factory.createObjectLiteralExpression(remoteArgs),
                ]),
            );
            decorators.push(remoteDecorator);
        }
        // remote services should have an empty body
        const methodBody = serviceDefinition.remoteBinding
            ? ts.factory.createBlock([], false)
            : this.getTypescriptCodeFromBody(serviceDefinition.code, serviceDefinition.resultType.baseType);

        // handle the inputs of the service. This requires creating an object as well as an interface that defines it
        const tsParameters: ts.ParameterDeclaration[] = [];
        if (serviceDefinition.parameterDefinitions.length > 0) {
            const parameters: ts.ObjectBindingPattern = ts.factory.createObjectBindingPattern(
                serviceDefinition.parameterDefinitions.map((p) =>
                    ts.factory.createBindingElement(
                        undefined,
                        undefined,
                        p.name,
                        p.aspects.defaultValue && this.createNodeLiteral(p.aspects.defaultValue),
                    ),
                ),
            );
            const parametersDef: ts.TypeLiteralNode = ts.factory.createTypeLiteralNode(
                serviceDefinition.parameterDefinitions.map((p) =>
                    ts.factory.createPropertySignature(
                        undefined,
                        p.name,
                        p.aspects.isRequired ? undefined : ts.factory.createToken(ts.SyntaxKind.QuestionToken),
                        this.getTypeNodeFromBaseType(p.baseType, p.aspects),
                    ),
                ),
            );
            tsParameters.push(
                ts.factory.createParameterDeclaration(undefined, undefined, undefined, parameters, undefined, parametersDef, undefined),
            );
        }

        // todo: handle permissions
        const methodDeclaration = ts.factory.createMethodDeclaration(
            decorators,
            modifiers,
            undefined,
            serviceDefinition.name,
            undefined,
            undefined,
            tsParameters,
            this.getTypeNodeFromBaseType(serviceDefinition.resultType.baseType, serviceDefinition.resultType.aspects),
            methodBody,
        );
        // only add jsdoc on the property, if description exists
        if (serviceDefinition.description) {
            return ts.addSyntheticLeadingComment(
                methodDeclaration,
                ts.SyntaxKind.MultiLineCommentTrivia,
                this.commentize(serviceDefinition.description),
                true,
            );
        } else {
            return methodDeclaration;
        }
    }

    /**
     * Transforms a Thingworx subscription definition entity into a typescript class method definition.
     *
     * @param subscriptionDefinition subscription definition on the native Thingworx format
     * @returns Method definition of the subscription
     */
    public parseSubscriptionDefinition(subscriptionDefinition: TWSubscriptionDefinition): ts.MethodDeclaration {
        const decorators: ts.Decorator[] = [];

        if (!subscriptionDefinition.enabled) {
            throw 'Cannot handle disabled subscription definitions';
            ``;
        }

        // if a source is specified, this means that this is a subscription for an event on another thing. If not, it's a local subscription
        if (subscriptionDefinition.source) {
            const subscriptionArgs: ts.Expression[] = [
                ts.factory.createStringLiteral(subscriptionDefinition.source),
                ts.factory.createStringLiteral(subscriptionDefinition.eventName),
            ];
            if (subscriptionDefinition.sourceProperty) {
                subscriptionArgs.push(ts.factory.createStringLiteral(subscriptionDefinition.sourceProperty));
            }

            const subscriptionDecorator = ts.factory.createDecorator(
                ts.factory.createCallExpression(ts.factory.createIdentifier('subscription'), undefined, subscriptionArgs),
            );
            decorators.push(subscriptionDecorator);
        } else {
            const subscriptionArgs: ts.Expression[] = [ts.factory.createStringLiteral(subscriptionDefinition.eventName)];
            if (subscriptionDefinition.sourceProperty) {
                subscriptionArgs.push(ts.factory.createStringLiteral(subscriptionDefinition.sourceProperty));
            }

            const localSubscriptionDecorator = ts.factory.createDecorator(
                ts.factory.createCallExpression(ts.factory.createIdentifier('localSubscription'), undefined, subscriptionArgs),
            );
            decorators.push(localSubscriptionDecorator);
        }
        // subscriptions always return NOTHING
        const methodBody = this.getTypescriptCodeFromBody(subscriptionDefinition.code, 'NOTHING');

        // handle the inputs of the subscription. This parameters are static, with the exception of the event datashape
        // todo: Figure out a way of determining the event datashape that this subscription is based on, as right now we assume it's the name of the event + the suffix `Event`
        const genericParams = {
            alertName: this.getTypeNodeFromBaseType('STRING'),
            eventData: this.getTypeNodeFromBaseType('INFOTABLE', { dataShape: subscriptionDefinition.eventName + 'Event' }),
            eventName: this.getTypeNodeFromBaseType('STRING'),
            eventTime: this.getTypeNodeFromBaseType('DATETIME'),
            source: this.getTypeNodeFromBaseType('STRING'),
            sourceProperty: this.getTypeNodeFromBaseType('STRING'),
        };

        const tsParameters = Object.entries(genericParams).map((p) =>
            ts.factory.createParameterDeclaration(undefined, undefined, undefined, p[0], undefined, p[1], undefined),
        );

        // todo: handle permissions
        const methodDeclaration = ts.factory.createMethodDeclaration(
            decorators,
            undefined,
            undefined,
            subscriptionDefinition.name,
            undefined,
            undefined,
            tsParameters,
            ts.factory.createToken(ts.SyntaxKind.VoidKeyword),
            methodBody,
        );
        // only add jsdoc on the property, if description exists
        if (subscriptionDefinition.description) {
            return ts.addSyntheticLeadingComment(
                methodDeclaration,
                ts.SyntaxKind.MultiLineCommentTrivia,
                this.commentize(subscriptionDefinition.description),
                true,
            );
        } else {
            return methodDeclaration;
        }
    }

    /**
     * Transforms a Thingworx event definition entity into a typescript class property definition with the type EVENT.
     *
     * @param eventDefinition Event definition on the native Thingworx format
     * @returns Property definition of the event
     */
    public parseEventDefinition(eventDefinition: TWEventDefinition): ts.PropertyDeclaration {
        const decorators: ts.Decorator[] = [];

        // remote events have a remoteBinding set that gets converted into a decorator
        if (eventDefinition.remoteBinding) {
            const remoteDecorator = ts.factory.createDecorator(
                ts.factory.createCallExpression(ts.factory.createIdentifier('remoteEvent'), undefined, [
                    ts.factory.createStringLiteral(eventDefinition.remoteBinding.sourceName),
                ]),
            );
            decorators.push(remoteDecorator);
        }

        // todo: handle permissions
        const propertyDeclaration = ts.factory.createPropertyDeclaration(
            decorators,
            undefined,
            eventDefinition.name,
            ts.factory.createToken(ts.SyntaxKind.ExclamationToken),
            // the type is an event with the datashape provided as a type argument
            ts.factory.createTypeReferenceNode('EVENT', [ts.factory.createTypeReferenceNode(eventDefinition.dataShape)]),
            undefined,
        );
        // only add jsdoc on the property, if description exists
        if (eventDefinition.description) {
            return ts.addSyntheticLeadingComment(
                propertyDeclaration,
                ts.SyntaxKind.MultiLineCommentTrivia,
                this.commentize(eventDefinition.description),
                true,
            );
        } else {
            return propertyDeclaration;
        }
    }

    /**
     * Converts and adapts the code of a service or subscription in ThingWorx into the body of a typescript method
     * This handles converting of the `me` references into `this` references, as well making sure the method actually returns
     *
     * @param thingworxCode Code declared in thingworx under a service or subscription
     * @param resultType Result type of the service
     * @returns Code adapted for use in typescript
     */
    private getTypescriptCodeFromBody(thingworxCode: string, resultType: keyof typeof TWBaseTypes): ts.FunctionBody {
        const FUNCTION_PREFIX = 'var result = (function () {';
        const FUNCTION_SUFFIX = '})()';
        // test if this service is a immediately invoked function, as emitted by the ts->xml transformer
        if (thingworxCode.startsWith(FUNCTION_PREFIX) && thingworxCode.endsWith(FUNCTION_SUFFIX)) {
            thingworxCode = thingworxCode.slice(FUNCTION_PREFIX.length, thingworxCode.length - FUNCTION_SUFFIX.length);
        } else if (resultType != 'NOTHING') {
            // otherwise, just expect to return the result at the end
            thingworxCode += '\nreturn result;';
        }
        const sourceFile = ts.createSourceFile('code.ts', `${thingworxCode}`, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

        // Typescript transformer that transforms me. or me[''] into this. and this['']
        const typeMeToThisTransformer: ts.TransformerFactory<ts.Node> = (context) => {
            const visit: ts.Visitor = (node: ts.Node) => {
                node = ts.visitEachChild(node, visit, context);

                if (ts.isPropertyAccessExpression(node)) {
                    if (ts.isIdentifier(node.expression) && node.expression.escapedText == 'me') {
                        return ts.factory.createPropertyAccessExpression(ts.factory.createThis(), node.name);
                    }
                } else if (ts.isElementAccessExpression(node)) {
                    if (ts.isIdentifier(node.expression) && node.expression.escapedText == 'me') {
                        return ts.factory.createElementAccessExpression(ts.factory.createThis(), node.argumentExpression);
                    }
                }
                return node;
            };

            return (node: ts.Node): ts.Node => ts.visitNode(node, visit);
        };

        // Run code through the transformer above
        const result = ts.transform(sourceFile, [typeMeToThisTransformer]).transformed[0] as ts.SourceFile;

        // create a block using the statements in the parsed source file above.
        // it's highly important that we clone the statements. That is because typescript doesn't really support merging two different ASTs
        // (see https://stackoverflow.com/questions/69028643/how-to-merge-two-typescript-asts)
        // by leveraging the ts-clone-node library, we ensure that the ast of the service is cloned, so the parent links, as well as the
        // start and end position of each node are reset
        // additionally the ts-clone-node library also transforms the comment ranges into synthetic comments, ensuring that comments are preserved
        // (see https://github.com/wessberg/ts-clone-node/blob/master/src/clone-node/util/preserve-comments.ts)
        return ts.factory.createBlock(
            result.statements.map((t) => cloneNode(t)),
            true,
        );
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
    private getTypeNodeFromBaseType(baseTypeName: keyof typeof TWBaseTypes, aspects?: TWFieldAspects<unknown>): ts.TypeReferenceNode {
        const typeArguments: ts.TypeNode[] = [];
        if (baseTypeName == TWBaseTypes.INFOTABLE && aspects?.dataShape) {
            typeArguments.push(ts.factory.createTypeReferenceNode(aspects.dataShape));
        }
        if (baseTypeName == TWBaseTypes.THINGNAME || baseTypeName == TWBaseTypes.THINGTEMPLATENAME) {
            if (aspects && aspects.thingTemplate && aspects.thingShape) {
                typeArguments.push(ts.factory.createTypeReferenceNode(aspects.thingTemplate));
                typeArguments.push(ts.factory.createTypeReferenceNode(aspects.thingShape));
            } else if (aspects?.thingTemplate) {
                typeArguments.push(ts.factory.createTypeReferenceNode(aspects.thingTemplate));
            } else if (aspects?.thingShape) {
                typeArguments.push(ts.factory.createToken(ts.SyntaxKind.AnyKeyword));
                typeArguments.push(ts.factory.createTypeReferenceNode(aspects.thingShape));
            }
        }
        // to avoid confusion between the existing JSON type and the thingworx json, apply a special mapping
        if (baseTypeName == TWBaseTypes.JSON) {
            return ts.factory.createTypeReferenceNode('TWJSON');
        } else {
            return ts.factory.createTypeReferenceNode(baseTypeName, typeArguments);
        }
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

    /**
     * Creates a valid typescript identifier based on a name
     * @param name Name of the thingworx entity
     * @returns a typescript identifier
     */
    private createIdentifierFromEntityName(name: string): ts.Identifier {
        const DISALLOWED_ENTITY_CHARS = /^[^a-zA-Z_]+|[^a-zA-Z_0-9]+/g;
        const validName = name.replace(DISALLOWED_ENTITY_CHARS, this.options.entityNameSeparator);
        return ts.factory.createIdentifier(validName);
    }
}
