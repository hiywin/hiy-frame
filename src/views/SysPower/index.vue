<template>
  <el-row :gutter="10">
    <el-col :span="6">
      <ModuleToolVue
        @appSelectChange="appSelectChange"
        @search="search"
      ></ModuleToolVue>
      <ModuleTableVue ref="moduleTable"></ModuleTableVue>
    </el-col>
    <el-col :span="18">
      <PowerListVue></PowerListVue>
    </el-col>
  </el-row>
</template>
<script>
import { reactive } from "@vue/composition-api";
import ModuleTableVue from "./components/ModuleTable";
import ModuleToolVue from "./components/ModuleTool";
import PowerListVue from "./components/PowerList";
export default {
  name: "sysPower",
  components: { ModuleTableVue, ModuleToolVue, PowerListVue },
  setup(props, { refs }) {
    const data = reactive({});

    // 选中平台搜索
    const appSelectChange = params => {
      refs.moduleTable.search(params);
    };

    // 点击查询搜索
    const search = params => {
      refs.moduleTable.search(params);
    };

    return {
      data,

      appSelectChange,
      search
    };
  }
};
</script>
<style lang="scss" scoped></style>
