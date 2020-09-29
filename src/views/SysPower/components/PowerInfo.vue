<template>
  <div>
    <el-drawer
      :title="data.drawerTitle"
      :visible.sync="data.drawerVisible"
      direction="rtl"
    >
      <el-form
        ref="infoForm"
        class="login-wrap"
        :model="data.infoForm"
        :rules="data.rules"
        :label-width="data.formLabelWidth"
      >
        <el-form-item label="所属模块：">
          <label class="label-color">{{ data.moduleName }}</label>
        </el-form-item>
        <el-form-item label="ID：" prop="powerID" required>
          <el-input
            v-model="data.infoForm.powerID"
            class="input-width-280"
          ></el-input>
        </el-form-item>
        <el-form-item label="名称：" prop="content" required>
          <el-input
            v-model="data.infoForm.content"
            class="input-width-280"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型：" prop="type">
          <SelectVue
            :config="data.typeConfig"
            :selectValue.sync="data.infoForm.type"
          ></SelectVue>
        </el-form-item>
        <el-form-item label="样式：" prop="style">
          <el-input
            v-model="data.infoForm.style"
            class="input-width-280"
          ></el-input>
        </el-form-item>
        <el-form-item label="方法名：" prop="funcName">
          <el-input
            v-model="data.infoForm.funcName"
            class="input-width-280"
          ></el-input>
        </el-form-item>
        <el-form-item label="图标：" prop="icon">
          <el-input
            v-model="data.infoForm.icon"
            class="input-width-280"
          ></el-input>
        </el-form-item>
        <el-form-item label="plain：" prop="isPlain">
          <el-switch
            v-model="data.infoForm.isPlain"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
        <el-form-item label="round：" prop="isRound">
          <el-switch
            v-model="data.infoForm.isRound"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
        <el-form-item label="circle：" prop="isCircle">
          <el-switch
            v-model="data.infoForm.isCircle"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
        <el-form-item label="是否有效：" prop="access">
          <el-switch
            v-model="data.infoForm.access"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
        <el-form-item label="排序：" prop="sort">
          <el-input-number
            v-model="data.infoForm.sort"
            :min="1"
            :max="100"
            class="input-width-280"
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <div class="black-space-40">&nbsp;</div>
          <el-row>
            <el-col :span="12">
              <el-button type="primary" class="block" @click="resetForm"
                >重置</el-button
              >
            </el-col>
            <el-col :span="12">
              <el-button
                type="danger"
                class="block margin-left-10"
                @click="powerSubmit"
                >提交</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import { onBeforeMount, reactive } from "@vue/composition-api";
import { PowerAddOrUpdate } from "@/api/sysPower";
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
  setup(props, { root, refs, emit }) {
    const data = reactive({
      infoForm: {
        powerID: "",
        powerNo: "",
        moduleNo: "",
        content: "",
        type: "primary",
        style: "",
        isPlain: false,
        isRound: false,
        isCircle: false,
        funcName: "",
        icon: "",
        sort: 1,
        access: true,
        isDelete: false
      },
      // 类型下拉配置
      typeConfig: {
        Type: "ButtonType",
        SelectValue: "primary",
        SelectClass: "input-width-280",
        Disabled: false
      },
      // 表单验证
      rules: {
        powerID: [{ required: true, message: "请输入按钮ID", trigger: "blur" }],
        content: [
          { required: true, message: "请输入按钮名称", trigger: "blur" }
        ]
      },
      formLabelWidth: "140px",
      drawerTitle: "新增按钮",
      drawerVisible: false,
      moduleName: ""
    });

    const powerSubmit = () => {
      if (!validMessage(data.infoForm.moduleNo, "请先选择模块！")) return false;
      PowerAddOrUpdate(data.infoForm)
        .then(res => {
          let msgtype = res.data.hasErr ? "error" : "success";
          root.$message({
            type: msgtype,
            message: res.data.msg
          });
          if (!res.data.hasErr) {
            emit("powerSubmitSuccess", data.infoForm.moduleNo);
            resetForm();
            data.drawerVisible = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    const resetForm = () => {
      refs.infoForm.resetFields();
    };

    // 接收父组件数据并初始化
    const initConfig = (config, info) => {
      data.drawerTitle = config.drawerTitle;
      data.drawerVisible = config.drawerVisible;
      data.moduleName = config.moduleName;
      data.infoForm = info;
    };

    // 编辑验证
    const validMessage = (flag, msg) => {
      if (!flag) {
        root.$message({
          type: "info",
          message: msg
        });
        return false;
      }
      return true;
    };

    onBeforeMount(() => {
      initConfig(props.config.config, props.config.info);
    });

    return {
      data,

      initConfig,
      powerSubmit,
      resetForm
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
