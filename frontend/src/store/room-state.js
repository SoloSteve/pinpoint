import {make} from "vuex-pathify";

const state = {
  room: {
    userId: null,
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