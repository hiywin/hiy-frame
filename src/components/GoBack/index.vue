<template>
  <div>
    <div>
      <div class="pull-left header-icon" @click="goBack">
        <svg-icon iconClass="back" className="back" />
      </div>
      <h2 class="margin-left-30 label-center">{{ data.title }}</h2>
    </div>
    <el-divider></el-divider>
  </div>
</template>
<script>
import { onMounted, reactive } from "@vue/composition-api";
export default {
  name: "goBackCompenent",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root }) {
    const data = reactive({
      title: "",
      routerName: ""
    });

    const goBack = () => {
      if (data.routerName) {
        root.$router.push({
          name: data.routerName
        });
      }
    };

    const initConfig = () => {
      if (props.config) {
        data.title = props.config.title;
        data.routerName = props.config.routerName;
      }
    };

    onMounted(() => {
      initConfig();
    });

    return {
      data,
      goBack
    };
  }
};
</script>
<style lang="scss" scoped>
.header-icon {
  svg {
    font-size: 20px;
    color: #344a5f;
    cursor: pointer;
  }
}
.label-center {
  line-height: 20px;
  font-size: 15px;
}
</style>
