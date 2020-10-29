<template>
  <div>
    <el-table
      class="table-wrap"
      :data="data.tableData"
      v-loading="data.loadingData"
      border
    >
      <el-table-column
        prop="roleName"
        label="角色名"
        min-width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="appNo"
        label="所属平台"
        min-width="180"
        align="center"
        :formatter="formatApp"
      ></el-table-column>
      <el-table-column label="操作" width="100" fixed="right" align="center">
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
import { onBeforeMount, reactive } from "@vue/composition-api";
import { global } from "@/utils/global";
import { GetPositionRoleAll, PositionRoleDelete } from "@/api/sysPosition";
export default {
  name: "roleList",
  setup(props, { root, emit }) {
    const data = reactive({
      tableData: [],
      queryData: {
        positionNo: "",
        roleName: ""
      },
      deleteData: {
        PositionNo: "",
        RoleNo: ""
      },
      loadingData: false
    });

    // 弹窗确认控件
    const { confirm } = global();

    const getPositionRoleAll = () => {
      data.loadingData = true;
      GetPositionRoleAll(data.queryData)
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
      if (params.positionNo == "") {
        root.$message.warning("请先选择职位！");
        return false;
      }
      data.queryData.positionNo = params.positionNo;
      data.queryData.roleName = params.roleName;
      getPositionRoleAll();
    };

    const dataDelete = row => {
      if (!checkPositionRole(row)) return false;
      data.deleteData.PositionNo = row.positionNo;
      data.deleteData.RoleNo = row.roleNo;
      confirm({
        content: `确认删除 ${row.roleName} 角色？`,
        tips: "警告",
        thenFn: deleteDataConfirm
      });
    };

    // 确认删除
    const deleteDataConfirm = () => {
      PositionRoleDelete(data.deleteData)
        .then(res => {
          let msgtype = res.data.hasErr ? "error" : "success";
          root.$message({
            type: msgtype,
            message: res.data.msg
          });
          if (!res.data.hasErr) {
            getPositionRoleAll();
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    const checkPositionRole = info => {
      if (info.positionNo.length <= 0) {
        root.$message.warning("请先选择职位！");
        return false;
      }
      if (info.roleNo.length <= 0) {
        root.$message.warning("请选择角色！");
        return false;
      }
      return true;
    };

    const reloadList = params => {
      data.queryData.positionNo = params.positionNo;
      data.queryData.roleName = params.roleName;
      data.tableData = [];
    };

    const formatApp = row => {
      return root.$store.getters["format/getAppName"]({
        appNo: row.appNo
      });
    };

    const initFormatters = () => {
      let queryApp = {
        AppNo: "",
        AppName: "",
        Leader: "",
        IsDelete: false
      };
      root.$store.dispatch("format/getAppAll", queryApp);
    };

    onBeforeMount(() => {
      initFormatters();
    });

    return {
      data,

      getPositionRoleAll,
      search,
      dataDelete,
      reloadList,
      formatApp
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
