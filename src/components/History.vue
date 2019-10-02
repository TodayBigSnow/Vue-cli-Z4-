<template>
  <div>
    <!--打卡历史详情-->
    <yd-navbar title="打卡历史详情" height="30px" fontsize="20px" bgcolor="#ef4f4f" color="#fff">
    </yd-navbar>
    <div v-for="n in monthCard">
    <!--历史日期-->
    <yd-navbar :title="n.km" height="30px" fontsize="18px" bgcolor="#ddd">
      <div style="margin-right:10px;font-size: 18px;" slot="left">
        <i class="iconfont icon-msnui-bar-chart"></i>{{n.month_name}}
      </div>
      <div style="margin-right:10px;font-size: 18px;" slot="right">
        <i class="iconfont icon-shijian"></i>{{n.time}}
      </div>
    </yd-navbar>
    <!--历史数据-->
    <div v-for="list in n.clockList" :key="list.id">
      <yd-navbar :title="list.km" height="30px" fontsize="18px">
        <div style="margin-right:10px;font-size: 18px;" slot="left">{{list.created_at}}</div>
        <span slot="right">
          <span>{{list.time}}</span> &nbsp;&nbsp;
          <!--点击获取详情-->
          <yd-navbar-next-icon style="margin-right:10px;" @click.native="enterDetaile(list.id)"></yd-navbar-next-icon>
        </span>
      </yd-navbar>
    </div>
  </div>
  </div>
</template>

<script>
  import clock from "../api/clock";

  export default {
    data() {
      return {
        // 全部的月打卡记录数据
        monthCard: []
      }
    },
    methods: {
      enterDetaile(id) {
        this.$router.push("/details/" + id);
      }
    },
    mounted() {
      clock.monthCard(data => {
        // 历史记录(全部的数据) -- data
        this.monthCard = data
      })
    }
  }
</script>

