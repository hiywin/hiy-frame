<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="15">
        <RoleToolVue ref="roleTool" @search="search"></RoleToolVue>
        <RoleListVue
          ref="roleList"
          @searchOk="searchOk"
          @rowClick="rowClick"
        ></RoleListVue>
      </el-col>
      <el-col :span="9">
        <RoleModuleVue ref="roleModule"></RoleModuleVue>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import RoleToolVue from "./components/RoleTool";
import RoleListVue from "./components/RoleList";
import RoleModuleVue from "./components/RoleModule";
export default {
  name: "sysRole",
  components: { RoleToolVue, RoleListVue, RoleModuleVue },
  setup(props, { refs }) {
    const data = reactive({
      msg: ""
    });

    const searchOk = resData => {
      refs.roleTool.setTagConfig(resData);
    };

    const search = queryData => {
      refs.roleList.search(queryData);
    };

    const rowClick = row => {
      refs.roleModule.search(row);
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
