<template>
	<view>
		<scroll-view scroll-x class="bg-green nav text-center">
			<view class="cu-item" :class="0==TabCur?'text-white cur':''" @tap="tabSelect" data-id="0">
				<text class="cuIcon-camerafill"></text> 我的申请
			</view>
			<view class="cu-item" :class="1==TabCur?'text-white cur':''" @tap="tabSelect" data-id="1">
				<text class="cuIcon-upstagefill"></text> 待我审批
			</view>
			<view class="cu-item" :class="2==TabCur?'text-white cur':''" @tap="tabSelect" data-id="2">
				<text class="cuIcon-clothesfill"></text> 我已审批
			</view>
		</scroll-view>
		
		<uni-view class="cu-bar search bg-white">
			<uni-view  class="search-form round">
				<uni-text  class="cuIcon-search"><span></span></uni-text>
				<uni-input >
					<div class="uni-input-wrapper">
						<div class="uni-input-placeholder" >2019-08-31 - 2019-09-02</div>
						<form action="" class="uni-input-form"><input maxlength="140" step="" autocomplete="off" type="search" class="uni-input-input"></form>
					</div>
				</uni-input>
			</uni-view>
			<uni-view  class="action">
				<uni-button  class="cu-btn bg-green shadow-blur round">搜索</uni-button>
			</uni-view>
		</uni-view>
		<t-table @change="change">
			<t-tr>
				<t-th>打卡时间</t-th>
				<t-th>打卡位置</t-th>
				<t-th>类型</t-th>
				<t-th>结果</t-th>
			</t-tr>
			<t-tr v-for="item in tableList" :key="item.id">
				<t-td>{{ item.time }}</t-td>
				<t-td>{{ item.name }}</t-td>
				<t-td>{{ item.age }}</t-td>
				<t-td>{{ item.hobby }}</t-td>
			</t-tr>
		</t-table>
		
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
		
		
	</view>
</template>

<script>
	
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	export default {
		components: {
			tTable,
			tTh,
			tTr,
			tTd
		},
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				isEdit: false,
				tableList: [{
						id: 0,
						time: '2019-08-30',
						name: '八维',
						age: '外勤',
						hobby: '正常'
					},
					{
						id: 1,
						time: '2019-08-30',
						name: '八维',
						age: '外勤',
						hobby: '迟到'
					},
					{
						id: 2,
						time: '2019-08-30',
						name: '八维',
						age: '外勤',
						hobby: '迟到'
					},
					{
						id: 3,
						time: '2019-08-30',
						name: '八维',
						age: '本部',
						hobby: '早退'
					}
				]
			};
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			change(e) {
				console.log(e.detail);
			},
			edit(item) {
				uni.showToast({
					title: item.name,
					icon: 'none'
				});
			}
		}
	};
	
	
</script>

<style lang="scss">

</style>
