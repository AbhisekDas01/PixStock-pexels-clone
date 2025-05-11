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

    client.collections.detail(collectionObj.collectionId , {per_page: perPage , page: page}, (data) =>{

        // console.log(data);

        totalPage = Math.ceil(data.total_results/ perPage);

        data.media.forEach(item => {

            let $card;

            
            switch(item.type?.toLowerCase()){

                
                
                case "photo":
                    $card = photoCard(item);
                    break;
                case "video":
                    $card = videoCard(item);
                    break;  
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




