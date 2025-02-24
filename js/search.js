"use strict";

/**
 * import
 */

import { ripple } from "./utils/ripple.js";
import { addEventOnElements } from "./utils/event.js";
import { segment } from "./segment_btn.js";
import { updateUrl } from "./utils/updateUrl.js";
import { urlDecode } from "./utils/urlDecode.js";


/**
 * Search view toggle in small device
 */

const searchTogglers = document.querySelectorAll("[data-search-toggler]");
const searchView = document.querySelector("[data-search-view]");

addEventOnElements(searchTogglers , 'click' , () => {
    searchView.classList.toggle("show");
})

/**
 * search clear button 
 */

const searchField = document.querySelector("[data-search-field]");
const searchClearBtn = document.querySelector("[data-search-clear-btn]");

searchClearBtn.addEventListener("click" , () =>{
    searchField.value = "";
});

/**
 * search type (image / video);
 */

const searchSegment = document.querySelector("[data-segment='search']");
const activeSegmentBtn = document.querySelector("[data-segment-btn].selected");

//searchType is a custom global variable stored in window 
//the searchType can be accessable is the workspace it helps in knowing what to get
window.searchType = activeSegmentBtn.dataset.segmentValue;

segment(searchSegment , (segmentValue) => {

    window.searchType = segmentValue; //store the current value for future value
    
});

/**
 * search submit
 */

const searchBtn = document.querySelector("[data-search-btn]");


searchBtn.addEventListener("click" , function() {
    const searchValue = searchField.value.trim(); //extract the search field value

    //if value is not empty
    if(searchValue){
        updateSearchHistory(searchValue);
        //filterObj is a user defined object of global variable
        window.filterObj.query  = searchValue;

        updateUrl(window.filterObj , window.searchType);
    }
    
});


/**
 * start search for the enter key form keyboard
 */

searchField.addEventListener("keydown" , (e) =>{
    if(e.key === "Enter" && searchField.value.trim()){
        searchBtn.click();
    }
});


/**
 * update search history
 */

//initial search history

let searchHistory = {items : []};

// if search history already exists in the local storage 
if(window.localStorage.getItem("search_history")){
    searchHistory = JSON.parse(window.localStorage.getItem("search_history"));
}else{
    window.localStorage.setItem("search_history" , JSON.stringify(searchHistory));
}

const updateSearchHistory = (searchValue) =>{
    
    /**
     * if the search value already exists in the history
     * then remove that history and add it to the front
     * to show in most recent search
     */
    if(searchHistory.items.includes(searchValue)){
        //find index
        const index = searchHistory.items.indexOf(searchValue);
        //splice(indextodelete , no of elements to delete)
        searchHistory.items.splice(index , 1);
    }

    //add the search value to the first index
    searchHistory.items.unshift(searchValue);

    window.localStorage.setItem("search_history" , JSON.stringify(searchHistory)
    );

}


/**
 * show the search histroy in search list
 */

const searchList = document.querySelector("[data-search-list]");

const historyLen = searchHistory.items.length;

for(let i = 0 ; i < Math.min(historyLen , 6) ; i++){

    const listItem = document.createElement("button");
    listItem.classList.add("list-item");

    listItem.innerHTML = `
        <span class="material-symbols-outlined leading-icon" aria-hidden="true">history</span>
                        
        <span class="body-large text">${searchHistory.items[i]}</span>

        <div class="state-layer"></div>
    `;

    ripple(listItem);

    listItem.addEventListener("click" , function(){
        searchField.value = this.children[1].textContent;
        searchBtn.click(); //automatically click the search btn
        
    });
    
    searchList.appendChild(listItem);
}


/**
 * show the searched item in photos title
 */

const search = urlDecode(window.location.search.slice(1));

if(search.query) {
    searchField.value = search.query;
}
