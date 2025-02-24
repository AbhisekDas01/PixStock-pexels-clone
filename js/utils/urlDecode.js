"use strict";

/**
 * convert url to object
 * @param {string} urlString url string
 * @returns {object} 
 */
export const urlDecode = (urlString) =>{

    return Object.fromEntries(urlString.replace(/%23/g , '#').replace(/%20/g , " ").split("&").map(i => i.split("=")));
}