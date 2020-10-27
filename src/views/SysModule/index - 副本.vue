<template>
  <div>
    <SearchToolVue @search="search"></SearchToolVue>
    <el-row class="row-wrap">
      <el-col :span="12">
        <el-button
          type="success"
          class="input-width-80"
          icon="el-icon-plus"
          @click="dataAdd"
          >添加</el-button
        >
      </el-col>
      <el-col :span="12">
        <SearchTagVue ref="searchTag" />
      </el-col>
    </el-row>
    <el-table
      style="width:100%"
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
        :formatter="formatType"
      ></el-table-column>
      <el-table-column
        prop="icon"
        label="图标"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="url"
        label="路由路径"
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
            @click="dataSubAdd(scope.row)"
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
    <div>
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
  </div>
</template>
<script>
import { onBeforeMount, reactive } from "@vue/composition-api";
import { global } from "@/utils/global";
import { GetModulePage, GetModuleAll, ModuleDelete } from "@/api/sysModule";
import SearchTagVue from "@c/SearchTag/index";
import SearchToolVue from "./component/searchTool";
export default {
  name: "sysModule",
  components: { SearchTagVue, SearchToolVue },
  setup(props, { root, refs }) {
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
          TotalCount: 0
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
      paramsSubData: {
        moduleNo: "",
        moduleName: "",
        icon: "",
        url: "",
        routerName: "",
        category: "0",
        target: "_self",
        isResource: "0",
        sort: "1",
        app: "0",
        parentNo: ""
      },
      deleteData: {
        ModuleNo: "",
        IsDelete: true
      },
      loadingData: false
    });

    // 弹窗确认控件
    const { confirm } = global();

    // 查询
    const search = params => {
      console.log(params);
      data.queryData.App = params.App;
      data.queryData.ModuleName = params.ModuleName;
      getModulesPage();
    };

    // 分页获取模块列表
    const getModulesPage = () => {
      data.loadingData = true;
      GetModulePage(data.queryData)
        .then(res => {
          data.tableData = res.data.results;
          data.queryData.PageModel.TotalCount = res.data.pageModel.totalCount;
          data.loadingData = false;
          refs.searchTag.initConfig({
            Hidden: false,
            Code: res.data.code,
            Time: res.data.expandSeconds
          });
        })
        .catch(err => {
          refs.searchTag.initConfig({
            Hidden: false,
            Code: `${err.status} (${err.statusText})`,
            Time: 0
          });
          data.loadingData = false;
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

    // 新增
    const dataAdd = () => {
      root.$router.push({
        name: "ModuleInfo",
        params: {
          name: "moduleAdd",
          title: "新增模块信息"
        }
      });
    };

    // 新增子模块
    const dataSubAdd = row => {
      data.paramsSubData.app = row.app;
      data.paramsSubData.parentNo = row.moduleNo;
      root.$router.push({
        name: "ModuleInfo",
        params: {
          name: "moduleSubAdd",
          title: "新增子模块信息",
          moduleItem: JSON.stringify(data.paramsSubData)
        }
      });
    };

    // 编辑
    const dataEdit = row => {
      root.$router.push({
        name: "ModuleInfo",
        params: {
          name: "moduleEdit",
          title: "修改模块信息",
          moduleItem: JSON.stringify(row)
        }
      });
    };

    // 删除确认
    const dataDelete = row => {
      if (row.moduleNo) {
        data.deleteData.ModuleNo = row.moduleNo;
        confirm({
          content: "确认删除当前信息？",
          tips: "警告",
          thenFn: deleteDataConfirm
        });
      } else {
        root.$message({
          message: "请选择需要删除的数据！",
          type: "info"
        });
      }
    };

    // 确认删除
    const deleteDataConfirm = () => {
      ModuleDelete(data.deleteData)
        .then(res => {
          console.log(res);
          getModulesPage();
        })
        .catch(err => {
          console.log(err);
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

    // 加载所有字典项
    const getDictionaryAll = () => {
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
        case "app":
          type = "AppType";
          code = row.app.toString();
          break;
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

    onBeforeMount(() => {
      getDictionaryAll();
      getModulesPage();
    });

    return {
      data,

      dataAdd,
      dataSubAdd,
      dataEdit,
      dataDelete,

      search,
      loadChildren,
      handleSizeChange,
      handleCurrentChange,
      formatType
    };
  }
};
</script>
<style lang="scss" scoped>
.row-wrap {
  background-color: $mainTitleColor;
  line-height: 30px;
  padding: 5px 0 8px 5px;
  margin-bottom: 5px;
  border-radius: 0 0 5px 5px;
}
</style>
