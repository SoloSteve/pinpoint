<template>
  <l-map
      :center.sync="mapProperties.center"
      :max-zoom="mapProperties.maxZoom"
      :min-zoom="mapProperties.minZoom"
      :options="mapOptions"
      :zoom.sync="mapProperties.zoom"
      @dblclick="onDoubleClick"
      @mousemove="snap.enabled = false"
      ref="map"
  >
    <l-tile-layer
        :attribution="tileProvider.attribution"
        :url="tileProvider.url"
        layer-type="base"
    />
    <user-marker
        :key="user.id"
        :lat="user.position.lat"
        :lng="user.position.lng"
        :name="user.name"
        v-for="user in positionedUsers"
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
        map: null,
        mapOptions: staticOptions,
        tileProvider: tileProvider,
        doubleClickZoom: false,
        mapProperties: {
          zoom: 3,
          minZoom: 2,
          maxZoom: 18,
          center: [30, 20]
        },
        snap: {
          enabled: true,
          programmatic: false
        }
      }
    },
    computed: {
      positionedUsers() {
        return this.users.filter(user => user.hasOwnProperty("position"));
      },
      usersBounds() {
        return this.positionedUsers.map(user => [user.position.lat, user.position.lng]);
      }
    },
    watch: {
      usersBounds() {
        if (this.snap.enabled) {
          this.centerMap();
        }
      }
    },
    methods: {
      centerMap() {
        if (this.usersBounds.length === 0) return;
        if (this.mapProperties.zoom <= 14) { // Arbitrary value
          this.map.fitBounds(this.usersBounds, {padding: [40, 40]}); // Arbitrary value
        } else {
          this.map.flyToBounds(this.usersBounds, {padding: [40, 40]});
        }
      },

      onDoubleClick() {
        this.snap.enabled = true;
        this.centerMap();
      }
    },

    mounted() {
      this.$nextTick(() => {
        this.map = this.$refs.map.mapObject
      });
    }
  }
</script>

<style scoped>

</style>