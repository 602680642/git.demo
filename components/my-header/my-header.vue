<template>
	<view class="my-search" :style="{'background-color': bgColor}">
		<view class="my-content" :style="{'border-radius':radius + 'px'}" @click="searchitem">
			<uni-icons type="search" size="17"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-header",
		props: {

			bgColor: {

				type: String,

				default: '#09bccc'

			},

			radius: {
				type: Number,

				default: 18

			}


		},
		data() {
			return {

			};
		},
		methods: {

			searchitem() {

				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-search {

		height: 50px;
		padding: 0px 6px;

		//background-color: #09bccc;
		.my-content {

			text-align: center;
			//border: #fff 1px solid;
			background-color: #fff;
			//width: 100%;
			height: 40px;
			line-height: 40px;

			//margin: 0px 3px;
			text {
				//padding: 10px;

				margin-left: 10px;
			}
		}
	}
</style>
