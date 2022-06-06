
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store'
//导入网络请求的包
import { $http } from '@escook/request-miniprogram'
//绑定在uni上
uni.$http = $http,
//封装弹框的方法
 uni.$showMsg = function(title='加载失败',duration=400){
	
	 uni.showToast({
		 
		title,
		duration,
		icon:"none",
	})
},
//请求的根路径
$http.baseUrl = 'https://api-ugo-web.itheima.net/api/public/v1'

//配置请求拦截器
$http.beforeRequest = function (option){
	
	uni.showLoading({
		
		tiele:'数据加载中...'
	})
}
//配置响应拦截器

$http.afterRequest = function(){
	
	uni.hideLoading()
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif