<template>
  <div>
    <el-drawer :title="data.title" :visible.sync="data.visible" direction="rtl">
      <el-row class="head-wrap">
        <el-col :span="12">
          <label>所属角色：</label>
          <label class="label-color">{{ data.roleName }}</label>
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
      <el-input
        :hidden="data.filterHidden"
        class="margin-left-30 input-per-75"
        placeholder="输入关键字进行过滤"
        v-model="data.treeFilterTxt"
      >
      </el-input>
      <el-tree
        ref="tree"
        class="tree-wrap"
        :data="data.treeData"
        node-key="moduleNo"
        :filter-node-method="filterNode"
        show-checkbox
        accordion
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>
            <svg-icon
              :iconClass="data.icon"
              :className="data.icon"
              style="color:#344a5f;"
            />
            {{ data.moduleName }}
          </span>
        </span>
      </el-tree>
    </el-drawer>
  </div>
</template>

<script>
import { watch, reactive } from "@vue/composition-api";
import { GetModuleTree } from "@/api/sysModule";
import { GetRoleModuleAll, RoleModuleSaveOrUpdate } from "@/api/sysRole";
export default {
  name: "moduleTree",
  setup(props, { root, refs, emit }) {
    const data = reactive({
      treeData: [],
      queryData: {
        moduleName: "",
        appNo: "0"
      },
      queryRoleModule: {
        roleNo: "",
        moduleName: "",
        lstModuleNo: []
      },
      roleName: "",
      treeFilterTxt: "",
      title: "添加模块权限",
      visible: false,
      filterHidden: true
    });

    const getModuleTree = () => {
      GetModuleTree(data.queryData)
        .then(res => {
          let resData = res.data;
          data.treeData = resData.results;
          data.filterHidden = data.treeData.length > 0 ? false : true;
          setModuleTreeChecked();
        })
        .catch(err => {
          console.log(err);
        });
    };

    const setModuleTreeChecked = () => {
      if (!checkRoleModule()) return false;
      GetRoleModuleAll(data.queryRoleModule)
        .then(res => {
          let resData = res.data;
          let modules = [];
          resData.results.forEach(item => {
            modules.push(item.moduleNo);
          });
          if (modules.length > 0) {
            refs.tree.setCheckedKeys(modules);
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    const checkRoleModule = () => {
      if (data.queryRoleModule.roleNo.length <= 0) {
        root.$message.warning("请先选择角色！");
        return false;
      }
      if (data.treeData.length <= 0) return false;
      return true;
    };

    const filterNode = (value, data) => {
      if (!value) return true;
      return data.moduleName.indexOf(value) !== -1;
    };

    const search = params => {
      data.visible = true;
      data.queryData.appNo = params.appNo;
      data.queryRoleModule.roleNo = params.roleNo;
      data.roleName = params.roleName;
      reset();
      getModuleTree();
    };

    const reset = () => {
      data.treeFilterTxt = "";
      refs.tree?.setCheckedKeys([]);
    };

    const submit = () => {
      if (!checkSubmit()) return false;
      let keys = refs.tree.getCheckedKeys();
      data.queryRoleModule.lstModuleNo = keys;
      RoleModuleSaveOrUpdate(data.queryRoleModule)
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

    const checkSubmit = () => {
      if (data.queryRoleModule.roleNo.length <= 0) {
        root.$message.warning("请先选择角色！");
        return false;
      }
      if (data.treeData.length <= 0) {
        root.$message.warning("模块树不存在，无法操作！");
        return false;
      }
      return true;
    };

    watch(
      () => data.treeFilterTxt,
      newValue => {
        refs.tree.filter(newValue);
      }
    );

    return {
      data,

      filterNode,
      search,
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
</style>
