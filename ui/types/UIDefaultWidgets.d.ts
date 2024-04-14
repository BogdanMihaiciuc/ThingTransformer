/**
 * Contains all of the standard widgets available in a typical Thingworx installation.
 * 
 * A small part of the widgets with special typings are declared in UIBaseWidgets.
 */


/** The properties and events that can be set or bound on the "Ptcsbreadcrumb" widget. */
declare interface UIInputInterfacePtcsbreadcrumb<A> extends UIBaseInputInterface {
    
    /** Show the link for the current page on the breadcrumb */
    "ShowCurrentLevel"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Disable the widget in the mashup */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The sequence number of the Breadcrumb widget when you press the TAB key */
    "TabSequence"?: NUMBER;


    /** Bind data from an infotable source to populate the breadcrumb entries */ 
    "Data"?: BindingTarget<INFOTABLE<A>>;


    /** Select the infotable field for the link display name */
    "DisplayField"?: FIELDNAME<A>;


    /** Select the infotable field for the link URL */
    "URLField"?: FIELDNAME<A>;


    /** Select the infotable field to specify the type of the target mashup */
    "TypeField"?: FIELDNAME<A>;


    /** Select the infotable field to specify the name of the target mashup */
    "MashupNameField"?: FIELDNAME<A>;


    /** Defines the maximum number of links in the breadcrumb. Any additional links are displayed in overflow list. This number includes the current page when ShowCurrentLevel is set to True. */
    "MaxNumberOfLinks"?: NUMBER;


    /** Truncate links with long names */
    "TruncateLinks"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Set the maximum width for each link in pixels. Links that exceed this number are truncated */
    "LinkMaxWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** Choose whether to control an embedded mashup in the current page, or to bind parameters to an embedded mashup */
    "MashupControl"?: STRING<"pagemashup" | "bound">;


    /** The width of the widget. The width is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed width size */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** Fill the container */
    "FillContainer"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** Triggers an event when the breadcrumb data is changed */
    "DataChanged"?: ServiceBindingTarget[];


    /** Triggers an event when the widget is clicked */
    "Clicked"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcsbreadcrumb<A>
}

/** The binding source properties and services that can be bound on the "Ptcsbreadcrumb" widget. */
declare class UIOutputInterfacePtcsbreadcrumb<A> {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Bind data from an infotable source to populate the breadcrumb entries */
    Data: BindingTarget<INFOTABLE<A>>;


    /** If you set MashupControl to "Bound to Mashup parameter", this can be bound to the chosen mashup */
    Mashup: BindingTarget<STRING>
}

/** Displays a list of Breadcrumbs */
declare function Ptcsbreadcrumb<A>(props: UIInputInterfacePtcsbreadcrumb<A>): UIOutputInterfacePtcsbreadcrumb<A>

            
/** The properties and events that can be set or bound on the "Ptcschartbar" widget. */
declare interface UIInputInterfacePtcschartbar<A> extends UIBaseInputInterface {
    
    /**  */
    "ShowLegendLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "HideLegendLabel"?: STRING | BindingTarget<STRING>;


    /** Controls the type of button used to show and hide the legend area at run time */
    "ShowHideLegendButtonType"?: STRING<"tertiary" | "transparent">;


    /** Controls the type of button used to reset the chart at run time */
    "ResetButtonType"?: STRING<"tertiary" | "transparent">;


    /** Shows the zoom in and zoom out buttons on the chart toolbar. */
    "ShowZoomButtons"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Disable the widget in the mashup */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Hides the notes area */
    "HideNotes"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the text label for the X-axis */
    "XAxisLabel"?: STRING | BindingTarget<STRING>;


    /** Hides the X-axis */
    "HideXAxis"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the text label for the Y-axis */
    "YAxisLabel"?: STRING | BindingTarget<STRING>;


    /** Hides the Y-axis */
    "HideYAxis"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets the number of labels on the Y-axis */
    "NumberOfYLabels"?: NUMBER;


    /** Hides the legend area */
    "HideLegend"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Shows a simplified view of the chart vizualization. Enable this property to hide labels, legends, and rulers. */
    "SparkView"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specify the Y-axis to use as the reference for the ruler lines. You can align ruler lines with the data value markers of the primary or the secondary Y-axis. */
    "YAxisRulerAlignment"?: STRING<"primary" | "secondary"> | BindingTarget<STRING<"primary" | "secondary">>;


    /** Reverses the order of values on the X-axis */
    "ReverseXAxis"?: BOOLEAN;


    /** Reverses the order of values on the Y-axis */
    "ReverseYAxis"?: BOOLEAN;


    /** Sets a maximum width for the legend area */
    "LegendMaxWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets a maximum width for the vertical axis */
    "VerticalAxisMaxWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets a maximum height for the horizontal axis */
    "HorizontalAxisMaxHeight"?: NUMBER | BindingTarget<NUMBER>;


    /** The infotable data source for the chart */ 
    "Data"?: BindingTarget<INFOTABLE<A>>;


    /** Hides the value labels on the chart */
    "HideValues"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets the padding between the groups of series. Padding is percentage of bar width. */
    "GroupPadding"?: NUMBER | BindingTarget<NUMBER>;


    /** Controls how many data points a user can select at the same time. Choose multiple to allow a user to select more than one data point. */
    "SelectionMode"?: STRING<"none" | "single" | "multiple"> | BindingTarget<STRING<"none" | "single" | "multiple">>;


    /** Specifies the text label to display for the Bar Chart */
    "Label"?: STRING | BindingTarget<STRING>;


    /** Enter a custom tooltip to display when a data point is selected. You can show a title, text, data values, and create new lines. Use the following syntax: Add #title# before a string to show a title, #newline# to create a new line, ${<token_name>} to display data from available chart tokens, and ${Data:<infotable_column>} or ${DataSourceN:<infotable_column>} to display values from an infotable column. For example: #title#Chart Tooltip Title#newline#${label}, ${total}#newline#${Data:Column3}. */
    "ValuesTooltip"?: STRING | BindingTarget<STRING>;


    /** Sets the text label type for the Bar Chart */
    "LabelType"?: STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption"> | BindingTarget<STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption">>;


    /** Sets the position of the text label */
    "LabelPosition"?: STRING<"top" | "bottom">;


    /** Aligns the text for the widget label */
    "LabelAlignment"?: STRING;


    /** Sets the chart type */
    "ChartType"?: STRING<"bar" | "column">;


    /** Sets the number of data series to display on the chart. By default, the Auto setting displays all series in the infotable data. */
    "NumberOfSeries"?: NUMBER;


    /** Configure the state formatting for all data series on the chart. You can style the series based on data values to spot trends and patterns more easily. To configure formatting rules for each data series, enter a specific value for the NumberOfSeries property. */
    "DataSeriesStyle"?: STATEFORMATTING;


    /** Controls the way multiple data series are displayed on the chart. You can stack or group the data values from each series. Select 100% stacked to show the data series as a percentage of the total value. */
    "SeriesDisplay"?: STRING<"grouped" | "auto" | "expand"> | BindingTarget<STRING<"grouped" | "auto" | "expand">>;


    /** Select the infotable field that contains the data for the X-axis */
    "XAxisField"?: FIELDNAME<A>;


    /** Enables you to visualize data from multiple sources on the chart */
    "MultipleDataSources"?: BOOLEAN;


    /** Sets the padding from axes. Padding is percentage of bar width */
    "ExternalPadding"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets the padding between the series. Padding is percentage of bar width. */
    "InternalPadding"?: NUMBER | BindingTarget<NUMBER>;


    /** Adds a show/hide button that enables users to show or hide the chart legend at run time. */
    "ShowHideLegend"?: BOOLEAN;


    /**  */
    "StringSelectAll"?: undefined;


    /**  */
    "StringClearAll"?: undefined;


    /** Aligns the legend text. The options that are available to you for this property depend on the setting of the LegendPosition property. */
    "LegendAlignment"?: STRING;


    /** Sets the position of the chart legends */
    "LegendPosition"?: STRING<"top" | "right" | "bottom" | "left">;


    /** Sets the marker shape of the data series legends */
    "LegendMarkerShapes"?: STRING<"none" | "square" | "circle">;


    /** Adds a legend filter that allows the user to filter the chart at runtime */
    "LegendFilter"?: BOOLEAN;


    /** Specifies the text to display within the notes area on the chart. You can enter a string or select a localization token. */
    "Notes"?: STRING | BindingTarget<STRING>;


    /** Sets the position of the notes area */
    "NotesPosition"?: STRING<"top" | "bottom">;


    /** Aligns the text within the notes area */
    "NotesAlignment"?: STRING;


    /** Aligns the X-axis label */
    "XAxisLabelAlignment"?: STRING;


    /** Aligns text label for the Y-axis */
    "YAxisLabelAlignment"?: STRING;


    /** Sets the format for the Y-axis values */
    "YAxisFormat"?: STRING | BindingTarget<STRING>;


    /** Sets the maximum range for the Y-axis values. By default, the range is automatically calculated based on the widget data. */
    "YAxisMaximumValues"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets the minimum range for the Y-axis values. By default, the range is automatically calculated based on the widget data. */
    "YAxisMinimumValues"?: NUMBER | BindingTarget<NUMBER>;


    /** Adds a second Y axis to the chart */
    "SecondYAxis"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the text label for the second Y axis */
    "SecondYAxisLabel"?: STRING | BindingTarget<STRING>;


    /** Aligns the label for the second Y axis */
    "SecondYAxisLabelAlignment"?: STRING;


    /** Sets the format for the second Y axis values */
    "SecondYAxisFormat"?: STRING | BindingTarget<STRING>;


    /** Sets the maximum range for the second Y axis values. By default, the range is automatically calculated based on the widget data. */
    "SecondYAxisMaxValue"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets the minimum range for the second Y axis values. By default, the range is automatically calculated based on the widget data. */
    "SecondYAxisMinValue"?: NUMBER | BindingTarget<NUMBER>;


    /**  Controls how data series are stacked for the secondary Y-axis on the chart */
    "SecondYAxisSeriesDisplay"?: STRING<"grouped" | "auto" | "expand"> | BindingTarget<STRING<"grouped" | "auto" | "expand">>;


    /** Reverses the order of values on the second Y-axis */
    "ReverseSecondYAxis"?: BOOLEAN;


    /** Shows the X-axis ruler */
    "ShowXAxisRuler"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Shows the Y-axis ruler */
    "ShowYAxisRuler"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Shows the rulers in front of the data values. By default, rulers are displayed behind the data. */
    "RulersInFront"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Shows the zero value ruler */
    "ShowZeroValueRuler"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Enter a value from -180 to 180 to set the rotation angle of labels on the horizontal axis. */
    "HorizontalAxisLabelsRotation"?: NUMBER;


    /** Sets the position of the data value labels relative to the chart bars */
    "ValuesPosition"?: STRING<"outside" | "inside">;


    /** Sets the alignment of the data value labels relative to the chart bars */
    "ValuesAlignment"?: STRING<"end" | "base">;


    /** Enables you to zoom in or out on the horizontal axis */
    "HorizontalZoom"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Adds controls that enable users to specify a value range to zoom to on the horizontal axis */
    "HorizontalRangeZoom"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the text label for start of the range selection */
    "HorizontalStartZoomLabel"?: STRING | BindingTarget<STRING>;


    /** Specifies the text label for end of the range selection */
    "HorizontalEndZoomLabel"?: STRING | BindingTarget<STRING>;


    /** Adds a slider control that enables you to display data between a minimum and a maximum value on the horizontal axis */
    "HorizontalSliderZoom"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the text label for the maximum value of the slider zoom control */
    "HorizontalSliderZoomMaxLabel"?: STRING | BindingTarget<STRING>;


    /** Specifies the text label for the minimum value of the slider zoom control */
    "HorizontalSliderZoomMinLabel"?: STRING | BindingTarget<STRING>;


    /** Enables you to zoom in by directly selecting two data items on the chart */
    "DirectSelectionZoom"?: STRING<"none" | "xaxis" | "yaxis" | "both"> | BindingTarget<STRING<"none" | "xaxis" | "yaxis" | "both">>;


    /** Enables you to zoom in to a specific part of the chart by drawing a selection box around the data range that you want to view */
    "DragSelectionZoom"?: STRING<"none" | "xaxis" | "yaxis" | "both"> | BindingTarget<STRING<"none" | "xaxis" | "yaxis" | "both">>;


    /** Adds controls that enable users to zoom in on the horizontal axis according to specific intervals */
    "HorizontalIntervalControl"?: STRING<"none" | "dropdown">;


    /** Specifies the text label for the interval zoom controls for the horizontal axis */
    "HorizontalIntervalControlLabel"?: STRING | BindingTarget<STRING>;


    /** The data for the interval zoom control options */
    "HorizontalIntervalData"?: BindingTarget<INFOTABLE>;


    /** Enables you to select the anchor position of the interval range within the data set. Select Start to place the interval at the start of the data set, or End to place the interval at the end. For example, if you specify a three-month interval in a 12-month data set, you can select Start to show the first three months, or End to show the last three months of the data set */
    "HorizontalIntervalAnchorPoint"?: STRING<"start" | "end"> | BindingTarget<STRING<"start" | "end">>;


    /** Specifies the label for the interval anchor point on the horizontal axis */
    "HorizontalIntervalAnchorPointLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringStart"?: undefined;


    /**  */
    "StringEnd"?: undefined;


    /** Adds controls for adjusting the anchor value for the horizontal axis */
    "ShowHorizontalAnchorPointControl"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Enables you to zoom in or out on the vertical axis */
    "VerticalZoom"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Adds a slider control that enables you to display data between a minimum and a maximum value on the vertical axis */
    "VerticalSliderZoom"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the text label for the maximum value of the slider zoom control */
    "VerticalSliderZoomMaxLabel"?: STRING | BindingTarget<STRING>;


    /** Specifies the text label for the minimum value of the slider zoom control */
    "VerticalSliderZoomMinLabel"?: STRING | BindingTarget<STRING>;


    /** The sequence number of the widget when you press the TAB key */
    "TabSequence"?: NUMBER;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** Specifies the label for the button that resets the charts zooming */
    "LabelReset"?: STRING | BindingTarget<STRING>;


    /**  */
    "UseSampleDataInRuntime"?: BOOLEAN;


    /** Sets the number of reference lines to display on the chart. Reference lines are used to highlight the chart data relative to a specific value. You can add up to 24 lines and configure the label, axis, and value of each line. */
    "NumberOfReferenceLines"?: NUMBER;


    /** The input field source for the data series 1 */
    "DataSource1"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 1 */
    "XAxisField1"?: string;


    /** Displays the data series 1 */
    "DataField1"?: string;


    /** The label to display in the legends area for data series  1 */
    "DataLabel1"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 1 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle1"?: STATEFORMATTING;


    /** Displays the values for data series 1 on the second Y axis */
    "UseSecondYAxis1"?: BOOLEAN;


    /** Sets the label text for reference line 1. */
    "ReferenceLine1Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 1 on the selected axis. */
    "ReferenceLine1Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The input field source for the data series 2 */
    "DataSource2"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 2 */
    "XAxisField2"?: string;


    /** Displays the data series 2 */
    "DataField2"?: string;


    /** The label to display in the legends area for data series  2 */
    "DataLabel2"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 2 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle2"?: STATEFORMATTING;


    /** Displays the values for data series 2 on the second Y axis */
    "UseSecondYAxis2"?: BOOLEAN;


    /** Sets the label text for reference line 2. */
    "ReferenceLine2Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 2 on the selected axis. */
    "ReferenceLine2Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The input field source for the data series 3 */
    "DataSource3"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 3 */
    "XAxisField3"?: string;


    /** Displays the data series 3 */
    "DataField3"?: string;


    /** The label to display in the legends area for data series  3 */
    "DataLabel3"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 3 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle3"?: STATEFORMATTING;


    /** Displays the values for data series 3 on the second Y axis */
    "UseSecondYAxis3"?: BOOLEAN;


    /** Sets the label text for reference line 3. */
    "ReferenceLine3Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 3 on the selected axis. */
    "ReferenceLine3Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The input field source for the data series 4 */
    "DataSource4"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 4 */
    "XAxisField4"?: string;


    /** Displays the data series 4 */
    "DataField4"?: string;


    /** The label to display in the legends area for data series  4 */
    "DataLabel4"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 4 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle4"?: STATEFORMATTING;


    /** Displays the values for data series 4 on the second Y axis */
    "UseSecondYAxis4"?: BOOLEAN;


    /** Sets the label text for reference line 4. */
    "ReferenceLine4Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 4 on the selected axis. */
    "ReferenceLine4Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The input field source for the data series 5 */
    "DataSource5"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 5 */
    "XAxisField5"?: string;


    /** Displays the data series 5 */
    "DataField5"?: string;


    /** The label to display in the legends area for data series  5 */
    "DataLabel5"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 5 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle5"?: STATEFORMATTING;


    /** Displays the values for data series 5 on the second Y axis */
    "UseSecondYAxis5"?: BOOLEAN;


    /** Sets the label text for reference line 5. */
    "ReferenceLine5Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 5 on the selected axis. */
    "ReferenceLine5Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The input field source for the data series 6 */
    "DataSource6"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 6 */
    "XAxisField6"?: string;


    /** Displays the data series 6 */
    "DataField6"?: string;


    /** The label to display in the legends area for data series  6 */
    "DataLabel6"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 6 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle6"?: STATEFORMATTING;


    /** Displays the values for data series 6 on the second Y axis */
    "UseSecondYAxis6"?: BOOLEAN;


    /** Sets the label text for reference line 6. */
    "ReferenceLine6Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 6 on the selected axis. */
    "ReferenceLine6Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The input field source for the data series 7 */
    "DataSource7"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 7 */
    "XAxisField7"?: string;


    /** Displays the data series 7 */
    "DataField7"?: string;


    /** The label to display in the legends area for data series  7 */
    "DataLabel7"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 7 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle7"?: STATEFORMATTING;


    /** Displays the values for data series 7 on the second Y axis */
    "UseSecondYAxis7"?: BOOLEAN;


    /** Sets the label text for reference line 7. */
    "ReferenceLine7Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 7 on the selected axis. */
    "ReferenceLine7Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The input field source for the data series 8 */
    "DataSource8"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 8 */
    "XAxisField8"?: string;


    /** Displays the data series 8 */
    "DataField8"?: string;


    /** The label to display in the legends area for data series  8 */
    "DataLabel8"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 8 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle8"?: STATEFORMATTING;


    /** Displays the values for data series 8 on the second Y axis */
    "UseSecondYAxis8"?: BOOLEAN;


    /** Sets the label text for reference line 8. */
    "ReferenceLine8Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 8 on the selected axis. */
    "ReferenceLine8Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The input field source for the data series 9 */
    "DataSource9"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 9 */
    "XAxisField9"?: string;


    /** Displays the data series 9 */
    "DataField9"?: string;


    /** The label to display in the legends area for data series  9 */
    "DataLabel9"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 9 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle9"?: STATEFORMATTING;


    /** Displays the values for data series 9 on the second Y axis */
    "UseSecondYAxis9"?: BOOLEAN;


    /** Sets the label text for reference line 9. */
    "ReferenceLine9Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 9 on the selected axis. */
    "ReferenceLine9Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The input field source for the data series 10 */
    "DataSource10"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 10 */
    "XAxisField10"?: string;


    /** Displays the data series 10 */
    "DataField10"?: string;


    /** The label to display in the legends area for data series  10 */
    "DataLabel10"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 10 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle10"?: STATEFORMATTING;


    /** Displays the values for data series 10 on the second Y axis */
    "UseSecondYAxis10"?: BOOLEAN;


    /** Sets the label text for reference line 10. */
    "ReferenceLine10Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 10 on the selected axis. */
    "ReferenceLine10Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The input field source for the data series 11 */
    "DataSource11"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 11 */
    "XAxisField11"?: string;


    /** Displays the data series 11 */
    "DataField11"?: string;


    /** The label to display in the legends area for data series  11 */
    "DataLabel11"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 11 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle11"?: STATEFORMATTING;


    /** Displays the values for data series 11 on the second Y axis */
    "UseSecondYAxis11"?: BOOLEAN;


    /** Sets the label text for reference line 11. */
    "ReferenceLine11Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 11 on the selected axis. */
    "ReferenceLine11Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The input field source for the data series 12 */
    "DataSource12"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 12 */
    "XAxisField12"?: string;


    /** Displays the data series 12 */
    "DataField12"?: string;


    /** The label to display in the legends area for data series  12 */
    "DataLabel12"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 12 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle12"?: STATEFORMATTING;


    /** Displays the values for data series 12 on the second Y axis */
    "UseSecondYAxis12"?: BOOLEAN;


    /** Sets the label text for reference line 12. */
    "ReferenceLine12Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 12 on the selected axis. */
    "ReferenceLine12Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The input field source for the data series 13 */
    "DataSource13"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 13 */
    "XAxisField13"?: string;


    /** Displays the data series 13 */
    "DataField13"?: string;


    /** The label to display in the legends area for data series  13 */
    "DataLabel13"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 13 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle13"?: STATEFORMATTING;


    /** Displays the values for data series 13 on the second Y axis */
    "UseSecondYAxis13"?: BOOLEAN;


    /** Sets the label text for reference line 13. */
    "ReferenceLine13Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 13 on the selected axis. */
    "ReferenceLine13Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The input field source for the data series 14 */
    "DataSource14"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 14 */
    "XAxisField14"?: string;


    /** Displays the data series 14 */
    "DataField14"?: string;


    /** The label to display in the legends area for data series  14 */
    "DataLabel14"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 14 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle14"?: STATEFORMATTING;


    /** Displays the values for data series 14 on the second Y axis */
    "UseSecondYAxis14"?: BOOLEAN;


    /** Sets the label text for reference line 14. */
    "ReferenceLine14Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 14 on the selected axis. */
    "ReferenceLine14Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The input field source for the data series 15 */
    "DataSource15"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 15 */
    "XAxisField15"?: string;


    /** Displays the data series 15 */
    "DataField15"?: string;


    /** The label to display in the legends area for data series  15 */
    "DataLabel15"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 15 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle15"?: STATEFORMATTING;


    /** Displays the values for data series 15 on the second Y axis */
    "UseSecondYAxis15"?: BOOLEAN;


    /** Sets the label text for reference line 15. */
    "ReferenceLine15Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 15 on the selected axis. */
    "ReferenceLine15Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The input field source for the data series 16 */
    "DataSource16"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 16 */
    "XAxisField16"?: string;


    /** Displays the data series 16 */
    "DataField16"?: string;


    /** The label to display in the legends area for data series  16 */
    "DataLabel16"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 16 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle16"?: STATEFORMATTING;


    /** Displays the values for data series 16 on the second Y axis */
    "UseSecondYAxis16"?: BOOLEAN;


    /** Sets the label text for reference line 16. */
    "ReferenceLine16Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 16 on the selected axis. */
    "ReferenceLine16Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The input field source for the data series 17 */
    "DataSource17"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 17 */
    "XAxisField17"?: string;


    /** Displays the data series 17 */
    "DataField17"?: string;


    /** The label to display in the legends area for data series  17 */
    "DataLabel17"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 17 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle17"?: STATEFORMATTING;


    /** Displays the values for data series 17 on the second Y axis */
    "UseSecondYAxis17"?: BOOLEAN;


    /** Sets the label text for reference line 17. */
    "ReferenceLine17Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 17 on the selected axis. */
    "ReferenceLine17Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The input field source for the data series 18 */
    "DataSource18"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 18 */
    "XAxisField18"?: string;


    /** Displays the data series 18 */
    "DataField18"?: string;


    /** The label to display in the legends area for data series  18 */
    "DataLabel18"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 18 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle18"?: STATEFORMATTING;


    /** Displays the values for data series 18 on the second Y axis */
    "UseSecondYAxis18"?: BOOLEAN;


    /** Sets the label text for reference line 18. */
    "ReferenceLine18Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 18 on the selected axis. */
    "ReferenceLine18Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The input field source for the data series 19 */
    "DataSource19"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 19 */
    "XAxisField19"?: string;


    /** Displays the data series 19 */
    "DataField19"?: string;


    /** The label to display in the legends area for data series  19 */
    "DataLabel19"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 19 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle19"?: STATEFORMATTING;


    /** Displays the values for data series 19 on the second Y axis */
    "UseSecondYAxis19"?: BOOLEAN;


    /** Sets the label text for reference line 19. */
    "ReferenceLine19Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 19 on the selected axis. */
    "ReferenceLine19Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The input field source for the data series 20 */
    "DataSource20"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 20 */
    "XAxisField20"?: string;


    /** Displays the data series 20 */
    "DataField20"?: string;


    /** The label to display in the legends area for data series  20 */
    "DataLabel20"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 20 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle20"?: STATEFORMATTING;


    /** Displays the values for data series 20 on the second Y axis */
    "UseSecondYAxis20"?: BOOLEAN;


    /** Sets the label text for reference line 20. */
    "ReferenceLine20Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 20 on the selected axis. */
    "ReferenceLine20Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The input field source for the data series 21 */
    "DataSource21"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 21 */
    "XAxisField21"?: string;


    /** Displays the data series 21 */
    "DataField21"?: string;


    /** The label to display in the legends area for data series  21 */
    "DataLabel21"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 21 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle21"?: STATEFORMATTING;


    /** Displays the values for data series 21 on the second Y axis */
    "UseSecondYAxis21"?: BOOLEAN;


    /** Sets the label text for reference line 21. */
    "ReferenceLine21Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 21 on the selected axis. */
    "ReferenceLine21Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The input field source for the data series 22 */
    "DataSource22"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 22 */
    "XAxisField22"?: string;


    /** Displays the data series 22 */
    "DataField22"?: string;


    /** The label to display in the legends area for data series  22 */
    "DataLabel22"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 22 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle22"?: STATEFORMATTING;


    /** Displays the values for data series 22 on the second Y axis */
    "UseSecondYAxis22"?: BOOLEAN;


    /** Sets the label text for reference line 22. */
    "ReferenceLine22Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 22 on the selected axis. */
    "ReferenceLine22Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The input field source for the data series 23 */
    "DataSource23"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 23 */
    "XAxisField23"?: string;


    /** Displays the data series 23 */
    "DataField23"?: string;


    /** The label to display in the legends area for data series  23 */
    "DataLabel23"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 23 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle23"?: STATEFORMATTING;


    /** Displays the values for data series 23 on the second Y axis */
    "UseSecondYAxis23"?: BOOLEAN;


    /** Sets the label text for reference line 23. */
    "ReferenceLine23Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 23 on the selected axis. */
    "ReferenceLine23Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The input field source for the data series 24 */
    "DataSource24"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 24 */
    "XAxisField24"?: string;


    /** Displays the data series 24 */
    "DataField24"?: string;


    /** The label to display in the legends area for data series  24 */
    "DataLabel24"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 24 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle24"?: STATEFORMATTING;


    /** Displays the values for data series 24 on the second Y axis */
    "UseSecondYAxis24"?: BOOLEAN;


    /** Sets the label text for reference line 24. */
    "ReferenceLine24Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 24 on the selected axis. */
    "ReferenceLine24Value"?: NUMBER | BindingTarget<NUMBER>;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** Fill the container */
    "FillContainer"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** Triggers an event when a data point on the chart is clicked */
    "SeriesClicked"?: ServiceBindingTarget[];


    /**  */
    "SelectedDataChanged"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcschartbar<A>
}

/** The binding source properties and services that can be bound on the "Ptcschartbar" widget. */
declare class UIOutputInterfacePtcschartbar<A> {
    
    /** Hides the legend area */
    HideLegend: BindingTarget<BOOLEAN>;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** An infotable that contains the selected data on the chart. */
    SelectedData: BindingTarget<INFOTABLE>;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget
}

/** Displays a bar chart */
declare function Ptcschartbar<A>(props: UIInputInterfacePtcschartbar<A>): UIOutputInterfacePtcschartbar<A>

            
/** The properties and events that can be set or bound on the "Ptcsbutton" widget. */
declare interface UIInputInterfacePtcsbutton extends UIBaseInputInterface {
    
    /** Sets an icon image for the tooltip of the Button widget. */
    "TooltipIcon"?: IMAGELINK;


    /** Enables you to set an icon image in the button widget */
    "Icon"?: IMAGELINK;


    /** The text that is displayed in the label of button widget */
    "Label"?: STRING | BindingTarget<STRING>;


    /** Allows the label text to continue onto another line */
    "MultiLine"?: BOOLEAN;


    /** Enables you to set a maximum height for the label text. If the label text size is more than the maximum height that you have set, it is truncated and you can use view “show more” or “show less” options to view the text at the runtime */
    "MaxHeight"?: NUMBER;


    /** Use this property to disable the widget in the mashup */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Enables you to set an ID for the widget */
    "ContextID"?: STRING | BindingTarget<STRING>;


    /** Enables you to align the label in the widget */
    "LabelAlignment"?: STRING<"left" | "right" | "center">;


    /** Enables you to set a maximum width for the button widget */
    "MaxWidth"?: NUMBER;


    /** The width of the widget. The width is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed width size */
    "Width"?: NUMBER;


    /** The height of the widget. The height is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed height size */
    "Height"?: NUMBER;


    /** Enables you to set a button type */
    "ButtonType"?: STRING<"primary" | "secondary" | "tertiary" | "danger" | "transparent"> | BindingTarget<STRING<"primary" | "secondary" | "tertiary" | "danger" | "transparent">>;


    /** The sequence number of the Button widget when you press tab */
    "TabSequence"?: NUMBER;


    /** Displays a tooltip text when you hover over the Button widget. */
    "TooltipField"?: STRING | BindingTarget<STRING>;


    /** Select an SVG icon to display within the button widget. To display a media entity, use the standard Icon property. */
    "SVGIcon"?: IMAGELINK;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** Triggers an event when the widget is clicked */
    "Clicked"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcsbutton
}

/** The binding source properties and services that can be bound on the "Ptcsbutton" widget. */
declare class UIOutputInterfacePtcsbutton {
    
    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    CustomClass: BindingTarget<STRING>;


    /** Enables you to set an ID for the widget */
    ContextID: BindingTarget<STRING>;


    /** Enables you to set a button type */
    ButtonType: BindingTarget<STRING<"primary" | "secondary" | "tertiary" | "danger" | "transparent">>;


    /** Triggers a click event */
    TriggerClick: ServiceBindingTarget
}

/** Enables you to add a button and raise an event when it is clicked */
declare function Ptcsbutton(props: UIInputInterfacePtcsbutton): UIOutputInterfacePtcsbutton

            
/** The properties and events that can be set or bound on the "Ptcschartline" widget. */
declare interface UIInputInterfacePtcschartline<A> extends UIBaseInputInterface {
    
    /**  */
    "ShowLegendLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "HideLegendLabel"?: STRING | BindingTarget<STRING>;


    /** Controls the type of button used to show and hide the legend area at run time */
    "ShowHideLegendButtonType"?: STRING<"tertiary" | "transparent">;


    /** Controls the type of button used to reset the chart at run time */
    "ResetButtonType"?: STRING<"tertiary" | "transparent">;


    /** Shows the zoom in and zoom out buttons on the chart toolbar. */
    "ShowZoomButtons"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Hides the notes area */
    "HideNotes"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Disable the widget in the mashup */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the text label for the X-axis */
    "XAxisLabel"?: STRING | BindingTarget<STRING>;


    /** Hides the X-axis */
    "HideXAxis"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets the number of labels on the X-axis */
    "NumberOfXLabels"?: NUMBER | BindingTarget<NUMBER>;


    /** Specifies the text label for the Y-axis */
    "YAxisLabel"?: STRING | BindingTarget<STRING>;


    /** Sets the number of labels on the Y-axis */
    "NumberOfYLabels"?: NUMBER;


    /** Hides the Y-axis */
    "HideYAxis"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Hides the legend area */
    "HideLegend"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Shows a simplified view of the chart vizualization. Enable this property to hide labels, legends, and rulers. */
    "SparkView"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specify the Y-axis to use as the reference for the ruler lines. You can align ruler lines with the data value markers of the primary or the secondary Y-axis. */
    "YAxisRulerAlignment"?: STRING<"primary" | "secondary"> | BindingTarget<STRING<"primary" | "secondary">>;


    /** Reverses the order of values on the X-axis */
    "ReverseXAxis"?: BOOLEAN;


    /** Reverses the order of values on the Y-axis */
    "ReverseYAxis"?: BOOLEAN;


    /** Sets a maximum width for the legend area */
    "LegendMaxWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets a maximum width for the vertical axis */
    "VerticalAxisMaxWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets a maximum height for the horizontal axis */
    "HorizontalAxisMaxHeight"?: NUMBER | BindingTarget<NUMBER>;


    /** The infotable data source for the chart */ 
    "Data"?: BindingTarget<INFOTABLE<A>>;


    /** Specifies the appearance of the pointer when hovering on the chart. You can use guide lines to track a data value relative to an axis */
    "PointerType"?: STRING<"auto" | "horz" | "vert" | "cross"> | BindingTarget<STRING<"auto" | "horz" | "vert" | "cross">>;


    /** Specifies the data point to select relative to the pointer position. You can set the property to select the nearest data point on the vertical axis, horizontal axis, or both axes. */
    "DataPointSelection"?: STRING<"auto" | "horz" | "vert" | "both"> | BindingTarget<STRING<"auto" | "horz" | "vert" | "both">>;


    /** Controls the stacking order for the data series */
    "StackOrder"?: STRING<"auto" | "reverse" | "appearance" | "ascending" | "descending" | "insideout"> | BindingTarget<STRING<"auto" | "reverse" | "appearance" | "ascending" | "descending" | "insideout">>;


    /** Hides the connecting lines between data points */
    "HideLines"?: BOOLEAN;


    /** Sets the chart type */
    "ChartType"?: STRING<"linechart" | "runchart" | "stepchart" | "areachart" | "scatterchart" | "streamgraphchart">;


    /** Sets the steps position */
    "StepPosition"?: STRING<"before" | "center" | "after"> | BindingTarget<STRING<"before" | "center" | "after">>;


    /** Hides the data point markers */
    "HideMarkers"?: BOOLEAN;


    /** Hides the value labels on the chart */
    "HideValues"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets the marker sizeof the series */
    "MarkerSize"?: NUMBER | BindingTarget<NUMBER>;


    /** Enter a 'DD-MM-YY' string pattern to set the date and time format for the X-axis. Format strings are case sensitive. You can use formats supported by the Moment.js library. For example, use a 'MMMM D YYYY hh:m A' pattern to format the date and time as 'October 12 1987 09:30 PM'. */
    "XAxisDateFormatToken"?: STRING | BindingTarget<STRING>;


    /** Enter a 'DD-MM-YY' string pattern to set the date and time format for the Y-axis. Format strings are case sensitive. You can use formats supported by the Moment.js library. For example, use a 'MMMM D YYYY hh:m A' pattern to format the date and time as 'October 12 1987 09:30 PM'. */
    "YAxisDateFormatToken"?: STRING | BindingTarget<STRING>;


    /** Controls how many data points a user can select at the same time. Choose multiple to allow a user to select more than one data point. */
    "SelectionMode"?: STRING<"none" | "single" | "multiple"> | BindingTarget<STRING<"none" | "single" | "multiple">>;


    /**  */
    "DateRangeHintText"?: STRING | BindingTarget<STRING>;


    /** Specifies the text label to display for the Line Chart */
    "Label"?: STRING | BindingTarget<STRING>;


    /** Enter a custom tooltip to display when a data point is selected. You can show a title, text, data values, and create new lines. Use the following syntax: Add #title# before a string to show a title, #newline# to create a new line, ${<token_name>} to display data from available chart tokens, and ${Data:<infotable_column>} or ${DataSourceN:<infotable_column>} to display values from an infotable column. For example: #title#Chart Tooltip Title#newline#${label}, ${total}#newline#${Data:Column3}. */
    "ValuesTooltip"?: STRING | BindingTarget<STRING>;


    /** Sets the text label type for the Line Chart */
    "LabelType"?: STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption"> | BindingTarget<STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption">>;


    /** Sets the position of the text label */
    "LabelPosition"?: STRING<"top" | "bottom">;


    /** Aligns the text for the widget label */
    "LabelAlignment"?: STRING;


    /** Sets the line curve */
    "CurveFitting"?: STRING<"linear" | "basis" | "bundle" | "cardinal" | "catmull-rom" | "monotone-x" | "monotone-y" | "natural" | "step"> | BindingTarget<STRING<"linear" | "basis" | "bundle" | "cardinal" | "catmull-rom" | "monotone-x" | "monotone-y" | "natural" | "step">>;


    /** Sets the number of data series to display on the chart. By default, the Auto setting displays all series in the infotable data. */
    "NumberOfSeries"?: NUMBER;


    /** Configure the state formatting for all data series on the chart. You can style the series based on data values to spot trends and patterns more easily. To configure formatting rules for each data series, enter a specific value for the NumberOfSeries property. */
    "DataSeriesStyle"?: STATEFORMATTING;


    /** Controls how data series are stacked on the chart. */
    "SeriesStacking"?: STRING | BindingTarget<STRING>;


    /** Select the infotable field that contains the data for the X-axis */
    "XAxisField"?: FIELDNAME<A>;


    /** Enables you to visualize data from multiple sources on the chart */
    "MultipleDataSources"?: BOOLEAN;


    /** Adds a show/hide button that enables users to show or hide the chart legend at run time. */
    "ShowHideLegend"?: BOOLEAN;


    /**  */
    "StringSelectAll"?: undefined;


    /**  */
    "StringClearAll"?: undefined;


    /** Sets the position of the chart legends */
    "LegendPosition"?: STRING<"top" | "right" | "bottom" | "left">;


    /** Aligns the legend text. The options that are available to you for this property depend on the setting of the LegendPosition property. */
    "LegendAlignment"?: STRING;


    /** Sets the marker shape of the data series legends */
    "LegendMarkerShapes"?: STRING<"none" | "square" | "circle">;


    /** Adds a legend filter that allows the user to filter the chart at runtime */
    "LegendFilter"?: BOOLEAN;


    /** Sets the marker shape for data points on the chart */
    "MarkerShape"?: STRING<"circle" | "square" | "diamond"> | BindingTarget<STRING<"circle" | "square" | "diamond">>;


    /** Specifies the text to display within the notes area on the chart. You can enter a string or select a localization token. */
    "Notes"?: STRING | BindingTarget<STRING>;


    /** Sets the position of the notes area */
    "NotesPosition"?: STRING<"top" | "bottom">;


    /** Aligns the text within the notes area */
    "NotesAlignment"?: STRING;


    /** Aligns the X-axis label */
    "XAxisLabelAlignment"?: STRING<"start" | "center" | "end">;


    /** Aligns text label for the Y-axis */
    "YAxisLabelAlignment"?: STRING<"end" | "center" | "start">;


    /** Sets the format type of the X-axis values */
    "XAxisType"?: STRING<"label" | "number" | "date"> | BindingTarget<STRING<"label" | "number" | "date">>;


    /** Sets the format for the X-axis values */
    "XAxisFormat"?: STRING | BindingTarget<STRING>;


    /** Sets the format type of the Y-axis values */
    "YAxisType"?: STRING<"label" | "number" | "date"> | BindingTarget<STRING<"label" | "number" | "date">>;


    /** Sets the format for the Y-axis values */
    "YAxisFormat"?: STRING | BindingTarget<STRING>;


    /** Sets the maximum range for the X-axis values */
    "XAxisMaximumValues"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets the minimum range for the X-axis values */
    "XAxisMinimumValues"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets the maximum range for the Y-axis values. By default, the range is automatically calculated based on the widget data. */
    "YAxisMaximumValues"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets the minimum range for the Y-axis values. By default, the range is automatically calculated based on the widget data. */
    "YAxisMinimumValues"?: NUMBER | BindingTarget<NUMBER>;


    /** Adds a second Y axis to the chart */
    "SecondYAxis"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the text label for the second Y axis */
    "SecondYAxisLabel"?: STRING | BindingTarget<STRING>;


    /** Aligns the label for the second Y axis */
    "SecondYAxisLabelAlignment"?: STRING<"end" | "center" | "start">;


    /** Sets the format of the second Y axis values */
    "SecondYAxisType"?: STRING<"label" | "number" | "date"> | BindingTarget<STRING<"label" | "number" | "date">>;


    /** Sets the format for the second Y axis values */
    "SecondYAxisFormat"?: STRING | BindingTarget<STRING>;


    /** Enter a 'DD-MM-YY' string pattern to set the date and time format for the secondary Y-axis. Format strings are case sensitive. You can use formats supported by the Moment.js library. For example, use a 'MMMM D YYYY hh:m A' pattern to format the date and time as 'October 12 1987 09:30 PM'. */
    "SecondYAxisDateFormatToken"?: STRING | BindingTarget<STRING>;


    /** Sets the maximum range for the second Y axis values. By default, the range is automatically calculated based on the widget data. */
    "SecondYAxisMaxValue"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets the minimum range for the second Y axis values. By default, the range is automatically calculated based on the widget data. */
    "SecondYAxisMinValue"?: NUMBER | BindingTarget<NUMBER>;


    /** Reverses the order of values on the second Y-axis */
    "ReverseSecondYAxis"?: BOOLEAN;


    /** Enter a value from -180 to 180 to set the rotation angle of labels on the horizontal axis. */
    "HorizontalAxisLabelsRotation"?: NUMBER;


    /** Shows the X-axis ruler */
    "ShowXAxisRuler"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Shows the Y-axis ruler */
    "ShowYAxisRuler"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Shows the rulers in front of the data values. By default, rulers are displayed behind the data. */
    "RulersInFront"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Shows the zero value ruler */
    "ShowZeroValueRuler"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Shows the data within the chart as areas. */
    "ShowArea"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets the position of the data value labels relative to the data points */
    "ValuesPosition"?: STRING<"above" | "on" | "below">;


    /** Enables you to zoom in or out on the horizontal axis */
    "HorizontalZoom"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Adds controls that enable users to specify a value range to zoom to on the horizontal axis */
    "HorizontalRangeZoom"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the text label for start of the range selection */
    "HorizontalStartZoomLabel"?: STRING | BindingTarget<STRING>;


    /** Specifies the text label for end of the range selection */
    "HorizontalEndZoomLabel"?: STRING | BindingTarget<STRING>;


    /** Adds a slider control that enables you to display data between a minimum and a maximum value on the horizontal axis */
    "HorizontalSliderZoom"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the text label for the maximum value of the slider zoom control */
    "HorizontalSliderZoomMaxLabel"?: STRING | BindingTarget<STRING>;


    /** Specifies the text label for the minimum value of the slider zoom control */
    "HorizontalSliderZoomMinLabel"?: STRING | BindingTarget<STRING>;


    /** Enables you to zoom in by directly selecting two data items on the chart */
    "DirectSelectionZoom"?: STRING<"none" | "xaxis" | "yaxis" | "both"> | BindingTarget<STRING<"none" | "xaxis" | "yaxis" | "both">>;


    /** Enables you to zoom in to a specific part of the chart by drawing a selection box around the data range that you want to view */
    "DragSelectionZoom"?: STRING<"none" | "xaxis" | "yaxis" | "both"> | BindingTarget<STRING<"none" | "xaxis" | "yaxis" | "both">>;


    /** Adds controls that enable users to zoom in on the horizontal axis according to specific intervals */
    "HorizontalIntervalControl"?: STRING<"none" | "dropdown">;


    /** Specifies the text label for the interval zoom controls for the horizontal axis */
    "HorizontalIntervalControlLabel"?: STRING | BindingTarget<STRING>;


    /** The data for the interval zoom control options */
    "HorizontalIntervalData"?: BindingTarget<INFOTABLE>;


    /** Enables you to select the anchor position of the interval range within the data set. Select Start to place the interval at the start of the data set, or End to place the interval at the end. For example, if you specify a three-month interval in a 12-month data set, you can select Start to show the first three months, or End to show the last three months of the data set */
    "HorizontalIntervalAnchorPoint"?: STRING<"start" | "end"> | BindingTarget<STRING<"start" | "end">>;


    /** Specifies the label for the interval anchor point on the horizontal axis */
    "HorizontalIntervalAnchorPointLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringStart"?: undefined;


    /**  */
    "StringEnd"?: undefined;


    /** The data for the interval control options */
    "VerticalIntervalData"?: BindingTarget<INFOTABLE>;


    /** Adds controls for adjusting the anchor value for the horizontal axis */
    "ShowHorizontalAnchorPointControl"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Enables you to zoom in or out on the vertical axis */
    "VerticalZoom"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Adds a slider control that enables you to display data between a minimum and a maximum value on the vertical axis */
    "VerticalSliderZoom"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the text label for the maximum value of the slider zoom control */
    "VerticalSliderZoomMaxLabel"?: STRING | BindingTarget<STRING>;


    /** Specifies the text label for the minimum value of the slider zoom control */
    "VerticalSliderZoomMinLabel"?: STRING | BindingTarget<STRING>;


    /** The sequence number of the widget when you press the TAB key */
    "TabSequence"?: NUMBER;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** Specifies the label for the button that resets the charts zooming */
    "LabelReset"?: STRING | BindingTarget<STRING>;


    /**  */
    "UseSampleDataInRuntime"?: BOOLEAN;


    /** Sets the number of reference lines to display on the chart. Reference lines are used to highlight the chart data relative to a specific value. You can add up to 24 lines and configure the label, axis, and value of each line. */
    "NumberOfReferenceLines"?: NUMBER;


    /** The input field source for the data series 1 */
    "DataSource1"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 1 */
    "XAxisField1"?: string;


    /** Displays the data series 1 */
    "DataField1"?: string;


    /** The label to display in the legends area for data series  1 */
    "DataLabel1"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 1 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle1"?: STATEFORMATTING;


    /** Displays the values for data series 1 on the second Y axis */
    "UseSecondYAxis1"?: BOOLEAN;


    /** Sets the label text for reference line 1. */
    "ReferenceLine1Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 1. */
    "ReferenceLine1Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 1 on the selected axis. */
    "ReferenceLine1Value"?: STRING | BindingTarget<STRING>;


    /**  1 */
    "Series1MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /** The input field source for the data series 2 */
    "DataSource2"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 2 */
    "XAxisField2"?: string;


    /** Displays the data series 2 */
    "DataField2"?: string;


    /** The label to display in the legends area for data series  2 */
    "DataLabel2"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 2 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle2"?: STATEFORMATTING;


    /** Displays the values for data series 2 on the second Y axis */
    "UseSecondYAxis2"?: BOOLEAN;


    /** Sets the label text for reference line 2. */
    "ReferenceLine2Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 2. */
    "ReferenceLine2Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 2 on the selected axis. */
    "ReferenceLine2Value"?: STRING | BindingTarget<STRING>;


    /**  2 */
    "Series2MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /** The input field source for the data series 3 */
    "DataSource3"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 3 */
    "XAxisField3"?: string;


    /** Displays the data series 3 */
    "DataField3"?: string;


    /** The label to display in the legends area for data series  3 */
    "DataLabel3"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 3 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle3"?: STATEFORMATTING;


    /** Displays the values for data series 3 on the second Y axis */
    "UseSecondYAxis3"?: BOOLEAN;


    /** Sets the label text for reference line 3. */
    "ReferenceLine3Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 3. */
    "ReferenceLine3Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 3 on the selected axis. */
    "ReferenceLine3Value"?: STRING | BindingTarget<STRING>;


    /**  3 */
    "Series3MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /** The input field source for the data series 4 */
    "DataSource4"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 4 */
    "XAxisField4"?: string;


    /** Displays the data series 4 */
    "DataField4"?: string;


    /** The label to display in the legends area for data series  4 */
    "DataLabel4"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 4 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle4"?: STATEFORMATTING;


    /** Displays the values for data series 4 on the second Y axis */
    "UseSecondYAxis4"?: BOOLEAN;


    /** Sets the label text for reference line 4. */
    "ReferenceLine4Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 4. */
    "ReferenceLine4Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 4 on the selected axis. */
    "ReferenceLine4Value"?: STRING | BindingTarget<STRING>;


    /**  4 */
    "Series4MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /** The input field source for the data series 5 */
    "DataSource5"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 5 */
    "XAxisField5"?: string;


    /** Displays the data series 5 */
    "DataField5"?: string;


    /** The label to display in the legends area for data series  5 */
    "DataLabel5"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 5 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle5"?: STATEFORMATTING;


    /** Displays the values for data series 5 on the second Y axis */
    "UseSecondYAxis5"?: BOOLEAN;


    /** Sets the label text for reference line 5. */
    "ReferenceLine5Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 5. */
    "ReferenceLine5Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 5 on the selected axis. */
    "ReferenceLine5Value"?: STRING | BindingTarget<STRING>;


    /**  5 */
    "Series5MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /** The input field source for the data series 6 */
    "DataSource6"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 6 */
    "XAxisField6"?: string;


    /** Displays the data series 6 */
    "DataField6"?: string;


    /** The label to display in the legends area for data series  6 */
    "DataLabel6"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 6 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle6"?: STATEFORMATTING;


    /** Displays the values for data series 6 on the second Y axis */
    "UseSecondYAxis6"?: BOOLEAN;


    /** Sets the label text for reference line 6. */
    "ReferenceLine6Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 6. */
    "ReferenceLine6Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 6 on the selected axis. */
    "ReferenceLine6Value"?: STRING | BindingTarget<STRING>;


    /**  6 */
    "Series6MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /** The input field source for the data series 7 */
    "DataSource7"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 7 */
    "XAxisField7"?: string;


    /** Displays the data series 7 */
    "DataField7"?: string;


    /** The label to display in the legends area for data series  7 */
    "DataLabel7"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 7 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle7"?: STATEFORMATTING;


    /** Displays the values for data series 7 on the second Y axis */
    "UseSecondYAxis7"?: BOOLEAN;


    /** Sets the label text for reference line 7. */
    "ReferenceLine7Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 7. */
    "ReferenceLine7Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 7 on the selected axis. */
    "ReferenceLine7Value"?: STRING | BindingTarget<STRING>;


    /**  7 */
    "Series7MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /** The input field source for the data series 8 */
    "DataSource8"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 8 */
    "XAxisField8"?: string;


    /** Displays the data series 8 */
    "DataField8"?: string;


    /** The label to display in the legends area for data series  8 */
    "DataLabel8"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 8 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle8"?: STATEFORMATTING;


    /** Displays the values for data series 8 on the second Y axis */
    "UseSecondYAxis8"?: BOOLEAN;


    /** Sets the label text for reference line 8. */
    "ReferenceLine8Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 8. */
    "ReferenceLine8Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 8 on the selected axis. */
    "ReferenceLine8Value"?: STRING | BindingTarget<STRING>;


    /**  8 */
    "Series8MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /** The input field source for the data series 9 */
    "DataSource9"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 9 */
    "XAxisField9"?: string;


    /** Displays the data series 9 */
    "DataField9"?: string;


    /** The label to display in the legends area for data series  9 */
    "DataLabel9"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 9 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle9"?: STATEFORMATTING;


    /** Displays the values for data series 9 on the second Y axis */
    "UseSecondYAxis9"?: BOOLEAN;


    /** Sets the label text for reference line 9. */
    "ReferenceLine9Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 9. */
    "ReferenceLine9Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 9 on the selected axis. */
    "ReferenceLine9Value"?: STRING | BindingTarget<STRING>;


    /**  9 */
    "Series9MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /** The input field source for the data series 10 */
    "DataSource10"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 10 */
    "XAxisField10"?: string;


    /** Displays the data series 10 */
    "DataField10"?: string;


    /** The label to display in the legends area for data series  10 */
    "DataLabel10"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 10 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle10"?: STATEFORMATTING;


    /** Displays the values for data series 10 on the second Y axis */
    "UseSecondYAxis10"?: BOOLEAN;


    /** Sets the label text for reference line 10. */
    "ReferenceLine10Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 10. */
    "ReferenceLine10Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 10 on the selected axis. */
    "ReferenceLine10Value"?: STRING | BindingTarget<STRING>;


    /**  10 */
    "Series10MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /** The input field source for the data series 11 */
    "DataSource11"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 11 */
    "XAxisField11"?: string;


    /** Displays the data series 11 */
    "DataField11"?: string;


    /** The label to display in the legends area for data series  11 */
    "DataLabel11"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 11 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle11"?: STATEFORMATTING;


    /** Displays the values for data series 11 on the second Y axis */
    "UseSecondYAxis11"?: BOOLEAN;


    /** Sets the label text for reference line 11. */
    "ReferenceLine11Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 11. */
    "ReferenceLine11Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 11 on the selected axis. */
    "ReferenceLine11Value"?: STRING | BindingTarget<STRING>;


    /**  11 */
    "Series11MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /** The input field source for the data series 12 */
    "DataSource12"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 12 */
    "XAxisField12"?: string;


    /** Displays the data series 12 */
    "DataField12"?: string;


    /** The label to display in the legends area for data series  12 */
    "DataLabel12"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 12 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle12"?: STATEFORMATTING;


    /** Displays the values for data series 12 on the second Y axis */
    "UseSecondYAxis12"?: BOOLEAN;


    /** Sets the label text for reference line 12. */
    "ReferenceLine12Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 12. */
    "ReferenceLine12Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 12 on the selected axis. */
    "ReferenceLine12Value"?: STRING | BindingTarget<STRING>;


    /**  12 */
    "Series12MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /** The input field source for the data series 13 */
    "DataSource13"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 13 */
    "XAxisField13"?: string;


    /** Displays the data series 13 */
    "DataField13"?: string;


    /** The label to display in the legends area for data series  13 */
    "DataLabel13"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 13 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle13"?: STATEFORMATTING;


    /** Displays the values for data series 13 on the second Y axis */
    "UseSecondYAxis13"?: BOOLEAN;


    /** Sets the label text for reference line 13. */
    "ReferenceLine13Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 13. */
    "ReferenceLine13Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 13 on the selected axis. */
    "ReferenceLine13Value"?: STRING | BindingTarget<STRING>;


    /**  13 */
    "Series13MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /** The input field source for the data series 14 */
    "DataSource14"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 14 */
    "XAxisField14"?: string;


    /** Displays the data series 14 */
    "DataField14"?: string;


    /** The label to display in the legends area for data series  14 */
    "DataLabel14"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 14 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle14"?: STATEFORMATTING;


    /** Displays the values for data series 14 on the second Y axis */
    "UseSecondYAxis14"?: BOOLEAN;


    /** Sets the label text for reference line 14. */
    "ReferenceLine14Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 14. */
    "ReferenceLine14Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 14 on the selected axis. */
    "ReferenceLine14Value"?: STRING | BindingTarget<STRING>;


    /**  14 */
    "Series14MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /** The input field source for the data series 15 */
    "DataSource15"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 15 */
    "XAxisField15"?: string;


    /** Displays the data series 15 */
    "DataField15"?: string;


    /** The label to display in the legends area for data series  15 */
    "DataLabel15"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 15 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle15"?: STATEFORMATTING;


    /** Displays the values for data series 15 on the second Y axis */
    "UseSecondYAxis15"?: BOOLEAN;


    /** Sets the label text for reference line 15. */
    "ReferenceLine15Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 15. */
    "ReferenceLine15Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 15 on the selected axis. */
    "ReferenceLine15Value"?: STRING | BindingTarget<STRING>;


    /**  15 */
    "Series15MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /** The input field source for the data series 16 */
    "DataSource16"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 16 */
    "XAxisField16"?: string;


    /** Displays the data series 16 */
    "DataField16"?: string;


    /** The label to display in the legends area for data series  16 */
    "DataLabel16"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 16 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle16"?: STATEFORMATTING;


    /** Displays the values for data series 16 on the second Y axis */
    "UseSecondYAxis16"?: BOOLEAN;


    /** Sets the label text for reference line 16. */
    "ReferenceLine16Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 16. */
    "ReferenceLine16Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 16 on the selected axis. */
    "ReferenceLine16Value"?: STRING | BindingTarget<STRING>;


    /**  16 */
    "Series16MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /** The input field source for the data series 17 */
    "DataSource17"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 17 */
    "XAxisField17"?: string;


    /** Displays the data series 17 */
    "DataField17"?: string;


    /** The label to display in the legends area for data series  17 */
    "DataLabel17"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 17 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle17"?: STATEFORMATTING;


    /** Displays the values for data series 17 on the second Y axis */
    "UseSecondYAxis17"?: BOOLEAN;


    /** Sets the label text for reference line 17. */
    "ReferenceLine17Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 17. */
    "ReferenceLine17Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 17 on the selected axis. */
    "ReferenceLine17Value"?: STRING | BindingTarget<STRING>;


    /**  17 */
    "Series17MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /** The input field source for the data series 18 */
    "DataSource18"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 18 */
    "XAxisField18"?: string;


    /** Displays the data series 18 */
    "DataField18"?: string;


    /** The label to display in the legends area for data series  18 */
    "DataLabel18"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 18 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle18"?: STATEFORMATTING;


    /** Displays the values for data series 18 on the second Y axis */
    "UseSecondYAxis18"?: BOOLEAN;


    /** Sets the label text for reference line 18. */
    "ReferenceLine18Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 18. */
    "ReferenceLine18Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 18 on the selected axis. */
    "ReferenceLine18Value"?: STRING | BindingTarget<STRING>;


    /**  18 */
    "Series18MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /** The input field source for the data series 19 */
    "DataSource19"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 19 */
    "XAxisField19"?: string;


    /** Displays the data series 19 */
    "DataField19"?: string;


    /** The label to display in the legends area for data series  19 */
    "DataLabel19"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 19 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle19"?: STATEFORMATTING;


    /** Displays the values for data series 19 on the second Y axis */
    "UseSecondYAxis19"?: BOOLEAN;


    /** Sets the label text for reference line 19. */
    "ReferenceLine19Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 19. */
    "ReferenceLine19Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 19 on the selected axis. */
    "ReferenceLine19Value"?: STRING | BindingTarget<STRING>;


    /**  19 */
    "Series19MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /** The input field source for the data series 20 */
    "DataSource20"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 20 */
    "XAxisField20"?: string;


    /** Displays the data series 20 */
    "DataField20"?: string;


    /** The label to display in the legends area for data series  20 */
    "DataLabel20"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 20 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle20"?: STATEFORMATTING;


    /** Displays the values for data series 20 on the second Y axis */
    "UseSecondYAxis20"?: BOOLEAN;


    /** Sets the label text for reference line 20. */
    "ReferenceLine20Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 20. */
    "ReferenceLine20Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 20 on the selected axis. */
    "ReferenceLine20Value"?: STRING | BindingTarget<STRING>;


    /**  20 */
    "Series20MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /** The input field source for the data series 21 */
    "DataSource21"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 21 */
    "XAxisField21"?: string;


    /** Displays the data series 21 */
    "DataField21"?: string;


    /** The label to display in the legends area for data series  21 */
    "DataLabel21"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 21 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle21"?: STATEFORMATTING;


    /** Displays the values for data series 21 on the second Y axis */
    "UseSecondYAxis21"?: BOOLEAN;


    /** Sets the label text for reference line 21. */
    "ReferenceLine21Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 21. */
    "ReferenceLine21Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 21 on the selected axis. */
    "ReferenceLine21Value"?: STRING | BindingTarget<STRING>;


    /**  21 */
    "Series21MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /** The input field source for the data series 22 */
    "DataSource22"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 22 */
    "XAxisField22"?: string;


    /** Displays the data series 22 */
    "DataField22"?: string;


    /** The label to display in the legends area for data series  22 */
    "DataLabel22"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 22 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle22"?: STATEFORMATTING;


    /** Displays the values for data series 22 on the second Y axis */
    "UseSecondYAxis22"?: BOOLEAN;


    /** Sets the label text for reference line 22. */
    "ReferenceLine22Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 22. */
    "ReferenceLine22Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 22 on the selected axis. */
    "ReferenceLine22Value"?: STRING | BindingTarget<STRING>;


    /**  22 */
    "Series22MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /** The input field source for the data series 23 */
    "DataSource23"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 23 */
    "XAxisField23"?: string;


    /** Displays the data series 23 */
    "DataField23"?: string;


    /** The label to display in the legends area for data series  23 */
    "DataLabel23"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 23 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle23"?: STATEFORMATTING;


    /** Displays the values for data series 23 on the second Y axis */
    "UseSecondYAxis23"?: BOOLEAN;


    /** Sets the label text for reference line 23. */
    "ReferenceLine23Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 23. */
    "ReferenceLine23Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 23 on the selected axis. */
    "ReferenceLine23Value"?: STRING | BindingTarget<STRING>;


    /**  23 */
    "Series23MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /** The input field source for the data series 24 */
    "DataSource24"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the data for the X-axis 24 */
    "XAxisField24"?: string;


    /** Displays the data series 24 */
    "DataField24"?: string;


    /** The label to display in the legends area for data series  24 */
    "DataLabel24"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 24 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle24"?: STATEFORMATTING;


    /** Displays the values for data series 24 on the second Y axis */
    "UseSecondYAxis24"?: BOOLEAN;


    /** Sets the label text for reference line 24. */
    "ReferenceLine24Label"?: STRING | BindingTarget<STRING>;


    /** Specifies the axis to use for reference line 24. */
    "ReferenceLine24Axis"?: STRING<"xaxis" | "yaxis">;


    /** Sets the value to use for the position of reference line 24 on the selected axis. */
    "ReferenceLine24Value"?: STRING | BindingTarget<STRING>;


    /**  24 */
    "Series24MarkerType"?: STRING<"default" | "none" | "circle" | "square" | "diamond">;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** Fill the container */
    "FillContainer"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** Triggers an event when a data point on the chart is clicked */
    "SeriesClicked"?: ServiceBindingTarget[];


    /**  */
    "SelectedDataChanged"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcschartline<A>
}

/** The binding source properties and services that can be bound on the "Ptcschartline" widget. */
declare class UIOutputInterfacePtcschartline<A> {
    
    /** Hides the legend area */
    HideLegend: BindingTarget<BOOLEAN>;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** An infotable that contains the selected data on the chart. */
    SelectedData: BindingTarget<INFOTABLE>;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget
}

/** Displays a line chart */
declare function Ptcschartline<A>(props: UIInputInterfacePtcschartline<A>): UIOutputInterfacePtcschartline<A>

            
/** The properties and events that can be set or bound on the "Ptcschartpareto" widget. */
declare interface UIInputInterfacePtcschartpareto<A> extends UIBaseInputInterface {
    
    /**  */
    "ShowLegendLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "HideLegendLabel"?: STRING | BindingTarget<STRING>;


    /** Controls the type of button used to show and hide the legend area at run time */
    "ShowHideLegendButtonType"?: STRING<"tertiary" | "transparent">;


    /** Controls the type of button used to reset the chart at run time */
    "ResetButtonType"?: STRING<"tertiary" | "transparent">;


    /** Shows the zoom in and zoom out buttons on the chart toolbar. */
    "ShowZoomButtons"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets the percentage value for the threshold line */
    "ThresholdValue"?: NUMBER | BindingTarget<NUMBER>;


    /** Enables you to display a vertical or horizontal line that marks the threshold value for the cumulative percentage */
    "ThresholdLine"?: STRING<"horizontal" | "vertical" | "both" | "none"> | BindingTarget<STRING<"horizontal" | "vertical" | "both" | "none">>;


    /** Enables you to emphasize data that is under the specified threshold value */
    "EmphasizeThresholdFactors"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Hides the notes area */
    "HideNotes"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Disable the widget in the mashup */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the text label for the X-axis */
    "XAxisLabel"?: STRING | BindingTarget<STRING>;


    /** Hides the X-axis */
    "HideXAxis"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the text label for the Y-axis */
    "YAxisLabel"?: STRING | BindingTarget<STRING>;


    /** Hides the Y-axis */
    "HideYAxis"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets the number of labels on the Y-axis */
    "NumberOfYLabels"?: NUMBER;


    /** Hides the legend area */
    "HideLegend"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Shows a simplified view of the chart visualization. Enable this property to hide labels, legends and rulers */
    "SparkView"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the Y-axis to use as the reference for the ruler lines. You can align ruler lines with the data value markers of the primary or the secondary Y-axis. */
    "YAxisRulerAlignment"?: STRING<"primary" | "secondary"> | BindingTarget<STRING<"primary" | "secondary">>;


    /** Sets a maximum width for the legend area */
    "LegendMaxWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets a maximum width for the vertical axis */
    "VerticalAxisMaxWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets a maximum height for the horizontal axis */
    "HorizontalAxisMaxHeight"?: NUMBER | BindingTarget<NUMBER>;


    /** The infotable data source for the chart */ 
    "Data"?: BindingTarget<INFOTABLE<A>>;


    /** Shows the value labels on the chart */
    "ShowValues"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Controls how many data points a user can select at the same time. Choose multiple to allow a user to select more than one data point. */
    "SelectionMode"?: STRING<"none" | "single" | "multiple"> | BindingTarget<STRING<"none" | "single" | "multiple">>;


    /** Specifies the text label to display for the Pareto chart */
    "Label"?: STRING | BindingTarget<STRING>;


    /** Enter a custom tooltip to display when a data point is selected. You can show a title, text, data values, and create new lines. Use the following syntax: Add #title# before a string to show a title, #newline# to create a new line, ${<token_name>} to display data from available chart tokens, and ${Data:<infotable_column>} or ${DataSourceN:<infotable_column>} to display values from an infotable column. For example: #title#Chart Tooltip Title#newline#${label}, ${total}#newline#${Data:Column3}. */
    "ValuesTooltip"?: STRING | BindingTarget<STRING>;


    /** Enter a custom tooltip to display when a data point on the cumulative line is selected. You can show a title, text, data values, and create new lines. Use the following syntax: Add #title# before a string to show a title, #newline# to create a new line, ${<token_name>} to display data from available chart tokens, and ${Data:<infotable_column>} or ${DataSourceN:<infotable_column>} to display values from an infotable column. For example: #title#Chart Tooltip Title#newline#${label}, ${total}#newline#${Data:Column3}. */
    "LineValuesTooltip"?: STRING | BindingTarget<STRING>;


    /** Sets the label type for the Pareto Chart */
    "LabelType"?: STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption"> | BindingTarget<STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption">>;


    /** Aligns the text for the widget label */
    "LabelAlignment"?: STRING;


    /** Sets the position of the text label */
    "LabelPosition"?: STRING<"top" | "bottom">;


    /** Sets the padding from the axes. The padding value is a percentage of the bar width. */
    "ExternalPadding"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets the padding between the series. The padding value is a percentage of the bar width. */
    "InternalPadding"?: NUMBER | BindingTarget<NUMBER>;


    /** Hides the line that shows the cumulative percentage */
    "HideCumulativeLine"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the label for the cumulative line in the legend area */
    "CumulativeLineLabel"?: STRING | BindingTarget<STRING>;


    /** Sets the number of data series to display on the chart. By default, the Auto setting displays all series in the infotable data. */
    "NumberOfSeries"?: NUMBER;


    /** Configure the state formatting for all data series on the chart. You can style the series based on data values to spot trends and patterns more easily. To configure formatting rules for each data series, enter a specific value for the NumberOfSeries property. */
    "DataSeriesStyle"?: STATEFORMATTING;


    /** Specifies the Infotable column with the data for the categories to display on the chart */
    "XAxisField"?: FIELDNAME<A>;


    /** Enables you to visualize data from multiple sources on the chart */
    "MultipleDataSources"?: BOOLEAN;


    /** Adds a show/hide button that enables users to show or hide the chart legend at run time. */
    "ShowHideLegend"?: BOOLEAN;


    /**  */
    "StringSelectAll"?: undefined;


    /**  */
    "StringClearAll"?: undefined;


    /** Aligns the legend text. The options that are available to you for this property depend on the setting of LegendPosition property. */
    "LegendAlignment"?: STRING;


    /** Sets the position of the chart legend */
    "LegendPosition"?: STRING<"top" | "right" | "bottom" | "left">;


    /** Sets the marker shape of the data series legends */
    "LegendMarkerShapes"?: STRING<"none" | "square" | "circle">;


    /** Adds a legend filter that allows the user to filter the chart at runtime */
    "LegendFilter"?: BOOLEAN;


    /** Specifies the text to display within the notes area on the chart. You can type a string or select a localization token. */
    "Notes"?: STRING | BindingTarget<STRING>;


    /** Sets the position of the notes area */
    "NotesPosition"?: STRING<"top" | "bottom">;


    /** Aligns the text within the notes area */
    "NotesAlignment"?: STRING;


    /** Hides the second Y axis */
    "HideSecondYAxis"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Aligns the label for the second Y-axis */
    "SecondYAxisLabelAlignment"?: STRING;


    /** Sets the maximum range for the second Y-axis values. By default, the maximum is 100%. */
    "SecondYAxisMaximumValues"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets the minimum range for the second Y-axis values. By default, the minimum is 0%. */
    "SecondYAxisMinimumValues"?: NUMBER | BindingTarget<NUMBER>;


    /** Aligns the X-axis label */
    "XAxisLabelAlignment"?: STRING;


    /** Aligns text label for the Y-axis */
    "YAxisLabelAlignment"?: STRING;


    /** Sets the format for the Y-axis values */
    "YAxisFormat"?: STRING | BindingTarget<STRING>;


    /** Sets the maximum range for the Y-axis values. By default, the range is automatically calculated based on the widget data. */
    "YAxisMaximumValues"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets the minimum range for the Y-axis values. By default, the range is automatically calculated based on the widget data. */
    "YAxisMinimumValues"?: NUMBER | BindingTarget<NUMBER>;


    /** Specifies the text label for the second Y-axis */
    "SecondYAxisLabel"?: STRING | BindingTarget<STRING>;


    /** Shows the X-axis ruler */
    "ShowXAxisRuler"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Shows the Y-axis ruler */
    "ShowYAxisRuler"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Shows the rulers in front of the data values. By default, rulers are displayed behind the data. */
    "RulersInFront"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Enter a value from -180 to 180 to set the rotation angle of labels on the horizontal axis. */
    "HorizontalAxisLabelsRotation"?: NUMBER;


    /** Sets the position of the data value labels relative to the data points */
    "ValuesPosition"?: STRING<"outside" | "inside">;


    /** Shows the values labels displayed on the line within the chart */
    "ShowLineValues"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets the position of the value labels relative to the data points on the line */
    "LineValuesPosition"?: STRING<"above" | "overlap" | "below">;


    /** Sets the alignment of the data value labels relative to the chart bars */
    "ValuesAlignment"?: STRING<"end" | "base">;


    /** Enables you to zoom in or out on the horizontal axis */
    "HorizontalZoom"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Adds controls that enable users to specify a value range to zoom to on the horizontal axis */
    "HorizontalRangeZoom"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the text label for start of the range selection */
    "HorizontalStartZoomLabel"?: STRING | BindingTarget<STRING>;


    /** Specifies the text label for end of the range selection */
    "HorizontalEndZoomLabel"?: STRING | BindingTarget<STRING>;


    /** Adds a slider control that enables you to display data between a minimum and a maximum value on the horizontal axis */
    "HorizontalSliderZoom"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the text label for the maximum value of the slider zoom control */
    "HorizontalSliderZoomMaxLabel"?: STRING | BindingTarget<STRING>;


    /** Specifies the text label for the minimum value of the slider zoom control */
    "HorizontalSliderZoomMinLabel"?: STRING | BindingTarget<STRING>;


    /** Enables you to zoom in by directly selecting two data items on the chart */
    "DirectSelectionZoom"?: STRING<"none" | "xaxis"> | BindingTarget<STRING<"none" | "xaxis">>;


    /** Enables you to zoom in to a specific part of the chart by drawing a selection box around the data range that you want to view */
    "DragSelectionZoom"?: STRING<"none" | "xaxis"> | BindingTarget<STRING<"none" | "xaxis">>;


    /**  */
    "StringStart"?: undefined;


    /**  */
    "StringEnd"?: undefined;


    /** The sequence number of the widget when you press the TAB key */
    "TabSequence"?: NUMBER;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** Specifies the label for the button that resets the charts zooming */
    "LabelReset"?: STRING | BindingTarget<STRING>;


    /** Sets the marker shape for data points on the cumulative line */
    "CumulativeLineMarkerShape"?: STRING<"circle" | "square" | "diamond" | "none"> | BindingTarget<STRING<"circle" | "square" | "diamond" | "none">>;


    /** Sets the marker size for data points on the cumulative line */
    "CumulativeLineMarkerSize"?: NUMBER | BindingTarget<NUMBER>;


    /** Use True or False values from the Selectable infotable field to control whether users can click to select data on the chart. Each value within the field applies to all data series on the same row. */
    "NonSelectableData"?: BOOLEAN;


    /**  */
    "YAxisType"?: STRING;


    /**  */
    "UseSampleDataInRuntime"?: BOOLEAN;


    /** The input field source for the data series 1..n 1 */
    "DataSource1"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 1 */
    "XAxisField1"?: string;


    /** Displays the data series 1 */
    "DataField1"?: string;


    /** The label to display in the legends area for data series  1 */
    "DataLabel1"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 1 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle1"?: STATEFORMATTING;


    /** The input field source for the data series 1..n 2 */
    "DataSource2"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 2 */
    "XAxisField2"?: string;


    /** Displays the data series 2 */
    "DataField2"?: string;


    /** The label to display in the legends area for data series  2 */
    "DataLabel2"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 2 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle2"?: STATEFORMATTING;


    /** The input field source for the data series 1..n 3 */
    "DataSource3"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 3 */
    "XAxisField3"?: string;


    /** Displays the data series 3 */
    "DataField3"?: string;


    /** The label to display in the legends area for data series  3 */
    "DataLabel3"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 3 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle3"?: STATEFORMATTING;


    /** The input field source for the data series 1..n 4 */
    "DataSource4"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 4 */
    "XAxisField4"?: string;


    /** Displays the data series 4 */
    "DataField4"?: string;


    /** The label to display in the legends area for data series  4 */
    "DataLabel4"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 4 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle4"?: STATEFORMATTING;


    /** The input field source for the data series 1..n 5 */
    "DataSource5"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 5 */
    "XAxisField5"?: string;


    /** Displays the data series 5 */
    "DataField5"?: string;


    /** The label to display in the legends area for data series  5 */
    "DataLabel5"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 5 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle5"?: STATEFORMATTING;


    /** The input field source for the data series 1..n 6 */
    "DataSource6"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 6 */
    "XAxisField6"?: string;


    /** Displays the data series 6 */
    "DataField6"?: string;


    /** The label to display in the legends area for data series  6 */
    "DataLabel6"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 6 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle6"?: STATEFORMATTING;


    /** The input field source for the data series 1..n 7 */
    "DataSource7"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 7 */
    "XAxisField7"?: string;


    /** Displays the data series 7 */
    "DataField7"?: string;


    /** The label to display in the legends area for data series  7 */
    "DataLabel7"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 7 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle7"?: STATEFORMATTING;


    /** The input field source for the data series 1..n 8 */
    "DataSource8"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 8 */
    "XAxisField8"?: string;


    /** Displays the data series 8 */
    "DataField8"?: string;


    /** The label to display in the legends area for data series  8 */
    "DataLabel8"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 8 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle8"?: STATEFORMATTING;


    /** The input field source for the data series 1..n 9 */
    "DataSource9"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 9 */
    "XAxisField9"?: string;


    /** Displays the data series 9 */
    "DataField9"?: string;


    /** The label to display in the legends area for data series  9 */
    "DataLabel9"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 9 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle9"?: STATEFORMATTING;


    /** The input field source for the data series 1..n 10 */
    "DataSource10"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 10 */
    "XAxisField10"?: string;


    /** Displays the data series 10 */
    "DataField10"?: string;


    /** The label to display in the legends area for data series  10 */
    "DataLabel10"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 10 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle10"?: STATEFORMATTING;


    /** The input field source for the data series 1..n 11 */
    "DataSource11"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 11 */
    "XAxisField11"?: string;


    /** Displays the data series 11 */
    "DataField11"?: string;


    /** The label to display in the legends area for data series  11 */
    "DataLabel11"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 11 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle11"?: STATEFORMATTING;


    /** The input field source for the data series 1..n 12 */
    "DataSource12"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 12 */
    "XAxisField12"?: string;


    /** Displays the data series 12 */
    "DataField12"?: string;


    /** The label to display in the legends area for data series  12 */
    "DataLabel12"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 12 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle12"?: STATEFORMATTING;


    /** The input field source for the data series 1..n 13 */
    "DataSource13"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 13 */
    "XAxisField13"?: string;


    /** Displays the data series 13 */
    "DataField13"?: string;


    /** The label to display in the legends area for data series  13 */
    "DataLabel13"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 13 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle13"?: STATEFORMATTING;


    /** The input field source for the data series 1..n 14 */
    "DataSource14"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 14 */
    "XAxisField14"?: string;


    /** Displays the data series 14 */
    "DataField14"?: string;


    /** The label to display in the legends area for data series  14 */
    "DataLabel14"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 14 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle14"?: STATEFORMATTING;


    /** The input field source for the data series 1..n 15 */
    "DataSource15"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 15 */
    "XAxisField15"?: string;


    /** Displays the data series 15 */
    "DataField15"?: string;


    /** The label to display in the legends area for data series  15 */
    "DataLabel15"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 15 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle15"?: STATEFORMATTING;


    /** The input field source for the data series 1..n 16 */
    "DataSource16"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 16 */
    "XAxisField16"?: string;


    /** Displays the data series 16 */
    "DataField16"?: string;


    /** The label to display in the legends area for data series  16 */
    "DataLabel16"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 16 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle16"?: STATEFORMATTING;


    /** The input field source for the data series 1..n 17 */
    "DataSource17"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 17 */
    "XAxisField17"?: string;


    /** Displays the data series 17 */
    "DataField17"?: string;


    /** The label to display in the legends area for data series  17 */
    "DataLabel17"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 17 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle17"?: STATEFORMATTING;


    /** The input field source for the data series 1..n 18 */
    "DataSource18"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 18 */
    "XAxisField18"?: string;


    /** Displays the data series 18 */
    "DataField18"?: string;


    /** The label to display in the legends area for data series  18 */
    "DataLabel18"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 18 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle18"?: STATEFORMATTING;


    /** The input field source for the data series 1..n 19 */
    "DataSource19"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 19 */
    "XAxisField19"?: string;


    /** Displays the data series 19 */
    "DataField19"?: string;


    /** The label to display in the legends area for data series  19 */
    "DataLabel19"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 19 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle19"?: STATEFORMATTING;


    /** The input field source for the data series 1..n 20 */
    "DataSource20"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 20 */
    "XAxisField20"?: string;


    /** Displays the data series 20 */
    "DataField20"?: string;


    /** The label to display in the legends area for data series  20 */
    "DataLabel20"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 20 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle20"?: STATEFORMATTING;


    /** The input field source for the data series 1..n 21 */
    "DataSource21"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 21 */
    "XAxisField21"?: string;


    /** Displays the data series 21 */
    "DataField21"?: string;


    /** The label to display in the legends area for data series  21 */
    "DataLabel21"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 21 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle21"?: STATEFORMATTING;


    /** The input field source for the data series 1..n 22 */
    "DataSource22"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 22 */
    "XAxisField22"?: string;


    /** Displays the data series 22 */
    "DataField22"?: string;


    /** The label to display in the legends area for data series  22 */
    "DataLabel22"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 22 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle22"?: STATEFORMATTING;


    /** The input field source for the data series 1..n 23 */
    "DataSource23"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 23 */
    "XAxisField23"?: string;


    /** Displays the data series 23 */
    "DataField23"?: string;


    /** The label to display in the legends area for data series  23 */
    "DataLabel23"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 23 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle23"?: STATEFORMATTING;


    /** The input field source for the data series 1..n 24 */
    "DataSource24"?: BindingTarget<INFOTABLE>;


    /** Specifies the Infotable column with the data for the categories to display on the chart 24 */
    "XAxisField24"?: string;


    /** Displays the data series 24 */
    "DataField24"?: string;


    /** The label to display in the legends area for data series  24 */
    "DataLabel24"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 24 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle24"?: STATEFORMATTING;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** Fill the container */
    "FillContainer"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** Triggers an event when a data point on the chart is clicked */
    "SeriesClicked"?: ServiceBindingTarget[];


    /**  */
    "SelectedDataChanged"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcschartpareto<A>
}

/** The binding source properties and services that can be bound on the "Ptcschartpareto" widget. */
declare class UIOutputInterfacePtcschartpareto<A> {
    
    /** Hides the legend area */
    HideLegend: BindingTarget<BOOLEAN>;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** An infotable that contains the selected data on the chart. */
    SelectedData: BindingTarget<INFOTABLE>;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget
}

/** Displays a pareto chart */
declare function Ptcschartpareto<A>(props: UIInputInterfacePtcschartpareto<A>): UIOutputInterfacePtcschartpareto<A>

            
/** The properties and events that can be set or bound on the "Ptcschartschedule" widget. */
declare interface UIInputInterfacePtcschartschedule<A> extends UIBaseInputInterface {
    
    /**  */
    "ShowLegendLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "HideLegendLabel"?: STRING | BindingTarget<STRING>;


    /** Controls the type of button used to show and hide the legend area at run time */
    "ShowHideLegendButtonType"?: STRING<"tertiary" | "transparent">;


    /** Controls the type of button used to reset the chart at run time */
    "ResetButtonType"?: STRING<"tertiary" | "transparent">;


    /** Shows the zoom in and zoom out buttons on the chart toolbar. */
    "ShowZoomButtons"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Disable the widget in the mashup */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Hides the notes area */
    "HideNotes"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Hides the legend area */
    "HideLegend"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Shows a simplified view of the chart vizualization. Enable this property to hide labels, legends, and rulers. */
    "SparkView"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /**  */
    "YShowIntervalAnchor"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets a maximum width for the legend area */
    "LegendMaxWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets a maximum width for the vertical axis */
    "VerticalAxisMaxWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets a maximum height for the horizontal axis */
    "HorizontalAxisMaxHeight"?: NUMBER | BindingTarget<NUMBER>;


    /** The infotable data source for the chart */ 
    "Data"?: BindingTarget<INFOTABLE<A>>;


    /** Controls how many data points a user can select at the same time. Choose multiple to allow a user to select more than one data point. */
    "SelectionMode"?: STRING<"none" | "single" | "multiple"> | BindingTarget<STRING<"none" | "single" | "multiple">>;


    /**  */
    "DateRangeHintText"?: STRING | BindingTarget<STRING>;


    /** Specifies the text label to display for the Schedule Chart */
    "Label"?: STRING | BindingTarget<STRING>;


    /** Enter a custom tooltip to display when a data point is selected. You can show a title, text, data values, and create new lines. Use the following syntax: Add #title# before a string to show a title, #newline# to create a new line, ${<token_name>} to display data from available chart tokens, and ${Data:<infotable_column>} or ${DataSourceN:<infotable_column>} to display values from an infotable column. For example: #title#Chart Tooltip Title#newline#${label}, ${total}#newline#${Data:Column3}. */
    "ValuesTooltip"?: STRING | BindingTarget<STRING>;


    /** Sets the label type for the Schedule Chart */
    "LabelType"?: STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption"> | BindingTarget<STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption">>;


    /** Sets the position of the text label */
    "LabelPosition"?: STRING<"top" | "bottom">;


    /** Aligns the text for the widget label */
    "LabelAlignment"?: STRING;


    /** Select the infotable field that contains the resources to show on the chart */
    "ResourceField"?: FIELDNAME<A>;


    /** Select the infotable field that contains the time data for the chart resources */
    "DataField"?: FIELDNAME<A>;


    /** Enables you to visualize data from multiple sources on the chart */
    "MultipleDataSources"?: BOOLEAN;


    /** Specifies the number of data sources that you can bind to the chart */
    "NumberOfDataSources"?: NUMBER;


    /** Sets the padding from axes. Padding is percentage of bar width */
    "ExternalPadding"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets the padding between the series. Padding is percentage of bar width. */
    "InternalPadding"?: NUMBER | BindingTarget<NUMBER>;


    /** Adds a show/hide button that enables users to show or hide the chart legend at run time. */
    "ShowHideLegend"?: BOOLEAN;


    /**  */
    "StringSelectAll"?: undefined;


    /**  */
    "StringClearAll"?: undefined;


    /** Aligns the legend text. The options that are available to you for this property depend on the setting of the LegendPosition property. */
    "LegendAlignment"?: STRING;


    /** Sets the position of the chart legends */
    "LegendPosition"?: STRING<"top" | "right" | "bottom" | "left">;


    /** Sets the marker shape of the data series legends */
    "LegendMarkerShapes"?: STRING<"none" | "square" | "circle">;


    /** Adds a legend filter that allows the user to filter the chart at runtime */
    "LegendFilter"?: BOOLEAN;


    /** Specifies the text to display within the notes area on the chart. You can enter a string or select a localization token. */
    "Notes"?: STRING | BindingTarget<STRING>;


    /** Sets the position of the notes area */
    "NotesPosition"?: STRING<"top" | "bottom">;


    /** Aligns the text within the notes area */
    "NotesAlignment"?: STRING;


    /** Hides the Resources axis */
    "HideResourcesAxis"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Hides the Time axis */
    "HideTimeAxis"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets the number of labels on the Time axis */
    "NumberOfTimeLabels"?: NUMBER;


    /** Specifies the text label for the Resources axis */
    "ResourcesAxisLabel"?: STRING | BindingTarget<STRING>;


    /** Aligns the label of the Resources axis */
    "ResourcesAxisLabelAlignment"?: STRING<"end" | "center" | "start">;


    /** Aligns the Time axis label */
    "TimeAxisLabelAlignment"?: STRING<"start" | "center" | "end">;


    /** Enter a 'DD-MM-YY' string pattern to set the date and time format for the Time axis. Format strings are case sensitive. You can use formats supported by the Moment.js library. For example, use a 'MMMM D YYYY hh:m A' pattern to format the date and time as 'October 12 1987 09:30 PM'. */
    "TimeAxisDateFormatToken"?: STRING | BindingTarget<STRING>;


    /** Specifies the text label for the Time axis */
    "TimeAxisLabel"?: STRING | BindingTarget<STRING>;


    /** Adds a second time axis to the chart */
    "SecondTimeAxis"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the text label for the second time axis */
    "SecondTimeAxisLabel"?: STRING | BindingTarget<STRING>;


    /** Aligns the label for the second time axis */
    "SecondTimeAxisLabelAlignment"?: STRING<"start" | "center" | "end">;


    /** Enter a 'DD-MM-YY' string pattern to set the date and time format for the secondary Time axis. Format strings are case sensitive. You can use formats supported by the Moment.js library. For example, use a 'MMMM D YYYY hh:m A' pattern to format the date and time as 'October 12 1987 09:30 PM'. */
    "SecondTimeAxisDateFormatToken"?: STRING | BindingTarget<STRING>;


    /** Reverses the order of values on the Resources axis */
    "ReverseResourcesAxis"?: BOOLEAN;


    /** Reverses the order of values on the Time axis */
    "ReverseTimeAxis"?: BOOLEAN;


    /** Enter a value from -180 to 180 to set the rotation angle of labels on the horizontal axis. */
    "HorizontalAxisLabelsRotation"?: NUMBER;


    /** Shows the Resources axis ruler */
    "ShowResourcesAxisRuler"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Shows the Time axis ruler */
    "ShowTimeAxisRuler"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Shows the rulers in front of the data values. By default, rulers are displayed behind the data. */
    "RulersInFront"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets the date and time for the start of the zoom range */
    "StartTime"?: DATETIME | BindingTarget<DATETIME>;


    /** Sets the date and time for the end of the zoom range */
    "EndTime"?: DATETIME | BindingTarget<DATETIME>;


    /** Enables you to zoom in by directly selecting two data items on the chart */
    "DirectSelectionZoom"?: STRING<"none" | "x" | "y" | "xy"> | BindingTarget<STRING<"none" | "x" | "y" | "xy">>;


    /** Enables you to zoom in to a specific part of the chart by drawing a selection box around the data range that you want to view */
    "DragSelectionZoom"?: STRING<"none" | "x" | "y" | "xy"> | BindingTarget<STRING<"none" | "x" | "y" | "xy">>;


    /** Enables zoom in or out for the Time axis */
    "AxisZoom"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Adds controls that enable you to specify a date and time range to zoom to. You can set the range using the StartTime and EndTime properties. */
    "TimeAxisRangeZoom"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the label for start of the range selection */
    "TimeAxisStartZoomLabel"?: STRING | BindingTarget<STRING>;


    /** Specifies the label for end of the range selection */
    "TimeAxisEndZoomLabel"?: STRING | BindingTarget<STRING>;


    /** Adds controls that enable users to zoom in on the Time axis according to specific intervals */
    "TimeAxisIntervalControl"?: STRING<"none" | "dropdown"> | BindingTarget<STRING<"none" | "dropdown">>;


    /** Specifies the label for the interval zoom controls on the Time axis */
    "TimeAxisIntervalControlLabel"?: STRING | BindingTarget<STRING>;


    /** The infotable with the interval control options */
    "TimeAxisIntervalData"?: BindingTarget<INFOTABLE>;


    /** Enables you to select the anchor position of the interval range within the data set. Select Start to place the interval at the start of the data set, or End to place the interval at the end. For example, if you specify a three-month interval in a 12-month data set, you can select Start to show the first three months, or End to show the last three months of the data set. */
    "TimeAxisIntervalAnchorPoint"?: STRING<"start" | "end"> | BindingTarget<STRING<"start" | "end">>;


    /** Specifies the label for the interval anchor point on the Time axis */
    "TimeAxisIntervalAnchorPointLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringStartRangeDate"?: undefined;


    /**  */
    "StringEndRangeDate"?: undefined;


    /** The sequence number of the widget when you press the TAB key */
    "TabSequence"?: NUMBER;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** Specifies the label for the button that resets the charts zooming */
    "LabelReset"?: STRING | BindingTarget<STRING>;


    /**  */
    "UseSampleDataInRuntime"?: BOOLEAN;


    /** Sets the number of reference lines to display on the chart. Reference lines are used to highlight the chart data relative to a specific value. You can add up to 24 lines and configure the label, axis, and value of each line. */
    "NumberOfReferenceLines"?: NUMBER;


    /** The data source for the data series 1 */
    "DataSource1"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 1 */
    "ResourceField1"?: string;


    /** Select the infotable field that contains the time data for the chart resources 1 */
    "DataField1"?: string;


    /** Sets the label text for reference line 1. */
    "ReferenceLine1Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 1 on the selected axis. */
    "ReferenceLine1Value"?: DATETIME | BindingTarget<DATETIME>;


    /** The data source for the data series 2 */
    "DataSource2"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 2 */
    "ResourceField2"?: string;


    /** Select the infotable field that contains the time data for the chart resources 2 */
    "DataField2"?: string;


    /** Sets the label text for reference line 2. */
    "ReferenceLine2Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 2 on the selected axis. */
    "ReferenceLine2Value"?: DATETIME | BindingTarget<DATETIME>;


    /** The data source for the data series 3 */
    "DataSource3"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 3 */
    "ResourceField3"?: string;


    /** Select the infotable field that contains the time data for the chart resources 3 */
    "DataField3"?: string;


    /** Sets the label text for reference line 3. */
    "ReferenceLine3Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 3 on the selected axis. */
    "ReferenceLine3Value"?: DATETIME | BindingTarget<DATETIME>;


    /** The data source for the data series 4 */
    "DataSource4"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 4 */
    "ResourceField4"?: string;


    /** Select the infotable field that contains the time data for the chart resources 4 */
    "DataField4"?: string;


    /** Sets the label text for reference line 4. */
    "ReferenceLine4Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 4 on the selected axis. */
    "ReferenceLine4Value"?: DATETIME | BindingTarget<DATETIME>;


    /** The data source for the data series 5 */
    "DataSource5"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 5 */
    "ResourceField5"?: string;


    /** Select the infotable field that contains the time data for the chart resources 5 */
    "DataField5"?: string;


    /** Sets the label text for reference line 5. */
    "ReferenceLine5Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 5 on the selected axis. */
    "ReferenceLine5Value"?: DATETIME | BindingTarget<DATETIME>;


    /** The data source for the data series 6 */
    "DataSource6"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 6 */
    "ResourceField6"?: string;


    /** Select the infotable field that contains the time data for the chart resources 6 */
    "DataField6"?: string;


    /** Sets the label text for reference line 6. */
    "ReferenceLine6Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 6 on the selected axis. */
    "ReferenceLine6Value"?: DATETIME | BindingTarget<DATETIME>;


    /** The data source for the data series 7 */
    "DataSource7"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 7 */
    "ResourceField7"?: string;


    /** Select the infotable field that contains the time data for the chart resources 7 */
    "DataField7"?: string;


    /** Sets the label text for reference line 7. */
    "ReferenceLine7Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 7 on the selected axis. */
    "ReferenceLine7Value"?: DATETIME | BindingTarget<DATETIME>;


    /** The data source for the data series 8 */
    "DataSource8"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 8 */
    "ResourceField8"?: string;


    /** Select the infotable field that contains the time data for the chart resources 8 */
    "DataField8"?: string;


    /** Sets the label text for reference line 8. */
    "ReferenceLine8Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 8 on the selected axis. */
    "ReferenceLine8Value"?: DATETIME | BindingTarget<DATETIME>;


    /** The data source for the data series 9 */
    "DataSource9"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 9 */
    "ResourceField9"?: string;


    /** Select the infotable field that contains the time data for the chart resources 9 */
    "DataField9"?: string;


    /** Sets the label text for reference line 9. */
    "ReferenceLine9Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 9 on the selected axis. */
    "ReferenceLine9Value"?: DATETIME | BindingTarget<DATETIME>;


    /** The data source for the data series 10 */
    "DataSource10"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 10 */
    "ResourceField10"?: string;


    /** Select the infotable field that contains the time data for the chart resources 10 */
    "DataField10"?: string;


    /** Sets the label text for reference line 10. */
    "ReferenceLine10Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 10 on the selected axis. */
    "ReferenceLine10Value"?: DATETIME | BindingTarget<DATETIME>;


    /** The data source for the data series 11 */
    "DataSource11"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 11 */
    "ResourceField11"?: string;


    /** Select the infotable field that contains the time data for the chart resources 11 */
    "DataField11"?: string;


    /** Sets the label text for reference line 11. */
    "ReferenceLine11Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 11 on the selected axis. */
    "ReferenceLine11Value"?: DATETIME | BindingTarget<DATETIME>;


    /** The data source for the data series 12 */
    "DataSource12"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 12 */
    "ResourceField12"?: string;


    /** Select the infotable field that contains the time data for the chart resources 12 */
    "DataField12"?: string;


    /** Sets the label text for reference line 12. */
    "ReferenceLine12Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 12 on the selected axis. */
    "ReferenceLine12Value"?: DATETIME | BindingTarget<DATETIME>;


    /** The data source for the data series 13 */
    "DataSource13"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 13 */
    "ResourceField13"?: string;


    /** Select the infotable field that contains the time data for the chart resources 13 */
    "DataField13"?: string;


    /** Sets the label text for reference line 13. */
    "ReferenceLine13Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 13 on the selected axis. */
    "ReferenceLine13Value"?: DATETIME | BindingTarget<DATETIME>;


    /** The data source for the data series 14 */
    "DataSource14"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 14 */
    "ResourceField14"?: string;


    /** Select the infotable field that contains the time data for the chart resources 14 */
    "DataField14"?: string;


    /** Sets the label text for reference line 14. */
    "ReferenceLine14Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 14 on the selected axis. */
    "ReferenceLine14Value"?: DATETIME | BindingTarget<DATETIME>;


    /** The data source for the data series 15 */
    "DataSource15"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 15 */
    "ResourceField15"?: string;


    /** Select the infotable field that contains the time data for the chart resources 15 */
    "DataField15"?: string;


    /** Sets the label text for reference line 15. */
    "ReferenceLine15Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 15 on the selected axis. */
    "ReferenceLine15Value"?: DATETIME | BindingTarget<DATETIME>;


    /** The data source for the data series 16 */
    "DataSource16"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 16 */
    "ResourceField16"?: string;


    /** Select the infotable field that contains the time data for the chart resources 16 */
    "DataField16"?: string;


    /** Sets the label text for reference line 16. */
    "ReferenceLine16Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 16 on the selected axis. */
    "ReferenceLine16Value"?: DATETIME | BindingTarget<DATETIME>;


    /** The data source for the data series 17 */
    "DataSource17"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 17 */
    "ResourceField17"?: string;


    /** Select the infotable field that contains the time data for the chart resources 17 */
    "DataField17"?: string;


    /** Sets the label text for reference line 17. */
    "ReferenceLine17Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 17 on the selected axis. */
    "ReferenceLine17Value"?: DATETIME | BindingTarget<DATETIME>;


    /** The data source for the data series 18 */
    "DataSource18"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 18 */
    "ResourceField18"?: string;


    /** Select the infotable field that contains the time data for the chart resources 18 */
    "DataField18"?: string;


    /** Sets the label text for reference line 18. */
    "ReferenceLine18Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 18 on the selected axis. */
    "ReferenceLine18Value"?: DATETIME | BindingTarget<DATETIME>;


    /** The data source for the data series 19 */
    "DataSource19"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 19 */
    "ResourceField19"?: string;


    /** Select the infotable field that contains the time data for the chart resources 19 */
    "DataField19"?: string;


    /** Sets the label text for reference line 19. */
    "ReferenceLine19Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 19 on the selected axis. */
    "ReferenceLine19Value"?: DATETIME | BindingTarget<DATETIME>;


    /** The data source for the data series 20 */
    "DataSource20"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 20 */
    "ResourceField20"?: string;


    /** Select the infotable field that contains the time data for the chart resources 20 */
    "DataField20"?: string;


    /** Sets the label text for reference line 20. */
    "ReferenceLine20Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 20 on the selected axis. */
    "ReferenceLine20Value"?: DATETIME | BindingTarget<DATETIME>;


    /** The data source for the data series 21 */
    "DataSource21"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 21 */
    "ResourceField21"?: string;


    /** Select the infotable field that contains the time data for the chart resources 21 */
    "DataField21"?: string;


    /** Sets the label text for reference line 21. */
    "ReferenceLine21Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 21 on the selected axis. */
    "ReferenceLine21Value"?: DATETIME | BindingTarget<DATETIME>;


    /** The data source for the data series 22 */
    "DataSource22"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 22 */
    "ResourceField22"?: string;


    /** Select the infotable field that contains the time data for the chart resources 22 */
    "DataField22"?: string;


    /** Sets the label text for reference line 22. */
    "ReferenceLine22Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 22 on the selected axis. */
    "ReferenceLine22Value"?: DATETIME | BindingTarget<DATETIME>;


    /** The data source for the data series 23 */
    "DataSource23"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 23 */
    "ResourceField23"?: string;


    /** Select the infotable field that contains the time data for the chart resources 23 */
    "DataField23"?: string;


    /** Sets the label text for reference line 23. */
    "ReferenceLine23Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 23 on the selected axis. */
    "ReferenceLine23Value"?: DATETIME | BindingTarget<DATETIME>;


    /** The data source for the data series 24 */
    "DataSource24"?: BindingTarget<INFOTABLE>;


    /** Select the infotable field that contains the resources to show on the chart 24 */
    "ResourceField24"?: string;


    /** Select the infotable field that contains the time data for the chart resources 24 */
    "DataField24"?: string;


    /** Sets the label text for reference line 24. */
    "ReferenceLine24Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 24 on the selected axis. */
    "ReferenceLine24Value"?: DATETIME | BindingTarget<DATETIME>;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** Fill the container */
    "FillContainer"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** Triggers an event when a data point on the chart is clicked */
    "SeriesClicked"?: ServiceBindingTarget[];


    /**  */
    "SelectedDataChanged"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcschartschedule<A>
}

/** The binding source properties and services that can be bound on the "Ptcschartschedule" widget. */
declare class UIOutputInterfacePtcschartschedule<A> {
    
    /** Hides the legend area */
    HideLegend: BindingTarget<BOOLEAN>;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** An infotable that contains data that is related to the selected tasks on the chart */
    SelectedTasks: BindingTarget<INFOTABLE>;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget
}

/** Displays a Schedule chart */
declare function Ptcschartschedule<A>(props: UIInputInterfacePtcschartschedule<A>): UIOutputInterfacePtcschartschedule<A>

            
/** The properties and events that can be set or bound on the "Ptcschartwaterfall" widget. */
declare interface UIInputInterfacePtcschartwaterfall<A> extends UIBaseInputInterface {
    
    /**  */
    "ShowLegendLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "HideLegendLabel"?: STRING | BindingTarget<STRING>;


    /** Controls the type of button used to show and hide the legend area at run time */
    "ShowHideLegendButtonType"?: STRING<"tertiary" | "transparent">;


    /** Controls the type of button used to reset the chart at run time */
    "ResetButtonType"?: STRING<"tertiary" | "transparent">;


    /** Shows the zoom in and zoom out buttons on the chart toolbar. */
    "ShowZoomButtons"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Hide the connector lines used to highlight the change between each value in the data sequence */
    "HideConnectorLines"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Hides the notes area */
    "HideNotes"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Disable the widget in the mashup */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the text label for the X-axis */
    "XAxisLabel"?: STRING | BindingTarget<STRING>;


    /** Hides the X-axis */
    "HideXAxis"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the text label for the Y-axis */
    "YAxisLabel"?: STRING | BindingTarget<STRING>;


    /** Sets the number of labels on the Y-axis */
    "NumberOfYLabels"?: NUMBER;


    /** Hides the Y-axis */
    "HideYAxis"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Hides the legend */
    "HideLegend"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Shows a simplified view of the chart visualization. Enable this property to hide labels, legends, and rulers. */
    "SparkView"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets a maximum width for the legend area */
    "LegendMaxWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets a maximum width for the vertical axis */
    "VerticalAxisMaxWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets a maximum height for the horizontal axis */
    "HorizontalAxisMaxHeight"?: NUMBER | BindingTarget<NUMBER>;


    /** The infotable data source for the chart */ 
    "Data"?: BindingTarget<INFOTABLE<A>>;


    /** Shows the values labels on the chart */
    "ShowValues"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Controls how many data points a user can select at the same time. Choose multiple to allow a user to select more than one data point. */
    "SelectionMode"?: STRING<"none" | "single" | "multiple"> | BindingTarget<STRING<"none" | "single" | "multiple">>;


    /** Specifies the text label to display for the Waterfall chart */
    "Label"?: STRING | BindingTarget<STRING>;


    /** Enter a custom tooltip to display when a data point is selected. You can show a title, text, data values, and create new lines. Use the following syntax: Add #title# before a string to show a title, #newline# to create a new line, ${<token_name>} to display data from available chart tokens, and ${Data:<infotable_column>} or ${DataSourceN:<infotable_column>} to display values from an infotable column. Add a ${total} token to display the total and enclose the token in #step# to display the total for steps only. For example: #title#Tooltip Title#newline#${label}, ${total}#newline#${Data:Column3}#step#${total} in total#step#. */
    "ValuesTooltip"?: STRING | BindingTarget<STRING>;


    /** Sets the label type for the Waterfall chart */
    "LabelType"?: STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption"> | BindingTarget<STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption">>;


    /** Sets the position of the text label */
    "LabelPosition"?: STRING<"top" | "bottom">;


    /** Aligns the text for the widget label */
    "LabelAlignment"?: STRING;


    /** Specifies the Infotable column with the data for the X-Axis categories to display on the chart */
    "XAxisField"?: FIELDNAME<A>;


    /** Sets the number of data series to display on the chart. By default, the Auto setting displays all series in the infotable data. */
    "NumberOfSeries"?: NUMBER;


    /** Configure the state formatting for all data series on the chart. You can style the series based on data values to spot trends and patterns more easily. To configure formatting rules for each data series, enter a specific value for the NumberOfSeries property. */
    "DataSeriesStyle"?: STATEFORMATTING;


    /** Adds a show/hide button that enables users to show or hide the chart legend at run time. */
    "ShowHideLegend"?: BOOLEAN;


    /**  */
    "StringSelectAll"?: undefined;


    /**  */
    "StringClearAll"?: undefined;


    /** Sets the position of the chart legend */
    "LegendPosition"?: STRING<"top" | "right" | "bottom" | "left">;


    /** Specifies the label for the button that resets the charts zooming */
    "LabelReset"?: STRING | BindingTarget<STRING>;


    /** Specifies the orientation of the chart. You can display the cumulative change along a horizontal or a vertical axis. */
    "Orientation"?: STRING<"vertical" | "horizontal">;


    /** Adds a legend filter that allows the user to filter the chart at runtime */
    "LegendAlignment"?: STRING;


    /** Sets the marker shape of the data series legend */
    "LegendMarkerShapes"?: STRING<"none" | "square" | "circle">;


    /** Adds a legend filter that allows the user to filter the chart at runtime */
    "LegendFilter"?: BOOLEAN;


    /** Specifies the text to display within the notes area on the chart. You can type a string or select a localization token. */
    "Notes"?: STRING | BindingTarget<STRING>;


    /** Sets the position of the notes area */
    "NotesPosition"?: STRING<"top" | "bottom">;


    /** Aligns the text within the notes area */
    "NotesAlignment"?: STRING;


    /** Sets the padding from the axes. The padding value is a percentage of the bar width. */
    "ExternalPadding"?: STRING | BindingTarget<STRING>;


    /** Sets the padding between the series. The padding value is a percentage of the bar width. */
    "InternalPadding"?: STRING | BindingTarget<STRING>;


    /** Alignes the X-axis label */
    "XAxisLabelAlignment"?: STRING;


    /** Aligns the label for the Y-axis */
    "YAxisLabelAlignment"?: STRING;


    /** Sets the format for the Y-axis values */
    "YAxisFormat"?: STRING | BindingTarget<STRING>;


    /** Sets the maximum range for the Y-axis values. By default, the range is automatically calculated based on the widget data. */
    "YAxisMaximumValues"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets the minimum range for the Y-axis values. By default, the range is automatically calculated based on the widget data. */
    "YAxisMinimumValues"?: NUMBER | BindingTarget<NUMBER>;


    /** Shows a second Y axis */
    "ShowSecondYAxis"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the text label for the second Y-axis */
    "SecondYAxisLabel"?: STRING | BindingTarget<STRING>;


    /** Sets the format for the second Y axis values */
    "SecondYAxisFormat"?: STRING | BindingTarget<STRING>;


    /** Aligns the label for the second Y-axis */
    "SecondYAxisLabelAlignment"?: STRING;


    /** Enter a value from -180 to 180 to set the rotation angle of labels on the horizontal axis. */
    "HorizontalAxisLabelsRotation"?: NUMBER;


    /** Shows the X-axis ruler */
    "ShowXAxisRuler"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Shows the Y-axis ruler */
    "ShowYAxisRuler"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Shows the rulers in front of the data values. By default, rulers are displayed behind the data. */
    "RulersInFront"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Shows the zero value ruler */
    "ShowZeroValueRuler"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets the position of the data value labels relative to the data points */
    "ValuesPosition"?: STRING<"outside" | "inside">;


    /** Sets the alignment of the data value labels relative to the chart bars */
    "ValuesAlignment"?: STRING<"end" | "base">;


    /** Enables you to zoom in or out on the horizontal axis */
    "HorizontalZoom"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Adds controls that enable users to specify a value range to zoom to on the horizontal axis */
    "HorizontalRangeZoom"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the text label for start of the range selection */
    "HorizontalStartZoomLabel"?: STRING | BindingTarget<STRING>;


    /** Specifies the text label for end of the range selection */
    "HorizontalEndZoomLabel"?: STRING | BindingTarget<STRING>;


    /** Adds a slider control that enables you to display data between a minimum and a maximum value on the horizontal axis */
    "HorizontalSliderZoom"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the text label for the maximum value of the slider zoom control */
    "HorizontalSliderZoomMaxLabel"?: STRING | BindingTarget<STRING>;


    /** Specifies the text label for the minimum value of the slider zoom control */
    "HorizontalSliderZoomMinLabel"?: STRING | BindingTarget<STRING>;


    /** Enables you to zoom in or out on the vertical axis */
    "VerticalZoom"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Adds a slider control that enables you to display data between a minimum and a maximum value on the vertical axis */
    "VerticalSliderZoom"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specifies the text label for the maximum value of the slider zoom control */
    "VerticalSliderZoomMaxLabel"?: STRING | BindingTarget<STRING>;


    /** Specifies the text label for the minimum value of the slider zoom control */
    "VerticalSliderZoomMinLabel"?: STRING | BindingTarget<STRING>;


    /** Enables you to zoom in by directly selecting two data items on the chart */
    "DirectSelectionZoom"?: STRING<"none" | "xaxis" | "yaxis" | "both"> | BindingTarget<STRING<"none" | "xaxis" | "yaxis" | "both">>;


    /** Enables you to zoom in to a specific part of the chart by drawing a selection box around the data range that you want to view */
    "DragSelectionZoom"?: STRING<"none" | "xaxis" | "yaxis" | "both"> | BindingTarget<STRING<"none" | "xaxis" | "yaxis" | "both">>;


    /** Use True or False values from the Selectable infotable field to control whether users can click to select data on the chart. Each value within the field applies to all data series on the same row. */
    "NonSelectableData"?: BOOLEAN;


    /** Use True or False values under the ShowTotal infotable field to control whether trend values are displayed relative to a full bar or column. When set to True, additions are stacked and substractions overlap the bar or column using a different color. */
    "ShowTotal"?: BOOLEAN;


    /**  */
    "YAxisType"?: STRING;


    /** Highlights trends using different colors when the chart displays data from one series */
    "UseTrendColors"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The sequence number of the widget when you press the TAB key */
    "TabSequence"?: NUMBER;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** Sets the number of reference lines to display on the chart. Reference lines are used to highlight the chart data relative to a specific value. You can add up to 24 lines and configure the label, axis, and value of each line. */
    "NumberOfReferenceLines"?: NUMBER;


    /** Displays the data series 1 */
    "DataField1"?: string;


    /** The label to display in the legends area for data series  1 */
    "DataLabel1"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 1 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle1"?: STATEFORMATTING;


    /** Sets the label text for reference line 1. */
    "ReferenceLine1Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 1 on the selected axis. */
    "ReferenceLine1Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays the data series 2 */
    "DataField2"?: string;


    /** The label to display in the legends area for data series  2 */
    "DataLabel2"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 2 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle2"?: STATEFORMATTING;


    /** Sets the label text for reference line 2. */
    "ReferenceLine2Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 2 on the selected axis. */
    "ReferenceLine2Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays the data series 3 */
    "DataField3"?: string;


    /** The label to display in the legends area for data series  3 */
    "DataLabel3"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 3 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle3"?: STATEFORMATTING;


    /** Sets the label text for reference line 3. */
    "ReferenceLine3Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 3 on the selected axis. */
    "ReferenceLine3Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays the data series 4 */
    "DataField4"?: string;


    /** The label to display in the legends area for data series  4 */
    "DataLabel4"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 4 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle4"?: STATEFORMATTING;


    /** Sets the label text for reference line 4. */
    "ReferenceLine4Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 4 on the selected axis. */
    "ReferenceLine4Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays the data series 5 */
    "DataField5"?: string;


    /** The label to display in the legends area for data series  5 */
    "DataLabel5"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 5 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle5"?: STATEFORMATTING;


    /** Sets the label text for reference line 5. */
    "ReferenceLine5Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 5 on the selected axis. */
    "ReferenceLine5Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays the data series 6 */
    "DataField6"?: string;


    /** The label to display in the legends area for data series  6 */
    "DataLabel6"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 6 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle6"?: STATEFORMATTING;


    /** Sets the label text for reference line 6. */
    "ReferenceLine6Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 6 on the selected axis. */
    "ReferenceLine6Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays the data series 7 */
    "DataField7"?: string;


    /** The label to display in the legends area for data series  7 */
    "DataLabel7"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 7 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle7"?: STATEFORMATTING;


    /** Sets the label text for reference line 7. */
    "ReferenceLine7Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 7 on the selected axis. */
    "ReferenceLine7Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays the data series 8 */
    "DataField8"?: string;


    /** The label to display in the legends area for data series  8 */
    "DataLabel8"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 8 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle8"?: STATEFORMATTING;


    /** Sets the label text for reference line 8. */
    "ReferenceLine8Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 8 on the selected axis. */
    "ReferenceLine8Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays the data series 9 */
    "DataField9"?: string;


    /** The label to display in the legends area for data series  9 */
    "DataLabel9"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 9 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle9"?: STATEFORMATTING;


    /** Sets the label text for reference line 9. */
    "ReferenceLine9Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 9 on the selected axis. */
    "ReferenceLine9Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays the data series 10 */
    "DataField10"?: string;


    /** The label to display in the legends area for data series  10 */
    "DataLabel10"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 10 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle10"?: STATEFORMATTING;


    /** Sets the label text for reference line 10. */
    "ReferenceLine10Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 10 on the selected axis. */
    "ReferenceLine10Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays the data series 11 */
    "DataField11"?: string;


    /** The label to display in the legends area for data series  11 */
    "DataLabel11"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 11 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle11"?: STATEFORMATTING;


    /** Sets the label text for reference line 11. */
    "ReferenceLine11Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 11 on the selected axis. */
    "ReferenceLine11Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays the data series 12 */
    "DataField12"?: string;


    /** The label to display in the legends area for data series  12 */
    "DataLabel12"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 12 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle12"?: STATEFORMATTING;


    /** Sets the label text for reference line 12. */
    "ReferenceLine12Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 12 on the selected axis. */
    "ReferenceLine12Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays the data series 13 */
    "DataField13"?: string;


    /** The label to display in the legends area for data series  13 */
    "DataLabel13"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 13 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle13"?: STATEFORMATTING;


    /** Sets the label text for reference line 13. */
    "ReferenceLine13Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 13 on the selected axis. */
    "ReferenceLine13Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays the data series 14 */
    "DataField14"?: string;


    /** The label to display in the legends area for data series  14 */
    "DataLabel14"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 14 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle14"?: STATEFORMATTING;


    /** Sets the label text for reference line 14. */
    "ReferenceLine14Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 14 on the selected axis. */
    "ReferenceLine14Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays the data series 15 */
    "DataField15"?: string;


    /** The label to display in the legends area for data series  15 */
    "DataLabel15"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 15 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle15"?: STATEFORMATTING;


    /** Sets the label text for reference line 15. */
    "ReferenceLine15Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 15 on the selected axis. */
    "ReferenceLine15Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays the data series 16 */
    "DataField16"?: string;


    /** The label to display in the legends area for data series  16 */
    "DataLabel16"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 16 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle16"?: STATEFORMATTING;


    /** Sets the label text for reference line 16. */
    "ReferenceLine16Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 16 on the selected axis. */
    "ReferenceLine16Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays the data series 17 */
    "DataField17"?: string;


    /** The label to display in the legends area for data series  17 */
    "DataLabel17"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 17 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle17"?: STATEFORMATTING;


    /** Sets the label text for reference line 17. */
    "ReferenceLine17Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 17 on the selected axis. */
    "ReferenceLine17Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays the data series 18 */
    "DataField18"?: string;


    /** The label to display in the legends area for data series  18 */
    "DataLabel18"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 18 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle18"?: STATEFORMATTING;


    /** Sets the label text for reference line 18. */
    "ReferenceLine18Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 18 on the selected axis. */
    "ReferenceLine18Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays the data series 19 */
    "DataField19"?: string;


    /** The label to display in the legends area for data series  19 */
    "DataLabel19"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 19 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle19"?: STATEFORMATTING;


    /** Sets the label text for reference line 19. */
    "ReferenceLine19Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 19 on the selected axis. */
    "ReferenceLine19Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays the data series 20 */
    "DataField20"?: string;


    /** The label to display in the legends area for data series  20 */
    "DataLabel20"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 20 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle20"?: STATEFORMATTING;


    /** Sets the label text for reference line 20. */
    "ReferenceLine20Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 20 on the selected axis. */
    "ReferenceLine20Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays the data series 21 */
    "DataField21"?: string;


    /** The label to display in the legends area for data series  21 */
    "DataLabel21"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 21 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle21"?: STATEFORMATTING;


    /** Sets the label text for reference line 21. */
    "ReferenceLine21Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 21 on the selected axis. */
    "ReferenceLine21Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays the data series 22 */
    "DataField22"?: string;


    /** The label to display in the legends area for data series  22 */
    "DataLabel22"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 22 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle22"?: STATEFORMATTING;


    /** Sets the label text for reference line 22. */
    "ReferenceLine22Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 22 on the selected axis. */
    "ReferenceLine22Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays the data series 23 */
    "DataField23"?: string;


    /** The label to display in the legends area for data series  23 */
    "DataLabel23"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 23 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle23"?: STATEFORMATTING;


    /** Sets the label text for reference line 23. */
    "ReferenceLine23Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 23 on the selected axis. */
    "ReferenceLine23Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays the data series 24 */
    "DataField24"?: string;


    /** The label to display in the legends area for data series  24 */
    "DataLabel24"?: STRING | BindingTarget<STRING>;


    /** Configure the state formatting for data series 24 on the chart. You can style the series based on data values to spot trends and patterns more easily. */
    "DataSeriesStyle24"?: STATEFORMATTING;


    /** Sets the label text for reference line 24. */
    "ReferenceLine24Label"?: STRING | BindingTarget<STRING>;


    /** Sets the value to use for the position of reference line 24 on the selected axis. */
    "ReferenceLine24Value"?: NUMBER | BindingTarget<NUMBER>;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** Fill the container */
    "FillContainer"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** Triggers an event when a data point on the chart is clicked */
    "SeriesClicked"?: ServiceBindingTarget[];


    /**  */
    "SelectedDataChanged"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcschartwaterfall<A>
}

/** The binding source properties and services that can be bound on the "Ptcschartwaterfall" widget. */
declare class UIOutputInterfacePtcschartwaterfall<A> {
    
    /** Hides the legend */
    HideLegend: BindingTarget<BOOLEAN>;


    /** An infotable that contains the selected data on the chart. */
    SelectedData: BindingTarget<INFOTABLE>;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget
}

/** Enables you to visualize cumulative change as values are added to or substracted from an initial value. Each increase or decrease is colored to highlight a positive or a negative change. */
declare function Ptcschartwaterfall<A>(props: UIInputInterfacePtcschartwaterfall<A>): UIOutputInterfacePtcschartwaterfall<A>

            
/** The properties and events that can be set or bound on the "Ptcscheckbox" widget. */
declare interface UIInputInterfacePtcscheckbox extends UIBaseInputInterface {
    
    /** Enables you to set the state of the checkbox widget, as selected or not selected */
    "State"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Use this property to disable the checkbox widget in the mashup */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets an icon image for the tooltip of the Checkbox widget */
    "TooltipIcon"?: IMAGELINK;


    /** Select an SVG icon to display within the status message when the validation succeeds */
    "ValidationSuccessIcon"?: IMAGELINK;


    /** Select an SVG icon to display within the hint message for the validation criteria */
    "ValidationCriteriaIcon"?: IMAGELINK;


    /** The text that is displayed in the checkbox */
    "Label"?: STRING | BindingTarget<STRING>;


    /** The message to display when a check box selection is required */
    "RequiredMessage"?: STRING | BindingTarget<STRING>;


    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Enables you to have a parent checkbox in a partial state, when it’s child checkboxes are in a mix of selected and not selected states */
    "PartialState"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Enables you to set a maximum width and display a truncated label */
    "LabelMaxWidth"?: NUMBER;


    /** The width of the widget. The width is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed width size */
    "Width"?: NUMBER;


    /** The height of the widget. The height is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed height size */
    "Height"?: NUMBER;


    /** The sequence number of the radio button widget when you press tab */
    "TabSequence"?: NUMBER;


    /** Displays a tooltip text when you hover over the Checkbox widget */
    "TooltipField"?: STRING | BindingTarget<STRING>;


    /** A bindable property that sets the validation state. You can set this property to undefined, unvalidated, valid, or invalid. */
    "ValidationState"?: STRING<"undefined" | "unvalidated" | "valid" | "invalid"> | BindingTarget<STRING<"undefined" | "unvalidated" | "valid" | "invalid">>;


    /** Require the check box to be selected */
    "TrueRequired"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Show a success message when the validation is successful */
    "ShowValidationSuccess"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Show a failure message when the validation fails */
    "ShowValidationFailure"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Select an SVG icon to display within the status message when the validation fails */
    "ValidationFailureIcon"?: IMAGELINK;


    /** Show a hint message about the required input for check box */
    "ShowValidationCriteria"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The message to display when the validation is successful */
    "SuccessMessage"?: STRING | BindingTarget<STRING>;


    /** A secondary message that displays more information about the validation success message */
    "SuccessMessageDetails"?: STRING | BindingTarget<STRING>;


    /** The message to display for the validation criteria and when the validation fails */
    "CriteriaMessage"?: STRING | BindingTarget<STRING>;


    /** The details to display for the validation criteria and failure message */
    "CriteriaMessageDetails"?: STRING | BindingTarget<STRING>;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** A bindable event triggered when the data for this widget is modified */
    "Changed"?: ServiceBindingTarget[];


    /** An event that triggers when the widget value is changed. Bind this event to service or function to apply a validation expression */
    "Validate"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcscheckbox
}

/** The binding source properties and services that can be bound on the "Ptcscheckbox" widget. */
declare class UIOutputInterfacePtcscheckbox {
    
    /** Enables you to set the state of the checkbox widget, as selected or not selected */
    State: BindingTarget<BOOLEAN>;


    /** A bindable property used to retrieve the output of the widget validation. Returned values are undefined, unvalidated, valid, or invalid. */
    ValidationOutput: BindingTarget<STRING>;


    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    CustomClass: BindingTarget<STRING>;


    /** Enables you to have a parent checkbox in a partial state, when it’s child checkboxes are in a mix of selected and not selected states */
    PartialState: BindingTarget<BOOLEAN>;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget
}

/** Enables you to select a checkbox and choose a particular option */
declare function Ptcscheckbox(props: UIInputInterfacePtcscheckbox): UIOutputInterfacePtcscheckbox

            
/** The properties and events that can be set or bound on the "Ptcschipdatafilter" widget. */
declare interface UIInputInterfacePtcschipdatafilter extends UIBaseInputInterface {
    
    /** A bindable property for the JSON query used to retrieve the filtered data set. */
    "Query"?: BindingTarget<QUERY>;


    /** Bind an infotable that contains data for the chip items to display in the drop-down filter. */
    "Data"?: BindingTarget<INFOTABLE>;


    /** The text that is displayed above the drop-down list for the filter categories. */
    "CategoryLabel"?: STRING | BindingTarget<STRING>;


    /** The text that is displayed above the drop-down list for the filter condition. */
    "ConditionLabel"?: STRING | BindingTarget<STRING>;


    /** The text that is displayed above the box which contains the value for the condition. */
    "ValueLabel"?: STRING | BindingTarget<STRING>;


    /** The text displayed above the first input box when filtering a range of values. */
    "RangeStartValueLabel"?: STRING | BindingTarget<STRING>;


    /** The text displayed above the second input box when filtering a range of values. */
    "RangeEndValueLabel"?: STRING | BindingTarget<STRING>;


    /** The text displayed above the drop-down list that is used to set the units when filtering by location or date. */
    "UnitsLabel"?: STRING | BindingTarget<STRING>;


    /** The text displayed above the input box for latitude when filtering by location. */
    "LatitudeLabel"?: STRING | BindingTarget<STRING>;


    /** The text displayed above the input box for longitude when filtering by location. */
    "LongitudeLabel"?: STRING | BindingTarget<STRING>;


    /** Bind an infotable that contains datetime data for days with generated data values. A dot indicator is displayed on the calendar for each day with data. */
    "DaysContainingData"?: BindingTarget<INFOTABLE>;


    /** Localize the date format using a "DD-MM-YY" pattern. You can use formats supported by the Moment.js library. The format is case sensitive and overrides the DateOrder property. */
    "FormatToken"?: STRING;


    /** Enables you to set the format of the date display */
    "DateOrder"?: STRING<"auto" | "DMY" | "MDY" | "YMD">;


    /**  */
    "ColumnFormat"?: STRING;


    /** Sorts the list of data filters in alphabetical order. To sort the data filters manually, disable this property, then rearrange the the filters in the widget configuration dialog box. */
    "SortFilters"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets the maximum allowed width for the widget. You can use this property to constrain the space used by the widget inside a container. The value of this property is reset when you specify a fixed width for the widget. */
    "MaxWidth"?: NUMBER;


    /** Adds a link that enables users to show and hide filters that are added to the widget. */
    "ShowAndHideFilters"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Shows a drop-down list that enables users to combine multiple filters using “or” and “and” logical operators. */
    "ShowAndOrOperator"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /**  */
    "StringAdd"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringAddFilter"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringAddValue"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringAfter"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringAfterEq"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringAll"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringAnd"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringApply"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringBefore"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringBeforeEq"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringBetween"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringCancel"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringSelect"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringContains"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringDate"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringDays"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringDoneLabelButton"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringEndsWith"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringEquals"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringExact"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringFalse"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringFilter"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringFilterBy"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringFilters"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringFrom"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringHideFilters"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringHours"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringHoursCap"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringJoinedBy"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringKilometers"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringLatitude"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringLongitude"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringMiles"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringMinuts"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringMinutsCap"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringMonths"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringNauticalMiles"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringNot"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringNotContains"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringNotEquals"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringNotEndsWith"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringNotStartsWith"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringNotWithin"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringOr"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringOutside"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringPleaseSelectDate"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringSeconds"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringSecondsCap"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringSelectFilterFirst"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringShowFilters"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringStartsWith"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringStartTime"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringTo"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringToDate"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringToday"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringEndTime"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringTrue"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringUnits"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringValue1"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringValue2"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringValue"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringWeeks"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringWithin"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringWithinLast"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringYears"?: STRING | BindingTarget<STRING>;


    /** Adds a filter box to the drop-down list for the categories. You can type text to apply a filter, which makes it easier to select items from a long list. */
    "ShowCategoryListFilter"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The height of the widget. The height is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed height size */
    "Height"?: NUMBER;


    /** The label to display above the field used to select the start of the time range. */
    "TimeRangeStartLabel"?: STRING | BindingTarget<STRING>;


    /** The label to display above the field used to select the end of the time range. */
    "TimeRangeEndLabel"?: STRING | BindingTarget<STRING>;


    /** The width of the widget. The width is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed width size */
    "Width"?: NUMBER;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringCondition"?: undefined;


    /** The sequence number of the Date Picker widget when you press tab */
    "TabSequence"?: NUMBER;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** Fill the container */
    "FillContainer"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** A bindable service that clears any applied filters at run time. */
    "QueryChanged"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcschipdatafilter
}

/** The binding source properties and services that can be bound on the "Ptcschipdatafilter" widget. */
declare class UIOutputInterfacePtcschipdatafilter {
    
    /** A bindable property for the JSON query used to retrieve the filtered data set. */
    Query: BindingTarget<QUERY>;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** tw.chip-data-filter-ide.ptcs-services.reset-to-default-value.description */
    ClearFilters: ServiceBindingTarget
}

/** Enables you to query and filter a large data set using chip-based filters. */
declare function Ptcschipdatafilter(props: UIInputInterfacePtcschipdatafilter): UIOutputInterfacePtcschipdatafilter

            
/** The properties and events that can be set or bound on the "Ptcsconfirmation" widget. */
declare interface UIInputInterfacePtcsconfirmation extends UIBaseInputInterface {
    
    /** Enter a title for the confirmation dialog */
    "TitleText"?: STRING | BindingTarget<STRING>;


    /** Enter a message for the confirmation dialog */
    "MessageText"?: STRING | BindingTarget<STRING>;


    /** Display a close button in the confirmation dialog */
    "DisplayCloseButton"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Display a second action button in the confirmation dialog */
    "DisplaySecondaryAction"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Displays a tooltip text when you hover over the action button */
    "ActionButtonTooltipField"?: STRING;


    /**  */
    "ActionButtonTooltipIcon"?: IMAGELINK | BindingTarget<IMAGELINK>;


    /** Displays a tooltip text when you hover over the second button */
    "SecondButtonTooltipField"?: STRING;


    /**  */
    "SecondButtonTooltipIcon"?: IMAGELINK | BindingTarget<IMAGELINK>;


    /** close */
    "CloseButtonTooltipField"?: STRING;


    /** Displays a tooltip text when you hover over the cancel button */
    "CancelButtonTooltipField"?: STRING;


    /**  */
    "CancelButtonTooltipIcon"?: IMAGELINK | BindingTarget<IMAGELINK>;


    /** Set a fixed width for the confirmation dialog */
    "DialogWidth"?: undefined;


    /** Set a fixed height for the confirmation dialog */
    "DialogHeight"?: undefined;


    /** Set the position of the action button in the dialog */
    "ActionButtonPosition"?: undefined;


    /** Select the type of the action button */
    "ActionButtonType"?: undefined;


    /** Add text to display on the cancel button */
    "CancelButtonLabel"?: STRING;


    /**  */
    "CancelButtonIcon"?: IMAGELINK;


    /** Add text to display on the action button */
    "ActionButtonLabel"?: STRING;


    /**  */
    "ActionButtonIcon"?: IMAGELINK;


    /** Add text to display on the second action button */
    "SecondButtonLabel"?: STRING;


    /**  */
    "SecondButtonIcon"?: IMAGELINK;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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
    "ActionClick"?: ServiceBindingTarget[];


    /**  */
    "SecondActionClick"?: ServiceBindingTarget[];


    /**  */
    "CancelClick"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcsconfirmation
}

/** The binding source properties and services that can be bound on the "Ptcsconfirmation" widget. */
declare class UIOutputInterfacePtcsconfirmation {
    
    /**  */
    OpenConfirmation: ServiceBindingTarget
}

/**  */
declare function Ptcsconfirmation(props: UIInputInterfacePtcsconfirmation): UIOutputInterfacePtcsconfirmation

            
/** The properties and events that can be set or bound on the "Ptcsdatepicker" widget. */
declare interface UIInputInterfacePtcsdatepicker extends UIBaseInputInterface {
    
    /** Sets an icon image for the tooltip of the Date Time Picker widget */
    "TooltipIcon"?: IMAGELINK;


    /** Select an SVG icon to display within the status message when the validation succeeds */
    "ValidationSuccessIcon"?: IMAGELINK;


    /** Select SVG icon to display within the hint message for the validation criteria */
    "ValidationCriteriaIcon"?: IMAGELINK;


    /** Use this property to disable the widget in the mashup */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Disable the highlight format while typing. */
    "DisableMaskedInput"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Date and Time value of the date for the date time picker */
    "DateTime"?: BindingTarget<DATETIME>;


    /**  */
    "SelectLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "CancelLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "MonthLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "YearLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "HoursLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "MinutesLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "SecondsLabel"?: STRING | BindingTarget<STRING>;


    /** The text that is displayed in the label of Date Time Picker widget */
    "Label"?: STRING | BindingTarget<STRING>;


    /** Enables you to align the label */
    "LabelAlignment"?: STRING<"left" | "center" | "right"> | BindingTarget<STRING<"left" | "center" | "right">>;


    /** Specifies the label to display for the date box. */
    "DateLabel"?: STRING | BindingTarget<STRING>;


    /** Specifies the label to display for the time box. */
    "TimeLabel"?: STRING | BindingTarget<STRING>;


    /** Specifies the label to display for the start time field on the pop-up calendar. */
    "CalendarStartTimeLabel"?: STRING | BindingTarget<STRING>;


    /** Specifies the label to display for the end time field on the pop-up calendar. */
    "CalendarEndTimeLabel"?: STRING | BindingTarget<STRING>;


    /** Displays a hint of what needs to be entered in the field. It acts like a placeholder */
    "HintText"?: STRING | BindingTarget<STRING>;


    /** The hint text to display for the time box. */
    "TimeHintText"?: STRING | BindingTarget<STRING>;


    /** The hint text to display for the start time box. */
    "StartTimeHintText"?: STRING | BindingTarget<STRING>;


    /** The hint text to display for the end time box. */
    "EndTimeHintText"?: STRING | BindingTarget<STRING>;


    /** Show AM/PM time indication. */
    "TwelveHourClock"?: BOOLEAN;


    /** Enables you to display the time with seconds */
    "DisplaySeconds"?: BOOLEAN;


    /** Enables you to set a character that is separating the day, month and year */
    "DateDelimiter"?: STRING;


    /** Enables you to display month in either full, short , or numeric format */
    "MonthFormat"?: STRING<"full" | "short" | "numeric">;


    /** Sets the date format to display for the date field. You can select an order for the day, month, and year. Select 'Auto' to use the system format. */
    "DateOrder"?: STRING<"auto" | "DMY" | "MDY" | "YMD">;


    /** Localize the date format using a "DD-MM-YY" pattern. You can use formats supported by the Moment.js library. The format is case sensitive and overrides the DateDelimiter, DateOrder, and MonthFormat properties. */
    "FormatToken"?: STRING;


    /** Enables you to set an interval type */
    "IntervalType"?: STRING<"h" | "m" | "s" | "d">;


    /** Enables you to set an initial interval */
    "Interval"?: NUMBER;


    /** Enables you to set a range of years that are displayed in the dropdown list. This property value is ignored when the minimum and maximum dates are set. */
    "YearRange"?: NUMBER;


    /** Sets the minimum date available for the date range selection */
    "MinStartDate"?: DATETIME | BindingTarget<DATETIME>;


    /** The message to display when the selected start date is earlier than the specified minimum */
    "MinStartDateFailureMessage"?: STRING | BindingTarget<STRING>;


    /** Sets the maximum date available for the start date when selecting a date range */
    "MaxStartDate"?: DATETIME | BindingTarget<DATETIME>;


    /** The message to display when the selected start date is later than specified maximum */
    "MaxStartDateFailureMessage"?: STRING | BindingTarget<STRING>;


    /** Sets the minimum date available for the end date when selecting a date range */
    "MinEndDate"?: DATETIME | BindingTarget<DATETIME>;


    /** The message to display when the selected end date is earlier than specified minimum */
    "MinEndDateFailureMessage"?: STRING | BindingTarget<STRING>;


    /** Sets the maximum date available for the date range selection */
    "MaxEndDate"?: DATETIME | BindingTarget<DATETIME>;


    /** The message to display when the selected end date is later than specified maximum */
    "MaxEndDateFailureMessage"?: STRING | BindingTarget<STRING>;


    /** The message to display when a required value is missing */
    "RequiredMessage"?: STRING | BindingTarget<STRING>;


    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The sequence number of the Date Picker widget when you press tab */
    "TabSequence"?: NUMBER;


    /**  */
    "UpdatedAfterRefactor"?: BOOLEAN;


    /** Specifies the label to display for the AM/PM drop-down list when using a 12-hour time format. */
    "AMPMLabel"?: STRING | BindingTarget<STRING>;


    /** The hint text to display for the start date box. */
    "StartDateHintText"?: STRING | BindingTarget<STRING>;


    /** The hint text to display for the end date box. */
    "EndDateHintText"?: STRING | BindingTarget<STRING>;


    /** Specifies the label to display for the start date field. */
    "StartDateLabel"?: STRING | BindingTarget<STRING>;


    /** Specifies the label to display for the start time box. */
    "StartTimeLabel"?: STRING | BindingTarget<STRING>;


    /** Specifies the label to display for the end date field. */
    "EndDateLabel"?: STRING | BindingTarget<STRING>;


    /** Specifies the label to display for the end time box. */
    "EndTimeLabel"?: STRING | BindingTarget<STRING>;


    /** Enables you to set the weekly calendar to start with Sunday or Monday */
    "WeeklyCalendarStart"?: STRING<"monday" | "sunday">;


    /** Enables you to display only the date */
    "DateOnly"?: BOOLEAN;


    /** Enables you to specify a date range by selecting a start and an end date. You cannot specify a time value when range selection is enabled. */
    "DateRange"?: BOOLEAN;


    /** Enables you to set the DateTime property with current date and time. If not selected, you must enter the date and time */
    "InitializeWithCurrentDateTime"?: BOOLEAN;


    /** Enables you to set an icon for the calendar in the Date Time Picker widget. */
    "DateTimeIcon"?: IMAGELINK;


    /** A bindable property that sets the value of the start date for the date range. The value must be smaller than or equal to the EndDate. */
    "StartDate"?: BindingTarget<DATETIME>;


    /** A bindable property that sets the value of the end date for the date range. The value must be larger than or equal to the StartDate. */
    "EndDate"?: BindingTarget<DATETIME>;


    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget. The height is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed height size */
    "Height"?: NUMBER;


    /**  */
    "DoneLabel"?: undefined;


    /** Displays a tooltip text when you hover over the Date Time Picker widget */
    "TooltipField"?: STRING | BindingTarget<STRING>;


    /** A bindable property that sets the validation state. You can set this property to undefined, unvalidated, valid, or invalid. */
    "ValidationState"?: STRING<"undefined" | "unvalidated" | "valid" | "invalid"> | BindingTarget<STRING<"undefined" | "unvalidated" | "valid" | "invalid">>;


    /** Show a success message when the selected date validation succeeds */
    "ShowValidationSuccess"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Show a failure message when the selected date fails the validation */
    "ShowValidationFailure"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Select an SVG icon to display within the status message when the validation fails */
    "ValidationFailureIcon"?: IMAGELINK;


    /** Show a hint message about the required date selection */
    "ShowValidationCriteria"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The message to display when the selected date is valid */
    "SuccessMessage"?: STRING | BindingTarget<STRING>;


    /** A secondary message that displays more information about the validation success message */
    "SuccessMessageDetails"?: STRING | BindingTarget<STRING>;


    /** tw.datetimepicker-ide.ptcs-properties.criteria-message */
    "CriteriaMessage"?: STRING | BindingTarget<STRING>;


    /** tw.datetimepicker-ide.ptcs-properties.criteria-message-details */
    "CriteriaMessageDetails"?: STRING | BindingTarget<STRING>;


    /** Require a value in the date time picker */
    "ValueRequired"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets the minimum date available for the date selection */
    "MinDate"?: DATETIME | BindingTarget<DATETIME>;


    /** The message to display when the selected date is earlier than the MinDate value */
    "MinDateFailureMessage"?: STRING | BindingTarget<STRING>;


    /** Sets the maximum date available for the date selection */
    "MaxDate"?: DATETIME | BindingTarget<DATETIME>;


    /** The message to display when the selected date is later than the MaxDate value */
    "MaxDateFailureMessage"?: STRING | BindingTarget<STRING>;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** A bindable event triggered when the data for this widget is modified */
    "Changed"?: ServiceBindingTarget[];


    /** A bindable event that triggers when the start date or end date value is modified */
    "RangeChanged"?: ServiceBindingTarget[];


    /** An event that triggers when the widget value is changed. Bind this event to service or function to apply a validation expression. */
    "Validate"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcsdatepicker
}

/** The binding source properties and services that can be bound on the "Ptcsdatepicker" widget. */
declare class UIOutputInterfacePtcsdatepicker {
    
    /** A bindable property used to retrieve the output of the widget validation. Returned values are undefined, unvalidated, valid, or invalid. */
    ValidationOutput: BindingTarget<STRING>;


    /** Date and Time value of the date for the date time picker */
    DateTime: BindingTarget<DATETIME>;


    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    CustomClass: BindingTarget<STRING>;


    /** Date and Time value of the date for the date time picker */
    FormattedDateTime: BindingTarget<STRING>;


    /** A bindable property that sets the value of the start date for the date range. The value must be smaller than or equal to the EndDate. */
    StartDate: BindingTarget<DATETIME>;


    /** A bindable property that sets the value of the end date for the date range. The value must be larger than or equal to the StartDate. */
    EndDate: BindingTarget<DATETIME>;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget
}

/** Enables you to set a date and time */
declare function Ptcsdatepicker(props: UIInputInterfacePtcsdatepicker): UIOutputInterfacePtcsdatepicker

            
/** The properties and events that can be set or bound on the "Ptcsdivider" widget. */
declare interface UIInputInterfacePtcsdivider extends UIBaseInputInterface {
    
    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** The width of the widget */
    "Width"?: NUMBER;


    /** Change the divider orientation to vertical */
    "VerticalDivider"?: BOOLEAN;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** Fill the container */
    "FillContainer"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    ref?: UIOutputInterfacePtcsdivider
}

/** The binding source properties and services that can be bound on the "Ptcsdivider" widget. */
declare class UIOutputInterfacePtcsdivider {
    
    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    CustomClass: BindingTarget<STRING>
}

/** Drawing tool for dividers */
declare function Ptcsdivider(props: UIInputInterfacePtcsdivider): UIOutputInterfacePtcsdivider

            
/** The properties and events that can be set or bound on the "Ptcsdropdown" widget. */
declare interface UIInputInterfacePtcsdropdown<A> extends UIBaseInputInterface {
    
    /** Sets an icon image for the tooltip of the dropdown widget */
    "TooltipIcon"?: IMAGELINK;


    /** Select an SVG icon to display within the status message when the validation succeeds. */
    "ValidationSuccessIcon"?: IMAGELINK;


    /** Select an SVG icon to display within the hint message for the validation criteria. */
    "ValidationCriteriaIcon"?: IMAGELINK;


    /** The infotable source of selected items in the list */
    "SelectedItems"?: BindingTarget<INFOTABLE>;


    /** Displays a hint of what needs to be entered in the field. It acts like a placeholder */
    "HintText"?: STRING | BindingTarget<STRING>;


    /** Displays a hint text for the list filter */
    "FilterHintText"?: STRING | BindingTarget<STRING>;


    /** Enter a custom label for the blank selection item in the drop-down list. Set to '(None)' */
    "ClearSelectionLabel"?: STRING | BindingTarget<STRING>;


    /** Add a blank selection item to the drop-down list. Enables users to clear a selection. */
    "ClearSelectionItem"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The text that is displayed in the label */
    "Label"?: STRING | BindingTarget<STRING>;


    /** Enables you to align the label */
    "LabelAlignment"?: STRING<"left" | "center" | "right"> | BindingTarget<STRING<"left" | "center" | "right">>;


    /** Enables you to align the text items in the dropdown list */
    "Alignment"?: STRING<"left" | "center" | "right"> | BindingTarget<STRING<"left" | "center" | "right">>;


    /** Use this property to disable the widget in the mashup */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Enables you to select multiple items in the dropdown list */
    "MultiSelect"?: BOOLEAN;


    /** Enables you to automatically select the first row in the dropdown list */
    "AutoSelectFirstRow"?: BOOLEAN;


    /** Enables you to set the row height for the single line */
    "RowHeight"?: NUMBER | BindingTarget<NUMBER>;


    /**  */
    "SelectAllLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "ClearSelectedItemsLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "AllLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "SelectedLabel"?: STRING | BindingTarget<STRING>;


    /** Sets the space between the box and the drop-down list */
    "ListMarginTop"?: NUMBER;


    /** The message to display when a list item is not selected. */
    "RequiredMessage"?: STRING | BindingTarget<STRING>;


    /** Enables you to define the CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The sequence number of the Dropdown widget when you press tab */
    "TabSequence"?: NUMBER;


    /** The infotable source */ 
    "Data"?: BindingTarget<INFOTABLE<A>>;


    /** The infotable field that represents the data value */
    "DisplayField"?: FIELDNAME<A>;


    /** The field that is used for SelectedText */
    "ValueField"?: FIELDNAME<A>;


    /** The infotable field that represents the state of the line item, can be enabled or disabled */
    "StateField"?: FIELDNAME<A>;


    /** Displays a tooltip text when you hover over the dropdown */
    "TooltipField"?: STRING | BindingTarget<STRING>;


    /** Enables you to select an item in the list */
    "SelectedText"?: STRING | BindingTarget<STRING>;


    /** List Renderer and State formatter to format the rows in the dropdown list */
    "ListFormat"?: RENDERERWITHSTATE;


    /** The height of the widget. The height is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed height size */
    "Height"?: NUMBER;


    /** Enables you to set a maximum height for the list that opens in the dropdown */
    "ListMaxHeight"?: NUMBER | BindingTarget<NUMBER>;


    /** The width of the widget */
    "Width"?: NUMBER;


    /** Enables you to add a filter inside the list and allows you to filter the list items at runtime */
    "ShowListFilter"?: BOOLEAN;


    /** A bindable property that sets the validation state. You can set this property to undefined, unvalidated, valid, or invalid. */
    "ValidationState"?: STRING<"undefined" | "invalid" | "unvalidated" | "valid"> | BindingTarget<STRING<"undefined" | "invalid" | "unvalidated" | "valid">>;


    /** Require a selection in the drop-down list. */
    "ValueRequired"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Show a success message when the validation is successful. */
    "ShowValidationSuccess"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Show a failure message when the validation fails. */
    "ShowValidationFailure"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Select an SVG icon to display within the status message when the validation fails. */
    "ValidationFailureIcon"?: IMAGELINK;


    /** Show a hint message about the required selection when choosing from the drop-down list. */
    "ShowValidationCriteria"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The message to display when the validation is successful. */
    "SuccessMessage"?: STRING | BindingTarget<STRING>;


    /** A secondary message that displays more information about the validation success message. */
    "SuccessMessageDetails"?: STRING | BindingTarget<STRING>;


    /** The message to display for the validation criteria and when the validation fails */
    "CriteriaMessage"?: STRING | BindingTarget<STRING>;


    /** The details to display for the validation criteria and failure message */
    "CriteriaMessageDetails"?: STRING | BindingTarget<STRING>;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** A bindable event triggered when the SelectedItems for this widget is modified */
    "SelectedItemsChanged"?: ServiceBindingTarget[];


    /** A bindable event triggered when the SelectedText for this widget is modified */
    "SelectedTextChanged"?: ServiceBindingTarget[];


    /** An event that triggers when the selected item is changed. Bind this event to service or function to apply a validation expression. */
    "Validate"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcsdropdown<A>
}

/** The binding source properties and services that can be bound on the "Ptcsdropdown" widget. */
declare class UIOutputInterfacePtcsdropdown<A> {
    
    /** A bindable property used to retrieve the output of the widget validation. Returned values are undefined, unvalidated, valid, or invalid. */
    ValidationOutput: BindingTarget<STRING>;


    /** The infotable source of selected items in the list */
    SelectedItems: BindingTarget<INFOTABLE>;


    /** Enables you to define the CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space */
    CustomClass: BindingTarget<STRING>;


    /** Enables you to select an item in the list */
    SelectedText: BindingTarget<STRING>;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget
}

/** Enables you to add a dropdown and make the selection */
declare function Ptcsdropdown<A>(props: UIInputInterfacePtcsdropdown<A>): UIOutputInterfacePtcsdropdown<A>

            
/** The properties and events that can be set or bound on the "Ptcsdynamicpanel" widget. */
declare interface UIInputInterfacePtcsdynamicpanel extends UIBaseInputInterface {
    
    /** Disables the panel */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets the panel size */
    "PanelSize"?: STRING | BindingTarget<STRING>;


    /** Allows the user to click outside the panel and close the panel */
    "ClickOutsideToClose"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Enables you to define the CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The sequence number of the Dynamic Panel widget when you press the TAB key */
    "TabSequence"?: NUMBER;


    /** Set the panel behavior */
    "Behavior"?: STRING<"push" | "flyover"> | BindingTarget<STRING<"push" | "flyover">>;


    /** Select the widget type. You can add an adjustable panel, or a section that expands and collapses vertically. */
    "DynamicPanelType"?: STRING<"adjustablepanel" | "expandablesection">;


    /** Sets the height of the section header. */
    "SectionHeaderHeight"?: NUMBER;


    /** Sets the minimum height of the section body panel. */
    "SectionBodyMinHeight"?: NUMBER;


    /** Sets the maximum height of the section body panel. */
    "SectionBodyMaxHeight"?: NUMBER;


    /** Hides the trigger button */
    "HideTriggerButton"?: BOOLEAN;


    /** Sets the animation speed */
    "AnimationSpeed"?: STRING<"100ms" | "200ms" | "300ms"> | BindingTarget<STRING<"100ms" | "200ms" | "300ms">>;


    /** Hides the dragging handle */
    "HideDragHandle"?: BOOLEAN;


    /** Set the minimum width of the panel when expanded */
    "MinSizeWhenExpanded"?: STRING | BindingTarget<STRING>;


    /** Set the maximum width of the panel when expanded */
    "MaxSizeWhenExpanded"?: STRING | BindingTarget<STRING>;


    /** Set the width of the panel when collapsed */
    "SizeWhenCollapsed"?: STRING | BindingTarget<STRING>;


    /** Sets the location of the anchor */
    "AnchorLocation"?: STRING<"left" | "top" | "right" | "bottom"> | BindingTarget<STRING<"left" | "top" | "right" | "bottom">>;


    /** Sets the panel that is collapsed by default when the mashup had loaded */
    "CollapseByDefault"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets the location of the trigger button */
    "TriggerButtonLocation"?: STRING<"left" | "top" | "right" | "bottom" | "center" | "panel" | "none"> | BindingTarget<STRING<"left" | "top" | "right" | "bottom" | "center" | "panel" | "none">>;


    /** Sets the type of the trigger button */
    "TriggerButtonType"?: STRING<"type1" | "type3" | "type4" | "type2"> | BindingTarget<STRING<"type1" | "type3" | "type4" | "type2">>;


    /** Sets the location of the toggle button */
    "TriggerButtonSide"?: STRING<"left" | "right"> | BindingTarget<STRING<"left" | "right">>;


    /** Sets the icon of the toggle button */
    "TriggerButtonIcon"?: STRING<"triangle" | "caret"> | BindingTarget<STRING<"triangle" | "caret">>;


    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** Displays a tooltip text when you hover over the trigger button */
    "TriggerButtonTooltipField"?: STRING | BindingTarget<STRING>;


    /** Sets an icon image for the tooltip of the trigger button */
    "TriggerButtonTooltipIcon"?: IMAGELINK;


    /** Displays a tooltip text when you hover over the handle */
    "HandleTooltipField"?: STRING | BindingTarget<STRING>;


    /** Sets an icon image for the tooltip of the handle */
    "HandleTooltipIcon"?: IMAGELINK;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** Fill the container */
    "FillContainer"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    ref?: UIOutputInterfacePtcsdynamicpanel
}

/** The binding source properties and services that can be bound on the "Ptcsdynamicpanel" widget. */
declare class UIOutputInterfacePtcsdynamicpanel {
    
    /** Enables you to define the CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space */
    CustomClass: BindingTarget<STRING>;


    /** When triggered it will expand if collapsed and will collapse if expanded */
    ToggleExpandCollapse: ServiceBindingTarget;


    /** Trigger to expand the dynamic panel */
    Expand: ServiceBindingTarget;


    /** Trigger to collapse the dynamic panel */
    Collapse: ServiceBindingTarget;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget;


    /** Resets all the contained widgets to their default values */
    ResetInputsToDefaultValue: ServiceBindingTarget
}

/** Dynamic Panel */
declare function Ptcsdynamicpanel(props: UIInputInterfacePtcsdynamicpanel): UIOutputInterfacePtcsdynamicpanel

            
/** The properties and events that can be set or bound on the "Ptcsfileupload" widget. */
declare interface UIInputInterfacePtcsfileupload extends UIBaseInputInterface {
    
    /** key 'tw.fileupload-ide.ptcs-properties.disabled (en)' returned an object instead of string. */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Display the ThingWorx repository path that the user can upload the files to */
    "ShowRepositoryPath"?: BOOLEAN;


    /** Display a drop-down list that enables users to select the ThingWorx repository to upload files to */
    "ShowRepositorySelector"?: BOOLEAN;


    /** Defines the label text for the browse button */
    "BrowseButtonLabel"?: STRING | BindingTarget<STRING>;


    /** Defines the label text for the upload button */
    "UploadButtonLabel"?: STRING | BindingTarget<STRING>;


    /** Show an upload button to upload the selected files */
    "ShowUploadButton"?: BOOLEAN;


    /** Select the label to display for the file drop zone */
    "DropZoneLabel"?: STRING | BindingTarget<STRING>;


    /** Select the icon to display for the file drop zone */
    "DropZoneIcon"?: IMAGELINK;


    /** Sets the height in pixels for the file drop zone */
    "DropZoneHeight"?: NUMBER;


    /** Disables instant upload after a file is selected. When set to false, files are only uploaded after the upload button is clicked. */
    "DisableInstantUpload"?: BOOLEAN;


    /** Sets the maximum height for the widget */
    "MaxHeight"?: NUMBER;


    /** Hides the icon used to display the file type */
    "HideFileTypeIcon"?: BOOLEAN;


    /** Defines the label text for the Delete All button */
    "DeleteAllButtonLabel"?: STRING | BindingTarget<STRING>;


    /** Shows Delete All button to allow the user to cancel the upload and delete all uploaded files */
    "ShowDeleteAllButton"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets the height for an uploaded file box */
    "UploadedFileHeight"?: NUMBER;


    /** The file path inside the ThingWorx file repository */
    "Path"?: STRING | BindingTarget<STRING>;


    /** Enter file types separated by a comma to only allow specific types. For example: gif,pdf,jpg. */
    "AllowedFileTypes"?: STRING | BindingTarget<STRING>;


    /** The message to display when an unsupported file is added. */
    "AllowedFileTypesMessage"?: STRING | BindingTarget<STRING>;


    /** The details to display under the message which lists the allowed file types. */
    "AllowedFileTypesMessageDetails"?: STRING | BindingTarget<STRING>;


    /** Require a file to upload. */
    "FileRequired"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The message to display when an unsupported file is added. */
    "FileRequiredMessage"?: STRING | BindingTarget<STRING>;


    /** Limits the maximum number of files that you can add to the upload list. */
    "MaxNumberOfFiles"?: NUMBER | BindingTarget<NUMBER>;


    /** The message to display when the number of files added exceeds the maximum. */
    "MaxNumberOfFilesFailureMessage"?: STRING | BindingTarget<STRING>;


    /** Sets a maximum size limit on each individual file in megabytes (MB). */
    "MaxFileSize"?: NUMBER | BindingTarget<NUMBER>;


    /** The title of the dialog box that is displayed when the file size exceeds the maximum allowed file size. */
    "MaxFileSizeFailureTitle"?: STRING | BindingTarget<STRING>;


    /** The message to display when a file exceeds the maximum allowed file size. */
    "MaxFileSizeFailureMessage"?: STRING | BindingTarget<STRING>;


    /** Sets a maximum size limit in MB for all selected files when uploading multiple files. */
    "MaxUploadSize"?: NUMBER | BindingTarget<NUMBER>;


    /** The title of the dialog box that is displayed when the total file size exceeds the maximum allowed file size. */
    "MaxUploadSizeFailureTitle"?: STRING | BindingTarget<STRING>;


    /** The message to display when the total files size exceeds the maximum allowed file size. */
    "MaxUploadSizeFailureMessage"?: STRING | BindingTarget<STRING>;


    /** The message to display when a file fails to upload. */
    "FileUploadErrorMessage"?: STRING | BindingTarget<STRING>;


    /** A message that displays additional details about files that failed to upload. */
    "FileUploadErrorDetails"?: STRING | BindingTarget<STRING>;


    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The name of the ThingWorx file repository used to store the uploaded files */
    "RepositoryName"?: THINGNAME | BindingTarget<THINGNAME>;


    /** Sets the label text for the widget */
    "Label"?: STRING | BindingTarget<STRING>;


    /** Sets the type of the label to display for the widget */
    "LabelType"?: STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption">;


    /** Sets the description text that is used to guide users on what files to upload */
    "UploadDescription"?: STRING;


    /** Sets the type of label used to display the description text */
    "UploadDescriptionType"?: STRING<"label" | "body" | "caption">;


    /** Controls how you can select files to upload at run time. You can drag files or use a dialog box to select files for upload. */
    "FileUploadMode"?: STRING<"select" | "drag">;


    /** Controls the type of the upload button to display */
    "UploadButtonType"?: STRING<"primary" | "secondary" | "tertiary">;


    /** Controls the type of the browse button to display */
    "BrowseButtonType"?: STRING<"primary" | "secondary" | "tertiary">;


    /** The sequence number of the widget when you press the TAB key */
    "TabSequence"?: NUMBER;


    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget. The height is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed height size */
    "Height"?: NUMBER;


    /** A bindable property that sets the validation state. You can set this property to undefined, unvalidated, valid, or invalid. */
    "ValidationState"?: STRING<"undefined" | "invalid" | "unvalidated" | "valid"> | BindingTarget<STRING<"undefined" | "invalid" | "unvalidated" | "valid">>;


    /** Show a failure message when the validation fails. */
    "ShowValidationFailure"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Select an SVG icon to display within the status message when the validation fails. */
    "ValidationFailureIcon"?: IMAGELINK;


    /** The message to display for the validation criteria and when the validation fails. */
    "CriteriaMessage"?: STRING | BindingTarget<STRING>;


    /** The details to display for the validation criteria and failure message. */
    "CriteriaMessageDetails"?: STRING | BindingTarget<STRING>;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** A bindable event triggered when the selected file has finished uploading */
    "UploadComplete"?: ServiceBindingTarget[];


    /** A bindable event triggered if the selected file does not upload successfully */
    "UploadFailed"?: ServiceBindingTarget[];


    /** An event that triggers when the upload is complete */
    "UploadStarted"?: ServiceBindingTarget[];


    /** An event that triggers when the widget value is changed. Bind this event to service or function to apply a validation pattern or expression. */
    "Validate"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcsfileupload
}

/** The binding source properties and services that can be bound on the "Ptcsfileupload" widget. */
declare class UIOutputInterfacePtcsfileupload {
    
    /** The file path inside the ThingWorx file repository */
    Path: BindingTarget<STRING>;


    /** The names of the selected files. Multiple files are separated by a vertical bar. */
    FileNames: BindingTarget<STRING>;


    /** The names of the selected files including the full path when uploading to a ThingWorx file repository. Multiple files are separated by a vertical bar. */
    FullPaths: BindingTarget<STRING>;


    /** A bindable property used to retrieve the output of the widget validation. Returned values are undefined, unvalidated, valid, or invalid. */
    ValidationOutput: BindingTarget<STRING>;


    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    CustomClass: BindingTarget<STRING>;


    /** The name of the ThingWorx file repository used to store the uploaded files */
    RepositoryName: BindingTarget<THINGNAME>;


    /** A bindable service that starts the file upload */
    Upload: ServiceBindingTarget;


    /** A bindable service that clears list of files that are added to the widget */
    ClearList: ServiceBindingTarget;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget
}

/** Upload files to a ThingWorx file repository */
declare function Ptcsfileupload(props: UIInputInterfacePtcsfileupload): UIOutputInterfacePtcsfileupload

            
/** The properties and events that can be set or bound on the "Ptcsgrid" widget. */
declare interface UIInputInterfacePtcsgrid<A> extends UIBaseInputInterface {
    
    /** Shows the filter bar on the grid */
    "ShowFilter"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets the filter box width. */
    "FilterWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** Shows a button that resets the grid back to its default configuration when changes are made at run time. */
    "ShowResetButton"?: BOOLEAN;


    /**  */
    "ResetButtonText"?: STRING | BindingTarget<STRING>;


    /**  */
    "DisplayButtonText"?: STRING | BindingTarget<STRING>;


    /** Controls whether row selection is retained when filtering or sorting the grid data. Enable this property to clear selections when the row is outside the grid view. */
    "ClearFilteredSelection"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Filter string of the simple filter box */
    "FilterString"?: BindingTarget<STRING>;


    /** Sets the label of the filter box. */
    "FilterLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "FilterHintText"?: STRING | BindingTarget<STRING>;


    /**  */
    "SelectedItemText"?: STRING | BindingTarget<STRING>;


    /**  */
    "SelectedItemsText"?: STRING | BindingTarget<STRING>;


    /**  */
    "BindDataText"?: STRING | BindingTarget<STRING>;


    /**  */
    "NoDataToDisplayText"?: STRING | BindingTarget<STRING>;


    /**  */
    "NoResultsText"?: STRING | BindingTarget<STRING>;


    /**  */
    "NoMatchesText"?: STRING | BindingTarget<STRING>;


    /** The infotable data source for the grid */ 
    "Data"?: BindingTarget<INFOTABLE<A>>;


    /** Specifies the text for the grid label */
    "Label"?: STRING | BindingTarget<STRING>;


    /** Aligns the label text to the right, left, or center of the grid */
    "LabelAlignment"?: STRING<"left" | "center" | "right">;


    /** Stores run-time changes to the grid such as column sorting, reordering, resizing, and visibility when a user navigates to a different page or mashup */
    "CacheRuntimeChanges"?: BOOLEAN;


    /** Enables users to adjust the width of grid columns by dragging the divider lines at run time */
    "ResizeColumns"?: BOOLEAN;


    /** Allows the user to reorder columns in runtime using drag and drop. */
    "ReorderColumns"?: BOOLEAN;


    /** Specifies a title to display for the row edit form */
    "RowEditFormTitle"?: STRING | BindingTarget<STRING>;


    /**  */
    "UpdateButtonText"?: STRING | BindingTarget<STRING>;


    /**  */
    "AddButtonText"?: STRING | BindingTarget<STRING>;


    /**  */
    "ApplyButtonText"?: STRING | BindingTarget<STRING>;


    /**  */
    "CancelButtonText"?: STRING | BindingTarget<STRING>;


    /**  */
    "DateLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "MonthLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "YearLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "HoursLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "MinutesLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "SecondsLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "MeridiemLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "SelectLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "CancelLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "EditButtonText"?: STRING | BindingTarget<STRING>;


    /**  */
    "SaveEditButtonText"?: STRING | BindingTarget<STRING>;


    /**  */
    "CancelEditButtonText"?: STRING | BindingTarget<STRING>;


    /** Enables users to edit the grid data at run time. By default, the grid data is saved automatically when the edit mode affects the entire grid. */
    "IsEditable"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The icon to display within the status message when the validation succeeds. */
    "ValidationSuccessIcon"?: IMAGELINK;


    /** The icon to display within the hint message for the validation criteria. */
    "ValidationCriteriaIcon"?: IMAGELINK;


    /**  */
    "DeleteRowButtonText"?: STRING | BindingTarget<STRING>;


    /**  */
    "AddRowButtonText"?: STRING | BindingTarget<STRING>;


    /** Specifies the label for the edit control */
    "EditControlLabel"?: STRING | BindingTarget<STRING>;


    /** Sets the icon to display for the edit control */
    "EditControlIcon"?: IMAGELINK | BindingTarget<IMAGELINK>;


    /** Specifies when to display the editing controls on the grid */
    "EditControlVisibility"?: STRING<"hover" | "always" | "never"> | BindingTarget<STRING<"hover" | "always" | "never">>;


    /** Controls the options to display within the column configuration menu at run time. You can enable users to show and hide specific columns using a check box, and change the order of the columns by dragging. */
    "ColumnsMenuOptions"?: STRING<"none" | "show" | "reorder" | "both">;


    /** Sets the number of items to display initially when the columns configuration menu is opened at run time. Use this property to restrict the menu height. A scrollbar is displayed for additional columns. */
    "ColumnsMenuVisibleItems"?: NUMBER;


    /** Keeps selected rows visible by scrolling automatically when the grid is updated or resized. */
    "AutoScroll"?: BOOLEAN;


    /** An infotable that contains data for the grid footer */
    "FooterData"?: BindingTarget<INFOTABLE>;


    /** Adds a footer area to the grid */
    "ShowFooter"?: BOOLEAN;


    /** Shows the header row within the grid footer */
    "ShowHeaderRowInFooter"?: BOOLEAN;


    /** Expands all tree nodes on the grid. To use the PreserveRowExpansion property, set this property to False. Tree Grid only. */
    "AlwaysExpanded"?: BOOLEAN;


    /** The maximum number of rows that users can expand on the grid. When the limit is reached, a message is displayed and rows must be collapsed before expanding additional rows. Tree Grid only. */
    "MaxExpandedRows"?: NUMBER;


    /** The title of the message that is displayed when a user expands a row after the maximum number of expanded rows is reached. Tree Grid only. */
    "MaxRowsMessageTitle"?: STRING | BindingTarget<STRING>;


    /** The message to display when a user expands a row after the maximum number of expanded rows is reached. Tree Grid only. */
    "MaxRowsMessage"?: STRING | BindingTarget<STRING>;


    /** Preserve expanded rows when the grid is refreshed. When AlwaysExpanded is True, all preloaded rows are expanded. You must set the CacheRuntimeChanges property to preserve row expansion values. Tree Grid only. */
    "PreserveRowExpansion"?: BOOLEAN;


    /** Disables the automatic selection of child nodes when a parent is selected. Tree grid only. */
    "SelectParentOnly"?: BOOLEAN;


    /** Displays the header row text on a single line. When the text exceeds the available space, an ellipsis is displayed. By default, the header text is displayed across multiple lines */
    "SingleLineHeader"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Displays the content of each row on a single line. An ellipsis is displayed when the full content cannot fit within a row. By default, content is displayed across multiple lines */
    "SingleLineRows"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Show row numbers */
    "ShowRowNumbers"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Controls the vertical alignment of data within the header row. */
    "HeaderVerticalAlignment"?: STRING<"top" | "center" | "bottom">;


    /** Controls the vertical alignment of data within body rows. */
    "RowsVerticalAlignment"?: STRING<"top" | "center" | "bottom">;


    /** Add a sort button to the check box selection column. This enables you to sort data rows based on whether they are selected or not. */
    "SortSelectionColumn"?: BOOLEAN;


    /** Enables you to disable nodes on the grid. */
    "AllowDisabledNodes"?: BOOLEAN;


    /** Prevents the left and right arrow keys from navigating to next or previous row. */
    "PreventRowWrapInNav"?: BOOLEAN;


    /** Enables you to define the CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Disables the children of a disabled parent node. */
    "DisableChildNodes"?: BOOLEAN;


    /** The infotable column used to define the state of the line item. You can set the value to enabled or disabled. Nodes with empty values are displayed in an enabled state. */
    "DisabledStateField"?: FIELDNAME<A>;


    /** An infotable that defines the data source for child nodes that load dynamically when tree nodes are expanded. Tree Grid only. */
    "ChildData"?: BindingTarget<INFOTABLE>;


    /** Specifies the infotable column in the tree grid data which contains the parent ID of each child. This ID is used to create the hierarchical tree structure. Tree Grid only. */
    "ParentIDFieldName"?: STRING | BindingTarget<STRING>;


    /** Specifies the name of the infotable column used to indicate whether a row has child data available. To indicate that a row does not have children, enter one of the following: ‘0’, 0, ‘false’, false, empty string, or undefined. Any other value means that the row does have children. */
    "HasChildrenFieldName"?: STRING;


    /**  */
    "ColumnFormat"?: STRING;


    /** Hides the grid header row */
    "HideHeaderRow"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The maximum height for header in grid (in pixels) */
    "MaxHeaderHeight"?: NUMBER | BindingTarget<NUMBER>;


    /** Specifies the maximum height of rows on the grid in pixels. By default, the height value is set based on the content of each row */
    "MaxRowHeight"?: NUMBER | BindingTarget<NUMBER>;


    /** Specifies the minimum height of rows on the grid in pixels */
    "MinRowHeight"?: NUMBER | BindingTarget<NUMBER>;


    /** Controls the number of data rows on the grid that a user can select at the same time. */
    "RowSelection"?: STRING<"none" | "single" | "multiple"> | BindingTarget<STRING<"none" | "single" | "multiple">>;


    /** Specifies the row numbers to select in advance when the grid is loaded. You can type a numeric range such as 1-10, or a comma-separated list such as 2, 4, 5. */
    "DefaultSelectedRows"?: STRING | BindingTarget<STRING>;


    /** An infotable property that enables you to set or retrieve the selected data rows on the grid */
    "SelectedRows"?: BindingTarget<INFOTABLE>;


    /** An infotable that contains the IDFieldName value of all selected rows on the grid. When the grid data is paginated, this property returns selected ID values from all pages. */
    "SelectedRowsIDs"?: BindingTarget<INFOTABLE>;


    /** Triggers the SelectedRowsChanged event when the selected rows are changed manually or using a data service. When set to False, the event is triggered only when row selections are changed manually. */
    "SelectedRowsChangedCallback"?: BOOLEAN;


    /** Select the infotable column which contains the primary key or the ID for each row on the grid */
    "IDFieldName"?: STRING;


    /** The sequence number of the widget when you press the TAB key */
    "TabSequence"?: NUMBER;


    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** Select a state definition entity to apply state formatting rules to each row on the grid */
    "RowFormat"?: STATEFORMATTING;


    /** Sets the grid label type */
    "LabelType"?: STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption">;


    /** A bindable property that contains the filter query to apply to the grid data. You can bind the property to a Data Filter widget and a data service to filter data on the grid. */
    "QueryFilter"?: BindingTarget<QUERY>;


    /** A bindable property that enables you to configure the grid dynamically using JSON data instead of widget properties. */
    "Configuration"?: JSON | BindingTarget<JSON>;


    /** A bindable property that enables you to configure the grid dynamically using a configuration string instead of widget properties. This property is used to support migration from the Grid (Advanced) widget. To add a new configuration, use the JSON Configuration property instead. */
    "LegacyConfiguration"?: STRING | BindingTarget<STRING>;


    /** Triggers the widget Filter event when dynamic configuration data is loaded initially or changed */
    "TriggerEventOnConfigChange"?: BOOLEAN;


    /** Controls how users can edit the grid data at run time. Select ‘Entire Grid’ to edit and save all changes at the same time, ‘Single Row’ to edit and save changes for one row at a time, or ‘Single Cell’ to edit and save changes for one cell at a time. */
    "EditLevel"?: STRING<"grid" | "row" | "cell">;


    /** Displays an edit control on the grid toolbar, which allows users to turn editing on or off */
    "EditButton"?: BOOLEAN;


    /** Displays an Add button on the grid toolbar, which enables users to add new rows to the grid using a form. */
    "RowAddButton"?: BOOLEAN;


    /** Displays a Delete button on the grid toolbar, which allows users to delete the selected rows. */
    "RowDeleteButton"?: BOOLEAN;


    /** Specifies a title to display for the form that is used to add new rows to the grid */
    "AddRowFormTitle"?: STRING | BindingTarget<STRING>;


    /** Sets the control element to use for editing the grid */
    "EditControlType"?: STRING<"icon" | "link">;


    /** Highlights edits on the grid that are not saved to the server */
    "HighlightDraftState"?: BOOLEAN;


    /** Show a success message when the entered data is validated as successful. */
    "ShowValidationSuccess"?: BOOLEAN;


    /** Show a failure message when the entered data fails the validation. */
    "ShowValidationFailure"?: BOOLEAN;


    /** The icon to display within the status message when the validation fails. */
    "ValidationFailureIcon"?: IMAGELINK;


    /** Show a hint message about the required input pattern when editing a cell on the grid. */
    "ShowValidationCriteria"?: BOOLEAN;


    /**  */
    "ShowColumnFeature"?: BOOLEAN;


    /**  */
    "ShowValidatorFeature"?: BOOLEAN;


    /** Use the latest standard validator that includes additional security restrictions instead of the legacy non-secure validator when defining validation expressions for column cells. */
    "DisableLegacyValidation"?: BOOLEAN;


    /** An infotable that contains the IDs of tree nodes that are expandable. Only the Row ID column is required to make a grid row expandable. When AlwaysExpanded is selected, this data is ignored and all rows are expanded. Tree Grid only. */
    "ExpandableRows"?: BindingTarget<INFOTABLE>;


    /** Determines whether parent rows that are not included in preloaded client-side data are included when selecting or expanding child rows. When True, the parent rows are retrieved with the child rows and the hierarchy is kept. Tree Grid only. */
    "IncludeRowExpansionParents"?: BOOLEAN;


    /** Automatically expands all preloaded data when the grid is launched. This property must be turned off to use the PreserveRowExpansion property. */
    "ExpandLoadedRows"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Adds controls that enable you to expand and collapse all tree nodes on the grid when no data is bound to the ChildData property. Tree Grid only. */
    "ExpandCollapseAll"?: BOOLEAN;


    /** Sets the type of icons used to expand and collapse the tree nodes on the grid when no data is bound to the ChildData property. Tree Grid only. */
    "ExpandCollapseIcon"?: STRING<"singlecaret" | "arrow" | "plus/minus">;


    /** When true, the focus box is used to select items. When false, the focused and selected states are set separately. Tree Grid only. */
    "SelectFocusedItem"?: BOOLEAN;


    /** Controls the element to focus on initially when the focus is changed. You can navigate to rows first, cells first, or cells only. Tree Grid only. */
    "FocusNavigationMode"?: STRING<"row-first" | "cell-first" | "cell-only">;


    /** Primary column not resizable and has a fixed size. Tree Grid only. This property is ignored when ResizeColumn is true. */
    "PrimaryColumnFixedSize"?: BOOLEAN;


    /** Enables you to specify the character used to separate the ID path. The path separator character is used in Tree Grid for selections of rows that are dynamically loaded by the grid but are not loaded on the client side (selection of dynamically loaded rows). Tree Grid only. */
    "IDPathSeparator"?: STRING;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** Fill the container */
    "FillContainer"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** An event that triggers when the grid is sorted or filtered */
    "Filter"?: ServiceBindingTarget[];


    /** An event that triggers when a row in the grid is clicked. */
    "RowClicked"?: ServiceBindingTarget[];


    /** An event that triggers when the selected rows are changed */
    "SelectedRowsChanged"?: ServiceBindingTarget[];


    /** An event that triggers when a hyperlink is clicked */
    "LinkClicked"?: ServiceBindingTarget[];


    /** An event that is triggered when a user starts editing a cell in the grid */
    "EditCellStarted"?: ServiceBindingTarget[];


    /** An event that is triggered when a user finishes editing a cell in the grid */
    "EditCellCompleted"?: ServiceBindingTarget[];


    /** An event that is triggered when a user starts editing a row in the grid */
    "EditRowStarted"?: ServiceBindingTarget[];


    /** An event that is triggered when a user finishes editing a row in the grid */
    "EditRowCompleted"?: ServiceBindingTarget[];


    /** An event that is triggered when the Edit button is clicked */
    "EditStarted"?: ServiceBindingTarget[];


    /** An event that is triggered when the Save button is clicked after making edits */
    "EditCompleted"?: ServiceBindingTarget[];


    /** An event that is triggered when a user clicks the Cancel button. */
    "EditCanceled"?: ServiceBindingTarget[];


    /** A bindable event that triggers when the Delete button is clicked */
    "DeleteRowClicked"?: ServiceBindingTarget[];


    /** A bindable event that triggers when the Reset button is clicked. */
    "ResetButtonClicked"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcsgrid<A>
}

/** The binding source properties and services that can be bound on the "Ptcsgrid" widget. */
declare class UIOutputInterfacePtcsgrid<A> {
    
    /** Filter string of the simple filter box */
    FilterString: BindingTarget<STRING>;


    /** Enables users to edit the grid data at run time. By default, the grid data is saved automatically when the edit mode affects the entire grid. */
    IsEditable: BindingTarget<BOOLEAN>;


    /** Enables you to define the CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** An infotable property that enables you to set or retrieve the selected data rows on the grid */
    SelectedRows: BindingTarget<INFOTABLE>;


    /** An infotable that contains the IDFieldName value of all selected rows on the grid. When the grid data is paginated, this property returns selected ID values from all pages. */
    SelectedRowsIDs: BindingTarget<INFOTABLE>;


    /** An infotable that contains the data of the last clicked row in the grid. */
    LastClickedRow: BindingTarget<INFOTABLE>;


    /** A bindable property that contains the filter query to apply to the grid data. You can bind the property to a Data Filter widget and a data service to filter data on the grid. */
    QueryFilter: BindingTarget<QUERY>;


    /** Data source for edited items in the grid. */
    EditedData: BindingTarget<INFOTABLE>;


    /** Data source for deleted items in the grid that should be deleted from server. */
    DeletedData: BindingTarget<INFOTABLE>;


    /** An infotable that contains the row data of a clicked hyperlink. */
    ClickedLinkData: BindingTarget<INFOTABLE>;


    /** Returns the name of the infotable column for the last clicked hyperlink. */
    ClickedLinkColumn: BindingTarget<STRING>;


    /** A bindable service that enables you to cancel edits to the grid */
    Cancel: ServiceBindingTarget;


    /** A service that confirms the delete action. To delete the selected rows on the grid, bind this service to the ActionClick event of a Confirmation function. */
    ConfirmDelete: ServiceBindingTarget;


    /** A bindable service that enables you to reset the Grid widget to its initial configuration at run time */
    Reset: ServiceBindingTarget;


    /** A bindable service that enables you to save edits to the grid */
    Save: ServiceBindingTarget
}

/** Enables you to display sets of data as rows and columns. This widget is available as a preview that includes a subset of features from the current widget. Additional features and migration support will be added in future releases. */
declare function Ptcsgrid<A>(props: UIInputInterfacePtcsgrid<A>): UIOutputInterfacePtcsgrid<A>

            
/** The properties and events that can be set or bound on the "Ptcsicon" widget. */
declare interface UIInputInterfacePtcsicon extends UIBaseInputInterface {
    
    /** Enables you to change the icon size. Select Custom to set the size using the widget Height and Width properties. */
    "Size"?: STRING<"small" | "medium" | "large" | "xlarge" | "custom"> | BindingTarget<STRING<"small" | "medium" | "large" | "xlarge" | "custom">>;


    /** Prevent web browsers from caching the icon image */
    "PreventCaching"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Select to remove the default placeholder icon */
    "Placeholder"?: BOOLEAN;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Add alternate text to be used by screen readers */
    "AlternateText"?: STRING | BindingTarget<STRING>;


    /** Enter a URL for the icon image or select a Media entity */
    "SourceURL"?: IMAGELINK | BindingTarget<IMAGELINK>;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** The width of the widget */
    "Width"?: NUMBER;


    /** Disable the icon. Only applies to icons that use an SVG image format */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    ref?: UIOutputInterfacePtcsicon
}

/** The binding source properties and services that can be bound on the "Ptcsicon" widget. */
declare class UIOutputInterfacePtcsicon {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Displays an icon */
declare function Ptcsicon(props: UIInputInterfacePtcsicon): UIOutputInterfacePtcsicon

            
/** The properties and events that can be set or bound on the "Ptcsimage" widget. */
declare interface UIInputInterfacePtcsimage extends UIBaseInputInterface {
    
    /** Select the position of the image inside the container */
    "Position"?: STRING<"center" | "bottom" | "left" | "right" | "top">;


    /** Prevent web browsers from caching the image */
    "PreventCaching"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Enter a description of the image to be used by screen readers */
    "AlternateText"?: STRING | BindingTarget<STRING>;


    /** Enter a URL for the image or select a media entity */
    "SourceURL"?: IMAGELINK | BindingTarget<IMAGELINK>;


    /** Select how the image scales within a container. When you place the widget in a empty container, the image is scaled relative to the container dimensions. When you add additional widgets to the image container, the image is scaled relative to its initial dimensions. */
    "Scaling"?: STRING<"fit-x" | "fit-y" | "fit" | "contain" | "cover" | "auto" | "25%" | "50%" | "75%">;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** Fill the container */
    "FillContainer"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** A bindable event that is triggered when the image loads */
    "OnLoad"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcsimage
}

/** The binding source properties and services that can be bound on the "Ptcsimage" widget. */
declare class UIOutputInterfacePtcsimage {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Displays an image */
declare function Ptcsimage(props: UIInputInterfacePtcsimage): UIOutputInterfacePtcsimage

            
/** The properties and events that can be set or bound on the "Ptcslabel" widget. */
declare interface UIInputInterfacePtcslabel extends UIBaseInputInterface {
    
    /** Sets an icon image for the tooltip of the Label widget */
    "TooltipIcon"?: IMAGELINK;


    /** Allows the label text to continue onto another line */
    "MultiLine"?: BOOLEAN;


    /** Enables you to set a maximum height for the label text. If the label text size is more than the maximum height that you have set, it is truncated and you can use view “show more” or “show less” options to view the text at the runtime */
    "MaxHeight"?: NUMBER;


    /** Enables you to set a maximum width for the label text */
    "MaxWidth"?: NUMBER;


    /** Prevents the widget from collapsing multiple whitespace characters into a single whitespace */
    "PreserveWhiteSpace"?: BOOLEAN;


    /** Enables you to align the label along the horizontal axis */
    "HorizontalAlignment"?: STRING<"left" | "right" | "center">;


    /** Enables you to align the label along the vertical axis */
    "VerticalAlignment"?: STRING<"flex-start" | "center" | "flex-end">;


    /** Allows the user to set the overflow to show ellipsis or show/less link */
    "DisclosureControl"?: STRING<"show-more" | "ellipsis"> | BindingTarget<STRING<"show-more" | "ellipsis">>;


    /** The text that is displayed in the label */
    "LabelText"?: STRING | BindingTarget<STRING>;


    /** Enables you to set a label type */
    "LabelType"?: STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption"> | BindingTarget<STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption">>;


    /**  */
    "overflowShowMoreTxt"?: STRING;


    /**  */
    "overflowShowLessTxt"?: STRING;


    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The width of the widget. The width is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed width size */
    "Width"?: NUMBER;


    /** The height of the widget. The height is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed height size */
    "Height"?: NUMBER;


    /** Displays a tooltip text when you hover over the Label widget */
    "TooltipField"?: STRING | BindingTarget<STRING>;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    ref?: UIOutputInterfacePtcslabel
}

/** The binding source properties and services that can be bound on the "Ptcslabel" widget. */
declare class UIOutputInterfacePtcslabel {
    
    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    CustomClass: BindingTarget<STRING>
}

/** Displays a read-only text label */
declare function Ptcslabel(props: UIInputInterfacePtcslabel): UIOutputInterfacePtcslabel

            
/** The properties and events that can be set or bound on the "Ptcslink" widget. */
declare interface UIInputInterfacePtcslink extends UIBaseInputInterface {
    
    /** Sets an icon image for the tooltip of the Link widget */
    "TooltipIcon"?: IMAGELINK;


    /** Displays the link text in a single line. Text will truncate when the size of the text is more than the TextMaxWidth value. */
    "SingleLine"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Use this property to disable the link in the mashup */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Enables you to align the text around the link widget */
    "Alignment"?: STRING<"left" | "center" | "right">;


    /** Controls the vertical alignment of the link text */
    "VerticalAlignment"?: STRING<"flex-start" | "center" | "flex-end">;


    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Enables you to add an URL */
    "LinkURL"?: STRING | BindingTarget<STRING>;


    /** The text that is displayed in the link */
    "Text"?: STRING | BindingTarget<STRING>;


    /** Enables you to set a link type */
    "LinkType"?: STRING<"primary" | "secondary"> | BindingTarget<STRING<"primary" | "secondary">>;


    /** Enables you to set the window that will open when the link is clicked */
    "TargetWindow"?: STRING<"_blank" | "_self" | "_popup">;


    /** The sequence number of the link widget when you press tab */
    "TabSequence"?: NUMBER;


    /** Enables you to set a maximum width for the link text */
    "TextMaxWidth"?: NUMBER;


    /** Displays a tooltip text when you hover over the Link widget */
    "TooltipField"?: STRING | BindingTarget<STRING>;


    /** The width of the widget. The width is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed width size */
    "Width"?: NUMBER;


    /** The height of the widget. The height is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed height size */
    "Height"?: NUMBER;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    ref?: UIOutputInterfacePtcslink
}

/** The binding source properties and services that can be bound on the "Ptcslink" widget. */
declare class UIOutputInterfacePtcslink {
    
    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    CustomClass: BindingTarget<STRING>;


    /** Enables you to set a link type */
    LinkType: BindingTarget<STRING<"primary" | "secondary">>;


    /** Navigate the user to the designated URL defined for this widget */
    Navigate: ServiceBindingTarget
}

/** Opens the user defined page */
declare function Ptcslink(props: UIInputInterfacePtcslink): UIOutputInterfacePtcslink

            
/** The properties and events that can be set or bound on the "Ptcslist" widget. */
declare interface UIInputInterfacePtcslist<A> extends UIBaseInputInterface {
    
    /** Select an SVG icon to display within the status message when the validation succeeds. */
    "ValidationSuccessIcon"?: IMAGELINK;


    /** Select an SVG icon to display within the hint message for the validation criteria. */
    "ValidationCriteriaIcon"?: IMAGELINK;


    /** The text that is displayed in the label */
    "Label"?: STRING | BindingTarget<STRING>;


    /** Enables you to align the label */
    "LabelAlignment"?: STRING<"left" | "center" | "right"> | BindingTarget<STRING<"left" | "center" | "right">>;


    /** Enables you to align the items in the list */
    "Alignment"?: STRING<"left" | "center" | "right"> | BindingTarget<STRING<"left" | "center" | "right">>;


    /** The infotable source of selected items in the list */
    "SelectedItems"?: BindingTarget<INFOTABLE>;


    /** Enables you to select multiple items in the list */
    "MultiSelect"?: BOOLEAN;


    /** Use this property to disable the widget in the mashup */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Enables you to automatically select the first row in the list */
    "AutoSelectFirstRow"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Enables you to set the row height for the single line */
    "RowHeight"?: NUMBER | BindingTarget<NUMBER>;


    /** Enter a custom label for the blank selection item in the list */
    "ClearSelectionLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "SelectAllLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "ClearSelectedItemsLabel"?: STRING | BindingTarget<STRING>;


    /** The message to display when ValueRequired is set to true and an item is not selected. */
    "RequiredMessage"?: STRING | BindingTarget<STRING>;


    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The sequence number of the List widget when you press tab */
    "TabSequence"?: NUMBER;


    /** The infotable source */ 
    "Data"?: BindingTarget<INFOTABLE<A>>;


    /** The infotable field that represents the data value */
    "DisplayField"?: FIELDNAME<A>;


    /** The field that is used for SelectedText */
    "ValueField"?: FIELDNAME<A>;


    /** The infotable field that represents the state of the line item, can be enabled or disabled */
    "StateField"?: FIELDNAME<A>;


    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** Enables you to select an item in the list */
    "SelectedText"?: STRING | BindingTarget<STRING>;


    /**  */
    "ListFormat"?: RENDERERWITHSTATE;


    /** Add a blank selection item to the list. Enables users to clear a selection */
    "ClearSelectionItem"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Enables you to add a filter inside the list and allows you to filter the list items at runtime */
    "ShowListFilter"?: BOOLEAN;


    /** Displays a hint text for the list filter */
    "FilterHintText"?: STRING;


    /** A bindable property that sets the validation state. You can set this property to undefined, unvalidated, valid, or invalid. */
    "ValidationState"?: STRING<"undefined" | "invalid" | "unvalidated" | "valid"> | BindingTarget<STRING<"undefined" | "invalid" | "unvalidated" | "valid">>;


    /** Require an item in the list to be selected. */
    "ValueRequired"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Show a success message when the validation is successful. */
    "ShowValidationSuccess"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Show a failure message when the validation fails. */
    "ShowValidationFailure"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Select an SVG icon to display within the status message when the validation fails. */
    "ValidationFailureIcon"?: IMAGELINK;


    /** Show a hint message about the required input when editing the list. */
    "ShowValidationCriteria"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The message to display when the validation is successful. */
    "SuccessMessage"?: STRING | BindingTarget<STRING>;


    /** A secondary message that displays more information about the validation success message. */
    "SuccessMessageDetails"?: STRING | BindingTarget<STRING>;


    /** The message to display for the validation criteria and when the validation fails */
    "CriteriaMessage"?: STRING | BindingTarget<STRING>;


    /** The details to display for the validation criteria and failure message */
    "CriteriaMessageDetails"?: STRING | BindingTarget<STRING>;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** Fill the container */
    "FillContainer"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** A bindable event triggered when the SelectedItems for this widget is modified */
    "SelectedItemsChanged"?: ServiceBindingTarget[];


    /** A bindable event triggered when the SelectedText for this widget is modified */
    "SelectedTextChanged"?: ServiceBindingTarget[];


    /** Triggers an event when the user double clicks the widget */
    "DoubleClicked"?: ServiceBindingTarget[];


    /** An event that triggers when the widget value is changed. Bind this event to service or function to apply a validation expression. */
    "Validate"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcslist<A>
}

/** The binding source properties and services that can be bound on the "Ptcslist" widget. */
declare class UIOutputInterfacePtcslist<A> {
    
    /** A bindable property used to retrieve the output of the widget validation. Returned values are undefined, unvalidated, valid, or invalid. */
    ValidationOutput: BindingTarget<STRING>;


    /** The infotable source of selected items in the list */
    SelectedItems: BindingTarget<INFOTABLE>;


    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    CustomClass: BindingTarget<STRING>;


    /** Enables you to select an item in the list */
    SelectedText: BindingTarget<STRING>;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget
}

/** Displays rows in a list */
declare function Ptcslist<A>(props: UIInputInterfacePtcslist<A>): UIOutputInterfacePtcslist<A>

            
/** The properties and events that can be set or bound on the "Ptcslistshuttle" widget. */
declare interface UIInputInterfacePtcslistshuttle<A> extends UIBaseInputInterface {
    
    /**  */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The infotable source of selected items in the list */
    "SelectedItems"?: BindingTarget<INFOTABLE>;


    /** Enables you to set selection to multi select or single select */
    "SingleSelect"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Enables you to show or hide the filter on the source list */
    "HideFilter"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Displays a hint text for the list filter. */
    "FilterHintText"?: STRING | BindingTarget<STRING>;


    /**  */
    "AddLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "RemoveLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "LabelUp"?: STRING | BindingTarget<STRING>;


    /**  */
    "LabelDown"?: STRING | BindingTarget<STRING>;


    /**  */
    "SelectAllLabel"?: STRING | BindingTarget<STRING>;


    /**  */
    "ClearSelectedItemsLabel"?: STRING | BindingTarget<STRING>;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The sequence number of the List Shuttle widget when you press the TAB key */
    "TabSequence"?: NUMBER;


    /** Infotable source */ 
    "Data"?: BindingTarget<INFOTABLE<A>>;


    /** The infotable field that represents the data value */
    "DisplayField"?: FIELDNAME<A>;


    /** The infotable field that represents the ID */
    "IDField"?: FIELDNAME<A>;


    /**  */
    "ListFormat"?: RENDERERWITHSTATE;


    /** The main label of the List Shuttle */
    "ListShuttleLabel"?: STRING | BindingTarget<STRING>;


    /** Alignment of the list shuttle label */
    "ListShuttleLabelAlignment"?: STRING<"left" | "right" | "center"> | BindingTarget<STRING<"left" | "right" | "center">>;


    /** Type/variant to use for the list shuttle label */
    "ListShuttleLabelType"?: STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption"> | BindingTarget<STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption">>;


    /** Label for the source list */
    "SourceListLabel"?: STRING | BindingTarget<STRING>;


    /** Alignment of the source list label */
    "SourceListLabelAlignment"?: STRING<"left" | "right" | "center"> | BindingTarget<STRING<"left" | "right" | "center">>;


    /** Type/variant to use for the source list label */
    "SourceListLabelType"?: STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption"> | BindingTarget<STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption">>;


    /** Label for the target list */
    "TargetListLabel"?: STRING | BindingTarget<STRING>;


    /** Alignment of the target list label */
    "TargetListLabelAlignment"?: STRING<"left" | "right" | "center"> | BindingTarget<STRING<"left" | "right" | "center">>;


    /** Type/variant to use for the target list label */
    "TargetListLabelType"?: STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption"> | BindingTarget<STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption">>;


    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** Fill the container */
    "FillContainer"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** A bindable event that triggers when the target list is modified. */
    "SelectedItemsChanged"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcslistshuttle<A>
}

/** The binding source properties and services that can be bound on the "Ptcslistshuttle" widget. */
declare class UIOutputInterfacePtcslistshuttle<A> {
    
    /** The infotable source of selected items in the list */
    SelectedItems: BindingTarget<INFOTABLE>;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Resets the lists to their default values */
    ResetToDefaultValue: ServiceBindingTarget
}

/** List Shuttle */
declare function Ptcslistshuttle<A>(props: UIInputInterfacePtcslistshuttle<A>): UIOutputInterfacePtcslistshuttle<A>

            
/** The properties and events that can be set or bound on the "Ptcsmenubar" widget. */
declare interface UIInputInterfacePtcsmenubar extends UIBaseInputInterface {
    
    /** <CURRENTLY NOT EXPOSED> */
    "MoreItemsLabel"?: STRING | BindingTarget<STRING>;


    /** Prevent the menu bar from collapsing into a compact view using a toggle button. */
    "AlwaysOpen"?: BOOLEAN;


    /** The minimum width of the menu bar. */
    "MinWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** The maximum width of the menu bar. */
    "MaxWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** <CURRENTLY NOT EXPOSED> */
    "CompactWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** Disable the widget in the mashup. */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The sequence number of the Menu Bar widget when you press the TAB key */
    "TabSequence"?: NUMBER;


    /** Specifies whether the menu bar items are defined using an infotable or a Menu entity. */
    "DataSource"?: STRING<"menuentity" | "infotable">;


    /** Bind an infotable to define the items for the primary navigation area. You must format the infotable using the MenuEntry data shape. */
    "PrimaryNavData"?: BindingTarget<INFOTABLE>;


    /** Select a Menu entity that contains items for the primary navigation area on the menu bar. */
    "PrimaryNavMenu"?: MENUNAME;


    /** Bind an infotable to define the items for the secondary navigation area. You must format the infotable using the MenuEntry data shape. */
    "SecondaryNavData"?: BindingTarget<INFOTABLE>;


    /** Select a Menu entity that contains items for the secondary navigation area on the menu bar. */
    "SecondaryNavMenu"?: MENUNAME;


    /** Choose whether to control an embedded mashup in the current page or to bind parameters to a specific embedded mashup. */
    "MashupControl"?: STRING<"pagemashup" | "bound">;


    /** Controls the menu items to display from the menu items data source. You can display all items, primary items only, and all items except for the primary items. */
    "DisplayItems"?: STRING<"allitems" | "primaryonly" | "excludeprimary">;


    /** Controls how menu items are displayed when the widget contains multiple levels of navigation. */
    "SubMenuType"?: STRING<"flyout" | "nested"> | BindingTarget<STRING<"flyout" | "nested">>;


    /** Toggles the ability to resize the menu bar at run time. */
    "DisableResizing"?: BOOLEAN;


    /** Sets the maximum number of items that are displayed in the primary navigation group. */
    "PrimaryNavMaxItems"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays icons for the primary navigation menus. */
    "PrimaryNavIcons"?: BOOLEAN;


    /** Displays icons for the secondary navigation menus. */
    "SecondaryNavIcons"?: BOOLEAN;


    /** Hides alternative icons that are displayed automatically when custom icons are missing for menu items. */
    "HideAlternateIcons"?: BOOLEAN;


    /** Controls whether the menu section containing the last selected item remains open after navigating to the destination. */
    "PreserveSelection"?: BOOLEAN;


    /** Sets the logo image to display when the Menu Bar is expanded. */
    "FooterLogo"?: IMAGELINK;


    /** The icon to display in the footer section. */
    "FooterIcon"?: IMAGELINK;


    /** The text to display in the footer section. */
    "FooterText"?: STRING | BindingTarget<STRING>;


    /** Sets the URL to navigate to when the footer link is clicked. */
    "FooterURL"?: STRING | BindingTarget<STRING>;


    /** Controls whether the footer link opens the URL in the same window or a new window. */
    "FooterLinkTargetWindow"?: STRING<"self" | "new">;


    /** Hides the footer from the menu bar. */
    "HideFooter"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The maximum width of submenus when items are displayed using cascading menus. */
    "SubMenuMaxWidth"?: NUMBER;


    /** The minimum width of submenus when items are displayed using cascading menus. */
    "SubMenuMinWidth"?: NUMBER;


    /** The width of the widget. The width is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed width size */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** Keep accordion sections open when an item on the menu bar is selected. */
    "StayOpenOnSelection"?: BOOLEAN;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** Fill the container */
    "FillContainer"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


    /** Show a spinner icon when data is being loaded */
    "ShowDataLoading"?: BOOLEAN;


    /** When enabled makes the widget visible in the mashup */
    "Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Position of the widget in pixels from the top of the mashup */
    "Top"?: NUMBER;


    /** Position of the widget in pixels from the left of the mashup */
    "Left"?: NUMBER;


    /** The z-index of the widget which allows you to put the widget on top or on the bottom of the view stack */
    "Z-index"?: NUMBER;


    /**  */
    "Margin"?: STYLECSSRECTSIZE;


    ref?: UIOutputInterfacePtcsmenubar
}

/** The binding source properties and services that can be bound on the "Ptcsmenubar" widget. */
declare class UIOutputInterfacePtcsmenubar {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** When you set MashupControl to "Bind to Mashup Parameters", bind this parameter to a specific contained mashup to control it. */
    Mashup: BindingTarget<STRING>
}

/** Displays a menu bar from preconfigured menu or live data from a service. This widget is available as a preview that includes a subset of features from the current widget. Additional features and migration support will be added in future releases. */
declare function Ptcsmenubar(props: UIInputInterfacePtcsmenubar): UIOutputInterfacePtcsmenubar

            
/** The properties and events that can be set or bound on the "Ptcspagination" widget. */
declare interface UIInputInterfacePtcspagination extends UIBaseInputInterface {
    
    /** The current page number. */
    "PageNumber"?: NUMBER | BindingTarget<NUMBER>;


    /** Specifies the maximum number of results to show on each page. */
    "PageSize"?: NUMBER | BindingTarget<NUMBER>;


    /** Adds an input field that enables users to navigate to a specific page number. */
    "ShowDirectLink"?: BOOLEAN;


    /** Enables you to display the total number of results that are returned from the server. */
    "ShowTotalResults"?: BOOLEAN;


    /**  */
    "StringPerPage"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringResults"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringJumpToPage"?: STRING | BindingTarget<STRING>;


    /**  */
    "StringMax"?: STRING | BindingTarget<STRING>;


    /** The width of the widget. The width is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed width size */
    "Width"?: NUMBER;


    /** The height of the widget. The height is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed height size */
    "Height"?: NUMBER;


    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The total number of results to show within the widget. This value should be returned from the server. */
    "ResultsNumber"?: NUMBER | BindingTarget<NUMBER>;


    /** The sequence number of the widget when you press the TAB key. */
    "TabSequence"?: NUMBER;


    /** Sets the maximum allowed width for the widget. You can use this property to constrain the space used by the widget inside a container. The value of this property is reset when you specify a fixed width for the widget. */
    "MaxWidth"?: NUMBER;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** Triggers an event when the page number is changed. */
    "PageNumberChanged"?: ServiceBindingTarget[];


    /** Triggers an event when the page size is changed. */
    "PageSizeChanged"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcspagination
}

/** The binding source properties and services that can be bound on the "Ptcspagination" widget. */
declare class UIOutputInterfacePtcspagination {
    
    /** The current page number. */
    PageNumber: BindingTarget<NUMBER>;


    /** Specifies the maximum number of results to show on each page. */
    PageSize: BindingTarget<NUMBER>;


    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    CustomClass: BindingTarget<STRING>
}

/** Enables you to divide a large data set into multiple pages that you can view separately. */
declare function Ptcspagination(props: UIInputInterfacePtcspagination): UIOutputInterfacePtcspagination

            
/** The properties and events that can be set or bound on the "Ptcspropertydisplay" widget. */
declare interface UIInputInterfacePtcspropertydisplay<A> extends UIBaseInputInterface {
    
    /** Aligns the data in the vertical axis */
    "VerticalMode"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Hides the group title labels */
    "HideGroupTitles"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets a fixed width for the modal window. Setting a fixed width is not applicable in the case of a modal window for an image. The window is auto sized according to the dimensions of image. */
    "ModalWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets a fixed height for the modal window. Setting a fixed height is not applicable in the case of a modal window for an image. The window is auto sized according to the dimensions of image. */
    "ModalHeight"?: NUMBER | BindingTarget<NUMBER>;


    /** Breaks the text across a new line when it exceeds the specified width */
    "MultiLine"?: BOOLEAN;


    /** The text that is displayed if the widget data source does not contain a value */
    "TextIfNoValue"?: STRING | BindingTarget<STRING>;


    /** Disables the widget in the mashup and it cannot be clicked */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Sets the sequence in which a widget is highlighted when a user presses Tab key */
    "TabSequence"?: NUMBER;


    /** The data source for the Property Display  */ 
    "Data"?: BindingTarget<INFOTABLE<A>>;


    /** The field that contains the group title */
    "GroupNameField"?: FIELDNAME<A>;


    /** Displays the label text */
    "Label"?: STRING | BindingTarget<STRING>;


    /** Aligns the label */
    "LabelAlignment"?: STRING<"left" | "right" | "center">;


    /** Sets a type for the label */
    "LabelType"?: STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption">;


    /** Hides the label */
    "HideLabel"?: BOOLEAN;


    /** Aligns the group label */
    "GroupTitleAlignment"?: STRING<"left" | "right" | "center">;


    /** Sets a type for the group titles */
    "GroupTitleType"?: STRING<"header" | "sub-header" | "label" | "body">;


    /** Sets the maximum width for values */
    "ValueMaxWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets the maximum height for values */
    "ValueMaxHeight"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets the minimum width for the values */
    "ValueMinWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** Specify how to display the full value when it exceeds the specified dimensions for the widget. The full value is displayed in a modal window or using a Show More link */
    "DisclosureControl"?: STRING<"disclosure" | "showmore" | "ellipsis">;


    /**  */
    "overflowShowMoreTxt"?: STRING;


    /**  */
    "overflowShowLessTxt"?: STRING;


    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /**  */
    "InfotableInfo"?: STRING;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** Fill the container */
    "FillContainer"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    ref?: UIOutputInterfacePtcspropertydisplay<A>
}

/** The binding source properties and services that can be bound on the "Ptcspropertydisplay" widget. */
declare class UIOutputInterfacePtcspropertydisplay<A> {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Displays a set of key/value pairs */
declare function Ptcspropertydisplay<A>(props: UIInputInterfacePtcspropertydisplay<A>): UIOutputInterfacePtcspropertydisplay<A>

            
/** The properties and events that can be set or bound on the "Ptcsradio" widget. */
declare interface UIInputInterfacePtcsradio extends UIBaseInputInterface {
    
    /** Enables you to set the state of the radio button, as selected or not selected */
    "State"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Use this property to disable the radio button in the mashup */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets an icon image for the tooltip of the Radio Button widget */
    "TooltipIcon"?: IMAGELINK;


    /** Enables you to make a set of radio buttons and choose one */
    "Radiogroup"?: STRING | BindingTarget<STRING>;


    /** The text that is displayed in the Radio Button */
    "Label"?: STRING | BindingTarget<STRING>;


    /** Enables you to set a maximum width and display a truncated label */
    "LabelMaxWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** The sequence number of the radio button widget when you press tab */
    "TabSequence"?: NUMBER;


    /** Displays a tooltip text when you hover over the Radio Button widget */
    "TooltipField"?: STRING | BindingTarget<STRING>;


    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The width of the widget. The width is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed width size */
    "Width"?: NUMBER;


    /** The height of the widget. The height is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed height size */
    "Height"?: NUMBER;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** The event that is triggered when the state of the radio button is modified */
    "StateChanged"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcsradio
}

/** The binding source properties and services that can be bound on the "Ptcsradio" widget. */
declare class UIOutputInterfacePtcsradio {
    
    /** Enables you to set the state of the radio button, as selected or not selected */
    State: BindingTarget<BOOLEAN>;


    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    CustomClass: BindingTarget<STRING>
}

/** Enables you to choose one from a set of options */
declare function Ptcsradio(props: UIInputInterfacePtcsradio): UIOutputInterfacePtcsradio

            
/** The properties and events that can be set or bound on the "Ptcsslider" widget. */
declare interface UIInputInterfacePtcsslider extends UIBaseInputInterface {
    
    /** Select an SVG icon to display within the status message when the validation succeeds. */
    "ValidationSuccessIcon"?: IMAGELINK;


    /** Select SVG icon to display within the hint message for the validation criteria. */
    "ValidationCriteriaIcon"?: IMAGELINK;


    /** Add text to display in the label of the slider */
    "Label"?: STRING | BindingTarget<STRING>;


    /** Align the widget label to the right, left, or center */
    "LabelAlignment"?: STRING<"left" | "right" | "center"> | BindingTarget<STRING<"left" | "right" | "center">>;


    /** The slider value that can be set or bound by the user. This property value is set as the start value when you enable range selection in the slider */
    "Value"?: NUMBER | BindingTarget<NUMBER>;


    /** The minimum slider value that users can set before the validation state is set to invalid. */
    "MinValidValue"?: NUMBER | BindingTarget<NUMBER>;


    /** The message to display when the slider value is lower than the minimum valid value. */
    "MinValueFailureMessage"?: STRING | BindingTarget<STRING>;


    /** The maximum slider value that users can set before the validation state is set to invalid. */
    "MaxValidValue"?: NUMBER | BindingTarget<NUMBER>;


    /** The message to display when the slider value is higher than the maixmum valid value. */
    "MaxValueFailureMessage"?: STRING | BindingTarget<STRING>;


    /** Use this property to disable the widget in the mashup */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Enter the track size in pixels */
    "TrackSize"?: NUMBER | BindingTarget<NUMBER>;


    /** Extend the slider track to fully contain the handle icon */
    "FullTrack"?: BOOLEAN;


    /** Select the size of the minimum icon */
    "MinIconSize"?: STRING<"small" | "medium" | "large" | "xlarge"> | BindingTarget<STRING<"small" | "medium" | "large" | "xlarge">>;


    /** Select the size of the maximum icon */
    "MaxIconSize"?: STRING<"small" | "medium" | "large" | "xlarge"> | BindingTarget<STRING<"small" | "medium" | "large" | "xlarge">>;


    /** Enables you to set a label type */
    "LabelType"?: STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption"> | BindingTarget<STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption">>;


    /** A bindable property that sets the validation state. You can set this property to undefined, unvalidated, valid, or invalid. */
    "ValidationState"?: STRING<"undefined" | "unvalidated" | "valid" | "invalid"> | BindingTarget<STRING<"undefined" | "unvalidated" | "valid" | "invalid">>;


    /** Show a success message when the entered value is validated as successful. */
    "ShowValidationSuccess"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Show a failure message when the entered value fails the validation. */
    "ShowValidationFailure"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Select an SVG icon to display within the status message when the validation fails. */
    "ValidationFailureIcon"?: IMAGELINK;


    /** Show a hint message about the required input when editing the slider. */
    "ShowValidationCriteria"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The message to display when the value is valid. */
    "SuccessMessage"?: STRING | BindingTarget<STRING>;


    /** A secondary message that displays more information about the validation success message. */
    "SuccessMessageDetails"?: STRING | BindingTarget<STRING>;


    /** The message to display for the validation criteria and when the validation fails. */
    "CriteriaMessage"?: STRING | BindingTarget<STRING>;


    /** The details to display for the validation criteria and failure message. */
    "CriteriaMessageDetails"?: STRING | BindingTarget<STRING>;


    /** Enter a value for the second handle when in range selection mode */
    "EndValue"?: NUMBER | BindingTarget<NUMBER>;


    /** Enter the minimum value for the slider */
    "Minimum"?: NUMBER | BindingTarget<NUMBER>;


    /** Enter the maximum value for the slider */
    "Maximum"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets the minimum value width */
    "MinimumValueWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** Select to move the slider by a specific number of steps for each click */
    "SteppingMode"?: BOOLEAN;


    /** Enter the change in value for each step the slider moves. This property value is overridden and reset when the user sets a value for the NumberOfSteps property. */
    "StepSize"?: NUMBER | BindingTarget<NUMBER>;


    /** Enter the number of steps the slider moves for each click. This property value is overridden and reset when the user sets a value for the StepSize property. */
    "NumberOfSteps"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets the number of digits after the decimal point for the slider value. Set this property to a number equal to or higher than the number of digits specified for the StepSize property. For example, when StepSize is set to 0.01, you must set this property to 2 or higher. */
    "ValuePrecision"?: NUMBER;


    /** Select a display option for the slider value label */
    "DisplayValueLabel"?: STRING<"yes" | "no" | "drag">;


    /** Enable users to move the handle by editing the value label in the Mashup */
    "EditableValue"?: BOOLEAN;


    /** Display the labels of the minimum and maximum values */
    "DisplayMinMaxLabels"?: BOOLEAN;


    /** Enter the handle size in pixels */
    "HandleSize"?: NUMBER | BindingTarget<NUMBER>;


    /** Align the track on the center, the start, or the end of the slider */
    "TrackAlignment"?: STRING<"center" | "start" | "end">;


    /** Enter a label for the minimum value */
    "MinValueLabel"?: STRING | BindingTarget<STRING>;


    /** Enter a label for the maximum value */
    "MaxValueLabel"?: STRING | BindingTarget<STRING>;


    /** Select a Media Entity for the handle icon */
    "HandleIcon"?: STRING<"#none" | "#circle" | "#split">;


    /** Select a Media Entity for the second handle icon */
    "SecondHandleIcon"?: STRING<"#none" | "#circle" | "#split">;


    /** Select an icon for the minimum side */
    "MinSideIcon"?: IMAGELINK;


    /** Select an icon for the maximum side */
    "MaxSideIcon"?: IMAGELINK;


    /** Select to add a second handle and enable range selection on the slider */
    "RangeSelection"?: BOOLEAN;


    /** Change the slider orientation to vertical */
    "VerticalSlider"?: BOOLEAN;


    /** Reverse the position of the minimum and maximum values */
    "ReverseMinMaxValues"?: BOOLEAN;


    /** Reverse the label positions of the minimum and maximum values */
    "ReverseLabelPosition"?: BOOLEAN;


    /** Allow the two slider handles to overlap */
    "OverlapHandle"?: BOOLEAN;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The sequence number of the Slider widget when you press the TAB key */
    "TabSequence"?: NUMBER;


    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** Displays a tooltip text when you hover over the Slider handle */
    "HandleTooltipField"?: STRING | BindingTarget<STRING>;


    /** Sets an icon image for the tooltip of the Slider handle */
    "HandleTooltipIcon"?: IMAGELINK;


    /** Displays a tooltip text when you hover over the Slider second handle */
    "SecondHandleTooltipField"?: STRING | BindingTarget<STRING>;


    /** Sets an icon image for the tooltip of the Slider second handle */
    "SecondHandleTooltipIcon"?: IMAGELINK;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** Triggers an event when the value for this widget is changed */
    "ValueChanged"?: ServiceBindingTarget[];


    /** Triggers an event when the slider end value is changed */
    "EndValueChanged"?: ServiceBindingTarget[];


    /** An event that triggers when the widget value is changed. Bind this event to service or function to apply a validation expression. */
    "Validate"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcsslider
}

/** The binding source properties and services that can be bound on the "Ptcsslider" widget. */
declare class UIOutputInterfacePtcsslider {
    
    /** A bindable property used to retrieve the output of the widget validation. Returned values are undefined, unvalidated, valid, or invalid. */
    ValidationOutput: BindingTarget<STRING>;


    /** The slider value that can be set or bound by the user. This property value is set as the start value when you enable range selection in the slider */
    Value: BindingTarget<NUMBER>;


    /** Enter a value for the second handle when in range selection mode */
    EndValue: BindingTarget<NUMBER>;


    /** Enter the minimum value for the slider */
    Minimum: BindingTarget<NUMBER>;


    /** Enter the maximum value for the slider */
    Maximum: BindingTarget<NUMBER>;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** A bindable service that increments the slider value */
    Increment: ServiceBindingTarget;


    /** A bindable service that decrements the slider value */
    Decrement: ServiceBindingTarget;


    /** A bindable service that increments the value of the second handle when range selection mode is enabled */
    IncrementSecondHandle: ServiceBindingTarget;


    /** A bindable service that decrements the value of the second handle when range selection mode is enabled */
    DecrementSecondHandle: ServiceBindingTarget
}

/** Value Slider */
declare function Ptcsslider(props: UIInputInterfacePtcsslider): UIOutputInterfacePtcsslider

            
/** The properties and events that can be set or bound on the "Ptcstabset" widget. */
declare interface UIInputInterfacePtcstabset extends UIBaseInputInterface {
    
    /** Enables you to select a tab that you would like to show at runtime when the mashup is loaded. */
    "DefaultTabNumber"?: NUMBER | BindingTarget<NUMBER>;


    /**  */
    "Items"?: BindingTarget<ARRAY>;


    /** The value of the selected tab */
    "SelectedTabValue"?: BindingTarget<STRING>;


    /** Widget is disabled (styles and behavior). */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Switch to the focused tab automatically when using the arrow keys to change the focus. */
    "SwitchTabOnFocus"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets a maximum width for the tab names. The excess characters are truncated in the tab name. */
    "TabNameMaxWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets the height of the tab name area. */
    "TabNameHeight"?: NUMBER | BindingTarget<NUMBER>;


    /** Enables you to define the CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The sequence number of the Tabs widget when you press tab */
    "TabSequence"?: NUMBER;


    /** Enables you to set the total number of tabs */
    "NumberOfTabs"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** The width of the widget */
    "Width"?: NUMBER;


    /**  */
    "SelectedTab"?: NUMBER;


    /** Tab name */
    "Tab1Name"?: STRING | BindingTarget<STRING>;


    /** Tab value */
    "Tab1Value"?: STRING | BindingTarget<STRING>;


    /** Tab visible */
    "Tab1Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab disabled */
    "Tab1Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab name */
    "Tab2Name"?: STRING | BindingTarget<STRING>;


    /** Tab value */
    "Tab2Value"?: STRING | BindingTarget<STRING>;


    /** Tab visible */
    "Tab2Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab disabled */
    "Tab2Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab name */
    "Tab3Name"?: STRING | BindingTarget<STRING>;


    /** Tab value */
    "Tab3Value"?: STRING | BindingTarget<STRING>;


    /** Tab visible */
    "Tab3Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab disabled */
    "Tab3Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab name */
    "Tab4Name"?: STRING | BindingTarget<STRING>;


    /** Tab value */
    "Tab4Value"?: STRING | BindingTarget<STRING>;


    /** Tab visible */
    "Tab4Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab disabled */
    "Tab4Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab name */
    "Tab5Name"?: STRING | BindingTarget<STRING>;


    /** Tab value */
    "Tab5Value"?: STRING | BindingTarget<STRING>;


    /** Tab visible */
    "Tab5Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab disabled */
    "Tab5Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab name */
    "Tab6Name"?: STRING | BindingTarget<STRING>;


    /** Tab value */
    "Tab6Value"?: STRING | BindingTarget<STRING>;


    /** Tab visible */
    "Tab6Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab disabled */
    "Tab6Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab name */
    "Tab7Name"?: STRING | BindingTarget<STRING>;


    /** Tab value */
    "Tab7Value"?: STRING | BindingTarget<STRING>;


    /** Tab visible */
    "Tab7Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab disabled */
    "Tab7Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab name */
    "Tab8Name"?: STRING | BindingTarget<STRING>;


    /** Tab value */
    "Tab8Value"?: STRING | BindingTarget<STRING>;


    /** Tab visible */
    "Tab8Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab disabled */
    "Tab8Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab name */
    "Tab9Name"?: STRING | BindingTarget<STRING>;


    /** Tab value */
    "Tab9Value"?: STRING | BindingTarget<STRING>;


    /** Tab visible */
    "Tab9Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab disabled */
    "Tab9Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab name */
    "Tab10Name"?: STRING | BindingTarget<STRING>;


    /** Tab value */
    "Tab10Value"?: STRING | BindingTarget<STRING>;


    /** Tab visible */
    "Tab10Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab disabled */
    "Tab10Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab name */
    "Tab11Name"?: STRING | BindingTarget<STRING>;


    /** Tab value */
    "Tab11Value"?: STRING | BindingTarget<STRING>;


    /** Tab visible */
    "Tab11Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab disabled */
    "Tab11Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab name */
    "Tab12Name"?: STRING | BindingTarget<STRING>;


    /** Tab value */
    "Tab12Value"?: STRING | BindingTarget<STRING>;


    /** Tab visible */
    "Tab12Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab disabled */
    "Tab12Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab name */
    "Tab13Name"?: STRING | BindingTarget<STRING>;


    /** Tab value */
    "Tab13Value"?: STRING | BindingTarget<STRING>;


    /** Tab visible */
    "Tab13Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab disabled */
    "Tab13Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab name */
    "Tab14Name"?: STRING | BindingTarget<STRING>;


    /** Tab value */
    "Tab14Value"?: STRING | BindingTarget<STRING>;


    /** Tab visible */
    "Tab14Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab disabled */
    "Tab14Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab name */
    "Tab15Name"?: STRING | BindingTarget<STRING>;


    /** Tab value */
    "Tab15Value"?: STRING | BindingTarget<STRING>;


    /** Tab visible */
    "Tab15Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab disabled */
    "Tab15Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab name */
    "Tab16Name"?: STRING | BindingTarget<STRING>;


    /** Tab value */
    "Tab16Value"?: STRING | BindingTarget<STRING>;


    /** Tab visible */
    "Tab16Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab disabled */
    "Tab16Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** Fill the container */
    "FillContainer"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** A bindable event triggered when an enabled tab is selected */
    "TabSelected"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcstabset
}

/** The binding source properties and services that can be bound on the "Ptcstabset" widget. */
declare class UIOutputInterfacePtcstabset {
    
    /** Enables you to select a tab that you would like to show at runtime when the mashup is loaded. */
    DefaultTabNumber: BindingTarget<NUMBER>;


    /** The value of the selected tab */
    SelectedTabValue: BindingTarget<STRING>;


    /** The name of the selected tab */
    SelectedTabName: BindingTarget<STRING>;


    /** Enables you to define the CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space */
    CustomClass: BindingTarget<STRING>;


    /** A bindable service to reselect the default tab configured for this widget */
    SelectDefaultTab: ServiceBindingTarget;


    /** Resets all the contained widgets to their default values */
    ResetInputsToDefaultValue: ServiceBindingTarget
}

/** Allows you to swap between various tabs easily */
declare function Ptcstabset(props: UIInputInterfacePtcstabset): UIOutputInterfacePtcstabset

            
/** The properties and events that can be set or bound on the "Ptcstextarea" widget. */
declare interface UIInputInterfacePtcstextarea extends UIBaseInputInterface {
    
    /** Select an SVG icon to display within the status message when the validation succeeds */
    "ValidationSuccessIcon"?: IMAGELINK;


    /** Select an SVG icon to display within the hint message for the validation criteria */
    "ValidationCriteriaIcon"?: IMAGELINK;


    /** The text that is displayed in the text area */
    "Text"?: STRING | BindingTarget<STRING>;


    /**  */
    "Value"?: STRING | BindingTarget<STRING>;


    /** The message to display when the value is invalid because of min length */
    "MinLengthFailureMessage"?: STRING | BindingTarget<STRING>;


    /** The message to display when the current value exceeds the maximum character length */
    "MaxLengthFailureMessage"?: STRING | BindingTarget<STRING>;


    /** The message to display when a required value is missing */
    "RequiredMessage"?: STRING | BindingTarget<STRING>;


    /** The text that is displayed in the label of text area */
    "Label"?: STRING | BindingTarget<STRING>;


    /** Counts and displays the number of characters that are entered in the text area */
    "Counter"?: BOOLEAN;


    /** Enables you to set a maximum number of characters in the text area */
    "MaxNumberOfCharacters"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays a hint of the text that needs to be entered in the field. It acts like a placeholder */
    "HintText"?: STRING | BindingTarget<STRING>;


    /** Use this property to disable the text area in the mashup */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Enables you to set the text area as read only and cannot make any edits inside */
    "ReadOnly"?: BOOLEAN;


    /** Sets an icon image for the tooltip of the Text Area widget */
    "TooltipIcon"?: IMAGELINK;


    /** Enables you to align the text */
    "TextAlignment"?: STRING<"left" | "right">;


    /** Enables you to align the label */
    "LabelAlignment"?: STRING<"left" | "right" | "center">;


    /** The sequence number of the Text Area widget when you press tab */
    "TabSequence"?: NUMBER;


    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget. The height is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed height size */
    "Height"?: NUMBER;


    /** Displays a tooltip text when you hover over the Text Area widget */
    "TooltipField"?: STRING | BindingTarget<STRING>;


    /** A bindable property that sets the validation state. You can set this property to undefined, unvalidated, valid, or invalid. */
    "ValidationState"?: STRING<"undefined" | "unvalidated" | "valid" | "invalid"> | BindingTarget<STRING<"undefined" | "unvalidated" | "valid" | "invalid">>;


    /** Require a value in the text area */
    "ValueRequired"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Minimum length for the text area value */
    "MinLength"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum length for the text area value */
    "MaxLength"?: NUMBER | BindingTarget<NUMBER>;


    /** Show a success message when the entered data is validated as successful */
    "ShowValidationSuccess"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Show a failure message when the entered data fails the validation */
    "ShowValidationFailure"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Select an SVG icon to display within the status message when the validation fails */
    "ValidationFailureIcon"?: IMAGELINK;


    /** Show a hint message about the required input pattern when editing the value */
    "ShowValidationCriteria"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The message to display when the value is valid */
    "SuccessMessage"?: STRING | BindingTarget<STRING>;


    /** A secondary message that displays more information about the validation success message */
    "SuccessMessageDetails"?: STRING | BindingTarget<STRING>;


    /** The message to display for the validation criteria and when the validation fails */
    "CriteriaMessage"?: STRING | BindingTarget<STRING>;


    /** The details to display for the validation criteria and failure message */
    "CriteriaMessageDetails"?: STRING | BindingTarget<STRING>;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** Fill the container */
    "FillContainer"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** A bindable event that triggers when a user clicks an area outside the widget after updating the widget value */
    "TextChanged"?: ServiceBindingTarget[];


    /** A bindable event triggered when the data for this widget is modified */
    "Changed"?: ServiceBindingTarget[];


    /** An event that triggers when the widget value is changed. Bind this event to service or function to apply a validation pattern or expression */
    "Validate"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcstextarea
}

/** The binding source properties and services that can be bound on the "Ptcstextarea" widget. */
declare class UIOutputInterfacePtcstextarea {
    
    /** A bindable property used to retrieve the output of the widget validation. Returned values are undefined, unvalidated, valid, or invalid. */
    ValidationOutput: BindingTarget<STRING>;


    /** The text that is displayed in the text area */
    Text: BindingTarget<STRING>;


    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    CustomClass: BindingTarget<STRING>;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget
}

/** Enables you to enter a multi-line text */
declare function Ptcstextarea(props: UIInputInterfacePtcstextarea): UIOutputInterfacePtcstextarea

            
/** The properties and events that can be set or bound on the "Ptcstextfield" widget. */
declare interface UIInputInterfacePtcstextfield extends UIBaseInputInterface {
    
    /** Select an SVG icon to display within the status message when the validation succeeds */
    "ValidationSuccessIcon"?: IMAGELINK;


    /** Select an SVG icon to display within the hint message for the validation criteria */
    "ValidationCriteriaIcon"?: IMAGELINK;


    /** The text that is displayed in the text field */
    "Text"?: STRING | BindingTarget<STRING>;


    /**  */
    "Value"?: STRING | BindingTarget<STRING>;


    /** The message to display when the current value is under the minimum character length */
    "MinLengthFailureMessage"?: STRING | BindingTarget<STRING>;


    /** The message to display when the current value exceeds the maximum character length */
    "MaxLengthFailureMessage"?: STRING | BindingTarget<STRING>;


    /** The message to display when a required value is missing */
    "RequiredMessage"?: STRING | BindingTarget<STRING>;


    /** The text that is displayed in the label of the text field */
    "Label"?: STRING | BindingTarget<STRING>;


    /** Counts and displays the number of characters that are entered in the text field */
    "Counter"?: BOOLEAN;


    /** Enables you to set a maximum number of characters in the textfield */
    "MaxNumberOfCharacters"?: NUMBER | BindingTarget<NUMBER>;


    /** Displays a hint of the text that needs to be entered in the field. It acts like a placeholder */
    "HintText"?: STRING | BindingTarget<STRING>;


    /** Use this property to disable the text field in the mashup */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Enables you to set the text field as read only and cannot make any edits inside */
    "ReadOnly"?: BOOLEAN;


    /** Sets an icon image for the tooltip of the Text Field widget */
    "TooltipIcon"?: IMAGELINK;


    /** Enables you to hide the text field entry */
    "Password"?: BOOLEAN;


    /** Enables you to add a Clear icon inside the text field and allows you to clear the text in the field at runtime when the icon is clicked */
    "ShowClearText"?: BOOLEAN;


    /** Enables you to align the label */
    "LabelAlignment"?: STRING<"left" | "right" | "center">;


    /** Enables you to align the text to the left or right in the field */
    "TextAlignment"?: STRING<"left" | "right">;


    /** Enables you to set predefined characters in the text field. In the property configuration field, use “a” to set an alphabet entry, “9” for numeric, and “*” for alphanumeric entries */
    "Mask"?: STRING | BindingTarget<STRING>;


    /** The sequence number of the Text Field widget when you press tab */
    "TabSequence"?: NUMBER;


    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget. The height is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed height size */
    "Height"?: NUMBER;


    /** Displays a tooltip text when you hover over the Text Field widget */
    "TooltipField"?: STRING | BindingTarget<STRING>;


    /** A bindable property that sets the validation state. You can set this property to undefined, unvalidated, valid, or invalid. */
    "ValidationState"?: STRING<"undefined" | "unvalidated" | "valid" | "invalid"> | BindingTarget<STRING<"undefined" | "unvalidated" | "valid" | "invalid">>;


    /** Require a value in the text field */
    "ValueRequired"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Minimum length for the text field value */
    "MinLength"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum length for the text field value */
    "MaxLength"?: NUMBER | BindingTarget<NUMBER>;


    /** Show a success message when the entered data is validated as successful */
    "ShowValidationSuccess"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Show a failure message when the entered data fails the validation */
    "ShowValidationFailure"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Select an SVG icon to display within the status message when the validation fails */
    "ValidationFailureIcon"?: IMAGELINK;


    /** Show a hint message about the required input pattern when editing the Text Field value */
    "ShowValidationCriteria"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The message to display when the value is valid */
    "SuccessMessage"?: STRING | BindingTarget<STRING>;


    /** A secondary message that displays more information about the validation success message */
    "SuccessMessageDetails"?: STRING | BindingTarget<STRING>;


    /** The message to display for the validation criteria and when the validation fails */
    "CriteriaMessage"?: STRING | BindingTarget<STRING>;


    /** The details to display for the validation criteria and failure message */
    "CriteriaMessageDetails"?: STRING | BindingTarget<STRING>;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** A bindable event triggered when the data for this widget is modified */
    "Changed"?: ServiceBindingTarget[];


    /** A bindable event that triggers when a user presses the Enter key after updating the widget value */
    "EnterKeyPressed"?: ServiceBindingTarget[];


    /** A bindable event that triggers when a user presses the Tab key or clicks an area outside the widget after updating the widget value */
    "FocusLost"?: ServiceBindingTarget[];


    /** An event that triggers when the widget value is changed. Bind this event to service or function to apply a validation pattern or expression */
    "Validate"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcstextfield
}

/** The binding source properties and services that can be bound on the "Ptcstextfield" widget. */
declare class UIOutputInterfacePtcstextfield {
    
    /** A bindable property used to retrieve the output of the widget validation. Returned values are undefined, unvalidated, valid, or invalid. */
    ValidationOutput: BindingTarget<STRING>;


    /** The text that is displayed in the text field */
    Text: BindingTarget<STRING>;


    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    CustomClass: BindingTarget<STRING>;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget
}

/** Enables you to enter a single line text */
declare function Ptcstextfield(props: UIInputInterfacePtcstextfield): UIOutputInterfacePtcstextfield

            
/** The properties and events that can be set or bound on the "Ptcstogglebutton" widget. */
declare interface UIInputInterfacePtcstogglebutton extends UIBaseInputInterface {
    
    /** Enables you to set the state of the toggle button, as selected or not selected */
    "State"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Use this property to disable the toggle button in the mashup */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sets an icon image for the tooltip of the Toggle Button widget */
    "TooltipIcon"?: IMAGELINK;


    /** The text that is displayed in the Toggle Button */
    "Label"?: STRING | BindingTarget<STRING>;


    /** Enables you to set a maximum width and display a truncated label */
    "LabelMaxWidth"?: NUMBER;


    /** The sequence number of the toggle button widget when you press tab */
    "TabSequence"?: NUMBER;


    /** Displays a tooltip text when you hover over the Toggle Button widget */
    "TooltipField"?: STRING | BindingTarget<STRING>;


    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Enables you to align the label to the left or right of the toggle button */
    "LabelAlignment"?: STRING<"left" | "right">;


    /** The width of the widget. The width is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed width size */
    "Width"?: NUMBER;


    /** The height of the widget. The height is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed height size */
    "Height"?: NUMBER;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** A bindable event triggered when the State for this widget is modified */
    "StateChanged"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcstogglebutton
}

/** The binding source properties and services that can be bound on the "Ptcstogglebutton" widget. */
declare class UIOutputInterfacePtcstogglebutton {
    
    /** Enables you to set the state of the toggle button, as selected or not selected */
    State: BindingTarget<BOOLEAN>;


    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    CustomClass: BindingTarget<STRING>;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget
}

/** Enables you to switch between two settings */
declare function Ptcstogglebutton(props: UIInputInterfacePtcstogglebutton): UIOutputInterfacePtcstogglebutton

            
/** The properties and events that can be set or bound on the "Ptcstoolbar" widget. */
declare interface UIInputInterfacePtcstoolbar extends UIBaseInputInterface {
    
    /**  */
    "Variant"?: STRING;


    /** Use this property to disable the widget in the mashup */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Bind an infotable that contains data for the items to display in the dropdown of the chip filter. */
    "FilterData"?: BindingTarget<INFOTABLE>;


    /** The alignment of the filter box when placed in the center region. You can align the box to the left, right, or center. */
    "SimpleFilterAlignment"?: STRING<"left" | "right" | "center"> | BindingTarget<STRING<"left" | "right" | "center">>;


    /** The JSON query used to retrieve the filtered data set. */
    "Query"?: BindingTarget<QUERY>;


    /**  */
    "Borders"?: STRING;


    /** Format the chip filter dates using "DD-MM-YY" patterns that are supported by the Moment.js library. The format is case sensitive and overrides the FilterDateOrder property. */
    "FilterFormatToken"?: STRING;


    /** Sets the order of the day, month, and year for dates that are displayed in the chip filter. */
    "FilterDateOrder"?: STRING<"auto" | "DMY" | "MDY" | "YMD">;


    /** Sets the filter box width. */
    "SimpleFilterWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** The text that is displayed above the dropdown list for the filter categories. */
    "CategoryLabel"?: STRING;


    /** The text that is displayed above the filter conditions dropdown list. */
    "ConditionLabel"?: STRING;


    /** The text that is displayed above the input box which contains the value for the condition in the chip filter. */
    "ValueLabel"?: STRING;


    /** The text that is displayed above the first input box when filtering a range of values using the chip filter. */
    "RangeStartValueLabel"?: STRING;


    /** The text that is displayed above the second input box when filtering a range of values using the chip filter. */
    "RangeEndValueLabel"?: STRING;


    /** The text that is displayed above the dropdown list that is used to set the units when filtering by location or date using the chip filter. */
    "UnitsLabel"?: STRING;


    /** The text that is displayed above the input box for latitude when filtering by location using the chip filter. */
    "LatitudeLabel"?: STRING;


    /** The text that is displayed above the input box for longitude when filtering by location using the chip filter. */
    "LongitudeLabel"?: STRING;


    /**  */
    "ColumnFormat"?: STRING;


    /** Bind an infotable that is formatted using the ToolbarAction data shape to display and configure toolbar items */
    "ActionsData"?: BindingTarget<INFOTABLE>;


    /** Hides the vertical line used to separate the data filter on the toolbar. */
    "HideFilterSeparator"?: BOOLEAN;


    /** Sets the label of the filter box. */
    "SimpleFilterLabel"?: STRING | BindingTarget<STRING>;


    /** Sets the hint text for the filter box. */
    "SimpleFilterHintText"?: STRING;


    /** Sets the filter type. You can display a simple filter box or use the Chip Based Data Filter widget. Select None to hide the filter. */
    "FilterType"?: STRING<"chip" | "none" | "simple">;


    /** Enables you to set or retrieve the string within the simple filter box. */
    "SimpleFilterString"?: BindingTarget<STRING>;


    /** The position of the filter box on the toolbar. You can place the box in the left, right, or center regions. */
    "SimpleFilterPosition"?: STRING<"left" | "right" | "center">;


    /** Sets the position of the chip container for the data filter. You can display the chips at the top or at the bottom of the widget. */
    "FilterChipPosition"?: STRING<"top" | "bottom">;


    /** Sets the type of element used to show and hide the filter chips. */
    "FilterDisclosureType"?: STRING<"link" | "icon">;


    /** Hides the disclosure controls and expands the chip container for the data filter widget. */
    "ShowHideFilters"?: BOOLEAN;


    /** Adds a filter box to the dropdown list for the filter categories. */
    "ShowCategoryListFilter"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Sorts the list of options for the data filter categories in alphabetical order. */
    "SortFilter"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The sequence number of the widget when you press the TAB key */
    "TabSequence"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** The width of the widget */
    "Width"?: NUMBER;


    /** Displays a hint of what needs to be entered in the field. It acts like a placeholder */
    "SelectTextDropdown"?: STRING | BindingTarget<STRING>;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** Fill the container */
    "FillContainer"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** An event that triggers when the filter widget query is changed. */
    "QueryChanged"?: ServiceBindingTarget[];


    /** A bindable event that triggers when the string in the filter box is modified. */
    "SimpleFilterChanged"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcstoolbar
}

/** The binding source properties and services that can be bound on the "Ptcstoolbar" widget. */
declare class UIOutputInterfacePtcstoolbar {
    
    /** The JSON query used to retrieve the filtered data set. */
    Query: BindingTarget<QUERY>;


    /** Enables you to set or retrieve the string within the simple filter box. */
    SimpleFilterString: BindingTarget<STRING>;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget
}

/** Combines common elements that you can configure to display frequently used functions in a compact form. You can use toolbars to create filters, trigger services, and modify the view when working with widgets such as grids, lists, and charts. This widget is available as a preview that includes a subset of features from the current widget. Additional features and migration support will be added in future releases. */
declare function Ptcstoolbar(props: UIInputInterfacePtcstoolbar): UIOutputInterfacePtcstoolbar

            
/** The properties and events that can be set or bound on the "Ptcsvaluedisplay" widget. */
declare interface UIInputInterfacePtcsvaluedisplay<A> extends UIBaseInputInterface {
    
    /** Sets an icon image for the tooltip of the Value Display widget */
    "TooltipIcon"?: IMAGELINK;


    /** The data source for the Value Display widget */
    "Data"?: BindingTarget<ANYSCALAR>;


    /** undefined */
    "Selector"?: FIELDNAME<A>;


    /** The label for the Value Display widget */
    "Label"?: STRING | BindingTarget<STRING>;


    /** Enables you to align the label text horizontally */
    "LabelAlignment"?: STRING<"left" | "right" | "center">;


    /** Align the value on the horizontal axis */
    "HorizontalAlignment"?: STRING<"left" | "right" | "center">;


    /** Align the value on the vertical axis */
    "VerticalAlignment"?: STRING<"flex-start" | "flex-end" | "center">;


    /** The height of the widget. The height is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed height size */
    "Height"?: NUMBER;


    /** The width of the widget. The width is auto calculated by default. Enter a value in the property panel or resize the widget in the workspace to have a fixed width size */
    "Width"?: NUMBER;


    /** Enables you to set a maximum height for the value display container. A disclosure button appears in runtime to show the contents in a pop-up. */
    "MaxHeight"?: NUMBER;


    /** Enables you to set a maximum width for the value display container. If MultiLine is on, the contents will line wrap. */
    "MaxWidth"?: NUMBER;


    /** Sets a fixed height for the modal window. Setting a fixed height is not applicable in the case of a modal window for an image. The window is auto sized according to the dimensions of image. */
    "ModalHeight"?: NUMBER | BindingTarget<NUMBER>;


    /** Sets a fixed width for the modal window. Setting a fixed width is not applicable in the case of a modal window for an image. The window is auto sized according to the dimensions of image. */
    "ModalWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** Use this property to disable the widget in the mashup */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Specify how the value data is formatted in the widget */
    "ValueFormat"?: RENDERERWITHSTATE;


    /** Sets the sequence in which a widget is highlighted when a user presses Tab key */
    "TabSequence"?: NUMBER;


    /**  */
    "DataBaseType"?: STRING;


    /** Select the text type for the widget label */
    "LabelType"?: STRING<"large-header" | "header" | "sub-header" | "large-title" | "title" | "label" | "body" | "caption">;


    /** Break the value text across a new line when it exceeds the specified width */
    "MultiLine"?: BOOLEAN;


    /** The text to display when the widget data source does not contain a value */
    "TextIfNoValue"?: STRING | BindingTarget<STRING>;


    /** Specify how to display the full value when it exceeds the specified dimensions for the widget. The full value is displayed in a modal window or using a Show More link */
    "DisclosureControl"?: STRING<"disclosure" | "showmore" | "ellipsis">;


    /** Specifies how to display image in the widget. Image is displayed in the value display container or in a modal window. */
    "ImageDisclosureControl"?: STRING<"none" | "button">;


    /**  */
    "overflowShowMoreTxt"?: STRING;


    /**  */
    "overflowShowLessTxt"?: STRING;


    /** Displays a tooltip text when you hover over the Value Display widget */
    "TooltipField"?: STRING | BindingTarget<STRING>;


    /**  */
    "UseTheme"?: BOOLEAN;


    /** Fill the container */
    "FillContainer"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


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


    /** Triggers an event when the widget is clicked */
    "Clicked"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePtcsvaluedisplay<A>
}

/** The binding source properties and services that can be bound on the "Ptcsvaluedisplay" widget. */
declare class UIOutputInterfacePtcsvaluedisplay<A> {
    
    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    CustomClass: BindingTarget<STRING>
}

/** Displays a single value */
declare function Ptcsvaluedisplay<A>(props: UIInputInterfacePtcsvaluedisplay<A>): UIOutputInterfacePtcsvaluedisplay<A>

            
/** The properties and events that can be set or bound on the "Autorefresh" widget. */
declare interface UIInputInterfaceAutorefresh extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** The refresh interval in seconds */
    "RefreshInterval"?: NUMBER | BindingTarget<NUMBER>;


    /** Should refresh happen automatically at RefreshInterval? */
    "AutoRefresh"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Should autorefresh widget be visible at runtime? */
    "ShowControls"?: BOOLEAN;


    /** Tab-index for the auto-refresh On/Off toggle */
    "AutoRefreshTabSequence"?: NUMBER;


    /** Text for the "refresh now" button. */
    "Label"?: STRING;


    /** Tab index for the "refresh now" button. */
    "RefreshNowTabSequence"?: NUMBER;


    /** Normal button style, includes optional icon. */
    "Style"?: STYLEDEFINITION;


    /** Style for button on mouse-over. */
    "HoverStyle"?: STYLEDEFINITION;


    /** Style for button when depressed. */
    "ActiveStyle"?: STYLEDEFINITION;


    /** Style for button border when the control has focus. */
    "FocusStyle"?: STYLEDEFINITION;


    /** Position of the "refresh now" icon (see Style property) relative to the label. */
    "IconAlignment"?: STRING<"left" | "right">;


    /** Style for the ON position of the toggle switch. */
    "RefreshToggleStyle"?: STYLEDEFINITION;


    /** Text for the ON position of the toggle switch. */
    "RefreshToggleLabel"?: STRING;


    /** Style for the OFF position of the toggle switch. */
    "RefreshToggleStyleOff"?: STYLEDEFINITION;


    /** Text for the OFF position of the toggle switch. */
    "RefreshToggleLabelOff"?: STRING;


    /** Style (background and icon) for the toggle switch button. */
    "RefreshToggleSliderStyle"?: STYLEDEFINITION;


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


    /** Event that is triggered every time the widget refreshes itself */
    "Refresh"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceAutorefresh
}

/** The binding source properties and services that can be bound on the "Autorefresh" widget. */
declare class UIOutputInterfaceAutorefresh {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Automatically raises an event at user defined time intervals */
declare function Autorefresh(props: UIInputInterfaceAutorefresh): UIOutputInterfaceAutorefresh

            
/** The properties and events that can be set or bound on the "Autorefreshfunction" widget. */
declare interface UIInputInterfaceAutorefreshfunction extends UIBaseInputInterface {
    
    /** The refresh interval in seconds */
    "RefreshInterval"?: NUMBER | BindingTarget<NUMBER>;


    /** Should refresh happen automatically at RefreshInterval? */
    "AutoRefresh"?: BOOLEAN | BindingTarget<BOOLEAN>;


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
    "Refresh"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceAutorefreshfunction
}

/** The binding source properties and services that can be bound on the "Autorefreshfunction" widget. */
declare class UIOutputInterfaceAutorefreshfunction {
    
    /** The refresh interval in seconds */
    RefreshInterval: BindingTarget<NUMBER>;


    /**  */
    ActivateWidgetRefresh: ServiceBindingTarget
}

/** Auto Refresh function - Automatically raises an event at user defined time intervals */
declare function Autorefreshfunction(props: UIInputInterfaceAutorefreshfunction): UIOutputInterfaceAutorefreshfunction

            
/** The properties and events that can be set or bound on the "Blog" widget. */
declare interface UIInputInterfaceBlog extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The Blog to view */
    "Blog"?: THINGNAME | BindingTarget<THINGNAME>;


    /** By default, how would you like the blog results sorted? */
    "View"?: STRING<"summary" | "list" | "log">;


    /** Add new posts within the widget instead of a modal dialog */
    "AddNewPostInline"?: BOOLEAN;


    /** The blog title */
    "Title"?: STRING | BindingTarget<STRING>;


    /** Limit the number of characters to accept in the title field. */
    "TitleCharacterLimit"?: NUMBER | BindingTarget<NUMBER>;


    /** Message to display if user reaches the maximum characters for title. */
    "TitleCharacterLimitMessage"?: STRING | BindingTarget<STRING>;


    /** Tags to filter the blog by */
    "TagsToFilter"?: TAGS | BindingTarget<TAGS>;


    /** Allows you to restrict the vocabulary of the users" choices for Tag filters. */
    "FilterTagVocabularyRestriction"?: VOCABULARYNAME;


    /** Tags to apply for any new blog posts */
    "TagsForPosts"?: TAGS | BindingTarget<TAGS>;


    /** Allows you to restrict the vocabulary of the users" choices for post Tags. */
    "TagsForPostVocabularyRestriction"?: VOCABULARYNAME;


    /** Hide elements in the UI that allow you to configure or indicate tagging */
    "HideTaggingUI"?: BOOLEAN;


    /** Number of words to display outside of blog detail view */
    "WordsInPosts"?: NUMBER | BindingTarget<NUMBER>;


    /** By default, how would you like the blog results sorted */
    "SortOrder"?: STRING<"Newest" | "LastUpdated" | "HighestRated" | "MostActive"> | BindingTarget<STRING<"Newest" | "LastUpdated" | "HighestRated" | "MostActive">>;


    /** Show blog entries starting from this date */
    "StartDateTime"?: DATETIME | BindingTarget<DATETIME>;


    /** Show blog entries up till this date */
    "EndDateTime"?: DATETIME | BindingTarget<DATETIME>;


    /** Date format for the post date of blog entries "User on yyyy-mm-dd hh:mm" */
    "PostDateFormat"?: STRING;


    /** Display time when a post is edited, not just when created */
    "DisplayEditDate"?: BOOLEAN;


    /** Show Blog entries from the this source username */
    "Source"?: STRING | BindingTarget<STRING>;


    /** Show Blog entries based on this search expression */
    "SearchExpression"?: STRING | BindingTarget<STRING>;


    /** Blog Entry ID that you"d like to be selected */
    "BlogEntryIdToShow"?: STRING | BindingTarget<STRING>;


    /** Allow new posts? */
    "AllowNewPosts"?: BOOLEAN;


    /** The file repository for uploaded images and files */
    "FileRepository"?: THINGNAME | BindingTarget<THINGNAME>;


    /** Path for uploaded images and files */
    "FileRepositoryPath"?: STRING | BindingTarget<STRING>;


    /** width of widget */
    "Width"?: NUMBER;


    /** height of widget */
    "Height"?: NUMBER;


    /** The background blog style */
    "BlogStyle"?: STYLEDEFINITION;


    /** The background header blog style */
    "BlogHeaderStyle"?: STYLEDEFINITION;


    /** The Blog link style */
    "BlogLinksStyle"?: STYLEDEFINITION;


    /** The Blog post background style */
    "BlogPostStyle"?: STYLEDEFINITION;


    /** The blog post entry toolbar background style */
    "BlogPostToolbarStyle"?: STYLEDEFINITION;


    /** The blog post button style */
    "BlogButtonsStyle"?: STYLEDEFINITION;


    /** The blog post button hover style */
    "BlogButtonsHoverStyle"?: STYLEDEFINITION;


    /** The blog post active button style */
    "BlogButtonsActiveStyle"?: STYLEDEFINITION;


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


    ref?: UIOutputInterfaceBlog
}

/** The binding source properties and services that can be bound on the "Blog" widget. */
declare class UIOutputInterfaceBlog {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** To be used externally so you only have one auto-refresh on a page.  Does not refresh the browser, just triggers RefreshRequested which you then bind to the services you would like to trigger */
    Refresh: ServiceBindingTarget
}

/** Enabled the user to manipulate a blog */
declare function Blog(props: UIInputInterfaceBlog): UIOutputInterfaceBlog

            
/** The properties and events that can be set or bound on the "Bubblechart" widget. */
declare interface UIInputInterfaceBubblechart<A,B,C,D,E,F,G,H> extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Use a Single Data Source for All Series */
    "SingleDataSource"?: BOOLEAN;


    /** Allow item selection */
    "AllowSelection"?: BOOLEAN;


    /** Minimum bubble size */
    "MinimumBubbleSize"?: NUMBER;


    /** Maximum bubble size */
    "MaximumBubbleSize"?: NUMBER;


    /** Allow to normalize bubble size */
    "NormalizeBubbleSize"?: BOOLEAN;


    /** Format for X axis values */
    "XAxisFormat"?: STRING;


    /** Minimum range for the X axis */
    "XAxisMinimum"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the X axis */
    "XAxisMaximum"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the X axis */
    "XAxisAutoscale"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the X axis */
    "XAxisZeroscale"?: BOOLEAN;


    /** Attempt to use round values to scale the X axis */
    "XAxisSmoothScaling"?: BOOLEAN;


    /** Number of X axis chart intervals (affects ticks, grid) */
    "XAxisIntervals"?: NUMBER;


    /** Number of X axis minor ticks */
    "XAxisMinorTicks"?: NUMBER;


    /** Number of X axis labels */
    "XAxisLabels"?: NUMBER;


    /** Max characters to display before truncating with ellipses and showing full label text in tooltip. Default 0 disables feature, negative values trim characters from start. */
    "TruncateX-AxisLabels"?: NUMBER;


    /** Show X axis labels */
    "ShowXAxisLabels"?: BOOLEAN;


    /** Show X axis ticks */
    "ShowXAxisTicks"?: BOOLEAN;


    /** Allow zooming the X axis */
    "AllowXAxisZoom"?: BOOLEAN;


    /** Show or hide Y axis */
    "ShowYAxis"?: BOOLEAN;


    /** Y axis mode */
    "YAxisMode"?: STRING<"single" | "dual" | "multi">;


    /** Chart Y axis style */
    "YAxisStyle"?: STYLEDEFINITION;


    /** Number of Y axis chart intervals (affects ticks, grid) */
    "YAxisIntervals"?: NUMBER;


    /** Number of Y axis minor ticks */
    "YAxisMinorTicks"?: NUMBER;


    /** Number of Y axis labels */
    "YAxisLabels"?: NUMBER;


    /** Max characters to display before truncating with ellipses and showing full label text in tooltip. Default 0 disables feature, negative values trim characters from start. */
    "TruncateY-AxisLabels"?: NUMBER;


    /** Show Y axis labels */
    "ShowYAxisLabels"?: BOOLEAN;


    /** Show Y axis ticks */
    "ShowYAxisTicks"?: BOOLEAN;


    /** Allow zooming the Y axis */
    "AllowYAxisZoom"?: BOOLEAN;


    /** Shows the chart legend */
    "ShowLegend"?: BOOLEAN;


    /** The location of the legend relative to the chart */
    "LegendLocation"?: STRING<"right" | "top" | "bottom" | "left">;


    /** Sets the chart legend width */
    "LegendWidth"?: NUMBER;


    /** The orientation of the chart legend */
    "LegendOrientation"?: STRING<"vertical" | "horizontal">;


    /** Format for Y axis values */
    "YAxisFormat"?: STRING;


    /** Minimum range for the Y axis */
    "YAxisMinimum"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the Y axis */
    "YAxisMaximum"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the Y axis */
    "YAxisAutoscale"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "YAxisZeroscale"?: BOOLEAN;


    /** The width of the bubble chart in the mashup */
    "Width"?: NUMBER;


    /** The height of the bubble chart in the mashup */
    "Height"?: NUMBER;


    /**  */
    "ToolTipField"?: undefined;


    /** Data Source */ 
    "DataSource1"?: BindingTarget<INFOTABLE<A>>;


    /** X axis field */
    "XAxisField1"?: FIELDNAME<A>;


    /** Y axis field */
    "YAxisField1"?: FIELDNAME<A>;


    /** Bubble value field */
    "BubbleValueField1"?: FIELDNAME<A>;


    /** bubble style */
    "BubbleStyle1"?: STYLEDEFINITION;


    /** Data Source */ 
    "DataSource2"?: BindingTarget<INFOTABLE<B>>;


    /** X axis field */
    "XAxisField2"?: FIELDNAME<B>;


    /** Y axis field */
    "YAxisField2"?: FIELDNAME<B>;


    /** Bubble value field */
    "BubbleValueField2"?: FIELDNAME<B>;


    /** bubble style */
    "BubbleStyle2"?: STYLEDEFINITION;


    /** Data Source */ 
    "DataSource3"?: BindingTarget<INFOTABLE<C>>;


    /** X axis field */
    "XAxisField3"?: FIELDNAME<C>;


    /** Y axis field */
    "YAxisField3"?: FIELDNAME<C>;


    /** Bubble value field */
    "BubbleValueField3"?: FIELDNAME<C>;


    /** bubble style */
    "BubbleStyle3"?: STYLEDEFINITION;


    /** Data Source */ 
    "DataSource4"?: BindingTarget<INFOTABLE<D>>;


    /** X axis field */
    "XAxisField4"?: FIELDNAME<D>;


    /** Y axis field */
    "YAxisField4"?: FIELDNAME<D>;


    /** Bubble value field */
    "BubbleValueField4"?: FIELDNAME<D>;


    /** bubble style */
    "BubbleStyle4"?: STYLEDEFINITION;


    /** Data Source */ 
    "DataSource5"?: BindingTarget<INFOTABLE<E>>;


    /** X axis field */
    "XAxisField5"?: FIELDNAME<E>;


    /** Y axis field */
    "YAxisField5"?: FIELDNAME<E>;


    /** Bubble value field */
    "BubbleValueField5"?: FIELDNAME<E>;


    /** bubble style */
    "BubbleStyle5"?: STYLEDEFINITION;


    /** Data Source */ 
    "DataSource6"?: BindingTarget<INFOTABLE<F>>;


    /** X axis field */
    "XAxisField6"?: FIELDNAME<F>;


    /** Y axis field */
    "YAxisField6"?: FIELDNAME<F>;


    /** Bubble value field */
    "BubbleValueField6"?: FIELDNAME<F>;


    /** bubble style */
    "BubbleStyle6"?: STYLEDEFINITION;


    /** Data Source */ 
    "DataSource7"?: BindingTarget<INFOTABLE<G>>;


    /** X axis field */
    "XAxisField7"?: FIELDNAME<G>;


    /** Y axis field */
    "YAxisField7"?: FIELDNAME<G>;


    /** Bubble value field */
    "BubbleValueField7"?: FIELDNAME<G>;


    /** bubble style */
    "BubbleStyle7"?: STYLEDEFINITION;


    /** Data Source */ 
    "DataSource8"?: BindingTarget<INFOTABLE<H>>;


    /** X axis field */
    "XAxisField8"?: FIELDNAME<H>;


    /** Y axis field */
    "YAxisField8"?: FIELDNAME<H>;


    /** Bubble value field */
    "BubbleValueField8"?: FIELDNAME<H>;


    /** bubble style */
    "BubbleStyle8"?: STYLEDEFINITION;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


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


    /** Triggers an event when the user double clicks the widget */
    "DoubleClicked"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceBubblechart<A,B,C,D,E,F,G,H>
}

/** The binding source properties and services that can be bound on the "Bubblechart" widget. */
declare class UIOutputInterfaceBubblechart<A,B,C,D,E,F,G,H> {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Displays a bubble/scatter chart */
declare function Bubblechart<A,B,C,D,E,F,G,H>(props: UIInputInterfaceBubblechart<A,B,C,D,E,F,G,H>): UIOutputInterfaceBubblechart<A,B,C,D,E,F,G,H>

            
/** The properties and events that can be set or bound on the "Button" widget. */
declare interface UIInputInterfaceButton extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The text that appears on the button */
    "Label"?: STRING;


    /** Context id for use to identify this button */
    "ContextId"?: STRING | BindingTarget<STRING>;


    /** Enable a single click to perform click event on a tablet (without displaying button's tooltip) */
    "SingleClickSelectOnTablets"?: BOOLEAN;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** Tab sequence index */
    "TabSequence"?: NUMBER;


    /** Require a confirmation dialog */
    "ConfirmationRequired"?: BOOLEAN;


    /** Title for the optional confirmation dialog */
    "ConfirmationTitle"?: STRING;


    /** Prompt for the optional confirmation dialog */
    "ConfirmationPrompt"?: STRING;


    /** Label for the first confirmation dialog button */
    "ConfirmationButton1Label"?: STRING;


    /** Label for the second confirmation dialog button */
    "ConfirmationButton2Label"?: STRING;


    /** Default button for the confirmation dialog */
    "DefaultConfirmationButton"?: STRING<"button1" | "button2">;


    /** Cancel button for the confirmation dialog */
    "CancelConfirmationButton"?: STRING<"button1" | "button2">;


    /** Do you want the corners on the button rounded? */
    "RoundedCorners"?: BOOLEAN;


    /** Button is disabled. */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The style of the button */
    "Style"?: STYLEDEFINITION;


    /** The hover style of the button */
    "HoverStyle"?: STYLEDEFINITION;


    /** The style of the button when it is clicked on */
    "ActiveStyle"?: STYLEDEFINITION;


    /** The style of the button when it is selected */
    "FocusStyle"?: STYLEDEFINITION;


    /** The style of the button when it is disabled */
    "DisabledStyle"?: STYLEDEFINITION;


    /** Either align the icon for the button to the left or the right of the text */
    "IconAlignment"?: STRING<"left" | "right">;


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


    /** Triggers an event when the widget is clicked */
    "Clicked"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceButton
}

/** The binding source properties and services that can be bound on the "Button" widget. */
declare class UIOutputInterfaceButton {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Context id for use to identify this button */
    ContextId: BindingTarget<STRING>
}

/** Raises an event when the user clicks it. */
declare function Button(props: UIInputInterfaceButton): UIOutputInterfaceButton

            
/** The properties and events that can be set or bound on the "Checkbox" widget. */
declare interface UIInputInterfaceCheckbox extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Display text for the checkbox label */
    "Prompt"?: STRING;


    /** The width of the Checkbox in the mashup */
    "Width"?: NUMBER;


    /** The height of the Checkbox in the mashup */
    "Height"?: NUMBER;


    /** When selected the checkbox state is checked */
    "State"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** When selected the checkbox is disabled */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** When enabled makes the widget visible in the mashup */
    "Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab sequence index */
    "TabSequence"?: NUMBER;


    /** The checkbox background style */
    "Style"?: STYLEDEFINITION;


    /** The style when the checkbox is selected  */
    "FocusStyle"?: STYLEDEFINITION;


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


    /** A bindable event triggered when the data for this widget is modified */
    "Changed"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceCheckbox
}

/** The binding source properties and services that can be bound on the "Checkbox" widget. */
declare class UIOutputInterfaceCheckbox {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** When selected the checkbox state is checked */
    State: BindingTarget<BOOLEAN>;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget
}

/** Enables the user to select or de-select an option. */
declare function Checkbox(props: UIInputInterfaceCheckbox): UIOutputInterfaceCheckbox

            
/** The properties and events that can be set or bound on the "Collection" widget. */
declare interface UIInputInterfaceCollection<A> extends UIBaseInputInterface {
    
    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** Represents the data source of this collection widget. */ 
    "Data"?: BindingTarget<INFOTABLE<A>>;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The type of layout to use. */
    "View"?: STRING<"table" | "flow"> | BindingTarget<STRING<"table" | "flow">>;


    /** Load / Unload: loads and unloads items on demand. Load all: loads all items on data refresh, should be used only for relatively small data sets. */
    "ItemLoadBehavior"?: STRING<"loadUnload" | "loadAll">;


    /** The mashup to use for data items. */
    "Mashup"?: MASHUPNAME | BindingTarget<MASHUPNAME>;


    /** The default height to use for the collection widget cells. */
    "MashupHeight"?: INTEGER;


    /** The default width to use for cells. */
    "MashupWidth"?: INTEGER;


    /** Required. A field providing a unique identifier of each collection item. */
    "UIDField"?: FIELDNAME<A>;


    /** Optional. When set or bound, this is the Infotable field by which section contents are sorted. The sorting is performed client-side and does not affect the source infotable or other widgets bound to the data set. */
    "SortField"?: FIELDNAME<A> | BindingTarget<FIELDNAME<A>>;


    /** Used with SortField. When enabled, the sort will be performed ascending, otherwise it will be descending. */
    "SortAscending"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Optional. Represents the section identifier by which to group the items. If set, the items will be grouped in sections. */
    "SectionField"?: FIELDNAME<A>;


    /** If using sections, this represents the left section inset */
    "SectionInsetLeft"?: INTEGER;


    /** If using sections, this represents the top section inset */
    "SectionInsetTop"?: INTEGER;


    /** If using sections, this represents the right section inset */
    "SectionInsetRight"?: INTEGER;


    /** If using sections, this represents the bottom section inset */
    "SectionInsetBottom"?: INTEGER;


    /** If enabled, the final row in each section will be aligned to the left rather than the center. */
    "LeftAlignFinalRow"?: BOOLEAN;


    /** Controls how cells will flow in their row. */
    "FlowLayoutGravity"?: STRING<"Edge" | "Spaced" | "Center" | "Expand">;


    /** Must be used with Flow layout. Controls how cells will be aligned vertically in their row. */
    "FlowLayoutAlignment"?: STRING<"Top" | "Center" | "Bottom" | "Expand">;


    /** Controls the spacing between headers, rows and footers. */
    "FlowLayoutContentGravity"?: STRING<"Top" | "Center" | "Bottom">;


    /** Controls the spacing between headers, rows and footers. */
    "RowSpacing"?: INTEGER;


    /** Controls the minimum amount of horizontal spacing between cells. */
    "MinimumSpacing"?: INTEGER;


    /** Controls the padding of top margin and the first item. */
    "TopPadding"?: INTEGER;


    /** Controls the padding of the bottom margin and the last item. */
    "BottomPadding"?: INTEGER;


    /** Hover - scrollbar gets displayed only when you hover over the widget. Always On - scrollbar is always displayed. Note - This applies only to Windows. */
    "ScrollbarType"?: STRING<"hover" | "alwayson">;


    /** Optional: Use a field to provide the mashup name to use from data. This property supersedes Mashup and SelectedFieldMashup. */
    "MashupNameField"?: FIELDNAME<A>;


    /** A serialized JSON object that has infotable fields as its keys and mashup parameters as values. Ex. {"min_temp":"minTemp"} */
    "MashupPropertyBinding"?: JSON;


    /** A serialized JSON object that has global parameter names as its keys and data types as values. These are properties that may be bound on the collection widget and will be sent down to each cell mashup. {"minTemp":"STRING"} */
    "MashupGlobalPropertyBinding"?: JSON;


    /** Specify the field to define the default width for cells from a service. Values supercede CellWidth. */
    "CellWidthField"?: FIELDNAME<A>;


    /** Specify the field to define the default height for cells from a service. Values supercede CellHeight. */
    "CellHeightField"?: FIELDNAME<A>;


    /** Must be used with MashupNameField and static cell mashups. Will match each cell size to the mashup it contains. */
    "UseMashupDimensions"?: BOOLEAN;


    /** If enabled, cells can be selected, otherwise cells will be unselectable by this collection widget. */
    "AllowSelection"?: BOOLEAN;


    /** If enabled, more than one cell can be selected at a time. */
    "MultiSelect"?: BOOLEAN;


    /** If enabled, cells in a flat list will be rendered in the same row without wrapping to the next line. */
    "DisableWrapping"?: BOOLEAN;


    /** Controls the multiple selection behaviour. */
    "CellMultipleSelectionType"?: STRING<"Disabled" | "ClickTap" | "SelectionMode" | "CtrlClick">;


    /** Enables selection changes to cause the collection to scroll to the first selected cell. */
    "ScrollsToSelectedCell"?: BOOLEAN;


    /** When enabled, when data is updated and no cell is selected, the collection widget will automatically select the first available cell. */
    "AutoSelectFirstRow"?: BOOLEAN;


    /** Assign the selected items via an infotable */
    "SelectedItems"?: BindingTarget<INFOTABLE>;


    /** Optional. If specified, identifies the field that provides selection state for each collection item. */
    "CellMashupSelectedField"?: STRING;


    /** If enabled, collection will receive and transmit selection updates to its data service. */
    "HandleSelectionUpdates"?: BOOLEAN;


    /** An alternative mashup to use for selected cells. This mashup should have the same properties as the cell mashup. Has priority over CellSelectedStyle. */
    "SelectedMashupName"?: MASHUPNAME | BindingTarget<MASHUPNAME>;


    /** Optional. If specified, this mashup will be displayed when the data set is empty. */
    "EmptyMashupName"?: MASHUPNAME;


    /** Controls the background of cells. Only the background color property of the style is used. */
    "CellStyle"?: STYLEDEFINITION;


    /** Controls the Alternate background of cells. Only the background color property of the style is used. */
    "CellAlternateStyle"?: STYLEDEFINITION;


    /** Controls the background color of the selected cells. Only the background color property of the style is used. */
    "CellSelectedStyle"?: STYLEDEFINITION;


    /** Controls the background color of the cells when hovering. Only the background color property of the style is used. */
    "CellHoverStyle"?: STYLEDEFINITION;


    /** Controls the background color of the cells when pressed. Only the background color property of the style is used. */
    "CellActiveStyle"?: STYLEDEFINITION;


    /** Must be used with UseRippleEffect. Only the background color property of this style is used , which will be applied to the ripple animation effect. */
    "RippleEffectStyle"?: STYLEDEFINITION;


    /** If enabled, a ripple animation effect is used when clicking on cells. Using this option will cause the cells to have their overflow property set to hidden. */
    "UseRippleEffect"?: BOOLEAN;


    /** An optional border radius to apply to the cells. When this value is set to a non-empty string, e.g. 12px, the cells will have their overflow property set to hidden. */
    "CellBorderRadius"?: STRING;


    /** When set to a non-empty string, this will be used as the box-shadow for the cells. For example: 10px 10px 5px #888888 */
    "CellBoxShadow"?: STRING;


    /** Controls how the mouse pointer appears when hovering over this collection view's cells. */
    "CellPointer"?: STRING<"auto" | "pointer" | "default">;


    /** If set to a string-based state definition, this will be the cell menu that appears when sliding over the cells. On devices without a touch interface, this menu can be displayed by right-clicking on the cells. */
    "CellMenuStates"?: STATEDEFINITION;


    /** If disabled, the default menu invoking behaviors will be disabled. */
    "CellMenuStatesUseBuiltin"?: BOOLEAN;


    /** Must be used with CellSlideMenu. The menu icons will be set to this size. */
    "CellMenuStatesIconSize"?: INTEGER;


    /** Must be used with CellSlideMenu. Controls how the icon is anchored to the text in the menu entry. */
    "CellMenuStatesIconGravity"?: STRING<"Left" | "Above" | "Right" | "Below">;


    /** Must be used with CellSlideMenu. Controls how the menu entries are laid out. */
    "CellMenuStatesOrientation"?: STRING<"Horizontal" | "Vertical">;


    /** If enabled and using sections, each section will have a header. */
    "ShowHeaders"?: BOOLEAN;


    /** The mashup to use for headers, must be used with SectionField and ShowHeaders. */
    "HeaderMashupName"?: MASHUPNAME;


    /** The mashup parameter that will receive the section identifier. */
    "HeaderSectionParam"?: STRING;


    /** The height of the header mashups. Must be used with SectionField and ShowsHeaders. */
    "HeaderHeight"?: INTEGER;


    /** Sticks headers to the top edge of the collection widget. */
    "PinHeadersToTop"?: BOOLEAN;


    /** If enabled and using sections, each section will have a footer. */
    "ShowFooters"?: BOOLEAN;


    /** The mashup to use for footers. Must be used with SectionField and ShowsFooters. */
    "FooterMashupName"?: MASHUPNAME;


    /** The mashup parameter that will receive the section identifier. */
    "FooterSectionParam"?: STRING;


    /** The height of the footer mashups. Must be used with SectionField and ShowsFooters. */
    "FooterHeight"?: INTEGER;


    /** Sticks footers to the bottom edge of the collection widget. */
    "PinFootersToBottom"?: BOOLEAN;


    /** If enabled, an animation will be played to show the cells when the data first arrives to this collection widget. */
    "PlaysIntroAnimation"?: BOOLEAN;


    /** Optional. If specified and Data is not bound, this allows the CreateItem... services to be invoked. */
    "DataShape"?: DATASHAPENAME;


    /** Defaults to 0. If specified or bound, this index is used when invoking the CreateItemAtIndex service. */
    "CreationIndex"?: INTEGER | BindingTarget<INTEGER>;


    /** Optional. If bound, this item UID is used when invoking the DeleteItem service. */
    "DeletionUID"?: ANYSCALAR | BindingTarget<ANYSCALAR>;


    /** Optional. If specified, this mashup is used for cells that are being edited. */
    "CellMashupNameEditing"?: MASHUPNAME | BindingTarget<MASHUPNAME>;


    /** Optional. If specified, this is the mashup parameter that will receive the editing state of the mashup. */
    "CellMashupEditingParameter"?: STRING;


    /** Enable iScroll on Windows Desktops */
    "UseCustomScrollerOnWindowsDesktops"?: BOOLEAN;


    /** Enable iScroll on iOS Safari */
    "AlwaysUseCustomScrollerOniOS"?: BOOLEAN;


    /** The percentage of frame size to use when computing a new off-screen buffer size. Higher values will cause more off-screen elements to be rendered which decreases the flicker at high scrolling speeds. Lower values decrease the number of off-screen elements and should be used to reduce the jitter on iOS when complex layouts that reflow often are used as cell contents (such as cells with many gauges). */
    "OffScreenBufferFactor"?: NUMBER;


    /**  */
    "_EventDataShape"?: STRING;


    /**  */
    "_CanDoubleClick"?: BOOLEAN;


    /**  */
    "_MenuDefinition"?: STRING;


    /**  */
    "_GlobalDataShape"?: STRING;


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


    /** Triggered whenever any cell is clicked or tapped. */
    "CellWasClicked"?: ServiceBindingTarget[];


    /** Triggered whenever any cell is right-clicked. */
    "CellWasRightClicked"?: ServiceBindingTarget[];


    /** Triggered whenever any cell is double-clicked or double-tapped. */
    "CellWasDoubleClicked"?: ServiceBindingTarget[];


    /** Triggered whenever any cell is long-clicked or long-tapped. */
    "CellWasLongClicked"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceCollection<A>
}

/** The binding source properties and services that can be bound on the "Collection" widget. */
declare class UIOutputInterfaceCollection<A> {
    
    /** Represents the data source of this collection widget. */
    Data: BindingTarget<INFOTABLE<A>>;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Will be set to true whenever there is at least one selected cell in this collection widget. */
    HasSelectedCells: BindingTarget<BOOLEAN>;


    /** Contains the number of selected cells in the collection view. */
    SelectedCellsCount: BindingTarget<INTEGER>;


    /** Collection will deselect all rows from its data set when invoked. */
    Deselect: ServiceBindingTarget;


    /** Collection will select all rows in its data set when invoked. */
    SelectAll: ServiceBindingTarget
}

/** A widget that manages a list of Mashup elements, adding and removing them from view based on the current scroll position. */
declare function Collection<A>(props: UIInputInterfaceCollection<A>): UIOutputInterfaceCollection<A>

            
/** The properties and events that can be set or bound on the "Container" widget. */
declare interface UIInputInterfaceContainer extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Is the container being staged in a responive layout? */
    "ResponsiveLayout"?: BOOLEAN;


    /**  */
    "userCannotRemove"?: BOOLEAN;


    /** The background and border style */
    "Style"?: STYLEDEFINITION;


    /** Should this container start out expanded? */
    "Expanded"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Should this container be on top of any content?  Typically used to provide a layered container either transparent on top of content, or in conjunction with expand / collapse to bring temporary content to the users attention. */
    "Overlay"?: BOOLEAN;


    /** Allow click through on a sidebar or header/footer that you have styled to be transparent */
    "OverlayIsTransparent"?: BOOLEAN;


    /** Should this container animate when expanding/collapsing? */
    "AnimateExpandCollapse"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Should this container show an expand/collapse tab? */
    "ShowExpandCollapseTab"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Where to locate the expand/collapse tab. */
    "ExpandCollapseTabLocation"?: STRING<"inside" | "outside">;


    /** UNUSED: Where should the expand / collapse tab appear? */
    "TabLocation"?: STRING<"top" | "center" | "bottom">;


    /** How many pixels should the expand / collapse tab be offset from our default location?  Use a negative number to move up/left and positive to move down/right */
    "TabOffset"?: NUMBER;


    /** How many pixels high should the expand / collapse tab be? */
    "TabHeight"?: NUMBER;


    /** How many pixels wide should the expand / collapse tab be? */
    "TabWidth"?: NUMBER;


    /** The style when the tab is expanded.  i.e. what to show to expand the container */
    "TabExpandStyle"?: STYLEDEFINITION;


    /** The style when the tab is collapsed.  i.e. what to show to collapse the container */
    "TabCollapseStyle"?: STYLEDEFINITION;


    /** By default, if your Container style definition uses an image, it will not be repeated (tiled). */
    "BGImageRepeat"?: STRING<"no-repeat" | "repeat" | "repeat-x" | "repeat-y">;


    /** Default will auto set to the actual width and height of the image. Cover will scale to be as large as possible. Contain will scale to the largest size such that both width and height can fit. */
    "BGImageSize"?: STRING<"auto" | "cover" | "contain">;


    /**  */
    "MinWidth"?: NUMBER;


    /**  */
    "MinHeight"?: NUMBER;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /** Show a spinner icon when data is being loaded */
    "ShowDataLoading"?: BOOLEAN;


    /** When enabled makes the widget visible in the mashup */
    "Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The z-index of the widget which allows you to put the widget on top or on the bottom of the view stack */
    "Z-index"?: NUMBER;


    /**  */
    "Margin"?: STYLECSSRECTSIZE;


    ref?: UIOutputInterfaceContainer
}

/** The binding source properties and services that can be bound on the "Container" widget. */
declare class UIOutputInterfaceContainer {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Should this container start out expanded? */
    Expanded: BindingTarget<BOOLEAN>;


    /** When triggered, it will open if closed and close if open */
    ToggleExpandCollapse: ServiceBindingTarget;


    /** Will expand the container */
    Expand: ServiceBindingTarget;


    /** Will collapse the container */
    Collapse: ServiceBindingTarget;


    /** Resets all the contained widgets to their default values */
    ResetInputsToDefaultValue: ServiceBindingTarget
}

/** Container */
declare function Container(props: UIInputInterfaceContainer): UIOutputInterfaceContainer

            
/** The properties and events that can be set or bound on the "Dashboard" widget. */
declare interface UIInputInterfaceDashboard extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The width of dashboard */
    "Width"?: NUMBER;


    /** The height of dashboard */
    "Height"?: NUMBER;


    /** The database id of the dashboard */
    "DashboardID"?: DASHBOARDNAME | BindingTarget<DASHBOARDNAME>;


    /** Mashup to use to add gadgets from within the dashboard widget */
    "MashupToAddGadgets"?: MASHUPNAME | BindingTarget<MASHUPNAME>;


    /** Allows you to specify a specific width for Add Gadget popup.  Necessary for responsive popups, but useful for static mashups as well.  If you set this too small for a static mashup, there will be scrollbars in the popup.  Leave this at 0 to have the popup auto-adjust to the size of the mashup. */
    "MashupToAddFixedWidth"?: NUMBER;


    /** Allows you to specify a specific height for Add Gadget popup.  Necessary for responsive popups, but useful for static mashups as well.  If you set this too small for a static mashup, there will be scrollbars in the popup.  Leave this at 0 to have the popup auto-adjust to the size of the mashup. */
    "MashupToAddFixedHeight"?: NUMBER;


    /** Allows you to specify a specific width for Edit Gadget popup.  Necessary for responsive popups, but useful for static mashups as well.  If you set this too small for a static mashup, there will be scrollbars in the popup.  Leave this at 0 to have the popup auto-adjust to the size of the mashup. */
    "MashupToEditFixedWidth"?: NUMBER;


    /** Allows you to specify a specific height for Edit Gadget popup.  Necessary for responsive popups, but useful for static mashups as well.  If you set this too small for a static mashup, there will be scrollbars in the popup.  Leave this at 0 to have the popup auto-adjust to the size of the mashup. */
    "MashupToEditFixedHeight"?: NUMBER;


    /** When enabled makes the widget visible in the mashup */
    "Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Dashboard widget will take on the maximum available width in the mashup when enabled */
    "EnableMaxWidth"?: BOOLEAN;


    /** Show the bound dashboard only. */
    "ShowSpecifiedDashboardOnly"?: BOOLEAN;


    /** The maximum width for the Dashboard widget in the mashup. Only takes effect when "EnableMaxWidth" is enabled. */
    "MaxWidth"?: NUMBER;


    /** Show a tab for each created Dashboard when enabled */
    "ShowTabs"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Specify in pixels the spacing between groups and the edges of the dashboard widget. */
    "DashboardGroupMargin"?: NUMBER;


    /** If UseUserPreferences is false, the users changes to tab sequences and expand/collapse will not be retained */
    "UseUserPreferences"?: BOOLEAN;


    /** Allows the end-user to create a new Dashboard when enabled */
    "AllowCreateDashboard"?: BOOLEAN;


    /** Allows the end-user to share a Dashboard when enabled */
    "AllowShareDashboard"?: BOOLEAN;


    /** Allows the end-user to delete a Dashboard when enabled */
    "AllowDeleteDashboard"?: BOOLEAN;


    /** Allows the end-user to add or delete groups or gadgets or rearrange when enabled */
    "AllowEditDashboard"?: BOOLEAN;


    /** Allows the end-user to add or delete gadgets directly from this widget when enabled */
    "AllowAddGadget"?: BOOLEAN;


    /** The Dashboard background style */
    "DashboardStyle"?: STYLEDEFINITION | BindingTarget<STYLEDEFINITION>;


    /** The Dashboard title style */
    "DashboardTitleStyle"?: STYLEDEFINITION;


    /** The Dashboard group style */
    "DashboardGroupStyle"?: STYLEDEFINITION;


    /** The Dashboard group title style */
    "DashboardGroupTitleStyle"?: STYLEDEFINITION;


    /** The Dashboard group expand/collapse style */
    "DashboardGroupExpandCollapseStyle"?: STYLEDEFINITION;


    /** The Dashboard configuration button style */
    "DashboardConfigButtonStyle"?: STYLEDEFINITION;


    /** The Dashboard menu style */
    "DashboardMenuStyle"?: STYLEDEFINITION;


    /** The Dashboard tab style */
    "DashboardTabStyle"?: STYLEDEFINITION;


    /** Hide the dashboard bar */
    "HideDashboardBar"?: BOOLEAN;


    /** Hide groups title and border */
    "HideGroups"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /** Show a spinner icon when data is being loaded */
    "ShowDataLoading"?: BOOLEAN;


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


    ref?: UIOutputInterfaceDashboard
}

/** The binding source properties and services that can be bound on the "Dashboard" widget. */
declare class UIOutputInterfaceDashboard {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** The database id of the dashboard */
    DashboardID: BindingTarget<DASHBOARDNAME>
}

/** Enables the user to show a dashboard of widgets */
declare function Dashboard(props: UIInputInterfaceDashboard): UIOutputInterfaceDashboard

            
/** The properties and events that can be set or bound on the "Dataexport" widget. */
declare interface UIInputInterfaceDataexport extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The text that appears on the button */
    "Label"?: STRING;


    /**  */
    "ColumnFormat"?: STRING;


    /**  */
    "DataBinding"?: JSON;


    /** Tab sequence index */
    "TabSequence"?: NUMBER;


    /** Do you want the corners on the button rounded */
    "RoundedCorners"?: BOOLEAN;


    /** width of widget */
    "Width"?: NUMBER;


    /** height of widget */
    "Height"?: NUMBER;


    /** Select an infotable from a service return as the data source for this property */
    "Data"?: BindingTarget<INFOTABLE>;


    /** Sets the file name for the csv file to be exported. */
    "ExportFileName"?: STRING | BindingTarget<STRING>;


    /** Begin the export file with a UTF-8 Byte Order Mark */
    "IncludeBOM"?: BOOLEAN;


    /** Show advanced export options 'CSV (Standard)' and 'CSV (Excel Formatted)' at runtime */
    "ShowAdvancedExportOptions"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The background style */
    "Style"?: STYLEDEFINITION;


    /** The hover style */
    "HoverStyle"?: STYLEDEFINITION;


    /** The style of the widget when it is clicked on */
    "ActiveStyle"?: STYLEDEFINITION;


    /** The style of the widget when it is selected */
    "FocusStyle"?: STYLEDEFINITION;


    /** Either align the icon for the button to the left or the right of the text */
    "IconAlignment"?: STRING<"left" | "right">;


    /** Enables you to set an icon image in the data export widget */
    "Icon"?: IMAGELINK | BindingTarget<IMAGELINK>;


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


    ref?: UIOutputInterfaceDataexport
}

/** The binding source properties and services that can be bound on the "Dataexport" widget. */
declare class UIOutputInterfaceDataexport {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Triggers the dataExport */
    Export: ServiceBindingTarget
}

/** Enables you to Export Data from any query to CSV */
declare function Dataexport(props: UIInputInterfaceDataexport): UIOutputInterfaceDataexport

            
/** The properties and events that can be set or bound on the "Datafilter" widget. */
declare interface UIInputInterfaceDatafilter extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /**  */
    "ColumnFormat"?: STRING;


    /** Select any infotable as the data source for this property */
    "Data"?: BindingTarget<INFOTABLE>;


    /** The data query that can be used for obtaining the data */
    "Query"?: BindingTarget<QUERY>;


    /** Enable advanced filter options */
    "ShowAdvancedOptions"?: BOOLEAN;


    /** Enable filters to update results while editing */
    "LiveFiltering"?: BOOLEAN;


    /** Sorts the Data Filter fields alphabetically */
    "SortFilters"?: BOOLEAN;


    /** The background style of the "Add Filter" button */
    "AddButtonStyle"?: STYLEDEFINITION;


    /** The background style of the filter bar */
    "BarStyle"?: STYLEDEFINITION;


    /** The style of the "Add Filter" button */
    "FocusStyle"?: STYLEDEFINITION;


    /** Show the active filters in a horizontal list. */
    "Horizontal"?: BOOLEAN;


    /** Localize date filter format using "dd-mm-yy" pattern. */
    "DateFormatToken"?: STRING;


    /**  */
    "DateFormat"?: STRING;


    /** The width of Data Filter in the mashup */
    "Width"?: NUMBER;


    /** The height of Data Filter in the mashup */
    "Height"?: NUMBER;


    /** Tab sequence index */
    "TabSequence"?: NUMBER;


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


    /**  */
    "Margin"?: STYLECSSRECTSIZE;


    /** A bindable event triggered when the data for this widget is modified */
    "Changed"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceDatafilter
}

/** The binding source properties and services that can be bound on the "Datafilter" widget. */
declare class UIOutputInterfaceDatafilter {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** The data query that can be used for obtaining the data */
    Query: BindingTarget<QUERY>
}

/** Enables you to dynamically build a query for Data Streams and Data Tables */
declare function Datafilter(props: UIInputInterfaceDatafilter): UIOutputInterfaceDatafilter

            
/** The properties and events that can be set or bound on the "Datetimepicker" widget. */
declare interface UIInputInterfaceDatetimepicker extends UIBaseInputInterface {
    
    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** width of widget */
    "Width"?: NUMBER;


    /** height of widget */
    "Height"?: NUMBER;


    /** Enables you to set an initial interval */
    "Interval"?: NUMBER;


    /** Enables you to set an interval type */
    "IntervalType"?: STRING<"h" | "m" | "s" | "d">;


    /** Sets the date format to display for the date field. You can select an order for the day, month, and year. Select 'Auto' to use the system format. */
    "DateOrder"?: STRING<"yyyy-mm-dd" | "dd-mm-yyyy" | "mm-dd-yyyy" | "yyyy-dd-mm" | "mm-yyyy-dd" | "dd-yyyy-mm">;


    /** Date Length */
    "DateDisplay"?: STRING<"numeric" | "short" | "full">;


    /** Enables you to display the time with seconds */
    "DisplaySeconds"?: BOOLEAN;


    /** Enables you to set a character that is separating the day, month and year */
    "DateDelimiter"?: STRING;


    /** Localize the date format using a "DD-MM-YY" pattern. You can use formats supported by the Moment.js library. The format is case sensitive and overrides the DateDelimiter, DateOrder, and MonthFormat properties. */
    "DateFormatToken"?: STRING;


    /** Enables you to display only the date */
    "DateOnly"?: BOOLEAN;


    /** Enables you to set the DateTime property with current date and time. If not selected, you must enter the date and time */
    "InitializeWithCurrentDateTime"?: BOOLEAN;


    /** Date and Time value of the date for the date time picker */
    "DateTime"?: BindingTarget<DATETIME>;


    /** The sequence number of the Date Picker widget when you press tab */
    "TabSequence"?: NUMBER;


    /** The DateTime picker background style */
    "Style"?: STYLEDEFINITION;


    /** Display a decade dropdown to make it easier to jump backward or forward several decades at a time */
    "DecadeView"?: BOOLEAN;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "Label"?: STRING;


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


    /** A bindable event triggered when the data for this widget is modified */
    "Changed"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceDatetimepicker
}

/** The binding source properties and services that can be bound on the "Datetimepicker" widget. */
declare class UIOutputInterfaceDatetimepicker {
    
    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    CustomClass: BindingTarget<STRING>;


    /** Date and Time value of the date for the date time picker */
    DateTime: BindingTarget<DATETIME>;


    /** A bindable service to clear the current date and set it to an empty value */
    ClearDateTime: ServiceBindingTarget
}

/** Provides a mechanism for selecting a date and time. */
declare function Datetimepicker(props: UIInputInterfaceDatetimepicker): UIOutputInterfaceDatetimepicker

            
/** The properties and events that can be set or bound on the "Dhxgrid" widget. */
declare interface UIInputInterfaceDhxgrid extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /**  */
    "ColumnFormat"?: STRING;


    /** Specify a State Formatter to format the data in each grid row */
    "RowFormat"?: STATEFORMATTING;


    /** Align column headers with their data */
    "AlignHeader"?: BOOLEAN;


    /** Allow multiple items to be selected? */
    "MultiSelect"?: BOOLEAN;


    /** Allow grid value editing? */
    "IsEditable"?: BOOLEAN;


    /** Automatically select the first row upon initial loading of data */
    "AutoSelectFirstRow"?: BOOLEAN;


    /** Enable or disable text wrapping within the grid cells. */
    "CellTextWrapping"?: BOOLEAN;


    /** Defines the width of the grid in the mashup */
    "Width"?: NUMBER;


    /** Defines the height of the grid in the mashup */
    "Height"?: NUMBER;


    /** Tab sequence index */
    "TabSequence"?: NUMBER;


    /** Select any infotable as the data source for this property */
    "Data"?: BindingTarget<INFOTABLE>;


    /** Current scroll top */
    "CurrentScrollTop"?: NUMBER;


    /** Scroll top to assign */
    "ScrollTop"?: NUMBER | BindingTarget<NUMBER>;


    /** Height of each row at runtime ... do NOT change this unless you are certain you know what you are doing  */
    "RowHeight"?: NUMBER;


    /** Show all columns for the data received at runtime.  Only use this if you cannot know the datashape at builder time */
    "ShowAllColumns"?: BOOLEAN;


    /** Grid background style */
    "GridBackgroundStyle"?: STYLEDEFINITION;


    /** Grid background style for editable cell */
    "GridEditableFieldStyle"?: STYLEDEFINITION;


    /** Grid style for invalid cells */
    "GridInvalidFieldStyle"?: STYLEDEFINITION;


    /** Grid header style */
    "GridHeaderStyle"?: STYLEDEFINITION;


    /** Grid header text case setting */
    "GridHeaderTextCase"?: STRING<"capitalize" | "lowercase" | "uppercase" | "none">;


    /** Grid row focus style */
    "FocusStyle"?: STYLEDEFINITION;


    /** Grid row background style */
    "RowBackgroundStyle"?: STYLEDEFINITION;


    /** Grid alternate row background style */
    "RowAlternateBackgroundStyle"?: STYLEDEFINITION;


    /** Grid row hover style */
    "RowHoverStyle"?: STYLEDEFINITION;


    /** Grid selected row style */
    "RowSelectedStyle"?: STYLEDEFINITION;


    /**  */
    "IsPrintLayout"?: BOOLEAN;


    /** Override and give precedence to font size from Style properties */
    "EnableFontSizeOverride"?: BOOLEAN;


    /** Use the latest standard validator that includes additional security restrictions instead of the legacy non-secure validator when defining validation expressions for column cells */
    "DisableLegacyValidation"?: BOOLEAN;


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


    /** Triggers an event when the user double clicks the widget */
    "DoubleClicked"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceDhxgrid
}

/** The binding source properties and services that can be bound on the "Dhxgrid" widget. */
declare class UIOutputInterfaceDhxgrid {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Data source for edited items in the table */
    EditedTable: BindingTarget<INFOTABLE>;


    /** Current scroll top */
    CurrentScrollTop: BindingTarget<NUMBER>
}

/** Displays rows and columns of data in a grid */
declare function Dhxgrid(props: UIInputInterfaceDhxgrid): UIOutputInterfaceDhxgrid

            
/** The properties and events that can be set or bound on the "Dhxlist" widget. */
declare interface UIInputInterfaceDhxlist<A> extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Enable single tap to select a list item on a tablet */
    "SingleClickSelectOnTablets"?: BOOLEAN;


    /** list Renderer and State formatter to format the rows in the list */
    "ListFormat"?: RENDERERWITHSTATE;


    /** The width of the list widget in the mashup */
    "Width"?: NUMBER;


    /** The height of the list widget in the mashup */
    "Height"?: NUMBER;


    /** Allow multiple items to be selected? */
    "MultiSelect"?: BOOLEAN;


    /** Automatically select the first row of the list when it is loaded in the mashup */
    "AutoSelectFirstRow"?: BOOLEAN;


    /** The type list widget */
    "View"?: STRING<"dropdown" | "list" | "radiolist" | "combo">;


    /** Height (in pixels) of dropdown view */
    "HeightOfDropdownView"?: NUMBER;


    /** Width (in pixels) of the dropdown view: dropdown portion of widget can be wider than the widget. */
    "WidthOfDropdownView"?: NUMBER;


    /** How many items would you like in the list when in dropdown view */
    "NumberOfItemsInDropdownView"?: NUMBER;


    /** How many items would you like in the list per page. 0 or less to disable pagination. */
    "NumberOfItemsPerPage"?: NUMBER;


    /** Tab sequence index */
    "TabSequence"?: NUMBER;


    /** Text alignment for each list item when a ListFormat is defined */
    "Alignment"?: STRING<"left" | "right" | "center">;


    /** text alignment for each list item */
    "LabelAlignment"?: STRING<"left" | "right" | "center">;


    /** Data that is bound to the list widget */ 
    "Data"?: BindingTarget<INFOTABLE<A>>;


    /** The infotable field which represents the data value */
    "DisplayField"?: FIELDNAME<A>;


    /** Field to use for SelectedText */
    "ValueField"?: FIELDNAME<A>;


    /** Text to display if there is no selection */
    "TextIfNoSelection"?: STRING;


    /** Set text to display if there is no selection to be placeholder or editable text. */
    "TextIfNoSelectionType"?: STRING<"editable" | "placeholder">;


    /** Clear the SelectedText if there is no selection */
    "ClearIfNoSelection"?: BOOLEAN;


    /** When using the keyboard to cycle matching items in the list, the focused item will be automatically selected */
    "EnableKeyboardSelections"?: BOOLEAN;


    /** Enables the checkbox the shows next to a combo list item */
    "ComboEnableCheckbox"?: BOOLEAN;


    /** Enables the style that applies to any combo item that is selected */
    "DisableSelectedStyle"?: BOOLEAN;


    /** Assign the selected item */
    "SelectedText"?: BindingTarget<STRING>;


    /** Assign the selected items via an infotable */
    "SelectedItems"?: BindingTarget<INFOTABLE>;


    /** Height of each row at runtime ... do NOT change this unless you are certain you know what you are doing  */
    "RowHeight"?: NUMBER;


    /** CSS line-height setting in px to adjust the vertical alignment of the text in the row based on font size and row height */
    "TextVerticalAlignment"?: NUMBER;


    /** The list background style */
    "ListBackgroundStyle"?: STYLEDEFINITION;


    /** The list item style */
    "ListItemStyle"?: STYLEDEFINITION;


    /** The alternate list item style */
    "ListItemAlternateStyle"?: STYLEDEFINITION;


    /** The list item hover style */
    "ListItemHoverStyle"?: STYLEDEFINITION;


    /** The list item selected style */
    "ListItemSelectedStyle"?: STYLEDEFINITION;


    /** The list item text style */
    "ListLabelStyle"?: STYLEDEFINITION;


    /** The dropdown button style */
    "DropdownButtonStyle"?: STYLEDEFINITION;


    /** The style for the dropdown container */
    "DropdownStyle"?: STYLEDEFINITION;


    /** The drop down selected style */
    "DropdownSelectedStyle"?: STYLEDEFINITION;


    /** The combo textbox style */
    "ComboTextboxStyle"?: STYLEDEFINITION;


    /** The combo dropdown button style */
    "ComboDropdownButtonStyle"?: STYLEDEFINITION;


    /** The combo item highlight style */
    "ComboItemHighlightedStyle"?: STYLEDEFINITION;


    /** The style of the Textbox when in focus */
    "ListFocusStyle"?: STYLEDEFINITION;


    /** Enable or disable tooltips */
    "EnableToolTips"?: BOOLEAN;


    /**  */
    "ToolTipField"?: STRING;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "Label"?: STRING;


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


    /** Triggers an event when the user double clicks the widget */
    "DoubleClicked"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceDhxlist<A>
}

/** The binding source properties and services that can be bound on the "Dhxlist" widget. */
declare class UIOutputInterfaceDhxlist<A> {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Displays rows in a list. */
declare function Dhxlist<A>(props: UIInputInterfaceDhxlist<A>): UIOutputInterfaceDhxlist<A>

            
/** The properties and events that can be set or bound on the "Divider" widget. */
declare interface UIInputInterfaceDivider extends UIBaseInputInterface {
    
    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** tw.divider-ide.properties.width.description */
    "Width"?: NUMBER;


    /** tw.divider-ide.properties.height.description */
    "Height"?: NUMBER;


    /** The style of the divider line */
    "Style"?: STYLEDEFINITION;


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


    ref?: UIOutputInterfaceDivider
}

/** The binding source properties and services that can be bound on the "Divider" widget. */
declare class UIOutputInterfaceDivider {
    
    /** Enables you to define the CSS to the top div of the widget. Multiple classes can be entered, separated by space */
    CustomClass: BindingTarget<STRING>
}

/** Drawing tool for dividers. */
declare function Divider(props: UIInputInterfaceDivider): UIOutputInterfaceDivider

            
/** The properties and events that can be set or bound on the "Entitypicker" widget. */
declare interface UIInputInterfaceEntitypicker extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Width of widget */
    "Height"?: NUMBER;


    /** Width of widget */
    "SearchTerm"?: STRING | BindingTarget<STRING>;


    /** The type of entity to pick from */
    "EntityType"?: STRING<"Things" | "ThingTemplates" | "ThingShapes" | "Users" | "Groups" | "Networks" | "Dashboards" | "Mashups" | "StyleThemes" | "Projects" | "NotificationContents" | "NotificationDefinitions">;


    /** ThingTemplate to filter for. */
    "ThingTemplate"?: THINGTEMPLATENAME | BindingTarget<THINGTEMPLATENAME>;


    /** ThingShape to filter for.  */
    "ThingShape"?: THINGSHAPENAME | BindingTarget<THINGSHAPENAME>;


    /** Model Tags to filter for */
    "ModelTags"?: TAGS | BindingTarget<TAGS>;


    /** Pick from entities that are derived from the specified Entity */
    "Entity"?: THINGNAME | BindingTarget<THINGNAME>;


    /** The default input search text that is shown in the widget */
    "PlaceholderText"?: STRING | BindingTarget<STRING>;


    /** Use or ignore the MRU */
    "UseMostRecentlyUsed"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Show the advanced menu */
    "ShowAdvanced"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** If checked, searches names and descriptions.  If unchecked, just searches names */
    "SearchIncludesDescriptions"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** If checked, includes system objects in the search.  If unchecked, just searches user entered entities */
    "IncludeSystemObjects"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab sequence index */
    "TabSequence"?: NUMBER;


    /** The style used when the widget is in focus */
    "FocusStyle"?: STYLEDEFINITION;


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


    /** A bindable event triggered when the selected entity has changed */
    "SelectedEntityChanged"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceEntitypicker
}

/** The binding source properties and services that can be bound on the "Entitypicker" widget. */
declare class UIOutputInterfaceEntitypicker {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Pick from entities that are derived from the specified Entity */
    Entity: BindingTarget<THINGNAME>;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget
}

/** Allows runtime searching of entities by a variety of pre-filtering */
declare function Entitypicker(props: UIInputInterfaceEntitypicker): UIOutputInterfaceEntitypicker

            
/** The properties and events that can be set or bound on the "Eventchart" widget. */
declare interface UIInputInterfaceEventchart<A> extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Use a Single Data Source for All Series */
    "SingleDataSource"?: BOOLEAN;


    /** Data source */ 
    "Data"?: BindingTarget<INFOTABLE<A>>;


    /** Type of chart */
    "ChartType"?: STRING<"stick" | "flag" | "stickflag">;


    /** Chart orientation */
    "ChartOrientation"?: STRING<"vertical" | "horizontal">;


    /** Chart overall style */
    "ChartStyle"?: STYLEDEFINITION;


    /** Chart area style */
    "ChartAreaStyle"?: STYLEDEFINITION;


    /** Chart legend style */
    "ChartLegendStyle"?: STYLEDEFINITION;


    /** Chart title style */
    "ChartTitleStyle"?: STYLEDEFINITION;


    /** Selected item style */
    "SelectedItemStyle"?: STYLEDEFINITION;


    /** Chart Title */
    "ChartTitle"?: STRING | BindingTarget<STRING>;


    /** Show or hide the legend */
    "ShowLegend"?: BOOLEAN;


    /** Fixed legend width (if non-zero it will be used) */
    "LegendWidth"?: NUMBER;


    /** Desired legend location (none = hide legend) */
    "LegendLocation"?: STRING<"right" | "top" | "bottom" | "left">;


    /** Desired legend orientation */
    "LegendOrientation"?: STRING<"vertical" | "horizontal">;


    /** Event style */
    "EventStyle"?: STYLEDEFINITION;


    /** Event state formatting style */
    "EventDataStyle"?: STATEFORMATTING;


    /** Event label format */
    "LabelFormat"?: STRING;


    /** Show timestamp on flag */
    "ShowTimeOnFlag"?: BOOLEAN;


    /** Format for flag time values */
    "FlagTimeFormat"?: STRING;


    /** Desired flag width */
    "FlagWidth"?: NUMBER;


    /** Desired flag height */
    "FlagHeight"?: NUMBER;


    /** Desired stick start (percentage of chart height) */
    "StickStart"?: NUMBER;


    /** Desired stick end (percentage of chart height) */
    "StickEnd"?: NUMBER;


    /** Desired marker size */
    "MarkerSize"?: NUMBER;


    /** Desired marker type */
    "MarkerType"?: STRING<"flag" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Field that will provide X axis values */
    "XAxisField"?: FIELDNAME<A>;


    /** Field that will provide labell values */
    "LabelField"?: FIELDNAME<A>;


    /** Show or hide X axis */
    "ShowXAxis"?: BOOLEAN;


    /** Chart X axis style */
    "XAxisStyle"?: STYLEDEFINITION;


    /** Format for X axis values */
    "XAxisFormat"?: STRING;


    /** Minimum range for the X axis */
    "XAxisMinimum"?: DATETIME | BindingTarget<DATETIME>;


    /** Maximum range for the X axis */
    "XAxisMaximum"?: DATETIME | BindingTarget<DATETIME>;


    /** Automatically scale the X axis */
    "XAxisAutoscale"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the X axis */
    "XAxisZeroscale"?: BOOLEAN;


    /** Attempt to use round values to scale the X axis */
    "XAxisSmoothScaling"?: BOOLEAN;


    /** Number of X axis chart intervals (affects ticks, grid) */
    "XAxisIntervals"?: NUMBER;


    /** Number of X axis minor ticks */
    "XAxisMinorTicks"?: NUMBER;


    /** Number of X axis labels */
    "XAxisLabels"?: NUMBER;


    /** Allow zooming the X axis */
    "AllowXAxisZoom"?: BOOLEAN;


    /** Max characters to display before truncating with ellipses and showing full label text in tooltip. Default 0 disables feature, negative values trim characters from start. */
    "TruncateX-AxisLabels"?: NUMBER;


    /** Show X axis labels */
    "ShowXAxisLabels"?: BOOLEAN;


    /** Show X axis ticks */
    "ShowXAxisTicks"?: BOOLEAN;


    /** Allow item selection */
    "AllowSelection"?: BOOLEAN;


    /** Enable display of values on hover */
    "EnableHover"?: BOOLEAN;


    /** Show horizontal grid */
    "ShowXAxisGrid"?: BOOLEAN;


    /** Chart grid style */
    "GridStyle"?: STYLEDEFINITION;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /**  */
    "ToolTipField"?: undefined;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


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


    /** Triggers an event when the user double clicks the widget */
    "DoubleClicked"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceEventchart<A>
}

/** The binding source properties and services that can be bound on the "Eventchart" widget. */
declare class UIOutputInterfaceEventchart<A> {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Displays an event chart */
declare function Eventchart<A>(props: UIInputInterfaceEventchart<A>): UIOutputInterfaceEventchart<A>

            
/** The properties and events that can be set or bound on the "Eventsrouter" widget. */
declare interface UIInputInterfaceEventsrouter extends UIBaseInputInterface {
    
    /** Contains the last received input value */
    "Output"?: STRING;


    /** Sets the desired number of inputs */
    "NumberOfInputs"?: NUMBER;


    /** Sets the base type for Inputs and Output */
    "DataType"?: STRING<"BOOLEAN" | "DASHBOARDNAME" | "DATASHAPENAME" | "DATETIME" | "HTML" | "HYPERLINK" | "IMAGELINK" | "IMAGE" | "INFOTABLE" | "INTEGER" | "JSON" | "LONG" | "LOCATION" | "MASHUPNAME" | "NOTHING" | "NUMBER" | "PASSWORD" | "QUERY" | "SCHEDULE" | "STRING" | "TAGS" | "TEXT" | "THINGNAME" | "THINGSHAPENAME" | "TIMESPAN" | "USERNAME" | "XML">;


    /** Sets the DataShape for Output and restricts the Inputs to those types defined by the DataShape. If empty, any DataShape is allowed for Inputs. */
    "DataShape"?: DATASHAPENAME | BindingTarget<DATASHAPENAME>;


    /** Input 1 */
    "Input1"?: BindingTarget<STRING>;


    /** Input 2 */
    "Input2"?: BindingTarget<STRING>;


    /** Input 3 */
    "Input3"?: BindingTarget<STRING>;


    /** Input 4 */
    "Input4"?: BindingTarget<STRING>;


    /** Input 5 */
    "Input5"?: BindingTarget<STRING>;


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


    /** A bindable event triggered when the data for this widget is modified */
    "Changed"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceEventsrouter
}

/** The binding source properties and services that can be bound on the "Eventsrouter" widget. */
declare class UIOutputInterfaceEventsrouter {
    
    /** Contains the last received input value */
    Output: BindingTarget<STRING>;


    /** Sets the DataShape for Output and restricts the Inputs to those types defined by the DataShape. If empty, any DataShape is allowed for Inputs. */
    DataShape: BindingTarget<DATASHAPENAME>
}

/** Allows users to bind multiple source widgets or services to one target */
declare function Eventsrouter(props: UIInputInterfaceEventsrouter): UIOutputInterfaceEventsrouter

            
/** The properties and events that can be set or bound on the "Expression" widget. */
declare interface UIInputInterfaceExpression extends UIBaseInputInterface {
    
    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** The javascript expression that should be evaluated */
    "Expression"?: STRING;


    /** The javascript expression is automatically run when enabled */
    "AutoEvaluate"?: BOOLEAN;


    /** The javascript expression is only evaluated the first time a value is passed in */
    "FireOnFirstValue"?: BOOLEAN;


    /** Controls when the Changed event is fired */
    "DataChangeType"?: STRING<"VALUE" | "ALWAYS" | "NEVER">;


    /** The output from evaluated expression */
    "Output"?: NUMBER;


    /** The javascript output object type returned from the evaluated expression */
    "OutputBaseType"?: STRING<"NOTHING" | "BOOLEAN" | "DATETIME" | "JSON" | "LOCATION" | "NUMBER" | "TAGS" | "STRING">;


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


    /** A bindable event triggered when the data for this widget is modified */
    "Changed"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceExpression
}

/** The binding source properties and services that can be bound on the "Expression" widget. */
declare class UIOutputInterfaceExpression {
    
    /** The output from evaluated expression */
    Output: BindingTarget<NUMBER>;


    /** A bindable service to evaluate the expression defined for this widget */
    Evaluate: ServiceBindingTarget
}

/** Evaluates a (Not Secure) expression */
declare function Expression(props: UIInputInterfaceExpression): UIOutputInterfaceExpression

            
/** The properties and events that can be set or bound on the "Expression2" widget. */
declare interface UIInputInterfaceExpression2 extends UIBaseInputInterface {
    
    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** The javascript expression that should be evaluated */
    "Expression"?: STRING;


    /** The javascript expression is automatically run when enabled */
    "AutoEvaluate"?: BOOLEAN;


    /** The javascript expression is only evaluated the first time a value is passed in */
    "FireOnFirstValue"?: BOOLEAN;


    /** Controls when the Changed event is fired */
    "DataChangeType"?: STRING<"VALUE" | "ALWAYS" | "NEVER">;


    /** The output from evaluated expression */
    "Output"?: NUMBER;


    /** The javascript output object type returned from the evaluated expression */
    "OutputBaseType"?: STRING<"NOTHING" | "BOOLEAN" | "DATETIME" | "JSON" | "LOCATION" | "NUMBER" | "TAGS" | "STRING">;


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


    /** A bindable event triggered when the data for this widget is modified */
    "Changed"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceExpression2
}

/** The binding source properties and services that can be bound on the "Expression2" widget. */
declare class UIOutputInterfaceExpression2 {
    
    /** The output from evaluated expression */
    Output: BindingTarget<NUMBER>;


    /** A bindable service to evaluate the expression defined for this widget */
    Evaluate: ServiceBindingTarget
}

/** Evaluates a (Not Secure) expression */
declare function Expression2(props: UIInputInterfaceExpression2): UIOutputInterfaceExpression2

            
/** The properties and events that can be set or bound on the "Fieldset" widget. */
declare interface UIInputInterfaceFieldset extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** The title of the fieldset */
    "Title"?: STRING | BindingTarget<STRING>;


    /** The background style of the fieldset */
    "FieldsetStyle"?: STYLEDEFINITION;


    /** The style of the title label */
    "FieldsetLabelStyle"?: STYLEDEFINITION;


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


    ref?: UIOutputInterfaceFieldset
}

/** The binding source properties and services that can be bound on the "Fieldset" widget. */
declare class UIOutputInterfaceFieldset {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Resets all the contained widgets to their default values */
    ResetInputsToDefaultValue: ServiceBindingTarget
}

/** Display a frame around a group of widgets with a title caption */
declare function Fieldset(props: UIInputInterfaceFieldset): UIOutputInterfaceFieldset

            
/** The properties and events that can be set or bound on the "Fileupload" widget. */
declare interface UIInputInterfaceFileupload extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Tab sequence index */
    "TabSequence"?: NUMBER;


    /** The name of the File Repository used by the widget */
    "RepositoryName"?: THINGNAME | BindingTarget<THINGNAME>;


    /** Display the Repository selection drop-down list */
    "DisplayRepositorySelector"?: BOOLEAN;


    /** The path on the File Repository used by the widget */
    "Path"?: STRING | BindingTarget<STRING>;


    /** Enable selecting multiple files */
    "MultiFilesSelect"?: BOOLEAN;


    /** Display the file path in the Repository */
    "DisplayPathTextBox"?: BOOLEAN;


    /** The filename the user selected */
    "FileName"?: STRING;


    /** The full path on the repository */
    "FullPath"?: STRING;


    /** The background style for the widget */
    "Style"?: STYLEDEFINITION;


    /** The style when the widget is in focus */
    "FocusStyle"?: STYLEDEFINITION;


    /** The style for the Repository selector */
    "RepositoryStyle"?: STYLEDEFINITION;


    /** Set the allowed files types that can be uploaded, types should be separated by comma (e.g: '.gif, .jpg, .png, .doc') */
    "AllowedFileTypes"?: STRING | BindingTarget<STRING>;


    /** Set the maximum file size limit (in megabytes), click reset button to clear limit */
    "MaximumFileSize"?: NUMBER | BindingTarget<NUMBER>;


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


    /** The z-index of the widget which allows you to put the widget on top or on the bottom of the view stack */
    "Z-index"?: NUMBER;


    /**  */
    "Margin"?: STYLECSSRECTSIZE;


    /** A bindable event triggered when the selected file has finished uploading */
    "UploadComplete"?: ServiceBindingTarget[];


    /** A bindable event triggered if the selected file does not upload successfully */
    "UploadFailed"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceFileupload
}

/** The binding source properties and services that can be bound on the "Fileupload" widget. */
declare class UIOutputInterfaceFileupload {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** The name of the File Repository used by the widget */
    RepositoryName: BindingTarget<THINGNAME>;


    /** The path on the File Repository used by the widget */
    Path: BindingTarget<STRING>;


    /** The filename the user selected */
    FileName: BindingTarget<STRING>;


    /** The full path on the repository */
    FullPath: BindingTarget<STRING>
}

/** Uploads a file from a client machine to a File Repository */
declare function Fileupload(props: UIInputInterfaceFileupload): UIOutputInterfaceFileupload

            
/** The properties and events that can be set or bound on the "Flexcontainer" widget. */
declare interface UIInputInterfaceFlexcontainer extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The space outside the widget (margin in px). Accepts 1-4 values. For example: '5' for all margins, '5 10' for top and bottom, left and right margins, '5 10 15' for top, left and right, bottom margins, '5 15 10 25' for top, right, bottom, left margins. */
    "Margin"?: STYLECSSRECTSIZE;


    /**  */
    "userCannotRemove"?: BOOLEAN;


    /** Use Style Theme for this flex container widget. */
    "UseTheme"?: BOOLEAN;


    /**  */
    "StyleProperties"?: JSON | BindingTarget<JSON>;


    /** Enter a URL for the image or select a media entity */
    "SourceURL"?: IMAGELINK;


    /** The style of the button */
    "Style"?: STYLEDEFINITION;


    /** Minimum width of widget */
    "flex-min-width"?: STRING;


    /** Minimum height of widget */
    "flex-min-height"?: STRING;


    /** Maximum width of widget */
    "flex-max-width"?: STRING;


    /** Maximum height of widget */
    "flex-max-height"?: STRING;


    /** Container orientation. */
    "flex-direction"?: STRING<"row" | "row-reverse" | "column" | "column-reverse">;


    /** Align */
    "align-items"?: STRING<"flex-start" | "center" | "flex-end" | "stretch">;


    /** Justify */
    "justify-content"?: STRING<"flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly">;


    /** Wrap Items */
    "flex-wrap"?: STRING<"nowrap" | "wrap" | "wrap-reverse">;


    /** Align */
    "align-content"?: STRING<"flex-start" | "center" | "flex-end" | "space-between" | "space-around">;


    /** Ability for a flex item to grow if necessary */
    "flex-grow"?: NUMBER;


    /** Ability for a flex item to shrink if necessary */
    "flex-shrink"?: NUMBER;


    /** Default size of an element before the remaining space is distributed. It can be a length (e.g. 20%, 5rem, etc.) or a keyword. The auto keyword means 'look at my width or height property' */
    "flex-basis"?: STRING;


    /** Sizing for flex containers */
    "flex-size"?: STRING<"default" | "fixed" | "range">;


    /**  */
    "positioning"?: STRING;


    /** Enable expand/collapse capabilities for this container */
    "EnableExpandCollapse"?: BOOLEAN;


    /** Should this container start out expanded? */
    "Expanded"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Should this container show an expand/collapse tab? */
    "ShowExpandCollapseTab"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Where to locate the expand/collapse tab. */
    "ExpandCollapseTabLocation"?: STRING<"inside" | "outside">;


    /** Should this container be on top of any content?  Typically used to provide a layered container either transparent on top of content, or in conjunction with expand / collapse to bring temporary content to the users attention. */
    "Overlay"?: BOOLEAN;


    /**  */
    "ResponsiveLayout"?: BOOLEAN;


    /** Enables you to load, unload, and reload the container in the run-time mashup view using data services. */
    "LazyLoading"?: BOOLEAN;


    /** Enables you to unload the container and its content using the UnloadContainer service when the LazyLoading property is enabled. */
    "EnableContainerUnload"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Select the icon to display for the tab that collapses the container. */
    "CollapseTabIcon"?: IMAGELINK;


    /** Select the icon to display for the tab that expands the container */
    "ExpandTabIcon"?: IMAGELINK;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /** Show a spinner icon when data is being loaded */
    "ShowDataLoading"?: BOOLEAN;


    /** When enabled makes the widget visible in the mashup */
    "Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The z-index of the widget which allows you to put the widget on top or on the bottom of the view stack */
    "Z-index"?: NUMBER;


    /** An event that triggers when the container is loaded and displayed in the run-time mashup view. */
    "Loaded"?: ServiceBindingTarget[];


    /** An event that triggers when the container is unloaded and removed from the run-time mashup view. */
    "Unloaded"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceFlexcontainer
}

/** The binding source properties and services that can be bound on the "Flexcontainer" widget. */
declare class UIOutputInterfaceFlexcontainer {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Should this container start out expanded? */
    Expanded: BindingTarget<BOOLEAN>;


    /** When triggered, it will open if closed and close if open */
    ToggleExpandCollapse: ServiceBindingTarget;


    /** Will expand the container */
    Expand: ServiceBindingTarget;


    /** Will collapse the container */
    Collapse: ServiceBindingTarget;


    /** Resets all the contained widgets to their default values */
    ResetInputsToDefaultValue: ServiceBindingTarget;


    /** Loads the container and its content, including child containers into the run-time mashup view. */
    LoadContainer: ServiceBindingTarget;


    /** Unloads the container and its content, including child containers from the run-time mashup view. */
    UnloadContainer: ServiceBindingTarget;


    /** Reloads the container and its content by unloading and loading it in the run-time mashup view. */
    ReloadContainer: ServiceBindingTarget
}

/** Displays a group of widgets */
declare function Flexcontainer(props: UIInputInterfaceFlexcontainer): UIOutputInterfaceFlexcontainer

            
/** The properties and events that can be set or bound on the "Foldingpanel" widget. */
declare interface UIInputInterfaceFoldingpanel extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Set Title Bar Text */
    "Title"?: STRING | BindingTarget<STRING>;


    /** Get or Set the height of the clickable header */
    "HeaderHeight"?: NUMBER;


    /** Set to control initially expanded or collapsed. Bind to this to control whether the panel is collapsed or expanded */
    "Expanded"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The speed with which to open/close the panel */
    "Speed"?: NUMBER;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** The style of the header */
    "HeaderStyle"?: STYLEDEFINITION;


    /** The style of the panel */
    "PanelStyle"?: STYLEDEFINITION;


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


    ref?: UIOutputInterfaceFoldingpanel
}

/** The binding source properties and services that can be bound on the "Foldingpanel" widget. */
declare class UIOutputInterfaceFoldingpanel {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Set to control initially expanded or collapsed. Bind to this to control whether the panel is collapsed or expanded */
    Expanded: BindingTarget<BOOLEAN>;


    /** When triggered, it will open if closed and close if open */
    ToggleExpandCollapse: ServiceBindingTarget;


    /** Will expand the container */
    Expand: ServiceBindingTarget;


    /** Will collapse the container */
    Collapse: ServiceBindingTarget;


    /** Resets all the contained widgets to their default values */
    ResetInputsToDefaultValue: ServiceBindingTarget
}

/** Displays a group of widgets which can be minimized */
declare function Foldingpanel(props: UIInputInterfaceFoldingpanel): UIOutputInterfaceFoldingpanel

            
/** The properties and events that can be set or bound on the "Gauge" widget. */
declare interface UIInputInterfaceGauge extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Data source */
    "Data"?: NUMBER | BindingTarget<NUMBER>;


    /** Minimum value for the gauge */
    "MinValue"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum value for the gauge */
    "MaxValue"?: NUMBER | BindingTarget<NUMBER>;


    /** Styling rules for gauge needle and value display */
    "ValueFormatter"?: STATEFORMATTING;


    /** Style gauge needle based on value formatter, if defined */
    "FormatNeedle"?: BOOLEAN;


    /** Style for gauge */
    "GaugeStyle"?: STYLEDEFINITION;


    /** Style for gauge bezel border */
    "GaugeBorderStyle"?: STYLEDEFINITION;


    /** Style for gauge face */
    "GaugeFaceStyle"?: STYLEDEFINITION;


    /** Style for gauge needle */
    "NeedleStyle"?: STYLEDEFINITION;


    /** Style for gauge center */
    "CenterStyle"?: STYLEDEFINITION;


    /** Number of gauge intervals (affects ticks, labels, ring) */
    "Intervals"?: NUMBER;


    /** Number of intervals per label */
    "IntervalsPerLabel"?: NUMBER;


    /** Style for gauge labels */
    "LabelStyle"?: STYLEDEFINITION;


    /** Label display mode */
    "LabelDisplayMode"?: STRING<"inside" | "outside" | "none">;


    /** Style for gauge tick marks */
    "TickStyle"?: STYLEDEFINITION;


    /** Number of minor ticks per interval */
    "MinorTicks"?: NUMBER;


    /** Tick mark length */
    "TickLength"?: NUMBER;


    /** Minor tick length */
    "MinorTickLength"?: NUMBER;


    /** Style for value display */
    "ValueStyle"?: STYLEDEFINITION;


    /** Value display mode */
    "ValueDisplayMode"?: STRING<"top" | "bottom" | "inside" | "none">;


    /** Number of digits for label display */
    "LabelDigits"?: NUMBER;


    /** Number of decimals for label display */
    "LabelDecimals"?: NUMBER;


    /** Number of digits for value display */
    "ValueDigits"?: NUMBER;


    /** Number of decimals for value display */
    "ValueDecimals"?: NUMBER;


    /** Style for legend */
    "LegendStyle"?: STYLEDEFINITION;


    /** Legend display mode */
    "LegendDisplayMode"?: STRING<"top" | "bottom" | "none">;


    /** Text for the gauge legend */
    "Legend"?: STRING | BindingTarget<STRING>;


    /** Angle that controls the gauge orientation (degrees) */
    "ReferenceAngle"?: NUMBER;


    /** Angle that controls the gauge size (degrees) */
    "Aperture"?: NUMBER;


    /** Diameter of the gauge needle (pixels) */
    "NeedleDiameter"?: NUMBER;


    /** Diameter of the gauge center (pixels) */
    "CenterDiameter"?: NUMBER;


    /** Width of the outside gauge border (pixels) */
    "GaugeBorder"?: NUMBER;


    /** Width/thickness of the gauge ring (pixels). Applies when state formatting is set on ValueFormatter */
    "RingWidth"?: NUMBER;


    /** Widget width */
    "Width"?: NUMBER;


    /** Widget height */
    "Height"?: NUMBER;


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


    ref?: UIOutputInterfaceGauge
}

/** The binding source properties and services that can be bound on the "Gauge" widget. */
declare class UIOutputInterfaceGauge {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** A single-needle gauge */
declare function Gauge(props: UIInputInterfaceGauge): UIOutputInterfaceGauge

            
/** The properties and events that can be set or bound on the "Geotag" widget. */
declare interface UIInputInterfaceGeotag extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Widget will track the movement of your location. Without ShowControls, the widget will continuously track as long as the mashup is live. Displaying the controls allows you to turn on/off the tracking. Binding to this informs other widgets of location tracking. */
    "TrackLocation"?: BOOLEAN;


    /** Devices like smart phones have the ability to use their GPS capabilities or not. Enabling high accuracy, would choose to use the GPS capabilities over just the network abilities. Enabling high accuracy can impact the performance. Enabling high accuracy is also governed by device permissions. */
    "EnableHighAccuracy"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The minimum time in seconds between location update notifications */
    "MinimumUpdateFrequency"?: NUMBER;


    /** The time in seconds the widget is willing to wait for a location. */
    "Timeout"?: NUMBER;


    /** The time in seconds a cached location lives. Subsequent location calls within the MaximumCacheAge will return the cached location value. */
    "MaximumCacheAge"?: NUMBER;


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


    /** The z-index of the widget which allows you to put the widget on top or on the bottom of the view stack */
    "Z-index"?: NUMBER;


    /**  */
    "Margin"?: STYLECSSRECTSIZE;


    /** A bindable event triggered when the data for this widget is modified */
    "Changed"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceGeotag
}

/** The binding source properties and services that can be bound on the "Geotag" widget. */
declare class UIOutputInterfaceGeotag {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Widget will track the movement of your location. Without ShowControls, the widget will continuously track as long as the mashup is live. Displaying the controls allows you to turn on/off the tracking. Binding to this informs other widgets of location tracking. */
    TrackLocation: BindingTarget<BOOLEAN>;


    /** The current location - Longitude, Latitude, Elevation, and Units in WGS84 */
    CurrentLocation: BindingTarget<LOCATION>;


    /** The date & time when the current location was detected or error returned. */
    DateTime: BindingTarget<DATETIME>;


    /** The accuracy (measured in meters) of your location. */
    LocationAccuracy: BindingTarget<NUMBER>;


    /** The error message returned if obtaining the location fails. */
    ErrorMessage: BindingTarget<STRING>;


    /** The error code returned if obtaining the location fails. */
    ErrorCode: BindingTarget<NUMBER>
}

/** Enables the user to set or track geo locations. An internet connection is required. Location accuracy is dependent upon device and type of connection (e.g. a GPS enabled phone may have greater accuracy than a wired laptop.). Aquisition of a location always requires permission of the end user. Not compliant with IE versions 6, 7, or 8. */
declare function Geotag(props: UIInputInterfaceGeotag): UIOutputInterfaceGeotag

            
/** The properties and events that can be set or bound on the "Gridadvanced" widget. */
declare interface UIInputInterfaceGridadvanced extends UIBaseInputInterface {
    
    /** When enabled, uses the theme that is set for the mashup. */
    "UseTheme"?: BOOLEAN;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Select any infotable as the data source for this property */
    "Data"?: BindingTarget<INFOTABLE>;


    /** Allow grid value editing? */
    "IsEditable"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** tw.dhxgrid-ide.properties.enable-keyboard-navigation.description */
    "EnableKeyboardNavigation"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Select for using Grid for display-only continuous data refresh. All editing properties will be disabled when selected. */
    "DisplayOnlyMode"?: BOOLEAN;


    /** Enable Edit, Save, Cancel buttons in grid toolbar to allow for delayed saving of grid edits */
    "EnableEditButtons"?: BOOLEAN;


    /** Enable Add and Delete buttons in grid toolbar to allow for adding and deleting rows in the grid */
    "EnableAddDeleteButtons"?: BOOLEAN;


    /** The location for the grid edit buttons in the grid toolbar */
    "EditButtonsLocation"?: STRING<"top-right" | "top-left" | "bottom-right" | "bottom-left">;


    /** Name of grid column containing primary key/id */
    "IDFieldName"?: STRING;


    /** Bindable property used to render the grid based on a dynamically generated configuration. Binding to this property will hide other IDE based properties for this widget. */
    "Configuration"?: STRING | BindingTarget<STRING>;


    /** Either a specified range (e.g. 1-10) or a comma seperated list (e.g. 2,4,7,9,12-15) used to highlight rows with a "selected" style by default when the grid is loaded. */
    "DefaultSelectedRows"?: STRING | BindingTarget<STRING>;


    /** Bindable property that uses an INFOTABLE as a source to determine which rows should be highlighted as "selected" when the grid is first loaded */
    "SelectedRows"?: BindingTarget<INFOTABLE>;


    /** Disable row selection, enable only single row selection, or enable multiple row selection */
    "RowSelection"?: STRING<"none" | "single" | "multi">;


    /** Show full grid content and rely on parent container scrolling */
    "EnableContainerScroll"?: BOOLEAN;


    /** Auto scroll to the last vertical and horizontal scroll-position when in 'IsEditable' is enabled or to the last selected row when 'RowSelection' is enabled. */
    "AutoScroll"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Enable client side cookie persistence for column freeze, order, sort, size and visibility */
    "CookiePersistence"?: BOOLEAN;


    /** Enable the context menu to hide and show grid columns */
    "EnableContextMenu"?: BOOLEAN;


    /** Determines whether to enable or disable column sorting */
    "EnableSorting"?: BOOLEAN;


    /** Set default multi-colum sort order using column field names, e.g. "name:asc,office:des,id:des" */
    "MultiColumnSortOrder"?: STRING;


    /** Enable a search input field for global grid search */
    "EnableGridSearch"?: BOOLEAN;


    /** Location for the search box relative to the grid */
    "GridSearchLocation"?: STRING<"top-right" | "top-left" | "bottom-right" | "bottom-left">;


    /** Bindable property to be used as a filter query for a data service */
    "QueryFilter"?: BindingTarget<QUERY>;


    /** Enable a toolbar button for clearing the user cookie configurations, resetting the grid to it's default configuration */
    "EnableGridReset"?: BOOLEAN;


    /** When enabled, fire the Filter event when a grid configuration update from a service occurs. */
    "EnableFilterEventOnConfigChange"?: BOOLEAN;


    /** Enable row-selection callback when the row-selection changes through a SelectedRows property update */
    "EnableCallbackOnSelectedRowsChange"?: BOOLEAN;


    /** Enable grid footer that displays data coming from the 'FooterData' property */
    "EnableFooter"?: BOOLEAN;


    /** Use the latest standard validator that includes additional security restrictions instead of the legacy non-secure validator when defining validation expressions for column cells */
    "DisableLegacyValidation"?: BOOLEAN;


    /** BindEnable grid footer that displays data coming from the 'FooterData' property */
    "FooterData"?: BindingTarget<INFOTABLE>;


    /** The location for the grid reset button */
    "GridResetButtonLocation"?: STRING<"top-right" | "top-left" | "bottom-right" | "bottom-left">;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /**  */
    "ColumnFormat"?: STRING;


    /** Specify a State Formatter to format the data in each grid row */
    "RowFormat"?: STATEFORMATTING;


    /** Table wrapper style */
    "TableWrapperStyle"?: STYLEDEFINITION;


    /** Grid header style */
    "TableHeaderStyle"?: STYLEDEFINITION;


    /** Grid row focus style */
    "FocusStyle"?: STYLEDEFINITION;


    /** Grid row background style */
    "RowBackgroundStyle"?: STYLEDEFINITION;


    /** Grid alternate row background style */
    "RowAlternateBackgroundStyle"?: STYLEDEFINITION;


    /** Grid row hover style */
    "RowHoverStyle"?: STYLEDEFINITION;


    /** Grid selected row style */
    "RowSelectedStyle"?: STYLEDEFINITION;


    /** Cell border style applies a line color to the left and right borders. */
    "CellBorderStyle"?: STYLEDEFINITION;


    /** Row border style applies a line color to the bottom cell border. */
    "RowBorderStyle"?: STYLEDEFINITION;


    /** Toolbar style */
    "ToolbarStyle"?: STYLEDEFINITION;


    /** Footer style */
    "TableFooterStyle"?: STYLEDEFINITION;


    /** Tooltip style */
    "TooltipStyle"?: STYLEDEFINITION;


    /** Sort Ascending Style */
    "SortAscendingStyle"?: STYLEDEFINITION;


    /** Sort Descending Style */
    "SortDescendingStyle"?: STYLEDEFINITION;


    /** Cell validation error style */
    "CellValidationErrorStyle"?: STYLEDEFINITION;


    /** Cell validation error tooltip style */
    "CellValidationErrorTooltipStyle"?: STYLEDEFINITION;


    /** How to display text in the grid header that extends outside it's containing cell */
    "HeaderOverflow"?: STRING<"fitted" | "wrapped" | "clipped" | "ellipsis" | "tooltip">;


    /** How to display text in the grid body that extends outside it's containing cell */
    "DataOverflow"?: STRING<"fitted" | "wrapped" | "clipped" | "ellipsis" | "tooltip">;


    /** The maximum height (in pixels) the header should be allowed to expand to. If text expands beyond, it will get a vertical scrollbar. */
    "MaxHeaderHeight"?: NUMBER;


    /** The minimum height (in pixels) table rows should be allowed to display. */
    "MinRowHeight"?: NUMBER;


    /**  */
    "ConfigurationId"?: NUMBER;


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


    /** Triggers an event when the user double clicks the widget */
    "DoubleClicked"?: ServiceBindingTarget[];


    /** Event triggered when there is either a text search or a sort performed */
    "Filter"?: ServiceBindingTarget[];


    /** Event triggered when a user starts editing a cell in the grid */
    "EditCellStarted"?: ServiceBindingTarget[];


    /** Event triggered when a user finishes editing a cell in the grid */
    "EditCellCompleted"?: ServiceBindingTarget[];


    /** Event triggered when a user clicks the Edit button in the grid */
    "EditStarted"?: ServiceBindingTarget[];


    /** tw.grid-advanced-ide.events.edit-save.description */
    "EditCompleted"?: ServiceBindingTarget[];


    /** Event triggered when a user clicks the Cancel button in the grid */
    "EditCancelled"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceGridadvanced
}

/** The binding source properties and services that can be bound on the "Gridadvanced" widget. */
declare class UIOutputInterfaceGridadvanced {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Data source for edited items in the table */
    EditedTable: BindingTarget<INFOTABLE>;


    /** InfoTable containing the row(s) that were deleted from the grid and should be deleted on the server. */
    DeletedTable: BindingTarget<INFOTABLE>;


    /** Bindable property that uses an INFOTABLE as a source to determine which rows should be highlighted as "selected" when the grid is first loaded */
    SelectedRows: BindingTarget<INFOTABLE>;


    /** Bindable property to be used as a filter query for a data service */
    QueryFilter: BindingTarget<QUERY>;


    /** Binding that can trigger Grid Advanced widget to reset */
    Reset: ServiceBindingTarget
}

/** Advanced grid widget for displaying rows and columns of data */
declare function Gridadvanced(props: UIInputInterfaceGridadvanced): UIOutputInterfaceGridadvanced

            
/** The properties and events that can be set or bound on the "Treegridadvanced" widget. */
declare interface UIInputInterfaceTreegridadvanced extends UIBaseInputInterface {
    
    /** When enabled, uses the theme that is set for the mashup. */
    "UseTheme"?: BOOLEAN;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Select any infotable as the data source for this property */
    "Data"?: BindingTarget<INFOTABLE>;


    /** Allow grid value editing? */
    "IsEditable"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** tw.dhxgrid-ide.properties.enable-keyboard-navigation.description */
    "EnableKeyboardNavigation"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Select for using Grid for display-only continuous data refresh. All editing properties will be disabled when selected. */
    "DisplayOnlyMode"?: BOOLEAN;


    /** Enable Edit, Save, Cancel buttons in grid toolbar to allow for delayed saving of grid edits */
    "EnableEditButtons"?: BOOLEAN;


    /** Enable Add and Delete buttons in grid toolbar to allow for adding and deleting rows in the grid */
    "EnableAddDeleteButtons"?: BOOLEAN;


    /** The location for the grid edit buttons in the grid toolbar */
    "EditButtonsLocation"?: STRING<"top-right" | "top-left" | "bottom-right" | "bottom-left">;


    /** Name of grid column containing primary key/id */
    "IDFieldName"?: STRING;


    /** Bindable property used to render the grid based on a dynamically generated configuration. Binding to this property will hide other IDE based properties for this widget. */
    "Configuration"?: STRING | BindingTarget<STRING>;


    /** Either a specified range (e.g. 1-10) or a comma seperated list (e.g. 2,4,7,9,12-15) used to highlight rows with a "selected" style by default when the grid is loaded. */
    "DefaultSelectedRows"?: STRING | BindingTarget<STRING>;


    /** Bindable property that uses an INFOTABLE as a source to determine which rows should be highlighted as "selected" when the grid is first loaded */
    "SelectedRows"?: BindingTarget<INFOTABLE>;


    /** Disable row selection, enable only single row selection, or enable multiple row selection */
    "RowSelection"?: STRING<"none" | "single" | "multi">;


    /** Show full grid content and rely on parent container scrolling */
    "EnableContainerScroll"?: BOOLEAN;


    /** Auto scroll to the last vertical and horizontal scroll-position when in 'IsEditable' is enabled or to the last selected row when 'RowSelection' is enabled. */
    "AutoScroll"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Enable client side cookie persistence for column freeze, order, sort, size and visibility */
    "CookiePersistence"?: BOOLEAN;


    /** Enable the context menu to hide and show grid columns */
    "EnableContextMenu"?: BOOLEAN;


    /** Determines whether to enable or disable column sorting */
    "EnableSorting"?: BOOLEAN;


    /** Set default multi-colum sort order using column field names, e.g. "name:asc,office:des,id:des" */
    "MultiColumnSortOrder"?: STRING;


    /** Enable a search input field for global grid search */
    "EnableGridSearch"?: BOOLEAN;


    /** Location for the search box relative to the grid */
    "GridSearchLocation"?: STRING<"top-right" | "top-left" | "bottom-right" | "bottom-left">;


    /** Bindable property to be used as a filter query for a data service */
    "QueryFilter"?: BindingTarget<QUERY>;


    /** Enable a toolbar button for clearing the user cookie configurations, resetting the grid to it's default configuration */
    "EnableGridReset"?: BOOLEAN;


    /** When enabled, fire the Filter event when a grid configuration update from a service occurs. */
    "EnableFilterEventOnConfigChange"?: BOOLEAN;


    /** Enable row-selection callback when the row-selection changes through a SelectedRows property update */
    "EnableCallbackOnSelectedRowsChange"?: BOOLEAN;


    /** Enable grid footer that displays data coming from the 'FooterData' property */
    "EnableFooter"?: BOOLEAN;


    /** Use the latest standard validator that includes additional security restrictions instead of the legacy non-secure validator when defining validation expressions for column cells */
    "DisableLegacyValidation"?: BOOLEAN;


    /** BindEnable grid footer that displays data coming from the 'FooterData' property */
    "FooterData"?: BindingTarget<INFOTABLE>;


    /** The location for the grid reset button */
    "GridResetButtonLocation"?: STRING<"top-right" | "top-left" | "bottom-right" | "bottom-left">;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /**  */
    "ColumnFormat"?: STRING;


    /** Specify a State Formatter to format the data in each grid row */
    "RowFormat"?: STATEFORMATTING;


    /** Table wrapper style */
    "TableWrapperStyle"?: STYLEDEFINITION;


    /** Grid header style */
    "TableHeaderStyle"?: STYLEDEFINITION;


    /** Grid row focus style */
    "FocusStyle"?: STYLEDEFINITION;


    /** Grid row background style */
    "RowBackgroundStyle"?: STYLEDEFINITION;


    /** Grid alternate row background style */
    "RowAlternateBackgroundStyle"?: STYLEDEFINITION;


    /** Grid row hover style */
    "RowHoverStyle"?: STYLEDEFINITION;


    /** Grid selected row style */
    "RowSelectedStyle"?: STYLEDEFINITION;


    /** Cell border style applies a line color to the left and right borders. */
    "CellBorderStyle"?: STYLEDEFINITION;


    /** Row border style applies a line color to the bottom cell border. */
    "RowBorderStyle"?: STYLEDEFINITION;


    /** Toolbar style */
    "ToolbarStyle"?: STYLEDEFINITION;


    /** Footer style */
    "TableFooterStyle"?: STYLEDEFINITION;


    /** Tooltip style */
    "TooltipStyle"?: STYLEDEFINITION;


    /** Sort Ascending Style */
    "SortAscendingStyle"?: STYLEDEFINITION;


    /** Sort Descending Style */
    "SortDescendingStyle"?: STYLEDEFINITION;


    /** Cell validation error style */
    "CellValidationErrorStyle"?: STYLEDEFINITION;


    /** Cell validation error tooltip style */
    "CellValidationErrorTooltipStyle"?: STYLEDEFINITION;


    /** How to display text in the grid header that extends outside it's containing cell */
    "HeaderOverflow"?: STRING<"fitted" | "wrapped" | "clipped" | "ellipsis" | "tooltip">;


    /** How to display text in the grid body that extends outside it's containing cell */
    "DataOverflow"?: STRING<"fitted" | "wrapped" | "clipped" | "ellipsis" | "tooltip">;


    /** The maximum height (in pixels) the header should be allowed to expand to. If text expands beyond, it will get a vertical scrollbar. */
    "MaxHeaderHeight"?: NUMBER;


    /** The minimum height (in pixels) table rows should be allowed to display. */
    "MinRowHeight"?: NUMBER;


    /**  */
    "ConfigurationId"?: NUMBER;


    /** Service Data to bind to the child nodes */
    "ChildData"?: BindingTarget<INFOTABLE>;


    /** Name of grid column containing parent id */
    "ParentIDFieldName"?: STRING;


    /** The ID path separator that is used in ID paths for the selection of non-loaded rows */
    "IDPathSeparator"?: STRING;


    /** Name of grid column indicating if row contains child rows */
    "HasChildrenFieldName"?: STRING;


    /** Fetch parent rows of expanded or selected rows that are not pre-loaded. */
    "IncludeRowExpansionParents"?: BOOLEAN;


    /** InfoTable containing the list of row ids to expand. */
    "ExpandRows"?: BindingTarget<INFOTABLE>;


    /** Expand all initially loaded rows */
    "ExpandLoadedRows"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Expand row when it is double clicked */
    "ExpandRowOnDoubleClick"?: BOOLEAN;


    /** Preserve row expansions on reload */
    "PreserveRowExpansion"?: BOOLEAN;


    /** Style to change the tree row folder icon */
    "RowIconStyle"?: STYLEDEFINITION;


    /** Style to change the tree row expansion icon */
    "RowExpansionIconStyle"?: STYLEDEFINITION;


    /** Style to change the tree row collapse icon */
    "RowCollapseIconStyle"?: STYLEDEFINITION;


    /** The total number of rows that can be cached before data is purged when nodes are collapsed or are out of view. Values [5000,10000,50000,100000] */
    "MaxRowCacheSize"?: NUMBER;


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


    /** Triggers an event when the user double clicks the widget */
    "DoubleClicked"?: ServiceBindingTarget[];


    /** Event triggered when there is either a text search or a sort performed */
    "Filter"?: ServiceBindingTarget[];


    /** Event triggered when a user starts editing a cell in the grid */
    "EditCellStarted"?: ServiceBindingTarget[];


    /** Event triggered when a user finishes editing a cell in the grid */
    "EditCellCompleted"?: ServiceBindingTarget[];


    /** Event triggered when a user clicks the Edit button in the grid */
    "EditStarted"?: ServiceBindingTarget[];


    /** tw.grid-advanced-ide.events.edit-save.description */
    "EditCompleted"?: ServiceBindingTarget[];


    /** Event triggered when a user clicks the Cancel button in the grid */
    "EditCancelled"?: ServiceBindingTarget[];


    /** Event triggered when row selections are updated */
    "SelectedRowsChanged"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceTreegridadvanced
}

/** The binding source properties and services that can be bound on the "Treegridadvanced" widget. */
declare class UIOutputInterfaceTreegridadvanced {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Data source for edited items in the table */
    EditedTable: BindingTarget<INFOTABLE>;


    /** InfoTable containing the row(s) that were deleted from the grid and should be deleted on the server. */
    DeletedTable: BindingTarget<INFOTABLE>;


    /** Bindable property that uses an INFOTABLE as a source to determine which rows should be highlighted as "selected" when the grid is first loaded */
    SelectedRows: BindingTarget<INFOTABLE>;


    /** Bindable property to be used as a filter query for a data service */
    QueryFilter: BindingTarget<QUERY>;


    /** Binding that can trigger Grid Advanced widget to reset */
    Reset: ServiceBindingTarget
}

/** Advanced tree grid widget for displaying nested rows and columns of data. */
declare function Treegridadvanced(props: UIInputInterfaceTreegridadvanced): UIOutputInterfaceTreegridadvanced

            
/** The properties and events that can be set or bound on the "Htmltextarea" widget. */
declare interface UIInputInterfaceHtmltextarea extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The text that appears in the widget */
    "Text"?: STRING | BindingTarget<STRING>;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** Show the border of the Html Text Area widget */
    "ShowBorder"?: BOOLEAN;


    /** Parse the escaped html text */
    "EscapeHTMLText"?: BOOLEAN;


    /** The alignment of text label above the text area */
    "LabelAlignment"?: STRING<"left" | "right" | "center">;


    /** The style of the label */
    "LabelStyle"?: STYLEDEFINITION;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "Label"?: STRING;


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


    /** A bindable event triggered when the data for this widget is modified */
    "Changed"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceHtmltextarea
}

/** The binding source properties and services that can be bound on the "Htmltextarea" widget. */
declare class UIOutputInterfaceHtmltextarea {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** The text that appears in the widget */
    Text: BindingTarget<STRING>;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget
}

/** Enables the user to enter multi-line, HTML text */
declare function Htmltextarea(props: UIInputInterfaceHtmltextarea): UIOutputInterfaceHtmltextarea

            
/** The properties and events that can be set or bound on the "Image" widget. */
declare interface UIInputInterfaceImage extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Enter a description of the image to be used by screen readers */
    "AlternateText"?: STRING | BindingTarget<STRING>;


    /** Enter a URL for the image or select a media entity */
    "SourceURL"?: IMAGELINK | BindingTarget<IMAGELINK>;


    /** Select how the image scales within a container. When you place the widget in a empty container, the image is scaled relative to the container dimensions. When you add additional widgets to the image container, the image is scaled relative to its initial dimensions. */
    "Scaling"?: STRING<"width" | "height" | "none">;


    /** Prevent web browsers from caching the image */
    "PreventCaching"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** The style of the image border */
    "BorderStyle"?: STYLEDEFINITION;


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


    ref?: UIOutputInterfaceImage
}

/** The binding source properties and services that can be bound on the "Image" widget. */
declare class UIOutputInterfaceImage {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Displays an image. */
declare function Image(props: UIInputInterfaceImage): UIOutputInterfaceImage

            
/** The properties and events that can be set or bound on the "Label" widget. */
declare interface UIInputInterfaceLabel extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Sets the ellipsis if the text overflows the height and width of the widget. */
    "AllowEllipsis"?: BOOLEAN;


    /** The label text */
    "Text"?: STRING | BindingTarget<STRING>;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** The style of the label */
    "Style"?: STYLEDEFINITION | BindingTarget<STYLEDEFINITION>;


    /** The text alignment of the label */
    "Alignment"?: STRING<"left" | "right" | "center">;


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


    ref?: UIOutputInterfaceLabel
}

/** The binding source properties and services that can be bound on the "Label" widget. */
declare class UIOutputInterfaceLabel {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Displays a read-only text label. */
declare function Label(props: UIInputInterfaceLabel): UIOutputInterfaceLabel

            
/** The properties and events that can be set or bound on the "Labelchart" widget. */
declare interface UIInputInterfaceLabelchart<A> extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Use a Single Data Source for All Series */
    "SingleDataSource"?: BOOLEAN;


    /** Desired number of series in this chart */
    "NumberOfSeries"?: NUMBER;


    /** Overlays Y-axes that are displayed on the chart. You can choose the Y-axis to display by clicking a data series in the legend. */
    "OverlayYAxes"?: BOOLEAN;


    /** Data source */ 
    "Data"?: BindingTarget<INFOTABLE<A>>;


    /** Type of chart */
    "ChartType"?: STRING<"line" | "marker" | "linemarker" | "bar" | "area" | "areamarker">;


    /** Stack series values for bar and area charts */
    "StackSeries"?: BOOLEAN;


    /** Chart orientation */
    "ChartOrientation"?: STRING<"vertical" | "horizontal">;


    /** Chart overall style */
    "ChartStyle"?: STYLEDEFINITION;


    /** Chart area style */
    "ChartAreaStyle"?: STYLEDEFINITION;


    /** Chart legend style */
    "ChartLegendStyle"?: STYLEDEFINITION;


    /** Chart title style */
    "ChartTitleStyle"?: STYLEDEFINITION;


    /** Selected item style */
    "SelectedItemStyle"?: STYLEDEFINITION;


    /** Chart Title */
    "ChartTitle"?: STRING | BindingTarget<STRING>;


    /** Show or hide the legend */
    "ShowLegend"?: BOOLEAN;


    /** Fixed legend width (if non-zero it will be used) */
    "LegendWidth"?: NUMBER;


    /** Desired legend location (none = hide legend) */
    "LegendLocation"?: STRING<"right" | "top" | "bottom" | "left">;


    /** Desired legend orientation */
    "LegendOrientation"?: STRING<"vertical" | "horizontal">;


    /** Desired marker size */
    "MarkerSize"?: NUMBER;


    /** Desired marker type */
    "MarkerType"?: STRING<"circle" | "square" | "triangle" | "diamond" | "image">;


    /** Line smoothing */
    "Smoothing"?: BOOLEAN;


    /** Field that will provide X axis values */
    "XAxisField"?: FIELDNAME<A>;


    /** Show or hide X axis */
    "ShowXAxis"?: BOOLEAN;


    /** Chart X axis style */
    "XAxisStyle"?: STYLEDEFINITION;


    /** Format for X axis values */
    "XAxisFormat"?: STRING;


    /** Type for X axis values */
    "XAxisLabelType"?: STRING<"STRING" | "NUMERIC" | "DATETIME">;


    /** Label rotation (degrees) for X axis values */
    "XAxisLabelRotation"?: NUMBER;


    /** Max characters to display before truncating with ellipses and showing full label text in tooltip. Default 0 disables feature, negative values trim characters from start. */
    "TruncateX-AxisLabels"?: NUMBER;


    /** Show X axis labels */
    "ShowXAxisLabels"?: BOOLEAN;


    /** Show X axis ticks */
    "ShowXAxisTicks"?: BOOLEAN;


    /** Title to be displayed on the X axis */
    "XAxisTitle"?: STRING | BindingTarget<STRING>;


    /** Title to be displayed on the Y axis */
    "YAxisTitle"?: STRING | BindingTarget<STRING>;


    /** Title to be displayed on the Secondary Y axis */
    "SecondaryYAxisTitle"?: STRING;


    /** Show or hide Y axis */
    "ShowYAxis"?: BOOLEAN;


    /** Y axis mode */
    "YAxisMode"?: STRING<"single" | "dual" | "multi">;


    /** Max characters to display before truncating with ellipses and showing full label text in tooltip. Default 0 disables feature, negative values trim characters from start. */
    "TruncateY-AxisLabels"?: NUMBER;


    /** Show Y axis labels */
    "ShowYAxisLabels"?: BOOLEAN;


    /** Show Y axis ticks */
    "ShowYAxisTicks"?: BOOLEAN;


    /** Show Y axis smart labels */
    "ShowYAxisSmartLabels"?: BOOLEAN;


    /** Chart Y axis style */
    "YAxisStyle"?: STYLEDEFINITION;


    /** Format for Y axis values */
    "YAxisFormat"?: STRING;


    /** Number of Y axis chart intervals (affects ticks, grid) */
    "YAxisIntervals"?: NUMBER;


    /** Number of Y axis minor ticks */
    "YAxisMinorTicks"?: NUMBER;


    /** Number of Y axis labels */
    "YAxisLabels"?: NUMBER;


    /** Allow zooming the Y axis */
    "AllowYAxisZoom"?: BOOLEAN;


    /** Minimum range for the Y axis */
    "YAxisMinimum"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the Y axis */
    "YAxisMaximum"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the Y axis */
    "YAxisAutoscale"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "YAxisZeroscale"?: BOOLEAN;


    /** Format for secondary Y axis values */
    "SecondaryYAxisFormat"?: STRING;


    /** Minimum range for the secondary Y axis */
    "SecondaryYAxisMinimum"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the secondary Y axis */
    "SecondaryYAxisMaximum"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the secondary Y axis */
    "SecondaryYAxisAutoscale"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the secondary Y axis */
    "SecondaryYAxisZeroscale"?: BOOLEAN;


    /** Allow item selection */
    "AllowSelection"?: BOOLEAN;


    /** Enable display of values on hover */
    "EnableHover"?: BOOLEAN;


    /** Show horizontal grid */
    "ShowXAxisGrid"?: BOOLEAN;


    /** Show vertical grid */
    "ShowYAxisGrid"?: BOOLEAN;


    /** Chart grid style */
    "GridStyle"?: STYLEDEFINITION;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /**  */
    "ToolTipField"?: undefined;


    /** Series data source 1 */
    "DataSource1"?: BindingTarget<INFOTABLE>;


    /** Series data field 1 */
    "DataField1"?: FIELDNAME<A>;


    /** Series data label 1 */
    "DataLabel1"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 1 */
    "XAxisField1"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType1"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType1"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis1"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat1"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum1"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum1"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale1"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale1"?: BOOLEAN;


    /** Series style 1 */
    "SeriesStyle1"?: STYLEDEFINITION;


    /** Series data style 1 */
    "SeriesDataStyle1"?: STATEFORMATTING;


    /** Series data source 2 */
    "DataSource2"?: BindingTarget<INFOTABLE>;


    /** Series data field 2 */
    "DataField2"?: FIELDNAME<A>;


    /** Series data label 2 */
    "DataLabel2"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 2 */
    "XAxisField2"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType2"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType2"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis2"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat2"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum2"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum2"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale2"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale2"?: BOOLEAN;


    /** Series style 2 */
    "SeriesStyle2"?: STYLEDEFINITION;


    /** Series data style 2 */
    "SeriesDataStyle2"?: STATEFORMATTING;


    /** Series data source 3 */
    "DataSource3"?: BindingTarget<INFOTABLE>;


    /** Series data field 3 */
    "DataField3"?: FIELDNAME<A>;


    /** Series data label 3 */
    "DataLabel3"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 3 */
    "XAxisField3"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType3"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType3"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis3"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat3"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum3"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum3"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale3"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale3"?: BOOLEAN;


    /** Series style 3 */
    "SeriesStyle3"?: STYLEDEFINITION;


    /** Series data style 3 */
    "SeriesDataStyle3"?: STATEFORMATTING;


    /** Series data source 4 */
    "DataSource4"?: BindingTarget<INFOTABLE>;


    /** Series data field 4 */
    "DataField4"?: FIELDNAME<A>;


    /** Series data label 4 */
    "DataLabel4"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 4 */
    "XAxisField4"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType4"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType4"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis4"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat4"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum4"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum4"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale4"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale4"?: BOOLEAN;


    /** Series style 4 */
    "SeriesStyle4"?: STYLEDEFINITION;


    /** Series data style 4 */
    "SeriesDataStyle4"?: STATEFORMATTING;


    /** Series data source 5 */
    "DataSource5"?: BindingTarget<INFOTABLE>;


    /** Series data field 5 */
    "DataField5"?: FIELDNAME<A>;


    /** Series data label 5 */
    "DataLabel5"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 5 */
    "XAxisField5"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType5"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType5"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis5"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat5"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum5"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum5"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale5"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale5"?: BOOLEAN;


    /** Series style 5 */
    "SeriesStyle5"?: STYLEDEFINITION;


    /** Series data style 5 */
    "SeriesDataStyle5"?: STATEFORMATTING;


    /** Series data source 6 */
    "DataSource6"?: BindingTarget<INFOTABLE>;


    /** Series data field 6 */
    "DataField6"?: FIELDNAME<A>;


    /** Series data label 6 */
    "DataLabel6"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 6 */
    "XAxisField6"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType6"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType6"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis6"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat6"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum6"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum6"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale6"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale6"?: BOOLEAN;


    /** Series style 6 */
    "SeriesStyle6"?: STYLEDEFINITION;


    /** Series data style 6 */
    "SeriesDataStyle6"?: STATEFORMATTING;


    /** Series data source 7 */
    "DataSource7"?: BindingTarget<INFOTABLE>;


    /** Series data field 7 */
    "DataField7"?: FIELDNAME<A>;


    /** Series data label 7 */
    "DataLabel7"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 7 */
    "XAxisField7"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType7"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType7"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis7"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat7"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum7"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum7"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale7"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale7"?: BOOLEAN;


    /** Series style 7 */
    "SeriesStyle7"?: STYLEDEFINITION;


    /** Series data style 7 */
    "SeriesDataStyle7"?: STATEFORMATTING;


    /** Series data source 8 */
    "DataSource8"?: BindingTarget<INFOTABLE>;


    /** Series data field 8 */
    "DataField8"?: FIELDNAME<A>;


    /** Series data label 8 */
    "DataLabel8"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 8 */
    "XAxisField8"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType8"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType8"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis8"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat8"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum8"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum8"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale8"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale8"?: BOOLEAN;


    /** Series style 8 */
    "SeriesStyle8"?: STYLEDEFINITION;


    /** Series data style 8 */
    "SeriesDataStyle8"?: STATEFORMATTING;


    /** Series data source 9 */
    "DataSource9"?: BindingTarget<INFOTABLE>;


    /** Series data field 9 */
    "DataField9"?: FIELDNAME<A>;


    /** Series data label 9 */
    "DataLabel9"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 9 */
    "XAxisField9"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType9"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType9"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis9"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat9"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum9"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum9"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale9"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale9"?: BOOLEAN;


    /** Series style 9 */
    "SeriesStyle9"?: STYLEDEFINITION;


    /** Series data style 9 */
    "SeriesDataStyle9"?: STATEFORMATTING;


    /** Series data source 10 */
    "DataSource10"?: BindingTarget<INFOTABLE>;


    /** Series data field 10 */
    "DataField10"?: FIELDNAME<A>;


    /** Series data label 10 */
    "DataLabel10"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 10 */
    "XAxisField10"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType10"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType10"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis10"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat10"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum10"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum10"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale10"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale10"?: BOOLEAN;


    /** Series style 10 */
    "SeriesStyle10"?: STYLEDEFINITION;


    /** Series data style 10 */
    "SeriesDataStyle10"?: STATEFORMATTING;


    /** Series data source 11 */
    "DataSource11"?: BindingTarget<INFOTABLE>;


    /** Series data field 11 */
    "DataField11"?: FIELDNAME<A>;


    /** Series data label 11 */
    "DataLabel11"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 11 */
    "XAxisField11"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType11"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType11"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis11"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat11"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum11"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum11"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale11"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale11"?: BOOLEAN;


    /** Series style 11 */
    "SeriesStyle11"?: STYLEDEFINITION;


    /** Series data style 11 */
    "SeriesDataStyle11"?: STATEFORMATTING;


    /** Series data source 12 */
    "DataSource12"?: BindingTarget<INFOTABLE>;


    /** Series data field 12 */
    "DataField12"?: FIELDNAME<A>;


    /** Series data label 12 */
    "DataLabel12"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 12 */
    "XAxisField12"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType12"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType12"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis12"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat12"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum12"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum12"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale12"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale12"?: BOOLEAN;


    /** Series style 12 */
    "SeriesStyle12"?: STYLEDEFINITION;


    /** Series data style 12 */
    "SeriesDataStyle12"?: STATEFORMATTING;


    /** Series data source 13 */
    "DataSource13"?: BindingTarget<INFOTABLE>;


    /** Series data field 13 */
    "DataField13"?: FIELDNAME<A>;


    /** Series data label 13 */
    "DataLabel13"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 13 */
    "XAxisField13"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType13"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType13"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis13"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat13"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum13"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum13"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale13"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale13"?: BOOLEAN;


    /** Series style 13 */
    "SeriesStyle13"?: STYLEDEFINITION;


    /** Series data style 13 */
    "SeriesDataStyle13"?: STATEFORMATTING;


    /** Series data source 14 */
    "DataSource14"?: BindingTarget<INFOTABLE>;


    /** Series data field 14 */
    "DataField14"?: FIELDNAME<A>;


    /** Series data label 14 */
    "DataLabel14"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 14 */
    "XAxisField14"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType14"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType14"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis14"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat14"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum14"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum14"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale14"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale14"?: BOOLEAN;


    /** Series style 14 */
    "SeriesStyle14"?: STYLEDEFINITION;


    /** Series data style 14 */
    "SeriesDataStyle14"?: STATEFORMATTING;


    /** Series data source 15 */
    "DataSource15"?: BindingTarget<INFOTABLE>;


    /** Series data field 15 */
    "DataField15"?: FIELDNAME<A>;


    /** Series data label 15 */
    "DataLabel15"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 15 */
    "XAxisField15"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType15"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType15"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis15"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat15"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum15"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum15"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale15"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale15"?: BOOLEAN;


    /** Series style 15 */
    "SeriesStyle15"?: STYLEDEFINITION;


    /** Series data style 15 */
    "SeriesDataStyle15"?: STATEFORMATTING;


    /** Series data source 16 */
    "DataSource16"?: BindingTarget<INFOTABLE>;


    /** Series data field 16 */
    "DataField16"?: FIELDNAME<A>;


    /** Series data label 16 */
    "DataLabel16"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 16 */
    "XAxisField16"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType16"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType16"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis16"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat16"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum16"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum16"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale16"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale16"?: BOOLEAN;


    /** Series style 16 */
    "SeriesStyle16"?: STYLEDEFINITION;


    /** Series data style 16 */
    "SeriesDataStyle16"?: STATEFORMATTING;


    /** Series data source 17 */
    "DataSource17"?: BindingTarget<INFOTABLE>;


    /** Series data field 17 */
    "DataField17"?: FIELDNAME<A>;


    /** Series data label 17 */
    "DataLabel17"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 17 */
    "XAxisField17"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType17"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType17"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis17"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat17"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum17"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum17"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale17"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale17"?: BOOLEAN;


    /** Series style 17 */
    "SeriesStyle17"?: STYLEDEFINITION;


    /** Series data style 17 */
    "SeriesDataStyle17"?: STATEFORMATTING;


    /** Series data source 18 */
    "DataSource18"?: BindingTarget<INFOTABLE>;


    /** Series data field 18 */
    "DataField18"?: FIELDNAME<A>;


    /** Series data label 18 */
    "DataLabel18"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 18 */
    "XAxisField18"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType18"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType18"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis18"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat18"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum18"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum18"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale18"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale18"?: BOOLEAN;


    /** Series style 18 */
    "SeriesStyle18"?: STYLEDEFINITION;


    /** Series data style 18 */
    "SeriesDataStyle18"?: STATEFORMATTING;


    /** Series data source 19 */
    "DataSource19"?: BindingTarget<INFOTABLE>;


    /** Series data field 19 */
    "DataField19"?: FIELDNAME<A>;


    /** Series data label 19 */
    "DataLabel19"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 19 */
    "XAxisField19"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType19"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType19"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis19"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat19"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum19"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum19"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale19"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale19"?: BOOLEAN;


    /** Series style 19 */
    "SeriesStyle19"?: STYLEDEFINITION;


    /** Series data style 19 */
    "SeriesDataStyle19"?: STATEFORMATTING;


    /** Series data source 20 */
    "DataSource20"?: BindingTarget<INFOTABLE>;


    /** Series data field 20 */
    "DataField20"?: FIELDNAME<A>;


    /** Series data label 20 */
    "DataLabel20"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 20 */
    "XAxisField20"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType20"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType20"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis20"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat20"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum20"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum20"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale20"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale20"?: BOOLEAN;


    /** Series style 20 */
    "SeriesStyle20"?: STYLEDEFINITION;


    /** Series data style 20 */
    "SeriesDataStyle20"?: STATEFORMATTING;


    /** Series data source 21 */
    "DataSource21"?: BindingTarget<INFOTABLE>;


    /** Series data field 21 */
    "DataField21"?: FIELDNAME<A>;


    /** Series data label 21 */
    "DataLabel21"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 21 */
    "XAxisField21"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType21"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType21"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis21"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat21"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum21"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum21"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale21"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale21"?: BOOLEAN;


    /** Series style 21 */
    "SeriesStyle21"?: STYLEDEFINITION;


    /** Series data style 21 */
    "SeriesDataStyle21"?: STATEFORMATTING;


    /** Series data source 22 */
    "DataSource22"?: BindingTarget<INFOTABLE>;


    /** Series data field 22 */
    "DataField22"?: FIELDNAME<A>;


    /** Series data label 22 */
    "DataLabel22"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 22 */
    "XAxisField22"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType22"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType22"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis22"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat22"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum22"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum22"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale22"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale22"?: BOOLEAN;


    /** Series style 22 */
    "SeriesStyle22"?: STYLEDEFINITION;


    /** Series data style 22 */
    "SeriesDataStyle22"?: STATEFORMATTING;


    /** Series data source 23 */
    "DataSource23"?: BindingTarget<INFOTABLE>;


    /** Series data field 23 */
    "DataField23"?: FIELDNAME<A>;


    /** Series data label 23 */
    "DataLabel23"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 23 */
    "XAxisField23"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType23"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType23"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis23"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat23"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum23"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum23"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale23"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale23"?: BOOLEAN;


    /** Series style 23 */
    "SeriesStyle23"?: STYLEDEFINITION;


    /** Series data style 23 */
    "SeriesDataStyle23"?: STATEFORMATTING;


    /** Series data source 24 */
    "DataSource24"?: BindingTarget<INFOTABLE>;


    /** Series data field 24 */
    "DataField24"?: FIELDNAME<A>;


    /** Series data label 24 */
    "DataLabel24"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 24 */
    "XAxisField24"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType24"?: STRING<"chart" | "line" | "linemarker" | "marker" | "bar">;


    /** Series-specific marker type */
    "SeriesMarkerType24"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis24"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat24"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum24"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum24"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale24"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale24"?: BOOLEAN;


    /** Series style 24 */
    "SeriesStyle24"?: STYLEDEFINITION;


    /** Series data style 24 */
    "SeriesDataStyle24"?: STATEFORMATTING;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


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


    /** Triggers an event when the user double clicks the widget */
    "DoubleClicked"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceLabelchart<A>
}

/** The binding source properties and services that can be bound on the "Labelchart" widget. */
declare class UIOutputInterfaceLabelchart<A> {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Displays a label chart */
declare function Labelchart<A>(props: UIInputInterfaceLabelchart<A>): UIOutputInterfaceLabelchart<A>

            
/** The properties and events that can be set or bound on the "Layout" widget. */
declare interface UIInputInterfaceLayout extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Basic Layout */
    "Orientation"?: STRING<"horizontal" | "vertical">;


    /** The number of responsive columns */
    "Columns"?: NUMBER;


    /** The spacing within the layout */
    "Spacing"?: NUMBER;


    /** Check this box if you want the spacing value that you set above to apply to the sidebars or the header & footer */
    "IncludeSpacingInFixedAreas"?: BOOLEAN;


    /**  */
    "LeftSidebar"?: BOOLEAN;


    /** The width of the left fixed-width column */
    "LeftSidebarWidth"?: NUMBER;


    /**  */
    "RightSidebar"?: BOOLEAN;


    /** The width of the right fixed-width column */
    "RightSidebarWidth"?: NUMBER;


    /** The % of space for column 1 */
    "PctColumn1"?: NUMBER;


    /** The % of space for column 2 */
    "PctColumn2"?: NUMBER;


    /** The % of space for column 3 */
    "PctColumn3"?: NUMBER;


    /** The % of space for column 4 */
    "PctColumn4"?: NUMBER;


    /** The % of space for column 5 */
    "PctColumn5"?: NUMBER;


    /** The % of space for column 6 */
    "PctColumn6"?: NUMBER;


    /** The % of space for column 7 */
    "PctColumn7"?: NUMBER;


    /** The % of space for column 8 */
    "PctColumn8"?: NUMBER;


    /** The number of responsive Rows */
    "Rows"?: NUMBER;


    /**  */
    "Header"?: BOOLEAN;


    /** The height of the top fixed-height row */
    "HeaderHeight"?: NUMBER;


    /**  */
    "Footer"?: BOOLEAN;


    /** The height of the bottom fixed-height row */
    "FooterHeight"?: NUMBER;


    /** The % of space for row 1 */
    "PctRow1"?: NUMBER;


    /** The % of space for row 2 */
    "PctRow2"?: NUMBER;


    /** The % of space for row 3 */
    "PctRow3"?: NUMBER;


    /** The % of space for row 4 */
    "PctRow4"?: NUMBER;


    /** The % of space for row 5 */
    "PctRow5"?: NUMBER;


    /** The % of space for row 6 */
    "PctRow6"?: NUMBER;


    /** The % of space for row 7 */
    "PctRow7"?: NUMBER;


    /** The % of space for row 8 */
    "PctRow8"?: NUMBER;


    /** Is the layout responsive? */
    "ResponsiveLayout"?: BOOLEAN;


    /**  */
    "IsPrintLayout"?: BOOLEAN;


    /** For now, use 650 for portrait and 800 for landscape */
    "PrintWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** Set print top and bottom page margins */
    "PrintMarginTopBottom"?: NUMBER | BindingTarget<NUMBER>;


    /** Set print left and right page margins */
    "PrintMarginLeftRight"?: NUMBER | BindingTarget<NUMBER>;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /** Show a spinner icon when data is being loaded */
    "ShowDataLoading"?: BOOLEAN;


    /** When enabled makes the widget visible in the mashup */
    "Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


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


    ref?: UIOutputInterfaceLayout
}

/** The binding source properties and services that can be bound on the "Layout" widget. */
declare class UIOutputInterfaceLayout {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget;


    /** Resets all the contained widgets to their default values */
    ResetInputsToDefaultValue: ServiceBindingTarget
}

/** Allows you to build a responsive layout with multiple columns or rows */
declare function Layout(props: UIInputInterfaceLayout): UIOutputInterfaceLayout

            
/** The properties and events that can be set or bound on the "Leddisplay" widget. */
declare interface UIInputInterfaceLeddisplay extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Data source */
    "Data"?: NUMBER | BindingTarget<NUMBER>;


    /** Number of digits */
    "Digits"?: INTEGER;


    /** Number of decimals */
    "Decimals"?: INTEGER;


    /** Fill display with leading zeros */
    "ZeroFill"?: BOOLEAN;


    /** Size of LEDs */
    "LEDSize"?: STRING<"xsmall" | "small" | "normal" | "large" | "xlarge">;


    /** Style for the display */
    "LEDStyle"?: STYLEDEFINITION;


    /** Styling rules for the display */
    "LEDFormatter"?: STATEFORMATTING;


    /** The label text alignment of the LED display */
    "LabelAlignment"?: STRING<"left" | "right" | "center">;


    /** The style of the label */
    "LEDLabelStyle"?: STYLEDEFINITION;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "Label"?: STRING;


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


    /** The z-index of the widget which allows you to put the widget on top or on the bottom of the view stack */
    "Z-index"?: NUMBER;


    /**  */
    "Margin"?: STYLECSSRECTSIZE;


    ref?: UIOutputInterfaceLeddisplay
}

/** The binding source properties and services that can be bound on the "Leddisplay" widget. */
declare class UIOutputInterfaceLeddisplay {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Simulates a LED Display */
declare function Leddisplay(props: UIInputInterfaceLeddisplay): UIOutputInterfaceLeddisplay

            
/** The properties and events that can be set or bound on the "Link" widget. */
declare interface UIInputInterfaceLink extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The default link text to be shown */
    "Text"?: STRING | BindingTarget<STRING>;


    /** The link URL */
    "SourceURL"?: STRING | BindingTarget<STRING>;


    /** Target window for the link navigation */
    "TargetWindow"?: STRING<"new" | "replace" | "popup">;


    /** The style of the link */
    "LinkStyle"?: STYLEDEFINITION;


    /** The hover style of the link */
    "LinkHoverStyle"?: STYLEDEFINITION;


    /** The link display format */
    "LinkDisplay"?: STRING<"textOnly" | "imageLeft" | "imageRight" | "imageTop" | "imageBottom" | "noText">;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** Alignment of link text */
    "Alignment"?: STRING<"left" | "center" | "right">;


    /** Tab sequence index */
    "TabSequence"?: NUMBER;


    /** Alignment of link text */
    "VerticalAlignment"?: STRING<"flex-start" | "center" | "flex-end">;


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


    ref?: UIOutputInterfaceLink
}

/** The binding source properties and services that can be bound on the "Link" widget. */
declare class UIOutputInterfaceLink {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Navigate the user to the designated URL defined for this widget */
    Navigate: ServiceBindingTarget
}

/** Opens the user defined page. */
declare function Link(props: UIInputInterfaceLink): UIOutputInterfaceLink

            
/** The properties and events that can be set or bound on the "Logoutbutton" widget. */
declare interface UIInputInterfaceLogoutbutton extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The text that appears on the button */
    "Label"?: STRING;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** Tab sequence index */
    "TabSequence"?: NUMBER;


    /** Specify the mashup to redirect to. No mashup will cause a reload */
    "RedirectMashup"?: MASHUPNAME | BindingTarget<MASHUPNAME>;


    /** Require a confirmation dialog */
    "ConfirmationRequired"?: BOOLEAN;


    /** Title for the optional confirmation dialog */
    "ConfirmationTitle"?: STRING;


    /** Prompt for the optional confirmation dialog */
    "ConfirmationPrompt"?: STRING;


    /** Label for the first confirmation dialog button */
    "ConfirmationButton1Label"?: STRING;


    /** Label for the second confirmation dialog button */
    "ConfirmationButton2Label"?: STRING;


    /** Default button for the confirmation dialog */
    "DefaultConfirmationButton"?: STRING<"button1" | "button2">;


    /** Cancel button for the confirmation dialog */
    "CancelConfirmationButton"?: STRING<"button1" | "button2">;


    /** Do you want the corners on the button rounded */
    "RoundedCorners"?: BOOLEAN;


    /** Button is disabled. */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The logout button style */
    "Style"?: STYLEDEFINITION;


    /** The logout button hover style */
    "HoverStyle"?: STYLEDEFINITION;


    /** The logout button active style */
    "ActiveStyle"?: STYLEDEFINITION;


    /** The style used when the logout button is in focus */
    "FocusStyle"?: STYLEDEFINITION;


    /** The style used when the button is disabled */
    "DisabledStyle"?: STYLEDEFINITION;


    /** Either align the icon for the button to the left or the right of the text */
    "IconAlignment"?: STRING<"left" | "right">;


    /** Enables you to set an icon image in the logout button widget */
    "Icon"?: IMAGELINK | BindingTarget<IMAGELINK>;


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


    /** Triggers an event when the widget is clicked */
    "Clicked"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceLogoutbutton
}

/** The binding source properties and services that can be bound on the "Logoutbutton" widget. */
declare class UIOutputInterfaceLogoutbutton {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Logs out the user when clicked */
declare function Logoutbutton(props: UIInputInterfaceLogoutbutton): UIOutputInterfaceLogoutbutton

            
/** The properties and events that can be set or bound on the "Logoutfunction" widget. */
declare interface UIInputInterfaceLogoutfunction extends UIBaseInputInterface {
    
    /** tw.logoutfunction-ide.properties.mashup-name.description */
    "RedirectTo"?: MASHUPNAME | BindingTarget<MASHUPNAME>;


    /** tw.logoutfunction-ide.properties.mashup-name.description */
    "LogoutTargetMashup"?: MASHUPNAME | BindingTarget<MASHUPNAME>;


    /** tw.logoutfunction-ide.properties.message-to-show.description */
    "URL"?: STRING | BindingTarget<STRING>;


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


    ref?: UIOutputInterfaceLogoutfunction
}

/** The binding source properties and services that can be bound on the "Logoutfunction" widget. */
declare class UIOutputInterfaceLogoutfunction {
    
    /**  */
    Logout: ServiceBindingTarget
}

/** LogOut function to another mashup */
declare function Logoutfunction(props: UIInputInterfaceLogoutfunction): UIOutputInterfaceLogoutfunction
            
/** The properties and events that can be set or bound on the "Maskedtextbox" widget. */
declare interface UIInputInterfaceMaskedtextbox extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Text value of the masked text box. */
    "Text"?: STRING;


    /** Width of the widget. */
    "Width"?: NUMBER;


    /** Height of the widget. */
    "Height"?: NUMBER;


    /** The positioning of the text. */
    "TextAlign"?: STRING<"right" | "left" | "center">;


    /** The positioning of the label text above the input field */
    "LabelAlignment"?: STRING<"left" | "right" | "center">;


    /** Mask for the textbox. a=alpha, 9=numeric, *=alpha-numeric. */
    "Mask"?: STRING;


    /** Adds inner shadow effect to the inside of the textbox */
    "InnerShadow"?: BOOLEAN;


    /** Tab sequence index */
    "TabSequence"?: NUMBER;


    /** The Masked Textbox style */
    "Style"?: STYLEDEFINITION;


    /** The Masked Textbox label style */
    "MaskedTextboxLabelStyle"?: STYLEDEFINITION;


    /** The Masked Textbox focus style */
    "MaskedTextboxFocusStyle"?: STYLEDEFINITION;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "Label"?: STRING;


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


    ref?: UIOutputInterfaceMaskedtextbox
}

/** The binding source properties and services that can be bound on the "Maskedtextbox" widget. */
declare class UIOutputInterfaceMaskedtextbox {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Text value of the masked text box. */
    Text: BindingTarget<STRING>;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget
}

/** Enables the user to enter data based on a mask. */
declare function Maskedtextbox(props: UIInputInterfaceMaskedtextbox): UIOutputInterfaceMaskedtextbox

            
/** The properties and events that can be set or bound on the "Menu" widget. */
declare interface UIInputInterfaceMenu extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** You can either pre-configure the menu to use or bind it to "MenuData" */
    "ConfiguredOrDataDriven"?: STRING<"configured" | "datadriven">;


    /** If you are using this menu in a master mashup, set this to "Drive Page Mashup".  If you want this to control a contained mashup, select "Bound to Mashup parameter" */
    "DrivePageMashupOrBindToMashup"?: STRING<"pagemashup" | "bound">;


    /** The menu that this widget works off of if configured */
    "Menu"?: MENUNAME;


    /** Typically you would use "All" but you can split a menu in two by configuring the same menu with one part using "Top" and the second part using "All But Top" */
    "Levels"?: STRING<"all" | "top" | "allbuttop">;


    /** The menu item layout */
    "View"?: STRING<"horiz" | "vert" | "accordion">;


    /** Evenly spaces the menu items at the top level */
    "EvenlySpacedMenuItems"?: BOOLEAN;


    /** The layout of the text and icon within each menu item */
    "MenuItemDisplay"?: STRING<"textonly" | "iconleftoftext" | "iconabovetext" | "iconrightoftext" | "icononly">;


    /** Set the height of sub-menus. */
    "SubMenuHeight"?: NUMBER;


    /** Set the width of sub-menus to the width of the parent item. */
    "SubmenuWidthMatchParent"?: BOOLEAN;


    /** Bind this to data that uses the DataShape of "MenuEntry" */
    "MenuData"?: BindingTarget<INFOTABLE>;


    /** If you set DrivePageMashupOrBindToMashup to "Bound to Mashup parameter", this can be bound to the chosen mashup */
    "Mashup"?: STRING;


    /** For "All but Top" menus auto-select where you last were?  If not, we auto-select the default item. */
    "AllButTopRememberLastChoice"?: BOOLEAN;


    /** The width of the menu */
    "Width"?: NUMBER;


    /** Truncate text and show ellipsis if the text overflows the submenu width. */
    "AllowEllipsis"?: BOOLEAN;


    /** tw.menu-ide.properties.submenu-width.description */
    "SubmenuWidth"?: NUMBER;


    /** The height of the menu */
    "Height"?: NUMBER;


    /** Horizontal alignment of the items */
    "Alignment"?: STRING<"left" | "right" | "center">;


    /** How big for icons? */
    "IconMaxWidth"?: NUMBER;


    /** The menu bar background style */
    "MenuBackgroundStyle"?: STYLEDEFINITION;


    /** The menu style */
    "MenuStyle"?: STYLEDEFINITION;


    /** The menu hover style */
    "MenuHoverStyle"?: STYLEDEFINITION;


    /** The selected menu item style */
    "MenuSelectedStyle"?: STYLEDEFINITION;


    /** The sub-menu item style */
    "MenuLevelStyle"?: STYLEDEFINITION;


    /** The sub-menu item hover style */
    "MenuLevelHoverStyle"?: STYLEDEFINITION;


    /** The sub-menu item selected style */
    "MenuLevelSelectedStyle"?: STYLEDEFINITION;


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


    ref?: UIOutputInterfaceMenu
}

/** The binding source properties and services that can be bound on the "Menu" widget. */
declare class UIOutputInterfaceMenu {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** If you set DrivePageMashupOrBindToMashup to "Bound to Mashup parameter", this can be bound to the chosen mashup */
    Mashup: BindingTarget<STRING>
}

/** Displays a menu from preconfigured menu or live data from a service */
declare function Menu(props: UIInputInterfaceMenu): UIOutputInterfaceMenu
            
/** The properties and events that can be set or bound on the "Numericentry" widget. */
declare interface UIInputInterfaceNumericentry extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Value of the numeric value entry. */
    "Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Set to true to limit the value inputs to be between the minimum and maximum values. */
    "ConstrainValue"?: BOOLEAN;


    /** Minimum allowable value. */
    "Minimum"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum allowable value. */
    "Maximum"?: NUMBER | BindingTarget<NUMBER>;


    /** Number of allowable digits to the right of the decimal (zero is no limit). */
    "FixedDigits"?: INTEGER;


    /** Width of the widget. */
    "Width"?: NUMBER;


    /** Height of the widget. */
    "Height"?: NUMBER;


    /** When set to true, allows decimal values. */
    "AllowDecimals"?: BOOLEAN;


    /** When set to true, allows negative values. */
    "AllowNegatives"?: BOOLEAN;


    /** The positioning of the value. */
    "ValueAlign"?: STRING<"right" | "left" | "center">;


    /** Alignment of label in the widget */
    "LabelAlignment"?: STRING<"left" | "right" | "center">;


    /** Adds inner shadow effect to the inside of the textbox */
    "InnerShadow"?: BOOLEAN;


    /** Tab sequence index */
    "TabSequence"?: NUMBER;


    /** The style of the widget */
    "Style"?: STYLEDEFINITION;


    /** The style of the widget label */
    "NumericEntryLabelStyle"?: STYLEDEFINITION;


    /** The style of the widget when it is in focus */
    "NumericEntryFocusStyle"?: STYLEDEFINITION;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "Label"?: STRING;


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


    /** A bindable event triggered when the data for this widget is modified */
    "Changed"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceNumericentry
}

/** The binding source properties and services that can be bound on the "Numericentry" widget. */
declare class UIOutputInterfaceNumericentry {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Value of the numeric value entry. */
    Value: BindingTarget<NUMBER>;


    /** Minimum allowable value. */
    Minimum: BindingTarget<NUMBER>;


    /** Maximum allowable value. */
    Maximum: BindingTarget<NUMBER>;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget
}

/** Enables the user to enter numeric values based on locale */
declare function Numericentry(props: UIInputInterfaceNumericentry): UIOutputInterfaceNumericentry

            
/** The properties and events that can be set or bound on the "Pagemashupcontainer" widget. */
declare interface UIInputInterfacePagemashupcontainer extends UIBaseInputInterface {
    
    /** The name of the containing mashup */
    "Name"?: STRING | BindingTarget<STRING>;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** Is the layout responsive? */
    "ResponsiveLayout"?: BOOLEAN;


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


    ref?: UIOutputInterfacePagemashupcontainer
}

/** The binding source properties and services that can be bound on the "Pagemashupcontainer" widget. */
declare class UIOutputInterfacePagemashupcontainer {
    
    /** To be used externally so you only have one auto-refresh on a page.  Does not refresh the browser, just triggers RefreshRequested which you then bind to the services you would like to trigger */
    Refresh: ServiceBindingTarget
}

/**  */
declare function Pagemashupcontainer(props: UIInputInterfacePagemashupcontainer): UIOutputInterfacePagemashupcontainer

            
/** The properties and events that can be set or bound on the "Panel" widget. */
declare interface UIInputInterfacePanel extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** User defined CSS class to apply to the container div of the widget. Multiple classes can be entered, separated by space. */
    "ContainerClass"?: STRING | BindingTarget<STRING>;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** Fit panel inside a responsive layout */
    "ResponsiveLayout"?: BOOLEAN;


    /** Anchoring the panel to the left, center or right */
    "HorizontalAnchor"?: STRING<"left" | "center">;


    /** Anchoring the panel to the top, middle or bottom */
    "VerticalAnchor"?: STRING<"top" | "middle">;


    /** The style of the panel */
    "Style"?: STYLEDEFINITION;


    /** Hide scrollbars. Panel content may be clipped if it exceeds the available space. */
    "HideScrollbars"?: BOOLEAN;


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


    ref?: UIOutputInterfacePanel
}

/** The binding source properties and services that can be bound on the "Panel" widget. */
declare class UIOutputInterfacePanel {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** User defined CSS class to apply to the container div of the widget. Multiple classes can be entered, separated by space. */
    ContainerClass: BindingTarget<STRING>;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget;


    /** Resets all the contained widgets to their default values */
    ResetInputsToDefaultValue: ServiceBindingTarget
}

/** Displays a group of widgets */
declare function Panel(props: UIInputInterfacePanel): UIOutputInterfacePanel

            
/** The properties and events that can be set or bound on the "Piechart" widget. */
declare interface UIInputInterfacePiechart<A> extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Use a Single Data Source for All Series */
    "SingleDataSource"?: BOOLEAN;


    /** Data source */ 
    "Data"?: BindingTarget<INFOTABLE<A>>;


    /** The InfoTable column specifying the label data */
    "LabelField"?: FIELDNAME<A>;


    /** The InfoTable column specifying the value data */
    "ValueField"?: FIELDNAME<A>;


    /** Specifies the colors of the pie chart using a State Formatter */
    "ColorFormat"?: STATEFORMATTING;


    /** Chart orientation */
    "ChartOrientation"?: STRING;


    /** Chart overall style */
    "ChartStyle"?: STYLEDEFINITION;


    /** Chart area style */
    "ChartAreaStyle"?: STYLEDEFINITION;


    /** Chart legend style */
    "ChartLegendStyle"?: STYLEDEFINITION;


    /** Chart title style */
    "ChartTitleStyle"?: STYLEDEFINITION;


    /** Selected item style */
    "SelectedItemStyle"?: STYLEDEFINITION;


    /** When checked, the selected pie will use the item style combined with the selected item style.  So if you clear the background and secondary background colors and set the line color, the selected pie will be highlighted with that line color */
    "CombineSelectedItemStyle"?: BOOLEAN;


    /** Chart Title */
    "ChartTitle"?: STRING | BindingTarget<STRING>;


    /** Show or hide the legend */
    "ShowLegend"?: BOOLEAN;


    /** Fixed legend width (if non-zero it will be used) */
    "LegendWidth"?: NUMBER;


    /** Desired legend location (none = hide legend) */
    "LegendLocation"?: STRING<"right" | "top" | "bottom" | "left">;


    /** Desired legend orientation */
    "LegendOrientation"?: STRING<"vertical" | "horizontal">;


    /** Format for labels */
    "LabelFormat"?: STRING;


    /** Type for labels */
    "LabelType"?: STRING<"STRING" | "NUMERIC" | "DATETIME">;


    /** Format for values */
    "ValueFormat"?: STRING;


    /** Allow item selection */
    "AllowSelection"?: BOOLEAN;


    /** Enable display of values on hover */
    "EnableHover"?: BOOLEAN;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /**  */
    "ToolTipField"?: undefined;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


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


    /** Triggers an event when the user double clicks the widget */
    "DoubleClicked"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePiechart<A>
}

/** The binding source properties and services that can be bound on the "Piechart" widget. */
declare class UIOutputInterfacePiechart<A> {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Displays a pie chart */
declare function Piechart<A>(props: UIInputInterfacePiechart<A>): UIOutputInterfacePiechart<A>

            
/** The properties and events that can be set or bound on the "Propertydisplay" widget. */
declare interface UIInputInterfacePropertydisplay extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Select any infotable as the data source for this property */
    "Data"?: BindingTarget<INFOTABLE>;


    /**  */
    "InfotableInfo"?: STRING;


    /** Show all columns for the data received at runtime.  Only use this if you cannot know the datashape at builder time */
    "ShowAllColumns"?: BOOLEAN;


    /** Allow editing of values */
    "AllowEditing"?: BOOLEAN;


    /** If there is no row bound in, should the editors be showing? */
    "ShowEditorsIfNoRowData"?: BOOLEAN;


    /** Select the same infotable as the data source for this property, otherwise use AllData */
    "DataForDatashapeIfNoRows"?: BindingTarget<INFOTABLE>;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** The style of the Property Display widget */
    "Style"?: STYLEDEFINITION;


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


    /** A bindable event triggered when the data for this widget is modified */
    "Changed"?: ServiceBindingTarget[];


    ref?: UIOutputInterfacePropertydisplay
}

/** The binding source properties and services that can be bound on the "Propertydisplay" widget. */
declare class UIOutputInterfacePropertydisplay {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Select any infotable as the data source for this property */
    Data: BindingTarget<INFOTABLE>
}

/** Displays a two-column grid of field name and value pairs */
declare function Propertydisplay(props: UIInputInterfacePropertydisplay): UIOutputInterfacePropertydisplay

            
/** The properties and events that can be set or bound on the "Preferences" widget. */
declare interface UIInputInterfacePreferences extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Show the option clear most recently used. */
    "ShowClearRecent"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Help text for clear most recently used. */
    "TooltipClearRecent"?: STRING;


    /** Show the option to edit language preferences. */
    "ShowLanguages"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Help text for edit language preferences. */
    "TooltipLanguages"?: STRING;


    /** Include current user name in header. */
    "ShowUserName"?: BOOLEAN;


    /** Include current user avatar in header. */
    "ShowUserAvatar"?: BOOLEAN;


    /** Header text for the preferences widget. */
    "Label"?: STRING | BindingTarget<STRING>;


    /** Width of preferences widget (px). */
    "Width"?: NUMBER;


    /** Height of preferences widget (px). */
    "Height"?: NUMBER;


    /** The style for the preference widget */
    "Style"?: STYLEDEFINITION;


    /** Tab sequence index. */
    "TabSequence"?: NUMBER;


    /** Normal style for buttons. */
    "ButtonStyle"?: STYLEDEFINITION;


    /** Active style for buttons. */
    "ButtonActiveStyle"?: STYLEDEFINITION;


    /** Focus style for buttons. */
    "ButtonFocusStyle"?: STYLEDEFINITION;


    /** Hover style for buttons */
    "ButtonHoverStyle"?: STYLEDEFINITION;


    /** Disabled style for buttons. */
    "ButtonDisabledStyle"?: STYLEDEFINITION;


    /** Corner radius (px) of buttons. */
    "ButtonCornerRadius"?: NUMBER;


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


    ref?: UIOutputInterfacePreferences
}

/** The binding source properties and services that can be bound on the "Preferences" widget. */
declare class UIOutputInterfacePreferences {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Form for editing user preferences */
declare function Preferences(props: UIInputInterfacePreferences): UIOutputInterfacePreferences

            
/** The properties and events that can be set or bound on the "Proportionalchart" widget. */
declare interface UIInputInterfaceProportionalchart<A> extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Use a Single Data Source for All Series */
    "SingleDataSource"?: BOOLEAN;


    /** Desired number of series in this chart */
    "NumberOfSeries"?: NUMBER;


    /** Data source */ 
    "Data"?: BindingTarget<INFOTABLE<A>>;


    /** Type of chart */
    "ChartType"?: STRING;


    /** Chart orientation */
    "ChartOrientation"?: STRING<"vertical" | "horizontal">;


    /** Chart overall style */
    "ChartStyle"?: STYLEDEFINITION;


    /** Chart area style */
    "ChartAreaStyle"?: STYLEDEFINITION;


    /** Chart legend style */
    "ChartLegendStyle"?: STYLEDEFINITION;


    /** Chart title style */
    "ChartTitleStyle"?: STYLEDEFINITION;


    /** Selected item style */
    "SelectedItemStyle"?: STYLEDEFINITION;


    /** Chart Title */
    "ChartTitle"?: STRING | BindingTarget<STRING>;


    /** Show or hide the legend */
    "ShowLegend"?: BOOLEAN;


    /** Fixed legend width (if non-zero it will be used) */
    "LegendWidth"?: NUMBER;


    /** Desired legend location (none = hide legend) */
    "LegendLocation"?: STRING<"right" | "top" | "bottom" | "left">;


    /** Desired legend orientation */
    "LegendOrientation"?: STRING<"vertical" | "horizontal">;


    /** Field that will provide X axis values */
    "XAxisField"?: FIELDNAME<A>;


    /** Show or hide X axis */
    "ShowXAxis"?: BOOLEAN;


    /** Chart X axis style */
    "XAxisStyle"?: STYLEDEFINITION;


    /** Format for X axis values */
    "XAxisFormat"?: STRING;


    /** Type for X axis values */
    "XAxisLabelType"?: STRING<"STRING" | "NUMERIC" | "DATETIME">;


    /** Label rotation (degrees) for X axis values */
    "XAxisLabelRotation"?: NUMBER;


    /** Max characters to display before truncating with ellipses and showing full label text in tooltip. Default 0 disables feature, negative values trim characters from start. */
    "TruncateX-AxisLabels"?: NUMBER;


    /** Show X axis labels */
    "ShowXAxisLabels"?: BOOLEAN;


    /** Show X axis ticks */
    "ShowXAxisTicks"?: BOOLEAN;


    /** Show or hide Y axis */
    "ShowYAxis"?: BOOLEAN;


    /** Max characters to display before truncating with ellipses and showing full label text in tooltip. Default 0 disables feature, negative values trim characters from start. */
    "TruncateY-AxisLabels"?: NUMBER;


    /** Show Y axis labels */
    "ShowYAxisLabels"?: BOOLEAN;


    /** Show Y axis ticks */
    "ShowYAxisTicks"?: BOOLEAN;


    /** Chart Y axis style */
    "YAxisStyle"?: STYLEDEFINITION;


    /** Format for Y axis values */
    "YAxisFormat"?: STRING;


    /** Minimum range for the Y axis */
    "YAxisMinimum"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the Y axis */
    "YAxisMaximum"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the Y axis */
    "YAxisAutoscale"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "YAxisZeroscale"?: BOOLEAN;


    /** Number of Y axis chart intervals (affects ticks, grid) */
    "YAxisIntervals"?: NUMBER;


    /** Number of Y axis minor ticks */
    "YAxisMinorTicks"?: NUMBER;


    /** Number of Y axis labels */
    "YAxisLabels"?: NUMBER;


    /** Allow zooming the Y axis */
    "AllowYAxisZoom"?: BOOLEAN;


    /** Allow item selection */
    "AllowSelection"?: BOOLEAN;


    /** Enable display of values on hover */
    "EnableHover"?: BOOLEAN;


    /** Show horizontal grid */
    "ShowXAxisGrid"?: BOOLEAN;


    /** Show vertical grid */
    "ShowYAxisGrid"?: BOOLEAN;


    /** Chart grid style */
    "GridStyle"?: STYLEDEFINITION;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /**  */
    "ToolTipField"?: undefined;


    /** Series data source 1 */
    "DataSource1"?: BindingTarget<INFOTABLE>;


    /** Series data field 1 */
    "DataField1"?: FIELDNAME<A>;


    /** Series data label 1 */
    "DataLabel1"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 1 */
    "XAxisField1"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType1"?: STRING;


    /** Series style 1 */
    "SeriesStyle1"?: STYLEDEFINITION;


    /** Series data style 1 */
    "SeriesDataStyle1"?: STATEFORMATTING;


    /** Series data source 2 */
    "DataSource2"?: BindingTarget<INFOTABLE>;


    /** Series data field 2 */
    "DataField2"?: FIELDNAME<A>;


    /** Series data label 2 */
    "DataLabel2"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 2 */
    "XAxisField2"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType2"?: STRING;


    /** Series style 2 */
    "SeriesStyle2"?: STYLEDEFINITION;


    /** Series data style 2 */
    "SeriesDataStyle2"?: STATEFORMATTING;


    /** Series data source 3 */
    "DataSource3"?: BindingTarget<INFOTABLE>;


    /** Series data field 3 */
    "DataField3"?: FIELDNAME<A>;


    /** Series data label 3 */
    "DataLabel3"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 3 */
    "XAxisField3"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType3"?: STRING;


    /** Series style 3 */
    "SeriesStyle3"?: STYLEDEFINITION;


    /** Series data style 3 */
    "SeriesDataStyle3"?: STATEFORMATTING;


    /** Series data source 4 */
    "DataSource4"?: BindingTarget<INFOTABLE>;


    /** Series data field 4 */
    "DataField4"?: FIELDNAME<A>;


    /** Series data label 4 */
    "DataLabel4"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 4 */
    "XAxisField4"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType4"?: STRING;


    /** Series style 4 */
    "SeriesStyle4"?: STYLEDEFINITION;


    /** Series data style 4 */
    "SeriesDataStyle4"?: STATEFORMATTING;


    /** Series data source 5 */
    "DataSource5"?: BindingTarget<INFOTABLE>;


    /** Series data field 5 */
    "DataField5"?: FIELDNAME<A>;


    /** Series data label 5 */
    "DataLabel5"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 5 */
    "XAxisField5"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType5"?: STRING;


    /** Series style 5 */
    "SeriesStyle5"?: STYLEDEFINITION;


    /** Series data style 5 */
    "SeriesDataStyle5"?: STATEFORMATTING;


    /** Series data source 6 */
    "DataSource6"?: BindingTarget<INFOTABLE>;


    /** Series data field 6 */
    "DataField6"?: FIELDNAME<A>;


    /** Series data label 6 */
    "DataLabel6"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 6 */
    "XAxisField6"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType6"?: STRING;


    /** Series style 6 */
    "SeriesStyle6"?: STYLEDEFINITION;


    /** Series data style 6 */
    "SeriesDataStyle6"?: STATEFORMATTING;


    /** Series data source 7 */
    "DataSource7"?: BindingTarget<INFOTABLE>;


    /** Series data field 7 */
    "DataField7"?: FIELDNAME<A>;


    /** Series data label 7 */
    "DataLabel7"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 7 */
    "XAxisField7"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType7"?: STRING;


    /** Series style 7 */
    "SeriesStyle7"?: STYLEDEFINITION;


    /** Series data style 7 */
    "SeriesDataStyle7"?: STATEFORMATTING;


    /** Series data source 8 */
    "DataSource8"?: BindingTarget<INFOTABLE>;


    /** Series data field 8 */
    "DataField8"?: FIELDNAME<A>;


    /** Series data label 8 */
    "DataLabel8"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 8 */
    "XAxisField8"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType8"?: STRING;


    /** Series style 8 */
    "SeriesStyle8"?: STYLEDEFINITION;


    /** Series data style 8 */
    "SeriesDataStyle8"?: STATEFORMATTING;


    /** Series data source 9 */
    "DataSource9"?: BindingTarget<INFOTABLE>;


    /** Series data field 9 */
    "DataField9"?: FIELDNAME<A>;


    /** Series data label 9 */
    "DataLabel9"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 9 */
    "XAxisField9"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType9"?: STRING;


    /** Series style 9 */
    "SeriesStyle9"?: STYLEDEFINITION;


    /** Series data style 9 */
    "SeriesDataStyle9"?: STATEFORMATTING;


    /** Series data source 10 */
    "DataSource10"?: BindingTarget<INFOTABLE>;


    /** Series data field 10 */
    "DataField10"?: FIELDNAME<A>;


    /** Series data label 10 */
    "DataLabel10"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 10 */
    "XAxisField10"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType10"?: STRING;


    /** Series style 10 */
    "SeriesStyle10"?: STYLEDEFINITION;


    /** Series data style 10 */
    "SeriesDataStyle10"?: STATEFORMATTING;


    /** Series data source 11 */
    "DataSource11"?: BindingTarget<INFOTABLE>;


    /** Series data field 11 */
    "DataField11"?: FIELDNAME<A>;


    /** Series data label 11 */
    "DataLabel11"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 11 */
    "XAxisField11"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType11"?: STRING;


    /** Series style 11 */
    "SeriesStyle11"?: STYLEDEFINITION;


    /** Series data style 11 */
    "SeriesDataStyle11"?: STATEFORMATTING;


    /** Series data source 12 */
    "DataSource12"?: BindingTarget<INFOTABLE>;


    /** Series data field 12 */
    "DataField12"?: FIELDNAME<A>;


    /** Series data label 12 */
    "DataLabel12"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 12 */
    "XAxisField12"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType12"?: STRING;


    /** Series style 12 */
    "SeriesStyle12"?: STYLEDEFINITION;


    /** Series data style 12 */
    "SeriesDataStyle12"?: STATEFORMATTING;


    /** Series data source 13 */
    "DataSource13"?: BindingTarget<INFOTABLE>;


    /** Series data field 13 */
    "DataField13"?: FIELDNAME<A>;


    /** Series data label 13 */
    "DataLabel13"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 13 */
    "XAxisField13"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType13"?: STRING;


    /** Series style 13 */
    "SeriesStyle13"?: STYLEDEFINITION;


    /** Series data style 13 */
    "SeriesDataStyle13"?: STATEFORMATTING;


    /** Series data source 14 */
    "DataSource14"?: BindingTarget<INFOTABLE>;


    /** Series data field 14 */
    "DataField14"?: FIELDNAME<A>;


    /** Series data label 14 */
    "DataLabel14"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 14 */
    "XAxisField14"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType14"?: STRING;


    /** Series style 14 */
    "SeriesStyle14"?: STYLEDEFINITION;


    /** Series data style 14 */
    "SeriesDataStyle14"?: STATEFORMATTING;


    /** Series data source 15 */
    "DataSource15"?: BindingTarget<INFOTABLE>;


    /** Series data field 15 */
    "DataField15"?: FIELDNAME<A>;


    /** Series data label 15 */
    "DataLabel15"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 15 */
    "XAxisField15"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType15"?: STRING;


    /** Series style 15 */
    "SeriesStyle15"?: STYLEDEFINITION;


    /** Series data style 15 */
    "SeriesDataStyle15"?: STATEFORMATTING;


    /** Series data source 16 */
    "DataSource16"?: BindingTarget<INFOTABLE>;


    /** Series data field 16 */
    "DataField16"?: FIELDNAME<A>;


    /** Series data label 16 */
    "DataLabel16"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 16 */
    "XAxisField16"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType16"?: STRING;


    /** Series style 16 */
    "SeriesStyle16"?: STYLEDEFINITION;


    /** Series data style 16 */
    "SeriesDataStyle16"?: STATEFORMATTING;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


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


    /** Triggers an event when the user double clicks the widget */
    "DoubleClicked"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceProportionalchart<A>
}

/** The binding source properties and services that can be bound on the "Proportionalchart" widget. */
declare class UIOutputInterfaceProportionalchart<A> {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Displays a proportional chart */
declare function Proportionalchart<A>(props: UIInputInterfaceProportionalchart<A>): UIOutputInterfaceProportionalchart<A>

            
/** The properties and events that can be set or bound on the "Radiobuttonlist" widget. */
declare interface UIInputInterfaceRadiobuttonlist extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Select how the buttons should be aligned */
    "Orientation"?: STRING<"horz" | "vert">;


    /** Get or Set value which drives the State */
    "SelectedValue"?: BindingTarget<STRING>;


    /** If set to true, only displays the current state */
    "ReadOnly"?: BOOLEAN;


    /** Total width of the widget */
    "Width"?: NUMBER;


    /** Total height of the widget */
    "Height"?: NUMBER;


    /** Choose a state definition and the button bar will auto-populate the buttons with the state names and values. */
    "ButtonStates"?: STATEDEFINITION;


    /** Select how to handle excess text overflow */
    "ButtonTextOverflow"?: STRING<"wrap" | "clip">;


    /** The style of the Button Bar */
    "RadioButtonStyle"?: STYLEDEFINITION;


    /** The style when the Button Bar is clicked */
    "RadioButtonDepressedStyle"?: STYLEDEFINITION;


    /**  */
    "ToolTipField"?: STRING;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


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


    /** Triggers an event when the selection in this widget is changed */
    "SelectionChanged"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceRadiobuttonlist
}

/** The binding source properties and services that can be bound on the "Radiobuttonlist" widget. */
declare class UIOutputInterfaceRadiobuttonlist {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Get or Set value which drives the State */
    SelectedValue: BindingTarget<STRING>;


    /** Get or Set the name of the selected State */
    SelectedText: BindingTarget<STRING>
}

/** Enables the user to select an option from a group of choices */
declare function Radiobuttonlist(props: UIInputInterfaceRadiobuttonlist): UIOutputInterfaceRadiobuttonlist

            
/** The properties and events that can be set or bound on the "Rangechart" widget. */
declare interface UIInputInterfaceRangechart<A> extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Use a Single Data Source for All Series */
    "SingleDataSource"?: BOOLEAN;


    /** Data source */ 
    "Data"?: BindingTarget<INFOTABLE<A>>;


    /** Type of chart */
    "ChartType"?: STRING;


    /** Chart orientation */
    "ChartOrientation"?: STRING;


    /** Chart overall style */
    "ChartStyle"?: STYLEDEFINITION;


    /** Chart area style */
    "ChartAreaStyle"?: STYLEDEFINITION;


    /** Chart legend style */
    "ChartLegendStyle"?: STYLEDEFINITION;


    /** Chart title style */
    "ChartTitleStyle"?: STYLEDEFINITION;


    /** Selected item style */
    "SelectedItemStyle"?: STYLEDEFINITION;


    /** Low value field name */
    "LowValueField"?: FIELDNAME<A>;


    /** Lower range value field name */
    "LowerRangeValueField"?: FIELDNAME<A>;


    /** Middle value field name */
    "MidpointField"?: FIELDNAME<A>;


    /** Upper range value field name */
    "UpperRangeValueField"?: FIELDNAME<A>;


    /** High value field name */
    "HighValueField"?: FIELDNAME<A>;


    /** Box (upper/lower range) style */
    "BoxStyle"?: STYLEDEFINITION;


    /** Box (upper/lower range) dynamic styling */
    "BoxFormatting"?: STATEFORMATTING;


    /** Whisker (high/low line) style */
    "WhiskerStyle"?: STYLEDEFINITION;


    /** Whisker (high/low line) dynamic styling */
    "WhiskerFormatting"?: STATEFORMATTING;


    /** Midpoint marker style */
    "MidpointStyle"?: STYLEDEFINITION;


    /** Midpoint marker dynamic styling */
    "MidpointFormatting"?: STATEFORMATTING;


    /** Chart Title */
    "ChartTitle"?: STRING | BindingTarget<STRING>;


    /** Show or hide the legend */
    "ShowLegend"?: BOOLEAN;


    /** Fixed legend width (if non-zero it will be used) */
    "LegendWidth"?: NUMBER;


    /** Desired legend location (none = hide legend) */
    "LegendLocation"?: STRING<"right" | "top" | "bottom" | "left">;


    /** Desired legend orientation */
    "LegendOrientation"?: STRING<"vertical" | "horizontal">;


    /** Desired midpoint marker size */
    "MarkerSize"?: NUMBER;


    /** Desired midpoint marker type */
    "MarkerType"?: STRING<"circle" | "square" | "triangle" | "diamond" | "image">;


    /** Field that will provide X axis values */
    "XAxisField"?: FIELDNAME<A>;


    /** Show or hide X axis */
    "ShowXAxis"?: BOOLEAN;


    /** Chart X axis style */
    "XAxisStyle"?: STYLEDEFINITION;


    /** Format for X axis values */
    "XAxisFormat"?: STRING;


    /** Type for X axis values */
    "XAxisLabelType"?: STRING<"STRING" | "NUMERIC" | "DATETIME">;


    /** Label rotation (degrees) for X axis values */
    "XAxisLabelRotation"?: NUMBER;


    /** Max characters to display before truncating with ellipses and showing full label text in tooltip. Default 0 disables feature, negative values trim characters from start. */
    "TruncateX-AxisLabels"?: NUMBER;


    /** Show X axis labels */
    "ShowXAxisLabels"?: BOOLEAN;


    /** Show X axis ticks */
    "ShowXAxisTicks"?: BOOLEAN;


    /** Show or hide Y axis */
    "ShowYAxis"?: BOOLEAN;


    /** Chart Y axis style */
    "YAxisStyle"?: STYLEDEFINITION;


    /** Format for Y axis values */
    "YAxisFormat"?: STRING;


    /** Minimum range for the Y axis */
    "YAxisMinimum"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the Y axis */
    "YAxisMaximum"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the Y axis */
    "YAxisAutoscale"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "YAxisZeroscale"?: BOOLEAN;


    /** Number of Y axis chart intervals (affects ticks, grid) */
    "YAxisIntervals"?: NUMBER;


    /** Number of Y axis minor ticks */
    "YAxisMinorTicks"?: NUMBER;


    /** Number of Y axis labels */
    "YAxisLabels"?: NUMBER;


    /** Max characters to display before truncating with ellipses and showing full label text in tooltip. Default 0 disables feature, negative values trim characters from start. */
    "TruncateY-AxisLabels"?: NUMBER;


    /** Show Y axis labels */
    "ShowYAxisLabels"?: BOOLEAN;


    /** Show Y axis ticks */
    "ShowYAxisTicks"?: BOOLEAN;


    /** Allow zooming the Y axis */
    "AllowYAxisZoom"?: BOOLEAN;


    /** Allow item selection */
    "AllowSelection"?: BOOLEAN;


    /** Enable display of values on hover */
    "EnableHover"?: BOOLEAN;


    /** Show horizontal grid */
    "ShowXAxisGrid"?: BOOLEAN;


    /** Show vertical grid */
    "ShowYAxisGrid"?: BOOLEAN;


    /** Chart grid style */
    "GridStyle"?: STYLEDEFINITION;


    /** The width of the chart */
    "Width"?: NUMBER;


    /** The height of the chart */
    "Height"?: NUMBER;


    /**  */
    "ToolTipField"?: undefined;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


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


    /** Triggers an event when the user double clicks the widget */
    "DoubleClicked"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceRangechart<A>
}

/** The binding source properties and services that can be bound on the "Rangechart" widget. */
declare class UIOutputInterfaceRangechart<A> {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Displays an range chart */
declare function Rangechart<A>(props: UIInputInterfaceRangechart<A>): UIOutputInterfaceRangechart<A>

            
/** The properties and events that can be set or bound on the "Remoteaccess" widget. */
declare interface UIInputInterfaceRemoteaccess extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The name of the Thing whose tunnel you wish to access.  This thing must implement the Tunneling shape */
    "RemoteThingName"?: THINGNAME | BindingTarget<THINGNAME>;


    /** The name of the tunnel with which you are using remote access. Can be bound to a Remote Thing"s getTunnelNames service. */
    "TunnelName"?: STRING | BindingTarget<STRING>;


    /** Listening Port */
    "ListenPort"?: INTEGER | BindingTarget<INTEGER>;


    /** Allow tunnel to connect to Platform using self signed certificate for SSL. */
    "AcceptSelfSignedCert"?: BOOLEAN;


    /** Set the log level for the client side micro server execution. */
    "LogLevel"?: STRING<"DEBUG" | "TRACE" | "INFO" | "WARN" | "ERROR">;


    /** Timeout in seconds */
    "Timeout"?: NUMBER;


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


    /** The z-index of the widget which allows you to put the widget on top or on the bottom of the view stack */
    "Z-index"?: NUMBER;


    /**  */
    "Margin"?: STYLECSSRECTSIZE;


    ref?: UIOutputInterfaceRemoteaccess
}

/** The binding source properties and services that can be bound on the "Remoteaccess" widget. */
declare class UIOutputInterfaceRemoteaccess {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Enables connection to a remote thing */
declare function Remoteaccess(props: UIInputInterfaceRemoteaccess): UIOutputInterfaceRemoteaccess

            
/** The properties and events that can be set or bound on the "Repeater" widget. */
declare interface UIInputInterfaceRepeater extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Displays rows of data using a specified mashup. */
    "Data"?: BindingTarget<INFOTABLE>;


    /** The layout for the content of the repeater */
    "View"?: STRING<"vertical" | "horizontal-wrap" | "horizontal">;


    /** Only use if the repeater is responsive and the repeated mashup is responsive.  Setting this to a value other than 0 will limit the width */
    "FixedMashupWidth"?: NUMBER;


    /** Only use if the repeater is responsive and the repeated mashup is responsive.  Setting this to a value other than 0 will limit the height */
    "FixedMashupHeight"?: NUMBER;


    /** Hide scrollbars. Repeater contents larger than the assigned space will be clipped. */
    "HideInnerScrollbars"?: BOOLEAN;


    /** Allow row selection */
    "AllowSelection"?: BOOLEAN;


    /** Height of the selected row */
    "SelectionHeight"?: NUMBER;


    /** Width of the selected row */
    "SelectionWidth"?: NUMBER;


    /** Automatically select the first row in the list */
    "AutoSelectFirstRow"?: BOOLEAN;


    /** Specify the mashup used to render each row */
    "Mashup"?: MASHUPNAME | BindingTarget<MASHUPNAME>;


    /** Parameters for the selected mashups */
    "MashupParameters"?: VALUES;


    /** Width of the repeated mashup */
    "MashupWidth"?: NUMBER;


    /** Height of the repeated mashup */
    "MashupHeight"?: NUMBER;


    /** The style to use for the repeater */
    "RepeaterStyle"?: STYLEDEFINITION;


    /** The style for the repeater cell */
    "RepeaterCellStyle"?: STYLEDEFINITION;


    /** Styling for when selection is allowed and the selection box is in its unselected state */
    "RepeaterUnselectedStyle"?: STYLEDEFINITION;


    /** Styling for when selection is allowed and the selection box is in its selected state */
    "RepeaterSelectedStyle"?: STYLEDEFINITION;


    /** Load / Unload: loads and unloads items on demand. Load all: loads all items on data refresh, should be used only for relatively small data sets. Load / No unload: loads items on demand but never unloads until data refresh */
    "ItemLoadBehavior"?: STRING<"load-destroy-on-demand" | "load-all" | "load-on-demand">;


    /** Reuse loaded mashups for improved performance */
    "ReuseMashups"?: BOOLEAN;


    /** Is the repeated mashup displayed in a responsive layout? */
    "ResponsiveLayout"?: BOOLEAN;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


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


    /** Triggers an event when the user double clicks the widget */
    "DoubleClicked"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceRepeater
}

/** The binding source properties and services that can be bound on the "Repeater" widget. */
declare class UIOutputInterfaceRepeater {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Displays rows of data using a specified mashup. */
declare function Repeater(props: UIInputInterfaceRepeater): UIOutputInterfaceRepeater

            
/** The properties and events that can be set or bound on the "Shape" widget. */
declare interface UIInputInterfaceShape extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Data */
    "Data"?: ANYSCALAR | BindingTarget<ANYSCALAR>;


    /** Type of shape */
    "ShapeType"?: STRING<"rectangle" | "roundrect" | "circle" | "ellipse">;


    /** width of widget */
    "Width"?: NUMBER;


    /** height of widget */
    "Height"?: NUMBER;


    /** Corner radius for rounded rectangle shapes */
    "RectangleCornerRadius"?: NUMBER;


    /** Style for the shape */
    "ShapeStyle"?: STYLEDEFINITION;


    /** Styling rules for shape */
    "ShapeFormatter"?: STATEFORMATTING;


    /** Type of gradient fill (radial only supported for circle/ellipse) */
    "GradientType"?: STRING<"linear" | "radial">;


    /** Orientation of linear gradient fill */
    "GradientOrientation"?: STRING<"vertical" | "horizontal">;


    /** Allow shape to be dynamically filled by the bound data */
    "EnableDynamicFill"?: BOOLEAN;


    /** Dynamic range minimum value */
    "DynamicRangeMinimum"?: NUMBER | BindingTarget<NUMBER>;


    /** Dynamic range maximum value */
    "DynamicRangeMaximum"?: NUMBER | BindingTarget<NUMBER>;


    /** Orientation of dynamic fill */
    "DynamicFillOrientation"?: STRING<"vertical" | "horizontal">;


    /** Style for the unfilled background if dynamic fill is enabled */
    "UnfilledBackgroundStyle"?: STYLEDEFINITION;


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


    /** Triggers an event when the widget is clicked */
    "Clicked"?: ServiceBindingTarget[];


    /** Triggers an event when the user double clicks the widget */
    "DoubleClicked"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceShape
}

/** The binding source properties and services that can be bound on the "Shape" widget. */
declare class UIOutputInterfaceShape {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Displays a shape */
declare function Shape(props: UIInputInterfaceShape): UIOutputInterfaceShape

            
/** The properties and events that can be set or bound on the "Slider" widget. */
declare interface UIInputInterfaceSlider extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** width of widget */
    "Width"?: NUMBER;


    /** height of widget */
    "Height"?: NUMBER;


    /** Value of the slider */
    "Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Minimum acceptable value for the slider. */
    "Minimum"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum acceptable value for the slider. */
    "Maximum"?: NUMBER | BindingTarget<NUMBER>;


    /** Value for each step of the slider */
    "Step"?: NUMBER | BindingTarget<NUMBER>;


    /** Orientation of the slider (true is vertical). */
    "Vertical"?: BOOLEAN;


    /** Slider handle style */
    "SliderHandle"?: STRING<"Square" | "Circle">;


    /** Slider bar style */
    "SliderBar"?: STRING<"Thick" | "Thin">;


    /** Skin for the slider */
    "Skin"?: STRING<"Arrow" | "ArrowGreen" | "Ball" | "Bar" | "Default" | "dhx_SkyBlue" | "SimpleGray" | "SimpleSilver" | "Zipper">;


    /** When enabled, the slider will move in steps relative to the minimum value.Otherwise the slider will move in steps relative to the current value. */
    "ZeroScale"?: BOOLEAN;


    /** When enabled causes slider to move in the amount of Step when the slider bar is clicked. */
    "SteppingMode"?: BOOLEAN;


    /** When enabled causes slider to generate events as it changes value. Use with caution! */
    "TrackingMode"?: BOOLEAN;


    /** When enabled will display the minimum and maximum values with the slider. */
    "DisplayMinMaxLabels"?: BOOLEAN;


    /** When enabled will display the value of the slider. */
    "DisplayValueLabel"?: BOOLEAN;


    /** Use this property to disable the widget in the mashup */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The style of the slider */
    "SliderBGStyle"?: STYLEDEFINITION;


    /** The slider handle style */
    "SliderHandleStyle"?: STYLEDEFINITION;


    /** The slider tracker style */
    "SliderTrackerStyle"?: STYLEDEFINITION;


    /** The slider tracker progress style */
    "SliderTrackerProgressStyle"?: STYLEDEFINITION;


    /** The slider maximum style */
    "SliderMaxStyle"?: STYLEDEFINITION;


    /** The slider value style */
    "SliderValueStyle"?: STYLEDEFINITION;


    /** The slider minimum style */
    "SliderMinStyle"?: STYLEDEFINITION;


    /** The style of the slider when it is disabled */
    "SliderBGDisabledStyle"?: STYLEDEFINITION;


    /** The slider handle style when it is disabled */
    "SliderHandleDisabledStyle"?: STYLEDEFINITION;


    /** The slider tracker style when it is disabled */
    "SliderTrackerDisabledStyle"?: STYLEDEFINITION;


    /** The slider tracker progress style when it is disabled */
    "SliderTrackerProgressDisabledStyle"?: STYLEDEFINITION;


    /** The slider maximum style when it is disabled */
    "SliderMaxDisabledStyle"?: STYLEDEFINITION;


    /** The slider value style when it is disabled */
    "SliderValueDisabledStyle"?: STYLEDEFINITION;


    /** The slider minimum style when it is disabled */
    "SliderMinDisabledStyle"?: STYLEDEFINITION;


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


    /** Triggers an event when the value for this widget is changed */
    "ValueChanged"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceSlider
}

/** The binding source properties and services that can be bound on the "Slider" widget. */
declare class UIOutputInterfaceSlider {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Value of the slider */
    Value: BindingTarget<NUMBER>;


    /** Minimum acceptable value for the slider. */
    Minimum: BindingTarget<NUMBER>;


    /** Maximum acceptable value for the slider. */
    Maximum: BindingTarget<NUMBER>;


    /** Value for each step of the slider */
    Step: BindingTarget<NUMBER>;


    /** A bindable service that increments the slider value */
    Increment: ServiceBindingTarget;


    /** A bindable service that decrements the slider value */
    Decrement: ServiceBindingTarget
}

/** Horizontal value slider. */
declare function Slider(props: UIInputInterfaceSlider): UIOutputInterfaceSlider

            
/** The properties and events that can be set or bound on the "Statusmessage" widget. */
declare interface UIInputInterfaceStatusmessage extends UIBaseInputInterface {
    
    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** The message you wish to display. */
    "Message"?: STRING | BindingTarget<STRING>;


    /** Set the message styling. */
    "MessageType"?: STRING<"info" | "warning" | "error">;


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


    ref?: UIOutputInterfaceStatusmessage
}

/** The binding source properties and services that can be bound on the "Statusmessage" widget. */
declare class UIOutputInterfaceStatusmessage {
    
    /** A bindable service to show the status message defined for this widget */
    ShowMessage: ServiceBindingTarget
}

/** Displays a message */
declare function Statusmessage(props: UIInputInterfaceStatusmessage): UIOutputInterfaceStatusmessage

            
/** The properties and events that can be set or bound on the "Tabs" widget. */
declare interface UIInputInterfaceTabs extends UIBaseInputInterface {
    
    /** Enables you to define the CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Enables you to set the total number of tabs */
    "NumberOfTabs"?: NUMBER;


    /** tw.tabs-ide.properties.default-tab-at-runtime.description */
    "DefaultTabAtRuntime"?: NUMBER;


    /**  */
    "CurrentTab"?: NUMBER;


    /**  */
    "TabWidgetMap"?: STRING;


    /** Defines the width of the tab widget in the mashup */
    "Width"?: NUMBER;


    /** Defines the height of the tab widget in the mashup */
    "Height"?: NUMBER;


    /** The value of the selected tab */
    "SelectedTabValue"?: STRING | BindingTarget<STRING>;


    /** The name of the selected tab */
    "SelectedTabName"?: STRING | BindingTarget<STRING>;


    /** height of area for tabs */
    "TabHeight"?: NUMBER;


    /** The maximum tab width before ... truncation (tooltip shows full text) */
    "MaxTabWidth"?: NUMBER;


    /** Amount of space between tabs */
    "TabSpacing"?: NUMBER;


    /** Do you want the corners on the tabs rounded */
    "RoundedCorners"?: BOOLEAN;


    /** The style of the selected tab */
    "TabSelectedStyle"?: STYLEDEFINITION;


    /** The style of the unselected tab */
    "TabUnselectedStyle"?: STYLEDEFINITION;


    /** The style of the content for a selected tab */
    "TabContentStyle"?: STYLEDEFINITION;


    /** The style of the disabled tab */
    "TabDisabledStyle"?: STYLEDEFINITION;


    /** Tab Name, tab 1 */
    "Tab1Name"?: STRING;


    /** Tab Value, tab 1 */
    "Tab1Value"?: STRING;


    /** Tab Image, tab 1 */
    "Tab1Image"?: IMAGELINK;


    /** Tab Visible, tab 1 */
    "Tab1Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 1 */
    "Tab1Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 2 */
    "Tab2Name"?: STRING;


    /** Tab Value, tab 2 */
    "Tab2Value"?: STRING;


    /** Tab Image, tab 2 */
    "Tab2Image"?: IMAGELINK;


    /** Tab Visible, tab 2 */
    "Tab2Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 2 */
    "Tab2Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 3 */
    "Tab3Name"?: STRING;


    /** Tab Value, tab 3 */
    "Tab3Value"?: STRING;


    /** Tab Image, tab 3 */
    "Tab3Image"?: IMAGELINK;


    /** Tab Visible, tab 3 */
    "Tab3Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 3 */
    "Tab3Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 4 */
    "Tab4Name"?: STRING;


    /** Tab Value, tab 4 */
    "Tab4Value"?: STRING;


    /** Tab Image, tab 4 */
    "Tab4Image"?: IMAGELINK;


    /** Tab Visible, tab 4 */
    "Tab4Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 4 */
    "Tab4Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 5 */
    "Tab5Name"?: STRING;


    /** Tab Value, tab 5 */
    "Tab5Value"?: STRING;


    /** Tab Image, tab 5 */
    "Tab5Image"?: IMAGELINK;


    /** Tab Visible, tab 5 */
    "Tab5Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 5 */
    "Tab5Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 6 */
    "Tab6Name"?: STRING;


    /** Tab Value, tab 6 */
    "Tab6Value"?: STRING;


    /** Tab Image, tab 6 */
    "Tab6Image"?: IMAGELINK;


    /** Tab Visible, tab 6 */
    "Tab6Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 6 */
    "Tab6Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 7 */
    "Tab7Name"?: STRING;


    /** Tab Value, tab 7 */
    "Tab7Value"?: STRING;


    /** Tab Image, tab 7 */
    "Tab7Image"?: IMAGELINK;


    /** Tab Visible, tab 7 */
    "Tab7Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 7 */
    "Tab7Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 8 */
    "Tab8Name"?: STRING;


    /** Tab Value, tab 8 */
    "Tab8Value"?: STRING;


    /** Tab Image, tab 8 */
    "Tab8Image"?: IMAGELINK;


    /** Tab Visible, tab 8 */
    "Tab8Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 8 */
    "Tab8Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 9 */
    "Tab9Name"?: STRING;


    /** Tab Value, tab 9 */
    "Tab9Value"?: STRING;


    /** Tab Image, tab 9 */
    "Tab9Image"?: IMAGELINK;


    /** Tab Visible, tab 9 */
    "Tab9Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 9 */
    "Tab9Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 10 */
    "Tab10Name"?: STRING;


    /** Tab Value, tab 10 */
    "Tab10Value"?: STRING;


    /** Tab Image, tab 10 */
    "Tab10Image"?: IMAGELINK;


    /** Tab Visible, tab 10 */
    "Tab10Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 10 */
    "Tab10Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 11 */
    "Tab11Name"?: STRING;


    /** Tab Value, tab 11 */
    "Tab11Value"?: STRING;


    /** Tab Image, tab 11 */
    "Tab11Image"?: IMAGELINK;


    /** Tab Visible, tab 11 */
    "Tab11Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 11 */
    "Tab11Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 12 */
    "Tab12Name"?: STRING;


    /** Tab Value, tab 12 */
    "Tab12Value"?: STRING;


    /** Tab Image, tab 12 */
    "Tab12Image"?: IMAGELINK;


    /** Tab Visible, tab 12 */
    "Tab12Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 12 */
    "Tab12Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 13 */
    "Tab13Name"?: STRING;


    /** Tab Value, tab 13 */
    "Tab13Value"?: STRING;


    /** Tab Image, tab 13 */
    "Tab13Image"?: IMAGELINK;


    /** Tab Visible, tab 13 */
    "Tab13Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 13 */
    "Tab13Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 14 */
    "Tab14Name"?: STRING;


    /** Tab Value, tab 14 */
    "Tab14Value"?: STRING;


    /** Tab Image, tab 14 */
    "Tab14Image"?: IMAGELINK;


    /** Tab Visible, tab 14 */
    "Tab14Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 14 */
    "Tab14Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 15 */
    "Tab15Name"?: STRING;


    /** Tab Value, tab 15 */
    "Tab15Value"?: STRING;


    /** Tab Image, tab 15 */
    "Tab15Image"?: IMAGELINK;


    /** Tab Visible, tab 15 */
    "Tab15Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 15 */
    "Tab15Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 16 */
    "Tab16Name"?: STRING;


    /** Tab Value, tab 16 */
    "Tab16Value"?: STRING;


    /** Tab Image, tab 16 */
    "Tab16Image"?: IMAGELINK;


    /** Tab Visible, tab 16 */
    "Tab16Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 16 */
    "Tab16Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


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


    /** A bindable event triggered when an enabled tab is selected */
    "TabSelected"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceTabs
}

/** The binding source properties and services that can be bound on the "Tabs" widget. */
declare class UIOutputInterfaceTabs {
    
    /** Enables you to define the CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space */
    CustomClass: BindingTarget<STRING>;


    /** The value of the selected tab */
    SelectedTabValue: BindingTarget<STRING>;


    /** The name of the selected tab */
    SelectedTabName: BindingTarget<STRING>;


    /** A bindable service to reselect the default tab configured for this widget */
    SelectDefaultTab: ServiceBindingTarget;


    /** Resets all the contained widgets to their default values */
    ResetInputsToDefaultValue: ServiceBindingTarget
}

/** Allows users to swap between various tabs easily. */
declare function Tabs(props: UIInputInterfaceTabs): UIOutputInterfaceTabs

            
/** The properties and events that can be set or bound on the "Tabsv2" widget. */
declare interface UIInputInterfaceTabsv2 extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** How many tabs? */
    "NumberOfTabs"?: NUMBER;


    /** Which tab would you like to show at runtime when the mashup is loaded? */
    "DefaultTabAtRuntime"?: NUMBER;


    /**  */
    "CurrentTab"?: NUMBER;


    /** width of widget */
    "Width"?: NUMBER;


    /** height of widget */
    "Height"?: NUMBER;


    /** The value of the selected tab */
    "SelectedTabValue"?: STRING | BindingTarget<STRING>;


    /** The name of the selected tab */
    "SelectedTabName"?: STRING | BindingTarget<STRING>;


    /** height of area for tabs */
    "TabHeight"?: NUMBER;


    /** The maximum tab width before ... truncation (tooltip shows full text) */
    "MaxTabWidth"?: NUMBER;


    /** Amount of space between tabs */
    "TabSpacing"?: NUMBER;


    /** Do you want the corners on the tabs rounded */
    "RoundedCorners"?: BOOLEAN;


    /** The style of the selected tab */
    "TabSelectedStyle"?: STYLEDEFINITION;


    /** The style of the unselected tab */
    "TabUnselectedStyle"?: STYLEDEFINITION;


    /** The style of the content for the selected tab */
    "TabContentStyle"?: STYLEDEFINITION;


    /** The style of the disabled tab */
    "TabDisabledStyle"?: STYLEDEFINITION;


    /** Tab Name, tab 1 */
    "Tab1Name"?: STRING;


    /** Tab Value, tab 1 */
    "Tab1Value"?: STRING;


    /** Tab Image, tab 1 */
    "Tab1Image"?: IMAGELINK;


    /** Tab Visible, tab 1 */
    "Tab1Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 1 */
    "Tab1Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 2 */
    "Tab2Name"?: STRING;


    /** Tab Value, tab 2 */
    "Tab2Value"?: STRING;


    /** Tab Image, tab 2 */
    "Tab2Image"?: IMAGELINK;


    /** Tab Visible, tab 2 */
    "Tab2Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 2 */
    "Tab2Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 3 */
    "Tab3Name"?: STRING;


    /** Tab Value, tab 3 */
    "Tab3Value"?: STRING;


    /** Tab Image, tab 3 */
    "Tab3Image"?: IMAGELINK;


    /** Tab Visible, tab 3 */
    "Tab3Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 3 */
    "Tab3Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 4 */
    "Tab4Name"?: STRING;


    /** Tab Value, tab 4 */
    "Tab4Value"?: STRING;


    /** Tab Image, tab 4 */
    "Tab4Image"?: IMAGELINK;


    /** Tab Visible, tab 4 */
    "Tab4Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 4 */
    "Tab4Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 5 */
    "Tab5Name"?: STRING;


    /** Tab Value, tab 5 */
    "Tab5Value"?: STRING;


    /** Tab Image, tab 5 */
    "Tab5Image"?: IMAGELINK;


    /** Tab Visible, tab 5 */
    "Tab5Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 5 */
    "Tab5Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 6 */
    "Tab6Name"?: STRING;


    /** Tab Value, tab 6 */
    "Tab6Value"?: STRING;


    /** Tab Image, tab 6 */
    "Tab6Image"?: IMAGELINK;


    /** Tab Visible, tab 6 */
    "Tab6Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 6 */
    "Tab6Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 7 */
    "Tab7Name"?: STRING;


    /** Tab Value, tab 7 */
    "Tab7Value"?: STRING;


    /** Tab Image, tab 7 */
    "Tab7Image"?: IMAGELINK;


    /** Tab Visible, tab 7 */
    "Tab7Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 7 */
    "Tab7Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 8 */
    "Tab8Name"?: STRING;


    /** Tab Value, tab 8 */
    "Tab8Value"?: STRING;


    /** Tab Image, tab 8 */
    "Tab8Image"?: IMAGELINK;


    /** Tab Visible, tab 8 */
    "Tab8Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 8 */
    "Tab8Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 9 */
    "Tab9Name"?: STRING;


    /** Tab Value, tab 9 */
    "Tab9Value"?: STRING;


    /** Tab Image, tab 9 */
    "Tab9Image"?: IMAGELINK;


    /** Tab Visible, tab 9 */
    "Tab9Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 9 */
    "Tab9Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 10 */
    "Tab10Name"?: STRING;


    /** Tab Value, tab 10 */
    "Tab10Value"?: STRING;


    /** Tab Image, tab 10 */
    "Tab10Image"?: IMAGELINK;


    /** Tab Visible, tab 10 */
    "Tab10Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 10 */
    "Tab10Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 11 */
    "Tab11Name"?: STRING;


    /** Tab Value, tab 11 */
    "Tab11Value"?: STRING;


    /** Tab Image, tab 11 */
    "Tab11Image"?: IMAGELINK;


    /** Tab Visible, tab 11 */
    "Tab11Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 11 */
    "Tab11Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 12 */
    "Tab12Name"?: STRING;


    /** Tab Value, tab 12 */
    "Tab12Value"?: STRING;


    /** Tab Image, tab 12 */
    "Tab12Image"?: IMAGELINK;


    /** Tab Visible, tab 12 */
    "Tab12Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 12 */
    "Tab12Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 13 */
    "Tab13Name"?: STRING;


    /** Tab Value, tab 13 */
    "Tab13Value"?: STRING;


    /** Tab Image, tab 13 */
    "Tab13Image"?: IMAGELINK;


    /** Tab Visible, tab 13 */
    "Tab13Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 13 */
    "Tab13Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 14 */
    "Tab14Name"?: STRING;


    /** Tab Value, tab 14 */
    "Tab14Value"?: STRING;


    /** Tab Image, tab 14 */
    "Tab14Image"?: IMAGELINK;


    /** Tab Visible, tab 14 */
    "Tab14Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 14 */
    "Tab14Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 15 */
    "Tab15Name"?: STRING;


    /** Tab Value, tab 15 */
    "Tab15Value"?: STRING;


    /** Tab Image, tab 15 */
    "Tab15Image"?: IMAGELINK;


    /** Tab Visible, tab 15 */
    "Tab15Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 15 */
    "Tab15Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Name, tab 16 */
    "Tab16Name"?: STRING;


    /** Tab Value, tab 16 */
    "Tab16Value"?: STRING;


    /** Tab Image, tab 16 */
    "Tab16Image"?: IMAGELINK;


    /** Tab Visible, tab 16 */
    "Tab16Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Tab Disabled, tab 16 */
    "Tab16Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /** Show a spinner icon when data is being loaded */
    "ShowDataLoading"?: BOOLEAN;


    /** When enabled makes the widget visible in the mashup */
    "Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /**  */
    "MinWidth"?: NUMBER;


    /** The z-index of the widget which allows you to put the widget on top or on the bottom of the view stack */
    "Z-index"?: NUMBER;


    /**  */
    "Margin"?: STYLECSSRECTSIZE;


    /** A bindable event triggered when an enabled tab is selected */
    "TabSelected"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceTabsv2
}

/** The binding source properties and services that can be bound on the "Tabsv2" widget. */
declare class UIOutputInterfaceTabsv2 {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** The value of the selected tab */
    SelectedTabValue: BindingTarget<STRING>;


    /** The name of the selected tab */
    SelectedTabName: BindingTarget<STRING>;


    /** A bindable service to reselect the default tab configured for this widget */
    SelectDefaultTab: ServiceBindingTarget;


    /** Resets all the contained widgets to their default values */
    ResetInputsToDefaultValue: ServiceBindingTarget
}

/** Allows users to swap between various tabs easily. */
declare function Tabsv2(props: UIInputInterfaceTabsv2): UIOutputInterfaceTabsv2

            
/** The properties and events that can be set or bound on the "Tagcloud" widget. */
declare interface UIInputInterfaceTagcloud<A> extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** Tag data bound to widget */ 
    "Data"?: BindingTarget<INFOTABLE<A>>;


    /** Size of the largest tag in the cloud in css em. Scales all other tags down from this size. */
    "MaxFontSize"?: NUMBER;


    /** Enables the display of a tooltip over each tag link */
    "DisplayToolTip"?: BOOLEAN;


    /** The infotable field which represents the tooltip value if DisplayToolTip has been selected. Requires the Data property to be bound. */
    "ToolTipField"?: FIELDNAME<A>;


    /** Sets the style of the clicked tag link. Overrides any state/style that may have been previously applied. */
    "SelectedTagStyle"?: STYLEDEFINITION;


    /** Sets the style of the rendered tags based on a formatted state or specified style. */
    "TagStateStyle"?: STATEFORMATTING;


    /** The infotable field which represents the tag display value. Requires the Data property to be bound. */
    "TagNameField"?: FIELDNAME<A>;


    /** The infotable field which represents the tag count. Requires the Data property to be bound. */
    "TagCountField"?: FIELDNAME<A>;


    /** Title for the tag cloud */
    "Title"?: STRING | BindingTarget<STRING>;


    /** The Tag Cloud style */
    "TagCloudHeaderStyle"?: STYLEDEFINITION;


    /** The Tag Cloud body background style */
    "TagCloudBodyBGStyle"?: STYLEDEFINITION;


    /** The Tag Cloud body link style */
    "TagCloudBodyLinkStyle"?: STYLEDEFINITION;


    /** The Tag Cloud body hover style */
    "TagCloudBodyHoverStyle"?: STYLEDEFINITION;


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


    /** Triggers an event when the user double clicks the widget */
    "DoubleClicked"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceTagcloud<A>
}

/** The binding source properties and services that can be bound on the "Tagcloud" widget. */
declare class UIOutputInterfaceTagcloud<A> {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Displays Vocabulary Terms according to usage */
declare function Tagcloud<A>(props: UIInputInterfaceTagcloud<A>): UIOutputInterfaceTagcloud<A>

            
/** The properties and events that can be set or bound on the "Tagpicker" widget. */
declare interface UIInputInterfaceTagpicker extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Type of tags (model or data) */
    "TagType"?: STRING<"DataTags" | "ModelTags">;


    /** Tag data bound to widget */
    "Tags"?: TAGS | BindingTarget<TAGS>;


    /** Allow selection of multiple tags */
    "MultiSelect"?: BOOLEAN;


    /** Allows you to restrict the vocabulary of the users" choices */
    "VocabularyRestriction"?: VOCABULARYNAME;


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


    /** The z-index of the widget which allows you to put the widget on top or on the bottom of the view stack */
    "Z-index"?: NUMBER;


    /**  */
    "Margin"?: STYLECSSRECTSIZE;


    /** A bindable event triggered when the data for this widget is modified */
    "Changed"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceTagpicker
}

/** The binding source properties and services that can be bound on the "Tagpicker" widget. */
declare class UIOutputInterfaceTagpicker {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Tag data bound to widget */
    Tags: BindingTarget<TAGS>
}

/** Allows users to select tags at runtime */
declare function Tagpicker(props: UIInputInterfaceTagpicker): UIOutputInterfaceTagpicker

            
/** The properties and events that can be set or bound on the "Targetmashup" widget. */
declare interface UIInputInterfaceTargetmashup extends UIBaseInputInterface {
    
    /** The style theme applied to this mashup */
    "StyleTheme"?: STYLETHEMENAME | BindingTarget<STYLETHEMENAME>;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Width of mashup */
    "Width"?: NUMBER;


    /** Height of mashup */
    "Height"?: NUMBER;


    /** If you specify a value, and this mashup is a master this text will be the title of the browser */
    "Title"?: STRING;


    /** The default mashup to use */
    "DefaultPageMashup"?: MASHUPNAME;


    /** In IE9+, Webkit & Mozilla Browsers, the mashup body will show a drop shadow over the WindowStyle */
    "DropShadow"?: BOOLEAN;


    /** Is this a responsive layout? */
    "ResponsiveLayout"?: BOOLEAN;


    /** Minimum width of the widget */
    "MinWidth"?: NUMBER;


    /** Maximum width of the widget */
    "MaxWidth"?: NUMBER;


    /** Minimum height of the widget */
    "MinHeight"?: NUMBER;


    /** Font family for any mashups using this master */
    "Font"?: STRING<"Arial, Helvetica" | "Comic Sans MS, Comic Sans MS5" | "Courier New" | "Georgia">;


    /** The style of the widget */
    "Style"?: STYLEDEFINITION;


    /** By default, if your Master style definition uses an image, it will not be repeated (tiled). */
    "BGImageRepeat"?: STRING<"no-repeat" | "repeat" | "repeat-x" | "repeat-y">;


    /** Default will auto set to the actual width and height of the image. Cover will scale to be as large as possible. Contain will scale to the largest size such that both width and height can fit. */
    "BGImageSize"?: STRING<"auto" | "cover" | "contain">;


    /** The style of the window */
    "WindowStyle"?: STYLEDEFINITION;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /** Show a spinner icon when data is being loaded */
    "ShowDataLoading"?: BOOLEAN;


    /** When enabled makes the widget visible in the mashup */
    "Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The z-index of the widget which allows you to put the widget on top or on the bottom of the view stack */
    "Z-index"?: NUMBER;


    /**  */
    "Margin"?: STYLECSSRECTSIZE;


    /**  */
    "Loaded"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceTargetmashup
}

/** The binding source properties and services that can be bound on the "Targetmashup" widget. */
declare class UIOutputInterfaceTargetmashup {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Resets all the contained widgets to their default values */
    ResetInputsToDefaultValue: ServiceBindingTarget
}

/**  */
declare function Targetmashup(props: UIInputInterfaceTargetmashup): UIOutputInterfaceTargetmashup

            
/** The properties and events that can be set or bound on the "Textarea" widget. */
declare interface UIInputInterfaceTextarea extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The text that appears in the widget */
    "Text"?: STRING | BindingTarget<STRING>;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** Is the text area read only */
    "ReadOnly"?: BOOLEAN;


    /** Tab sequence index */
    "TabSequence"?: NUMBER;


    /** Adds inner shadow effect to the inside of the TextArea */
    "InnerShadow"?: BOOLEAN;


    /** The alignment of the text label */
    "LabelAlignment"?: STRING<"left" | "right" | "center">;


    /** The TextArea style */
    "Style"?: STYLEDEFINITION;


    /** The TextArea label style */
    "TextareaLabelStyle"?: STYLEDEFINITION;


    /** The style when the TextArea is in focus  */
    "TextareaFocusStyle"?: STYLEDEFINITION;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "Label"?: STRING;


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


    /** A bindable event triggered when the data for this widget is modified */
    "Changed"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceTextarea
}

/** The binding source properties and services that can be bound on the "Textarea" widget. */
declare class UIOutputInterfaceTextarea {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** The text that appears in the widget */
    Text: BindingTarget<STRING>;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget
}

/** Enables the user to enter multi-line text. */
declare function Textarea(props: UIInputInterfaceTextarea): UIOutputInterfaceTextarea

            
/** The properties and events that can be set or bound on the "Textbox" widget. */
declare interface UIInputInterfaceTextbox extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The text to show in the input Textbox */
    "Text"?: STRING | BindingTarget<STRING>;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** The positioning of the text. */
    "TextAlign"?: STRING<"left" | "right" | "center">;


    /** The alignment of text label */
    "LabelAlignment"?: STRING<"left" | "right" | "center">;


    /** Textbox placeholder text. Not supported in IE9 and earlier versions. */
    "PlaceholderText"?: STRING;


    /** Is the textbox read only */
    "ReadOnly"?: BOOLEAN;


    /** Do not show contents of entry at runtime */
    "MaskInputCharacters"?: BOOLEAN;


    /** Tab sequence index */
    "TabSequence"?: NUMBER;


    /** Adds inner shadow effect to the inside of the textbox */
    "InnerShadow"?: BOOLEAN;


    /** The cursor position in the input Textbox */
    "CursorPosition"?: NUMBER;


    /** The style of the Textbox */
    "Style"?: STYLEDEFINITION;


    /** The label style of the Textbox */
    "TextboxLabelStyle"?: STYLEDEFINITION;


    /** The style of the Textbox when in focus */
    "DefaultTextboxFocusStyle"?: STYLEDEFINITION;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /**  */
    "Label"?: STRING;


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


    /** A bindable event triggered when the data for this widget is modified */
    "Changed"?: ServiceBindingTarget[];


    /** A bindable event that triggers when a user clicks an area outside the widget or presses the Enter key after updating the widget value */
    "EnterKeyPressed"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceTextbox
}

/** The binding source properties and services that can be bound on the "Textbox" widget. */
declare class UIOutputInterfaceTextbox {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** The text to show in the input Textbox */
    Text: BindingTarget<STRING>;


    /** The cursor position in the input Textbox */
    CursorPosition: BindingTarget<NUMBER>;


    /** Resets the inputs for this widget to their default values */
    ResetToDefaultValue: ServiceBindingTarget
}

/** Enables the user to enter text. */
declare function Textbox(props: UIInputInterfaceTextbox): UIOutputInterfaceTextbox

            
/** The properties and events that can be set or bound on the "Thingshapemashup" widget. */
declare interface UIInputInterfaceThingshapemashup extends UIBaseInputInterface {
    
    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** The thing shape to use */
    "ThingShape"?: THINGSHAPENAME;


    /** The entity to use */
    "Entity"?: THINGNAME;


    /** Is this widget responsive? */
    "ResponsiveLayout"?: BOOLEAN;


    /** Minimum width of widget */
    "MinWidth"?: NUMBER;


    /** Minimum height of widget */
    "MinHeight"?: NUMBER;


    /** The style of the thing shape mashup */
    "Style"?: STYLEDEFINITION;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /** Show a spinner icon when data is being loaded */
    "ShowDataLoading"?: BOOLEAN;


    /** When enabled makes the widget visible in the mashup */
    "Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The z-index of the widget which allows you to put the widget on top or on the bottom of the view stack */
    "Z-index"?: NUMBER;


    /**  */
    "Margin"?: STYLECSSRECTSIZE;


    /**  */
    "Loaded"?: ServiceBindingTarget[];


    /**  */
    "EntityChanged"?: ServiceBindingTarget[];


    /**  */
    "RefreshRequested"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceThingshapemashup
}

/** The binding source properties and services that can be bound on the "Thingshapemashup" widget. */
declare class UIOutputInterfaceThingshapemashup {
    
    /** The entity to use */
    Entity: BindingTarget<THINGNAME>;


    /**  */
    CloseIfPopup: ServiceBindingTarget;


    /** To be used externally so you only have one auto-refresh on a page.  Does not refresh the browser, just triggers RefreshRequested which you then bind to the services you would like to trigger */
    Refresh: ServiceBindingTarget;


    /** Resets all the contained widgets to their default values */
    ResetInputsToDefaultValue: ServiceBindingTarget
}

/**  */
declare function Thingshapemashup(props: UIInputInterfaceThingshapemashup): UIOutputInterfaceThingshapemashup

            
/** The properties and events that can be set or bound on the "Thingtemplatemashup" widget. */
declare interface UIInputInterfaceThingtemplatemashup extends UIBaseInputInterface {
    
    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** The thing template to use */
    "ThingTemplate"?: THINGTEMPLATENAME;


    /** The entity to use */
    "Entity"?: THINGNAME;


    /** Is this widget responsive? */
    "ResponsiveLayout"?: BOOLEAN;


    /** Minimum width of widget */
    "MinWidth"?: NUMBER;


    /** Minimum height of widget */
    "MinHeight"?: NUMBER;


    /** The style of the thing template mashup */
    "Style"?: STYLEDEFINITION;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /** Show a spinner icon when data is being loaded */
    "ShowDataLoading"?: BOOLEAN;


    /** When enabled makes the widget visible in the mashup */
    "Visible"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The z-index of the widget which allows you to put the widget on top or on the bottom of the view stack */
    "Z-index"?: NUMBER;


    /**  */
    "Margin"?: STYLECSSRECTSIZE;


    /**  */
    "Loaded"?: ServiceBindingTarget[];


    /**  */
    "EntityChanged"?: ServiceBindingTarget[];


    /**  */
    "RefreshRequested"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceThingtemplatemashup
}

/** The binding source properties and services that can be bound on the "Thingtemplatemashup" widget. */
declare class UIOutputInterfaceThingtemplatemashup {
    
    /** The entity to use */
    Entity: BindingTarget<THINGNAME>;


    /**  */
    CloseIfPopup: ServiceBindingTarget;


    /** To be used externally so you only have one auto-refresh on a page.  Does not refresh the browser, just triggers RefreshRequested which you then bind to the services you would like to trigger */
    Refresh: ServiceBindingTarget;


    /** Resets all the contained widgets to their default values */
    ResetInputsToDefaultValue: ServiceBindingTarget
}

/**  */
declare function Thingtemplatemashup(props: UIInputInterfaceThingtemplatemashup): UIOutputInterfaceThingtemplatemashup

            
/** The properties and events that can be set or bound on the "Timeselector" widget. */
declare interface UIInputInterfaceTimeselector extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The start date and time */
    "StartDateTime"?: BindingTarget<DATETIME>;


    /** The end date and time */
    "EndDateTime"?: BindingTarget<DATETIME>;


    /** Initial interval size */
    "Interval"?: NUMBER | BindingTarget<NUMBER>;


    /** Initial interval type */
    "IntervalType"?: STRING<"h" | "m" | "s" | "d"> | BindingTarget<STRING<"h" | "m" | "s" | "d">>;


    /** Use the interval setting as the maximum refresh setting */
    "UseIntervalAsMax"?: BOOLEAN;


    /** Auto refresh time interval */
    "RefreshInterval"?: NUMBER;


    /** When enabled turns on auto-refresh */
    "AutoRefresh"?: BOOLEAN;


    /** Year Month and Day position */
    "DateOrder"?: STRING<"yy-mm-dd" | "dd-mm-yy" | "mm-dd-yy" | "yy-dd-mm" | "mm-yy-dd" | "dd-yy-mm">;


    /** Date Length */
    "DateDisplay"?: STRING<"numeric" | "short" | "full">;


    /** Display Time with Seconds */
    "DisplaySeconds"?: BOOLEAN;


    /** Character to separate month, day and year */
    "DateDelimiter"?: STRING;


    /** Localize date format using "dd-mm-yy" pattern. Overrides DateDelimiter, DateOrder, DateDisplay properties */
    "DateFormatToken"?: STRING;


    /** Display a decade dropdown to make it easier to jump backward or forward several decades at a time */
    "DecadeView"?: BOOLEAN;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** Tab sequence index */
    "TabSequence"?: NUMBER;


    /** Check this option for a better experience when using this widget in a wide screen layout */
    "Widescreen"?: BOOLEAN;


    /** Check this option to allow your users to "lock" the start or end time. */
    "ShowLockControls"?: BOOLEAN;


    /** The style when the Time Selector is in focus */
    "FocusStyle"?: STYLEDEFINITION;


    /** The background style */
    "TimeBGStyle"?: STYLEDEFINITION;


    /** The style for the date/time buttons */
    "TimeDatePickerStyle"?: STYLEDEFINITION;


    /** The style for the auto-refresh enablement button */
    "TimeAutoRefreshBtnStyle"?: STYLEDEFINITION;


    /** The style for the refresh button */
    "TimeRefreshBtnStyle"?: STYLEDEFINITION;


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


    /** A bindable event triggered when the defined refresh interval has elapsed */
    "Updated"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceTimeselector
}

/** The binding source properties and services that can be bound on the "Timeselector" widget. */
declare class UIOutputInterfaceTimeselector {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** The start date and time */
    StartDateTime: BindingTarget<DATETIME>;


    /** The end date and time */
    EndDateTime: BindingTarget<DATETIME>
}

/** Enables the user to select a time range */
declare function Timeselector(props: UIInputInterfaceTimeselector): UIOutputInterfaceTimeselector

            
/** The properties and events that can be set or bound on the "Tree" widget. */
declare interface UIInputInterfaceTree<A> extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Automatically select the first row of data when new data arrives? */
    "AutoSelectFirstRow"?: BOOLEAN;


    /** Field to use for tree labels */
    "LabelField"?: FIELDNAME<A>;


    /** Field to use for tree tooltips */
    "TooltipField"?: FIELDNAME<A>;


    /** Field to use for tree values */
    "ValueField"?: FIELDNAME<A>;


    /** Field that uniquely identifies a tree node */
    "IDField"?: FIELDNAME<A>;


    /** Field that uniquely identifies the parent of a tree node */
    "ParentIDField"?: FIELDNAME<A>;


    /** Value for the root parent ID */
    "RootParentID"?: STRING;


    /** Style formatting rules for tree item labels */
    "TreeFormatter"?: STATEFORMATTING;


    /** Style formatting rules for closed tree item images */
    "ClosedNodeFormatter"?: STATEFORMATTING;


    /** Style formatting rules for open tree item images */
    "OpenNodeFormatter"?: STATEFORMATTING;


    /** Style formatting rules for tree item images without child items */
    "NoChildFormatter"?: STATEFORMATTING;


    /** Currently selected label */
    "SelectedLabel"?: BindingTarget<STRING>;


    /** Currently selected value */
    "SelectedValue"?: BindingTarget<STRING>;


    /** Currently selected breadcrumb.  Default value is what will show initially before a node in the tree is selected */
    "SelectedBreadcrumb"?: STRING;


    /** Data source */ 
    "Data"?: BindingTarget<INFOTABLE<A>>;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** Collapses the tree through this # of levels of the tree on initial load.  Set this to 1 to have a completely collapsed tree on load. */
    "CollapseChildrenOfLevel"?: NUMBER;


    /** Tree style */
    "TreeBGStyle"?: STYLEDEFINITION;


    /** Tree selected style */
    "TreeSelectedStyle"?: STYLEDEFINITION;


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


    /** Triggers an event when the user double clicks the widget */
    "DoubleClicked"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceTree<A>
}

/** The binding source properties and services that can be bound on the "Tree" widget. */
declare class UIOutputInterfaceTree<A> {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Currently selected breadcrumb.  Default value is what will show initially before a node in the tree is selected */
    SelectedBreadcrumb: BindingTarget<STRING>
}

/** Displays a tree using a dataset containing nested infotables */
declare function Tree<A>(props: UIInputInterfaceTree<A>): UIOutputInterfaceTree<A>

            
/** The properties and events that can be set or bound on the "Timeserieschart" widget. */
declare interface UIInputInterfaceTimeserieschart<A> extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Use a Single Data Source for All Series */
    "SingleDataSource"?: BOOLEAN;


    /** Desired number of series in this chart */
    "NumberOfSeries"?: NUMBER;


    /** Data source */ 
    "Data"?: BindingTarget<INFOTABLE<A>>;


    /** Type of chart */
    "ChartType"?: STRING<"line" | "marker" | "linemarker">;


    /** Chart orientation */
    "ChartOrientation"?: STRING<"vertical" | "horizontal">;


    /** Chart overall style */
    "ChartStyle"?: STYLEDEFINITION;


    /** Chart area style */
    "ChartAreaStyle"?: STYLEDEFINITION;


    /** Chart legend style */
    "ChartLegendStyle"?: STYLEDEFINITION;


    /** Chart title style */
    "ChartTitleStyle"?: STYLEDEFINITION;


    /** Selected item style */
    "SelectedItemStyle"?: STYLEDEFINITION;


    /** Chart Title */
    "ChartTitle"?: STRING | BindingTarget<STRING>;


    /** Show or hide the legend */
    "ShowLegend"?: BOOLEAN;


    /** Fixed legend width (if non-zero it will be used) */
    "LegendWidth"?: NUMBER;


    /** Desired legend location (none = hide legend) */
    "LegendLocation"?: STRING<"right" | "top" | "bottom" | "left">;


    /** Desired legend orientation */
    "LegendOrientation"?: STRING<"vertical" | "horizontal">;


    /** Desired marker size */
    "MarkerSize"?: NUMBER;


    /** Desired marker type */
    "MarkerType"?: STRING<"circle" | "square" | "triangle" | "diamond" | "image">;


    /** Allow to adjust the chart area width when Multi Axes Mode is active and Container Size is small */
    "ChartMinWidth"?: NUMBER;


    /** Line smoothing */
    "Smoothing"?: BOOLEAN;


    /** Field that will provide X axis values */
    "XAxisField"?: FIELDNAME<A>;


    /** Show or hide X axis */
    "ShowXAxis"?: BOOLEAN;


    /** Chart X axis style */
    "XAxisStyle"?: STYLEDEFINITION;


    /** Format for X axis values */
    "XAxisFormat"?: STRING;


    /** Minimum range for the X axis */
    "XAxisMinimum"?: DATETIME | BindingTarget<DATETIME>;


    /** Maximum range for the X axis */
    "XAxisMaximum"?: DATETIME | BindingTarget<DATETIME>;


    /** Automatically scale the X axis */
    "XAxisAutoscale"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the X axis */
    "XAxisZeroscale"?: BOOLEAN;


    /** Attempt to use round values to scale the X axis */
    "XAxisSmoothScaling"?: BOOLEAN;


    /** Number of X axis chart intervals (affects ticks, grid) */
    "XAxisIntervals"?: NUMBER;


    /** Number of X axis minor ticks */
    "XAxisMinorTicks"?: NUMBER;


    /** Number of X axis labels */
    "XAxisLabels"?: NUMBER;


    /** Allow zooming the X axis */
    "AllowXAxisZoom"?: BOOLEAN;


    /** Max characters to display before truncating with ellipses and showing full label text in tooltip. Default 0 disables feature, negative values trim characters from start. */
    "TruncateX-AxisLabels"?: NUMBER;


    /** Show X axis labels */
    "ShowXAxisLabels"?: BOOLEAN;


    /** Show X axis ticks */
    "ShowXAxisTicks"?: BOOLEAN;


    /** Show or hide Y axis */
    "ShowYAxis"?: BOOLEAN;


    /** Y axis mode */
    "YAxisMode"?: STRING<"single" | "dual" | "multi">;


    /** Chart Y axis style */
    "YAxisStyle"?: STYLEDEFINITION;


    /** Number of Y axis chart intervals (affects ticks, grid) */
    "YAxisIntervals"?: NUMBER;


    /** Number of Y axis minor ticks */
    "YAxisMinorTicks"?: NUMBER;


    /** Number of Y axis labels */
    "YAxisLabels"?: NUMBER;


    /** Max characters to display before truncating with ellipses and showing full label text in tooltip. Default 0 disables feature, negative values trim characters from start. */
    "TruncateY-AxisLabels"?: NUMBER;


    /** Show Y axis labels */
    "ShowYAxisLabels"?: BOOLEAN;


    /** Show Y axis ticks */
    "ShowYAxisTicks"?: BOOLEAN;


    /** Allow zooming the Y axis */
    "AllowYAxisZoom"?: BOOLEAN;


    /** Format for Y axis values */
    "YAxisFormat"?: STRING;


    /** Minimum range for the Y axis */
    "YAxisMinimum"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the Y axis */
    "YAxisMaximum"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the Y axis */
    "YAxisAutoscale"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "YAxisZeroscale"?: BOOLEAN;


    /** Format for secondary Y axis values */
    "SecondaryYAxisFormat"?: STRING;


    /** Minimum range for the secondary Y axis */
    "SecondaryYAxisMinimum"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the secondary Y axis */
    "SecondaryYAxisMaximum"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the secondary Y axis */
    "SecondaryYAxisAutoscale"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the secondary Y axis */
    "SecondaryYAxisZeroscale"?: BOOLEAN;


    /** Allow item selection */
    "AllowSelection"?: BOOLEAN;


    /** Enable display of values on hover */
    "EnableHover"?: BOOLEAN;


    /** Show horizontal grid */
    "ShowXAxisGrid"?: BOOLEAN;


    /** Show vertical grid */
    "ShowYAxisGrid"?: BOOLEAN;


    /** Chart grid style */
    "GridStyle"?: STYLEDEFINITION;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /**  */
    "ToolTipField"?: undefined;


    /** Series data source 1 */
    "DataSource1"?: BindingTarget<INFOTABLE>;


    /** Series data field 1 */
    "DataField1"?: FIELDNAME<A>;


    /** Series data label 1 */
    "DataLabel1"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 1 */
    "XAxisField1"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType1"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType1"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis1"?: BOOLEAN;


    /** Format for axis values */
    "YAxisFormat1"?: STRING;


    /** Minimum range for the axis */
    "YAxisMinimum1"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "YAxisMaximum1"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "YAxisAutoscale1"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "YAxisZeroscale1"?: BOOLEAN;


    /** Series style 1 */
    "SeriesStyle1"?: STYLEDEFINITION;


    /** Series data style 1 */
    "SeriesDataStyle1"?: STATEFORMATTING;


    /** Series data source 2 */
    "DataSource2"?: BindingTarget<INFOTABLE>;


    /** Series data field 2 */
    "DataField2"?: FIELDNAME<A>;


    /** Series data label 2 */
    "DataLabel2"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 2 */
    "XAxisField2"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType2"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType2"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis2"?: BOOLEAN;


    /** Format for axis values */
    "YAxisFormat2"?: STRING;


    /** Minimum range for the axis */
    "YAxisMinimum2"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "YAxisMaximum2"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "YAxisAutoscale2"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "YAxisZeroscale2"?: BOOLEAN;


    /** Series style 2 */
    "SeriesStyle2"?: STYLEDEFINITION;


    /** Series data style 2 */
    "SeriesDataStyle2"?: STATEFORMATTING;


    /** Series data source 3 */
    "DataSource3"?: BindingTarget<INFOTABLE>;


    /** Series data field 3 */
    "DataField3"?: FIELDNAME<A>;


    /** Series data label 3 */
    "DataLabel3"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 3 */
    "XAxisField3"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType3"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType3"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis3"?: BOOLEAN;


    /** Format for axis values */
    "YAxisFormat3"?: STRING;


    /** Minimum range for the axis */
    "YAxisMinimum3"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "YAxisMaximum3"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "YAxisAutoscale3"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "YAxisZeroscale3"?: BOOLEAN;


    /** Series style 3 */
    "SeriesStyle3"?: STYLEDEFINITION;


    /** Series data style 3 */
    "SeriesDataStyle3"?: STATEFORMATTING;


    /** Series data source 4 */
    "DataSource4"?: BindingTarget<INFOTABLE>;


    /** Series data field 4 */
    "DataField4"?: FIELDNAME<A>;


    /** Series data label 4 */
    "DataLabel4"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 4 */
    "XAxisField4"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType4"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType4"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis4"?: BOOLEAN;


    /** Format for axis values */
    "YAxisFormat4"?: STRING;


    /** Minimum range for the axis */
    "YAxisMinimum4"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "YAxisMaximum4"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "YAxisAutoscale4"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "YAxisZeroscale4"?: BOOLEAN;


    /** Series style 4 */
    "SeriesStyle4"?: STYLEDEFINITION;


    /** Series data style 4 */
    "SeriesDataStyle4"?: STATEFORMATTING;


    /** Series data source 5 */
    "DataSource5"?: BindingTarget<INFOTABLE>;


    /** Series data field 5 */
    "DataField5"?: FIELDNAME<A>;


    /** Series data label 5 */
    "DataLabel5"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 5 */
    "XAxisField5"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType5"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType5"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis5"?: BOOLEAN;


    /** Format for axis values */
    "YAxisFormat5"?: STRING;


    /** Minimum range for the axis */
    "YAxisMinimum5"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "YAxisMaximum5"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "YAxisAutoscale5"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "YAxisZeroscale5"?: BOOLEAN;


    /** Series style 5 */
    "SeriesStyle5"?: STYLEDEFINITION;


    /** Series data style 5 */
    "SeriesDataStyle5"?: STATEFORMATTING;


    /** Series data source 6 */
    "DataSource6"?: BindingTarget<INFOTABLE>;


    /** Series data field 6 */
    "DataField6"?: FIELDNAME<A>;


    /** Series data label 6 */
    "DataLabel6"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 6 */
    "XAxisField6"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType6"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType6"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis6"?: BOOLEAN;


    /** Format for axis values */
    "YAxisFormat6"?: STRING;


    /** Minimum range for the axis */
    "YAxisMinimum6"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "YAxisMaximum6"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "YAxisAutoscale6"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "YAxisZeroscale6"?: BOOLEAN;


    /** Series style 6 */
    "SeriesStyle6"?: STYLEDEFINITION;


    /** Series data style 6 */
    "SeriesDataStyle6"?: STATEFORMATTING;


    /** Series data source 7 */
    "DataSource7"?: BindingTarget<INFOTABLE>;


    /** Series data field 7 */
    "DataField7"?: FIELDNAME<A>;


    /** Series data label 7 */
    "DataLabel7"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 7 */
    "XAxisField7"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType7"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType7"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis7"?: BOOLEAN;


    /** Format for axis values */
    "YAxisFormat7"?: STRING;


    /** Minimum range for the axis */
    "YAxisMinimum7"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "YAxisMaximum7"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "YAxisAutoscale7"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "YAxisZeroscale7"?: BOOLEAN;


    /** Series style 7 */
    "SeriesStyle7"?: STYLEDEFINITION;


    /** Series data style 7 */
    "SeriesDataStyle7"?: STATEFORMATTING;


    /** Series data source 8 */
    "DataSource8"?: BindingTarget<INFOTABLE>;


    /** Series data field 8 */
    "DataField8"?: FIELDNAME<A>;


    /** Series data label 8 */
    "DataLabel8"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 8 */
    "XAxisField8"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType8"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType8"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis8"?: BOOLEAN;


    /** Format for axis values */
    "YAxisFormat8"?: STRING;


    /** Minimum range for the axis */
    "YAxisMinimum8"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "YAxisMaximum8"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "YAxisAutoscale8"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "YAxisZeroscale8"?: BOOLEAN;


    /** Series style 8 */
    "SeriesStyle8"?: STYLEDEFINITION;


    /** Series data style 8 */
    "SeriesDataStyle8"?: STATEFORMATTING;


    /** Series data source 9 */
    "DataSource9"?: BindingTarget<INFOTABLE>;


    /** Series data field 9 */
    "DataField9"?: FIELDNAME<A>;


    /** Series data label 9 */
    "DataLabel9"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 9 */
    "XAxisField9"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType9"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType9"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis9"?: BOOLEAN;


    /** Format for axis values */
    "YAxisFormat9"?: STRING;


    /** Minimum range for the axis */
    "YAxisMinimum9"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "YAxisMaximum9"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "YAxisAutoscale9"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "YAxisZeroscale9"?: BOOLEAN;


    /** Series style 9 */
    "SeriesStyle9"?: STYLEDEFINITION;


    /** Series data style 9 */
    "SeriesDataStyle9"?: STATEFORMATTING;


    /** Series data source 10 */
    "DataSource10"?: BindingTarget<INFOTABLE>;


    /** Series data field 10 */
    "DataField10"?: FIELDNAME<A>;


    /** Series data label 10 */
    "DataLabel10"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 10 */
    "XAxisField10"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType10"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType10"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis10"?: BOOLEAN;


    /** Format for axis values */
    "YAxisFormat10"?: STRING;


    /** Minimum range for the axis */
    "YAxisMinimum10"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "YAxisMaximum10"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "YAxisAutoscale10"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "YAxisZeroscale10"?: BOOLEAN;


    /** Series style 10 */
    "SeriesStyle10"?: STYLEDEFINITION;


    /** Series data style 10 */
    "SeriesDataStyle10"?: STATEFORMATTING;


    /** Series data source 11 */
    "DataSource11"?: BindingTarget<INFOTABLE>;


    /** Series data field 11 */
    "DataField11"?: FIELDNAME<A>;


    /** Series data label 11 */
    "DataLabel11"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 11 */
    "XAxisField11"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType11"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType11"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis11"?: BOOLEAN;


    /** Format for axis values */
    "YAxisFormat11"?: STRING;


    /** Minimum range for the axis */
    "YAxisMinimum11"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "YAxisMaximum11"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "YAxisAutoscale11"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "YAxisZeroscale11"?: BOOLEAN;


    /** Series style 11 */
    "SeriesStyle11"?: STYLEDEFINITION;


    /** Series data style 11 */
    "SeriesDataStyle11"?: STATEFORMATTING;


    /** Series data source 12 */
    "DataSource12"?: BindingTarget<INFOTABLE>;


    /** Series data field 12 */
    "DataField12"?: FIELDNAME<A>;


    /** Series data label 12 */
    "DataLabel12"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 12 */
    "XAxisField12"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType12"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType12"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis12"?: BOOLEAN;


    /** Format for axis values */
    "YAxisFormat12"?: STRING;


    /** Minimum range for the axis */
    "YAxisMinimum12"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "YAxisMaximum12"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "YAxisAutoscale12"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "YAxisZeroscale12"?: BOOLEAN;


    /** Series style 12 */
    "SeriesStyle12"?: STYLEDEFINITION;


    /** Series data style 12 */
    "SeriesDataStyle12"?: STATEFORMATTING;


    /** Series data source 13 */
    "DataSource13"?: BindingTarget<INFOTABLE>;


    /** Series data field 13 */
    "DataField13"?: FIELDNAME<A>;


    /** Series data label 13 */
    "DataLabel13"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 13 */
    "XAxisField13"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType13"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType13"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis13"?: BOOLEAN;


    /** Format for axis values */
    "YAxisFormat13"?: STRING;


    /** Minimum range for the axis */
    "YAxisMinimum13"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "YAxisMaximum13"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "YAxisAutoscale13"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "YAxisZeroscale13"?: BOOLEAN;


    /** Series style 13 */
    "SeriesStyle13"?: STYLEDEFINITION;


    /** Series data style 13 */
    "SeriesDataStyle13"?: STATEFORMATTING;


    /** Series data source 14 */
    "DataSource14"?: BindingTarget<INFOTABLE>;


    /** Series data field 14 */
    "DataField14"?: FIELDNAME<A>;


    /** Series data label 14 */
    "DataLabel14"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 14 */
    "XAxisField14"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType14"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType14"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis14"?: BOOLEAN;


    /** Format for axis values */
    "YAxisFormat14"?: STRING;


    /** Minimum range for the axis */
    "YAxisMinimum14"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "YAxisMaximum14"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "YAxisAutoscale14"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "YAxisZeroscale14"?: BOOLEAN;


    /** Series style 14 */
    "SeriesStyle14"?: STYLEDEFINITION;


    /** Series data style 14 */
    "SeriesDataStyle14"?: STATEFORMATTING;


    /** Series data source 15 */
    "DataSource15"?: BindingTarget<INFOTABLE>;


    /** Series data field 15 */
    "DataField15"?: FIELDNAME<A>;


    /** Series data label 15 */
    "DataLabel15"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 15 */
    "XAxisField15"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType15"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType15"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis15"?: BOOLEAN;


    /** Format for axis values */
    "YAxisFormat15"?: STRING;


    /** Minimum range for the axis */
    "YAxisMinimum15"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "YAxisMaximum15"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "YAxisAutoscale15"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "YAxisZeroscale15"?: BOOLEAN;


    /** Series style 15 */
    "SeriesStyle15"?: STYLEDEFINITION;


    /** Series data style 15 */
    "SeriesDataStyle15"?: STATEFORMATTING;


    /** Series data source 16 */
    "DataSource16"?: BindingTarget<INFOTABLE>;


    /** Series data field 16 */
    "DataField16"?: FIELDNAME<A>;


    /** Series data label 16 */
    "DataLabel16"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 16 */
    "XAxisField16"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType16"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType16"?: STRING<"chart" | "circle" | "square" | "triangle" | "diamond" | "image">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis16"?: BOOLEAN;


    /** Format for axis values */
    "YAxisFormat16"?: STRING;


    /** Minimum range for the axis */
    "YAxisMinimum16"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "YAxisMaximum16"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "YAxisAutoscale16"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "YAxisZeroscale16"?: BOOLEAN;


    /** Series style 16 */
    "SeriesStyle16"?: STYLEDEFINITION;


    /** Series data style 16 */
    "SeriesDataStyle16"?: STATEFORMATTING;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


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


    /** Triggers an event when the user double clicks the widget */
    "DoubleClicked"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceTimeserieschart<A>
}

/** The binding source properties and services that can be bound on the "Timeserieschart" widget. */
declare class UIOutputInterfaceTimeserieschart<A> {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Displays a time series chart */
declare function Timeserieschart<A>(props: UIInputInterfaceTimeserieschart<A>): UIOutputInterfaceTimeserieschart<A>

            
/** The properties and events that can be set or bound on the "Validator" widget. */
declare interface UIInputInterfaceValidator extends UIBaseInputInterface {
    
    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** The javascript expression that should be evaluated */
    "Expression"?: STRING;


    /** The javascript expression is automatically run when enabled */
    "AutoEvaluate"?: BOOLEAN;


    /** The output from evaluated expression */
    "Output"?: BOOLEAN;


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


    /** A bindable event triggered when the defined expression evaluates to true */
    "True"?: ServiceBindingTarget[];


    /** A bindable event triggered when the defined expression evaluates to false */
    "False"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceValidator
}

/** The binding source properties and services that can be bound on the "Validator" widget. */
declare class UIOutputInterfaceValidator {
    
    /** The output from evaluated expression */
    Output: BindingTarget<BOOLEAN>;


    /** A bindable service to evaluate the expression defined for this widget */
    Evaluate: ServiceBindingTarget
}

/** Evaluates a (Not Secure) expression to a true/false result */
declare function Validator(props: UIInputInterfaceValidator): UIOutputInterfaceValidator

            
/** The properties and events that can be set or bound on the "Validator2" widget. */
declare interface UIInputInterfaceValidator2 extends UIBaseInputInterface {
    
    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** The javascript expression that should be evaluated */
    "Expression"?: STRING;


    /** The javascript expression is automatically run when enabled */
    "AutoEvaluate"?: BOOLEAN;


    /** The output from evaluated expression */
    "Output"?: BOOLEAN;


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


    /** A bindable event triggered when the defined expression evaluates to true */
    "True"?: ServiceBindingTarget[];


    /** A bindable event triggered when the defined expression evaluates to false */
    "False"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceValidator2
}

/** The binding source properties and services that can be bound on the "Validator2" widget. */
declare class UIOutputInterfaceValidator2 {
    
    /** The output from evaluated expression */
    Output: BindingTarget<BOOLEAN>;


    /** A bindable service to evaluate the expression defined for this widget */
    Evaluate: ServiceBindingTarget
}

/** Evaluates a (Not Secure) expression to a true/false result */
declare function Validator2(props: UIInputInterfaceValidator2): UIOutputInterfaceValidator2

            
/** The properties and events that can be set or bound on the "Valuedisplay" widget. */
declare interface UIInputInterfaceValuedisplay extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Formatter for the value using a StateFormatter */
    "ValueFormat"?: RENDERERWITHSTATE;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** The data source for the Value Display widget */
    "Data"?: BindingTarget<ANYSCALAR>;


    /** Align the value on the horizontal axis */
    "Alignment"?: STRING<"left" | "right" | "center">;


    /** Vertical alignment of the value */
    "VerticalAlignment"?: STRING<"bottom" | "middle" | "top">;


    /** Alignment of text label */
    "LabelAlignment"?: STRING<"left" | "right" | "center">;


    /** Content will only fill the background style to the size of the value content; widget option fills to the size you set the widget */
    "BackgroundFill"?: STRING<"content" | "widget">;


    /** If an image is used in the value set how it will scale */
    "ImageScaling"?: STRING<"Width" | "Height" | "none">;


    /** Determines if the renderer will be visible outside of the bounds of the widget */
    "Overflow"?: STRING<"hidden" | "visible">;


    /** If this is unchecked, text in the valuedisplay at runtime will be cut off at the size in the builder with an ellipsis.  Hover for a tooltip with the entire value */
    "TextWrap"?: BOOLEAN;


    /** The text that appears in the value display if there is no value in what is bound to the control */
    "TextIfNoValue"?: STRING;


    /** The style for the text that appears in the value display if there is no value in what is bound to the control */
    "TextIfNoValueStyle"?: STYLEDEFINITION | BindingTarget<STYLEDEFINITION>;


    /** Left offset in px. */
    "TextIfNoValueOffset"?: NUMBER;


    /** Style of the value display */
    "ValueDisplayStyle"?: STYLEDEFINITION | BindingTarget<STYLEDEFINITION>;


    /** Style of the value display label */
    "ValueDisplayLabelStyle"?: STYLEDEFINITION | BindingTarget<STYLEDEFINITION>;


    /** Show a spinner icon when data is being loaded */
    "ShowDataLoading"?: BOOLEAN;


    /** Triggers an event when the widget is clicked */
    "Clicked"?: ServiceBindingTarget[];


    /**  */
    "Label"?: STRING;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


    /** Optional tooltip to be displayed on hover over this widget. */
    "ToolTipField"?: STRING | BindingTarget<STRING>;


    /** The style of the tooltip when it is enabled. */
    "ToolTipStyle"?: STYLEDEFINITION;


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


    ref?: UIOutputInterfaceValuedisplay
}

/** The binding source properties and services that can be bound on the "Valuedisplay" widget. */
declare class UIOutputInterfaceValuedisplay {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Displays a single value */
declare function Valuedisplay(props: UIInputInterfaceValuedisplay): UIOutputInterfaceValuedisplay

            
/** The properties and events that can be set or bound on the "Verticalslider" widget. */
declare interface UIInputInterfaceVerticalslider extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** width of widget */
    "Width"?: NUMBER;


    /** height of widget */
    "Height"?: NUMBER;


    /** Value of the slider */
    "Value"?: NUMBER | BindingTarget<NUMBER>;


    /** Minimum acceptable value for the slider. */
    "Minimum"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum acceptable value for the slider. */
    "Maximum"?: NUMBER | BindingTarget<NUMBER>;


    /** Value for each step of the slider */
    "Step"?: NUMBER | BindingTarget<NUMBER>;


    /** Orientation of the slider (true is vertical). */
    "Vertical"?: BOOLEAN;


    /** Slider handle style */
    "SliderHandle"?: STRING<"Square" | "Circle">;


    /** Slider bar style */
    "SliderBar"?: STRING<"Thick" | "Thin">;


    /** Skin for the slider */
    "Skin"?: STRING<"Arrow" | "ArrowGreen" | "Ball" | "Bar" | "Default" | "dhx_SkyBlue" | "SimpleGray" | "SimpleSilver" | "Zipper">;


    /** When enabled, the slider will move in steps relative to the minimum value.Otherwise the slider will move in steps relative to the current value. */
    "ZeroScale"?: BOOLEAN;


    /** When enabled causes slider to move in the amount of Step when the slider bar is clicked. */
    "SteppingMode"?: BOOLEAN;


    /** When enabled causes slider to generate events as it changes value. Use with caution! */
    "TrackingMode"?: BOOLEAN;


    /** When enabled will display the minimum and maximum values with the slider. */
    "DisplayMinMaxLabels"?: BOOLEAN;


    /** When enabled will display the value of the slider. */
    "DisplayValueLabel"?: BOOLEAN;


    /** Use this property to disable the widget in the mashup */
    "Disabled"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** The style of the slider */
    "SliderBGStyle"?: STYLEDEFINITION;


    /** The slider handle style */
    "SliderHandleStyle"?: STYLEDEFINITION;


    /** The slider tracker style */
    "SliderTrackerStyle"?: STYLEDEFINITION;


    /** The slider tracker progress style */
    "SliderTrackerProgressStyle"?: STYLEDEFINITION;


    /** The slider maximum style */
    "SliderMaxStyle"?: STYLEDEFINITION;


    /** The slider value style */
    "SliderValueStyle"?: STYLEDEFINITION;


    /** The slider minimum style */
    "SliderMinStyle"?: STYLEDEFINITION;


    /** The style of the slider when it is disabled */
    "SliderBGDisabledStyle"?: STYLEDEFINITION;


    /** The slider handle style when it is disabled */
    "SliderHandleDisabledStyle"?: STYLEDEFINITION;


    /** The slider tracker style when it is disabled */
    "SliderTrackerDisabledStyle"?: STYLEDEFINITION;


    /** The slider tracker progress style when it is disabled */
    "SliderTrackerProgressDisabledStyle"?: STYLEDEFINITION;


    /** The slider maximum style when it is disabled */
    "SliderMaxDisabledStyle"?: STYLEDEFINITION;


    /** The slider value style when it is disabled */
    "SliderValueDisabledStyle"?: STYLEDEFINITION;


    /** The slider minimum style when it is disabled */
    "SliderMinDisabledStyle"?: STYLEDEFINITION;


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


    /** Triggers an event when the value for this widget is changed */
    "ValueChanged"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceVerticalslider
}

/** The binding source properties and services that can be bound on the "Verticalslider" widget. */
declare class UIOutputInterfaceVerticalslider {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Value of the slider */
    Value: BindingTarget<NUMBER>;


    /** Minimum acceptable value for the slider. */
    Minimum: BindingTarget<NUMBER>;


    /** Maximum acceptable value for the slider. */
    Maximum: BindingTarget<NUMBER>;


    /** Value for each step of the slider */
    Step: BindingTarget<NUMBER>;


    /** A bindable service that increments the slider value */
    Increment: ServiceBindingTarget;


    /** A bindable service that decrements the slider value */
    Decrement: ServiceBindingTarget
}

/** Vertical value slider. */
declare function Verticalslider(props: UIInputInterfaceVerticalslider): UIOutputInterfaceVerticalslider

            
/** The properties and events that can be set or bound on the "Webframe" widget. */
declare interface UIInputInterfaceWebframe extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The URL to the content to display in the portal */
    "URL"?: HYPERLINK | BindingTarget<HYPERLINK>;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


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


    ref?: UIOutputInterfaceWebframe
}

/** The binding source properties and services that can be bound on the "Webframe" widget. */
declare class UIOutputInterfaceWebframe {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Displays a portal to another URL */
declare function Webframe(props: UIInputInterfaceWebframe): UIOutputInterfaceWebframe

            
/** The properties and events that can be set or bound on the "Wiki" widget. */
declare interface UIInputInterfaceWiki extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** The wiki to view */
    "Wiki"?: THINGNAME | BindingTarget<THINGNAME>;


    /** The title of the Wiki */
    "Title"?: STRING | BindingTarget<STRING>;


    /** Limit the number of characters to accept in the page title field. */
    "PageTitleCharacterLimit"?: NUMBER | BindingTarget<NUMBER>;


    /** Message to display if user reaches the maximum characters for page title. */
    "PageTitleCharacterLimitMessage"?: STRING | BindingTarget<STRING>;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /** Page (wikiEntryId) of the wiki that you"d like to be selected */
    "WikiEntryIdToShow"?: STRING | BindingTarget<STRING>;


    /** Show the Wiki Table of Contents pane? */
    "ShowWikiTOC"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Show the Wiki entry create timestamp? */
    "ShowWikiTimestamp"?: BOOLEAN;


    /** Show the Wiki Table of Contents all expanded? */
    "ExpandAllWikiTOC"?: BOOLEAN;


    /** Set the width of the page navigation sidebar in pixels (px) */
    "WikiSidebarWidth"?: NUMBER;


    /** Maximum number of wiki items to retrieve */
    "MaximumItems"?: NUMBER;


    /** The style of the wiki */
    "WikiStyle"?: STYLEDEFINITION;


    /** The style of the wiki header */
    "WikiHeaderStyle"?: STYLEDEFINITION;


    /** The style of the wiki toolbar */
    "WikiToolbarStyle"?: STYLEDEFINITION;


    /** The style of the wiki content */
    "WikiContentStyle"?: STYLEDEFINITION;


    /** The style of the wiki navigation */
    "WikiNavigationStyle"?: STYLEDEFINITION;


    /** The style of the selected wiki navigation */
    "WikiNavigationSelectedStyle"?: STYLEDEFINITION;


    /** The style of the wiki search */
    "WikiSearchStyle"?: STYLEDEFINITION;


    /** The style of the wiki buttons */
    "WikiButtonStyle"?: STYLEDEFINITION;


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


    ref?: UIOutputInterfaceWiki
}

/** The binding source properties and services that can be bound on the "Wiki" widget. */
declare class UIOutputInterfaceWiki {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Display a wiki article */
declare function Wiki(props: UIInputInterfaceWiki): UIOutputInterfaceWiki

            
/** The properties and events that can be set or bound on the "Xychart" widget. */
declare interface UIInputInterfaceXychart<A> extends UIBaseInputInterface {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Use a Single Data Source for All Series */
    "SingleDataSource"?: BOOLEAN;


    /** Desired number of series in this chart */
    "NumberOfSeries"?: NUMBER;


    /** Data source */ 
    "Data"?: BindingTarget<INFOTABLE<A>>;


    /** Type of chart */
    "ChartType"?: STRING;


    /** Chart orientation */
    "ChartOrientation"?: STRING;


    /** Chart overall style */
    "ChartStyle"?: STYLEDEFINITION;


    /** Chart area style */
    "ChartAreaStyle"?: STYLEDEFINITION;


    /** Chart legend style */
    "ChartLegendStyle"?: STYLEDEFINITION;


    /** Chart title style */
    "ChartTitleStyle"?: STYLEDEFINITION;


    /** Selected item style */
    "SelectedItemStyle"?: STYLEDEFINITION;


    /** Chart Title */
    "ChartTitle"?: STRING | BindingTarget<STRING>;


    /** Show or hide the legend */
    "ShowLegend"?: BOOLEAN;


    /** Fixed legend width (if non-zero it will be used) */
    "LegendWidth"?: NUMBER;


    /** Desired legend location (none = hide legend) */
    "LegendLocation"?: STRING<"right" | "top" | "bottom" | "left">;


    /** Desired legend orientation */
    "LegendOrientation"?: STRING<"vertical" | "horizontal">;


    /** Desired marker size */
    "MarkerSize"?: NUMBER;


    /** Desired marker type */
    "MarkerType"?: STRING<"circle" | "square" | "triangle" | "diamond" | "image">;


    /** Enable Line Plotting for consequent points in the Series. The Line will be drawn accordingly to the Series Style. */
    "DrawLine"?: BOOLEAN;


    /** Field that will provide X axis values */
    "XAxisField"?: FIELDNAME<A>;


    /** Show or hide X axis */
    "ShowXAxis"?: BOOLEAN;


    /** Chart X axis style */
    "XAxisStyle"?: STYLEDEFINITION;


    /** Format for X axis values */
    "XAxisFormat"?: STRING;


    /** Minimum range for the X axis */
    "XAxisMinimum"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the X axis */
    "XAxisMaximum"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the X axis */
    "XAxisAutoscale"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the X axis */
    "XAxisZeroscale"?: BOOLEAN;


    /** Attempt to use round values to scale the X axis */
    "XAxisSmoothScaling"?: BOOLEAN;


    /** Number of X axis chart intervals (affects ticks, grid) */
    "XAxisIntervals"?: NUMBER;


    /** Number of X axis minor ticks */
    "XAxisMinorTicks"?: NUMBER;


    /** Number of X axis labels */
    "XAxisLabels"?: NUMBER;


    /** Max characters to display before truncating with ellipses and showing full label text in tooltip. Default 0 disables feature, negative values trim characters from start. */
    "TruncateX-AxisLabels"?: NUMBER;


    /** Show X axis labels */
    "ShowXAxisLabels"?: BOOLEAN;


    /** Show X axis ticks */
    "ShowXAxisTicks"?: BOOLEAN;


    /** Allow zooming the X axis */
    "AllowXAxisZoom"?: BOOLEAN;


    /** Show or hide Y axis */
    "ShowYAxis"?: BOOLEAN;


    /** Y axis mode */
    "YAxisMode"?: STRING<"single" | "dual" | "multi">;


    /** Chart Y axis style */
    "YAxisStyle"?: STYLEDEFINITION;


    /** Number of Y axis chart intervals (affects ticks, grid) */
    "YAxisIntervals"?: NUMBER;


    /** Number of Y axis minor ticks */
    "YAxisMinorTicks"?: NUMBER;


    /** Number of Y axis labels */
    "YAxisLabels"?: NUMBER;


    /** Max characters to display before truncating with ellipses and showing full label text in tooltip. Default 0 disables feature, negative values trim characters from start. */
    "TruncateY-AxisLabels"?: NUMBER;


    /** Show Y axis labels */
    "ShowYAxisLabels"?: BOOLEAN;


    /** Show Y axis ticks */
    "ShowYAxisTicks"?: BOOLEAN;


    /** Allow zooming the Y axis */
    "AllowYAxisZoom"?: BOOLEAN;


    /** Format for Y axis values */
    "YAxisFormat"?: STRING;


    /** Minimum range for the Y axis */
    "YAxisMinimum"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the Y axis */
    "YAxisMaximum"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the Y axis */
    "YAxisAutoscale"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "YAxisZeroscale"?: BOOLEAN;


    /** Format for secondary Y axis values */
    "SecondaryYAxisFormat"?: STRING;


    /** Minimum range for the secondary Y axis */
    "SecondaryYAxisMinimum"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the secondary Y axis */
    "SecondaryYAxisMaximum"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the secondary Y axis */
    "SecondaryYAxisAutoscale"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the secondary Y axis */
    "SecondaryYAxisZeroscale"?: BOOLEAN;


    /** Allow item selection */
    "AllowSelection"?: BOOLEAN;


    /** Enable display of values on hover */
    "EnableHover"?: BOOLEAN;


    /** Show horizontal grid */
    "ShowXAxisGrid"?: BOOLEAN;


    /** Show vertical grid */
    "ShowYAxisGrid"?: BOOLEAN;


    /** Chart grid style */
    "GridStyle"?: STYLEDEFINITION;


    /** Width of widget */
    "Width"?: NUMBER;


    /** Height of widget */
    "Height"?: NUMBER;


    /**  */
    "ToolTipField"?: undefined;


    /** Series data source 1 */
    "DataSource1"?: BindingTarget<INFOTABLE>;


    /** Series data field 1 */
    "DataField1"?: FIELDNAME<A>;


    /** Series data label 1 */
    "DataLabel1"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 1 */
    "XAxisField1"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType1"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType1"?: STRING<"chart">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis1"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat1"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum1"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum1"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale1"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale1"?: BOOLEAN;


    /** Series style 1 */
    "SeriesStyle1"?: STYLEDEFINITION;


    /** Series data style 1 */
    "SeriesDataStyle1"?: STATEFORMATTING;


    /** Series data source 2 */
    "DataSource2"?: BindingTarget<INFOTABLE>;


    /** Series data field 2 */
    "DataField2"?: FIELDNAME<A>;


    /** Series data label 2 */
    "DataLabel2"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 2 */
    "XAxisField2"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType2"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType2"?: STRING<"chart">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis2"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat2"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum2"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum2"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale2"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale2"?: BOOLEAN;


    /** Series style 2 */
    "SeriesStyle2"?: STYLEDEFINITION;


    /** Series data style 2 */
    "SeriesDataStyle2"?: STATEFORMATTING;


    /** Series data source 3 */
    "DataSource3"?: BindingTarget<INFOTABLE>;


    /** Series data field 3 */
    "DataField3"?: FIELDNAME<A>;


    /** Series data label 3 */
    "DataLabel3"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 3 */
    "XAxisField3"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType3"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType3"?: STRING<"chart">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis3"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat3"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum3"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum3"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale3"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale3"?: BOOLEAN;


    /** Series style 3 */
    "SeriesStyle3"?: STYLEDEFINITION;


    /** Series data style 3 */
    "SeriesDataStyle3"?: STATEFORMATTING;


    /** Series data source 4 */
    "DataSource4"?: BindingTarget<INFOTABLE>;


    /** Series data field 4 */
    "DataField4"?: FIELDNAME<A>;


    /** Series data label 4 */
    "DataLabel4"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 4 */
    "XAxisField4"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType4"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType4"?: STRING<"chart">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis4"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat4"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum4"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum4"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale4"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale4"?: BOOLEAN;


    /** Series style 4 */
    "SeriesStyle4"?: STYLEDEFINITION;


    /** Series data style 4 */
    "SeriesDataStyle4"?: STATEFORMATTING;


    /** Series data source 5 */
    "DataSource5"?: BindingTarget<INFOTABLE>;


    /** Series data field 5 */
    "DataField5"?: FIELDNAME<A>;


    /** Series data label 5 */
    "DataLabel5"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 5 */
    "XAxisField5"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType5"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType5"?: STRING<"chart">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis5"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat5"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum5"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum5"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale5"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale5"?: BOOLEAN;


    /** Series style 5 */
    "SeriesStyle5"?: STYLEDEFINITION;


    /** Series data style 5 */
    "SeriesDataStyle5"?: STATEFORMATTING;


    /** Series data source 6 */
    "DataSource6"?: BindingTarget<INFOTABLE>;


    /** Series data field 6 */
    "DataField6"?: FIELDNAME<A>;


    /** Series data label 6 */
    "DataLabel6"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 6 */
    "XAxisField6"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType6"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType6"?: STRING<"chart">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis6"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat6"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum6"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum6"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale6"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale6"?: BOOLEAN;


    /** Series style 6 */
    "SeriesStyle6"?: STYLEDEFINITION;


    /** Series data style 6 */
    "SeriesDataStyle6"?: STATEFORMATTING;


    /** Series data source 7 */
    "DataSource7"?: BindingTarget<INFOTABLE>;


    /** Series data field 7 */
    "DataField7"?: FIELDNAME<A>;


    /** Series data label 7 */
    "DataLabel7"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 7 */
    "XAxisField7"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType7"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType7"?: STRING<"chart">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis7"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat7"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum7"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum7"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale7"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale7"?: BOOLEAN;


    /** Series style 7 */
    "SeriesStyle7"?: STYLEDEFINITION;


    /** Series data style 7 */
    "SeriesDataStyle7"?: STATEFORMATTING;


    /** Series data source 8 */
    "DataSource8"?: BindingTarget<INFOTABLE>;


    /** Series data field 8 */
    "DataField8"?: FIELDNAME<A>;


    /** Series data label 8 */
    "DataLabel8"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 8 */
    "XAxisField8"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType8"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType8"?: STRING<"chart">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis8"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat8"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum8"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum8"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale8"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale8"?: BOOLEAN;


    /** Series style 8 */
    "SeriesStyle8"?: STYLEDEFINITION;


    /** Series data style 8 */
    "SeriesDataStyle8"?: STATEFORMATTING;


    /** Series data source 9 */
    "DataSource9"?: BindingTarget<INFOTABLE>;


    /** Series data field 9 */
    "DataField9"?: FIELDNAME<A>;


    /** Series data label 9 */
    "DataLabel9"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 9 */
    "XAxisField9"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType9"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType9"?: STRING<"chart">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis9"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat9"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum9"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum9"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale9"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale9"?: BOOLEAN;


    /** Series style 9 */
    "SeriesStyle9"?: STYLEDEFINITION;


    /** Series data style 9 */
    "SeriesDataStyle9"?: STATEFORMATTING;


    /** Series data source 10 */
    "DataSource10"?: BindingTarget<INFOTABLE>;


    /** Series data field 10 */
    "DataField10"?: FIELDNAME<A>;


    /** Series data label 10 */
    "DataLabel10"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 10 */
    "XAxisField10"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType10"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType10"?: STRING<"chart">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis10"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat10"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum10"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum10"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale10"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale10"?: BOOLEAN;


    /** Series style 10 */
    "SeriesStyle10"?: STYLEDEFINITION;


    /** Series data style 10 */
    "SeriesDataStyle10"?: STATEFORMATTING;


    /** Series data source 11 */
    "DataSource11"?: BindingTarget<INFOTABLE>;


    /** Series data field 11 */
    "DataField11"?: FIELDNAME<A>;


    /** Series data label 11 */
    "DataLabel11"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 11 */
    "XAxisField11"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType11"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType11"?: STRING<"chart">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis11"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat11"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum11"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum11"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale11"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale11"?: BOOLEAN;


    /** Series style 11 */
    "SeriesStyle11"?: STYLEDEFINITION;


    /** Series data style 11 */
    "SeriesDataStyle11"?: STATEFORMATTING;


    /** Series data source 12 */
    "DataSource12"?: BindingTarget<INFOTABLE>;


    /** Series data field 12 */
    "DataField12"?: FIELDNAME<A>;


    /** Series data label 12 */
    "DataLabel12"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 12 */
    "XAxisField12"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType12"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType12"?: STRING<"chart">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis12"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat12"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum12"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum12"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale12"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale12"?: BOOLEAN;


    /** Series style 12 */
    "SeriesStyle12"?: STYLEDEFINITION;


    /** Series data style 12 */
    "SeriesDataStyle12"?: STATEFORMATTING;


    /** Series data source 13 */
    "DataSource13"?: BindingTarget<INFOTABLE>;


    /** Series data field 13 */
    "DataField13"?: FIELDNAME<A>;


    /** Series data label 13 */
    "DataLabel13"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 13 */
    "XAxisField13"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType13"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType13"?: STRING<"chart">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis13"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat13"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum13"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum13"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale13"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale13"?: BOOLEAN;


    /** Series style 13 */
    "SeriesStyle13"?: STYLEDEFINITION;


    /** Series data style 13 */
    "SeriesDataStyle13"?: STATEFORMATTING;


    /** Series data source 14 */
    "DataSource14"?: BindingTarget<INFOTABLE>;


    /** Series data field 14 */
    "DataField14"?: FIELDNAME<A>;


    /** Series data label 14 */
    "DataLabel14"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 14 */
    "XAxisField14"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType14"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType14"?: STRING<"chart">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis14"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat14"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum14"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum14"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale14"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale14"?: BOOLEAN;


    /** Series style 14 */
    "SeriesStyle14"?: STYLEDEFINITION;


    /** Series data style 14 */
    "SeriesDataStyle14"?: STATEFORMATTING;


    /** Series data source 15 */
    "DataSource15"?: BindingTarget<INFOTABLE>;


    /** Series data field 15 */
    "DataField15"?: FIELDNAME<A>;


    /** Series data label 15 */
    "DataLabel15"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 15 */
    "XAxisField15"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType15"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType15"?: STRING<"chart">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis15"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat15"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum15"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum15"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale15"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale15"?: BOOLEAN;


    /** Series style 15 */
    "SeriesStyle15"?: STYLEDEFINITION;


    /** Series data style 15 */
    "SeriesDataStyle15"?: STATEFORMATTING;


    /** Series data source 16 */
    "DataSource16"?: BindingTarget<INFOTABLE>;


    /** Series data field 16 */
    "DataField16"?: FIELDNAME<A>;


    /** Series data label 16 */
    "DataLabel16"?: STRING | BindingTarget<STRING>;


    /** Series X axis field 16 */
    "XAxisField16"?: FIELDNAME<A>;


    /** Series type */
    "SeriesType16"?: STRING<"chart" | "line" | "linemarker" | "marker">;


    /** Series-specific marker type */
    "SeriesMarkerType16"?: STRING<"chart">;


    /** Use the secondary Y axis */
    "UseSecondaryAxis16"?: BOOLEAN;


    /** Format for axis values */
    "AxisFormat16"?: STRING;


    /** Minimum range for the axis */
    "AxisMinimum16"?: NUMBER | BindingTarget<NUMBER>;


    /** Maximum range for the axis */
    "AxisMaximum16"?: NUMBER | BindingTarget<NUMBER>;


    /** Automatically scale the axis */
    "AxisAutoscale16"?: BOOLEAN;


    /** Force a zero minimum when automatically scaling the Y axis */
    "AxisZeroscale16"?: BOOLEAN;


    /** Series style 16 */
    "SeriesStyle16"?: STYLEDEFINITION;


    /** Series data style 16 */
    "SeriesDataStyle16"?: STATEFORMATTING;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


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


    /** Triggers an event when the user double clicks the widget */
    "DoubleClicked"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceXychart<A>
}

/** The binding source properties and services that can be bound on the "Xychart" widget. */
declare class UIOutputInterfaceXychart<A> {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>
}

/** Displays an XY/scatter chart */
declare function Xychart<A>(props: UIInputInterfaceXychart<A>): UIOutputInterfaceXychart<A>
