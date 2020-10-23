<template>
  <div>
    <el-table
      class="table-wrap"
      :data="data.tableData"
      v-loading="data.loadingData"
      border
    >
      <el-table-column
        prop="moduleName"
        label="模块权限"
        width="180"
      ></el-table-column>
      <el-table-column label="按钮权限" min-width="150">
        <template slot-scope="scope">
          <el-checkbox
            v-for="power in scope.row.rolePowers"
            :label="power.content"
            :key="power.powerNo"
            :checked="power.roleNo === data.queryData.RoleNo"
            class="margin-right-10"
            @change="handleCheckedChange(power)"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            @click="dataDelete(scope.row)"
            plain
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pull-right margin-top-20 margin-bottom-20"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[20, 50, 100, 1000]"
      layout="total,sizes,prev,pager,next"
      :total="data.queryData.PageModel.TotalCount"
    >
    </el-pagination>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import { GetRoleModulePage, RolePowerSaveOrUpdate } from "@/api/sysRole";
export default {
  name: "roleModule",
  setup(props, { root, emit }) {
    const data = reactive({
      tableData: [],
      queryData: {
        RoleNo: "",
        ModuleName: "",
        PageModel: {
          PageIndex: 1,
          PageSize: 20,
          TotalCount: 0
        }
      },
      queryPower: {
        RoleNo: "",
        LstRolePower: []
      },
      loadingData: false
    });

    const getRoleModule = () => {
      data.loadingData = true;
      GetRoleModulePage(data.queryData)
        .then(res => {
          let resData = res.data;
          if (resData.hasErr) {
            root.$message.error(resData.msg);
          }
          data.tableData = resData.results;
          data.queryData.PageModel.TotalCount = resData.pageModel.totalCount;
          data.loadingData = false;
          emit("searchOk", resData);
        })
        .catch(err => {
          console.log(err);
          data.loadingData = false;
        });
    };

    // 每页数量
    const handleSizeChange = value => {
      data.queryData.PageModel.PageSize = value;
      getRoleModule();
    };

    // 第几页
    const handleCurrentChange = value => {
      data.queryData.PageModel.PageIndex = value;
      getRoleModule();
    };

    const search = params => {
      data.queryData.RoleNo = params.roleNo;
      data.queryData.ModuleName = params.moduleName;
      getRoleModule();
    };

    const handleCheckedChange = info => {
      if (!checkRolePower(info)) return false;
      data.queryPower.LstRolePower = [];
      data.queryPower.RoleNo = data.queryData.RoleNo;
      data.queryPower.LstRolePower.push({
        PowerNo: info.powerNo,
        PowerName: info.content,
        IsDelete: info.roleNo !== null
      });
      RolePowerSaveOrUpdate(data.queryPower)
        .then(res => {
          let msgtype = res.data.hasErr ? "warning" : "success";
          root.$message({
            type: msgtype,
            message: res.data.msg
          });
        })
        .catch(err => {
          console.log(err);
        });
    };

    const checkRolePower = info => {
      if (data.queryData.RoleNo.length <= 0) {
        root.$message.warning("请先选择角色！");
        return false;
      }
      if (info.powerNo.length <= 0) {
        root.$message.warning("请先选择按钮！");
        return false;
      }
      return true;
    };

    const dataDelete = row => {
      console.log(row);
    };

    return {
      data,

      getRoleModule,
      handleSizeChange,
      handleCurrentChange,
      search,
      handleCheckedChange,
      dataDelete
    };
  }
};
</script>

<style lang="scss" scoped>
.table-wrap {
  width: 100%;
  margin-top: 5px;
}
</style>
