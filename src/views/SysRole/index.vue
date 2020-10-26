<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="15">
        <RoleToolVue
          ref="roleTool"
          @search="search"
          @roleAdd="roleAdd"
        ></RoleToolVue>
        <RoleListVue
          ref="roleList"
          @searchOk="searchOk"
          @rowClick="rowClick"
          @roleEdit="roleEdit"
          @moduleAdd="moduleAdd"
          @deleteOk="roleDeleteOk"
        ></RoleListVue>
      </el-col>
      <el-col :span="9">
        <ModuleToolVue ref="moduleTool" @search="moduleSearch"></ModuleToolVue>
        <RoleModuleVue
          ref="roleModule"
          @searchOk="moduleSearchOk"
        ></RoleModuleVue>
      </el-col>
    </el-row>
    <RoleInfoVue ref="roleInfo" @submitOk="roleSubmitOk"></RoleInfoVue>
    <ModuleTreeVue ref="moduleTree" @submitOk="submitOk"></ModuleTreeVue>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import RoleToolVue from "./components/RoleTool";
import RoleListVue from "./components/RoleList";
import RoleModuleVue from "./components/RoleModule";
import ModuleToolVue from "./components/ModuleTool";
import RoleInfoVue from "./components/RoleInfo";
import ModuleTreeVue from "./components/ModuleTree";
export default {
  name: "sysRole",
  components: {
    RoleToolVue,
    RoleListVue,
    RoleModuleVue,
    ModuleToolVue,
    RoleInfoVue,
    ModuleTreeVue
  },
  setup(props, { refs }) {
    const data = reactive({
      appNo: "",
      queryRole: {}
    });

    const searchOk = resData => {
      refs.roleTool.setTagConfig(resData);
    };

    const search = queryData => {
      data.appNo = queryData.appNo;
      data.queryRole = queryData;
      refs.roleList.search(queryData);
    };

    const rowClick = row => {
      refs.roleModule.search(row);
      refs.moduleTool.setRoleData(row);
    };

    const moduleSearch = queryData => {
      refs.roleModule.search(queryData);
    };

    const moduleSearchOk = resData => {
      refs.moduleTool.setTagConfig(resData);
    };

    const roleAdd = () => {
      let info = {
        appNo: data.appNo
      };
      refs.roleInfo.dataAdd(info);
    };

    const roleEdit = row => {
      refs.roleInfo.dataEdit(row);
    };

    const roleSubmitOk = () => {
      refs.roleList.search(data.queryRole);
      refs.roleModule.search({ roleNo: "-1", moduleName: "" });
      refs.moduleTool.setRoleData({ roleNo: "-1", moduleName: "" });
    };

    const moduleAdd = row => {
      let params = {
        appNo: data.appNo,
        roleNo: row.roleNo,
        roleName: row.roleName
      };
      refs.moduleTree.search(params);
    };

    const submitOk = () => {
      refs.roleModule.getRoleModule();
    };

    const roleDeleteOk = () => {
      refs.roleModule.search({ roleNo: "-1", moduleName: "" });
    };

    return {
      data,

      search,
      searchOk,
      rowClick,
      moduleSearch,
      moduleSearchOk,
      roleAdd,
      roleEdit,
      roleSubmitOk,
      moduleAdd,
      submitOk,
      roleDeleteOk
    };
  }
};
</script>
<style lang="scss" scoped></style>
