<template>
  <f7-block>
    <f7-button
        v-if="isConnected"
        :href="link"
        color="green"
        outline raised
    >
      <f7-icon material="group"/>
      <f7-badge color="blue">{{count}}</f7-badge>
    </f7-button>
    <f7-button
        v-else
        @click="createRoom"
        color="green"
        outline raised
    >
      <f7-icon material="add"/>
    </f7-button>
  </f7-block>
</template>

<script>
  export default {
    name: "GroupButton",
    props: {
      link: {
        type: String,
        required: true
      },
      count: {
        type: Number,
        required: true
      }
    },
    methods: {
      createRoom() {
        this.$f7.dialog.confirm("Would you like to create a group?", "Create A Group", () => {
          window.location.href = "/create";
        });
      }
    },
    computed: {
      isConnected() {
        return this.$store.get("room-state/room@userId") !== null;
      }
    }
  }
</script>

<style scoped>

</style>