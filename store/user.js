export default {
	// 开启命名空间
	namespaced: true,

	// state 数据
	state: () => ({
		// 3. 读取本地的收货地址数据，初始化 address 对象
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		 // 登录成功之后的 token 字符串
		token: uni.getStorageSync('token') || '',
		//定义用户信息数据
		userinfo : JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		pageInfo:null
	}),
   
   getters:{
	   
	   // 收货详细地址的计算属性
	   addstr(state){
	   
	   	if (!state.address.provinceName) return ''
	   
	   	// 拼接 省，市，区，详细地址 的字符串并返回给用户
	   	return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
	   		.detailInfo
	   
	   
	   }
   },
	// 方法
	mutations: {
		// 更新收货地址
		updateAddress(state, address) {
			state.address = address

			// 2. 通过 this.commit() 方法，调用 m_user 模块下的 saveAddressToStorage 方法将 address 对象持久化存储到本地
			this.commit('m_user/saveAddressToStorage')
		},
		// 1. 定义将 address 持久化存储到本地 mutations 方法
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		
		//更新用户基本信息
		updateUserInfo(state,userinfo){
			
			//把外部传过来的用户信息存储到state中
			state.userinfo = userinfo
			//通过 this.commit() 方法，调用 m_user 模块下的 saveUser方法
			this.commit('m_user/saveUser')
		},
		//将用户信息持久化保存到本地存储中
		saveUser(state){
			
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		},
		//更新token
		updateToken(state,value){
            
			state.token = value
			
			this.commit('m_user/saveToken')
		},
		//将token持久化保存到本地存储中
		saveToken(state){
			
			uni.setStorageSync('token',state.token)
		},
		
		//记录之前页面信息
		getpageInfo(state,info){
			console.log(info);
			state.pageInfo = info
		}
	},

	
}
