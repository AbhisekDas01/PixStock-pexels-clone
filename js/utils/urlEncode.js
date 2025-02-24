"use strict";

/**
 * url encoder 
 * @param {object} urlObj 
 * @returns Object.entries(urlObj).join("&").replace(/,/g,"=").replace(/#/g,"%23");
 */
export const urlEncode = (urlObj) =>{

    //Object.entries(urlObj) converts an object into an array of key-value pairs.
    return Object.entries(urlObj).join("&").replace(/,/g,"=").replace(/#/g,"%23");
    //To replace all occurrences, use a regular expression with the global (/g) flag.
}