<template>
  <div class="search-wrap">
    <el-row :gutter="5">
      <el-col :span="5" :offset="0"
        ><el-button
          type="success"
          class="width-per-100"
          icon="el-icon-plus"
          @click="parentAdd"
          >新增</el-button
        ></el-col
      >
      <el-col :span="19" :offset="0"
        ><el-input
          placeholder="请输入主类型关键字"
          v-model="data.content"
          clearable
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="search"
          ></el-button> </el-input
      ></el-col>
    </el-row>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
export default {
  name: "dictionaryTool",
  setup(props, { emit }) {
    const data = reactive({
      content: ""
    });

    const search = () => {
      emit("search", data.content);
    };

    const parentAdd = () => {
      emit("parentAdd");
    };

    return {
      data,

      search,
      parentAdd
    };
  }
};
</script>
<style lang="scss" scoped>
.search-wrap {
  padding: 5px;
  background-color: $mainTitleColor;
  border-radius: 3px 3px 0 0;
}
</style>
