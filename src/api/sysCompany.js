import service from "@/utils/request.js";
/**
 * 全部获取公司列表
 */
export function GetCompanyAll(data) {
  return service.request({
    method: "post",
    url: "/company/get_companys_all",
    data
  });
}
/**
 * 分页获取公司列表
 */
export function GetCompanyPage(data) {
  return service.request({
    method: "post",
    url: "/company/get_companys_page",
    data
  });
}
/**
 * 新增或修改公司信息
 */
export function CompanyAddOrUpdate(data) {
  return service.request({
    method: "post",
    url: "/company/company_save_or_update",
    data
  });
}
/**
 * 删除公司信息
 */
export function CompanyDelete(data) {
  return service.request({
    method: "post",
    url: "/company/company_delete",
    data
  });
}
