declare const _isThingShape: unique symbol;
declare const _isDataShape: unique symbol;
declare const _isOrganization: unique symbol;

declare class ThingShapeBase extends GenericThing {
    private [_isThingShape]: true;
}

declare class DataShapeBase {
    private [_isDataShape]: true;
}

declare class OrganizationBase {
    private [_isOrganization]: true;

    units: OrganizationUnit;
}

declare interface OrganizationUnit {

    /**
     * The organization unit's name.
     */
    name: string;

    /**
     * The members that are part of the organization unit.
     */
    members?: (UserEntity | GroupEntity)[];

    /**
     * Organization units contained by this organization.
     */
    units?: OrganizationUnit[];
}

/**
 * A utility function that can be used to specify a type checked organization unit in a `@visible` or `@visibleInstance` decorator.
 * You should not invoke this function at runtime.
 * @param org       The organization to which the unit belongs.
 * @param unit      The name of the organization unit.
 */
declare function Unit<T extends OrganizationEntity>(org: T, unit: T['__units']): OrganizationEntity;

declare interface FieldDefinitionCore {
    name: string;
    baseType: BASETYPENAME;
}

declare interface FieldDefinitionBase<T = any> extends FieldDefinitionCore {
    description: string;
    ordinal: number;
    aspects?: {
        isPrimaryKey?: boolean;
        defaultValue: T;
    }
}

declare class FieldDefinitionClass<T = any> implements FieldDefinitionBase<T> {
    name: string;
    description: string;
    baseType: BASETYPENAME;
    ordinal: number;
    aspects?: {
        isPrimaryKey?: boolean;
        defaultValue: T;
    }

    getName(): string;
    setName(name: string): void;

    getDescription(): string;
    setDescription(description: string);

    getBaseType(): BASETYPENAME;
    setBaseType(baseType: BASETYPENAME): void;

    getOrdinal(): number;
    setOrdinal(ordinal: number);

    defaultValue: T;
    hasDefaultValue(): boolean;

    isStreamEntry(): boolean;
    isDataTableEntry(): boolean;
    isContentCrawlerEntry(): boolean;

    isNullable(): boolean;

    clone(): FieldDefinition;
    toJSON(): any;
}

declare interface JSONInfoTable<T> {
    rows: T[];
    dataShape: {
        fieldDefinitions: {[key: string]: FieldDefinitionBase<T>}
    }
}

type INFOTABLE<T = any> = T & InfoTable<T>;
type InfoTableReference<T extends keyof DataShapes> = DataShapes[T]['__dataShapeType'] & InfoTable<DataShapes[T]['__dataShapeType']>;
type ValueCollectionConvertible<T> = Partial<T> | ValueCollection<T>;

declare class InfoTable<T = any> {
    private constructor();

    /**
     * The number of rows in this infotable.
     */
    length: number;

    [i: number]: ValueCollection<T>;

    [Symbol.iterator]: (...args: any[]) => Iterator<ValueCollection<T>>;

    /**
     * An array of all the  rows in the infotable as ValueCollection.
     */
    rows: ValueCollectionList<T>;

    /**
     * Reference to the datashape used for this infotable.
     */
    dataShape: DataShapeDefinition<T>;

    /**
     * Clones the infotable into a new one.
     */
    clone(): INFOTABLE<T>;

    /**
     * Returns the current length of the infotable.
     */
    getLength(): number;

    /**
     * Returns a boolean indicating whether this InfoTable has a size of zero.
     */
    isEmpty(): boolean;

    /**
     * Adds a field (column) to this InfoTable given a field definition.
     */
    AddField(field: FieldDefinitionCore & Partial<FieldDefinition>): void;

    /**
     * Returns a FieldDefinition from this InfoTables DataShapeDefinition, given the name of the
     * field as a String.
     * @param field         String containing the name of the field.
     * @return              FieldDefinition from this InfoTables DataShape or null if not found.
     */
    getField<K extends keyof T>(field: K): FieldDefinitionClass<T[K]>;

    /**
     * Verifies a field exists in this InfoTables DataShape given the field name as a String.
     * @param name      String containing the name of the field to verify.
     * @return          `true` if field exists in DataShape, `false` if field does not exist in DataShape.
     */
    hasField(name: string): boolean;

    /**
     * Returns the number of fields in this InfoTable's DataShape as an int.
     */
    getFieldCount(): number;

    /**
     * Retrieves a specific row from the infotable.
     * @param index     Index of the row to get.
     * @returns         Value collection at that row. If the requested index is not found, the method returns `null`.
     */
    getRow(index: number): ValueCollection<T> | undefined;

    /**
     * Gets the last row in the infotable.
     * @returns ValueCollection at the last row. If the infotable is empty this method returns `null`.
     */
    getLastRow(): ValueCollection<T> | undefined;

    /**
     * Gets the first row (row with index 0).
     * @returns     ValueCollection at the first row. If the infotable is empty this method returns `null`.
     */
    getFirstRow(): ValueCollection<T> | undefined;

    /**
     * Copies a row from this InfoTable, given its row number as an int, and returns it in a new InfoTable
     *
     * @param index         The row to be copied from this InfoTable as an int.
     * @return              InfoTable containing the row copied from this InfoTable.
     */
    CopyValues(index: number): INFOTABLE<T>;

    /**
     * Limits the infotable to the top N items. This happens in-place, modifying the current infotable.
     * @param maxItems          The number of items to keep.
     */
    topN(maxItems: number): void;

    /**
     * Limits the infotable to the top N items. Returns the new infotable.
     */
    topNToNewTable(maxItems: number): INFOTABLE<T>;

    /**
     * Removes a row from the InfoTable given its index.
     */
    RemoveRow(index: number): void;

    /**
     * Removes all rows from this InfoTable.
     */
    RemoveAllRows(): void;

    /**
     * Adds a row at the end to this InfoTable.
     * @param row       Information about the row to add.
     */
    AddRow(row: ValueCollectionConvertible<T>): void;

    /**
     * Finds the first row that matches the condition based on values.
     */
    Find(values: Partial<T>): ValueCollection<T> | undefined;

    /**
     * Filters the infotable in-place based on the given values.
     */
    Filter(values: Partial<T>);

    /**
     * Deletes all the rows that match the given vales.
     */
    Delete(values: Partial<T>): number;

    /**
     * Sorts the infotable in-place on a particular field.
    */
    Sort(args?: {name: string, ascending?: boolean}): void;

    /**
     * Returns the number of rows in this InfoTable as an Integer.
     */
    RowCount(): number;

    /**
     * Transforms the infotable into a JSON infotable.
     */
    ToJSON(): JSONInfoTable<T>;

    /**
     * Reference to the datashape used for this infotable.
     */
    getDataShape(): DataShapeDefinition<T>;
}

declare class ValueCollectionList<T = any> {
    private constructor();

    /**
     * The number of rows in this value collection list.
     */
    length: number;

    [i: number]: ValueCollection<T>;

    [Symbol.iterator]: (...args: any[]) => Iterator<ValueCollection<T>>;

    getLength(): number;

    /**
     * Gets the first row (row with index 0).
     * @returns     ValueCollection at the first row. If the value collection list is empty this method returns `null`
     */
    getFirstRow(): ValueCollection<T> | undefined;

    /**
     * Gets the last row in the value collection list.
     * @returns     ValueCollection at the last row. If the value collection list is empty this method returns `null`
     */
    getLastRow(): ValueCollection<T> | undefined;

    /**
     * Retrieves a specific row from the value collection list.
     * @param index         Index of the row to get.
     * @returns             Value collection at that row. If the requested index is not found, the method returns `null`
     */
    getRow(index: number): ValueCollection<T> | undefined;

    /**
     * Transforms the value collection list rows into an javascript array
     */
    toArray(): T[];
}

declare class ValueCollectionBase<T = any> {
    private constructor();

    clone(): ValueCollection<T>;

    getValue(name: keyof T): T[keyof T] | undefined;
    setValue(name: keyof T, value: T[keyof T]);
    toInfoTable(name?: string): INFOTABLE<T>;

    toJSON(): T;

    has(name: string): boolean;
}

type ValueCollection<T = any> = T & ValueCollectionBase<T>;

declare class DataShapeDefinition<T> {
    private constructor();

    /**
     * Creates and returns a copy of this data shape definition.
     * @returns         A data shape definition.
     */
    clone(): DataShapeDefinition<T>;

    /**
     * An object containing the fields defined for this data shape.
     */
    fields: {[K in keyof T]: FieldDefinitionClass<T[K]>};

    /**
     * Returns an object containing the fields defined for this data shape.
     * @returns         The data shape's fields.
     */
    getFields(): {[K in keyof T]: FieldDefinitionClass<T[K]>}; // NOTE that this technically a FieldDefinitionCollection object, but its methods don't seem to be particularly relevant.
    
    /**
     * Returns the definition of the field with the given name.
     * @param name      The field definition if it was found, `null` otherwise.
     */
    getFieldDefinition<K extends keyof T>(name: K): FieldDefinitionClass<T[K]>;

    /**
     * Verifies if the data shape has a primary key.
     * @returns     `true` if the data shape has a primary key, `false` otherwise.
     */
    hasPrimaryKey(): boolean;

    /**
     * Verifies if the data shape has a field with the given name.
     * @param name      The name of the field to verify.
     * @returns         `true` if the data shape has the fiven field, false otherwise.
     */
    hasField(name: string): boolean;

    /**
     * Returns a JSON representation of this data shape.
     * @returns         An object.
     */
    toJSON(): {
        fieldDefinitions: {[K in keyof T]: FieldDefinitionBase<T[K]>}
    }
}

// #region Base Type Declaration


type XML = Object;

declare interface QUERY<T = any> {
    sorts?: SortFilter<T, keyof T>[];
    filters: QueryFilter<T>;
}

declare interface SortFilter<T, K extends keyof T> {
    fieldName: K;
    isAscending?: boolean;
    isCaseSensitive?: boolean;
}

declare interface AndOrQueryFilter<T> {
    type: 'AND' | 'OR';
    filters: QueryFilter<T>[];
}

type SingleValueFilter<T> = keyof T extends infer K ? K extends keyof T ? {
    type: 'EQ' | 'NEQ' | 'LIKE' | 'GT' | 'LT' | 'LE' | 'GE'
    fieldName: K;
    value: T[K];
} : never : never;

type RegexFilter<T> = keyof T extends infer K ? K extends keyof T ? T[K] extends string ? {
    type: 'Matches' | 'NotMatches';
    fieldName: K;
    expression: string;
} : never : never : never;

type BetweenFilter<T> = keyof T extends infer K ? K extends keyof T ? {
    type: 'BETWEEN' | 'NOTBETWEEN' | 'Between' | 'NotBetween'
    fieldName: K;
    from: T[K];
    to: T[K];
} : never : never;

type TaggedFilter<T> = {
    type: 'TAGGED' | 'NOTTAGGED';
    fieldName: keyof {[K in keyof T]: T[K] extends TAGS ? T[K] : never};
    tags: {vocabulary: keyof ModelTags, vocabularyTerm: string}[] | string;
}

type ContainsFilter<T> = keyof T extends infer K ? K extends keyof T ?  {
    type: 'IN' | 'NOTIN';
    fieldName: K;
    values: T[K][];
} : never : never;

type MissingValueFilter<T> = {
    type: 'MissingValue' | 'NotMissingValue';
    fieldName: keyof T;
}

type LocationFilter<T> = keyof T extends infer K ? K extends keyof T ? T[K] extends LOCATION ?  {
    type: 'Near' | 'NotNear';
    fieldName: K;
    distance: number;
    units: 'M' | 'K' | 'N';
    location: T[K];
} : never : never : never;

type QueryFilter<T> = AndOrQueryFilter<T> | 
                        SingleValueFilter<T> | 
                        BetweenFilter<T> | 
                        RegexFilter<T> | 
                        TaggedFilter<T> | 
                        ContainsFilter<T> |
                        MissingValueFilter<T> |
                        LocationFilter<T>;

declare const _event: unique symbol;

type NOTHING = void;
type STRING<T extends string = string> = T;
type NUMBER<T extends number = number> = T;
type BOOLEAN = boolean;

type DATETIME = Date;
type datetime = Date;

type TIMESPAN = number;
type timespan = number;

type TWJSON<T = any> = T extends (...args: any[]) => any ? never : (T extends Object ? Struct<T> : T);
type json<T = any> = TWJSON<T>;

// This is technically a Location object, but it doesn't contain any relevant methods
type LOCATION = {latitude: number, longitude: number, altitude?: number, units?: string};
type location = LOCATION;

type IMAGE = string;
type HYPERLINK = string;
type IMAGELINK = string;
type PASSWORD = string;
type HTML = string;
type TEXT = string;
type TAGS = string;
type SCHEDULE = string;
type VARIANT = any;
type GUID = string;
type BLOB = any;
type INTEGER<T extends number = number> = T;
type LONG<T extends number = number> = T;
type PROPERTYNAME = string;
type SERVICENAME = string;
type EVENTNAME = string;
type THINGSHAPENAME = keyof ThingShapes;
type THINGTEMPLATENAME = keyof ThingTemplates;
type DATASHAPENAME = keyof DataShapes;
type MASHUPNAME = keyof Mashups;
type MENUNAME = keyof Menus;
type BASETYPENAME = string;
type USERNAME = keyof Users;
type GROUPNAME = keyof Groups;
type CATEGORYNAME = string;
type STATEDEFINITIONNAME = keyof StateDefinitions;
type STYLEDEFINITIONNAME = keyof StyleDefinitions;
type MODELTAGVOCABULARYNAME = string;
type DATATAGVOCABULARYNAME = string;
type NETWORKNAME = string;
type MEDIAENTITYNAME = keyof MediaEntities;
type APPLICATIONKEYNAME = keyof ApplicationKeys;
type LOCALIZATIONTABLENAME = keyof LocalizationTables;
type ORGANIZATIONNAME = keyof Organizations;
type DASHBOARDNAME = string;
type PERSISTENCEPROVIDERPACKAGENAME = string;
type PERSISTENCEPROVIDERNAME = keyof PersistenceProviders;
type PROJECTNAME = keyof Projects;
type VEC2 = string;
type VEC3 = string;
type VEC4 = string;
type THINGCODE = string;
type THINGGROUPNAME = string;
type NOTIFICATIONCONTENTNAME = string;
type NOTIFICATIONDEFINITIONNAME = string;
type EVENT<T> = T extends keyof DataShapes ? ({[_event]: true}) & ((eventData?: Partial<DataShapes[T]['__dataShapeType']>) => void) : ({[_event]: true}) & ((eventData?: Partial<T>) => void);
type THINGNAME<Template extends keyof ThingTemplates | undefined = undefined, Shape extends keyof ThingShapes | undefined = undefined> = 
    Template extends keyof ThingTemplates ? 
        (Shape extends keyof ThingShapes ? 
            // Shape & Template
            KeysOfType<Things, ThingTemplates[Template]['__thingTemplateType'] & ThingShapes[Shape]['__thingShapeType']> :
            //Extract<Things, ThingShapes[Shape] & ThingTemplates[Template]> : 
            // Template
            KeysOfType<Things, ThingTemplates[Template]['__thingTemplateType']>) : 
        (Shape extends keyof ThingShapes ? 
            // Shape
            KeysOfType<Things, ThingShapes[Shape]['__thingShapeType']> : 
            // None
            keyof Things);

/**
 * The union of all keys of the specified type from the given type.
 */
type KeysOfType<Source, Type> = { [K in keyof Source]: Source[K] extends Type ? K : never }[keyof Source];

/**
 * An object type containing all non-method properties of the specified type.
 */
type Struct<Source> = { [K in NonMethod<Source>] : Source[K] };

// #endregion

// #region Base Type Union

type ThingShapeProperty = 
NOTHING |
STRING |
NUMBER |
BOOLEAN |
DATETIME |
TIMESPAN |
INFOTABLE |
LOCATION |
XML |
Object |
QUERY |
IMAGE |
HYPERLINK |
IMAGELINK |
PASSWORD |
HTML |
TEXT |
TAGS |
SCHEDULE |
VARIANT |
GUID |
BLOB |
INTEGER |
LONG |
PROPERTYNAME |
SERVICENAME |
EVENTNAME |
THINGNAME |
THINGSHAPENAME |
THINGTEMPLATENAME |
DATASHAPENAME |
MASHUPNAME |
MENUNAME |
BASETYPENAME |
USERNAME |
GROUPNAME |
CATEGORYNAME |
STATEDEFINITIONNAME |
STYLEDEFINITIONNAME |
MODELTAGVOCABULARYNAME |
DATATAGVOCABULARYNAME |
NETWORKNAME |
MEDIAENTITYNAME |
APPLICATIONKEYNAME |
LOCALIZATIONTABLENAME |
ORGANIZATIONNAME |
DASHBOARDNAME |
PERSISTENCEPROVIDERPACKAGENAME |
PERSISTENCEPROVIDERNAME |
PROJECTNAME |
VEC2 |
VEC3 |
VEC4 |
THINGCODE |
THINGGROUPNAME;

// #endregion

declare type UserExtensionLiteral = Partial<Omit<UserExtensions, keyof ThingShapeBase>>;

declare type GroupLiteral = (UserEntity | GroupEntity)[];

/**
 * A base class that can be extended to specify a list of users.
 */
declare class UserList {
    [key: string]: UserExtensionLiteral | GroupLiteral;
}

declare function ThingTemplate<T extends new(...args: {}[]) => GenericThing>(object: T): void;

interface Constructor<T = {}> {
    new (...args: any[]): T;    
}

type Statics<T> = {
    [P in keyof T]: T[P];
}

declare function DataThing<D extends DataShapeBase>(type: Constructor<Stream<DataShapeBase>>, shape: Constructor<D>): Constructor<Stream<D>>;
declare function DataThing<D extends DataShapeBase>(type: Constructor<RemoteStream<DataShapeBase>>, shape: Constructor<D>): Constructor<RemoteStream<D>>;
declare function DataThing<D extends DataShapeBase>(type: Constructor<DataTable<DataShapeBase>>, shape: Constructor<D>): Constructor<DataTable<D>>;
declare function DataThing<D extends DataShapeBase>(type: Constructor<RemoteDataTable<DataShapeBase>>, shape: Constructor<D>): Constructor<RemoteDataTable<D>>;

/**
 * Allows referencing thing templates with non-standard names in extends clauses.
 * @param name  The name of the ThingTemplate
 */
declare function ThingTemplateReference<K extends keyof ThingTemplates>(name: K): new (...args: any[]) => ThingTemplates[K]["__thingTemplateType"];

// #region TS mixin

declare function ThingTemplateWithShapes<
    T1 extends Constructor<GenericThing>, 
    T2 extends Constructor<ThingShapeBase>,
    T3 extends Constructor<ThingShapeBase> | {} = {},
    T4 extends Constructor<ThingShapeBase> | {} = {},
    T5 extends Constructor<ThingShapeBase> | {} = {},
    T6 extends Constructor<ThingShapeBase> | {} = {},
    T7 extends Constructor<ThingShapeBase> | {} = {},
    T8 extends Constructor<ThingShapeBase> | {} = {},
    T9 extends Constructor<ThingShapeBase> | {} = {},
    T10 extends Constructor<ThingShapeBase> | {} = {},
    T11 extends Constructor<ThingShapeBase> | {} = {},
    T12 extends Constructor<ThingShapeBase> | {} = {},
    T13 extends Constructor<ThingShapeBase> | {} = {},
    > (
        mix1: T1,
        mix2: T2,
        mix3?: T3,
        mix4?: T4,
        mix5?: T5,
        mix6?: T6,
        mix7?: T7,
        mix8?: T8,
        mix9?: T9,
        mix10?: T10,
        mix11?: T11,
        mix12?: T12,
        mix13?: T13,
    ): 
    (T1 extends Constructor<GenericThing> ? Statics<T1> : {}) & 
    (T2 extends Constructor<ThingShapeBase> ? Statics<T2> : {}) &
    (T3 extends Constructor<ThingShapeBase> ? Statics<T3> : {}) &
    (T4 extends Constructor<ThingShapeBase> ? Statics<T4> : {}) &
    (T5 extends Constructor<ThingShapeBase> ? Statics<T5> : {}) &
    (T6 extends Constructor<ThingShapeBase> ? Statics<T6> : {}) &
    (T7 extends Constructor<ThingShapeBase> ? Statics<T7> : {}) &
    (T8 extends Constructor<ThingShapeBase> ? Statics<T8> : {}) &
    (T9 extends Constructor<ThingShapeBase> ? Statics<T9> : {}) &
    (T10 extends Constructor<ThingShapeBase> ? Statics<T10> : {}) &
    (T11 extends Constructor<ThingShapeBase> ? Statics<T11> : {}) &
    (T12 extends Constructor<ThingShapeBase> ? Statics<T12> : {}) &
    (T13 extends Constructor<ThingShapeBase> ? Statics<T13> : {}) &
    (new (...args: T1 extends Constructor<GenericThing> ? ConstructorParameters<T1> : never[]) => (
        (T1 extends Constructor<GenericThing> ? InstanceType<T1> : T1) &
        (T2 extends Constructor<ThingShapeBase> ? InstanceType<T2> : T2) &
        (T3 extends Constructor<ThingShapeBase> ? InstanceType<T3> : T3) &
        (T4 extends Constructor<ThingShapeBase> ? InstanceType<T4> : T4) &
        (T5 extends Constructor<ThingShapeBase> ? InstanceType<T5> : T5) &
        (T6 extends Constructor<ThingShapeBase> ? InstanceType<T6> : T6) &
        (T7 extends Constructor<ThingShapeBase> ? InstanceType<T7> : T7) &
        (T8 extends Constructor<ThingShapeBase> ? InstanceType<T8> : T8) &
        (T9 extends Constructor<ThingShapeBase> ? InstanceType<T9> : T9) &
        (T10 extends Constructor<ThingShapeBase> ? InstanceType<T10> : T10) &
        (T11 extends Constructor<ThingShapeBase> ? InstanceType<T11> : T11) &
        (T12 extends Constructor<ThingShapeBase> ? InstanceType<T12> : T12) &
        (T13 extends Constructor<ThingShapeBase> ? InstanceType<T13> : T13)
    ));

type ThingTemplateInstance<T extends keyof ThingTemplates> = ThingTemplates[T]["__thingTemplateType"];
type ThingShapeInstance<T extends keyof ThingShapes> = ThingShapes[T]["__thingShapeType"];
type DataShapeInstance<T extends keyof DataShapes> = DataShapes[T]["__dataShapeType"];

/**
 * A variant of the `ThingTemplateWithShapes` mixin that uses key names, making it possible to use templates
 * and shapes whose names aren't valid typescript identifiers.
 */
declare function ThingTemplateWithShapesReference<
    T1 extends keyof ThingTemplates, 
    T2 extends keyof ThingShapes,
    T3 extends keyof ThingShapes | {} = {},
    T4 extends keyof ThingShapes | {} = {},
    T5 extends keyof ThingShapes | {} = {},
    T6 extends keyof ThingShapes | {} = {},
    T7 extends keyof ThingShapes | {} = {},
    T8 extends keyof ThingShapes | {} = {},
    T9 extends keyof ThingShapes | {} = {},
    T10 extends keyof ThingShapes | {} = {},
    T11 extends keyof ThingShapes | {} = {},
    T12 extends keyof ThingShapes | {} = {},
    T13 extends keyof ThingShapes | {} = {},
    > (
        mix1: T1,
        mix2: T2,
        mix3?: T3,
        mix4?: T4,
        mix5?: T5,
        mix6?: T6,
        mix7?: T7,
        mix8?: T8,
        mix9?: T9,
        mix10?: T10,
        mix11?: T11,
        mix12?: T12,
        mix13?: T13,
    ): 
    (new (...args: any[]) =>
        (ThingTemplateInstance<T1>) &
        (ThingShapeInstance<T2>) &
        (T3 extends keyof ThingShapes ? ThingShapeInstance<T3> : T3) &
        (T4 extends keyof ThingShapes ? ThingShapeInstance<T4> : T4) &
        (T5 extends keyof ThingShapes ? ThingShapeInstance<T5> : T5) &
        (T6 extends keyof ThingShapes ? ThingShapeInstance<T6> : T6) &
        (T7 extends keyof ThingShapes ? ThingShapeInstance<T7> : T7) &
        (T8 extends keyof ThingShapes ? ThingShapeInstance<T8> : T8) &
        (T9 extends keyof ThingShapes ? ThingShapeInstance<T9> : T9) &
        (T10 extends keyof ThingShapes ? ThingShapeInstance<T10> : T10) &
        (T11 extends keyof ThingShapes ? ThingShapeInstance<T11> : T11) &
        (T12 extends keyof ThingShapes ? ThingShapeInstance<T12> : T12) &
        (T13 extends keyof ThingShapes ? ThingShapeInstance<T13> : T13)
    );

/**
 * DataShape base class that enables inheritance.
 */
declare function DataShapeBase<
    T1 extends Constructor<DataShapeBase>, 
    T2 extends Constructor<DataShapeBase> | {} = {},
    T3 extends Constructor<DataShapeBase> | {} = {},
    T4 extends Constructor<DataShapeBase> | {} = {},
    T5 extends Constructor<DataShapeBase> | {} = {},
    T6 extends Constructor<DataShapeBase> | {} = {},
    T7 extends Constructor<DataShapeBase> | {} = {},
    T8 extends Constructor<DataShapeBase> | {} = {},
    T9 extends Constructor<DataShapeBase> | {} = {},
    T10 extends Constructor<DataShapeBase> | {} = {},
    T11 extends Constructor<DataShapeBase> | {} = {},
    T12 extends Constructor<DataShapeBase> | {} = {},
    T13 extends Constructor<DataShapeBase> | {} = {},
    > (
        mix1: T1,
        mix2: T2,
        mix3?: T3,
        mix4?: T4,
        mix5?: T5,
        mix6?: T6,
        mix7?: T7,
        mix8?: T8,
        mix9?: T9,
        mix10?: T10,
        mix11?: T11,
        mix12?: T12,
        mix13?: T13,
    ): 
    (T1 extends Constructor<DataShapeBase> ? Statics<T1> : {}) & 
    (T2 extends Constructor<DataShapeBase> ? Statics<T2> : {}) &
    (T3 extends Constructor<DataShapeBase> ? Statics<T3> : {}) &
    (T4 extends Constructor<DataShapeBase> ? Statics<T4> : {}) &
    (T5 extends Constructor<DataShapeBase> ? Statics<T5> : {}) &
    (T6 extends Constructor<DataShapeBase> ? Statics<T6> : {}) &
    (T7 extends Constructor<DataShapeBase> ? Statics<T7> : {}) &
    (T8 extends Constructor<DataShapeBase> ? Statics<T8> : {}) &
    (T9 extends Constructor<DataShapeBase> ? Statics<T9> : {}) &
    (T10 extends Constructor<DataShapeBase> ? Statics<T10> : {}) &
    (T11 extends Constructor<DataShapeBase> ? Statics<T11> : {}) &
    (T12 extends Constructor<DataShapeBase> ? Statics<T12> : {}) &
    (T13 extends Constructor<DataShapeBase> ? Statics<T13> : {}) &
    (new (...args: T1 extends Constructor<DataShapeBase> ? ConstructorParameters<T1> : never[]) => (
        (T1 extends Constructor<DataShapeBase> ? InstanceType<T1> : T1) &
        (T2 extends Constructor<DataShapeBase> ? InstanceType<T2> : T2) &
        (T3 extends Constructor<DataShapeBase> ? InstanceType<T3> : T3) &
        (T4 extends Constructor<DataShapeBase> ? InstanceType<T4> : T4) &
        (T5 extends Constructor<DataShapeBase> ? InstanceType<T5> : T5) &
        (T6 extends Constructor<DataShapeBase> ? InstanceType<T6> : T6) &
        (T7 extends Constructor<DataShapeBase> ? InstanceType<T7> : T7) &
        (T8 extends Constructor<DataShapeBase> ? InstanceType<T8> : T8) &
        (T9 extends Constructor<DataShapeBase> ? InstanceType<T9> : T9) &
        (T10 extends Constructor<DataShapeBase> ? InstanceType<T10> : T10) &
        (T11 extends Constructor<DataShapeBase> ? InstanceType<T11> : T11) &
        (T12 extends Constructor<DataShapeBase> ? InstanceType<T12> : T12) &
        (T13 extends Constructor<DataShapeBase> ? InstanceType<T13> : T13)
    ));

/**
 * Variant of DataShapeBase that allows referencing dataShapes by their name instead of their identifier
 * Note that only dataShapes declared in this project can be referenced.
 */
declare function DataShapeBaseReference<
    T1 extends keyof DataShapes, 
    T2 extends keyof DataShapes | {} = {},
    T3 extends keyof DataShapes | {} = {},
    T4 extends keyof DataShapes | {} = {},
    T5 extends keyof DataShapes | {} = {},
    T6 extends keyof DataShapes | {} = {},
    T7 extends keyof DataShapes | {} = {},
    T8 extends keyof DataShapes | {} = {},
    T9 extends keyof DataShapes | {} = {},
    T10 extends keyof DataShapes | {} = {},
    T11 extends keyof DataShapes | {} = {},
    T12 extends keyof DataShapes | {} = {},
    T13 extends keyof DataShapes | {} = {},
    > (
        mix1: T1,
        mix2: T2,
        mix3?: T3,
        mix4?: T4,
        mix5?: T5,
        mix6?: T6,
        mix7?: T7,
        mix8?: T8,
        mix9?: T9,
        mix10?: T10,
        mix11?: T11,
        mix12?: T12,
        mix13?: T13,
    ): 
    (new (...args: any[]) =>
        (DataShapeInstance<T1>) &
        (T2 extends keyof DataShapes ? DataShapeInstance<T2> : T2) &
        (T3 extends keyof DataShapes ? DataShapeInstance<T3> : T3) &
        (T4 extends keyof DataShapes ? DataShapeInstance<T4> : T4) &
        (T5 extends keyof DataShapes ? DataShapeInstance<T5> : T5) &
        (T6 extends keyof DataShapes ? DataShapeInstance<T6> : T6) &
        (T7 extends keyof DataShapes ? DataShapeInstance<T7> : T7) &
        (T8 extends keyof DataShapes ? DataShapeInstance<T8> : T8) &
        (T9 extends keyof DataShapes ? DataShapeInstance<T9> : T9) &
        (T10 extends keyof DataShapes ? DataShapeInstance<T10> : T10) &
        (T11 extends keyof DataShapes ? DataShapeInstance<T11> : T11) &
        (T12 extends keyof DataShapes ? DataShapeInstance<T12> : T12) &
        (T13 extends keyof DataShapes ? DataShapeInstance<T13> : T13)
    );
// #endregion

// #region Creation assertions

type CreateThingType = (args?: {
    name?: STRING, 
    description?: STRING, 
    ownerUserName?: USERNAME, 
    thingTemplateName?: THINGTEMPLATENAME, 
    projectName?: PROJECTNAME, 
    tags?: TAGS
}) => NOTHING;

// #endregion