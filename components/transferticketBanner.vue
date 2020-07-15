<template>
    <!-- 转票求票广场 -->
    <view>
        <!-- 转票求票广场 -->
        <view class="zhuanpiao-qiupiao-guangchang">
            <view :class="current==0?'qiupiao-guangchang guangchang-active':'qiupiao-guangchang'" @click="currents(0)">
                转票广场
                <view class="border" v-if="current==0">

                </view>
            </view>
            <view :class="current==1?'qiupiao-guangchang guangchang-active':'qiupiao-guangchang'" @click="currents(1)">
                求票广场
                <view class="border" v-if="current==1">

                </view>
            </view>
        </view>
        <view class="swiper-guangchang-container">
            <view class="swiper-item swiper-guangchang" v-if="current==0">
                <!-- 广场转票内容 -->
                <view class="guangchang-zhuanpiao-content" v-for="(item,index) in zhuanpiaoguangchang" :key="index">
                    <view class="guangchang-head">
                        <image class="" :src="item.user.img" />
                        <view class="guangchang-username">
                            {{item.user.nickname}}
                        </view>
                        <view class="guangchang-other">
                            发布了转票
                        </view>
                    </view>
                    <view class="guangchang-title">
                        {{item.concert_name}}
                    </view>
                    <view class="guangchang-desc">
                        {{item.desc}}
                    </view>
                    <view class="guangchang-time">
                        <text class="" selectable="false" space="false" decode="false">
                            演出时间：
                            <text class="have-color">
                                {{item.concert_time | formatTimes}}
                            </text>
                        </text>
                        <text class="guangchang-time-xinxi" selectable="false" space="false" decode="false">
                            座位信息：
                            <text class="have-color">
                                {{item.ticket_info}}
                            </text>
                        </text>

                    </view>
                    <view class="guangchang-address">
                        演出地点：{{item.concert_addr}}
                    </view>
                    <!-- 转票价 -->
                    <view class="new-tips">
                        <text class="">
                            转票价：
                        </text>
                        <text class="">
                            ￥{{item.resale_ticket.price/100 | baoliu(2)}}
                        </text>
                    </view>
                    <view class="border-xian">

                    </view>
                </view>
            </view>
            <view class="swiper-item swiper-guangchang" v-if="current==1" v-for="(item,index) in qiupiaoguangchang"
                :key="index">
                <!-- 广场转票内容 -->
                <view class="guangchang-zhuanpiao-content">
                    <view class="guangchang-head">
                        <image class="" :src="item.user.img" />
                        <view class="guangchang-username">
                            {{item.user.nickname}}
                        </view>
                        <view class="guangchang-other">
                            发布了转票
                        </view>
                    </view>
                    <view class="guangchang-title">
                        {{item.name}}
                    </view>
                    <view class="guangchang-desc">
                        {{item.desc}}
                    </view>
                    <view class="biaoqian">
                        <view class="biaoqian-btn" v-if="item.is_urgent==1">
                            急求
                        </view>
                        <view class="biaoqian-btn" v-if="item.is_markup==1">
                            可加价
                        </view>
                        <view class="biaoqian-btn" v-if="item.is_mutiple==1">
                            多张可收
                        </view>
                    </view>
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
                swiperHeight: 0,
                current: 0, //滑块位置
            }
        },
        created() {
            const that = this;
            const query = uni.createSelectorQuery().in(this);
            query.select('.swiper-guangchang').boundingClientRect(data => {
                that.swiperHeight = data.height + "px" //将元素高度赋值
            }).exec();
        },
        mounted() {

        },
        props: {
            zhuanpiaoguangchang: {
                type: Array,
            },
            qiupiaoguangchang: {
                type: Array,
            }
        },
        onLoad() {

        },
        methods: {
            bindchange(ev) {
                this.current = ev.detail.current;
                this.styleActive = ev.detail.current;
            },
            currents(value) {
                console.log(value)
                this.current = value;
            }
        }
    }
</script>

<style lang="less">
    .zhuanpiao-qiupiao-guangchang {
        padding: 70upx 39upx 8upx 39upx;
        border: 1upx solid rgba(246, 246, 246, 1);


        .zhuanpiao-guangchang {
            display: inline-block;
            font-size: 32upx;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(102, 102, 102, 1);


        }

        .qiupiao-guangchang {
            display: inline-block;
            font-size: 32upx;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(102, 102, 102, 1);
            margin-left: 90upx;
        }

        .border {
            width: 60upx;
            height: 6upx;
            background: rgba(255, 70, 87, 1);
            border-radius: 3upx;
            margin: 10upx auto 0 auto;
        }

        .guangchang-active {
            font-size: 36upx;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(34, 34, 34, 1);
        }
    }

    .swiper-guangchang-container {



        .swiper-guangchang {
            padding: 0rpx 39rpx;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;


            .guangchang-zhuanpiao-content {
                padding: 40upx 0;
                position: relative;

                .border-xian {
                    width: 750rpx;
                    height: 20rpx;
                    background: rgba(246, 246, 246, 1);
                    position: absolute;
                    left: -39rpx;
                    bottom: 0rpx;
                }

                .new-tips {
                    font-size: 24rpx;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(255, 70, 87, 1);
                    text-align: center;
                    padding: 0 10rpx;
                    line-height: 46rpx;
                    background: rgba(255, 230, 232, 1);
                    border-radius: 8rpx;
                    display: inline-block;
                    margin-top: 30rpx;
                }

                .biaoqian {
                    padding-top: 39rpx;

                    .biaoqian-btn {
                        width: 100rpx;
                        height: 40rpx;
                        border: 1px solid rgba(255, 70, 87, 1);
                        border-radius: 2rpx;
                        text-align: center;
                        display: inline-block;
                        font-size: 18rpx;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: rgba(255, 70, 87, 1);
                        line-height: 40rpx;
                        margin-right: 20rpx;
                    }
                }

                .guangchang-title {
                    padding-top: 20upx;
                    font-size: 28upx;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: rgba(34, 34, 34, 1);
                    line-height: 50upx;
                }

                .guangchang-desc {
                    font-size: 22upx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: rgba(34, 34, 34, 1);
                    line-height: 38upx;
                    padding-top: 16upx;
                }

                .guangchang-time {
                    padding-top: 18upx;
                    font-size: 22upx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: rgba(178, 178, 178, 1);
                    line-height: 38upx;

                    .have-color {
                        color: #FF4657 !important;
                    }

                    .guangchang-time-xinxi {
                        margin-left: 48upx;
                    }
                }

                .guangchang-address {
                    padding-top: 10upx;
                    font-size: 22upx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: rgba(178, 178, 178, 1);
                    line-height: 38upx;
                }

                .guangchang-head {
                    position: relative;

                    image {
                        width: 70upx;
                        height: 70upx;
                        border-radius: 50%;
                    }

                    .guangchang-other {
                        font-size: 24upx;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: rgba(178, 178, 178, 1);
                        position: absolute;
                        left: 80upx;
                        top: 40upx;

                    }

                    .guangchang-username {
                        font-size: 28upx;
                        font-family: PingFang SC;
                        font-weight: 500;
                        color: rgba(34, 34, 34, 1);
                        position: absolute;
                        left: 80upx;
                        top: 0upx;

                    }
                }
            }
        }

    }
</style>