<template>
  <div>
    <el-select
      v-model="data.selectValue"
      filterable
      placeholder="请选择"
      @change="selectChange"
      :class="data.selectClass"
    >
      <el-option
        v-for="item in data.apps"
        :key="item.appNo"
        :label="item.appName"
        :value="item.appNo"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { reactive, onBeforeMount } from "@vue/composition-api";
import { GetAppAll } from "@/api/sysApp";
export default {
  name: "appSelect",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    const data = reactive({
      selectValue: "",
      apps: [],
      queryData: {
        AppNo: "",
        AppName: "",
        Leader: "",
        IsDelete: false
      },
      selectDefault: false,
      selectClass: "input-width-280"
    });

    const getAppAll = () => {
      GetAppAll(data.queryData)
        .then(res => {
          let resData = res.data;
          data.apps = resData.results;
          if (data.selectDefault && data.apps.length > 0) {
            data.selectValue = data.apps[0].appNo;
            selectChange();
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    const selectChange = () => {
      emit("update:selectValue", data.selectValue);
      emit("selectChangeEmit", data.selectValue);
    };

    const initConfig = () => {
      if (props.config?.selectClass) {
        data.selectClass = props.config.selectClass;
      }
      if (props.config?.selectValue) {
        data.selectValue = props.config.selectValue;
      }
      data.selectDefault = props.config?.selectDefault ? true : false;
    };

    const initSelectValue = value => {
      data.selectValue = value;
    };

    onBeforeMount(() => {
      initConfig();
      getAppAll();
    });

    return {
      data,

      selectChange,
      initSelectValue
    };
  }
};
</script>

<style lang="scss" scoped></style>
