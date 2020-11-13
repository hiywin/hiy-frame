<template>
  <div class="search-wrap">
    <el-row>
      <el-input
        placeholder="请输入角色名或用户名"
        v-model="data.queryData.content"
        clearable
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search"
        ></el-button>
      </el-input>
    </el-row>
    <el-row class="margin-top-7">
      <div class="title-wrap">
        <label>所属组织：</label>
        <label class="label-color">{{ data.queryData.groupName }}</label>
      </div>
    </el-row>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
export default {
  name: "roleUserTool",
  setup(props, { root, emit }) {
    const data = reactive({
      queryData: {
        groupNo: "",
        groupName: "",
        content: ""
      }
    });

    const search = () => {
      if (data.queryData.groupNo.length <= 0) {
        root.$message.warning("请先选择组织！");
        return false;
      }
      emit("search", data.queryData);
    };

    const setSearch = params => {
      data.queryData.groupNo = params.groupNo;
      data.queryData.groupName = params.groupName;
    };

    return {
      data,

      search,
      setSearch
    };
  }
};
</script>

<style lang="scss" scoped>
.search-wrap {
  padding: 10px 5px;
  background-color: $mainTitleColor;
  border-radius: 3px;
}
.title-wrap {
  line-height: 30px;
  padding-left: 5px;
  background-color: $mainTitleColor;
  border-radius: 3px;
  font-weight: bold;
}
.label-color {
  color: $mainColor;
}
</style>
