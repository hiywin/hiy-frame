import axios from "axios";
import router from "@/router";
import store from "@/store/index";
import { Message } from "element-ui";
import { getToken, getUserName } from "@/utils/app";

//创建axios，赋值变量service
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devApi";
const service = axios.create({
  baseURL: BASEURL,
  timeout: 1000 * 10
});

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    config.headers.Authorization = "Bearer " + getToken();
    config.headers["UserName"] = getUserName();
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做些什么
    let data = response.data;
    if (data.hasErr) {
      Message.error(data.msg);
      return Promise.reject(data);
    } else {
      return response;
    }
  },
  error => {
    const { response } = error;
    if (response) {
      //请求已发出，但是不在2xx范围
      errorHandle(response.status, response.data);
      return Promise.reject(response);
    } else {
      if (!window.navigator.onLine) {
        Message.error("网络已断开！");
      } else {
        Message.error("无法连接服务器！");
        // 对响应错误做些什么
        return Promise.reject(error);
      }
    }
  }
);

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  //状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      Message.error("请先登录！");
      store.commit("app/SET_TOKEN", "");
      store.commit("app/SET_USERNAME", "");
      toLogin();
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      Message.error("登录过期，请重新登录！");
      store.commit("app/SET_TOKEN", "");
      store.commit("app/SET_USERNAME", "");
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404 请求不存在
    case 404:
      Message.error("请求的资源不存在！");
      break;
    // 500 无法连接服务器
    case 500:
      Message.error("无法连接服务器！");
      break;
    default:
      Message.error(other);
  }
};

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: "/login",
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
};

export default service;
