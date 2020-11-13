<template>
  <div>
    <el-drawer :title="data.title" :visible.sync="data.visible" direction="rtl">
      <el-row class="head-wrap">
        <el-col :span="12">
          <label>所属组织：</label>
          <label class="label-color">{{ data.groupName }}</label>
        </el-col>
        <el-col :span="12">
          <el-button
            class="pull-right input-width-80"
            type="danger"
            size="mini"
            @click="submit"
            >提交</el-button
          >
        </el-col>
      </el-row>
      <hr />
      <div class="content-wrap">
        <el-input
          placeholder="请输入角色名称"
          v-model="data.queryData.roleName"
          class="input-with-select"
          clearable
          ><AppSelectVue
            slot="prepend"
            :config="data.appConfig"
            :selectValue.sync="data.queryData.appNo"
            @selectChangeEmit="appSelectChange"
          ></AppSelectVue>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="search"
          ></el-button>
        </el-input>
        <el-table
          ref="roleTable"
          class="margin-top-10"
          :data="data.tableData"
          v-loading="data.loadingData"
          :max-height="data.tableHight"
          border
        >
          <el-table-column type="selection" width="60" align="center">
          </el-table-column>
          <el-table-column
            prop="roleName"
            label="角色名"
            min-width="150"
            align="center"
          ></el-table-column>
        </el-table>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { watch, reactive } from "@vue/composition-api";
import { GetRoleAll } from "@/api/sysRole";
import { GetGroupRolesAll, GroupRoleSaveOrUpdate } from "@/api/sysGroup";
import AppSelectVue from "@c/Select/app";
export default {
  name: "roleInfo",
  components: { AppSelectVue },
  setup(props, { root, refs, emit }) {
    const data = reactive({
      tableData: [],
      selectOptions: [],
      queryData: {
        appNo: "",
        roleName: "",
        isDelete: false
      },
      queryGroupRole: {
        groupNo: "",
        appNo: "",
        lstGroupRole: []
      },
      appConfig: {
        selectClass: "input-width-140",
        selectDefault: true
      },
      groupName: "",
      loadingData: false,
      title: "添加组织角色",
      visible: false,
      tableHight: "600"
    });

    const getRoleAll = () => {
      data.loadingData = true;
      GetRoleAll(data.queryData)
        .then(res => {
          let resData = res.data;
          if (resData.hasErr) {
            root.$message.error(resData.msg);
          }
          data.tableData = resData.results;
          setRoleChecked();
          autoTableHight();
          data.loadingData = false;
        })
        .catch(err => {
          console.log(err);
          data.loadingData = false;
        });
    };

    const setRoleChecked = () => {
      let requestData = {
        GroupNo: data.queryGroupRole.groupNo,
        RoleName: ""
      };
      data.loadingData = true;
      GetGroupRolesAll(requestData)
        .then(res => {
          let results = res.data.results;
          results.forEach(item => {
            let infos = data.tableData.filter(p => p.roleNo == item.roleNo);
            infos.forEach(row => {
              // 设置选中项
              refs.roleTable.toggleRowSelection(row);
            });
          });
          data.loadingData = false;
        })
        .catch(err => {
          data.loadingData = false;
          console.log(err);
        });
    };

    const appSelectChange = value => {
      data.queryData.appNo = value;
      data.queryGroupRole.appNo = value;
      getRoleAll();
    };

    const search = () => {
      getRoleAll();
    };

    const roleAdd = params => {
      data.visible = true;
      data.queryGroupRole.groupNo = params.groupNo;
      data.groupName = params.groupName;
      getRoleAll();
    };

    const submit = () => {
      if (!checkGroupRole()) return false;
      getGroupRoles();
      GroupRoleSaveOrUpdate(data.queryGroupRole)
        .then(res => {
          let msgtype = res.data.hasErr ? "warning" : "success";
          root.$message({
            type: msgtype,
            message: res.data.msg
          });
          if (!res.data.hasErr) {
            data.visible = false;
            emit("submitOk");
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    const getGroupRoles = () => {
      data.queryGroupRole.lstGroupRole = [];
      let roles = refs.roleTable.selection;
      roles.forEach(item => {
        data.queryGroupRole.lstGroupRole.push({
          roleNo: item.roleNo,
          roleName: item.roleName
        });
      });
    };

    const checkGroupRole = () => {
      if (data.queryGroupRole.appNo.length <= 0) {
        root.$message.warning("请先选择平台！");
        return false;
      }
      if (data.queryGroupRole.groupNo.length <= 0) {
        root.$message.warning("请先选择组织！");
        return false;
      }
      return true;
    };

    const autoTableHight = () => {
      if (refs.roleTable) {
        data.tableHight =
          document.documentElement.clientHeight -
          refs.roleTable.$el.offsetTop -
          20;
      }
    };

    watch(
      () => document.documentElement.clientHeight,
      newValue => {
        console.log(newValue);
        autoTableHight();
      }
    );

    return {
      data,

      appSelectChange,
      search,
      roleAdd,
      submit
    };
  }
};
</script>

<style lang="scss" scoped>
.head-wrap {
  padding: 0 20px;
  line-height: 30px;
}
.tree-wrap {
  padding-left: 30px;
}
.label-color {
  color: $mainColor;
}
.content-wrap {
  padding: 10px 20px;
}
</style>
