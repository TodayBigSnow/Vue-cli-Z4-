<!--运动时间轴-->
<template>
<yd-timeline id="v-sportHistory">
  <yd-timeline-item v-for="item in timelinelist"  :key="item.id">
    <p style="font-size: 20px;">{{item.created_at}}</p>
    <p style="font-size: 18px;">{{item.title}}</p>
  </yd-timeline-item>
</yd-timeline>
</template>

<script>
  import home from "../api/home"
  export default {
    data() {
      return {
        timelinelist:[]
      }
    },
    // 生命周期
    mounted() {
      home.getTimeLine(data => {
        this.timelinelist = data;
      });
    },
  }
</script>
