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
            :key="'power' + power.id"
            :checked="power.roleNo == null"
            class="margin-right-10"
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
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import { GetRoleModulePage } from "@/api/sysRole";
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
          PageSize: 20
        }
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
          data.loadingData = false;
          emit("searchOk", resData);
        })
        .catch(err => {
          console.log(err);
          data.loadingData = false;
        });
    };

    const search = params => {
      data.queryData.RoleNo = params.roleNo;
      data.queryData.ModuleName = params.moduleName;
      getRoleModule();
    };

    const dataDelete = row => {
      console.log(row);
    };

    return {
      data,

      search,
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
