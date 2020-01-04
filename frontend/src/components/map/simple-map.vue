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
    </l-map>
</template>

<script>
  import {LMap, LTileLayer} from 'vue2-leaflet';
  import {staticOptions, tileProvider} from './map-options';

  export default {
    name: "simple-map",
    components: {
      LMap,
      LTileLayer
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