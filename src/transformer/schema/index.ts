import { ChainNodeParser, SchemaGenerator, createFormatter, createParser, ts } from "ts-json-schema-generator";
import { FunctionTypeFormatters, StringNumberEnumFormatters } from './CustomFormatters';
import { DataShapeBaseWithParametersParser, DatashapeBaseWithoutParametersParser, InfotableParser, ThingNameParser } from './CustomerParsers';

/**
 * This function creates a schema generator with our custom formatters and parsers.
 * 
 * A custom formatter and parsers are needed because the schema generator has some issues working with the Thingworx types.
 * 
 * @param program The typescript program to generate the schema from.
 */
export function getSchemaGenerator(program: ts.Program) {
    // We configure the formatter an add our custom formatter to it.
    const formatter = createFormatter({}, (fmt, circularReferenceTypeFormatter) => {
        // Add the custom formatters
        fmt.addTypeFormatter(new StringNumberEnumFormatters(circularReferenceTypeFormatter));
        fmt.addTypeFormatter(new FunctionTypeFormatters());
    });
    return new SchemaGenerator(program, createParser(program, {}, (prs) => {
        // Add the custom parsers
        prs.addNodeParser(new DatashapeBaseWithoutParametersParser());
        prs.addNodeParser(new DataShapeBaseWithParametersParser(program.getTypeChecker(), prs as ChainNodeParser));
        prs.addNodeParser(new ThingNameParser());
        prs.addNodeParser(new InfotableParser(program.getTypeChecker(), prs as ChainNodeParser));
    }), formatter, { expose: 'all' });
}