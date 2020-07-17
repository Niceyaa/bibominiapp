<template>
	<view v-if="loginStatus" class="want-see">
		<back-header title="想看的演出"></back-header>
		<view v-if="noConcert" class="see-main">
			<view @click="goToDetail(item.id)" class="concern-item" v-for="item in wannaSee" :key="item.id">
				<view class="concern-left">
					<image :src="item.poster" mode=""></image>
				</view>
				<view class="concern-right">
					<view class="right-title">【{{item.city_name}}站】《{{item.name}}》</view>
					<view class="right-time">{{item.start_at}}-{{item.end_at}}</view>
					<view class="right-time">{{item.venue.name}}</view>
					<view class="bottom-wraper">
						<view class="price">
							<text>{{item.lower_price}}</text>元起
						</view>
						<view @click.stop="getTicket" class="get-btn">购票</view>
					</view>
				</view>
			</view>
		</view>
		<view class="no-list" v-else>
			<view class="other-container">
				<image src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/temp/noConcert.png" mode=""></image>
				<view class="no-address">
					目前还没有想看的演出
				</view>
			</view>
		</view>
		<appAlert @changeAppAlertOnoff="changeOnOff" :appAlertOnoff="onoff"></appAlert>
	</view>
	<no-login v-else></no-login>
</template>

<script>
import noLogin from '../login/noLogin.vue'
import { formatDate } from "../../../common/formatDate.js"
import { concernConcert } from "../../../Api/myApi/concernConcert.js";
import { payOrder } from "../../../Api/myApi/payOrder.js";
import backHeader from '../../../components/childheader.vue';
export default {
	data() {
		return {
			onoff: false,
			loginStatus: true,
			wannaSee: [],
			noConcert: true
		};
	},
	components: {
		backHeader,
		noLogin
	},
	methods: {
		changeOnOff(i) {
			this.onoff = i;
		},
		getTicket(){
			console.log("跳转购票界面")
			this.onoff = true;
		},
		goToDetail(id){
			uni.navigateTo({
				url:`/pages/index/yanchudetails/yanchudetails?id=${id}`
			})
		}
	},
	onShow() {
		concernConcert().then(res=>{
			console.log(res)
			this.wannaSee = res[1].data.data;
			if(this.wannaSee.length>0){
				this.noConcert = true;
				this.wannaSee.forEach(item=>{
					item.start_at = formatDate(item.start_at);
					item.end_at = formatDate(item.end_at);
				})
			}else{
				this.noConcert = false;
			}
		})
	},
	onLoad() {
		if(uni.getStorageSync("loginStatus")){
			this.loginStatus = true;
		}else{
			this.loginStatus = false;
		}
	}
};
</script>

<style lang="less" scoped>
	page{height: 100%;}
	.want-see{
		height: 100%;
		.see-main{
			padding-top: 140upx;
			.concern-item{
				padding: 60upx 40upx 0 40upx;
				display: flex;
				.concern-left{
					flex: 0 185upx;
					margin-right: 50upx;
					image{
						width: 185upx;
						height: 260upx;
						border-radius: 5upx;
					}
				}
				.concern-right{
					flex: 1;
					.right-title{
						color: #212121;
						font-weight: 600;
						font-size: 28upx;
						// height: 77upx;
						// overflow: hidden;
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.right-time{
						padding-top: 12upx;
						color: #999999;
						font-size: 24upx;
					}
					.bottom-wraper{
						display: flex;
						color: #212121;
						justify-content: space-between;
						align-items: flex-end;
						margin-top: 40upx;
						.price{
							
							font-size: 24upx;
							text{
								font-weight: bold;
								font-size: 36upx;
								color: #ff4657;
							}
						}
						.get-btn{
							background: #ff4657;
							text-align: center;
							width: 120upx;
							height: 60upx;
							border-radius: 10upx;
							color: #fff;
							line-height: 60upx;
							font-weight: 600;
							font-size: 24upx;
						}
					}
				}
			}
		}
		.no-list {
			height: 100%;
			background: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			.other-container {
				image{
					width: 393upx;
					height: 289upx;
				}
				.no-address{
					text-align: center;
					font-size: 26upx;
					color: #000000;
					font-family: PingFangSC-Regular;
				}
				
			}
		}
	}
</style>
