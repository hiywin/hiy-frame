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
        <el-form-item
          label="审批描述："
          prop="descr"
          v-show="data.approVisible"
          required
        >
          <el-input
            type="textarea"
            v-model="data.infoForm.descr"
            class="input-width-280"
            placeholder="请输入审批描述"
            :autosize="{ minRows: 3, maxRows: 6 }"
            maxlength="200"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="拒绝理由："
          prop="rejectedReason"
          v-show="!data.approVisible"
          required
        >
          <el-input
            type="textarea"
            v-model="data.infoForm.rejectedReason"
            class="input-width-280"
            placeholder="请输入拒绝理由"
            :autosize="{ minRows: 3, maxRows: 6 }"
            maxlength="200"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="black-space-10">&nbsp;</div>
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
import { UserAddOrUpdate } from "@/api/sysUser";
export default {
  name: "userAccess",
  setup(props, { root, refs, emit }) {
    const data = reactive({
      infoForm: {},
      title: "用户审批",
      visible: false,
      approVisible: true,
      formLabelWidth: "140px",
      rules: {
        descr: [{ required: true, message: "请输入审批描述", trigger: "blur" }],
        rejectedReason: [
          { required: true, message: "请输入拒绝理由", trigger: "blur" }
        ]
      }
    });

    const switchAccessEdit = info => {
      data.infoForm = info;
      data.visible = true;
      data.approVisible = info.access;
    };

    const resetClick = () => {
      if (data.approVisible) {
        data.infoForm.descr = "";
      } else {
        data.infoForm.rejectedReason = "";
      }
    };

    const submit = () => {
      refs.infoForm.validate(valid => {
        if (valid) {
          UserAddOrUpdate(data.infoForm)
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

    return {
      data,

      switchAccessEdit,
      resetClick,
      submit
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
