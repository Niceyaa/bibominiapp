<template>
	<view class="question-feedback">
		<back-header title="意见反馈"></back-header>
		<view class="feedback-main">
			<view class="feed-header">
				<view>问题/意见描述</view>
				<view>{{currentWordsLen}}/200</view>
			</view>
			<textarea v-model="feedbackInfo"  placeholder="请填写10字以上的问题描述，以便我们更好的帮您解决问题" maxlength="200"/>
			<button class="submitFeedback" @click="submitFeedback">提交</button>
		</view>
	</view>
</template>

<script>
	import backHeader from '../../../components/childheader.vue';
	import { feedback } from '../../../Api/myApi/feedback.js'
	export default{
		data(){
			return{
				feedbackInfo: "",
				currentWordsLen: 0
			}
		},
		watch:{
			feedbackInfo(val){
				this.currentWordsLen = val.length;
			}
		},
		components:{
			backHeader
		},
		methods:{
			submitFeedback(){
				if(this.feedbackInfo.length>10){
					feedback({
						content: this.feedbackInfo
					}).then(res=>{
						uni.showToast({
							title:"谢谢您的反馈！"
						})
					})
					
				}else{
					uni.showToast({
						title:"请尽可能的描述清楚您的问题！谢谢！",
						icon:"none"
					})
				}
				
			}
		}
	}
</script>

<style lang="less">
	page{
		height: 100%;
		.question-feedback{
			height: 100%;
			background: #F6F6F6;
			.feedback-main{
				padding-top: 140upx;
				font-size: 28upx;
				.feed-header{
					padding: 40upx 40upx 22upx 40upx;
					display: flex;
					justify-content: space-between;
					color: #222222;
					font-size: 28upx;
				}
				textarea{
					padding: 37upx 83upx 0 40upx;
					box-sizing: border-box;
					height: 500upx;
					width: 750upx;
					background: #fff;
					font-size: 28upx;
				}
				.submitFeedback{
					margin: 80upx 54upx 0 54upx;
					background: #FF4658;
					font-size: 32upx;
					color: #fff;
					height: 96upx;
					width: 640upx;
					line-height: 96upx;
					text-align: center;
					border-radius: 10upx;
				}
			}
		}
	}
</style>
