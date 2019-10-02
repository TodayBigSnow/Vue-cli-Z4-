<!--底部导航-->
<template>
  <yd-tabbar>
  <!--<yd-tabbar fixed="true">-->
    <yd-tabbar-item title="首页" link="/" active >
      <yd-icon name="home" slot="icon" size="0.54rem"></yd-icon>
    </yd-tabbar-item>
    <yd-tabbar-item title="购物车" link="#" >
      <yd-icon name="shopcart" slot="icon" size="0.54rem"></yd-icon>
    </yd-tabbar-item>
    <yd-tabbar-item title="个人中心" link="/personalCenter">
      <yd-icon name="ucenter-outline" slot="icon" size="0.54rem"></yd-icon>
    </yd-tabbar-item>
  </yd-tabbar>
</template>
<style scoped>
  #bottom{
    width: 60% !important;
  }
</style>
