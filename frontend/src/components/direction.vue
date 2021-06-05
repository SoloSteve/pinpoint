<template>
  <div id="pointer-move-space">
    <div id="pointer-container" ref="pointer-container" :style="{visibility: arrowRotation !== null ? 'visible' : 'hidden'}">
      <div :style="{transform: `rotate(${arrowRotation}deg)`,backgroundImage: `url(${arrowCircleImage})`}"
           id="arrow-image"/>
    </div>
  </div>
</template>

<script>
import interact from "interactjs";
import arrowCircleImage from "../static/icons/ui/arrow-circle.svg";
import {bearingTo} from "../js/utils";
import {clamp} from "lodash";

export default {
  name: "direction",
  props: {
    following: {
      type: Object
    }
  },
  data() {
    return {
      arrowCircleImage,
      maxScaleMultiplier: 2,
        minScaleMultiplier: 0.7,
        orientation: null
      }
    },
    computed: {
      arrowRotation() {
        const user = this.$store.get("room-state/room@users.user");
        if (this.orientation === null || this.following === null || !user.hasOwnProperty("position")) return null;
        return ((((
            this.orientation
            + bearingTo(user.position.lat, user.position.lng, this.following.position.lat, this.following.position.lng))
            + 360)
            % 360)
        );
      }
    },
    methods: {
      listenForOrientationEvent() {
        if ("ondeviceorientationabsolute" in window) { // Chrome 50+
          window.addEventListener("deviceorientationabsolute", this.onOrientationChange.bind(this));
          setTimeout(() => {
            if (this.orientation === null) {
              this.$store.set("room-state/room@users.user.magnetometer", 2)
            }
          }, 1000);
        } else if ("ondeviceorientation" in window) {
          window.addEventListener("deviceorientation", this.onOrientationChange.bind(this));
          if (this.$f7.device.ios) {
            setTimeout(() => {
              if (this.orientation === null) {
                this.$store.set("room-state/room@users.user.magnetometer", 3)
              }
            }, 1000);
          }

        } else {
          this.$store.set("room-state/room@users.user.magnetometer", 2);
        }
      },
      onOrientationChange(event) {
        // Safari
        if ("webkitCompassHeading" in event) {
          if (!Number.isFinite(event.webkitCompassHeading)) {
            // Orientation not absolute
            this.$store.set("room-state/room@users.user.magnetometer", 2);

            window.removeEventListener("deviceorientationabsolute", this.onOrientationChange);
            window.removeEventListener("deviceorientation", this.onOrientationChange);
            this.orientation = null;
            return;
          }

          if (this.orientation === null) {
            this.$store.set("room-state/room@users.user.magnetometer", 0);
          }

          // webkit goes counter-clockwise
          this.orientation = -event.webkitCompassHeading;
          return;
        }

        // Chrome and Firefox
        if (!event.absolute) {
          // Orientation not absolute
          this.$store.set("room-state/room@users.user.magnetometer", 2);

          window.removeEventListener("deviceorientationabsolute", this.onOrientationChange);
          window.removeEventListener("deviceorientation", this.onOrientationChange);
          this.orientation = null;
          return;
        }

        if (event.alpha === null) {
          // No magnetometer detected
          this.$store.set("room-state/room@users.user.magnetometer", 2);
          return;
        }

        if (this.orientation === null) {
          this.$store.set("room-state/room@users.user.magnetometer", 0);
        }

        if (this.$f7.device.androidChrome) {
          this.orientation = event.alpha;
        } else if (this.$f7.device.firefox) {
          this.orientation = -event.alpha;
        } else {
          this.orientation = event.alpha;
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$root.$once("startOrientationWatch", this.listenForOrientationEvent.bind(this));

        const pointerContainer = this.$refs["pointer-container"];
        const rect = pointerContainer.getBoundingClientRect();

        let attrX = rect.x;
        let attrY = rect.y - 56;
        let attrScale = 1;

        interact(pointerContainer)
          .draggable({
            inertia: true, // Inertial throwing

            modifiers: [interact.modifiers.restrictRect({
              restriction: 'parent',
              endOnly: true
            })],

            onmove(event) {
              const target = event.target;
              // keep the dragged position in the attr-x/attr-y attributes
              const x = (attrX || 0) + event.dx;
              const y = (attrY || 0) + event.dy;

              // translate the element
              target.style.transform = `translate(${x}px, ${y}px) scale(${attrScale})`;

              // update the position attributes
              attrX = x;
              attrY = y;
            }
          })
          .gesturable({
            onmove(event) {
              const target = event.target;

              const x = (attrX || 0) + event.dx;
              const y = (attrY || 0) + event.dy;

              const scale = clamp(event.scale * attrScale, 1, 2);

              target.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            },
            onend(event) {
              attrScale = Math.max(Math.min(attrScale * event.scale, this.maxScaleMultiplier), this.minScaleMultiplier);
            }
          });
      });
    }
  }
</script>

<style scoped>

  #pointer-move-space {
    height: calc(100% - var(--f7-navbar-height));
    width: 100%;
  }

  #pointer-container {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.2);

    width: 110px;
    height: 110px;

    border-radius: 10px;

    z-index: 500;
    touch-action: none;

    /*visibility: hidden;*/
  }


  #arrow-image {
    position: relative;
    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
</style>