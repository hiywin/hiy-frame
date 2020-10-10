<template>
  <div>
    <div class="search-tag-wrap">
      <label style="color: transparent;">*</label>
      <SearchTagVue ref="searchTag"></SearchTagVue>
    </div>
    <el-table
      :data="data.tableData"
      v-loading="data.loadingData"
      @row-click="rowClick"
      border
    >
      <el-table-column
        prop="content"
        label="主类型"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="code"
        label="Code"
        align="center"
        width="120"
      ></el-table-column>
      <el-table-column label="操作" width="100" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="dataAdd(scope.row)"
            plain
            >添加项</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pull-right margin-top-20 margin-bottom-20"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[20, 50, 100, 1000]"
      layout="total,sizes,prev,pager,next"
      :total="data.queryData.PageModel.TotalCount"
    >
    </el-pagination>
  </div>
</template>
<script>
import { onBeforeMount, reactive } from "@vue/composition-api";
import { GetDictionaryPage } from "@/api/sysDictionary";
import SearchTagVue from "@c/SearchTag/index";
export default {
  name: "dictionaryParent",
  components: { SearchTagVue },
  setup(props, { root, refs, emit }) {
    const data = reactive({
      tableData: [],
      queryData: {
        Type: "DictionaryType",
        TypeName: "",
        Content: "",
        ParentNo: "",
        IsDelete: false,
        PageModel: {
          PageIndex: 1,
          PageSize: 20,
          TotalCount: 0
        }
      },
      tagConfig: {
        Hidden: true,
        Code: "",
        Time: ""
      },
      loadingData: false
    });

    // 设置查询返回标记
    const setSearchTag = params => {
      data.tagConfig.Hidden = false;
      data.tagConfig.Code = params.code;
      data.tagConfig.Time = params.expandSeconds;
      refs.searchTag.initConfig(data.tagConfig);
    };

    const getDictionaryPage = () => {
      data.loadingData = true;
      GetDictionaryPage(data.queryData)
        .then(res => {
          let resData = res.data;
          if (resData.hasErr) {
            root.$message.error(resData.msg);
          }
          data.tableData = resData.results;
          data.queryData.PageModel.TotalCount = resData.pageModel.totalCount;
          setSearchTag(resData);
          data.loadingData = false;
        })
        .catch(err => {
          console.log(err);
          data.loadingData = false;
        });
    };

    const search = content => {
      data.queryData.Content = content;
      getDictionaryPage();
    };

    // 每页数量
    const handleSizeChange = value => {
      data.queryData.PageModel.PageSize = value;
      getDictionaryPage();
    };

    // 第几页
    const handleCurrentChange = value => {
      data.queryData.PageModel.PageIndex = value;
      getDictionaryPage();
    };

    const rowClick = row => {
      emit("parentClick", row);
    };

    onBeforeMount(() => {
      getDictionaryPage();
    });

    return {
      data,

      handleSizeChange,
      handleCurrentChange,
      search,
      rowClick
    };
  }
};
</script>
<style lang="scss" scoped>
.search-tag-wrap {
  line-height: 33px;
  margin-bottom: 5px;
  background-color: $mainTitleColor;
  border-radius: 0 0 3px 3px;
  font-weight: bold;
}
</style>
