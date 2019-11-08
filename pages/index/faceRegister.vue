<template>
	<view>
		<web-view :src="url" @message="getMessage"></web-view>
	</view>
</template>

<script>
	var pages = null;
	import {
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0,
				btnLoading: false,
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				url: '/hybrid/html/local.html'
			};
		},
		onLoad(options) {
			let {screenWidth, screenHeight, pixelRatio} = this.globalInfo.systemInfo;
				this.url = this.url + '?p=faceRegister'
				// this.globalInfo.test = 11111;
				// try {
				//     uni.setStorageSync('web_param', '?p=3');
				// } catch (e) {
				//     console.log('set web_param error');
				// }
				 //+ `?screenWidth=${screenWidth}&screenHeight=${screenHeight}&pixelRatio=${pixelRatio}`;
			// this.getMessage('999');
		},
		
		mounted(){
			pages = getCurrentPages();
		},
		
		// computed: {
		// 	...mapState(['canPunchStatus')
		// },
		methods: {
			...mapMutations(['login', 'changePunchStauts']),
			getMessage(data) {
				let paramData = data.target.data[0];
				let imgData = paramData && paramData.photo;
				let name = paramData && paramData.name;
				let password = paramData && paramData.password;
				
				// console.log(imgData);
				// console.log(name);
				// console.log(password);
				
				
				// let imgData = data;
				// console.log(imgData);
				//获得拍照之后的base64数据
				if (imgData) {
					
					var prevPage = pages[pages.length - 2];
					// #ifdef H5
					prevPage.showTip('照片处理中...')
					// #endif
					// #ifndef H5
					prevPage.$vm.showTip('照片处理中...')
					// #endif
					
					//发请求
					//fixme
					const query =
						`mutation faceRegister{
					      faceRegister(img:"${imgData}", name:"${name}", password:"${password}"){
					        code
					        message
					        data{
					              status
					              tokenInfo{
					                accessToken
					                expiresIn
					              }
					              userInfoData{
					                 userId
					                 username
					                 mobile
					                 email
					              }
					            }
								  }
								}`;
						
					this.$api.request(query, {}, (data, message) => {
						var pages = getCurrentPages();
						var prevPage = pages[pages.length - 1];
						console.log(pages.length);
						console.log(prevPage.$vm.hideTip);
						// #ifdef H5
						prevPage.hideTip()
						// #endif
						// #ifndef H5
						prevPage.$vm.hideTip()
						// #endif
						
						if(data.status == 1){
							this.login({nickname: data.userInfoData.username, ...data.userInfoData, ...data.tokenInfo});
						}else{
							
							setTimeout(() => {
								
								// #ifdef H5
								prevPage.showTip(message)
								// #endif
								// #ifndef H5
								prevPage.$vm.showTip(message)
								// #endif
								
							}, 2000);
						}
						// this.changePunchStauts({canPunchStatus: true});
						// uni.navigateBack();
						// this.$util.alert('恭喜您' + data.userInfoData.username + '打卡成功！');
						//todo
						
					}, err => {
						
					});
				}
			}
		},
	}
</script>

<style>
</style>
