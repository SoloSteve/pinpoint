<template>
  <f7-navbar>
    <div id="navbar">
      <f7-block>{{name}}</f7-block>
      <f7-link href="/settings/" id="info-link">
        <f7-segmented id="info-segment" raised tag="div">
          <LocationServicesIcon :state="gps" class="status-icon"/>
          <MagnetometerIcon :state="magnetometer" class="status-icon"/>
          <ConnectionIcon :state="connection" class="status-icon"/>
          <f7-icon id="settings-icon" material="settings"/>
        </f7-segmented>
      </f7-link>
      <GroupButton :count="groupCount" link="/group/"/>
    </div>
  </f7-navbar>
</template>

<script>
  import GroupButton from "./group-button";
  import LocationServicesIcon from "./status-icons/location-services-icon";
  import MagnetometerIcon from "./status-icons/magnetometer-icon";
  import ConnectionIcon from "./status-icons/connection-icon";

  export default {
    name: "StatusBar",
    components: {ConnectionIcon, MagnetometerIcon, LocationServicesIcon, GroupButton},
    props: {
      name: {
        type: String,
        required: true
      },
      connection: {
        type: Number,
        required: true
      },
      gps: {
        type: Number,
        required: true
      },
      magnetometer: {
        type: Number,
        required: true
      },
      groupCount: {
        type: Number,
        required: true
      }
    }
  }
</script>

<style scoped>
  #info-segment {
    color: dodgerblue;
    display: flex;
    align-items: center;
  }

  .status-icon {
    margin: 5px;
    font-size: clamp(24px, 6vw, 44px);
    width: 5vw;
    height: 5vw;
    min-width: 24px;
    max-width: 44px;
    min-height: 24px;
    max-height: 44px;
  }

  #settings-icon {
    padding: 4px 10px;
    border-left: solid lightgrey;
    color: gray;

    font-size: clamp(24px, 8vw, 44px);
    width: 8vw;
    height: 8vw;
    min-width: 24px;
    max-width: 44px;
    min-height: 24px;
    max-height: 44px;
  }

  #navbar {
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #info-link {
    padding: unset;
  }
</style>