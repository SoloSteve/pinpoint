<template>
    <IOdometer
            class="iOdometer"
    />
</template>

<script>
  import IOdometer from 'vue-odometer';
  import 'odometer/themes/odometer-theme-default.css';

  export default {
    name: "distance",
    components: {
      IOdometer
    }
  }
</script>

<style scoped>

</style>