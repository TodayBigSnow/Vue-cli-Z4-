<template>
  <yd-navbar title="运动打卡" height="40px" fontsize="22px" bgcolor="#ef4f4f" color="#fff" >
    <router-link to="/" slot="left">
      <yd-icon name="home" size="0.5rem" color="#fff" style="margin-left:10px"></yd-icon>
    </router-link>
    <router-link to="/personalCenter" slot="right">
      <div id="topfont">个人信息</div>
    </router-link>
  </yd-navbar>
</template>

<script>

</script>
<style scoped>
  #topfont{
    margin-right:10px;
    font-size: 18px;
    color: #fff;
  }
  @media screen and (max-width: 330px) {
    #topfont {
      font-size: 14px;
    }
  }
</style>
