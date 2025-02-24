"use strict";

/**
 * import
 */

import { addEventOnElements } from "./utils/event.js";



export const segment = function(segment , callback){

    const segmentBtns = document.querySelectorAll("[data-segment-btn]");

    let lastSelectedSegmentBtn = segment.querySelector("[data-segment-btn].selected");

    addEventOnElements(segmentBtns , 'click' , function(){
        lastSelectedSegmentBtn.classList.remove("selected");
        this.classList.add("selected");

        lastSelectedSegmentBtn = this;
        callback(this.dataset.segmentValue);
    });
};