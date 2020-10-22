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
        <el-form-item label="角色名：" prop="roleName" required>
          <el-input
            v-model="data.infoForm.roleName"
            class="input-width-280"
            placeholder="请输入角色名"
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
import { RoleAddOrUpdate } from "@/api/sysRole";
export default {
  name: "roleInfo",
  setup(props, { root, refs, emit }) {
    const data = reactive({
      infoForm: {
        access: true
      },
      roleNo: "",
      appNo: "",
      // 表单验证
      rules: {
        roleName: [{ required: true, message: "请输入角色名", trigger: "blur" }]
      },
      title: "新增角色",
      visible: false,
      formLabelWidth: "140px"
    });

    const dataAdd = info => {
      resetForm();
      data.title = "新增角色";
      data.visible = true;
      data.roleNo = "";
      data.appNo = info.appNo;
      data.infoForm.appNo = info.appNo;
    };

    const dataEdit = info => {
      resetForm();
      data.title = "编辑角色";
      data.visible = true;
      data.infoForm = info;
      data.infoForm.appNo = info.appNo;
      data.infoForm.roleNo = info.roleNo;
    };

    const resetClick = () => {
      resetForm();
      data.infoForm.access = true;
      data.infoForm.appNo = data.appNo;
      data.infoForm.roleNo = data.roleNo;
    };

    const resetForm = () => {
      data.infoForm = {};
    };

    const submit = () => {
      refs.infoForm.validate(valid => {
        if (valid) {
          RoleAddOrUpdate(data.infoForm)
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
