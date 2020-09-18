import service from "@/utils/request.js";
/**
 * 分页获取字典列表
 */
export function GetDictionaryPage(data) {
  return service.request({
    method: "post",
    url: "/dictionary/get_dictionary_page",
    data
  });
}
/**
 * 全部获取字典列表
 */
export function GetDictionaryAll(data) {
  return service.request({
    method: "post",
    url: "/dictionary/get_dictionary_all",
    data
  });
}
/**
 * 新增字典信息
 */
export function DictionaryAdd(data) {
  return service.request({
    method: "post",
    url: "/dictionary/dictionary_save_or_update",
    data
  });
}
