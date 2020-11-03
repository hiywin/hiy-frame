<template>
  <div class="search-wrap">
    <el-row>
      <el-input
        placeholder="请输入角色名或用户名"
        v-model="data.queryData.roleName"
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
        <SearchTagVue ref="searchTag" />
      </div>
    </el-row>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import SearchTagVue from "@c/SearchTag/index";
export default {
  name: "roleUserTool",
  components: { SearchTagVue },
  setup(props, { refs, emit }) {
    const data = reactive({
      queryData: {
        groupNo: "",
        groupName: "",
        roleName: "",
        userName: ""
      }
    });

    const search = () => {
      emit("search", data.queryData);
    };

    const setGroupData = params => {
      data.queryData.groupNo = params.groupNo;
      data.queryData.groupName = params.groupName;
    };

    const setTagConfig = params => {
      refs.searchTag.searchConfig(params);
    };

    return {
      data,

      search,
      setGroupData,
      setTagConfig
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
