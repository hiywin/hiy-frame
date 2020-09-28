<template>
  <div>
    <el-table
      class="table-wrap"
      :data="data.tableData"
      border
      v-loading="data.loadingData"
    >
      <el-table-column
        prop="content"
        label="按钮名称"
        min-width="150"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="formatterTag(scope.row)">
            <svg-icon
              :iconClass="scope.row.icon"
              :className="scope.row.icon"
              style="color:#344a5f;"
            />
            {{ scope.row.content }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="style"
        label="样式"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="funcName"
        label="函数名"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="icon"
        label="图标"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
        width="70"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="access"
        label="是否有效"
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
        width="130"
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
import { GetPowerAll } from "@/api/sysPower";
export default {
  name: "powerList",
  setup(props, { emit }) {
    const data = reactive({
      tableData: [],
      queryData: {
        ModudelNo: "-1",
        PowerNo: "",
        IsDelete: false
      },
      loadingData: false
    });

    // 按钮名称样式格式化
    const formatterTag = row => {
      let types = ["primary", "success", "info", "warning", "danger"];
      if (types.includes(row.type)) {
        return row.type;
      } else {
        return types[0];
      }
    };

    // 获取按钮列表
    const getPowers = () => {
      GetPowerAll(data.queryData)
        .then(res => {
          data.tableData = res.data.results;
          emit("getPowerData", res.data);
        })
        .catch(err => {
          console.log(err);
        });
    };

    // 根据模块查询按钮列表
    const getModulePowers = params => {
      data.queryData.ModudelNo = params.moduleNo;
      getPowers();
    };

    onBeforeMount(() => {
      getPowers();
    });

    return {
      data,

      formatterTag,
      getModulePowers
    };
  }
};
</script>
<style lang="scss" scoped>
.table-wrap {
  width: 100%;
}
</style>
