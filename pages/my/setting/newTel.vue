<template>
	<view class="safe-password">
		<back-header title="更换手机号"></back-header>
		<view class="pwd-main">
			<view class="pwd-title">输入新的手机号</view>
			<view class="verification-code" style="border-bottom: 1px solid #F6F6F6;">
				<view class="left-wrapper">
					<view class="code-left">+86</view>
					<view class="input-con">
						<input v-model="tel" class="code-input" type="number" placeholder="请输入手机号" placeholder-style="color:#B1B1B1;font-size:28upx" maxlength="11" />
						<view class="err-wrapper" v-if="vFlag">
							<image src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/b798dcdbf3c65f78dd076f67abcb348.png" mode=""></image>
							<view class="err-tip">格式错误</view>
						</view>
					</view>
				</view>
			</view>

			<view class="verification-code">
				<view class="left-wrapper">
					<view class="code-left">验证码</view>
					<input :focus="telFlag" v-model="code" class="code-input" type="number" placeholder="请输入验证码" placeholder-style="color:#B1B1B1;font-size:28upx" maxlength="4" />
				</view>

				<view v-if="getCodeFlag" class="code-right" @click="getCode">获取验证码</view>
				<view v-else style="color: #B1B1B1;font-weight: normal;">{{ leftTime }}S后重发</view>
			</view>
			<button :class="{ 'next-step': true, redBgc: totalFlag }" @click="finish">完成</button>
		</view>
	</view>
</template>

<script>
import backHeader from '../../../components/childheader.vue';
import { defaultTelCode } from '../../../Api/myApi/defaultTelCode.js';
import { updateUserInfo } from '../../../Api/myApi/updateUserInfo.js';
export default {
	data() {
		return {
			tel: '',
			code: '',
			telFlag: false,
			codeFlag: false,
			getCodeFlag: true,
			leftTime: '',
			vFlag: false
		};
	},
	watch: {
		leftTime(v) {
			if (v === 0) {
				clearInterval(this.timeId);
				this.getCodeFlag = true;
			}
		},
		tel(v) {
			this.vFlag = false;
			if (v.length === 11) this.telFlag = true;
		},
		code(v) {
			if (v.length === 4) this.codeFlag = true;
			else {
				this.codeFlag = false;
			}
		}
	},
	computed: {
		totalFlag() {
			return this.telFlag && this.codeFlag;
		}
	},
	onLoad(opt) {
		this.oldCode = opt.code;
	},
	components: {
		backHeader
	},
	methods: {
		getCode() {
			if (this.tel.length < 11) {
				this.vFlag = true;
				return;
			}
			defaultTelCode({
				is_check: 0,
				tel: this.tel,
				old_code: this.oldCode
			}).then(res => {
				console.log("newTel",res)
				if(res[1].data.err_msg === "电话号码格式不正确"){
					uni.showToast({
						title:"请输入有效的手机号！",
						icon:"none"
					})
					return
				}else if(res[1].data.err_msg === "验证码错误"){
					uni.showToast({
						title:"验证码错误，请重新输入",
						icon:"none"
					})
					uni.navigateBack()
				}
				if (res[1].data.err_msg === "短信发送成功！") {
					this.getCodeFlag = false;
					this.leftTime = 60;
					uni.showToast({
						title:"短信发送成功"
					})
					this.timeId = setInterval(() => {
						this.leftTime--;
					}, 1000);
				}
				console.log(res);
			});
		},

		finish() {
			if (this.telFlag && this.codeFlag) {
				updateUserInfo({
					tel: this.tel,
					code: this.code
				}).then(res => {
					console.log(res);
					uni.navigateTo({
						url: '/pages/my/setting/setting'
					});
				});
			} else if (this.tel.length < 11) {
				this.vFlag = true;
			} else if (!this.codeFlag) {
				uni.showToast({
					title: '验证码不对，请重新输入！！！',
					icon: 'none'
				});
			}
		}
	}
};
</script>

<style lang="less">
page {
	height: 100%;
	.safe-password {
		height: 100%;
		background: #f6f6f6;
		.pwd-main {
			padding-top: 140upx;
			font-size: 28upx;
			.pwd-title {
				padding: 40upx 0 22upx 40upx;
				color: #222222;
			}
			.verification-code {
				display: flex;
				background: #ffffff;
				justify-content: space-between;
				padding: 36upx;
				align-items: center;
				font-weight: 600;
				.left-wrapper {
					display: flex;
					width: 668upx;
					box-sizing: border-box;
					.code-left {
						flex: 0 120upx;
						width: 120upx;
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
				}
				.code-right {
					flex: 0 250upx;
					text-align: right;
				}
			}
			.next-step {
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
				background: #ff4670;
			}
		}
	}
}
</style>
