<template>
  <Header />
  <div class="banner animate__animated animate__fadeInDown"></div>
  <div class="message_container animate__animated animate__fadeInUp">
    <div class="title">留言板</div>
    <div ref="newBox">
      <div ref="child"></div>
    </div>
    <div ref="resPanel">
      <el-input ref="input" v-model="textarea" :rows="2" type="textarea" placeholder="说点什么吧" />
      <el-button type="primary" @click="commitComment">提交</el-button>
      <el-button v-if="where" type="danger" @click="cancel">取消</el-button>
    </div>
    <div class="comment_head">{{ commentList.length }}条评论</div>
    <div class="comment_box" v-for="item in commentList">
      <div class="comment_item">
        <div class="avatar">
          <img :src="item.avatar" alt="">
        </div>
        <div class="userinfo">
          <div class="username">{{ item.username }}</div>
          <div class="date">{{ useTimeFormat(item.pubTime) }}</div>
          <div class="content">{{ item.comments }}</div>
        </div>
      </div>
      <div class="response" @click="response">回复</div>
    </div>
  </div>
  <Footer />
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, getCurrentInstance } from 'vue'
import { getCommentList, addComment } from '../../request/api'
import useTimeFormat from '../../hooks/useTimeFormat'
import Footer from '../../components/footer/Footer.vue'
const state = reactive<{ textarea: string; commentList: CommentsRes[]; where: boolean }>({
  textarea: '',
  commentList: [],
  where: false
})

const newBox = ref()
const child = ref()
const resPanel = ref()
const input = ref()

// 回复
const response = (e: Event) => {
  let target = e.currentTarget as HTMLElement
  target.appendChild(resPanel.value)
  input.value.focus()
  where.value = true
}

const cancel = () => {
  where.value = false
  newBox.value.appendChild(resPanel.value)
}

const getCommentAll = () => {
  getCommentList().then(res => {
    if (res.status === 200) {
      commentList.value = res.data as CommentsRes[]
    }
  })
}
getCommentAll()

const commitComment = () => {
  let userinfo: string | null = null
  if (localStorage.getItem('blog_token')) {
    userinfo = localStorage.getItem('blog_token')
  }
  if (textarea.value.trim() === '') {
    ctx?.appContext.config.globalProperties.$message.error('请输入内容！')
  }
  addComment({
    userinfo,
    comments: textarea.value.trim()
  }).then(res => {
    if (res.status === 200) {
      textarea.value = ''
      ctx?.appContext.config.globalProperties.$message.success(res.message)
      getCommentAll()
    }
  })
}

const { textarea, commentList, where } = toRefs(state)
const ctx = getCurrentInstance()
</script>
<style lang="less" scoped>
.banner {
  height: 60vh;
  background: url("../../assets/message_bg.png") no-repeat center center;
}

.message_container {
  width: 50%;
  margin: auto;
  background-color: #fff;
  margin-top: 20px;
  text-align: center;
  padding: 20px;
  border-radius: 5px;

  .title {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 15px;
  }

  .cancel {
    font-size: 13px;
    color: #4b89d1;
    cursor: pointer;
    text-align: right;
  }

  .el-button {
    width: 100%;
    margin-top: 15px;
    margin-bottom: 20px;
  }

  .comment_head {
    text-align: left;
    margin-top: 20px;
    margin-bottom: 30px;
    font-size: 23px;
    font-weight: 600;
  }

  .comment_box {
    margin-bottom: 30px;
    border-bottom: 1px solid #ccc;

    .comment_item {
      display: flex;

      .avatar {
        width: 8%;
        margin-right: 3%;

        img {
          width: 100%;
          border-radius: 50%;
        }
      }

      .userinfo {
        flex: 1;
        text-align: left;

        .username {
          font-size: 15px;
          font-weight: 600;
        }

        .date {
          font-size: 12px;
          color: #ccc;
        }

        .content {
          margin-top: 5px;
          font-size: 14px;
        }
      }
    }

    .response {
      color: #4b89d1;
      font-size: 13px;
      line-height: 60px;
      cursor: pointer;
      text-align: right;

      &:hover {
        color: #153a64;
      }
    }
  }

}
</style>
