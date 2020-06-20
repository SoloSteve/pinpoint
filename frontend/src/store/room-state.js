import {make} from "vuex-pathify";

const state = {
  room: {
    userId: null, // Also indicates whether the user is connected to a room or not
    followingId: null,
    users: {
      user: {
        name: "Person",
        icon: 0,
        latency: 0,
        connection: 2,
        gps: 2,
        magnetometer: 2
      }
    }
  }
}

const mutations = make.mutations(state);

export default {
  namespaced: true,
  state,
  mutations
}