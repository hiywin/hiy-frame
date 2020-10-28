<template>
  <div class="search-wrap">
    <el-row>
      <el-input
        placeholder="请输入职位名"
        v-model="data.queryData.positionName"
        class="input-with-select"
        clearable
        ><CompanySelectVue
          slot="prepend"
          :config="data.companyConfig"
          :selectValue.sync="data.queryData.companyNo"
          @selectChangeEmit="companySelectChange"
        ></CompanySelectVue>
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
        @click="dataAdd"
        >新增</el-button
      >
      <SearchTagVue ref="searchTag"></SearchTagVue>
    </el-row>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import CompanySelectVue from "@c/Select/company";
import SearchTagVue from "@c/SearchTag/index";
export default {
  name: "moduleTool",
  components: { CompanySelectVue, SearchTagVue },
  setup(props, { refs, emit }) {
    const data = reactive({
      queryData: {
        companyNo: "",
        positionName: ""
      },
      companyConfig: {
        selectClass: "input-width-240",
        selectDefault: true
      },
      tagConfig: {
        Hidden: true,
        Code: "",
        Time: ""
      }
    });

    const companySelectChange = () => {
      emit("search", data.queryData);
    };

    const search = () => {
      emit("search", data.queryData);
    };

    const setTagConfig = params => {
      refs.searchTag.searchConfig(params);
    };

    const dataAdd = () => {
      emit("dataAdd");
    };

    return {
      data,

      companySelectChange,
      search,
      setTagConfig,
      dataAdd
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
