<template>
  <div>
    <el-select
      v-model="data.selectValue"
      filterable
      placeholder="请选择"
      @change="selectChange"
      :class="data.selectClass"
    >
      <el-option
        v-for="item in data.companys"
        :key="item.companyNo"
        :label="item.companyName"
        :value="item.companyNo"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { reactive, onBeforeMount } from "@vue/composition-api";
import { GetCompanyAll } from "@/api/sysCompany";
export default {
  name: "companySelect",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    const data = reactive({
      selectValue: "",
      companys: [],
      queryData: {
        CompanyNo: "",
        CompanyName: "",
        Address: "",
        Mobile: "",
        Industry: "",
        LegalPerson: "",
        IsDelete: false
      },
      selectDefault: false,
      selectClass: "input-width-280"
    });

    const getCompanyAll = () => {
      GetCompanyAll(data.queryData)
        .then(res => {
          let resData = res.data;
          data.companys = resData.results;
          if (data.selectDefault && data.companys.length > 0) {
            data.selectValue = data.companys[0].companyNo;
            selectChange();
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    const selectChange = () => {
      emit("update:selectValue", data.selectValue);
      emit("selectChangeEmit", data.selectValue);
    };

    const initConfig = () => {
      if (props.config?.selectClass) {
        data.selectClass = props.config.selectClass;
      }
      if (props.config?.selectValue) {
        data.selectValue = props.config.selectValue;
      }
      if (props.config?.selectDefault) {
        data.selectDefault = props.config.selectDefault;
      }
    };

    const initSelectValue = value => {
      data.selectValue = value;
    };

    onBeforeMount(() => {
      initConfig();
      getCompanyAll();
    });

    return {
      data,

      selectChange,
      initSelectValue
    };
  }
};
</script>

<style lang="scss" scoped></style>
