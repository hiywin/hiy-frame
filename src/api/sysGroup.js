import service from "@/utils/request.js";
/**
 * 全部获取组织列表
 */
export function GetGroupAll(data) {
  return service.request({
    method: "post",
    url: "/group/get_groups_all",
    data
  });
}
/**
 * 分页获取组织列表
 */
export function GetGroupPage(data) {
  return service.request({
    method: "post",
    url: "/group/get_groups_page",
    data
  });
}
/**
 * 新增或修改组织信息
 */
export function GroupAddOrUpdate(data) {
  return service.request({
    method: "post",
    url: "/group/group_save_or_update",
    data
  });
}
/**
 * 删除组织信息
 */
export function GroupDelete(data) {
  return service.request({
    method: "post",
    url: "/group/group_delete",
    data
  });
}
/**
 * 获取所有组织用户
 */
export function GetGroupUsersAll(data) {
  return service.request({
    method: "post",
    url: "/group/get_group_users_all",
    data
  });
}
/**
 * 新增或修改组织用户
 */
export function GroupUserSaveOrUpdate(data) {
  return service.request({
    method: "post",
    url: "/group/group_user_save_or_update",
    data
  });
}
/**
 * 删除组织用户
 */
export function GroupUserDelete(data) {
  return service.request({
    method: "post",
    url: "/group/group_user_delete",
    data
  });
}
/**
 * 获取所有组织角色
 */
export function GetGroupRolesAll(data) {
  return service.request({
    method: "post",
    url: "/group/get_group_roles_all",
    data
  });
}
/**
 * 新增或修改组织角色
 */
export function GroupRoleSaveOrUpdate(data) {
  return service.request({
    method: "post",
    url: "/group/group_role_save_or_update",
    data
  });
}
/**
 * 删除组织角色
 */
export function GroupRoleDelete(data) {
  return service.request({
    method: "post",
    url: "/group/group_role_delete",
    data
  });
}
