<template>
	<view class="real-name">
		<back-header title="实名认证"></back-header>
		<view class="real-main">
			<view class="real-title">本人身份信息</view>
			<view class="real-detail">
				<view class="input-items">
					<view class="name">姓名</view>
					<input v-model="userName" class="input" type="text" placeholder-style="color:#B1B1B1;font-size: 28upx;font-weight:normal;" placeholder="请输入姓名" />
				</view>
				<view class="input-items">
					<view class="name">身份证号</view>
					<input
						class="input"
						v-model="userNum"
						type="number"
						maxlength="18"
						placeholder-style="color:#B1B1B1;font-size: 28upx;font-weight:normal;"
						placeholder="请输入身份证号码"
					/>
				</view>
			</view>
			<button v-if="totalFlag" style="background:#FF4657;" class="submitInfo" @click="submitInfo">已完成</button>
			<button v-else class="submitInfo" disabled>提交</button>
		</view>
	</view>
</template>

<script>
import backHeader from '../../../components/childheader.vue';
import { updateUserInfo } from '../../../Api/myApi/updateUserInfo.js';
export default {
	data() {
		return {
			nameFlag: false,
			numFlag: false,
			userName: '',
			userNum: ''
		};
	},
	watch: {
		userName(v) {
			if (v.length > 0) {
				this.nameFlag = true;
			}
		},
		userNum(v) {
			console.log(v);
			if (v.length) {
				this.numFlag = true;
			}
		}
	},
	computed: {
		totalFlag() {
			return this.nameFlag && this.numFlag;
		}
	},
	components: { backHeader },
	methods: {
		submitInfo() {
			if (this.userNum.length < 18) {
				uni.showToast({
					title: '身份证需要18位哦'
				});
				return;
			}
			updateUserInfo({
				card_no: this.userNum,
				name: this.userName
			}).then(res => {
				let data = res[1].data.data;
				if (res[1].data.err_code === 0) {
					console.log('bangdingchenggong ');
					uni.showToast({
						title: '实名信息绑定成功'
					});
					uni.navigateTo({
						url: '/pages/my/setting/setting'
					});
				}
				console.log(res);
			});
		}
	}
};
</script>

<style lang="less">
page {
	height: 100%;
	.real-name {
		height: 100%;
		background: #f6f6f6;
		.real-main {
			padding-top: 140upx;
			.real-title {
				padding: 36upx 0 18upx 40upx;
				font-size: 28upx;
				color: #212121;
			}
			.real-detail {
				background: #ffffff;
				color: #212121;
				font-weight: 600;
				font-size: 28upx;
				.input-items {
					display: flex;
					align-items: center;
					padding: 36upx;
					border-bottom: 1px solid #f9f9f9;
					.name {
						flex: 0 138upx;
					}
					.input {
						flex: 1;
						height: 28upx;
						font-weight: normal;
					}
					&:last-child {
						border-bottom: none;
					}
				}
			}
			.submitInfo {
				margin: 80upx 54upx 0 54upx;
				font-size: 32upx;
				height: 96upx;
				line-height: 96upx;
				text-align: center;
				border-radius: 10upx;
				background: #fb8b97;
				color: #ffffff;
			}
		}
	}
}
</style>
