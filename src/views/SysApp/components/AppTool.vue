<template>
  <div class="div-tool">
    <el-row :gutter="15">
      <el-col :span="5">
        <div class="label-wrap appName">
          <label for="appName">平台名称：</label>
          <div class="wrap-content">
            <el-input
              id="appName"
              class="width-per-100"
              v-model="data.queryData.appName"
              clearable
            ></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="label-wrap leader">
          <label for="leader">负责人：</label>
          <div class="wrap-content">
            <el-input
              id="leader"
              class="width-per-100"
              v-model="data.queryData.leader"
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
  name: "appTool",
  components: { SearchTagVue },
  setup(props, { emit, refs }) {
    const data = reactive({
      queryData: {
        appName: "",
        leader: ""
      }
    });

    const search = () => {
      emit("search", data.queryData);
    };

    const setTagConfig = params => {
      refs.searchTag.searchConfig(params);
    };

    const reset = () => {
      data.queryData.appName = "";
      data.queryData.leader = "";
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
  &.appName {
    @include labelDom(left, 70, 30);
  }
  &.leader {
    @include labelDom(left, 50, 30);
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
