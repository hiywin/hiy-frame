<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" :offset="0">
        <DictionaryToolVue
          ref="dictionaryTool"
          @search="search"
        ></DictionaryToolVue>
        <DictionaryParentVue
          ref="dictionaryParent"
          @parentClick="parentClick"
        ></DictionaryParentVue>
      </el-col>
      <el-col :span="18" :offset="0">
        <DictionaryListVue ref="dictionaryList"></DictionaryListVue>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import DictionaryToolVue from "./components/DictionaryTool";
import DictionaryParentVue from "./components/DictionaryParent";
import DictionaryListVue from "./components/DictionaryList";
export default {
  name: "sysDictionary",
  components: { DictionaryToolVue, DictionaryParentVue, DictionaryListVue },
  setup(props, { refs }) {
    const data = reactive({
      msg: "字典管理"
    });

    const search = content => {
      refs.dictionaryParent.search(content);
    };

    const parentClick = row => {
      refs.dictionaryList.searchSub(row);
    };

    return {
      data,

      search,
      parentClick
    };
  }
};
</script>
<style lang="scss" scoped></style>
