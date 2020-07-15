<template>
	<view class="index-container">
		<!-- 头部 -->
		<public-header title="首页">
		</public-header>
		<!-- 占位 -->
		<view class="placeholder">

		</view>
		<!-- 菜单选项列表 -->
		<Menu :listMenu="menuList" v-if="menuList!=null"></Menu>
		<!-- 轮播图 -->
		<!-- <swiper class="swiper mar-top" autoplay="true" circular="true" indicator-dots="true">
			<swiper-item v-for="(item,index) in bannerList" :key="index">
				<view class="swiper-item index-swiper-item">
					<image class="image-width" :src="item.iconPath" mode="" alt="加载中"></image>
				</view>
			</swiper-item>
		</swiper> -->
		<!-- 超值精选 -->
		<min-title title="超值精选" v-if="chosen!=null"></min-title>
		<vocalconcert :chosen="chosen" v-if="chosen!=null"></vocalconcert>
		<!-- 广告位置 -->
		<view class="guanggao" v-if="chosen!=null">
			<image class="" v-if="chosen_belowSrc!=null" :src="chosen_belowSrc" mode="widthFix" />
		</view>
		<!-- 精选推荐 -->
		<min-title title="精选推荐" v-if="newList!=null"></min-title>
		<bangdan :bangdanlist="newList" v-if="newList!=null"></bangdan>
		<!-- 广告位置 -->
		<view class="guanggao" v-if="newList!=null">
			<image class="" v-if="new_below!=null" :src="new_below" mode="widthFix" />
		</view>
		<!-- 小标题 -->
		<!-- <min-title title="近期热门"></min-title> -->
		<!-- 近期热门 -->
		<!-- <Hot></Hot> -->

		<!-- 人气演出 -->
		<latest v-if="hotList!=null" :latestList="hotList"></latest>
		<!-- 最新放送 -->
		<min-title title="最新放送" v-if="dayList!=null"></min-title>
		<vocalconcert :chosen="dayList" v-if="dayList!=null"></vocalconcert>
		<!-- 人气榜单 -->
		<min-title title="人气榜单" v-if="bikanList!=null"></min-title>
		<renqi :renqiList="bikanList" v-if="bikanList!=null"></renqi>
		<!-- 演唱会 -->
		<min-title title="演唱会" v-if="yangchanghuiList!=null"></min-title>
		<yanchanghui :chosen="yangchanghuiList" :yanchanghuititle="yanchanghuititle"
			v-if="yangchanghuiList!=null && yanchanghuititle != null" @childFn="childFn"></yanchanghui>
		<!-- 相关推荐 -->
		<min-title title="相关推荐" v-if="list!=null"></min-title>
		<!-- <recommendations></recommendations> -->
		<!-- 瀑布流 -->
		<WaterfallsFlow :wfList="list" @itemTap="itemTap" v-if="list!=null" />
		</WaterfallsFlow>
	</view>
</template>

<script>
	import Menu from "../../components/menu"
	import publicHeader from "../../components/public_header"
	import minTitle from "../../components/minTitle"
	import Hot from "../../components/hot"
	import latest from "../../components/latest"
	import vocalconcert from "../../components/vocalconcert"
	import recommendations from "../../components/recommendations"
	import bangdan from "../../components/bangdan"
	import renqi from "../../components/renqi"
	import yanchanghui from "../../components/yanchanghui"
	import WaterfallsFlow from '../../components/WaterfallsFlow/WaterfallsFlow.vue'
	import { concerttypes, indexlist, allpage, indexcategory, guanggao } from "../../Api/common"

	export default {
		components: {
			Menu,
			"public-header": publicHeader,
			"min-title": minTitle,
			Hot,
			latest,
			vocalconcert,
			recommendations,
			bangdan,
			WaterfallsFlow,
			renqi,
			yanchanghui,
		},
		data() {
			return {
				chosen_belowSrc: null, //超值精选下方广告
				new_below: null, //最新榜单下方
				noRequest: true,
				page: 1,
				recommendList: null,
				yangchanghuiList: null, //演唱会
				bikanList: null, //人气榜单
				dayList: null,//最新放送
				newList: null, //最新榜单
				hotList: null, //人气演出
				chosen: null, //超值精选
				// 瀑布流数据
				list: null,
				yanchanghuititle: null,
				menuList: null,
				bannerList: [{
					iconPath: "https://novelsys.oss-cn-shenzhen.aliyuncs.com/actprize/draw/index/%E9%A1%B6%E9%83%A8%E8%83%8C%E6%99%AF.png",
					text: "演唱会"
				}, {
					iconPath: "https://novelsys.oss-cn-shenzhen.aliyuncs.com/actprize/draw/index/%E9%A1%B6%E9%83%A8%E8%83%8C%E6%99%AF.png",
					text: "话剧歌剧"
				}, {
					iconPath: "https://novelsys.oss-cn-shenzhen.aliyuncs.com/actprize/draw/index/%E9%A1%B6%E9%83%A8%E8%83%8C%E6%99%AF.png",
					text: "音乐会"
				}, {
					iconPath: "https://novelsys.oss-cn-shenzhen.aliyuncs.com/actprize/draw/index/%E9%A1%B6%E9%83%A8%E8%83%8C%E6%99%AF.png",
					text: "全部"
				}]
			}
		},
		onLoad() {
			let that = this;
			uni.showLoading({
				title: '加载中'
			});
			// 获取广告位，超值精选下方
			guanggao({

			}, 'chosen_below').then(function (data) {
				that.chosen_belowSrc = data[1].data.data.img;
				console.log(data[1].data.data.img)
			})
			// 获取广告位，最新榜单下方
			guanggao({

			}, 'new_below').then(function (data) {
				that.new_below = data[1].data.data.img;
			})

			//获取演唱会小标签
			concerttypes().then(function (data) {
				that.yanchanghuititle = data[1].data.data[0].children
				console.log(that.yanchanghuititle)
			})
			if (this.$store.state.cityCode != null) {
				let that = this;
				console.log(that.$store.state.cityCode)
				//获取首页菜单选项
				concerttypes().then(function (data) {
					that.menuList = data[1].data.data
					console.log(that.menuList)
				})
				//演唱会
				allpage({
					city_code: this.$store.state.cityCode,
					type_id: 1
				}).then(function (data) {
					that.yangchanghuiList = data[1].data.data
				})
				//分类数据
				indexlist({
					city_code: this.$store.state.cityCode,
				}).then(function (data) {
					that.chosen = data[1].data.data.chosen;
					that.newList = data[1].data.data.new;
					that.hotList = data[1].data.data.hot;
					that.dayList = data[1].data.data.day7;
					that.bikanList = data[1].data.data.bikan;
					that.recommendList = data[1].data.data.recommend;
					that.list = that.recommendList;
					uni.hideLoading();
				})
			}

		},
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '首页',
				path: '/pages/index/index?city_code=' + this.$store.state.cityCode
			}
		},
		onShow(options) {
			if (options != undefined) {
				console.log("分享进入:" + options.city_code)
				uni.showLoading({
					title: '加载中'
				});
				let that = this;
				//获取演唱会小标签
				concerttypes().then(function (data) {
					that.yanchanghuititle = data[1].data.data[0].children
					console.log(that.yanchanghuititle)
				})
				//获取首页菜单选项
				concerttypes().then(function (data) {
					that.menuList = data[1].data.data
				})
				//演唱会
				allpage({
					city_code: options.city_code,
					type_id: 1
				}).then(function (data) {
					that.yangchanghuiList = data[1].data.data
				})
				//分类数据
				indexlist({
					city_code: this.$store.state.cityCode,
				}).then(function (data) {
					that.chosen = data[1].data.data.chosen;
					console.log(that.chosen)
					that.newList = data[1].data.data.new;
					that.hotList = data[1].data.data.hot;
					that.dayList = data[1].data.data.day7;
					that.bikanList = data[1].data.data.bikan;
					that.recommendList = data[1].data.data.recommend;
					that.list = that.recommendList;
					uni.hideLoading();
				})
			}
			// console.log(this.$store.state.cityCode)
		},
		onReachBottom() {
			let that = this;

			//分类数据
			if (that.noRequest) {
				if (that.list != null) {
					indexcategory({
						city_code: this.$store.state.cityCode,
						type: "recommend",
						page: ++that.page,
					}).then(function (data) {
						that.recommendList = data[1].data.data;
						if (data[1].data.data.length >= 1) {
							that.list = that.list.concat(data[1].data.data);
						} else {
							console.log("没又数据了")
							that.noRequest = false;
						}
						// console.log(data)
					})
				}
			}

			// console.log(123)
		},
		onPullDownRefresh() {

		},
		methods: {
			childFn(id) {
				let that = this;
				//演唱会
				allpage({
					city_code: this.$store.state.cityCode,
					type_id: 1,
					type_sub_id: id,
				}).then(function (data) {
					that.yangchanghuiList = data[1].data.data
				})
			},
			itemTap(item) {
				console.log(item);
			}
		},
		watch: {

			"$store.state.cityCode": function (newValue, older) {

				let that = this;
				console.log(that.$store.state.cityCode)
				//获取首页菜单选项
				concerttypes().then(function (data) {
					that.menuList = data[1].data.data
					console.log(that.menuList)
				})
				//获取演唱会小标签
				concerttypes().then(function (data) {
					that.yanchanghuititle = data[1].data.data[0].children
					console.log(that.yanchanghuititle)
				})
				//演唱会
				allpage({
					city_code: this.$store.state.cityCode,
					type_id: 1
				}).then(function (data) {
					that.yangchanghuiList = data[1].data.data
				})
				//分类数据
				indexlist({
					city_code: this.$store.state.cityCode,
				}).then(function (data) {
					that.chosen = data[1].data.data.chosen
					console.log(that.chosen)
					that.newList = data[1].data.data.new
					that.hotList = data[1].data.data.hot
					that.dayList = data[1].data.data.day7
					that.bikanList = data[1].data.data.bikan
					that.recommendList = data[1].data.data.recommend
					that.list = that.recommendList;
					console.log(that.hotList)
					console.log(that.list)
					uni.hideLoading();
				})

			}
		}
	}
</script>

<style lang="less">
	.index-container {
		.placeholder {
			width: 100%;
			height: 200upx;
		}

		.guanggao {
			width: 670rpx;
			height: 160rpx;
			border-radius: 10rpx;
			margin: 60rpx auto 0 auto;
			overflow: hidden;

			image {
				width: 100%;
				height: 160rpx;
			}
		}
	}

	.mar-top {

		padding-top: 56upx;
		height: 252upx;

		.index-swiper-item {
			padding: 0 40upx;

			.image-width {
				width: 670upx;
				height: 252upx;
				border-radius: 4upx;
			}
		}

	}
</style>