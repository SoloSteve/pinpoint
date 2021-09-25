<template>
  <f7-page name="settings">
    <f7-navbar back-link>
      <f7-nav-title>
        <f7-block>
          Settings
        </f7-block>
      </f7-nav-title>
    </f7-navbar>

    <f7-block-title>Application Information</f7-block-title>
    <f7-list class="state-list" inset media-list>
      <f7-list-item
          :after="`Latency: ${latency}ms`"
          :text="connectionToText.long[connectionState]"
          :title="connectionToText.short[connectionState]"
      >
        <ConnectionIcon :state="connectionState" :style="{color: stateToColor[connectionState]}" size="36px"
                        slot="media"/>
      </f7-list-item>
      <f7-list-item
          :after="Number.isFinite(accuracy) ? `Accuracy: ${Math.round(accuracy)}m`: null"
          :text="locationServiceToText.long[locationState]"
          :title="locationServiceToText.short[locationState]"
      >
        <LocationServicesIcon :state="locationState" :style="{color: stateToColor[locationState]}" size="36px"
                              slot="media"/>
      </f7-list-item>
      <f7-list-item
          :text="magnetometerToText.long[magnetometerState]"
          :title="magnetometerToText.short[magnetometerState]"
      >
        <MagnetometerIcon :state="magnetometerState" :style="{color: stateToColor[magnetometerState]}" size="36px"
                              slot="media"/>
      </f7-list-item>
    </f7-list>

    <f7-block-title>Avatar Customization</f7-block-title>
    <f7-list inset>
      <f7-list-item :title="userName" after="Finder" header="Your Name" id="avatar-preview">
        <img :src="getAvatar(userIcon).img" alt="Avatar" slot="media"/>
      </f7-list-item>
    </f7-list>
    <f7-list no-hairlines-md>
      <f7-list-input
          :value="userName"
          @blur="userName = $event.target.value"
          clear-button
          floating-label
          label="Name"
          maxlength="12"
          minlength="2"
          outline
          placeholder="Your Nickname"
          type="text"
      >
      </f7-list-input>
      <f7-list-item
          :smart-select-params="{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Search Icons'}"
          smart-select
          title="Icon">
        <label>
          <select name="icon" required v-model="userIcon">
            <optgroup :label="group.name"
                      v-for="group in allIcons"
            >
              <option :data-option-image="icon.img"
                      :key="icon.id"
                      :selected="icon.id === userIcon"
                      :value="icon.id"
                      v-for="icon in group"
              >
                {{icon.name}}
              </option>
            </optgroup>
          </select>
        </label>
      </f7-list-item>
    </f7-list>
    <f7-toolbar bottom id="pwa-toolbar" v-if="shouldShowPwa">
      <img alt="PWA" src="/static/icons/ui/pwa-logo.svg" width="40px"/>
      <span>Add To Home Screen</span>
      <f7-button @click="onPwaClick" fill raised>Install</f7-button>
    </f7-toolbar>
  </f7-page>
</template>

<script>
import ConnectionIcon from "../components/status-bar/status-icons/connection-icon";
import {get, sync} from "vuex-pathify";
import LocationServicesIcon from "../components/status-bar/status-icons/location-services-icon";
import {avatars, pickOrder} from "../js/avatars";
import MagnetometerIcon from "../components/status-bar/status-icons/magnetometer-icon";

export default {
  name: "settings",
  components: {MagnetometerIcon, LocationServicesIcon, ConnectionIcon},
  data() {
    return {
      shouldShowPwa: false,
      stateToColor: {
        0: "yellowgreen",
        1: "yellow",
        2: "red",
        3: "red",
        4: "red"
      },
        connectionToText: {
          short: {
            0: "Connected",
            1: "Bad Connection",
            2: "Not Connected",
            3: "No Group"
          },
          long: {
            0: "You are connected to the server, everything seems good.",
            1: "You are connected, but the communication speed is slow (high latency).",
            2: "You are not communicating with the server. Are you connected to the internet?",
            3: "You are not in a group, create one or join someone else's!"
          }
        },
        locationServiceToText: {
          short: {
            0: "Accurate Location",
            1: "Inaccurate Location",
            2: "Not Enabled",
            3: "Permission Denied",
            4: "Permission Dismissed"
          },
          long: {
            0: "GPS is working and your location is accurate.",
            1: "GPS is working, but unable to find your location. Try going outside.",
            2: "Your GPS is Disabled, go into your device settings to turn it on, and refresh the page.",
            3: "You denied permission to access your location. Go to the web page settings to re-enable permission prompt.",
            4: "You have not enabled access to your location. Refresh the page to be prompted again.",
          }
        },
        magnetometerToText: {
          short: {
            0: "Working Direction",
            1: "Inaccurate Direction",
            2: "Direction Unavailable",
            3: "No Permission"
          },
          long: {
            0: "Orientation sensor is working and accurate.",
            1: "Orientation sensor is inaccurate, are you inside a metal vehicle? Try to rotate your device around itself.",
            2: "Orientation sensor is not available.",
            3: "You have not enabled access to orientation sensor."
          }
        }
      }
    },
    computed: {
      connectionState: get("room-state/room@users.user.connection"),
      latency: get("room-state/room@users.user.latency"),
      accuracy: get("room-state/room@users.user.position.accuracy"),
      locationState: get("room-state/room@users.user.gps"),
      magnetometerState: get("room-state/room@users.user.magnetometer"),
      userName: sync("room-state/room@users.user.name"),
      userIcon: sync("room-state/room@users.user.icon"),
      allIcons() {
        const groups = {};
        Object.entries(avatars).forEach((avatar) => {
          const avatarId = avatar[0];
          const group = avatar[1].type;
          avatar[1].id = avatarId;
          if (!groups.hasOwnProperty(group)) {
            groups[group] = [];
            groups[group].name = group
          }
          groups[group].push(avatar[1]);
        });
        return Object.values(groups)
          .filter(group => pickOrder.includes(group.name))
          .sort((group1, group2) => {
            return pickOrder.indexOf(group1.name) - pickOrder.indexOf(group2.name);
          });
      }
    },
    methods: {
      getAvatar(id) {
        return avatars[id];
      },
      onPwaClick() {
        // Show the prompt
        window.deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            // hide our user interface that shows our A2HS button
            this.shouldShowPwa = false;
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          window.deferredPrompt = null;
        });
      }
    },
    mounted() {
      window.addEventListener("ready-for-pwa", () => {
        this.shouldShowPwa = window.deferredPrompt !== null
      });

      this.shouldShowPwa = window.deferredPrompt !== null
    }
  }
</script>

<style scoped>

</style>

<style>
  .list.inset.state-list ul {
    background-color: #eeeeee;
    border-radius: 10px;
  }

  #avatar-preview {
    background-color: #eeeeee;
    border-radius: 10px;
    margin-right: 50px;
    margin-left: 50px;
  }

  #pwa-toolbar > .toolbar-inner {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
</style>