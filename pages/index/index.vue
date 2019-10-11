<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-common-mt">
			<view>
				<map :latitude="latitude" :longitude="longitude" :markers="covers">
				</map>
				<view class="cu-bar bg-white solid-bottom margin-top">
					<view class="action">
						<text class="cuIcon-title text-orange"><span></span></text>考勤时段1
					</view>

				</view>

				<view class="cu-bar bg-white solid-bottom margin-top">
					<view class="action">
						<text class="text-orange"><span></span></text>上班08:30
					</view>
					<view class="action">
						<button class="cu-btn round bg-green shadow" @click="punch('signIn')">
							<text><span></span></text>签到
						</button>
					</view>
				</view>

				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="text-orange"><span></span></text>下班17:30
					</view>
					<view class="action">
						<button class="cu-btn round bg-green shadow" @click="punch('signOff')">
							<text><span></span></text>签退
						</button>
					</view>
				</view>
				
				<view class="cu-bar bg-white solid-bottom" v-for="(item, index) in punchList" :key="index">
					<view class="action" style="color:#ccc">
						<text class="text-orange"><span></span></text>{{item.type}}{{item.time}}
					</view>
					<view class="action">
						<button class="cu-btn" style="background: transparent;">
							<text><span></span></text>{{item.result}}
						</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	
	export default {
		data() {
			return {
				title: 'map',
				punchList: [
					// {
					// type: '上班',
					// time: '08:13',
					// result: '正常',
					// }
				],
				latitude: 40.0418585238,
				longitude: 116.2998747826,
				covers: [{
					latitude: 40.0418585238,
					longitude: 116.2998747826,
					// #ifdef APP-PLUS
					iconPath: '../../../static/app-plus/location@3x.png',
					// #endif
					// #ifndef APP-PLUS
					iconPath: '../../../static/location.png',
					// #endif
				}, {
					latitude: 39.90,
					longitude: 116.39,
					// #ifdef APP-PLUS
					iconPath: '../../../static/app-plus/location@3x.png',
					// #endif
					// #ifndef APP-PLUS
					iconPath: '../../../static/location.png',
					// #endif
				}],
				punchStatus: {
					date: '',
					am: '',
					pm: ''
				}
			}
		},
		mounted(){
			uni.getStorage({
				key: 'punchStatus',
				success: (res) => {
					let data = res.data;
					console.log('get punchStatus success');
					console.log(data);
					if(this.checkIsToday(data.date)){
						uni.getStorage({
							key: 'punchList',
							success: (res) => {
								console.log('get punchList success');
								console.log(res);
								this.punchList = res.data;
							}
						});
					}else{
						uni.setStorage({
							key: 'punchList',
							data: [],
							success: (res) => {
								
							}
						});
					}
				}
			});
		},
		
		methods: {
			checkIsToday(date){
				var time = (new Date(date)).getTime();
				var now = new Date();
				now = (now.toISOString()).match(/\d{4}-\d{2}-\d{2}/)[0];
				now = new Date(now);
				now = now.getTime();
				return now <= time + 24 * 60 * 60 * 1000;
			},
			punch(type) {
				var alert = this.$util.alert;
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let _date = date.getDate();
				let time = date.getTime();
				let hour = date.getHours();
				let minute = date.getMinutes();
				let dateStr = year + '/' + month + '/' + _date;

				let checkPoint = [
					(new Date(dateStr + ' 08:15:00')).getTime(), //'am8:15': 
					(new Date(dateStr + ' 09:15:00')).getTime(), //'am9:15': 
					(new Date(dateStr + ' 17:30:00')).getTime() //'pm17:30': 
				];

				let s = type === 'signIn' ? '到' : '退';
				let _type = type === 'signIn' ? '上班' : '下班';
				let preText = `签${s}成功, `;
				let result = {
					type: _type,
					time: (new Date(time)).toString().match(/\d{2}:\d{2}:\d{2}/)[0],
					result: '异常'
				};
				
				if (!checkHasPunched.call(this, type)) {
					if (type === 'signIn') {
						if (time <= checkPoint[0]) {
							result.result = '正常';
							alert(preText + '考勤正常');
						} else if (time > checkPoint[0] && time <= checkPoint[1]) {
							alert(preText + '您已迟到');
						} else {
							alert('计算旷工');
						}
					} else {
						if (time >= checkPoint[2]) {
							result.result = '正常';
							alert(preText + '考勤正常');
						}else{
							alert(preText + '不到下班时间哦');
						}
					}
					
					this.punchList.push(result);
					
					this.punchStatus.date = dateStr;
					if (type === 'signIn') {
						this.punchStatus.am = time;
					} else {
						this.punchStatus.pm = time;
					}
					
					uni.setStorage({
						key: 'punchList',
						data: this.punchList,
						success: () => {
							console.log('save punchStatus success');
							console.log(this.$api, 7777);
						}
					});
					
					
					uni.setStorage({
						key: 'punchStatus',
						data: this.punchStatus,
						success: () => {
							console.log('save punchStatus success');
							console.log(this.$api, 7777);
						}
					});
					
					//todo
					
					const query =
						`query punch{
					      punch(startTime:"sadmin", endTime: "sadmin"){
					        code
					        message
					        data{
					          accessToken
					          expiresIn
					        }
					      }
					    }`;
					
					
					this.$api.request(query, {}, (data) => {
						
						console.log(data);
						// uni.navigateBack();
						// this.login({nickname: username, ...data});
					});
					
				}

				function checkHasPunched(type) {
					let am = false;
					let pm = false;
					let punchStatus = uni.getStorageSync('punchStatus');
					let self = this;
					if (punchStatus) {
						var date = punchStatus.date;
						//判断是否是当天
						if (self.checkIsToday(date)) {
							if (type === 'signIn') {
								if (punchStatus.am) {
									alert('您已签到');
									am = true;
								} else {
									am = false;
								}
								return am;
							}
							if (type === 'signOff') {
								// if (punchStatus.pm) {
								// 	alert('您已签退');
								// 	pm = true;
								// } else {
									pm = false;
								// }
								return pm;
							}
						} else {
							am = pm = false;
							return false;
						}
					}
					
				}
			},

		}
	}
</script>
<style>
	map {
		width: 100%;
		height: 600upx;
	}
</style>
