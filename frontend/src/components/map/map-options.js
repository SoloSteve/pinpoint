const accessToken = "pk.eyJ1Ijoic3RldmVzaGFuaSIsImEiOiJjanVkM2Y2MzAwcjUzNGRtaDJlZGdzbDVmIn0.yUiV1Cs5epQ9h6qgekOAEw";

export const staticOptions = {
  "zoomControl": false,
  "attributionControl": true,
  "zoomSnap": true,
  "doubleClickZoom": false,
  "fitBoundsPadding": [40, 40],
};

export const tileProvider = {
  "id": "mapbox.streets",
  "name": "OSM",
  "url": `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${accessToken}`,
  "attribution": '©<a href="https://www.mapbox.com/about/maps/" target="_blank" rel="noreferrer">Mapbox</a> ©<a href="http://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank" rel="noreferrer">Improve this map</a></strong>'
};