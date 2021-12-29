/**
 * Describes a breakpoint locationr.
 */
 export interface Breakpoint {

    /** 
     * Start line of breakpoint location. 
     */
    line: number;

    /** 
     * Optional start column of breakpoint location. 
     */
    column?: number;

    /** 
     * Optional end line of breakpoint location if the location covers a range. 
     */
    endLine?: number;

    /** 
     * Optional end column of breakpoint location if the location covers a range. 
     */
    endColumn?: number;

    /**
     * A unique ID that identifies this breakpoint's location.
     */
    locationID: string;
}