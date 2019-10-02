<!--运动新闻-->
<template>
  <div>
    <div style="background-color: #fff;padding: 20px ;overflow: hidden;margin-top: 10px;" v-for="article in articlelist">
      <div style="width: 40%;float: left;height: 160px;">
        <!--有图片就显示数据库图片-->
        <img v-if="article.icon" :src="article.icon|articleSrc" style="width: 100%;height: 160px;">
        <!--数据库没有对应图片的话，就显示静态文件指定图片-->
        <img v-else src="../../static/images/index2.jpg" style="width: 100%;height: 160px;">
      </div>
      <div style="width: 60%;float: right;height: 160px;padding: 10px 15px;font-size: 18px;">
        <div style="width: 100%;height: 120px;text-align: left;">
          <p v-html="articleTitle(article.title)"></p>
          <p v-html="articleContent(article.content)" style="padding: 20px 0px"></p>
        </div>
        <div style="width: 100%;height: 20px;text-align: right;padding: 10px 0px;">
          <p style="margin-right: 30px;">{{article.created_at}}&nbsp;&nbsp;&nbsp;
            <i class="iconfont icon-yueduliang" style="font-size: 20px;">{{article.views}}</i>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import home from "../api/home"
  import trimHtml from "trim-html"
  // 引入配置文件 -- 配置路由地址
  import config from "../config/index"

  export default {
    data() {
      return {
        articlelist: [],
      }
    },
    // 过滤器
    filters: {
      articleSrc(val) {
        return config.IMG_URL + val;
      },
    },
    methods: {
      articleTitle(content) {
        let trim = trimHtml(content, {
          limit: 20,
          preserveTags: false,
          wordBreak:true
        });
        return trim.html;
      },
      articleContent(content) {
        let trim = trimHtml(content, {
          limit: 30,
          moreLink: "http://www.baidu.com",
          preserveTags: false,
          wordBreak:true
        });
        return trim.html;
      }
    },
    // 生命周期
    mounted() {
      home.getArticle(data => {
        this.articlelist = data;
      });
    },
  }


</script>
