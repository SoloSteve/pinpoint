<template>
  <l-marker
      :draggable="true"
      :lat-lng="latLng"
      :options="{...markerContextMenu, zIndexOffset: 1000}"
      @click="onWaypointClick"
      @dragend="onWaypointMove"
  >
    <l-icon
        :icon-anchor="selectedIcon.anchor"
        :icon-size="selectedIcon.size"
        class="vue-icon"
    >
      <div class="marker-container">
        <div class="icon-container">
          <img :src="selectedIcon.img" alt="(•◡•)" class="icon-img"/>
        </div>
        <div
            :style="{'font-size': `${12 + 15/name.length}px`, backgroundColor: highlightName ? '#fafad2' : undefined}"
            class="label">{{name}}
        </div>
      </div>
    </l-icon>
  </l-marker>
</template>

<script>
import {LIcon, LMarker} from 'vue2-leaflet';
import {avatars} from "../../js/avatars";
import {contextMenu} from "./map-options";


export default {
  name: "waypoint-marker",
  components: {
    LMarker,
    LIcon,
  },
  props: {
    id: {
      type: String,
      required: true
    },
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    },
    name: {
      type: String,
        required: true
      },
      highlightName: {
        type: Boolean,
      },
      iconId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        markerContextMenu: {
          ...contextMenu,
          contextmenuItems: [
            {
              text: "Rename",
              icon: "/static/icons/ui/edit-waypoint-name-icon.svg",
              callback: (evt) => {
                this.$f7.dialog.prompt("Change Waypoint Name",
                  (value) => {
                    this.$store.set(`room-state/room@waypoints.${this.id}.name`, value);
                  },
                  () => {
                  },
                  "Waypoint"
                );
              }
            },
            {
              separator: true,
            },
            {
              text: "Remove",
              icon: "/static/icons/ui/remove-waypoint-icon.svg",
              callback: this.removeWaypoint
            }
          ]
        }
      }
    },
    computed: {
      latLng() {
        return [this.lat, this.lng];
      },
      selectedIcon() {
        return avatars[this.iconId];
      }
    },
    methods: {
      onWaypointMove(evt) {
        this.$store.set(`room-state/room@waypoints.${this.id}.position`, {
          lat: evt.target._latlng.lat,
          lng: evt.target._latlng.lng,
          accuracy: 0,
        });
      },
      onWaypointClick(evt) {
        this.$emit("clicked", evt);
      },
      removeWaypoint() {
        const currentValue = this.$store.get("room-state/room@waypoints");
        delete currentValue[this.id];
        this.$store.set("room-state/room@waypoints", currentValue);
      }
    }
  }
</script>

<style scoped>
  .marker-container {
    display: flex;
    justify-content: center;
  }

  .icon-container {
    display: flex;
    justify-content: center;
    width: 48px;
    height: 48px;
  }

  .label {
    position: absolute;
    top: -25px;
    z-index: 1001;
    padding: 0 5px;
    margin-right: 5px;

    text-align: center;
    font-weight: bolder;
    color: darkslateblue;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    backdrop-filter: blur(2px);
  }
</style>
<style>
  .leaflet-contextmenu-icon {
    margin-top: 0 !important;
  }
</style>