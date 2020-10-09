<template>
  <div>
    <CompanyToolVue
      ref="compTool"
      @search="search"
      @dataAdd="dataAdd"
    ></CompanyToolVue>
    <CompanyListVue
      ref="compList"
      @searchOk="searchOk"
      @dataEdit="dataEdit"
    ></CompanyListVue>
    <CompanyInfoVue ref="compInfo" @submitOk="submitOk"></CompanyInfoVue>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import CompanyListVue from "./components/CompanyList";
import CompanyToolVue from "./components/CompanyTool";
import CompanyInfoVue from "./components/CompanyInfo";
export default {
  name: "sysCompany",
  components: { CompanyListVue, CompanyToolVue, CompanyInfoVue },
  setup(props, { refs }) {
    const data = reactive({
      tagConfig: {
        hidden: true,
        code: "",
        time: ""
      },
      queryData: {}
    });

    const search = queryData => {
      // 保存查询条件，用于新增、修改公司信息后还是按照原条件查询
      data.queryData = queryData;
      refs.compList.search(queryData);
    };

    const searchOk = resData => {
      data.tagConfig.hidden = false;
      data.tagConfig.code = resData.code;
      data.tagConfig.time = resData.expandSeconds;
      refs.compTool.setSearchTag(data.tagConfig);
    };

    const dataAdd = () => {
      refs.compInfo.infoAdd();
    };

    const dataEdit = row => {
      refs.compInfo.infoEdit(row);
    };

    const submitOk = () => {
      refs.compList.search(data.queryData);
    };

    return {
      data,

      search,
      searchOk,
      dataAdd,
      dataEdit,
      submitOk
    };
  }
};
</script>
<style lang="scss" scoped></style>
