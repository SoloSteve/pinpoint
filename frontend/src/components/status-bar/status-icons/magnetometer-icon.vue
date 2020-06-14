<template>
  <f7-icon :material="iconState[state]"/>
</template>

<script>
  export default {
    name: "magnetometer-icon",
    props: {
      state: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        iconState: {
          0: "explore",
          1: "explore_off",
        }
      }
    }
  }
</script>

<style scoped>

</style>