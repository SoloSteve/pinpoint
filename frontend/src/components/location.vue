<template>
  <f7-popup :opened="popupOpened">
    <f7-page-content>
      <f7-block-title>Permission</f7-block-title>
      <f7-block>
        To properly use this app we need your permission to access the GPS.
      </f7-block>
      <f7-block>
        <f7-button @click="setPermission(true)" big fill id="gps-permission-btn" raised>
          EnableLocation Services (GPS)
        </f7-button>
      </f7-block>
      <f7-block>
        <f7-list>
          <f7-list-item title="No Data Logging">
            <f7-icon material="check_circle" slot="media"></f7-icon>
          </f7-list-item>
          <f7-list-item title="No Selling of Information">
            <f7-icon material="check_circle" slot="media"></f7-icon>
          </f7-list-item>
        </f7-list>
      </f7-block>
      <f7-block>
        All of the information you give us is temporarily saved on our servers, once you exit the app, your data is
        deleted. We don't sell any of your information to anyone. If you'd like to read more you can check out our
        <f7-link>Privacy Policy</f7-link>
      </f7-block>
      <f7-block id="gps-decline-btn">
        <f7-link @click="setPermission(false)">I don't want to turn on my GPS at this time</f7-link>
      </f7-block>
    </f7-page-content>
  </f7-popup>
</template>

<script>
  export default {
    name: "location",
    data: function () {
      return {
        popupOpened: false,
        watchId: null
      };
    },
    methods: {
      async getPermissions() {
        if ("permissions" in navigator) {
          const result = await navigator.permissions.query({name: "geolocation"});
          switch (result.state) {
            case "granted":
              this.startGeolocationWatch();
              break;
            case "prompt":
              this.popupOpened = true;
              break;
            case "denied":
              break;
          }
        } else {
          this.popupOpened = true;
        }
      },

      setPermission(value) {
        if (value) this.startGeolocationWatch();
        this.$store.set("room-state/room@users.user.gps", 3);
        this.popupOpened = false;
      },

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
              // store.commit("localState/setFix", {status: false, info: lang.gps.fix["no-permission"]});
              break;
            case positionError.POSITION_UNAVAILABLE:
              this.$store.set("room-state/room@users.user.gps", 1);
              // store.commit("localState/setFix", {
              //   status: false,
              //   info: lang.gps.fix["internal-error"]
              // });
              break;
            case positionError.TIMEOUT:
              this.$store.set("room-state/room@users.user.gps", 1);
              // store.commit("localState/setFix", {status: false, info: lang.gps.fix["timeout-error"]});
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
      this.getPermissions();
    }
  }
</script>

<style scoped>
  #gps-permission-btn {
    height: 100px;
    line-height: 100px;
  }

  #gps-decline-btn {
    bottom: 0;
    position: absolute;
    width: 100%;
    text-align: center;
  }
</style>