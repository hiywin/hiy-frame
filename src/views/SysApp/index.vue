<template>
  <div>
    <AppToolVue ref="appTool" @search="search" @dataAdd="dataAdd"></AppToolVue>
    <AppListVue
      ref="appList"
      @searchOk="searchOk"
      @dataEdit="dataEdit"
    ></AppListVue>
    <AppInfoVue ref="appInfo" @submitOk="submitOk"></AppInfoVue>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import AppListVue from "./components/AppList";
import AppToolVue from "./components/AppTool";
import AppInfoVue from "./components/AppInfo";
export default {
  name: "sysApp",
  components: { AppListVue, AppToolVue, AppInfoVue },
  setup(props, { refs }) {
    const data = reactive({
      queryData: {}
    });

    const search = params => {
      refs.appList.search(params);
    };

    const dataAdd = () => {
      refs.appInfo.infoAdd();
    };

    const dataEdit = row => {
      refs.appInfo.infoEdit(row);
    };

    const searchOk = params => {
      refs.appTool.setTagConfig(params);
    };

    const submitOk = () => {
      refs.appList.search(data.queryData);
    };

    return {
      data,

      search,
      dataAdd,
      dataEdit,
      searchOk,
      submitOk
    };
  }
};
</script>
<style lang="scss" scoped></style>
