import {map} from "./maps.js";

let vectorLayer;

export function createLaunchPads() {
    vectorLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            image: new ol.style.Icon({
                scale: 0.03,
                src: './img/launchpad.png'
            })
        })
    });
}

export function drawLaunchPads() {
    fetch("https://api.spacexdata.com/v4/launchpads").then(function (response) {
        return response.json();

    }).then(function (launchs) {
        map.addLayer(vectorLayer);
        let i = 1;
        launchs.forEach(launch => {
            let lgt = launch.longitude;
            let ltt = launch.latitude;
            vectorLayer.getSource().addFeature(new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([lgt, ltt])),
                id: i}));
            i++;
        })
    })
}

export function removeLaunchPads() {
    map.removeLayer(vectorLayer);
    vectorLayer = "";
}