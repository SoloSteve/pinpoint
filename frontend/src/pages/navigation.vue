<template>
  <f7-page name="home">
    <StatusBar :connection="user.connection"
               :gps="user.gps"
               :group-count="users.length - 1"
               :magnetometer="user.magnetometer"
               :name="user.name"
    />
    <Distance :following="following"/>
    <Direction :following="following"/>
    <div class="content-container">
      <div class="elevation-4 map-container">
        <SimpleMap :users="users" :waypoints="waypoints"/>
      </div>
    </div>
  </f7-page>
</template>

<script>
import StatusBar from "../components/status-bar/status-bar";
import SimpleMap from "../components/map/simple-map";
import Distance from "../components/distance";
import Direction from "../components/direction";

export default {
  components: {Direction, Distance, SimpleMap, StatusBar},
  data() {
    return {}
  },
  computed: {
    users() {
      return Object.entries(this.$store.get("room-state/room@users")).map(([key, value]) => {
        return {id: key, ...value};
      });
    },
    waypoints() {
      return Object.entries(this.$store.get("room-state/room@waypoints")).map(([key, value]) => {
        return {id: key, ...value};
      });
    },
    user() {
      return this.$store.get("room-state/room@users.user");
    },
    following() {
      const followingId = this.$store.get("room-state/room@followingId");
        if (followingId === null) return null;
        try {
          const following =
            this.$store.get(`room-state/room@users.${followingId}`)
              || this.$store.get(`room-state/room@waypoints.${followingId}`);

          if (following === null || !following.hasOwnProperty("position")) {
            return null;
          }
          return following;
        } catch (e) {
          return null
        }
    }
  }
}
</script>
<style>
.page-content {
  overflow: hidden;
}
</style>
<style scoped>
.content-container {
  height: calc(100% - var(--f7-navbar-height));
  width: 100%;
  top: var(--f7-navbar-height);
  position: absolute;
}

.map-container {
  position: absolute;
  top: 1.5%;
  width: 95%;
  /*bottom: calc(2.5% + var(--f7-toolbar-height));*/
  bottom: 1.5%;
  right: 2.5%;

  border-radius: 5px;
}
</style>