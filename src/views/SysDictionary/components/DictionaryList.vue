<template>
  <div>
    <div class="search-sub-tag" :hidden="data.searchSubHidden">
      <label>主类型：</label>
      <label class="label-color">{{ data.parantName }}</label>
      <SearchTagVue ref="searchTag" />
    </div>
    <el-table :data="data.tableData" v-loading="data.loadingData" border>
      <el-table-column prop="content" label="字典项" align="center">
      </el-table-column>
      <el-table-column
        prop="code"
        label="Code"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="descr"
        label="描述"
        align="center"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="createName"
        label="创建人"
        align="center"
        width="130"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center"
        width="130"
      ></el-table-column>
      <el-table-column label="操作" width="180" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="dataEdit(scope.row)"
            plain
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="dataDelete(scope.row)"
            plain
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import { GetDictionaryAll } from "@/api/sysDictionary";
import SearchTagVue from "@c/SearchTag/index";
export default {
  name: "dictionaryList",
  components: { SearchTagVue },
  setup(props, { root, refs }) {
    const data = reactive({
      tableData: [],
      queryData: {
        Type: "",
        TypeName: "",
        ParentNo: "-1",
        IsDelete: false
      },
      parantName: "",
      loadingData: false,
      searchSubHidden: true
    });

    const getDictionaryAll = () => {
      data.loadingData = true;
      GetDictionaryAll(data.queryData)
        .then(res => {
          let resData = res.data;
          if (resData.hasErr) {
            root.$message.error(resData.msg);
          }
          data.tableData = resData.results;
          setTagConfig(resData);
          data.loadingData = false;
        })
        .catch(err => {
          console.log(err);
          data.loadingData = false;
        });
    };

    const searchSub = params => {
      data.parantName = params.content;
      data.queryData.ParentNo = params.dictionaryNo;
      getDictionaryAll();
    };

    // 显示查询时长
    const setTagConfig = params => {
      data.searchSubHidden = false;
      refs.searchTag.initConfig({
        Hidden: false,
        Code: params.code,
        Time: params.expandSeconds
      });
    };

    const dataEdit = row => {
      console.log(row);
    };

    const dataDelete = row => {
      console.log(row);
    };

    return {
      data,

      searchSub,
      dataEdit,
      dataDelete
    };
  }
};
</script>
<style lang="scss" scoped>
.search-sub-tag {
  line-height: 33px;
  margin-bottom: 5px;
  padding-left: 5px;
  background-color: $mainTitleColor;
  border-radius: 3px;
  font-weight: bold;
}
.label-color {
  color: $mainColor;
}
</style>
