<template>
	<view v-if="loginStatus" class="coupon-container">
		<back-header title="我的优惠券"></back-header>
		<view class="coupon-main" v-if="noCoupon">
			<view class="coupon-item" v-for="item in couponList" :key="item.id">
				<view v-if="item.coupon.status === 1" class="normal-status coupon-status"><view>优惠券</view></view>

				<view v-else-if="item.coupon.status === 2" class="used-status coupon-status"><view>已使用</view></view>

				<view v-else class="used-status coupon-status"><view>已过期</view></view>

				<view class="coupon-detail">
					<view v-if="item.coupon.type_id === 0" class="coupon-title">演唱会通用优惠券</view>
					<view v-else class="coupon-title">满{{ item.coupon.condition }}减{{ item.coupon.money }}</view>
					<view v-if="item.coupon.status === 1" class="desc-money">
						￥
						<text>{{ item.coupon.money }}</text>
					</view>
					<view v-else class="desc-money nouse">
						￥
						<text>{{ item.coupon.money }}</text>
					</view>
					<view class="use-time">有效期：{{ item.coupon.start_at }}--{{ item.coupon.end_at }}</view>
				</view>
			</view>
		</view>
		<view class="no-list" v-else>
			<view class="other-container">
				<image src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/temp/noCoupon.png" mode=""></image>
				<view class="no-address">目前暂无优惠券</view>
			</view>
		</view>
	</view>
	<no-login v-else></no-login>
</template>

<script>
import noLogin from '../login/noLogin.vue';
import { formatDate } from '../../../common/formatDate.js';
import backHeader from '../../../components/childheader.vue';
import { couponList } from '../../../Api/myApi/couponList.js';
export default {
	data() {
		return {
			couponList: [],
			loginStatus: false,
			noCoupon: true
		};
	},
	components: {
		backHeader,
		noLogin
	},
	methods: {},
	onLoad() {
		if (uni.getStorageSync('loginStatus')) {
			this.loginStatus = true;
		}
		console.log('loginStatus:', this.loginStatus);
	},
	onShow() {
		// 获取优惠券列表数据
		if (this.loginStatus) {
			couponList().then(res => {
				console.log('优惠券列表：', res);
				this.couponList = res[1].data.data.list;
				if (this.couponList.length > 0) {
					this.noCoupon = true;
					this.couponList.forEach(item => {
						item.coupon.start_at = formatDate(item.coupon.start_at);
						item.coupon.end_at = formatDate(item.coupon.end_at);
					});
				} else {
					this.noCoupon = false;
				}
			});
		}
	}
};
</script>

<style lang="less">
page {
	height: 100%;

	.coupon-container {
		height: 100%;
		background: #f6f6f6;

		.coupon-main {
			padding: 180rpx 40upx 40upx 40upx;

			.coupon-item {
				margin-bottom: 40upx;
				display: flex;

				.coupon-status {
					width: 92upx;
					height: 230upx;
					flex: 0 92upx;
					color: #ffffff;
					font-size: 28upx;
					padding: 64upx 30upx 0 30upx;
					box-sizing: border-box;
					background-size: 100% 100%;
				}

				.normal-status {
					background-image: url(https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/myCoupon/normal.png);
				}

				.used-status {
					background-image: url(https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/myCoupon/nouse.png);
				}

				.coupon-detail {
					flex: 1;
					background: #ffffff;
					padding: 20upx 0 26upx 29upx;
					border-radius: 10upx;
					height: 230upx;
					box-sizing: border-box;

					.coupon-title {
						color: #666666;
						font-size: 24upx;
					}

					.desc-money {
						margin-top: 30upx;
						font-size: 40upx;
						color: #222;
						font-weight: bold;

						text {
							font-size: 78upx;
						}
					}

					.nouse {
						color: #b2b2b2;
					}

					.use-time {
						color: #b2b2b2;
						font-size: 24upx;
					}
				}
			}
		}
		.no-list {
			height: 100%;
			background: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			.other-container {
				image {
					width: 393upx;
					height: 289upx;
				}
				.no-address {
					text-align: center;
					font-size: 26upx;
					color: #000000;
					font-family: PingFangSC-Regular;
				}
			}
		}
	}
}
</style>
