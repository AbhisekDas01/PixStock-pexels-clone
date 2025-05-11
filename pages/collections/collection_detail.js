"use strict";


/**
 * import
 */

import {client} from "/PixStock-pexels-clone/js/api_configure.js";
import {gridInit , updateGrid} from "/PixStock-pexels-clone/js/utils/masonry_grid.js";
import {photoCard} from "/PixStock-pexels-clone/js/photo_card.js";
import {videoCard} from "/PixStock-pexels-clone/js/video_card.js";
import {urlDecode} from "/PixStock-pexels-clone/js/utils/urlDecode.js";


/**
 * render collection media
 */

const $collectionGrid = document.querySelector("[data-collection-grid]");
const $title = document.querySelector("[data-title]");

const collectionGrid = gridInit($collectionGrid);
const perPage = 30;
let currentPage = 1;
let totalPage = 0;


const collectionObj = urlDecode(window.location.search.slice(1));

console.log(collectionObj);


$title.textContent = `${decodeURIComponent(collectionObj.title)} collections`;

document.title = `${decodeURIComponent(collectionObj.title)} collections`;



const loadCollection = function(page){
    console.log('Loading collection page:', page);
    console.log('Collection ID:', collectionObj.collectionId);

    client.collections.detail(collectionObj.collectionId , {per_page: perPage , page: page}, (data) =>{
        console.log('Collection data received:', data);

        if (!data || !data.media) {
            console.error('No media data found');
            $loader.style.display = "none";
            return;
        }

        totalPage = Math.ceil(data.total_results/ perPage);data.media.forEach(item => {
            let $card;
            
            // Check if the item has video_files to determine if it's a video
            if (item.video_files) {
                $card = videoCard(item);
            } else {
                $card = photoCard(item);
            }
            updateGrid($card , collectionGrid.columsHeight , collectionGrid.$colums);

        
        });

        //when photos are loaded
        isLoaded = true;

        //if no more photos found
        if(currentPage >= totalPage) $loader.style.display = "none";
      

      
        
    })
}

loadCollection(currentPage);


const $loader = document.querySelector("[data-loader]");

let isLoaded = true;

window.addEventListener("scroll" , function(){

    //if the loading icon appers in the 2X distance of window height the it will render more photos
    
    if($loader.getBoundingClientRect().top < (window.innerHeight*2) && currentPage <= totalPage && isLoaded){

        
        currentPage++;

        // console.log(currentPage);
        

        loadCollection(currentPage);

        isLoaded = false;

        // console.log(isLoaded);
        
    }
});




