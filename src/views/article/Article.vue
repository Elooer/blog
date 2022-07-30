<template>
  <Header />
  <div class="article_container">
    <div class="banner animate__animated animate__fadeIn"></div>
    <div class="article_content">
      <div class="title">{{ article.title }}</div>
      <div class="tip">
        <span class="date">
          <el-icon>
            <Calendar />
          </el-icon>
          {{ useTimeFormat(article.pubTime) }}
        </span>
      </div>
      <div class="content">{{ article.content }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getArticleById } from '../../request/api'
import Header from '../../components/header/Header.vue'
import useTimeFormat from '../../hooks/useTimeFormat'
import { Calendar } from '@element-plus/icons-vue'

const state = reactive<{ id: string; article: ArticleItf }>({
  id: '',
  article: {
    _id: '',
    title: '',
    describe: '',
    content: '',
    pubTime: '',
    tag: '',
    img: '',
    state: true
  }
})


let router = useRouter()
onMounted(() => {
  id.value = router.currentRoute.value.params.id as string
  getArticleById({ _id: id.value }).then(res => {
    if (res.status === 200) {
      article.value = res.data as ArticleItf
    }
  })
})

let { id, article } = toRefs(state)
</script>
<style lang="less" scoped>
.article_container {
  .banner {
    height: 60vh;
    background: url("../../assets/article_bg.png") no-repeat center center;
  }

  .article_content {
    width: 60%;
    margin: auto;
    background-color: #fff;
    margin-top: 20px;
    text-align: center;
    padding: 20px;

    .title {
      display: inline-block;
      font-size: 30px;
      font-weight: 600;
      color: #0a0813;
    }

    .tip {
      margin-top: 15px;
      color: #666;
    }

    .content {
      text-align: left;
    }
  }
}
</style>
