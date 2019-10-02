// 引入接口
import http from "./http";
// 提示框
import {Confirm, Alert, Toast, Notify, Loading} from 'vue-ydui/dist/lib.rem/dialog';
import router from "../router";

// 打卡时间
const punchCard = {
  // 添加打卡
  add: (form) => {
    http.post("/clock-in/add", form, data => {
      // 打卡成功
      if (data.status == true) {
        let id=data.result.id;
        Toast({
          mes: data.msg,
          timeout: 600,
          icon: 'success',
          callback: () => {
            router.push({path: "/details/"+id})
          }
        });
      } else {
        Toast({
          mes: data.msg,
          timeout: 600,
          icon: 'error',
        })
      }
    })
  },
  // 获取月打卡记录  -- 根据 params 判断页码
  monthCard:(fun)=>{
  http.get("/clock-in/month", {}, data => {
      fun(data);
  })
},
  // 总公里数排行/
  kmRank:(params,fun)=>{
    http.get("user/km/ranking", params, data => {
      fun(data);
    })
  },
  // 打卡次数排行
  countRank:(params,fun)=>{
    http.get("/user/count/ranking", params, data => {
      fun(data);
    })
  },
  // 平均配速排行
  paceRank:(params,fun)=>{
    http.get("/user/pace/ranking", params, data => {
      fun(data);
    })
  },
  // 单个打卡详情
  enterDetaile:(id,fun)=>{
    http.get("/clock-in/"+id, {}, data => {
      fun(data);
    })
  },
// 今日打卡记录
  today:(params,fun)=> {
      http.get("/user/today", params, data => {
        fun(data);
      })
  }
}
export default punchCard

