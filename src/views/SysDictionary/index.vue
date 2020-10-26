<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="7" :offset="0">
        <DictionaryToolVue
          ref="dictionaryTool"
          @search="search"
          @parentAdd="parentAdd"
        ></DictionaryToolVue>
        <DictionaryParentVue
          ref="dictionaryParent"
          @parentClick="parentClick"
          @searchOk="searchOk"
          @dataEdit="parentEdit"
          @deleteOk="parentDeleteOk"
        ></DictionaryParentVue>
      </el-col>
      <el-col :span="17" :offset="0">
        <DictionaryListVue ref="dictionaryList"></DictionaryListVue>
      </el-col>
    </el-row>
    <ParentInfoVue ref="parentInfo" @submitOk="parentSubmitOk"></ParentInfoVue>
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

    const parentAdd = params => {
      refs.parentInfo.dataAdd(params);
    };

    const parentClick = row => {
      refs.dictionaryList.searchSub(row);
    };

    const searchOk = params => {
      refs.dictionaryTool.setTagConfig(params);
    };

    const parentSubmitOk = () => {
      refs.dictionaryParent.getDictionaryPage();
    };

    const parentEdit = row => {
      refs.parentInfo.dataEdit(row);
    };

    const parentDeleteOk = () => {
      refs.dictionaryList.searchSub({
        dictionaryNo: "-1",
        content: ""
      });
    };

    return {
      data,

      search,
      parentAdd,
      parentClick,
      searchOk,
      parentSubmitOk,
      parentEdit,
      parentDeleteOk
    };
  }
};
</script>
<style lang="scss" scoped></style>
