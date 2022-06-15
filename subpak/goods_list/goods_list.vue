<template>
	<view>
			<view class="goods-list">
				<view v-for="(item,index) in goodsList" :key="index" @click="goToDetailOnClick(item)">
					<my-goods :item = 'item'></my-goods>
	            </view>
	        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 是否正在请求数据
				isloading: false,
				//列表数据
				goodsList:[],
				//总页
				total:0,
				//请求参数对象
				quObj:{
					//请求的参数
					query:'',
					//请求id
					cid:'',
					//默认第一页
					pagenum:1,
					//请求条数
					pagesize:10
				}
			}
		},
		
		onLoad(options) {
			
			//如果有参数传过来就接收参数并赋值
			this.quObj.query = options.query || '',
			
			this.quObj.cid = options.cid || '',
			
			this.getgoodsList()
		},
		
		methods:{
		  //获取商品列表数据
		  async	getgoodsList(cb){
			  // ** 打开节流阀
			   this.isloading = true
			    const {data:res} = await uni.$http.get('/goods/search',this.quObj)
			  	//关闭节流阀
				this.isloading = false
				
				// 只要数据请求完毕，就立即按需调用 cb 回调函数
				cb && cb()
				
			  	if(res.meta.status !== 200) return uni.$showMsg
			  	  
			  	this.goodsList = [...this.goodsList, ...res.message.goods]
				
			  	this.total = res.message.total
			},
		  
			
				
			// 点击跳转到商品详情页面
			goToDetailOnClick(item) {
			  uni.navigateTo({
				url: '/subpak/goods_detail/goods_detail?goods_id=' + item.goods_id
			   })
			  
			},
	
			// 触底的事件
			onReachBottom() {
				// 判断是否还有下一页数据
				if (this.quObj.pagenum * this.quObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
				// 判断是否正在请求其它数据，如果是，则不发起额外的请求
				if (this.isloading) return
	
				this.quObj.pagenum += 1
				this.getgoodsList()
			},
	
			// 下拉刷新的事件
			onPullDownRefresh() {
				// 1. 重置关键数据
				this.quObj.pagenum = 1
				this.total = 0
				this.isloading = false
				this.goodsList = []
	
				// 2. 重新发起请求
				this.getgoodsList(() => uni.stopPullDownRefresh())
			}
		
			
			
		},
	}
</script>

<style lang="scss">


</style>
