// 引入接口
import http from "./http"

// home 接口
const home = {
  // 获取幻灯片
  getSlider: (fun) => {
    http.get('/swiper', {}, data => {
        fun(data)
    })
  },
  // 获取时间轴
  getTimeLine: (fun) => {
    http.get('/zipper', {}, data => {
        fun(data)
    })
  },
  // 获取文章
  getArticle: (fun) => {
    http.get('/article', {}, data => {
        fun(data)
    })
  },
}
export default home
