<template>
	<view class="common-order">
		<view class="order-item" v-for="item in orderData" :key="item.id">
			<view class="order-header">
				<view class="header-left">订单编号：{{ item.out_trade_no }}</view>
				<view v-if="status === 'payed'" class="header-right">待取票</view>
				<view v-if="status === 'shipped'" class="header-right">待收货</view>
				<view v-if="status === 'lock'" class="header-right">待付款</view>
				<view v-if="status === 'geted'" class="header-right">已取票</view>
			</view>
			<view class="order-content" @click="goToTicketDetail(item.id)">
				<image :src="item.concert.poster" mode=""></image>
				<view class="content-right">
					<view class="order-name">【{{ item.concert.city_name }}站】{{ item.concert.name }}</view>
					<view class="order-desc">时间：{{ item.concert_time.start_at }}</view>
					<view class="order-addr">地点：{{ item.venue.addr }}</view>
					<view class="order-desc">数量：{{ item.num }}张</view>
				</view>
			</view>
			<view class="order-bottom">
				<view class="totalPrice">总计：{{ item.price*item.num }}元</view>
				<!-- 待取票 -->
				<view v-if="status === 'payed'" class="user-operate">
					<view class="get-ticket" @click="goToGetTicket(item.id)">我要取票</view>
					<view class="turn-ticket" @click="goToTurnTicket(item.id)">我要转票</view>
				</view>
				<!-- 待收货 -->
				<view v-if="status === 'shipped'" class="user-operate">
					<view class="get-ticket" @click="deleteOrder(item.id)">删除订单</view>
					<view class="turn-ticket" @click="makeSureGet(item.id)">确认收货</view>
				</view>
				<!-- 已取票 -->
				<view v-if="status === 'geted'" class="user-operate"><view class="get-ticket no-margin" @click="deleteGetedOrder(item.id)">删除订单</view></view>
				<!-- 待付款 -->
				<view v-if="status === 'lock'" class="user-operate">
					<view class="get-ticket" @click="cancelPay(item.id)">取消支付</view>
					<view class="turn-ticket" @click="goToPay(item.id)">去支付</view>
				</view>
			</view>
		</view>
		<my-modal :orderId="orderId" status="geted" v-if="getModalFlag" :modalFlag.sync="getModalFlag" title="确认收货" desc="是否确认已收到货物"></my-modal>
		<my-modal :orderId="orderId" status="delete" v-if="deleteModalFlag" :modalFlag.sync="deleteModalFlag" title="删除订单" desc="是否确认删除订单"></my-modal>
		<my-modal :orderId="orderId" status="cancel" v-if="cancelModalFlag" :modalFlag.sync="cancelModalFlag" title="取消支付" desc="是否确认取消支付"></my-modal>
		<appAlert @changeAppAlertOnoff="changeOnOff" :appAlertOnoff="onoff"></appAlert>
	</view>
</template>

<script>
import { formatDate } from '../../../common/formatDate.js'
import { orderOperate } from '../../../Api/myApi/orderOperate.js';
import { orderList } from '../../../Api/myApi/orderList.js';
import myModal from './myModal.vue';
export default {
	data() {
		return {
			onoff: false,
			orderId: '',
			getModalFlag: false,
			deleteModalFlag: false,
			cancelModalFlag: false,
		};
	},
	props: {
		status: {
			type: String
		},
		orderData: {
			type: Array
		}
	},
	components: { myModal },
	methods: {
		changeOnOff(i) {
			this.onoff = i;
		},
		// 待取票--订单详情
		goToTicketDetail(orderId) {
			// this.onoff = true;
			uni.navigateTo({
				url:`/pages/my/myOrder/orderDesc?order_id=${orderId}&status=${this.$props.status}`
			})
			console.log('点我去演出详情！');
		},
		// 待取票--我要取票
		goToGetTicket() {
			this.onoff = true;
		},
		// 待取票--我要转票
		goToTurnTicket() {
			this.onoff = true;
		},

		// 待收货--删除订单
		deleteOrder(order_id) {
			/* this.orderId = order_id;
			console.log('删除订单！');
			this.deleteModalFlag = true; */
			this.onoff = true;
		},
		// 待收货--确认收货
		makeSureGet(order_id) {
			/* this.orderId = order_id;
			console.log('确认收货！');
			this.getModalFlag = true; */
			this.onoff = true;
		},

		// 待付款--取消支付
		cancelPay(order_id) {
			/* this.orderId = order_id;
			console.log('取消支付！');
			this.cancelModalFlag = true; */
			this.onoff = true;
		},
		// 待付款--去支付
		goToPay() {
			// console.log('去支付！');
			this.onoff = true;
		},

		// 已取票--删除订单
		deleteGetedOrder(order_id) {
			/* this.orderId = order_id;
			console.log('删除订单！');
			this.deleteModalFlag = true; */
			this.onoff = true;
		}
	},
};
</script>

<style lang="less">
.common-order {
	background-color: #F6F6F6;
	.order-item {
		background-color: #fff;
		margin-top: 30upx;
		padding: 0 40upx;
		font-size: 24upx;
		.order-header {
			display: flex;
			justify-content: space-between;
			padding: 40upx 0 30upx 0;
			color: #b2b2b2;
			.header-right {
				color: #ff4758;
			}
		}
		.order-content {
			display: flex;
			image {
				width: 140upx;
				height: 180upx;
				margin-right: 30upx;
			}
			.content-right {
				color: #666666;
				.order-name {
					width: 500upx;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					font-size: 28upx;
					font-weight: 600;
					color: #222;
					margin-bottom: 18upx;
				}
				.order-desc {
					margin-top: 18upx;
				}
				.order-addr{
					width: 500upx;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					margin-top: 18upx;
				}
			}
		}
		.order-bottom {
			padding: 40upx 0;
			color: #222;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-weight: 600;
			.user-operate {
				display: flex;
				font-weight: normal;
				.get-ticket {
					margin-right: 32upx;
					padding: 19upx 23upx;
					border: 1px solid #7a7a7a;
					border-radius: 40upx;
				}
				.turn-ticket {
					padding: 19upx 23upx;
					border: 1px solid #ff4758;
					border-radius: 40upx;
					color: #ff4758;
				}
				.no-margin {
					margin: 0;
				}
			}
		}
	}
}
</style>
