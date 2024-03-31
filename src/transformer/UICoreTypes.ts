import { TWBaseTypes } from "./TWCoreTypes";

/**
 * Describes a property mapping between a source and target property in a binding.
 */
export interface UIMashupBindingPropertyMap {

    /**
     * The name of the source property.
     */
    SourceProperty: string;

    /**
     * Exclusively used for mashup infotable bindings. Plays the role of SourceProperty but
     * relative to the infotable property.
     */
    SubProperty?: string;

    /**
     * The base type of the source property. Used to determine if a type conversion
     * is necessary and how to perform it if it is.
     */
    SourcePropertyBaseType: string;

    /**
     * The kind of the source property. This doesn't appear to be used.
     */
    SourcePropertyType: 'property' | 'Field' | 'Property' | 'InfoTable';

    /**
     * The name of the target property.
     */
    TargetProperty: string;

    /**
     * Exclusively used for mashup infotable bindings. Plays the role or TargetProperty but
     * relative to the infotable property.
     */
    TargetSubProperty?: string;

    /**
     * The base type of the target property. Used to determine if a type conversion
     * is necessary and how to perform it if it is.
     */
    TargetPropertyBaseType: string;

    /**
     * The kind of the target property. This doesn't appear to be used, except
     * for the Entity type used for the dynamic service entity name binding.
     */
    TargetPropertyType: 'property' | 'Field' | 'Property' | 'Entity';
}

/**
 * Describes a binding between two properties.
 */
export interface UIMashupBinding {
    /**
     * A unique ID for this binding.
     */
    Id: string,

    /**
     * An array containing the property maps that describe what properties
     * are updated as part of this binding. This appears to never contain more
     * than one mapping per binding.
     */
    PropertyMaps: UIMashupBindingPropertyMap[],

    /**
     * The section where the binding source can be found.
     */
    SourceArea: 'Data' | 'UI' | 'Mashup',

    /**
     * The service output kind of the source property. An empty
     * string in all other cases.
     */
    SourceDetails: 'SelectedRows' | 'AllData' | '',

    /**
     * The ID of the service or widget containing the source property.
     */
    SourceId: string,

    /**
     * The data item ID of the entity containing the source service.
     * An empty string for source areas of type `'UI'`.
     */
    SourceSection: string,

    /**
     * Ths section where the target property can be found.
     */
    TargetArea: 'Data' | 'UI' | 'Mashup',

    /**
     * The ID of the service or widget containing the target property.
     */
    TargetId: string,

    /**
     * The data item ID of the entity containing the target service.
     * An empty string for target areas of type `'UI'`.
     */
    TargetSection: string;
}

/**
 * Describes a service that can be invoked on a data item.
 */
export interface UIMashupDataItemService {

    /**
     * Always post.
     */
    APIMethod: 'post',

    /**
     * Always services.
     */
    Characteristic: 'Services',

    /**
     * A unique identifier for this data item.
     */
    Id: string,

    /**
     * The name with which this service appears in the UI.
     */
    Name: string,

    /**
     * Static parameter values to use when invoking.
     */
    Parameters: Record<string, unknown>,

    /**
     * Typically 0. TBD.
     */
    RefreshInterval: 0,

    /**
     * The name of the service to invoke.
     */
    Target: string
}

/**
 * Describes a mashup data item that can be invoked as a service.
 */
export interface UIMashupDataItem {
    /**
     * The name with which this data item appears in the UI.
     */
    DataName: string,

    /**
     * The name of the entity containing the service.
     */
    EntityName: string,

    /**
     * Refers to the collection name (e.g. Things). Special collection types supported are
     * `UserExtensions` and `Session`. Each collection type may also have `Dynamic` appended
     * to it for dynamic targets.
     */
    EntityType: string,

    /**
     * A unique identifier for this data item to be used in bindings.
     */
    Id: string,

    /**
     * Typically 0. TBD.
     */
    RefreshInterval: number,

    /**
     * The services associated with this data entity.
     */
    Services: UIMashupDataItemService[];
}

/**
 * Describes a binding between an event and a service.
 */
export interface UIMashupEventBinding {
    /**
     * The name of the section where the service can be found.
     */
    EventHandlerArea: 'Data' | 'UI' | 'Mashup',

    /**
     * The ID of the entity containing the service.
     */
    EventHandlerId: string,

    /**
     * The name of the service to invoke.
     */
    EventHandlerService: string,

    /**
     * The name of the section where the event can be found.
     */
    EventTriggerArea: 'Data' | 'UI' | 'Mashup',

    /**
     * The name of the event that will trigger the service.
     */
    EventTriggerEvent: string,

    /**
     * The ID of the entity or service containing the event.
     */
    EventTriggerId: string,

    /**
     * The ID of the entity containing the service that provides the event for areas
     * of type `'Data'`. An empty string in all other cases.
     */
    EventTriggerSection: string,

    /**
     * A unique ID for this binding.
     */
    Id: string
}

/**
 * Describes a serialized widget instance.
 */
export interface UIWidget {
    /**
     * The properties based on which a runtime widget can be created.
     */
    Properties: Record<string, unknown>;

    /**
     * An array containing the widgets contained within this widget.
     */
    Widgets: UIWidget[];
}

/**
 * Describes the format of the mashup content JSON
 */
export interface UIMashupContent {
    
    CustomMashupCss?: string;

    Data: Record<string, UIMashupDataItem>;

    DataBindings: UIMashupBinding[];

    Events: UIMashupEventBinding[];

    /**
     * The root widget in this mashup.
     */
    UI: UIWidget;

    mashupType: 'mashup' | 'targetmashup';
}

/**
 * Describe the kind of reference a symbol refers to.
 */
export enum UIReferenceKind {

    /**
     * Indicates that the reference is to a widget.
     */
    Widget = 'Widget',

    /**
     * Indicates that the reference is to a service.
     */
    Service = 'Service',

    /**
     * Indicates that the reference is to the typescript class.
     */
    Script = 'Controller'
}

/**
 * Describes a symbol that acts as a reference to the output interface
 * of a widget, service or the script.
 */
export interface UIReferenceBase {

    /**
     * The kind of reference.
     */
    kind: UIReferenceKind;

    /**
     * The name of the variable.
     */
    ID: string;
}

/**
 * Describes a symbol that acts as a reference to the output interface of a service.
 */
export interface UIServiceReference extends UIReferenceBase {
    kind: UIReferenceKind.Service;

    /**
     * A unique ID associated with the entity to which the service belongs.
     */
    entityID: string;

    /**
     * The collection containing the service's entity.
     */
    collection: string;

    /**
     * The name of the entity.
     */
    entityName: string;

    /**
     * The name of the service.
     */
    serviceName: string;

    /**
     * Set to `true` for services that should be invoked against dynamic entities.
     */
    isDynamic?: true;

    /**
     * A dictionary containing any parameter values specified statically.
     */
    staticParameters: Record<string, unknown>;
}

/**
 * Describes a symbol that acts as a reference to the output interface of a widget.
 */
export interface UIWidgetReference extends UIReferenceBase {
    kind: UIReferenceKind.Widget;

    /**
     * The class name of the widget.
     */
    className: string;
}

export interface UIControllerReference extends UIReferenceBase {
    kind: UIReferenceKind.Script;

    /**
     * The class name of the controller.
     */
    className: string;
}

export type UIReference = UIServiceReference | UIWidgetReference | UIControllerReference;

/**
 * Describes the supported initializer functions that can be used with global constants
 * used as references.
 */
export enum UIReferenceInitializerFunction {

    /**
     * Indicates that the variable is a widget reference.
     */
    Widget = 'defineWidget',

    /**
     * Inciates that the variable is a service reference.
     */
    Service = 'defineService',

    /**
     * Inciates that the variable is a dynamic service reference.
     */
    DynamicService = 'defineDynamicService',

    /**
     * Indicates that the variable is a mashup widget reference.
     */
    Mashup = 'defineMashup',

    /**
     * Indicates that the variable is a controller reference.
     */
    Script = 'defineController'
}

/**
 * Describes a JSX attribute that is specified on a widget or service.
 */
export interface UIJSXAttribute {

    /**
     * The name of the attribute.
     */
    name: string;

    /**
     * If specified, the literal or constant value assigned to the attribute.
     */
    value?: unknown;

    /**
     * If specified, the reference to which this attribute specifies a binding.
     */
    ref?: UIReference;

    /**
     * If ref is specified, the name of the source property of the binding.
     */
    sourcePropertyName?: string;

    /**
     * If specified, a thingworx specific type to use for the source property. If not specified,
     * the default `property` will be used if needed.
     */
    sourcePropertyType?: string;

    /**
     * If ref is specified, the base type of the expression used to initialize this attribute.
     */
    sourcePropertyBaseType?: string;

    subProperty?: string;

    /**
     * If the binding source is a service, the section must also be specified.
     */
    sourceSection?: 'AllData' | 'SelectedRows';

    /**
     * For event sources, an array containing the services that will be triggered by this event.
     */
    targets?: {

        /**
         * The reference ID targetted by this event.
         */
        ID: string;

        /**
         * For widget references, the widget service to invoke.
         */
        service?: string;
    }[];
}

/**
 * Contains all supported UI base types.
 */
export const UIBaseTypes = Object.assign({}, TWBaseTypes, {
    ANYSCALAR: 'ANYSCALAR',
    STYLECSSRECTSIZE: 'STYLECSSRECTSIZE',
    TARGETNAME: 'TARGETNAME',
    STYLETHEMENAME: 'STYLETHEMENAME',
    FIELDNAME: 'FIELDNAME',
    VOCABULARYNAME: 'VOCABULARYNAME',
    STYLEDEFINITION: 'STYLEDEFINITION',
    STATEFORMATTING: 'STATEFORMATTING',
    STATEDEFINITION: 'STATEDEFINITION',
    RENDERERWITHSTATE: 'RENDERERWITHSTATE',
    ARRAY: 'ARRAY',
    JSONInfoTable: 'INFOTABLE'
});