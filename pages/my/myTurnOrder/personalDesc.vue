<template>
	<view class="personal-desc">
		<back-header backUrl="/pages/my/myTurnOrder/myTurnOrder" title="订单详情"></back-header>
		<view class="personal-wrapper">
			<view class="grey"></view>
			<view class="tip">
				{{status}}
			</view>
		</view>
	</view>
</template>

<script>
import backHeader from '../../../components/childheader.vue';
import { turnOrderDesc } from "../../../Api/myApi/turnOrderDesc.js"
export default {
	data() {
		return {
			status: "系统审核中",
			resaleId: null
		};
	},
	components: { backHeader },
	onLoad(Option) {
		this.resaleId = Option.id;
		turnOrderDesc({
			prm: this.resaleId
		}).then(res=>{
			switch(res[1].data.data.status){
				case "apply":
				this.status = "系统审核中";
				break;
				case "cancel":
				this.status = "已取消转票";
				break;
				case "reject":
				this.status = "系统已驳回转票申请";
				break;
				case "pass":
				this.status = "审核通过正常转票";
				break;
				case "over":
				this.status = "已卖完";
				break;
				case "delete":
				this.status = "已删除";
				break;
				
			}
		
			console.log("个人转票订单详情",res)
		})
		console.log(Option)
	},
	methods: {
		
	},
};
</script>

<style lang="less">
page{
	height: 100%;
	.personal-desc{
		height: 100%;
		background: #f6f6f6;
		.personal-wrapper{
			padding-top: 140upx;
			text-align: center;
			font-size: 28upx;
			color: #222;
			.grey{
				width: 340upx;
				height: 340upx;
				background-color: #B2B2B2;
				margin: 140upx 205upx 120upx 205upx;
			}
		}
	}
}
</style>
