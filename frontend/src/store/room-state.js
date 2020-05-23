import {make} from "vuex-pathify";
import Vue from "vue";

const state = {
  room: {
    users: {}
  }
}

const mutations = make.mutations(state);

export default {
  namespaced: true,
  state,
  mutations
}