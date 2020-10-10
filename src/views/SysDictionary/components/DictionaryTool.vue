<template>
  <div class="search-wrap">
    <el-row>
      <el-input
        placeholder="请输入主类型关键字"
        v-model="data.queryData.content"
        class="input-with-select"
        clearable
        ><SelectVue
          slot="prepend"
          :config="data.appConfig"
          :selectValue.sync="data.queryData.app"
          @selectChangeEmit="appSelectChange"
        ></SelectVue>
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
        class="input-width-70"
        icon="el-icon-plus"
        size="mini"
        @click="parentAdd"
        >新增</el-button
      >
      <SearchTagVue ref="searchTag"></SearchTagVue>
    </el-row>
  </div>
</template>
<script>
import { onMounted, reactive } from "@vue/composition-api";
import SelectVue from "@c/Select/index";
import SearchTagVue from "@c/SearchTag/index";
export default {
  name: "dictionaryTool",
  components: { SelectVue, SearchTagVue },
  setup(props, { emit, refs }) {
    const data = reactive({
      queryData: {
        content: "",
        app: ""
      },
      appConfig: {
        Type: "AppType",
        SelectValue: "0",
        SelectClass: "input-width-120",
        Disabled: false
      },
      tagConfig: {
        Hidden: true,
        Code: "",
        Time: ""
      }
    });

    const search = () => {
      emit("search", data.queryData);
    };

    const appSelectChange = () => {
      emit("appSelectChange", data.queryData);
    };

    const setTagConfig = params => {
      refs.searchTag.searchConfig(params);
    };

    const parentAdd = () => {
      console.log("parentAdd");
    };

    onMounted(() => {
      search();
    });

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
