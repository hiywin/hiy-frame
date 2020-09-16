import service from "@/utils/request.js";
/**
 * 分页获取模块列表
 */
export function GetModulePage(data) {
  return service.request({
    method: "post",
    url: "/module/get_modules_page",
    data
  });
}
/**
 * 全部获取模块列表
 */
export function GetModuleAll(data) {
  return service.request({
    method: "post",
    url: "/module/get_modules_all",
    data
  });
}
/**
 * 新增模块信息
 */
export function ModuleAdd(data) {
  return service.request({
    method: "post",
    url: "/module/module_save_or_update",
    data
  });
}
