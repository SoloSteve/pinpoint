// Import Vue
import Vue from 'vue';
// Import Framework7
// Import WITHOUT Bundle: import Framework7 from 'framework7/framework7-lite.esm.js';
import Framework7 from "framework7/framework7-lite.esm.bundle";
// Import Framework7-Vue Plugin
// Import All NEEDED components: import Framework7Vue, {f7App} from 'framework7-vue';
import Framework7Vue from "framework7-vue/framework7-vue.esm.bundle";
// Import Framework7 Styles
// Import ONLY NEEDED: import 'framework7/css/framework7.css';
import 'framework7/css/framework7.bundle.min.css';
// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';
import '../css/font-awesome-all.css';
// Import App Component
import App from '../components/app.vue';
// Import Leaflet
import {Icon} from 'leaflet';
import 'leaflet/dist/leaflet.css';
//Import Store
import store from "../store";

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
});

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);
// List All Used Components
// Vue.component('f7-', f7);

// Init App
new Vue({
  el: '#app',
  render: (h) => h(App),
  store,
  // Register App Component
  components: {
    app: App
  },
});

// PWA
window.deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  console.log("before install prompt");
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredPrompt = e;
  window.dispatchEvent(new Event("ready-for-pwa"))
});