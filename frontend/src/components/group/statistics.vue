<template>
    <f7-row class="stat-row elevation-2">
        <f7-col class="stat-box" v-if="Number.isFinite(speed)">
          <span class="stat-box-title">Speed</span>
          <f7-icon icon="fas fa-walking" size="20"/>
          <div class="speed-container">
            <span>{{Math.round(speed * 10) / 10}}</span><span>m/s</span>
          </div>
        </f7-col>
      <f7-col class="stat-box" v-if="Number.isFinite(accuracy)">
        <span class="stat-box-title">Accuracy</span>
        <f7-icon icon="fas fa-crosshairs" size="20"/>
        <div class="accuracy-container">
          <span>±</span><span>{{Math.round(accuracy)}}</span><span>m</span>
        </div>
      </f7-col>
      <f7-col class="stat-box" v-if="Number.isFinite(latency)">
        <span class="stat-box-title">Latency</span>
        <f7-icon icon="far fa-clock" size="20"/>
        <div class="latency-container">
          <span>{{latency}}</span><span>ms</span>
        </div>
      </f7-col>
    </f7-row>
</template>

<script>
  export default {
    name: "statistics",
    props: {
      speed: {
        type: Number,
      },
      accuracy: {
        type: Number
      },
      latency: {
        type: Number
      }
    }
  }
</script>

<style scoped>
    .stat-row {
        margin: 10px;
        border-radius: 10px;
        background-color: #ddd;
    }

    .stat-box {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .stat-box-title {
        padding-bottom: 3px;
    }

    .speed-container, .accuracy-container, .latency-container > * {
        padding: 1px;
    }

    .speed-container > *:first-child {
        font-size: 18px;
    }

    .accuracy-container > *:nth-child(2) {
        font-size: 18px;
    }

    .latency-container > *:first-child {
        font-size: 18px;
    }
</style>