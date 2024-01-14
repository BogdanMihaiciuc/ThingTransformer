import { BaseType, Definition, FunctionType, IntersectionType, ObjectType, SubTypeFormatter, TypeFormatter } from "ts-json-schema-generator";
/**
 * The schema generator would generate incorrect types for types STRING<enum> and NUMBER<enum>.
 * 
 * This class is a workaround to allow the schema generator to generate nicer json schemas enums.
 */
export class StringNumberEnumFormatters implements SubTypeFormatter {
    static BRAND_TYPES = ["__numberBrand", "__stringBrand"];

    public constructor(private childTypeFormatter: TypeFormatter) { }

    public supportsType(type: IntersectionType): boolean {
        if (type instanceof IntersectionType) {
            return this.getBrandType(type) !== undefined;
        }
        return false;
    }

    public getDefinition(type: IntersectionType): Definition {
        // Find the first type in the intersection that DOES NOT have the brand property.
        const brandType = this.getBrandType(type);
        const candidateType = type.getTypes().find((t) => t !== brandType);
        if (candidateType) {
            // Return a custom schema for the function property.
            return this.childTypeFormatter.getDefinition(candidateType);
        } else {
            return this.childTypeFormatter.getDefinition(type.getTypes()[0]);
        }
    }

    // This type does not have any children
    public getChildren(_type: FunctionType): BaseType[] {
        return [];
    }

    private getBrandType(type: IntersectionType): ObjectType | undefined {
        return type
            .getTypes()
            .find(
                (t) =>
                    t instanceof ObjectType &&
                    t
                        .getProperties()
                        .some((p) => StringNumberEnumFormatters.BRAND_TYPES.includes(p.getName()))
            ) as ObjectType | undefined;
    }
}

/**
 * The schema generator detects that INFOTABLES reference a datashape that implements DataShapeBase.
 * This is defined as a generic type, that has multiple optional generic parameters, all named `mix1`, `mix2`, etc.
 * 
 * This class is a workaround that identifies an ObjectType where all properties start with `mix` and returns a schema without additional properties.
 * 
 */
export class ObjectTypeFormatters implements SubTypeFormatter {
    public supportsType(type: ObjectType): boolean {
        if (type instanceof ObjectType && type.getProperties().length > 0) {
            return type.getProperties().every(p => p.getName().startsWith('mix'));
        } else {
            return false;
        }
    }

    public getDefinition(_type: ObjectType): Definition {
        // Return an empty object definition
        return { additionalProperties: false };
    }

    // This does not have any children
    public getChildren(_type: FunctionType): BaseType[] {
        return [];
    }
}

/**
 * The schema generator detects that INFOTABLES reference a datashape that implements DataShapeBase.
 * This is defined as a generic type, that has multiple optional generic parameters, all named`mix1`, `mix2`, etc.
 * 
 * This class is a workaround that identifies an ObjectType where all properties start with `mix` and returns a schema without additional properties.
 * 
 */
export class FunctionTypeFormatters implements SubTypeFormatter {
    public supportsType(type: ObjectType): boolean {
        return type instanceof FunctionType;
    }

    public getDefinition(_type: ObjectType): Definition {
        // Return an empty object definition
        return {};
    }

    // This does not have any children
    public getChildren(_type: FunctionType): BaseType[] {
        return [];
    }
}