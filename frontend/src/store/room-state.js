import {make} from "vuex-pathify";

const state = {
  room: {
    userId: null,
    users: {
      user: {
        name: "You",
        icon: 0,
        latency: 0,
        connection: 2,
        gps: 2,
        magnetometer: 1
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