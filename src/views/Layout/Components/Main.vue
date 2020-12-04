<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup() {}
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
  height: 100vh;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 35;
  padding-right: 10px;
  @include webkit(box-sizing, border-box);
  @include webkit(transition, all 0.3s ease 0s);
}
.content {
  width: 100%;
  height: 100%;
  padding: 5px 10px 0 10px;
  @include webkit(box-sizing, border-box);
  background-color: #fff;
}
.open {
  .main-content {
    padding-left: $navMenu + 10;
  }
}
.close {
  .main-content {
    padding-left: $navMenuMin + 10;
  }
}
</style>
