<template>
	<view class="bill-container">
		<back-header title="我的账单"></back-header>
		<view class="bill-main">
			<view class="bill-item" v-for="item in billList" :key="item.id">
				<view class="bill-left">
					<view class="bill-desc">{{item.desc}}</view>
					<view class="bill-time">{{item.date}}</view>
				</view>
				<view class="bill-right">
					<text v-if="item.buy">-{{item.buy}}</text>
					<text v-else>+{{item.withdraw}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { moneyLog } from "../../../Api/myApi/moneyLog.js";
	import backHeader from '../../../components/childheader.vue';
	export default{
		data(){
			return{
				billList:[]
			}
		},
		components:{backHeader},
		watch:{
			getBillList(){
				console.log("处理数据");
			}
		},
		methods:{
			getBillList(){
				moneyLog().then(res=>{
					console.log(res)
					this.billList = res[1].data.data;
				})
				/* this.billList = [
					{id:0,date:"2017-08-09 13:13:23",buy:"1000.00",withdraw:"",desc:"购买音乐票sdfasdfasdfasfasfas"},
					{id:1,date:"2017-08-09 13:13:23",buy:"1000.00",withdraw:"",desc:"充值"},
					{id:2,date:"2017-08-09 13:13:23",buy:"",withdraw:"1000.00",desc:"提现"},
					{id:3,date:"2017-08-09 13:13:23",buy:"1000.00",withdraw:"",desc:"购买音乐票sdfaasdfasdfsdfa"},
					{id:4,date:"2017-08-09 13:13:23",buy:"",withdraw:"1000.00",desc:"提现"},
					{id:5,date:"2017-08-09 13:13:23",buy:"1000.00",withdraw:"",desc:"充值asdfassdfasdf"},
				];
			 */}
		},
		created() {
			this.getBillList()
		}
	}
</script>

<style lang="less">
	.bill-container{
		.bill-main{
			padding: 140rpx 40upx 0 40upx;
			.bill-item{
				padding: 40upx 0;
				border-bottom: solid 1px #F6F6F6;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 28upx;
				color: #222;
				font-weight: 600;
				.bill-left{
					.bill-desc{
						width: 340upx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.bill-time{
						color: #B2B2B2;
						font-weight: normal;
						font-size: 24upx;
						margin-top: 20upx;
					}
				}
			}
		}
	}
</style>
