/**
 * This example file shows how to define a Thing using TypeScript.
 *
 * A Thing is identified via the `@ThingDefinition` decorator.
 * Additional aspects are also specified via decorators:
 * - `@published`:                                   Marks the thing as published via federation
 * - `@valueStream("MyValueStream")`:                Assigns a value stream
 * - `@editable`:                                    Makes this entity editable in composer
 *
 * A Thing must extend from one of the thing shape classes.
 * If thing shapes must be applied then the superclass changes into `ThingTemplateWithShapes(template, ...)`, where
 * - The first parameter represents the name of the base thing template
 * - One or more subsequent parameters are each the name of a thing shape that the thing will implement
 */
@exportName('MyThing')
@ThingDefinition
@published
class MyThing extends ThingTemplateWithShapes(RemoteThing, Tunneling) {
    /**
     * Thing properties are specified as regular class properties.
     * Note that a type annotation is required and can be one of the standard
     * Typescript types or Thingworx base types (e.g. `STRING` instead of `string`).
     *
     * Aspects such as `persistent` and `logged` are specified as decorators.
     * The `readonly` aspect is specified via the regular `readonly` keyword.
     */
    @persistent
    @logged
    @dataChangeType('VALUE', 0)
    myProperty: STRING = 'This is the default value';
    /**
     * Remotely bound properties are specified via the
     * `@remote(name, {cacheTime?, pushType?, pushThreshold?, startType?,foldType?, imeout?})` decorator. From this decorator only
     * the first parameter is required. It represents the name of the remote property.
     */
    @dataChangeType('VALUE', 0)
    @remote('test', { pushThreshold: 0, foldType: 'NONE', timeout: 0 })
    remotelyBoundProperty!: NUMBER;
    /**
     * Numeric properties can use some specific decorators such as `minimumValue`, `maximumValue` and `unit`.
     */
    @minimumValue(32)
    @maximumValue(64)
    @unit('bytes')
    @dataChangeType('VALUE', 0)
    bytes!: NUMBER;
    /**
     * For certain types, it is possible to use the standard TypeScript type
     * names such as `number`, `string`, `boolean` and `Date` and they will be
     * converted into the appropriate Thingworx type.
     */
    @persistent
    @dataChangeType('VALUE', 0)
    numberProperty!: NUMBER;
    /**
     * We can constrain strings to enum values on the compiler side. The ThingWorx type
     * (ie. `STRING` not `string`) must be used when constraining properties like this.
     */
    @dataChangeType('VALUE', 0)
    cardType: STRING = 'Clubs';
    /**
     * Properties that don't have a default value must be implicitly unwrapped.
     *
     * Local bindings are specified using the `@local(source, sourceProperty)` decorator, where:
     *  - The first parameter is the name of the source thing.
     *  - The second parameter is the name of the property to bind to.
     */
    @dataChangeType('VALUE', 0)
    @local('AuditArchiveCleanupScheduler', 'Enabled')
    readonly locallyBoundProperty!: STRING;
    /**
     * Number types can be constrained in the same way as strings. The ThingWorx type
     * (ie. `NUMBER` not `number`) must be used when constraining properties like this.
     */
    @dataChangeType('VALUE', 0)
    status: NUMBER = 2;
    /**
     * The data change type is specified via the `@dataChangeType(type)` decorator.
     *
     * Note that some base types are generics in TypeScript. THINGNAME is such as a base type; it takes two type arguments:
     *  - The first argument is the thing template name or `undefined`. If specified, this must be a string literal or the `undefined` keyword.
     *  - The second argument is the thing shape name or `undefined`. If specified, this must be a string literal or the `undefined` keyword.
     */
    @dataChangeType('ALWAYS', 0)
    streamToUse!: THINGNAME<Stream>;
    /**
     * Services can be marked with the `@deploy` decorator. These services are invoked by the build script after installation
     * when using the `deploy` task.
     */
    init(): NOTHING {
        this.cardType = 'Diamonds';
        // In addition to using const enums, any environment variables referenced will also be replaced by their values by the transformer
        logger.debug('Deployment finished on '.concat('http://localhost:8015'));
        logger.debug('The value of my custom variable is '.concat('Test'));
    }
    /**
     * Services created through this project are marked overridable as default. Use the `@final` decorator to make a service non-overridable.
     *
     * Use the `async` keyword to mark a service async. You cannot specify a return type in this case. Note that you cannot use the
     * `await` keyword in these services as the `async` modifier is erased at runtime.
     *
     * Service parameters must be specified as a destructured object like in the example below.
     */
    @final
    async asyncService(): NOTHING {
        // `this` should be used in place of `me`, unlike in thingworx
        // it will be compiled into `me`
        var x = Things[this.streamToUse];
        // Constrained strings will cause a compiler error whenever anything other than
        // an enum constant is assigned to it
        this.cardType = 'Clubs';
        // The numeric or string literal can be used directly instead of the enum member
        this.status = 2;
        this.streamToUse = 'AnomalyMonitorStateStream';
        var data = x.QueryStreamEntriesWithData();
        var y = Things.DownloadedSolutions;
        y.AnyAlertAck();
        this.customEvent({ item: 'test' });
        this.asyncService({ stringParameter: 'test' });
    }
    /**
     * Remote services are specified via `@remoteService` decorator. Just like with properties, only the first parameter
     * of this decorator is required.
     */
    @remoteService('remoteService', { enableQueue: true, timeout: 0 })
    remoteService(): NOTHING {}
    /**
     * Remote events are specified via the `@remoteEvent(name)` decorator.
     */
    @remoteEvent('remoteEvent')
    remoteEvent!: EVENT<GenericStringList>;
    /**
     * Events are just properties with the custom `EVENT` base type. The data shape to use is specified as
     * a type argument.
     */
    customEvent!: EVENT<GenericStringList>;
    /**
     * The `@localSubscription(event[, property])` decorator is used to create subscription to an entity's own events.
     */
    @localSubscription('DataChange', 'streamToUse')
    streamToUseChanged(
        alertName: STRING,
        eventData: INFOTABLE<DataChangeEvent>,
        eventName: STRING,
        eventTime: DATETIME,
        source: STRING,
        sourceProperty: STRING,
    ): void {
        var table = Resources.InfoTableFunctions.CreateInfoTableFromDataShape({ dataShapeName: 'LinkedList' });
        table.AddRow({ name: 'EntityCount' });
        var table2 = Resources.InfoTableFunctions.Clone({ t1: table });
        logger.info('Name is '.concat(table2.name));
    }
    /**
     * The `@subscription(name, event[, property])` decorator is used to create subscriptions to other entities' events.
     *
     * Note that in this case, the name of the parameters used by this method cannot be changed or it will lead to runtime errors.
     */
    @subscription('AuditDataTable', 'DataChange', 'thingTemplate')
    auditDataTableThingTemplateChanged(
        alertName: STRING,
        eventData: INFOTABLE<DataChangeEvent>,
        eventName: STRING,
        eventTime: DATETIME,
        source: STRING,
        sourceProperty: STRING,
    ): void {
        // Const enums will be fully erased in thingworx
        // This condition will be compiled as this.status == 0
        if (this.status == 0) {
            logger.debug('Thing is running');
        }
    }
}
