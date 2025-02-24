"use strict";

/**
 * import
 */
import { menu } from "./menu.js";

/**
 * Add filter functionality
 * @param {Node} $filterWrapper Filter wrapper
 * @param {object} filterObj Filter obj
 * @param {Function} callback callback function
 */
export const filter = ($filterWrapper , filterObj , callback) =>{

    const $filterClearBtn = $filterWrapper.querySelector("[data-filter-clear]");
    const $filterValue = $filterWrapper.querySelector("[data-filter-value]");
    const $filterChip = $filterWrapper.querySelector("[data-filter-chip]");
    const $filterColorField = $filterWrapper.querySelector("[data-color-field]");
    const filterKey = $filterWrapper.dataset.filter; //store the keys like (orientation , size)

    const newObj = filterObj; //filter obj is a global variable 

    menu($filterWrapper , (filterValue) => {

        $filterValue.innerText = filterValue; //set the value to the selected value
        $filterChip.classList.add("selected");

        newObj[filterKey] = filterValue;


        callback(newObj);
    });


    //add event on close btn
    $filterClearBtn.addEventListener("click" , ()=>{

        $filterChip.classList.remove("selected");
        $filterValue.innerText = $filterValue.dataset.filterValue;

        delete newObj[filterKey];

        callback(newObj);
    });

    //add event on color
    $filterColorField?.addEventListener("change" , function(){

        const filterValue = this.value.toLowerCase();

        $filterValue.innerText = filterValue;
        $filterChip.classList.add("selected");

        newObj[filterKey] = filterValue;

        callback(newObj);
    })

};