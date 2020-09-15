import service from "@/utils/request.js";
/**
 * 注册
 */
export function Register(data) {
  return service.request({
    method: "post",
    url: "/account/register",
    data
  });
}
/**
 * 登陆
 */
export function Login(data) {
  return service.request({
    method: "post",
    url: "/account/login",
    data
  });
}
/**
 * 获取当前登录用户信息
 */
export function GetCurrentUser() {
  return service.request({
    method: "get",
    url: "/account/get_current_user"
  });
}
