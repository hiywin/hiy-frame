<template>
  <div>
    <el-table :data="data.tableData" v-loading="data.loadingData" border>
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
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="70" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            @click="dataDelete(scope.row)"
            icon="el-icon-delete"
            size="mini"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { onMounted, reactive } from "@vue/composition-api";
import { GetRoleModulePage } from "@/api/sysRole";
export default {
  name: "roleModule",
  setup(props, { root }) {
    const data = reactive({
      tableData: [],
      queryData: {
        RoleNo: "-1",
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
        })
        .catch(err => {
          console.log(err);
          data.loadingData = false;
        });
    };

    const search = params => {
      data.queryData.RoleNo = params.roleNo;
      getRoleModule();
    };

    const dataDelete = row => {
      console.log(row);
    };

    onMounted(() => {
      getRoleModule();
    });

    return {
      data,

      search,
      dataDelete
    };
  }
};
</script>

<style lang="scss" scoped></style>
