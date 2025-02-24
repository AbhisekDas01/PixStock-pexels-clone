"use strict";

/**
 * import
 */

import { client } from "../../js/api_configure.js";
import { ripple } from "../../js/utils/ripple.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { photoCard } from "../../js/photo_card.js";
import { menu } from "../../js/menu.js";
import { favorite } from "../../js/favorite.js";


/**
 * Add ripple effect
 */

const rippleElements = document.querySelectorAll("[data-ripple]");

rippleElements.forEach(Element => ripple(Element));



/**
 * page transition
 */

window.addEventListener("loadstart", function () {
    document.body.style.opacity = "0";
});

window.addEventListener("DOMContentLoaded", function () {
    document.body.style.opacity = "1";
});


/**
 * menu toggle
 */


const $menuWrappers = document.querySelectorAll("[data-menu-wrapper]");

$menuWrappers.forEach($menuWrapper => {
    menu($menuWrapper);
});

/**
 * Add to favorite
 */

//extract the fav photos list
const favoritePhotos = JSON.parse(window.localStorage.getItem("favorite")).photos;

const $favoriteBtn = document.querySelector("[data-add-favorite]");

// console.log(favoritePhotos);


//extract the photo id for the url
const photoId = window.location.search.split("=")[1];


// if the photo is already fav the show in the icon
$favoriteBtn.classList[favoritePhotos[photoId] ? "add" : "remove"]("active");


favorite($favoriteBtn , "photos" , photoId);


/**
 * Render details data
 */

const $detailWrapper = document.querySelector("[data-detail-wrapper]");

const $downloadLink = document.querySelector("[data-download-link]");

const $downloadMenu = document.querySelector("[data-download-menu]");

client.photos.detail(`${photoId}` , (data) =>{

    // console.log(data);

    const {
        alt,
        photographer,
        avg_color,
        photographer_url,
        src,
        height,
        width,

    } = data;


    $downloadLink.href = src.original;

    Object.entries(src).forEach( item => {

        // console.log(item);

        const [key , value] = item;
        
        $downloadMenu.innerHTML += `
        <a href="${value}" download class="menu-item" data-ripple data-menu-item >

            <span class="label-large text">${key}</span>

            <div class="state-layer"></div>
        </a>
        `;


    });

    // console.log($detailWrapper);

    $detailWrapper.innerHTML = `
     <figure class="detail-banner img-holder" style="aspect-ratio: ${width} / ${height} ; background-color: ${avg_color}">

        <img src="${src.large2x}" width = "${width}" height = "${height}" alt="${alt}" class="img-cover">
        </figure>


        <p class="title-small">
        Photograph by <span class="color-primary">${photographer}</span>
        </p>

            
    `;

    const $detailImg =document.querySelector("img");

    $detailImg.style.opacity = "0";

    $detailImg.addEventListener("load" , function() {

        this.animate({
            opacity: 1
        } , {

            duration: 400,
            fill: "forwards"
        });
    });

    if(alt){

        client.photos.search({query: alt , page: 1 , per_page: 30} , (data)=>{

            loadSimilar(data);

        });

    }else{

        $loader.style.display = "none";
        $photoGrid.innerHTML = "<p>No similar photos found</p>"

    }
    
    
});

/**
 * load similar photos
 */

const $photoGrid = document.querySelector("[data-photo-grid]");



const photoGrid = gridInit($photoGrid);

const $loader = document.querySelector("[data-loader]");




const loadSimilar = function(data) {

    data.photos.forEach(photo =>{

        const $photoCard = photoCard(photo);

        updateGrid($photoCard , photoGrid.columsHeight , photoGrid.$colums);

    });

    $loader.style.display = "none";
}













