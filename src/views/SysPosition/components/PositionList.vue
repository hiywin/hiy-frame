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
        prop="positionName"
        label="职位名"
        min-width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="descr"
        label="描述"
        min-width="130"
        align="center"
      ></el-table-column>
      <el-table-column label="是否有效" width="100" align="center">
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
        prop="sort"
        label="排序"
        width="100"
        align="center"
      ></el-table-column>
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
            icon="el-icon-s-opportunity"
            @click="roleAdd(scope.row)"
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
import {
  GetPositionPage,
  PositionDelete,
  PositionAddOrUpdate
} from "@/api/sysPosition";
export default {
  name: "positionList",
  setup(props, { root, emit }) {
    const data = reactive({
      tableData: [],
      queryData: {
        PositionNo: "",
        PositionName: "",
        CompanyNo: "",
        IsDelete: false,
        PageModel: {
          PageIndex: 1,
          PageSize: 20,
          TotalCount: 0
        }
      },
      deleteData: {
        positionNo: "",
        isDelete: true
      },
      loadingData: false
    });
    // 弹窗确认控件
    const { confirm } = global();

    const getPositionPage = () => {
      data.loadingData = true;
      GetPositionPage(data.queryData)
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
      data.queryData.CompanyNo = params.companyNo;
      data.queryData.PositionName = params.positionName;
      getPositionPage();
    };

    // 每页数量
    const handleSizeChange = value => {
      data.queryData.PageModel.PageSize = value;
      getPositionPage();
    };

    // 第几页
    const handleCurrentChange = value => {
      data.queryData.PageModel.PageIndex = value;
      getPositionPage();
    };

    const dataEdit = row => {
      emit("dataEdit", row);
    };

    const dataDelete = row => {
      if (row.positionNo) {
        data.deleteData.positionNo = row.positionNo;
        confirm({
          content: `确认删除 ${row.positionName} 职位信息？`,
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
      PositionDelete(data.deleteData)
        .then(res => {
          let msgtype = res.data.hasErr ? "error" : "success";
          root.$message({
            type: msgtype,
            message: res.data.msg
          });
          if (!res.data.hasErr) {
            getPositionPage();
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
      PositionAddOrUpdate(row)
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

    const roleAdd = row => {
      emit("roleAdd", row);
    };

    return {
      data,

      getPositionPage,
      search,
      handleSizeChange,
      handleCurrentChange,
      dataEdit,
      dataDelete,
      rowClick,
      switchAccessEdit,
      roleAdd
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
