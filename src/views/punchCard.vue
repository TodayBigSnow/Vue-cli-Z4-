<template>
  <div id="v-punchCard">
    <!--顶部信息-->
    <v-top></v-top>
    <!--输入框-->
    <yd-cell-group>
      <yd-cell-item arrow>
        <span slot="left">日期：</span>
        <yd-datetime type="datetime" v-model="form.clock_in_at" slot="right"></yd-datetime>
      </yd-cell-item>
      <yd-cell-item arrow>
        <span slot="left">时间：</span>
        <yd-datetime  type="time" v-model="form.time" slot="right"></yd-datetime>
      </yd-cell-item>
      <yd-cell-item arrow>
        <span slot="left">公里：</span>
        <yd-input slot="right" required v-model="form.km" placeholder="0km"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">图片上传：</span>
      </yd-cell-item>
      <div style="width: 130px;height: 130px;line-height:150px;font-size:30px;margin: auto;margin-top: 10px;">
        <file-upload ref="upload" @input-file="inputFile" :post-action="postAction" style="width: 100%;height: 100%;">
          <img :src="src" style="width: 100%;height: 100%;">
        </file-upload>
      </div>
      <yd-button size="large" type="primary" style="margin-top: 20px;" @click.native="add">点此打卡</yd-button>
    </yd-cell-group>
    <!--打卡历史详情-->
    <v-history></v-history>
  </div>
</template>

<script type="text/babel">
  import VTop from '../components/Top'
  import VHistory from '../components/History'
  // 上传图片插件
  import FileUpload from "vue-upload-component"
  import config from "../config/index"
  import punchCard from "../api/clock"
  export default {
    data() {
      return {
        form:{
          clock_in_at:"",
          km:"",
          time:"",
          img:""
        },
        src:"/static/images/putimg.png",
        // 上传地址
        postAction: config.UPLOAD_URL
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
            this.form.img = data.result.path;
          }
        }
      },
      // 打卡
      add(){
        punchCard.add(this.form);
      }
    },
    mounted(){
      // 显示当前时间
      let data=new Date();
      let y=data.getFullYear();
      let m=data.getMonth()+1;
      if(m<10){
        m="0"+m;
      }
      let d=data.getDate();
      if(d<10){
        d="0"+d;
      }
      let h=data.getHours();
      if(h<10){
        h="0"+h;
      }
      let mm=data.getMinutes();
      if(mm<10){
        mm="0"+mm;
      }
      this.form.clock_in_at=y+"-"+m+"-"+d+" "+h+":"+mm;
    },
    components: {
      VTop, VHistory, FileUpload
    }
  }

</script>

<style scoped>
  #v-punchCard {
    width: 100%;
    height: 50px;
  }
</style>
