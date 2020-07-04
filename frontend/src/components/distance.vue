<template>
  <div
      :class="Number.isFinite(distance) && distance <= maxDistance ? 'show': 'hide'"
      id="pulldown"
      ref="pulldown"
  >
    <IOdometer
        id="odometer"
        ref="odometer"
        :duration="animationDuration"
    />
    <div id="accuracy">±{{accuracy}}m</div>
  </div>
</template>

<script>
  import IOdometer from 'vue-odometer';
  import 'odometer/themes/odometer-theme-default.css';
  import {throttle} from "lodash"
  import {distanceTo} from "../js/utils";

  export default {
    name: "distance",
    components: {
      IOdometer
    },
    props: {
      following: {
        type: Object
      }
    },
    data() {
      return {
        distanceCounter: null,
        maxDistance: 9999,
        maxAccuracy: 99,
        animationDuration: 2000 //ms
      }
    },
    computed: {
      distance() {
        const following = this.following;
        const user = this.$store.get("room-state/room@users.user");
        if (following === null || !following.hasOwnProperty("position") || !user.hasOwnProperty("position")) return null;
        const distance = Math.round(distanceTo(following.position.lat, following.position.lng, user.position.lat, user.position.lng));
        return distance <= this.maxDistance ? distance : null;
      },
      accuracy() {
        const following = this.following;
        const user = this.$store.get("room-state/room@users.user");
        if (following === null
          || !following.hasOwnProperty("position")
          || !following.position.hasOwnProperty("accuracy")
          || !user.hasOwnProperty("position")
          || !user.position.hasOwnProperty("accuracy")
        ) return this.maxAccuracy;

        return Math.round(Math.min(user.position.accuracy + following.position.accuracy, this.maxAccuracy));
      }
    },
    watch: {
      distance(val) {
        this.updateDistance(val);
      }
    },
    methods: {
      updateDistance(newDistance) {
        if (this.distanceCounter) this.distanceCounter.update(newDistance);
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.distanceCounter = this.$refs["odometer"];
      });
      this.updateDistance = throttle(this.updateDistance, this.animationDuration);
    }
  }
</script>

<style scoped>
  #pulldown {
    position: absolute;

    width: 200px;
    height: 50px;

    border-radius: 0 0 5px 5px;

    border: solid gray 2px;

    left: 50%;
    margin-left: -100px;
    z-index: 499;
    background-color: #eee;

    display: flex;
    flex-direction: row;
    justify-content: center;
    /*align-items: center;*/

    transition-duration: 2s;
  }

  .hide {
    top: calc(var(--f7-navbar-height) - 50px - 4px); /* 50px = height. 4px =  2 x border */
  }

  .show {
    top: var(--f7-navbar-height);
  }

  #odometer {
    font-size: 3em;
  }

  #accuracy {
    color: dodgerblue;
    font-size: 1.5em;
    padding-left: 5px;
  }
</style>