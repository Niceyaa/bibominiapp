<template>
	<view>
		<back-header title="商务合作"></back-header>
		<view class="cooperation">
		<image class="image" src="http://img2.imgtn.bdimg.com/it/u=3823340070,61531598&fm=26&gp=0.jpg" mode=""></image>
		<image class="image" src="http://img4.imgtn.bdimg.com/it/u=1235233173,3229405427&fm=26&gp=0.jpg" mode=""></image>
		<image class="image" src="http://img1.imgtn.bdimg.com/it/u=1977784479,1590275350&fm=26&gp=0.jpg" mode=""></image>
		<image class="image" src="http://img4.imgtn.bdimg.com/it/u=309333014,794643416&fm=26&gp=0.jpg" mode=""></image>
		</view>
	</view>
</template>

<script>
import backHeader from '../../../components/childheader.vue';
export default {
	data() {
		return {};
	},
	components: {
		backHeader
	},
	methods: {}
};
</script>

<style lang="less">
.cooperation {
	padding-top: 140upx;
	.image {
		width: 750upx;
		height: 500upx;
	}
}
</style>
