<template>
  <div>
    <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
      <!--排行列表-->
      <yd-list theme="1" slot="list">
        <!--排行方式  -- 月公里、总公里、月打卡次数  -->
        <yd-tab :callback="setType">
          <!--选项卡选项-->
          <!--总公里排行-->
          <yd-tab-panel label="总公里" tabkey="1"></yd-tab-panel>
          <!--打卡次数排行-->
          <yd-tab-panel label="打卡次数" tabkey="2"></yd-tab-panel>
          <!--平均配速排行-->
          <yd-tab-panel label="平均配速" tabkey="3"></yd-tab-panel>
        </yd-tab>
       <!--内容-->
        <yd-navbar height="60px" fontsize="18px" bgcolor="#fff">
          <div style="margin-left:10px;font-size: 18px;" slot="left">
            <yd-icon name="good"></yd-icon>
            排行榜
          </div>
          <!--是否是 - - 冲锋队-->
          <div style="margin-right:10px;font-size: 18px;" slot="right">
            <yd-checkbox-group v-model="is_striker_arr">
              <yd-checkbox val="1" @change.native="setStriker">只显示冲锋队</yd-checkbox>
            </yd-checkbox-group>
          </div>
        </yd-navbar>
        <!--人员列表-->
        <yd-navbar title="昵称" height="30px" fontsize="18px" bgcolor="#ef4f4f">
          <div style="margin-right:10px;font-size: 18px;" slot="left">姓名</div>
          <div style="margin-right:10px;font-size: 18px;" slot="right" v-show="type==1">总公里数</div>
          <div style="margin-right:10px;font-size: 18px;" slot="right" v-show="type==2">打卡次数</div>
          <div style="margin-right:10px;font-size: 18px;" slot="right" v-show="type==3">平均配速</div>
        </yd-navbar>
        <yd-navbar :title="item.nickname" height="30px" fontsize="18px" bgcolor="#fff" v-for="(item, index) in listDate" :key="index">
          <div style="margin-right:10px;font-size: 18px;" slot="left">
        <span>
          <i class="c4-p4-list01-font01" v-show="index==0">{{index+1}}</i>
          <i class="c4-p4-list01-font02" v-show="index==1">{{index+1}}</i>
          <i class="c4-p4-list01-font03" v-show="index==2">{{index+1}}</i>
          <i class="c4-p4-list01-font04" v-show="index>2">{{index+1}}</i>
       </span>{{item.name}}
            <span v-show="item.is_striker==1" style="color:red;"> 冲锋队成员</span></div>
          <div style="margin-right:10px;font-size: 18px;" slot="right" v-show="type==1">{{item.total_km}}Km</div>
          <div style="margin-right:10px;font-size: 18px;" slot="right" v-show="type==2">{{item.cnt}}次</div>
          <div style="margin-right:10px;font-size: 18px;" slot="right" v-show="type==3">{{item.avg_pace}}</div>
        </yd-navbar>
      </yd-list>
      <!-- 数据全部加载完毕显示 -->
      <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
    </yd-infinitescroll>
  </div>
</template>

<script>
  import clock from "../api/clock"

  export default {
    data() {
      return {
        // 当前选项卡位置,排行类型
        type: 1,
        // 当前页码
        page: 1,
        // 是否只显示冲锋队
        // 多选框组中,存放的不只是一个数据，而是一个数组类型
        is_striker_arr: [],
        is_striker: 0,
        // 总公里数排行信息
        listDate: [],
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
        this.listDate = [];
        this.page = 1;
        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
        this.get();
      },
      // 设置选项卡位置
      setType(label, tabkey) {
        this.type = tabkey;
        // 切换选项卡后，初始化列表
        this.listDate = [];
        this.page = 1;
        // 初始化滚动加载
        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
        this.get();
      },
      // 获取排行列表
      get() {
        // p 为请求参数
        let p = {page: this.page, is_striker: this.is_striker};
        if (this.type == 1) {
          // 获取公里排行列表 ---“默认”
          clock.kmRank(p, data => {
            if (data.length == 0) {
              this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
            }
            else {
              for (let i = 0; i < data.length; i++) {
                this.listDate.push(data[i]);
              }
              this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
            }
          })
        } else if (this.type == 2) {
          // 默认获取打卡次数排行列表
          clock.countRank(p, data => {
            if (data.length == 0) {
              this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
            }
            else {
              for (let i = 0; i < data.length; i++) {
                this.listDate.push(data[i]);
              }
              this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
            }
          })
        } else if (this.type == 3) {
          clock.paceRank(p, data => {
            if (data.length == 0) {
              this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
            }
            else {
              for (let i = 0; i < data.length; i++) {
                this.listDate.push(data[i]);
              }
              this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
            }
          })
        }
      }
    },
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
