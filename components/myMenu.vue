<template>
	<!-- 个人中心菜单选项 -->
	<view class="menu-container">
		<view @click="getDesc(item.goToUrl)" class="menu-column" v-for="(item, index) in listMenu" :key="index">
			<button class="contact" open-type="contact" v-if="item.text === '联系客服'">
				<image class="my-image" style="width: 46upx;height: 45upx;margin-bottom: 18upx;" :src="item.iconPath"></image>
				<view class="my-text">{{ item.text }}</view>
			</button>
			<view v-if="item.text === '想看的演出'">
				<image class="menu-column-image" style="width: 46upx;height: 44upx;" :src="item.iconPath"></image>
				<button class="menu-column-text">{{ item.text }}</button>
			</view>
			<view v-if="item.text === '关注的艺人'">
				<image class="menu-column-image" style="width: 45upx;height: 42upx;margin-bottom: 19upx;" :src="item.iconPath"></image>
				<button class="menu-column-text">{{ item.text }}</button>
			</view>
			<view v-if="item.text === '我的优惠券'">
				<image class="menu-column-image" style="width: 45upx;height: 37upx;margin-bottom: 24upx;" :src="item.iconPath"></image>
				<button class="menu-column-text">{{ item.text }}</button>
			</view>
			<view v-if="item.text === '地址管理'">
				<image class="menu-column-image" style="width: 32upx;height: 42upx;margin-bottom: 19upx;" :src="item.iconPath"></image>
				<button class="menu-column-text">{{ item.text }}</button>
			</view>
			<view v-if="item.text === '常见问题'">
				<image class="menu-column-image" style="width: 45upx;height: 45upx;margin-bottom: 17upx;" :src="item.iconPath"></image>
				<button class="menu-column-text">{{ item.text }}</button>
			</view>
			<view v-if="item.text === '商务合作'">
				<image class="menu-column-image" style="width: 49upx;height: 41upx;margin-bottom: 20upx;" :src="item.iconPath"></image>
				<button class="menu-column-text">{{ item.text }}</button>
			</view>
			<view v-if="item.text === '设置'">
				<image class="menu-column-image" style="width: 48upx;height: 42upx;margin-bottom: 19upx;" :src="item.iconPath"></image>
				<button class="menu-column-text">{{ item.text }}</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'myMenu',
	data() {
		return {};
	},
	props: {
		listMenu: {
			type: Array
		}
	},
	onLoad() {},
	methods: {
		getDesc(url) {
			if (url === '/pages/my/relateService/relateService') {
				return;
			}
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>

<style lang="less">
.menu-container {
	display: flex;
	justify-content: left;
	flex-wrap: wrap;
	border-radius: 30upx;
	padding-bottom: 32upx;
	.menu-column {
		width: 25%;
		text-align: center;
		margin: 44upx 0 10upx 0;
		.contact{
			border: none;
			background: #fff;
			line-height: 0;
			font-size: 22upx;
			font-family: Microsoft YaHei;
			color: #222222;
			height: 110upx;
			.my-text{
				margin-top: 30upx;
			}
			&::after{
				border: none;
			}
		}
		.menu-column-image {
			margin-bottom: 17upx;
		}
		.menu-column-text {
			font-size: 22upx;
			font-family: Microsoft YaHei;
			color: #222222;
			line-height: 46upx;
			vertical-align: top;
			background: #fff;
			border: none !important;
			text-align: center;
			&::after {
				border: none;
			}
		}
	}
}
</style>
