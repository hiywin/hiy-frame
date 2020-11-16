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
          @close="userDelete(item)"
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
          @close="roleDelete(item)"
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
import {
  GetGroupUsersAll,
  GetGroupRolesAll,
  GroupUserDelete,
  GroupRoleDelete
} from "@/api/sysGroup";
import { global } from "@/utils/global";
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
      },
      deleteUserData: {
        GroupNo: "",
        UserNo: ""
      },
      deleteRoleData: {
        GroupNo: "",
        RoleNo: ""
      }
    });
    // 弹窗确认控件
    const { confirm } = global();

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

    const userDelete = params => {
      if (params.groupNo.length > 0 && params.userNo.length > 0) {
        data.deleteUserData.GroupNo = params.groupNo;
        data.deleteUserData.UserNo = params.userNo;
        confirm({
          content: `确认删除 ${params.userName} 用户？`,
          tips: "警告",
          thenFn: deleteUserConfirm
        });
      } else {
        root.$message({
          message: "请选择需要删除的数据！",
          type: "warning"
        });
      }
    };

    const deleteUserConfirm = () => {
      GroupUserDelete(data.deleteUserData)
        .then(res => {
          let msgtype = res.data.hasErr ? "error" : "success";
          root.$message({
            type: msgtype,
            message: res.data.msg
          });
          if (!res.data.hasErr) {
            getGroupUsers();
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    const roleDelete = params => {
      if (params.groupNo.length > 0 && params.roleNo.length > 0) {
        data.deleteRoleData.GroupNo = params.groupNo;
        data.deleteRoleData.RoleNo = params.roleNo;
        confirm({
          content: `确认删除 ${params.roleName} 角色？`,
          tips: "警告",
          thenFn: deleteRoleConfirm
        });
      } else {
        root.$message({
          message: "请选择需要删除的数据！",
          type: "warning"
        });
      }
    };

    const deleteRoleConfirm = () => {
      GroupRoleDelete(data.deleteRoleData)
        .then(res => {
          let msgtype = res.data.hasErr ? "error" : "success";
          root.$message({
            type: msgtype,
            message: res.data.msg
          });
          if (!res.data.hasErr) {
            getGroupRoles();
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    return {
      data,

      getGroupUsers,
      getGroupRoles,
      search,
      userDelete,
      roleDelete
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
  margin-bottom: 5px;
  padding: 0 10px;
}
</style>
