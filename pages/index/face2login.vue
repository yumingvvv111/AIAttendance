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
		mounted(){
			pages = getCurrentPages();
		},
		onLoad(options) {
			let {screenWidth, screenHeight, pixelRatio} = this.globalInfo.systemInfo;
				this.url = this.url + '?p=face2login';
				 //+ `?screenWidth=${screenWidth}&screenHeight=${screenHeight}&pixelRatio=${pixelRatio}`;
			// this.getMessage('999');
		},
		// computed: {
		// 	...mapState(['canPunchStatus')
		// },
		methods: {
			...mapMutations(['login', 'changePunchStauts']),
			getMessage(data) {
				let paramData = data.target.data[0];
				let imgData = paramData && paramData.photo;
				console.log(data);
				
				console.log(data.target);
				// let imgData = data;
				// console.log(imgData);
				//获得拍照之后的base64数据
				console.log(imgData, 33333333);
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
						`query faceLogin{
					      faceLogin(img:"${imgData}"){
					        code
					        message
					        data{
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
						
					this.$api.request(query, {}, (data) => {
						// #ifdef H5
						prevPage.hideTip()
						// #endif
						// #ifndef H5
						prevPage.$vm.hideTip()
						// #endif
						this.changePunchStauts({canPunchStatus: true});
						
						// uni.navigateBack();
						// this.$util.alert('恭喜您' + data.userInfoData.username + '打卡成功！');
						//todo
						this.login({nickname: data.userInfoData.username, ...data.userInfoData, ...data.tokenInfo});
					}, err => {
						
					});
				}
			}
		},
	}
</script>

<style>
</style>
