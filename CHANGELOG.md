# 2.1.6

Resolves an issue where bindings to/from mashup parameters did not work at runtime.

Resolves an issue where passing or retrieving mashup parameter values did not work for the `Navigationfunction` widget.

# 2.1.5

Adds support for using the `@visible` decorator to assign visibility permissions to mashups. ([kklorenzotesta](https://github.com/kklorenzotesta))

Resolves an issue where certain typescript transforms weren't properly applied. This fixes issues where using `this` in an arrow function produced incorrect code. ([kklorenzotesta](https://github.com/kklorenzotesta))

# 2.1

Upgrades to tyescript 5. ([stefan-lacatus](https://github.com/stefan-lacatus))

Resolves a regression where recursive global functions would cause build to fail with a stack overflow error. ([stefan-lacatus](https://github.com/stefan-lacatus))

Adds a missing definition for the `RemoveField` infotable method. ([stefan-lacatus](https://github.com/stefan-lacatus))

Resolves an issue where type assertions could not be used for widget fields.

Resolves an issue where union binding types such as `MASHUPNAME`, `THINGNAME` would cause an invalid type error when used in widget properties.

Adds typings and defaults for the widgets added in Thingworx 9.4.

# 2.0.2

Fixes a bug where enum members were not properly inlined when referenced by global functions defined on the first line of a file.

Update the typings for the `DisableSubscription` and `EnableSubscription` to support the new signatures in Thingworx 9. ([kklorenzotesta](https://github.com/kklorenzotesta))

# 2.0.1

Fixes a bug that caused certain global function dependencies to not be properly copied depending on where the global functions were defined.

Updates the schema of the `twconfig.json` file to include the documentation for the `UIPlugin` property.

# 2.0.0

Adds support for the following entity kinds:
 - `Mashup`
 - `StyleDefinition`
 - `StateDefinition`

Adds a new `UITransformer` class that can be used to convert `.tsx` files into mashup entities. This can work together with optional `UIPlugin` objects that can further customize the output of this transformer.

Adds support for loading JSON and CSS files in mashup or widget properties instead of specifying them inline.

Adds support for core ui mashups. These are mashups that use a `TypeScript Class` widget to enable additional arbitrary code to be specified alongside the usual mashup JSX structure.

Removes the declaration for a series of test mashups that typical thingworx instances will not contain.

# 1.7.4

Reverted the change to the `LOCATION` type. It is now additionally a union with a `Location` type that defines the `toJSON` method.

# 1.7.3

Removed an unused aspect from user entities that caused the emitted entities to be incompatible with versions of thingworx earlier than 9.0. ([CozminM](https://github.com/CozminM))

Changed the `LOCATION` type to an interface. Additionally added the typings for its non-standard `toJSON` method.

# 1.7.2

Resolves an issue where inline SQL services on non-database entities were not always properly installed on the target database entity.

Adds support for using a line comment `// bm-profiler-disable-next-line` to cause the transformer to not emit any tracing code for the following line.

Resolves an issue where function names and sources were not properly discovered for trace builds.

# 1.7.1

Arrow functions are no longer downleveled to bound functions as this causes an exception to be thrown when callbacks are used with non-native objects.

# 1.7

Adds limited support for using the `super` keyword to invoke the base class implementation of a service when overridden by a thing or template. Currently only methods that are known at compile time support this, and only when both the subclass and superclass are part of the project. A new `superCalls` key in `twconfig.json` can be used to configure how permissions are handled when invoking superclass implementations.

Adds support for writing inline SQL statements on non-database entities. This requires that the class have a `@database` decorator that specifies a database thing or SQL thing on which the services will actually be installed. The transformer will replace those inline SQL statements with service invokes on the specified database thing.

Resolves an issue where permissions for inline SQL statements were not properly generated if not other permissions were defined on the source entity.

The transformer will now attempt to infer the return type of services if not specified. Additionally, method overload signatures no longer cause a compilation error. When method overloads are used, only the implementation signature will be used to generate the service definition.

Resolves an issue where the transformer did not generate the proper breakpoint locations for global functions.

Improved the positioning of generated breakpoint locations. These will now be more often placed on the same line in which a statement begins, rather than the position where the previous statement ends.

Resolves an issue where constant enum members used in global functions were not inlined.

When referencing environment variables that are not defined when building, the transformer will now replace them with the `undefined` keyword rather than retaining the original source code. Additionally, the transformer will generate a warning diagnostic message whenever such environment variables are encountered.

Added support for breakpoints on caught or uncaught exceptions when creating debug builds.

Debug builds will now generate breakpoint locations prior to throw statements. This will also more accurately allow the debugger to highlight where an exception was thrown.

Updated the `Struct` type to retain modifiers defined on the types it is applied to.

Updated the `ValueCollectionCovertible` type to use `Struct` rather than `Partial`. This will now make it an error to add a row without specifying all required fields.

Added type definitions for enviornment variables. This will allow projects to use them without having to include the node typings, which include a lot of additional symbols that can't actually be used.

Resolves an issue where arrow functions were not properly downleveled to bound functions.

Resolves an issue where shadowing a service parameter caused unexpected behaviour at runtime.

# 1.6.1

Added the type definitions for the `SQLThing` thing template. ([s-amory](https://github.com/s-amory))

# 1.6

The transformer will now remove if branches when testing against compile time constants with a value of `"false"` or `false`. Additionally it will remove else branches when testing against compile time constants with a value of `"true"` or `true`.

For example, the following branch will be removed if the `FEATURE_ENABLED` environment variable being tested is `"false"`:

```ts
if (process.env.FEATURE_ENABLED) {
    this.ProcessData();
}
```

The following branch will also be removed:
```ts
if ("false") {
    logger.debug("Received message");
}
```

Only simple expressions are currently considered for this feature, so the following branch will not be removed:

```ts
if (process.env.FEATURE_ENABLED == 'true') {
    this.ProcessData();
}
```

Added a new `@ifenv` decorator that can used to only emit certain entities when an environment variable is defined. For example, the following thing will only be emitted when the value of the `DEVELOPMENT` env variable being tested is `"true"`.

```ts
@ifenv(process.env.DEVELOPMENT)
@ThingDefinition class DebugScripts extends GenericThing {
    ...
}
```

When the value of the tested environment variable is `"false"`, neither the entity nor its collection declaration are emitted. This means that compilation will fail if any other entity references it via its collection, even if the accessing entity is also set to not be emitted.

# 1.5.1

For the `allowInstance` and `denyInstance` decorators, an optional resource may now be specified.

Adds support for a new `@indexed` decorator that can be used to mark a property as indexed.

The transformer will no longer throw when the `@deploy` decorator is specified on templates or shapes. Additionally, the `deploymentEndpoints` property is now an array of objects that contains the entity names, service names and entity kinds for the services marked with the decorator.

# 1.5

Added a type guard to the `ImplementsShape` and `IsDerivedFromTemplate` to improve type inferrence when using these to test.

For example, the compiler will now correctly infer that the thing is a `Connectable` in the example below.

```ts
const thing = Things[name];

if (thing.ImplementsShape({thingShapeName: 'Connectable'})) {
    logger.debug(`${name} connection status: ${thing.isConnected}`); // <- Not a type error
}
```

Added support for generating trace builds that can be used with the `BMProfiler` extension.

It is now possible to specify two optional callbacks via the configuration object:
 - `transformerWillStartFile(name: string): void` is invoked before the transformer starts processing a file in the "before" phase.
 - `transformerDidFinishFile(name: string): void` is invoked after the transformer finishes processing a file in the "after" phaase.

The configuration object now includes an additional `copyEntities` property. It is not directly used by the transformer, but is used by the cli tools to make it possible to include arbitrary XML entities to be included the built extension.

Resolves an issue where specifying the default value of a service argument would sometimes cause incorrect code to be emitted.

# 1.4.8

Resolves an issue where the `LOG_PREFIX` constant was declared before the other log helpers which prevented it from referencing them. ([stefan-lacatus](https://github.com/stefan-lacatus))

# 1.4.7

Resolves a typing issue where the not equal filter was being called NEQ instead of NE and added the missing NOTLIKE filter. ([stefan-lacatus](https://github.com/stefan-lacatus))

# 1.4.6

Resolves an issue where using recursive global functions would lead to a compilation error when building on windows systems. ([elena-bi](https://github.com/elena-bi))

# 1.4.5

Improved the error messages that appear when declaring a service parameter with certain unsupported types. ([stefan-lacatus](https://github.com/stefan-lacatus))

Adds support for the `@category` decorator to specify the category of properties, events and services. ([stefan-lacatus](https://github.com/stefan-lacatus))

When the type of an expression in an inline SQL statement can't be directly determined, the transformer will now use the primitive type that the expression can be assigned to, if an appropriate one exists, to reduce the need of using type assertions.

Resolves an issue where the type inferrence for the inline SQL parameters when building with the `--debug` argument, while working for non-debug builds.

# 1.4.0

Adds support for data shape inheritance. ([stefan-lacatus](https://github.com/stefan-lacatus))

Resolves an issue where using the transformer with `ts.transform` would throw an error when attempting to resolve constant expressions.

The transformer will no longer emit members with the `declare` modifier.  ([stefan-lacatus](https://github.com/stefan-lacatus))

Resolves an issue where the `__values` helper was in some cases not inlined, preventing the use of transpiled es6 features.

Resolves an issue where having global functions enabled would also cause the transformer to inline functions declared in global code.

# 1.3.1

Resolves an issue where inline SQL statements would compile into code with syntax errors.

# 1.3

Adds support for using inline SQL statements and extracting them into SQL services.

Updated versioning to match the version numbers used by `bm-thing-cli`.

Adds support for using the `override` keyword in place of the `@override` decorator. Additionally deprecates the `@override` decorator.

Adds support for reporting errors and warnings via a new `"@diagnosticMessages"` key that is added to the twconfig store. This version emits a warning when using the `@override` decorator.

Adds a new method `validateConstraints` that can validate a set of constraints that are required by Thingworx but optional in typescript. This method must be invoked after all files have been processed and currently validates the following, writing out error messages as appropriate to the `"@diagnosticMessages"` store:
 - Properties, events and subscriptions are not overriden.
 - Services that are overriden use the override keyword or decorator.
 - Services that are overriden are not marked final in a base class.

Note that this will only validate for files defined in the current project. For example, it will not report an error when overriding a service which cannot be overriden that originates in a `.d.ts` file generated from a thingworx instance.

The transformer will now report an error when using the `override` keyword on properties, events or subscriptions. This combines particularly well with the `noImplicitOverride` flag in typescript, which requires the use of the `override` keyword when overriding a base class member.

# 0.22.1-beta.1

Resolves an issue that caused global functions to not be inlined when compiling on windows systems.

# 0.22.0-beta.1

Adds support for declaring and inlining global functions.

The transformer will no longer replace instances of `this` with `me`. Instead it will always use anonymous functions invoked with apply to set the appropriate context.

The transformer will now only declare the method helpers that are referenced in each service, instead of always including them.

Added support for using the `@exported` decorator to generate an API declarations file that can be consumed by a separate frontend or node project. ([stefan-lacatus](https://github.com/stefan-lacatus))

# 0.21.1-beta.1

Improved the infotable type ([stefan-lacatus](https://github.com/stefan-lacatus)):
- Added documentation for most infotable methods. This is based on the existing documentation in the [Monaco BaseTypes](https://github.com/ptc-iot-sharing/MonacoEditorTWX/blob/master/src/configs/declarations/ThingworxBaseTypes.d.ts) and the JavaDocs.
- Improved types for `Filter`, `Find` and `Delete`. They cannot take in a QUERY as parameter. The lowercase variants can, but those cannot be called from javascript.
- Added missing `topN`, `topNToNewInfotable`, `hasField`, `getRow` methods.
- Added the missing `dataShape` property.

Improved the data shape type by exposing the `fields` property.

# 0.21.0-beta.1

Adds support for generating method helpers, that are useful variables that can be used for logging. The following variables can be enabled: `METHOD_NAME`, `CLASS_NAME`, `FILE_PATH` and `LOG_PREFIX`. ([stefan-lacatus](https://github.com/stefan-lacatus))

# 0.20.1-beta.1

Resolved the declarations for the thingworx global functions such as `dateAddDays` that had improper return types. ([stefan-lacatus](https://github.com/stefan-lacatus))

# 0.19.0-beta.1

Added support for using inferred types in property declarations and data shape field declarations. ([stefan-lacatus](https://github.com/stefan-lacatus))

Resolved an issue that cause base type errors to report the invalid base types as `undefined` rather than the actual types.

Resolved an issue that caused permission decorators applied to templates to be incorrectly emitted as runtime permissions instead of instance runtime permissions. ([stefan-lacatus](https://github.com/stefan-lacatus))

Resolved an issue that caused multiproject builds to fail on windows systems.

# 0.18.0-beta.1

Removed `gulp` as a dev dependency and the build script using it. Use `npm run build` to build this release, which just executes `tsc` directly.

The core thingworx types are now included with the transformer instead of being part of the thingworx projects.

Added support for building sub projects when the project name is set to `"@auto"` in twconfig.

Added support for using compile time constants (such as env variables) in the `@config` decorator.

Added support for the `THINGGROUP` type.

Added support for generating dummy thing declaration for thing template and thing shape entities and the `"generateThingInstances"` property in twconfig.

Resolves an issue where creating debug builds could fail in certain cases.

# 0.17.0-beta.1

Added the ability to generate "debug" builds, to be used with the `BMDebugger` extension.

# 0.16.0-beta.1

Adds support for the `@unit` decorator.

Resolves an issue that caused an improper declaration to be created when creating a user list with multiple users or groups. ([dwil618](https://github.com/dwil618))

# 0.15.0-beta.1

Changes by [dwil618](https://github.com/dwil618)

Added support for the `@minimum` and `@maximum` decorator on numeric properties.

Added support for date initializers using the `new Date(string)` constructor.

# 0.14.0-beta.1

Added support for specifying the data shape of a data thing via the generic argument of the template type.

Added support for the `DataThing` utility function.

Added preliminary support for the `@config` decorator.

# 0.13.1-beta.1

Resolves an issue that caused the `@editable` decorator to not work for non-thing entities.

Visibility decorators applied to user lists will now apply to all of their members.

# 0.13.0-beta.1

Adds support for parsing classes that extend from `UserList` and emitting XML files that contain users and groups.

Adds support for parsing classes that extend from `OrganizationBase` and emitting XML files that contain organizations.

Adds support for parsing the `@allow`, `@allowInstance`, `@deny` and `@denyInstance` decorators and emitting permissions in XML files.

Adds support for parsing the `@visible` and `@visibleInstance` decorators and emitting visibility permissions in XML files.

Adds support for pasing the `@deploy` decorator and exposing a list of endpoints that match the services with that decorator.

Adds support for inlining environment variables.

# 0.12.0-beta.1

Adds support for specifying the `baseDataShape` attribute on data shapes and for the `@DataShapeDefinition` decorator. This feature doesn't seem to work yet in Thingworx though, so it is not included in the project template.

# 0.11.3-beta.1

Resolves an issue that caused replacement for constants and `this` to fail in service code.

# 0.11.2-beta.1

Resolves an issue that caused descriptions to be omitted.

# 0.11.1-beta.1

Resolves an issue that caused an issue with transforming service arguments, leading to code that would crash at runtime.

# 0.11.0-beta.1

Updated Typescript to version 4.

Added support for specifying the type of destructured service parameters as an interface, in addition to a literal type.

# 0.10.0-beta.1

Added support for the `@ordinal(_)` decorator which can be used to specify ordinal values on data shape fields.

Added support for the `autoGenerateDataShapeOrdinals` configuration flag which, when set to `true`, causes the transformer to assign automatically generated ordinal values to data shape fields that don't use the `@ordinal` decorator. The values will start from 0 and increase by 1 for each field.

# 0.9.0-beta.1

Added support for the `@exportName(_)` decorator which can be used to assign an entity name that is different from the class name. This can be useful when the project's naming conventions aren't compatible with the javascript identifier naming rules. Additionally, with the infotables and event types, it is now possible to specify a data shape name instead of a data shape type as a type argument. For types that aren't erased (e.g. property, argument and return types) it is required to use the data shape name if it is different from its class name.

Added support for referencing thing templates and thing shapes in extends clauses via string literals.

Added support for setting the `projectName` property on a transformer instance. This will cause the specified value to be used as the `projectName` attribute of the exported entity.

Resolves an issue that caused implemented shapes to not be included in the XML files.

Added support for specifying a `store` object where transformer instances will be retained. When specified, these will no longer be added to the global object.

Thrown errors that aren't caught will no longer display the call stack. Additionally, the line and character positions where transformation failed will now be displayed in error in place of the file position.

Added experimental support for global code.

# 0.4.0-beta.1

Since the all caps base types don't blend in nicely with generic typescript type names, this versions has added support for lowercase variants to the Thingworx base type names, with the exception of the various entity name types which are camel cased.

Additionally, the following conversions are now done:
 * `void` can be used as `NOTHING`
 * `Date` can be used as `DATETIME`

# 0.2.0-beta.1

Added support for `JSON` and `TWJSON` types. Further improved error handling when specifying unknown base types in certain scenarios.

Added support for converting JSDoc into thingworx descriptions.

# 0.1.0-beta.1

The transformer will now inline all const enums used in property initializers, argument initializers or method bodies.

# 0.0.1-alpha.6

Resolves an import error when returning thingnames with constraints from services.

Added support for the `@override` decorator, which must be specified on services that override a parent implementation.

# 0.0.1-alpha.5

Resolves a crash when returning infotables or thingnames from results.

# 0.0.1-alpha.4

Resolves an issue where the base thing template for a thing template was improperly specified as `thingTemplate` instead of `baseThingTemplate`.

Resolves an issue where literals other than strings or numbers that were specified in property initializers would be ignored and cause a crash during compilation.

Added support for configuration table definition decorators.

# 0.0.1-alpha.3

Inital Release