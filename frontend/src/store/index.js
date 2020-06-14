import Vue from "vue";
import Vuex from "vuex";
import pathify from "vuex-pathify";
import roomState from "./room-state";

pathify.options.deep = 3;

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [pathify.plugin],
  modules: {
    "room-state": roomState
  }
});