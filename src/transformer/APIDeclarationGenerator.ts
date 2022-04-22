import {TWServiceDefinition, TWPropertyDefinition, TWServiceParameter, TWDataShapeField } from './TWCoreTypes';

 /**
  * A regex that is used to test if a string has any non-alphanumeric character.
  */
 export const NonAlphanumericRegex = /[^a-zA-Z\d_]/;
 
 /**
  * A regex that is used to replace non alphanumeric characters in strings.
  */
 export const NonAlphanumericRegexGlobal = /[^a-zA-Z\d_]/g;
 
/**
 * A class that contains various static methods for parsing entity metadata
 * objects into typescript class declarations.
 */
 export class APIGenerator {

    /**
     * Returns a string that represents the typescript type that should be used to represent
     * the given property definition's base type.
     * @param definition        The property definition.
     * @returns                 A typescript type string.
     */
    static baseTypeOfPropertyDefinition(definition: TWServiceParameter, serviceParameter = false): string {
        let baseType = definition.baseType;

        if (baseType == 'JSON') return 'TWJSON';

        if (baseType == 'INFOTABLE' && definition.aspects.dataShape) {
            if (NonAlphanumericRegex.test(definition.aspects.dataShape)) {
                return `INFOTABLE<${JSON.stringify(definition.aspects.dataShape)}>`;
            }
            else {
                return `INFOTABLE<${definition.aspects.dataShape}>`;
            }
        } else {

            if (baseType == 'THINGNAME') {
                baseType = 'STRING';
            }
            return serviceParameter ? `[{result: ${baseType}}]` : baseType;
        }

    }

    /**
     * Returns a string that represents the literal type of the given service's argument object.
     * @param service       The service definition.
     * @returns             A typescript type string.
     */
    static argumentTypesOfService(service: TWServiceDefinition): string {
        let args: string[] = [];

        for (const argument of service.parameterDefinitions) {
            args.push(`${argument.name}${argument.aspects.isRequired || argument.aspects.defaultValue ? '' : '?'}: ${this.baseTypeOfPropertyDefinition(argument)}`);
        }

        return args.length > 0 ? `args: {${args.join(',')}}` : 'args?: Record<string, never>';
    }

    /**
     * Returns a string that represents the portion of JSDoc that documents the arguments of the given service definition.
     * @param service       The service definition.
     * @returns             A string representing a portion of a JSDoc comment.
     */
    static argumentDocumentationsOfService(service: TWServiceDefinition): string {
        let docs: string[] = [];

        for (const argument of service.parameterDefinitions) {
            docs.push(`@param ${argument.name} ${argument.description}`);
        }

        return docs.join('\n\t * ');
    }

    /**
     * Returns a string that represents a typescript declaration of a given property definition.
     * @param property          The property definition.
     * @returns                 A string representing a property declaration.
     */
    static declarationOfProperty(property: TWPropertyDefinition | TWDataShapeField): string {
        // Use string literal for names with special characters
        let name = property.name;
        if (NonAlphanumericRegex.test(name)) {
            name = JSON.stringify(name);
        }

        return `
    /**
     * ${property.description}
     */
    ${name}: ${this.baseTypeOfPropertyDefinition(property)};
    `;
    }

    /**
     * Returns a string that represents a typescript declaration of a given service definition.
     * @param service           The service definition.
     * @returns                 A string representing a service declaration.
     */
    static declarationOfService(service: TWServiceDefinition): string {
        // Use string literals for names with special characters
        let name = service.name;
        if (NonAlphanumericRegex.test(name)) {
            name = JSON.stringify(name);
        }

        return `
    /**
     * ${service.description}
     * ${this.argumentDocumentationsOfService(service)}
     * @return ${service.resultType.description}
     */
    ${name}(${this.argumentTypesOfService(service)}): ${service.aspects.isAsync ? 'ServiceResult<NOTHING>' : 'ServiceResult<' + this.baseTypeOfPropertyDefinition(service.resultType, true) + '>'};
`;
    }

}