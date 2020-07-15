<template>
	<view class="order-detail">
		<cover-view class="child-header">
			<cover-view class="back-container" @click="back">
				<cover-image class="image"
					src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/afd2adf0772849d3ae1963ef4a53f99.png">
				</cover-image>
			</cover-view>
			订单详情
		</cover-view>

		<view class="detail-main">
			<!-- 待取票 -->
			<view v-if="status === '2resale'" class="detail-header">
				<view>已购买门票</view>
				<view class="tips">订单已支付，可进行取票或转票操作</view>
			</view>
			<!-- 转票中 -->
			<view v-if="status === 'applying'" class="detail-header">
				<view>转票中</view>
				<view class="tips">转票中，请耐心等待转票结果</view>
			</view>
			<!-- 已转出 -->
			<view v-if="status === 'over'" class="detail-header">
				<view>转票成功</view>
				<view class="tips">转票成功，订单金额可在余额进行提现</view>
			</view>
			<!-- 已作废 -->
			<view v-if="status === 'invalid'" class="detail-header">
				<view>已作废</view>
				<view class="tips">订单作废，该场演唱会已过演出时间</view>
			</view>
			<view class="detail-content">
				<view class="flex-wrapper">
					<view class="left-desc">
						<view class="detail-name">《{{ orderDetail.name }}》-{{ orderDetail.resale_apply.concert_addr }}
						</view>
						<view class="detail-time">{{ orderDetail.resale_apply.concert_time }}</view>
						<view class="detail-time">{{ orderDetail.concert.city_name }}市 {{ orderDetail.venue.name }}
						</view>
					</view>
					<view class="right-desc">
						<image :src="orderDetail.concert.poster" mode=""></image>
					</view>
				</view>

				<view class="all-tickets">
					<view class="item" v-for="(item, i) in 3" :key="i">
						<view>A区</view>
						<view>12排11座</view>
						<view>￥999.00</view>
					</view>
				</view>
				<view class="tickets-price">
					<view>票面{{ orderDetail.price }}元</view>
					<view>x{{ orderDetail.total }}</view>
				</view>
				<view class="total-price">总计：{{ orderDetail.price * orderDetail.total }}元</view>
			</view>
		</view>
		<view v-if="status !== 'invalid'" class="order-info">
			<view class="order-header">订单信息</view>
			<view class="order-wrapper">
				<view>订单编号</view>
				<view>{{ orderDetail.resale_apply.waybill_num }}</view>
			</view>
			<view class="order-wrapper">
				<view>下单时间</view>
				<view>2020-06-06 06:33</view>
			</view>
		</view>
		<view class="bottom-tab">
			<button v-if="status === '2resale'" class="get-ticket" @click="showAppTip">我要取票</button>
			<button v-if="status === '2resale'" class="turn-ticket" @click="showAppTip">立即转票</button>
			<button v-if="status === 'applying'" class="bottom-btn" @click="cancelTurn(orderDetail.id)">取消转票</button>
			<button v-if="status === 'over'||status === 'invalid'" class="bottom-btn"
				@click="deleteTurn(orderDetail.id)">删除订单</button>
		</view>
		<my-modal :orderId="orderId" status="cancel" v-if="cancelModalFlag" :modalFlag.sync="cancelModalFlag"
			title="取消转票" desc="是否确认取消转票"></my-modal>
		<my-modal :orderId="orderId" status="delete" v-if="deleteModalFlag" :modalFlag.sync="deleteModalFlag"
			title="删除订单" desc="是否确认删除订单"></my-modal>
		<appAlert @changeAppAlertOnoff="changeOnOff" :appAlertOnoff="onoff"></appAlert>
	</view>
</template>

<script>
	import { formatDate } from "../../../common/formatDate.js"
	import { turnOrderDesc } from "../../../Api/myApi/turnOrderDesc.js"
	import { myModal } from "./myModal.vue"
	export default {
		data() {
			return {
				onoff:false,
				orderDetail: {
					/* id: 1,
					resale_apply_id: 1,
					concert_id: 44,
					concert_time_id: 92,
					concert_ticket_id: 58,
					start_at: 1590826210,
					order_id: 0,
					name: '周杰伦演唱会',
					price: 1000000,
					total: 2,
					bought_num: 10,
					remain_num: 5,
					user_id: 100004,
					status: 'apply',
					updated_at: 1590653171,
					created_at: 1588931667,
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
						id: 3,
						name: '北京场馆',
						addr: '北京石景山'
					} */
				},
				status: "",
				modalFlag: false,
				cancelModalFlag: false,
				deleteModalFlag: false,
			};
		},
		components: { myModal },
		methods: {
			changeOnOff(i) {
				this.onoff = i;
			},
			back() {
				var pages = getCurrentPages();
				console.log('返回上一页', pages);
				if (pages.length <= 1) {
					console.log('可能是分享页面');
				} else {
					wx.navigateBack({
						delta: 1
					});
				}
			},
			cancelTurn(id) {
				/* this.orderId = id;
				this.cancelModalFlag = true; */
				this.onoff = true;
			},
			deleteTurn(id) {
				/* this.orderId = id;
				this.deleteModalFlag = true; */
				this.onoff = true;
			},
			showAppTip() {
				this.onoff = true;
			}
		},
		onLoad(opt) {
			this.orderId = opt.orderId;
			this.status = opt.status;
			console.log(opt.status)
		},
		onShow() {
			turnOrderDesc({
				resale_id:this.orderId
			}).then(res=>{
				console.log("转票详情",res)
				this.orderDetail = res[1].data.data;
				this.orderDetail.concert_time.start_at = formatDate(this.orderDetail.concert_time.start_at)
 				console.log("转票详情",res)
			})
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
			    height: 140rpx;
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
			        line-height: 180upx;
			        padding-left: 38upx;
			        padding-right: 38upx;
			        left: 0;
			        position: absolute;
			
			        .image {
			            display: inline-block;
			            width: 18upx;
			            height: 30upx;
			            vertical-align: middle;
			
			        }
			    }
			
			}

			.detail-main {
				padding-top: 139upx;

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

							.detail-name {
								padding: 12upx 0 38upx 0;
								color: #212121;
								font-size: 28upx;
								font-weight: 600;
							}

							.detail-time {
								padding-top: 14upx;
							}
						}
					}
				}

				.all-tickets {
					margin-top: 40upx;
					background: #fff;
					padding: 20upx 0;
					border-top: 1px solid #F5F5F5;
					border-bottom: 1px solid #F5F5F5;

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
					padding: 30upx 0;
					background-color: #ffffff;
					display: flex;
					justify-content: space-between;
					color: #656565;
					font-size: 24upx;
					border-bottom: 1px solid #F5F5F5;
					align-items: center;
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
					background: #FF4557;
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