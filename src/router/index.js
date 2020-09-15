import Vue from "vue";
import VueRouter from "vue-router";
// 引入布局组件
import Layout from "@/views/Layout";
// 解决ElementUI导航栏中的vue-router中3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(localtion) {
  return originalPush.call(this, localtion).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden: true,
    meta: {
      name: "主页"
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: "登陆"
    },
    component: () => import("../views/Login/index.vue")
  },
  {
    path: "/console",
    name: "Console",
    redirect: "index",
    meta: {
      name: "控制台",
      icon: "console"
    },
    component: Layout,
    children: [
      {
        path: "/index",
        name: "Index",
        meta: {
          name: "首页"
        },
        component: () => import("../views/Console/index.vue")
      }
    ]
  },
  {
    path: "/sys",
    name: "Sys",
    meta: {
      name: "系统管理",
      icon: "system"
    },
    component: Layout,
    children: [
      {
        path: "/sysModule",
        name: "SysModule",
        meta: {
          name: "模块管理"
        },
        component: () => import("../views/SysModule/index.vue")
      },
      {
        path: "/sysRole",
        name: "SysRole",
        meta: {
          name: "角色管理"
        },
        component: () => import("../views/SysRole/index.vue")
      },
      {
        path: "/sysUser",
        name: "SysUser",
        meta: {
          name: "用户管理"
        },
        component: () => import("../views/SysUser/index.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
