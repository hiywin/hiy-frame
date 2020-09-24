<template>
  <div>
    <el-row>
      <el-col :span="2">
        <el-button type="success" style="width:100px;" @click="dataAdd"
          >添加</el-button
        >
      </el-col>
      <el-col :span="22">
        <div class="pull-right request" :hidden="data.queryRequest.Hidden">
          <span>Code：</span>
          <span>{{ data.queryRequest.Code }}</span>
          <span class="margin-left-10">请求时长：</span>
          <span>{{ data.queryRequest.Time }}</span
          ><span class="margin-left-5 margin-right-10">秒</span>
        </div>
      </el-col>
    </el-row>
    <div class="black-space-10"></div>
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
          <el-button type="success" size="mini" @click="dataSubAdd(scope.row)"
            >添加子模块</el-button
          >
          <el-button type="primary" size="mini" @click="dataEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" @click="dataDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="black-space-20"></div>
    <div>
      <el-pagination
        class="pull-right"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[20, 50, 100, 1000]"
        layout="total,sizes,prev,pager,next,jumper"
        :total="data.pageTotal"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { onBeforeMount, reactive } from "@vue/composition-api";
import { global } from "@/utils/global";
import { GetModulePage, GetModuleAll, ModuleDelete } from "@/api/sysModule";
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
      pageTotal: 0,
      loadingData: false,
      queryRequest: {
        Hidden: true,
        Code: "",
        Time: ""
      }
    });

    // 弹窗确认控件
    const { confirm } = global();

    // 分页获取模块列表
    const getModulesPage = () => {
      data.loadingData = true;
      GetModulePage(data.queryData)
        .then(res => {
          data.tableData = res.data.results;
          data.pageTotal = res.data.pageModel.totalCount;
          data.loadingData = false;
          data.queryRequest.Hidden = false;
          data.queryRequest.Code = res.data.code;
          data.queryRequest.Time = res.data.expandSeconds;
        })
        .catch(err => {
          console.log(err);
          data.queryRequest.Hidden = true;
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
        confirm({
          content: "确认删除当前信息？",
          tips: "警告",
          thenFn: deleteDataConfirm
        });
        data.deleteData.ModuleNo = row.moduleNo;
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

      loadChildren,
      handleSizeChange,
      handleCurrentChange,
      formatType
    };
  }
};
</script>
<style lang="scss" scoped>
.request {
  text-align: center;
  line-height: 30px;
  color: #e6a23c;
}
</style>
