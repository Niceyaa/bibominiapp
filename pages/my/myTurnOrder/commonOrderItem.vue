<template>
	<view class="common-order">
		<view class="order-item" v-for="item in turnDetail" :key="item.id">
			<view class="order-header">
				<view class="header-left">订单编号：{{ item.order.out_trade_no }}</view>
				<view v-if="status === '2resale'" class="header-right">待转票</view>
				<view v-if="status === 'applying'" class="header-right">转票中</view>
				<view v-if="status === 'invalid'" class="header-right">已作废</view>
				<view v-if="status === 'over'" class="header-right">已转出</view>
			</view>
			<view class="order-content" @click="goToTicketDetail(item.id)">
				<image :src="item.concert.poster" mode=""></image>
				<view class="content-right">
					<view class="order-name">【{{ item.concert.city_name  }}站】{{ item.concert.name }}</view>
					<view class="order-desc">时间：{{ item.concert_time.start_at }}</view>
					<view class="order-desc">地点：{{ item.venue.addr }}</view>
					<view class="order-desc">数量：{{ item.order.num }}张</view>
				</view>
			</view>
			<view class="order-bottom">
				<view class="totalPrice">总计：{{ item.order.num*item.price }}元</view>
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
import { formatDate } from "../../../common/formatDate.js"
import myModal from './myModal.vue';
import { turnOrderList } from '../../../Api/myApi/turnOrderList.js'
import { orderList } from '../../../Api/myApi/orderList.js';
export default {
	data() {
		return {
			onoff:false,
			orderId:"",
			modalFlag: false,
			cancelModalFlag:false,
			deleteModalFlag:false,
			turnDetail: []
		};
	},
	props: {
		status: {
			type: String,
		}
	},
	watch:{
		/* status(stu){
			console.log("watch执行",stu);
			switch (stu) {
				// 待取票
				case '2resale':
					turnOrderList({
						status: stu
					}).then(res => {
						console.log(res)
						this.turnDetail = res[1].data.data;
						this.turnDetail.forEach(item=>{
							item.concert_time.start_at = formatDate(item.concert_time.start_at);
						})
					});
					console.log(stu);
					break;
				// 转票中
				case 'applying':
					turnOrderList({
						status: stu
					}).then(res => {
						console.log(res)
						this.turnDetail = res[1].data.data;
						this.turnDetail.forEach(item=>{
							item.concert_time.start_at = formatDate(item.concert_time.start_at);
						})
					});
					console.log(stu);
					break;
				// 已转出
				case 'over':
					turnOrderList({
						status: stu
					}).then(res => {
						console.log(res)
						this.turnDetail = res[1].data.data;
						this.turnDetail.forEach(item=>{
							item.concert_time.start_at = formatDate(item.concert_time.start_at);
						})
					});
					console.log(stu);
					break;
				// 已作废
				case 'invalid':
					turnOrderList({
						status: stu
					}).then(res => {
						console.log(res)
						this.turnDetail = res[1].data.data;
						this.turnDetail.forEach(item=>{
							item.concert_time.start_at = formatDate(item.concert_time.start_at);
						})
					});
					console.log(stu);
					break;
			}
			this.$emit("isNull",this.turnDetail)	
		} */
	
	},
	components: { myModal },
	methods: {
		changeOnOff(i) {
			this.onoff = i;
		},
		// 待取票--订单详情
		goToTicketDetail(id) {
			console.log("status",this.$props.status)
			this.onoff = true;
			/* this.orderId = id;
			uni.navigateTo({
				url: `/pages/my/myTurnOrder/ticketDetail?id=${this.orderId}&status=${this.$props.status}`
			}); */
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
	mounted() {
		let stu = this.$props.status;
		switch (stu) {
			// 待转票
			case '2resale':
			
			console.log("转票mounted")
				orderList({
					status: stu
				}).then(res => {
					console.log(res)
					this.turnDetail = res[1].data.data;
					this.turnDetail.forEach(item=>{
						item.concert_time.start_at = formatDate(item.concert_time.start_at);
					})
					this.$emit("isNull",this.turnDetail)
				});
				console.log(stu);
				break;
			// 转票中
			case 'applying':
			
			console.log("转票mounted")
				turnOrderList({
					status: stu
				}).then(res => {
					console.log(res)
					this.turnDetail = res[1].data.data;
					this.turnDetail.forEach(item=>{
						item.concert_time.start_at = formatDate(item.concert_time.start_at);
					})
					this.$emit("isNull",this.turnDetail)
				});
				console.log(stu);
				break;
			// 已转出
			case 'over':
			
			console.log("转票mounted")
				turnOrderList({
					status: stu
				}).then(res => {
					console.log(res)
					this.turnDetail = res[1].data.data;
					this.turnDetail.forEach(item=>{
						item.concert_time.start_at = formatDate(item.concert_time.start_at);
					})
					this.$emit("isNull",this.turnDetail)
				});
				console.log(stu);
				break;
			// 已作废
			case 'invalid':
				
				console.log("转票mounted")
					turnOrderList({
						status: stu
					}).then(res => {
						console.log(res)
						this.turnDetail = res[1].data.data;
						this.turnDetail.forEach(item=>{
							item.concert_time.start_at = formatDate(item.concert_time.start_at);
						})
						this.$emit("isNull",this.turnDetail)
					});
					console.log(stu);
					break;
			}
		
	}
}
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
				flex: 0 140upx;
				width: 140upx;
				height: 180upx;
				margin-right: 30upx;
			}
			.content-right {
				flex: 1;
				color: #666666;
				.order-name {
					font-size: 28upx;
					font-weight: 600;
					color: #222;
					margin-bottom: 18upx;
				}
				.order-desc {
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
