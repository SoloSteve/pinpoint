<template>
  <f7-page name="group">
    <f7-navbar back-link>
      <f7-nav-title>Your Group</f7-nav-title>
      <f7-nav-right>
        <f7-block>
          <f7-chip ref="chip" :text="roomId" class="elevation-1 group-chip" @click="selectGroupId">
            <f7-icon class="group-chip-icon" slot="media" f7="number"/>
          </f7-chip>
        </f7-block>
      </f7-nav-right>
    </f7-navbar>
    <contact-list :users="users" v-if="users.length > 0"/>
    <div id="group-empty-block" v-else>
      <f7-block-title>
        Group Is Empty
      </f7-block-title>
      <f7-block-header>
        Invite people using the invite buttons below, or send them this link:
      </f7-block-header>
      <f7-block-footer>
        <span @click="selectLink" id="room-link">
          {{joinString}}
        </span>
      </f7-block-footer>
    </div>
    <f7-toolbar bottom labels>
      <f7-block class="invite-block">
        <f7-icon icon="fas fa-user-plus"/>
        Invite
      </f7-block>
      <f7-link @click="inviteViaSms" class="no-caps sms" icon="fas fa-sms" text="SMS"/>
      <f7-link @click="inviteViaWhatsapp" class="no-caps whatsapp" icon="fab fa-whatsapp" text="WhatsApp"/>
      <!--      <f7-link class="no-caps fb-messenger" icon="fab fa-facebook-messenger" text="Messenger"/>-->
    </f7-toolbar>

  </f7-page>
</template>

<script>
  import ContactList from "../components/group/contact-list";
  import {getCookie} from "../js/utils";

  export default {
    name: "group",
    components: {ContactList},
    data() {
      return {}
    },
    props: {},
    methods: {
      selectText(element) {
        const selection = window.getSelection();
        const range = document.createRange();
        element.style.lineHeight = "20px";
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
      },
      selectGroupId() {
        const textElement = this.$refs.chip.$el.getElementsByClassName("chip-label")[0];
        this.selectText(textElement);
      },
      selectLink() {
        const textElement = document.getElementById("room-link");
        this.selectText(textElement);
      },
      inviteViaWhatsapp: function () {
        window.open(`whatsapp://send?text=${this.inviteString}`);
      },
      inviteViaSms: function () {
        if (this.$f7.device.ios) {
          window.open(`sms:&body=${this.inviteString}`);
        } else if (this.$f7.device.android) {
          window.open(`sms:?body=${this.inviteString}`);
        } else {
          this.$f7.dialog.alert("Unable to invite through SMS from this device at this time", "Unsupported Device");
        }
      }
    },
    computed: {
      roomId() {
        return getCookie("roomId") || "";
      },
      users() {
        return Object.entries(this.$store.get("room-state/room@users")).map(([id, user]) => {
          return {...user, id};
        }).filter((user) => user.id !== "user");
      },
      inviteString() {
        return `Hey, let's find each other! ${this.joinString()}`;
      },
      joinString() {
        return `${window.location.origin}/room/${this.roomId}`;
      }
    }
  }
</script>

<style scoped>
  .group-chip {
    font-size: 14px;
    color: black;
    background-color: #e0e0e0
  }

  .group-chip-icon {
    font-weight: bolder;
    color: #676767;
  }

  .no-caps {
    text-transform: none;
  }

  .sms {
    background-color: rebeccapurple;
    color: white;
  }

  .whatsapp {
    background-color: #4cd964;
    color: white;
  }

  .fb-messenger {
    background-color: #0c82df;
    color: white;
  }

  .invite-block {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #group-empty-block {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>