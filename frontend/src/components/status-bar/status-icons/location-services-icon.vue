<template>
  <f7-icon :material="iconState[state]" :size="size"/>
</template>

<script>
  export default {
    name: "location-services-icon",
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
          0: "gps_fixed",
          1: "gps_not_fixed",
          2: "gps_off",
          3: "gps_off",
          4: "gps_off"
        }
      }
    }
  }
</script>

<style scoped>

</style>