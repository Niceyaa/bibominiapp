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
						<input v-model="vCode" type="number" maxlength="4" placeholder="请输入验证码" />
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
			<view @click="bindNewTel" :class="{'login-btn':true,'activeBtn':totalFlag}">绑定</view>
		</view>

	</view>
</template>

<script>
	import md5 from '../../../tool/md5.js'
	import { sendCode } from '../../../Api/myApi/sendCode.js'
	import { handleTel } from '../../../Api/myApi/handleTel.js'
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
				if (v === 0) {
					clearInterval(this.timeId);
					this.getCodeFlag = true;
				}
			}
		},
		components: { backHeader },
		methods: {
			random8Str(){
				let chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789";
				let len = chars.length;
				let randomStr = "";
				for (var i = 0; i < 8; i++) {
					let r = chars[Math.floor(Math.random()*len)];
					randomStr += r;
				}
				return randomStr;
			},
			formatDate (){
				let dd = new Date();
				let y = dd.getFullYear();
				let m = (dd.getMonth()+1).toString().padStart(2,"0");
				let d = dd.getDate().toString().padStart(2,"0");
				let h = dd.getHours().toString().padStart(2,"0");
				let min = dd.getMinutes().toString().padStart(2,"0");
				let s = dd.getSeconds().toString().padStart(2,"0");
				return y+m+d+h+min+s;
			},
			getCode() {
				let that = this;
				let now = that.formatDate();
				let str = that.random8Str();
				let sign = `${that.telVal}bi354bo${now}${str}`;
				let md5Str = md5(sign);
				sendCode({
					tel:that.telVal,
					datetime:now,
					nonce_str:str,
					sign:md5Str
				}).then(res=>{
					console.log(res)
					uni.showToast({
						title:res[1].data.err_msg,
						icon:"none"
					})
					if(res[1].data.err_code === 0){
						// 短信发送成功
						console.log(1111)
						that.getCodeFlag = false;
						that.leftTime = 60;
						that.timeId = setInterval(() => {
							that.leftTime--;
						}, 1000);
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
				}
			},
			bindNewTel(){
				let sign = uni.getStorageSync("sign");
				console.log(sign,this.telVal,this.vCode)
				handleTel({
					sign:sign,
					tel:this.telVal,
					code:this.vCode,
					is_combine:0
				}).then(res=>{
					console.log("手动绑定手机号",res);
					uni.showToast({
						title:res[1].data.err_msg,
						icon:"none",
						duration:1500
					})
					if(res[1].data.err_code === 0){
						// 绑定成功
						uni.setStorageSync('loginToken', res[1].data.data.token);
						uni.setStorageSync('headImg', res[1].data.data.img);
						uni.setStorageSync('nickName', res[1].data.data.nickname);
						uni.setStorageSync("defaultTel", res[1].data.data.tel)
						uni.setStorageSync('loginStatus', true);
						uni.switchTab({
							url: '/pages/my/newMy'
						});
						uni.showToast({
							title: '恭喜您登录成功！'
						});
					}else if(res[1].data.err_code === 805){
						uni.showToast({
							content:res[1].data.err_msg,
							title:'同一手机号',
							success(res) {
								if(res.confirm){
									handleTel({
										sign:sign,
										tel:this.telVal,
										code:this.vCode,
										is_combine:1
									}).then(newRes=>{
										uni.setStorageSync('loginToken', newRes[1].data.data.token);
										uni.setStorageSync('headImg', newRes[1].data.data.img);
										uni.setStorageSync('nickName', newRes[1].data.data.nickname);
										uni.setStorageSync("defaultTel", newRes[1].data.data.tel)
										uni.setStorageSync('loginStatus', true);
										uni.switchTab({
											url: '/pages/my/newMy'
										});
										uni.showToast({
											title: '恭喜您登录成功！'
										});
									})
								}
							}
						})
					}
				})
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