<template>

</template>

<script>
  import {get} from "vuex-pathify";

  export default {
    name: "configuration-saver",
    computed: {
      name: get("room-state/room@users.user.name"),
      icon: get("room-state/room@users.user.icon")
    },
    watch: {
      name(val) {
        window.localStorage.setItem("name", val);
      },
      icon(val) {
        window.localStorage.setItem("icon", val);
      }
    }
  }
</script>

<style scoped>

</style>