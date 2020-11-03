<template>
  <div>
    <el-collapse v-model="data.activeNames" border>
      <el-collapse-item name="1">
        <template slot="title">
          <span class="collapes-wrap">
            <i class="header-icon el-icon-user-solid margin-right-5"></i>
            用户
          </span>
        </template>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span class="collapes-wrap">
            <i class="header-icon el-icon-s-opportunity margin-right-5"></i>
            角色
          </span>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";

export default {
  setup() {
    const data = reactive({
      activeNames: ["1", "2"]
    });

    return {
      data
    };
  }
};
</script>

<style lang="scss" scoped>
.collapes-wrap {
  font-weight: bold;
  color: $mainColor;
}
</style>
