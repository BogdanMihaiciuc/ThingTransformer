# 0.9.0-beta.1

Added support for the `@exportName(_)` decorator which can be used to assign an entity name that is different from the class name. This can be useful when the project's naming conventions aren't compatible with the javascript identifier naming rules. Additionally, with the infotables and event types, it is now possible to specify a data shape name instead of a data shape type as a type argument. For types that aren't erased (e.g. property, argument and return types) it is required to use the data shape name if it is different from its class name.

Added support for referencing thing templates and thing shapes in extends clauses via string literals.

Added support for setting the `projectName` property on a transformer instance. This will cause the specified value to be used as the `projectName` attribute of the exported entity.

Resolves an issue that caused implemented shapes to not be included in the XML files.

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