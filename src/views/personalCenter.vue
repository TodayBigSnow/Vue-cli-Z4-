<template>
  <div id="v-personalCenter">
    <!--头部信息-->
    <v-top></v-top>
    <!--个人信息-->
    <div style="background-image:url('/static/images/background.jpg');background-size:100%,100%;width: 100%;">
      <div style="height: 50px;line-height: 50px;text-align: right;">
        <router-link to="modification">
          <yd-icon name="compose" style="margin-right: 20px;color:#fff; font-size: 17px;" ></yd-icon>
        </router-link>
      </div>
      <div>
        <div style="height: 120px;width: 120px;margin: auto">
            <img :src="this.list.avatar" style="width: 100%;height: 100%;border: 2px solid #fff;border-radius: 60px;">
        </div>
        <p style="font-size: 25px;color: #fff;padding: 10px 0px;">昵称</p>
      </div>
      <div style="padding: 10px 0px;">
        <div style="width:30%;margin: auto;font-size: 20px;color: #fff">
        <p>{{this.list.introduction}}</p>
        </div>
      </div>
      <div style="padding: 10px">
        <yd-button v-if="is_striker=='是'" size="small" type="warning" shape="circle" style="width: 20%;margin: auto">冲锋队队员</yd-button>
      </div>
    </div>
    <!--输入框-->
    <yd-cell-group>
      <yd-cell-item >
        <span slot="left">姓名：</span>
        <yd-input v-bind:readonly="true" slot="right" v-model="list.name"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">昵称：</span>
        <yd-input v-bind:readonly="true" slot="right" v-model="list.nickname"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">电话：</span>
        <yd-input  v-bind:readonly="true" slot="right" v-model="list.phone"></yd-input>
      </yd-cell-item>
     <yd-cell-item>
      <span slot="left">月目标矢量（公里数）：</span>
      <yd-input  v-bind:readonly="true" slot="right"  v-model="list.target"></yd-input>
    </yd-cell-item><yd-cell-item>
      <span slot="left">心情语录：</span>
      <yd-input  v-bind:readonly="true" slot="right"  v-model="list.introduction"></yd-input>
    </yd-cell-item><yd-cell-item>
      <span slot="left">是否是冲锋队员：</span>
      <yd-input  v-bind:readonly="true" slot="right" v-model="is_striker"></yd-input>
    </yd-cell-item>
    </yd-cell-group>
  </div>
</template>

<script type="text/babel">
  import VTop from '../components/Top'
  import User from "../api/user"

  export default {
    data() {
      return {
        // 用户信息
        list:{},
        is_striker:"",
      }
    },
    mounted(){
      User.user(data=>{
        if(data.is_striker==0){
          this.is_striker="否";
        }else{
          this.is_striker="是";
        }
        this.list = data;
      })
    },
    components: {
      VTop
    }
  }
</script>

<style scoped>
  #v-personalCenter {
    width: 100%;
    height: 50px;
  }
</style>
