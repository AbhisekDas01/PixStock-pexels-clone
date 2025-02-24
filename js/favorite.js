"use strict";

/**
 * import
 */

import { client } from "./api_configure.js";

/**
 * add to favorite or remove form favorite
 * @param {Node} element element
 * @param {string} type item eg 'photos' ro 'videos'
 * @param {number} id item id
 */

export const favorite = (element , type , id) =>{

    element.addEventListener("click" , () =>{

        element.setAttribute("disabled" , ""); //disable the btn 

        const favoriteObj = JSON.parse(window.localStorage.getItem("favorite"));

        //if the element is already favorite then remove it
        if(favoriteObj[type][id]){

            element.classList.toggle("active");
            element.removeAttribute("disabled");

            //remove the entry form the obj
            delete favoriteObj[type][id];

            window.localStorage.setItem("favorite" , JSON.stringify(favoriteObj));
        }
        else{ //if element not exists then add it

            
            //get the details of the phots 
            client[type].detail(id , (data) => {

                element.classList.toggle("active");
                element.removeAttribute("disabled");

                favoriteObj[type][id] = data;

                window.localStorage.setItem("favorite" , JSON.stringify(favoriteObj));

            });
        }
    });
}