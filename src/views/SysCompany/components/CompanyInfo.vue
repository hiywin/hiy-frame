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
        <el-form-item label="公司名称：" prop="companyName" required>
          <el-input
            v-model="data.infoForm.companyName"
            class="input-width-280"
            placeholder="请输入公司名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="简称：" prop="abbreviation">
          <el-input
            v-model="data.infoForm.abbreviation"
            class="input-width-280"
            placeholder="请输入简称"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址：" prop="address">
          <el-input
            v-model="data.infoForm.address"
            class="input-width-280"
            placeholder="请输入地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="法人：" prop="legalPerson">
          <el-input
            v-model="data.infoForm.legalPerson"
            class="input-width-280"
            placeholder="请输入法人"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人：" prop="contact">
          <el-input
            v-model="data.infoForm.contact"
            class="input-width-280"
            placeholder="请输入联系人"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话：" prop="phone">
          <el-input
            v-model="data.infoForm.phone"
            class="input-width-280"
            placeholder="请输入联系电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="mobile">
          <el-input
            v-model="data.infoForm.mobile"
            class="input-width-280"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="Email：" prop="email">
          <el-input
            v-model="data.infoForm.email"
            class="input-width-280"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="网址：" prop="website">
          <el-input
            v-model="data.infoForm.website"
            class="input-width-280"
            placeholder="请输入网址"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属行业：" prop="industry">
          <el-input
            v-model="data.infoForm.industry"
            class="input-width-280"
            placeholder="请输入所属行业"
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
import { CompanyAddOrUpdate } from "@/api/sysCompany";
export default {
  name: "companyInfo",
  setup(props, { root, refs, emit }) {
    const data = reactive({
      title: "新增公司",
      visible: false,
      formLabelWidth: "140px",
      infoForm: {},
      currentCompanyNo: "",
      // 表单验证
      rules: {
        companyName: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ]
      }
    });

    const submit = () => {
      refs.infoForm.validate(valid => {
        if (valid) {
          CompanyAddOrUpdate(data.infoForm)
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
      data.title = "新增公司";
      data.visible = true;
      data.currentCompanyNo = "";
    };

    const infoEdit = info => {
      resetForm();
      data.title = "修改公司";
      data.visible = true;
      data.infoForm = info;
      data.currentCompanyNo = info.companyNo;
    };

    const resetClick = () => {
      resetForm();
      data.infoForm.companyNo = data.currentCompanyNo;
    };

    const resetForm = () => {
      data.infoForm = {};
    };

    return {
      data,

      submit,
      infoAdd,
      infoEdit,
      resetClick
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
