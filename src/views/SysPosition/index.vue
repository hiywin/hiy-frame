<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="16">
        <PositionToolVue
          ref="positionTool"
          @search="search"
          @dataAdd="dataAdd"
        ></PositionToolVue>
        <PositionListVue
          ref="positionList"
          @searchOk="searchOk"
          @rowClick="rowClick"
          @dataEdit="dataEdit"
          @deleteOk="deleteOk"
          @roleAdd="roleAdd"
        ></PositionListVue>
      </el-col>
      <el-col :span="8">
        <RoleToolVue ref="roleTool" @search="roleSearch"></RoleToolVue>
        <RoleListVue ref="roleList" @searchOk="roleSearchOk"></RoleListVue>
      </el-col>
    </el-row>
    <PositionInfoVue ref="positionInfo" @submitOk="submitOk"></PositionInfoVue>
    <RoleInfoVue ref="roleInfo" @submitOk="roleSubmitOk"></RoleInfoVue>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import PositionToolVue from "./components/PositionTool";
import PositionListVue from "./components/PositionList";
import RoleToolVue from "./components/RoleTool";
import RoleListVue from "./components/RoleList";
import PositionInfoVue from "./components/PositionInfo";
import RoleInfoVue from "./components/RoleInfo";
export default {
  name: "positionTool",
  components: {
    PositionToolVue,
    PositionListVue,
    RoleToolVue,
    RoleListVue,
    PositionInfoVue,
    RoleInfoVue
  },
  setup(props, { refs }) {
    const data = reactive({
      companyNo: ""
    });

    const search = params => {
      data.companyNo = params.companyNo;
      refs.positionList.search(params);
    };

    const searchOk = resData => {
      refs.positionTool.setTagConfig(resData);
    };

    const rowClick = row => {
      refs.roleTool.setPositionData(row);
      refs.roleList.search(row);
    };

    const roleSearch = params => {
      refs.roleList.search(params);
    };

    const roleSearchOk = resData => {
      refs.roleTool.setTagConfig(resData);
    };

    const dataAdd = () => {
      refs.positionInfo.dataAdd({
        companyNo: data.companyNo
      });
    };

    const dataEdit = info => {
      refs.positionInfo.dataEdit(info);
    };

    const submitOk = () => {
      refs.positionList.getPositionPage();
    };

    const deleteOk = () => {
      let params = {
        positionNo: "-1",
        roleName: "",
        positionName: ""
      };
      refs.roleList.reloadList(params);
      refs.roleTool.setPositionData(params);
    };

    const roleAdd = row => {
      refs.roleInfo.roleAdd(row);
    };

    const roleSubmitOk = () => {
      refs.roleList.getPositionRoleAll();
    };

    return {
      data,

      search,
      searchOk,
      rowClick,
      roleSearch,
      roleSearchOk,
      dataAdd,
      dataEdit,
      submitOk,
      deleteOk,
      roleAdd,
      roleSubmitOk
    };
  }
};
</script>

<style lang="scss" scoped></style>
