<template>
  <div class="Comment">
    <el-input v-model="textarea" :rows="2" type="textarea" placeholder="说点什么吧" />
    <el-button type="primary" @click="response">提交</el-button>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, getCurrentInstance } from 'vue'
import { addResponse } from '../../../request/api'

const textarea = ref('')
const props = defineProps({
  id: String
})

const response = () => {
  let userinfo: string | null = null
  if (localStorage.getItem('blog_token')) {
    userinfo = localStorage.getItem('blog_token')
  }
  if (textarea.value.trim() === '') {
    ctx?.appContext.config.globalProperties.$message.error('请输入内容！')
  }
  addResponse({
    id: props.id as string,
    userinfo,
    comments: textarea.value
  }).then(res => {
    if (res.status === 200) {
      console.log(res)
    }
  })
}

const ctx = getCurrentInstance()
</script>
<style lang="less" scoped>
</style>
