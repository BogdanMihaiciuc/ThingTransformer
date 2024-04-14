declare function defineWidget<A extends DataShapeBase = DataShapeBase, G = {}>(cls: typeof BMCollectionView): UIOutputInterfaceBMCollectionView<A, G>;
declare function defineWidget<A extends keyof Mashups>(cls: typeof BMWindowController): UIOutputInterfaceBMWindowController<A>;
declare function defineWidget<A extends keyof Mashups>(cls: typeof BMPopoverController): UIOutputInterfaceBMPopoverController<A>;

declare type UIInputInterfaceBMCollectionViewMenuEvents<T extends string> = T extends STATEDEFINITIONNAME ? {
    /** An event that triggers when this menu item is selected for a cell. */
    [K in StateDefinitions[T]['__stateDefinitionNames'] & string as `Menu:${K}`]?: ServiceBindingTarget[];
} : {};

declare type UIInputInterfaceBMCollectionView<A, G, M extends MASHUPNAME, H extends MASHUPNAME, F extends MASHUPNAME, S extends string> = ToBindingTarget<Partial<G>> & UIInputInterfaceBMCollectionViewMenuEvents<S> & UIBaseInputInterface & {
    
    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    "CustomClass"?: STRING | BindingTarget<STRING>;


    /** Represents the data source of this collection view. Whenever the data is updated, either through drag & drop, deleting, inserting or modifying mashup parameters, this property will contain the updated data. */
    "Data": BindingTarget<INFOTABLE<A>>;


    /** When updated, the data bound to this property will be added at the end of collection view's data. */
    "AdditionalData"?: BindingTarget<INFOTABLE<A>>;


    /** If set to a value greater than 0, this represents the total number of items in the complete data set. When the number of items displayed by collection view is equal to or greater than this value, the events for approaching the end of the current data set no longer fire. */
    "DataTotalSize"?: NUMBER | BindingTarget<NUMBER>;


    /** When set to true, collection view will no longer trigger the events for approaching the end of the current data set. */
    "HasCompleteDataSet"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Controls when the DataSetEndThreshold event is triggered. This must be a size expressed in px units, or a percent relative to collection view's frame size. */
    "DataSetEndThreshold"?: STRING;


    /** If enabled, the events for approaching the end of the current data set will only fire once, until the AdditionalData property is updated. */
    "PreventsRepeatedDataEndEvents"?: BOOLEAN;


    /** Represents the unique identifier of a collection view item. This can be any type of field that uniquely identifies an item. */
    "UIDField": FIELDNAME<A>;


    /** Optional. When set or bound, this is the infotable field by which section contents are sorted. The sorting is performed client-side and does not affect the source infotable or other widgets bound to the data set. */
    "SortField"?: FIELDNAME<A> | BindingTarget<FIELDNAME<A>>;


    /** Used with SortField. When enabled, the sort will be performed ascending, otherwise it will be descending. */
    "SortAscending"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Optional. Represents the section identifier by which to group the items. If set, the items will be grouped in sections. */
    "SectionField"?: FIELDNAME<A>;


    /** The type of layout to use. */
    "Layout"?: STRING<"flow" | "masonry" | "stack" | "tile"> | BindingTarget<STRING<"flow" | "masonry" | "stack" | "tile">>;


    /** If using sections, this represents the left section inset */
    "SectionInsetLeft"?: NUMBER;


    /** If using sections, this represents the left section inset */
    "SectionInsetTop"?: NUMBER;


    /** If using sections, this represents the left section inset */
    "SectionInsetRight"?: NUMBER;


    /** If using sections, this represents the left section inset */
    "SectionInsetBottom"?: NUMBER;


    /** Must be used with Table layout. If enabled, the currently visible section's header will be stuck to the top edge of the collection view. */
    "TableLayoutPinsHeadersToContentEdge"?: BOOLEAN;


    /** Must be used with Table layout. If enabled, the currently visible section's footer will be stuck to the bottom edge of the collection view. */
    "TableLayoutPinsFootersToContentEdge"?: BOOLEAN;


    /** Must be used with Flow layout. Controls how many cells each row is allowed to have. */
    "FlowLayoutMaximumCellsPerRow"?: INTEGER;


    /** Must be used with Flow layout. Controls the axis along which rows are created. */
    "FlowLayoutOrientation"?: STRING<"Vertical" | "Horizontal">;


    /** Must be used with Flow layout. If enabled, the final row in each section will be aligned to the left rather than the center. */
    "FlowLayoutLeftAlignFinalRow"?: BOOLEAN;


    /** Must be used with Flow layout. Controls how cells will flow in their row. */
    "FlowLayoutGravity"?: STRING<"Edge" | "Spaced" | "Center" | "Start" | "End" | "Expand">;


    /** Must be used with Flow layout. Controls how cells will be aligned vertically in their row. */
    "FlowLayoutAlignment"?: STRING<"Top" | "Center" | "Bottom" | "Expand">;


    /** Must be used with Flow layout. Controls how content is aligned vertically within the collection view when its size is smaller than the collection view. */
    "FlowLayoutContentGravity"?: STRING<"Top" | "Center" | "Bottom" | "Expand">;


    /** Must be used with Flow layout. Controls the spacing between headers, rows and footers. */
    "FlowLayoutRowSpacing"?: INTEGER;


    /** Must be used with Flow layout. Controls the minimum amount of horizontal spacing between the cells. */
    "FlowLayoutMinimumSpacing"?: INTEGER;


    /** Must be used with Flow layout. Controls the padding the collection view's top margin and the first item. */
    "FlowLayoutTopPadding"?: INTEGER;


    /** Must be used with Flow layout. Controls the padding the collection view's bottom margin and the last item. */
    "FlowLayoutBottomPadding"?: INTEGER;


    /** Must be used with Flow layout. If enabled, the currently visible section's header will be stuck to the top edge of the collection view. */
    "FlowLayoutPinsHeadersToContentEdge"?: BOOLEAN;


    /** Must be used with Flow layout. If enabled, the currently visible section's footer will be stuck to the bottom edge of the collection view. */
    "FlowLayoutPinsFootersToContentEdge"?: BOOLEAN;


    /** Must be used with Masonry layout. If set to a number greater than 0, this is the number of columns the masonry layout will render. */
    "MasonryLayoutNumberOfColumns"?: INTEGER;


    /** Must be used with Masonry layout. If the number of columns isn't specified, this is the minimum width to use for each column. */
    "MasonryLayoutColumnWidth"?: INTEGER;


    /** Must be used with Masonry layout. This is the scrolling speed modifier for each column. */
    "MasonryLayoutColumnSpeeds"?: STRING;


    /** Must be used with Masonry layout. Controls the horizontal spacing between columns. */
    "MasonryLayoutColumnSpacing"?: INTEGER;


    /** Must be used with Masonry layout. Controls the vertical spacing between cells. */
    "MasonryLayoutCellSpacing"?: INTEGER;


    /** Must be used with Masonry layout. Controls the padding the collection view's top margin and the first item. */
    "MasonryLayoutTopPadding"?: INTEGER;


    /** Must be used with Masonry layout. Controls the padding the collection view's bottom margin and the last item. */
    "MasonryLayoutBottomPadding"?: INTEGER;


    /** Must be used with Tile layout. If set to a positive number, cell sizes will be constrained to the closest multiple of this number. */
    "TileLayoutGridSize"?: NUMBER;


    /** Must be used with Tile layout. If set to a positive number, cells will have at least this amount spacing between them and all other cells. */
    "TileLayoutSpacing"?: NUMBER;


    /** Must be used with Tile layout. Controls the padding the collection view's top margin and the first item. */
    "TileLayoutTopPadding"?: INTEGER;


    /** Must be used with Tile layout. Controls the padding the collection view's bottom margin and the last item. */
    "TileLayoutBottomPadding"?: INTEGER;


    /** Must be used with Tile layout. If enabled, the currently visible section's header will be stuck to the top edge of the collection view. */
    "TileLayoutPinsHeadersToContentEdge"?: BOOLEAN;


    /** Must be used with Tile layout. If enabled, the currently visible section's footer will be stuck to the bottom edge of the collection view. */
    "TileLayoutPinsFootersToContentEdge"?: BOOLEAN;


    /** If enabled, stack layout will only show the first cell. */
    "StackLayoutShowsSingleCell"?: BOOLEAN;


    /** The left inset used by stack layout. */
    "StackLayoutInsetLeft"?: NUMBER;


    /** The top inset used by stack layout. */
    "StackLayoutInsetTop"?: NUMBER;


    /** The right inset used by stack layout. */
    "StackLayoutInsetRight"?: NUMBER;


    /** The bottom inset used by stack layout. */
    "StackLayoutInsetBottom"?: NUMBER;


    /** Controls the spacing between background cells. */
    "StackLayoutSpread"?: NUMBER;


    /** Controls how many background cells will be shown. */
    "StackLayoutNumberOfBackgroundCells"?: NUMBER;


    /** Controls how much the background cells will scale down before disappearing. */
    "StackLayoutMinimumScale"?: NUMBER;


    /** Controls whether the background cells will become blurred as they disappear. */
    "StackLayoutBlursBackgroundCells"?: BOOLEAN;


    /** Controls how much the background cells will blur before disappearing. */
    "StackLayoutMaximumBlur"?: NUMBER;


    /** The mashup to use for data items. */
    "CellMashupName"?: STRING<M>;


    /** The field containing the mashup to use for data items. When this property is set, CellMashupName, CellMashupNameSelected and CellMashupName editing cannot be used. */
    "CellMashupNameField"?: FIELDNAME<A>;


    /** A serialized JSON object that has infotable fields as its keys and mashup parameters as values. */
    "CellMashupPropertyBinding"?: {[K in keyof A]?: keyof Mashups[M]['__mashupParametersType']};


    /** A serialized JSON object that has global parameter names as its keys and data types as values. These are properties that may be bound on the collection view and will be sent down to each cell mashup. */
    "CellMashupGlobalPropertyBinding": {
        [K in keyof G]: 
            (G[K] extends string ? 'STRING' :
                (G[K] extends number ? 'NUMBER' :
                    (G[K] extends boolean ? 'BOOLEAN' :
                        (G[K] extends INFOTABLE<unknown> ? 'INFOTABLE' : 
                            (G[K] extends LOCATION ? 'LOCATION' :
                                (G[K] extends Date ? 'DATETIME' : string)
                            )
                        )
                    )
                )
            )
    };


    /** Must be used with Flow layout. The default width to use for the collection view cells. */
    "CellWidth"?: INTEGER;


    /** Must be used with Flow or Table layout. The default height to use for the collection view cells. */
    "CellHeight"?: INTEGER;


    /** When set, has priority over CellWidth. Must be used with Flow layout. The default width to use for the collection view cells. */
    "CellWidthField"?: FIELDNAME<A>;


    /** When set, has priority over CellHeight. Must be used with Flow or Table layout. The default height to use for the collection view cells. */
    "CellHeightField"?: FIELDNAME<A>;


    /** Must be used with CellMashupNameField and static cell mashups. When this property is enabled, the collection view will use each mashup type's size as the cell size. */
    "CellMashupHasIntrinsicSize"?: BOOLEAN;


    /** BETA. Must be used with flow layout and a cell mashup whose root widget is a BMView widget. If enabled, the size of the cells will be determined from the intrinsic size of the cell's contents.			When this property is enabled, the CellWidth and CellHeight property should be set to the average expected cell size. */
    "AutomaticCellSize"?: BOOLEAN;


    /** If enabled, cells can be selected, otherwise cells will be unselectable by this collection view. */
    "CanSelectCells"?: BOOLEAN;


    /** Controls the multiple selection behaviour. */
    "CellMultipleSelectionType"?: STRING<"Disabled" | "ClickTap" | "SelectionMode" | "CtrlClick">;


    /** When enabled, whenever any other widget changes the selection, the collection view will automatically scroll to the first selected cell. */
    "ScrollsToSelectedCell"?: BOOLEAN;


    /** When enabled, when data is updated and no cell is selected, the collection view will automatically select the first available cell. */
    "AutoSelectsFirstCell"?: BOOLEAN;


    /** Optional. If specified, this represents the mashup parameter that will receive the selected state of the object it is bound to. */
    "CellMashupSelectedField"?: STRING<keyof Mashups[M]['__mashupParametersType'] & string>;


    /** When enabled, keyboard navigation can be used to highlight cells. */
    "KeyboardHighlightingEnabled"?: BOOLEAN;


    /** When enabled, when data is updated and no cell is highlighted, the collection view will automatically highlight the first available cell. */
    "KeyboardAutoHighlightsFirstCell"?: BOOLEAN;


    /** Controls what happens when a cell is highlighted. */
    "KeyboardHighlightingBehaviour"?: STRING<"Highlight" | "Select">;


    /** Controls what happens the spacebar key is pressed while a cell is highlighted. */
    "KeyboardHighlightingSpacebarBehaviour"?: STRING<"Event" | "Click" | "Select">;


    /** Controls what happens the return key is pressed while a cell is highlighted. */
    "KeyboardHighlightingReturnBehaviour"?: STRING<"Event" | "Click" | "Select">;


    /** Controls which parts of keyboard navigation are disabled when an input or button element has keyboard focus. */
    "KeyboardHighlightOmitsInputElements"?: STRING<"All" | "Navigation" | "Actions" | "None">;


    /** Must be used with KeyboardHighlightEnabled and CellMultipleSelectionType enabled. When enabled, using the shift key with keyboard navigation selects a block of cells. */
    "KeyboardBlockSelectionEnabled"?: BOOLEAN;


    /** The displayName of a widget that can process keyboard events for this collection view. */
    "KeyboardDelegateWidget"?: STRING;


    /** An array containing the supported keys that can be processed by the keyboard delegate widget. */
    "KeyboardDelegateWidgetKeys"?: STRING;


    /** Must be used with KeyboardDelegateWidget. When enabled, pressing any supported key will cause this collection view to acquire keyboard focus from the delegate widget. */
    "KeyboardDelegateWidgetStealFocus"?: BOOLEAN;


    /** The tab index to assign to this collection view */
    "TabIndex"?: NUMBER;


    /** Controls the background of collection view. Only the backround color property of the style is used. */
    "BackgroundStyle"?: STYLEDEFINITION;


    /** Controls the background of cells. Only the backround color property of the style is used. */
    "CellStyle"?: STYLEDEFINITION;


    /** Controls the background of the selected cells. Only the backround color property of the style is used. */
    "CellStyleSelected"?: STYLEDEFINITION;


    /** If specified, has priority over CellStyleSelected. An alternative mashup to use for selected cells. This mashup should have the same properties as the cell mashup. */
    "CellMashupNameSelected"?: MASHUPNAME;


    /** Controls the background of the cells when hovering. Only the background color property of the style is used. */
    "CellStyleHover"?: STYLEDEFINITION;


    /** Controls the background of the cells when pressed. Only the background color property of the style is used. */
    "CellStyleActive"?: STYLEDEFINITION;


    /** An optional border radius to apply to the cells. When this value is set to a non-empty string, the cells will have their overflow property set to hidden. */
    "CellBorderRadius"?: STRING;


    /** When set to a non-empty string, this will be used as the box-shadow for the cells. */
    "CellBoxShadow"?: STRING;


    /** Controls how the mouse pointer appears when hovering over this collection view's cells. */
    "CellPointer"?: STRING<"auto" | "pointer" | "default">;


    /** If enabled, a ripple effect is used when clicking on cells. Using this option will cause the cells to have their overflow property set to hidden. */
    "UsesRipple"?: BOOLEAN;


    /** Must be used with UsesRipple. Only the background color property of this style is used, which will be applied to the ripple effect. */
    "RippleStyle"?: STYLEDEFINITION;


    /** The style to use for the scrollbar. */
    "ScrollbarStyle"?: STYLEDEFINITION;


    /** Only used if you have also set a scrollbar style. The style to use for the scrollbar track. */
    "ScrollbarTrackStyle"?: STYLEDEFINITION;


    /** Only used if you have also set a scrollbar style. The border radius to apply to the scrollbar, in pixels. */
    "ScrollbarBorderRadius"?: NUMBER;


    /** Only used if you have also set a scrollbar style. The width of the scrollbar, in pixels. */
    "ScrollbarWidth"?: NUMBER;


    /** When set to the DisplayName of a Collection View, this Collection View's scroll position will be linked to the target's scroll position. */
    "LinkedCollectionView"?: STRING;


    /** If set to a string-based state definition, this will be the cell menu that appears when sliding over the cells. On devices without a touch interface, this menu can be displayed by right-clicking on the cells. */
    "CellSlideMenu"?: STRING<S & STATEDEFINITIONNAME>;


    /** If disabled, the default menu invoking behaviours will be disabled. */
    "CellSlideMenuUseBuiltin"?: BOOLEAN;


    /** Must be used with CellSlideMenu. The menu icons will be set to this size. */
    "CellSlideMenuIconSize"?: INTEGER;


    /** Must be used with CellSlideMenu. Controls how the icon is anchored to the text in the menu entry. */
    "CellSlideMenuIconGravity"?: STRING<"Left" | "Above" | "Right" | "Below">;


    /** Must be used with CellSlideMenu. Controls how the menu entries are laid out. */
    "CellSlideMenuOrientation"?: STRING<"Horizontal" | "Vertical">;


    /** Must be used with CellSlideMenu. Controls how the slide menu appears. */
    "CellSlideMenuType"?: STRING<"Auto" | "Slide" | "Popup">;


    /** If enabled, long clicking a cell will bring up the menu. */
    "CellSlideMenuLongClick"?: BOOLEAN;


    /** If enabled and using sections, each section will have a header. */
    "ShowsHeaders"?: BOOLEAN;


    /** Must be used with SectionField and ShowsHeaders. The mashup to use for headers. */
    "HeaderMashupName"?: STRING<H>;


    /** The mashup parameter that will receive the section identifier. */
    "HeaderMashupSectionProperty"?: STRING<string & keyof Mashups[H]['__mashupParametersType']>;


    /** Must be used with SectionField and ShowsHeaders. The height of the header mashups. */
    "HeaderHeight"?: INTEGER;


    /** If enabled and using sections, each section will have a footer. */
    "ShowsFooters"?: BOOLEAN;


    /** Must be used with SectionField and ShowsFooters. The mashup to use for footers. */
    "FooterMashupName"?: STRING<F>;


    /** The mashup parameter that will receive the section identifier. */
    "FooterMashupSectionProperty"?: STRING<string & keyof Mashups[F]['__mashupParametersType']>;


    /** Must be used with SectionField and ShowsFooters. The height of the footer mashups. */
    "FooterHeight"?: INTEGER;


    /** Optional. If specified, this mashup will be displayed when the data set is empty */
    "EmptyMashupName"?: MASHUPNAME;


    /** A JSON object that specifies static string values that will be assiged as parameters for the empty mashup. */
    "EmptyMashupParameters"?: STRING | BindingTarget<STRING>;


    /** If enabled, an animation will be played to show the cells when the data first arrives to this collection view. Otherwise the cells will appear instantly the first time. */
    "PlaysIntroAnimation"?: BOOLEAN;


    /** If enabled, an animation will be played when new data is added via the AdditionalData property. */
    "AnimatesAdditionalDataUpdates"?: BOOLEAN;


    /** Can be enabled to allow collection view to manipulate items via drag & drop. */
    "CanDragCells"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Can be enabled to allow collection view to move items via drag & drop. */
    "CanMoveCells"?: BOOLEAN;


    /** Must be used with CanMoveCells. If enabled, collection view will allow dragged items to move to other sections. */
    "CanMoveCellsAcrossSections"?: BOOLEAN;


    /** Can be enabled to allow collection view to remove items by dragging them out of its frame. */
    "CanRemoveCells"?: BOOLEAN;


    /** Can be enabled to allow collection view to transfer items to other collection views. */
    "CanTransferCells"?: BOOLEAN;


    /** Controls what happens to items when they are dragged into another collection view. */
    "CellTransferPolicy"?: STRING<"Move" | "Copy">;


    /** Can be enabled to allow collection view to accept items from other collection views. */
    "CanAcceptCells"?: BOOLEAN;


    /** Controls what happens to items when they are dragged into this collection view from another collection view. */
    "CellAcceptPolicy"?: STRING<"Move" | "Copy" | "Replace">;


    /** Optional. If specified and Data is not bound, this allows the CreateItem... services to be invoked. */
    "DataShape"?: DATASHAPENAME;


    /** Defaults to 0. If specified or bound, this index is used when invoking the CreateItemAtIndex service. */
    "CreationIndex"?: INTEGER | BindingTarget<INTEGER>;


    /** Optional. If bound, this item UID is used when invoking the DeleteItem service. */
    "DeletionUID"?: ANYSCALAR | BindingTarget<ANYSCALAR>;


    /** Optional. If specified, this mashup is used for cells that are being edited. */
    "CellMashupNameEditing"?: MASHUPNAME;


    /** Optional. If specified, this is the mashup parameter that will receive the editing state of the mashup. */
    "CellMashupEditingParameter"?: STRING;


    /** Requires setting a data shape. Can be enabled to cause collection view to start with an empty data set. */
    "EmptyDataSetOnStartup"?: BOOLEAN;


    /** If enabled, the collection view will use iOS/macOS style scrollbars when running on desktop Windows browsers. */
    "UseCustomScrollerOnWindowsDesktops"?: BOOLEAN;


    /** If enabled, the collection will use the custom scroller on iOS even when not running in web-app mode */
    "AlwaysUseCustomScrollerOniOS"?: BOOLEAN;


    /** The percentage of frame size to use when computing a new off-screen buffer size. Higher values will cause more off-screen elements to be rendered which decreases the flicker at high scrolling speeds. Lower values decrease the number of off-screen elements and should be used to reduce the jitter on iOS when complex layouts that reflow often are used as cell contents (such as cells with many gauges). */
    "OffScreenBufferFactor"?: NUMBER;


    /** If enabled, the collection view will use an experimental faster widget creation method. */
    "[Experimental] Fast widget append"?: BOOLEAN;


    /** If enabled, the collection view will invoke resize on responsive widgets. */
    "HandlesResponsiveWidgets"?: BOOLEAN;


    /** If enabled, the collection view will invoke resize on responsive widgets during animations. */
    "HandlesResponsiveWidgetsImmediately"?: BOOLEAN;
    

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


    /** Triggered whenever the return key is pressed while a cell is highlighted. */
    "ReturnPressed"?: ServiceBindingTarget[];


    /** Triggered whenever the return key is pressed while a cell is highlighted. */
    "SpacebarPressed"?: ServiceBindingTarget[];


    /** Triggered whenever collection view accepts items from another collection view. */
    "CollectionViewDidAcceptDroppedItems"?: ServiceBindingTarget[];


    /** Triggered whenever collection view moves items from a drag & drop operation. */
    "CollectionViewDidMoveItems"?: ServiceBindingTarget[];


    /** Triggered whenever collection view removes items from a drag & drop operation. */
    "CollectionViewDidRemoveItems"?: ServiceBindingTarget[];


    /** Triggered whenever collection view begins a drag & drop operation. The event fields will be populated with the value of the cell that was used to initiate this operation. */
    "CollectionViewWillBeginInteractiveMovement"?: ServiceBindingTarget[];


    /** Triggered whenever collection view begins a drag & drop operation. The event fields will be populated with the value of the cell that was used to initiate this operation. */
    "CollectionViewDidFinishInteractiveMovement"?: ServiceBindingTarget[];


    /** Triggered when the scroll position approaches the end of the data set. */
    "CollectionViewWillApproachDataSetEnd"?: ServiceBindingTarget[];


    /** Triggered when the scroll position reaches the end of the data set. */
    "CollectionViewDidReachDataSetEnd"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceBMCollectionView<A, G>
}

declare type BMCollectionViewEventDataInterface<T> = {[K in keyof T & string as `Event:${K}`]?: BindingTarget<T[K]>};

declare type UIOutputInterfaceBMCollectionView<A,G> = ToBindingTarget<G> & BMCollectionViewEventDataInterface<A> & {
    
    /** User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space. */
    CustomClass: BindingTarget<STRING>;


    /** Represents the data source of this collection view. Whenever the data is updated, either through drag & drop, deleting, inserting or modifying mashup parameters, this property will contain the updated data. */
    Data: BindingTarget<INFOTABLE<A>>;


    /** Represents the number of items currently in the data set. */
    DataCurrentSize: BindingTarget<NUMBER>;


    /** When set to true, collection view will no longer trigger the events for approaching the end of the current data set. */
    HasCompleteDataSet: BindingTarget<BOOLEAN>;


    /** Will be set to true whenever the multiple selection mode is active. */
    CellMultipleSelectionModeEnabled: BindingTarget<BOOLEAN>;


    /** Will be set to true whenever there is at least one selected cell in this collection view. */
    HasSelectedCells: BindingTarget<BOOLEAN>;


    /** Contains the number of selected cells in the collection view. */
    SelectedCellsCount: BindingTarget<INTEGER>;


    /** Should be invoked to cause the collection view to deselect all rows from its data set. */
    Deselect: ServiceBindingTarget;


    /** Should be invoked to cause the collection view to select all rows in its data set. */
    SelectAll: ServiceBindingTarget;


    /** Should be invoked to cause the collection view to acquire keyboard focus. */
    AcquireFocus: ServiceBindingTarget;


    /** Should be invoked to cause the collection view to resign keyboard focus. */
    ResignFocus: ServiceBindingTarget;


    /** Should be invoked to cause the collection view to invalidate its layout. */
    InvalidateLayout: ServiceBindingTarget;


    /** When invoked, the collection view will add an item to the beginning of the data set. If sections are defined, the item will belong to an empty section. */
    CreateItemAtBeginning: ServiceBindingTarget;


    /** When invoked, the collection view will add an item to the end of the data set. If sections are defined, the item will belong to an empty section. */
    CreateItemAtEnd: ServiceBindingTarget;


    /** When invoked, the collection view will add an item a specific index of the data set. The index is specified by setting or binding the 'CreationIndex' property. If sections are defined, the item will belong to an empty section. */
    CreateItemAtIndex: ServiceBindingTarget;


    /** When invoked, the collection view will delete a specific item from the data set. The item is specified by setting or binding the 'DeletionUID' property. */
    DeleteItem: ServiceBindingTarget;


    /** Must be used with CellMultipleSelectionType set to Selection Mode. When invoked, the collection view enter selection mode and allow cells to be selected. */
    BeginSelectionMode: ServiceBindingTarget;


    /** Must be used with CellMultipleSelectionType set to Selection Mode. When invoked, the collection view exit selection mode, deselect all cells and prevent further cells from being selected. */
    FinishSelectionMode: ServiceBindingTarget
}

declare function BMCollectionView<A, G, M extends MASHUPNAME, H extends MASHUPNAME, F extends MASHUPNAME, S extends string>(props: UIInputInterfaceBMCollectionView<A, G, M, H, F, S>): UIOutputInterfaceBMCollectionView<A, G>

            
declare interface UIInputInterfaceCollectionViewMenuController extends UIBaseInputInterface {
    
    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** If set to a string-based state definition, this will be the cell menu that appears when sliding over the cells. On devices without a touch interface, this menu can be displayed by right-clicking on the cells. */
    "CellSlideMenu"?: STATEDEFINITION;


    /**  */
    "_MenuDefinition"?: STRING;


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


    ref?: UIOutputInterfaceCollectionViewMenuController
}

declare class UIOutputInterfaceCollectionViewMenuController {
    
    /** Should be invoked to collapse this cell's menu, if it was opened. */
    CollapseMenu: ServiceBindingTarget;


    /** Should be invoked to expand this cell's menu, if it was opened. */
    ExpandMenu: ServiceBindingTarget;


    /** Should be invoked to toggle this cell's menu. */
    ToggleMenu: ServiceBindingTarget
}

declare function CollectionViewMenuController(props: UIInputInterfaceCollectionViewMenuController): UIOutputInterfaceCollectionViewMenuController


declare interface UIInputInterfaceCollectionViewSelectionController {
    
    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
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


    ref?: UIOutputInterfaceCollectionViewSelectionController
}

declare class UIOutputInterfaceCollectionViewSelectionController {
    
    /** Should be invoked to deselect this cell, if it was selected. */
    DeselectCell: ServiceBindingTarget;


    /** Should be invoked to select this cell, if it was deselected. */
    SelectCell: ServiceBindingTarget;


    /** Should be invoked to toggle this cell's selection. */
    ToggleSelection: ServiceBindingTarget
}

declare function CollectionViewSelectionController(props: UIInputInterfaceCollectionViewSelectionController): UIOutputInterfaceCollectionViewSelectionController

            
declare interface UIInputInterfaceCollectionViewEditingController {
    
    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
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


    ref?: UIOutputInterfaceCollectionViewEditingController
}

declare class UIOutputInterfaceCollectionViewEditingController {
    
    /** Begins editing the object associated with this cell. */
    BeginEditing: ServiceBindingTarget;


    /** Finishes editing the object associated with this cell. */
    FinishEditing: ServiceBindingTarget
}

declare function CollectionViewEditingController(props: UIInputInterfaceCollectionViewEditingController): UIOutputInterfaceCollectionViewEditingController

            
declare interface UIInputInterfaceBMCodeHost {
    
    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** This script's title, which will appear in the browser's debug sources. */
    "Title"?: STRING;


    /** The scope in which this script be evaluated. Global is the global scope, local is the widget scope. Local scope is required to use properties, events and services. */
    "Scope"?: STRING<"global" | "local">;


    /**  */
    "DirectLinkUUID"?: STRING;


    /** Hidden property used to remember the scroll position */
    "ScrollPosition"?: NUMBER;


    /** Hidden property used to remember the scroll position */
    "ColumnPosition"?: NUMBER;


    /**  */
    "Code"?: STRING;


    /**  */
    "RuntimeProperties"?: STRING;


    /** Show a spinner icon when data is being loaded */
    "ShowDataLoading"?: BOOLEAN;


    /**  */
    "FullScreen"?: BOOLEAN;


    /**  */
    "Exports"?: STRING;


    /**  */
    "_Left"?: NUMBER;


    /**  */
    "_Top"?: NUMBER;


    /**  */
    "_Width"?: NUMBER;


    /**  */
    "_Height"?: NUMBER;


    /**  */
    "_NavigationWidth"?: NUMBER;


    /**  */
    "_PropertiesWidth"?: NUMBER;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


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


    ref?: UIOutputInterfaceBMCodeHost
}

declare class UIOutputInterfaceBMCodeHost {
    
}

declare function BMCodeHost(props: UIInputInterfaceBMCodeHost): UIOutputInterfaceBMCodeHost

            
declare interface UIInputInterfaceBMCSSHost {
    
    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** This script's title, which will appear in the browser's debug sources. */
    "Title"?: STRING;


    /** Requires the BMDebugger entities and extensions. If enabled, changes to this CSS widget will automatically update the mashup. */
    "DirectLink"?: BOOLEAN;


    /**  */
    "DirectLinkUUID"?: STRING;


    /** Hidden property used to remember the scroll position */
    "ScrollPosition"?: NUMBER;


    /** Hidden property used to remember the scroll position */
    "ColumnPosition"?: NUMBER;


    /**  */
    "Code"?: STRING;


    /** Show a spinner icon when data is being loaded */
    "ShowDataLoading"?: BOOLEAN;


    /**  */
    "FullScreen"?: BOOLEAN;


    /**  */
    "Exports"?: STRING;


    /**  */
    "_Left"?: NUMBER;


    /**  */
    "_Top"?: NUMBER;


    /**  */
    "_Width"?: NUMBER;


    /**  */
    "_Height"?: NUMBER;


    /**  */
    "_NavigationWidth"?: NUMBER;


    /**  */
    "_PropertiesWidth"?: NUMBER;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


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


    ref?: UIOutputInterfaceBMCSSHost
}

declare class UIOutputInterfaceBMCSSHost {
    
}

declare function BMCSSHost(props: UIInputInterfaceBMCSSHost): UIOutputInterfaceBMCSSHost

            
declare interface UIInputInterfaceBMTypescriptHost {
    
    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** This script's title, which will appear in the browser's debug sources. */
    "Title"?: STRING;


    /** The scope in which this script be evaluated. Global is the global scope, local is the widget scope. Local scope is required to use properties, events and services. */
    "Scope"?: STRING<"global" | "local">;


    /**  */
    "DirectLinkUUID"?: STRING;


    /** Hidden property used to remember the scroll position */
    "ScrollPosition"?: NUMBER;


    /** Hidden property used to remember the scroll position */
    "ColumnPosition"?: NUMBER;


    /**  */
    "Code"?: STRING;


    /**  */
    "RuntimeProperties"?: STRING;


    /** Show a spinner icon when data is being loaded */
    "ShowDataLoading"?: BOOLEAN;


    /**  */
    "FullScreen"?: BOOLEAN;


    /**  */
    "Exports"?: STRING;


    /**  */
    "_Left"?: NUMBER;


    /**  */
    "_Top"?: NUMBER;


    /**  */
    "_Width"?: NUMBER;


    /**  */
    "_Height"?: NUMBER;


    /**  */
    "_NavigationWidth"?: NUMBER;


    /**  */
    "_PropertiesWidth"?: NUMBER;


    /**  */
    "TranspiledCode"?: STRING;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


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


    ref?: UIOutputInterfaceBMTypescriptHost
}

declare class UIOutputInterfaceBMTypescriptHost {
    
}

declare function BMTypescriptHost(props: UIInputInterfaceBMTypescriptHost): UIOutputInterfaceBMTypescriptHost

            
declare interface UIInputInterfaceBMTypescriptClassHost {
    
    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /**  */
    "DirectLinkUUID"?: STRING;


    /** Hidden property used to remember the scroll position */
    "ScrollPosition"?: NUMBER;


    /** Hidden property used to remember the scroll position */
    "ColumnPosition"?: NUMBER;


    /**  */
    "Code"?: STRING;


    /**  */
    "RuntimeProperties"?: STRING;


    /** Show a spinner icon when data is being loaded */
    "ShowDataLoading"?: BOOLEAN;


    /**  */
    "FullScreen"?: BOOLEAN;


    /**  */
    "Exports"?: STRING;


    /**  */
    "_Left"?: NUMBER;


    /**  */
    "_Top"?: NUMBER;


    /**  */
    "_Width"?: NUMBER;


    /**  */
    "_Height"?: NUMBER;


    /**  */
    "_NavigationWidth"?: NUMBER;


    /**  */
    "_PropertiesWidth"?: NUMBER;


    /**  */
    "TranspiledCode"?: STRING;


    /** The display name of the widget */
    "DisplayName"?: STRING;


    /** The description of the widget */
    "Description"?: STRING;


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


    ref?: UIOutputInterfaceBMTypescriptClassHost
}

declare class UIOutputInterfaceBMTypescriptClassHost {
    
}

declare function BMTypescriptClassHost(props: UIInputInterfaceBMTypescriptClassHost): UIOutputInterfaceBMTypescriptClassHost

            
declare interface UIInputInterfaceBMControllerSection {
    
    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
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


    ref?: UIOutputInterfaceBMControllerSection
}

declare class UIOutputInterfaceBMControllerSection {
    
    /** Resets all the contained widgets to their default values */
    ResetInputsToDefaultValue: ServiceBindingTarget
}

declare function BMControllerSection(props: UIInputInterfaceBMControllerSection): UIOutputInterfaceBMControllerSection

            
declare interface UIInputInterfaceBMMenuWidget<A> {
    
    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** The data source kind to use. */
    "dataSourceKind"?: STRING<"state" | "infotable">;


    /** When the data source is a state definition, this represents the menu to use for this popup menu. */
    "menuDefinition"?: STATEDEFINITION;


    /** When the data source is an infotable, this represents the menu to use for this popup menu. */
    "menu"?: BindingTarget<INFOTABLE<A>>;


    /** The field that represents the name of the menu entry. */
    "nameField"?: FIELDNAME<A>;


    /** The field that represents a submenu that can be opened for a menu item. */
    "submenuField"?: FIELDNAME<A>;


    /** The field that represents a CSS class that should be added to the menu item. */
    "classField"?: FIELDNAME<A>;


    /** Controls what area triggers the popup menu on right click. */
    "targetKind"?: STRING<"thisWidget" | "reference">;


    /** When the target is set to another widget, this represents the display name of the widget on which right-clicking will trigger the popup menu. */
    "targetWidget"?: STRING;


    /** One or more custom classes to add to the menu DOM node. */
    "menuClass"?: STRING | BindingTarget<STRING>;


    /** Controls how this menu appears. Automatic will choose the menu type based on the input method used to trigger it. */
    "displayMode"?: STRING<"auto" | "mouse" | "touch">;


    /** Controls whether long clicks should open the menu. */
    "triggerOnLongClick"?: BOOLEAN;


    /** Controls whether right clicks should open the menu. */
    "triggerOnRightClick"?: BOOLEAN;


    /**  */
    "_menuDefinition"?: STRING;


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


    /** Triggered when the user clicks on a menu item. */
    "menuDidSelectItem"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceBMMenuWidget<A>
}

declare class UIOutputInterfaceBMMenuWidget<A> {
    
    /** Represents the name of the menu item that was clicked */
    selectedMenuItem: BindingTarget<STRING>;


    /** Should be invoked to show the menu. It will be shown from the bottom-right corner of its target. */
    showMenu: ServiceBindingTarget
}

declare function BMMenuWidget<A>(props: UIInputInterfaceBMMenuWidget<A>): UIOutputInterfaceBMMenuWidget<A>

            
declare interface UIInputInterfaceBMControllerBase {
    
    /** The kind of anchor from which this controller will originate. */
    "anchorKind"?: STRING<"event" | "target" | "selector" | "widget" | "none">;


    /** The anchor */
    "anchor"?: STRING | BindingTarget<STRING>;


    /** The mashup displayed by this controller. */
    "mashupName"?: MASHUPNAME | BindingTarget<MASHUPNAME>;


    /** The controller's width. This takes effect the next time this controller's window is displayed. */
    "controllerWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** The controller's height. This takes effect the next time this controller's window is displayed. */
    "controllerHeight"?: NUMBER | BindingTarget<NUMBER>;


    /** If enabled, the controller can be dismissed using the escape key. */
    "dismissUsingEscapeKey"?: BOOLEAN;


    /** If enabled, the controller can be dismissed by clicking outside, if it is modal. */
    "dismissUsingOutsideClick"?: BOOLEAN;


    /** If enabled, the controller will match the system color scheme, otherwise it will always use a light color scheme. */
    "matchesSystemColorScheme"?: BOOLEAN;


    /**  */
    "_mashupFields"?: STRING;


    /** One or more custom classes to add to the controller DOM node. */
    "controllerClass"?: STRING | BindingTarget<STRING>;


    /** One or more custom classes to add to the controller overlay DOM node. */
    "overlayClass"?: STRING;


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


    /** Triggered when this controller closes. */
    "controllerDidClose"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceBMControllerBase
}

declare class UIOutputInterfaceBMControllerBase {
    
    /** Shows this controller. */
    bringToFront: ServiceBindingTarget;


    /** Dismisses this controller. */
    dismiss: ServiceBindingTarget
}

declare function BMControllerBase(props: UIInputInterfaceBMControllerBase): UIOutputInterfaceBMControllerBase

            
declare type UIInputInterfaceBMPopoverController<A extends MASHUPNAME> = UIBaseInputInterface & MashupParametersInputType<A> &  {
    
    /** The kind of anchor from which this controller will originate. */
    "anchorKind"?: STRING<"event" | "target" | "selector" | "widget" | "none">;


    /** The anchor */
    "anchor"?: STRING | BindingTarget<STRING>;


    /** The mashup displayed by this controller. */
    "mashupName"?: STRING<A> | BindingTarget<STRING<A>>;


    /** The controller's width. This takes effect the next time this controller's window is displayed. */
    "controllerWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** The controller's height. This takes effect the next time this controller's window is displayed. */
    "controllerHeight"?: NUMBER | BindingTarget<NUMBER>;


    /** If enabled, the controller can be dismissed using the escape key. */
    "dismissUsingEscapeKey"?: BOOLEAN;


    /** If enabled, the controller can be dismissed by clicking outside, if it is modal. */
    "dismissUsingOutsideClick"?: BOOLEAN;


    /** If enabled, the controller will match the system color scheme, otherwise it will always use a light color scheme. */
    "matchesSystemColorScheme"?: BOOLEAN;


    /**  */
    "_mashupFields"?: STRING;


    /** One or more custom classes to add to the controller DOM node. */
    "controllerClass"?: STRING | BindingTarget<STRING>;


    /** One or more custom classes to add to the controller overlay DOM node. */
    "overlayClass"?: STRING;


    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** Controls the minimum spacing between this popover and the viewport edges. */
    "edgeInsets"?: NUMBER;


    /** Controls the directions in which this popover's indicator is allowed to appear. */
    "permittedDirections"?: STRING;


    /** Controls how rounded the popover's corners should be. */
    "borderRadius"?: NUMBER;


    /** Controls the size of the popover indicator */
    "indicatorSize"?: NUMBER;


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


    /** Triggered when this controller closes. */
    "controllerDidClose"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceBMPopoverController<A>
}

declare type UIOutputInterfaceBMPopoverController<A extends MASHUPNAME> = MashupParametersOutputType<A> & {
    
    /** Shows this controller. */
    bringToFront: ServiceBindingTarget;


    /** Dismisses this controller. */
    dismiss: ServiceBindingTarget
}

declare function BMPopoverController<A extends MASHUPNAME>(props: UIInputInterfaceBMPopoverController<A>): UIOutputInterfaceBMPopoverController<A>;

            
declare type UIInputInterfaceBMWindowController<A extends MASHUPNAME> = UIBaseInputInterface & MashupParametersInputType<A> & {
    
    /** The kind of anchor from which this controller will originate. */
    "anchorKind"?: STRING<"event" | "target" | "selector" | "widget" | "none">;


    /** The anchor */
    "anchor"?: STRING | BindingTarget<STRING>;


    /** The mashup displayed by this controller. */
    "mashupName"?: STRING<A> | BindingTarget<STRING<A>>;


    /** The controller's width. This takes effect the next time this controller's window is displayed. */
    "controllerWidth"?: NUMBER | BindingTarget<NUMBER>;


    /** The controller's height. This takes effect the next time this controller's window is displayed. */
    "controllerHeight"?: NUMBER | BindingTarget<NUMBER>;


    /** If enabled, the controller can be dismissed using the escape key. */
    "dismissUsingEscapeKey"?: BOOLEAN;


    /** If enabled, the controller can be dismissed by clicking outside, if it is modal. */
    "dismissUsingOutsideClick"?: BOOLEAN;


    /** If enabled, the controller will match the system color scheme, otherwise it will always use a light color scheme. */
    "matchesSystemColorScheme"?: BOOLEAN;


    /**  */
    "_mashupFields"?: STRING;


    /** One or more custom classes to add to the controller DOM node. */
    "controllerClass"?: STRING | BindingTarget<STRING>;


    /** One or more custom classes to add to the controller overlay DOM node. */
    "overlayClass"?: STRING;


    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** Controls whether this window is modal. */
    "modal"?: BOOLEAN;


    /** Controls whether this window can be moved. */
    "movable"?: BOOLEAN;


    /** Controls whether this window can be resized. */
    "resizable"?: BOOLEAN;


    /** If enabled, the window will have a close button. */
    "closeButton"?: BOOLEAN;


    /** If enabled, the window will have a toggle full screen button. */
    "fullScreenButton"?: BOOLEAN;


    /** If enabled, the controller will be able to create multiple windows. */
    "multipleWindows"?: BOOLEAN;


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


    /** Triggered when this controller closes. */
    "controllerDidClose"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceBMWindowController<A>
}

declare type UIOutputInterfaceBMWindowController<A extends MASHUPNAME> = MashupParametersOutputType<A> & {
    
    /** Shows this controller. */
    bringToFront: ServiceBindingTarget;


    /** Dismisses this controller. */
    dismiss: ServiceBindingTarget
}

declare function BMWindowController<A extends MASHUPNAME>(props: UIInputInterfaceBMWindowController<A>): UIOutputInterfaceBMWindowController<A>;

            
declare interface UIInputInterfaceBMAlertController {
    
    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** The controller's title. */
    "title"?: STRING | BindingTarget<STRING>;


    /** A detailed description to display below the title. */
    "description"?: STRING | BindingTarget<STRING>;


    /** The label to use for the alert's confirmation button. */
    "confirmationButtonLabel"?: STRING | BindingTarget<STRING>;


    /** One or more custom classes to add to the controller DOM node. */
    "controllerClass"?: STRING | BindingTarget<STRING>;


    /** One or more custom classes to add to the controller overlay DOM node. */
    "overlayClass"?: STRING;


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


    /** Triggered when this controller closes. */
    "controllerDidClose"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceBMAlertController
}

declare class UIOutputInterfaceBMAlertController {
    
    /** Shows this controller. */
    bringToFront: ServiceBindingTarget;


    /** Dismisses this controller. */
    dismiss: ServiceBindingTarget
}

declare function BMAlertController(props: UIInputInterfaceBMAlertController): UIOutputInterfaceBMAlertController

            
declare interface UIInputInterfaceBMConfirmationController {
    
    /** The width of the widget */
    "Width"?: NUMBER;


    /** The height of the widget */
    "Height"?: NUMBER;


    /** The controller's title. */
    "title"?: STRING | BindingTarget<STRING>;


    /** A detailed description to display below the title. */
    "description"?: STRING | BindingTarget<STRING>;


    /** The label to use for the alert's confirmation button. */
    "confirmationButtonLabel"?: STRING | BindingTarget<STRING>;


    /** One or more custom classes to add to the controller DOM node. */
    "controllerClass"?: STRING | BindingTarget<STRING>;


    /** One or more custom classes to add to the controller overlay DOM node. */
    "overlayClass"?: STRING;


    /** The label to use for the confirmation's decline button. */
    "declineButtonLabel"?: STRING | BindingTarget<STRING>;


    /** Controls whether to display a cancel button, in addition to the confirm and decline buttons. */
    "showsCancelButton"?: BOOLEAN | BindingTarget<BOOLEAN>;


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


    /** Triggered when this controller closes. */
    "controllerDidClose"?: ServiceBindingTarget[];


    /** Triggered when the use selects the confirmation button. */
    "confirmed"?: ServiceBindingTarget[];


    /** Triggered when the use selects the cancel button. */
    "cancelled"?: ServiceBindingTarget[];


    /** Triggered when the use selects the decline button. */
    "declined"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceBMConfirmationController
}

declare class UIOutputInterfaceBMConfirmationController {
    
    /** Shows this controller. */
    bringToFront: ServiceBindingTarget;


    /** Dismisses this controller. */
    dismiss: ServiceBindingTarget
}

declare function BMConfirmationController(props: UIInputInterfaceBMConfirmationController): UIOutputInterfaceBMConfirmationController

            
declare interface UIInputInterfaceBMViewWidget {
    
    /** Total width of the widget */
    "Width"?: NUMBER;


    /** Total height of the widget */
    "Height"?: NUMBER;


    /** If set, this represents the CSS border radius that this view will use. */
    "BorderRadius"?: STRING;


    /** If set, this represents the CSS box shadow that this view will use. */
    "BoxShadow"?: STRING;


    /** If set, subviews will be clipped to this view's frame, otherwise they will be allowed to draw outside of this view. */
    "ClipsSubviews"?: BOOLEAN;


    /** The background style to use for this view. */
    "Style"?: STYLEDEFINITION | BindingTarget<STYLEDEFINITION>;


    /** The cursor to use for this view. */
    "Cursor"?: STRING<"auto" | "arrow" | "hand" | "ns-resize" | "ew-resize" | "row-resize" | "col-resize" | "move">;


    /** Should be enabled to cause the environment to switch to a right-to-left layout. */
    "RightToLeftLayout"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Represents the mashup from which this layout derives its layout variables. If left blank, this layout will not be able to use layout variables. If set, this must be a mashup whose root widget is a view that has the ExportsLayoutVariables property enabled. */
    "LayoutVariableProvider"?: MASHUPNAME;


    /** When enabled, this mashup becomes a layout variable provider for other mashups in this project. */
    "ExportsLayoutVariables"?: BOOLEAN;


    /**  */
    "_Constraints"?: STRING;


    /**  */
    "_IntrinsicSizeResistances"?: STRING;


    /**  */
    "_BindableConstraints"?: STRING;


    /**  */
    "_LayoutVariables"?: STRING;


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


    ref?: UIOutputInterfaceBMViewWidget
}

declare class UIOutputInterfaceBMViewWidget {
    
    /** Resets all the contained widgets to their default values */
    ResetInputsToDefaultValue: ServiceBindingTarget
}

declare function BMViewWidget(props: UIInputInterfaceBMViewWidget): UIOutputInterfaceBMViewWidget

            
declare interface UIInputInterfaceBMScrollViewWidget {
    
    /** Total width of the widget */
    "Width"?: NUMBER;


    /** Total height of the widget */
    "Height"?: NUMBER;


    /** If set, this represents the CSS border radius that this view will use. */
    "BorderRadius"?: STRING;


    /** If set, this represents the CSS box shadow that this view will use. */
    "BoxShadow"?: STRING;


    /** The background style to use for this view. */
    "Style"?: STYLEDEFINITION | BindingTarget<STYLEDEFINITION>;


    /** The cursor to use for this view. */
    "Cursor"?: STRING<"auto" | "arrow" | "hand" | "ns-resize" | "ew-resize" | "row-resize" | "col-resize" | "move">;


    /** Should be enabled to cause the environment to switch to a right-to-left layout. */
    "RightToLeftLayout"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Represents the mashup from which this layout derives its layout variables. If left blank, this layout will not be able to use layout variables. If set, this must be a mashup whose root widget is a view that has the ExportsLayoutVariables property enabled. */
    "LayoutVariableProvider"?: MASHUPNAME;


    /** When enabled, this mashup becomes a layout variable provider for other mashups in this project. */
    "ExportsLayoutVariables"?: BOOLEAN;


    /**  */
    "_Constraints"?: STRING;


    /**  */
    "_IntrinsicSizeResistances"?: STRING;


    /**  */
    "_BindableConstraints"?: STRING;


    /**  */
    "_LayoutVariables"?: STRING;


    /** The style to use for the scrollbar. */
    "ScrollbarStyle"?: STYLEDEFINITION;


    /** Only used if you have also set a scrollbar style. The style to use for the scrollbar track. */
    "ScrollbarTrackStyle"?: STYLEDEFINITION;


    /** Only used if you have also set a scrollbar style. The border radius to apply to the scrollbar, in pixels. */
    "ScrollbarBorderRadius"?: NUMBER;


    /** Only used if you have also set a scrollbar style. The width of the scrollbar, in pixels. */
    "ScrollBarTrackScrollbarWidthStyle"?: NUMBER;


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


    ref?: UIOutputInterfaceBMScrollViewWidget
}

declare class UIOutputInterfaceBMScrollViewWidget {
    
    /** Resets all the contained widgets to their default values */
    ResetInputsToDefaultValue: ServiceBindingTarget
}

declare function BMScrollViewWidget(props: UIInputInterfaceBMScrollViewWidget): UIOutputInterfaceBMScrollViewWidget

            
declare interface UIInputInterfaceBMLayoutGuideWidget {
    
    /** Total width of the widget */
    "Width"?: NUMBER;


    /** Total height of the widget */
    "Height"?: NUMBER;


    /** If set, this represents the CSS border radius that this view will use. */
    "BorderRadius"?: STRING;


    /** If set, this represents the CSS box shadow that this view will use. */
    "BoxShadow"?: STRING;


    /** If set, subviews will be clipped to this view's frame, otherwise they will be allowed to draw outside of this view. */
    "ClipsSubviews"?: BOOLEAN;


    /** The background style to use for this view. */
    "Style"?: STYLEDEFINITION | BindingTarget<STYLEDEFINITION>;


    /** The cursor to use for this view. */
    "Cursor"?: STRING<"auto" | "arrow" | "hand" | "ns-resize" | "ew-resize" | "row-resize" | "col-resize" | "move">;


    /** Should be enabled to cause the environment to switch to a right-to-left layout. */
    "RightToLeftLayout"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Represents the mashup from which this layout derives its layout variables. If left blank, this layout will not be able to use layout variables. If set, this must be a mashup whose root widget is a view that has the ExportsLayoutVariables property enabled. */
    "LayoutVariableProvider"?: MASHUPNAME;


    /** When enabled, this mashup becomes a layout variable provider for other mashups in this project. */
    "ExportsLayoutVariables"?: BOOLEAN;


    /**  */
    "_Constraints"?: STRING;


    /**  */
    "_IntrinsicSizeResistances"?: STRING;


    /**  */
    "_BindableConstraints"?: STRING;


    /**  */
    "_LayoutVariables"?: STRING;


    /** The initial left position of this layout guide. */
    "InitialPositionLeft"?: NUMBER;


    /** The initial top position of this layout guide. */
    "InitialPositionTop"?: NUMBER;


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


    ref?: UIOutputInterfaceBMLayoutGuideWidget
}

declare class UIOutputInterfaceBMLayoutGuideWidget {
    
}

declare function BMLayoutGuideWidget(props: UIInputInterfaceBMLayoutGuideWidget): UIOutputInterfaceBMLayoutGuideWidget

            
declare interface UIInputInterfaceBMAttributedLabelViewWidget {
    
    /** Total width of the widget */
    "Width"?: NUMBER;


    /** Total height of the widget */
    "Height"?: NUMBER;


    /** If set, this represents the CSS border radius that this view will use. */
    "BorderRadius"?: STRING;


    /** If set, this represents the CSS box shadow that this view will use. */
    "BoxShadow"?: STRING;


    /** If set, subviews will be clipped to this view's frame, otherwise they will be allowed to draw outside of this view. */
    "ClipsSubviews"?: BOOLEAN;


    /** The background style to use for this view. */
    "Style"?: STYLEDEFINITION | BindingTarget<STYLEDEFINITION>;


    /** The cursor to use for this view. */
    "Cursor"?: STRING<"auto" | "arrow" | "hand" | "ns-resize" | "ew-resize" | "row-resize" | "col-resize" | "move">;


    /** Should be enabled to cause the environment to switch to a right-to-left layout. */
    "RightToLeftLayout"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Represents the mashup from which this layout derives its layout variables. If left blank, this layout will not be able to use layout variables. If set, this must be a mashup whose root widget is a view that has the ExportsLayoutVariables property enabled. */
    "LayoutVariableProvider"?: MASHUPNAME;


    /** When enabled, this mashup becomes a layout variable provider for other mashups in this project. */
    "ExportsLayoutVariables"?: BOOLEAN;


    /**  */
    "_Constraints"?: STRING;


    /**  */
    "_IntrinsicSizeResistances"?: STRING;


    /**  */
    "_BindableConstraints"?: STRING;


    /**  */
    "_LayoutVariables"?: STRING;


    /** The CSS padding to use for the entire attributed label. */
    "Padding"?: STRING;


    /** The template of the string to display. */
    "Template"?: STRING | BindingTarget<STRING>;


    /** The line height to use for this view. */
    "LineHeight"?: STRING;


    /**  */
    "_Arguments"?: STRING;


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


    ref?: UIOutputInterfaceBMAttributedLabelViewWidget
}

declare class UIOutputInterfaceBMAttributedLabelViewWidget {
    
    /** The template string after filling in the arguments. */
    DisplayedString: BindingTarget<STRING>
}

declare function BMAttributedLabelViewWidget(props: UIInputInterfaceBMAttributedLabelViewWidget): UIOutputInterfaceBMAttributedLabelViewWidget

            
declare interface UIInputInterfaceBMTextFieldWidget<A> {
    
    /** The text within this text field. */
    "Value"?: STRING | BindingTarget<STRING>;


    /** An optional list of suggestions to use for autocompletion. */
    "Suggestions"?: BindingTarget<INFOTABLE<A>>;


    /** When suggestions are used, this represents the infotable field containing the suggestions. */
    "SuggestionField"?: FIELDNAME<A>;


    /** When enabled, the suggestions will be displayed in a drop down menu while the text field is focused. */
    "ShowsSuggestionsDropdown"?: BOOLEAN;


    /** When enabled, the closest suggestion will be automatically completed while the user types in the text field. */
    "AutoCompletes"?: BOOLEAN;


    /** When enabled, whenever this text field's value matches a suggestion, the row containing that suggestion will be selected. */
    "SelectsSuggestion"?: BOOLEAN;


    /** Total width of the widget */
    "Width"?: NUMBER;


    /** Total height of the widget */
    "Height"?: NUMBER;


    /** If set, this represents the CSS border radius that this view will use. */
    "BorderRadius"?: STRING;


    /** If set, this represents the CSS box shadow that this view will use. */
    "BoxShadow"?: STRING;


    /** If set, subviews will be clipped to this view's frame, otherwise they will be allowed to draw outside of this view. */
    "ClipsSubviews"?: BOOLEAN;


    /** The background style to use for this view. */
    "Style"?: STYLEDEFINITION | BindingTarget<STYLEDEFINITION>;


    /** The cursor to use for this view. */
    "Cursor"?: STRING<"auto" | "arrow" | "hand" | "ns-resize" | "ew-resize" | "row-resize" | "col-resize" | "move">;


    /** Should be enabled to cause the environment to switch to a right-to-left layout. */
    "RightToLeftLayout"?: BOOLEAN | BindingTarget<BOOLEAN>;


    /** Represents the mashup from which this layout derives its layout variables. If left blank, this layout will not be able to use layout variables. If set, this must be a mashup whose root widget is a view that has the ExportsLayoutVariables property enabled. */
    "LayoutVariableProvider"?: MASHUPNAME;


    /** When enabled, this mashup becomes a layout variable provider for other mashups in this project. */
    "ExportsLayoutVariables"?: BOOLEAN;


    /**  */
    "_Constraints"?: STRING;


    /**  */
    "_IntrinsicSizeResistances"?: STRING;


    /**  */
    "_BindableConstraints"?: STRING;


    /**  */
    "_LayoutVariables"?: STRING;


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


    /** Triggered upon the user pressing the return key. */
    "ReturnPressed"?: ServiceBindingTarget[];


    /** Triggered whenever the contents in this text field change for any reason. This will be repeatedly triggered while the user is typing. */
    "ContentsDidChange"?: ServiceBindingTarget[];


    /** Triggered whenever this text field acquires keyboard focus. */
    "TextFieldDidAcquireFocus"?: ServiceBindingTarget[];


    /** Triggered whenever this text field loses keyboard focus. */
    "TextFieldDidResignFocus"?: ServiceBindingTarget[];


    ref?: UIOutputInterfaceBMTextFieldWidget<A>
}

declare class UIOutputInterfaceBMTextFieldWidget<A> {
    
    /** The text within this text field. */
    Value: BindingTarget<STRING>
}

declare function BMTextFieldWidget<A>(props: UIInputInterfaceBMTextFieldWidget<A>): UIOutputInterfaceBMTextFieldWidget<A>

            
declare interface UIInputInterfaceBMKeyboardShortcutController {
    
    /** Total width of the widget */
    "Width"?: NUMBER;


    /** Total height of the widget */
    "Height"?: NUMBER;


    /** Controls where the keyboard shortcuts are installed. */
    "Target"?: STRING<"Document" | "Widget">;


    /** If the "Target" is set to "Widget" this is the display name of the widget that should recognize keyboard shortcuts. */
    "TargetWidget"?: STRING;


    /**  */
    "_KeyboardShortcutConfiguration"?: STRING;


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


    ref?: UIOutputInterfaceBMKeyboardShortcutController
}

declare class UIOutputInterfaceBMKeyboardShortcutController {
    
    /** Causes the widget receiving keyboard shortcuts to acquire keyboard focus. */
    AcquireFocus: ServiceBindingTarget;


    /** Causes the widget receiving keyboard shortcuts to resign keyboard focus. */
    ResignFocus: ServiceBindingTarget
}

declare function BMKeyboardShortcutController(props: UIInputInterfaceBMKeyboardShortcutController): UIOutputInterfaceBMKeyboardShortcutController
