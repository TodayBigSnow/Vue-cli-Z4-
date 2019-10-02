<template>
  <div id="v-login">
    <!--头部信息-->
    <v-top></v-top>
    <yd-navbar title="注册页"></yd-navbar>
    <!--注册-->
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">手机号：</span>
        <yd-input slot="right" required v-model="form.phone" max="11" placeholder="请输入注册手机号"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">密码：</span>
        <yd-input slot="right" required type="password" v-model="form.password" max="18" placeholder="请输入密码"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">确认密码：</span>
        <yd-input slot="right" required type="password" v-model="repassword" max="18" placeholder="请确认输入密码"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">姓名：</span>
        <yd-input slot="right" required v-model="form.name" max="8" placeholder="请确认输入真实姓名"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">昵称：</span>
        <yd-input slot="right" required v-model="form.nickname" max="11" placeholder="请设置昵称"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <!--按钮-->
    <div>
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
          phone: '',
          password: '',
          name: "",
          nickname: ""
        },
        repassword: ''
      }
    },
    methods: {
      register() {
        user.register(this.form);
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
