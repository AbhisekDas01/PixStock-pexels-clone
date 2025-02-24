"use strict";


/**
 * Add event on elements
 * @param {NodeList} elements Elements list/array
 * @param {String}  eventType Event type eg . "click" 
 * @param {Function} callback callback function
 */
export const addEventOnElements = function(elements , eventType , callback){

    elements.forEach(element => {
        element.addEventListener(eventType , callback);
    });

}