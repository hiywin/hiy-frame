<template>
  <div class="div-wrap">
    <el-row :gutter="15">
      <el-col :span="12">
        <label style="color: transparent;">*</label>
      </el-col>
      <el-col :span="5">
        <div class="label-wrap app">
          <label>平台：</label>
          <div class="wrap-content">
            <SelectVue
              :config="data.appConfig"
              :selectValue.sync="data.queryData.App"
              style="width:100%"
            ></SelectVue>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="label-wrap module">
          <label>模块名称：</label>
          <div class="wrap-content">
            <el-input
              v-model="data.queryData.ModuleName"
              placeholder="请输入模块名称"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <el-button
          type="danger"
          style="width:90%"
          @click="search"
          icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>
<script>
import SelectVue from "@c/Select/index";
import { reactive } from "@vue/composition-api";
export default {
  name: "searchTool",
  components: { SelectVue },
  setup(props, { emit }) {
    const data = reactive({
      appConfig: {
        Type: "AppType",
        SelectValue: "0",
        SelectClass: "input-width-200",
        Disabled: false
      },
      queryData: {
        App: "0",
        ModuleName: ""
      }
    });

    const search = () => {
      emit("search", data.queryData);
    };

    return {
      data,
      search
    };
  }
};
</script>
<style lang="scss" scoped>
.label-wrap {
  &.app {
    @include labelDom(left, 40, 30);
  }
  &.module {
    @include labelDom(left, 70, 30);
  }
}
.el-switch {
  padding-top: 5px;
}
.div-wrap {
  background-color: $mainTitleColor;
  line-height: 30px;
  padding: 8px 0 5px 5px;
  border-radius: 5px 5px 0 0;
}
</style>
