<template>
    <!-- 近期热门 -->
    <view class="hot-container">
        <view class="hot" v-for="(item,index) in hotList" :key="index" @click="targetYanchuDetails">
            <image :class="index%2==0?'hot-img':'hot-img-right'"
                src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/tupian.png" />
            <view :class="index%2==0?'hot-content':'hot-content fl-left'">
                <text class="hot-title">
                    {{item.name}}
                </text>
                <button class="hot-adress-btn">
                    {{item.city_name}}
                </button>
                <view class="hot-time-container">
                    <text class="hot-time">
                        2020.04.24 — 2020.12.31
                    </text>
                </view>
                <!-- 热度 -->
                <view class="degree-of-heat">
                    <text class="" selectable="false" space="false" decode="false">
                        观演热度：
                    </text>
                    <view class="progress-box degree-of-heat-progress">
                        <progress percent="10" active activeColor="red" stroke-width="4" backgroundColor="#484848"
                            border-radius="5" />
                    </view>
                </view>
                <view class="hot-other">
                    <text class="hot-price">
                        99
                    </text>
                    <text class="hot-price no-bold">
                        元起
                    </text>
                    <text class="hot-look">
                        想看
                    </text>
                    <image class="hot-look hot-look-img"
                        src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/wodexiangkan.png" />
                    <text class="hot-add">
                        +1
                    </text>
                </view>
            </view>
        </view>
        <!-- 右边模板 -->
        <!-- <view class="hot">
            <image class="hot-img-right" src="../static/image/componentImg/tupian.png" />
            <view class="hot-content fl-left">
                <text class="hot-title">
                    法语音乐剧《摇滚红与黑》
                </text>
                <button class="hot-adress-btn">
                    成都站
                </button>
                <view class="hot-time-container">
                    <text class="hot-time">
                        2020.04.24 — 2020.12.31
                    </text>
                </view>

                <view class="degree-of-heat">
                    <text class="" selectable="false" space="false" decode="false">
                        观演热度：
                    </text>
                    <view class="progress-box degree-of-heat-progress">
                        <progress percent="80" active activeColor="red" stroke-width="4" backgroundColor="#484848"
                            border-radius="5" />
                    </view>
                </view>
                <view class="hot-other">
                    <text class="hot-price">
                        99
                    </text>
                    <text class="hot-price no-bold">
                        元起
                    </text>
                    <text class="hot-look">
                        想看
                    </text>
                    <image class="hot-look hot-look-img" src="../static/image/componentImg/wodexiangkanactive.png" />
                    <text class="hot-add">
                        +1
                    </text>
                </view>

            </view>
        </view> -->
    </view>
</template>

<script>
    export default {
        name: "Hot",
        data() {
            return {
                DegreeOfHeat: 0,
            }
        },
        props: {
            hotList: {
                type: Array,
                default: [{
                    "id": 1,
                    "name": "凤凰传奇春季赛",
                    "sub_name": "fd",
                    "poster": "https:\/\/ticket-app.oss-cn-shenzhen.aliyuncs.com\/images\/704_655777_460517.jpg",
                    "status": 1,
                    "hot_num": 500,
                    "start_at": 1588867200,
                    "end_at": 1588867200,
                    "zan_num": 0,
                    "discount": 100,
                    "lower_price": 0,
                    "venue_id": 1,
                    "city_id": 110000,
                    "city_name": "北京市"
                }, {
                    "id": 2,
                    "name": "周杰伦演唱会",
                    "sub_name": "周杰伦",
                    "poster": "https:\/\/ticket-app.oss-cn-shenzhen.aliyuncs.com\/concert\/20200516\/8dd09fd22d14sd3g13g5.jpg",
                    "status": 1,
                    "hot_num": 1005,
                    "start_at": 1589248800,
                    "end_at": 1589299200,
                    "zan_num": 0,
                    "discount": 100,
                    "lower_price": 6000,
                    "venue_id": 1,
                    "city_id": 500100,
                    "city_name": "重庆城区"
                }, {
                    "id": 1,
                    "name": "凤凰传奇春季赛",
                    "sub_name": "fd",
                    "poster": "https:\/\/ticket-app.oss-cn-shenzhen.aliyuncs.com\/images\/704_655777_460517.jpg",
                    "status": 1,
                    "hot_num": 500,
                    "start_at": 1588867200,
                    "end_at": 1588867200,
                    "zan_num": 0,
                    "discount": 100,
                    "lower_price": 0,
                    "venue_id": 1,
                    "city_id": 110000,
                    "city_name": "北京市"
                }]
            }
        },
        onLoad() {

        },
        methods: {
            targetYanchuDetails() {
                uni.navigateTo({
                    url: '/pages/index/yanchudetails/yanchudetails'
                });
            }
        }
    }
</script>

<style lang="less">
    button::after {
        width: auto !important;
        height: auto !important;
    }

    .hot-container {
        .hot:nth-of-type(1) {
            margin: 0 auto !important;
        }

        .hot {
            width: 670upx;
            height: 336upx;
            background: rgba(25, 25, 25, 1);
            border-radius: 10upx;
            margin: 70upx auto 0upx auto;
            position: relative;



            .hot-img {
                width: 224upx;
                height: 336upx;
                position: absolute;
                left: 0upx;
                top: -30upx;
            }

            .hot-img-right {
                width: 224upx;
                height: 336upx;
                position: absolute;
                right: 0upx;
                top: -30upx;
            }

            .fl-left {
                float: left !important;
                border-radius: 10rpx 0rpx 0rpx 10rpx !important;

            }

            .hot-content {
                width: 446upx;
                height: 100%;
                float: right;
                border-radius: 0upx 10upx 10upx 0upx;
                padding: 0 25upx;
                box-sizing: border-box;
                -webkit-box-sizing: border-box;
                background: rgba(25, 25, 25, 1);


                .hot-title {
                    line-height: 111upx;
                    display: inline-block;
                    width: 100%;
                    font-size: 32upx;
                    font-family: PingFangSC;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 1);
                    line-height: 88upx;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;

                }

                .hot-time-container {
                    padding-top: 8upx;

                    .hot-time {
                        font-size: 24upx;
                        font-family: PingFangSC;
                        font-weight: 400;
                        color: rgba(153, 153, 153, 1);
                        line-height: 36upx;
                    }
                }


                .hot-adress-btn {
                    display: inline-block;
                    height: 46upx;
                    background: rgba(237, 24, 41, 1);
                    border-radius: 10upx;
                    font-size: 24upx;
                    font-family: PingFangSC;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 1);
                    line-height: 46upx;
                    border: none;
                    outline: none;
                    vertical-align: middle;
                    padding: 0 20upx;
                }



                .degree-of-heat {
                    width: 100%;
                    height: 81upx;
                    line-height: 81upx;
                    overflow: hidden;

                    .degree-of-heat-progress {
                        margin-top: 38upx;
                    }

                    text {
                        float: left;
                        font-size: 28upx;
                        font-family: PingFangSC;
                        font-weight: 400;
                        color: rgba(153, 153, 153, 1);
                        line-height: 81upx;
                    }
                }

                .hot-other {

                    line-height: 44upx;
                    position: relative;

                    .hot-add {
                        color: rgba(219, 13, 13, 1);
                        position: absolute;
                        top: -25upx;
                        right: 55upx;
                        font-size: 20upx;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                    }

                    .hot-look {
                        float: right;
                        font-size: 28upx;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                        margin-right: 10upx;
                        line-height: 60upx;
                    }

                    .hot-look-img {
                        width: 37upx;
                        height: 33upx;
                        margin-top: 10upx;
                    }

                    .hot-price {
                        font-size: 52upx;
                        font-family: PingFangSC;
                        font-weight: 600;
                        color: rgba(219, 13, 13, 1);
                    }



                    .no-bold {
                        font-weight: normal;
                        font-size: 35upx;
                    }
                }
            }
        }
    }
</style>