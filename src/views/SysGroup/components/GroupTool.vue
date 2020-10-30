<template>
  <div></div>
</template>

<script>
import { reactive } from "@vue/composition-api";

export default {
  setup() {
    const data = reactive({
      count: 0
    });

    return {
      data
    };
  }
};
</script>

<style lang="scss" scoped></style>
