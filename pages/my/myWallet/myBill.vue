<template>
	<view class="bill-container">
		<back-header title="我的账单"></back-header>
		<view class="bill-main">
			<view class="bill-nav">
				<view class="bill-left">
					<view class="left-top">
						<picker class="pik" fields="month" mode="date" :value="currentMonth" @change="selectMonth">
							<text class="time">{{ selectedMonth }}</text>
							<image src="../../../static/image/down.png" mode=""></image>
						</picker>
					</view>
					<view class="left-bottom">
						<text>支出￥{{ billList.money_count.expenditure }}</text>
						<text style="padding-left: 30upx;">收入￥{{ billList.money_count.income }}</text>
					</view>
				</view>
				<view class="bill-right">
					<picker mode="selector" :range="typeArr" @change="changeType">
						筛选
					<image src="../../../static/image/down.png" mode=""></image>
					</picker>
					
				</view>
			</view>
			<view class="bill-item" v-for="item in billList.list" :key="item.id">
				<view class="bill-left">
					<view class="bill-desc">{{ item.desc }}</view>
					<view class="bill-time">{{ item.updated_at }}</view>
				</view>
				<view class="bill-right">
					<text style="color: #FF4657;" v-if="item.money > 0">+{{ item.money }}</text>
					<text v-else>{{ item.money }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { moneyLog } from '../../../Api/myApi/moneyLog.js';
import backHeader from '../../../components/childheader.vue';
export default {
	data() {
		return {
			selectedMonth: "",
			currentMonth: '',
			typeArr: ["全部","支出","收入"],
			selectType: ["all","expenditure","income"],
			billList: {}
		};
	},
	components: { backHeader },
	watch: {
		getBillList() {
			console.log('处理数据');
		}
	},
	methods: {
		// 筛选type
		changeType(e){
			let idx = parseInt(e.detail.value);
			moneyLog({
				month: this.currentMonth,
				type: this.selectType[idx]
			}).then(res=>{
				console.log(res)
				this.billList = res[1].data.data;
				this.billList.list.forEach(item => {
					item.updated_at = this.formatDate(item.updated_at);
				});
			})
		},
		// 筛选日期
		selectMonth(e) {
			console.log('e', e.detail.value);
			this.currentMonth = e.detail.value;
			let temp = this.currentMonth.split("-");
			this.selectedMonth = `${temp[0]}年${parseInt(temp[1])}月`
			moneyLog({
				month:e.detail.value
			}).then(res=>{
				console.log(res)
				this.billList = res[1].data.data;
				this.billList.list.forEach(item => {
					item.updated_at = this.formatDate(item.updated_at);
				});
			})
		},
		formatDate(t, stu) {
			let dd = new Date(t);
			let y = dd.getFullYear();
			let m = (dd.getMonth() + 1).toString().padStart(2, '0');
			let d = dd
				.getDate()
				.toString()
				.padStart(2, '0');
			let h = dd
				.getHours()
				.toString()
				.padStart(2, '0');
			let min = dd
				.getMinutes()
				.toString()
				.padStart(2, '0');
			if (stu === '.') {
				return `${y}.${m}.${d} ${h}:${min}`;
			}
			return `${y}-${m}-${d} ${h}:${min}`;
		},
		open() {
			this.$refs.cal.open();
		},
		getBillList() {
			moneyLog().then(res => {
				console.log(res);
				this.billList = res[1].data.data;
				this.billList.list.forEach(item => {
					console.log(item);
					item.updated_at = this.formatDate(item.updated_at);
				});
			});
		}
	},
	created() {
		let tt = new Date();
		let y = tt.getFullYear();
		let mon = (tt.getMonth()+1).toString().padStart(2,"0");
		let formatMon = parseInt(mon);
		this.selectedMonth = `${y}年${formatMon}月`;
		this.currentMonth = `${y}-${mon}`;
		this.getBillList();
	}
};
</script>

<style lang="less">
.bill-container {
	.bill-main {
		padding: 140rpx 0upx 0 0upx;
		.bill-nav {
			height: 128upx;
			background: #f6f6f6;
			width: 750upx;
			box-sizing: border-box;
			padding: 0 40upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.bill-left {
				.left-top {
					.pik {
						font-size: 32upx;
						color: #222;
						font-weight: 600;
						display: flex;
						align-items: center;
						padding-top: 20upx;
						image {
							width: 20upx;
							height: 12upx;
							padding-left: 13upx;
							vertical-align: middle;
						}
					}
				}
				.left-bottom {
					padding: 15upx 0;
					font-size: 28upx;
					color: #666666;
				}
			}
			.bill-right {
				font-size: 28upx;
				color: #222;
				image {
					padding-left: 13upx;
					width: 20upx;
					height: 12upx;
					vertical-align: middle;
				}
			}
		}
		.bill-item {
			padding: 40upx;
			border-bottom: solid 1px #f6f6f6;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28upx;
			color: #222;
			font-weight: 600;
			.bill-left {
				.bill-desc {
					width: 340upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.bill-time {
					color: #b2b2b2;
					font-weight: normal;
					font-size: 24upx;
					margin-top: 20upx;
				}
			}
		}
	}
}
</style>
