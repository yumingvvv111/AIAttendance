<template>
	<view class="warp">
		<view class="title">
						<uni-view class="cu-bar search bg-white">
							<uni-view class="search-form round">
								<uni-text class="cuIcon-search"><span></span></uni-text>
									<div class="uni-input-wrapper">
										<form action="" class="uni-input-form">
											<input maxlength="140" step="" autocomplete="off" type="search" class="uni-input-input" @click="open" placeholder="输入查询日期" v-model="timeRange" disabled="disabled">
										</form>
									</div>
							</uni-view>
							<uni-view class="action">
								<button class="cu-btn bg-green shadow-blur round" @click="search">搜索</button>
							</uni-view>
						</uni-view>
					</view>
		<t-table @change="change">
			<t-tr>
				<t-th>打卡时间</t-th>
				<t-th>打卡位置</t-th>
				<t-th>类型</t-th>
				<t-th>结果</t-th>
			</t-tr>
			<t-tr v-if="!hasLogin">
				<t-td><a href="#" @click="$util.navTo('/pages/public/login')">请先登录</a></t-td>
			</t-tr>
			<t-tr v-else-if="punchList.length === 0">
				<t-td colspan="4" style="justify-content: center; margin:10px; text-align: center;">无记录</t-td>
			</t-tr>
			<t-tr v-for="item in punchList" :key="item.id" v-else>
				<t-td>{{ item.time }}</t-td>
				<t-td>{{ item.name }}</t-td>
				<t-td>{{ item.age }}</t-td>
				<t-td>{{ item.hobby }}</t-td>
			</t-tr>
		</t-table>
		<uni-calendar ref="calendar" :insert="false" :lunar="true" :disable-before="false" :range="true" @confirm="calendarChange" />
	</view>
</template>

<script>
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			tTable,
			tTh,
			tTr,
			tTd,
			uniCalendar
		},
		data() {
			return {
				isEdit: false,
				tableList: [],
				timeRange: ''
			};
		},
		mounted() {

			this.$util.getUserInfo().then((userInfo) => {
				let hasLogin = userInfo ? true : false;
				this.pureLogin({
					hasLogin,
					userInfo
				});
				if (hasLogin) {
					this.getPunchList().then((data) => {
						this.update(data);
					});
				}
			});

		},
		computed: {
			...mapState(['hasLogin', 'punchList'])
		},
		methods: {
			getPunchList() {
				return new Promise((resolve, reject) => {
					let reg = /\d{4}-\d{2}-\d{2}/g;
					let today = new Date();
					let startTime = (new Date(0).toISOString()).match(reg)[0];
					let endTime = (new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString()).match(reg)[0];
					if (this.timeRange) {
						let match = this.timeRange.match(reg);
						startTime = match[0];
						endTime = match[1] ? match[1] : (match[0] ? match[0] : endTime);
					}
					const query =
						`
											query punch{
											punch(startTime:"${startTime}", endTime: "${endTime}"){
											    code
											    message
											    data {
											      time
											      type
											      result
											    }
											  }
											}`;
					this.$api.request(query, {}, (data) => {
						resolve(data);
					}, (err) => {
						console.log(err);
					});
				});
			},
			search() {
				this.$util.getUserInfo().then((userInfo) => {
					let hasLogin = userInfo ? true : false;
					this.pureLogin({
						hasLogin,
						userInfo
					});
					if (hasLogin) {
						this.getPunchList().then((data) => {
							this.update(data);
						});
					}
				});
			},
			calendarChange(data) {
				console.log(data)
				let {
					begin,
					end
				} = data.range;
				this.timeRange = begin + (end ? ' 至 ' + end : '');
			},
			open() {
				this.$refs.calendar.open();
			},
			change(e) {
				console.log(e.detail);
			},
			edit(item) {
				uni.showToast({
					title: item.name,
					icon: 'none'
				});
			},
			...mapActions({
				update: 'updatePunchList'
			}),
			...mapMutations(['pureLogin']),
		}
	};
</script>

<style lang="scss">

</style>
