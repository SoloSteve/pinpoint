<template>
  
</template>

<script>
  import io from "socket.io-client";
  import {getCookie} from "../js/utils";

  export default {
    name: "room",
    data() {
      return {
        roomId: null,
        socket: null,
      }
    },
    mounted() {
      this.roomId = getCookie("roomId");
      if(!this.roomId) {
        return;
      }

      this.socket = io("localhost:8040", {
        path: "/" + this.roomId.split("-")[0],
        transports: ["websocket"]
      });

      this.socket.on("connect", () => {
        this.socket.emit("join", {roomId: this.roomId});
      });

      this.socket.on("connect_error", () => {

      });

      this.socket.on("exception", (data) => {
        console.error(data);
      });

      this.socket.on("room-data", (data) => {
        console.log(data);
        this.$store.set("room-state/room", data);
      })
    }
  }
</script>

<style scoped>

</style>