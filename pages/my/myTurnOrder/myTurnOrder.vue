<template>
	<view v-if="loginStatus" class="my-order">
		<back-header title="我的转票"></back-header>
		<view class="my-order-main">
			<view class="order-navigator">
				<view class="header-wrapper" @click="changeOrderStatus('2resale')">
					<view :class="{'navigator-title':true,clicked:status === '2resale'}">待转票</view>
					<view class="litter-wrapper">
						<view v-if="status === '2resale'" class="red-sign"></view>
					</view>
					
				</view>
				<view class="header-wrapper" @click="changeOrderStatus('applying')">
					<view :class="{'navigator-title':true,clicked:status === 'applying'}">转票中</view>
					<view class="litter-wrapper">
						<view v-if="status === 'applying'" class="red-sign"></view>
					</view>
					
				</view>
				<view class="header-wrapper" @click="changeOrderStatus('over')">
					<view :class="{'navigator-title':true,clicked:status === 'over'}">已转出</view>
					<view class="litter-wrapper">
						<view v-if="status === 'over'" class="red-sign"></view>
					</view>
					
				</view>
				<view class="header-wrapper" @click="changeOrderStatus('invalid')">
					<view :class="{'navigator-title':true,clicked:status === 'invalid'}">已作废</view>
					<view class="litter-wrapper">
						<view v-if="status === 'invalid'" class="red-sign"></view>
					</view>
					
				</view>
			</view>
			<view v-if="noOrder" class="order-detail">
				<common-order @isNull="getLen" :status="status"></common-order>
			</view>
			<view class="no-list" v-else>
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
			//               applying 转票中；over 已转出；invalid 已作废
			// 2resale 待取票；shipped 待收货；geted 已取票； lock 待付款；
			status: "2resale",
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
		},
		// 获取子组件中订单的长度
		getLen(e){
			if(!!e&&e.length>0){
				this.noOrder = true;
			}else{
				this.noOrder = false;
			}
			console.log("我是子组件传过来的值",e);
		}
	},
	onLoad() {
		if(uni.getStorageSync("loginStatus")){
			this.loginStatus = true;
		}
		console.log("loginStatus:",this.loginStatus)
	}
};
</script>

<style lang="less">
page{
	height: 100%;
	.my-order{
		height: 100%;
		background: #F6F6F6;
		.my-order-main{
			height: 100%;
			padding-top: 140upx;
			box-sizing: border-box;
			position: relative;
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
						z-index: 999;
						position: relative;
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
