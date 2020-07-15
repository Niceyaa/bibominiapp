<template>
	<view class="my-modal" v-if="modalFlag">
		<view class="modal-content">
			<view class="modal-title">授权手机号</view>
			<view class="modal-desc">为了方便您的使用，请点击确认允许获取您的手机号</view>
			<view class="modal-bottom">
				<button class="my-btn" @click="cancel">取消</button>
				<button open-type="getPhoneNumber" @getphonenumber="getTel" class="my-btn confirm-btn">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
import { authTel } from '../../../Api/myApi/authTel.js';
export default {
	props: {
		modalFlag: {
			type: Boolean,
			default: false
		},
		img: { type: String },
		nickname: { type: String }
	},
	methods: {
		cancel() {
			console.log('取消');
			this.$emit('update:modalFlag', false);
			uni.showToast({
				title: '您还未登陆哦！',
				icon: 'none'
			});
		},
		getTel(res) {
			console.log(res);
			if (res.detail.errMsg === 'getPhoneNumber:ok') {
				// 表示用户同意授权手机号
				console.log('同意授权');
				console.log('获取手机号', res.detail.iv);
				console.log('获取手机号', res.detail.encryptedData);
				let sign = uni.getStorageSync('sign');
				console.log('sign', sign);
				authTel({
					appid: 'wxf63dc6a8c922901d',
					sign: sign,
					encryptedData: res.detail.encryptedData,
					iv: res.detail.iv
				}).then(authRes => {
					console.log('authRes', authRes);
					if (authRes[1].data.err_code === 806) {
						uni.showToast({
							title: authRes[1].data.err_msg,
							icon: 'none'
						});
						uni.navigateTo({
							url: '/pages/my/login/bindTel'
						});
						this.$emit('update:modalFlag', false);
					} else {
						this.$emit('setNickname', authRes[1].data.data.nickname);
						this.$emit('setImg', authRes[1].data.data.img);
						this.$emit('setStatus', true);
						uni.setStorageSync('loginToken', authRes[1].data.data.token);
						uni.setStorageSync('headImg', authRes[1].data.data.img);
						uni.setStorageSync('nickName', authRes[1].data.data.nickname);
						uni.setStorageSync('defaultTel', authRes[1].data.data.tel);
						uni.setStorageSync('loginStatus', true);
						uni.switchTab({
							url: '/pages/my/newMy'
						});
						uni.showToast({
							title: '恭喜您登录成功！'
						});
					}
				});
				this.$emit('update:modalFlag', false);
			} else {
				// 表示用户拒绝授权手机号
				uni.showToast({
					title: '需要授权才能访问哦',
					icon: 'none'
				});
			}
		}
	}
};
</script>

<style lang="less">
.my-modal {
	height: 100%;
	width: 750upx;
	background: rgba(0, 0, 0, 0.5);
	position: fixed;
	z-index: 999;
	top: 0;
	display: flex;
	align-items: center;
	.modal-content {
		width: 100%;
		box-sizing: border-box;
		background: #fff;
		margin: 0 40upx;
		border-radius: 10upx;
		font-size: 28upx;
		text-align: center;
		.modal-title {
			padding: 30upx;
			font-size: 32upx;
			color: #666;
			border-bottom: 1px solid #f6f6f6;
		}
		.modal-desc {
			padding: 54upx 0;
			color: #222;
			font-size: 28upx;
		}
		.modal-bottom {
			padding: 40upx 85upx;
			display: flex;
			justify-content: space-between;
			.my-btn {
				width: 200upx;
				height: 70upx;
				border: 1px solid #222;
				line-height: 70upx;
				font-size: 28upx;
				border-radius: 40upx;
			}
			.confirm-btn {
				border: none;
				width: 201upx;
				height: 71upx;
				border: none;
				color: #ffffff;
				background: #ff4658;
			}
		}
	}
}
</style>
