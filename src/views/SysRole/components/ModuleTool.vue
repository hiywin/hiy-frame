<template>
  <div class="search-wrap">
    <el-row>
      <el-input
        placeholder="请输入模块名称"
        v-model="data.queryData.moduleName"
        clearable
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search"
        ></el-button>
      </el-input>
    </el-row>
    <el-row class="margin-top-7">
      <div class="power-wrap">
        <label>所属角色：</label>
        <label class="label-color">{{ data.queryData.roleName }}</label>
        <SearchTagVue ref="searchTag" />
      </div>
    </el-row>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import SearchTagVue from "@c/SearchTag/index";
export default {
  name: "moduleTool",
  components: { SearchTagVue },
  setup(props, { refs, emit }) {
    const data = reactive({
      queryData: {
        roleNo: "",
        roleName: "",
        moduleName: ""
      }
    });

    const search = () => {
      emit("search", data.queryData);
    };

    const setRoleData = params => {
      data.queryData.roleNo = params.roleNo;
      data.queryData.roleName = params.roleName;
    };

    const setTagConfig = params => {
      refs.searchTag.searchConfig(params);
    };

    return {
      data,

      search,
      setRoleData,
      setTagConfig
    };
  }
};
</script>

<style lang="scss" scoped>
.search-wrap {
  padding: 10px 5px;
  background-color: $mainTitleColor;
  border-radius: 3px;
}
.power-wrap {
  line-height: 30px;
  padding-left: 5px;
  background-color: $mainTitleColor;
  border-radius: 3px;
  font-weight: bold;
}
.label-color {
  color: $mainColor;
}
</style>
