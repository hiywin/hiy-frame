<template>
  <div>
    <el-table
      class="width-per-10"
      :data="data.tableData"
      v-loading="data.loadingData"
      border
    >
      <el-table-column
        prop="companyName"
        label="公司名称"
        min-width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="abbreviation"
        label="简称"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="legalPerson"
        label="法人"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="contact"
        label="联系人"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号"
        width="140"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="email"
        label="Email"
        width="140"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="industry"
        label="所属行业"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column label="网址" width="150" align="center">
        <template slot-scope="scope">
          <el-link type="primary" :href="scope.row.website" target="_blank">{{
            scope.row.website
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="是否有效" width="90" align="center">
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
import { onBeforeMount, reactive } from "@vue/composition-api";
import { global } from "@/utils/global";
import {
  GetCompanyPage,
  CompanyDelete,
  CompanyAddOrUpdate
} from "@/api/sysCompany";
export default {
  name: "companyList",
  setup(props, { root, emit }) {
    const data = reactive({
      tableData: [],
      queryData: {
        companyNo: "",
        companyName: "",
        address: "",
        mobile: "",
        industry: "",
        legalPerson: "",
        isDelete: false,
        pageModel: {
          PageIndex: 1,
          PageSize: 20,
          TotalCount: 0
        }
      },
      deleteData: {
        companyNo: "",
        isDelete: true
      },
      loadingData: false
    });
    // 弹窗确认控件
    const { confirm } = global();

    // 查询接口
    const getCompanyPage = () => {
      data.loadingData = true;
      GetCompanyPage(data.queryData)
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
      getCompanyPage();
    };

    // 第几页
    const handleCurrentChange = value => {
      data.queryData.pageModel.PageIndex = value;
      getCompanyPage();
    };

    // 条件查询
    const search = queryData => {
      if (queryData) {
        data.queryData.companyNo = queryData.companyNo;
        data.queryData.companyName = queryData.companyName;
        data.queryData.address = queryData.address;
        data.queryData.mobile = queryData.mobile;
        data.queryData.industry = queryData.industry;
        data.queryData.legalPerson = queryData.legalPerson;
        data.queryData.isDelete = queryData.isDelete;
      }
      getCompanyPage();
    };

    // 编辑
    const dataEdit = row => {
      emit("dataEdit", row);
    };

    // 开关更新按钮信息
    const switchChangeEdit = row => {
      if (row.companyNo) {
        CompanyAddOrUpdate(row)
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
      }
    };

    // 删除确认
    const dataDelete = row => {
      if (row.companyNo) {
        data.deleteData.companyNo = row.companyNo;
        confirm({
          content: `确认删除 ${row.companyName} 公司信息？`,
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
      CompanyDelete(data.deleteData)
        .then(res => {
          let msgtype = res.data.hasErr ? "error" : "success";
          root.$message({
            type: msgtype,
            message: res.data.msg
          });
          if (!res.data.hasErr) {
            getCompanyPage();
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    onBeforeMount(() => {
      getCompanyPage();
    });

    return {
      data,

      search,
      handleSizeChange,
      handleCurrentChange,
      dataEdit,
      switchChangeEdit,
      dataDelete
    };
  }
};
</script>
<style lang="scss" scoped></style>
