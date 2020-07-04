const accessToken = "pk.eyJ1Ijoic3RldmVzaGFuaSIsImEiOiJjanVkM2Y2MzAwcjUzNGRtaDJlZGdzbDVmIn0.yUiV1Cs5epQ9h6qgekOAEw";

export const staticOptions = {
  "zoomControl": false,
  "attributionControl": true,
  "zoomSnap": true,
  "doubleClickZoom": false,
  "fitBoundsPadding": [40, 40],
};

export const tileProvider = {
  "id": "mapbox/streets-v11",
  "name": "OSM",
  "url": `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
  "tileSize": 512,
  "maxZoom": "18",
  "zoomOffset": -1,
  "attribution": '©<a href="https://www.mapbox.com/about/maps/" target="_blank" rel="noreferrer">Mapbox</a> ©<a href="http://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank" rel="noreferrer">Improve this map</a></strong>'
};

export const contextMenu = {
  contextmenu: true,
  // contextmenuWidth: 180,
  contextmenuInheritItems: false,
}