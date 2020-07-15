<template>
	<view class="wf-page">
		<!--    left    -->
		<view>
			<view id="left" v-if="leftList.length">
				<view class="guanggao-container"
					@click="targetContent(recommend_start.jump_type,recommend_start.jump_value)">
					<image class="" :src="recommend_start.img" mode="center" />
					<view class="tips">
						#有多久没看演唱会了？
					</view>
					<view class="tipsTwo">
						点这里唱给你听
					</view>
					<view class="look">
						点击查看
					</view>
				</view>
				<view v-for="(item,index) in leftList" :key="index" class="wf-item" @tap="itemTap(item)"
					@click="targetDetails(item.id)">
					<WaterfallsFlowItem :item="item" />
				</view>
			</view>
		</view>


		<!--    right    -->
		<view>
			<view id="right" v-if="rightList.length">
				<view v-for="(item,index) in rightList" :key="index" class="wf-item" @tap="itemTap(item)"
					@click="targetDetails(item.id)">
					<WaterfallsFlowItem :item="item" />
				</view>
				<view class="guanggao-container"
					@click="targetContent(recommend_start.jump_type,recommend_start.jump_value)">
					<image class="" :src="recommend_start.img" mode="center" />
					<view class="tips">
						#有多久没看演唱会了？
					</view>
					<view class="tipsTwo">
						点这里唱给你听
					</view>
					<view class="look">
						点击查看
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import WaterfallsFlowItem from '../WaterfallsFlowItem/WaterfallsFlowItem.vue'
	import { guanggao } from "@/Api/common"

	export default {
		components: {
			WaterfallsFlowItem
		},
		props: {
			// 瀑布流列表
			wfList: {
				type: Array,
				require: true
			},
			updateNum: {
				type: Number,
				default: 10
			}
		},
		data() {
			return {
				recommend_start: null,
				allList: [],       // 全部列表
				leftList: [],      // 左边列表
				rightList: [],     // 右边列表
				mark: 0,           // 列表标记
				boxHeight: [],     // 下标0和1分别为左列和右列高度
			};
		},
		mounted() {
			let that = this;
			this.changeData();
			guanggao({

			}, 'recommend_start').then(function (data) {
				that.recommend_start = data[1].data.data;
				console.log(data[1].data.data)
			})
		},
		watch: {
			async wfList() {
				if (this.wfList.length === 0 ||
					(this.wfList.length === this.updateNum && this.wfList.length <= this.allList.length)) {
					this.allList = [];
					this.leftList = [];
					this.rightList = [];
					this.boxHeight = [];
					this.mark = 0;
				}

				if (this.wfList.length) {
					this.allList = this.wfList;
					await this.waterFall()
				}
			},
			async mark() {
				const len = this.allList.length;
				if (this.mark < len && this.mark !== 0) {
					await this.waterFall();
				}
			}
		},
		methods: {
			targetContent(type, id) {
				// jump_type=resale_detail/concert_detail 跳转的转票ID/演出ID； web_url：调整的链接地址
				// switch(type){
				// 	case 'resale_detail':
				// }
				uni.navigateTo({
					url: '/pages/index/yanchudetails/yanchudetails?id=' + id,
				});
				console.log(type, id)
			},
			async changeData() {
				if (this.wfList.length === 0 ||
					(this.wfList.length === this.updateNum && this.wfList.length <= this.allList.length)) {
					this.allList = [];
					this.leftList = [];
					this.rightList = [];
					this.boxHeight = [];
					this.mark = 0;
				}

				if (this.wfList.length) {
					this.allList = this.wfList;
					await this.waterFall()
				}
			}
			,
			targetDetails(id) {
				console.log(id);
				uni.navigateTo({
					url: '/pages/index/yanchudetails/yanchudetails?id=' + id,
				});
			},
			async waterFall() {
				const i = this.mark;
				if (i === 0) {
					this.leftList.push(this.allList[i]);
					await this.getViewHeight(0);
				} else if (i === 1) {
					this.rightList.push(this.allList[i]);
					await this.getViewHeight(1);
				} else {
					const leftOrRight = this.boxHeight[0] > this.boxHeight[1] ? 1 : 0;
					if (leftOrRight) { this.rightList.push(this.allList[i]) }
					else { this.leftList.push(this.allList[i]) }
					await this.getViewHeight(leftOrRight);
				}
			},
			async getViewHeight(leftOrRight) {
				const query = uni.createSelectorQuery().in(this);
				const id = leftOrRight ? '#right' : '#left';
				await setTimeout(() => {
					query.select(id).boundingClientRect(res => {
						this.boxHeight[leftOrRight] = res.height;
						this.mark = this.mark + 1;
					}).exec();
				}, 50)
			},
			itemTap(item) {
				this.$emit('itemTap', item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	$page-padding:10px;
	$grid-gap:10px;

	.guanggao-container {
		width: calc((100vw - 2 * 10px - 10px) / 2);
		border-radius: 10rpx;
		box-sizing: border-box;
		margin-top: 10rpx;



		border-radius: 10rpx;
		box-sizing: border-box;
		margin-top: 10rpx;
		border: 1px solid #f1f1f1;
		-webkit-box-sizing: border-box;
		position: relative;

		.tipsTwo {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 0.6);
			line-height: 73rpx;
			position: absolute;
			bottom: 100rpx;
			left: 23rpx;
		}

		.tips {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 0.6);
			line-height: 73rpx;
			position: absolute;
			bottom: 144rpx;
			left: 23rpx;

		}

		.look {
			width: 192rpx;
			text-align: center;
			height: 50rpx;
			background: rgba(255, 70, 87, 1);
			border-radius: 25rpx;
			position: absolute;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			line-height: 50rpx;
			bottom: 43rpx;
			left: 50%;
			margin-left: -96rpx;
		}

		image {
			width: 100%;
		}
	}

	.wf-page {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: $grid-gap;
		padding: 10px $page-padding;
	}

	.wf-item {
		width: calc((100vw - 2 * #{$page-padding} - #{$grid-gap}) / 2);
		border-radius: 10rpx;
		box-sizing: border-box;
		margin-top: 10rpx;
		border: 1px solid #f1f1f1;
		/* box-shadow: 10rpx 10rpx 10rpx rgba(221, 221, 221, 1); */
		-webkit-box-sizing: border-box;
	}
</style>