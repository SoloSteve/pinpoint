<template>
  <l-moving-marker
      :duration="duration"
      :lat-lng="latLng"
      ref="marker"
  >
    <l-icon
        :icon-anchor="[25, 50]"
        :icon-size="[50, 50]"
    >
      <div class="icon-container">
        <img alt="(•◡•)" src="/static/icons/avatars/standing_man.svg"/>
        <div :style="{'font-size': `${12 + 15/name.length}px`}" class="label">{{name}}</div>
      </div>
    </l-icon>
  </l-moving-marker>
</template>

<script>
  import {LIcon} from 'vue2-leaflet';
  import LMovingMarker from 'vue2-leaflet-movingmarker';
  import {distanceTo} from "../../js/utils";

  export default {
    name: "user-marker",
    components: {
      LMovingMarker,
      LIcon
    },
    props: {
      name: {
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
      speed: {
        type: Number,
      }
    },
    data: function () {
      return {
        marker: null,
        moveLength: 0
      };
    },
    computed: {
      latLng() {
        return [this.lat, this.lng];
      },
      duration() {
        const speed = this.speed || 1.4;
        return Math.min((this.moveLength / speed) * 1000, 2000); // In ms
      }
    },
    watch: {
      latLng(val, oldVal) {
        this.moveLength = distanceTo(val[0], val[1], oldVal[0], oldVal[1]);
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.marker = this.$refs.marker.mapObject;
        this.marker.setDuration = () => {
        };
      });
    }
  }
</script>

<style scoped>
  .icon-container {
    display: flex;
    justify-content: center;
  }

  .label {
    position: absolute;
    top: 100%;
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