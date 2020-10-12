<template>
  <div>
    <el-drawer :title="data.title" :visible.sync="data.visible" direction="rtl">
      <el-form
        ref="infoForm"
        :model="data.infoForm"
        class="form-wrap"
        :rules="data.rules"
        :label-width="data.formLabelWidth"
      >
        <el-form-item label="平台名称：" prop="appName" required>
          <el-input
            v-model="data.infoForm.appName"
            class="input-width-280"
            placeholder="请输入平台名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人：" prop="leader" required>
          <el-input
            v-model="data.infoForm.leader"
            class="input-width-280"
            placeholder="请输入负责人"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="部署描述：" prop="deploy">
          <el-input
            type="textarea"
            v-model="data.infoForm.deploy"
            class="input-width-280"
            placeholder="请输入部署描述"
            :autosize="{ minRows: 2, maxRows: 6 }"
            maxlength="1000"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input
            type="textarea"
            v-model="data.infoForm.remark"
            class="input-width-280"
            placeholder="请输入备注"
            maxlength="200"
            :autosize="{ minRows: 2, maxRows: 6 }"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="black-space-40">&nbsp;</div>
          <el-row>
            <el-col :span="12">
              <el-button type="primary" class="block" @click="resetClick"
                >重置</el-button
              >
            </el-col>
            <el-col :span="12">
              <el-button
                type="danger"
                class="block margin-left-10"
                @click="submit"
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
import { reactive } from "@vue/composition-api";
import { AppAddOrUpdate } from "@/api/sysApp";
export default {
  name: "appInfo",
  setup(props, { root, refs, emit }) {
    const data = reactive({
      infoForm: {},
      currentAppNo: "",
      title: "新增平台",
      visible: false,
      formLabelWidth: "140px",
      // 表单验证
      rules: {
        appName: [
          { required: true, message: "请输入平台名称", trigger: "blur" }
        ],
        leader: [{ required: true, message: "请输入负责人", trigger: "blur" }]
      }
    });

    const submit = () => {
      refs.infoForm.validate(valid => {
        if (valid) {
          AppAddOrUpdate(data.infoForm)
            .then(res => {
              let msgtype = res.data.hasErr ? "warning" : "success";
              root.$message({
                type: msgtype,
                message: res.data.msg
              });
              if (!res.data.hasErr) {
                data.visible = false;
                emit("submitOk");
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    };

    const infoAdd = () => {
      resetForm();
      data.title = "新增平台";
      data.visible = true;
      data.currentAppNo = "";
    };

    const infoEdit = info => {
      resetForm();
      data.title = "修改平台";
      data.visible = true;
      data.infoForm = info;
      data.currentAppNo = info.appNo;
    };

    const resetClick = () => {
      resetForm();
      data.infoForm.appNo = data.currentAppNo;
    };

    const resetForm = () => {
      data.infoForm = {};
    };

    return {
      data,

      resetClick,
      submit,
      infoAdd,
      infoEdit
    };
  }
};
</script>
<style lang="scss" scoped>
.form-wrap {
  width: 380px;
  margin: left;
}
.block {
  display: block;
  width: 100%;
}
</style>
