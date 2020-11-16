<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="16">
        <GroupToolVue
          ref="groupTool"
          @search="search"
          @groupAdd="groupAdd"
        ></GroupToolVue>
        <GroupListVue
          ref="groupList"
          @searchOk="searchOk"
          @dataEdit="dataEdit"
          @rowClick="rowClick"
          @roleAdd="roleAdd"
          @userAdd="userAdd"
        ></GroupListVue>
      </el-col>
      <el-col :span="8">
        <RoleUserToolVue
          ref="roleUserTool"
          @search="roleUserSearch"
        ></RoleUserToolVue>
        <RoleUserListVue ref="roleUserList"></RoleUserListVue>
      </el-col>
    </el-row>
    <GroupInfoVue ref="groupInfo" @submitOk="submitOk"></GroupInfoVue>
    <RoleInfoVue ref="roleInfo" @submitOk="roleSubmitOk"></RoleInfoVue>
    <UserInfoVue ref="userInfo" @submitOk="userSubmitOk"></UserInfoVue>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import GroupToolVue from "./components/GroupTool";
import GroupListVue from "./components/GroupList";
import GroupInfoVue from "./components/GroupInfo";
import RoleUserToolVue from "./components/RoleUserTool";
import RoleUserListVue from "./components/RoleUserList";
import RoleInfoVue from "./components/RoleInfo";
import UserInfoVue from "./components/UserInfo";
export default {
  name: "sysGroup",
  components: {
    GroupToolVue,
    GroupListVue,
    GroupInfoVue,
    RoleUserToolVue,
    RoleUserListVue,
    RoleInfoVue,
    UserInfoVue
  },
  setup(props, { refs }) {
    const data = reactive({
      appNo: ""
    });

    const search = queryData => {
      data.appNo = queryData.appNo;
      refs.groupList.search(queryData);
    };

    const searchOk = resData => {
      refs.groupTool.setTagConfig(resData);
    };

    const groupAdd = () => {
      refs.groupInfo.dataAdd({
        appNo: data.appNo,
        parentNo: ""
      });
    };

    const dataEdit = row => {
      refs.groupInfo.dataEdit(row);
    };

    const submitOk = () => {
      refs.groupList.getGroupPage();
    };

    const rowClick = row => {
      refs.roleUserTool.setSearch(row);
      refs.roleUserList.search(row);
    };

    const roleUserSearch = params => {
      refs.roleUserList.search(params);
    };

    const roleAdd = row => {
      refs.roleInfo.roleAdd(row);
    };

    const roleSubmitOk = () => {
      // refs.roleUserList.getGroupUsers();
      refs.roleUserList.getGroupRoles();
    };

    const userAdd = row => {
      refs.userInfo.userAdd(row);
    };

    const userSubmitOk = () => {
      refs.roleUserList.getGroupUsers();
      // refs.roleUserList.getGroupRoles();
    };

    return {
      data,

      search,
      searchOk,
      groupAdd,
      dataEdit,
      submitOk,
      rowClick,
      roleUserSearch,
      roleAdd,
      roleSubmitOk,
      userAdd,
      userSubmitOk
    };
  }
};
</script>

<style lang="scss" scoped></style>
