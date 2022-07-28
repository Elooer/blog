<template>
  <div class="blog_container">
    <div class="blog" v-for="item in 6"></div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'

</script>
<style lang="less" scoped>
.blog_container {
  padding: 10px 10px;

  .blog {
    height: 300px;
    // width: 600px;
    background-color: yellow;
    border: 1px solid red;
    margin: 15px 0;
  }
}
</style>
