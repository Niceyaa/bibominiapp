<template>
	<view class="add-container">
		<cover-view class="child-header">
			<cover-view class="back-container" @click="back">
				<cover-image class="image" src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/fanhui.png"></cover-image>
			</cover-view>
			{{ title }}
		</cover-view>
		<view class="add-main">
			<view class="input-item">
				<text class="text">姓名</text>
				<input type="text" v-model="name" placeholder="请输入姓名" placeholder-style="color:#B2B2B2;font-size:28upx" />
			</view>
			<view class="input-item">
				<text class="text">联系电话</text>
				<input maxlength="11" type="number" v-model="tel" placeholder="请输入手机号" placeholder-style="color:#B2B2B2;font-size:28upx" />
			</view>
			<view class="input-item">
				<text class="text">选择区域</text>

				<view @tap="openAddres">{{ difineCityInfo }}</view>
			</view>
			<view class="input-item desc-address"><input type="text" v-model="descAddress" placeholder-style="color:#B2B2B2;font-size:28upx" placeholder="请输入详细地址" /></view>
		</view>
		<view class="save-addr">
			<view v-if="!addressId" class="save-btn" @click="saveAddress">保存</view>
			<view v-else class="save-btn" @click="editAddress">保存</view>
		</view>
		<!--
		 mask-bg-color="rgba(0, 229, 238, 0.4)" // 自定义遮罩层背景颜色
		 -->
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
	</view>
</template>

<script>
import simpleAddress from '@/components/simple-address/simple-address.vue';
import { updateAddress } from '../../../Api/myApi/updateAddress.js';
import { editAddress } from '../../../Api/myApi/editAddress.js';
import { addressList } from '../../../Api/myApi/addressList.js';
export default {
	data() {
		return {
			value: [1, 2, 3],
			visible: false,
			name: '',
			tel: '',
			descAddress: '',
			difineCityInfo: '请选择',

			editCity: [],

			cityPickerValueDefault: [0, 0, 1],
			title: '新增地址',
			// 地址id
			addressId: ''
		};
	},
	components: { simpleAddress },
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
		saveAddress() {
			if (this.tel.length === 11 && this.name.length > 1 && this.descAddress.length > 4 && this.difineCityInfo.length > 4) {
					updateAddress({
						name: this.name,
						tel: this.tel,
						// province:this.difineCityInfo.split("省")[0],
						province: this.cityInfoArr[0],
						city: this.cityInfoArr[1],
						district: this.cityInfoArr[2],
						address: this.descAddress
					}).then(res => {
						console.log('添加地址', res);
						uni.showToast({
							title: '地址添加成功'
						});
						uni.navigateTo({
							url: '/pages/my/addressManage/addressManage'
						});
					});

			} else {
				uni.showToast({
					title: '为保证添加成功，请认真填写信息！',
					icon: 'none'
				});
			}
		},

		openAddres() {
			this.cityPickerValueDefault = [0, 0, 1];
			this.$refs.simpleAddress.open();
		},
		onConfirm(e) {
			this.cityInfoArr = e.labelArr;
			this.difineCityInfo = e.labelArr[0] + e.labelArr[1] + e.labelArr[2];
		},
		editAddress(){
			console.log("我有吗",this.cityInfoArr)
			editAddress(this.addressId,{
				name: this.name,
				tel: this.tel,
				// province:this.difineCityInfo.split("省")[0],
				province: this.cityInfoArr?this.cityInfoArr[0]:this.editCity[0],
				city: this.cityInfoArr?this.cityInfoArr[1]:this.editCity[1],
				district: this.cityInfoArr?this.cityInfoArr[2]:this.editCity[2],
				address: this.descAddress
			}).then(res => {
				console.log('修改地址', res);
				uni.showToast({
					title: '地址修改成功'
				});
				uni.navigateTo({
					url: '/pages/my/addressManage/addressManage'
				});
			});
		}
	},
	onShow() {
		if (uni.getStorageSync('cName')) {
			this.name = uni.getStorageSync('cName');
			this.tel = uni.getStorageSync('cTel');
			this.descAddress = uni.getStorageSync('cAddr');
			this.difineCityInfo = uni.getStorageSync('cPro') + uni.getStorageSync('cCity') + uni.getStorageSync('cDist');
			this.title = '编辑地址';
			this.addressId = uni.getStorageSync('addressId');
			this.editCity.push(uni.getStorageSync('cPro'));
			this.editCity.push(uni.getStorageSync('cCity'));
			this.editCity.push(uni.getStorageSync('cDist'));
			
		}
	},
	destroyed() {
		uni.removeStorageSync("cName")
		uni.removeStorageSync("cTel")
		uni.removeStorageSync("cPro")
		uni.removeStorageSync("cCity")
		uni.removeStorageSync("cDist")
		uni.removeStorageSync("cAddr")
		uni.removeStorageSync("addressId")
	},
	onHide() {
		uni.removeStorageSync("cName")
		uni.removeStorageSync("cTel")
		uni.removeStorageSync("cPro")
		uni.removeStorageSync("cCity")
		uni.removeStorageSync("cDist")
		uni.removeStorageSync("cAddr")
		uni.removeStorageSync("addressId")
	}
};
</script>

<style lang="less">
page {
	height: 100%;

	.add-container {
		height: 100%;
		background: #f6f6f6;
		position: relative;

		.child-header {
		    width: 750rpx;
		    height: 140rpx;
		    line-height: 180rpx;
		    text-align: center;
		    font-size: 30rpx;
		    font-family: Microsoft YaHei;
		    font-weight: bold;
		    color: #000000;
		    position: fixed;
		    z-index: 999;
		    background-color: white;
		
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

		.add-main {
			padding: 140rpx 42upx 0 42upx;
			background: #fff;

			.input-item {
				display: flex;
				padding: 40upx 0;
				font-size: 28upx;
				color: #222222;
				border-bottom: 1px solid #f6f6f6;

				.text {
					width: 161upx;
				}

				input {
				}
			}

			.desc-address {
				width: 100%;
				box-sizing: border-box;
				border-bottom: none;
				padding-bottom: 140rpx;

				input {
					width: 100%;
				}
			}
		}

		.city-select {
			position: fixed;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 88;
			width: 750upx;
			color: #fff;
			overflow: hidden;

			.picker-one {
				width: 400px;
				height: 500upx;
				z-index: 999;

				.pick-item {
					height: 100upx;
					text-align: center;
					background: red;
					color: #007aff !important;
					z-index: 100000;
				}
			}
		}

		.save-addr {
			width: 750rpx;
			box-sizing: border-box;
			padding: 100rpx 40rpx;

			.save-btn {
				background: #fff;
				line-height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				font-size: 32rpx;
				background: #ff4657;
				color: #fff;
				border-radius: 10rpx;
			}
		}
	}
}
</style>
