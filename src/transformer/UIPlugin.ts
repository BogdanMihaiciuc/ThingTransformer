import type * as TS from 'typescript';
import type { UITransformer } from './UITransformer';
import type { UIWidget } from './UICoreTypes';

/**
 * Describes a plugin that can be used to further process widget elements beyond
 * the standard processing provided by the transformer.
 */
export interface UIPlugin {

    /**
     * Invoked after the transformer processes the specified widget and provides the resulting
     * widget element. The plugin must be registered for the specified class name in order for this
     * method to be called.
     * 
     * To customize the output, plugins can change the properties of the provided widget object and
     * can also use the transformer instance to obtain information about types or entities in the project.
     * @param transformer       The transformer that processed the JSX element.
     * @param className         The class name of the widget that was processed.
     * @param element           The JSX element corresponding to the class.
     * @param widget            The widget element created as a result.
     */
    transformerDidProcessWidget?(transformer: UITransformer, className: string, element: TS.JsxElement | TS.JsxSelfClosingElement, widget: UIWidget);

    /**
     * Invoked after the transformer processes the specified widget and all of itrs descendants and provides the resulting
     * widget element. The plugin must be registered for the specified class name in order for this  method to be called.
     * 
     * To customize the output, plugins can change the properties of the provided widget object and
     * can also use the transformer instance to obtain information about types or entities in the project.
     * @param transformer       The transformer that processed the JSX element.
     * @param className         The class name of the widget that was processed.
     * @param element           The JSX element corresponding to the class.
     * @param widget            The widget element created as a result.
     */
    transformerDidProcessWidgetChildren?(transformer: UITransformer, className: string, element: TS.JsxElement | TS.JsxSelfClosingElement, widget: UIWidget);

    /**
     * Invoked after the transformer fully processes a mashup file. When this method is invoked, all mashup widgets, services and bindings
     * are available through the transformer.
     * 
     * To customize the output, plugins can change the properties of the provided widget object and
     * can also use the transformer instance to obtain information about types or entities in the project.
     * @param transformer       The transformer that processed the mashup file.
     * @param className         The class name this plugin was registered with.
     * @param widget            The widget instance that may be modified by this plugin.
     */
    transformerProcessingComplete?(transformer: UITransformer, className: string, widget: UIWidget);
}