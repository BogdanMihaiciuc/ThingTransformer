import { ChainNodeParser, SchemaGenerator, createFormatter, createParser, ts } from "ts-json-schema-generator";
import { StringNumberEnumFormatters } from './CustomFormatters';
import { ThingNameParser, InfotableParser } from './CustomerParsers';

/**
 * This function creates a schema generator with our custom formatters and parsers.
 * 
 * @param program The typescript program to generate the schema from.
 */
export function getSchemaGenerator(program: ts.Program) {
    // We configure the formatter an add our custom formatter to it.
    const formatter = createFormatter({}, (fmt, circularReferenceTypeFormatter) => {
        // If your formatter DOES NOT support children, e.g. getChildren() { return [] }:
        fmt.addTypeFormatter(new StringNumberEnumFormatters(circularReferenceTypeFormatter));
        // If your formatter DOES support children, you'll need this reference too:
    });
    return new SchemaGenerator(program, createParser(program, {}, (prs) => {
        prs.addNodeParser(new ThingNameParser());
        prs.addNodeParser(new InfotableParser(program.getTypeChecker(), prs as ChainNodeParser));
    }), formatter, { expose: 'all' });
}