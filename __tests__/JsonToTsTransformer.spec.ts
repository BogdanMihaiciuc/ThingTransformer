import { JsonThingToTsTransformer } from "../src/transformer/JsonToTsTransformer";
import { printNode } from "../src/transformer/tsUtils";
import endent from "endent";
import { glob } from "glob";
import {
  TWEntityKind,
  TWPropertyBindingAspects,
  TWPropertyDataChangeKind,
  TWPropertyRemoteFoldKind,
  TWPropertyRemotePushKind,
  TWPropertyRemoteStartKind,
  TWSubscriptionSourceKind,
} from "../src/transformer/TWCoreTypes";
import { readFileSync } from "fs";
import * as path from "path";

describe("Verify property definition generation", () => {
  const transformer = new JsonThingToTsTransformer();

  test("Check simple with name and basetype", async () => {
    const result = transformer.convertPropertyDefinition({
      name: "color",
      aspects: {},
      isLocalOnly: false,
      description: "",
      category: "",
      baseType: "STRING",
      ordinal: 7,
    });
    expect(printNode(result)).toBe("color!: STRING;");
  });

  test("Check with default value string", async () => {
    const result = transformer.convertPropertyDefinition({
      name: "color",
      aspects: {
        defaultValue: "test",
      },
      isLocalOnly: false,
      description: "",
      category: "",
      baseType: "STRING",
      ordinal: 0,
    });
    expect(printNode(result)).toBe('color: STRING = "test";');
  });

  test("Check with default value number", async () => {
    const result = transformer.convertPropertyDefinition({
      name: "color",
      aspects: {
        defaultValue: 10,
      },
      isLocalOnly: false,
      description: "",
      category: "",
      baseType: "INTEGER",
      ordinal: 0,
    });
    expect(printNode(result)).toBe("color: INTEGER = 10;");
  });

  test("Check infotable with datashape", async () => {
    const result = transformer.convertPropertyDefinition({
      name: "color",
      aspects: {
        dataShape: "GenericStringList",
      },
      isLocalOnly: false,
      description: "",
      category: "",
      baseType: "INFOTABLE",
      ordinal: 0,
    });
    expect(printNode(result)).toBe("color!: INFOTABLE<GenericStringList>;");
  });

  test("Check THINGNAME with TT and TS", async () => {
    const result = transformer.convertPropertyDefinition({
      name: "color",
      aspects: {
        thingShape: "Test_TS",
        thingTemplate: "Test_TT",
      },
      isLocalOnly: false,
      description: "",
      category: "",
      baseType: "THINGNAME",
      ordinal: 0,
    });
    expect(printNode(result)).toBe('color!: THINGNAME<"Test_TT", "Test_TS">;');
  });

  test("Check THINGTEMPLATENAME with TS and no TS", async () => {
    const result = transformer.convertPropertyDefinition({
      name: "color",
      aspects: {
        thingShape: "Test_TS",
      },
      isLocalOnly: false,
      description: "",
      category: "",
      baseType: "THINGTEMPLATENAME",
      ordinal: 0,
    });
    expect(printNode(result)).toBe('color!: THINGTEMPLATENAME<undefined, "Test_TS">;');
  });

  test("Check property persistent, logged and units, min, max", async () => {
    const result = transformer.convertPropertyDefinition({
      name: "mileage",
      aspects: {
        isLogged: true,
        isPersistent: true,
        isReadOnly: true,
        units: "km",
        minimumValue: 1,
        maximumValue: 2,
      },
      isLocalOnly: false,
      description: "",
      category: "",
      baseType: "NUMBER",
      ordinal: 0,
    });
    expect(printNode(result)).toBe(
      '@minimumValue(1)\n@maximumValue(2)\n@unit("km")\n@persistent\n@logged\nreadonly mileage!: NUMBER;'
    );
  });

  test("Check property data change type", async () => {
    const result = transformer.convertPropertyDefinition({
      name: "mileage",
      aspects: {
        dataChangeThreshold: 30,
        dataChangeType: TWPropertyDataChangeKind.Value,
      },
      isLocalOnly: false,
      description: "",
      category: "",
      baseType: "NUMBER",
      ordinal: 0,
    });
    expect(printNode(result)).toBe(
      `@dataChangeType("VALUE", 30)\nmileage!: NUMBER;`
    );
  });

  test("Check property with local binding", async () => {
    const result = transformer.convertPropertyDefinition({
      name: "mileage",
      aspects: {},
      localBinding: {
        sourceName: "prop",
        sourceThingName: "Test",
        aspects: {} as TWPropertyBindingAspects,
        name: "mileage",
      },
      isLocalOnly: false,
      description: "",
      category: "",
      baseType: "NUMBER",
      ordinal: 0,
    });
    expect(printNode(result)).toBe(`@local("Test", "prop")\nmileage!: NUMBER;`);
  });
  test("Check property with remote binding", async () => {
    const result = transformer.convertPropertyDefinition({
      name: "mileage",
      aspects: {
        isRemote: true,
      },
      remoteBinding: {
        aspects: {
          tagAddress: "",
          startType: TWPropertyRemoteStartKind.EdgeValue,
          source: "",
        },
        foldType: TWPropertyRemoteFoldKind.None,
        name: "RemoteProp1",
        pushThreshold: 0,
        pushType: TWPropertyRemotePushKind.Always,
        sourceName: "EdgeProp1",
        timeout: 0,
      },
      isLocalOnly: false,
      description: "",
      category: "",
      baseType: "NUMBER",
      ordinal: 0,
    });
    expect(printNode(result)).toBe(
      endent`@remote("EdgeProp1", { foldType: "NONE", pushThreshold: 0, pushType: "ALWAYS", timeout: 0 })
                   mileage!: NUMBER;`
    );
  });

  test("Check property with default value", async () => {
    const result = transformer.convertPropertyDefinition({
      name: "mileage",
      aspects: {
        defaultValue: 10,
      },
      isLocalOnly: false,
      description: "",
      category: "",
      baseType: "NUMBER",
      ordinal: 0,
    });
    expect(printNode(result)).toBe("mileage: NUMBER = 10;");
  });
  test("Check property with property value and default value", async () => {
    const result = transformer.convertPropertyDefinition(
      {
        name: "mileage",
        aspects: {
          defaultValue: 15,
        },
        isLocalOnly: false,
        description: "",
        category: "",
        baseType: "NUMBER",
        ordinal: 0,
      },
      10
    );
    expect(printNode(result)).toBe("mileage: NUMBER = 10;");
  });
  test("Check property with documentation", async () => {
    const result = transformer.convertPropertyDefinition(
      {
        name: "mileage",
        aspects: {},
        isLocalOnly: false,
        description: "Test description\nthat is also\n multiline.",
        category: "",
        baseType: "NUMBER",
        ordinal: 0,
      },
      10
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

describe("Verify service definition generation", () => {
  const transformer = new JsonThingToTsTransformer();

  test("Check with name and and no parameters and number result", async () => {
    const result = transformer.convertServiceDefinition({
      aspects: {},
      code: `let result = 3;`,
      description: "",
      name: "test",
      category: "Uncategorized",
      isAllowOverride: false,
      isLocalOnly: false,
      isOpen: false,
      isPrivate: false,
      resultType: {
        baseType: "NUMBER",
        name: "result",
        aspects: {},
        description: "",
        ordinal: 0,
      },
      parameterDefinitions: [],
      "@globalFunctions": new Set([]),
      "@methodHelpers": new Set([]),
    });
    expect(printNode(result)).toBe(endent`
            @final
            test(): NUMBER {
                let result = 3;
                return result;
            }`);
  });
  test("Check with code containing comments", async () => {
    const result = transformer.convertServiceDefinition({
      aspects: {},
      code: `let result = 3;\n//test comment\n/**\n * comment\n*/\nlet test = 4;`,
      description: "",
      name: "test",
      category: "Uncategorized",
      isAllowOverride: false,
      isLocalOnly: false,
      isOpen: false,
      isPrivate: false,
      resultType: {
        baseType: "NUMBER",
        name: "result",
        aspects: {},
        description: "",
        ordinal: 0,
      },
      parameterDefinitions: [],
      "@globalFunctions": new Set([]),
      "@methodHelpers": new Set([]),
    });
    expect(printNode(result)).toBe(endent`
            @final
            test(): NUMBER {
                let result = 3;
                //test comment
                /**
                 * comment
                 */
                let test = 4;
                return result;
            }`);
  });
  test("Check with code containing newlines", async () => {
    const result = transformer.convertServiceDefinition({
      aspects: {},
      code: `let result = 3;\n\n\nlet test = 4;`,
      description: "",
      name: "test",
      category: "Uncategorized",
      isAllowOverride: false,
      isLocalOnly: false,
      isOpen: false,
      isPrivate: false,
      resultType: {
        baseType: "NUMBER",
        name: "result",
        aspects: {},
        description: "",
        ordinal: 0,
      },
      parameterDefinitions: [],
      "@globalFunctions": new Set([]),
      "@methodHelpers": new Set([]),
    });
    expect(printNode(result)).toBe(endent`
            @final
            test(): NUMBER {
                let result = 3;
                
            
                let test = 4;
                return result;
            }`);
  });
  test("Check with code with function declaration", async () => {
    const result = transformer.convertServiceDefinition({
      aspects: {},
      code: `let result = test(1,2);function test(x, y) {return a+b;}`,
      description: "",
      name: "test",
      category: "Uncategorized",
      isAllowOverride: false,
      isLocalOnly: false,
      isOpen: false,
      isPrivate: false,
      resultType: {
        baseType: "NUMBER",
        name: "result",
        aspects: {},
        description: "",
        ordinal: 0,
      },
      parameterDefinitions: [],
      "@globalFunctions": new Set([]),
      "@methodHelpers": new Set([]),
    });
    expect(printNode(result)).toBe(endent`
            @final
            test(): NUMBER {
                let result = test(1, 2);
                function test(x, y) { return a + b; }
                return result;
            }`);
  });
  test("Check with code with function declaration and me references", async () => {
    const result = transformer.convertServiceDefinition({
      aspects: {},
      code: `let result = test();function test(x, y) {return me.a+me['b'];}`,
      description: "",
      name: "test",
      category: "Uncategorized",
      isAllowOverride: false,
      isLocalOnly: false,
      isOpen: false,
      isPrivate: false,
      resultType: {
        baseType: "NUMBER",
        name: "result",
        aspects: {},
        description: "",
        ordinal: 0,
      },
      parameterDefinitions: [],
      "@globalFunctions": new Set([]),
      "@methodHelpers": new Set([]),
    });
    expect(printNode(result)).toBe(endent`
            @final
            test(): NUMBER {
                let result = test();
                function test(x, y) { return this.a + this["b"]; }
                return result;
            }`);
  });
  test("Check with name and and no parameters and immediately invoked function", async () => {
    const result = transformer.convertServiceDefinition({
      aspects: {},
      code: `var result = (function () {let test = 3; return test;})()`,
      description: "",
      name: "test",
      category: "Uncategorized",
      isAllowOverride: false,
      isLocalOnly: false,
      isOpen: false,
      isPrivate: false,
      resultType: {
        baseType: "NUMBER",
        name: "result",
        aspects: {},
        description: "",
        ordinal: 0,
      },
      parameterDefinitions: [],
      "@globalFunctions": new Set([]),
      "@methodHelpers": new Set([]),
    });
    expect(printNode(result)).toBe(endent`
            @final
            test(): NUMBER {
                let test = 3;
                return test;
            }`);
  });
  test("Check with name and immediately invoked with apply", async () => {
    const result = transformer.convertServiceDefinition({
      aspects: {},
      code: `var result = (function () {let test = 3; return test;}).apply(me)`,
      description: "",
      name: "test",
      category: "Uncategorized",
      isAllowOverride: false,
      isLocalOnly: false,
      isOpen: false,
      isPrivate: false,
      resultType: {
        baseType: "NUMBER",
        name: "result",
        aspects: {},
        description: "",
        ordinal: 0,
      },
      parameterDefinitions: [],
      "@globalFunctions": new Set([]),
      "@methodHelpers": new Set([]),
    });
    expect(printNode(result)).toBe(endent`
            @final
            test(): NUMBER {
                let test = 3;
                return test;
            }`);
  });
  test("Check with me references replaced with this", async () => {
    const result = transformer.convertServiceDefinition({
      aspects: {},
      code: `var result = (function () {me.test = 3; me['test'] = 3; me['ana' + 'test'] = 3; me.service({t: 3});)})()`,
      description: "",
      name: "test",
      category: "Uncategorized",
      isAllowOverride: false,
      isLocalOnly: false,
      isOpen: false,
      isPrivate: false,
      resultType: {
        baseType: "NUMBER",
        name: "result",
        aspects: {},
        description: "",
        ordinal: 0,
      },
      parameterDefinitions: [],
      "@globalFunctions": new Set([]),
      "@methodHelpers": new Set([]),
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

  test("Check async overriden and overridable", async () => {
    const result = transformer.convertServiceDefinition({
      aspects: {
        isAsync: true,
      },
      code: `var result = 3;`,
      description: "",
      name: "test",
      category: "Uncategorized",
      isAllowOverride: true,
      isOverriden: true,
      isLocalOnly: false,
      isOpen: false,
      isPrivate: false,
      resultType: {
        baseType: "NUMBER",
        name: "result",
        aspects: {},
        description: "",
        ordinal: 0,
      },
      parameterDefinitions: [],
      "@globalFunctions": new Set([]),
      "@methodHelpers": new Set([]),
    });
    expect(printNode(result)).toBe(endent`
            @override
            async test(): NUMBER {
                var result = 3;
                return result;
            }`);
  });

  test("Check with parameters", async () => {
    const result = transformer.convertServiceDefinition({
      aspects: {},
      code: `var result = 3;`,
      description: "",
      name: "test",
      category: "Uncategorized",
      isAllowOverride: false,
      isOverriden: false,
      isLocalOnly: false,
      isOpen: false,
      isPrivate: false,
      resultType: {
        baseType: "NUMBER",
        name: "result",
        aspects: {},
        description: "",
        ordinal: 0,
      },
      parameterDefinitions: [
        {
          baseType: "INFOTABLE",
          aspects: {
            dataShape: "GenericStringList",
          },
          description: "",
          name: "param1",
          ordinal: 0,
        },
        {
          baseType: "THINGNAME",
          aspects: {
            isRequired: true,
            thingTemplate: "GenericThing",
          },
          description: "",
          name: "param2",
          ordinal: 1,
        },
        {
          baseType: "STRING",
          aspects: {
            defaultValue: "testValue",
          },
          description: "",
          name: "param3",
          ordinal: 2,
        },
      ],
      "@globalFunctions": new Set([]),
      "@methodHelpers": new Set([]),
    });
    expect(printNode(result)).toBe(endent`
            @final
            test({ param1, param2, param3 = "testValue" }: {
                param1?: INFOTABLE<GenericStringList>;
                param2: THINGNAME<"GenericThing">;
                param3?: STRING;
            }): NUMBER {
                var result = 3;
                return result;
            }`);
  });

  test("Check with remote binding", async () => {
    const result = transformer.convertServiceDefinition({
      aspects: {},
      code: "",
      description: "",
      name: "test",
      category: "Uncategorized",
      isAllowOverride: false,
      isOverriden: false,
      isLocalOnly: false,
      isOpen: false,
      isPrivate: false,
      resultType: {
        baseType: "NUMBER",
        name: "result",
        aspects: {},
        description: "",
        ordinal: 0,
      },
      parameterDefinitions: [
        {
          baseType: "STRING",
          aspects: {},
          description: "",
          name: "param1",
          ordinal: 0,
        },
      ],
      remoteBinding: {
        enableQueue: true,
        sourceName: "targetSource",
        timeout: 100,
        name: "test",
      },
      "@globalFunctions": new Set([]),
      "@methodHelpers": new Set([]),
    });
    expect(printNode(result)).toBe(endent`
            @final
            @remoteService("targetSource", { enableQueue: true, timeout: 100 })
            test({ param1 }: {
                param1?: STRING;
            }): NUMBER { }`);
  });

  test("Check with documentation", async () => {
    const result = transformer.convertServiceDefinition({
      aspects: {},
      code: `var result = 3;`,
      description: "Test documentation\nWith multiple\nlines",
      name: "test",
      category: "Uncategorized",
      isAllowOverride: false,
      isOverriden: false,
      isLocalOnly: false,
      isOpen: false,
      isPrivate: false,
      resultType: {
        baseType: "NUMBER",
        name: "result",
        aspects: {},
        description: "",
        ordinal: 0,
      },
      parameterDefinitions: [],
      "@globalFunctions": new Set([]),
      "@methodHelpers": new Set([]),
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

describe("Verify event definition generation", () => {
  const transformer = new JsonThingToTsTransformer();

  test("Local event with name", async () => {
    const result = transformer.convertEventDefinition({
      category: "",
      dataShape: "GenericStringList",
      description: "",
      name: "test",
    });
    expect(printNode(result)).toBe(`test!: EVENT<GenericStringList>;`);
  });
  test("Remote event with name", async () => {
    const result = transformer.convertEventDefinition({
      category: "",
      dataShape: "GenericStringList",
      description: "",
      name: "test",
      remoteBinding: {
        name: "test",
        sourceName: "testRemoteEvent",
      },
    });
    expect(printNode(result)).toBe(
      `@remoteEvent("testRemoteEvent")\ntest!: EVENT<GenericStringList>;`
    );
  });
  test("Remote event with name and documentation", async () => {
    const result = transformer.convertEventDefinition({
      category: "",
      dataShape: "GenericStringList",
      description: "Test documentation\nWith multiple\nlines",
      name: "test",
      remoteBinding: {
        name: "test",
        sourceName: "testRemoteEvent",
      },
    });
    expect(printNode(result)).toBe(endent`
            /**
             * Test documentation
             * With multiple
             * lines
             */
            @remoteEvent("testRemoteEvent")
            test!: EVENT<GenericStringList>;`);
  });
});

describe("Verify subscription definition generation", () => {
  const transformer = new JsonThingToTsTransformer();

  test("Local subscription on custom event", async () => {
    const result = transformer.convertSubscriptionDefinition({
      description: "",
      enabled: true,
      name: "test",
      source: "",
      sourceProperty: "",
      eventName: "testEvent",
      sourceType: TWSubscriptionSourceKind.Thing,
      code: `var result = 3;`,
      "@globalFunctions": new Set([]),
      "@methodHelpers": new Set([]),
    });
    expect(printNode(result)).toBe(endent`
            @localSubscription("testEvent")
            test(alertName: STRING, eventData: INFOTABLE<testEventEvent>, eventName: STRING, eventTime: DATETIME, source: STRING, sourceProperty: STRING): void {
                var result = 3;
            }`);
  });
  test("Local subscription on datachange event", async () => {
    const result = transformer.convertSubscriptionDefinition({
      description: "",
      enabled: true,
      name: "test",
      source: "",
      sourceProperty: "testProperty",
      eventName: "DataChange",
      sourceType: TWSubscriptionSourceKind.Thing,
      code: `var result = 3;`,
      "@globalFunctions": new Set([]),
      "@methodHelpers": new Set([]),
    });
    expect(printNode(result)).toBe(endent`
            @localSubscription("DataChange", "testProperty")
            test(alertName: STRING, eventData: INFOTABLE<DataChangeEvent>, eventName: STRING, eventTime: DATETIME, source: STRING, sourceProperty: STRING): void {
                var result = 3;
            }`);
  });
  test("Subscription on AnyDataChange event of another thing", async () => {
    const result = transformer.convertSubscriptionDefinition({
      description: "",
      enabled: true,
      name: "test",
      source: "AnotherThing",
      sourceProperty: "",
      eventName: "AnyDataChange",
      sourceType: TWSubscriptionSourceKind.Thing,
      code: `var result = 3;`,
      "@globalFunctions": new Set([]),
      "@methodHelpers": new Set([]),
    });
    expect(printNode(result)).toBe(endent`
            @subscription("AnotherThing", "AnyDataChange")
            test(alertName: STRING, eventData: INFOTABLE<AnyDataChangeEvent>, eventName: STRING, eventTime: DATETIME, source: STRING, sourceProperty: STRING): void {
                var result = 3;
            }`);
  });
  test("Subscription with this references and documentation", async () => {
    const result = transformer.convertSubscriptionDefinition({
      description: "Test documentation\nWith multiple\nlines",
      enabled: true,
      name: "test",
      source: "AnotherThing",
      sourceProperty: "",
      eventName: "AnyDataChange",
      sourceType: TWSubscriptionSourceKind.Thing,
      code: `var result = 3;\nme.test = 1;`,
      "@globalFunctions": new Set([]),
      "@methodHelpers": new Set([]),
    });
    expect(printNode(result)).toBe(endent`
            /**
             * Test documentation
             * With multiple
             * lines
             */
            @subscription("AnotherThing", "AnyDataChange")
            test(alertName: STRING, eventData: INFOTABLE<AnyDataChangeEvent>, eventName: STRING, eventTime: DATETIME, source: STRING, sourceProperty: STRING): void {
                var result = 3;
                this.test = 1;
            }`);
  });
});

describe("Full thing transformations", () => {
  const transformer = new JsonThingToTsTransformer();
  const files = glob.sync("./testcases/**/*.json");
  files.forEach((f) => {
    const parsedPath = path.parse(f);
    const parentFolder = path.parse(parsedPath.dir);
    let entityKind: TWEntityKind | undefined;
    if (parentFolder.base == TWEntityKind.Thing) {
      entityKind = TWEntityKind.Thing;
    } else if (parentFolder.base == TWEntityKind.ThingShape) {
      entityKind = TWEntityKind.ThingShape;
    } else if (parentFolder.base == TWEntityKind.ThingTemplate) {
      entityKind = TWEntityKind.ThingTemplate;
    } else if (parentFolder.base == TWEntityKind.DataShape) {
      entityKind = TWEntityKind.DataShape;
    }
    if (!entityKind) {
      throw `Unrecognized entity type folder with testcases called ${parentFolder.base}`;
    }
    it(`Verifying testcase ${f}`, async () => {
      const inputFile = JSON.parse(readFileSync(f, "utf-8"));
      const transformedCode = transformer.createTsDeclarationForEntity(
        inputFile,
        entityKind!
      );
      expect(transformedCode.declaration).toBe(
        readFileSync(
          path.join(parsedPath.dir, parsedPath.name + ".ts")
        ).toString()
      );
    });
  });
});
