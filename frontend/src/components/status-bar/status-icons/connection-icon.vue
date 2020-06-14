<template>
  <f7-icon :material="iconState[state]" :size="size"/>
</template>

<script>
  export default {
    name: "connection-icon",
    props: {
      state: {
        type: Number,
        required: true
      },
      size: {
        type: String
      }
    },
    data() {
      return {
        iconState: {
          0: "wifi",
          1: "network_check",
          2: "wifi_off"
        }
      }
    }
  }
</script>

<style scoped>

</style>