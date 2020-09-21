<template>
  <div>
    <GoBackVue :config="data.config"></GoBackVue>
    <el-form
      class="login-wrap"
      ref="infoForm"
      :rules="data.rules"
      :model="data.infoForm"
      :label-width="data.formLabelWidth"
    >
      <el-form-item label="平台：" prop="App" required>
        <SelectVue
          :config="data.appConfig"
          :selectValue.sync="data.infoForm.App"
          @selectChangeEmit="selectChangeApp"
        ></SelectVue>
      </el-form-item>
      <el-form-item label="父模块：" prop="ParentNo">
        <SelectModuleVue
          ref="parentModuleSelect"
          :config="data.moduleConfig"
          :selectValue.sync="data.infoForm.ParentNo"
        />
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
        <SelectVue
          :config="data.targetConfig"
          :selectValue.sync="data.infoForm.Target"
        ></SelectVue>
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
import { onBeforeMount, reactive } from "@vue/composition-api";
import { ModuleAdd } from "@/api/sysModule";
import { setParamsData, getParamsData } from "@/utils/app";
import GoBackVue from "@c/GoBack/index";
import SelectVue from "@c/Select/index";
import SelectModuleVue from "@c/Select/SelectModule";
export default {
  name: "moduleInfo",
  components: { GoBackVue, SelectVue, SelectModuleVue },
  props: {
    moduleItem: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root, refs }) {
    const data = reactive({
      // 表单数据
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
      // 表单验证
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
      // 页面配置
      config: {
        title: "新增模块",
        routerName: "SysModule"
      },
      // 平台下拉配置
      appConfig: {
        Type: "AppType",
        SelectValue: "0",
        SelectClass: "input-width-280",
        Disabled: false
      },
      // 重定向下拉配置
      targetConfig: {
        Type: "TargetType",
        SelectClass: "input-width-280"
      },
      parantConfig: {
        Type: "TargetType",
        SelectClass: "input-width-280",
        Disabled: false
      },
      moduleConfig: {
        App: "0",
        SelectClass: "input-width-280"
      },
      // 文本宽度
      formLabelWidth: "120px"
    });

    // 重置表单
    const resetForm = () => {
      refs.infoForm.resetFields();
    };

    // 提交表单
    const submitForm = formName => {
      console.log(data.infoForm.ParentNo);
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

    // 从cookie中读取参数，并加载表单数据
    const getModuleItem = () => {
      let params = getParamsData();
      if (params?.moduleItem) {
        let moduleItem = JSON.parse(params.moduleItem);
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

          data.moduleConfig.App = moduleItem.app;
          data.appConfig.SelectValue = moduleItem.app;
        }
      }
      if (params?.title) {
        data.config.title = params.title;
        if (params.title === "修改模块信息") {
          data.appConfig.Disabled = true;
          data.moduleConfig.Disabled = true;
        }
      }
    };

    // 从父组件接收参数，并写入cookie中
    const setModuleItem = () => {
      setParamsData(root.$route.params);
    };

    // 选中平台后带出模块
    const selectChangeApp = params => {
      data.moduleConfig.App = params;
      refs.parentModuleSelect.getModulesByApp(params);
    };

    // 页面挂载之前操作
    onBeforeMount(() => {
      setModuleItem();
      getModuleItem();
    });

    return {
      data,

      resetForm,
      submitForm,
      selectChangeApp
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
