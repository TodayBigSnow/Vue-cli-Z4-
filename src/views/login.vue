<template>
  <div id="v-login">
    <!--头部信息-->
    <v-top></v-top>
    <yd-navbar title="登录页"></yd-navbar>
    <!--登录-->
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">手机号：</span>
        <yd-input slot="right" required v-model="form.phone" max="20" placeholder="请输入手机号"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">密码：</span>
        <yd-input slot="right" required type="password" v-model="form.password" placeholder="请输入密码"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <!--按钮-->
    <div>
        <yd-button size="large" type="primary"  @click.native="login">登录</yd-button>
        <yd-button size="large" type="danger" @click.native="register">注册</yd-button>
    </div>
  </div>
</template>

<script type="text/babel">
  import VTop from '../components/Top'
  import user from '../api/user'

  export default {
    data() {
      return {
        form: {
          phone: '15638836385',
          password: ''
        }
      }
    },
    methods:{
      register(){
        this.$router.push({path:"/register"})
      },
      login(){
        user.login(this.form)
      }
    },
    components: {
      VTop
    }
  }
</script>

<style>
  #v-login {
    width: 100%;
    height: 50px;
  }
</style>
