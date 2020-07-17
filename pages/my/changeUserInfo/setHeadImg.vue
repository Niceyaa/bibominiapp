<template>
	<view class="head-img">
		<cover-view class="child-header">
			<cover-view class="back-container" @click="back">
				<cover-image class="image"
					src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/afd2adf0772849d3ae1963ef4a53f99.png">
				</cover-image>
			</cover-view>
			我的头像
		</cover-view>
		<view class="headimg-main">
			<image :src="preSrc" mode=""></image>
			<view class="change-wrapper">
				<view @click="chooseImg" class="change-btn">更换</view>
			</view>
		</view>
		<err-modal :tipDesc="errMsg" :showOrNot.sync="showOrNot"></err-modal>
	</view>
</template>

<script>
	import errModal from '../../../components/errModal.vue'
	import { fileUpload } from "../../../Api/myApi/fileUpload.js"
	import { updateUserInfo } from "../../../Api/myApi/updateUserInfo.js"
	export default {
		data() {
			return {
				errMsg:'',
				showOrNot:false,
				preSrc: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591079014819&di=11933c0b48403bb5b92138b25b4c6711&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg"
			}
		},
		components:{errModal},
		methods: {
			back() {
				var pages = getCurrentPages();
				console.log('返回上一页', pages);
				if (pages.length <= 1) {
					console.log('可能是分享页面');
				} else {
					wx.navigateBack({
						delta: 1
					});
				}
			},
			chooseImg() {
				uni.chooseImage({
					count: 1,
					sourceType: ['camera','album'],
					sizeType:'original',
					success(res) {
						let resPath = res.tempFilePaths[0];
						uni.uploadFile({
							url:"https://ticket.zmr029.com/api/operate/comm_upload/file",
							filePath:resPath,
							name:"file",
							header:{
								TOKEN:uni.getStorageSync("loginToken")
							},
							formData:{
								type:"file"
							},
							success(eee){
								let jsonData = JSON.parse(eee.data);
								let fileImg = jsonData.data.file;
								updateUserInfo({
									img:fileImg
								}).then(upres=>{
									if (upres[1].data.err_msg === "用户信息更新成功！") {
										uni.setStorageSync("headImg", upres[1].data.data.img);
										uni.showToast({
											title: "更换成功",
											duration:1000
										});
										setTimeout(()=>{
											uni.switchTab({
												url: "/pages/my/newMy"
											})
										},1000)
										
									}else{
										this.errMsg = upres[1].data.err_msg;
										this.showOrNot = true;
									}
								})
							},
						})
					}
				})
			}
		},
		onShow() {
			this.preSrc = uni.getStorageSync("headImg");
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
		background: #000;

		.head-img {
			position: relative;

			.child-header {
			    width: 750rpx;
			    height: 140rpx;
			    line-height: 180rpx;
			    text-align: center;
			    font-size: 30rpx;
			    font-family: Microsoft YaHei;
			    font-weight: bold;
			    color: #fff;
			    position: fixed;
			    z-index: 999;
			    background-color: #000;
			
			    .back-container {
			        line-height: 180upx;
			        padding-left: 38upx;
			        padding-right: 38upx;
			        left: 0;
			        position: absolute;
			
			        .image {
			            display: inline-block;
			            width: 18upx;
			            height: 30upx;
			            vertical-align: middle;
			
			        }
			    }
			
			}

			.headimg-main {
				padding-top: 220upx;

				image {
					width: 750upx;
					height: 800upx;
				}

				.change-wrapper {
					width: 750rpx;
					box-sizing: border-box;
					padding: 100rpx 40rpx;

					.change-btn {
						background: #fff;
						line-height: 80rpx;
						line-height: 80rpx;
						text-align: center;
						font-size: 32rpx;
						color: black;
						border-radius: 10rpx;
					}
				}

			}
		}
	}
</style>