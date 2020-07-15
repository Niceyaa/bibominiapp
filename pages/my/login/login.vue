<template>
	<view class="my-login-container">
		<back-header title="手机验证码登录"></back-header>
		<view class="login-main">
			<view class="login-header">
				<view>登录</view>
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
				<view class="login-item">
					<view class="login-wrapper">
						<view class="item-left">邀请码</view>
						<input v-model="inviteCode" type="number" maxlength="11" placeholder="请输入邀请码" />
					</view>
					<view class="right-wrapper">
						<image @click="clearVal(3)" v-if="inviteFlag"
							src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/cancel.png"
							mode=""></image>
						<view class="choose" style="color:#B2B2B2;">
							(
							<text style="color: #FF4658;">*</text>
							选填)
						</view>
					</view>
				</view>
			</view>
			<view @click="telLogin" :class="{'login-btn':true,'activeBtn':totalFlag}">立即登录</view>
			<view class="login-bottom">
				登陆即同意
				<text style="color: #FF4657;">《服务协议》</text>
				和
				<text style="color: #FF4657;">《隐私政策》</text>
				首次登录将自动注册
			</view>
		</view>
		<view class="third-login">
			<view class="third-title">
				<view class="third-text">第三方登录</view>
				<view class="line-sign"></view>
			</view>
			<view class="qq-wx">
				<image @click="goQQLogin"
					src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/qq.png" mode="">
				</image>
				<image @click="goWXLogin"
					src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/wx.png" mode="">
				</image>
			</view>
		</view>
	</view>
</template>

<script>
	import backHeader from '../../../components/childheader.vue';
	import { phoneCodeLogin } from "../../../Api/myApi/phoneCodeLogin.js"
	import { wxLogin } from "../../../Api/myApi/wxLogin.js"
	import { qqLogin } from "../../../Api/myApi/qqLogin.js"
	import { getTelCode } from "../../../Api/myApi/getTelCode.js"
	export default {
		data() {
			return {
				telVal: "",
				vCode: "",
				inviteCode: "",
				telFlag: false,
				vCodeFlag: false,
				inviteFlag: false,
				getCodeFlag: true,
				leftTime: ""
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
			inviteCode(v) {
				if (v.length > 0) {
					this.inviteFlag = true;
				}
			},
			leftTime(v) {
				if (v === 0) {
					clearInterval(this.timeId);
					this.getCodeFlag = true;
				}
			}
		},
		components: { backHeader },
		methods: {
			goQQLogin() {
				// 调用api执行 若没有绑定手机号 跳转到绑定手机号界面

				uni.navigateTo({
					url: "/pages/my/login/bindTel"
				})
			},
			goWXLogin() {
				// 调用api执行 若没有绑定手机号 跳转到绑定手机号界面
				uni.navigateTo({
					url: "/pages/my/login/bindTel"
				})
			},
			getCode() {
				getTelCode({
					tel: this.telVal
				}).then(res => {
					console.log("发送成功", res)
					console.log("获取验证码");
					this.getCodeFlag = false;
					this.leftTime = 60;
					this.timeId = setInterval(() => {
						this.leftTime--;
					}, 1000)
				})
					;
			},
			telLogin() {
				phoneCodeLogin({
					tel: this.telVal,
					code: this.vCode,
					//city_name: uni.getStorageSync("city")
					city_name: "成都"
				}).then(data => {
					
					console.log("登录触发", data[1].data)
					
					if (data[1].data.err_code === 0) {
						// 登录成功  跳转个人中心页面 
						uni.setStorageSync("headImg", data[1].data.data.img);
						uni.setStorageSync("nickName", data[1].data.data.nickname);
						uni.setStorageSync("loginToken", data[1].data.data.token);
						uni.setStorageSync("loginStatus", true);
						console.log("登陆成功")
						uni.showToast({
							title:"登陆成功！"
						});
						uni.switchTab({
							url: "/pages/my/newMy"
						})

					}else{
						uni.showToast({
							title:"验证码不对，请重新输入！",
							icon:"none"
						})
					}
				})
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
					default:
						this.inviteCode = "";
						this.inviteFlag = false;
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

			.login-bottom {
				text-align: center;
				font-size: 20upx;
				color: #636363;
			}
		}

		.third-login {
			margin-top: 230upx;

			.third-title {
				display: flex;
				justify-content: center;
				flex-wrap: wrap;

				.third-text {
					color: #B1B1B1;
					font-size: 22upx;
					padding: 0 10upx;
					z-index: 9;
					background-color: #fff;
				}

				.line-sign {
					margin-top: -13upx;
					padding: 0 40upx;
					height: 1px;
					width: 600upx;
					background: #DADADA;
					z-index: 1;
				}
			}

			.qq-wx {
				margin-top: 28upx;
				display: flex;
				justify-content: center;

				image {
					width: 60upx;
					height: 60upx;

					&:last-child {
						margin-left: 40upx;
					}
				}
			}
		}
	}
</style>