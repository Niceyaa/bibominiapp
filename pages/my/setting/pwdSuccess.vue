<template>
	<view class="pwd-success">
		<back-header title="设置安全密码"></back-header>
		<view class="pwd-success-main">
			<view class="success-wrapper">
				<image src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/b1840247dfa6d3d8fa399fc34502e36.png" mode=""></image>
				<view class="text">安全密码设置成功</view>
			</view>

		</view>
	</view>
</template>

<script>
import backHeader from '../../../components/childheader.vue';
export default {
	data() {
		return {};
	},
	components: {
		backHeader
	},
	mounted() {
		uni.setStorageSync("isPwd",true);
		setTimeout(() => {
			uni.navigateTo({
				url: '/pages/my/setting/setting'
			});
		}, 1500);
	}
};
</script>

<style lang="less">
page {
	height: 100%;
	.pwd-success {
		height: 100%;
		.pwd-success-main {
			padding-top: 140upx;
			font-size: 28upx;
			box-sizing: border-box;
			height: 100%;
			background: #f6f6f6;
			color: #000000;
			display: flex;
			justify-content: center;
			.success-wrapper{
				image{
					width: 200upx;
					height: 165upx;
					padding: 72upx 0 85upx 0;
				}
				.text{
					text-align: center;
				}
			}
		}
	}
}
</style>
