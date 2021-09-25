import {make} from "vuex-pathify";

const state = {
  room: {
    userId: null, // Also indicates whether the user is connected to a room or not
    followingId: null,
    users: {
      user: {
        name: window.localStorage.getItem("name") || "Person",
        icon: window.localStorage.getItem("icon") || "0",
        focus: true,
        latency: 0,
        connection: 2,
        gps: 2,
        magnetometer: 2
      }
    },
    waypoints: {}
  }
}

const mutations = make.mutations(state);

export default {
  namespaced: true,
  state,
  mutations
}