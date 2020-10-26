<template>
  <div>
    <el-table
      class="table-wrap"
      :data="data.tableData"
      @row-click="rowClick"
      v-loading="data.loadingData"
      border
    >
      <el-table-column
        prop="roleName"
        label="角色名"
        min-width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="descr"
        label="描述"
        min-width="150"
        align="center"
      ></el-table-column>
      <el-table-column label="是否有效" width="120" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.access"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="switchAccessEdit(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="createName"
        label="创建人"
        width="130"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="130"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" width="160" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-plus"
            @click="moduleAdd(scope.row)"
            circle
          ></el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="dataEdit(scope.row)"
            circle
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="dataDelete(scope.row)"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pull-right margin-top-20 margin-bottom-20"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[20, 50, 100, 1000]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.queryData.PageModel.TotalCount"
    >
    </el-pagination>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import { global } from "@/utils/global";
import { GetRolePage, RoleDelete, RoleAddOrUpdate } from "@/api/sysRole";
export default {
  name: "roleList",
  setup(props, { root, emit }) {
    const data = reactive({
      tableData: [],
      queryData: {
        RoleNo: "",
        RoleName: "",
        AppNo: "",
        IsDelete: false,
        PageModel: {
          PageIndex: 1,
          PageSize: 20
        }
      },
      deleteData: {
        roleNo: ""
      },
      loadingData: false
    });

    // 弹窗确认控件
    const { confirm } = global();

    const getRolePage = () => {
      data.loadingData = true;
      GetRolePage(data.queryData)
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

    const search = params => {
      data.queryData.RoleName = params.roleName;
      data.queryData.AppNo = params.appNo;
      getRolePage();
    };

    // 每页数量
    const handleSizeChange = value => {
      data.queryData.PageModel.PageSize = value;
      getRolePage();
    };

    // 第几页
    const handleCurrentChange = value => {
      data.queryData.PageModel.PageIndex = value;
      getRolePage();
    };

    const dataEdit = row => {
      emit("roleEdit", row);
    };

    const dataDelete = row => {
      if (row.roleNo) {
        data.deleteData.roleNo = row.roleNo;
        confirm({
          content: `确认删除 ${row.roleName} 角色及所属权限？`,
          tips: "警告",
          thenFn: deleteDataConfirm
        });
      } else {
        root.$message({
          message: "请选择需要删除的数据！",
          type: "warning"
        });
      }
    };

    // 确认删除
    const deleteDataConfirm = () => {
      RoleDelete(data.deleteData)
        .then(res => {
          let msgtype = res.data.hasErr ? "error" : "success";
          root.$message({
            type: msgtype,
            message: res.data.msg
          });
          if (!res.data.hasErr) {
            getRolePage();
            emit("deleteOk");
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    const rowClick = row => {
      emit("rowClick", row);
    };

    const switchAccessEdit = row => {
      RoleAddOrUpdate(row)
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

    const moduleAdd = row => {
      emit("moduleAdd", row);
    };

    return {
      data,

      search,
      handleSizeChange,
      handleCurrentChange,
      dataEdit,
      dataDelete,
      rowClick,
      switchAccessEdit,
      moduleAdd
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
