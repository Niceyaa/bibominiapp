<template>
	<view class="my-order" v-if="loginStatus">
		<back-header title="我的订单"></back-header>
		<view class="my-order-main">
			<view class="order-navigator">
				<view class="header-wrapper" @click="changeOrderStatus('payed')">
					
						<view :class="{'navigator-title':true,clicked:status === 'payed'}">待取票</view>
						
					<view class="litter-wrapper">
						<view v-if="status === 'payed'" class="red-sign"></view>
					</view>
					
				</view>
				<view class="header-wrapper" @click="changeOrderStatus('shipped')">
					<view :class="{'navigator-title':true,clicked:status === 'shipped'}">待收货</view>
					<view class="litter-wrapper">
						<view v-if="status === 'shipped'" class="red-sign"></view>
					</view>
					
				</view>
				<view class="header-wrapper" @click="changeOrderStatus('geted')">
					<view :class="{'navigator-title':true,clicked:status === 'geted'}">已取票</view>
					<view class="litter-wrapper">
						<view v-if="status === 'geted'" class="red-sign"></view>
					</view>
					
				</view>
				<view class="header-wrapper" @click="changeOrderStatus('lock')">
					<view :class="{'navigator-title':true,clicked:status === 'lock'}">待付款</view>
					<view class="litter-wrapper">
						<view v-if="status === 'lock'" class="red-sign"></view>
					</view>
					
				</view>
			</view>
			<view v-if="noOrder" class="order-detail">
				<common-order @isNull="getLen" :status="status"></common-order>
			</view>
			<view v-else class="no-list">
				<view class="other-container">
					<image src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/temp/noorder.png" mode=""></image>
					<view class="no-address">暂无订单</view>
				</view>
			</view>
		</view>
		
	</view>
	<no-login v-else></no-login>
</template>

<script>
import noLogin from '../login/noLogin.vue'
import commonOrder from './commonOrderItem.vue';
import backHeader from '../../../components/childheader.vue';
export default {
	data() {
		return {
			// lock 待付款；payed 待取票；shipped 待收货；geted 已取票
			status: "payed",
			loginStatus: false,
			noOrder: true
		};
	},
	components: {
		backHeader,
		commonOrder,
		noLogin
	},
	methods: {
		// 改变导航栏
		changeOrderStatus(status){
			this.status = status;
			this.noOrder = true;
			console.log(1111)
		},
		// 获取子组件中订单的长度
		getLen(e){
			if(!!e&&e.length>0){
				console.log(1)
				this.noOrder = true;
			}else{
				console.log(2)
				this.noOrder = false;
			}
			console.log("我是子组件传过来的值",e);
		}
	},
	onLoad() {
		if(uni.getStorageSync("loginStatus")){
			this.loginStatus = true;
		}
	}
};
</script>

<style lang="less" scoped>
page{
	height: 100%;
	.my-order{
		height: 100%;
		background: #F6F6F6;
		position: relative;
		.my-order-main{
			padding-top: 140upx;
			height: 100%;
			box-sizing: border-box;
			.order-navigator{
				display: flex;
				padding: 25upx 40upx 0 40upx;
				background: #fff;
				justify-content: space-between;
				color: #666666;
				font-size: 28upx;
				.header-wrapper{
					.litter-wrapper{
						display: flex;
						justify-content: center;
					}
					.navigator-title{
						position: relative;
						z-index: 999;
					}
					.clicked{
						font-weight: 600;
						color: #222;
					}
					.red-sign{
						background: #FF4657;
						
						width: 59upx;
						height: 6upx;
						margin-top: 10upx;
						border-radius: 4upx;
						z-index: 1;
					}
				}
			}
			.no-list {
				width: 750upx;
				position: absolute;
				left: 0;
				top: 0;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				.other-container {
					image {
						width: 393upx;
						height: 289upx;
					}
					.no-address {
						text-align: center;
						font-size: 26upx;
						color: #000000;
						font-family: PingFangSC-Regular;
					}
				}
			}
		}
		
	}
}
</style>
