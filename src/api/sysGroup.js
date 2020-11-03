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
