<template>
	<view class="bank-card">
		<back-header title="银行卡"></back-header>
		<view class="bank-card-main">
			<view class="bank-title">银行卡信息</view>
			<view class="bank-detail">
				<view class="bank-input-item">
					<view class="bank-left">持卡人姓名</view>

					<view class="input-con">
						<input v-model="username" class="code-input" placeholder="请输入姓名"
							placeholder-style="color:#B1B1B1;font-size:28upx" />
						<view class="err-wrapper" v-if="nameFlag">
							<image
								src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/b798dcdbf3c65f78dd076f67abcb348.png"
								mode=""></image>
							<view class="err-tip">格式错误</view>
						</view>
					</view>



				</view>
				<view class="bank-input-item">
					<view class="bank-left">银行卡卡号</view>

					<view class="input-con">
						<input v-model="usercard" class="code-input" type="number" placeholder="请输入卡号"
							placeholder-style="color:#B1B1B1;font-size:28upx" maxlength="19" />
						<view class="err-wrapper" v-if="cardNoFlag">
							<image
								src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/b798dcdbf3c65f78dd076f67abcb348.png"
								mode=""></image>
							<view class="err-tip">格式错误</view>
						</view>
					</view>



				</view>
				<view class="bank-input-item">
					<view class="bank-left">开户行</view>
					<view class="choose-bank">
						<input disabled="1" v-model="userbank" class="code-input" placeholder="选择开户行"
							placeholder-style="color:#B1B1B1;font-size:28upx" />
						<picker mode="selector" :range="bankList" @change="chooseBank">
							<image
								src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/fanhui.png">
							</image>
						</picker>
					</view>
				</view>
			</view>

			<view class="tel-wrapper">
				<view class="bank-input-item">
					<view class="bank-left">预留手机号</view>



					<view class="input-con">
						<input v-model="usertel" class="code-input" type="number" placeholder="请输入手机号"
							placeholder-style="color:#B1B1B1;font-size:28upx" maxlength="11" />
						<view class="err-wrapper" v-if="telFlag">
							<image
								src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/b798dcdbf3c65f78dd076f67abcb348.png"
								mode=""></image>
							<view class="err-tip">格式错误</view>
						</view>
					</view>





				</view>
				<view class="bank-input-item">
					<view class="bank-left">验证码</view>
					<view class="right-wraper">
						<input maxlength="4" v-model="verifyCode" class="code-input" type="number" placeholder="请输入验证码"
							placeholder-style="color:#B1B1B1;font-size:28upx" />
						<view v-if="!sendFlag" @click="getCode">获取验证码</view>
						<view style="color: #C0C0C0;" v-else>重发{{ leftTime }}s</view>
					</view>
				</view>
			</view>
			<button :class="{ submitBank: true, redBgc: totalFlag }" @click="submitBank">提交</button>
		</view>
	</view>
</template>

<script>
	import backHeader from '../../../components/childheader.vue';
	import { updateUserInfo } from '../../../Api/myApi/updateUserInfo.js';
	import { defaultTelCode } from '../../../Api/myApi/defaultTelCode.js';
	export default {
		data() {
			return {
				username: '',
				usercard: '',
				userbank: '',
				bankList: ['建设银行', '工商银行', '农业银行', '中信银行', '招商银行', '光大银行', '交通银行'],
				usertel: '',
				verifyCode: '',
				leftTime: '',
				sendFlag: false,
				nameFlag: false,
				cardNoFlag: false,
				telFlag: false
			};
		},
		computed: {
			totalFlag() {
				return this.username.length > 1 && this.usercard.length > 18 && this.userbank.length > 0 && this.usertel.length > 10 && this.verifyCode.length > 3;
			}
		},
		components: {
			backHeader
		},
		watch: {
			leftTime(val) {
				if (val === 0) {
					clearInterval(this.leftTimeId);
					this.sendFlag = false;
				}
			},
			username() {
				this.nameFlag = false;
			},
			usercard() {
				this.cardNoFlag = false;
			},
			userTel() {
				this.telFlag = false;
			}
		},
		methods: {
			chooseBank(e) {
				this.userbank = this.bankList[e.detail.value];
			},
			getCode() {
				defaultTelCode({
					is_check: 1
				}).then(res => {
					this.leftTime = 60;
					this.sendFlag = true;
					this.leftTimeId = setInterval(() => {
						this.leftTime--;
					}, 1000);
				});
			},
			submitBank() {
				let nameReg = /^[\u4E00-\u9FA5]{2,4}$/;
				if (nameReg.test(this.username) && this.usercard.length > 15 && this.userbank > 0 && this.usertel.length === 11 && this.verifyCode.length === 4) {
					console.log("完全匹配")


					updateUserInfo({
						bank_name: this.username,
						bank_no: this.usercard,
						bank_info: this.userbank,
						code: this.verifyCode,
						tel: this.usertel
					}).then(res => {
						if (res[1].data.err_code === 0) {
							uni.showToast({
								title: '银行卡绑定成功'
							});
							uni.navigateTo({
								url: '/pages/my/setting/setting'
							});
						}
					});

				}
				if (!nameReg.test(this.username)) {
					this.nameFlag = true;
				}
				if (!this.usercard || this.usercard.length < 16) {
					this.cardNoFlag = true;
				}
				if (!this.userbank || this.userbank.length < 1) {
					uni.showToast({
						title: "请选择您的开户银行哦！",
						icon: "none",
						duration: 1000
					})
				}
				if (!this.userTel || this.userTel.length < 11) {
					this.telFlag = true;
				}
				if (!this.verifyCode || this.verifyCode.length < 4) {
					console.log("不满足")
					uni.showToast({
						title: "请填写正确的验证码！",
						icon: "none",
						duration: 2000
					})
				}
			}
		}
	};
</script>

<style lang="less">
	page {
		height: 100%;

		.bank-card {
			height: 100%;
			background: #f6f6f6;

			.bank-card-main {
				padding-top: 140upx;
				font-size: 28upx;

				.bank-title {
					padding: 40upx 0 22upx 40upx;
					color: #222222;
				}

				.bank-detail {
					background: #ffffff;
					align-items: center;
					font-weight: 600;

					.bank-input-item {
						display: flex;
						padding: 36upx;
						border-bottom: 1px solid #f6f6f6;

						.bank-left {
							flex: 0 180upx;
							width: 180upx;
						}

						.input-con {
							flex: 1;
							display: flex;
							justify-content: space-between;
							align-items: center;

							.code-input {
								font-size: 28upx;
								font-weight: normal;
							}

							.err-wrapper {
								display: flex;
								color: #212121;
								font-size: 24upx;
								font-weight: 600;
								align-items: center;

								image {
									padding-right: 8upx;
									width: 34upx;
									height: 34upx;
								}
							}
						}

						.code-input {
							font-size: 28upx;
							font-weight: normal;
						}

						.choose-bank {
							flex: 1;
							display: flex;
							justify-content: space-between;
							align-items: center;

							image {
								width: 23upx;
								height: 13upx;
							}
						}
					}
				}

				.tel-wrapper {
					background: #fff;
					margin-top: 24upx;

					.bank-input-item {
						display: flex;
						padding: 36upx;
						border-bottom: 1px solid #f6f6f6;

						.bank-left {
							flex: 0 180upx;
							width: 180upx;
						}

						.input-con {
							flex: 1;
							display: flex;
							justify-content: space-between;
							align-items: center;

							.code-input {
								font-size: 28upx;
								font-weight: normal;
							}

							.err-wrapper {
								display: flex;
								color: #212121;
								font-size: 24upx;
								font-weight: 600;
								align-items: center;

								image {
									padding-right: 8upx;
									width: 34upx;
									height: 34upx;
								}
							}
						}


						.code-input {
							font-size: 28upx;
							font-weight: normal;
						}

						.right-wraper {
							flex: 1;
							display: flex;
							justify-content: space-between;
							align-items: center;
						}
					}
				}

				.submitBank {
					margin: 80upx 55upx 0 55upx;
					line-height: 96upx;
					height: 96upx;
					text-align: center;
					font-size: 32upx;
					color: #ffffff;
					background: #fb8c97;
					border-radius: 10upx;
				}

				.redBgc {
					background: #ff4658;
				}
			}
		}
	}
</style>