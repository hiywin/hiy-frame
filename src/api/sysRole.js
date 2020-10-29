import service from "@/utils/request.js";
/**
 * 全部获取角色列表
 */
export function GetRoleAll(data) {
  return service.request({
    method: "post",
    url: "/role/get_roles_all",
    data
  });
}
/**
 * 分页获取角色列表
 */
export function GetRolePage(data) {
  return service.request({
    method: "post",
    url: "/role/get_roles_page",
    data
  });
}
/**
 * 新增或修改角色信息
 */
export function RoleAddOrUpdate(data) {
  return service.request({
    method: "post",
    url: "/role/role_save_or_update",
    data
  });
}
/**
 * 删除角色
 */
export function RoleDelete(data) {
  return service.request({
    method: "post",
    url: "/role/role_delete",
    data
  });
}
/**
 * 分页获取角色模块列表
 */
export function GetRoleModulePage(data) {
  return service.request({
    method: "post",
    url: "/role/get_role_modules_page",
    data
  });
}
/**
 * 获取所有角色模块列表
 */
export function GetRoleModuleAll(data) {
  return service.request({
    method: "post",
    url: "/role/get_role_modules_all",
    data
  });
}
/**
 * 更新角色模块权限
 */
export function RoleModuleSaveOrUpdate(data) {
  return service.request({
    method: "post",
    url: "/role/role_module_save_or_update",
    data
  });
}
/**
 * 更新角色按钮权限
 */
export function RolePowerSaveOrUpdate(data) {
  return service.request({
    method: "post",
    url: "/role/role_power_save_or_update",
    data
  });
}
/**
 * 删除模块权限及所属按钮权限
 */
export function RoleModuleDelete(data) {
  return service.request({
    method: "post",
    url: "/role/role_module_delete",
    data
  });
}
