<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <ModuleToolVue
          @appSelectChange="appSelectChange"
          @search="search"
        ></ModuleToolVue>
        <ModuleTableVue
          ref="moduleTable"
          @rowClick="moduleRowClick"
          @powerAdd="powerAdd"
        ></ModuleTableVue>
      </el-col>
      <el-col :span="18">
        <div class="power-wrap" :hidden="data.powerHidden">
          <label>所属模块：</label>
          <label class="label-color">{{ data.powerModule }}</label>
          <SearchTagVue ref="searchTag" />
        </div>
        <PowerListVue
          ref="powerTable"
          @getPowerData="getPowerData"
        ></PowerListVue>
      </el-col>
    </el-row>
    <el-drawer
      :title="data.drawerTitle"
      :visible.sync="data.drawerVisible"
      :direction="data.drawerDir"
    >
      <PowerInfoVue ref="powerInfo" :config="data.infoConfig"></PowerInfoVue>
    </el-drawer>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import ModuleTableVue from "./components/ModuleTable";
import ModuleToolVue from "./components/ModuleTool";
import PowerListVue from "./components/PowerList";
import SearchTagVue from "@c/SearchTag/index";
import PowerInfoVue from "./components/PowerInfo";
export default {
  name: "sysPower",
  components: {
    ModuleTableVue,
    ModuleToolVue,
    PowerListVue,
    SearchTagVue,
    PowerInfoVue
  },
  setup(props, { root, refs }) {
    const data = reactive({
      powerModule: "",
      powerHidden: true,
      drawerTitle: "新增模块按钮",
      drawerVisible: false,
      drawerDir: "rtl",
      infoConfig: {
        PowerNo: "",
        ModuleNo: "",
        ModuleName: "",
        Content: "",
        Type: "primary",
        Style: "",
        IsPlain: false,
        IsRound: false,
        IsCircle: false,
        FuncName: "",
        Icon: "",
        Sort: 1,
        Access: true,
        IsDelete: false
      }
    });

    // 选中平台搜索
    const appSelectChange = params => {
      refs.moduleTable.search(params);
    };

    // 点击查询搜索
    const search = params => {
      refs.moduleTable.search(params);
    };

    // 点击模块时查询按钮列表
    const moduleRowClick = params => {
      data.powerModule = params.moduleName;
      data.powerHidden = false;
      refs.powerTable.getModulePowers(params);
    };

    // 显示查询时长
    const getPowerData = params => {
      refs.searchTag.initConfig({
        Hidden: false,
        Code: params.code,
        Time: params.expandSeconds
      });
    };

    // 添加按钮
    const powerAdd = params => {
      if (params.moduleNo) {
        data.infoConfig.ModuleNo = params.moduleNo;
        data.infoConfig.ModuleName = params.moduleName;
        if (refs.powerInfo?.powerAdd) {
          refs.powerInfo.powerAdd(data.infoConfig);
        }
        data.drawerVisible = true;
      } else {
        root.$message({
          type: "info",
          message: "请先选择模块！"
        });
      }
    };

    return {
      data,

      appSelectChange,
      search,
      moduleRowClick,
      getPowerData,
      powerAdd
    };
  }
};
</script>
<style lang="scss" scoped>
.power-wrap {
  line-height: 33px;
  margin-bottom: 5px;
  padding-left: 5px;
  background-color: $mainTitleColor;
  border-radius: 3px;
  font-weight: bold;
}
.label-color {
  color: $mainColor;
}
</style>
