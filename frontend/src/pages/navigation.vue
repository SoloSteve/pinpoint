<template>
    <f7-page name="home">
        <StatusBar :connection="connection"
                   :gps="gps"
                   :group-count="groupCount"
                   :magnetometer="magnetometer"
                   :name="username"
        />
        <div class="content-container">
            <div class="elevation-4 map-container">
                <SimpleMap :users="users"/>
            </div>
        </div>
    </f7-page>
</template>

<script>
  import StatusBar from "../components/status-bar/status-bar";
  import SimpleMap from "../components/map/simple-map";

  export default {
    components: {SimpleMap, StatusBar},
    data() {
      return {
        username: "Anonymous",
        connection: 0,
        gps: 0,
        magnetometer: 0,
        groupCount: 2,

        users: [
          {id: "123", name: "Anonymous", location: {lat: 32.480180, lng: 34.988890}},
          {id: "321", name: "Anon", location: {lat: 45.480180, lng: 30.988890}}
        ]
      }
    }
  }
</script>

<style scoped>
    .content-container {
        height: calc(100% - var(--f7-navbar-height));
        width: 100%;
    }

    .map-container {
        position: absolute;
        top: calc(1.5% + var(--f7-navbar-height));
        width: 95%;
        /*bottom: calc(2.5% + var(--f7-toolbar-height));*/
        bottom: calc(2.5%);
        right: 2.5%;

        border-radius: 5px;
    }
</style>