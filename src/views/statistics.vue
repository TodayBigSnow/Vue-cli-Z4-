<template>

  <div id="v-statistics">
    <!--头部信息-->
    <v-top></v-top>
    <!--选项-->
    <yd-grids-group :rows="3">
      <yd-grids-item @click.native="dateType(1)">
        <img slot="icon" src="http://static.ydcss.com/ydui/img/logo.png">
        <span slot="text">总公里数</span>
      </yd-grids-item>
      <yd-grids-item @click.native="dateType(2)">
        <yd-icon slot="icon" name="home" color="#FF685D"></yd-icon>
        <span slot="text">打卡次数</span>
      </yd-grids-item>
      <yd-grids-item @click.native="dateType(3)">
        <yd-icon slot="icon" name="home" color="#FF685D"></yd-icon>
        <span slot="text">平均配速</span>
      </yd-grids-item>
    </yd-grids-group>
    <!--周、月 统计数据切换-->
    <yd-tab :callback="setType">
      <yd-tab-panel label="周" tabkey="1"></yd-tab-panel>
      <yd-tab-panel label="月" tabkey="2"></yd-tab-panel>
    </yd-tab>
    <yd-navbar height="30px" fontsize="18px" bgcolor="#ef4f00" style="margin-top: 10px;">
      <div style="margin-left:10px;font-size: 20px;color: #fff;" slot="left">统计信息</div>
      <div v-show="type==1&&datesort==1" style="margin-right:10px;font-size: 18px;color: #fff;" slot="right">总公里数/(周)</div>
      <div v-show="type==1&&datesort==2" style="margin-right:10px;font-size: 18px;color: #fff;" slot="right">打卡次数/(周)</div>
      <div v-show="type==1&&datesort==3" style="margin-right:10px;font-size: 18px;color: #fff;" slot="right">平均配速/(周)</div>
      <div v-show="type==2&&datesort==1" style="margin-right:10px;font-size: 18px;color: #fff;" slot="right">总公里数/(月)</div>
      <div v-show="type==2&&datesort==2"style="margin-right:10px;font-size: 18px;color: #fff;" slot="right">打卡次数/(月)</div>
      <div v-show="type==2&&datesort==3" style="margin-right:10px;font-size: 18px;color: #fff;" slot="right">平均配速/(月)</div>
    </yd-navbar>
    <yd-navbar height="30px" fontsize="18px" bgcolor="#fff">
      <!--是否是 - - 冲锋队-->
      <div style="margin-right:10px;font-size: 18px;" slot="right">
        <yd-checkbox-group v-model="is_striker_arr">
          <yd-checkbox val="1" @change.native="setStriker">只显示冲锋队</yd-checkbox>
        </yd-checkbox-group>
      </div>
    </yd-navbar>
    <!--数据报表-->
    <div id="container" style="height:500px;width: 100%;background-color: #fff;"></div>
  </div>

</template>

<script type="text/babel">
  import VTop from '../components/Top'
  // 引入报表
  import * as echarts from 'echarts';
  import state from "../api/stat";

  export default {
    data() {
      return {
        // 选项卡切换
        type: 1,
        // y轴数据分类
        datesort:1,
        // result: {},
        // y轴
        stateDate:[],
        // x轴
        category:[],
      // 是否只显示冲锋队
      // 多选框组中,存放的不只是一个数据，而是一个数组类型
        is_striker_arr: [],
        is_striker: 0,
      }
    },
    methods: {
      /**
       * 设置冲锋队
       */
      setStriker() {
        if (this.is_striker_arr.length >= 1) {
          this.is_striker = 0;
        } else {
          this.is_striker = 1;
        }
        this.get();
      },
      // 设置选项卡位置
      setType(label, tabkey) {
        this.type = tabkey;
        this.get();
      },
      dateType(val){
        this.datesort=val;
        this.get()
      },
      get() {
        // striker 为请求参数 -- 是否是冲锋队
        let striker = {is_striker: this.is_striker};
        // 如果type==1 --周报表/
        if (this.type == 1) {
          state.weekState(striker,data => {
            if (data.status == true) {
              if(this.datesort==1){
                this.stateDate=data.result.km;
                this.category=data.result.date;
                this.createChart();
              }
              if(this.datesort==2){
                this.stateDate=data.result.cnt;
                this.category=data.result.date;
                this.createChart();
              }
              if(this.datesort==3){
                this.stateDate=data.result.pace;
                this.category=data.result.date;
                this.createChart();
              }
            }
          })
        }
        // 如果type==2 --月报表
        if (this.type == 2) {
          state.monthState(striker,data => {
            if (data.status == true) {

              if(this.datesort==1){
                this.stateDate=data.result.km;
                this.category=data.result.date;
                this.createChart();
              }
              if(this.datesort==2){
                this.stateDate=data.result.cnt;
                this.category=data.result.date;
                this.createChart();
              }
              if(this.datesort==3){
                this.stateDate=data.result.pace;
                this.category=data.result.date;
                this.createChart();
              }
            }
          })
        }
      },
      // 创建报表
      createChart() {
        var dom = document.getElementById("container");
        var myChart = echarts.init(dom);
        let option = {
          xAxis: {
            type: 'category',
            // x轴
            data: this.category
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            // y轴
            data:this.stateDate,
            type: 'line'
          }]
        };
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
      }
    },
    mounted() {
      this.get();

    },
    components: {
      VTop
    }
  }
</script>

<style scoped>
  #v-statistics {
    width: 100%;
  }
</style>
