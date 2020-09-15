<template>
  <div id="login">
    <div class="login-wrap">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        size="medium"
        class="login-form"
      >
        <el-form-item prop="UserName" class="item-form">
          <label for="UserName">用户名</label>
          <el-input
            id="UserName"
            type="text"
            v-model="loginForm.UserName"
            auto-complete="off"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="Password" class="item-form">
          <label for="Password">密码</label>
          <el-input
            id="Password"
            type="password"
            v-model="loginForm.Password"
            auto-complete="off"
            minlength="6"
            maxlength="20"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('loginForm')"
            class="login-btn block"
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

    const loginForm = reactive({
      UserName: "hiywin-admin",
      StaffNo: "10013564",
      AdAccount: "luo.wen.hai",
      Password: "lwh.12345",
      App: 0
    });

    const rules = reactive({
      Password: [{ validator: validatePassword, trigger: "blur" }]
    });

    // 提交表单
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          let requestData = {
            UserName: loginForm.UserName,
            Password: loginForm.Password
          };
          login(requestData);
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
          console.log(err);
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
#login {
  height: 100vh;
  background-color: $navBackColor;
}
.login-wrap {
  width: 380px;
  margin: auto;
}
.login-form {
  margin-top: 0;
  padding-top: 100px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-form {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
