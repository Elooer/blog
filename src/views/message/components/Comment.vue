<template>
  <div class="Comment">
    <el-input v-model="textarea" :rows="2" type="textarea" placeholder="说点什么吧" />
    <el-button type="primary" @click="response">提交</el-button>
  </div>
</template>
<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue'
import { addResponse } from '../../../request/api'

const textarea = ref('')
const props = defineProps({
  id: String
})

const emits = defineEmits(['refresh'])

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
      ctx?.appContext.config.globalProperties.$message.success(res.message)
      textarea.value = ''
      emits('refresh')
    }
  })
}

const ctx = getCurrentInstance()
</script>
<style lang="less" scoped>
</style>
