<template>
  <div>
    <el-cascader
      v-model="data.selectOption"
      :options="data.options"
      :props="{ value: 'moduleNo', label: 'moduleName' }"
      placeholder="根目录"
      @change="handleChange"
      :class="data.selectClass"
      :disabled="data.disabled"
      filterable
    >
    </el-cascader>
  </div>
</template>
<script>
import { onBeforeMount, reactive } from "@vue/composition-api";
import { GetModuleTree } from "@/api/sysModule";
export default {
  name: "selectModule",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    const data = reactive({
      selectOption: [],
      selectValue: "",
      options: [],
      queryData: {
        ModuleName: "",
        App: "0"
      },
      disabled: false,
      selectClass: "input-width-280"
    });

    const getModuleTree = () => {
      GetModuleTree(data.queryData)
        .then(res => {
          let resData = res.data.results;
          data.options = resData;

          let arr = resData.filter(
            p => p.moduleNo === "2c49b6132bcf498c86c096d2eb7a1c5e"
          );
          console.log(resData);
          console.log(arr);
        })
        .catch(err => {
          console.log(err);
        });
    };

    const handleChange = params => {
      if (params.length > 0) {
        data.selectValue = params[params.length - 1];
      }
      emit("update:selectValue", data.selectValue);
    };

    const initConfig = () => {
      if (props.config?.App) {
        data.queryData.App = props.config.App;
      }
      if (props.config?.SelectClass) {
        data.selectClass = props.config.SelectClass;
      }
      if (props.config?.Disabled) {
        data.disabled = props.config.Disabled;
      }
    };

    const getModulesByApp = params => {
      data.queryData.App = params;
      getModuleTree();
    };

    onBeforeMount(() => {
      initConfig();
      getModuleTree();
    });

    return {
      data,
      handleChange,
      getModulesByApp
    };
  }
};
</script>
<style lang="scss" scoped></style>
