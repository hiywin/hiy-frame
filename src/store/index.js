import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import app from "./modules/app";
import dic from "./modules/dictionary";

export default new Vuex.Store({
  modules: {
    app,
    dic
  }
});
