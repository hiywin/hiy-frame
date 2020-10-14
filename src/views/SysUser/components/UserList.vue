<template>
  <div>
    <el-table :data="data.tableData" v-loading="data.loadingData" border>
      <el-table-column
        prop="userName"
        label="用户名"
        min-width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="realName"
        label="真实姓名"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="staffNo"
        label="工号"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="adAccount"
        label="AD账号"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="email"
        label="Email"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="companyNo"
        label="所属公司"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="isAdmin"
        label="是否管理员"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="access"
        label="是否有效"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="icon"
        label="Icon"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="approvedBy"
        label="审批人"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="approvedTime"
        label="审批时间"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="descr"
        label="描述"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="rejectedName"
        label="拒绝人"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="rejectedTime"
        label="拒绝时间"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="rejectedReason"
        label="拒绝理由"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="appNo"
        label="注册平台"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="registerTime"
        label="注册时间"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="createName"
        label="创建人"
        width="120"
        align="center"
      ></el-table-column
      ><el-table-column
        prop="createTime"
        label="创建时间"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" width="200" fixed="right" align="center">
        <template slot-scope="scope">
          <el-tooltip content="审批" placement="top"
            ><el-button type="success" icon="el-icon-check" circle></el-button
          ></el-tooltip>
          <el-tooltip content="拒绝" placement="top">
            <el-button type="warning" icon="el-icon-close" circle></el-button
          ></el-tooltip>
          <el-tooltip content="编辑" placement="top"
            ><el-button
              type="primary"
              icon="el-icon-edit"
              @click="dataEdit(scope.row)"
              circle
            ></el-button
          ></el-tooltip>
          <el-tooltip content="删除" placement="top"
            ><el-button
              type="danger"
              icon="el-icon-delete"
              @click="dataDelete(scope.row)"
              circle
            ></el-button
          ></el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { onMounted, reactive } from "@vue/composition-api";
import { GetUsersPage } from "@/api/sysUser";
export default {
  name: "userList",
  setup(props, { root, emit }) {
    const data = reactive({
      tableData: [],
      queryData: {
        UserNo: "",
        UserName: "",
        StaffNo: "",
        AdAccount: "",
        Mobile: "",
        Email: "",
        RealName: "",
        CompanyNo: "",
        Access: null,
        IsDelete: false,
        PageModel: {
          PageIndex: 1,
          PageSize: 20,
          TotalCount: 0
        }
      },
      loadingData: false
    });

    const getUsersPage = () => {
      data.loadingData = true;
      GetUsersPage(data.queryData)
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

    const search = queryData => {
      data.queryData.UserName = queryData.userName;
      data.queryData.StaffNo = queryData.staffNo;
      data.queryData.AdAccount = queryData.adAccount;
      data.queryData.Mobile = queryData.mobile;
      data.queryData.Email = queryData.email;
      data.queryData.RealName = queryData.realName;
      data.queryData.CompanyNo = queryData.companyNo;
      getUsersPage();
    };

    const dataEdit = row => {
      console.log(row);
    };

    const dataDelete = row => {
      console.log(row);
    };

    onMounted(() => {
      getUsersPage();
    });

    return {
      data,

      search,
      dataEdit,
      dataDelete
    };
  }
};
</script>

<style lang="scss" scoped></style>
