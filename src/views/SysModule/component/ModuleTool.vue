<template>
  <div class="div-tool">
    <el-row :gutter="15">
      <el-col :span="5">
        <div class="label-wrap content">
          <label for="appNo">所属平台：</label>
          <div class="wrap-content">
            <AppSelectVue
              id="appNo"
              :config="data.appConfig"
              :selectValue.sync="data.queryData.appNo"
              @selectChangeEmit="appSelectChange"
            ></AppSelectVue>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="label-wrap content">
          <label for="moduleName">模块名：</label>
          <div class="wrap-content">
            <el-input
              id="moduleName"
              class="width-per-100"
              v-model="data.queryData.moduleName"
              clearable
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
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
    <el-row>
      <el-col :span="2">
        <el-button
          class="input-width-80"
          type="success"
          icon="el-icon-plus"
          @click="dataAdd"
          >新增</el-button
        >
      </el-col>
      <el-col :span="22">
        <SearchTagVue ref="searchTag" class="search-tag"></SearchTagVue>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import SearchTagVue from "@c/SearchTag/index";
import AppSelectVue from "@c/Select/app";
export default {
  name: "moduleTool",
  components: { SearchTagVue, AppSelectVue },
  setup(props, { emit, refs }) {
    const data = reactive({
      queryData: {
        appNo: "",
        moduleName: ""
      },
      appConfig: {
        selectClass: "width-per-100",
        selectDefault: true
      }
    });

    const reset = () => {
      data.queryData.moduleName = "";
    };

    const search = () => {
      emit("search", data.queryData);
    };

    const appSelectChange = () => {
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

      reset,
      search,
      appSelectChange,
      setTagConfig,
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
