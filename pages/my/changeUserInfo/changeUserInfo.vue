<template>
	<view v-if="loginStatus" class="change-user-info">
		<back-header title="修改信息"></back-header>
		<view class="change-main">
			<view class="change-item ">
				<view>头像</view>
				<image :src="headImg" @click="goToHeadImg"></image>
			</view>
			<view class="change-item">
				<view>昵称</view>
				<view @click="goToName">{{nickName}}</view>
			</view>
		</view>
	</view>
	<no-login v-else></no-login>
</template>

<script>
	import noLogin from '../login/noLogin.vue'
	import backHeader from '../../../components/childheader.vue';
	export default {
		data() {
			return {
				headImg: "",
				nickName: "",
				loginStatus: false
			}
		},
		components:{backHeader,noLogin},
		methods: {
			goToName(){
				uni.navigateTo({
					url:"/pages/my/changeUserInfo/setName"
				})
			},
			goToHeadImg(){
				uni.navigateTo({
					url:"/pages/my/changeUserInfo/setHeadImg"
				})
			}
		},
		onShow() {
			this.headImg = uni.getStorageSync("headImg");
			this.nickName = uni.getStorageSync("nickName");
		},
		onLoad() {
			if(uni.getStorageSync("loginStatus")){
				this.loginStatus = true;
			}
			console.log("loginStatus:",this.loginStatus)
		}
	}
</script>

<style lang="less">
page{
	height: 100%;
	.change-user-info{
		height: 100%;
		background-color: #F6F6F6;
		.change-main{
			padding-top: 140upx;
			.change-item{
				padding: 40upx;
				background: #fff;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 28upx;
				color: #222;
				&:first-child{
					margin-top: 20upx;
					border-bottom: 1px solid #F6F6F6;
				}
				image{
					width: 70upx;
					height: 70upx;
					border-radius: 40upx;
				}
			}
		}
	}
}
</style>
