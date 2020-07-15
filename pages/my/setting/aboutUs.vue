<template>
	<view class="about-us">
		<back-header title="关于我们"></back-header>
		<view class="about-us-main">
			<image src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/logo.png"></image>
			<view class="logo-name">哔啵</view>
			<view class="about-content">
				这里是关于软件的介绍文字，具体写什么，根据后续文案内容为准。这里暂时只是我想到的填充文字。这里是关于软件的介绍文字，具体写什么，根据后续文案内容为准。这里暂时只是我想到的填充文字。这里是关于软件的介绍文字，具体写什么，根据后续文案内容为准。这里暂时只是我想到的填充文字。这里是关于软件的介绍文字，具体写什么，根据后续文案内容为准。这里暂时只是我想到的填充文字。
			</view>
			<view class="current-version">当前版本：{{version}}</view>
		</view>
	</view>
</template>

<script>
	import backHeader from '../../../components/childheader.vue';
	export default {
		data() {
			return {
				version: "1.1.2"
			}
		},
		components: {
			backHeader
		},
		onShow() {
			// uni.showToast({
			// 	title:"加载中",
			// 	icon:"loading",
			// 	position:"bottom"
			// })
			
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;

		.about-us {
			height: 100%;
			background: #F6F6F6;
			position: relative;

			.about-us-main {
				padding-top: 140upx;
				font-size: 28upx;

				image {
					width: 134upx;
					height: 134upx;
					border-radius: 30upx;
					margin: 80upx 308upx 0 308upx;
				}

				.logo-name {
					text-align: center;
					color: #222222;
					font-size: 40upx;
					padding: 20upx 0;
				}

				.about-content {
					padding: 74upx 40upx 0 40upx;
					color: #666666;
					font-size: 24upx;
					line-height: 34upx;
					letter-spacing: 40;

				}

				.current-version {
					color: #B2B2B2;
					font-size: 24upx;
					position: absolute;
					bottom: 100upx;
					left: 0;
					padding-left: 290upx;
				}
			}
		}
	}
</style>