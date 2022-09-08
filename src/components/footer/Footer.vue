<template>
  <div class="footer_container">
    <div class="record">
      <a href="https://beian.miit.gov.cn" style="color:#bcbbbb">赣ICP备2022007846号</a>
    </div>
    <div class="copyright">Copyright © 2022 Elooer</div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'

</script>
<style lang="less" scoped>
.footer_container {
  height: 70px;
  background-color: rgb(57, 55, 55);
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #bcbbbb;
  padding-top: 10px;

  .copyright {
    margin-top: 10px;
  }
}
</style>
