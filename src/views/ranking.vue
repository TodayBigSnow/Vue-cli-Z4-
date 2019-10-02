<template>
  <div id="v-punchCard">
    <!--头部信息-->
    <v-top></v-top>
    <!--排行信息-->
    <v-rank></v-rank>
  </div>
</template>

<script type="text/babel">
  import VTop from '../components/Top'
  import VRank from '../components/rank'

  export default {
    data() {
      return { }
    },
    components: {
      VTop,VRank
    }
  }
</script>

<style scoped>
  #v-punchCard {
    width: 100%;
    height: 50px;
  }
</style>
