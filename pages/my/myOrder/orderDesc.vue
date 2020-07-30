<template>
	<view class="order-detail">
		<view class="child-header">
				<view :style="{'top':imgTop}" class="back-container">
					<image @click="back" class="image"
						src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/afd2adf0772849d3ae1963ef4a53f99.png">
					</image>
				</view>
				<view style="display: flex; justify-content: center;">
					<view class="ttt" :style="{'height':height,'top':top,'lineHeight':height}">订单详情</view>
				</view>
				
			</view>


		<view class="detail-main">
			<view class="detail-header">
				<!-- 待取票 -->
				<view v-if="status === 'payed'">
					<view>交易成功</view>
					<view class="tips">订单已支付，可进行取票或转票等操作</view>
				</view>
				<!-- 待付款 -->
				<view v-if="status === 'lock'">
					<view>待支付</view>
					<view class="tips">请在5分钟之内完成支付</view>
				</view>
				<!-- 待收货 -->
				<view v-if="status === 'shipped'">
					<view>门票已寄出</view>
					<view class="tips">门票已寄出，请注意查收</view>
				</view>
				<!-- 已取票 -->
				<view v-if="status === 'geted'">
					<view>交易成功</view>
					<view class="tips">已取票成功，感谢您对该场演唱会的支持</view>
				</view>
			</view>
			<view class="detail-content">
				<view class="flex-wrapper">
					<view class="left-desc">
						<view class="detail-name">{{ orderData.concert.name }}—{{ orderData.concert.city_name }}站</view>
						<view class="detail-time">{{ orderData.concert_time.start_at }}</view>
						<view class="detail-addr">{{ orderData.venue.addr }}</view>
					</view>
					<view class="right-desc"><image :src="orderData.concert.poster" mode=""></image></view>
				</view>

				
				<view class="tickets-price">
					<view class="tickets-top">
						<view>
						{{ orderData.concert_ticket.name }}
						<text style="color: #b2b2b2;padding-left: 14upx;">({{orderData.price}}元)</text>
						</view>
						<view>x{{ orderData.num }}</view>
					</view>
					<view class="tickets-top">
						<view>
							优惠
						</view>
						<view v-if="orderDetail.discounted_money">
							-{{orderData.discounted_money}}元
						</view>
					</view>
					
				</view>
				<view class="total-price">总计：{{ orderData.money }}元</view>
			</view>
		</view>
		<view class="order-info">
			<view class="order-header">订单信息</view>
			<view class="order-wrapper">
				<view>订单编号</view>
				<view>{{ orderData.out_trade_no }}</view>
			</view>
			<view class="order-wrapper">
				<view>下单时间</view>
				<view>{{ orderData.created_at }}</view>
			</view>
		</view>
		<view class="bottom-tab">
			<button v-if="status === 'payed'" class="get-ticket" @click="goToGetTicket">我要取票</button>
			<button v-if="status === 'payed'" class="turn-ticket" @click="goToTurnTicket">立即转票</button>
			<button v-if="status === 'lock'" class="get-ticket" @click="cancelOrder">取消订单</button>
			<button v-if="status === 'lock'" class="turn-ticket" @click="goToPay">立即支付</button>
			<button v-if="status === 'geted'" class="bottom-btn" @click="deleteOrder">删除订单</button>
			<button v-if="status === 'shipped'" class="bottom-btn" @click="sureGet">确认收货</button>
		</view>
		<my-modal :orderId="order_id" status="geted" v-if="getModalFlag" :modalFlag.sync="getModalFlag" title="确认收货" desc="是否确认已收到货物"></my-modal>
		<my-modal :orderId="order_id" status="delete" v-if="deleteModalFlag" :modalFlag.sync="deleteModalFlag" title="删除订单" desc="是否确认删除订单"></my-modal>
		<my-modal :orderId="order_id" status="cancel" v-if="cancelModalFlag" :modalFlag.sync="cancelModalFlag" title="取消支付" desc="是否确认取消支付"></my-modal>
		<appAlert @changeAppAlertOnoff="changeOnOff" :appAlertOnoff="onoff"></appAlert>
	</view>
</template>

<script>
import { orderDesc } from '../../../Api/myApi/orderDesc.js';
import { orderOperate } from '../../../Api/myApi/orderOperate.js';
import myModal from './myModal.vue';
export default {
	data() {
		return {
			onoff: false,
			// 定义标识符
			getModalFlag: false,
			deleteModalFlag: false,
			cancelModalFlag: false,
			order_id: '',
			status: '',
			orderData: {},
			top: "",
			lineHeight: "",
			height: "",
			imgTop: ""
		}
	},
	components: { myModal },
	onLoad(opt) {
		
		console.log(opt);
		this.status = opt.status;
		this.order_id = opt.order_id;
		
		let menuInfo = uni.getMenuButtonBoundingClientRect();
		this.top = menuInfo.top+"px";
		this.height = (menuInfo.height+2)+"px";
		this.lineHeight = menuInfo.height+"px";
		this.imgTop = menuInfo.top+9+"px";
	},
	mounted() {
		if (this.order_id) {
			orderDesc({
				prm: this.order_id
			}).then(res => {
				console.log(res);
				this.orderData = res[1].data.data;
				this.orderData.concert_time.start_at = this.formatDate(this.orderData.concert_time.start_at,".")
				this.orderData.created_at = this.formatDate(this.orderData.created_at,'-');
			});
		}
	},
	methods: {
		formatDate(t,stu) {
			let dd = new Date(t);
			let y = dd.getFullYear();
			let m = (dd.getMonth()+1).toString().padStart(2,"0");
			let d = dd.getDate().toString().padStart(2,"0");
			let h = dd.getHours().toString().padStart(2,"0");
			let min = dd.getMinutes().toString().padStart(2,"0");
			if(stu === "."){
				return `${y}.${m}.${d} ${h}:${min}`;
			}
			return `${y}-${m}-${d} ${h}:${min}`;
		},
		changeOnOff(i) {
			this.onoff = i;
		},
		back() {
			// var pages = getCurrentPages();
			// console.log('返回上一页', pages);
			// if (pages.length <= 1) {
			// 	console.log('可能是分享页面');
			// } else {
			// 	wx.navigateBack({
			// 		delta: 1
			// 	});
			// }
			uni.navigateTo({
				url:`/pages/my/myOrder/myOrder?status=${this.status}`
			})
		},
		// 删除订单
		deleteOrder() {
			/* this.deleteModalFlag = true;
				console.log("删除订单") */
			this.onoff = true;
		},
		// 转票操作
		goToGetTicket() {
			this.onoff = true;
		},
		// 转票操作
		goToTurnTicket() {
			this.onoff = true;
		},
		// 取消订单
		cancelOrder() {
			this.onoff = true;
		},
		// 立即支付
		goToPay() {
			this.onoff = true;
		},
		// 确认收货
		sureGet() {
			/* this.getModalFlag = true;
				console.log("确认收货") */
			this.onoff = true;
		}
	}
};
</script>

<style lang="less">
page {
	height: 100%;

	.order-detail {
		position: relative;
		height: 100%;
		background: #f6f6f6;
		
		
		
		
		.child-header {
		    width: 750rpx;
		    height: 160rpx;
		    line-height: 180rpx;
		    text-align: center;
		    font-size: 30rpx;
		    font-family: Microsoft YaHei;
		    font-weight: bold;
		    color: #fff;
		    position: fixed;
		    z-index: 999;
		    background-color: #ff4557;
		
		    .back-container {
		        height: 160upx;
		        padding-left: 38upx;
		        padding-right: 38upx;
		        left: 0;
		        position: absolute;
		
		        .image {
		            display: inline-block;
		            width: 18upx;
		            height: 30upx;
		            vertical-align: top;
		
		        }
		    }
			.ttt{
				position: absolute;
			}
		
		}

		

		.detail-main {
			padding-top: 159upx;

			.detail-header {
				background: #ff4557;
				padding: 0 40upx 50upx 40upx;
				color: #fff;
				font-size: 36upx;
				font-weight: 600;

				.tips {
					padding-top: 28upx;
					font-size: 24upx;
					font-weight: normal;
					letter-spacing: 20;
				}
			}

			.detail-content {
				background: #fff;
				padding: 60upx 40upx 30upx 40upx;

				.flex-wrapper {
					display: flex;
					justify-content: space-between;

					.right-desc {
						image {
							width: 140upx;
							height: 180upx;
						}
					}

					.left-desc {
						color: #656565;
						font-size: 24upx;
						width: 480upx;
						.detail-name {
							color: #212121;
							font-size: 28upx;
							font-weight: 600;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp:2;
							-webkit-box-orient: vertical;
						}

						.detail-time {
							padding-top: 32upx;
						}
						.detail-addr {
							padding-top: 14upx;
						}
					}
				}
			}

			.all-tickets {
				margin-top: 40upx;
				background: #fff;
				padding: 20upx 0;
				border-top: 1px solid #f5f5f5;
				border-bottom: 1px solid #f5f5f5;

				.item {
					color: #656565;
					font-size: 24upx;
					display: flex;
					justify-content: space-around;
					padding: 10upx 0;

					view {
						&:first-child {
							flex: 0 50upx;
						}

						&:nth-child(2) {
							flex: 0 110upx;
						}

						&:nth-child(3) {
							flex: 0 110upx;
						}
					}
				}
			}

			.tickets-price {
				margin-top: 40upx;
				padding: 30upx 0 0 0;
				background-color: #ffffff;
				color: #656565;
				font-size: 24upx;
				border-bottom: 1px solid #f5f5f5;
				border-top: 1px solid #f5f5f5;
				.tickets-top{
					display: flex;
					justify-content: space-between;
					padding-bottom: 30upx;
				}
			}

			.total-price {
				font-size: 28upx;
				color: #000021;
				font-weight: 600;
				padding-top: 36upx;
			}
		}

		.order-info {
			margin-top: 20upx;
			background: #fff;
			color: #656565;
			font-size: 24upx;
			padding: 36upx 40upx;

			.order-header {
				font-size: 28upx;
				color: #000021;
				font-weight: 600upx;
				padding-bottom: 10upx;
			}

			.order-wrapper {
				display: flex;
				justify-content: space-between;
				padding-top: 24upx;
			}
		}

		.bottom-tab {
			position: fixed;
			bottom: 0;
			left: 0;
			height: 108upx;
			padding: 40upx 14upx;
			background: #fff;
			color: #fff;
			font-weight: 600;
			display: flex;
			width: 750upx;
			box-sizing: border-box;
			align-items: center;

			.get-ticket {
				text-align: center;
				height: 80upx;
				line-height: 80upx;
				width: 200upx;
				border-radius: 4upx;
				background: #212121;
				color: #fff;
				font-size: 28upx;
			}

			.turn-ticket {
				text-align: center;
				height: 80upx;
				line-height: 80upx;
				width: 450upx;
				border-radius: 4upx;
				background: #ff4557;
				color: #fff;
				font-size: 28upx;
			}

			.bottom-btn {
				width: 750upx;
				color: #222;
				font-weight: normal;
				font-size: 28upx;
			}
		}
	}
}
</style>
