<template>
  <div>
    <ModuleToolVue
      ref="moduleTool"
      @search="search"
      @dataAdd="dataAdd"
    ></ModuleToolVue>
    <ModuleListVue
      ref="moduleList"
      @searchOk="searchOk"
      @infoAdd="infoAdd"
      @dataEdit="dataEdit"
    ></ModuleListVue>
    <ModuleInfoVue ref="moduleInfo" @submitOk="submitOk"></ModuleInfoVue>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import ModuleListVue from "./component/ModuleList";
import ModuleToolVue from "./component/ModuleTool";
import ModuleInfoVue from "./component/ModuleInfo";
export default {
  name: "moduleList",
  components: { ModuleListVue, ModuleToolVue, ModuleInfoVue },
  setup(props, { refs }) {
    const data = reactive({
      appNo: ""
    });

    const search = queryData => {
      data.appNo = queryData.appNo;
      refs.moduleList.search(queryData);
    };

    const searchOk = params => {
      refs.moduleTool.setTagConfig(params);
    };

    const dataAdd = () => {
      refs.moduleInfo.dataAdd({
        appNo: data.appNo
      });
    };

    const infoAdd = row => {
      refs.moduleInfo.infoAdd({
        appNo: data.appNo,
        moduleNo: row.moduleNo
      });
    };

    const dataEdit = row => {
      refs.moduleInfo.dataEdit(row);
    };

    const submitOk = () => {
      refs.moduleList.getModulesPage();
    };

    return {
      data,

      search,
      searchOk,
      dataAdd,
      infoAdd,
      dataEdit,
      submitOk
    };
  }
};
</script>

<style lang="scss" scoped>
.table-wrap {
  width: 100%;
  margin-top: 5px;
}
</style>
