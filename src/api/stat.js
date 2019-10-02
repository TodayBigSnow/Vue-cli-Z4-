import http from "./http";

const state={
  // 获取  周报表数据
  weekState:(params,fun)=>{
    http.get('/stat/week', params, data => {
      fun(data);
    })
  },
  // 获取  月报表数据
  monthState:(params,fun)=>{
    http.get('/stat/month', params, data => {
      fun(data);
    })
  },
}
export default state;
