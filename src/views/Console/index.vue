<template>
  <div>
    控制台1111
    <div>
      <el-button @click="testGet">测试</el-button>
    </div>
  </div>
</template>
<script>
import { GetCurrentUser } from "@/api/account";
export default {
  name: "console",
  setup() {
    const testGet = () => {
      GetCurrentUser()
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    };

    return {
      testGet
    };
  }
};
</script>
<style lang="scss" scoped></style>
