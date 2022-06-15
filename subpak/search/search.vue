<template>
	<view>
	    <!-- 使用uni的搜索组件 -->
		<view class="search-bar">
			<uni-search-bar @input="input" :radius="100" cancelButton="none" :focus="true"></uni-search-bar>
		</view>
	    <!-- 搜索建议列表 -->
		
		<view class="sugg-list" v-if="kw.length !== 0 ">
			<view class="sugg-item" v-for="(item, index) in searchResults" :key="index"  @click="goToDetailOnClick(item.goods_id)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
	    
	    		<!-- 搜索历史 -->
	    		<view class="history-box" v-else>
	    			<!-- 标题区域 -->
	    			<view class="history-title" v-if="historys.length !==0">
	    				<text>搜索历史</text>
	    				<uni-icons type="trash" size="17" @click="cleanHistoryOnClick"></uni-icons>
	    			</view>
	    			<!-- 列表区域 -->
	    			<view class="history-list">
	    				<uni-tag :text="item" v-for="(item, index) in historys" :key="index" @click="goToGoodsListOnClick(item)"></uni-tag>
	    			</view>
	    		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				//输入框的值
				kw:'',
				//定时器（用来防抖）
				timer : null,
				// 搜索结果列表
				searchResults: [],
				// 搜索关键词的历史记录
				historyList: []
			};
		},
		onLoad() {
					this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
				},
		methods:{
			
			input(val){
			
				clearTimeout(this.timer)
				
				this.timer = setTimeout(()=>{
					
					this.kw = val
					
					// 根据关键词，查询搜索建议列表
				    this.getSearchList()
				},500)
			},
			
			//获取搜索结果列表数据网络请求
			async getSearchList() {
				
				//如果输入为空就把结果设置为空
				if (this.kw.trim() === '') {
					this.searchResults = []
					return
				}
				//发起网络请求，获取搜索结果列表
				const {
					data: res
				} = await uni.$http.get('/goods/qsearch', {
					query: this.kw
				})

				if (res.meta.status !== 200) return uni.$showMsg

				this.searchResults = res.message
				
				// 1. 查询到搜索建议之后，调用 saveSearchHistory() 方法保存搜索关键词
				this.saveSearchHistory()
			},

			// 2. 保存搜索关键词的方法
			saveSearchHistory() {
				// 2.1 直接把搜索关键词 push 到 historyList 数组中容易造成重复和顺序不对
				// this.historyList.push(this.kw)

				// 1. 调用set方法去重
				const set = new Set(this.historyList)
				// 2. 调用 Set 对象的 delete 方法，移除对应的元素
				set.delete(this.kw)
				// 3. 调用 Set 对象的 add 方法，向 Set 中添加元素
				set.add(this.kw)
				// 4. 将 Set 对象转化为 Array 数组
				this.historyList = Array.from(set)
				// 5.调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},

			// 跳转到商品详情页面
			goToDetailOnClick(goods_id) {
				uni.navigateTo({
					// 指定详情页面的 URL 地址，并传递 goods_id 参数
					url: '/subpak/goods_detail/goods_detail?goods_id=' + goods_id
				})
			},

			// 清空搜索历史记录
			cleanHistoryOnClick() {
				// 清空 data 中保存的搜索历史
				this.historyList = []
				// 清空本地存储中记录的搜索历史
				uni.removeStorage({
					key:'kw'
				})
			},
			
			// 点击跳转到商品列表页面
			goToGoodsListOnClick(kw) {
			  uni.navigateTo({
				url: '/subpak/goods_list/goods_list?query=' + kw
			  })
			}
				
		},
		computed:{
			//定义一个计算属性 historys，将 historyList 数组 reverse 反转之后，就是此计算属性的值
			historys() {
				// 注意：由于数组是引用类型，所以不要直接基于原数组调用 reverse 方法，以免修改原数组
				// 而是应该新建一个内存无关的数组，再进行 reverse 反转
				return [...this.historyList].reverse()
			},
		}
		
	}
</script>

<style lang="scss">
	
  .search-bar{
	  background-color: #09bccc;
	  position: sticky;
	  top: 0;
	  z-index: 999;
  }
  
  .sugg-list {
  		padding: 0 5px;
  
  		.sugg-item {
  			font-size: 12px;
  			padding: 13px 0;
  			border-bottom: 1px solid #efefef;
  			display: flex;
  			align-items: center;
  			justify-content: space-between;
  
  			.goods-name {
  				// 文字不允许换行（单行文本）
  				white-space: nowrap;
  				// 溢出部分隐藏
  				overflow: hidden;
  				// 文本溢出后，使用 ... 代替
  				text-overflow: ellipsis;
  				margin-right: 3px;
  			}
  		}
  	}
  
  	.history-box {
  		padding: 0 5px;
  
  		.history-title {
  			display: flex;
  			justify-content: space-between;
  			align-items: center;
  			height: 40px;
  			font-size: 13px;
  			border-bottom: 1px solid #efefef;
  		}
  
  		.history-list {
  			display: flex;
  			flex-wrap: wrap;
  			margin-top: 1px;
  
  			.uni-tag {
  				color: black;
  				background-color: #f0f0f0;
  				border-color: #f0f0f0;
  				margin-top: 5px;
  				margin-right: 5px;
  			}
  		}
	}
</style>
