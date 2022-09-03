<template>
  <Header />
  <div class="banner animate__animated animate__fadeInDown"></div>
  <div class="message_container animate__animated animate__fadeInUp">
    <div class="title">留言板</div>
    <div v-if="isComment">
      <el-input v-model="textarea" :rows="2" type="textarea" placeholder="说点什么吧" />
      <el-button type="primary" @click="commitComment">提交</el-button>
    </div>
    <div class="comment_head">{{ total }}条评论</div>
    <div class="comment_box" v-for="(item, index) in commentList">
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
      <div class="response_item" v-for="item1 in item.response">
        <div class="avatar">
          <img :src="item1.avatar" alt="">
        </div>
        <div class="userinfo">
          <div class="username">{{ item1.username }}</div>
          <div class="date">{{ useTimeFormat(item1.pubTime) }}</div>
          <div class="content">{{ item1.comments }}</div>
        </div>
      </div>
      <div @click="cancel(index)" v-if="where[index]" class="cancel">取消回复</div>
      <div class="response" @click="response(index)">
        <span>回复</span>
        <component v-if="where[index]" :is="Comment" :id="item._id" @refresh="refresh($event, index)"></component>
      </div>
    </div>
    <el-button style="width: 20%" type="primary" @click="getCommentAll(true)">加载更多...</el-button>
  </div>
  <Footer />
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, getCurrentInstance } from 'vue'
import { getCommentList, addComment } from '../../request/api'
import useTimeFormat from '../../hooks/useTimeFormat'
import Footer from '../../components/footer/Footer.vue'
import Comment from './components/Comment.vue'

const state = reactive<{ textarea: string; commentList: CommentsRes[]; where: boolean[]; count: number; total: number }>({
  textarea: '',
  commentList: [],
  where: [],
  count: 1,
  total: 0,
})

const { textarea, commentList, where, count, total } = toRefs(state)

const isComment = ref(true)

// 回复
const response = (index: number) => {
  where.value = []
  where.value[index] = true
  isComment.value = false
}

// 取消回复
const cancel = (index: number) => {
  where.value[index] = false
  isComment.value = true
}

// 获取所有评论
const getCommentAll = (more?: boolean) => {
  if (more) count.value++
  getCommentList({ count: count.value }).then(res => {
    if (res.status === 200) {
      commentList.value = res.data?.list as CommentsRes[]
      total.value = res.data?.total as number
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

const refresh = (e: null, index: number) => {
  cancel(index)
  getCommentAll()
}
const ctx = getCurrentInstance()
</script>
<style lang="less" scoped>
.banner {
  height: 60vh;
  background: url("../../assets/message_bg.png") no-repeat center center;
}

.message_container {
  width: 60%;
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
    color: #e64520;
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
    border-bottom: 1px solid #eee;

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

    .response_item {
      display: flex;
      margin-top: 20px;
      width: 90%;
      margin-left: 10%;
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;

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
          font-size: 14px;
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
