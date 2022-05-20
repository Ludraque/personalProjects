import {createMap, resizeMap} from "./maps.js";
import {createLaunchPads, drawLaunchPads, removeLaunchPads} from "./launchpads.js";
import {createLandPads, drawLandPads, removeLandPads} from "./landpads.js";
import {buildStats} from "./build-stats.js";
import {buildYears} from "./build-years.js";

window.onload = createMap;

buildYears();

const selects = document.getElementsByClassName("fa-select");
const options = document.querySelector(".fa-options");
const arrow_wrapper = document.getElementById('extend-wrapper');
const arrow = document.getElementById('extend');

for (let i = 0; i < selects.length; i++) {
    selects[i].addEventListener("click", function () {
        this.classList.toggle("active");
    });
}

options.addEventListener('click', function (e) {
    let option = e.target;
    const text = option.innerText;
    const value = option.getAttribute("rel");
    const selectDOM = option.parentNode.previousSibling.previousSibling;

    selectDOM.classList.remove("active");
    selectDOM.innerText = text;
    selectDOM.setAttribute("data-value", value);
    let waitings = document.querySelectorAll('.waiting-for')
    waitings.forEach(waiting => {
        waiting.style.display = "flex";
    })
    arrow_wrapper.style.display = "none";
    ul_launches.innerHTML = "";
    iframe.setAttribute('src', '');
    buildStats(value);
})

const zooming = document.getElementById('zooming');
const ul_launches = document.getElementById('list-launches');
const iframe = document.querySelector('iframe');

zooming.addEventListener('click', function (){
    let map_div = document.getElementById('map');
    if (map_div.classList[0] === 'zoomed') {
        map_div.classList.remove('zoomed');
        zooming.classList.replace('maximized', 'minimized');
        zooming.innerText = "Click to see pads";
        removeLaunchPads();
        removeLandPads();
        resizeMap();
    } else {
        map_div.classList.add('zoomed');
        zooming.classList.replace('minimized', 'maximized');
        zooming.innerText = "X";
        createLaunchPads();
        drawLaunchPads();
        createLandPads();
        drawLandPads();
        resizeMap();
    }
})


let infos_video = document.querySelector('#infos-video');
arrow.addEventListener('click', function () {
    if (arrow.classList.contains("rotating-animation")) {
        arrow.classList.remove('rotating-animation');
        infos_video.classList.remove('opening-animation');
    } else {
        arrow.classList.add('rotating-animation');
        infos_video.classList.add('opening-animation');
    }
})

