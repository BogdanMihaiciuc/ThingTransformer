export interface TWInfoTable {
    dataShape: {
        fieldDefinitions: Record<string, TWFieldBase>;
    };

    rows: Record<string, unknown>[];
}


export interface TWFieldBase<T = any> {
    name: string;
    baseType: keyof typeof TWBaseTypes;
    description: string;
    aspects: TWFieldAspects<T>;
    ordinal: number;
}

export interface TWFieldAspects<T> {
    thingShape?: string;
    thingTemplate?: string;
    dataShape?: string;
    defaultValue?: T;
}

export interface TWDataShapeField<T = any> extends TWFieldBase<T> {
    aspects: TWDataShapeFieldAspects<T>;
}

export interface TWDataShapeFieldAspects<T> extends TWFieldAspects<T> {
    isPrimaryKey?: boolean;
}

export interface TWPropertyDefinition<T = any> extends TWFieldBase<T> {
    aspects: TWPropertyAspects<T>;
    category: string;
    /** @deprecated */ isLocalOnly: false;
    remoteBinding?: TWPropertyRemoteBinding;
    localBinding?: TWPropertyBinding;
}

export interface TWPropertyAspects<T> extends TWFieldAspects<T> {
    isPersistent?: boolean;
    isLogged?: boolean;
    isReadOnly?: boolean;
    isRemote?: boolean;
    dataChangeType?: TWPropertyDataChangeKind;
    dataChangeThreshold?: T;
    // NOTE: This appears to control the cache method of remote properties as such:
    // 0 (default) = read from server cache
    // -1 = fetched from remote every read
    // >0 = cached for x seconds
    cacheTime?: number;
    minimumValue?: number;
    maximumValue?: number;
    units?: string;
}

export const enum TWPropertyDataChangeKind {
    Value = 'VALUE',
    Always = 'ALWAYS',
    Never = 'NEVER',
    On = 'ON',
    Off = 'OFF'
}

export interface TWPropertyBinding {
    aspects: TWPropertyBindingAspects;
    name: string;
    sourceName: string;
    sourceThingName: string;
}

export interface TWPropertyBindingAspects {
    startType: "null";
    tagAddresss: "";
}

export interface TWPropertyRemoteBinding {
    name: string;
    sourceName: string;
    pushType: TWPropertyRemotePushKind;
    pushThreshold: any;
    foldType: TWPropertyRemoteFoldKind;
    timeout: number;
    aspects: TWPropertyRemoteBindingAspects;
}

export interface TWPropertyRemoteBindingAspects {
    // This appears in exports, but weirdly thingworx complains about it when specified
    source?: "";
    startType: TWPropertyRemoteStartKind;
    // This appears in exports, but weirdly thingworx complains about it when specified
    tagAddress?: string;
}

export const enum TWPropertyRemotePushKind {
    Value = 'VALUE',
    Always = 'ALWAYS',
    Never = 'NEVER'
}

export const enum TWPropertyRemoteStartKind {
    DefaultValue = 'useDefaultValue',
    EdgeValue = 'useEdgeValue'
}

export const enum TWPropertyRemoteFoldKind {
    None = 'NONE',
    Fold = 'FOLD'
}

export interface TWServiceDefinition {
    name: string;
    parameterDefinitions: TWServiceParameter[];
    resultType: TWFieldBase;
    aspects: TWServiceAspects;
    category: string;
    description: string;
    isAllowOverride: boolean;
    isLocalOnly: boolean;
    isOpen: boolean;
    isPrivate: boolean;
    code: string;

    remoteBinding?: TWServiceRemoteBinding;

    isOverriden?: boolean;
}

export interface TWServiceAspects {
    isAsync?: boolean;
}

export interface TWServiceParameter<T = any> extends TWFieldBase<T> {
    aspects: TWServiceParameterAspects<T>;
}

export interface TWServiceParameterAspects<T = any> extends TWFieldAspects<T> {
    isRequired?: boolean;
}

export interface TWServiceRemoteBinding {
    enableQueue: boolean;
    name: string;
    sourceName: string;
    timeout: number;
}

export interface TWEventDefinition {
    name: string;
    description: string;
    category: string;
    dataShape: string;

    remoteBinding?: TWEventRemoteBinding;
}

export interface TWEventRemoteBinding {
    name: string;
    sourceName: string;
}

export interface TWSubscriptionDefinition {
    name: string;
    description: string;
    enabled: boolean;
    eventName: string;
    source: string;
    sourceType: TWSubscriptionSourceKind;
    sourceProperty: string;
    code: string;
}

export const enum TWSubscriptionSourceKind {
    Thing = 'Thing',
    ThingTemplate = 'ThingTemplate',
    ThingShape = 'ThingShape'
}

export interface TWConfigurationTable {
    category: string;
    dataShapeName: string;
    description: string;
    isHidden: boolean;
    isMultiRow: boolean;
    name: string;
    source?: string;
}

export const TWDataThings = ['Stream', 'RemoteStream', 'DataTable', 'RemoteDataTable'];

export const TWBaseTypes = {
    NOTHING: "NOTHING",
    void: 'NOTHING',
    nothing: 'NOTHING',

    STRING: "STRING",
    string: 'STRING',

    NUMBER: "NUMBER",
    number: 'NUMBER',

    BOOLEAN: "BOOLEAN",
    boolean: 'BOOLEAN',

    DATETIME: "DATETIME",
    Date: 'DATETIME',
    datetime: 'DATETIME',

    TIMESPAN: "TIMESPAN",
    timespan: 'TIMESPAN',

    INFOTABLE: "INFOTABLE",
    infotable: 'INFOTABLE',
    InfoTableReference: 'INFOTABLE',
    InfoTable: 'INFOTABLE',

    LOCATION: "LOCATION",
    location: 'LOCATION',

    XML: "XML",
    xml: 'XML',

    Object: "JSON",
    JSON: "JSON",
    TWJSON: "JSON",
    json: 'JSON',

    QUERY: "QUERY",
    query: 'QUERY',

    IMAGE: "IMAGE",
    image: 'IMAGE',

    HYPERLINK: "HYPERLINK",
    hyperlink: 'HYPERLINK',

    IMAGELINK: "IMAGELINK",
    imagelink: 'IMAGELINK',

    PASSWORD: "PASSWORD",
    password: 'PASSWORD',

    HTML: "HTML",
    html: 'HTML',

    TEXT: "TEXT",
    text: 'TEXT',

    TAGS: "TAGS",
    tags: 'TAGS',

    SCHEDULE: "SCHEDULE",
    schedule: 'SCHEDULE',

    VARIANT: "VARIANT",
    variant: 'variant',

    GUID: "GUID",
    guid: 'GUILD',

    BLOB: "BLOB",
    blob: 'BLOB',

    INTEGER: "INTEGER",
    integer: 'INTEGER',

    LONG: "LONG",
    long: 'LONG',

    PROPERTYNAME: "PROPERTYNAME",
    SERVICENAME: "SERVICENAME",
    EVENTNAME: "EVENTNAME",
    THINGNAME: "THINGNAME",
    THINGSHAPENAME: "THINGSHAPENAME",
    THINGTEMPLATENAME: "THINGTEMPLATENAME",
    DATASHAPENAME: "DATASHAPENAME",
    MASHUPNAME: "MASHUPNAME",
    MENUNAME: "MENUNAME",
    BASETYPENAME: "BASETYPENAME",
    USERNAME: "USERNAME",
    GROUPNAME: "GROUPNAME",
    CATEGORYNAME: "CATEGORYNAME",
    STATEDEFINITIONNAME: "STATEDEFINITIONNAME",
    STYLEDEFINITIONNAME: "STYLEDEFINITIONNAME",
    MODELTAGVOCABULARYNAME: "MODELTAGVOCABULARYNAME",
    DATATAGVOCABULARYNAME: "DATATAGVOCABULARYNAME",
    NETWORKNAME: "NETWORKNAME",
    MEDIAENTITYNAME: "MEDIAENTITYNAME",
    APPLICATIONKEYNAME: "APPLICATIONKEYNAME",
    LOCALIZATIONTABLENAME: "LOCALIZATIONTABLENAME",
    ORGANIZATIONNAME: "ORGANIZATIONNAME",
    DASHBOARDNAME: "DASHBOARDNAME",
    PERSISTENCEPROVIDERPACKAGENAME: "PERSISTENCEPROVIDERPACKAGENAME",
    PERSISTENCEPROVIDERNAME: "PERSISTENCEPROVIDERNAME",
    PROJECTNAME: "PROJECTNAME",

    
    propertyName: "PROPERTYNAME",
    serviceName: "SERVICENAME",
    eventName: "EVENTNAME",
    thingName: "THINGNAME",
    thingShapeName: "THINGSHAPENAME",
    thingTemplateName: "THINGTEMPLATENAME",
    dataShapeName: "DATASHAPENAME",
    mashupName: "MASHUPNAME",
    menuName: "MENUNAME",
    baseTypeName: "BASETYPENAME",
    userName: "USERNAME",
    groupName: "GROUPNAME",
    categoryName: "CATEGORYNAME",
    stateDefinitionName: "STATEDEFINITIONNAME",
    styleDefinitionName: "STYLEDEFINITIONNAME",
    modelTagVocabularyName: "MODELTAGVOCABULARYNAME",
    dataTagVocabularyName: "DATATAGVOCABULARYNAME",
    networkName: "NETWORKNAME",
    mediaEntityName: "MEDIAENTITYNAME",
    applicationKeyName: "APPLICATIONKEYNAME",
    localizationTableName: "LOCALIZATIONTABLENAME",
    organizationName: "ORGANIZATIONNAME",
    dashboardName: "DASHBOARDNAME",
    presistenceProviderPackageName: "PERSISTENCEPROVIDERPACKAGENAME",
    persistenceProviderName: "PERSISTENCEPROVIDERNAME",
    projectName: "PROJECTNAME",

    VEC2: "VEC2",
    VEC3: "VEC3",
    VEC4: "VEC4",

    THINGCODE: "THINGCODE",
    thingcode: 'THINGCODE'
};

export const enum TWEntityKind {
    Thing = "Thing", 
    ThingTemplate = "ThingTemplate", 
    ThingShape = "ThingShape", 
    DataShape = "DataShape", 
    UserList = "UserList", 
    Organization = "Organization"
}

export interface TWEntityDefinition {
    name: string;
    description: string;
    documentationContent: string;
    tags: any; // TBD
    project: string;
    propertyDefinitions: TWPropertyDefinition[];
    serviceDefinitions: TWServiceDefinition[];
    eventDefinitions: TWEventDefinition[];
    subscriptionDefinitions: TWSubscriptionDefinition[];
    aspects?: TWEntityDefinitionAspects;
}

export interface TWEntityDefinitionAspects {
    isEditableExtensionObject?: boolean;
}

export interface TWThingTemplate extends TWEntityDefinition {
    valueStream: string;
    implementedShapes: string[];
    thingTemplate: string;
}

export interface TWThing extends TWThingTemplate {
    published: boolean;
    enabled: boolean;
    identifier: string;   
}

export interface TWPrincipal {
    name: string;
    type: string;
}

export interface TWPermission {
    isPermitted: boolean;
    principal: string;
    type: string;
}

export interface TWRuntimePermissionDeclaration {
    PropertyRead: TWPermission[],
    PropertyWrite: TWPermission[],
    ServiceInvoke: TWPermission[],
    EventInvoke: TWPermission[],
    EventSubscribe: TWPermission[],
}

export interface TWRuntimePermissionsList {
    // These are indexed with the resource name
    [key: string]: TWRuntimePermissionDeclaration
}

export interface TWExtractedPermissionLists {
    runtime?: TWRuntimePermissionsList,
    runtimeInstance?: TWRuntimePermissionsList
}

export interface TWMemberBase {
    name: string;
    type: string;
}

export interface TWVisibility extends TWMemberBase {
    isPermitted: boolean;
}

export interface TWPrincipalBase {
    name: string;
    description?: string;
}

export interface TWUser extends TWPrincipalBase {
    extensions: { [key: string]: any };
}

export interface TWUserGroup extends TWPrincipalBase {
    members: TWPrincipal[];
}

export interface TWConnection {
    from: string;
    to: string;
}

export interface TWOrganizationalUnit {
    description?: string;
    name: string;
    members: TWMemberBase[];
}