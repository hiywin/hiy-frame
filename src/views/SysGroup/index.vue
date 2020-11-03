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
        ></GroupListVue>
      </el-col>
      <el-col :span="8">
        <RoleUserToolVue ref="roleTool"></RoleUserToolVue>
        <RoleUserListVue ref="roleUserList"></RoleUserListVue>
      </el-col>
    </el-row>
    <GroupInfoVue ref="groupInfo" @submitOk="submitOk"></GroupInfoVue>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import GroupToolVue from "./components/GroupTool";
import GroupListVue from "./components/GroupList";
import GroupInfoVue from "./components/GroupInfo";
import RoleUserToolVue from "./components/RoleUserTool";
import RoleUserListVue from "./components/RoleUserList";
export default {
  name: "sysGroup",
  components: {
    GroupToolVue,
    GroupListVue,
    GroupInfoVue,
    RoleUserToolVue,
    RoleUserListVue
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

    return {
      data,

      search,
      searchOk,
      groupAdd,
      dataEdit,
      submitOk
    };
  }
};
</script>

<style lang="scss" scoped></style>
