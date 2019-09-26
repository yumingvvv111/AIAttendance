<template>
	<view class="content">
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<uni-text class="cuIcon-search"><span></span></uni-text>
				<uni-input>
					<div class="uni-input-wrapper">
		
						<form action="" class="uni-input-form"><input maxlength="140" step="" autocomplete="off" type="search" class="uni-input-input"></form>
					</div>
				</uni-input>
			</view>
			<view class="action">
				<uni-text><span>部门</span></uni-text>
				<uni-text class="cuIcon-triangledownfill"><span></span></uni-text>
			</view>
		</view>
		<!-- 
			* 下拉刷新和加载更多组件使用示例
			* 下拉刷新组件仅支持h5和小程序端，app端受限制目前没想到好的实现。
		-->
		<!--
			* 下拉刷新组件
			* @property {Number} top 距离顶部的距离
			* @event {Function} onPulldownReresh 刷新时调用的方法
			* @event {Function} setEnableScroll 设置组件内scroll-view是否允许滚动
		-->
		<mix-pulldown-refresh ref="mixPulldownRefresh" :top="0" @refresh="onPulldownReresh">

			<view class="scroll-wrapper">

				<!-- <view class="list-item" v-for="item in list" :key="item">
					列表项 -- {{item}}
				</view> -->

				<view class="cu-list menu-avatar">

					<view data-target="move-box-0" class="cu-item" v-for="(item, index) in list" :key="index" @click="navTo('/pages/chat/index')">
						<view class="cu-avatar round lg" style="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big21002.jpg');"></view>
						<view class="content">
							<view class="text-grey">{{item.name}}</view>
							<view class="text-gray text-sm">
								<uni-text class="cuIcon-infofill text-red  margin-right-xs"><span></span></uni-text>消息未送达
							</view>
						</view>
						<view class="action">
							<view class="text-grey text-xs">{{item.time}}</view>
							<view class="cu-tag round bg-grey sm">{{item.count}}</view>
						</view>
						<view class="move">
							<view class="bg-grey">置顶</view>
							<view class="bg-red">删除</view>
						</view>
					</view>


				</view>

				<!--
					* 上滑加载更多组件
					* @property {Number} status = [0|1|2] 0加载前，1加载中，2没有更多了
				-->
				<mix-load-more :status="loadMoreStatus"></mix-load-more>

			</view>

		</mix-pulldown-refresh>
	</view>
</template>

<script>
	import mixPulldownRefresh from '@/components/mix-pulldown-refresh/mix-pulldown-refresh';
	import mixLoadMore from '@/components/mix-load-more/mix-load-more';
	export default {
		components: {
			mixPulldownRefresh,
			mixLoadMore
		},
		data() {
			return {
				list: [{
						name: '天马行空',
						avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21005.jpg',
						info: '',
						time: '08:00',
						message: '消息未送达',
						count: 8
					},
					{
						name: '似懂非懂',
						avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21002.jpg',
						info: '',
						time: '08:00',
						message: '消息未送达',
						count: 8
					},
					{
						name: '我的房间',
						avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21004.jpg',
						info: '',
						time: '08:00',
						message: '消息未送达',
						count: 8
					}
				],
				loadMoreStatus: 0,
			}
		},
		onLoad() {
			this.loadData('add');
		},

		onReachBottom() {
			//上滑加载
			this.loadData('add');
		},
		methods: {
			navTo(url) {
				uni.navigateTo({
					animationDuration: 200,
					url
				})
			},
			loadData(type) {
				if (type === 'add') {
					this.loadMoreStatus = 1;
				}
				setTimeout(() => {
					if (type === 'refresh') {
						this.list = [];
					}

					let length = this.list.length;
					for (let i = length; i < length + 10; i++) {
						//fixme
						let text = ['胜', '多', '负', '少', '的', '范', '德', '萨', '的', '是', '否', '合', '适'];
						text = text[Math.round(Math.random() * 10)];
						text = {
							name: text,
							avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21004.jpg',
							info: '',
							time: '08:00',
							message: '消息未送达',
							count: 8
						}
						this.list.push(text);
					}

					if (type === 'add') {
						this.loadMoreStatus = 0;
					}
					if (type === 'refresh') {
						this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
					}
				}, 1000)

			},


			//下拉刷新
			onPulldownReresh() {
				this.loadData('refresh');
			},
		}
	}
</script>

<style>
	page,
	.content {
		background-color: #f8f8f8;
	}

	.list-item {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 150upx;
		font-weight: bold;
		font-size: 36upx;
		color: #555;
		background: #fff;
		border-bottom: 1px solid #eee;
	}
</style>


<style lang="scss">

</style>
