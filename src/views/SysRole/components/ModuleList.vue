<template>
  <div>
    <el-drawer :title="data.title" :visible.sync="data.visible" direction="rtl">
      <div>
        <label>所属角色：</label>
      </div>
      <el-tree
        :data="data.treeData"
        show-checkbox
        :props="{ value: 'moduleNo', label: 'moduleName' }"
      >
        <span class></span>
      </el-tree>
    </el-drawer>
  </div>
</template>

<script>
import { onMounted, reactive } from "@vue/composition-api";
import { GetModuleTree } from "@/api/sysModule";
export default {
  setup() {
    const data = reactive({
      treeData: [],
      queryData: {
        ModuleName: "",
        App: "0"
      },
      title: "添加模块权限",
      visible: true
    });

    const getModuleTree = () => {
      GetModuleTree(data.queryData)
        .then(res => {
          let resData = res.data;
          data.treeData = resData.results;
        })
        .catch(err => {
          console.log(err);
        });
    };

    onMounted(() => {
      getModuleTree();
    });

    return {
      data
    };
  }
};
</script>

<style lang="scss" scoped></style>
