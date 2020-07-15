<template>
	<view class="question-container">
		<back-header title="常见问题"></back-header>
		<view class="question-main">
			<view @click="goToAnswer(item.id)" class="question-item" v-for="item in questionList" :key="item.id">
				<view class="question-desc">{{item.question}}</view>
				<image src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/fanhui.png"
					class="question-right"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import { question } from "../../../Api/myApi/question.js";
	import backHeader from "../../../components/childheader.vue"
	export default {
		data() {
			return {
				questionList: []
			}
		},
		components: {
			backHeader
		},
		mounted() {
			question({
				page: 1
			}).then(res => {
				console.log("常见问题", res)
				this.questionList = res[1].data.data;
			})
		},
		methods: {
			goToAnswer(pid) {
				uni.setStorageSync("pid", pid);
				uni.navigateTo({
					url: `/pages/my/commonQuestion/answer?pid=${pid}`
				})
			}
		}
	}
</script>

<style lang="less">
	.question-container {
		.question-main {
			padding-top: 140rpx;

			.question-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 28upx;
				border-bottom: 1px solid #FAFAFA;
				padding: 40upx;
				color: #222222;

				&:first-child {
					border-top: 1px solid #FAFAFA;
				}

				.question-desc {
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					width: 500rpx;
					-padding-right: 40upx;
				}

				.question-right {
					width: 13rpx;
					height: 23rpx;
					-margin-left: 45rpx;
				}
			}
		}
	}
</style>