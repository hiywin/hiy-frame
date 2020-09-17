<template>
  <div>
    <div>
      <div class="pull-left header-icon" @click="goBack">
        <svg-icon iconClass="back" className="back" />
      </div>
      <h2 class="margin-left-30 label-center">{{ data.title }}</h2>
    </div>
    <el-divider></el-divider>
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
        <el-input
          v-model="data.infoForm.Icon"
          class="input-width-280"
        ></el-input>
      </el-form-item>
      <el-form-item label="路由地址：" prop="Url" required>
        <el-input
          v-model="data.infoForm.Url"
          class="input-width-280"
        ></el-input>
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
  </div>
</template>
<script>
import { onMounted, reactive } from "@vue/composition-api";
import { ModuleAdd } from "@/api/sysmodule";
import SvgIcon from "@/icons/SvgIcon";
export default {
  name: "moduleInfo",
  components: { SvgIcon },
  props: {
    moduleItem: {
      type: Object,
      default: () => {}
    }
  },
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
      formLabelWidth: "120px", // 文本宽度
      title: "新增模块"
    });

    const resetForm = () => {
      refs.infoForm.resetFields();
    };

    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          ModuleAdd(data.infoForm)
            .then(res => {
              root.$message({
                type: "success",
                message: res.data.msg
              });
              root.$router.push({
                name: "SysModule"
              });
            })
            .catch(err => {
              root.$message({
                type: "error",
                message: "提交失败，请重试！"
              });
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    const goBack = () => {
      root.$router.push({
        name: "SysModule"
      });
    };

    const getModuleItem = () => {
      if (root.$route.query.moduleItem) {
        let moduleItem = JSON.parse(root.$route.query.moduleItem);
        if (moduleItem) {
          data.infoForm.ModuleNo = moduleItem.moduleNo;
          data.infoForm.ModuleName = moduleItem.moduleName;
          data.infoForm.ParentNo = moduleItem.parentNo;
          data.infoForm.Icon = moduleItem.icon;
          data.infoForm.Url = moduleItem.url;
          data.infoForm.RouterName = moduleItem.routerName;
          data.infoForm.Category = moduleItem.category;
          data.infoForm.Target = moduleItem.target;
          data.infoForm.IsResource = moduleItem.isResource;
          data.infoForm.App = moduleItem.app;
          data.infoForm.Sort = moduleItem.sort;
        }
      }
    };

    onMounted(() => {
      getModuleItem();
    });

    return {
      data,

      resetForm,
      submitForm,
      goBack
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
.header-icon {
  svg {
    margin-bottom: -8px;
    font-size: 20px;
    color: #344a5f;
    cursor: pointer;
  }
}
.label-center {
  line-height: 20px;
  font-size: 15px;
}
</style>
