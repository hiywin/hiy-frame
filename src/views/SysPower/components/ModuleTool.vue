<template>
  <div>
    <el-input
      placeholder="请输入模块名称"
      v-model="data.queryData.moduleName"
      class="input-with-select"
      clearable
      ><AppSelectVue
        slot="prepend"
        :config="data.appConfig"
        :selectValue.sync="data.queryData.appNo"
        @selectChangeEmit="appSelectChange"
      ></AppSelectVue>
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
import AppSelectVue from "@c/Select/app";
export default {
  name: "moduleTool",
  components: { AppSelectVue },
  setup(props, { emit }) {
    const data = reactive({
      appConfig: {
        selectClass: "input-width-120",
        selectDefault: true
      },
      queryData: {
        appNo: "",
        moduleName: ""
      }
    });

    const appSelectChange = () => {
      emit("search", data.queryData);
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
