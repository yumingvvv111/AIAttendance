<template>
	<view class="content">
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view  class="action">
				<uni-text  class="cuIcon-title text-orange "><span></span></uni-text>我的办公
			</view>
			<view  class="action">
				<uni-button  class="cu-btn bg-green shadow" data-target="gridModal">设置</uni-button>
			</view>
		</view>
		<view class="cu-list grid col-3 no-border" style="height:350px;width:100%">
			<view class="cu-item" @click="navTo('/pages/attendList/attendList')">
				<view class="cuIcon-cardboardfill text-red">
					<view class="cu-tag badge">89+</view>
				</view>
				<uni-text><span>我的打卡</span></uni-text>
			</view>
			<view class="cu-item" @click="navTo('/pages/attendList/attendList')">
				<view class="cuIcon-recordfill text-orange">
					<view class="cu-tag badge"></view>
				</view>
				<uni-text><span>我的考勤</span></uni-text>
			</view>
			<view class="cu-item" @click="navTo('/pages/attendReport/attendReport')">
				<view class="cuIcon-picfill text-yellow"></view>
				<uni-text><span>考勤报告</span></uni-text>
			</view>
			<view class="cu-item" @click="navTo('/pages/apply/apply')">
				<view class="cuIcon-noticefill text-olive">
					<view class="cu-tag badge">22</view>
				</view>
				<uni-text><span>请假</span></uni-text>
			</view>
			<view class="cu-item" @click="navTo('/pages/apply/apply')">
				<view class="cuIcon-noticefill text-olive">
					<view class="cu-tag badge">22</view>
				</view>
				<uni-text><span>加班</span></uni-text>
			</view>
			<view class="cu-item" @click="navTo('/pages/apply/apply')">
				<view class="cuIcon-noticefill text-olive">
					<view class="cu-tag badge">22</view>
				</view>
				<uni-text><span>出差</span></uni-text>
			</view>
			<view class="cu-item" @click="navTo('/pages/apply/apply')">
				<view class="cuIcon-noticefill text-olive">
					<view class="cu-tag badge">22</view>
				</view>
				<uni-text><span>外勤</span></uni-text>
			</view>
			<view class="cu-item" @click="navTo('/pages/apply/apply')">
				<view class="cuIcon-upstagefill text-cyan"></view>
				<uni-text><span>发起申请</span></uni-text>
			</view>
			<view class="cu-item" @click="navTo('/pages/approve/approve')">
				<view class="cuIcon-clothesfill text-blue"></view>
				<uni-text><span>申请审批</span></uni-text>
			</view>
			
		</view>

	</view>
</template>

<script>
	
	let windowWidth = 0,
		scrollTimer = false,
		tabBar;
	export default {
		components: {
			
		},
		data() {
			return {
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
				tabBars: [],
			}
		},
		computed: {
			
		},
		async onLoad() {
			// 获取屏幕宽度
			windowWidth = uni.getSystemInfoSync().windowWidth;
		},
		onReady() {
			
		},
		methods: {
			navTo(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang='scss'>
	page,
	.content {
		background-color: #f8f8f8;
		height: 100%;
		overflow: hidden;
	}
	.cu-item{
		width: 110px;
		
		
	}
</style>
