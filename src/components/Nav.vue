<!--主页导航栏 --4项 -->
<template>
<yd-grids-group :rows="4" item-height="50px" id="v-nav">
  <yd-grids-item type="link" link="/punchCard">
    <span slot="icon"><i class="iconfont icon-yundong1" style="color:red"></i></span>
    <span slot="text" style="font-size: 20px;">打卡</span>
  </yd-grids-item>
  <yd-grids-item type="link" link="/ranking">
    <span slot="icon"><i class="iconfont icon-paihang" style="color:orangered"></i></span>
    <span slot="text" style="font-size: 20px;">排行</span>
  </yd-grids-item>
  <yd-grids-item type="link" link="/statistics">
    <span slot="icon"><i class="iconfont icon-tongji4" style="color:lawngreen"></i></span>
    <span slot="text" style="font-size: 20px;">统计</span>
  </yd-grids-item>
  <yd-grids-item type="link" link="/todayRecord">
    <span slot="icon"><i class="iconfont icon-icon" style="color:red"></i></span>
    <span slot="text" style="font-size: 20px;">今日打卡</span>
  </yd-grids-item>
</yd-grids-group>
</template>
