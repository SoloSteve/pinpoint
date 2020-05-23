<template>
  <f7-app :params="f7params">
    <Room/>
    <!-- Your main view, should have "view-main" class -->
    <f7-view main class="safe-areas" url="/"/>
  </f7-app>
</template>
<script>

  import routes from '../js/routes.js';
  import Room from "./room";

  export default {
    components: {Room},
    data() {
      return {
        // Framework7 Parameters
        f7params: {
          name: 'Pinpoint', // App name
          theme: 'auto', // Automatic theme detection
          // App routes
          routes: routes,
          // Register service worker
          serviceWorker: {
            path: '/service-worker.js',
          }
        }
      }
    }
  }
</script>