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
        <el-form-item label="类型名称：" prop="content" required>
          <el-input
            v-model="data.infoForm.content"
            class="input-width-280"
            placeholder="请输入类型名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="Code值：" prop="code" required>
          <el-input
            v-model="data.infoForm.code"
            class="input-width-280"
            placeholder="请输入Code值"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="descr">
          <el-input
            v-model="data.infoForm.descr"
            class="input-width-280"
            placeholder="请输入描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属公司：" prop="companyNo">
          <el-input
            v-model="data.infoForm.companyNo"
            class="input-width-280"
            placeholder="请输入所属公司"
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
export default {
  name: "parentInfo",
  setup() {
    const data = reactive({
      infoForm: {
        DictionaryNo: "",
        Type: "DictionaryType",
        TypeName: "字典类型",
        Content: "",
        Code: "",
        ParentNo: "",
        Descr: "",
        CompanyNo: "",
        IsDelete: false
      },
      // 表单验证
      rules: {
        content: [
          { required: true, message: "请输入类型名称", trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入Code值", trigger: "blur" }]
      },
      title: "新增主类型",
      visible: false,
      formLabelWidth: "140px"
    });

    const resetClick = () => {
      console.log("resetClick");
    };

    const submit = () => {
      console.log("submit");
    };

    return {
      data,

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
