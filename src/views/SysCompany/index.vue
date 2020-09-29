<template>
  <div>{{ data.msg }}</div>
</template>
<script>
import { reactive } from "@vue/composition-api";
export default {
  name: "sysCompany",
  setup() {
    const data = reactive({
      msg: "公司管理"
    });

    return {
      data
    };
  }
};
</script>
<style lang="scss" scoped></style>
