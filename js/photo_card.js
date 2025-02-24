"use strict";

/**
 * import
 */

import { ripple } from "./utils/ripple.js";
import { favorite } from "./favorite.js";

/**
 * create photo card
 */

/**
 * 
 * @param {*} photo 
 */

export const photoCard = (photo) => {
    const root = window.location.origin;

    const {
        alt,
        avg_color: backdropcolor,
        height,
        width,
        id,
        src: {large}
    } = photo;

    
    const card = document.createElement("div");
    card.classList.add("card" , "grid-item");
    card.style.backgroundColor = backdropcolor;

    const favoriteObj = JSON.parse(window.localStorage.getItem("favorite"));



    card.innerHTML= `
     <figure class="card-banner" style="--width: ${width}; --height: ${height};">

        <img src="${large}" width="${width}" height="${height}" class="img-cover" alt="${alt}" loading="lazy">

    </figure>

    <div class="card-content">

        <button class="icon-btn small ${favoriteObj.photos[id] ? "active" : ""}" aria-label="Add to favorite" data-ripple data-favorite-btn >
            <span class="material-symbols-outlined" aria-hidden="true">favorite</span>

            <div class="state-layer"></div>
        </button>

    </div>

    <a href="${root}/pages/photos/photo_detail.html?id=${id}" class="state-layer"></a>
    `;

    const cardBanner = card.querySelector("img");
    cardBanner.style.opacity = 0;

    cardBanner.addEventListener("load" , function(){

        this.animate(
            {
                opacity: 1
            },{
                duration: 400 , 
                fill: "forwards"
            }
        )
    })

    const rippleElements = [card , card.querySelector("[data-ripple]")];

    rippleElements.forEach(rippleEle => ripple(rippleEle));

    const favoriteBtn = card.querySelector("[data-favorite-btn]");

    favorite(favoriteBtn , "photos" , id);

    return card;


}