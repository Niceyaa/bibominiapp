<template>
	<view class="my-modal" >
		<view class="modal-content">
			<view class="modal-title">{{title}}</view>
			<view class="modal-desc">{{desc}}</view>
			<view class="modal-bottom">
				<view class="my-btn" @click="cancel">取消</view>
				<view class="my-btn confirm-btn" @click="confirm">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { orderOperate } from "../../../Api/myApi/orderOperate.js";
	export default{
		props:{
			modalFlag:{
				type:Boolean,
				default:false
			},
			title:{
				default:"默认标题"
			},
			desc:{
				type:String,
				default:"默认内容"
			},
			status:{
				type: String
			},
			orderId:{}
		},
		methods:{
			cancel(){
				console.log("取消");
				this.$emit("update:modalFlag",false)
			},
			confirm(){
				console.log(this.$props.status,this.$props.orderId)
				if(this.$props.status === "geted"){// 执行确认收货
					orderOperate({
						order_id:parseInt(this.$props.orderId),
						type: "geted"
					}).then(res=>{
						console.log(res)
						uni.showToast({
							title:res.data.err_msg
						})
					})
				}else if(this.$props.status === "delete"){
					orderOperate({
						order_id:parseInt(this.$props.orderId),
						type: "delete"
					}).then(res=>{
						console.log(res)
						uni.showToast({
							title:res.data.err_msg
						})
					})
				}else if(this.$props.status === "cancel"){
					orderOperate({
						order_id:parseInt(this.$props.orderId),
						type: "cancel"
					}).then(res=>{
						uni.showToast({
							title:res.data.err_msg
						})
					})
				}
				this.$emit("update:modalFlag",false)
			}
		}
	}
</script>

<style lang="less">
	.my-modal{
		height: 100%;
		width: 750upx;
		background: rgba(0,0,0,.5);
		position: fixed;
		z-index: 999;
		top: 0;
		display: flex;
		align-items: center;
		.modal-content{
			width: 100%;
			box-sizing: border-box;
			background: #fff;
			margin: 0 40upx; 
			border-radius: 10upx;
			font-size: 28upx;
			text-align: center;
			.modal-title{
				padding: 30upx;
				font-size: 32upx;
				color: #666;
				border-bottom: 1px solid #F6F6F6;
			}
			.modal-desc{
				padding: 54upx 0;
				color: #222;
				font-size: 28upx;
			}
			.modal-bottom{
				padding: 40upx 85upx;
				display: flex;
				justify-content: space-between;
				.my-btn{
					width: 200upx;
					height: 70upx;
					border: 1px solid #222;
					line-height: 70upx;
					font-size: 28upx;
					border-radius: 40upx;
				}
				.confirm-btn{
					border: none;
					width: 201upx;
					height: 71upx;
					border: none;
					color: #FFFFFF;
					background: #FF4658;
				}
			}
		}
	}
</style>
