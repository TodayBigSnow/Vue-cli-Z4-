<template>
  <div id="v-TodayRecord">
    <!--头部信息-->
      <v-top></v-top>
    <!--人员列表-->
    <v-today></v-today>
  </div>
</template>

<script type="text/babel">
  import VTop from '../components/Top'
  import VToday from '../components/todyCard'

  export default {
    data() {
      return { }
    },
    components: {
      VTop,VToday
    }
  }
</script>

<style scoped>
  #v-TodayRecord {
    width: 100%;
    height: 50px;
  }
</style>
