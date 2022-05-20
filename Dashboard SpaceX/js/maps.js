export let map;

export function createMap() {
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: [0,0],
            zoom: 2
        })
    });
}

export function resizeMap() {
    map.getView().setZoom(2);
    map.getView().setCenter([0,0]);
    map.updateSize();
}
