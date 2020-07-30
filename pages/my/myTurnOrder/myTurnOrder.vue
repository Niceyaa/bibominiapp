<template>
	<view v-if="loginStatus" class="my-order">
		<back-header backUrl="/pages/my/newMy" title="我的转票"></back-header>
		<view class="my-order-main">
			<view class="order-navigator">
				<view class="header-wrapper" @click="changeOrderStatus('2resale')">
					<view :class="{ 'navigator-title': true, clicked: status === '2resale' }">待转票</view>
					<view class="litter-wrapper"><view v-if="status === '2resale'" class="red-sign"></view></view>
				</view>
				<view class="header-wrapper" @click="changeOrderStatus('applying')">
					<view :class="{ 'navigator-title': true, clicked: status === 'applying' }">转票中</view>
					<view class="litter-wrapper"><view v-if="status === 'applying'" class="red-sign"></view></view>
				</view>
				<view class="header-wrapper" @click="changeOrderStatus('over')">
					<view :class="{ 'navigator-title': true, clicked: status === 'over' }">已转出</view>
					<view class="litter-wrapper"><view v-if="status === 'over'" class="red-sign"></view></view>
				</view>
				<view class="header-wrapper" @click="changeOrderStatus('invalid')">
					<view :class="{ 'navigator-title': true, clicked: status === 'invalid' }">已作废</view>
					<view class="litter-wrapper"><view v-if="status === 'invalid'" class="red-sign"></view></view>
				</view>
			</view>
			<view v-if="noOrder" class="order-detail"><common-order :turnDetail="turnDetail" :status="status"></common-order></view>
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
import noLogin from '../login/noLogin.vue';
import commonOrder from './commonOrderItem.vue';
import backHeader from '../../../components/childheader.vue';
import { formatDate } from '../../../common/formatDate.js';
import { turnOrderList } from '../../../Api/myApi/turnOrderList.js';
import { orderList } from '../../../Api/myApi/orderList.js';
export default {
	data() {
		return {
			//               applying 转票中；over 已转出；invalid 已作废
			// 2resale 待取票；shipped 待收货；geted 已取票； lock 待付款；
			status: '2resale',
			loginStatus: true,
			noOrder: true,
			turnDetail: []
		};
	},
	components: {
		backHeader,
		commonOrder,
		noLogin
	},
	methods: {
		// 改变导航栏
		changeOrderStatus(status) {
			this.turnDetail = [];
			this.status = status;
			this.noOrder = true;

			let stu = this.status;
			let that = this;

			switch (stu) {
				// 待转票
				case '2resale':
					orderList({
						prm: stu
					}).then(res => {
						console.log(res);

						this.turnDetail = res[1].data.data;
						this.getLen();
						that.turnDetail.forEach(item => {
							item.concert_time.start_at = formatDate(item.concert_time.start_at);
						});
					});
					break;
				// 转票中
				case 'applying':
					turnOrderList({
						prm: stu
					}).then(res => {
						console.log(res);
						that.turnDetail = res[1].data.data;
						this.getLen();
						that.turnDetail.forEach(item => {
							if (item.concert_time) {
								item.concert_time.start_at = formatDate(item.concert_time.start_at);
							}
							if (item.order_id === 0) {
								item.resale_apply.concert_time = formatDate(item.resale_apply.concert_time);
							}
						});
					});
					break;
				// 已转出
				case 'over':
					turnOrderList({
						prm: stu
					}).then(res => {
						console.log(res);
						this.turnDetail = res[1].data.data;
						this.getLen();
						this.turnDetail.forEach(item => {
							if (item.concert_time) {
								item.concert_time.start_at = formatDate(item.concert_time.start_at);
							}
							if (item.order_id === 0) {
								item.resale_apply.concert_time = formatDate(item.resale_apply.concert_time);
							}
						});
					});
					break;
				// 已作废
				case 'invalid':
					turnOrderList({
						prm: stu
					}).then(res => {
						console.log(res);
						this.turnDetail = res[1].data.data;
						this.getLen();
						this.turnDetail.forEach(item => {
							if (item.concert_time) {
								item.concert_time.start_at = formatDate(item.concert_time.start_at);
							}
							if (item.order_id === 0) {
								item.resale_apply.concert_time = formatDate(item.resale_apply.concert_time);
							}
						});
					});
					break;
			}
		},
		// 获取子组件中订单的长度
		getLen() {
			if (this.turnDetail.length > 0) {
				this.noOrder = true;
			} else {
				this.noOrder = false;
				return;
			}
		}
	},
	onLoad(opt) {
		if (uni.getStorageSync('loginStatus')) {
			this.loginStatus = true;

			if (opt.status) {
				this.status = opt.status;
				if(this.status === '2resale'){
					orderList({
						prm: '2resale'
					}).then(res => {
						console.log(res);
					
						this.turnDetail = res[1].data.data;
						this.getLen();
						this.turnDetail.forEach(item => {
							item.concert_time.start_at = formatDate(item.concert_time.start_at);
						});
					});
				}else{
					turnOrderList({
						prm: this.status
					}).then(res => {
						console.log(res);
						this.turnDetail = res[1].data.data;
						this.getLen();
						this.turnDetail.forEach(item => {
							if (item.concert_time) {
								item.concert_time.start_at = formatDate(item.concert_time.start_at);
							}
							if (item.order_id === 0) {
								item.resale_apply.concert_time = formatDate(item.resale_apply.concert_time);
							}
						});
					});
				}
				
			} else {
				orderList({
					prm: '2resale'
				}).then(res => {
					console.log(res);

					this.turnDetail = res[1].data.data;
					this.getLen();
					this.turnDetail.forEach(item => {
						item.concert_time.start_at = formatDate(item.concert_time.start_at);
					});
				});
			}
		} else {
			this.loginStatus = false;
		}
	}
};
</script>

<style lang="less">
page {
	height: 100%;
	.my-order {
		height: 100%;
		background: #f6f6f6;
		.my-order-main {
			height: 100%;
			padding-top: 140upx;
			box-sizing: border-box;
			position: relative;
			.order-navigator {
				display: flex;
				padding: 25upx 40upx 0 40upx;
				background: #fff;
				justify-content: space-between;
				color: #666666;
				font-size: 28upx;
				.header-wrapper {
					.litter-wrapper {
						display: flex;
						justify-content: center;
					}
					.navigator-title {
						z-index: 999;
						position: relative;
					}
					.clicked {
						font-weight: 600;
						color: #222;
					}
					.red-sign {
						background: #ff4657;

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
