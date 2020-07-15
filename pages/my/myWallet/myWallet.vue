<template>
	<view v-if="loginStatus" class="my-wallet">
		<back-header title="我的钱包"></back-header>
		<view class="my-balance">
			<image src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/myWallet/yue.png">
			</image>
			<text>我的余额</text>
		</view>
		<view class="balance-num">￥
			<text>{{balanceNum}}</text>
		</view>
		<view class="bill-wrapper">
			<text @click="showMyBill" class="my-bill">我的账单</text>
		</view>
		<view class="user-operate">
			<view @click="goToWithdraw" class="withdraw">提现</view>
			<view @click="goToRecharge" class="recharge">充值</view>
		</view>
		<appAlert @changeAppAlertOnoff="changeOnOff" :appAlertOnoff="onoff"></appAlert>
	</view>
	<no-login v-else></no-login>
</template>

<script>
	import { getUserInfoAtSet } from "../../../Api/myApi/getUserInfoAtSet.js"
	import backHeader from '../../../components/childheader.vue';
	import noLogin from '../login/noLogin.vue'
	export default {
		data() {
			return {
				onoff: false,
				balanceNum: "0.00",
				loginStatus: false
			}
		},
		components:{noLogin,backHeader},
		methods: {
			changeOnOff(i) {
				this.onoff = i;
			},
			showMyBill() {
				uni.navigateTo({
					url: "/pages/my/myWallet/myBill"
				})
			},
			goToWithdraw() {
				this.onoff = true;
				/* uni.navigateTo({
					url: `/pages/my/myWallet/myWithdraw?card=${this.bank_no}&all=${this.balance}`
				}) */
			},
			goToRecharge() {
				this.onoff = true;
				/* uni.navigateTo({
					url: '/pages/my/myWallet/myInvest'
				}) */
			},
			back() {
				var pages = getCurrentPages();
				console.log("返回上一页", pages)
				if (pages.length <= 1) {
					console.log("可能是分享页面")
				} else {
					wx.navigateBack({
						delta: 1
					})
				}

			}
		},
		onShow() {
			getUserInfoAtSet().then(res => {
				this.bank_no = res[1].data.data.bank_info.no;
				this.balance = res[1].data.data.balance;
				uni.setStorageSync("bankNo", this.bank_no);
				uni.setStorageSync("balance", this.balance);
				console.log(res[1].data.data)
			})
			// this.balanceNum = "2999.00";
		},
		onLoad() {
			if(uni.getStorageSync("loginStatus")){
				this.loginStatus = true;
			}
			console.log("loginStatus:",this.loginStatus)
		}
	}
</script>

<style lang="less">
	.my-wallet {
		

		.my-balance {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 240upx 0 38upx 0;

			image {
				width: 44upx;
				height: 37upx;
			}

			text {
				color: #B2B2B2;
				font-size: 28upx;
				padding-left: 13upx;
			}
		}

		.balance-num {
			text-align: center;
			font-weight: bold;
			font-size: 40upx;
			color: #222;

			text {
				font-size: 78upx;
			}
		}

		.bill-wrapper {
			padding-top: 40rpx;
			text-align: center;
		}

		.user-operate {
			-padding: 415upx 96upx 0 96upx;
			padding: 355upx 96upx 0 96upx;
			text-align: center;

			view {
				height: 88upx;
				line-height: 88upx;
				font-size: 32upx;
				background: #CCCCCC;
				color: #FF4658;
				font-weight: bold;
				border-radius: 10upx;

				&.withdraw {
					background: #FF4658;
					color: #fff;
					margin-bottom: 62upx;
				}

				&.recharge {}
			}
		}
	}
</style>