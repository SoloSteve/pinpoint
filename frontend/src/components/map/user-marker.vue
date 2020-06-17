<template>
  <div>
    <l-moving-marker
        :duration="2000"
        :lat-lng="latLng"
        :options="{zIndexOffset: 1000}"
        @click="onMarkerClick"
        class="vue-marker"
        ref="marker"
    >
      <l-icon
          :icon-anchor="[24, 48]"
          :icon-size="[48, 48]"
          class="vue-icon"
      >
        <div class="marker-container">
          <div class="icon-container">
            <!--            <accuracy-direction-circle v-show="Number.isFinite(accuracy)" :accuracyInPixels="accuracySizeInPixels" :direction="heading"/>-->
            <img alt="(•◡•)" class="icon-img" src="/static/icons/avatars/standing_man.svg"/>
          </div>
          <div
              :style="{'font-size': `${12 + 15/name.length}px`, backgroundColor: highlightName ? '#fafad2' : undefined}"
              class="label">{{name}}
          </div>
        </div>
      </l-icon>
    </l-moving-marker>
    <l-moving-marker
        :duration="1"
        :lat-lng="latLngOther"
        :options="{zIndexOffset: -1}"
    >
      <!--      You need to fix the zIndexOffset, and try to get LIcon into accuracy-direction-circle-->
      <LIcon
          :icon-anchor="[accuracySizeInPixels + 2, accuracySizeInPixels + 2]"
          :icon-size="[(accuracySizeInPixels + 2)*2, (accuracySizeInPixels + 2)*2]"
      >
        <accuracy-direction-circle :accuracyInPixels="accuracySizeInPixels" :direction="heading"
                                   v-show="Number.isFinite(accuracy)"/>
      </LIcon>
    </l-moving-marker>
  </div>
</template>

<script>
  import {LCircle, LIcon} from 'vue2-leaflet';
  import LMovingMarker from 'vue2-leaflet-movingmarker';
  import {distanceTo, newPoint} from "../../js/utils";
  import AccuracyDirectionCircle from "./accuracy-direction-circle";

  export default {
    name: "user-marker",
    components: {
      AccuracyDirectionCircle,
      LMovingMarker,
      LIcon,
      LCircle
    },
    props: {
      name: {
        type: String,
        required: true
      },
      highlightName: {
        type: Boolean,
        default: false
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
      },
      accuracy: {
        type: Number
      },
      heading: {
        type: Number
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
      latLngOther() {
        return [this.lat, this.lng];
      },
      duration() {
        const speed = this.speed || 1.4;
        return Math.min((this.moveLength / speed) * 1000, 2000); // In ms
      },
      accuracySizeInPixels() {
        // This function takes meters and converts it to pixels for the accuracy circle.
        if (!this.marker || !Number.isFinite(this.accuracy)) return 0;
        const point1 = this.marker._map.latLngToContainerPoint([0, 0]).y;
        const point2 = this.marker._map.latLngToContainerPoint(newPoint(0, 0, this.accuracy, 0)).y;
        return Math.abs(point1 - point2);
      }
    },
    watch: {
      latLng(val, oldVal) {
        this.moveLength = distanceTo(val[0], val[1], oldVal[0], oldVal[1]);
      }
    },
    methods: {
      onMarkerClick(evt) {
        const target = evt.originalEvent.target;
        if (target !== null && target.classList.contains("icon-img") || target.classList.contains("label")) {
          this.$emit('marker-click');
        }
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

  .icon-img {
    /*position: absolute;*/
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