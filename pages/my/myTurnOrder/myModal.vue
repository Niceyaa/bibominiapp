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
	import { turnOrderOperate } from "../../../Api/myApi/turnOrderOperate.js"
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
			orderId:{},
			status:{type:String}
		},
		methods:{
			cancel(){
				console.log("取消");
				this.$emit("update:modalFlag",false)
			},
			confirm(){
				console.log("确认");
				console.log(this.$props.orderId,this.$props.status)
				if(this.$props.status === "cancel"){
					turnOrderOperate({
						resale_id:this.$props.orderId,
						status:"cancel"
					}).then(res=>{
						console.log(res)
					})
				}else if(this.$props.status === "delete"){
					turnOrderOperate({
						resale_id:this.$props.orderId,
						status:"delete"
					}).then(res=>{
						console.log(res)
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
