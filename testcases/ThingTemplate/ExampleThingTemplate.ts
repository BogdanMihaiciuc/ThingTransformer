/**
 * The `@ConfigurationTables` decorator can be applied to thing templates or thing to cause a configuration
 * table to be created for it.
 *
 * This decorator takes a single parameter that must be an anonymous class expression whose property names represent the configuration
 * table names and their types must be either `Table` or `MultiRowTable` with a data shape name as a type argument.
 *
 * Entity classes can be decorated with the `@allow` and `@deny` decorators to specify permissions. When at the class level, these
 * can be used to specify permissions for all of the properties, services and events on that entity.
 *
 * Visibility for organizations can be added via the `@visible` decorator.
 *
 * For templates and thing shapes, instance permissions can be specified via the `@allowInstance` and `@denyInstance` decorators.
 * These have the same
 */
@exportName('ExampleThingTemplate')
@ThingTemplateDefinition
@visibleInstance(Unit(Organizations.MyOrganization, 'MyUnit2'))
@denyInstance(Permission.PropertyRead, Groups.Designers, Users.System)
@deny('GetImplementingThings', Permission.ServiceInvoke, Groups.Designers)
@allow(Permission.PropertyRead, Users.Administrator)
@visible(Organizations.Development, Unit(Organizations.MyOrganization, 'MyUnit'))
@ConfigurationTables(
    class {
        Fields: MultiRowTable<FieldDefinition>;
        ConnectionInfo: Table<PortInfo>;
    },
)
@config({ Fields: [], ConnectionInfo: { server: 'localhost', port: 80, useSSL: false } })
class ExampleThingTemplate extends GenericThing {
    /**
     * In thing templates and thing shapes, `@deny` and `@allow` decorators specified on memebers
     * automatically apply to instances because the template or shape entity itself does not gain
     * the properties defined on it.
     */
    @persistent
    @dataChangeType('VALUE', 0)
    @allow(Permission.PropertyRead, Groups.Designers, Users.System)
    exampleProperty!: NUMBER;
    @allow(Permission.ServiceInvoke, Users.System)
    GetExampleProperty(): NUMBER {
        return this.exampleProperty;
    }
}
