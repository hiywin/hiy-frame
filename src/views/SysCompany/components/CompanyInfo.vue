<template>
  <div>
    <el-drawer
      :title="data.title"
      :visible.sync="data.visible"
      @close="close"
      direction="rtl"
    >
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
              <el-button type="primary" class="block" @click="resetForm"
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
import { onBeforeMount, reactive } from "@vue/composition-api";
import { CompanyAddOrUpdate } from "@/api/sysCompany";
export default {
  name: "companyInfo",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root, refs, emit }) {
    const data = reactive({
      title: "新增公司",
      visible: false,
      formLabelWidth: "140px",
      infoForm: {
        companyNo: "",
        companyName: "",
        abbreviation: "",
        address: "",
        industry: "",
        legalPerson: "",
        contact: "",
        phone: "",
        mobile: "",
        email: "",
        website: "",
        access: true,
        isDelete: false
      },
      // 表单验证
      rules: {
        companyName: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ]
      }
    });

    const resetForm = () => {
      refs.infoForm?.resetFields();
    };

    const close = () => {
      resetForm();
    };

    const submit = () => {
      console.log(data.infoForm);
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

    const initConfig = (config, info) => {
      console.log(info);
      if (info) {
        data.infoForm.companyNo = info.companyNo;
        data.infoForm.companyName = info.companyName;
        data.infoForm.abbreviation = info.abbreviation;
        data.infoForm.address = info.address;
        data.infoForm.industry = info.industry;
        data.infoForm.legalPerson = info.legalPerson;
        data.infoForm.contact = info.contact;
        data.infoForm.phone = info.phone;
        data.infoForm.mobile = info.mobile;
        data.infoForm.email = info.email;
        data.infoForm.website = info.website;
        data.infoForm.access = info.access;
      }
      if (config) {
        data.title = config.title;
        data.visible = config.visible;
      }
    };

    onBeforeMount(() => {
      initConfig(props.config.config, props.config.info);
    });

    return {
      data,

      resetForm,
      close,
      submit,
      initConfig
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
