<template>
  <div>
    <el-collapse v-model="data.activeNames" border>
      <el-collapse-item name="1">
        <template slot="title">
          <span class="collapes-wrap">
            <i class="header-icon el-icon-user-solid margin-right-5"></i>
            用户
          </span>
        </template>
        <el-tag
          class="user-tag"
          v-for="item in data.groupUsers"
          :key="item.id"
          closable
          type="success"
        >
          {{ item.userName }}
        </el-tag>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span class="collapes-wrap">
            <i class="header-icon el-icon-s-opportunity margin-right-5"></i>
            角色
          </span>
        </template>
        <el-tag
          class="user-tag"
          v-for="item in data.groupRoles"
          :key="item.id"
          closable
          type="primary"
        >
          {{ item.roleName }}
        </el-tag>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import { GetGroupUsersAll, GetGroupRolesAll } from "@/api/sysGroup";
export default {
  setup(props, { root }) {
    const data = reactive({
      activeNames: ["1", "2"],
      groupUsers: [],
      groupRoles: [],
      queryUser: {
        GroupNo: "",
        UserName: ""
      },
      queryRole: {
        GroupNo: "",
        RoleName: ""
      }
    });

    const getGroupUsers = () => {
      if (data.queryUser?.GroupNo.length > 0) {
        GetGroupUsersAll(data.queryUser).then(res => {
          let resData = res.data;
          if (resData.hasErr) {
            root.$message.error(resData.msg);
          }
          data.groupUsers = resData.results;
        });
      } else {
        root.$message.warning("请先选择组织！");
      }
    };

    const getGroupRoles = () => {
      if (data.queryRole?.GroupNo.length > 0) {
        GetGroupRolesAll(data.queryRole).then(res => {
          let resData = res.data;
          if (resData.hasErr) {
            root.$message.error(resData.msg);
          }
          data.groupRoles = resData.results;
        });
      } else {
        root.$message.warning("请先选择组织！");
      }
    };

    const search = params => {
      data.queryUser.GroupNo = params.groupNo;
      data.queryUser.UserName = params.content;
      data.queryRole.GroupNo = params.groupNo;
      data.queryRole.RoleName = params.content;
      getGroupUsers();
      getGroupRoles();
    };

    return {
      data,

      getGroupUsers,
      getGroupRoles,
      search
    };
  }
};
</script>

<style lang="scss" scoped>
.collapes-wrap {
  font-weight: bold;
  color: $mainColor;
}
.user-tag {
  margin-left: 5px;
  padding: 0 10px;
}
</style>
