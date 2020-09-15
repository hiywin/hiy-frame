<template>
  <div>{{ msg }}</div>
</template>
<script>
import { ref } from "@vue/composition-api";
export default {
  name: "sysModule",
  setup() {
    const msg = ref("模块管理");

    return {
      msg
    };
  }
};
</script>
<style lang="scss" scoped></style>
