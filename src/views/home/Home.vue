<template>
  <div class="home_container">
    <Header ref="head" />
    <div class="banner animate__animated animate__fadeIn">
      <span class="str">{{ typewriter }}</span>
    </div>
    <el-row>
      <el-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 15, offset: 1 }" :md="{ span: 13, offset: 2 }">
        <ArticleList />
      </el-col>
      <el-col :xs="{ span: 22, offset: 1 }" :sm="{ span: 7, offset: 0 }" :md="{ span: 6, offset: 1 }">
        <pCard class="hover_class" />
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { head } from 'lodash';
import { reactive, ref, toRefs, onMounted } from 'vue'
import Header from '../../components/header/Header.vue'
import pCard from './components/PersonCard.vue'
import ArticleList from './components/ArticleList.vue'

const state = reactive({
  typewriter: '',
  str: 'Hey，here is Elooer!',
  timer: 0
})

onMounted(() => {
  typing()
})

let i = 0
const typing = () => {
  if (i <= str.value.length) {
    if (i === str.value.length) {
      typewriter.value = str.value.slice(0, i++)
    } else {
      typewriter.value = str.value.slice(0, i++) + '_'
    }

    timer.value = setTimeout(() => {
      typing()
    }, 100)
  } else {
    clearTimeout(timer.value)
  }
}

let { typewriter, str, timer } = toRefs(state)
</script>
<style lang="less" scoped>
.home_container {
  .banner {
    position: relative;
    height: 60vh;
    background: url("../../assets/home_banner.png") no-repeat center center;

    .str {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 50px;
      font-family: 'XingKai SC', 'STXinwei';
      font-weight: 600;
      user-select: none;
    }
  }
}
</style>
