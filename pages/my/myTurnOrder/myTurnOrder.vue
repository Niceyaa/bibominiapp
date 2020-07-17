<template>
	<view v-if="loginStatus" class="my-order">
		<back-header title="我的转票"></back-header>
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
			<view v-if="noOrder" class="order-detail"><common-order :turnDetail="turnDetail" @isNull="getLen" :status="status"></common-order></view>
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
			this.status = status;
			this.noOrder = true;

			let stu = this.status;
			let that = this;

			switch (stu) {
				// 待转票
				case '2resale':
					orderList({
						status: stu
					}).then(res => {
						console.log(res);
						let tt = [
							{
								id: 1,
								concert_id: 44,
								concert_time_id: 92,
								concert_ticket_id: 58,
								price: 1000000,
								num: 0,
								discount: 8,
								money: 700000,
								coupon_money: 100000,
								balance_pay: 600000,
								status: 'payed',
								out_trade_no: '121323123123',
								type: 'wechat',
								created_at: 1591329678,
								resale_status: 'none',
								resale_num: 0,
								expire_in: 200,
								concert: {
									id: 44,
									name: '吴亦凡演唱会',
									city_name: '北京',
									poster: 'https:\/\/ticket-app.oss-cn-shenzhen.aliyuncs.com\/TICKET\/concerts\/admin\/imgs\/izT2rcDcpyqpRw8msCpEzSQRi7VxJYJPCSJ7lX0n.jpeg',
									venue_id: 3
								},
								concert_time: {
									id: 92,
									start_at: 1591361760
								},
								concert_ticket: {
									id: 92,
									resale_price: 4546,
									resale_price_lower: 46,
									resale_price_upper: 45046
								},
								venue: {
									name: '北京场馆',
									addr: '北京石景山'
								}
							}
						];
						// this.turnDetail = res[1].data.data;
						that.turnDetail = tt;
						this.getLen();
						// that.$set(that.turnDetail, tt);
						that.turnDetail.forEach(item => {
							item.concert_time.start_at = formatDate(item.concert_time.start_at);
						});
					});
					console.log(stu);
					break;
				// 转票中
				case 'applying':
					turnOrderList({
						status: stu
					}).then(res => {
						console.log(res);
						that.turnDetail = res[1].data.data;
						let tt = [
							{
								id: 1,
								resale_apply_id: 1,
								concert_id: 44,
								concert_time_id: 92,
								concert_ticket_id: 58,
								order_id: 1,
								start_at: 1590826210,
								name: '周杰伦演唱会',
								price: 1000000,
								total: 2,
								bought_num: 10,
								remain_num: 5,
								user_id: 100004,
								status: 'apply',
								order: {
									id: 1,
									out_trade_no: '121323123123',
									num: 0
								},
								resale_apply: {
									id: 1,
									concert_name: '演出名称',
									concert_time: '演出时间',
									ticket_info: '票信息',
									concert_addr: '演出地址',
									desc: '转票详情1111',
									waybill_num: 'bc12312312312313'
								},
								concert: {
									id: 44,
									name: '吴亦凡演唱会',
									city_name: '北京',
									poster: 'https:\/\/ticket-app.oss-cn-shenzhen.aliyuncs.com\/TICKET\/concerts\/admin\/imgs\/izT2rcDcpyqpRw8msCpEzSQRi7VxJYJPCSJ7lX0n.jpeg',
									venue_id: 3
								},
								concert_time: {
									id: 92,
									start_at: 1591361760
								},
								venue: {
									name: '北京场馆',
									addr: '北京石景山'
								}
							}
						];
						// that.$set(that.turnDetail,tt);
						that.turnDetail = tt;
						this.getLen();
						that.turnDetail.forEach(item => {
							item.concert_time.start_at = formatDate(item.concert_time.start_at);
						});
					});
					console.log(stu);
					break;
				// 已转出
				case 'over':
					turnOrderList({
						status: stu
					}).then(res => {
						console.log(res);
						this.turnDetail = res[1].data.data;
						this.getLen();
						this.turnDetail.forEach(item => {
							item.concert_time.start_at = formatDate(item.concert_time.start_at);
						});
					});
					console.log(stu);
					break;
				// 已作废
				case 'invalid':
					turnOrderList({
						status: stu
					}).then(res => {
						console.log(res);
						this.turnDetail = res[1].data.data;
						this.getLen();
						this.turnDetail.forEach(item => {
							item.concert_time.start_at = formatDate(item.concert_time.start_at);
						});
					});
					console.log(stu);
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
	onLoad() {
		if (uni.getStorageSync('loginStatus')) {
			this.loginStatus = true;
			
			orderList({
				status: "2resale"
			}).then(res => {
				console.log(res);
				let tt = [
					{
						id: 1,
						concert_id: 44,
						concert_time_id: 92,
						concert_ticket_id: 58,
						price: 1000000,
						num: 0,
						discount: 8,
						money: 700000,
						coupon_money: 100000,
						balance_pay: 600000,
						status: 'payed',
						out_trade_no: '121323123123',
						type: 'wechat',
						created_at: 1591329678,
						resale_status: 'none',
						resale_num: 0,
						expire_in: 200,
						concert: {
							id: 44,
							name: '吴亦凡演唱会',
							city_name: '北京',
							poster: 'https:\/\/ticket-app.oss-cn-shenzhen.aliyuncs.com\/TICKET\/concerts\/admin\/imgs\/izT2rcDcpyqpRw8msCpEzSQRi7VxJYJPCSJ7lX0n.jpeg',
							venue_id: 3
						},
						concert_time: {
							id: 92,
							start_at: 1591361760
						},
						concert_ticket: {
							id: 92,
							resale_price: 4546,
							resale_price_lower: 46,
							resale_price_upper: 45046
						},
						venue: {
							name: '北京场馆',
							addr: '北京石景山'
						}
					}
				];
				// this.turnDetail = res[1].data.data;
				this.turnDetail = tt;
				this.getLen();
				this.turnDetail.forEach(item => {
					item.concert_time.start_at = formatDate(item.concert_time.start_at);
				});
			});
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
