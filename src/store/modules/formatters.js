import { GetAppAll } from "@/api/sysApp";
import { GetCompanyAll } from "@/api/sysCompany";

const state = {
  apps: [],
  companys: []
};

const getters = {
  getAppName: state => params => {
    if (params.appNo) {
      let infos = state.apps.filter(p => p.appNo == params.appNo);
      if (infos.length > 0) {
        return infos[0].appName;
      }
    }
    return params.appNo;
  },
  getCompanyName: state => params => {
    if (params.companyNo) {
      let infos = state.companys.filter(p => p.companyNo == params.companyNo);
      if (infos.length > 0) {
        return infos[0].companyName;
      }
    }
    return params.companyNo;
  }
};

const mutations = {
  SET_APP(state, value) {
    state.apps = value;
  },
  SET_COMPANY(state, value) {
    state.companys = value;
  }
};

const actions = {
  getAppAll({ commit }, queryData) {
    return new Promise((resolve, reject) => {
      GetAppAll(queryData)
        .then(res => {
          commit("SET_APP", res.data.results);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getCompanyAll({ commit }, queryData) {
    return new Promise((resolve, reject) => {
      GetCompanyAll(queryData)
        .then(res => {
          commit("SET_COMPANY", res.data.results);
          resolve(res);
        })
        .catch(err => {
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
