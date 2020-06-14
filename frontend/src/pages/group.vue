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
    <contact-list :users="users"/>
    <f7-toolbar bottom labels>
      <f7-block class="invite-block">
        <f7-icon icon="fas fa-user-plus"/>
        Invite
      </f7-block>
      <f7-link class="no-caps sms" icon="fas fa-sms" text="SMS"/>
      <f7-link class="no-caps whatsapp" icon="fab fa-whatsapp" text="WhatsApp"/>
      <f7-link class="no-caps fb-messenger" icon="fab fa-facebook-messenger" text="Messenger"/>
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
      return {
        users: [
          {
            name: "Abby",
            location: {
              lat: 0,
              lng: 0,
              speed: 4,
              accuracy: 9,
              heading: 47
            },
            status: {
              connection: "Online",
              location: 0,
            }
          },
          {
            name: "Gabby",
            location: {
              lat: 0,
              lng: 0,
              speed: 4,
              accuracy: 9,
              heading: 47
            },
            status: {
              connection: "Online",
              location: 0,
            }
          },
          {
            name: "Dave",
            location: {
              lat: 0,
              lng: 0,
              speed: 4,
              accuracy: 9,
              heading: 47
            },
            status: {
              connection: "Online",
              location: 0,
            }
          },
          {
            name: "Justin",
            location: {
              lat: 0,
              lng: 0,
              speed: 4,
              accuracy: 9,
              heading: 47
            },
            status: {
              connection: "Online",
              location: 0,
            }
          },
          {
            name: "Andrew",
            location: {
              lat: 0,
              lng: 0,
              speed: 4,
              accuracy: 9,
              heading: 47
            },
            status: {
              connection: "Online",
              location: 0,
            }
          },
          {
            name: "Steve",
            location: {
              lat: 0,
              lng: 0,
              speed: 4,
              accuracy: 9,
              heading: 47
            },
            status: {
              connection: "Online",
              location: 0,
            }
          },
          {
            name: "Kevin",
            location: {
              lat: 0,
              lng: 0,
              speed: 4,
              accuracy: 9,
              heading: 47
            },
            status: {
              connection: "Online",
              location: 0,
            }
          },
          {
            name: "Joe",
            location: {
              lat: 0,
              lng: 0,
              speed: 4,
              accuracy: 9,
              heading: 47
            },
            status: {
              connection: "Online",
              location: 0,
            }
          },
          {
            name: "Connor",
            location: {
              lat: 0,
              lng: 0,
              speed: 4,
              accuracy: 9,
              heading: 47
            },
            status: {
              connection: "Online",
              location: 0,
            }
          },
          {
            name: "John",
            location: {
              lat: 0,
              lng: 0,
              speed: 4,
              accuracy: 9,
              heading: 47
            },
            status: {
              connection: "Online",
              location: 0,
            }
          },
          {
            name: "Bill",
            location: {
              lat: 0,
              lng: 0,
              speed: 4,
              accuracy: 9,
              heading: 47
            },
            status: {
              connection: "Online",
              location: 0,
            }
          },
          {
            name: "Sam",
            location: {
              lat: 0,
              lng: 0,
              speed: 4,
              accuracy: 9,
              heading: 47
            },
            status: {
              connection: "Online",
              location: 0,
            }
          },
        ]
      }
    },
    props: {},
    methods: {
      selectGroupId() {
        const selection = window.getSelection();
        const range = document.createRange();
        const textElement = this.$refs.chip.$el.getElementsByClassName("chip-label")[0];
        textElement.style.lineHeight = "20px";
        range.selectNodeContents(textElement);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    },
    computed: {
      roomId() {
        return getCookie("roomId") || "";
      },
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
</style>