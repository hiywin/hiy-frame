<template>
  <div>
    <div class="search-tag-wrap"></div>
    <el-table
      :data="data.tableData"
      v-loading="data.loadingData"
      @row-click="rowClick"
      border
    >
      <el-table-column
        prop="content"
        label="主类型"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="code"
        label="Code"
        align="center"
        width="120"
      ></el-table-column>
      <el-table-column label="操作" width="160" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-plus"
            @click="infoAdd(scope.row)"
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
      layout="total,sizes,prev,pager,next"
      :total="data.queryData.PageModel.TotalCount"
    >
    </el-pagination>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import { global } from "@/utils/global";
import { GetDictionaryPage, DictionaryDelete } from "@/api/sysDictionary";
export default {
  name: "dictionaryParent",
  components: {},
  setup(props, { root, emit }) {
    const data = reactive({
      tableData: [],
      queryData: {
        Type: "DictionaryType",
        TypeName: "",
        Content: "",
        ParentNo: null,
        AppNo: null,
        IsDelete: false,
        PageModel: {
          PageIndex: 1,
          PageSize: 20,
          TotalCount: 0
        }
      },
      deleteData: {
        DictionaryNo: "",
        IsDelete: true
      },
      loadingData: false
    });

    // 弹窗确认控件
    const { confirm } = global();

    const getDictionaryPage = () => {
      data.loadingData = true;
      GetDictionaryPage(data.queryData)
        .then(res => {
          let resData = res.data;
          if (resData.hasErr) {
            root.$message.error(resData.msg);
          }
          data.tableData = resData.results;
          data.queryData.PageModel.TotalCount = resData.pageModel.totalCount;
          emit("searchOk", resData);
          data.loadingData = false;
        })
        .catch(err => {
          console.log(err);
          data.loadingData = false;
        });
    };

    const search = params => {
      data.queryData.Content = params.content;
      data.queryData.AppNo = params.appNo;
      getDictionaryPage();
    };

    // 每页数量
    const handleSizeChange = value => {
      data.queryData.PageModel.PageSize = value;
      getDictionaryPage();
    };

    // 第几页
    const handleCurrentChange = value => {
      data.queryData.PageModel.PageIndex = value;
      getDictionaryPage();
    };

    const rowClick = row => {
      emit("parentClick", row);
    };

    const infoAdd = row => {
      console.log(row);
    };

    const dataEdit = row => {
      emit("dataEdit", row);
    };

    const dataDelete = row => {
      if (row.dictionaryNo) {
        data.deleteData.DictionaryNo = row.dictionaryNo;
        confirm({
          content: `确认删除 ${row.content} 字典类型及所属字典项？`,
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
      DictionaryDelete(data.deleteData)
        .then(res => {
          let msgtype = res.data.hasErr ? "error" : "success";
          root.$message({
            type: msgtype,
            message: res.data.msg
          });
          if (!res.data.hasErr) {
            getDictionaryPage();
            emit("deleteOk");
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    return {
      data,

      getDictionaryPage,
      handleSizeChange,
      handleCurrentChange,
      search,
      rowClick,
      infoAdd,
      dataEdit,
      dataDelete
    };
  }
};
</script>
<style lang="scss" scoped>
.search-tag-wrap {
  line-height: 33px;
  padding: 5px;
  margin-bottom: 5px;
  background-color: $mainTitleColor;
  border-radius: 0 0 3px 3px;
  font-weight: bold;
}
</style>
