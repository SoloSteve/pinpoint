<template>
    <f7-navbar>
        <f7-nav-left>
            <f7-block>{{name}}</f7-block>
        </f7-nav-left>
        <f7-nav-title>
            <StatusBarIcon/>
            <StatusBarIcon/>
            <StatusBarIcon/>
        </f7-nav-title>
        <f7-nav-right>
            <GroupButton :count="groupCount" link="/group/"/>
        </f7-nav-right>
    </f7-navbar>
</template>

<script>
  import StatusBarIcon from "./status-bar-icon";
  import GroupButton from "./group-button";

  export default {
    name: "StatusBar",
    components: {GroupButton, StatusBarIcon},
    props: {
      name: {
        type: String,
        required: true
      },
      connection: {
        type: Number,
        required: true
      },
      gps: {
        type: Number,
        required: true
      },
      magnetometer: {
        type: Number,
        required: true
      },
      groupCount: {
        type: Number,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>