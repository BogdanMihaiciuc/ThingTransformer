/**
 * Contains declarations for widgets that need non-standard typings.
 */

/***************************************************** MASHUP *****************************************************/

/** */
// Maps a mashup parameter declaration to mashup constructor parameters
declare type MashupConstructorParameters<T> = T extends undefined ? {} : ToBindingTarget<Partial<T>> & MashupConstructorSubProperties<T>;

// Maps infotables to objects whose properties are prefixed with the infotable property name as a namespace
declare type MashupPrefixedFieldsOf<T> = {
    [K in keyof T & string]: T[K] extends INFOTABLE<infer A> ? {[K2 in keyof A & string as `${K}:${K2}`]?: BindingTarget<A[K2]>} : never
};

// Converts an object to a union of its values
declare type MashupInfotableTypes<T> = T[keyof T];

// Converts a union to an intersection by converting the union to a function argument
declare type MashupUnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

declare type MashupConstructorSubProperties<T> = T extends undefined ? {} : MashupUnionToIntersection<MashupInfotableTypes<MashupPrefixedFieldsOf<T>>>;

// Maps a mashup parameter declaration to a mashup interface object
declare type MashupInterfaceParameters<T> = T extends undefined ? {} : {
    [K in keyof T]:
        // All types are mapped to binding targets, except for infotable which need
        // to differentiate between all data and selected rows
        T[K] extends INFOTABLE<infer A> ? {
                AllData: ToBindingTarget<A> & BindingTarget<T[K]>;
                SelectedRows: ToBindingTarget<A> & BindingTarget<T[K]>;
        } : BindingTarget<T[K]>
}

declare type UIInputInterfaceMashup<T = undefined> = UIBaseInputInterface & MashupConstructorParameters<T> & {
    
    /** The style theme applied to this mashup */
    "StyleTheme"?: STYLETHEMENAME | BindingTarget<STYLETHEMENAME>;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** width of widget */
    "Width"?: NUMBER;


    /** height of widget */
    "Height"?: NUMBER;


    /** The configuration form mashup for this mashup */
    "ConfigurationMashup"?: MASHUPNAME;


    /** The master for this mashup */
    "Master"?: TARGETNAME;


    /** When enabled, the Master's Theme will override the Mashup's Theme at Runtime */
    "UseMasterTheme"?: BOOLEAN;


    /** Minimum width for the mashup */
    "MinWidth"?: NUMBER;


    /** Minimum height for the mashup */
    "MinHeight"?: NUMBER;


    /** if you check this, "View Mashup" will not ask you to Ignore or Fix */
    "IgnoreWarningsInViewMashup"?: BOOLEAN;


    /** Is the layout repsonsive? */
    "ResponsiveLayout"?: BOOLEAN;


    /** Only IE10, Chrome, Firefox and Safari support gradient backgrounds in conjunction with background images. IE9 and older can only support a single background color if a background image is used. */
    "Style"?: STYLEDEFINITION | BindingTarget<STYLEDEFINITION>;


    /** If you specify a value, and this mashup is a master this text will be the title of the browser */
    "Title"?: STRING;


    /** Show or hide the title bar at the top of the gadget */
    "TitleBar"?: BOOLEAN;


    /** The text to display on the gadgets title bar */
    "TitleBarText"?: STRING | BindingTarget<STRING>;


    /** Mashup to use to edit gadget parameters */
    "MashupToEditGadget"?: MASHUPNAME | BindingTarget<MASHUPNAME>;


    /** Allow editing of gadget mashup parameters */
    "EnableParameterEditing"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** For gadgets, how many columns should this gadget occupy? */
    "Columns"?: NUMBER;


    /** For gadgets, how many rows should this gadget occupy? */
    "Rows"?: NUMBER;


    /** Style for Title Bar. */
    "TitleBarStyle"?: STYLEDEFINITION | BindingTarget<STYLEDEFINITION>;


    /** Style for Add to Dashboard Button */
    "AddToDashboardButtonStyle"?: STYLEDEFINITION | BindingTarget<STYLEDEFINITION>;


    /** Style for Configure Gadget Button */
    "ConfigureGadgetButtonStyle"?: STYLEDEFINITION | BindingTarget<STYLEDEFINITION>;


    /** The URL or the Image or the Media for Add to Dashboard Button */
    "AddToDashboardButton"?: IMAGELINK;


    /** The URL or the Image or the Media for Configure Gadget Button */
    "ConfigureGadgetButton"?: IMAGELINK;


    /** Enter a URL for the image or select a media entity */
    "BGImage"?: IMAGELINK | BindingTarget<IMAGELINK>;


    /** By default, if your Mashup style definition uses an image, it will not be repeated (tiled). */
    "BGImageRepeat"?: STRING<"no-repeat" | "repeat" | "repeat-x" | "repeat-y">;


    /** Default will auto set to the actual width and height of the image. Cover will scale to be as large as possible. Contain will scale to the largest size such that both width and height can fit. */
    "BGImageSize"?: STRING<"auto" | "cover" | "contain">;


    /**  */
    "IsPrintLayout"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "UseTheme"?: BOOLEAN;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


    /** Show a spinner icon when data is being loaded */
    "ShowDataLoading"?: BOOLEAN;


    /** When enabled makes the widget visible in the mashup */
    "Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The z-index of the widget which allows you to put the widget on top or on the bottom of the view stack */
    "Z-index"?: NUMBER;


    /**  */
    "Margin"?: STYLECSSRECTSIZE;


    /** Event that is triggered after the mashup has finished loading */
    "Loaded"?: ServiceBindingTarget[];


    /** Event that is triggered when the mashup is being refreshed */
    "RefreshRequested"?: ServiceBindingTarget[];

    /** Path to the stylesheet to use for this mashup. */
    CustomCSS?: string;

    ref?: UIOutputInterfaceMashup<T>
}

declare type UIOutputInterfaceMashup<T> = MashupInterfaceParameters<T> & {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Binding that can trigger the mashup to close if it is being displayed within a popup */
    CloseIfPopup: ServiceBindingTarget;


    /** To be used externally so you only have one auto-refresh on a page.  Does not refresh the browser, just triggers RefreshRequested which you then bind to the services you would like to trigger */
    Refresh: ServiceBindingTarget;


    /** Resets all the contained widgets to their default values */
    ResetInputsToDefaultValue: ServiceBindingTarget
}

declare function Mashup<T>(props: UIInputInterfaceMashup<T>): UIOutputInterfaceMashup<T>;


/***************************************************** NAVIGATION *****************************************************/

declare type MashupParametersInputType<A> = A extends MASHUPNAME ? ToStaticAndBindingTarget<Partial<Mashups[A]['__mashupParametersType']>> : {};
declare type MashupParametersOutputType<A> = A extends MASHUPNAME ? ToBindingTarget<Partial<Mashups[A]['__mashupParametersType']>> : {};
            
declare type UIInputInterfaceNavigation<A extends MASHUPNAME> = UIBaseInputInterface & MashupParametersInputType<A> & {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The label text shown in the widget  */
    "Text"?: STRING | BindingTarget<STRING>;


    /** Enable a single click to perform click event on a tablet (without displaying button's tooltip) */
    "SingleClickSelectOnTablets"?: BOOLEAN;


    /** Parameters for the selected mashups */
    "MashupParameters"?: VALUES;


    /** Type the name of the mashup to redirect to or select it from the list */
    "MashupName"?: STRING<A> | BindingTarget<STRING<A>>;


    /** Select the target window type. You can open the mashup in the current window, a new window, a pop-up window, or in full-screen mode */
    "TargetWindow"?: STRING<"new" | "replace" | "popup" | "modal-popup" | "fullscreen">;


    /** If checked, the mashup will perform a reload operation of the browser window after a "replace" navigation event */
    "ReloadOnReplace"?: BOOLEAN;


    /** If unchecked, the close button in the top right will not show leaving you the option to designate your own close button in the mashup */
    "ShowCloseButton"?: BOOLEAN;


    /** If checked, clicking outside the popup will close the modal dialog */
    "ClickOutsideToClose"?: BOOLEAN;


    /**  */
    "ModalPopupOpacity"?: NUMBER;


    /** Enter a title for the pop-up navigation window */
    "PopupTitle"?: STRING | BindingTarget<STRING>;


    /** Set a fixed width for the pop-up navigation window */
    "FixedPopupWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** Set a fixed height for the pop-up navigation window */
    "FixedPopupHeight"?: NUMBER | BindingTarget<NUMBER>;


    /** Disable the scroll bars in the pop-up navigation window and allow content to overflow */
    "PopupScrolling"?: STRING<"auto" | "hidden">;


    /** If checked will display a message to the user when the user navigates, but no mashup has been selected.  You can customize the message immediately below in the MessageToShow property. */
    "ShowMessageIfNoMashup"?: BOOLEAN;


    /** Enter a message to display when the selected mashup is not available in the target window */
    "MessageToShow"?: STRING | BindingTarget<STRING>;


    /** The width of the navigation widget */
    "Width"?: NUMBER;


    /** The height of the navigation widget */
    "Height"?: NUMBER;


    /** Tab sequence index */
    "TabSequence"?: NUMBER;


    /** Whether the widget should be transparent */
    "Transparent"?: BOOLEAN;


    /** Do you want the corners rounded */
    "RoundedCorners"?: BOOLEAN;


    /** The alignment of the label text in the navigation widget */
    "Alignment"?: STRING<"left" | "right" | "center">;


    /** The style of the widget */
    "Style"?: STYLEDEFINITION;


    /** The hover style of the widget */
    "NavigationHoverStyle"?: STYLEDEFINITION;


    /** The style when the widget has focus */
    "NavigationFocusStyle"?: STYLEDEFINITION;


    /** The style when the navigation widget is clicked */
    "NavigationActiveStyle"?: STYLEDEFINITION;


    /** The style for the popup window this navigation widget navigates to */
    "PopupTitleStyle"?: STYLEDEFINITION;


    /** Either align the icon to the left or the right of the text */
    "IconAlignment"?: STRING<"left" | "right">;


    /** Enables you to set an icon image in the navigation widget */
    "Icon"?: IMAGELINK | BindingTarget<IMAGELINK>;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /** Optional tooltip to be displayed on hover over this widget. */
    "ToolTipField"?: STRING | BindingTarget<STRING>;


    /** The style of the tooltip when it is enabled. */
    "ToolTipStyle"?: STYLEDEFINITION;


    /** Show a spinner icon when data is being loaded */
    "ShowDataLoading"?: BOOLEAN;


    /** When enabled makes the widget visible in the mashup */
    "Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Position of the widget in pixels from the top of the mashup */
    "Top"?: NUMBER;


    /** Position of the widget in pixels from the left of the mashup */
    "Left"?: NUMBER;


    /**  */
    "MinWidth"?: NUMBER;


    /** The z-index of the widget which allows you to put the widget on top or on the bottom of the view stack */
    "Z-index"?: NUMBER;


    /**  */
    "Margin"?: STYLECSSRECTSIZE;


    /** A bindable event triggered when the popup created by this widget is closed */
    "PopupClosed"?: ServiceBindingTarget[];

    ref?: UIOutputInterfaceNavigation<A>;
};

declare type UIOutputInterfaceNavigation<A extends MASHUPNAME> = MashupParametersOutputType<A> & {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Navigate the user to the designated mashup defined for this widget */
    Navigate: ServiceBindingTarget
};

declare function Navigation<A extends MASHUPNAME>(props: UIInputInterfaceNavigation<A>): UIOutputInterfaceNavigation<A>;

/***************************************************** NAVIGATION FUNCTION *****************************************************/

declare type UIInputInterfaceNavigationfunction<A extends MASHUPNAME> = UIBaseInputInterface & MashupParametersInputType<A> & {
    
    /** tw.navigationfunction-ide.properties.text.description */
    "Text"?: STRING | BindingTarget<STRING>;


    /** tw.navigationfunction-ide.properties.mashup-parameters.description */
    "MashupParameters"?: VALUES;


    /** tw.navigationfunction-ide.properties.mashup-name.description */
    "TargetMashup"?: STRING<A> | BindingTarget<STRING<A>>;


    /** tw.navigationfunction-ide.properties.target-window.description */
    "TargetWindowType"?: STRING<"new" | "replace" | "popup" | "modal-popup" | "fullscreen"> | BindingTarget<STRING<"new" | "replace" | "popup" | "modal-popup" | "fullscreen">>;


    /** tw.navigationfunction-ide.properties.message-to-show.description */
    "MissingMashupMessage"?: STRING | BindingTarget<STRING>;


    /** tw.navigationfunction-ide.properties.reload-on-replace.description */
    "ReloadOnReplace"?: BOOLEAN;


    /** tw.navigationfunction-ide.properties.show-close-button.description */
    "CloseButton"?: BOOLEAN;


    /** tw.navigationfunction-ide.properties.click-outside-to-close.description */
    "ClickOutsideToClose"?: BOOLEAN;


    /** When enabled, the popup height will be increased by 21px */
    "LegacyHeightAdjustmentEnabled"?: BOOLEAN;


    /** When enabled, the popup height will be increased by 21px */
    "IncludeLegacyHeightAdjustment"?: BOOLEAN;


    /** tw.navigationfunction-ide.properties.popup-title.description */
    "PopupTitle"?: STRING | BindingTarget<STRING>;


    /** tw.navigationfunction-ide.properties.popup-width.description */
    "PopupWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** tw.navigationfunction-ide.properties.popup-height.description */
    "PopupHeight"?: NUMBER | BindingTarget<NUMBER>;


    /** tw.navigationfunction-ide.properties.popup-scrolling.description */
    "PopupScrollbar"?: STRING<"auto" | "hidden">;


    /** tw.navigationfunction-ide.properties.popup-title.description */
    "Result"?: STRING;


    /**  */
    "RedirectTo"?: STRING;


    /**  */
    "URL"?: STRING | BindingTarget<STRING>;


    /**  */
    "URLTargetType"?: STRING | BindingTarget<STRING>;


    /**  */
    "ShowPopupBlockedMessage"?: BOOLEAN;


    /**  */
    "PopupBlockedMessage"?: STRING | BindingTarget<STRING>;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /** Show a spinner icon when data is being loaded */
    "ShowDataLoading"?: BOOLEAN;


    /** When enabled makes the widget visible in the mashup */
    "Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Position of the widget in pixels from the top of the mashup */
    "Top"?: NUMBER;


    /** Position of the widget in pixels from the left of the mashup */
    "Left"?: NUMBER;


    /** The width of the widget */
    "Width"?: NUMBER;


    /**  */
    "MinWidth"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** The z-index of the widget which allows you to put the widget on top or on the bottom of the view stack */
    "Z-index"?: NUMBER;


    /**  */
    "Margin"?: STYLECSSRECTSIZE;


    /**  */
    "WindowClosed"?: ServiceBindingTarget[];


    /**  */
    "PopupDone"?: ServiceBindingTarget[];


    /**  */
    "PopupCanceled"?: ServiceBindingTarget[];


    /**  */
    "PopupBlocked"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceNavigationfunction<A>
};

declare type UIOutputInterfaceNavigationfunction<A extends MASHUPNAME> = {
    
    /** tw.navigationfunction-ide.properties.popup-title.description */
    Result: BindingTarget<STRING>;


    /**  */
    Navigate: ServiceBindingTarget
} & MashupParametersOutputType<A>;

declare function Navigationfunction<A extends MASHUPNAME>(props: UIInputInterfaceNavigationfunction<A>): UIOutputInterfaceNavigationfunction<A>;

/***************************************************** CONTAINED MASHUP *****************************************************/
      
declare type UIInputInterfaceMashupcontainer<A extends MASHUPNAME> = UIBaseInputInterface & MashupParametersInputType<A> & {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The name of the mashup container */
    "Name"?: STRING<A> | BindingTarget<STRING<A>>;


    /** Width of container */
    "Width"?: NUMBER;


    /** Height of container */
    "Height"?: NUMBER;


    /** Tab sequence index to start at for all widgets within this container */
    "TabSequenceGroup"?: NUMBER;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /** Show a spinner icon when data is being loaded */
    "ShowDataLoading"?: BOOLEAN;


    /** When enabled makes the widget visible in the mashup */
    "Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Position of the widget in pixels from the top of the mashup */
    "Top"?: NUMBER;


    /** Position of the widget in pixels from the left of the mashup */
    "Left"?: NUMBER;


    /**  */
    "MinWidth"?: NUMBER;


    /** The z-index of the widget which allows you to put the widget on top or on the bottom of the view stack */
    "Z-index"?: NUMBER;


    /**  */
    "Margin"?: STYLECSSRECTSIZE;


    ref?: UIOutputInterfaceMashupcontainer<A>
}

declare type UIOutputInterfaceMashupcontainer<A> =  MashupParametersOutputType<A> & {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Binding to add the gadget to a dashboard */
    AddGadgetToDashboard: ServiceBindingTarget;


    /** To be used externally so you only have one auto-refresh on a page.  Does not refresh the browser, just triggers RefreshRequested which you then bind to the services you would like to trigger */
    Refresh: ServiceBindingTarget;


    /** Resets all the contained widgets to their default values */
    ResetInputsToDefaultValue: ServiceBindingTarget
}

declare function Mashupcontainer<A extends MASHUPNAME>(props: UIInputInterfaceMashupcontainer<A>): UIOutputInterfaceMashupcontainer<A>;
