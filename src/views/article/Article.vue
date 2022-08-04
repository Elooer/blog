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
  highlight(code: string) {
    return hljs.highlightAuto(code).value
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})
const state = reactive<{ id: string; article: ArticleItf }>({
  id: '',
  article: {
    _id: '',
    title: '',
    describe: '',
    content: '',
    pubTime: '',
    tag: '',
    count: 0,
    img: '',
    state: true
  }
})

let content = marked('### 安装git\n```\nyum install git -y\n```\n### 安装node\n![这是图片](https://markdown.com.cn/assets/img/philly-magic-garden.9c0b4415.jpg "Magic Gardens")\n#### 下载nvm\n使用Git将NVM的源码克隆到本地的~/.nvm目录下，并检查最新版本。\n```\ngit clone git://github.com/cnpm/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`\n```\n#### 配置nvm环境变量\n依次运行以下命令，配置NVM的环境变量\n```\necho \". ~/.nvm/nvm.sh\" >> /etc/profile\nsource /etc/profile\n```\n#### 安装node\n通过nvm 安装管理node\n```\nnvm install 12\n```\n### 安装nginx\n#### yum安装\n```\nyum -y install nginx\n```\n#### 查看版本\n```\nnginx -v\n```\n返回结果如下所示，表示Nginx安装成功。\n```\nnginx version: nginx/1.20.1\n```\n### 安装mongodb\n#### 创建repo\n```\nvi /etc/yum.repos.d/mongodb-org-4.4.repo\n```\n#### 写入repo\n```\n[mongodb-org-4.4]\nname=MongoDB 4.4 Repository\nbaseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.4/$basearch/\ngpgcheck=0\nenabled=1\n```\n#### yum安装\n```\nyum -y install mongodb-org\n```\n#### 设置启动\n```\nsystemctl enable mongod\nsystemctl start mongod\n```\n#### 修改配置文件\n查看mongo安装位置 whereis mongod\n显示内容如下：\n```javascript\nmongod: /usr/bin/mongod /etc/mongod.conf /usr/share/man/man1/mongod.1.gz\n```\n启动命令：/usr/bin/mongod\n查看修改配置文件 ： vim /etc/mongod.conf\n\n#### 设置远程访问\n把Mongodb的端口号：27017加入到安全组。（机器内部访问不需要）\n\n### 安装redis\n```\nyum -y install redis\n```\n#### 启动服务\n```\nservice redis start\nservice redis stop\n```\n#### 配置文件\n```\nvi /etc/redis.conf\n```\n#### 设置密码\n找到redis.conf 文件，打开密码设置\n```javascript\n# requirepass foobared\nrequirepass 123   指定密码123\n```\n#### 远程访问\n允许远程访问redis，除需要开放服务器端口号6379，还需将配置文件中的bind 127.0.0.1注释掉\n\n')

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
