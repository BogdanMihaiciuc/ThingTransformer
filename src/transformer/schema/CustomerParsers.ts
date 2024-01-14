import {
    Context,
    StringType,
    ObjectType,
    ReferenceType,
    BaseType,
    SubNodeParser,
    AnnotatedType,
    NodeParser,
    ObjectProperty,
    ArrayType,
} from "ts-json-schema-generator";
import * as ts from "typescript";

/**
 * The schema generator would fail when it encountered a THINGNAME type.
 *
 * This class is a workaround to allow the schema generator to continue,
 * transforming any TypeNodeReference with the name THINGNAME into a string with the format "thingName".
 * Optionally, it also sets the thingTemplate and thingShape annotations.
 */
export class ThingNameParser implements SubNodeParser {
    supportsNode(node: ts.Node): boolean {
        return ts.isTypeReferenceNode(node) && node.typeName.getText() === "THINGNAME";
    }
    createType(node: ts.Node, _context: Context, _reference?: ReferenceType): BaseType {
        const annotations: Record<string, string> = {
            format: "thingName",
        };
        if (ts.isTypeReferenceNode(node) && node.typeArguments) {
            if (node.typeArguments[0]) {
                annotations["thingTemplate"] = node.typeArguments[0].getText();
            }
            if (node.typeArguments[1]) {
                annotations["thingShape"] = node.typeArguments[1].getText();
            }
        }
        return new AnnotatedType(new StringType(), annotations, false);
    }
}

/**
 * This parser is a workaround for parsing the DataShapeBase type.
 * It returns an object with no properties representing it
 */
export class DatashapeBaseWithoutParametersParser implements SubNodeParser {
    supportsNode(node: ts.Node): boolean {
        return ts.isFunctionDeclaration(node) && node.name?.getText() === "DataShapeBase";
    }
    createType(_node: ts.Node, _context: Context, _reference?: ReferenceType): BaseType {
        return new ObjectType("DataShapeBase", [], [], true);
    }
}

/**
 * This parser is a workaround for parsing the DataShapeBase with parameters type
 * This is because we are effectively using multiple inheritance for DataShapes, and we need to 
 * convert the intersection type into a single object type.
 *
 * It returns a simplified object that merges all properties across all declarations
 */
export class DataShapeBaseWithParametersParser implements SubNodeParser {
    public constructor(
        protected typeChecker: ts.TypeChecker,
        protected childNodeParser: NodeParser,
    ) { }

    supportsNode(node: ts.Node): boolean {
        return ts.isExpressionWithTypeArguments(node) && node.expression?.getText().startsWith("DataShapeBase(");
    }
    createType(node: ts.Node, _context: Context, _reference?: ReferenceType): BaseType {
        if (ts.isExpressionWithTypeArguments(node)) {
            const type = this.typeChecker.getTypeAtLocation(node);
            if (type.isIntersection()) {
                const baseTypes = type.types.map((t) =>
                    this.childNodeParser.createType(t.symbol?.declarations?.[0] as ts.Node, _context),
                );
                return new ObjectType("DataShapeBase" + baseTypes.map((t) => t.getName()).join("-"), baseTypes, [], true);
            }
        }
        return new ObjectType("DataShapeBase", [], [], true);
    }
}

/**
 * The schema generator would fail when it encountered a INFOTABLE type.
 *
 * This class handles it by returning a new annotated type of an string with the format "infotable:type".
 */
export class InfotableParser implements SubNodeParser {
    public constructor(
        protected typeChecker: ts.TypeChecker,
        protected childNodeParser: NodeParser,
    ) { }

    supportsNode(node: ts.Node): boolean {
        return ts.isTypeReferenceNode(node) && node.typeName.getText() === "INFOTABLE";
    }
    createType(node: ts.Node, context: Context): BaseType {
        let infotableObjectType: ObjectType | AnnotatedType = new ObjectType("UNKNOWN_INFOTABLE", [], [], true);

        if (ts.isTypeReferenceNode(node) && node.typeArguments?.length) {
            const infotableReference = node.typeArguments[0].getText();
            const infotableType = this.typeChecker.getTypeFromTypeNode(node.typeArguments[0]);
            // The infotable type references something like a DataShape that has a declaration someplace else
            if (infotableType.symbol?.declarations?.[0]) {
                const argumentType = this.childNodeParser.createType(infotableType.symbol?.declarations?.[0], context);
                if (!(argumentType instanceof ObjectType) && !(argumentType instanceof AnnotatedType)) {
                    throw new Error(
                        `Expected ObjectType, got ${JSON.stringify(argumentType)} while serializing ${infotableReference}`,
                    );
                }
                infotableObjectType = argumentType;
            }
            //  The infotable type references a type like INFOTABLE<any> or INFOTABLE<unknown>
            else if ((infotableType.flags & ts.TypeFlags.Unknown) | ts.TypeFlags.Any) {
                // do nothing here, we already have an empty object type
            } else {
                throw new Error(`Could not find declaration for infotable type ${infotableReference}`);
            }
        }
        return new ObjectType(
            "INFOTABLE",
            [],
            [
                new ObjectProperty("rows", new ArrayType(infotableObjectType), true),
                new ObjectProperty(
                    "dataShape",
                    new ObjectType(
                        "dataShape",
                        [],
                        [new ObjectProperty("fieldDefinitions", new ObjectType("fieldDefinitions", [], [], true), true)],
                        true,
                    ),
                    true,
                ),
            ],
            false,
        );
    }
}
