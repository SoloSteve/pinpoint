<template>
    <f7-page name="home">
        <StatusBar :connection="connection" :gps="gps" :magnetometer="magnetometer" :name="username"/>
    </f7-page>
</template>

<script>
  import StatusBar from "../components/status-bar/status-bar";

  export default {
    components: {StatusBar},
    data() {
      return {
        username: "Anonymous",
        connection: 0,
        gps: 0,
        magnetometer: 0
      }
    }
  }
</script>