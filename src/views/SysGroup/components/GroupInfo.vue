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
        <el-form-item label="组织名：" prop="groupName" required>
          <el-input
            v-model="data.infoForm.groupName"
            class="input-width-280"
            placeholder="请输入组织名"
          ></el-input>
        </el-form-item>
        <el-form-item label="Code：" prop="code" required>
          <el-input
            v-model="data.infoForm.code"
            class="input-width-280"
            placeholder="请输入Code"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="descr">
          <el-input
            type="textarea"
            v-model="data.infoForm.descr"
            class="input-width-280"
            placeholder="请输入描述"
            :autosize="{ minRows: 2, maxRows: 6 }"
            maxlength="200"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="是否有效：" prop="access">
          <el-switch
            v-model="data.infoForm.access"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
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
import { GroupAddOrUpdate } from "@/api/sysGroup";
export default {
  name: "groupInfo",
  setup(props, { root, refs, emit }) {
    const data = reactive({
      infoForm: {
        groupNo: "",
        groupName: "",
        code: "",
        descr: "",
        access: true,
        isDelete: false,
        parentNo: "",
        appNo: ""
      },
      // 表单验证
      rules: {
        groupName: [
          { required: true, message: "请输入组织名", trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入Code", trigger: "blur" }]
      },
      title: "新增组织",
      visible: false,
      formLabelWidth: "140px"
    });

    const resetForm = () => {
      data.infoForm.groupName = "";
      data.infoForm.code = "";
      data.infoForm.descr = "";
      data.infoForm.access = true;
    };

    const dataAdd = info => {
      resetForm();
      data.title = "新增组织";
      data.visible = true;
      data.infoForm.groupNo = "";
      data.infoForm.parentNo = info.parentNo;
      data.infoForm.appNo = info.appNo;
    };

    const dataEdit = info => {
      resetForm();
      data.title = "编辑组织";
      data.visible = true;
      data.infoForm.groupNo = info.groupNo;
      data.infoForm.groupName = info.groupName;
      data.infoForm.code = info.code;
      data.infoForm.descr = info.descr;
      data.infoForm.access = info.access;
      data.infoForm.parentNo = info.parentNo;
      data.infoForm.appNo = info.appNo;
    };

    const resetClick = () => {
      resetForm();
    };

    const submit = () => {
      if (data.infoForm.appNo?.length > 0) {
        refs.infoForm.validate(valid => {
          if (valid) {
            GroupAddOrUpdate(data.infoForm)
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
      } else {
        root.$message.warning("请先选择平台！");
      }
    };

    return {
      data,

      dataAdd,
      dataEdit,
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
