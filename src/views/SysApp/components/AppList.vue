<template>
  <div>
    <el-table :data="data.tableData" v-loading="data.loadingData" border>
      <el-table-column
        prop="appName"
        label="平台名称"
        min-width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="leader"
        label="负责人"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="deploy"
        label="部署描述"
        width="300"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        width="150"
        align="center"
      ></el-table-column>
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
      <el-table-column
        prop="updateName"
        label="修改人"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        label="修改时间"
        width="150"
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
import { onBeforeMount, reactive } from "@vue/composition-api";
import { GetAppPage, AppDelete } from "@/api/sysApp";
import { global } from "@/utils/global";
export default {
  name: "appList",
  setup(props, { root, emit }) {
    const data = reactive({
      tableData: [],
      queryData: {
        AppNo: "",
        AppName: "",
        Leader: "",
        IsDelete: false,
        pageModel: {
          PageIndex: 1,
          PageSize: 20,
          TotalCount: 0
        }
      },
      deleteData: {
        appNo: "",
        isDelete: true
      },
      loadingData: false
    });
    // 弹窗确认控件
    const { confirm } = global();

    const getAppPage = () => {
      data.loadingData = true;
      GetAppPage(data.queryData)
        .then(res => {
          let resData = res.data;
          if (resData.hasErr) {
            root.$message.error(resData.msg);
          }
          data.tableData = resData.results;
          data.queryData.pageModel.TotalCount = resData.pageModel.totalCount;
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
      data.queryData.pageModel.PageSize = value;
      getAppPage();
    };

    // 第几页
    const handleCurrentChange = value => {
      data.queryData.pageModel.PageIndex = value;
      getAppPage();
    };

    const search = params => {
      data.queryData.AppName = params.appName;
      data.queryData.Leader = params.leader;
      getAppPage();
    };

    const dataEdit = row => {
      emit("dataEdit", row);
    };

    const dataDelete = row => {
      if (row.appNo) {
        data.deleteData.appNo = row.appNo;
        confirm({
          content: `确认删除 ${row.appName} 平台信息？`,
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

    const deleteDataConfirm = () => {
      AppDelete(data.deleteData)
        .then(res => {
          let msgtype = res.data.hasErr ? "error" : "success";
          root.$message({
            type: msgtype,
            message: res.data.msg
          });
          if (!res.data.hasErr) {
            getAppPage();
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    onBeforeMount(() => {
      getAppPage();
    });

    return {
      data,

      handleSizeChange,
      handleCurrentChange,
      search,
      dataEdit,
      dataDelete
    };
  }
};
</script>
<style lang="scss" scoped></style>
