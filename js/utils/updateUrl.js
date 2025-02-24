"use strict";

/**
 * import
 */
import { urlEncode } from "./urlEncode.js";

/**
 * 
 * @param {Object} filterObj filter object
 * @param {string} searchType search type eg . 'videos' or 'photos'
 */
export const updateUrl = (filterObj , searchType) =>{

    setTimeout(() => {
        const root = window.location.origin; //it will give the origin url
        const searchQuery =   urlEncode(filterObj);

        window.location = `${root}/pages/${searchType}/${searchType}.html?${searchQuery}`; //update teh url
    } , 500);
}