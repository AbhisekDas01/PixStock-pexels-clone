"use strict";

/**
 * import
 */

import { ripple } from "./utils/ripple.js";
import { addEventOnElements } from "./utils/event.js";
import { urlDecode } from "./utils/urlDecode.js";


/**
 * Header on-scroll state
 */

const $header = document.querySelector("[data-header]");

window.addEventListener('scroll' , ()=>{
    $header.classList[window.scrollY > 50? "add" : "remove"]("active");
});

/**
 * Add ripple effect
 */

const rippleElements = document.querySelectorAll("[data-ripple]");

rippleElements.forEach(Element =>ripple(Element));


/**
 * nav bar toogle for mobile devices
 */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");

const navBar = document.querySelector("[data-navigation]");

const scrim = document.querySelector("[data-scrim]");

addEventOnElements(navTogglers , 'click' , () => {
    navBar.classList.toggle("show");
    scrim.classList.toggle("active");
})


/**
 * filterObj declaration
 */

window.filterObj = {};

/**
 * show all filterated option after reload
 */

if(window.location.search.slice(1)){

    const search = urlDecode(window.location.search.slice(1));

    Object.entries(search).forEach(item => {

        const filterKey = item[0];
        const filterValue = item[1];

        window.filterObj[filterKey] = filterValue;

        // console.log( filterKey," ",filterValue);
        

        //if the filter key is not the searched element
        if(filterKey !=="query"){

            const $filterItem = document.querySelector(`[data-filter="${filterKey}"]`);

            // console.log($filterItem);

            $filterItem?.querySelector("[data-filter-chip]").classList.add("selected");

            if($filterItem) {
                $filterItem.querySelector("[data-filter-value]").innerText = filterValue;
            }
        }
    });
}


/**
 * initial favorite object in local storate 
 */

if(!window.localStorage.getItem("favorite")){

    const favoriteObj = {
        photos: {},
        videos: {}
    }

    window.localStorage.setItem("favorite" , JSON.stringify(favoriteObj));
}


/**
 * page transition
 */

window.addEventListener("loadstart", function () {
    document.body.style.opacity = "0";
  });
  
  window.addEventListener("DOMContentLoaded", function () {
    document.body.style.opacity = "1";
  });
