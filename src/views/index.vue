<template>
  <div id="v-index">
    <!--顶部信息-->
    <v-top></v-top>
    
    <!--轮播图-->
    <v-slider></v-slider>
    <!--主页导航栏 --4项 -->
    <v-nav></v-nav>
    <!--运动时间轴-->
    <v-timeline></v-timeline>
    <!--运动新闻-->
    <v-article></v-article>
    <!--底部导航-->
    <v-bottom></v-bottom>
  </div>
</template>

<script>
  import VTop from '../components/Top'
  import VSlider from '../components/Slider'
  import VNav from '../components/Nav'
  import VTimeline from '../components/Vtimeline'
  import VArticle from '../components/Varticle'
  import VBottom from '../components/Bottom'

  export default {
    data() {
      return { }
    },
    components: {
      Vtop, VSlider,VNav,VTimeline,VArticle,VBottom
    }
  }
</script>

<style scoped>
  #v-index {
    width: 100%;
  }

  </style >
