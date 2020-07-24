<template>
	<view class="order-detail">
		<cover-view class="child-header">
				<cover-view :style="{'top':imgTop}" class="back-container">
					<cover-image @click="back" class="image"
						src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/afd2adf0772849d3ae1963ef4a53f99.png">
					</cover-image>
				</cover-view>
				<cover-view style="display: flex; justify-content: center;">
					<cover-view class="ttt" :style="{'height':height,'top':top,'lineHeight':height}">订单详情</cover-view>
				</cover-view>
				
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
						<view class="detail-name">{{ orderDetail.concert.name }}-{{ orderDetail.concert.city_name }}
						</view>
						<view class="detail-time">{{ orderDetail.concert_time.start_at }}</view>
						<view class="detail-time">{{ orderDetail.venue.addr }}
						</view>
					</view>
					<view class="right-desc">
						<image :src="orderDetail.concert.poster" mode=""></image>
					</view>
				</view>
				<view class="tickets-price">
					<view class="tickets-top">
						<view>
						{{ orderDetail.concert_ticket.name }}
						<text style="color: #b2b2b2;padding-left: 14upx;">({{orderDetail.price}}元)</text>
						</view>
						<view>x{{ orderDetail.num }}</view>
					</view>
					<view class="tickets-top">
						<view>
							优惠
						</view>
						<view v-if="orderDetail.discounted_money">
							-{{orderDetail.discounted_money}}元
						</view>
					</view>
				</view>
				<view class="total-price">总计：{{ orderDetail.money }}元</view>
			</view>
		</view>
		<view v-if="status !== 'invalid'" class="order-info">
			<view class="order-header">订单信息</view>
			<view class="order-wrapper">
				<view>订单编号</view>
				<view>{{ orderDetail.out_trade_no }}</view>
			</view>
			<view class="order-wrapper">
				<view>下单时间</view>
				<view>{{orderDetail.created_at}}</view>
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
	import { orderDesc } from '../../../Api/myApi/orderDesc.js';
	import { formatDate } from "../../../common/formatDate.js"
	import { myModal } from "./myModal.vue"
	export default {
		data() {
			return {
				onoff:false,
				orderDetail: {},
				status: "",
				modalFlag: false,
				cancelModalFlag: false,
				deleteModalFlag: false,
				top: "",
				lineHeight: "",
				height: "",
				imgTop: ""
			};
		},
		components: { myModal },
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
				/* var pages = getCurrentPages();
				console.log('返回上一页', pages);
				if (pages.length <= 1) {
					console.log('可能是分享页面');
				} else {
					wx.navigateBack({
						delta: 1
					});
				} */
				uni.navigateTo({
					url:`/pages/my/myTurnOrder/myTurnOrder?status=${this.status}`
				})
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
			this.orderId = opt.id;
			this.status = opt.status;
			console.log(opt.status)
			
			let menuInfo = uni.getMenuButtonBoundingClientRect();
			this.top = menuInfo.top+"px";
			this.height = (menuInfo.height+2)+"px";
			this.lineHeight = menuInfo.height+"px";
			this.imgTop = menuInfo.top+5+"px";
		},
		onShow() {
			
			orderDesc({
				prm: this.orderId
			}).then(res => {
				console.log("转票详情",res);
				this.orderDetail = res[1].data.data;
				this.orderDetail.concert_time.start_at = this.formatDate(this.orderDetail.concert_time.start_at,".")
				this.orderDetail.created_at = this.formatDate(this.orderDetail.created_at,'-');
			});
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
			            vertical-align: middle;
			
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
								padding: 0upx 0 18upx 0;
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