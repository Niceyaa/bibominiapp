<template>
	<view class="service-container">
		<back-header title="在线客服"></back-header>
		<scroll-view @scrolltoupper="toLower" scroll-y="true" lower-threshold="50" class="service-main">
			<scroll-view class="relate">


				<view class="mechine">
					<view class="header-wrapper">
						<image class="image"
							src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/newMy/kefu.png"
							mode=""></image>
					</view>
					<view class="content">
						<view class="content-title">猜你想问</view>
						<view @click="clickQues(item)" class="ques-item" v-for="(item, idx) in quesList" :key="idx">
							{{ idx + 1 }}.{{ item.question }}</view>
					</view>
				</view>
				<view class="msg-container">
					<view class="msg-item" v-for="(item,idx) in total" :key="idx">
						<view class="mechine" v-if="item.answer">
							<view class="header-wrapper">
								<image class="image"
									src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/newMy/kefu.png"
									mode=""></image>
							</view>
							<view class="content" style="padding: 30rpx 28rpx;">
								<view class="ques-item" style="color: #212121;font-size: 24rpx;">{{item.answer}}</view>
							</view>
						</view>
						<view class="self-send" v-if="item.question">
							<view class="self-msg">
								{{item.question}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</scroll-view>
		<view class="bottom-input">
			<input type="text" v-model="sendMsg" placeholder="请简短的描述您的问题" />
			<view @click="subQues" class="sendQues">+</view>
		</view>
	</view>
</template>

<script>
	import backHeader from '../../../components/childheader.vue';
	import { kefuCommonQues } from '../../../Api/myApi/kefuCommonQues.js';
	import { kefuSub } from '../../../Api/myApi/kefuSub.js';
	export default {
		data() {
			return {
				quesList: [],
				sendMsg: '',
				total: [],
				midHeight: ''
			};
		},
		components: { backHeader },
		methods: {
			toLower(e) {
				console.log("到底了", e)
			},
			getQuesList() {
				kefuCommonQues().then(res => {
					this.quesList = res[1].data.data;
					console.log(res[1].data.data);
				});
			},
			clickQues(item) {
				this.total.push({ question: item.question });
				kefuSub({
					question: item.question
				}).then(res => {
					console.log(res[1].data)
					this.total.push({ answer: res[1].data.data.answer })
				})
			},
			subQues() {
				if (this.sendMsg.length > 4) {
					this.total.push({ question: this.sendMsg });
					kefuSub({
						question: this.sendMsg
					}).then(res => {
						this.sendMsg = "";
						if (res[1].data.err_code === 0) {
							this.total.push({ answer: res[1].data.data.answer })
						} else {
							uni.showToast({
								title: res[1].data.err_msg,
								icon: "none"
							})
						}
					})
				}
			}
		},
		mounted() {
			this.getQuesList();
		},
		updated() {
			const query = uni.createSelectorQuery();
			let msgItem = query.select(".msg-item");
			console.log(query.select(".msg-item"))
		}
	};
</script>

<style lang="less">
	page {
		height: 100%;

		.service-container {
			height: 100%;
			background: #f6f6f6;
			position: relative;
			display: flex;

			.service-main {
				padding: 140rpx 0;
				box-sizing: border-box;
				background: #f6f6f6;
				width: 750rpx;

				.mechine {
					margin: 40rpx 0 0 40rpx;
					box-sizing: border-box;
					display: flex;

					.header-wrapper {
						flex: 0 60rpx;
						width: 60rpx;
						height: 60rpx;
						box-sizing: border-box;
						border-radius: 40rpx;
						background: #ff4557;
						display: flex;
						align-items: center;
						justify-content: center;

						.image {
							width: 40upx;
							height: 40upx;
						}
					}

					.content {
						margin-left: 40rpx;
						background: #fff;
						padding: 40rpx 28rpx;
						width: 440rpx;
						border-radius: 10rpx;

						.content-title {
							font-size: 28rpx;
							color: #212121;
							font-weight: 600;
						}

						.ques-item {
							color: #4997f8;
							margin-top: 8rpx;
							font-size: 28rpx;
						}
					}
				}

				.self-send {
					width: 750rpx;
					margin-top: 40rpx;
					display: flex;
					flex-direction: row-reverse;
					box-sizing: border-box;
					padding-right: 40rpx;

					.self-msg {
						border-radius: 10rpx;
						max-width: 450rpx;
						padding: 26rpx 80rpx 26rpx 26rpx;
						background: #fff;
						color: #4997f8;
						font-size: 28rpx;
					}
				}

			}

			.bottom-input {
				position: fixed;
				left: 0;
				bottom: 0;
				width: 750rpx;
				box-sizing: border-box;
				display: flex;
				padding: 10rpx 40upx;
				background: #fff;
				align-items: center;
				height: 100rpx;

				input {
					width: 580rpx;
					height: 78rpx;
					background: #f6f6f6;
					border-radius: 40rpx;
					margin-right: 30rpx;
					padding-left: 34rpx;
					box-sizing: border-box;
					line-height: 78rpx;
					font-size: 28rpx;
				}

				.sendQues {
					background: #ff4657;
					color: #fff;
					width: 60rpx;
					height: 60rpx;
					text-align: center;
					line-height: 60rpx;
					font-size: 70rpx;
					border-radius: 30rpx;
				}
			}

		}
	}
</style>