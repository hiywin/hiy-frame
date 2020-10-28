<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <ModuleToolVue @search="search"></ModuleToolVue>
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
          @dataEdit="dataEdit"
        ></PowerListVue>
      </el-col>
    </el-row>
    <PowerInfoVue
      ref="powerInfo"
      :config="powerInfoCfg"
      @powerSubmitSuccess="powerSubmitSuccess"
    ></PowerInfoVue>
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
      powerHidden: true
    });
    const powerInfoCfg = reactive({
      config: {
        drawerTitle: "新增按钮",
        drawerVisible: false,
        moduleName: ""
      },
      info: {
        powerID: "",
        powerNo: "",
        moduleNo: "",
        content: "",
        type: "primary",
        style: "",
        isPlain: false,
        isRound: false,
        isCircle: false,
        funcName: "",
        icon: "",
        sort: 1,
        access: true,
        isDelete: false
      }
    });

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
      if (!validMessage(params.moduleNo, "请先选择模块！")) return false;

      powerInfoCfg.config.drawerTitle = "新增按钮";
      powerInfoCfg.config.drawerVisible = true;
      powerInfoCfg.config.moduleName = params.moduleName;
      powerInfoCfg.info.moduleNo = params.moduleNo;
      refs.powerInfo?.initConfig(powerInfoCfg.config, powerInfoCfg.info);
    };

    // 添加成功
    const powerSubmitSuccess = paramsModuleNo => {
      data.drawerVisible = false;
      refs.powerTable.getModulePowers({ moduleNo: paramsModuleNo });
    };

    // 编辑按钮
    const dataEdit = row => {
      if (!validMessage(row.moduleNo, "请先选择模块！")) return false;
      if (!validMessage(row.powerNo, "请先选择按钮信息！")) return false;

      powerInfoCfg.config.drawerTitle = "编辑按钮";
      powerInfoCfg.config.drawerVisible = true;
      powerInfoCfg.config.moduleName = data.powerModule;
      refs.powerInfo?.initConfig(powerInfoCfg.config, row);
    };

    // 编辑验证
    const validMessage = (flag, msg) => {
      if (!flag) {
        root.$message({
          type: "info",
          message: msg
        });
        return false;
      }
      return true;
    };

    return {
      data,
      powerInfoCfg,

      search,
      moduleRowClick,
      getPowerData,
      powerAdd,
      powerSubmitSuccess,
      dataEdit
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
