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