const state = {
  tagList: [],
  activeTag: "/index"
};

const getters = {};

const mutations = {
  SELECT_TAG(state, data) {
    state.activeTag = data.path;
  },
  ADD_TAG(state, data) {
    let flag = false;
    for (let i = 0; i < state.tagList.length; i++) {
      if (state.tagList[i].path == data.path) {
        flag = true;
      }
    }
    if (!flag) {
      state.tagList.push(data);
    }
    state.activeTag = data.path;
  },
  REMOVE_TAG(state, data) {
    for (let i = 0; i < state.tagList.length; i++) {
      if (state.tagList[i].path == data.path) {
        if (data.path == state.activeTag) {
          let nextTag = state.tagList[i + 1] || state.tagList[i - 1];
          if (nextTag) {
            state.activeTag = nextTag.path;
          }
        }
        state.tagList.splice(i, 1);
      }
    }
  },
  CLEAR_TAG() {
    state.tagList.splice(0, state.tagList.length);
  }
};

const actions = {
  selectTag({ commit }, params) {
    commit("SELECT_TAG", params);
  },
  addTag({ commit }, params) {
    commit("ADD_TAG", params);
  },
  removeTag({ commit }, params) {
    commit("REMOVE_TAG", params);
  },
  clearTags({ commit }) {
    commit("CLEAR_TAG");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
