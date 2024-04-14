import type {
    TWRuntimePropertyAspect as __TWRuntimePropertyAspect,
    TWEvent as __TWEvent,
    canBind as __canBind,
    didBind as __didBind,
    property as __property
} from "typescriptwebpacksupport/widgetRuntimeSupport"
import "../"
import "./core-ui-types"
import "./CoreUIWidgets"

declare global {
    const property: typeof __property;
    type TWEvent = typeof __TWEvent;
    const canBind: typeof __canBind;
    const didBind: typeof __didBind;
    type TWRuntimePropertyAspect = __TWRuntimePropertyAspect;
}
