<template>
	<view class="newMy">
		<view class="my-header">
			<view class="head-img">
				<image @click="goToPage('/pages/my/changeUserInfo/changeUserInfo')" class="head-desc"
					:src="userInfo.img" mode=""></image>
				<view class="login-wrapper">
					<button class="login-btn" open-type="getUserInfo"
						@getuserinfo="bindgetuserinfo">{{ userInfo.nickName }}</button>
					<view v-if="!loginStatus" class="login-tip">登录以同步个人订单信息</view>
				</view>
			</view>
		</view>
		<view class="setting-wrapper">
			<!-- <image @click="goToPage('/pages/my/setting/setting')" src="../../static/image/newMy/setting.png" mode=""></image>
			<image @click="goToPage('/pages/my/message/message')" src="../../static/image/newMy/xiaoxi.png" mode=""></image> -->
		</view>

		<view class="my-member">
			<view class="member-wrapper">
				<view class="member-left">
					<view class="member-icon">
						<image
							src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/fa453d0bdd4f21018f3831a42b053b5.png"
							mode=""></image>
						<view>开通会员</view>
					</view>
					<view class="member-tip">会员优先出票，享受超值折扣价格</view>
				</view>
				<view class="member-right" @click="openMember">
					<view class="member-btn">开通会员</view>
					<image
						src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/4a1acc6dc63288660533da4e1061c36.png"
						mode=""></image>
				</view>
			</view>
		</view>

		<view class="middle-wrapper">
			<view @click="goToPage('/pages/my/myOrder/myOrder')" class="middle-item">
				<image src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/newMy/order.png" />
				<view>我的订单</view>
			</view>
			<view @click="goToPage('/pages/my/myTurnOrder/myTurnOrder')" class="middle-item">
				<image src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/newMy/turnorder.png" />
				<view>我的转票</view>
			</view>
			<view @click="goToPage('/pages/my/myWallet/myWallet')" class="middle-item">
				<image src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/newMy/wallet.png" />
				<view>我的钱包</view>
			</view>
		</view>
		<view class="more-func">
			<view class="func-title">更多功能</view>
			<myMenu :listMenu="listMenu"></myMenu>
		</view>
		<tel-modal @setStatus="updateStatus" @setNickname="updateName" @setImg="updateImg" :img.sync="userInfo.img"
			:nickname.sync="userInfo.nickName" :modalFlag.sync="isTel"></tel-modal>
		<appAlert @changeAppAlertOnoff="changeOnOff" :appAlertOnoff="onoff"></appAlert>
	</view>
</template>

<script>
	import myMenu from '../../components/myMenu';
	import { loginApi } from '../../Api/userApi';
	import { authTel } from '../../Api/myApi/authTel';
	import { telModal } from './setting/telModal';
	export default {
		data() {
			return {
				isTel: false,
				userInfo: {
					img: 'https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/newMy/headimg.png',
					nickName: '立即登录'
				},
				onoff: false,
				appid: 'wxf63dc6a8c922901d',
				loginStatus: false,
				// 用户头像
				headImg:
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591079014819&di=11933c0b48403bb5b92138b25b4c6711&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg',
				listMenu: [
					{
						iconPath: 'https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/temp/wannasee.png',
						text: '想看的演出',
						goToUrl: '/pages/my/wantToSee/wantToSee'
					},
					{
						iconPath: 'https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/temp/concertart.png',
						text: '关注的艺人',
						goToUrl: '/pages/my/concertArtist/concertArtist'
					},
					{
						iconPath: 'https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/temp/address.png',
						text: '地址管理',
						goToUrl: '/pages/my/addressManage/addressManage'
					},
					{
						iconPath: 'https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/temp/coupon.png',
						text: '我的优惠券',
						goToUrl: '/pages/my/myCoupon/myCoupon'
					},
					{
						iconPath: 'https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/temp/service.png',
						text: '联系客服',
						goToUrl: '/pages/my/relateService/relateService'
					},
					{
						iconPath: 'https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/temp/cooperate.png',
						text: '商务合作',
						goToUrl: '/pages/my/coopration/coopration'
					},
					{
						iconPath: 'https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/temp/commonques.png',
						text: '常见问题',
						goToUrl: '/pages/my/commonQuestion/commonQuestion'
					},
					{
						iconPath: 'https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/temp/setting.png',
						text: '设置',
						goToUrl: '/pages/my/setting/setting'
					}
				]
			};
		},
		components: {
			myMenu,
			telModal
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内分享按钮
				console.log(res.target);
			}
			return {
				title: '我的',
				path: '/pages/my/my'
			};
		},
		onShow() {
			this.loginStatus = uni.getStorageSync('loginStatus') ? true : false;

			this.userInfo.img = 'https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/newMy/headimg.png';
			this.userInfo.nickName = '立即登录';
			if (uni.getStorageSync('headImg') && uni.getStorageSync('nickName')) {
				this.userInfo.img = uni.getStorageSync('headImg');
				this.userInfo.nickName = uni.getStorageSync('nickName');
			}
		},
		onPullDownRefresh() { },
		methods: {
			changeOnOff(i) {
				this.onoff = i;
			},
			updateImg(i) {
				this.userInfo.img = i;
			},
			updateName(i) {
				this.userInfo.nickName = i;
			},
			updateStatus(i) {
				this.loginStatus = i;
			},
			openMember() {
				this.onoff = true;
			},
			goToPage(url) {
				uni.navigateTo({
					url
				});
			},
			// 获取用户信息后登录
			bindgetuserinfo(e) {
				console.log('我也是测试', e);
				let that = this;
				if (uni.getStorageSync('loginStatus') === true) {
					uni.navigateTo({
						url: '/pages/my/setting/setting'
					});
					return;
				}
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
									console.log("api", data);
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
									}
								})
							}
						})
					}
				})
			},
			goToMyOrder() {
				uni.navigateTo({
					url: '/pages/my/myOrder/myOrder'
				});
			}
		}
	};
</script>

<style lang="less">
	page {
		height: 100%;

		.newMy {
			height: 100%;
			background: #f6f6f6;
			position: relative;

			.my-header {
				height: 370rpx;
				box-sizing: border-box;
				background: #fff;
				padding: 170rpx 0 60rpx 40rpx;

				.head-img {
					display: flex;
					align-items: center;

					.head-desc {
						width: 140rpx;
						height: 140rpx;
						border-radius: 80rpx;
					}

					.login-wrapper {
						padding: 27rpx 0 27rpx 50rpx;

						.login-btn {
							font-size: 46rpx;
							color: #222;
							font-weight: bold;
							padding: 0;
							margin: 0;
							background: none;
							border: none;
							line-height: 45rpx;
							padding-bottom: 18rpx;
							text-align: left;

							&::after {
								border: none;
								background: none;
								padding: 0;
								margin: 0;
								width: 190rpx;
								height: 45rpx%;
								transform: scale(1);
								position: relative;
							}
						}

						.login-tip {
							color: #666666;
							font-size: 26rpx;
						}
					}
				}
			}

			.setting-wrapper {
				position: absolute;
				right: 0;
				top: 0;
				width: 256rpx;
				height: 288rpx;
				box-sizing: border-box;
				background-image: url(https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/newMy/bgc.png);
				background-size: 100% 100%;

				image {
					width: 48rpx;
					height: 42rpx;
					padding-top: 100rpx;
					-padding-top: 67rpx;

					&:first-child {
						padding: 0 50rpx 0 76rpx;
					}
				}
			}

			.my-member {
				height: 120upx;
				width: 750upx;
				box-sizing: border-box;
				padding: 0 40upx;
				overflow: hidden;
				background: #fff;

				.member-wrapper {
					height: 120upx;
					box-sizing: border-box;
					background: #222222;
					padding: 0 19upx 0 43upx;
					box-shadow: 0px 0px 27rpx 0px rgba(42, 42, 42, 0.2);
					border-top-left-radius: 10rpx;
					border-top-right-radius: 10rpx;
					display: flex;
					justify-content: space-between;
					align-items: flex-end;

					.member-left {
						flex: 1;

						.member-icon {
							display: flex;
							align-items: center;
							padding: 36upx 0 14upx 0;
							font-size: 28upx;
							color: #ebd095;
							font-family: PingFangSC-Regular;

							image {
								padding-right: 17upx;
								width: 30upx;
								height: 27upx;
							}
						}

						.member-tip {
							font-size: 24upx;
							color: #ffffff;
							font-family: PingFangSC-Regular;
							padding-bottom: 14upx;
						}
					}

					.member-right {
						flex: 0 160upx;
						font-size: 24upx;
						height: 60upx;
						width: 160upx;
						background: #ebd095;
						color: #ffffff;
						box-sizing: border-box;
						border-radius: 30upx;
						margin-bottom: 14upx;
						display: flex;
						align-items: center;
						justify-content: center;

						image {
							width: 12upx;
							height: 21upx;
							padding-left: 12upx;
						}
					}
				}
			}

			.middle-wrapper {
				display: flex;
				background: #fff;
				padding: 36rpx 0;
				justify-content: space-around;
				box-shadow: 0 -6px 16px 0 rgba(0, 0, 0, 0.14);

				.middle-item {
					text-align: center;

					image {
						width: 54rpx;
						height: 54rpx;
					}

					view {
						font-size: 28rpx;
						color: #222222;
					}
				}
			}

			.more-func {
				margin-top: 20rpx;
				background: #fff;
				padding-top: 65rpx;

				.func-title {
					padding-left: 40rpx;
					color: #222;
					font-size: 32rpx;
					font-weight: bold;
				}
			}
		}
	}
</style>