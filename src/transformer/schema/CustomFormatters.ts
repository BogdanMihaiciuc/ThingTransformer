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

    // If this type does NOT HAVE children, generally all you need is:
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