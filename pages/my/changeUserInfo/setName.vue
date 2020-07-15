<template>
	<view class="set-name">
		<back-header title="设置昵称"></back-header>
		<view class="name-main">
			<view class="input-wrapper"><input type="text" v-model="nickName" /></view>
		</view>
		<view class="save-wrapper">
			<view @click="saveName" class="save-btn">保存</view>
		</view>
	</view>
</template>

<script>
	import backHeader from '../../../components/childheader.vue'
	import { updateUserInfo } from '../../../Api/myApi/updateUserInfo.js';
	export default {
		data() {
			return {
				nickName: '张三'
			};
		},
		components:{backHeader},
		methods: {
			back() {
				var pages = getCurrentPages();
				console.log('返回上一页', pages);
				if (pages.length <= 1) {
					console.log('可能是分享页面');
				} else {
					wx.navigateBack({
						delta: 1
					});
				}
			},
			saveName() {
				updateUserInfo({
					nickname: this.nickName
				}).then(res => {
					// 昵称更新成功
					if (res[1].data.err_code === 0) {
						console.log(res[1].data.data.nickname)
						uni.setStorageSync("nickName", res[1].data.data.nickname);
						uni.showToast({
							title: '昵称更新成功'
						});
						uni.switchTab({
							url: '/pages/my/newMy'
						});
					}
				});
			},
		},
		onShow() {
			this.nickName = uni.getStorageSync("nickName");
		}
	};
</script>

<style lang="less">
	page {
		height: 100%;

		.set-name {
			position: relative;
			height: 100%;
			background-color: #f6f6f6;

			
			.name-main {
				padding-top: 140upx;

				.input-wrapper {
					margin-top: 20upx;
					padding: 40upx;
					background: #fff;
				}
			}

			.save-wrapper {
				width: 750rpx;
				box-sizing: border-box;
				padding: 100rpx 40rpx;

				.save-btn {
					background: #fff;
					line-height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					font-size: 32rpx;
					background: #FF4657;
					color: #fff;
					border-radius: 10rpx;
				}
			}
		}
	}
</style>