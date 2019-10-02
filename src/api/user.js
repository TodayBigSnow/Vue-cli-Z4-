// 引入接口
import http from "./http"
// 引入路由
import router from '../router/index';
// 提示框
import {Confirm, Alert, Toast, Notify, Loading} from 'vue-ydui/dist/lib.rem/dialog';

const user = {
  // 登录验证
  login: (params) => {
    http.post('/login', params ,data => {
      if(data==null){
        return;
      }
      if (data.status == true) {
          Toast({
            mes: data.msg,
            timeout: 800,
            icon: 'success',
            callback: () => {
              router.push({path: "/"})
            }
          });
        localStorage.setItem("token",data.data.token)
      } else {
        Toast({
          mes: data.msg,
          timeout: 800,
          icon: 'error',
        });
      }
    })
  },
  // 注册验证
  register: (params) => {
    http.post('/register' ,params ,data => {
      if (data.status == true) {
          Loading.close();
          Toast({
            mes: data.msg,
            timeout: 800,
            icon: 'success',
            callback: () => {
              router.push({path: "/login"})
            }
          });
      } else {
        Toast({
          mes: data.msg,
          timeout: 800,
          icon: 'error',
        });
      }
    })
  },
  // 获取用户信息
  user:(fun)=>{
    http.get('/user', {}, data => {
      fun(data)
    })
  },
  // 更新用户信息
  saveChange: (params) => {
    http.post('/user/save' ,params ,data => {
      if (data.status == true) {
        Loading.close();
        Toast({
          mes: data.msg,
          timeout: 800,
          icon: 'success',
          callback: () => {
            router.push({path: "/personalCenter"})
          }
        });
      } else {
        Toast({
          mes: data.msg,
          timeout: 800,
          icon: 'error',
        });
      }
    })
  },

}

export default user
