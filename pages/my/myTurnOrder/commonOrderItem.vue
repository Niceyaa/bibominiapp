<template>
	<view class="common-order">
		<view class="order-item" v-for="item in turnDetail" :key="item.id">
			<view class="order-header">
				<view v-if="status === '2resale'" class="header-left">订单编号：{{ item.out_trade_no }}</view>
				<view v-else class="header-left">订单编号：{{ item.order.out_trade_no }}</view>
				<view v-if="status === '2resale'" class="header-right">待转票</view>
				<view v-if="status === 'applying'&&item.status !== 'apply'" class="header-right">转票中</view>
				<view v-if="status === 'applying'&&item.status === 'apply'" class="header-right">审核中</view>
				<view v-if="status === 'invalid'" class="header-right">已作废</view>
				<view v-if="status === 'over'" class="header-right">已转出</view>
			</view>
			<view v-if="status === '2resale'" class="order-content" @click="goToTicketDetail(item.id)">
				<image :src="item.concert.poster" mode=""></image>
				<view class="content-right">
					<view class="order-name">【{{ item.concert.city_name }}站】{{ item.concert.name }}</view>
					<view class="order-desc">时间：{{ item.concert_time.start_at }}</view>
					<view class="order-addr">地点：{{ item.venue.addr }}</view>
					<view class="order-desc">数量：{{ item.num }}张</view>
					
				</view>
			</view>
			<!-- 转票中处于待审核状态 -->
		<!-- 	<view v-else-if="status === 'applying'&&item.status === 'apply'" class="order-content" @click="goToTicketDetail(item.order_id)"> -->
			<view v-else-if="status === 'applying'" class="order-content" @click="goToTicketDetail(item.order_id)">
				<view class="content-right">
					<view class="content-left">
						<view class="has-border">个人转票</view>
						<view class="content-title">碍事法师法师法师法</view>
					</view>
					<view class="turn-intro">
						阿斯顿发沙发沙发沙发沙发发生发发发
					</view>
					<view class="order-desc">时间：{{ item.concert_time.start_at }}</view>
					<view class="order-desc">地点：{{ item.venue.addr }}</view>
					<view class="order-desc">数量：{{ item.order.num }}张</view>
				</view>
			</view>
			
			<view v-else class="order-content" @click="goToTicketDetail(item.order_id)">
				<image :src="item.concert.poster" mode=""></image>
				<view class="content-right">
					<view class="order-name">【{{ item.concert.city_name }}站】{{ item.concert.name }}</view>
					<view class="order-desc">时间：{{ item.concert_time.start_at }}</view>
					<view class="order-addr">地点：{{ item.venue.addr }}</view>
					<view class="order-desc">数量：{{ item.order.num }}张</view>
				</view>
			</view>
			<view class="order-bottom">
				<view v-if="status === '2resale'" class="totalPrice">总计：{{ item.price * item.num }}元</view>
				<view v-else class="totalPrice">总计：{{ item.order.num * item.price }}元</view>
				<!-- 待取票 -->
				<view v-if="status === '2resale'" class="user-operate">
					<view class="get-ticket" @click="goToGetTicket(item.id)">我要取票</view>
					<view class="turn-ticket" @click="goToTurnTicket(item.id)">我要转票</view>
				</view>
				<!-- 转票中 -->
				<view v-if="status === 'applying'" class="user-operate"><view class="get-ticket no-margin" @click="cancelTurn(item.id)">取消转票</view></view>
				<!-- 已转出 -->
				<view v-if="status === 'over'" class="user-operate"><view class="get-ticket no-margin" @click="deleteGetedOrder(item.id)">删除订单</view></view>
				<!-- 已作废 -->
				<view v-if="status === 'invalid'" class="user-operate"><view class="get-ticket no-margin" @click="deleteGetedOrder(item.id)">删除订单</view></view>
			</view>
		</view>
		<appAlert @changeAppAlertOnoff="changeOnOff" :appAlertOnoff="onoff"></appAlert>
		<my-modal :orderId="orderId" status="cancel" v-if="cancelModalFlag" :modalFlag.sync="cancelModalFlag" title="取消转票" desc="是否确认取消转票"></my-modal>
		<my-modal :orderId="orderId" status="delete" v-if="deleteModalFlag" :modalFlag.sync="deleteModalFlag" title="删除订单" desc="是否确认删除订单"></my-modal>
	</view>
</template>

<script>
import { formatDate } from '../../../common/formatDate.js';
import myModal from './myModal.vue';
import { turnOrderList } from '../../../Api/myApi/turnOrderList.js';
import { orderList } from '../../../Api/myApi/orderList.js';
export default {
	data() {
		return {
			onoff: false,
			orderId: '',
			modalFlag: false,
			cancelModalFlag: false,
			deleteModalFlag: false,
		};
	},
	props: {
		status: {
			type: String
		},
		turnDetail:{
			type: Array
		}
	},
	components: { myModal },
	methods: {
		changeOnOff(i) {
			this.onoff = i;
		},
		// 待取票--订单详情
		goToTicketDetail(id) {
			/* console.log('status', this.$props.status);
			this.onoff = true; */
			this.orderId = id;
			uni.navigateTo({
				url: `/pages/my/myTurnOrder/ticketDetail?id=${this.orderId}&status=${this.$props.status}`
			});
		},
		// 我的票卷--我要取票
		goToGetTicket(id) {
			/* 	this.orderId = id;
			console.log('点我去我要取票！'); */
			this.onoff = true;
		},
		// 我的票卷--我要转票
		goToTurnTicket(id) {
			/* this.orderId = id;
			console.log('点我去我要转票！'); */
			this.onoff = true;
		},

		// 转票中--取消转票
		cancelTurn(id) {
			/* this.cancelModalFlag = true;
			this.orderId = id;
			console.log('删除订单！'); */
			this.onoff = true;
		},

		// 已转票/已作废--删除订单
		deleteGetedOrder(id) {
			/* this.deleteModalFlag = true;
			this.orderId = id;
			console.log('删除订单！'); */
			this.onoff = true;
		}
	},
};
</script>

<style lang="less">
.common-order {
	background-color: #f6f6f6;
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
				flex: 0 140upx;
				width: 140upx;
				height: 180upx;
				margin-right: 30upx;
			}
			.content-right {
				flex: 1;
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
				.content-left{
					display: flex;
					align-items: center;
					color: #222;
					.has-border{
						width: 140upx;
						height: 48upx;
						line-height: 48upx;
						text-align: center;
						border: 1px solid lightgreen;
						border-radius: 4upx;
						color: blue;
					}
					.content-title{
						font-size: 32upx;
						padding-left: 15upx;
					}
				}
				.turn-intro{
					margin-top: 18upx;
					font-size: 28upx;
					color: #222;
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
