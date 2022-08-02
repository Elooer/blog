<template>
  <Header />
  <div class="banner animate__animated animate__fadeInDown"></div>
  <div class="about animate__animated animate__fadeInUp">
    <div class="title">关于我</div>
    <img style="width: 80%;margin-top: 15px;" src="../../assets/me.webp" alt="">
    <div class="content">一名在读大学生，热爱编程。目前还在不断学习中，对于新知识和新技术有着强烈的求知欲。平时也爱逛逛论坛博客，此站用于记录个人学习过程中的心得和感悟。</div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import Header from '../../components/header/Header.vue'

</script>
<style lang="less" scoped>
.banner {
  height: 60vh;
  background: url("../../assets/about_bg.png") no-repeat center center;
}

.about {
  width: 50%;
  background-color: #fff;
  margin: auto;
  margin-top: 20px;
  text-align: center;
  padding: 20px;

  .title {
    font-size: 28px;
    font-weight: 600;
  }

  .content {
    font-size: 15px;
    margin-top: 15px;
    text-align: left;
    color: #666;
  }
}
</style>
