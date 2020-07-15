<template>
	<view class="go-login">
		<back-header title="请登录"></back-header>
		<view class="no-login">
			<view class="login-wrapper">
				<view class="tip">请登录以查看信息</view>
				<button class="login-btn" open-type="getUserInfo" @getuserinfo="getInfo">立即登录</button>
			</view>
		</view>
		<tel-modal @setStatus="updateStatus" @setNickname="updateName" @setImg="updateImg" :img.sync="userInfo.img"
			:nickname.sync="userInfo.nickName" :modalFlag.sync="isTel"></tel-modal>
	</view>
</template>
<script>
	import { telModal } from '../setting/telModal.vue'
	import backHeader from '../../../components/childheader.vue';
	import { loginApi } from '../../../Api/userApi';
	export default {
		data() {
			return {
				appid: 'wxf63dc6a8c922901d',
				isTel: false,
				userInfo: {
					img: 'https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/newMy/headimg.png',
					nickName: '立即登录'
				},
			};
		},
		components: { backHeader, telModal },
		methods: {
			updateImg(i) {
				console.log(i)
			},
			updateName(i) {
				console.log(i)
			},
			updateStatus(i) {
				console.log(i)
			},
			getInfo(e) {
				let that = this;
				uni.login({
					provider: 'weixin',
					success(loginRes) {
						console.log('loginRes', loginRes);
						uni.getUserInfo({
							lang: 'zh_CN',
							success(res) {
								console.log('getuserinfo', res);
								uni.setStorageSync("city", that.$store.state.addressDefault.split("市")[0]);
								loginApi({
									appid: that.appid,
									code: loginRes.code,
									iv: res.iv,
									encryptedData: res.encryptedData,
									nickname: res.userInfo.nickName,
									img: res.userInfo.avatarUrl,
									sex: res.userInfo.gender,
									city_name: that.$store.state.addressDefault.split("市")[0]
								}).then(data => {
									// 保存sign
									console.log("api", data)
									if (data[1].data.err_code === 302) {
										console.log('还未授权');
										uni.setStorageSync('sign', data[1].data.data.sign);
										that.isTel = true;
									} else {
										console.log('授权之后');
										that.userInfo.nickName = data[1].data.data.nickname;
										that.userInfo.img = data[1].data.data.img;
										that.loginStatus = true;
										uni.setStorageSync('loginToken', data[1].data.data.token);
										uni.setStorageSync('headImg', data[1].data.data.img);
										uni.setStorageSync('nickName', data[1].data.data.nickname);
										uni.setStorageSync('loginStatus', true);
										uni.setStorageSync('defaultTel', data[1].data.data.tel);
										uni.switchTab({
											url: "/pages/my/newMy"
										})
									}
								})
							}
						})
					}
				})
			}
		}
	};
</script>
<style lang="less">
	page {
		height: 100%;
	}

	.go-login {
		height: 100%;
	}

	.no-login {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.login-wrapper {
			.tip {
				font-size: 26upx;
				color: #b1b1b1;
				line-height: 100upx;
				text-align: center;
			}

			.login-btn {
				background: #ff4557;
				color: #fff;
				line-height: 100upx;
				height: 100upx;
				width: 600upx;
				border-radius: 50upx;
			}
		}
	}
</style>