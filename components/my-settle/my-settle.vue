<template>
	<view class="my-settle-container">
		<!-- 全选区域 -->
		<label class="radio" @click="changeAllState">
			<radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
		</label>

		<!-- 合计区域 -->
		<view class="amount-box">
			合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>

		<!-- 结算按钮 -->
		<view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>

	</view>



</template>

<script>
	import {
		mapGetters,
		mapMutations,
		mapState 
	} from 'vuex'
	export default {
		name: "my-settle",
		data(){
			
			return {
				//定义倒计时秒数
				second:3,
				//定义定时器
				timer:null
			}
		},
		computed: {
			    // token 是用户登录成功之后的 token 字符串
			    ...mapState('m_user', ['token']),
				...mapState('m_cart',['cart']),
			// addstr 是详细的收货地址
			...mapGetters('m_user', ['addstr']),
			
			// 1. 将 total 映射到当前组件中
			...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
			// 2. 是否全选
			isFullCheck() {
				return this.total === this.checkedCount
			}
			
		},
		
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			...mapMutations('m_user',['getpageInfo']),
			// label 的点击事件处理函数
			changeAllState() {
				// 修改购物车中所有商品的选中状态
				// !this.isFullCheck 表示：当前全选按钮的状态取反之后，就是最新的勾选状态
				this.updateAllGoodsState(!this.isFullCheck)
			},
			// 点击了结算按钮
			settlement() {
				// 1. 先判断是否勾选了要结算的商品
				if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')

				// 2. 再判断用户是否选择了收货地址
				if (!this.addstr) return uni.$showMsg('请选择收货地址！')

				// 3. 最后判断用户是否登录了,没有登录就显示倒计时切换到登录页面
				//if (!this.token) return uni.$showMsg('请先登录！')
				if(!this.token) return  this.delay()
				//调用结算方法
				this.payOrder()
			},
			
			async payOrder(){
				
				//创建订单
				//组织订单的信息对象
				const orderInfo = {
					
					//开发建议填写虚拟价格
					order_price:0.1,
					
					consignee_addr:this.addstr,
					
					goods:this.cart.filter(item => item.goods_state).map(item => ({
						
						goods_id:item.goods_id,
						
						goods_num:item.goods_count,
						
						goods_price:item.goods_price
						
					}))
				}
				
				//发起请求创建订单
				//const {data:res} = await uni.$http.post('/my/orders/create',orderInfo)
				
				//if(res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
				
				//发起网络请求获取的的订单编号
				const orderNumber = res.message.order_number
				
				//订单预支付
				
				//发起微信支付 uni.requestPayment()
			},
			//倒计时提示框消息
			showTips(n){
				
				uni.showToast({
					title:'请登录后再结算！'+ n +'秒后自动跳转到登录',
					icon:'none',
					mask:true,
					duration:1500
				})
				
			},
			//倒计时
			delay(){
				//每次调用都从3秒开始，防止变负数
				this.second = 3
				this.showTips(this.second)
				
				this.timer = setInterval(()=>{
					
					this.second--
					
					//如果小于等于零就关闭定时器并跳转到我的页面进行登录
					if(this.second <=0){
						
						clearInterval(this.timer)
						
						uni.switchTab({
							
							url:'/pages/my/my',
							success:()=>{
								
								this.getpageInfo({
									
									openType:'switchTab',
									from:'/pages/cart/cart'
								})
								
							}
						})
						return
					}
					
					this.showTips(this.second)
				},1000)
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		// 将背景色从 cyan 改为 white
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		font-size: 14px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount {
			color: #c00000;
		}

		.btn-settle {
			height: 50px;
			min-width: 100px;
			background-color: #c00000;
			color: white;
			line-height: 50px;
			text-align: center;
			padding: 0 10px;
		}
	}
</style>
