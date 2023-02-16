<template>
  <Header />
  <div class="article_container">
    <div class="banner animate__animated animate__fadeInDown"></div>
    <div class="article_content animate__animated animate__fadeInUp">
      <div class="title">{{ article.title }}</div>
      <div class="tip">
        <span class="date">
          发布于:
          <Calendar style="width: 1em; height: 1em;vertical-align: -2px;" />
          {{ useTimeFormat(article.pubTime) }}
        </span>
        <span class="view">
          浏览量:
          <View style="width: 1em; height: 1em;vertical-align: -2px;" />
          {{ article.count }}
        </span>
      </div>
      <div class=" content markdown-body">
        <div v-html="content"></div>
      </div>
    </div>
  </div>
<Footer />
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getArticleById } from '../../request/api'
import Header from '../../components/header/Header.vue'
import Footer from '../../components/footer/Footer.vue'
import useTimeFormat from '../../hooks/useTimeFormat'
import { Calendar, View } from '@element-plus/icons-vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import '../../assets/css/markedown.less'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,	// 启动类似于Github样式的Markdown语法
  pedantic: false, // 只解析符合Markdwon定义的，不修正Markdown的错误
  sanitize: false, // 原始输出，忽略HTML标签（关闭后，可直接渲染HTML标签）
  // 高亮的语法规范
  highlight: (code: any, lang: any) => hljs.highlight(code, { language: lang }).value,
})
const state = reactive<{ id: string; article: ArticleItf; content: string }>({})
let { id, article, content } = toRefs(state)

let router = useRouter()
id.value = router.currentRoute.value.params.id as string
getArticleById({ _id: id.value }).then(res => {
  if (res.status === 200) {
    article.value = res.data as ArticleItf
    content.value = marked(article.value.content)
  }
})

</script>
<style lang="less" scoped>
.article_container {
  .banner {
    height: 60vh;
    background: url("https://cdn.elooerblog.top/img/article_bg.png") no-repeat center center;
  }

  .article_content {
    width: 60%;
    margin: auto;
    background-color: #fff;
    margin-top: 20px;
    text-align: center;
    padding: 20px;
    border-radius: 5px;

    .title {
      display: inline-block;
      font-size: 30px;
      font-weight: 600;
      color: #0a0813;
    }

    .tip {
      margin-top: 15px;
      color: #666;
      font-size: 16px;

      .view {
        margin-left: 15px;
      }
    }

    .content {
      text-align: left;
    }
  }
}

.markdown-body {
  padding: 0 10px;
}
</style>
