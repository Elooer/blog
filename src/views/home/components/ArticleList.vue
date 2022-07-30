<template>
  <div class="article_container">
    <div class="article_item hover_class" v-for="item in articleList" :key="item._id" @click="toDetail(item._id)">
      <el-row>
        <el-col :xs="{ span: 22, offset: 1 }" :sm="{ span: 22, offset: 1 }" :md="{ span: 8, offset: 0 }">
          <div class="b_img"><img :src="item.img" alt=""></div>
        </el-col>
        <el-col :xs="{ span: 22, offset: 1 }" :sm="{ span: 22, offset: 1 }" :md="{ span: 15, offset: 1 }">
          <div class="main">
            <div class="title">{{ item.title }}</div>
            <div class="describe">{{ item.describe }}</div>
            <div class="tip">
              <span class="date">
                <el-icon>
                  <Calendar />
                </el-icon>
                {{ useTimeFormat(item.pubTime) }}
              </span>

              <span class="tag">{{ item.tag }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
import 'element-plus/theme-chalk/display.css'
import { Calendar } from '@element-plus/icons-vue'
import { getArticleList } from '../../../request/api'
import useTimeFormat from '../../../hooks/useTimeFormat'
import { useRouter } from 'vue-router'

const state = reactive<{ articleList: ArticleListRes; page: number }>({
  articleList: [],
  page: 1
})

let { page, articleList } = toRefs(state)
getArticleList({ page: page.value }).then(res => {
  if (res.status !== 200) {
    return console.log('获取文章列表出错！');
  }
  res.data && (articleList.value = res.data)
})

// 点击跳转到文章详情页
const toDetail = (id: string) => {
  console.log('点击')
  router.push(`/article/${id}`)
}

const router = useRouter()
</script>
<style lang="less" scoped>
.article_container {
  padding: 10px 10px;

  .article_item {
    position: relative;
    background-color: #fff;
    box-shadow: 0 0 8px 0px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin: 15px 0;
    padding: 10px;
    cursor: pointer;

    .b_img {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;

      img {
        width: 100%;
        height: 90%;
      }
    }

    .main {
      width: 100%;
      height: 100%;

      // background-color: skyblue;
      .title {
        font-weight: 600;
        font-size: 25px;
        color: #0e0c15;
        margin-top: 5px;
      }

      .describe {
        font-size: 18px;
        margin-top: 20px;
        color: #262626;
      }

      .tip {
        height: 20px;
        font-size: 15px;
        color: #666;
        line-height: 20px;
        vertical-align: middle;
        margin-top: 40px;

        .date {
          margin-right: 20px;
        }

        .tag {
          border: 1px solid #528fae;
          color: #528fae;
          padding: 3px;
          border-radius: 4px;
          font-size: 12px;
          margin-left: 40px;
        }
      }
    }

  }
}
</style>
