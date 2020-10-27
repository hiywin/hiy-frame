<template>
  <div>
    <el-table
      class="table-wrap"
      :data="data.tableData"
      row-key="moduleNo"
      border
      lazy
      v-loading="data.loadingData"
      :load="loadChildren"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="moduleName" label="模块名称" min-width="200">
        <template slot-scope="scope">
          <el-tag :type="scope.row.parentNo != '' ? 'warning' : 'success'">
            <svg-icon
              :iconClass="scope.row.icon"
              :className="scope.row.icon"
              style="color:#344a5f;"
            />
            {{ scope.row.moduleName }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="app"
        label="平台"
        width="120"
        align="center"
        :formatter="formatApp"
      ></el-table-column>
      <el-table-column
        prop="icon"
        label="图标"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="url"
        label="路由地址"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="routerName"
        label="路由名称"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="category"
        label="类型"
        width="100"
        align="center"
        :formatter="formatType"
      ></el-table-column>
      <el-table-column
        prop="target"
        label="重定向"
        width="100"
        align="center"
        :formatter="formatType"
      ></el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="createName"
        label="创建人"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" width="260" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="infoAdd(scope.row)"
            plain
            >添加子模块</el-button
          >
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
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.queryData.PageModel.TotalCount"
    >
    </el-pagination>
  </div>
</template>

<script>
import { onBeforeMount, reactive } from "@vue/composition-api";
import { GetModulePage, GetModuleAll } from "@/api/sysModule";
export default {
  name: "moduleList",
  setup(props, { root, emit }) {
    const data = reactive({
      tableData: [],
      queryData: {
        ModuleNo: "",
        ModuleName: "",
        ParentNo: "",
        AppNo: "",
        IsDelete: false,
        PageModel: {
          PageIndex: 1,
          PageSize: 20,
          TotalCount: 0
        }
      },
      querySubData: {
        ModuleNo: "",
        ModuleName: "",
        AppNo: "",
        ParentNo: null,
        IsDelete: false
      },
      deleteData: {
        ModuleNo: "",
        IsDelete: true
      },
      loadingData: false
    });

    // 分页获取模块列表
    const getModulesPage = () => {
      data.loadingData = true;
      GetModulePage(data.queryData)
        .then(res => {
          data.tableData = res.data.results;
          data.queryData.PageModel.TotalCount = res.data.pageModel.totalCount;
          data.loadingData = false;
          emit("searchOk", res.data);
        })
        .catch(err => {
          data.loadingData = false;
          console.log(err);
        });
    };

    const search = params => {
      data.queryData.AppNo = params.appNo;
      data.queryData.ModuleName = params.moduleName;
      getModulesPage();
    };

    // 加载子模块
    const loadChildren = (tree, treeNode, resolve) => {
      data.querySubData.ParentNo = tree.moduleNo;
      GetModuleAll(data.querySubData)
        .then(res => {
          resolve(res.data.results);
        })
        .catch(err => {
          console.log(err);
        });
    };

    // 每页数量
    const handleSizeChange = value => {
      data.queryData.PageModel.PageSize = value;
      getModulesPage();
    };

    // 第几页
    const handleCurrentChange = value => {
      data.queryData.PageModel.PageIndex = value;
      getModulesPage();
    };

    // 加载序列化数据
    const initFormatters = () => {
      let queryApp = {
        AppNo: "",
        AppName: "",
        Leader: "",
        IsDelete: false
      };
      root.$store.dispatch("format/getAppAll", queryApp);
      let requstData = {
        Type: "",
        TypeName: "",
        IsDelete: false
      };
      root.$store.dispatch("dic/getDictionaryAll", requstData);
    };

    // 表格类型字段序列化
    const formatType = (row, colume) => {
      let type = "";
      let code = "";
      switch (colume.property) {
        case "category":
          type = "ModuleType";
          code = row.category.toString();
          break;
        case "target":
          type = "TargetType";
          code = row.target.toString();
          break;
      }
      // 从vuex中匹配字典名，避免多次请求接口
      let content = root.$store.getters["dic/getContent"]({
        Type: type,
        Code: code
      });
      return content;
    };

    // 表格平台字段序列化
    const formatApp = row => {
      return root.$store.getters["format/getAppName"]({
        appNo: row.appNo
      });
    };

    const infoAdd = row => {
      emit("infoAdd", row);
    };

    const dataEdit = row => {
      emit("dataEdit", row);
    };

    const dataDelete = row => {
      console.log(row);
    };

    onBeforeMount(() => {
      initFormatters();
      getModulesPage();
    });

    return {
      data,

      getModulesPage,
      loadChildren,
      handleSizeChange,
      handleCurrentChange,
      formatType,
      formatApp,
      search,
      infoAdd,
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
