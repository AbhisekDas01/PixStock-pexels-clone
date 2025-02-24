"use strict";

/**
 * Add ripple effect on an element
 * @param {node} rippleElement element for ripple effect
 */

export const ripple = function(rippleElement){

    rippleElement.addEventListener("pointerdown" , function(event){
        event.stopImmediatePropagation(); //stopImmediatePropagation() stops all other listeners on the same element from running.

        const $ripple = document.createElement("div");
        $ripple.classList.add("ripple");

        this.appendChild($ripple);

        const removeRipple = e =>{
            $ripple.animate({
                opacity: 0
            } , {
                fill:"forwards",
                duration: 200
            });

            setTimeout(() => {
                $ripple.remove(); //remove the node after 1sec
            }, 1000);
        }

        this.addEventListener("pointerup" , removeRipple);
        this.addEventListener("pointerleave" , removeRipple);


        //add long ripple effect to search history and segment buttons

        const isNotIconBtn = !this.classList.contains("icon-btn");

        if(isNotIconBtn){

            //find the ripple size
            const rippleSize = Math.max(this.clientWidth , this.clientHeight); //this will select the maximum among the h and w of the element

            //these 2 lines will the extract the exact position of the pointer and the effect will start from that position
            $ripple.style.top = `${event.layerY}px`;
            $ripple.style.left = `${event.layerX}px`;

            $ripple.style.width = `${rippleSize}px`;
            $ripple.style.height = `${rippleSize}px`;
        }
        
    });
}