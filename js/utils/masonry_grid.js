"use strict";

/**
 * initial colums
 * @param {node} gridContainer grid container
 * @returns {object} colums & colums height array
 */
export const gridInit = function(gridContainer){

    const $colums = []; // Array to store column elements
    const columsHeight = []; // Array to store the height of each column

    // Get the number of columns from the CSS property
    const columsCount = Number(getComputedStyle(gridContainer).getPropertyValue("--column-count"));

    // Create the specified number of columns
    for(let i = 0 ; i < columsCount ; i++){

        const $column = document.createElement("div"); // Create a new div element for the column

        $column.classList.add("column"); // Add the "column" class to the div

        gridContainer.appendChild($column); // Append the column to the grid container

        $colums.push($column); // Add the column to the $colums array
        columsHeight.push(0); // Initialize the height of the column to 0
        
    }

    return {$colums , columsHeight}; // Return the columns and their heights
    
}


/**
 * 
 * @param {Node} card Grid item
 * @param {Array} columsHeight Height of all colums
 * @param {NodeList} $colums All columns
 */
export const updateGrid = function(card , columsHeight , $colums) {

    // console.log(card);


    const minColumnHeight = Math.min(...columsHeight); // Find the minimum column height

    const minColumnIndex = columsHeight.indexOf(minColumnHeight); // Find the index of the column with the minimum height

    $colums[minColumnIndex].appendChild(card); // Append the card to the shortest column

    columsHeight[minColumnIndex] = $colums[minColumnIndex].offsetHeight; // Update the height of the column

}