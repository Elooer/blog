<template>
  <div class="card_container">
    <div class="card hover_class">
      <div class="avatar">
        <img src="https://cdn.elooerblog.top/img/OIP-C.jfif" alt="">
      </div>
      <span class="name">Elooer</span>
      <div class="overview">
        <div class="o_left">
          <span class="o_data" style="color:#3b82f6;">{{ total }}</span>
          <span>博客</span>
        </div>
        <div class="o_right">
          <span class="o_data" style="color:#fd4c74;">{{ tagNum }}</span>
          <span>标签</span>
        </div>
      </div>
      <div class="contact">
        <el-tooltip class="box-item" effect="dark" content="https://github.com/Elooer" placement="bottom">
          <i class="iconfont">&#xe677;</i>
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="Zero8023033" placement="bottom">
          <i class="iconfont" style="color:#16d46b;">&#xe6b3;</i>
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="1921517233" placement="bottom">
          <i class="iconfont" style="color:#23abf2;">&#xe6b4;</i>
        </el-tooltip>
      </div>
      <!-- <div>As I could</div>
      <div>Write the most elegant code</div> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { getPageInfo, getRecord } from '../../../request/api'

const total = ref(0)
const tagNum = ref(0)

getPageInfo({ page: 1 }).then(res => {
  if (res.status === 200) {
    total.value = res.data?.total as number
  }
})

getRecord().then(res => {
  if (res.status === 200) {
    tagNum.value = res.data?.tag.length as number
  }
})

</script>
<style lang="less" scoped>
.card_container {
  height: 420px;
  margin-top: 20px;

  .card {
    position: relative;
    background-color: #fff;
    height: 100%;
    border-radius: 5px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);

    .avatar {
      position: absolute;
      left: 50%;
      top: 5%;
      transform: translateX(-50%);
      width: 40%;
      height: 40%;

      img {
        width: 100%;
        border-radius: calc(50% - 0px);
        box-shadow: 0 0 8px 5px rgba(0, 0, 0, 0.3);
      }
    }

    .name {
      position: absolute;
      left: 50%;
      top: 42%;
      transform: translateX(-50%);
      font-size: 25px;
    }

    .overview {
      position: absolute;
      left: 50%;
      top: 55%;
      transform: translateX(-50%);
      width: 60%;
      padding: 5px;
      display: flex;
      text-align: center;

      .o_left {
        border-right: 2px solid #666;
      }

      .o_left,
      .o_right {
        display: flex;
        flex-direction: column;
        flex: 1;
        font-size: 15px;

        .o_data {
          font-size: 20px;
        }
      }
    }

    .contact {
      position: absolute;
      left: 50%;
      top: 75%;
      transform: translateX(-50%);

      .iconfont {
        font-size: 38px;
        margin: 10px;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.4);
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
}
</style>
