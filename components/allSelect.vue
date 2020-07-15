<template>
    <!-- 近期热门 -->
    <view class="hot-container">
        <view class="allSelect-hot" v-for="(item,index) in hotList" :key="index" v-if="hotList.length>=1"
            @click="targetDetails(item.id)">
            <image class="hot-img" :src="item.poster" />
            <view class="hot-content">
                <text class="hot-title">
                    {{item.name}}
                </text>
                <!-- 时间 -->
                <view class="hot-time-container">
                    <text class="hot-time">
                        {{item.start_at | formatTimes}} — {{item.end_at | formatTimes}}
                    </text>
                </view>
                <!-- 位置 -->
                <view class="hot-address-container">
                    <text class="hot-address">
                        {{item.city_name}} | {{item.venue.name}}
                    </text>
                </view>
                <!-- 热度 -->
                <view class="degree-of-heat">
                    <text class="" selectable="false" space="false" decode="false">
                        观演热度：
                    </text>
                    <view class="progress-box degree-of-heat-progress">
                        <progress :percent="item.hot_num/100" active activeColor="red" stroke-width="4"
                            backgroundColor="#484848" border-radius="5" />
                    </view>
                </view>


                <view class="hot-other">
                    <text class="hot-price">
                        {{(item.lower_price/100)*(item.discount/100) | baoliu(2)}}
                    </text>
                    <text class="hot-price no-bold">
                        元起
                    </text>
                    <!-- <text class="hot-look">
                        想看
                    </text>
                    <image class="hot-look hot-look-img"
                        src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/wodexiangkan.png" />
                    <text class="hot-add">
                        +1
                    </text> -->
                </view>
                <!-- 按钮打折情况 -->
                <view class="dazhe-btn">
                    <text class="" selectable="false" space="false" decode="true">
                        {{(item.discount/10) | baoliu(1)}}
                        \n
                    </text>
                    <text class="ze" selectable="false" space="false" decode="true">
                        折起
                    </text>
                </view>

            </view>
        </view>
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
                default: [],
            }
        },
        onLoad() {

        },
        methods: {
            targetDetails(id) {
                console.log(id);
                uni.navigateTo({
                    url: '/pages/index/yanchudetails/yanchudetails?id=' + id,
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

        .allSelect-hot {
            width: 670rpx;
            height: 260rpx;
            background: white;
            border-radius: 10rpx;
            margin: 50rpx auto 0rpx auto;
            position: relative;



            .hot-img {
                width: 184rpx;
                height: 100%;
                position: absolute;
                left: 0rpx;
            }

            .hot-img-right {
                width: 224rpx;
                height: 336rpx;
                position: absolute;
                right: 0rpx;
                top: -30rpx;
            }

            .fl-left {
                float: left !important;
                border-radius: 10rpx 0rpx 0rpx 10rpx !important;

            }

            .hot-content {
                width: 446rpx;
                height: 100%;
                float: right;
                border-radius: 0rpx 10rpx 10rpx 0rpx;
                padding: 0 25rpx;
                box-sizing: border-box;
                -webkit-box-sizing: border-box;
                background: white;
                position: relative;

                .dazhe-btn {
                    border-radius: 50%;
                    position: absolute;
                    top: 78rpx;
                    right: 0rpx;
                    text-align: center;
                    line-height: 68rpx;

                    width: 68rpx;
                    height: 68rpx;
                    background: linear-gradient(0deg, rgba(231, 24, 43, 1) 0%, rgba(255, 116, 129, 1) 100%);
                    border-radius: 50%;
                    box-shadow: 0rpx 0rpx 8rpx 5rpx rgba(188, 36, 36, .4);

                    .ze {
                        position: absolute;
                        top: 45rpx;
                        font-size: 18rpx;
                        color: #FEFEFE;
                        font-weight: normal;
                        left: 18rpx;
                    }

                    text {
                        display: inline-block;
                        font-size: 26rpx;
                        font-family: Microsoft YaHei;
                        font-weight: bold;
                        color: #FEFEFE;
                        line-height: 15rpx;
                    }
                }

                .hot-title {
                    width: 100%;
                    font-size: 26rpx;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: rgba(34, 34, 34, 1);
                    line-height: 41rpx;

                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                }

                .hot-address-container {
                    .hot-address {
                        font-size: 24rpx;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(153, 153, 153, 1);
                        line-height: 36rpx;
                    }
                }

                .hot-time-container {
                    padding-top: 0rpx;

                    .hot-time {
                        font-size: 24rpx;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(153, 153, 153, 1);
                        line-height: 36rpx;
                    }
                }

                /* 按钮样式 */
                /* 
                .hot-adress-btn {
                    display: inline-block;
                    height: 46rpx;
                    background: rgba(237, 24, 41, 1);
                    border-radius: 10rpx;
                    font-size: 24rpx;
                    font-family: PingFangSC;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 1);
                    line-height: 46rpx;
                    border: none;
                    outline: none;
                    vertical-align: middle;
                    padding: 0 20rpx;
                } */



                .degree-of-heat {
                    width: 100%;
                    overflow: hidden;
                    margin-top: 5rpx;

                    .degree-of-heat-progress {
                        margin-top: 20rpx;

                        progress {
                            width: 210rpx;
                        }
                    }

                    text {
                        float: left;
                        font-size: 28rpx;
                        font-family: PingFangSC;
                        font-weight: 400;
                        color: rgba(34, 34, 34, 1);
                    }
                }

                .hot-other {

                    line-height: 44rpx;
                    position: absolute;
                    bottom: 0rpx;

                    .hot-add {
                        color: rgba(219, 13, 13, 1);
                        position: absolute;
                        top: -25rpx;
                        right: 55rpx;
                        font-size: 20rpx;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                    }

                    .hot-look {
                        float: right;
                        font-size: 28rpx;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                        margin-right: 10rpx;
                        line-height: 60rpx;
                    }

                    .hot-look-img {
                        width: 37rpx;
                        height: 33rpx;
                        margin-top: 10rpx;
                    }

                    .hot-price {
                        font-family: PingFangSC;
                        font-weight: 600;
                        color: #ff4657;
                        font-size: 32rpx;
                    }



                    .no-bold {
                        font-size: 20rpx;
                        color: #B2B2B2;
                        font-family: PingFang SC;
                        font-weight: normal !important;
                        margin-left: 5rpx;


                    }
                }
            }
        }
    }
</style>