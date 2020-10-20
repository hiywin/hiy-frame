<template>
  <div class="div-tool">
    <el-row :gutter="15">
      <el-col :span="4">
        <div class="label-wrap content">
          <label for="userName">用户名：</label>
          <div class="wrap-content">
            <el-input
              id="userName"
              class="width-per-100"
              v-model="data.queryData.userName"
              clearable
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label-wrap content">
          <label for="realName">真实姓名：</label>
          <div class="wrap-content">
            <el-input
              id="realName"
              class="width-per-100"
              v-model="data.queryData.realName"
              clearable
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label-wrap content">
          <label for="approvedName">审批人：</label>
          <div class="wrap-content">
            <el-input
              id="approvedName"
              class="width-per-100"
              v-model="data.queryData.approvedName"
              clearable
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label-wrap content">
          <label for="rejectedName">拒绝人：</label>
          <div class="wrap-content">
            <el-input
              id="rejectedName"
              class="width-per-100"
              v-model="data.queryData.rejectedName"
              clearable
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="search-opt">
          <el-button
            class="input-width-100"
            type="danger"
            icon="el-icon-search"
            @click="search"
            >查询</el-button
          >
          <el-button
            class="input-width-100"
            type="primary"
            icon="el-icon-refresh-left"
            @click="reset"
            >重置</el-button
          >
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="4">
        <div class="label-wrap content">
          <label for="staffNo">工号：</label>
          <div class="wrap-content">
            <el-input
              id="staffNo"
              class="width-per-100"
              v-model="data.queryData.staffNo"
              clearable
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label-wrap content">
          <label for="adAccount">AD账号：</label>
          <div class="wrap-content">
            <el-input
              id="adAccount"
              class="width-per-100"
              v-model="data.queryData.adAccount"
              clearable
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label-wrap content">
          <label for="mobile">手机号：</label>
          <div class="wrap-content">
            <el-input
              id="mobile"
              class="width-per-100"
              v-model="data.queryData.mobile"
              clearable
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label-wrap content">
          <label for="email">Email：</label>
          <div class="wrap-content">
            <el-input
              id="email"
              class="width-per-100"
              v-model="data.queryData.email"
              clearable
            ></el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="4">
        <div class="label-wrap content">
          <label for="companyNo">所属公司：</label>
          <div class="wrap-content">
            <CompanySelectVue
              ref="companySelect"
              :config="data.companyConfig"
              :selectValue.sync="data.queryData.companyNo"
            ></CompanySelectVue>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="div-opt">
      <el-button
        class="input-width-70"
        type="success"
        icon="el-icon-plus"
        @click="dataAdd"
        >新增</el-button
      >
      <SearchTagVue ref="searchTag" class="search-tag"></SearchTagVue>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import SearchTagVue from "@c/SearchTag/index";
import CompanySelectVue from "@c/Select/company";
export default {
  name: "userInfo",
  components: { SearchTagVue, CompanySelectVue },
  setup(props, { emit, refs }) {
    const data = reactive({
      queryData: {
        userName: "",
        staffNo: "",
        adAccount: "",
        mobile: "",
        email: "",
        realName: "",
        approvedName: "",
        rejectedName: "",
        companyNo: ""
      },
      companyConfig: {
        selectClass: "width-per-100",
        selectValue: ""
      }
    });

    const search = () => {
      emit("search", data.queryData);
    };

    const setTagConfig = params => {
      refs.searchTag.searchConfig(params);
    };

    const reset = () => {
      data.queryData.userName = "";
      data.queryData.staffNo = "";
      data.queryData.adAccount = "";
      data.queryData.mobile = "";
      data.queryData.email = "";
      data.queryData.realName = "";
      data.queryData.approvedName = "";
      data.queryData.rejectedName = "";
      data.queryData.companyNo = "";
      initCompanySelect("");
    };

    const initCompanySelect = value => {
      data.companyConfig.selectValue = value;
      refs.companySelect?.initSelectValue(value);
    };

    const dataAdd = () => {
      emit("dataAdd");
    };

    return {
      data,

      search,
      setTagConfig,
      reset,
      dataAdd
    };
  }
};
</script>

<style lang="scss" scoped>
.div-tool {
  background-color: $mainTitleColor;
  padding: 10px 5px;
  margin-bottom: 5px;
  border-radius: 3px;
}
.div-opt {
  margin-top: 5px;
}
.label-wrap {
  padding-left: 10px;
  margin-bottom: 5px;
  &.content {
    @include labelDom(left, 70, 30);
  }
}
.search-opt {
  text-align: right;
  line-height: 30px;
}
.search-tag {
  text-align: right;
}
</style>
