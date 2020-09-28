<template>
  <div>
    <el-table
      class="table-wrap"
      :data="data.tableData"
      row-key="moduleNo"
      border
      lazy
      @row-click="rowClick"
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
      <el-table-column label="操作" width="130" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="dataAdd(scope.row)"
            plain
            >添加按钮</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="margin-top-20 margin-bottom-20"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[20, 50, 100, 1000]"
      layout="total,sizes,prev,pager,next"
      :total="data.queryData.PageModel.PageToTal"
      style="width:100%"
    >
    </el-pagination>
  </div>
</template>
<script>
import { onBeforeMount, reactive } from "@vue/composition-api";
import { GetModulePage, GetModuleAll } from "@/api/sysModule";
export default {
  name: "moduleTable",
  setup(props, { emit }) {
    const data = reactive({
      tableData: [],
      queryData: {
        ModuleNo: "",
        ModuleName: "",
        ParentNo: "",
        IsParentNo: true,
        App: "0",
        IsDelete: false,
        PageModel: {
          PageIndex: 1,
          PageSize: 20,
          PageToTal: 0
        }
      },
      querySubData: {
        ModuleNo: "",
        ModuleName: "",
        App: "",
        ParentNo: "",
        IsParentNo: true,
        IsDelete: false
      },
      loadingData: false
    });

    // 分页获取模块列表
    const getModulesPage = () => {
      data.loadingData = true;
      GetModulePage(data.queryData)
        .then(res => {
          data.tableData = res.data.results;
          data.queryData.PageModel.PageToTal = res.data.pageModel.totalCount;
          data.loadingData = false;
        })
        .catch(err => {
          console.log(err);
          data.loadingData = false;
        });
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

    // 添加按钮
    const dataAdd = row => {
      emit("powerAdd", row);
    };

    // 点击行查询
    const rowClick = row => {
      emit("rowClick", row);
    };

    // 查询
    const search = params => {
      data.queryData.App = params.App;
      data.queryData.ModuleName = params.ModuleName;
      getModulesPage();
    };

    onBeforeMount(() => {
      getModulesPage();
    });

    return {
      data,

      search,
      loadChildren,
      handleSizeChange,
      handleCurrentChange,

      dataAdd,
      rowClick
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
