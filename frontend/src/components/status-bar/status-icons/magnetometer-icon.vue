<template>
  <f7-icon :material="iconState[state]" :size="size"/>
</template>

<script>
  export default {
    name: "magnetometer-icon",
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
          0: "explore",
          1: "explore_off",
          2: "explore_off",
          3: "explore_off"
        }
      }
    }
  }
</script>

<style scoped>

</style>