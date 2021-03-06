import service from "@/utils/request.js";
/**
 * 全部获取用户列表
 */
export function GetUsersAll(data) {
  return service.request({
    method: "post",
    url: "/user/get_users_all",
    data
  });
}
/**
 * 分页获取用户列表
 */
export function GetUsersPage(data) {
  return service.request({
    method: "post",
    url: "/user/get_users_page",
    data
  });
}
/**
 * 新增或修改用户信息
 */
export function UserAddOrUpdate(data) {
  return service.request({
    method: "post",
    url: "/user/user_save_or_update",
    data
  });
}
/**
 * 删除用户信息
 */
export function UserDelete(data) {
  return service.request({
    method: "post",
    url: "/user/user_delete",
    data
  });
}
/**
 * 获取所有用户角色
 */
export function GetUserRoleAll(data) {
  return service.request({
    method: "post",
    url: "/user/get_user_roles_all",
    data
  });
}
/**
 * 更新用户角色
 */
export function UserRoleSaveOrUpdate(data) {
  return service.request({
    method: "post",
    url: "/user/user_role_save_or_update",
    data
  });
}
/**
 * 删除用户角色
 */
export function UserRoleDelete(data) {
  return service.request({
    method: "post",
    url: "/user/user_role_delete",
    data
  });
}
