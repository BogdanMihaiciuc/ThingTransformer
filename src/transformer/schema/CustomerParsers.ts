import { Context, StringType, ObjectType, ReferenceType, BaseType, SubNodeParser, AnnotatedType, NodeParser, ObjectProperty } from "ts-json-schema-generator";
import * as ts from "typescript";

/**
 * The schema generator would fail when it encountered a THINGNAME type.
 * 
 * This class is a workaround to allow the schema generator to continue,
 * transforming any TypeNodeReference with the name THINGNAME into a string with the format "thingName". 
 */
export class ThingNameParser implements SubNodeParser {
    supportsNode(node: ts.Node): boolean {
        return ts.isTypeReferenceNode(node) && node.typeName.getText() === "THINGNAME"
    }
    createType(node: ts.Node, context: Context, reference?: ReferenceType): BaseType {
        return new AnnotatedType(new StringType(), { format: "thingName" }, false)
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
        return ts.isTypeReferenceNode(node) && node.typeName.getText() === "INFOTABLE"
    }
    createType(node: ts.Node, context: Context, reference?: ReferenceType): BaseType {
        if (ts.isTypeReferenceNode(node) && node.typeArguments?.length) {
            const infotableReference = node.typeArguments[0].getText();
            const infotableType = this.typeChecker.getTypeFromTypeNode(node.typeArguments[0]);
            if (infotableType.symbol?.declarations?.[0]) {
            return this.childNodeParser.createType(infotableType.symbol?.declarations?.[0], context);  
            } else {
                return new ObjectType(`infotable`, [], [], true); 
            }
        } else {
            return new ObjectType(`infotable`, [], [], true);
        }
    }
}