<template>

  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <button type="primary" class="btn-login" @click="login">一键登录</button>
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
  

</template>

<script>
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		methods:{
			
			login(){
				
				uni.switchTab({
					url:'/pages/home/home'
				})
				
			   uni.setStorageSync('token')
			}
		}
	}
</script>

<style lang="scss">
 .login-container {
  // 登录盒子的样式
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;

//   // 绘制登录盒子底部的半椭圆造型
   &::after {
     content: ' ';
     display: block;
     position: absolute;
     width: 100%;
     height: 40px;
     left: 0;
     bottom: 0;
     background-color: white;
     border-radius: 100%;
     transform: translateY(50%);
   }
//   // 登录按钮的样式
  .btn-login {
    width: 75%;
    border-radius: 100px;
    margin: 50px 0;
    background-color: #c00000;
  }

  // 按钮下方提示消息的样式
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>