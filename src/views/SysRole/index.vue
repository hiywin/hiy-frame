<template>
  <div>{{ msg }}</div>
</template>
<script>
import { ref } from "@vue/composition-api";
export default {
  name: "sysRole",
  setup() {
    const msg = ref("角色管理");

    return {
      msg
    };
  }
};
</script>
<style lang="scss" scoped></style>
