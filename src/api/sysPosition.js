import service from "@/utils/request.js";
/**
 * 全部获取职位列表
 */
export function GetPositionAll(data) {
  return service.request({
    method: "post",
    url: "/position/get_positions_all",
    data
  });
}
/**
 * 分页获取职位列表
 */
export function GetPositionPage(data) {
  return service.request({
    method: "post",
    url: "/position/get_positions_page",
    data
  });
}
/**
 * 新增或修改职位信息
 */
export function PositionAddOrUpdate(data) {
  return service.request({
    method: "post",
    url: "/position/position_save_or_update",
    data
  });
}
/**
 * 删除职位信息
 */
export function PositionDelete(data) {
  return service.request({
    method: "post",
    url: "/position/position_delete",
    data
  });
}
/**
 * 获取职位所属角色列表
 */
export function GetPositionRoleAll(data) {
  return service.request({
    method: "post",
    url: "/position/get_position_roles_all",
    data
  });
}
/**
 * 更新职业角色信息
 */
export function PositionRoleSaveOrUpdate(data) {
  return service.request({
    method: "post",
    url: "/position/position_role_save_or_update",
    data
  });
}
/**
 * 删除职位角色信息
 */
export function PositionRoleDelete(data) {
  return service.request({
    method: "post",
    url: "/position/position_role_delete",
    data
  });
}
