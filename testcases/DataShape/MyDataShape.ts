/**
 * This is an example of a data shape. Data shapes are classes that must extend from `DataShapeBase`.
 */
@exportName('LinkedList')
class LinkedList extends DataShapeBase {
    /**
     * The `@ordinal` decorator can be used to specify ordinal values for data shape fields.
     */
    next!: INFOTABLE<LinkedList>;

    /**
     * Data shape fields are specified as properties. The `@primaryKey` decorator
     * can be used to mark fields as primary keys.
     */
    @primaryKey
    name!: STRING;
}
