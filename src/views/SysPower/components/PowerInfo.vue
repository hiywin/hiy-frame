<template>
  <div>
    <el-form
      class="login-wrap"
      :model="data.infoForm"
      :label-width="data.formLabelWidth"
    >
      <el-form-item label="所属模块：">
        <label class="label-color">{{ data.infoForm.ModuleName }}</label>
      </el-form-item>
      <el-form-item label="名称：" prop="Content" required>
        <el-input
          v-model="data.infoForm.Content"
          class="input-width-280"
        ></el-input>
      </el-form-item>
      <el-form-item label="类型：" prop="Type">
        <SelectVue
          :config="data.typeConfig"
          :selectValue.sync="data.infoForm.Type"
        ></SelectVue>
      </el-form-item>
      <el-form-item label="样式：" prop="Style">
        <el-input
          v-model="data.infoForm.Style"
          class="input-width-280"
        ></el-input>
      </el-form-item>
      <el-form-item label="方法名：" prop="FuncName">
        <el-input
          v-model="data.infoForm.FuncName"
          class="input-width-280"
        ></el-input>
      </el-form-item>
      <el-form-item label="图标：" prop="Icon">
        <el-input
          v-model="data.infoForm.Icon"
          class="input-width-280"
        ></el-input>
      </el-form-item>
      <el-form-item label="plain：" prop="IsPlain">
        <el-switch
          v-model="data.infoForm.IsPlain"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </el-form-item>
      <el-form-item label="round：" prop="IsRound">
        <el-switch
          v-model="data.infoForm.IsRound"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </el-form-item>
      <el-form-item label="circle：" prop="IsCircle">
        <el-switch
          v-model="data.infoForm.IsCircle"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </el-form-item>
      <el-form-item label="是否有效：" prop="Access">
        <el-switch
          v-model="data.infoForm.Access"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </el-form-item>
      <el-form-item label="排序：" prop="Sort">
        <el-input-number
          v-model="data.infoForm.Sort"
          :min="1"
          :max="100"
          class="input-width-280"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <div class="black-space-40">&nbsp;</div>
        <el-row>
          <el-col :span="12">
            <el-button type="primary" class="block">重置</el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="danger" class="block margin-left-10"
              >提交</el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { onBeforeMount, reactive } from "@vue/composition-api";
import SelectVue from "@c/Select/index";
export default {
  name: "powerInfo",
  components: { SelectVue },
  props: {
    config: {
      Type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const data = reactive({
      infoForm: {},
      // 类型下拉配置
      typeConfig: {
        Type: "ButtonType",
        SelectValue: "primary",
        SelectClass: "input-width-280",
        Disabled: false
      },
      // 文本宽度
      formLabelWidth: "140px"
    });

    const initConfig = params => {
      data.infoForm = params;
    };

    onBeforeMount(() => {
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
.login-wrap {
  width: 380px;
  margin: left;
}
.block {
  display: block;
  width: 100%;
}
.label-color {
  color: $mainColor;
}
</style>
