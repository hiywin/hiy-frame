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
  setup(props, { root, emit }) {
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

    // 获取所有字典项
    // 先判断vuex中字典列表是否存在，存在则不调用接口，减少性能损耗
    const getDictionarys = () => {
      let dics = root.$store.state.dic.dictionarys;
      if (dics.length > 0) {
        let results = dics.filter(p => p.type == data.queryData.Type);
        initDictionary(results);
      } else {
        GetDictionaryAll(data.queryData)
          .then(res => {
            let results = res.data.results;
            initDictionary(results);
            // 将默认值更新到父组件
            emit("update:selectValue", data.selectValue);
            emit("selectChangeEmit", data.selectValue);
          })
          .catch(err => {
            console.log(err);
          });
      }
    };

    // 加载下拉控件数据
    const initDictionary = results => {
      let optionArr = [];
      results.forEach(element => {
        optionArr.push({
          id: element.dictionaryNo,
          label: element.content,
          value: element.code
        });
      });
      // 绑定下拉数据，设置默认值
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
