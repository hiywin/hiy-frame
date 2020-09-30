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
    <CompanyInfoVue
      ref="compInfo"
      :config="infoConfig"
      @submitOk="submitOk"
    ></CompanyInfoVue>
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
    const infoConfig = reactive({
      config: {
        title: "新增公司",
        visible: false
      },
      info: {
        companyNo: "",
        companyName: "",
        abbreviation: "",
        address: "",
        industry: "",
        legalPerson: "",
        contact: "",
        phone: "",
        mobile: "",
        email: "",
        website: "",
        access: true,
        isDelete: false
      }
    });

    const search = queryData => {
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
      infoConfig.config.title = "新增公司";
      infoConfig.config.visible = true;
      refs.compInfo?.initConfig(infoConfig.config, null);
    };

    const dataEdit = row => {
      infoConfig.config.title = "编辑公司";
      infoConfig.config.visible = true;
      refs.compInfo?.initConfig(infoConfig.config, row);
    };

    const submitOk = () => {
      refs.compList.search(data.queryData);
    };

    return {
      data,
      infoConfig,

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
