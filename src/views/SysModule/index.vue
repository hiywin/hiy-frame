<template>
  <div>
    <el-row>
      <el-col :span="2">
        <el-button type="success" style="width:100px;" @click="dataAdd"
          >添加</el-button
        >
      </el-col>
    </el-row>
    <div class="black-space-10"></div>
    <el-table
      style="width:100%"
      :data="data.tableData"
      row-key="moduleNo"
      border
      lazy
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
          <el-button type="success" size="mini">添加子模块</el-button>
          <el-button type="primary" size="mini" @click="dataEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { onBeforeMount, reactive } from "@vue/composition-api";
import { GetModulePage, GetModuleAll } from "@/api/sysModule";
export default {
  name: "sysModule",
  setup(props, { root }) {
    const data = reactive({
      tableData: [],
      queryData: {
        ModuleNo: "",
        ModuleName: "",
        ParentNo: "",
        App: "",
        IsDelete: false,
        PageModel: {
          PageIndex: 1,
          PageSize: 20
        }
      },
      querySubData: {
        ModuleNo: "",
        ModuleName: "",
        App: "",
        ParentNo: "",
        IsParentNo: true,
        IsDelete: false
      }
    });

    // 分页获取模块列表
    const getModulesPage = () => {
      GetModulePage(data.queryData)
        .then(res => {
          data.tableData = res.data.results;
        })
        .catch(err => {
          console.log(err);
        });
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
      dataEdit,
      loadChildren,
      formatType
    };
  }
};
</script>
<style lang="scss" scoped></style>
