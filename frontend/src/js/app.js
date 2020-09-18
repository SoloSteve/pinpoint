// Import Vue
import Vue from 'vue';
// Import Framework7
// Import WITHOUT Bundle:
import Framework7 from 'framework7/framework7-lite.esm';
// import Framework7 from "framework7/framework7-lite.esm.bundle";
// Import Framework7-Vue Plugin
// Import All NEEDED components:
// import Framework7Vue, {f7App} from 'framework7-vue/framework7-vue.esm';
// import 'framework7/css/framework7.bundle.css';
// import 'framework7/css/framework7.bundle.min.css'
import 'framework7/css/framework7.min.css';
import 'framework7/components/popup.css';
import 'framework7/components/accordion.css';
import 'framework7/components/grid.css';
import 'framework7/components/chip.css';
import 'framework7/components/list-index.css';
import 'framework7/components/contacts-list.css';
import 'framework7/components/searchbar.css';
import 'framework7/components/elevation.css';
import 'framework7/components/sheet.css';
import 'framework7/components/smart-select.css';
import 'framework7/components/dialog.css';
import 'framework7/components/input.css';
import Framework7Vue, {
  f7Accordion,
  f7AccordionContent,
  f7AccordionItem,
  f7App,
  f7Badge,
  f7Block,
  f7BlockFooter,
  f7BlockHeader,
  f7BlockTitle,
  f7Button,
  f7Chip,
  f7Col,
  f7Icon,
  f7Link,
  f7List,
  f7ListGroup,
  f7ListIndex,
  f7ListInput,
  f7ListItem,
  f7Navbar,
  f7NavRight,
  f7NavTitle,
  f7Page,
  f7PageContent,
  f7Popup,
  f7Row,
  f7Segmented,
  f7Toolbar,
  f7View
} from 'framework7-vue/framework7-vue.esm';
// Import Framework7 Styles
// import 'framework7/css/framework7.bundle.min.css';\
// import 'framework7/css/framework7.bundle.css';
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

// Import F7 Core API
import Popup from "framework7/components/popup/popup";
import SmartSelect from "framework7/components/smart-select/smart-select";
import Dialog from "framework7/components/dialog/dialog";
import ListIndex from "framework7/components/list-index/list-index";
import Accordion from "framework7/components/accordion/accordion";
import Searchbar from "framework7/components/searchbar/searchbar";

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
});

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);
Framework7.use([Popup, SmartSelect, Dialog, ListIndex, Accordion, Searchbar]);
// List All Used Components
// Vue.component('f7-', f7);
Vue.component('f7-app', f7App);
Vue.component('f7-popup', f7Popup);
Vue.component('f7-page-content', f7PageContent);
Vue.component('f7-block-title', f7BlockTitle);
Vue.component('f7-block-header', f7BlockHeader);
Vue.component('f7-block-footer', f7BlockFooter);
Vue.component('f7-block', f7Block);
Vue.component('f7-button', f7Button);
Vue.component('f7-list', f7List);
Vue.component('f7-list-item', f7ListItem);
Vue.component('f7-list-index', f7ListIndex);
Vue.component('f7-list-group', f7ListGroup);
Vue.component('f7-accordion-content', f7AccordionContent);
Vue.component('f7-accordion-item', f7AccordionItem);
Vue.component('f7-accordion', f7Accordion);
Vue.component('f7-icon', f7Icon);
Vue.component('f7-row', f7Row);
Vue.component('f7-col', f7Col);
Vue.component('f7-link', f7Link);
Vue.component('f7-view', f7View);
Vue.component('f7-page', f7Page);
Vue.component('f7-navbar', f7Navbar);
Vue.component('f7-segmented', f7Segmented);
Vue.component('f7-nav-title', f7NavTitle);
Vue.component('f7-nav-right', f7NavRight);
Vue.component('f7-chip', f7Chip);
Vue.component('f7-list-input', f7ListInput);
Vue.component('f7-toolbar', f7Toolbar);
Vue.component('f7-badge', f7Badge);

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