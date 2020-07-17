<template>
	<view class="err-modal" v-if="showOrNot">
		<view class="errmodal-con">
			<view class="errmodal-top">
				<image src="../static/image/tip.png" mode=""></image>
				<view class="tips">温馨提示</view>
			</view>
			<view class="tip-desc">{{ tipDesc }}</view>
			<view class="sure">
				<view @click="close" class="sure-btn">
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		tipDesc: { type: String },
		showOrNot: { type: Boolean }
	},
	methods: {
		close() {
			this.$emit('update:showOrNot', false);
		}
	}
};
</script>

<style lang="less">
page {
	height: 100%;
	.err-modal {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 750upx;
		background: rgba(0, 0, 0, 0.7);
		z-index: 1000;
		box-sizing: border-box;
		.errmodal-con {
			background: #fff;
			position: relative;
			margin: 324upx 62upx 0 62upx;
			width: 626;
			border-radius: 30upx;
			box-sizing: border-box;
			.errmodal-top {
				position: relative;
				width: 400upx;
				left: 113upx;
				text-align: center;
				image {
					position: absolute;
					left: 0;
					top: -67upx;
					width: 400upx;
					height: 300upx;
					z-index: 888;
				}
				.tips {
					position: absolute;
					top: 180upx;
					left: 0;
					width: 400upx;
					z-index: 999;
					color: #000000;
					font-size: 32upx;
					font-weight: 600;
				}
			}
			.tip-desc{
				padding: 260upx 50upx 74upx 50upx;
				text-align: center;
				color: #666666;
				font-size: 28upx;
				line-height: 48upx;
			}
			.sure{
				padding: 0 50upx 65upx 50upx;
				.sure-btn{
					width: 532upx;
					height: 82upx;
					line-height: 82upx;
					text-align: center;
					color: #fff;
					font-size: 28upx;
					background: #FF4657;
					border-radius: 42upx;
				}
			}
		}
	}
}
</style>
