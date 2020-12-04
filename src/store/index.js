import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import app from "./modules/app";
import dic from "./modules/dictionary";
import format from "./modules/formatters";
import tagbar from "./modules/tagbar";

export default new Vuex.Store({
  modules: {
    app,
    dic,
    format,
    tagbar
  }
});
