<template>
  <yd-slider autoplay="3000" id="v-lunbo">
    <yd-slider-item v-for="item in list"  :key="item.id">
      <img :src="item.src|src">
    </yd-slider-item>
  </yd-slider>
</template>

<script type="text/babel">

  import home from "../api/home"

  export default {
    data() {
      return {
        list: []
      }
    },
    // 过滤器
    filters: {
      src(val) {
        return "http://123.57.75.120:9002/uploads" + val;
      }
    },
    // 生命周期
    mounted() {
      home.getSlider(data => {
        this.list = data;
      });
    }
  }

</script>
<style scoped>

  #v-lunbo {
    width: 100%;
    height: 300px;
  }

  #v-lunbo img {
    width: 100%;
    height: 300px;
  }

</style>
