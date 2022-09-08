<template>
  <Header />
  <div class="banner animate__animated animate__fadeInDown"></div>
  <div class="record_container animate__animated animate__fadeInUp">
    <div class="title">归档</div>
    <div class="tags_title">标签</div>
    <div class="tags">
      <span class="tags_item" v-for="item in tag" @click="findTagArticle(item._id)">
        <CollectionTag style="width: 1em; height: 1em;vertical-align: -2px;color: skyblue;" />
        {{ item._id + ' ' + item.count }}
      </span>
    </div>
    <div class="record">
      <el-timeline>
        <el-timeline-item v-for="(activity, index) in tagArticles" :key="index" color="#007acc">
          <span class="article_title" @click="toArticle(activity._id)">{{ activity.title }}</span>
          <span class="date">{{ useTimeFormat(activity.pubTime) }}</span>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div class="record" v-for="item in list">
      <div class="year">{{ item._id }}</div>
      <el-timeline>
        <el-timeline-item v-for="(activity, index) in item.list" :key="index" color="#007acc">
          <span class="article_title" @click="toArticle(activity._id)">{{ activity.title }}</span>
          <span class="date">{{ activity.date }}</span>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
  <Footer />
</template>
<script lang="ts" setup>
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getRecord, getArticleByTag } from '../../request/api'
import { CollectionTag } from '@element-plus/icons-vue'
import Footer from '../../components/footer/Footer.vue'
import useTimeFormat from '../../hooks/useTimeFormat'

const state = reactive<RecordItf>({
  list: [{
    _id: '',
    list: [{
      _id: '',
      title: '',
      date: ''
    }]
  }],
  tag: [],
})

let tagArticles = ref<ArticleListRes>([])

const { list, tag } = toRefs(state)

getRecord().then(res => {
  if (res.status === 200) {
    list.value = res.data?.list as RecordItf['list']
    list.value.forEach(item => {
      item.list = item.list.reverse()
    })
    tag.value = res.data?.tag as []
  }
})

const router = useRouter()

const toArticle = (id: string) => {
  router.push(`/article/${id}`)
}

const findTagArticle = (tag: string) => {
  getArticleByTag({ tag }).then(res => {
    if (res.status === 200) {
      tagArticles.value = res.data as ArticleListRes
    }
  })
}

</script>
<style lang="less" scoped>
.banner {
  height: 60vh;
  background: url("https://cdn.elooerblog.top/img/record_bg.png") no-repeat center center;
}

.record_container {
  width: 60%;
  margin: auto;
  background-color: #fff;
  margin-top: 20px;
  text-align: center;
  padding: 40px;
  border-radius: 5px;

  .title {
    font-size: 28px;
    font-weight: 600;
  }

  .tags_title {
    text-align: left;
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .tags {
    text-align: left;
    margin-bottom: 20px;

    .tags_item {
      padding: 6px;
      background-color: #0e8fda;
      color: #fff;
      margin: 10px;
      font-size: 13px;
      border-radius: 15px;
      cursor: pointer;
    }
  }

  .record {
    text-align: left;

    .year {
      font-size: 22px;
      font-weight: 600;
      margin: 30px 0 20px 0;
    }

    .article_title {
      cursor: pointer;

      &:hover {
        color: #3b97e8;
      }
    }

    .date {
      float: right;
      color: #007acc;
    }
  }
}
</style>
