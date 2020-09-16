<template>
  <el-form
    class="login-wrap"
    ref="infoForm"
    :rules="data.rules"
    :model="data.infoForm"
    :label-width="data.formLabelWidth"
  >
    <el-form-item label="平台：" prop="App" required>
      <el-select v-model="data.infoForm.App" class="input-width-280">
        <el-option label="管理中心" value="0"></el-option>
        <el-option label="PC端" value="1"></el-option>
        <el-option label="Mobile端" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="父模块：" prop="ParentNo">
      <el-select v-model="data.infoForm.ParentNo" class="input-width-280">
        <el-option label="根目录" value=""></el-option>
        <el-option
          label="模块管理"
          value="2fe41edbaa4145ffa2c85d017520c12c"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="模块名称：" prop="ModuleName" required>
      <el-input
        v-model="data.infoForm.ModuleName"
        class="input-width-280"
      ></el-input>
    </el-form-item>
    <el-form-item label="图标：" prop="Icon">
      <el-input v-model="data.infoForm.Icon" class="input-width-280"></el-input>
    </el-form-item>
    <el-form-item label="路由地址：" prop="Url" required>
      <el-input v-model="data.infoForm.Url" class="input-width-280"></el-input>
    </el-form-item>
    <el-form-item label="路由名称：" prop="RouterName" required>
      <el-input
        v-model="data.infoForm.RouterName"
        class="input-width-280"
      ></el-input>
    </el-form-item>
    <el-form-item label="类型：" prop="Category">
      <el-select v-model="data.infoForm.Category" class="input-width-280">
        <el-option label="内部" value="0"></el-option>
        <el-option label="外联" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="重定向：" prop="Target">
      <el-select v-model="data.infoForm.Target" class="input-width-280">
        <el-option label="_self" value="_self"></el-option>
        <el-option label="_blank" value="_blank"></el-option>
        <el-option label="_parent" value="_parent"></el-option>
        <el-option label="_top" value="_top"></el-option>
        <el-option label="framename" value="framename"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="排序：" prop="Sort" required>
      <el-input-number
        v-model="data.infoForm.Sort"
        :min="1"
        :max="100"
        class="input-width-280"
      ></el-input-number>
    </el-form-item>
    <el-form-item>
      <div class="black-space-20">&nbsp;</div>
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
            @click="submitForm('infoForm')"
            >提交</el-button
          >
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>
<script>
import { reactive } from "@vue/composition-api";
import { ModuleAdd } from "@/api/sysmodule";
export default {
  name: "moduleInfo",
  setup(props, { root, refs }) {
    const data = reactive({
      infoForm: {
        ModuleNo: "",
        ModuleName: "",
        ParentNo: "",
        Icon: "",
        Url: "",
        RouterName: "",
        Category: "0",
        Target: "_self",
        IsResource: 0,
        App: "0",
        IsDelete: false,
        Sort: 1
      },
      rules: {
        ModuleName: [
          { required: true, message: "请输入模块名称", trigger: "blur" },
          { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" }
        ],
        Url: [{ required: true, message: "请输入路由地址", trigger: "blur" }],
        RouterName: [
          { required: true, message: "请输入路由名称", trigger: "blur" }
        ]
      },
      formLabelWidth: "120px" // 文本宽度
    });

    const resetForm = () => {
      refs.infoForm.resetFields();
    };

    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          let requestData = {
            ModuleNo: data.infoForm.ModuleNo,
            ModuleName: data.infoForm.ModuleName,
            ParentNo: data.infoForm.ParentNo,
            Icon: data.infoForm.Icon,
            Url: data.infoForm.Url,
            RouterName: data.infoForm.RouterName,
            Category: data.infoForm.Category,
            Target: data.infoForm.Target,
            IsResource: data.infoForm.IsResource,
            App: data.infoForm.App,
            IsDelete: data.infoForm.IsDelete,
            Sort: data.infoForm.Sort
          };
          console.log(requestData);
          ModuleAdd(requestData)
            .then(res => {
              root.$message({
                type: "success",
                message: res.data.msg
              });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    return {
      data,

      resetForm,
      submitForm
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
</style>
