<template>
  <div class="search-wrap">
    <el-row>
      <el-input
        placeholder="请输入组织名称"
        v-model="data.queryData.groupName"
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
    </el-row>
    <el-row class="margin-top-7">
      <el-button
        type="success"
        class="input-width-100"
        icon="el-icon-circle-plus-outline"
        @click="groupAdd"
        >新增</el-button
      >
      <SearchTagVue ref="searchTag"></SearchTagVue>
    </el-row>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import AppSelectVue from "@c/Select/app";
import SearchTagVue from "@c/SearchTag/index";
export default {
  name: "moduleTool",
  components: { AppSelectVue, SearchTagVue },
  setup(props, { refs, emit }) {
    const data = reactive({
      appConfig: {
        selectClass: "input-width-200",
        selectDefault: true
      },
      queryData: {
        appNo: "",
        groupName: ""
      },
      tagConfig: {
        Hidden: true,
        Code: "",
        Time: ""
      }
    });

    const appSelectChange = () => {
      emit("search", data.queryData);
    };

    const search = () => {
      emit("search", data.queryData);
    };

    const setTagConfig = params => {
      refs.searchTag.searchConfig(params);
    };

    const groupAdd = () => {
      emit("groupAdd");
    };

    return {
      data,

      appSelectChange,
      search,
      setTagConfig,
      groupAdd
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
</style>
