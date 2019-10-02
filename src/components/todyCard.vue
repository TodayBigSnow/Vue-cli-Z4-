<template>
  <div>
    <!--是否是 - - 冲锋队-->
    <yd-navbar  height="60px" fontsize="18px" bgcolor="#fff" >
      <div style="margin-left:10px;font-size: 18px;" slot="left">
        <yd-icon name="clock"></yd-icon> 今日打卡记录</div>
  <div style="margin-right:10px;font-size: 18px;" slot="right">
    <yd-checkbox-group v-model="is_striker_arr">
      <yd-checkbox val="1" @change.native="setStriker">只显示冲锋队</yd-checkbox>
    </yd-checkbox-group>
  </div>
    </yd-navbar>
  <!--人员列表-->
  <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
    <yd-list theme="1" slot="list">
    <!--排行列表-->
      <yd-navbar title="昵称" height="30px" fontsize="18px" bgcolor="#ef4f4f">
        <div style="margin-right:10px;font-size: 18px;" slot="left">姓名</div>
        <div style="margin-right:10px;font-size: 18px;" slot="right">打卡时间</div>
      </yd-navbar>
      <yd-navbar :title="item.nickname" height="30px" fontsize="18px" bgcolor="#fff" v-for="(item,index) in todyList" :key="index">
        <div style="margin-right:10px;font-size: 18px;" slot="left">
             <span>
          <i class="c4-p4-list01-font01" v-show="index==0">{{index+1}}</i>
          <i class="c4-p4-list01-font02" v-show="index==1">{{index+1}}</i>
          <i class="c4-p4-list01-font03" v-show="index==2">{{index+1}}</i>
          <i class="c4-p4-list01-font04" v-show="index>2">{{index+1}}</i>
       </span>
          {{item.name}}
        <span v-show="item.is_striker==1" style="color: orangered">冲锋队</span>
        </div>
        <div style="margin-right:10px;font-size: 18px;" slot="right">{{item.created_at}}</div>
      </yd-navbar>
    </yd-list>
    <!-- 数据全部加载完毕显示 -->
    <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
  </yd-infinitescroll>
  </div>
</template>

<script>
  import clock from "../api/clock";

  export default {
    data() {
      return {
        // 当前页码
        page: 1,
        // 是否只显示冲锋队
        // 多选框组中,存放的不只是一个数据，而是一个数组类型
        is_striker_arr: [],
        is_striker: 0,
        // 总公里数排行信息
        todyList: [],
      }
    },
    methods: {
      /**
       * 滚动加载
       */
      loadList() {
        // 滚动加载一次页面,page加一
        this.page += 1;
        this.get();
      },
      /**
       * 设置冲锋队
       */
      setStriker() {
        if (this.is_striker_arr.length >= 1) {
          this.is_striker = 0;
        } else {
          this.is_striker = 1;
        }
        this.todyList = [];
        this.page = 1;
        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
        this.get();
      },
      get() {
        // p 为请求参数
        let p = {page: this.page, is_striker: this.is_striker};
        clock.today(p, data => {
          // 今日打卡记录(全部的数据) -- data
          if (data.length == 0) {
            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
          }
          else {
            for (let i = 0; i < data.length; i++) {
              this.todyList.push(data[i]);
            }
            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
          }
        })
      }
    },
    // 生命周期
    mounted() {
      // 生命周期 -- 执行方法获取列表
      this.get();
    }
  }
</script>
<style scoped>
  .c4-p4-list01-font01 {
    font-weight: bold;
    color: #bd3f38
  }

  .c4-p4-list01-font02 {
    font-weight: bold;
    color: #ea6464
  }

  .c4-p4-list01-font03 {
    font-weight: bold;
    color: #eb8619
  }
</style>
