<template>
  <div class="search-wrap">
    <el-row>
      <el-input
        placeholder="请输入角色名"
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
        <label>所属职位：</label>
        <label class="label-color">{{ data.queryData.positionName }}</label>
        <SearchTagVue ref="searchTag" />
      </div>
    </el-row>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import SearchTagVue from "@c/SearchTag/index";
export default {
  name: "roleTool",
  components: { SearchTagVue },
  setup(props, { refs, emit }) {
    const data = reactive({
      queryData: {
        positionNo: "",
        positionName: "",
        roleName: ""
      }
    });

    const search = () => {
      emit("search", data.queryData);
    };

    const setPositionData = params => {
      data.queryData.positionNo = params.positionNo;
      data.queryData.positionName = params.positionName;
    };

    const setTagConfig = params => {
      refs.searchTag.searchConfig(params);
    };

    return {
      data,

      search,
      setPositionData,
      setTagConfig
    };
  }
};
</script>

<style lang="scss" scoped>
.search-wrap {
  padding: 11px 5px;
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
