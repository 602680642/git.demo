<template>
	<view class="goods-item">
	
			<!-- 商品左侧图片区域 -->
		<view class="goods-item-left" >
			<!-- 存储在购物车中的商品，包含 goods_state 属性，表示商品的勾选状态 -->
			<radio :checked="item.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"
				style="transform: scale(0.8);border-color: black;"></radio>
			<image :src="item.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
					
			<!-- 商品右侧信息区域 -->
		<view class="goods-item-right">
				<!-- 商品标题 -->
			<view class="goods-name">{{item.goods_name}}</view>
				<view class="goods-info-box">
					<!-- 商品价格 -->
					  <view class="goods-price">￥{{item.goods_price | tofixed}}</view>
						<!-- 商品数量 -->
						<uni-number-box :min="1" :value="item.goods_count" v-if="showNum" @change="numChangeHandler" class="clsnum">
						</uni-number-box>
				</view>
			
	    </view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		data() {
			return {
				// 默认的空图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			}
		},
		// 定义 props 属性，用来接收外界传递到当前组件的数据
		props: {
			// 商品的信息对象
			item: {
				type: Object,
				defaul: {},
			},
			// 是否展示图片左侧的 radio
			showRadio: {
				type: Boolean,
				// 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
				default: false,
			},
			// 是否展示价格右侧的 NumberBox 组件
			showNum: {
				type: Boolean,
				default: false,
			},
		},

		//声明 filters 过滤器节点
		filters: {
			// 把数字处理为带两位小数点的数字
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		methods: {
			// radio 组件的点击事件处理函数
			radioClickHandler(item) {
				// 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
				// 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
				this.$emit('radio-change', {
					// 商品的 Id
					goods_id: this.item.goods_id,
					// 商品最新的勾选状态
					goods_state: !this.item.goods_state
				})
			},
			// NumberBox 组件的 change 事件处理函数
			numChangeHandler(val) {
				// 通过 this.$emit() 触发外界通过 @ 绑定的 num-change 事件
				this.$emit('num-change', {
					// 商品的 Id
					goods_id: this.item.goods_id,
					// 商品的最新数量
					goods_count: +val
				})
			}
		}
				
	}
</script>

<style lang="scss">
.goods-item {
		display: flex;
		
		padding: 10px 5px;
		border: 1rpx solid #efefee;
		border-radius: px;
		box-shadow: 1rpx 1rpx 15rpx #efefee;
		margin: 5px;
		background-color: white;

		.goods-item-left {
			margin-right: 5px;
            display: flex;
			justify-content: space-between;
			align-items: center;
			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
			}
            .goods-info-box{
				justify-content: space-between;
				display: flex;
				padding-right: 20rpx;
			.goods-price {
				font-size: 16px;
				color: #c00000;
				
			}
			}
		}
	}
</style>