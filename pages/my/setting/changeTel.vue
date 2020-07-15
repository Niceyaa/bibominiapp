<template>
	<view class="safe-password">
		<back-header title="更换手机号"></back-header>
		<view class="pwd-main">
			<view class="pwd-title">验证当前绑定手机号</view>
			<view class="pwd-tel">{{tel}}</view>
			<view class="verification-code">
				<view class="left-wrapper">
					<view class="code-left">验证码</view>
					<input maxlength="4" v-model="code" class="code-input" type="number" placeholder="请输入验证码" placeholder-style="color:#B1B1B1;font-size:28upx">
				</view>
				
				
				
				
				<view v-if="getCodeFlag" class="code-right" @click="getCode">获取验证码</view>
				<view v-else style="color: #B1B1B1;font-weight: normal;">{{leftTime}}S后重发</view>
			</view>
			<button :disabled="!inputFlag" :class="{'next-step':true,'redBgc':inputFlag}" @click="next">下一步</button>
		</view>
	</view>
</template>

<script>
	import backHeader from '../../../components/childheader.vue';
	import { defaultTelCode } from "../../../Api/myApi/defaultTelCode.js"
	import { updateUserInfo } from '../../../Api/myApi/updateUserInfo.js';
	export default{
		data(){
			return{
				code: "",
				getCodeFlag:true,
				leftTime: "",
				inputFlag: false,
				tel: ""
			}
		},
		watch:{
			leftTime(v){
				if(v === 0){
					clearInterval(this.timeId);
					this.getCodeFlag = true;
				}
			},
			code(v){
				console.log(typeof v)
				if(v.length === 4){
					this.inputFlag = true;
				}else{
					this.inputFlag = false;
				}
			}
		},
		components:{
			backHeader
		},
		onShow() {
			this.tel = uni.getStorageSync("defaultTel"); 
		},
		methods:{
			getCode(){
				defaultTelCode({
					is_check:1
				}).then(res=>{
					console.log("发送验证码",res)
					if(res[1].data.err_code === 0){
						this.getCodeFlag = false;
						this.leftTime = 60;
						this.timeId = setInterval(()=>{
							this.leftTime--;
						},1000)
					}
				})
				
			},
			next(){
				uni.navigateTo({
					url:`/pages/my/setting/newTel?code=${this.code}`
				})
			}
		}
	}
</script>

<style lang="less">
page{
		height: 100%;
		.safe-password{
			height: 100%;
			background: #F6F6F6;
			.pwd-main{
				padding-top: 140upx;
				font-size: 28upx;
				.pwd-title{
					padding: 40upx 0 0 40upx;
					color: #222222;
				}
				.pwd-tel{
					color: #999999;
					padding: 16upx 0 16upx 40upx;
				}
				.verification-code{
					display: flex;
					background: #FFFFFF;
					justify-content: space-between;
					padding: 36upx;
					align-items: center;
					font-weight: 600;
					.left-wrapper{
						display: flex;
						.code-input{
							margin-left: 56upx;
							font-size: 28upx;
							font-weight: normal;
						}
					}
				}
				.next-step{
					margin: 80upx 55upx 0 55upx;
					line-height: 96upx;
					height: 96upx;
					text-align: center;
					font-size: 32upx;
					color: #FFFFFF;
					background: #FB8C97;
					border-radius: 10upx;
				}
				.redBgc{
					background: #FF4657;
				}
			}
		}
	}
</style>
