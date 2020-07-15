<template>
    <!-- 榜单 -->
    <view class="bangdan-container">
        <view class="bangdan-contet" v-for="(item,index) in bangdanlist" :key="index" @click="targetDetails(item.id)">
            <view class="poster">
                <image class="" :src="item.poster" />
            </view>
            <view class="content">
                <text class="title" selectable="false" space="false" decode="false">
                    {{item.name}}
                </text>
                <view class="time">
                    {{item.start_at | formatTimes}}
                </view>
                <view class="address">
                    {{item.city_name}} | {{item.venue.addr}}
                </view>
                <view class="progress-box">
                    <text class="desc" selectable="false" space="false" decode="false">
                        观演热度:
                    </text>
                    <progress border-radius="5" :percent="item.hot_num/100" activeColor="#FF4657" active
                        stroke-width="3" />
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
            bangdanlist: {
                type: Array
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
    .bangdan-container {
        width: 100%;

        .bangdan-contet {
            width: 658rpx;
            margin: 0 auto;
            /* background: red; */
            height: 260rpx;
            padding-bottom: 40rpx;

            .poster {
                float: left;
                width: 186rpx;
                height: 260rpx;
                /* background-color: green; */
                border-radius: 5rpx;

                image {
                    width: 186rpx;
                    height: 260rpx;
                    border-radius: 5rpx;
                }
            }

            .content {
                float: left;
                width: 472rpx;
                height: 260rpx;
                /* background-color: royalblue; */
                padding-left: 31rpx;
                box-sizing: border-box;
                -webkit-box-sizing: border-box;
                position: relative;

                .time {
                    font-size: 22rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: rgba(102, 102, 102, 0.66);
                    line-height: 36rpx;
                    padding-top: 5rpx;
                }

                .title {
                    width: 441rpx;
                    height: 62rpx;
                    font-size: 26rpx;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: rgba(34, 34, 34, 1);
                    line-height: 36rpx;
                }

                .price {
                    position: absolute;
                    bottom: 0rpx;

                    .number {
                        font-size: 32rpx;
                        font-family: PingFang SC;
                        font-weight: 600;
                        color: #ff4657;
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

                .progress-box {
                    overflow: hidden;
                    position: relative;
                    margin-top: 8rpx;

                    .desc {
                        font-size: 22rpx;
                        font-family: PingFang SC;
                        font-weight: 500;
                        color: rgba(34, 34, 34, 1);
                        float: left;
                        vertical-align: middle;

                    }

                    progress {
                        float: left;
                        position: absolute;
                        width: 220rpx;
                        top: 15rpx;
                        right: 110rpx;
                    }
                }

                .address {
                    font-size: 22rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: rgba(102, 102, 102, 0.66);
                    line-height: 36rpx;
                    padding-top: 5rpx;
                }
            }
        }
    }
</style>