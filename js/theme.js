"use strict";

//select the html doc 

const $HTML = document.documentElement;

//get the current profile of the system theme
let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

//if the theme mode exists in the local storage
if(sessionStorage.getItem('theme')){
    $HTML.dataset.theme = sessionStorage.getItem("theme");
}
else{
    $HTML.dataset.theme = isDark? "dark" : "light";
}

//add event on the mode switch buttons 

const changeTheme = () =>{
    let currentTheme = sessionStorage.getItem("theme") || $HTML.dataset.theme;
    const mode = currentTheme === "dark" ? "light" : "dark";
    sessionStorage.setItem("theme" , mode);
    $HTML.dataset.theme = sessionStorage.getItem("theme");
}

window.addEventListener("load" , () =>{

    const themeBtn = document.querySelector("[data-theme-toggler]");

    themeBtn.addEventListener("click" , changeTheme);
})