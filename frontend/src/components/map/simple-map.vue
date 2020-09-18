<template>
  <l-map
      :center.sync="mapProperties.center"
      :max-zoom="mapProperties.maxZoom"
      :min-zoom="mapProperties.minZoom"
      :options="mapOptions"
      :zoom.sync="mapProperties.zoom"
      @dblclick="onDoubleClick"
      @mousemove="snap.enabled = false"
      @contextmenu="onContextMenu"
      ref="map"
  >
    <l-tile-layer
        :attribution="tileProvider.attribution"
        :options="{maxNativeZoom: 18, maxZoom: mapProperties.maxZoom}"
        :url="tileProvider.url"
        layer-type="base"
    />
    <user-marker
        :key="user.id"
        :lat="user.position.lat"
        :lng="user.position.lng"
        :icon="user.icon"
        :accuracy="isUserImportant(user.id) ? user.position.accuracy : null"
        :name="user.name"
        :heading="user.position.heading"
        :highlight-name="isUserImportant(user.id)"
        @marker-click="onMarkerClick(user)"
        v-for="user in positionedUsers"
    />
    <waypoint-marker
        :highlight-name="isUserImportant(waypoint.id)"
        :icon-id="waypoint.iconId"
        :id="waypoint.id"
        :key="waypoint.id"
        :lat="waypoint.position.lat"
        :lng="waypoint.position.lng"
        :name="waypoint.name"
        @clicked="onMarkerClick(waypoint)"
        v-for="waypoint in waypoints"
    />
  </l-map>
</template>

<script>
import {LIcon, LMap, LMarker, LTileLayer} from 'vue2-leaflet';
import "leaflet-contextmenu";
import "leaflet-contextmenu/dist/leaflet.contextmenu.min.css";
import {uniqueId} from "lodash";
import {contextMenu, staticOptions, tileProvider} from './map-options';
import UserMarker from "./user-marker";
import {get} from "vuex-pathify";
import {avatars} from "../../js/avatars";
import WaypointMarker from "./waypoint-marker";

export default {
  name: "simple-map",
  components: {
    WaypointMarker,
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
      },
      waypoints: {
        type: Array,
        required: true
      }
    },
    data: function () {
      return {
        map: null,
        maxValidAccuracy: 150,
        mapOptions: {
          ...staticOptions,
          ...contextMenu,
          contextmenuItems: [
            {
              text: "Create Waypoint",
              icon: avatars["x0"].img,
              callback: this.addWaypoint
            }
          ]
        },
        tileProvider: tileProvider,
        mapProperties: {
          zoom: 3,
          minZoom: 2,
          maxZoom: 19,
          center: [30, 20]
        },
        snap: {
          enabled: true,
          programmatic: false
        }
      }
    },
    computed: {
      userId: get("room-state/room@userId"),
      followingId: get("room-state/room@followingId"),
      positionedUsers() {
        return this.users.filter(user => user.hasOwnProperty("position") && user.position.accuracy <= this.maxValidAccuracy);
      },
      entityBounds() {
        return this.positionedUsers.concat(this.waypoints).map(entity => [entity.position.lat, entity.position.lng]);
      }
    },
    watch: {
      entityBounds() {
        if (this.snap.enabled) {
          this.centerMap();
        }
      }
    },
    methods: {
      centerMap() {
        if (this.entityBounds.length === 0) return;
        if (this.mapProperties.zoom <= 14) { // Arbitrary value
          this.map.fitBounds(this.entityBounds, {padding: [40, 40]}); // Arbitrary value
        } else {
          this.map.flyToBounds(this.entityBounds, {padding: [40, 40]});
        }
      },

      onDoubleClick() {
        this.snap.enabled = true;
        this.centerMap();
      },

      isUserImportant(userId) {
        return (
          userId === "user"
          || userId === this.followingId
        );
      },

      onMarkerClick(entity) {
        if (entity.id === "user") return;
        if (entity.id === this.$store.get("room-state/room@followingId")) {
          this.$store.set("room-state/room@followingId", null);
        } else {
          this.$store.set("room-state/room@followingId", entity.id);
        }
      },

      onContextMenu() {
        this.snap.enabled = false;
      },

      addWaypoint(evt) {
        const waypointId = uniqueId(this.userId);
        const waypoint = {
          name: "Waypoint",
          position: evt.latlng,
          iconId: "x0",
        };
        this.$store.set(`room-state/room@waypoints.${waypointId}`, waypoint);
        console.log("Created Waypoint:", waypoint);
      }
    },

    mounted() {
      this.$nextTick(() => {
        this.map = this.$refs.map.mapObject;

        // A patch for leaflet.marker.slideTo
        this.map.doubleClickZoom.enable = () => {
        };
      });
    }
  }
</script>

<style scoped>

</style>
<style>
  .leaflet-contextmenu-item {
    line-height: 40px !important;
  }

  .leaflet-contextmenu-icon {
    height: 40px !important;
  }
</style>