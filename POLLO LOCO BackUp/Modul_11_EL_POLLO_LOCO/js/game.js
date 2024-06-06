let canvas;
let world
let isFullScreenBlocked = false;
let isFullscreen = false;
let startButton;
let restartButton;
let controlInfo;

function init() {
    canvas = document.getElementById('canvas');
    let keyboard = new Keyboard();
    world = new World(canvas, keyboard);
    startButton = document.getElementById('start-button');
    restartButton = document.getElementById('restart-button');
    controlInfo = document.getElementById('control-info');
}

/**
 * Toggles the game between fullscreen and windowed modes.
 */
function toggleFullscreen() {
    let fullscreen = document.getElementById('canvas-container');
    if (isFullscreen) {
        exitFullscreen();
    } else {
        enterFullscreen(fullscreen);
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.borderRadius = '0';
        if (window.innerHeight >= 500) {
            startButton.style.left = '45%';
            restartButton.style.left = '58%';
            controlInfo.style.left = '43%';
        }
    }
}

/**
 * Enters fullscreen mode for a specified element.
 * @param {HTMLElement} element - The HTML element to display in fullscreen mode.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
    isFullscreen = true;
}

/**
 * Event listener for the 'fullscreenchange' event.
 *
 * @param {Event} event - The event object.
 */
document.addEventListener('fullscreenchange', (event) => {
    if (!isFullScreenBlocked) {
        isFullScreenBlocked = true;
    } else {
        isFullScreenBlocked = false;
        exitFullscreen();
    }
});

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
    if ((document.fullscreenElement || document.webkitFullscreenElement) && (document.exitFullscreen || document.webkitExitFullscreen)) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
    isFullscreen = false;
    if (window.innerHeight >= 500) {
        canvas.style.borderRadius = '20px';
        restartButton.style.left = '44%';
        startButton.style.left = '35%';
        controlInfo.style.left = '30%';
    }
}

/**
 * Toggles the visibility of the control information.
 */
function toggleInfo() {
    let controlInfo = document.getElementById("control-info");

    if (controlInfo.style.display === "none" || controlInfo.style.display === "") {
        controlInfo.style.display = "block";
    } else {
        controlInfo.style.display = "none";
    }
}

/**
 * Handles the 'DOMContentLoaded' event to prevent context menu on images.
 */
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('img');

    images.forEach((img) => {
        img.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });
    });
});

/**
 * Changes the info view to the first page.
 */
function changeToFirstPage() {
    let firstPage = document.getElementById('first-page');
    let secondPage = document.getElementById('second-page');
    secondPage.innerHTML = '';
    firstPage.classList.remove('d-none');
}

/**
 * Changes the info view to the second page.
 */
function changeToSecondPage() {
    let firstPage = document.getElementById('first-page');
    let secondPage = document.getElementById('second-page');
    firstPage.classList.add('d-none');
    secondPage.innerHTML = /*html*/ `<p class="second-headline">Instructions</p><div class="story-text">Pepe can jump on the head of 
        the chickens and the chicks to 
        kill them. He can also kill them with the collected bottles. The final boss can be defeated with 
        several hits of the salsa bottles.</div><div class="back-box">
        <img src="./img/extern_imgs/back_arrow.png" alt="next-page-image"class="next-page-image" onclick="changeToFirstPage()">
        <div class="next-text">Back</div></div><div class="next-box"><div class="next-text">Next</div>
        <img src="./img/extern_imgs/forward_arrow.png" alt="next-page-image" class="next-page-image" onclick="changeToThirdPage()"></div>`;
}

/**
 * Changes the info view to the third page.
 */
function changeToThirdPage() {
    let secondPage = document.getElementById('second-page');
    secondPage.innerHTML = /*html*/ `<p class="second-headline">The Tales of the Chickens Rebellion</p><div class="story-text">
    The tranquil harmony between humans and chickens shattered when an enigmatic mutation infiltrated the nearby flocks, 
    rendering them defiant and formidable adversaries. Spearheaded by a colossal, 
    mutated rooster, the insurgent poultry wreaked havoc across the region. 
    Pepe stands as humanity's final beacon of hope....<br>
        <div class="back-box"><img src="./img/extern_imgs/back_arrow.png" 
        alt="next-page-image"class="next-page-image" onclick="changeToSecondPage()"><div class="next-text">Back</div></div>`;
}

