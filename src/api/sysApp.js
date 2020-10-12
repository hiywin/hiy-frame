import service from "@/utils/request.js";
/**
 * 全部获取平台列表
 */
export function GetAppAll(data) {
  return service.request({
    method: "post",
    url: "/app/get_apps_all",
    data
  });
}
/**
 * 分页获取平台列表
 */
export function GetAppPage(data) {
  return service.request({
    method: "post",
    url: "/app/get_apps_page",
    data
  });
}
/**
 * 新增或修改平台信息
 */
export function AppAddOrUpdate(data) {
  return service.request({
    method: "post",
    url: "/app/app_save_or_update",
    data
  });
}
/**
 * 删除平台信息
 */
export function AppDelete(data) {
  return service.request({
    method: "post",
    url: "/app/app_delete",
    data
  });
}
