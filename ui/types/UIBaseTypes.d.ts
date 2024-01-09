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
 */
declare class BindingSource<T> {
    [_isBindingSource]: T;
}

/**
 * Represents an object that can be triggered by a widget or service event.
 */
declare class BindingTarget<T> {
    [_isBindingTarget]: T;
}

declare class ServiceType {
    private service: true;
}

declare class InfotableBrand {
    private _isInfotable: true;
}

/**
 * Base class that all mashups must extend.
 */
declare abstract class MashupBase {
    abstract renderMashup();
}

declare class ServiceBindingTarget extends BindingTarget<ServiceType> {
}

declare type ToBindingTarget<T> = {
    [K in keyof T]: BindingTarget<T[K]>;
}

declare type ToStaticAndBindingTarget<T> = {
    [K in keyof T]: T[K] | BindingTarget<T[K]>;
}

declare type MashupControllerExtendedKeys<T> = {[K in keyof T]: K extends keyof MashupController ? never : K}[keyof T];

declare type ToMashupController<T> = {
    // Map all keys to binding targets, except for the base widget properties
    [K in MashupControllerExtendedKeys<T>]: T[K] extends Function ? ServiceBindingTarget : BindingTarget<T[K]>;
}

declare class UIBaseInputInterface {
    [key: `Dynamic:${string}`]: any;
}

declare type InvocableInput<I> = {
    [K in keyof I]: I[K] | BindingTarget<I[K]>;
} & {
    /** Triggers whenever this service returns */ ServiceInvokeCompleted?: ServiceBindingTarget[];
    /** Triggers whenever the service's selected rows change */ SelectedRowsChanged?: ServiceBindingTarget[];
    /** Triggers whenever this service's result changes */ AllDataChanged?: ServiceBindingTarget[];
}

declare class Invocable<I, O> extends ServiceBindingTarget {
    AllData: O extends INFOTABLE<infer R> ? BindingTarget<O> & ToBindingTarget<R> : BindingTarget<INFOTABLE<{result: O}>> & {result: BindingTarget<O>};
    SelectedRows: O extends INFOTABLE<infer R> ? BindingTarget<O> & ToBindingTarget<R> : BindingTarget<INFOTABLE<{result: O}>> & {result: BindingTarget<O>};

    private [_serviceRefType]: InvocableInput<I>;
}

declare type ServiceProps<I, O> = {ref: Invocable<I, O>} & InvocableInput<I>

/**
 * Defines a service that can be used by the mashup. This must specify a reference to a previously declared 
 * service and may only be defined as a direct child of the `Mashup` element.
 */
declare function Service<I, O>(props: ServiceProps<I, O>);

// TODO: Document these
type ANYSCALAR = number | string | boolean | Date;
type VOCABULARYNAME = STRING;
type FIELDNAME<A> = STRING<keyof A & string>;
type STYLETHEMENAME = string;
type TARGETNAME = string;
type STYLECSSRECTSIZE = string;
type STYLEDEFINITION = keyof StyleDefinitions | {

};
type STATEFORMATTING = {};
type STATEDEFINITION = {};
type RENDERERWITHSTATE = {};
type ARRAY<T = unknown> = T[];

// Only used for widgets with mashup parameter bindings, this should not be exposed in widget classes normally
type VALUES = {ParameterName: string, Description: string, BaseType: string, DefaultValue: undefined}[];