import type * as TS from 'typescript';
import type { UITransformer } from './UITransformer';
import type { UIWidget } from './UICoreTypes';
import type { UIPlugin } from './UIPlugin';

/**
 * A plugin used for navigation-like widgets that require setting a `VALUES` property
 * based on the value of a `MASHUPNAME` property.
 */
export class UINavigationPlugin implements UIPlugin {

    /**
     * The property containing the mashup name.
     */
    sourcePropertyName: string;

    /**
     * The property containing the parameter definitions.
     */
    targetPropertyName: string;

    /**
     * @param sourcePropertyName    The property containing the mashup name.
     * @param targetPropertyName    The property containing the parameter definitions.
     */
    constructor(sourcePropertyName: string, targetPropertyName: string) {
        this.sourcePropertyName = sourcePropertyName;
        this.targetPropertyName = targetPropertyName;
    }

    transformerDidProcessWidget(transformer: UITransformer, className: string, element: TS.JsxElement | TS.JsxSelfClosingElement, widget: UIWidget) {
        // Get the mashup parameters and then 
        const mashupName = widget.Properties[this.sourcePropertyName];
        if (mashupName && typeof mashupName == 'string') {
            const parameters = transformer.parametersOfMashupNamed(mashupName);
            if (parameters) {
                widget.Properties[this.targetPropertyName] = parameters.map(p => {
                    return {ParameterName: p.name, Description: '', BaseType: p.baseType};
                });
            }
        }
    }
}

/**
 * A plugin used for contained mashup-like widgets that require setting a `JSON` property
 * based on the value of a `MASHUPNAME` property.
 */
export class UIMashupcontainerPlugin implements UIPlugin {

    /**
     * The property containing the mashup name.
     */
    sourcePropertyName: string;

    /**
     * The property containing the parameter definitions.
     */
    targetPropertyName: string;

    /**
     * @param sourcePropertyName    The property containing the mashup name.
     * @param targetPropertyName    The property containing the parameter definitions.
     */
    constructor(sourcePropertyName: string, targetPropertyName: string) {
        this.sourcePropertyName = sourcePropertyName;
        this.targetPropertyName = targetPropertyName;
    }

    transformerDidProcessWidget(transformer: UITransformer, className: string, element: TS.JsxElement | TS.JsxSelfClosingElement, widget: UIWidget) {
        // Get the mashup parameters and then set them as the MashupParameters property
        const mashupName = widget.Properties[this.sourcePropertyName];
        if (mashupName && typeof mashupName == 'string') {
            const parameters = transformer.parametersOfMashupNamed(mashupName);
            if (parameters) {
                widget.Properties[this.targetPropertyName] = parameters.map((p, i) => {
                    return {
                        ParameterName: p.name,
                        Description: '',
                        BaseType: p.baseType,
                        ParmDef: {
                            baseType: p.baseType,
                            description: '',
                            name: p.name,
                            ordinal: i,
                            aspects: {
                                bindingDirection: 'BOTH',
                                isMandatory: 'false',
                                dataShape: p.dataShape
                            }
                        }
                    };
                });
            }
        }
    }
}

/**
 * A plugin used for BMPresentationController mashups that require setting a string property
 * based on the value of a `MASHUPNAME` property.
 */
export class UIBMPresentationControllerPlugin implements UIPlugin {

    transformerDidProcessWidget(transformer: UITransformer, className: string, element: TS.JsxElement | TS.JsxSelfClosingElement, widget: UIWidget) {
        // Get the mashup parameters and then set them as the MashupParameters property
        const mashupName = widget.Properties.mashupName;
        if (mashupName && typeof mashupName == 'string') {
            const parameters = transformer.parametersOfMashupNamed(mashupName);
            if (parameters) {
                widget.Properties._mashupFields = JSON.stringify(parameters.reduce((a, p, i) => {
                    return (a[p.name] = {
                        baseType: p.baseType,
                        description: '',
                        name: p.name,
                        ordinal: i,
                        aspects: {
                            bindingDirection: 'BOTH',
                            isMandatory: 'false',
                            dataShape: p.dataShape
                        }
                    }, a);
                }, {}));
            }
        }
    }
}

/**
 * A plugin for the Core UI Collection View widget.
 */
export class UIBMCollectionViewPlugin implements UIPlugin {
    transformerDidProcessWidget(transformer: UITransformer, className: string, element: TS.JsxElement | TS.JsxSelfClosingElement, widget: UIWidget) {
        // Set the _EventDataShape property based on the data infotable
        const dataFields = transformer.fieldsOfWidgetProperty(widget, 'Data');
        if (dataFields) {
            widget.Properties._EventDataShape = JSON.stringify(dataFields.reduce((a, v, i) => {
                a[v.name] = {
                    name: v.name,
                    baseType: v.baseType,
                    ordinal: i,
                    aspects: {
                        dataShape: v.dataShape
                    }
                };

                return a;
            }, {}));
        }

        // Set the _CanDoubleClick property if anything is bound to CellWasDoubleClicked
        const ID = widget.Properties.Id;
        for (const event of transformer.eventBindings) {
            if (event.EventTriggerId == ID && event.EventTriggerEvent == 'CellWasDoubleClicked') {
                widget.Properties._CanDoubleClick = true;
                break;
            }
        }

        // Set the _MenuDefinition property based on the menu state formatting
        if (widget.Properties.CellSlideMenu) {
            const items = transformer.statesOfStateDefinition(widget.Properties.CellSlideMenu as string);
            if (items) {
                widget.Properties._MenuDefinition = JSON.stringify(items);
            }
        }

        // Convert GlobalProperties into a string and set the _GlobalDataShape if a global definition was set
        if (typeof widget.Properties.CellMashupGlobalPropertyBinding == 'object') {
            widget.Properties.CellMashupGlobalPropertyBinding = JSON.stringify(widget.Properties.CellMashupGlobalPropertyBinding);
            widget.Properties._GlobalDataShape = widget.Properties.CellMashupGlobalPropertyBinding;
        }

        // Convert CellMashupPropertyBinding into a string
        if (typeof widget.Properties.CellMashupPropertyBinding == 'object') {
            widget.Properties.CellMashupPropertyBinding = JSON.stringify(widget.Properties.CellMashupPropertyBinding);
        }
    }
}