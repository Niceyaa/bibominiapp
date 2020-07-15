<template>
	<view class="answer-container">
		<back-header title="问题详情"></back-header>
		<view class="answer-main">
			<view class="answer-content">
				<view class="question-title">{{ question }}</view>
				<view class="answer-detail">{{ answer }}</view>
			</view>
			<view class="feedback">
				<view class="is-help">回答对你是否有帮助</view>
				<view class="help-wrapper">
					<view class="have-help" @click="clickDown(1)">
						<image v-if="clickUpFlag"
							src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/alreadyup.png"
							mode=""></image>
						<image v-else
							src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/up.png"
							mode=""></image>
						<view class="help-info">有用</view>
					</view>
					<view class="have-no-help" @click="clickDown(0)">
						<image v-if="clickDownFlag"
							src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/alreadydown.png">
						</image>
						<image v-else
							src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/down.png">
						</image>
						<view class="help-info">无用</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { answer } from "../../../Api/myApi/answer.js";
	import { answerZan } from "../../../Api/myApi/answerZan.js";
	import backHeader from '../../../components/childheader.vue';
	export default {
		data() {
			return {
				clickDownFlag: false,
				clickUpFlag: false,
				question: [],
				answer: [],
				pid: null,
				onlyOnce: false
			};
		},
		components: {
			backHeader
		},
		onLoad(opt) {
			this.pid = parseInt(opt.pid);
			answer({
				prm: this.pid
			}).then(res => {
				console.log(res[1].data.data);
				this.question = res[1].data.data.question;
				this.answer = res[1].data.data.answer;
			})
		},
		methods: {
			clickDown(status){
				if(this.onlyOnce){
					return
				}
				this.onlyOnce = true;
				
				status = parseInt(status);
				answer({
					problem_id:this.pid,
					zan:status
				}).then(res=>{
					if(status === 0){
						this.clickDownFlag = true;
						uni.showToast({
							title: "我们会继续改进的！"
						})
					}else{
						this.clickUpFlag = true;
						uni.showToast({
							title: "我们会继续努力的！"
						})
					}
				})
			}
		}
	};
</script>

<style lang="less">
	page {
		height: 100%;
		.answer-container {
			height: 100%;
			background: #f6f6f6;

			.answer-main {
				padding-top: 140rpx;

				.answer-content {
					margin-top: 20upx;
					background: #fff;
					padding: 0 40upx;
					color: #222;

					.question-title {
						font-size: 32upx;
						font-weight: 600;
						padding: 40upx 0;
						border-bottom: 1px solid #f6f6f6;
					}

					.answer-detail {
						font-size: 24upx;
						padding: 40upx 0;
						line-height: 38upx;
						text-align: justify;
					}
				}

				.feedback {
					margin-top: 90upx;

					.is-help {
						color: #b2b2b2;
						font-size: 24upx;
						text-align: center;
					}
				}

				.help-wrapper {
					display: flex;
					padding: 40upx 80upx 0 80upx;
					justify-content: space-between;

					.have-help {
						width: 250upx;
						height: 80upx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						border: 1px solid #9A9A9A;
						border-radius: 40upx;
						padding: 0 72upx;
						box-sizing: border-box;

						image {
							width: 37upx;
							height: 37upx;
						}

						.help-info {
							font-size: 24upx;
							color: #222;
						}
					}

					.have-no-help {
						width: 250upx;
						height: 80upx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						border: 1px solid #9A9A9A;
						border-radius: 40upx;
						padding: 0 72upx;
						box-sizing: border-box;

						image {
							width: 37upx;
							height: 37upx;
						}

						.help-info {
							font-size: 24upx;
							color: #222;
						}
					}
				}
			}
		}
	}
</style>