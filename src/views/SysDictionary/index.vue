<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8" :offset="0">
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
          @infoAdd="infoAdd"
        ></DictionaryParentVue>
      </el-col>
      <el-col :span="16" :offset="0">
        <DictionaryListVue
          ref="dictionaryList"
          @infoEdit="infoEdit"
        ></DictionaryListVue>
      </el-col>
    </el-row>
    <ParentInfoVue ref="parentInfo" @submitOk="parentSubmitOk"></ParentInfoVue>
    <DictionaryInfoVue
      ref="dictionaryInfo"
      @submitOk="infoSubmitOk"
    ></DictionaryInfoVue>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import DictionaryToolVue from "./components/DictionaryTool";
import DictionaryParentVue from "./components/DictionaryParent";
import DictionaryListVue from "./components/DictionaryList";
import ParentInfoVue from "./components/ParentInfo";
import DictionaryInfoVue from "./components/DictionaryInfo";
export default {
  name: "sysDictionary",
  components: {
    DictionaryToolVue,
    DictionaryParentVue,
    DictionaryListVue,
    ParentInfoVue,
    DictionaryInfoVue
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

    const infoAdd = row => {
      refs.dictionaryInfo.infoAdd(row);
    };

    const infoEdit = row => {
      refs.dictionaryInfo.infoEdit(row);
    };

    const infoSubmitOk = () => {
      refs.dictionaryList.getDictionaryAll();
    };

    return {
      data,

      search,
      parentAdd,
      parentClick,
      searchOk,
      parentSubmitOk,
      parentEdit,
      parentDeleteOk,
      infoAdd,
      infoEdit,
      infoSubmitOk
    };
  }
};
</script>
<style lang="scss" scoped></style>
