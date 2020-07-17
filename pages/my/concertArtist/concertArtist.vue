<template>
	<view v-if="loginStatus" class="concert-container">
		<back-header title="关注的艺人"></back-header>
		<view v-if="noArtist" class="concern-main">
			<view class="concern-item" v-for="(item, i) in artistList" :key="item.id">
				<view class="top">
					<image :src="item.img" @click="goToActor(item.id)"></image>
					<view class="content">
						<view class="left" @click="goToActor(item.id)">
							<view class="name">{{ item.name }}</view>
							<view class="desc">{{ item.desc }}</view>
						</view>
						<view class="right">
							<view @click="delConcern({ id: item.id, index: i })" v-if="visibleArr[i]" class="concern-btn">已关注</view>
							<view v-else @click="addConcern({ id: item.id, index: i })">未关注</view>
						</view>
					</view>
				</view>
				<view class="recent" @click="goToDetail(item.concert.id)">
					<view class="recent-top">
						<view>最近演出</view>
						<view>{{ item.concert.start_at }}</view>
					</view>
					<view class="recent-main">
						<text>「{{ item.concert.city_name.split('市')[0] }}站」</text>
						<text>{{ item.concert.name }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="no-list" v-else>
			<view class="other-container">
				<image src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/temp/noartist.png" mode=""></image>
				<view class="no-address">目前还没有关注的艺人</view>
			</view>
		</view>
	</view>
	<no-login v-else></no-login>
</template>

<script>
import noLogin from '../login/noLogin.vue';
import { formatDate } from '../../../common/formatDate.js';
import { operateActor } from '../../../Api/myApi/operateActor.js';
import { concernArtist } from '../../../Api/myApi/concernArtist.js';
import backHeader from '../../../components/childheader.vue';
export default {
	data() {
		return {
			artistList: [],
			visible: true,
			loginStatus: true,
			noArtist: true,
			visibleArr: [] // 定义Boolean数组
		};
	},
	watch: {
		artistList(val) {
			console.log(val);
		}
	},
	components: {
		backHeader,
		noLogin
	},
	methods: {
		delConcern(item) {
			let that = this;
			uni.showModal({
				title: '取消关注',
				content: '您确认将该艺人从您的关注列表中移除吗？',
				success(sureRes) {
					if (sureRes.confirm) {
						operateActor({
							opt: 'delete',
							id: item.id
						}).then(res => {
							console.log(res);
							uni.showToast({
								title: res[1].data.err_msg,
								icon: 'none'
							});
							// 动态更新visibleArr和关注列表
							that.$set(that.visibleArr, that.visibleArr.splice(item.index,1));
							that.$set(that.artistList, that.artistList.splice(item.index, 1));
							if (that.artistList.length < 1) {
								that.noArtist = false;
							}
						});
					} else if (res.cancel) {
						console.log('点击了取消按钮');
					}
				}
			});
		},
		addConcern(item) {
			operateActor({
				opt: 'add',
				id: item.id
			}).then(res => {
				console.log('add', res);
				uni.showToast({
					title: res[1].data.err_msg,
					icon: 'none'
				});
				this.$set(this.visibleArr, item.index, true);
			});
		},
		goToActor(id) {
			uni.navigateTo({
				url: `/pages/index/homepage/homepage?id=${id}`
			});
		},
		goToDetail(id) {
			uni.navigateTo({
				url: `/pages/index/yanchudetails/yanchudetails?id=${id}`
			});
		},
		getList() {
			concernArtist().then(res => {
				console.log('关注艺人列表', res);
				this.$set(this.artistList, res[1].data.data);
				// this.artistList = res[1].data.data;
				if (this.artistList.length > 0) {
					this.noArtist = true;
				} else {
					this.noArtist = false;
				}
				res[1].data.data.forEach(item => {
					this.visibleArr.push(true);
					let t = new Date(item.concert.start_at);
					let y = t.getFullYear();
					let m = t
						.getMonth()
						.toString()
						.padStart(2, '0');
					let d = t
						.getDate()
						.toString()
						.padStart(2, '0');
					let h = t
						.getHours()
						.toString()
						.padStart(2, '0');
					let mi = t
						.getMinutes()
						.toString()
						.padStart(2, '0');
					item.concert.start_at = `${y}-${m}-${d}-${h}:${mi}`;
				});
				console.log(this.artistList);
			});
		}
	},
	onShow() {
		concernArtist().then(res => {
			// this.$set(this.artistList,res[1].data.data);
			this.artistList = res[1].data.data;
			if (this.artistList.length > 0) {
				this.noArtist = true;
			} else {
				this.noArtist = false;
			}
			console.log('关注艺人列表', res);
			this.artistList.forEach(item => {
				this.visibleArr.push(true);
				let t = new Date(item.concert.start_at);
				let y = t.getFullYear();
				let m = t
					.getMonth()
					.toString()
					.padStart(2, '0');
				let d = t
					.getDate()
					.toString()
					.padStart(2, '0');
				let h = t
					.getHours()
					.toString()
					.padStart(2, '0');
				let mi = t
					.getMinutes()
					.toString()
					.padStart(2, '0');
				item.concert.start_at = `${y}-${m}-${d}-${h}:${mi}`;
			});
			console.log(this.visibleArr);
		});
	},
	onLoad() {
		if(uni.getStorageSync("loginStatus")){
			this.loginStatus = true;
		}else{
			this.loginStatus = false;
		}
	}
};
</script>

<style lang="less">
page {
	height: 100%;
}
.concert-container {
	height: 100%;
	.concern-main {
		padding-top: 140rpx;
		height: 100upx;
		.concern-item {
			&:first-child {
				border-top: 1px solid #f0f0f0;
			}
			.top {
				padding: 41upx 40upx;
				display: flex;
				align-items: center;
				image {
					width: 100upx;
					height: 100upx;
					border-radius: 50upx;
					flex: 0 100upx;
				}
				.content {
					flex: 1;
					font-size: 24upx;
					color: #b2b2b2;
					margin-left: 21upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.left {
						.name {
							font-size: 32upx;
							color: #000;
							font-weight: bold;
						}
						.desc {
							width: 400upx;
							padding-top: 21upx;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}
					}
					.right {
						flex: 0 140upx;
						view {
							border-radius: 40upx;
							padding: 18upx 0;
							border: 1px solid #f0f0f0;
							text-align: center;
							&.concern-btn {
								background: #ff4657;
								color: #fff;
								border: none;
							}
						}
					}
				}
			}
			.recent {
				background: #f6f6f6;
				margin: 0 40upx;
				border-radius: 10upx;
				font-size: 24upx;
				padding: 0 20upx;
				.recent-top {
					padding: 30upx 0;
					display: flex;
					justify-content: space-between;
					color: #b2b2b2;
				}
				.recent-main {
					padding-bottom: 42upx;
					color: #222;
					font-family: PingFangSC-Medium;
					font-weight: bold;
					text {
						&:last-child {
							padding-left: 10upx;
						}
					}
				}
			}
		}
	}
	.no-list {
		height: 100%;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		.other-container {
			image {
				width: 393upx;
				height: 289upx;
			}
			.no-address {
				text-align: center;
				font-size: 26upx;
				color: #000000;
				font-family: PingFangSC-Regular;
			}
		}
	}
}
</style>
