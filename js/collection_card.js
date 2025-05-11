"use strict";


/**
 * import
 */
import { ripple } from "./utils/ripple.js";

/**
 * create collection card
 * @param {object} collection collection data
 * @returns {Node} after creating card
 */

export const collectionCard = function(collection){    const root = "/PixStock-pexels-clone";

    const {

        id,
        media_count,
        title
    } = collection;


    const $card = document.createElement("div");

    $card.classList.add("grid-card" , "list-item" ,"two-line");

    $card.setAttribute("title" , title); //sets the title for the card

    $card.innerHTML = `
    <div>
        <h3 class="body-large">${title}</h3>

        <p class="body-medium label">${media_count} media</p>
    </div>

    <a href="${root}/pages/collections/collection_detail.html?collectionId=${id}&title=${title}" class="state-layer"></a>                   
    `;

    ripple($card);


    return $card;

}