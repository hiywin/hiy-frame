<template>
  <div>
    <UserToolVue
      ref="userTool"
      @search="search"
      @dataAdd="dataAdd"
    ></UserToolVue>
    <UserListVue
      ref="userList"
      @searchOk="searchOk"
      @dataEdit="dataEdit"
      @switchAccessEdit="switchAccessEdit"
      @roleAdd="roleAdd"
    ></UserListVue>
    <UserInfoVue ref="userInfo" @submitOk="submitOk"></UserInfoVue>
    <UserAccessVue ref="userAccess" @submitOk="submitOk"></UserAccessVue>
    <RoleInfoVue ref="roleInfo" @submitOk="submitOk"></RoleInfoVue>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import UserListVue from "./components/UserList";
import UserToolVue from "./components/UserTool";
import UserInfoVue from "./components/UserInfo";
import UserAccessVue from "./components/UserAccess";
import RoleInfoVue from "./components/RoleInfo";
export default {
  name: "sysUser",
  components: {
    UserListVue,
    UserToolVue,
    UserInfoVue,
    UserAccessVue,
    RoleInfoVue
  },
  setup(props, { refs }) {
    const data = reactive({
      queryData: {}
    });

    const search = params => {
      refs.userList.search(params);
      data.queryData = params;
    };

    const dataAdd = () => {
      refs.userInfo.infoAdd();
    };

    const dataEdit = row => {
      refs.userInfo.infoEdit(row);
    };

    const switchAccessEdit = row => {
      refs.userAccess.switchAccessEdit(row);
    };

    const searchOk = params => {
      refs.userTool.setTagConfig(params);
    };

    const submitOk = () => {
      refs.userList.search(data.queryData);
    };

    const roleAdd = row => {
      refs.roleInfo.roleAdd(row);
    };

    return {
      data,

      search,
      dataAdd,
      dataEdit,
      switchAccessEdit,
      searchOk,
      submitOk,
      roleAdd
    };
  }
};
</script>
<style lang="scss" scoped></style>
