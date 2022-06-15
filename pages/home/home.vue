<template>
	<view>
		<view class="search">
			<my-header @click='getSearch'></my-header>
		</view>
		<view class="clsz">
		<!--轮播图-->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true" class="swiper">
			
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator :url="'/subpak/goods_detail/goods_detail?goods_id='+ item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
				
			</swiper-item>
		</swiper>
		<!--分类列表-->
		<vie class="cateitem">
			<view v-for="(item,index) in catitemsList" :key="index" @click="handlecate(item)">
				
				
					<image :src="item.image_src"></image>
				
			</view>
		</vie>
		
		<!--楼层列表-->
		<view class="floor" v-for="(item,index) in floorList" :key="index">
		<view class="floor_title" >
			
			<image :src="item.floor_title.image_src"></image>
		</view>
		<view class="floor_list">
			
			     <navigator :url="item.product_list[0].url">
			     	<image  :src="item.product_list[0].image_src" 
					 :style="{width:item.product_list[0].image_width +'rpx'}"
					  mode="widthFix"
					></image>
			     </navigator>
				<view class="floor_list2">
					<navigator :url="item2.url"  v-for="(item2,index) in item.product_list" :key="index">
					   <image  :src="item2.image_src"
						mode="widthFix" 
						:style="{width:item2.image_width +'rpx'}"
						v-if="index !==0 "
						></image>
				    </navigator>
				</view>
			
		</view>
		</view>
	</view>
    </view>
</template>

<script>
	import mixinTab from '@/mixins/tab-badge.js'
	export default {
		mixins:[mixinTab],
		data() {
			return {
				//轮播图数据
				swiperList:[],
				//分类列表数据
				catitemsList:[],
				//楼层分类列表数据
				floorList:[]
			}
		},
		onLoad(){
			 
			this.getSwiper()
			this.getCatitems()
			this.getFloor()
		},
		methods: {
			//获取轮播图
		   async getSwiper(){
				
			  const {data:res} = await uni.$http.get('/home/swiperdata')
			    
			    if(res.meta.status !== 200) return uni.$showMsg
				  
				this.swiperList = res.message;
				//uni.$showMsg('数据请求成功')
			},
			
			//获取导航列表
			async getCatitems(){
							
			    const {data:res} = await uni.$http.get('/home/catitems')
				
				if(res.meta.status !== 200) return uni.$showMsg
				  
				this.catitemsList = res.message;
				
			},
			
			//获取楼层分类列表
			
			async getFloor(){
							
			    const {data:res} = await uni.$http.get('/home/floordata')
				
				if(res.meta.status !== 200) return uni.$showMsg
				  
				  //对跳转页面路径进行处理
				  res.message.forEach(floor =>{
					  
					  floor.product_list.forEach(item =>{
						  
						  item.url = '/subpak/goods_list/goods_list?' + item.navigator_url.split('?')[1]
					  })
				  })
				 this.floorList = res.message;
				
			},
			
			handlecate(item){
				
				if(item.name === '分类'){
					
					uni.switchTab({
						
						url:'/pages/cate/cate'
					})
					
				} 
			},
			getSearch(){
				
				uni.navigateTo({
					url:'/subpak/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">

.clsz{
	
	width: 100%;

swiper{
	height: 330rpx;
	
	image,swiper-item,navigator {
		height: 100%;
		width: 100%;
	}
}

.cateitem{
	margin: 20rpx;
	display: flex;
	justify-content: space-around;
	height: 140rpx;
	image{
		width: 140rpx;
		height: 100%;
	}
}
.floor{
	
    margin: 40rpx 0rpx;
	width: 100%;
	.floor_title{
		
		height: 70rpx;
		image{
			width: 100%;
			height: 100%;
		}
		
	}
	.floor_list{
		display: flex;
		padding-left: 10rpx;
		
		.floor_list2{
			
			flex-wrap: wrap;
			display: flex;
			justify-content: space-around;
			
		}
	}
}
}
.search{
	
	position: sticky;
	top: 0;
	z-index: 999;
}
</style>
