<template>
  <f7-popup :opened="popupOpened">
    <f7-page-content>
      <f7-block-title>Permission</f7-block-title>
      <f7-block>
        To properly use this app we need your permission to access the GPS and Gyroscope.
      </f7-block>
      <f7-block>
        <f7-list>
          <f7-list-item>
            <f7-checkbox slot="media" :checked="locationPermissionVisualEnabled" disabled/>
            <f7-button slot="after" :disabled="locationPermissionVisualEnabled || locationPermissionForeverDisabled"
                       big class="permission-btn" fill
                       raised @click="setLocationPermission">
              Enable Location Services (GPS)
            </f7-button>
          </f7-list-item>
          <f7-list-item>
            <f7-checkbox slot="media" :checked="orientationPermissionVisualEnabled" disabled/>
            <f7-button slot="after" :disabled="orientationPermissionVisualEnabled" big class="permission-btn"
                       fill
                       raised @click="setOrientationPermission">
              Enable Orientation Access (Gyro)
            </f7-button>
          </f7-list-item>
        </f7-list>
      </f7-block>
      <f7-block>
        <f7-list>
          <f7-list-item title="No Data Logging">
            <f7-icon slot="media" material="check_circle"></f7-icon>
          </f7-list-item>
          <f7-list-item title="No Selling of Information">
            <f7-icon slot="media" material="check_circle"></f7-icon>
          </f7-list-item>
        </f7-list>
      </f7-block>
      <f7-block>
        All of the information you give us is temporarily saved on our servers, once you exit the app, your data is
        deleted. We don't sell any of your information to anyone. If you'd like to read more you can check out our
        <f7-link>Privacy Policy</f7-link>
      </f7-block>
      <f7-block id="gps-decline-btn">
        <f7-link @click="popupOpened = false">I don't want to enable anything yet</f7-link>
      </f7-block>
    </f7-page-content>
  </f7-popup>
</template>

<script>
export default {
  name: "permissions",
  data: function () {
    return {
      popupOpened: false,
      locationPermissionVisualEnabled: false,
      locationPermissionForeverDisabled: false,
      orientationPermissionVisualEnabled: false,
    };
  },
  computed: {
    totalPermissions() {
      return this.locationPermissionVisualEnabled && this.orientationPermissionVisualEnabled;
    }
  },
  methods: {
    async getPermissions() {
      let results = await Promise.allSettled([this.getLocationPermissions(), this.getOrientationPermissions()]);
      this.locationPermissionVisualEnabled = results[0].status === "fulfilled";
      this.orientationPermissionVisualEnabled = results[1].status === "fulfilled"
      if (results.some(result => result.status === "rejected")) {
        this.popupOpened = true;
      }
    },
    getLocationPermissions() {
      return new Promise(async (resolve, reject) => {
        if (!("permissions" in navigator)) {
          resolve();
          return
        }
        const result = await navigator.permissions.query({name: "geolocation"});
        console.log("result");
        switch (result.state) {
          case "granted":
            resolve();
            break;
          case "prompt":
            this.$store.set("room-state/room@users.user.gps", 4);
            reject();
            break;
          case "denied":
            this.$store.set("room-state/room@users.user.gps", 3);
            this.locationPermissionForeverDisabled = true;
            reject();
            break;
        }
      });
    },
    getOrientationPermissions() {
      return new Promise((resolve, reject) => {
        if (typeof DeviceOrientationEvent.requestPermission !== "function") {
          this.$store.set("room-state/room@users.user.magnetometer", 0);
          resolve();
          return;
        }
        let testForOrientationFlag = false;
        window.addEventListener("deviceorientation", () => {
          testForOrientationFlag = true;
        }, {once: true});
        setTimeout(() => {
          if (testForOrientationFlag) {
            this.$store.set("room-state/room@users.user.magnetometer", 0);
            resolve();
          } else {
            this.$store.set("room-state/room@users.user.magnetometer", 3);
            reject();
          }
        }, 0);
      });
    },
    setLocationPermission() {
      navigator.geolocation.getCurrentPosition(() => {
        this.locationPermissionVisualEnabled = true;
      }, (positionError) => {
        switch (positionError.code) {
          case positionError.PERMISSION_DENIED:
            // Not sure if they dismissed or denied so we call this to check.
            this.getLocationPermissions().catch(() => {
            });
            break;
          case positionError.POSITION_UNAVAILABLE:
            // This is fine. We just want to check permissions.
            this.locationPermissionVisualEnabled = true;
            break;
          case positionError.TIMEOUT:
            // This is fine. We just want to check permissions.
            this.locationPermissionVisualEnabled = true;
            break;
        }
      }, {enableHighAccuracy: true, maximumAge: 0, timeout: 0});
    },
    setOrientationPermission() {
      DeviceOrientationEvent.requestPermission().then(permissionState => {
        if (permissionState === "granted") {
          this.orientationPermissionVisualEnabled = true;
        } else {
          this.$store.set("room-state/room@users.user.magnetometer", 2);
        }
      }).catch(() => {
        this.$store.set("room-state/room@users.user.magnetometer", 2);
      });
    }
  },
  watch: {
    totalPermissions(val) {
      this.popupOpened = !val;
    },
    locationPermissionVisualEnabled(val) {
      if (!val) return;
      this.$root.$emit("startGeolocationWatch");
    },
    orientationPermissionVisualEnabled(val) {
      if (!val) return;
      this.$root.$emit("startOrientationWatch");
    }
  },
  mounted() {
    this.getPermissions();
  }
}
</script>

<style scoped>
.permission-btn {
  height: 50px;
  line-height: 50px;
  width: 70vw;
}

#gps-decline-btn {
  bottom: 0;
  position: absolute;
  width: 100%;
  text-align: center;
}

.permission-section {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0 20px;
}
</style>