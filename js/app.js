"use strict";

/**
 * import
 */

import { client } from "./api_configure.js";
import { photoCard } from "./photo_card.js";
import { gridInit , updateGrid } from "./utils/masonry_grid.js";
import { videoCard } from "./video_card.js";
import { collectionCard } from "./collection_card.js";

/**
 * render cureted photos in the home page
 */

const photoGrid = document.querySelector("[data-photo-grid]");

photoGrid.innerHTML = `<div class = "skeleton"></div>`.repeat(18);

client.photos.curated({page: 1 , per_page: 20} , (data) =>{

    // console.log(data.photos);
    photoGrid.innerHTML = "";

    const $photoGrid = gridInit(photoGrid);

    // console.log($photoGrid);
    
    
    data.photos.forEach(photo => {
        
        //create a card for each data 
        const card = photoCard(photo);
        // console.log(card);

        updateGrid(card , $photoGrid.columsHeight , $photoGrid.$colums);
    });

});


/**
 * render videos on home page 
 */

const $videoGrid = document.querySelector("[data-video-grid]");

$videoGrid.innerHTML = `<div class = "skeleton"></div>`.repeat(18);

client.videos.popular({per_page: 20} , (data) =>{

    $videoGrid.innerHTML = "";
    // console.log(data);
    const videoGrid = gridInit($videoGrid);

    data.videos.forEach(video => {

        const card = videoCard(video);

        updateGrid(card , videoGrid.columsHeight , videoGrid.$colums);
    });
    

    
});

/**
 * render collection in home page
 */

const $collectionGrid = document.querySelector("[data-collection-grid]");

client.collections.featured({per_page: 18} , (data) =>{

    // console.log(data);

    data.collections.forEach(collection => {

        const $collectionCard = collectionCard(collection);

        $collectionGrid.appendChild($collectionCard);

    });

})




