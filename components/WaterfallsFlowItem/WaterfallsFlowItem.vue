<template>
	<view class="wf-item-page">
		<image :src="item.poster" mode="widthFix" class="item-img" />
		<view class="title">
			{{item.name}}
		</view>
		<view class="time">
			{{item.start_at | formatTimes}} — {{item.end_at | formatTimes}}
		</view>
		<!-- 价格 -->
		<view class="price">
			<text class="number" selectable="false" space="false" decode="false">
				{{(item.lower_price/100)*(item.discount/100) | baoliu(2)}}
			</text>
			<text class="fu" selectable="false" space="false" decode="false">
				元
			</text>
			<text class="fu mr" selectable="false" space="false" decode="false">
				起
			</text>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				require: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wf-item-page {
		background: #fff;
		overflow: hidden;
		border-radius: 5px;

		.title {
			width: 100%;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(34, 34, 34, 1);
			line-height: 40rpx;
			padding-left: 18rpx;
			box-sizing: border-box;
			-webkit-box-sizing: border-box;

			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
		}

		.time {
			font-size: 22rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(178, 178, 178, 1);
			line-height: 73rpx;
			padding-left: 18rpx;
			box-sizing: border-box;
			-webkit-box-sizing: border-box;
		}

		.price {
			padding-left: 18rpx;
			box-sizing: border-box;

			-webkit-box-sizing: border-box;

			.number {
				font-size: 32rpx;
				font-family: PingFang SC;
				color: rgba(255, 70, 87, 1);
				font-weight: bold;
			}

			.fu {
				font-size: 20rpx;
				color: #B2B2B2;
				line-height: 73rpx;
				margin-left: 5rpx;

			}

			.mr {
				margin-left: 2rpx;
			}
		}

	}

	.item-img {
		width: 100%;
	}
</style>