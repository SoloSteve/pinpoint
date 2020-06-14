<template>
  <f7-block>
    <f7-button :href="link" color="green" outline raised>
      <f7-icon material="group">
      </f7-icon>
      <f7-badge color="blue">{{count}}</f7-badge>
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
    }
  }
</script>

<style scoped>

</style>