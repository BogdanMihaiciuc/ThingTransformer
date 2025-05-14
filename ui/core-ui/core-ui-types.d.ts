/***************************************************** CORE UI SUPPORT *****************************************************/

/**
 * Base class that Core UI mashups must extend. A project must include typescriptwebpacksupport
 * for the base class to be resolved.
 */
declare abstract class MashupController extends TWRuntimeWidget {
    abstract renderMashup();

    renderHtml(): string;

    afterRender(): void;

    beforeDestroy(): void;

    /**
     * Obtains a runtime reference to a widget.
     * @param displayName 
     */
    getWidget(displayName: STRING): TWRuntimeWidget;
}

/**
 * Specifies an aspect that creates a binding from the specified binding source to this property.
 * @param source        The binding source.
 * @returns             A widget aspect.
 */
declare function bind(source: BindingTarget<unknown>): TWRuntimePropertyAspect;

/**
 * A decorator that marks the specified controller property as an event.
 * @param targets       The services to bind the event to.
 * @returns             A widget aspect.
 */
declare function twevent(targets?: ServiceBindingTarget[]): (target: MashupController, key: string, descriptor?: TypedPropertyDescriptor<TWEvent>) => void;

/**
 * A function that can be used in a property or service binding expression function to establish
 * a binding and obtain its value.
 * This function must not be used in any other controller method.
 * @param value         The binding value to get.
 */
declare function getBindingValue<T>(value: BindingTarget<T> | T): T;

/**
 * A function that can be used in a property or service binding expression function to establish
 * a binding and obtain its value.
 * This function must not be used in any other controller method.
 * @param value         The binding value to get.
 */
declare function $v<T>(value: BindingTarget<T> | T): T;

/**
 * A function that can be used in a property or service binding expression function to
 * establish a binding and trigger a service.
 * This function must not be used in any other controller method.
 * @param services      The services to trigger.
 */
declare function triggerBindingServices(services: ServiceBindingTarget[]): void;

/**
 * A function that can be used in a property or service binding expression function to
 * establish a binding and trigger a service.
 * This function must not be used in any other controller method.
 * @param services      The services to trigger.
 */
declare function $s(services: ServiceBindingTarget[]): void;