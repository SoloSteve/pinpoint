import {make} from "vuex-pathify";

const state = {
  room: {
    userId: null,
    users: {
      user: {
        name: "You",
        latency: 0
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