import { GetDictionaryAll } from "@/api/sysDictionary";

// state为静态值，调用方式：root.$store.state.xxx
const state = {
  dictionarys: []
};

// getters为计算值，调用方式：root.$store.getters["dic/getContent"](requestData)
const getters = {
  getContent: state => queryData => {
    if (queryData.Type && queryData.Code) {
      let dics = state.dictionarys.filter(
        p => p.type == queryData.Type && p.code == queryData.Code
      );
      if (dics.length > 0) {
        return dics[0].content;
      }
    }
    return queryData.Code;
  }
};

// mutations为同步操作，调用方式：root.$store.commit()
const mutations = {
  /**
   * 获取并设置字典列表
   */
  SET_DICTIONARY(state, value) {
    state.dictionarys = value;
  }
};

// actions为异步操作，调用方式：root.$store.dispatch()
const actions = {
  getDictionaryAll({ commit }, resquestData) {
    return new Promise((resolve, reject) => {
      GetDictionaryAll(resquestData)
        .then(res => {
          commit("SET_DICTIONARY", res.data.results);
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
