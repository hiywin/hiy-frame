<template>
  <div>
    <el-table
      class="table-wrap"
      :data="data.tableData"
      v-loading="data.loadingData"
      border
    >
      <el-table-column
        prop="groupName"
        label="组织名"
        min-width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="code"
        label="Code"
        min-width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="descr"
        label="描述"
        min-width="100"
        align="center"
      ></el-table-column>
      <el-table-column label="是否有效" width="100" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.access"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="switchChangeEdit(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="createName"
        label="创建人"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" width="180" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="dataEdit(scope.row)"
            plain
            >编辑</el-button
          >
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
      layout="total,sizes,prev,pager,next,jumper"
      :total="data.queryData.pageModel.TotalCount"
    >
    </el-pagination>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import { global } from "@/utils/global";
import { GetGroupPage, GroupDelete, GroupAddOrUpdate } from "@/api/sysGroup";
export default {
  setup(props, { root, emit }) {
    const data = reactive({
      tableData: [],
      queryData: {
        groupNo: "",
        groupName: "",
        code: "",
        parentNo: "",
        appNo: "",
        isDelete: false,
        pageModel: {
          PageIndex: 1,
          PageSize: 20,
          TotalCount: 0
        }
      },
      deleteData: {
        groupNo: "",
        isDelete: true
      },
      loadingData: false
    });
    // 弹窗确认控件
    const { confirm } = global();

    // 查询接口
    const getGroupPage = () => {
      data.loadingData = true;
      GetGroupPage(data.queryData)
        .then(res => {
          if (res.data.hasErr) {
            root.$message({
              type: "warning",
              message: res.data.msg
            });
          } else {
            data.tableData = res.data.results;
            data.queryData.pageModel.TotalCount = res.data.pageModel.totalCount;
            emit("searchOk", res.data);
          }
          data.loadingData = false;
        })
        .catch(err => {
          data.loadingData = false;
          console.log(err);
        });
    };

    // 每页数量
    const handleSizeChange = value => {
      data.queryData.pageModel.PageSize = value;
      getGroupPage();
    };

    // 第几页
    const handleCurrentChange = value => {
      data.queryData.pageModel.PageIndex = value;
      getGroupPage();
    };

    // 条件查询
    const search = queryData => {
      if (queryData) {
        data.queryData.appNo = queryData.appNo;
        data.queryData.groupName = queryData.groupName;
      }
      getGroupPage();
    };

    const switchChangeEdit = row => {
      GroupAddOrUpdate(row)
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

    const dataEdit = row => {
      emit("dataEdit", row);
    };

    const dataDelete = row => {
      if (row.groupNo) {
        data.deleteData.groupNo = row.groupNo;
        confirm({
          content: `确认删除 ${row.groupName} 组织信息？`,
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
      GroupDelete(data.deleteData)
        .then(res => {
          let msgtype = res.data.hasErr ? "error" : "success";
          root.$message({
            type: msgtype,
            message: res.data.msg
          });
          if (!res.data.hasErr) {
            getGroupPage();
            emit("deleteOk");
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    return {
      data,

      getGroupPage,
      handleSizeChange,
      handleCurrentChange,
      search,
      switchChangeEdit,
      dataEdit,
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
