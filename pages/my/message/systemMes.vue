<template>
	<view class="system-container">
		<back-header title="系统消息"></back-header>
		<view v-if="messageList.length !== 0" class="system-main">
			<view v-for="item in messageList" :key="item.id" class="message-item">
				<view class="message-time">{{ item.push_msg.created_at }}</view>
				<view class="message-wrapper">
					<view class="litter-wrapper">
						<image v-if="item.status === 1"
							src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/newMy/redPoint.png"
							mode=""></image>
						<view class="item-title">系统消息</view>
						<view class="item-content">{{ item.push_msg.content.title }}</view>
					</view>
					<view class="more" @click="goToDetail({id:item.id,val:item.push_msg.to_val})">
						<image src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/newMy/more.png"
							mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="no-message">
			<image src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/newMy/nomessage.png" mode="">
			</image>
			<view>暂时没有通知哦</view>
		</view>
	</view>
</template>

<script>
	import backHeader from '../../../components/childheader.vue';
	import { message } from '../../../Api/myApi/message.js'
	import { messageRead } from '../../../Api/myApi/messageRead.js'
	export default {
		data() {
			return {
				messageList: [
					{
						id: 1,
						push_msg_id: 1,
						status: 1,
						push_msg: {
							id: 1,
							title: '系统消息11',
							content: {
								title: '未定义',
								desc: '未定义'
							},
							jump_type: 'concert_detail',
							to_val: '650000000000',
							created_at: 1588904947
						}
					},
					{
						id: 2,
						push_msg_id: 1,
						status: 0,
						push_msg: {
							id: 1,
							title: '系统消息11',
							content: {
								title: '未定义未定义未定义未定义未定义未定义未定义未定义未定义未定义未定义未定义未定义未定义未定义未定义未定义',
								desc: '未定义'
							},
							jump_type: 'concert_detail',
							to_val: '650000000000',
							created_at: 1588904947
						}
					},
					{
						id: 3,
						push_msg_id: 1,
						status: 1,
						push_msg: {
							id: 1,
							title: '系统消息11',
							content: {
								title: '未定义',
								desc: '未定义'
							},
							jump_type: 'concert_detail',
							to_val: '650000000000',
							created_at: 1588904947
						}
					}
				]
			};
		},
		components: { backHeader },
		methods: {
			getMessageList() {
				message({
					type: "system_msg"
				}).then(res => {
					console.log(1111, res)
					//this.messageList = res.data.data;
				})
			},
			// 去详情页
			goToDetail(opt) {
				// 根据id标记已读，同时根据val的值进行跳转
				messageRead({
					id: opt.id
				}).then(res => {
					console.log(res)
				})
			}
		},
		mounted() {
			this.getMessageList()
		}
	};
</script>

<style lang="less">
	page {
		height: 100%;

		.system-container {
			height: 100%;
			background: #F5F5F5;

			.system-main {
				padding-top: 140upx;

				.message-item {
					padding: 0 40upx 0 40upx;
					color: #B2B2B2;
					font-size: 26upx;

					.message-time {
						padding: 20upx;
						text-align: center;
						font-size: 22upx;
					}

					.message-wrapper {
						background: #fff;
						border-radius: 10upx;

						.litter-wrapper {
							padding: 30upx 54upx;
							position: relative;
							border-bottom: 1px solid #E6E6E6;

							image {
								position: absolute;
								left: 20upx;
								top: 40upx;
								width: 14upx;
								height: 14upx;
							}

							.item-title {
								color: #222;
								font-size: 30upx;
							}

							.item-content {
								font-size: 26upx;
								padding: 16upx 0 0upx 0;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}
						}

						.more {
							display: flex;
							flex-direction: row-reverse;
							padding: 15upx 20upx;

							image {
								width: 14upx;
								height: 31upx;
							}
						}

					}
				}
			}

			.no-message {
				padding-top: 140upx;
				text-align: center;
			}
		}
	}
</style>