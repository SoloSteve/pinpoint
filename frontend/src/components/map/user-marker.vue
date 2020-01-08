<template>
    <l-marker :lat-lng="latLng">
        <l-icon
                :icon-anchor="[25, 50]"
                :icon-size="[50, 50]"

        >
            <div class="icon-container">
                <img alt="(•◡•)" src="/static/icons/avatars/standing_man.svg"/>
                <div :style="{'font-size': `${12 + 15/user.name.length}px`}" class="label">{{user.name}}</div>
            </div>
        </l-icon>
    </l-marker>
</template>

<script>
  import {LIcon, LMarker} from 'vue2-leaflet';

  export default {
    name: "user-marker",
    components: {
      LMarker,
      LIcon
    },
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    computed: {
      latLng() {
        return [this.user.location.lat, this.user.location.lng];
      }
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