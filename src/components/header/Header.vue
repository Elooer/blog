<template>
  <div class="header-container">
    <el-menu ref="menu" class="el-menu-demo" :class="{ animate__animated: isActive, animate__slideInDown: isActive }"
      mode="horizontal" :ellipsis="false" @select="" :background-color="bgc" text-color="#fff" active-text-color="#fff"
      router>
      <!-- <el-menu-item index="0">Elooer</el-menu-item> -->
      <div class="flex-grow" />
      <el-menu-item index="/home"><i class="iconfont">&#xe7e0;</i>首页</el-menu-item>
      <el-menu-item index="/record"><i class="iconfont">&#xe7dc;</i>归档</el-menu-item>
      <el-menu-item index="/message"><i class="iconfont">&#xe7e4;</i>留言</el-menu-item>
      <el-menu-item index="/about"><i class="iconfont">&#xe7dd;</i>关于</el-menu-item>
      <el-menu-item index="/login">登录</el-menu-item>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs, onMounted } from 'vue'

const props = defineProps({
  flag: {
    type: Boolean,
    default: false
  }
})

const state = reactive({
  bgc: 'rgba(0,0,0,0)',
  isActive: false,
})


let menu = ref()
onMounted(() => {
  if (!flag) {
    window.addEventListener('scroll', () => {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let clientHeight = document.documentElement.clientHeight * 0.6

      if (scrollTop >= clientHeight) {
        console.log("滚动到底部了")
        isActive.value = true
        bgc.value = 'rgba(0,0,0,0.3)'
      } else {
        isActive.value = false
        bgc.value = 'rgba(0,0,0,0)'
      }
    })
  } else {
    bgc.value = 'rgba(0,0,0,0.3)'
  }
})

let { bgc, isActive } = toRefs(state)
let { flag } = props
</script>
<style lang="less" scoped>
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  user-select: none;

  .el-menu-demo {
    border: 0;
    padding-right: 200px;

    .el-menu-item {
      &:hover {
        background-color: rgba(41, 171, 232, 0.3);
      }
    }

    .iconfont {
      margin-right: 5px;
    }

    .flex-grow {
      flex-grow: 1;
    }
  }

}

.active {
  color: yellow;
}
</style>
