<template>
  <div>
    <el-table :data="data.tableData" v-loading="data.loadingData" border>
      <el-table-column
        prop="groupName"
        label="组织名"
        min-width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="code"
        label="Code"
        min-width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="descr"
        label="描述"
        min-width="100"
        align="center"
      ></el-table-column>
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
import { reactive } from "@vue/composition-api";

export default {
  setup() {
    const data = reactive({
      count: 0
    });

    const switchChangeEdit = row => {
      console.log(row);
    };

    const dataEdit = row => {
      console.log(row);
    };

    const dataDelete = row => {
      console.log(row);
    };

    return {
      data,

      switchChangeEdit,
      dataEdit,
      dataDelete
    };
  }
};
</script>

<style lang="scss" scoped></style>
