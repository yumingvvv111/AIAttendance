<template>
	<view>
		<uni-view class="cu-form-group">
			<uni-view class="title">请假类型</uni-view>
			<uni-input >
				<div class="uni-input-wrapper">
					<div class="uni-input-placeholder" style="display: none;">统一标题的宽度</div><input maxlength="140"
					 step="" autocomplete="off" uni-input-placeholder="选择类型" class="uni-input-input" placeholder="选择类型">
				</div>
			</uni-input>
		</uni-view>
		<uni-view class="cu-form-group">
			<uni-view class="title">地点</uni-view>
			<uni-input >
				<div class="uni-input-wrapper">
					<div class="uni-input-placeholder" >申请地点</div><input maxlength="140" step="" autocomplete="off"
					 type="" class="uni-input-input">
				</div>
			</uni-input>
			<uni-text class="cuIcon-locationfill text-orange"><span></span></uni-text>
		</uni-view>


		<uni-view class="cu-form-group">
			<uni-view class="title">开始日期</uni-view>
			<uni-picker >
				<div>
					<uni-view class="picker">2018-12-25</uni-view>
				</div>
			</uni-picker>
		</uni-view>

		<uni-view class="cu-form-group">
			<uni-view class="title">开始时间</uni-view>
			<uni-picker >
				<div>
					<uni-view class="picker">12:01</uni-view>
				</div>
			</uni-picker>
		</uni-view>


		<uni-view class="cu-form-group">
			<uni-view class="title">结束日期</uni-view>
			<uni-picker >
				<div>
					<uni-view class="picker">2018-12-25</uni-view>
				</div>
			</uni-picker>
		</uni-view>

		<uni-view class="cu-form-group">
			<uni-view class="title">结束时间</uni-view>
			<uni-picker >
				<div>
					<uni-view class="picker">12:01</uni-view>
				</div>
			</uni-picker>
		</uni-view>


		<view class="cu-form-group margin-top">
			<textarea maxlength="-1" placeholder="请假事由"></textarea>
		</view>


		<uni-view class="cu-form-group">
			<uni-view class="grid col-4 grid-square flex-sub">
				<uni-view class="solids">
					<uni-text class="cuIcon-cameraadd"><span></span></uni-text>
				</uni-view>
			</uni-view>
		</uni-view>
		
		<uni-view class="padding-xl"><uni-button class="cu-btn block bg-blue margin-tb-sm lg"><uni-text class=" cuIconfont-spin"><span></span></uni-text>提交</uni-button></uni-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">

</style>
