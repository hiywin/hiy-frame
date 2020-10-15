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
    ></UserListVue>
    <UserInfoVue ref="userInfo" @submitOk="submitOk"></UserInfoVue>
    <UserAccessVue ref="userAccess" @submitOk="submitOk"></UserAccessVue>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import UserListVue from "./components/UserList";
import UserToolVue from "./components/UserTool";
import UserInfoVue from "./components/UserInfo";
import UserAccessVue from "./components/UserAccess";
export default {
  name: "sysUser",
  components: { UserListVue, UserToolVue, UserInfoVue, UserAccessVue },
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

    return {
      data,

      search,
      dataAdd,
      dataEdit,
      switchAccessEdit,
      searchOk,
      submitOk
    };
  }
};
</script>
<style lang="scss" scoped></style>
