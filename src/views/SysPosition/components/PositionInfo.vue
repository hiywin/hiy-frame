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
        <el-form-item label="职位名：" prop="positionName" required>
          <el-input
            v-model="data.infoForm.positionName"
            class="input-width-280"
            placeholder="请输入职位名"
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
        <el-form-item label="是否有效：" prop="access">
          <el-switch
            v-model="data.infoForm.access"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
        <el-form-item label="排序：" prop="sort">
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
import { PositionAddOrUpdate } from "@/api/sysPosition";
export default {
  name: "positionInfo",
  setup(props, { root, refs, emit }) {
    const data = reactive({
      infoForm: {
        positionNo: "",
        positionName: "",
        companyNo: "",
        descr: "",
        access: true,
        sort: 1,
        isDelete: false
      },
      // 表单验证
      rules: {
        positionName: [
          { required: true, message: "请输入职位名", trigger: "blur" }
        ]
      },
      title: "新增职位",
      visible: false,
      formLabelWidth: "140px"
    });

    const resetForm = () => {
      data.infoForm.positionName = "";
      data.infoForm.descr = "";
      data.infoForm.access = true;
      data.infoForm.sort = 1;
      data.infoForm.isDelete = false;
    };

    const dataAdd = info => {
      resetForm();
      data.title = "新增职位";
      data.visible = true;
      data.infoForm.positionNo = "";
      data.infoForm.companyNo = info.companyNo;
    };

    const dataEdit = info => {
      resetForm();
      data.title = "编辑职位";
      data.visible = true;
      data.infoForm.positionNo = info.positionNo;
      data.infoForm.positionName = info.positionName;
      data.infoForm.companyNo = info.companyNo;
      data.infoForm.descr = info.descr;
      data.infoForm.access = info.access;
      data.infoForm.sort = info.sort;
      data.infoForm.isDelete = info.isDelete;
    };

    const resetClick = () => {
      resetForm();
    };

    const submit = () => {
      if (data.infoForm.companyNo?.length > 0) {
        refs.infoForm.validate(valid => {
          if (valid) {
            PositionAddOrUpdate(data.infoForm)
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
      } else {
        root.$message.warning("请先选择公司！");
      }
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
