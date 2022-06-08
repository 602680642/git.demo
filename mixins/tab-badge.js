import {mapGetters} from 'vuex'
	export default {
		
		computed:{
			
			...mapGetters('m_cart',['total'])
		},
		
		onShow() {
			this.setTab()
		},
		watch:{
			
			total(){
				
				this.setTab()
			}
			
			
		},
		methods:{
			
			setTab(){
				
				uni.setTabBarBadge({
					index:2,
					text:this.total + ''
				})
			}
		}
	}