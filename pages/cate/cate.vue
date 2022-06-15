<template>
	<view>
		<my-header @click = "toSearch"></my-header>
		<view class="clscroll">
		
		<scroll-view scroll-y="true" :style="{height:wh + 'px'}" class="clsl" :scroll-top="scrollTop">
			
			<block v-for="(item,index) in categoriesList" :key="index" >
				<view :class= "['clsc',index === active ? 'active' : '']" @click="clickCls(index)">{{item.cat_name}}</view>
			</block>
			
		</scroll-view>
		<scroll-view scroll-y="true" :style="{height:wh + 'px'}" class="clsr">
			<view v-for="(item,index) in catesecond" :key="index">
				<view  class="second-item">/{{item.cat_name}}/</view>
				
				<view class="third-item">
					<view   class="subitem-third"  v-for="(subitem,index) in item.children" :key="index" @click="clickto(subitem)">
						<image  class="img" :src=" defaultPic"></image>
						<text>{{subitem.cat_name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
    </view>
</template>

<script>
	import mixinTab from '@/mixins/tab-badge.js'
	export default {
		mixins:[mixinTab],
		data() {
			return {
				//激活数据
				active:0,
				//屏幕可用高度
				wh:0,
				//一级分类数据
				categoriesList:[],
				//子类分类数据
				catesecond:[],
				//离顶部的距离
				scrollTop:0,
				// 默认的空图片
				defaultPic: 'http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000611256555_2_200x200.jpg'
			};
		},
		onLoad() {
			const getsys = uni.getSystemInfoSync()
			this.wh = getsys.windowHeight - 50
			this.getCate()
			
		},
		methods:{
			
			//获取分类数据
			async getCate(){
							
			    const {data:res} = await uni.$http.get('/categories')
				
				if(res.meta.status !== 200) return uni.$showMsg
				  
				this.categoriesList = res.message;
				//获取子项数据
				this.catesecond = res.message[0].children
			},
			clickCls(index){
				//根据传过来的索引添加样式
				this.active = index
				//给子项重新赋值
				this.catesecond = this.categoriesList[index].children
				this.scrollTop = this.scrollTop ? 0 : 1
			},
			clickto(subitem){
				
				uni.navigateTo({
					url:'/subpak/goods_list/goods_list?cid=' + subitem.cat_id
				})
			},
			toSearch(){
				
				uni.navigateTo({
					url:'/subpak/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.clscroll{
	
	display: flex;
	.clsl{
		
		width: 100px;
		text-align: center;
		.clsc{
			
			padding: 35rpx;
			font-size: 23rpx;
			
		}
		& .active{
			
			background-color: #fff;
			position: relative;
		
		
		&::before{
			
			content: '';
			display: block;
			background-color: #c00;
			width: 3px;
			height: 40px;
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
		}
		}
	}

.clsr{
	//width: 60%;
    
	.second-item{
		
		font-size: 12px;
		font-weight: bold;
		padding: 15px 0;
		text-align: center;
	}	
	.third-item{
			//background-color: antiquewhite;
			display: flex;
			
			flex-wrap: wrap;
			.subitem-third{
				//display: flex;
				padding-left: 16rpx;
				flex-direction: column;
				width: 180rpx;
				.img{
					//background-color: #c00;
					width: 160rpx;
					height: 160rpx;
					//width: 100%;
					
				}
				
			}
		
	}
  }
}
</style>
