<template>

</template>

<script>
  import io from "socket.io-client";
  import {getCookie, merge} from "../js/utils";
  import {get} from "vuex-pathify";
  import calcDiff from "deep-diff";

  export default {
    name: "room",
    data() {
      return {
        roomId: null,
        socket: null,
        previousValue: {}
      }
    },
    computed: {
      userData: get("room-state/room@users.user"),
      userId: get("room-state/room@userId")
    },
    watch: {
      userData: {
        deep: true,
        handler(val) {
          if (!this.socket || !this.socket.connected || !this.roomId) return;
          const differences = calcDiff(this.previousValue, val);
          if (!differences) return;
          differences.forEach((difference) => {
            switch (difference.kind) {
              case "E":
                this.socket.emit("update-room", {
                  change: "merge",
                  path: ["users", this.userId, ...difference.path],
                  value: difference.lhs
                });
                break;
              case "N":
                this.socket.emit("update-room", {
                  change: "set",
                  path: ["users", this.userId, ...difference.path],
                  value: difference.rhs
                });
                break;
            }
          });

          this.previousValue = Object.assign({}, val);
        }
      }
    },
    mounted() {
      this.roomId = getCookie("roomId");
      if (!this.roomId) {
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
        const id = data["userId"];
        const currentUserData = this.$store.get("room-state/room@users.user");
        data["users"]["user"] = {...currentUserData, ...data["users"][id]};
        delete data["users"][id];
        this.$store.set("room-state/room", data);
      });

      this.socket.on("update", (data) => {
        console.debug(data);
        let path;
        let currentValue;
        switch (data.type) {
          case "merge":
            path = `room-state/room@${data.path.join(".")}`;
            currentValue = this.$store.get(path);
            const mergedValue = merge(currentValue, data.value);
            this.$store.set(path, mergedValue);
            break;
          case "set":
            path = `room-state/room@${data.path.join(".")}`;
            this.$store.set(path, data.value);
            break;
          case "delete":
            path = `room-state/room@${data.path.slice(0, -1).join(".")}`;
            currentValue = this.$store.get(path);
            delete currentValue[data.path.slice(-1)];
            this.$store.set(path, currentValue);
            break;
        }
      });

      this.socket.on("pong", (latency) => {
        let previousLatency = this.$store.get("room-state/room@users.user.latency", latency);
        if (previousLatency === undefined || previousLatency == null) {
          previousLatency = -10;
        }
        if (Math.abs(previousLatency - latency) >= 10) {
          this.$store.set("room-state/room@users.user.latency", latency);
        }
      });
    },
    destroyed() {
      if (this.socket) {
        this.socket.disconnect();
      }
    }
  }
</script>

<style scoped>

</style>