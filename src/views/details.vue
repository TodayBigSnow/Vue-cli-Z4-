<template>
  <div id="v-details">
    <!--头部信息-->
    <v-top></v-top>
    <!--时间信息-->
    <div  style="position:relative;width:100%;height:200px;color: red;font-size: 30px;line-height:200px;">
      <img v-if="this.src" :src="this.src" style="width: 100%;height:100%;">
      <img v-else  src="/static/images/index3.png" style="width: 100%;height: 100%;">
    <yd-icon name="time"></yd-icon><span> {{detailList.year}}</span>
    </div>
    <div style=""></div>
    <yd-grids-group :rows="3">
      <yd-grids-item >
        <span slot="text" style="font-size: 30px;"> {{detailList.km}}<p>公里数</p></span>
      </yd-grids-item><yd-grids-item >
        <span slot="text" style="font-size: 30px;"> {{detailList.time}}<p>用 时</p></span>
      </yd-grids-item><yd-grids-item >
        <span slot="text" style="font-size: 30px;"> {{detailList.pace}}<p>配 速</p></span>
      </yd-grids-item>
    </yd-grids-group>
    <!--历史数据-->
    <v-history></v-history>
  </div>
</template>

<script type="text/babel">
  import VTop from '../components/Top'
  import VHistory from '../components/History'
  import clock from '../api/clock'
  import config from '../config/index'

  export default {
    data() {
      return {
        detailList:[],
        src:""
      }
    },
    mounted(){
      let id=this.$route.params.id;
      clock.enterDetaile(id,data => {
        this.detailList = data.result;
        this.src=config.IMG_URL+data.result.imgs[0];
      });
    },
    watch:{
      "$route"(){
        this.$router.go();
      }
    },
    components: {
      VTop,VHistory
    }
  }

</script>

<style>
  #v-details {
    width: 100%;
    height: 50px;
  }
</style>
