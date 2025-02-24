
"use strict";

/**
 * import
 */

import {client} from "../../js/api_configure.js";
import {gridInit , updateGrid} from "../../js/utils/masonry_grid.js";
import {videoCard} from "../../js/video_card.js";
import {updateUrl} from "../../js/utils/updateUrl.js";
import {urlDecode} from "../../js/utils/urlDecode.js";
import { filter } from "../../js/filter.js";


/**
 * show filter bar if searched anything
 */

const $filterBar = document.querySelector("[data-filter-bar]");

$filterBar.style.display = window.location.search ? "flex" : "none";

/**
 * filter functionality
 */

const $filterWrappers = document.querySelectorAll("[data-filter]");

$filterWrappers.forEach($filterWrapper =>{

    filter($filterWrapper , window.filterObj , (newObj) =>{

        // console.log(newObj);
        window.filterObj = newObj;
        updateUrl(newObj , "videos"); //this will update the url according to the newobj
    });
});




/**
 * render the popular or search videos
 */

const $videoGrid = document.querySelector("[data-video-grid]");
const $title = document.querySelector("[data-title]");
const videoGrid = gridInit($videoGrid);
const perPage = 30;
let currentPage = 1;
let totalPage = 0;
const searchUrl = window.location.search.slice(1);

let searchObj;

if(searchUrl){
    searchObj = urlDecode(searchUrl);
}

const title = searchObj ? `${searchObj.query} videos` : "Popular videos";

//update titles
$title.textContent = title;
document.title = title;

/**
 * Render all photos
 * @param {Number} currentPage page number
 */

const renderVideos = function(currentPage){

    client.videos[searchObj ? "search" : "popular"]({...searchObj , per_page: perPage , page:currentPage} , (data) =>{


        // console.log(data);

        totalPage = Math.ceil(data.total_results / perPage);

        data.videos.forEach(video => {

            // console.log(video);
            const $videoCard = videoCard(video);

            updateGrid($videoCard , videoGrid.columsHeight , videoGrid.$colums);
            
        });

        //when videos are loaded
        isLoaded = true;

        //if no more photos found
        if(currentPage >= totalPage) $loader.style.display = "none";



    });

}

renderVideos(currentPage);

/**
 * load more videos
 */

const $loader = document.querySelector("[data-loader]");

let isLoaded = true;

window.addEventListener("scroll" , function(){

    //if the loading icon appers in the 2X distance of window height the it will render more photos 

    if($loader.getBoundingClientRect().top < (window.innerHeight*2) && currentPage <= totalPage && isLoaded){

        currentPage++;

        renderVideos(currentPage);

        isLoaded = false;
    }
});





