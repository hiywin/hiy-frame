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
        min-width="120"
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
        prop="powerID"
        label="按钮ID"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="90"
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
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="icon"
        label="图标"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column label="plain" width="90" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isPlain"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="switchChangeEdit(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="round" width="90" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isRound"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="switchChangeEdit(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="circle" width="90" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isCircle"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="switchChangeEdit(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
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
        prop="sort"
        label="排序"
        width="70"
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
import { global } from "@/utils/global";
import { GetPowerAll, PowerAddOrUpdate, PowerDelete } from "@/api/sysPower";
export default {
  name: "powerList",
  setup(props, { root, emit }) {
    const data = reactive({
      tableData: [],
      queryData: {
        ModudelNo: "-1",
        PowerNo: "",
        IsDelete: false
      },
      deleteData: {
        moduleNo: "",
        powerNo: "",
        isDelete: true
      },
      loadingData: false
    });

    // 弹窗确认控件
    const { confirm } = global();

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
      data.loadingData = true;
      GetPowerAll(data.queryData)
        .then(res => {
          data.tableData = res.data.results;
          emit("getPowerData", res.data);
          data.loadingData = false;
        })
        .catch(err => {
          console.log(err);
          data.loadingData = false;
        });
    };

    // 根据模块查询按钮列表
    const getModulePowers = params => {
      data.queryData.ModudelNo = params.moduleNo;
      getPowers();
    };

    // 弹窗编辑
    const dataEdit = row => {
      emit("dataEdit", row);
    };

    // 开关更新按钮信息
    const switchChangeEdit = row => {
      if (row.powerNo) {
        PowerAddOrUpdate(row)
          .then(res => {
            let msgtype = res.data.hasErr ? "warning" : "success";
            root.$message({
              type: msgtype,
              message: res.data.msg
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    };

    // 删除确认
    const dataDelete = row => {
      if (row.powerNo) {
        data.deleteData.powerNo = row.powerNo;
        data.deleteData.moduleNo = row.moduleNo;
        confirm({
          content: `确认删除 ${row.content} 按钮信息？`,
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
      PowerDelete(data.deleteData)
        .then(res => {
          let msgtype = res.data.hasErr ? "error" : "success";
          root.$message({
            type: msgtype,
            message: res.data.msg
          });
          if (!res.data.hasErr) {
            getModulePowers({ moduleNo: data.deleteData.moduleNo });
          }
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

      formatterTag,
      getModulePowers,
      dataEdit,
      switchChangeEdit,
      dataDelete
    };
  }
};
</script>
<style lang="scss" scoped>
.table-wrap {
  width: 100%;
}
</style>
