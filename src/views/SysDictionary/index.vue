<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" :offset="0">
        <DictionaryToolVue
          ref="dictionaryTool"
          @search="search"
          @appSelectChange="appSelectChange"
        ></DictionaryToolVue>
        <DictionaryParentVue
          ref="dictionaryParent"
          @parentClick="parentClick"
          @searchOk="searchOk"
        ></DictionaryParentVue>
      </el-col>
      <el-col :span="18" :offset="0">
        <DictionaryListVue ref="dictionaryList"></DictionaryListVue>
      </el-col>
    </el-row>
    <ParentInfoVue ref="parentInfo"></ParentInfoVue>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import DictionaryToolVue from "./components/DictionaryTool";
import DictionaryParentVue from "./components/DictionaryParent";
import DictionaryListVue from "./components/DictionaryList";
import ParentInfoVue from "./components/ParentInfo";
export default {
  name: "sysDictionary",
  components: {
    DictionaryToolVue,
    DictionaryParentVue,
    DictionaryListVue,
    ParentInfoVue
  },
  setup(props, { refs }) {
    const data = reactive({
      msg: "字典管理"
    });

    const search = params => {
      refs.dictionaryParent.search(params);
    };

    const appSelectChange = params => {
      refs.dictionaryParent.search(params);
    };

    const parentClick = row => {
      refs.dictionaryList.searchSub(row);
    };

    const searchOk = params => {
      refs.dictionaryTool.setTagConfig(params);
    };

    return {
      data,

      search,
      appSelectChange,
      parentClick,
      searchOk
    };
  }
};
</script>
<style lang="scss" scoped></style>
