<template>
  <div>
    <el-table
      style="width:100%"
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
        prop="图标"
        label="icon"
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
  setup() {
    const data = reactive({
      tableData: [],
      queryData: {
        ModudelNo: "",
        PowerNo: "",
        IsDelete: false
      },
      loadingData: false
    });

    const formatterTag = row => {
      let types = ["primary", "success", "info", "warning", "danger"];
      if (types.includes(row.type)) {
        return row.type;
      } else {
        return types[0];
      }
    };

    const getPowers = () => {
      GetPowerAll(data.queryData)
        .then(res => {
          data.tableData = res.data.results;
        })
        .catch(err => {
          console.log(err);
        });
    };

    onBeforeMount(() => {
      getPowers();
    });

    return {
      data,

      formatterTag
    };
  }
};
</script>
<style lang="scss" scoped></style>
