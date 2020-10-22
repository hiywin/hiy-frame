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
        <el-form-item label="用户名：" prop="userName" required>
          <el-input
            v-model="data.infoForm.userName"
            class="input-width-280"
            placeholder="请输入用户名"
            clearable
          ></el-input
        ></el-form-item>
        <el-form-item label="真实姓名：" prop="realName" required>
          <el-input
            v-model="data.infoForm.realName"
            class="input-width-280"
            placeholder="请输入真实姓名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码："
          prop="pwd"
          v-show="data.pwdVisible"
          required
        >
          <el-input
            v-model="data.infoForm.pwd"
            class="input-width-280"
            placeholder="请输入密码"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="工号：" prop="staffNo">
          <el-input
            v-model="data.infoForm.staffNo"
            class="input-width-280"
            placeholder="请输入工号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="AD账号：" prop="adAccount">
          <el-input
            v-model="data.infoForm.adAccount"
            class="input-width-280"
            placeholder="请输入AD账号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="mobile">
          <el-input
            v-model="data.infoForm.mobile"
            class="input-width-280"
            placeholder="请输入手机号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="Email：" prop="email">
          <el-input
            v-model="data.infoForm.email"
            class="input-width-280"
            placeholder="请输入Email"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="所属公司：" prop="companyNo">
          <CompanySelectVue
            ref="companySelect"
            :config="data.companyConfig"
            :selectValue.sync="data.infoForm.companyNo"
          ></CompanySelectVue>
        </el-form-item>
        <el-form-item label="Icon：" prop="icon">
          <el-input
            v-model="data.infoForm.icon"
            class="input-width-280"
            placeholder="请输入Icon"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="是否管理员：" prop="isAdmin">
          <el-switch
            v-model="data.infoForm.isAdmin"
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
        <el-form-item label="审批描述：" prop="descr">
          <el-input
            type="textarea"
            v-model="data.infoForm.descr"
            class="input-width-280"
            placeholder="请输入审批描述"
            :autosize="{ minRows: 2, maxRows: 6 }"
            maxlength="200"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="拒绝理由：" prop="rejectedReason">
          <el-input
            type="textarea"
            v-model="data.infoForm.rejectedReason"
            class="input-width-280"
            placeholder="请输入拒绝理由"
            :autosize="{ minRows: 2, maxRows: 6 }"
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
import CompanySelectVue from "@c/Select/company";
export default {
  name: "userInfo",
  components: { CompanySelectVue },
  setup(props, { root, refs, emit }) {
    const data = reactive({
      infoForm: {},
      currentUserNo: "",
      currentPwd: "",
      title: "新增用户",
      visible: false,
      pwdVisible: true,
      formLabelWidth: "140px",
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        realName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      companyConfig: {
        selectClass: "input-width-280",
        selectValue: ""
      }
    });

    const submit = () => {
      refs.infoForm.validate(valid => {
        if (valid) {
          if (!submitCheck()) return false;
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

    const submitCheck = () => {
      if (!data.infoForm.companyNo || data.infoForm.companyNo == "") {
        if (data.infoForm.staffNo?.length > 0) {
          root.$message.warning("工号不为空时，请先选择所属公司！");
          return false;
        }
        if (data.infoForm.adAccount?.length > 0) {
          root.$message.warning("AD账号不为空时，请先选择所属公司！");
          return false;
        }
      }
      if (
        data.infoForm.access &&
        (!data.infoForm.descr || data.infoForm.descr == "")
      ) {
        root.$message.warning("设置账户为有效时，请输入审批描述！");
        return false;
      } else if (
        !data.infoForm.access &&
        (!data.infoForm.rejectedReason || data.infoForm.rejectedReason == "")
      ) {
        root.$message.warning("设置账户为无效时，请输入拒绝理由！");
        return false;
      }
      return true;
    };

    const infoAdd = () => {
      resetForm();
      data.title = "新增用户";
      data.visible = true;
      data.pwdVisible = true;
      data.currentUserNo = "";
      initCompanySelect("");
    };

    const infoEdit = info => {
      resetForm();
      data.title = "修改用户";
      data.visible = true;
      data.pwdVisible = false;
      data.infoForm = info;
      data.currentUserNo = info.userNo;
      data.currentPwd = info.pwd;
      initCompanySelect(info.companyNo);
    };

    const initCompanySelect = value => {
      data.companyConfig.selectValue = value;
      refs.companySelect?.initSelectValue(value);
    };

    const resetClick = () => {
      resetForm();
      data.infoForm.userNo = data.currentUserNo;
      data.infoForm.pwd = data.currentPwd;
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
