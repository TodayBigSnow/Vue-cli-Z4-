// 引入接口
import axios from 'axios';
// 引入配置文件 -- 配置路由地址
import config from "../config/index"
// 引入路由
import router from '../router/index';
// 在路由前面 加上基础地址
axios.defaults.baseURL = config.API_URL;
// 提示框
import {Confirm, Alert, Toast, Notify, Loading} from 'vue-ydui/dist/lib.rem/dialog';

// 拦截器 -- 请求前拦截
axios.interceptors.request.use(config => {
  Loading.open('很快加载好了');
  // 取本地存储的token数据
  let token = localStorage.getItem("token");
  if(token){
    config.url += "?token=" + token;
  }
  return config;
}, error => {
  return Promise.reject(error)
})
// 拦截器 -- 返回数据后的拦截
axios.interceptors.response.use(response => {
  Loading.close();
    // 判断是否登录超时data.code = 401 (当token不存在的时候，在会有code)
    if (typeof response.data.code != "undefined"){
      if(response.data.code==401){
        router.push({path:"login"});
      }
  }
  return response;
  // Loading.close();
}, error => {
  console.log(error)
  return Promise.reject(error)
})

const http = {
  // get请求
  get: (url, params, fun) => {
    axios.get(url, {params: params}).then(res => {
      fun(res.data);
    }).catch(err => {
      fun(null);
      Toast({
        mes: "网络请求异常！请检查网络连接",
        timeout: 400,
        icon: 'error',
      });
    })
  },
  // post请求
  post: (url, params, fun) => {
    axios.post(url, params).then(res => {
      fun(res.data);
    }).catch(err => {
      fun(null);
      Toast({
        mes: "网络请求异常！请检查网络连接",
        timeout: 400,
        icon: 'error',
      });
    })
  }
}
export default http
