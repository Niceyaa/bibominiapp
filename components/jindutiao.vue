<template>
    <!-- 模板文件勿动 -->
    <view class="box">
        <view class="jindutiao-container">
            <view class="title">
                <view class="xian">
                </view>
                票面热度
            </view>
            <view v-for="(item,index) in redu" :key="index">
                <view class="jindutiao-content">
                    <text class="title-text" selectable="false" space="false" decode="false">
                        {{item.name}}
                    </text>
                    <view class="jindutiao">
                        <view class="jindutiao-wancheng" :style="'width:'+(width/10000)*item.hot_num+'px'">
                            <text class="jindutiao-text">
                                ￥1
                            </text>
                            <text class="jindutiao-text-max">
                                ￥{{item.price/100}}
                            </text>
                        </view>

                    </view>
                </view>
                <!-- <view class="jindutiao-content">
                    <text class="title-text" selectable="false" space="false" decode="false">
                        B区
                    </text>
                    <view class="jindutiao">
                        <view class="jindutiao-wancheng">

                        </view>

                    </view>
                </view> -->
                <!-- 
                <view class="jindutiao-content">
                    <text class="title-text" selectable="false" space="false" decode="false">
                        B区
                    </text>
                    <view class="jindutiao">
                        <view class="jindutiao-wancheng">

                        </view>

                    </view>
                </view>
                <view class="jindutiao-content">
                    <text class="title-text" selectable="false" space="false" decode="false">
                        C区
                    </text>
                    <view class="jindutiao">
                        <view class="jindutiao-wancheng">

                        </view>

                    </view>
                </view> -->
            </view>

        </view>
    </view>
</template>

<script>
    export default {
        name: "jindutiao",
        data() {
            return {
                width: 0,
                max: 0,
            }
        },
        onLoad() {

        },
        mounted() {
            let that = this;
            console.log(123)
            const query = uni.createSelectorQuery().in(this);
            console.log(query)
            query.select('.jindutiao').boundingClientRect(data => {
                that.width = data.width;
            }).exec();


        },
        props: {
            redu: {
                type: Array
            },

        },
        methods: {

        }
    }
</script>

<style lang="less">
    .jindutiao-container {
        width: 670upx;
        background: rgba(34, 34, 34, 1);
        border-radius: 10upx;
        margin: 60upx auto 0 auto;
        padding-top: 50upx;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;

        .jindutiao-content {
            font-size: 28upx;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            height: 114upx;
            width: 100%;
            padding: 0 31upx;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;

            .title-text {
                line-height: 114upx;
                float: left;
                width: 125rpx;
            }

            .jindutiao {
                width: 452upx;
                height: 24upx;
                background: rgba(68, 68, 68, 1);
                border-radius: 10upx;
                float: left;
                margin-left: 20upx;
                margin-top: 47upx;

                .jindutiao-wancheng {
                    height: 24upx;
                    background: linear-gradient(90deg, rgba(250, 175, 116, 1) 0%, rgba(237, 24, 41, 1) 100%);
                    border-radius: 10upx;
                    position: relative;

                    .jindutiao-text {
                        color: #999999;
                        position: absolute;
                        top: -40rpx;
                        left: 0rpx;
                    }

                    .jindutiao-text-max {
                        color: #ED1829;
                        position: absolute;
                        top: -40rpx;
                        right: 0rpx;

                    }
                }
            }
        }

        .title {
            font-size: 36upx;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);

            .xian {
                display: inline-block;
                width: 5upx;
                height: 37upx;
                background: rgba(255, 255, 255, 1);
                margin: 0 27upx;
            }
        }


    }
</style>