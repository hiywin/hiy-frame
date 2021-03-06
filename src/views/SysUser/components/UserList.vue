<template>
  <div>
    <el-table :data="data.tableData" v-loading="data.loadingData" border>
      <el-table-column
        prop="userName"
        label="用户名"
        min-width="150"
        align="center"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div class="div-tag-wrap">
              <p class="margin-bottom-5">
                <i class="el-icon-s-opportunity"></i>
                角色：
              </p>
              <el-tag
                class="tag-item"
                v-for="item in scope.row.lstUserRole"
                :key="item.id"
                @close="deleteRole(item)"
                closable
                type="warning"
              >
                {{ item.roleName }}
              </el-tag>
            </div>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.userName }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
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
        :formatter="formatCompany"
      ></el-table-column>
      <el-table-column
        prop="icon"
        label="Icon"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column label="是否管理员" width="100" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isAdmin"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="switchAdminEdit(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
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
        prop="approvedName"
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
        :formatter="formatApp"
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
      layout="total,sizes,prev,pager,next,jumper"
      :total="data.queryData.PageModel.TotalCount"
    >
    </el-pagination>
  </div>
</template>

<script>
import { onBeforeMount, reactive } from "@vue/composition-api";
import {
  GetUsersPage,
  UserDelete,
  UserAddOrUpdate,
  UserRoleDelete
} from "@/api/sysUser";
import { global } from "@/utils/global";
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
        ApprovedName: "",
        RejectedName: "",
        CompanyNo: "",
        Access: null,
        IsDelete: false,
        PageModel: {
          PageIndex: 1,
          PageSize: 20,
          TotalCount: 0
        }
      },
      deleteData: {
        userNo: "",
        isDelete: true
      },
      deleteRole: {
        userNo: "",
        roleNo: ""
      },
      loadingData: false
    });
    // 弹窗确认控件
    const { confirm } = global();

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

    // 每页数量
    const handleSizeChange = value => {
      data.queryData.PageModel.PageSize = value;
      getUsersPage();
    };

    // 第几页
    const handleCurrentChange = value => {
      data.queryData.PageModel.PageIndex = value;
      getUsersPage();
    };

    const search = queryData => {
      data.queryData.UserName = queryData.userName;
      data.queryData.StaffNo = queryData.staffNo;
      data.queryData.AdAccount = queryData.adAccount;
      data.queryData.Mobile = queryData.mobile;
      data.queryData.Email = queryData.email;
      data.queryData.RealName = queryData.realName;
      data.queryData.ApprovedName = queryData.approvedName;
      data.queryData.RejectedName = queryData.rejectedName;
      data.queryData.CompanyNo = queryData.companyNo;
      getUsersPage();
    };

    const dataEdit = row => {
      emit("dataEdit", row);
    };

    const switchAdminEdit = row => {
      UserAddOrUpdate(row)
        .then(res => {
          let msgtype = res.data.hasErr ? "warning" : "success";
          root.$message({
            type: msgtype,
            message: res.data.msg
          });
          getUsersPage();
        })
        .catch(err => {
          console.log(err);
        });
    };

    const switchAccessEdit = row => {
      emit("switchAccessEdit", row);
    };

    const dataDelete = row => {
      if (row.userNo) {
        data.deleteData.userNo = row.userNo;
        confirm({
          content: `确认删除 ${row.userName} 用户信息？`,
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
      UserDelete(data.deleteData)
        .then(res => {
          let msgtype = res.data.hasErr ? "error" : "success";
          root.$message({
            type: msgtype,
            message: res.data.msg
          });
          if (!res.data.hasErr) {
            getUsersPage();
          }
        })
        .catch(err => {
          console.log(err);
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
      let queryCompany = {
        CompanyNo: "",
        CompanyName: "",
        Address: "",
        Mobile: "",
        Industry: "",
        LegalPerson: "",
        IsDelete: false
      };
      root.$store.dispatch("format/getCompanyAll", queryCompany);
    };

    const formatCompany = row => {
      return root.$store.getters["format/getCompanyName"]({
        companyNo: row.companyNo
      });
    };

    const formatApp = row => {
      return root.$store.getters["format/getAppName"]({
        appNo: row.appNo
      });
    };

    const roleAdd = row => {
      emit("roleAdd", row);
    };

    const deleteRole = item => {
      if (item.userNo.length > 0 && item.roleNo.length > 0) {
        data.deleteRole.userNo = item.userNo;
        data.deleteRole.roleNo = item.roleNo;
        confirm({
          content: `确认删除 ${item.roleName} 角色？`,
          tips: "警告",
          thenFn: deleteRoleConfirm
        });
      } else {
        root.$message({
          message: "请选择需要删除的数据！",
          type: "warning"
        });
      }
    };

    const deleteRoleConfirm = () => {
      UserRoleDelete(data.deleteRole)
        .then(res => {
          let msgtype = res.data.hasErr ? "error" : "success";
          root.$message({
            type: msgtype,
            message: res.data.msg
          });
          if (!res.data.hasErr) {
            getUsersPage();
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    onBeforeMount(() => {
      initFormatters();
      getUsersPage();
    });

    return {
      data,

      search,
      formatCompany,
      formatApp,
      handleSizeChange,
      handleCurrentChange,
      dataEdit,
      switchAdminEdit,
      switchAccessEdit,
      dataDelete,
      roleAdd,
      deleteRole
    };
  }
};
</script>

<style lang="scss" scoped>
.div-tag-wrap {
  min-width: 100px;
  max-width: 300px;
}
.tag-item {
  margin: 0 5px 5px 5px;
  padding: 0 5px;
}
</style>
