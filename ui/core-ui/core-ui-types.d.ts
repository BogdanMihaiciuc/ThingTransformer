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
 * Specifies an aspect that creates a binding from the specified binding source to this proeprty.
 * @param source        The binding source.
 * @returns             A widget aspect.
 */
declare function bind(source: BindingTarget<unknown>): TWRuntimePropertyAspect;

declare function twevent(targets?: ServiceBindingTarget[]): (target: MashupController, key: string, descriptor?: TypedPropertyDescriptor<TWEvent>) => void;