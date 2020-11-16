<template>
  <div class="div-tool">
    <el-row :gutter="15">
      <el-col :span="5">
        <div class="label-wrap content">
          <label for="companyName">公司名称：</label>
          <div class="wrap-content">
            <el-input
              id="companyName"
              class="width-per-100"
              v-model="data.queryData.companyName"
              clearable
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="label-wrap content">
          <label for="address">地址：</label>
          <div class="wrap-content">
            <el-input
              id="address"
              class="width-per-100"
              v-model="data.queryData.address"
              clearable
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="label-wrap content">
          <label for="legal">法人：</label>
          <div class="wrap-content">
            <el-input
              id="legal"
              class="width-per-100"
              v-model="data.queryData.legalPerson"
              clearable
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
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
      <el-col :span="5">
        <div class="label-wrap content">
          <label for="industry">所属行业：</label>
          <div class="wrap-content">
            <el-input
              id="industry"
              class="width-per-100"
              v-model="data.queryData.industry"
              clearable
            ></el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="div-opt">
      <el-button
        class="input-width-100"
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
export default {
  name: "companyTool",
  components: { SearchTagVue },
  setup(props, { refs, emit }) {
    const data = reactive({
      queryData: {
        companyNo: "",
        companyName: "",
        address: "",
        mobile: "",
        legalPerson: "",
        industry: "",
        isDelete: false
      },
      tagConfig: {
        Hidden: true,
        Code: "",
        Time: ""
      }
    });

    // 查询
    const search = () => {
      emit("search", data.queryData);
    };

    // 设置查询返回标记
    const setSearchTag = params => {
      data.tagConfig.Hidden = params.hidden;
      data.tagConfig.Code = params.code;
      data.tagConfig.Time = params.time;
      refs.searchTag.initConfig(data.tagConfig);
    };

    // 新增
    const dataAdd = () => {
      emit("dataAdd");
    };

    const reset = () => {
      data.queryData.companyName = "";
      data.queryData.address = "";
      data.queryData.mobile = "";
      data.queryData.legalPerson = "";
      data.queryData.industry = "";
    };

    return {
      data,

      search,
      setSearchTag,
      dataAdd,
      reset
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
    @include labelDom(left, 90, 30);
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
