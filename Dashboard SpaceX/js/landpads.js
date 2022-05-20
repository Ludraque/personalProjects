import {map} from "./maps.js";

let landPadsLayer;

export function createLandPads() {
    landPadsLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            image: new ol.style.Icon({
                scale: 0.03,
                src: './img/landpad.png',
                offsetX: -5,
            })
        })
    });
}

export function drawLandPads() {
    fetch("https://api.spacexdata.com/v4/landpads").then(function (response) {
        return response.json();

    }).then(function (lands) {
        map.addLayer(landPadsLayer);
        let i = 1;
        lands.forEach(land => {
            let lgt = land.longitude;
            let ltt = land.latitude;
            landPadsLayer.getSource().addFeature(new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([lgt, ltt])),
                id: i}));
            i++;
        })
    })
}

export function removeLandPads() {
    map.removeLayer(landPadsLayer);
    landPadsLayer = "";
}