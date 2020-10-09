<template>
  <div>{{ msg }}</div>
</template>
<script>
import { reactive } from "@vue/composition-api";
export default {
  name: "dictionaryTool",
  setup() {
    const data = reactive({
      msg: ""
    });

    return {
      data
    };
  }
};
</script>
<style lang="scss" scoped></style>
