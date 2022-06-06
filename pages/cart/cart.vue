<template>
	<view class="cart-container" v-if="cart.length !== 0">
			<!-- 收货地址组件 -->
			<my-address></my-address>
	
			<!-- 购物车商品列表的标题区域 -->
			<view class="cart-title" >
				<!-- 左侧的图标 -->
				<uni-icons type="shop" size="18"></uni-icons>
				<!-- 描述文字 -->
				<text class="cart-title-text">购物车</text>
			</view>
	        <uni-swipe-action>
				<block v-for="(item, index) in cart" :key="index">
					
					<!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过 options 属性来指定操作按钮的配置信息 -->
					<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(item)">
						<my-goods :item="item" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler"
							@num-change="numberChangeHandler"></my-goods>
					    <template v-slot:right>
					    
					    <view class="slot-button" @click="swipeActionClickHandler(item)">
					    
					    <text class="slot-button-text">删除</text>
					    
					    </view>
					    
					    </template>
					
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
			
			<!-- 结算区域 -->
			<my-settle></my-settle>
	</view>	
		
	<!-- 空白购物车区域 -->
	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text class="tip-text">空空如也~</text>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import mixinTab from '@/mixins/tab-badge.js'
	export default {
		mixins:[mixinTab],
		data() {
			return {
				
			}
		},
		computed:{
			
			...mapState('m_cart',['cart'])
			
		},
		
		
		methods:{
			
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
						// 商品的勾选状态发生了变化
						radioChangeHandler(e) {
							this.updateGoodsState(e)
						},
						// 商品的数量发生了变化
						numberChangeHandler(e) {
							this.updateGoodsCount(e)
						},
						// 点击了滑动操作按钮
						swipeActionClickHandler(item) {
							
							this.removeGoodsById(item.goods_id)
							
						}
						
		}
	}
</script>

<style lang="scss">

.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			margin-left: 10px;
		}
	}

	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 200px;

		.empty-img {
			width: 90px;
			height: 90px;
		}

		.tip-text {
			font-size: 12px;
			color: gray;
			margin-top: 15px;
		}
	}
	
	.slot-button {
	
	background-color: #C00000;
	
	display: flex;
	
	width: 150rpx;
	
	justify-content: center;
	
	
	
	align-items: center;
	
	
	
	}
	
	.slot-button-text {  
	
	    color: #f0f0f0;  
	
	    font-size: 14px;  
	
	}
</style>
