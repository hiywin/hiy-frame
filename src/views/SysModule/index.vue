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
    <el-table :data="data.tableData" border style="width:100%">
      <el-table-column
        prop="moduleNo"
        label="模块编号"
        width="200"
      ></el-table-column>
      <el-table-column prop="moduleName" label="模块名称"></el-table-column>
      <el-table-column
        prop="parentNo"
        label="父编号"
        width="200"
      ></el-table-column>
      <el-table-column prop="icon" label="图标" width="100"></el-table-column>
      <el-table-column
        prop="url"
        label="路由路径"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="routerName"
        label="路由名称"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="category"
        label="类型"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="target"
        label="重定向"
        width="100"
      ></el-table-column>
      <el-table-column prop="app" label="平台" width="100"></el-table-column>
      <el-table-column prop="sort" label="排序" width="100"></el-table-column>
      <el-table-column
        prop="createName"
        label="创建人"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="150"
      ></el-table-column>
      <el-table-column label="操作" width="160" fixed="right">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="dataEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { onMounted, reactive } from "@vue/composition-api";
import { GetModuleAll } from "@/api/sysModule";
export default {
  name: "sysModule",
  setup(props, { root }) {
    const data = reactive({
      tableData: []
    });

    // 获取模块列表
    const getModules = () => {
      let requestDta = {
        ModuleNo: "",
        ModuleName: "",
        IsDelete: null
      };
      GetModuleAll(requestDta)
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

    onMounted(() => {
      getModules();
    });

    return {
      data,

      dataAdd,
      dataEdit
    };
  }
};
</script>
<style lang="scss" scoped></style>
