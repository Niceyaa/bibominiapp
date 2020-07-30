<template>
	<view class="about-us">
		<back-header title="关于我们"></back-header>
		<view class="about-us-main">
			<!-- <image src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/logo.png"></image>
			<view class="logo-name">哔啵</view> -->
			<!-- <view class="about-content" v-html="infoHtml">
				
			</view> -->
			<view class="title">{{aboutUsTitle}}</view>
			<view class="content-item" v-for="item in contentArr">{{item}}</view>
			<!-- <view class="current-version">当前版本：{{version}}</view> -->
		</view>
	</view>
</template>

<script>
	import backHeader from '../../../components/childheader.vue';
	import { aboutUs } from '../../../Api/myApi/aboutUs.js';
	export default {
		data() {
			return {
				version: "1.1.2",
				infoHtml: "",
				contentArr: [],
				aboutUsTitle: "",
			}
		},
		components: {
			backHeader
		},
		onShow() {
			aboutUs({
				prm: "about_us"
			}).then(res=>{
				console.log(res)
				this.infoHtml = res[1].data;
				/* this.infoHtml = this.infoHtml.replaceAll("<div","<view");
				this.infoHtml = this.infoHtml.replaceAll("</div","</view");
				this.infoHtml = this.infoHtml.replaceAll("</p","</view");
				this.infoHtml = this.infoHtml.replaceAll("<p","<view");
				let start = this.infoHtml.indexOf("<div")
				let end = this.infoHtml.indexOf("</div>")
				 */
				let aboutUsStr = this.infoHtml.split("strong")[1];
				let len = aboutUsStr.length;
				this.aboutUsTitle = aboutUsStr.substring(1,len-2)
				this.aboutUsTitle = this.aboutUsTitle.replace("&mdash;&mdash;","--");// title标题
				
				let contentStr = this.infoHtml.split("</p>");
				let firstContent = contentStr[2].substr(7).replace("&ldquo;","“");
				firstContent = firstContent.replace("&rdquo;","”");
				let secondContent = contentStr[4].substr(7).replace("&ldquo;","“");
				secondContent = secondContent.replace("&rdquo;","”");
				
				this.contentArr.push(firstContent);
				this.contentArr.push(secondContent);
			})
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;

		.about-us {
			height: 100%;
			background: #F6F6F6;
			position: relative;

			.about-us-main {
				padding: 160upx 40upx 0 40upx;
				font-size: 28upx;

				// image {
				// 	width: 134upx;
				// 	height: 134upx;
				// 	border-radius: 30upx;
				// 	margin: 80upx 308upx 0 308upx;
				// }

				// .logo-name {
				// 	text-align: center;
				// 	color: #222222;
				// 	font-size: 40upx;
				// 	padding: 20upx 0;
				// }

				// .about-content {
				// 	padding: 74upx 40upx 0 40upx;
				// 	color: #666666;
				// 	font-size: 24upx;
				// 	line-height: 34upx;
				// 	letter-spacing: 40;

				// }

				// .current-version {
				// 	color: #B2B2B2;
				// 	font-size: 24upx;
				// 	position: absolute;
				// 	bottom: 100upx;
				// 	left: 0;
				// 	padding-left: 290upx;
				// }
				.title{
					font-weight: bold;
					padding: 30upx 0;
				}
				.content-item{
					padding-bottom: 30upx;
				}
			}
		}
	}
</style>