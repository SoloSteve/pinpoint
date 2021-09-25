<template>
</template>

<script>
  export default {
    name: "location",
    data: function () {
      return {
        watchId: null
      };
    },
    methods: {
      startGeolocationWatch() {
        if (this.watchId) navigator.geolocation.clearWatch(this.watchId);
        this.watchId = navigator.geolocation.watchPosition((position) => {
          this.$store.set("room-state/room@users.user.gps", position.coords.accuracy <= 50 ? 0 : 1);
          this.$store.set(`room-state/room@users.user.position`, {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            heading: position.coords.heading || null,
            speed: position.coords.speed || null
          });
        }, (positionError) => {

          switch (positionError.code) {
            case positionError.PERMISSION_DENIED:
              this.$store.set("room-state/room@users.user.gps", 2);
              break;
            case positionError.POSITION_UNAVAILABLE:
              this.$store.set("room-state/room@users.user.gps", 1);
              break;
            case positionError.TIMEOUT:
              this.$store.set("room-state/room@users.user.gps", 1);
              break;
          }
        }, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0 // No caching
        });
      }
    },
    mounted() {
      this.$root.$once("startGeolocationWatch", this.startGeolocationWatch.bind(this));
    }
  }
</script>

<style scoped>
</style>