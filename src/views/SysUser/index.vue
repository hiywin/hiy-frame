<template>
  <div>{{ msg }}</div>
</template>
<script>
import { ref } from "@vue/composition-api";
export default {
  name: "sysUser",
  setup() {
    const msg = ref("用户管理");

    return {
      msg
    };
  }
};
</script>
<style lang="scss" scoped></style>
