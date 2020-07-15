<template>
    <!-- 明星主页 -->
    <view class="homepage-container">
        <view class="head" v-if="yirenDetails!=null">
            <view class="head-bg" :style="'background-image: url('+yirenDetails.poster+');'">

            </view>
            <view class="head-content">
                <view class="head-back" @click="back">
                    <view class="head-back-bg">
                        <image class=""
                            src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/back.png" />
                    </view>
                </view>
                <!-- 小导航 -->
                <view class="head-nav">
                    <text class="start-name" selectable="false" space="false" decode="false">
                        {{yirenDetails.name}}
                    </text>
                    <view class="guanzhu-btn">
                        <guanzhuBtn :text="guanzhuStatus" @changeStatus="changeStatus" :optionsId="optionsId"
                            bgColor="rgba(255,70,87,1)">
                        </guanzhuBtn>
                    </view>
                </view>
            </view>

            <!-- 明星简介 -->
            <view class="mingxing-desc">
                <minTitle title="艺人简介" :all="allOnoff"></minTitle>
                <view class="mingxing-desc-content">
                    {{yirenDetails.desc}}
                </view>
                <minTitle title="近期演出" :all="allOnoff"></minTitle>
                <recommendations :recommends="yirenDetails.concerts"></recommendations>
            </view>

        </view>


    </view>

</template>

<script>
    import guanzhuBtn from "../../../components/guanzhuBtn"
    import minTitle from "../../../components/minTitle"
    import recommendations from "../../../components/recommendations"
    import { actorinfo } from "@/Api/common"
    export default {
        name: "",
        data() {
            return {
                guanzhuStatus: null,
                yirenDetails: null,
                allOnoff: false,
                haibaoBg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591252624789&di=4a56b9120c9a508f38dc424da8b31430&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg",
                optionsId: null,

            }
        },
        components: {
            guanzhuBtn,
            minTitle,
            recommendations
        },
        onLoad(options) {
            let that = this;
            this.optionsId = options.id;
            actorinfo({}, options.id).then(function (data) {
                that.yirenDetails = data[1].data.data;
                that.guanzhuStatus = that.yirenDetails.subscribe
                console.log(data)
            })
        },
        onShareAppMessage(res) {
            if (res.from === 'button') {// 来自页面内分享按钮
                console.log(res.target)
            }
            return {
                title: '个人主页',
                path: '/pages/index/homepage/homepage?id=' + this.optionsId
            }
        },
        methods: {
            changeStatus(status) {
                this.guanzhuStatus = status;
            },
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
    .homepage-container {


        .head {
            width: 750upx;
            height: 496upx;
            position: relative;

            .mingxing-desc {
                position: absolute;
                width: 750upx;
                border-radius: 40upx;
                background-color: white;
                top: 451upx;

                .mingxing-desc-content {
                    width: 660upx;
                    padding-bottom: 42upx;
                    margin: 0 auto;
                    font-size: 24upx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: rgba(34, 34, 34, 1);
                    line-height: 44upx;
                    border-bottom: 1upx solid #F6F6F6;
                }
            }

            .head-bg {
                width: 750upx;
                height: 496upx;
                position: absolute;
                top: 0upx;
                background-size: 750upx 496upx;


            }

            .head-content {
                width: 750upx;
                height: 496upx;
                position: absolute;
                top: 0upx;


                .head-back {
                    padding: 69upx 40upx 0 49upx;
                    box-sizing: border-box;
                    -webkit-box-sizing: border-box;
                    width: 100%;

                    .head-back-bg {
                        width: 65upx;
                        height: 65upx;

                        image {
                            width: 18upx;
                            height: 30upx;
                        }
                    }


                }

            }

            .head-nav {
                width: 100%;
                height: 120upx;
                position: absolute;
                z-index: 999;
                bottom: 50upx;
                padding: 30upx 39upx;
                box-sizing: border-box;
                -webkit-box-sizing: border-box;

                .guanzhu-btn {
                    display: inline-block;
                    float: right;

                }

                .start-name {
                    font-size: 36upx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 1);
                }

            }
        }

    }
</style>