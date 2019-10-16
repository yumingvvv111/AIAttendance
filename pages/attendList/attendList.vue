<template>
	<view class="warp">
		<view class="box">
			<view class="title">
				<uni-view class="cu-bar search bg-white">
					<uni-view class="search-form round">
						<uni-text class="cuIcon-search"><span></span></uni-text>
						<uni-input>
							<div class="uni-input-wrapper">
								<div class="uni-input-placeholder">2019-08-31 - 2019-09-02</div>
								<form action="" class="uni-input-form"><input maxlength="140" step="" autocomplete="off" type="search" class="uni-input-input" @focus="open.bind(this)"></form>
							</div>
						</uni-input>
					</uni-view>
					<uni-view class="action">
						<uni-button class="cu-btn bg-green shadow-blur round">搜索</uni-button>
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
				<!-- <t-tr v-else-if="punchList.length === 0" style="text-align: center;color:red;margin:0 auto; width: 100%;">无记录</t-tr> -->
				<t-tr v-for="item in punchList" :key="item.id" v-else>
					<t-td>{{ item.time }}</t-td>
					<t-td>{{ item.name }}</t-td>
					<t-td>{{ item.age }}</t-td>
					<t-td>{{ item.hobby }}</t-td>
				</t-tr>
			</t-table>
		</view>
		<view class="box" v-if="isEdit">
			<view class="title">自定义样式</view>
			<t-table border="2" border-color="#95b99e" :is-check="true" @change="change">
				<t-tr font-size="14" color="#95b99e" align="left">
					<t-th align="left">姓名</t-th>
					<t-th align="left">年龄</t-th>
					<t-th align="left">爱好</t-th>
					<t-th align="center">操作</t-th>
				</t-tr>
				<t-tr font-size="12" color="#5d6f61" align="right" v-for="item in tableList" :key="item.id">
					<t-td align="left">{{ item.name }}</t-td>
					<t-td align="left">{{ item.age }}</t-td>
					<t-td align="left">{{ item.hobby }}</t-td>
					<t-td align="left"><button @click="edit(item)">编辑</button></t-td>
				</t-tr>
			</t-table>
		</view>
		<uni-calendar ref="calendar" :insert="false" :lunar="true" :disable-before="false" :range="true" @change="calendarChange" />
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
				tableList: []
			};
		},
		mounted() {
			const getPunchList = () => {
				return new Promise((resolve, reject) => {
					const query =
						`
											query punch{
											punch(startTime:"a8", endTime: "1234"){
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
			}

			this.$util.getUserInfo().then((userInfo) => {
				let hasLogin = userInfo ? true : false;
				this.pureLogin(userInfo);
				if(hasLogin){
					getPunchList().then((data) => {
						this.update(data);
					});
				}
			});
			
		},
		computed: {
			...mapState(['hasLogin', 'punchList'])
		},
		methods: {
			calendarChange(){
				alert(999)
			},
			open(){
				console.log(this, 6767676767);
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
