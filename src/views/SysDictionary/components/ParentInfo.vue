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
        <el-form-item label="排序：" prop="Sort">
          <el-input-number
            v-model="data.infoForm.sort"
            :min="1"
            :max="100"
            class="input-width-280"
          ></el-input-number>
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
import { DictionarySaveOrUpdate } from "@/api/sysDictionary";
export default {
  name: "parentInfo",
  setup(props, { root, refs, emit }) {
    const data = reactive({
      infoForm: {
        dictionaryNo: "",
        type: "DictionaryType",
        typeName: "字典类型",
        content: "",
        code: "",
        parentNo: "",
        descr: "",
        appNo: "",
        sort: 1,
        isDelete: false
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

    const dataAdd = params => {
      data.title = "新增主类型";
      data.visible = true;
      data.infoForm.appNo = params.appNo;
      data.infoForm.dictionaryNo = "";
      data.infoForm.content = "";
      data.infoForm.code = "";
      data.infoForm.descr = "";
      data.infoForm.sort = 1;
    };

    const dataEdit = params => {
      data.title = "修改主类型";
      data.visible = true;
      data.infoForm.appNo = params.appNo;
      data.infoForm.dictionaryNo = params.dictionaryNo;
      data.infoForm.content = params.content;
      data.infoForm.code = params.code;
      data.infoForm.descr = params.descr;
      data.infoForm.sort = params.sort;
    };

    const resetClick = () => {
      data.infoForm.content = "";
      data.infoForm.code = "";
      data.infoForm.descr = "";
      data.infoForm.sort = 1;
    };

    const submit = () => {
      refs.infoForm.validate(valid => {
        if (valid) {
          DictionarySaveOrUpdate(data.infoForm)
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

    return {
      data,

      dataAdd,
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
