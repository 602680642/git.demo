<template>

  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <button type="primary" class="btn-login" @tap="getUserProfile" >一键登录</button>
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
  

</template>

<script>
	import{ mapMutations,mapState} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed:{
			   
			...mapState('m_user',['pageInfo'])
		},
		methods:{
			
			...mapMutations('m_user',['updateUserInfo','updateToken','getpageInfo']),
			
			//调用登录接口换取永久的token
			async getToken(info){
				
				//获取code对应的值
                 
				 const [err,res] = await uni.login().catch(err => err)
			     
				
				 this.updateToken('nickName')
				 this.navCart()
				 
				if( err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败！')
			
			    //准备参数
				/*const query = {
					
					code:res.code,
					encryptedData:info.encryptedData,
					iv:info.iv,
					rawData:info.rawData,
					signature:info.signature
				}
				const {data:result} = await uni.$http.post('/users/wxlogin',query)
				*/ 
				 
			},
			//获取用户的基本信息
			getUserProfile(){
				
				uni.getUserProfile({
					
					desc:'必须通过后才可以继续使用',
					success : res =>{
						//console.log(res)
						//将用户的信息存储到VueX中
						this.updateUserInfo(res.userInfo)
						//调用token并传参
						this.getToken(res)
					},
					fail : res =>{
						
						uni.$showMsg('您取消了授权！')
					},
					
				})
				
				
			},
			
			//跳转到购物车页面
			navCart(){
				
				//判断是否有getpageInfo方法和跳转方式
				if(this.pageInfo && this.pageInfo.openType === 'switchTab'){
					
					uni.switchTab({
						
						//之前保存的跳转页面
						url:this.pageInfo.from,
						//无论成功或失败都重置为null
	
						complete: () => {
							
							this.getpageInfo(null)
						}
					})
				}
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