<template>
  <div class="login_wrapper">
    <div class="login">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        class="login-form"
      >
        <el-form-item>
          <h2 class="title">后台管理系统</h2>
        </el-form-item>
        <el-form-item prop="UserName">
          <el-input
            type="text"
            size="large"
            v-model="loginForm.UserName"
            auto-complete="off"
            placeholder="账号"
            clearable
          >
            <template slot="prepend"><i class="el-icon-user"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="Password">
          <el-input
            type="password"
            size="large"
            v-model="loginForm.Password"
            auto-complete="off"
            minlength="6"
            maxlength="20"
            placeholder="密码"
            clearable
          >
            <template slot="prepend"><i class="el-icon-lock"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            size="large"
            @click="submitForm('loginForm')"
            class="login-btn"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import { validatePwd } from "@/utils/validate";
export default {
  name: "login",
  setup(props, { root, refs }) {
    // 密码验证
    let validatePassword = (rule, value, callback) => {
      // loginForm.Password = stripscript(value);
      // value = loginForm.Password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePwd(value)) {
        callback(new Error("密码为6至20位数字+字母"));
      } else {
        callback();
      }
    };
    // 表单数据
    const loginForm = reactive({
      UserName: "hiy-admin",
      StaffNo: "",
      AdAccount: "luo.wen.hai",
      Mobile: "",
      Email: "",
      Password: "lwh.12345",
      AppNo: "304b22e644964c86975042924fb2152f"
    });
    // 表单验证
    const rules = reactive({
      Password: [{ validator: validatePassword, trigger: "blur" }]
    });

    // 提交表单
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          login(loginForm);
        }
      });
    };

    // 登录
    const login = requestData => {
      root.$store
        .dispatch("app/login", requestData)
        .then(res => {
          root.$message({
            showClose: true,
            message: res.data.msg,
            type: "success"
          });
          root.$router.push({
            name: "Console"
          });
        })
        .catch(err => {
          console.log(err.status + " " + err.statusText);
        });
    };

    return {
      // data
      loginForm,

      // function
      submitForm,
      rules
    };
  }
};
</script>
<style lang="scss" scoped>
.login_wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  .login {
    width: 480px;
    height: 310px;
    margin-top: -150px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin-bottom: 10px;
      text-align: center;
      color: #505458;
      font-size: 20px;
      font-weight: bold;
    }
    .el-form {
      margin: 30px 80px auto 80px;
      .error {
        display: block;
        text-align: center;
        color: red;
      }
    }
    .login-btn {
      margin-top: 5px;
      display: block;
      width: 100%;
    }
  }
}
</style>
