import { JsonThingToTsTransformer } from '../src/transformer/JsonToTsTransformer';
import { equals, printNode } from '../src/transformer/tsUtils';
import endent from 'endent';
import {
    TWPropertyBindingAspects,
    TWPropertyDataChangeKind,
    TWPropertyRemoteFoldKind,
    TWPropertyRemotePushKind,
    TWPropertyRemoteStartKind,
} from '../src/transformer/TWCoreTypes';

describe('Verify property definition generation', () => {
    const transformer = new JsonThingToTsTransformer();

    test('Check simple with name and basetype', async () => {
        const result = transformer.parsePropertyDefinition({
            name: 'color',
            aspects: {},
            isLocalOnly: false,
            description: '',
            category: '',
            baseType: 'STRING',
            ordinal: 7,
        });
        expect(printNode(result)).toBe('color!: STRING;');
    });

    test('Check with default value string', async () => {
        const result = transformer.parsePropertyDefinition({
            name: 'color',
            aspects: {
                defaultValue: 'test',
            },
            isLocalOnly: false,
            description: '',
            category: '',
            baseType: 'STRING',
            ordinal: 0,
        });
        expect(printNode(result)).toBe('color: STRING = "test";');
    });

    test('Check with default value number', async () => {
        const result = transformer.parsePropertyDefinition({
            name: 'color',
            aspects: {
                defaultValue: 10,
            },
            isLocalOnly: false,
            description: '',
            category: '',
            baseType: 'INTEGER',
            ordinal: 0,
        });
        expect(printNode(result)).toBe('color: INTEGER = 10;');
    });

    test('Check infotable with datashape', async () => {
        const result = transformer.parsePropertyDefinition({
            name: 'color',
            aspects: {
                dataShape: 'GenericStringList',
            },
            isLocalOnly: false,
            description: '',
            category: '',
            baseType: 'INFOTABLE',
            ordinal: 0,
        });
        expect(printNode(result)).toBe('color!: INFOTABLE<GenericStringList>;');
    });

    test('Check THINGNAME with TT and TS', async () => {
        const result = transformer.parsePropertyDefinition({
            name: 'color',
            aspects: {
                thingShape: 'Test_TS',
                thingTemplate: 'Test_TT',
            },
            isLocalOnly: false,
            description: '',
            category: '',
            baseType: 'THINGNAME',
            ordinal: 0,
        });
        expect(printNode(result)).toBe('color!: THINGNAME<Test_TT, Test_TS>;');
    });

    test('Check THINGTEMPLATENAME with TS and no TS', async () => {
        const result = transformer.parsePropertyDefinition({
            name: 'color',
            aspects: {
                thingShape: 'Test_TS',
            },
            isLocalOnly: false,
            description: '',
            category: '',
            baseType: 'THINGTEMPLATENAME',
            ordinal: 0,
        });
        expect(printNode(result)).toBe('color!: THINGTEMPLATENAME<any, Test_TS>;');
    });

    test('Check property persistent, logged and units, min, max', async () => {
        const result = transformer.parsePropertyDefinition({
            name: 'mileage',
            aspects: {
                isLogged: true,
                isPersistent: true,
                isReadOnly: true,
                units: 'km',
                minimumValue: 1,
                maximumValue: 2,
            },
            isLocalOnly: false,
            description: '',
            category: '',
            baseType: 'NUMBER',
            ordinal: 0,
        });
        expect(printNode(result)).toBe('@persistent\n@logged\n@minimumValue(1)\n@maximumValue(2)\n@unit("km")\nreadonly mileage!: NUMBER;');
    });

    test('Check property data change type', async () => {
        const result = transformer.parsePropertyDefinition({
            name: 'mileage',
            aspects: {
                dataChangeThreshold: 30,
                dataChangeType: TWPropertyDataChangeKind.Value,
            },
            isLocalOnly: false,
            description: '',
            category: '',
            baseType: 'NUMBER',
            ordinal: 0,
        });
        expect(printNode(result)).toBe(`@dataChangeType("VALUE", 30)\nmileage!: NUMBER;`);
    });

    test('Check property with local binding', async () => {
        const result = transformer.parsePropertyDefinition({
            name: 'mileage',
            aspects: {},
            localBinding: {
                sourceName: 'prop',
                sourceThingName: 'Test',
                aspects: {} as TWPropertyBindingAspects,
                name: 'mileage',
            },
            isLocalOnly: false,
            description: '',
            category: '',
            baseType: 'NUMBER',
            ordinal: 0,
        });
        expect(printNode(result)).toBe(`@local("Test", "prop")\nmileage!: NUMBER;`);
    });
    test('Check property with remote binding', async () => {
        const result = transformer.parsePropertyDefinition({
            name: 'mileage',
            aspects: {
                isRemote: true,
            },
            remoteBinding: {
                aspects: { tagAddress: '', startType: TWPropertyRemoteStartKind.EdgeValue, source: '' },
                foldType: TWPropertyRemoteFoldKind.None,
                name: 'RemoteProp1',
                pushThreshold: 0,
                pushType: TWPropertyRemotePushKind.Always,
                sourceName: 'EdgeProp1',
                timeout: 0,
            },
            isLocalOnly: false,
            description: '',
            category: '',
            baseType: 'NUMBER',
            ordinal: 0,
        });
        expect(printNode(result)).toBe(
            endent`@remote("EdgeProp1", { foldType: "NONE", pushThreshold: 0, pushType: "ALWAYS", timeout: 0 })
                   mileage!: NUMBER;`,
        );
    });

    test('Check property with default value', async () => {
        const result = transformer.parsePropertyDefinition({
            name: 'mileage',
            aspects: {
                defaultValue: 10,
            },
            isLocalOnly: false,
            description: '',
            category: '',
            baseType: 'NUMBER',
            ordinal: 0,
        });
        expect(printNode(result)).toBe('mileage: NUMBER = 10;');
    });
    test('Check property with property value and default value', async () => {
        const result = transformer.parsePropertyDefinition(
            {
                name: 'mileage',
                aspects: {
                    defaultValue: 15,
                },
                isLocalOnly: false,
                description: '',
                category: '',
                baseType: 'NUMBER',
                ordinal: 0,
            },
            10,
        );
        expect(printNode(result)).toBe('mileage: NUMBER = 10;');
    });
    test('Check property with documentation', async () => {
        const result = transformer.parsePropertyDefinition(
            {
                name: 'mileage',
                aspects: {},
                isLocalOnly: false,
                description: 'Test description\nthat is also\n multiline.',
                category: '',
                baseType: 'NUMBER',
                ordinal: 0,
            },
            10,
        );
        expect(printNode(result)).toBe(endent`
          /**
           * Test description
           * that is also
           *  multiline.
           */
          mileage: NUMBER = 10;`);
    });
});

describe('Verify service definition generation', () => {
    const transformer = new JsonThingToTsTransformer();

    test('Check with name and and no parameters and number result', async () => {
        const result = transformer.parseServiceDefinition({
            aspects: {},
            code: `let result = 3;`,
            description: '',
            name: 'test',
            category: 'Uncategorized',
            isAllowOverride: false,
            isLocalOnly: false,
            isOpen: false,
            isPrivate: false,
            resultType: {
                baseType: 'NUMBER',
                name: 'result',
                aspects: {},
                description: '',
                ordinal: 0,
            },
            parameterDefinitions: [],
        });
        expect(printNode(result)).toBe(endent`
            @final
            test(): NUMBER {
                let result = 3;
                return result;
            }`);
    });
    test('Check with name and and no parameters and immediately invoked function', async () => {
        const result = transformer.parseServiceDefinition({
            aspects: {},
            code: `var result = (function () {let test = 3; return test;})()`,
            description: '',
            name: 'test',
            category: 'Uncategorized',
            isAllowOverride: false,
            isLocalOnly: false,
            isOpen: false,
            isPrivate: false,
            resultType: {
                baseType: 'NUMBER',
                name: 'result',
                aspects: {},
                description: '',
                ordinal: 0,
            },
            parameterDefinitions: [],
        });
        expect(printNode(result)).toBe(endent`
            @final
            test(): NUMBER {
                let test = 3;
                return test;
            }`);
    });
    test('Check with me references replaced with this', async () => {
        const result = transformer.parseServiceDefinition({
            aspects: {},
            code: `var result = (function () {me.test = 3; me['test'] = 3; me['ana' + 'test'] = 3; me.service({t: 3});)})()`,
            description: '',
            name: 'test',
            category: 'Uncategorized',
            isAllowOverride: false,
            isLocalOnly: false,
            isOpen: false,
            isPrivate: false,
            resultType: {
                baseType: 'NUMBER',
                name: 'result',
                aspects: {},
                description: '',
                ordinal: 0,
            },
            parameterDefinitions: [],
        });
        expect(printNode(result)).toBe(endent`
            @final
            test(): NUMBER {
                this.test = 3;
                this["test"] = 3;
                this["ana" + "test"] = 3;
                this.service({ t: 3 });
            }`);
    });

    test('Check async overriden and overridable', async () => {
        const result = transformer.parseServiceDefinition({
            aspects: {
                isAsync: true,
            },
            code: `var result = 3;`,
            description: '',
            name: 'test',
            category: 'Uncategorized',
            isAllowOverride: true,
            isOverriden: true,
            isLocalOnly: false,
            isOpen: false,
            isPrivate: false,
            resultType: {
                baseType: 'NUMBER',
                name: 'result',
                aspects: {},
                description: '',
                ordinal: 0,
            },
            parameterDefinitions: [],
        });
        expect(printNode(result)).toBe(endent`
            @override
            async test(): NUMBER {
                var result = 3;
                return result;
            }`);
    });

    test('Check with parameters', async () => {
        const result = transformer.parseServiceDefinition({
            aspects: {},
            code: `var result = 3;`,
            description: '',
            name: 'test',
            category: 'Uncategorized',
            isAllowOverride: false,
            isOverriden: false,
            isLocalOnly: false,
            isOpen: false,
            isPrivate: false,
            resultType: {
                baseType: 'NUMBER',
                name: 'result',
                aspects: {},
                description: '',
                ordinal: 0,
            },
            parameterDefinitions: [
                {
                    baseType: 'INFOTABLE',
                    aspects: {
                        dataShape: 'GenericStringList',
                    },
                    description: '',
                    name: 'param1',
                    ordinal: 0,
                },
                {
                    baseType: 'THINGNAME',
                    aspects: {
                        isRequired: true,
                        thingTemplate: 'GenericThing',
                    },
                    description: '',
                    name: 'param2',
                    ordinal: 1,
                },
                {
                    baseType: 'STRING',
                    aspects: {
                        defaultValue: 'testValue',
                    },
                    description: '',
                    name: 'param3',
                    ordinal: 2,
                },
            ],
        });
        expect(printNode(result)).toBe(endent`
            @final
            test({ param1, param2, param3 = "testValue" }: {
                param1?: INFOTABLE<GenericStringList>;
                param2: THINGNAME<GenericThing>;
                param3?: STRING;
            }): NUMBER {
                var result = 3;
                return result;
            }`);
    });

    test('Check with remote binding', async () => {
        const result = transformer.parseServiceDefinition({
            aspects: {},
            code: '',
            description: '',
            name: 'test',
            category: 'Uncategorized',
            isAllowOverride: false,
            isOverriden: false,
            isLocalOnly: false,
            isOpen: false,
            isPrivate: false,
            resultType: {
                baseType: 'NUMBER',
                name: 'result',
                aspects: {},
                description: '',
                ordinal: 0,
            },
            parameterDefinitions: [
                {
                    baseType: 'STRING',
                    aspects: {},
                    description: '',
                    name: 'param1',
                    ordinal: 0,
                },
            ],
            remoteBinding: {
                enableQueue: true,
                sourceName: 'targetSource',
                timeout: 100,
                name: 'test',
            },
        });
        expect(printNode(result)).toBe(endent`
            @final
            @remoteService("targetSource", { enableQueue: true, timeout: 100 })
            test({ param1 }: {
                param1?: STRING;
            }): NUMBER { }`);
    });

    test('Check with documentation', async () => {
        const result = transformer.parseServiceDefinition({
            aspects: {},
            code: `var result = 3;`,
            description: 'Test documentation\nWith multiple\nlines',
            name: 'test',
            category: 'Uncategorized',
            isAllowOverride: false,
            isOverriden: false,
            isLocalOnly: false,
            isOpen: false,
            isPrivate: false,
            resultType: {
                baseType: 'NUMBER',
                name: 'result',
                aspects: {},
                description: '',
                ordinal: 0,
            },
            parameterDefinitions: [],
        });
        expect(printNode(result)).toBe(endent`
            /**
             * Test documentation
             * With multiple
             * lines
             */
            @final
            test(): NUMBER {
                var result = 3;
                return result;
            }`);
    });
});
