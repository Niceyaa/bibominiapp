<template>
	<view class="message-inform">
		<back-header title="消息通知"></back-header>
		<view class="inform-main">
			<view class="push-switch" v-if="showSwitch">
				<view class="wrapper">
					<view class="left-wrapper">
						<view>开启推送通知</view>
						<view>可以随时获得最新的演出资讯哦!</view>
					</view>
					<view @click="openRecommend" class="right-wrapper">立即开启</view>
				</view>
				<view @click="closeSwitch" class="close-btn">
					<image src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/newMy/error.png"
						mode=""></image>
				</view>
			</view>
			<view class="message-content">
				<view class="system-message" @click="goToMes('/pages/my/message/systemMes')">
					<image src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/newMy/systemMes.png"
						mode=""></image>
					<view class="right">
						<view>系统消息</view>
						<view v-if="systemFlag">您有新的系统消息哦！</view>
						<view v-else>暂时没有消息哦！</view>
					</view>
				</view>
				<view class="system-message" @click="goToMes('/pages/my/message/suggestMes')">
					<image src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/newMy/suggest.png"
						mode=""></image>
					<view class="right">
						<view>为您推荐</view>
						<view v-if="recommendFlag">您有新的推荐消息哦！</view>
						<view v-else>暂时没有消息哦！</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import backHeader from '../../../components/childheader.vue';
	import { messageYesNo } from '../../../Api/myApi/messageYesNo.js'
	export default {
		data() {
			return {
				systemFlag: false,
				recommendFlag: false,
				showSwitch: true
			}
		},
		components: {
			backHeader
		},
		methods: {
			goToMes(url) {
				uni.navigateTo({
					url
				})
			},
			closeSwitch() {
				this.showSwitch = false;
			},
			// 开启推送
			openRecommend() {
				console.log("推送")
			}
		},
		onShow() {
			messageYesNo()
				.then(res => {
					let data = res[1].data.data;
					this.systemFlag = data.system_msg === 1 ? true : false;
					this.recommendFlag = data.recommend2you === 1 ? true : false;
					console.log(res[1].data.data)
				})
		}
	}
</script>

<style lang="less">
	.message-inform {
		.inform-main {
			padding-top: 140upx;

			.push-switch {
				background: #EFF6FF;
				padding: 40upx;
				position: relative;

				.wrapper {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.left-wrapper {
						font-size: 26upx;
						color: #222222;
						font-weight: bold;

						view {
							&:last-child {
								color: #6C6C6C;
								font-weight: normal;
								font-size: 22upx;
							}
						}
					}

					.right-wrapper {
						background: #222;
						color: #FEFEFE;
						border-radius: 8upx;
						height: 60upx;
						width: 150upx;
						line-height: 60upx;
						text-align: center;
						font-size: 22upx;
					}
				}

				.close-btn {
					position: absolute;
					top: 0;
					right: 10upx;

					image {
						width: 16upx;
						height: 16upx;
					}
				}
			}

			.message-content {
				.system-message {
					padding: 32upx;
					border-bottom: 1px solid #EEEEEE;
					display: flex;
					align-items: center;

					image {
						width: 80upx;
						height: 80upx;
						padding-right: 28upx;
					}

					.right {
						color: #222;
						font-size: 26upx;

						view {
							&:last-child {
								color: #B2B2B2;
								font-size: 22upx;
								padding-top: 10upx;
							}
						}
					}
				}
			}
		}
	}
</style>