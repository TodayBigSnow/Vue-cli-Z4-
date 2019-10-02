<template>
  <div id="v-modification">
    <!--头部信息-->
    <v-top></v-top>
    <!--个人信息修改-->
    <yd-navbar title="个人信息修改"></yd-navbar>
    <!--头像修改-->
    <div style="background-color: #fff;width: 100%;padding: 10px 0px">
      <div style="width: 150px;height: 150px;line-height:150px;font-size:30px;margin: auto;">
        <file-upload ref="upload" @input-file="inputFile" :post-action="postAction" style="width: 100%;height: 100%;">
          <img :src="this.form.avatar" style="width: 100%;height: 100%;border-radius:75px;border: 2px solid #ccc">
        </file-upload>
      </div>
    </div>
    <!--输入框-->
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">姓名：</span>
        <yd-input slot="right"  v-model="form.name"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">昵称：</span>
        <yd-input slot="right"  v-model="form.nickname"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" >电话：</span>
        <yd-input slot="right"  v-model="form.phone"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">月目标矢量（公里数）：</span>
        <yd-input slot="right"  v-model="form.target"></yd-input>
      </yd-cell-item>
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">心情语录：</span>
            <yd-textarea slot="right"  maxlength="100" borded v-model="form.introduction"></yd-textarea>
          </yd-cell-item>
        </yd-cell-group>
        <yd-radio-group v-model="form.is_striker" style="padding: 15px 10px;text-align: left;color: #333">
          <span style="font-size: 17px;">是否是冲锋队员：</span>&nbsp;
          <yd-radio val="1">是</yd-radio>
          <yd-radio val="0">否</yd-radio>
        </yd-radio-group>
    </yd-cell-group>
    <yd-button size="large" type="danger" style="width: 30%;margin: auto;" @click.native="saveChange">保存</yd-button>

  </div>
</template>

<script type="text/babel">

  import VTop from '../components/Top'
  // 上传图片插件
  import FileUpload from "vue-upload-component"
  import config from "../config/index"
  import User from "../api/user"
  export default {
    data() {
      return {
        form:{
          name:"",
          nickname:"",
          phone:"",
          target:"",
          introduction:"",
          is_striker:"",
          avatar:""
        },
        // 上传地址
        postAction: config.UPLOAD_URL,
      }
    },
    methods: {
      inputFile(newFile, oldFile) {
        //上传文件 -- rel = upload
        this.$refs.upload.active = true;
        //验证上传完成
        if (newFile && oldFile && !newFile.active && oldFile.active) {
          // 获得结果
          let data = newFile.response;
          if (data.status == "success") {
            // 更换图片地址
            this.src = config.IMG_URL + data.result.path;
            // 将图片地址储存 -- 直接添加上端口名
            this.form.avatar =config.IMG_URL +  data.result.path;
          }
        }
      },
      // 保存用户修改信息
      saveChange(){
        User.saveChange(this.form);
      }
    },
    mounted(){
      User.user(data=>{
        // if(data.is_striker==0){
        //   this.form.is_striker="否";
        // }else{
        //   this.form.is_striker="是";
        // }
        this.form.name=data.name;
        this.form.nickname=data.nickname;
        this.form.phone=data.phone;
        this.form.target=data.target;
        this.form.introduction=data.introduction;
        this.form.is_striker=data.is_striker;
        this.form.avatar=data.avatar;
      })
    },
    components: {
      VTop,FileUpload
    }
  }

</script>

<style scoped>
  #v-modification {
    width: 100%;
    height: 50px;
  }
</style>
