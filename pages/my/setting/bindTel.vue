<template>
	<view class="my-login-container">
		<back-header title="绑定手机号"></back-header>
		<view class="login-main">
			<view class="login-header">
				<view>绑定手机号</view>
				<view class="red-sign"></view>
			</view>
			<view class="login-input">
				<view class="login-item">
					<view class="login-wrapper">
						<view class="item-left">+86</view>
						<input v-model="telVal" type="number" maxlength="11" placeholder="请输入电话号码" />
					</view>

					<image @click="clearVal(1)" v-if="telFlag"
						src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/cancel.png"
						mode=""></image>
				</view>
				<view class="login-item">
					<view class="login-wrapper">
						<view class="item-left">验证码</view>
						<input v-model="vCode" type="number" maxlength="6" placeholder="请输入验证码" />
					</view>
					<view class="right-wrapper">
						<image @click="clearVal(2)" v-if="vCodeFlag"
							src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/cancel.png"
							mode=""></image>
						<view v-if="getCodeFlag" class="get-code" @click="getCode">获取验证码</view>
						<view v-else style="color: #B1B1B1;">{{leftTime}}S后重发</view>
					</view>
				</view>
			</view>
			<view :class="{'login-btn':true,'activeBtn':totalFlag}">绑定</view>
		</view>

	</view>
</template>

<script>
	import backHeader from '../../../components/childheader.vue';
	export default {
		data() {
			return {
				telVal: "",
				vCode: "",
				inviteCode: "",
				telFlag: false,
				vCodeFlag: false,
				getCodeFlag: true,
				leftTime: "",
			};
		},
		computed: {
			totalFlag() {
				return this.telFlag && this.vCodeFlag;
			}
		},
		watch: {
			telVal(v) {
				if (v.length > 0) {
					this.telFlag = true;
				}
			},
			vCode(v) {
				if (v.length > 0) {
					this.vCodeFlag = true;
				}
			},
			leftTime(v) {
				if (v === 55) {
					clearInterval(this.timeId);
					this.getCodeFlag = true;
				}
			}
		},
		components: { backHeader },
		methods: {
			qqLogin() {
				// 调用api执行 若没有绑定手机号 跳转到绑定手机号界面
				uni.navigateTo({
					url: "/pages/my/login/bindTel"
				})
			},
			wxLogin() {
				// 调用api执行 若没有绑定手机号 跳转到绑定手机号界面
				uni.navigateTo({
					url: "/pages/my/login/bindTel"
				})
			},
			getCode() {
				console.log("获取验证码");
				this.getCodeFlag = false;
				this.leftTime = 60;
				this.timeId = setInterval(() => {
					this.leftTime--;
				}, 1000);
			},
			clearVal(n) {
				switch (n) {
					case 1:
						this.telVal = "";
						this.telFlag = false;
						break;
					case 2:
						this.vCode = "";
						this.vCodeFlag = false;
						break;
				}
			}
		}
	};
</script>

<style lang="less">
	.my-login-container {
		.login-main {
			padding-top: 140upx;

			.login-header {
				padding: 40upx 0 90upx 57upx;
				color: #222;
				font-size: 40upx;
				font-weight: bold;

				.red-sign {
					background: #ff4658;
					width: 84upx;
					height: 14upx;
					margin-top: -12upx;
				}
			}

			.login-input {
				padding: 0 60upx 0 70upx;
				color: #222;
				font-size: 28upx;

				.login-item {
					display: flex;
					justify-content: space-between;
					border-bottom: 1px solid #b2b2b2;
					align-items: center;
					padding: 60upx 0 20upx 0;

					.login-wrapper {
						display: flex;
						align-items: center;

						.item-left {
							width: 112upx;
						}

						input {
							width: 220upx;
						}
					}

					image {
						width: 32upx;
						height: 32upx;
					}

					.right-wrapper {
						display: flex;
						align-items: center;

						image {
							margin-right: 40upx;
						}
					}
				}
			}

			.login-btn {
				margin: 80upx 40upx 50upx 40upx;
				color: #ffffff;
				background: #ff8a94;
				height: 80upx;
				width: 670upx;
				line-height: 80upx;
				text-align: center;
				font-weight: bold;
				font-size: 28upx;
				border-radius: 40upx;
			}

			.activeBtn {
				background: #FF4557;
			}
		}
	}
</style>