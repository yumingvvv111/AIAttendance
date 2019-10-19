<template>
	<view>
		<web-view src="/hybrid/html/local.html" @message="getMessage"></web-view>
	</view>
</template>

<script>
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
				url: '/hybrid/html/local.html?data=' + Math.random()
			};
		},
		onLoad(options) {
			if (options && options.url) {
				this.url = options.url;
			}
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
				// let imgData = data;
				// console.log(imgData);
				//获得拍照之后的base64数据
				if (imgData) {
					//发请求
					//fixme
					const query =
						`query faceLogin{
					      faceLogin(img:"imgData"){
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
