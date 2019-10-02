import Vue from 'vue'
import Router from 'vue-router'
import index from "../views/index"
import punchCard from "../views/punchCard"
import ranking from "../views/ranking"
import statistics from "../views/statistics"
import personalCenter from "../views/personalCenter"
import modification from "../views/modification"
import details from "../views/details"
import todayRecord from "../views/todayRecord"
import login from "../views/login"
import register from "../views/register"

Vue.use(Router)
// 加载路由之前进行token验证
const router=new Router({
// export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      name: 'index',
      component: index
    },
    // 打卡
    {
      path: '/punchCard',
      name: 'punchCard',
      component: punchCard
    },
    // 排行
    {
      path: '/ranking',
      name: 'ranking',
      component: ranking
    },
    // 统计
    {
      path: '/statistics',
      name: 'statistics',
      component: statistics
    },
    // 个人中心
    {
      path: '/personalCenter',
      name: 'personalCenter',
      component: personalCenter
    },// 个人信息修改
    {
      path: '/modification',
      name: 'modification',
      component: modification
    },
    // 详情页
    {
      path: '/details/:id',
      name: 'details',
      component: details
    },
    // 今日打卡
    {
      path: '/todayRecord',
      name: 'todayRecord',
      component: todayRecord
    },
    // 登录页
    {
      path: '/login',
      name: 'login',
      component: login
    },
    // 注册页
    {
      path: '/register',
      name: 'register',
      component: register
    },
  ]
})
// 验证是否已登录, -- 全局认证
// 生命周期钩子函数
router.beforeEach((to,form,next)=>{
  let token=localStorage.getItem("token");
  // 不是登录页，且token不存在，就跳转至登录页
  if(to.path !="/login"){
    if(token==null){
      next({ path:"/login" })
    }
  }
  // 是登录页，如果token存在就跳转到首页
  else {
    if(token!=null){
      next({path:"/"})
    }
  }
  next();
})
export default  router;
