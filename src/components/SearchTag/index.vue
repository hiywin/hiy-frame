<template>
  <div class="pull-right div-text" :hidden="data.Hidden">
    <span>Code：</span>
    <span>{{ data.Code }}</span>
    <span class="margin-left-10">请求时长：</span>
    <span>{{ data.Time }}</span
    ><span class="margin-left-5 margin-right-10">秒</span>
  </div>
</template>
<script>
import { onMounted, reactive } from "@vue/composition-api";
export default {
  name: "searchTag",
  props: {
    config: {
      Type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const data = reactive({
      Hidden: true,
      Code: "",
      Time: ""
    });

    const initConfig = config => {
      if (config) {
        data.Hidden = config.Hidden;
        data.Code = config.Code;
        data.Time = config.Time;
      }
    };

    onMounted(() => {
      initConfig(props.config);
    });

    return {
      data,
      initConfig
    };
  }
};
</script>
<style lang="scss" scoped>
.div-text {
  text-align: center;
  line-height: 30px;
  color: #e6a23c;
}
</style>
