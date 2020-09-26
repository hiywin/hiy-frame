<template>
  <div>
    <el-input
      placeholder="请输入模块名称"
      v-model="data.queryData.ModuleName"
      class="input-with-select"
      clearable
      ><SelectVue
        slot="prepend"
        :config="data.appConfig"
        :selectValue.sync="data.queryData.App"
        @selectChangeEmit="appSelectChange"
      ></SelectVue>
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="search"
      ></el-button>
    </el-input>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import SelectVue from "@c/Select/index";
export default {
  name: "moduleTool",
  components: { SelectVue },
  setup(props, { emit }) {
    const data = reactive({
      appConfig: {
        Type: "AppType",
        SelectValue: "0",
        SelectClass: "input-width-120",
        Disabled: false
      },
      queryData: {
        App: "0",
        ModuleName: ""
      }
    });

    const appSelectChange = () => {
      emit("appSelectChange", data.queryData);
    };

    const search = () => {
      emit("search", data.queryData);
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
