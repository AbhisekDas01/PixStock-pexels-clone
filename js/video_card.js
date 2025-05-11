"use strict";

/**
 * import
 */

import { ripple } from "./utils/ripple.js";
import { favorite } from "./favorite.js";
import { hoverOnPlay } from "./utils/hoverOnPlay.js";

/**
 * crete videoCard
 */

export const videoCard = function(video){    const root = "/PixStock-pexels-clone";

    const {
        height,
        width,
        id,
        image,
        video_files
    } = video;

    //extract sd videos
    const sdVideo = video_files.find(item => item.quality === "sd" && item.width < 1000);

    // console.log(sdVideo);


    const {file_type , link} = sdVideo;
    

    const $card = document.createElement("div");
    $card.classList.add("card" , "grid-item" , "video");


    const favoriteObj = JSON.parse(window.localStorage.getItem("favorite"));

    $card.innerHTML = `
        <div class="card-banner" style="--width: ${width}; --height: ${height};">

            <video poster="${image}"  muted loop   class="img-cover" preload="none" data-video>

                <source src="${link}" type="${file_type}">

            </video>
        </div>        <div class="card-content">
             <button class="icon-btn small ${favoriteObj.videos[id] ? "active" : ""}" aria-label="Add to favorite" data-ripple data-favorite-btn >
                <span class="material-symbols-outlined" aria-hidden="true">favorite</span>

                <div class="state-layer"></div>
            </button>
        </div>

        <a href="${root}/pages/videos/video_detail.html?id=${id}" class="state-layer"></a>

            <div class="state-layer"></div>
        </button>
        </div>

        <span class="card-badge" data-card-badge>
            <span class="material-symbols-outlined" aria-hidden="true">play_arrow</span>
        </span>

        <a href="${root}/pages/videos/video_detail.html?id=${id}" class="state-layer"></a

    `;

    const rippleElements = [$card , $card.querySelector("[data-ripple]")];

    rippleElements.forEach(rippleEle => ripple(rippleEle));

    const favoriteBtn = $card.querySelector("[data-favorite-btn]");

    favorite(favoriteBtn , "videos" , id);

    hoverOnPlay($card);

    return $card;

}