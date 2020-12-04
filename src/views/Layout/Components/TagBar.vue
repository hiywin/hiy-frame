<template>
  <div id="tag-wrap">
    <div class="tag-content">
      <template v-for="tag in tagList">
        <el-tag
          class="tag-item"
          size="medium"
          :key="tag.name"
          :type="tag.path == activeTag ? 'danger' : 'info'"
          :effect="tag.path == activeTag ? 'dark' : 'plain'"
          :closable="tag.path != '/index'"
          @click="tagClick(tag)"
          @close="tagClose(tag)"
        >
          {{ tag.meta.name }}
        </el-tag>
      </template>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, reactive } from "@vue/composition-api";

export default {
  setup(props, { root }) {
    const data = reactive({
      firstIndex: {
        path: "/index",
        name: "Index",
        meta: {
          name: "首页",
          icon: "console"
        }
      }
    });

    const activeTag = computed(() => root.$store.state.tagbar.activeTag);

    const tagList = computed(() => root.$store.state.tagbar.tagList);

    const tagClick = item => {
      root.$store.dispatch("tagbar/selectTag", item);
      root.$router.push({ path: root.$store.state.tagbar.activeTag });
    };

    const tagClose = item => {
      root.$store.dispatch("tagbar/removeTag", item);
      root.$router.push({ path: root.$store.state.tagbar.activeTag });
    };

    onBeforeMount(() => {
      root.$store.dispatch("tagbar/addTag", data.firstIndex);
      root.$router.push({ path: root.$store.state.tagbar.activeTag });
    });

    return {
      data,
      activeTag,
      tagList,

      tagClick,
      tagClose
    };
  }
};
</script>

<style lang="scss" scoped>
#tag-wrap {
  position: fixed !important;
  z-index: 1000 !important;
  top: $layoutHeader + 1;
  right: 0;
  left: $navMenu;
  height: 30px;
  background-color: #fff;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  @include webkit(transition, all 0.3s ease 0s);
}
.tag-content {
  padding: 0px 5px;
  .el-tag {
    cursor: pointer;
    border-radius: 1px;
  }
}
.tag-item {
  height: 26px;
  padding: 5px 15px;
  margin: 2px;
  &::before {
    content: "";
    background: #fff;
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: relative;
    margin-right: 2px;
  }
}
.open {
  #tag-wrap {
    left: $navMenu;
  }
}
.close {
  #tag-wrap {
    left: $navMenuMin;
  }
}
</style>
