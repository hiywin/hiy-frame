<template>
  <div id="layout" :class="[menuStatus ? 'close' : 'open']">
    <LayoutHeader />
    <LayoutNav />
    <TagBarVue />
    <LayoutMain />
  </div>
</template>
<script>
import { computed } from "@vue/composition-api";
import LayoutHeader from "./Components/Header";
import LayoutMain from "./Components/Main";
import LayoutNav from "./Components/Nav";
import TagBarVue from "./Components/TagBar";
export default {
  name: "layout",
  components: { LayoutHeader, LayoutMain, LayoutNav, TagBarVue },
  setup(props, { root }) {
    /**
     * 监听菜单收缩展开状态，并更改母版样式
     */
    const menuStatus = computed(() => root.$store.state.app.isCollapse);

    return {
      menuStatus
    };
  }
};
</script>
<style lang="scss" scoped></style>
