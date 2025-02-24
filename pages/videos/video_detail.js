"use strict";

/**
 * import
 */

import { client } from "../../js/api_configure.js";
import { ripple } from "../../js/utils/ripple.js";
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
const favoriteVideos = JSON.parse(window.localStorage.getItem("favorite")).videos;

const $favoriteBtn = document.querySelector("[data-add-favorite]");

// console.log(favoritePhotos);


//extract the photo id for the url
const videoId = window.location.search.split("=")[1];


// if the photo is already fav the show in the icon
$favoriteBtn.classList[favoriteVideos[videoId] ? "add" : "remove"]("active");


favorite($favoriteBtn , "videos" , videoId);


/**
 * Render details data
 */

const $detailWrapper = document.querySelector("[data-detail-wrapper]");

const $downloadLink = document.querySelector("[data-download-link]");

const $downloadMenu = document.querySelector("[data-download-menu]");

client.videos.detail(`${videoId}` , (data) =>{

    // console.log(data);

    const {
        height,
        width,
        image,
        user:{name: auther},
        video_files

    } = data;

    const hdVideo = video_files.find(item => item.quality === "hd");
    const {file_type , link} = hdVideo;


    $downloadLink.href = link;

    video_files.forEach( item => {

        // console.log(item);

        const {
            width,
            height,
            quality,
            link
        } = item

        
        $downloadMenu.innerHTML += `
        <a href="${link}" download class="menu-item" data-ripple data-menu-item >

            <span class="label-large text">${quality.toUpperCase()}</span>

            <span class="label-large trialing-text">${width}x${height}</span>

            <div class="state-layer"></div>
        </a>
        `;


    });

    // console.log($detailWrapper);

    $detailWrapper.innerHTML = `
    <div class="detail-banner" style="aspect-ratio: ${width} / ${height};">

        <video poster="${image}" class="img-cover" controls data-video>

            <source src="${link}" type="${file_type}">
        </video>
    </div>
    
    <p class="title-small">
        Video by <span class="color-primary">${auther}</span>

            
    `;

    
    
});













