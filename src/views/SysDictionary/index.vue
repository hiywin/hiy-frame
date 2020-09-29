<template>
  <div>{{ data.msg }}</div>
</template>
<script>
import { reactive } from "@vue/composition-api";
export default {
  name: "sysDictionary",
  setup() {
    const data = reactive({
      msg: "字典管理"
    });

    return {
      data
    };
  }
};
</script>
<style lang="scss" scoped></style>
