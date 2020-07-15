<template>
    <!-- 人气现场 -->
    <view class="renqi-container">
        <swiper class="swiper" next-margin="160rpx">
            <swiper-item v-for="(item,index) in renqiList" :key="index" @click="targetDetails(item.id)">
                <view class="swiper-item">
                    <image class="poster" :src="item.poster" />
                    <view class="content">
                        <view class="title">
                            {{item.name}}
                        </view>
                        <view class="time">
                            {{item.start_at | formatTimes}}—{{item.end_at | formatTimes}}
                        </view>
                        <view class="time">
                            {{item.venue.addr}}
                        </view>
                        <!-- 价格 -->
                        <view class="price">
                            <text class="number" selectable="false" space="false" decode="false">
                                {{(item.lower_price/100)*(item.discount/100) | baoliu(2)}}
                            </text>
                            <text class="fu" selectable="false" space="false" decode="false">
                                元
                            </text>
                            <text class="fu mr" selectable="false" space="false" decode="false">
                                起
                            </text>
                        </view>


                    </view>
                </view>
            </swiper-item>
        </swiper>
    </view>

</template>

<script>
    export default {
        name: "",
        data() {
            return {

            }
        },
        onLoad() {

        },
        props: {
            renqiList: {
                tye: Array,
            }
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
    .renqi-container {
        width: 100%;
        height: 400rpx;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        padding-left: 40rpx;
        background-image: url('https://miniapp8.oss-cn-shenzhen.aliyuncs.com/ACTPRIZE/ACTPRIZE/actprize/drawnew/index/indexImg/bgg.png');

        .swiper {
            height: 285rpx;
            padding-bottom: 10rpx;

            .swiper-item {
                overflow: hidden;
                margin-left: 19rpx;
                /* border: 2rpx solid #f1f1f1; */
                border-radius: 0rpx 5rpx 5rpx 0rpx;

            }

            .poster {
                width: 200rpx;
                height: 280rpx;
                float: left;
            }

            .content {
                padding: 11rpx 24rpx 25rpx 29rpx;
                box-sizing: border-box;
                -webkit-box-sizing: border-box;
                height: 280rpx;
                float: left;
                background: white;
                position: relative;
                width: 329rpx;

                .title {
                    font-size: 26rpx;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: rgba(34, 34, 34, 1);
                    line-height: 36rpx;
                    width: 100%;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }

                .time {
                    margin-top: 14rpx;
                    font-size: 22rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: rgba(153, 153, 153, 1);
                    line-height: 36rpx;
                }

                .price {
                    position: absolute;
                    bottom: 16rpx;

                    .number {
                        font-size: 32rpx;
                        font-family: PingFang SC;
                        font-weight: 600;
                        color: rgba(255, 70, 87, 1);
                    }

                    .fu {
                        font-size: 20rpx;
                        color: #B2B2B2;
                        font-family: PingFang SC;
                        margin-left: 5rpx;

                    }

                    .mr {
                        margin-left: 2rpx;
                    }
                }
            }
        }
    }
</style>