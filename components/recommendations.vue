<template>
    <!-- 相关推荐 -->
    <view class="recommendations-container">
        <view class="recommendations-content-container" v-for="(item,index) in recommends" v-if="recommends.length>=1"
            :key="index" @click="targetDetails(item.id)">
            <image class="" :src="item.poster" />
            <view class="recommendations-content">
                <text class="recommendations-content-desc" selectable="false" space="false" decode="false">
                    【{{item.city_name}}站】{{item.name}}
                </text>
                <text class="recommendations-content-time" selectable="false" space="false" decode="false">
                    {{item.start_at | formatTimes}} - {{item.end_at | formatTimes}}
                </text>
                <text class="recommendations-content-name" selectable="false" space="false" decode="false">
                    {{item.venue.name}}
                </text>
                <view class="price" selectable="false" space="false" decode="false">
                    {{item.lower_price/100}}
                    <text class="min-text" selectable="false" space="false" decode="false">
                        元起
                    </text>
                </view>
                <button class="goupiao" v-if="goupiaoOnoff" @click.stop="gouPiao">
                    购票
                </button>
            </view>
        </view>
        <!-- <view class="recommendations-content-container">
            <image class=""
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591079014819&di=11933c0b48403bb5b92138b25b4c6711&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg" />
            <view class="recommendations-content">
                <text class="recommendations-content-desc" selectable="false" space="false" decode="false">
                    【成都站】《你好疯子》舞台剧
                    上海站正在热卖
                </text>
                <text class="recommendations-content-time" selectable="false" space="false" decode="false">
                    2020.04.24—2020.12.31
                </text>
                <text class="recommendations-content-name" selectable="false" space="false" decode="false">
                    成都乐空间
                </text>
                <view class="price" selectable="false" space="false" decode="false">
                    99
                    <text class="min-text" selectable="false" space="false" decode="false">
                        元起
                    </text>
                </view>
                <button class="goupiao">
                    购票
                </button>
            </view>
        </view> -->
        <!-- 无内容 -->
        <view class="no-content" v-if="recommends.length<1">
            <image class=""
                src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/no-content.png" />
            <view class="text" selectable="false" space="false" decode="false">
                暂无相关内容
            </view>

        </view>

    </view>

</template>

<script>
    export default {
        name: "recommendations",
        data() {
            return {

            }
        },
        onLoad() {

        },
        props: {
            recommends: {
                type: Array
            },
            goupiaoOnoff: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            // 购票
            gouPiao() {
                uni.showModal({
                    title: '请下载购票app',
                    content: '小程序待开放',
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定');
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            },
            targetDetails(id) {
                var pages = getCurrentPages();
                if (pages.length >= 10) {
                    uni.reLaunch({
                        url: '/pages/index/yanchudetails/yanchudetails?id=' + id,
                    });
                } else {
                    uni.navigateTo({
                        url: '/pages/index/yanchudetails/yanchudetails?id=' + id,
                    });
                }

            }
        }
    }
</script>

<style lang="less">
    .recommendations-container {
        width: 100%;
        background-color: white;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        padding: 0 40rpx;
        position: relative;

        .no-content {
            width: 100%;
            height: 100%;
            position: relative;

            .text {
                width: 100%;
                font-size: 26rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(0, 0, 0, 1);
                line-height: 23rpx;
                text-align: center;
                top: 388rpx;
                position: absolute;
            }

            image {
                width: 393rpx;
                height: 319rpx;
                position: absolute;
                left: 50%;
                margin-left: -196rpx;
                top: 159rpx;
            }
        }

        .recommendations-content-container {
            margin-top: 60rpx;
            overflow: hidden;
            padding-bottom: 18rpx;
        }

        image {
            width: 185rpx;
            height: 260rpx;
            border-radius: 8rpx;
            float: left;
        }

        .recommendations-content {
            width: 485rpx;
            height: 260rpx;
            padding-left: 64rpx;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            background-color: white;
            float: left;
            position: relative;

            .goupiao {
                width: 120rpx;
                height: 60rpx;
                background: rgba(34, 34, 34, 1);
                border-radius: 10rpx;
                font-size: 24rpx;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                padding: 0;
                margin: 0;
                left: 319rpx;
                top: 200rpx;
                position: absolute;
            }

            .recommendations-content-desc {
                width: 372rpx;
                font-size: 26rpx;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(34, 34, 34, 1);
                line-height: 41rpx;
                display: block;

                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }

            .recommendations-content-time {
                /* height: 19rpx; */
                font-size: 24rpx;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                line-height: 36rpx;
                display: block;
                margin-top: 21rpx;

            }

            .recommendations-content-name {
                /* height: 19rpx; */
                font-size: 24rpx;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                line-height: 36rpx;
                display: block;
                margin-top: 15rpx;

            }

            .price {
                font-size: 32rpx;
                font-family: PingFang SC;
                font-weight: 600;
                color: #ff4657;
                font-weight: 600;
                position: absolute;
                bottom: 0rpx;

                .min-text {
                    font-size: 20rpx;
                    color: #B2B2B2;
                    font-family: PingFang SC;
                    margin-left: 5rpx;


                }
            }
        }
    }
</style>