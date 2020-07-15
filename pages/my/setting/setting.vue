<template>
	<view v-if="loginStatus" class="setting-container">
		<back-header title="设置"></back-header>
		<view class="setting-main">
			<view class="info-header">
				<view class="header-item">
					<view class="header-left">
						<view>手机号码</view>
						<view class="tel">{{ tel }}</view>
					</view>
					<view class="header-right" @click="goToChangeTel">
						<view>更换</view>
						<image src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/fanhui.png"
							mode=""></image>
					</view>
				</view>

				<view class="header-item">
					<view class="header-left">
						<view>实名认证</view>
					</view>
					<view class="header-right">
						<view v-if="userStatus.isRealName">已实名</view>
						<view v-if="!userStatus.isRealName" @click="goToRealName">未实名</view>
						<image v-if="!userStatus.isRealName"
							src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/fanhui.png"
							mode=""></image>
					</view>
				</view>

				<view class="header-item">
					<view class="header-left">
						<view>银行卡</view>
					</view>
					<view class="header-right" @click="goToBankCard">
						<view v-if="userStatus.userCard">{{userCard}}</view>
						<view v-else>未绑定</view>
						<image src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/fanhui.png"
							mode=""></image>
					</view>
				</view>

				<view class="header-item">
					<view class="header-left">
						<view>安全密码</view>
					</view>
					<view class="header-right" @click="goToSafePwd">
						<view v-if="userStatus.isPwd">已设置</view>
						<view v-else>未设置</view>
						<image src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/fanhui.png"
							mode=""></image>
					</view>
				</view>
			</view>
			<view class="receive-message">
				<view class="message-title">接收新消息</view>
				<view class="right-open">
					<text v-if="messageSwitchFlag">允许</text>
					<text v-else>关闭</text>
					<switch class="my-switch" :checked="messageSwitchFlag" color="#39D78F" @change="switch2Change" />
				</view>
			</view>

			<view class="message-footer">
				<view @click="goToFeedback" class="footer-item">
					<view>意见反馈</view>
					<image 
						src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/fanhui.png">
					</image>
				</view>
				<view @click="goToAboutUs" class="footer-item">
					<view>关于我们</view>
					<image 
						src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/fanhui.png">
					</image>
				</view>
			</view>
			<button @click="quitLogin" class="quit-login">退出登录</button>
		</view>
	
	</view>
	<no-login v-else></no-login>
</template>

<script>
	import telModal from './telModal.vue'
	import noLogin from '../login/noLogin.vue'
	import backHeader from '../../../components/childheader.vue';
	import { getUserInfoAtSet } from "../../../Api/myApi/getUserInfoAtSet.js"
	import { defaultTelCode } from "../../../Api/myApi/defaultTelCode.js"
	import { updateUserInfo } from "../../../Api/myApi/updateUserInfo.js"
	export default {
		data() {
			return {
				tel: "",
				messageSwitchFlag: true,
				userCard: "",
				userStatus: {
					isRealName: false,
					userCard: false,
					isPwd: false,
				},
				loginStatus: false,
				isTel:false
			};
		},
		watch: {
			messageSwitchFlag() {
				updateUserInfo({
					en_push: this.messageSwitchFlag ? 1 : 0
				}).then(res => {
					console.log("更新消息", res)
				})
			}
		},
		components: { backHeader,noLogin,telModal },
		methods: {
			quitLogin() {
				uni.clearStorageSync();
				uni.switchTab({
					url: "/pages/my/newMy"
				})
			},
			switch2Change(e) {
				this.messageSwitchFlag = !this.messageSwitchFlag;
				console.log(this.messageSwitchFlag);
			},
			goToBankCard() {
				uni.navigateTo({
					url: "/pages/my/setting/bankCard"
				})
			},
			goToFeedback() {
				uni.navigateTo({
					url: "/pages/my/setting/questionFeedback"
				})
			},
			goToAboutUs() {
				uni.navigateTo({
					url: "/pages/my/setting/aboutUs"
					// url: "/pages/my/login/bindTel"
				})
			},
			goToChangeTel() {
				uni.navigateTo({
					url: "/pages/my/setting/changeTel"
				})
			},
			goToRealName() {
				uni.navigateTo({
					url: "/pages/my/setting/realName"
				})
			},
			goToSafePwd() {
				uni.setStorageSync("isPwd", this.userStatus.isPwd);
				if (this.userStatus.isPwd) {
					console.log("设置了密码");
					uni.navigateTo({
						url: "/pages/my/setting/inputCode"
					})
				} else {
					console.log("未设置安全密码");
					uni.navigateTo({
						url: "/pages/my/setting/setSafePassword"
					});
				}
			}
		},
		onShow() {
			console.log(111)
			getUserInfoAtSet().then(res => {
				let data = res[1].data.data;
				console.log("获取信息", data);

				this.tel = data.tel;
				this.userCard = data.bank_info.bank;


				this.userStatus.isRealName = !!data.name;
				this.userStatus.isPwd = data.balance_passwd;
				this.userStatus.userCard = !!data.bank_info.no;

				// 接收消息
				this.messageSwitchFlag = data.en_push === 1 ? true : false;

				// 本地存储tel,isPwd,是否绑定了
				uni.setStorageSync("isPwd", this.userStatus.isPwd);
			})
		},
		onLoad() {
			if(uni.getStorageSync("loginStatus")){
				this.loginStatus = true;
			}
			if(uni.getStorageSync("defaultTel")){
				this.isTel = false;
			}else{
				this.isTel = true;
			}
		}
	};
</script>

<style lang="less">
	page {
		height: 100%;

		.setting-container {
			height: 100%;
			background: #f6f6f6;

			.setting-main {
				padding-top: 140rpx;

				.info-header {
					margin-top: 31upx;
					background: #fff;

					.header-item {
						padding: 36upx;
						border-bottom: 1px solid #f6f6f6;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.header-left {
							color: #222222;
							font-size: 28upx;

							.tel {
								color: #9a9a9a;
								margin-top: 16upx;
							}
						}

						.header-right {
							display: flex;
							align-items: center;
							color: #b2b2b2;
							font-size: 28upx;

							image {
								margin-left: 18upx;
								width: 13upx;
								height: 23upx;
							}
						}
					}
				}

				.receive-message {
					margin-top: 31upx;
					font-size: 28upx;
					color: #222;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 36upx;
					background: #fff;

					.right-open {
						color: #b2b2b2;
						display: flex;
						align-items: center;

						.my-switch {
							margin-left: 20upx;
							transform: scale(0.65, 0.65);
						}
					}
				}

				.message-footer {
					margin-top: 31upx;

					.footer-item {
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 28upx;
						color: #222;
						background: #FFFFFF;
						padding: 36upx;
						border-bottom: 1px solid #f6f6f6;

						&:last-child {
							border: none;
						}

						image {
							width: 13upx;
							height: 23upx;
						}
					}
				}

				.quit-login {
					color: #FF4657;
					font-size: 32upx;
					margin: 100upx 54upx 0 54upx;
					height: 96upx;
					line-height: 96upx;
					text-align: center;
					border: 1px solid #FF4657;
					border-radius: 10upx;
				}
			}
		}
	}
</style>