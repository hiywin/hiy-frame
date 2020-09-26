<template>
  <div>
    <el-cascader
      :options="data.options"
      v-model="data.selectOption"
      :props="{ checkStrictly: true, value: 'moduleNo', label: 'moduleName' }"
      placeholder="根目录"
      @change="handleChange"
      :class="data.selectClass"
      :disabled="data.disabled"
      filterable
      clearable
    >
    </el-cascader>
  </div>
</template>
<script>
import { onBeforeMount, reactive } from "@vue/composition-api";
import { GetModuleTree } from "@/api/sysModule";
export default {
  name: "cascaderModule",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    const data = reactive({
      // 选中项列表
      selectOption: [],
      // 选中项最后一个值，用于传回父组件
      selectValue: "",
      // 下拉数据
      options: [],
      // 接口查询条件
      queryData: {
        ModuleName: "",
        App: "0"
      },
      // 控件长度
      selectClass: "input-width-280",
      // 是否可用
      disabled: false
    });

    // 选中项时通过selectValue传入父组件
    const handleChange = params => {
      console.log(params);
      if (params.length > 0) {
        data.selectValue = params[params.length - 1];
      }
      emit("update:selectValue", data.selectValue);
    };

    // 接口获取下拉数据数，并绑定默认值
    const getModuleTree = () => {
      GetModuleTree(data.queryData)
        .then(res => {
          let resData = res.data.results;
          data.options = resData;

          // 根据父组件传过来的ParentNo默认选中父模块;
          if (data.selectValue) {
            let matchOption = [];
            for (let i = 0; i < resData.length; i++) {
              let flag = getSelectOption(
                resData[i],
                data.selectValue,
                matchOption
              );
              if (flag) {
                // 返回数组顺序倒置
                data.selectOption = matchOption.reverse();
                return true;
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    // 递归加载子模块，加入默认选中项
    const getSelectOption = (model, selectValue, matchOption) => {
      if (model.moduleNo == selectValue) {
        matchOption.push(model.moduleNo);
        return true;
      } else if (model.children?.length > 0) {
        for (let i = 0; i < model.children.length; i++) {
          let flag = getSelectOption(
            model.children[i],
            selectValue,
            matchOption
          );
          if (flag) {
            matchOption.push(model.moduleNo);
            return flag;
          }
        }
      }

      return false;
    };

    // 页面挂载前，根据父组件传入的值初始化数据
    const initConfig = () => {
      if (props.config?.App) {
        data.queryData.App = props.config.App;
      }
      if (props.config?.SelectValue) {
        data.selectValue = props.config.SelectValue;
      }
      if (props.config?.SelectClass) {
        data.selectClass = props.config.SelectClass;
      }
      if (props.config?.Disabled) {
        data.disabled = props.config.Disabled;
      }
    };

    // 父组件调用方法，当APP下拉框改变时，父模块下拉数据联动
    // 调用方式：
    // let parentData = { App: appValue, SelectValue: data.infoForm.ModuleNo };
    // refs.cascaderParent.getModulesByApp(parentData);
    const getModulesByApp = params => {
      if (params?.App) {
        data.queryData.App = params.App;
      }
      if (params?.SelectValue) {
        data.selectValue = params.SelectValue;
      }
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
