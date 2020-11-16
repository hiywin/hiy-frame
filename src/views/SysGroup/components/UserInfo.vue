<template>
  <div>
    <el-drawer :title="data.title" :visible.sync="data.visible" direction="rtl">
      <el-row class="head-wrap">
        <el-col :span="12">
          <label>所属组织：</label>
          <label class="label-color">{{ data.groupName }}</label>
        </el-col>
        <el-col :span="12">
          <el-button
            class="pull-right input-width-80"
            type="danger"
            size="mini"
            @click="submit"
            >提交</el-button
          >
        </el-col>
      </el-row>
      <hr />
      <div class="content-wrap">
        <el-input
          placeholder="请输入用户名"
          v-model="data.queryData.userName"
          class="input-with-select"
          @input="inputChange"
          clearable
          ><CompanySelectVue
            slot="prepend"
            :config="data.companyConfig"
            :selectValue.sync="data.queryData.companyNo"
            @selectChangeEmit="companySelectChange"
          ></CompanySelectVue>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="search"
          ></el-button>
        </el-input>
        <el-table
          ref="userTable"
          class="margin-top-10"
          :data="
            data.tableData.filter(
              p =>
                !data.queryData.userName ||
                p.userName
                  .toLowerCase()
                  .includes(data.queryData.userName.toLowerCase())
            )
          "
          v-loading="data.loadingData"
          :max-height="data.tableHight"
          border
        >
          <el-table-column type="selection" width="60" align="center">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户名"
            min-width="150"
            align="center"
          ></el-table-column>
        </el-table>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { watch, reactive } from "@vue/composition-api";
import { GetUsersAll } from "@/api/sysUser";
import { GetGroupUsersAll, GroupUserSaveOrUpdate } from "@/api/sysGroup";
import CompanySelectVue from "@c/Select/company";
export default {
  name: "userInfo",
  components: { CompanySelectVue },
  setup(props, { root, refs, emit }) {
    const data = reactive({
      tableData: [],
      selectOptions: [],
      queryData: {
        companyNo: "",
        userName: "",
        access: true,
        isDelete: false
      },
      queryGroupUser: {
        groupNo: "",
        companyNo: "",
        lstGroupUser: []
      },
      companyConfig: {
        selectClass: "input-width-140",
        selectDefault: true
      },
      groupName: "",
      loadingData: false,
      title: "添加组织用户",
      visible: false,
      tableHight: "600"
    });

    const getUserAll = () => {
      data.loadingData = true;
      GetUsersAll(data.queryData)
        .then(res => {
          let resData = res.data;
          if (resData.hasErr) {
            root.$message.error(resData.msg);
          }
          data.tableData = resData.results;
          setUserChecked();
          autoTableHight();
          data.loadingData = false;
        })
        .catch(err => {
          console.log(err);
          data.loadingData = false;
        });
    };

    const setUserChecked = () => {
      let requestData = {
        GroupNo: data.queryGroupUser.groupNo,
        UserName: ""
      };
      data.loadingData = true;
      GetGroupUsersAll(requestData)
        .then(res => {
          let results = res.data.results;
          results.forEach(item => {
            let infos = data.tableData.filter(p => p.userNo == item.userNo);
            infos.forEach(row => {
              // 设置选中项
              refs.userTable.toggleRowSelection(row);
            });
          });
          data.loadingData = false;
        })
        .catch(err => {
          data.loadingData = false;
          console.log(err);
        });
    };

    const companySelectChange = value => {
      data.queryData.companyNo = value;
      data.queryGroupUser.companyNo = value;
      getUserAll();
    };

    const search = () => {
      getUserAll();
    };

    const inputChange = value => {
      console.log(value);
      console.log(data.queryData.userName);
      // let ddd = data.tableData.filter(p => !p || p.userName.includes(value));
      // console.log(ddd);
    };

    const userAdd = params => {
      data.visible = true;
      data.queryGroupUser.groupNo = params.groupNo;
      data.groupName = params.groupName;
      getUserAll();
    };

    const submit = () => {
      if (!checkGroupUser()) return false;
      getGroupUsers();
      GroupUserSaveOrUpdate(data.queryGroupUser)
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
    };

    const getGroupUsers = () => {
      data.queryGroupUser.lstGroupUser = [];
      let users = refs.userTable.selection;
      users.forEach(item => {
        data.queryGroupUser.lstGroupUser.push({
          userNo: item.userNo,
          userName: item.userName
        });
      });
    };

    const checkGroupUser = () => {
      if (data.queryGroupUser.companyNo.length <= 0) {
        root.$message.warning("请先选择公司！");
        return false;
      }
      if (data.queryGroupUser.groupNo.length <= 0) {
        root.$message.warning("请先选择组织！");
        return false;
      }
      return true;
    };

    const autoTableHight = () => {
      if (refs.userTable) {
        data.tableHight =
          document.documentElement.clientHeight -
          refs.userTable.$el.offsetTop -
          20;
      }
    };

    watch(
      () => document.documentElement.clientHeight,
      newValue => {
        console.log(newValue);
        autoTableHight();
      }
    );

    return {
      data,

      companySelectChange,
      search,
      inputChange,
      userAdd,
      submit
    };
  }
};
</script>

<style lang="scss" scoped>
.head-wrap {
  padding: 0 20px;
  line-height: 30px;
}
.tree-wrap {
  padding-left: 30px;
}
.label-color {
  color: $mainColor;
}
.content-wrap {
  padding: 10px 20px;
}
</style>
