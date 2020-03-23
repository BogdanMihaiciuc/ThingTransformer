import * as ts from 'typescript';
import { TWEntityKind, TWPropertyDefinition, TWServiceDefinition, TWEventDefinition, TWSubscriptionDefinition, TWBaseTypes, TWPropertyDataChangeKind, TWFieldBase, TWPropertyRemoteBinding, TWPropertyRemoteFoldKind, TWPropertyRemotePushKind, TWPropertyRemoteStartKind, TWPropertyBinding, TWSubscriptionSourceKind, TWServiceParameter, TWDataShapeField } from './TWCoreTypes';
import {Builder} from 'xml2js';
import * as fs from 'fs';
import * as path from 'path';

declare global {
    namespace NodeJS {
        interface Global {
            _TWEntities: any;
        }
    }
}

/**
 * The thing transformer is applied to Thingworx source files to convert them into Thingworx XML entities.
 */
export class TWThingTransformer {

    context: ts.TransformationContext;

    description?: string;

    /**
     * The name of the entity to create.
     */
    className?: string;

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
     * For model entities, an array of discovered configuration table definitions.
     */
    configurationTableDefinitions: TWConfigurationTable[] = [];

    /**
     * For data shapes, an array of field definitions.
     */
    fields: TWDataShapeField[] = [];

    /**
     * The project root path, to which files are written by default.
     */
    root: string;

    after: boolean;

    watch: boolean;

    constructor(context: ts.TransformationContext, root: string, after: boolean, watch: boolean) {
        this.context = context;
        this.root = root;
        this.after = after;
        this.watch = watch;
    }

    throwErrorForNode(node: ts.Node, error: string): never {
        throw new Error(`Error in file ${node.getSourceFile().fileName} at position ${node.getStart()}: ${error}

Failed parsing at: \n${node.getText()}\n\n`);
    }

    entityKindOfClassNode(classNode: ts.ClassDeclaration): TWEntityKind {
        // Otherwise determine the kind based on the decorators
        if (!classNode.decorators || !classNode.decorators.length) {
            this.throwErrorForNode(classNode, `Ambiguous class kind ${classNode.name}. Thingworx classes must extend from DataShape, ThingShape or have an entity kind decorator.`);
        }

        let isThing = classNode.decorators.some(decorator => decorator.expression.kind == ts.SyntaxKind.Identifier && decorator.expression.getText() == 'ThingDefinition');
        let isThingTemplate = classNode.decorators.some(decorator => decorator.expression.kind == ts.SyntaxKind.Identifier && decorator.expression.getText() == 'ThingTemplateDefinition');

        if (isThing && isThingTemplate) {
            this.throwErrorForNode(classNode, `Class ${classNode.name} cannot be both a Thing and a ThingTemplate.`);
        }

        return isThing ? TWEntityKind.Thing : TWEntityKind.ThingTemplate;
    }

    hasDecoratorNamed(name: string, node: ts.Node): boolean {
        if (!node.decorators) return false;

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
    
    visit(node: ts.Node) {
        if (this.after) {
            if (node.kind == ts.SyntaxKind.SourceFile) {
                (this as any).source = node;
            }

            // This doesn't seem properly documented in typescript.d.ts?
            const transpiledNode = node as any;

            // After transpilation, methods get turned into function declarations
            // that are assigned to properties
            if (node.kind == ts.SyntaxKind.FunctionExpression && transpiledNode.original && transpiledNode.original.kind == ts.SyntaxKind.MethodDeclaration) {
                this.visitTranspiledMethod(transpiledNode);
            }
        }
        else {
            if (node.parent && node.parent.kind == ts.SyntaxKind.SourceFile) {
                this.visitRootNode(node);
            }

            // Async is only included for metadata but cannot be used on the result
            if (node.kind == ts.SyntaxKind.AsyncKeyword) {
                return undefined;
            }

            // Decorators are only included for metadata but cannot be used on the result
            if (node.kind == ts.SyntaxKind.Decorator) {
                return undefined;
            }
    
            if (node.kind == ts.SyntaxKind.ThisKeyword) {
                return this.visitThisNode(node as ts.ThisExpression);
            }
        }

        const result = ts.visitEachChild(node, node => this.visit(node), this.context);
        return result;
    }

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
                    return ts.createIdentifier('me');
                }
            }
            parent = parent.parent;
        } while (parent);

        return ts.visitEachChild(node, node => this.visit(node), this.context);
    }

    visitRootNode(node: ts.Node) {
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
                else {
                    this.entityKind = this.entityKindOfClassNode(classNode);
                    this.thingTemplateName = baseClass.text;
                }
            }
            else if (heritage.expression.kind == ts.SyntaxKind.CallExpression) {
                // Call expression base classes can only be things or thing templates
                this.entityKind = this.entityKindOfClassNode(classNode);

                const callNode = heritage.expression as ts.CallExpression;
                // Ensure that the call signature is of the correct type
                if (callNode.expression.getText() != 'ThingTemplateWithShapes') {
                    this.throwErrorForNode(node, `Unknown base class for ${classNode.name}. Thing and ThingTemplate classes must extend from a ThingTemplateWithShapes(...) expression or a base ThingTemplate class.`);
                }

                // Ensure that each parameter is of the correct type
                if (!callNode.arguments.length) {
                    this.throwErrorForNode(node, `The ThingTemplateWithShapes(...) expression must have at least one ThingTemplate parameter.`);
                }

                this.thingTemplateName = callNode.arguments[0].getText();
                this.thingShapes = callNode.arguments.slice(1, callNode.arguments.length - 1).map(node => node.getText());

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

            if (!this.watch) for (const member of classNode.members) {
                this.visitClassMember(member);
            }
            

            global._TWEntities = global._TWEntities || {};
            global._TWEntities[this.className] = this;

        }
    }

    visitClassMember(node: ts.ClassElement) {
        if (node.kind == ts.SyntaxKind.Constructor) {
            this.throwErrorForNode(node, `Constructors are not supported in Thingworx classes.`);
        }

        if (node.kind == ts.SyntaxKind.PropertyDeclaration) {
            const propertyDeclarationNode = node as ts.PropertyDeclaration;

            if (this.entityKind == TWEntityKind.DataShape) {
                this.visitDataShapeField(propertyDeclarationNode);
            }
            else {
                this.visitProperty(propertyDeclarationNode);
            }
        }

        if (node.kind == ts.SyntaxKind.MethodDeclaration) {
            if (this.entityKind == TWEntityKind.DataShape) {
                this.throwErrorForNode(node, `Data Shapes cannot contain methods.`);
            }
            this.visitMethod(node as ts.MethodDeclaration);
        }
    }

    visitDataShapeField(node: ts.PropertyDeclaration) {
        // Ensure that the property has a type annotation
        if (!node.type) {
            this.throwErrorForNode(node, `Properties must have type annotation in Thingworx classes.`);
        }
        if (node.type.kind != ts.SyntaxKind.TypeReference) {
            this.throwErrorForNode(node, `Unknown baseType for property ${node.name.getText()}: ${node.type.getText()}`);
        }

        // Extract the type name
        const typeNode = node.type as ts.TypeReferenceNode;
        const baseType = typeNode.typeName.getText();

        const property = {} as TWDataShapeField;
        if (node.name.kind != ts.SyntaxKind.Identifier) {
            this.throwErrorForNode(node, `Computed property names are not supported in Thingwrox classes.`);
        }

        // First obtain the name of the property
        property.name = node.name.text;

        // Create the generic aspects, required for all properties
        property.aspects = {};
        if (this.hasDecoratorNamed('primaryKey', node)) {
            property.aspects.isPrimaryKey = true;
        }

        // Ensure that the base type is one of the Thingworx Base Types
        if (!(baseType in TWBaseTypes)) {
            this.throwErrorForNode(node, `Unknown baseType for property ${property.name}: ${property.baseType}`);
        }
        property.baseType = TWBaseTypes[baseType];

        // INFOTABLE can optionally take the data shape as a type argument
        if (baseType == 'INFOTABLE') {
            property.aspects.dataShape = '';
            const typeArguments = typeNode.typeArguments;
            if (typeArguments) {
                if (typeArguments.length != 1) this.throwErrorForNode(node, `Unknown generics specified for property ${property.name}: ${property.baseType}`);

                property.aspects.dataShape = typeArguments[0].getText();
            }
        }
        // THINGNAME can optionally take the thing template name and/or thing shape name as a type argument
        else if (baseType == 'THINGNAME') {
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
            property.aspects.defaultValue = (node.initializer as ts.LiteralExpression).text;
        }

        this.fields.push(property);
    }

    visitProperty(node: ts.PropertyDeclaration) {
        // Ensure that the property has a type annotation
        if (!node.type) {
            this.throwErrorForNode(node, `Properties must have type annotation in Thingworx classes.`);
        }
        if (node.type.kind != ts.SyntaxKind.TypeReference) {
            this.throwErrorForNode(node, `Unknown baseType for property ${node.name.getText()}: ${node.type.getText()}`);
        }

        // Extract the type name
        const typeNode = node.type as ts.TypeReferenceNode;
        const baseType = typeNode.typeName.getText();

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
        if (baseType == 'INFOTABLE') {
            property.aspects.dataShape = '';
            const typeArguments = typeNode.typeArguments;
            if (typeArguments) {
                if (typeArguments.length != 1) this.throwErrorForNode(node, `Unknown generics specified for property ${property.name}: ${property.baseType}`);

                property.aspects.dataShape = typeArguments[0].getText();
            }
        }
        // THINGNAME can optionally take the thing template name and/or thing shape name as a type argument
        else if (baseType == 'THINGNAME') {
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
            property.aspects.defaultValue = (node.initializer as ts.LiteralExpression).text || node.initializer.getText();
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

        this.properties.push(property);
    }

    visitEvent(node: ts.PropertyDeclaration) {
        const event = {} as TWEventDefinition;

        if (node.name.kind != ts.SyntaxKind.Identifier) this.throwErrorForNode(node, 'Event names cannot be computed names.');
        event.name = (node.name as ts.Identifier).text;

        const typeNode = node.type as ts.TypeReferenceNode;
        if (typeNode.typeArguments && typeNode.typeArguments.length) {
            event.dataShape = typeNode.typeArguments[0].getText();
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

        this.events.push(event);
    }

    visitMethod(node: ts.MethodDeclaration) {
        if (this.hasDecoratorNamed('subscription', node) || this.hasDecoratorNamed('localSubscription', node)) {
            return this.visitSubscription(node);
        }

        const service = {aspects: {}} as TWServiceDefinition;
        if (node.modifiers) for (const modifier of node.modifiers) {
            if (modifier.kind == ts.SyntaxKind.AsyncKeyword) {
                service.aspects = {isAsync: true};
            }
        }

        if (node.name.kind != ts.SyntaxKind.Identifier) this.throwErrorForNode(node, 'Service names cannot be computed property names.');
        service.name = (node.name as ts.Identifier).text;
        service.isAllowOverride = !this.hasDecoratorNamed('final', node);
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

            if (argList.type.kind != ts.SyntaxKind.TypeLiteral) {
                this.throwErrorForNode(node, 'The type of a service parameter must be a literal.');
            }

            const args = argList.name as ts.ObjectBindingPattern;
            const argTypes = argList.type as ts.TypeLiteralNode;
            for (const arg of args.elements) {
                const parameter = {aspects: {}} as TWServiceParameter;
                if (arg.name.kind != ts.SyntaxKind.Identifier) this.throwErrorForNode(node, 'Service parameter names cannot be computed property names.');

                parameter.name = arg.name.getText();
                // Find the accompanying type for this parameter
                const type = argTypes.members.find(t => t.name!.getText() == parameter.name) as ts.PropertySignature;
                if (!type) this.throwErrorForNode(node, `Parameter ${parameter.name} is untyped.`);

                const typeNode = type.type as ts.TypeReferenceNode;

                parameter.aspects.isRequired = !type.questionToken;
                const baseType = typeNode.typeName.getText();
                parameter.baseType = baseType;

                if (arg.initializer) {
                    parameter.aspects.defaultValue = (arg.initializer as ts.LiteralExpression).text || arg.initializer.getText();
                }

                // INFOTABLE can optionally take the data shape as a type argument
                if (baseType == 'INFOTABLE') {
                    const typeNode = type.type! as ts.NodeWithTypeArguments;
                    parameter.aspects.dataShape = '';
                    const typeArguments = typeNode.typeArguments;
                    if (typeArguments) {
                        if (typeArguments.length != 1) this.throwErrorForNode(node, `Unknown generics specified for parameter ${parameter.name}: ${parameter.baseType}`);

                        parameter.aspects.dataShape = typeArguments[0].getText();
                    }
                }
                // THINGNAME can optionally take the thing template name and/or thing shape name as a type argument
                else if (baseType == 'THINGNAME') {
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

            // Replace the destructured parameter with a regular parameter list
            const plainArgs: ts.ParameterDeclaration[] = [];
            for (const arg of service.parameterDefinitions) {
                plainArgs.push(ts.createParameter(undefined, undefined, undefined,arg.name))
            }
            const regularArgs = ts.createNodeArray([]);
            node.parameters = regularArgs;

        }
        else {
            service.parameterDefinitions = [];
        }

        if (!node.type) {
            if (!service.aspects.isAsync) {
                this.throwErrorForNode(node, 'The return type of non-async services must be specified.');
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
                    this.throwErrorForNode(node, 'Async services must not have a return type annotation.');
                }
            }
            else {
                const typeNode = node.type as ts.TypeReferenceNode;

                const baseType = typeNode.typeName.getText();
                // INFOTABLE can optionally take the data shape as a type argument
                if (baseType == 'INFOTABLE') {
                    const typeNode = node.type! as ts.NodeWithTypeArguments;
                    service.resultType.aspects.dataShape = '';
                    const typeArguments = typeNode.typeArguments;
                    if (typeArguments) {
                        if (typeArguments.length != 1) this.throwErrorForNode(node, `Unknown generics specified for service result: ${service.resultType.baseType}`);
    
                        service.resultType.aspects.dataShape = typeArguments[0].getText();
                    }
                }
                // THINGNAME can optionally take the thing template name and/or thing shape name as a type argument
                else if (baseType == 'THINGNAME') {
                    const typeNode = node.type! as ts.NodeWithTypeArguments;
                    const typeArguments = typeNode.typeArguments;
    
                    if (typeArguments && typeArguments.length) {
                        if (typeArguments.length > 2) this.throwErrorForNode(node, `Unknown generics specified for service result: ${service.resultType.baseType}`);
    
                        const thingTemplate = typeArguments[0];
                        if (thingTemplate.kind == ts.SyntaxKind.LiteralType) {
                            service.resultType.aspects.thingTemplate = ((thingTemplate as ts.LiteralTypeNode).literal as ts.StringLiteral).text;
                        }
    
                        const thingShape = typeArguments[1];
                        if (thingShape && thingShape.kind == ts.SyntaxKind.LiteralType) {
                            service.resultType.aspects.thingShape = ((thingShape as ts.LiteralTypeNode).literal as ts.StringLiteral).text;
                        }
                    }
                }
                service.resultType.baseType = node.type.getText();
            }
        }

        this.services.push(service);
    }

    visitSubscription(node: ts.MethodDeclaration) {
        const subscription = {
            source: '',
            sourceProperty: ''
        } as TWSubscriptionDefinition;
        subscription.enabled = true;

        if (this.hasDecoratorNamed('subscription', node) && this.hasDecoratorNamed('localSubscription', node)) {
            this.throwErrorForNode(node, 'A method cannot have both the "subscription" and "localSubscription" decorators applied.');
        }

        subscription.name = node.name.getText();

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

        this.subscriptions.push(subscription);

    }

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

            const entity = global._TWEntities[className];
            if (!entity) return;

            for (const service of entity.services) {
                if (service.name == name) {
                    const body = ts.createPrinter().printNode(ts.EmitHint.Unspecified, node.body, (this as any).source);
                    service.code = `var result = (function () ${body})()`;
                }
            }
            for (const subscription of entity.subscriptions) {
                if (subscription.name == name) {
                    const body = ts.createPrinter().printNode(ts.EmitHint.Unspecified, node.body, (this as any).source);
                    subscription.code = body.substring(1, body.length - 1);
                }
            }
        }
    }

    toXML(): string {
        const XML = {} as any;

        if (this.entityKind == TWEntityKind.DataShape) return this.toDataShapeXML();

        const collectionKind = this.entityKind + 's';
        const entityKind = this.entityKind;
        
        XML.Entities = {};
        XML.Entities[collectionKind] = [];
        XML.Entities[collectionKind][0] = {};
        XML.Entities[collectionKind][0][entityKind] = [{$:{}}];
        
        const entity = XML.Entities[collectionKind][0][entityKind][0];

        entity.$.name = this.className;

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
            entity.$.thingTemplate = this.thingTemplateName || 'GenericThing';
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
            // **********************************  SERVICE DETAILS  **********************************
            const serviceDefinition = {$:{}} as any;
            
            for (const key in service) {
                if (key == 'aspects' || key == 'remoteBinding' || key == 'code' || key == 'parameterDefinitions' || key == 'resultType') continue;

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
                // This sad JSON is just how an infotable appears after conversion from an XML format - copy-pasted from an export
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

        return (new Builder()).buildObject(XML);
    }

    private toDataShapeXML(): string {
        const XML = {} as any;

        const collectionKind = this.entityKind + 's';
        const entityKind = this.entityKind;
        
        XML.Entities = {};
        XML.Entities[collectionKind] = [];
        XML.Entities[collectionKind][0] = {};
        XML.Entities[collectionKind][0][entityKind] = [{$:{baseDataShape: ''}}]; // may explore this base data shape in the future
        
        const entity = XML.Entities[collectionKind][0][entityKind][0];

        entity.$.name = this.className;

        // Tags are yet unsupported
        entity.$.tags = '';

        entity.FieldDefinitions = [{FieldDefinition: []}];
        const fieldDefinitions = entity.FieldDefinitions[0].FieldDefinition as any[];

        for (const field of this.fields) {
            const fieldDefinition = {$:{}} as any;
            
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

        return (new Builder()).buildObject(XML);
    }

    toDefinition(): string {
        if (this.entityKind && this.className) {
            if (this.entityKind == TWEntityKind.Thing) {
                return `declare interface ${this.entityKind}s { ${this.className}: ${this.className} }\n\n`;
            }
            else {
                return `declare interface ${this.entityKind}s { ${this.className}: ${this.entityKind}Entity<${this.className}>}`
            }
        }
        else {
            return '';
        }
    }

    write(path: string = this.root): void {
        if (!fs.existsSync(`${path}/build`)) fs.mkdirSync(`${path}/build`);
        if (!fs.existsSync(`${path}/build/Entities`)) fs.mkdirSync(`${path}/build/Entities`);
        if (!fs.existsSync(`${path}/build/Entities/${this.entityKind}s`)) fs.mkdirSync(`${path}/build/Entities/${this.entityKind}s`);

        fs.writeFileSync(`${path}/build/Entities/${this.entityKind}s/${this.className}.xml`, this.toXML());
    }

}

export function TWThingTransformerFactory(root: string, after: boolean = false, watch: boolean = false) {
    return function TWThingTransformerFunction(context: ts.TransformationContext) {
        const transformer = new TWThingTransformer(context, root, after, watch);
    
        return (node: ts.Node) => ts.visitNode(node, node => transformer.visit(node));
    }
}