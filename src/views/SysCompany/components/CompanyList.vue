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
        min-width="180"
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
  </div>
</template>
<script>
import { onBeforeMount, reactive } from "@vue/composition-api";
import { GetCompanyPage } from "@/api/sysCompany";
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
        isDelete: null,
        pageModel: {
          PageIndex: 1,
          PageSize: 20
        }
      },
      loadingData: false
    });

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
            emit("searchOk", res.data);
          }
          data.loadingData = false;
        })
        .catch(err => {
          data.loadingData = false;
          console.log(err);
        });
    };

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

    const dataEdit = row => {
      emit("dataEdit", row);
    };

    onBeforeMount(() => {
      getCompanyPage();
    });

    return {
      data,

      search,
      dataEdit
    };
  }
};
</script>
<style lang="scss" scoped></style>
