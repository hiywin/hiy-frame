import service from "@/utils/request.js";
/**
 * 分页获取字典列表
 */
export function GetDictionaryPage(data) {
  return service.request({
    method: "post",
    url: "/dictionary/get_dictionarys_page",
    data
  });
}
/**
 * 全部获取字典列表
 */
export function GetDictionaryAll(data) {
  return service.request({
    method: "post",
    url: "/dictionary/get_dictionarys_all",
    data
  });
}
/**
 * 新增或编辑字典信息
 */
export function DictionarySaveOrUpdate(data) {
  return service.request({
    method: "post",
    url: "/dictionary/dictionary_save_or_update",
    data
  });
}
/**
 * 删除字典信息
 */
export function DictionaryDelete(data) {
  return service.request({
    method: "post",
    url: "/dictionary/dictionary_delete",
    data
  });
}
