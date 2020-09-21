<template>
  <el-select
    v-model="data.selectValue"
    placeholder="请选择"
    :class="data.selectClass"
    :disabled="data.disabled"
    @change="selectChange"
  >
    <el-option
      v-for="item in data.options"
      :key="item.id"
      :value="item.value"
      :label="item.label"
    >
    </el-option>
  </el-select>
</template>
<script>
import { onMounted, reactive } from "@vue/composition-api";
import { GetDictionaryAll } from "@/api/sysDictionary";
export default {
  name: "selectComponent",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    const data = reactive({
      selectValue: "",
      options: [],
      queryData: {
        Type: "",
        TypeName: "",
        IsDelete: false
      },
      disabled: false,
      selectClass: "input-width-280"
    });

    // 将选中的值传回父组件
    // 父组件接收参数为selectValue，且需要用sync修饰符
    // 调用方式：<SelectVue :config="data.appConfig" :selectValue.sync="data.infoForm.App"></SelectVue>
    const selectChange = () => {
      emit("update:selectValue", data.selectValue);
      emit("selectChangeEmit", data.selectValue);
    };

    const getDictionarys = () => {
      GetDictionaryAll(data.queryData)
        .then(res => {
          let results = res.data.results;
          let optionArr = [];
          results.forEach(element => {
            optionArr.push({
              id: element.dictionaryNo,
              label: element.content,
              value: element.code
            });
          });
          if (optionArr.length > 0) {
            data.options = optionArr;
            let defualtCode = props.config?.SelectValue;
            if (defualtCode) {
              let arrs = optionArr.filter(p => p.value == defualtCode);
              data.selectValue =
                arrs.length > 0 ? arrs[0].value : optionArr[0].value;
            } else {
              data.selectValue = optionArr[0].value;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    const initConfig = () => {
      if (props.config?.Type) {
        data.queryData.Type = props.config.Type;
      }
      if (props.config?.SelectClass) {
        data.selectClass = props.config.SelectClass;
      }
      if (props.config?.Disabled) {
        data.disabled = props.config.Disabled;
      }
    };

    onMounted(() => {
      initConfig();
      getDictionarys();
    });

    return {
      data,
      selectChange
    };
  }
};
</script>
<style lang="scss" scoped></style>
