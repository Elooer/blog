<template>
  <div class="header-container">
    <el-menu ref="menu" class="el-menu-demo" :class="{ animate__animated: isActive, animate__slideInDown: isActive }"
      mode="horizontal" :ellipsis="false" @open="" :background-color="bgc" text-color="#fff" active-text-color="#fff"
      router>
      <!-- <el-menu-item index="0">Elooer</el-menu-item> -->
      <div class="flex-grow pc" />
      <el-menu-item class="pc" index="/home"><i class="iconfont">&#xe7e0;</i>首页</el-menu-item>
      <el-menu-item class="pc" index="/record"><i class="iconfont">&#xe7dc;</i>归档</el-menu-item>
      <el-menu-item class="pc" index="/message"><i class="iconfont">&#xe7e4;</i>留言</el-menu-item>
      <el-menu-item class="pc" index="/about"><i class="iconfont">&#xe7dd;</i>关于</el-menu-item>
      <el-menu-item class="pc" index="/login" v-if="!isLogin">
        <span>登录</span>
      </el-menu-item>
      <div class="avatar pc" v-else>
        <img src="../../assets/avatar.png" alt="">
        <div class="logout" @click="logout">退出登录</div>
      </div>
      <Operation @click="drawer = true" class="pe" style="width: 2em; height: 2em;vertical-align: -2px;color: #fff" />
      <el-drawer v-model="drawer" direction="ttb" :show-close="false" :with-header="false">
        <div class="tab">
          <router-link to="/home" style="text-decoration: none;color: #fff;">首页</router-link>
        </div>
        <div class="tab">
          <router-link to="/record" style="text-decoration: none;color: #fff;">归档</router-link>
        </div>
        <div class="tab">
          <router-link to="/message" style="text-decoration: none;color: #fff;">留言</router-link>
        </div>
        <div class="tab">
          <router-link to="/about" style="text-decoration: none;color: #fff;">关于</router-link>
        </div>
        <div class="tab">
          <router-link to="/login" style="text-decoration: none;color: #fff;" v-if="!isLogin">登录</router-link>
          <div style="text-decoration: none;color: #fff;" @click="logout" v-else>退出登录</div>
        </div>
      </el-drawer>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs, onMounted, onBeforeMount } from 'vue'
import { Operation } from '@element-plus/icons-vue'

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

let isLogin = ref(false)
onBeforeMount(() => {
  let token = localStorage.getItem('blog_token')
  if (token) {
    isLogin.value = true
  } else {
    isLogin.value = false
  }
})


let menu = ref()
let drawer = ref(false)
onMounted(() => {
  if (!flag) {
    window.addEventListener('scroll', () => {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let clientHeight = document.documentElement.clientHeight * 0.6

      if (scrollTop >= clientHeight) {
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

const logout = () => {
  localStorage.removeItem('blog_token')
  isLogin.value = false
}

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

.tab {
  height: 20%;
  font-size: 16px;
  text-align: center;
  line-height: 5vh;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 2px;
}

@media screen and (max-width:768px) {
  .pe {
    display: block;
    float: right !important;
  }

  .pc {
    display: none;
  }
}

@media screen and (min-width:992px) {
  .pe {
    display: none;
  }

  .pc {
    display: block;
  }
}

.avatar {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 12px;
  margin-top: 14px;
  cursor: pointer;

  &:hover .logout {
    display: block;
  }

  img {
    width: 90%;
    height: 90%;
  }

  .logout {
    position: absolute;
    top: 30px;
    left: -16px;
    display: none;
    height: 25px;
    width: 65px;
    font-size: 12px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.3);
    line-height: 25px;
    text-align: center;
  }
}
</style>
