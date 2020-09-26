import service from "@/utils/request.js";
/**
 * 全部获取按钮列表
 */
export function GetPowerAll(data) {
  return service.request({
    method: "post",
    url: "/power/get_powers_all",
    data
  });
}
/**
 * 分页获取按钮列表
 */
export function GetPowerPage(data) {
  return service.request({
    method: "post",
    url: "/power/get_powers_page",
    data
  });
}
/**
 * 新增或修改按钮信息
 */
export function PowerAddOrUpdate(data) {
  return service.request({
    method: "post",
    url: "/power/power_save_or_update",
    data
  });
}
/**
 * 删除按钮信息
 */
export function PowerDelete(data) {
  return service.request({
    method: "post",
    url: "/power/power_delete",
    data
  });
}
