<template>
    <cover-view class="child-header">
        <cover-view :style="{'top':imgTop}" class="back-container">
            <cover-image @click="lcgBack" v-if="backUrl" class="image"
                src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/fanhui.png">
            </cover-image>
			<cover-image @click="back" v-else class="image"
			    src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/fanhui.png">
			</cover-image>
        </cover-view>
		<cover-view style="display: flex; justify-content: center;">
			<cover-view class="ttt" :style="{'height':height,'top':top,'lineHeight':height}">{{title}}</cover-view>
		</cover-view>
		
    </cover-view>
</template>

<script>
    export default {
        name: "childheader",
        data() {
            return {
				top: "",
				lineHeight: "",
				height: "",
				imgTop: ""
            }
        },
        props: {
            title: {type:String},
			backUrl: {type:String}
        },
        mounted() {
			let menuInfo = uni.getMenuButtonBoundingClientRect();
			this.top = menuInfo.top+"px";
			this.height = (menuInfo.height+2)+"px";
			this.lineHeight = menuInfo.height+"px";
			this.imgTop = menuInfo.top+5+"px";
			let a = uni.upx2px(menuInfo.top)
			console.log("菜单栏信息",a,menuInfo)
        },
        methods: {
            back() {
                var pages = getCurrentPages();
                console.log("返回上一页", pages)
                if (pages.length <= 1) {
                    console.log("可能是分享页面")
                } else {
                    wx.navigateBack({
                        delta: 1
                    })
                }

            },
			lcgBack(){
				let {backUrl} = this.$props;
				if(backUrl.search("newMy")>1){
					uni.switchTab({
						url:backUrl
					})
				}else{
					uni.navigateTo({
						url:backUrl
					})
				}
				
			}
        }
    }
</script>

<style lang="less">
    .child-header {
        width: 750rpx;
        height: 160rpx;
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
            height: 160upx;
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
		.ttt{
			position: absolute;
		}

    }
	// .child-header {
	//     width: 750rpx;
	//     height: 140rpx;
	//     line-height: 180rpx;
	//     text-align: center;
	//     font-size: 30rpx;
	//     font-family: Microsoft YaHei;
	//     font-weight: bold;
	//     color: #000000;
	//     position: fixed;
	//     z-index: 999;
	//     background-color: white;
	
	//     .back-container {
	//         line-height: 180upx;
	//         padding-left: 38upx;
	//         padding-right: 38upx;
	//         left: 0;
	//         position: absolute;
	
	//         .image {
	//             display: inline-block;
	//             width: 18upx;
	//             height: 30upx;
	//             vertical-align: middle;
	
	//         }
	//     }
	
	// }
</style>