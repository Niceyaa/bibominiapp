<template>
    <cover-view class="child-header">
        <cover-view class="back-container" @click="back">
            <cover-image class="image"
                src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/fanhui.png">
            </cover-image>
        </cover-view>
        {{title}}
    </cover-view>
</template>

<script>
    export default {
        name: "childheader",
        data() {
            return {

            }
        },
        props: {
            title: ""
        },
        onLoad() {

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

            }
        }
    }
</script>

<style lang="less">
    .child-header {
        width: 750rpx;
        height: 140rpx;
        line-height: 140rpx;
        text-align: center;
        font-size: 30rpx;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #000000;
        position: fixed;
        z-index: 999;
        background-color: white;
		border-bottom: 1px solid rgba(246,246,246,1);
        .back-container {
            line-height: 140upx;
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
</style>