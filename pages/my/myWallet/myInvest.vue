<template>
	<view class="withdraw-container">
		<back-header title="充值"></back-header>
		<view class="withdraw-main">
			<view class="withdraw-top">
				<view class="withdraw-way">
					<text>充值方式</text>

					<text>{{ payWay }}</text>
				</view>
				<view class="other-ways" @click="changeVisible">其他方式</view>
			</view>
			<view class="withdraw-content">
				<view class="content-top">
					<view>充值金额</view>
				</view>
				<view class="content-middle">
					<text class="text">￥</text>
					<input type="digit" v-model="inputMoney" />
				</view>
				<view class="withdraw-tip">充值后账户余额可直接进行消费购买</view>
				<view class="withdraw-btn" @click="charge">充值</view>
			</view>
		</view>
		<cover-view v-if="visible" class="bottom-container" @click="close">
			<view class="my-wrapper" @click.stop>
				<view class="withdraw-title">选择提现方式</view>
				<view v-if="!isFirstTime" class="pay-item" v-for="item in payList" :key="item.id">
					<view class="left-container">
						<image class="img-sign" :src="item.imgSrc" mode=""></image>
						<view class="info-container">
							<view class="pay-name">{{ item.name }}</view>
							<view>{{ item.tel }}</view>
						</view>
					</view>
					<view class="right-container" @click.stop="changePayWay(item)">
						<image v-if="selectSign === item.selectSign"
							src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/myWallet/xuanzhong.png"
							mode=""></image>
						<image v-else
							src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/myWallet/weixuanzhong.png"
							mode=""></image>
					</view>
				</view>
				<view v-if="isFirstTime" class="other-item" v-for="item in firstList" :key="item.id">
					<view class="left-container">
						<image class="img-sign"
							src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/myWallet/add.png"
							mode=""></image>
						<view class="info-container">
							<view class="pay-name">{{ item.name }}</view>
						</view>
					</view>
					<view class="right-container" @click.stop="otherChangeWay(item)">
						<image v-if="selectSign === item.selectSign"
							src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/myWallet/xuanzhong.png"
							mode=""></image>
						<image v-else
							src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/myWallet/weixuanzhong.png"
							mode=""></image>
					</view>
				</view>
			</view>
		</cover-view>
	</view>
</template>

<script>
	import { reCharge } from "../../../Api/myApi/reCharge.js";
	import backHeader from '../../../components/childheader.vue';
	export default {
		data() {
			return {
				isFirstTime: true,
				visible: false,
				inputMoney: '',
				payWay: "微信",
				payList: [
					{ id: 0, name: '微信', tel: '13599998763', imgSrc: 'https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/myWallet/wechat.png', selectSign: 'wechat' },
					{ id: 1, name: '支付宝', tel: '15178456214', imgSrc: 'https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/myWallet/alipay.png', selectSign: 'alipay' },
					{ id: 2, name: '银行卡', tel: '6217456445664587785', imgSrc: 'https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/myWallet/unionpay.png', selectSign: 'unionpay' }
				],
				firstList: [
					{ id: 0, name: '绑定微信账户', selectSign: 'wechat', payName: "微信" },
					{ id: 1, name: '绑定支付宝账户', selectSign: 'alipay', payName: "支付宝" },
					{ id: 2, name: '绑定银行卡账户', selectSign: 'unionpay', payName: "银行卡" }
				],
				selectSign: 'wechat'

			};
		},
		watch: {
			inputMoney(val) {
				console.log(val);
			}
		},
		onLoad(opt) {
			if (opt.bank_no) {
				this.isFirstTime = false;
			}
		},
		components: {
			backHeader
		},
		methods: {
			changeVisible() {
				this.visible = true;
			},
			changePayWay(item) {
				this.selectSign = item.selectSign;
				this.payWay = item.name;
				this.visible = false;
			},
			otherChangeWay(item) {
				this.selectSign = item.selectSign;
				this.payWay = item.payName;
				this.visible = false;
			},
			close() {
				this.visible = false;
			},
			charge() {
				if (parseFloat(this.inputMoney) > 1) {
					reCharge({
						money: this.inputMoney,
						type: this.selectSign
					}).then(res => {
						console.log(res)
						uni.showToast({
							title: res[1].data.err_msg
						})
					})
				} else {
					uni.showToast({
						title: "单次充值金额最低1元哦",
						icon: "none"
					})
				}

			}
		}
	};
</script>

<style lang="less">
	page {
		height: 100%;

		.withdraw-container {
			height: 100%;
			background-color: #f6f6f6;

			.withdraw-main {
				padding: 220rpx 40rpx 0 40rpx;

				.withdraw-top {
					font-size: 24rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					background: #ffffff;
					padding: 40rpx;
					color: #222;
					border-radius: 6rpx;

					.withdraw-way {
						text {
							&:last-child {
								padding-left: 12rpx;
								color: #b2b2b2;
							}
						}
					}

					.other-ways {
						color: #ff4658;
					}
				}

				.withdraw-content {
					margin-top: 10rpx;
					padding: 40rpx;
					background: #fff;
					border-radius: 6rpx;

					.content-top {
						display: flex;
						justify-content: space-between;
						align-items: center;

						view {
							font-size: 32rpx;
							color: #000;

							&:last-child {
								color: #ff4658;
								font-size: 24rpx;
							}
						}
					}

					.content-middle {
						padding: 53rpx 0 28rpx 0;
						font-size: 60rpx;
						color: #222222;
						display: flex;
						border-bottom: 1px solid #000000;
						align-items: center;

						input {
							font-size: 40rpx;
						}
					}

					.withdraw-tip {
						font-size: 24rpx;
						color: #b2b2b2;
						padding-top: 22rpx;
					}

					.withdraw-btn {
						color: #ffffff;
						background: #ff4658;
						font-size: 32rpx;
						font-weight: bold;
						border-radius: 10rpx;
						line-height: 88rpx;
						height: 88rpx;
						margin-top: 80rpx;
						text-align: center;
					}

					.withdraw-rule {
						text-align: center;
						color: #02aaef;
						font-size: 24rpx;
						margin-top: 41rpx;
					}
				}
			}

			.bottom-container {
				position: absolute;
				background: rgba(0, 0, 0, 0.5);
				bottom: 0;
				height: 100%;
				width: 100%;
				z-index: 999;

				.my-wrapper {
					position: absolute;
					left: 0;
					bottom: 0;
					background: #fff;
					width: 750rpx;
					border-top-left-radius: 30rpx;
					border-top-right-radius: 30rpx;

					.withdraw-title {
						text-align: center;
						font-size: 28rpx;
						color: #222;
						padding: 40rpx 0;
						border-bottom: 1px solid #F6F6F6;
					}

					.pay-item {
						padding: 40rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						border-bottom: 1px solid #F6F6F6;

						&:last-child {
							border: none;
						}

						.left-container {
							display: flex;
							align-items: center;

							.img-sign {
								width: 80rpx;
								height: 80rpx;
							}

							.info-container {
								color: #222222;
								font-size: 28rpx;
								margin-left: 44rpx;

								.pay-name {
									margin-bottom: 18rpx;
								}
							}
						}

						.right-container {
							image {
								width: 36rpx;
								height: 36rpx;
							}
						}
					}

					.other-item {
						padding: 40rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						border-bottom: 1px solid #F6F6F6;

						&:last-child {
							border: none;
						}

						.left-container {
							display: flex;
							align-items: center;

							.img-sign {
								width: 40rpx;
								height: 40rpx;
							}

							.info-container {
								color: #222222;
								font-size: 28rpx;
								margin-left: 44rpx;
							}
						}

						.right-container {
							image {
								width: 36rpx;
								height: 36rpx;
							}
						}
					}
				}
			}
		}
	}
</style>