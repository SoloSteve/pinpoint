<template>
    <l-map
            :center="mapProperties.center"
            :max-zoom="mapProperties.maxZoom"
            :min-zoom="mapProperties.minZoom"
            :options="mapOptions"
            :zoom="mapProperties.zoom"
    >
        <l-tile-layer
                :attribution="tileProvider.attribution"
                :url="tileProvider.url"
                layer-type="base"
        />
        <user-marker
                :key="user.id"
                :user="user"
                v-for="user in users"
        />
    </l-map>
</template>

<script>
  import {LIcon, LMap, LMarker, LTileLayer} from 'vue2-leaflet';
  import {staticOptions, tileProvider} from './map-options';
  import UserMarker from "./user-marker";

  export default {
    name: "simple-map",
    components: {
      UserMarker,
      LMap,
      LTileLayer,
      LMarker,
      LIcon,
    },
    props: {
      users: {
        type: Array,
        required: true
      }
    },
    data: function () {
      return {
        mapOptions: staticOptions,
        tileProvider: tileProvider,
        mapProperties: {
          zoom: 3,
          minZoom: 2,
          maxZoom: 18,
          center: [30, 20]
        }
      }
    }
  }
</script>

<style scoped>

</style>