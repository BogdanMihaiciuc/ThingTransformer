declare function defineWidget<A extends keyof Mashups>(cls: typeof Navigation): UIOutputInterfaceNavigation<A>;
declare function defineWidget<A extends keyof Mashups>(cls: typeof Navigationfunction): UIOutputInterfaceNavigationfunction<A>;
declare function defineWidget<A extends keyof Mashups>(cls: typeof Mashupcontainer): UIOutputInterfaceMashupcontainer<A>;

declare function defineWidget<T>(cls: T): T extends (...args: any[]) => infer R ? R : never;


declare function defineService<T extends Function>(service: T): T extends (arg: infer I) => infer O ? Invocable<I, O> : never;
declare function defineDynamicService<T extends Function>(service: T): T extends (arg: infer I) => infer O ? Invocable<I & {EntityName: string}, O> : never;
declare function defineMashup<T>(params: new (...args: any[]) => T): UIOutputInterfaceMashup<T>;

declare function defineController<T>(cls: T): T extends new (...args: any[]) => infer R ? ToMashupController<R> : never;

/**
 * Marks an object as a binding source when used as a property key.
 */
declare const _isBindingSource: unique symbol;

/**
 * Marks an object as a binding target when used as a property.
 */
declare const _isBindingTarget: unique symbol;

/**
 * Marks an object as a binding target when used as a property.
 */
declare const _serviceRefType: unique symbol;

/**
 * Used to obtain a handle to a dynamic entity from a Thing Template or Thing Shape.
 * @param entity        The template or shape.
 */
declare function dynamicEntity<T extends GenericThing>(entity: ThingTemplateEntity<T>): T;
declare function dynamicEntity<T extends ThingShapeBase>(entity: ThingShapeEntity<T>): T;

/**
 * Imports the specified JSON file to be used in a JSON property for a widget.
 * @param path The path to import. This is relative to the file path.
 */
declare function importJSON(path: string): any;

/**
 * Represents an object that can act as a binding source for a widget property or service input.
 * Currently unused.
 */
declare class BindingSource<T> {
    [_isBindingSource]: T;
}

/**
 * Represents an object that can participate in bindings.
 */
declare class BindingTarget<T> {
    [_isBindingTarget]: T;
}

/**
 * Only used for service binding targets.
 */
declare class ServiceType {
    private service: true;
}

/**
 * Base class that all mashups must extend.
 */
declare abstract class MashupBase {

    /**
     * Must be implemented by mashups to provide the widgets and services
     * that will be used at runtime.
     */
    abstract renderMashup();
}

/**
 * An object that represents a service reference that can be triggered by a mashup event.
 */
declare class ServiceBindingTarget extends BindingTarget<ServiceType> {
}

/**
 * An object whose properties are all binding sources or targets.
 */
declare type ToBindingTarget<T> = {
    [K in keyof T]: BindingTarget<T[K]>;
}

/**
 * An object whose properties can be initialized with both static values and bindings/
 */
declare type ToStaticAndBindingTarget<T> = {
    [K in keyof T]: T[K] | BindingTarget<T[K]>;
}

/**
 * An object that contains only the non-inherited properties of a mashup controller.
 */
declare type MashupControllerExtendedKeys<T> = {[K in keyof T]: K extends keyof MashupController ? never : K}[keyof T];

/**
 * An object that represents the binding interface of a mashup controller.
 */
declare type ToMashupController<T> = {
    // Map all keys to binding targets, except for the base widget properties
    [K in MashupControllerExtendedKeys<T>]: T[K] extends Function ? ServiceBindingTarget : BindingTarget<T[K]>;
}

/**
 * A class that all widget contructor property types should extend to provide support for dynamic properties.
 */
declare class UIBaseInputInterface {
    [key: `Dynamic:${string}`]: any;
}

/**
 * Represents an object that can be used to initialize a service in a mashup.
 */
declare type InvocableInput<I> = {
    [K in keyof I]: I[K] | BindingTarget<I[K]>;
} & {
    /** Triggers whenever this service returns */
    ServiceInvokeCompleted?: ServiceBindingTarget[];

    /** Triggers whenever the service's selected rows change */
    SelectedRowsChanged?: ServiceBindingTarget[];

    /** Triggers whenever this service's result changes */
    AllDataChanged?: ServiceBindingTarget[];
}

/**
 * Represents the result binding source of a service with the specified input and output types.
 */
declare class Invocable<I, O> extends ServiceBindingTarget {

    /**
     * When used as a binding source for an infotable, this represents the complete infotable result of the service.
     * When any of its properties are used as binding sources, they represent the properties of the oject in the first
     * row of the result infotable.
     */
    AllData: O extends INFOTABLE<infer R> ? BindingTarget<O> & ToBindingTarget<R> : BindingTarget<INFOTABLE<{result: O}>> & {result: BindingTarget<O>};

    /**
     * When used as a binding source for an infotable, this represents all the selected rows of the service.
     * When any of its properties are used as binding sources, they represent the properties of the oject in the first
     * selected row of the result infotable.
     */
    SelectedRows: O extends INFOTABLE<infer R> ? BindingTarget<O> & ToBindingTarget<R> : BindingTarget<INFOTABLE<{result: O}>> & {result: BindingTarget<O>};

    private [_serviceRefType]: InvocableInput<I>;
}

/**
 * The properties that can be used to initialize a service that takes the specified input and output types.
 */
declare type ServiceProps<I, O> = {ref: Invocable<I, O>} & InvocableInput<I>

/**
 * Defines a service that can be used by the mashup. This must specify a reference to a previously declared 
 * service and may only be defined as a direct child of the `Mashup` element.
 */
declare function Service<I, O>(props: ServiceProps<I, O>);

/**
 * Initializes a property with both a static value and a binding source.
 * @param value         The static value.
 * @param binding       A binding source.
 */
declare function bindProperty<V, T, B extends BindingTarget<T>>(value: V, binding: B): V | B;

/**
 * Can be any primitive type, such as number, string, boolean or Date.
 */
type ANYSCALAR = number | string | boolean | Date;

type VOCABULARYNAME = STRING;
type FIELDNAME<A> = STRING<keyof A & string>;
type STYLETHEMENAME = string;
type TARGETNAME = string;
type STYLECSSRECTSIZE = string;

type STYLEDEFINITION = keyof StyleDefinitions | {
    backgroundColor?: string,
    displayString?: string,
    fontEmphasisBold?: boolean,
    fontEmphasisItalic?: boolean,
    fontEmphasisUnderline?: boolean,
    foregroundColor?: string,
    image?: string,
    lineColor?: string,
    lineStyle?: string,
    lineThickness?: number,
    secondaryBackgroundColor?: string,
    textSize?: string
};

type STATEFORMATTING = {};

type STATEDEFINITION = keyof StateDefinitions | {
    stateType: 'numeric';
    stateDefinitions: {
        comparator?: "<" | "<=",
        defaultValue?: number,
        defaultStyleDefinition: STYLEDEFINITION,
        description?: string,
        displayString?: string,
        name: string
    }[];
} | {
    stateType: 'string';
    stateDefinitions: {
        defaultStyleDefinition: STYLEDEFINITION,
        defaultValue?: string,
        description?: string,
        displayString?: string,
        name: string
    }[];
};

type RENDERERWITHSTATE = {};
type ARRAY<T = unknown> = T[];

// Only used for widgets with mashup parameter bindings, this should not be exposed in widget classes normally
type VALUES = {ParameterName: string, Description: string, BaseType: string, DefaultValue: undefined}[];