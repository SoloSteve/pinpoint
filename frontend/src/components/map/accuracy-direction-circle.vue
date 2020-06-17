<template>
  <svg :height="(accuracyInPixels + 2)*2" :width="(accuracyInPixels + 2)*2"
       class="svg" xmlns="http://www.w3.org/2000/svg">
    <circle :cx="accuracyInPixels+2" :cy="accuracyInPixels+2" :r="accuracyInPixels" class="circle"/>
    <path :d="pathDirection" class="direction"></path>
  </svg>
</template>

<script>
  import {describeArc} from "../../js/utils";

  export default {
    name: "accuracy-direction-circle",
    components: {},
    props: {
      accuracyInPixels: {
        required: true,
        type: Number
      },
      direction: {
        type: Number
      },
      directionAccuracyAngle: {
        type: Number,
        default: 10
      },
      func: {
        type: Function
      }
    },
    computed: {
      pathDirection() {
        if (!Number.isFinite(this.direction)) return [];
        return describeArc(
          this.accuracyInPixels + 2,
          this.accuracyInPixels + 2,
          this.accuracyInPixels,
          this.direction - (this.directionAccuracyAngle / 2),
          this.direction + (this.directionAccuracyAngle / 2)
        );
      }
    }
  }
</script>

<style scoped>
  .svg {
    position: absolute;
  }

  .circle {
    fill-rule: evenodd;
    clip-rule: evenodd;
    fill: #3388ff;
    fill-opacity: 0.2;
    stroke: dodgerblue;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .direction {
    fill-rule: evenodd;
    clip-rule: evenodd;
    fill: none;
    stroke: #ff3333;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }
</style>