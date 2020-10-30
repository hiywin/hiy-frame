<template>
  <div>
    <GroupListVue></GroupListVue>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import GroupListVue from "./components/GroupList";
export default {
  name: "sysGroup",
  components: { GroupListVue },
  setup() {
    const data = reactive({
      msg: "组织管理"
    });

    return {
      data
    };
  }
};
</script>

<style lang="scss" scoped></style>
