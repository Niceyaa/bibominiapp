<template>
	<view class="address-manage-container" v-if="loginStatus">
		<back-header title="地址管理"></back-header>
		<view class="address-main" v-if="haveAddressList">
			<view class="address-item" v-for="item in addressList" :key="item.id">
				<view class="address-top">
					<view class="name">{{ item.name }}</view>
					<view class="tel">{{ item.tel }}</view>
				</view>
				<view class="address-desc">{{ item.city + item.district + item.town + item.address }}</view>
				<view class="address-bottom">
					<view class="set-default">
						<image v-if="item.is_default === 1"
							src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/address/xuanzhong.png">
						</image>
						<image v-else
							src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/address/weixuanzhong.png">
						</image>
					</view>
					<text class="tip" @click="setDefault(item)">设为默认</text>
					<text class="edit" @click="editAddress(item)">编辑</text>
					<text class="delete" @click="delAddress(item.id)">删除</text>
				</view>
			</view>
		</view>
		<view class="no-list" v-else>
			<view class="other-container">
				<image src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/temp/noaddress.png" mode=""></image>
				<view class="no-address">
					目前还没有添加收货地址
				</view>
			</view>
		</view>
		<view class="add-address">
			<button @click="addAddressInfo">添加新地址</button>
		</view>
	</view>
	<no-login v-else></no-login>
	
</template>

<script>
	import noLogin from '../login/noLogin.vue'
	import { addressList } from "../../../Api/myApi/addressList.js";
	import { deleteAddress } from "../../../Api/myApi/deleteAddress.js";
	import { editAddress } from "../../../Api/myApi/editAddress.js";
	import backHeader from '../../../components/childheader.vue';
	export default {
		data() {
			return {
				addressList: [],
				loginStatus: false,
				haveAddressList: true
			};
		},
		components: {
			backHeader,
			noLogin
		},
		methods: {
			addAddressInfo() {
				uni.navigateTo({
					url: "/pages/my/addressManage/addAddress"
				})
			},
			getAddressList() {
				addressList().then(res => {
					this.addressList = res[1].data.data;
					if(this.addressList&&this.addressList.length>0){
						this.haveAddressList = true;
					}else{
						this.haveAddressList = false;
					}
					console.log(res[1].data.data)
				})
			},
			editAddress(info) {
				console.log("弹出编辑页面");
				uni.setStorageSync("cName",info.name);
				uni.setStorageSync("cTel",info.tel);
				uni.setStorageSync("cPro",info.province);
				uni.setStorageSync("cCity",info.city);
				uni.setStorageSync("cDist",info.district);
				uni.setStorageSync("cAddr",info.address);
				uni.setStorageSync("addressId",info.id);
				uni.navigateTo({
					url:'/pages/my/addressManage/addAddress'
				})
			},
			setDefault(item) {
				let that = this;
				uni.showModal({
					title: "默认收货地址",
					content: "您确定将改地址设置为默认收货地址吗？",
					success(opt) {
						console.log("item", item)
						if (opt.confirm) {
							editAddress(item.id,{
								is_default: 1,
							}).then(res => {
								console.log("默认地址", res)
								uni.showToast({
									title: res[1].data.err_msg,
									icon: "none"
								})
								that.getAddressList();
							})
						}

					}
				})
			},
			delAddress(id) {
				let that = this;
				uni.showModal({
					title: "删除当前收货地址",
					content: "您确认删除当前收货地址吗？",
					success(opt) {
						if(opt.confirm){
							console.log("确认点击！",id);
							deleteAddress({ prm: parseInt(id) }).then(res => {
								console.log("删除地址", res)
								uni.showToast({
									title: res[1].data.err_msg,
									icon: "none"
								})
								that.getAddressList();
							})
						}
					}
				})
				
			}

		},
		mounted() {
			this.getAddressList();
		},
		onLoad() {
			if(uni.getStorageSync("loginStatus")){
				this.loginStatus = true;
			}
			console.log("loginStatus:",this.loginStatus)
		}
	};
</script>

<style lang="less">
	page {
		height: 100%;

		.address-manage-container {
			width: 100%;
			height: 100%;
			background: #f6f6f6;
			position: relative;

			.address-main {
				padding-top: 140rpx;

				.address-item {
					background: #fff;
					margin-top: 20upx;
					padding: 30upx 40upx 0 40upx;
					font-size: 24upx;
					color: #222222;

					.address-top {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.name {
							font-size: 28upx;
						}
					}

					.address-desc {
						padding: 30upx 0;
						border-bottom: 1px solid #f6f6f6;
					}

					.address-bottom {
						height: 96upx;
						display: flex;
						align-items: center;

						text {
							display: block;
						}

						image {
							width: 36upx;
							height: 36upx;
							margin-right: 16upx;
							vertical-align: middle;
						}

						.edit {
							margin-left: 388upx;
						}

						.delete {
							margin-left: 39upx;
							color: #ff4658;
						}
					}
				}
			}

			.add-address {
				position: fixed;
				left: 0;
				bottom: 0;
				width: 100%;
				padding: 10upx 20upx;
				background: #fff;
				box-sizing: border-box;

				button {
					border: none;
					height: 78upx;
					background: #FF4657;
					color: #fff;
					border-radius: 6upx;
					line-height: 78upx;
				}
			}
			.no-list {
				height: 100%;
				background: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				.other-container {
					image{
						width: 393upx;
						height: 320upx;
					}
					.no-address{
						text-align: center;
						font-size: 26upx;
						color: #000000;
						font-family: PingFangSC-Regular;
					}
					
				}
			}
		}

		
	}
</style>