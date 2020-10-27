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
        <el-form-item label="主类型：">
          <label class="label-color">{{ data.dictionaryName }}</label>
        </el-form-item>
        <el-form-item label="字典项：" prop="content" required>
          <el-input
            v-model="data.infoForm.content"
            class="input-width-280"
            placeholder="请输入类型名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="Code：" prop="code" required>
          <el-input
            v-model="data.infoForm.code"
            class="input-width-280"
            placeholder="请输入Code值"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="descr">
          <el-input
            type="textarea"
            v-model="data.infoForm.descr"
            class="input-width-280"
            placeholder="请输入描述"
            :autosize="{ minRows: 2, maxRows: 6 }"
            maxlength="200"
            clearable
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
  setup(props, { root, refs, emit }) {
    const data = reactive({
      infoForm: {
        dictionaryNo: "",
        type: "",
        typeName: "",
        content: "",
        code: "",
        parentNo: "",
        descr: "",
        appNo: "",
        sort: 1,
        isDelete: false
      },
      dictionaryName: "",
      // 表单验证
      rules: {
        content: [
          { required: true, message: "请输入类型名称", trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入Code值", trigger: "blur" }]
      },
      title: "新增字典项",
      visible: false,
      formLabelWidth: "140px"
    });

    const infoAdd = row => {
      data.title = "新增字典项";
      data.visible = true;
      data.dictionaryName = row.content;
      data.infoForm.type = row.code;
      data.infoForm.typeName = row.content;
      data.infoForm.parentNo = row.dictionaryNo;
      data.infoForm.appNo = row.appNo;
      data.infoForm.dictionaryNo = "";
      data.infoForm.content = "";
      data.infoForm.code = "";
      data.infoForm.descr = "";
      data.infoForm.sort = 1;
    };

    const infoEdit = row => {
      data.title = "编辑字典项";
      data.visible = true;
      data.dictionaryName = row.typeName;
      data.infoForm.type = row.type;
      data.infoForm.typeName = row.typeName;
      data.infoForm.parentNo = row.parentNo;
      data.infoForm.appNo = row.appNo;
      data.infoForm.dictionaryNo = row.dictionaryNo;
      data.infoForm.content = row.content;
      data.infoForm.code = row.code;
      data.infoForm.descr = row.descr;
      data.infoForm.sort = row.sort;
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

      infoAdd,
      infoEdit,
      resetClick,
      submit
    };
  }
};
</script>

<style lang="scss" scoped>
.label-color {
  color: $mainColor;
}
</style>
