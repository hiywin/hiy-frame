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
        <el-form-item label="父模块：" prop="parentNo">
          <CascaderModuleVue
            ref="cascaderParent"
            :config="data.parantConfig"
            :selectValue.sync="data.infoForm.parentNo"
          />
        </el-form-item>
        <el-form-item label="模块名称：" prop="moduleName" required>
          <el-input
            v-model="data.infoForm.moduleName"
            class="input-width-280"
          ></el-input>
        </el-form-item>
        <el-form-item label="图标：" prop="icon">
          <el-input
            v-model="data.infoForm.icon"
            class="input-width-280"
          ></el-input>
        </el-form-item>
        <el-form-item label="路由地址：" prop="url" required>
          <el-input
            v-model="data.infoForm.url"
            class="input-width-280"
          ></el-input>
        </el-form-item>
        <el-form-item label="路由名称：" prop="routerName" required>
          <el-input
            v-model="data.infoForm.routerName"
            class="input-width-280"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型：" prop="category">
          <SelectVue
            :config="data.categoryConfig"
            :selectValue.sync="data.infoForm.category"
          ></SelectVue>
        </el-form-item>
        <el-form-item label="重定向：" prop="target">
          <SelectVue
            :config="data.targetConfig"
            :selectValue.sync="data.infoForm.target"
          ></SelectVue>
        </el-form-item>
        <el-form-item label="排序：" prop="sort" required>
          <el-input-number
            v-model="data.infoForm.sort"
            :min="1"
            :max="100"
            class="input-width-280"
          ></el-input-number>
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
import SelectVue from "@c/Select/index";
import CascaderModuleVue from "@c/Cascader/ModuleIndex";
import { ModuleAddOrUpdate } from "@/api/sysModule";
export default {
  name: "moduleInfo",
  components: { SelectVue, CascaderModuleVue },
  setup(props, { root, refs, emit }) {
    const data = reactive({
      infoForm: {
        moduleNo: "",
        moduleName: "",
        parentNo: "",
        icon: "",
        url: "",
        routerName: "",
        category: "0",
        target: "_self",
        appNo: "",
        sort: 1,
        isDelete: false
      },
      reloadData: {
        appNo: "",
        parentNo: ""
      },
      title: "新增模块",
      visible: false,
      formLabelWidth: "140px",
      rules: {
        moduleName: [
          { required: true, message: "请输入模块名", trigger: "blur" }
        ],
        url: [{ required: true, message: "请输入路由地址", trigger: "blur" }],
        routerName: [
          { required: true, message: "请输入路由名称", trigger: "blur" }
        ]
      },
      // 重定向下拉配置
      targetConfig: {
        Type: "TargetType",
        SelectValue: "_self",
        SelectClass: "input-width-280"
      },
      // 类型配置
      categoryConfig: {
        Type: "ModuleType",
        SelectValue: "0",
        SelectClass: "input-width-280"
      },
      // 父模块级联配置
      parantConfig: {
        AppNo: "",
        SelectValue: "",
        SelectClass: "input-width-280",
        Disabled: false
      }
    });

    const resetForm = () => {
      data.infoForm.moduleName = "";
      data.infoForm.parentNo = "";
      data.infoForm.icon = "";
      data.infoForm.url = "";
      data.infoForm.routerName = "";
      data.infoForm.category = "";
      data.infoForm.target = "";
      data.infoForm.sort = 1;
      data.infoForm.isDelete = false;
    };

    const dataAdd = params => {
      resetForm();
      data.title = "新增模块";
      data.visible = true;
      data.infoForm.appNo = params.appNo;
      data.infoForm.moduleNo = "";
      // 模块下拉配置
      setModuleConfig({
        AppNo: params.appNo,
        SelectValue: "",
        Disabled: false
      });
      data.reloadData.parentNo = "";
    };

    const infoAdd = params => {
      resetForm();
      data.title = "新增子模块";
      data.visible = true;
      data.infoForm.appNo = params.appNo;
      data.infoForm.parentNo = params.moduleNo;
      // 模块下拉配置
      setModuleConfig({
        AppNo: params.appNo,
        SelectValue: params.moduleNo,
        Disabled: true
      });
      data.reloadData.parentNo = params.parentNo;
    };

    const dataEdit = info => {
      resetForm();
      data.title = "编辑模块";
      data.visible = true;
      data.infoForm.moduleNo = info.moduleNo;
      data.infoForm.moduleName = info.moduleName;
      data.infoForm.parentNo = info.parentNo;
      data.infoForm.icon = info.icon;
      data.infoForm.url = info.url;
      data.infoForm.routerName = info.routerName;
      data.infoForm.category = info.category;
      data.infoForm.target = info.target;
      data.infoForm.appNo = info.appNo;
      data.infoForm.sort = info.sort;
      data.infoForm.isDelete = info.isDelete;
      // 模块下拉配置
      setModuleConfig({
        AppNo: info.appNo,
        SelectValue: info.parentNo,
        Disabled: true
      });
      data.reloadData.parentNo = info.parentNo;
    };

    const setModuleConfig = params => {
      data.parantConfig.AppNo = params.AppNo;
      data.parantConfig.SelectValue = params.SelectValue;
      data.parantConfig.Disabled = params.Disabled;

      root.$nextTick(() => {
        refs.cascaderParent?.setModuleConfig(params);
      });
    };

    const resetClick = () => {
      resetForm();
    };

    const submit = () => {
      refs.infoForm.validate(valid => {
        if (valid) {
          ModuleAddOrUpdate(data.infoForm)
            .then(res => {
              let msgtype = res.data.hasErr ? "warning" : "success";
              root.$message({
                type: msgtype,
                message: res.data.msg
              });
              if (!res.data.hasErr) {
                data.visible = false;
                data.reloadData.appNo = data.infoForm.appNo;
                emit("submitOk", data.reloadData);
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
      infoAdd,
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
