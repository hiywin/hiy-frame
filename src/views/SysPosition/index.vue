<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="16">
        <PositionToolVue ref="positionTool" @search="search"></PositionToolVue>
        <PositionListVue
          ref="positionList"
          @searchOk="searchOk"
          @rowClick="rowClick"
        ></PositionListVue>
      </el-col>
      <el-col :span="8">
        <RoleToolVue ref="roleTool"></RoleToolVue>
        <RoleListVue ref="roleList"></RoleListVue>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import PositionToolVue from "./components/PositionTool";
import PositionListVue from "./components/PositionList";
import RoleToolVue from "./components/RoleTool";
import RoleListVue from "./components/RoleList";
export default {
  name: "positionTool",
  components: { PositionToolVue, PositionListVue, RoleToolVue, RoleListVue },
  setup(props, { refs }) {
    const data = reactive({
      msg: "职位管理"
    });

    const search = params => {
      refs.positionList.search(params);
    };

    const searchOk = resData => {
      refs.positionTool.setTagConfig(resData);
    };

    const rowClick = row => {
      refs.roleTool.setPositionData(row);
      refs.roleList.search(row);
    };

    return {
      data,

      search,
      searchOk,
      rowClick
    };
  }
};
</script>

<style lang="scss" scoped></style>
