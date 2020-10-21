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
        min-width="100"
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
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" width="100" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="dataEdit(scope.row)"
            icon="el-icon-edit"
            size="mini"
            circle
          ></el-button>
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
import { onBeforeMount, reactive } from "@vue/composition-api";
import { GetRolePage } from "@/api/sysRole";
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
      loadingData: false
    });

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
      console.log(row);
    };

    const dataDelete = row => {
      console.log(row);
    };

    const rowClick = row => {
      emit("rowClick", row);
    };

    const switchAccessEdit = row => {
      console.log("switchAccessEdit");
    };

    onBeforeMount(() => {
      getRolePage();
    });

    return {
      data,

      search,
      handleSizeChange,
      handleCurrentChange,
      dataEdit,
      dataDelete,
      rowClick,
      switchAccessEdit
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
