<template>
  <div>
    <UserToolVue ref="userToll" @search="search"></UserToolVue>
    <UserListVue ref="userList"></UserListVue>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import UserListVue from "./components/UserList";
import UserToolVue from "./components/UserTool";
export default {
  name: "sysUser",
  components: { UserListVue, UserToolVue },
  setup(props, { refs }) {
    const data = reactive({
      msg: ""
    });

    const search = queryData => {
      refs.userList.search(queryData);
    };

    return {
      data,

      search
    };
  }
};
</script>
<style lang="scss" scoped></style>
