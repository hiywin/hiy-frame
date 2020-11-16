<template>
  <div class="search-wrap">
    <el-row>
      <el-input
        placeholder="请输入主类型关键字"
        v-model="data.queryData.content"
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
        @click="parentAdd"
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
  name: "dictionaryTool",
  components: { AppSelectVue, SearchTagVue },
  setup(props, { emit, refs }) {
    const data = reactive({
      queryData: {
        content: "",
        appNo: null
      },
      appConfig: {
        selectClass: "input-width-120",
        selectDefault: true
      },
      tagConfig: {
        Hidden: false,
        Code: "",
        Time: ""
      }
    });

    const search = () => {
      emit("search", data.queryData);
    };

    const appSelectChange = () => {
      emit("search", data.queryData);
    };

    const setTagConfig = params => {
      refs.searchTag.searchConfig(params);
    };

    const parentAdd = () => {
      emit("parentAdd", data.queryData);
    };

    return {
      data,

      search,
      appSelectChange,
      setTagConfig,
      parentAdd
    };
  }
};
</script>
<style lang="scss" scoped>
.search-wrap {
  padding: 10px 5px 0 5px;
  background-color: $mainTitleColor;
  border-radius: 3px;
}
</style>
