<template>
    <view class="latest-container">
        <!-- 最新榜单 -->
        <view class="latest-title">
            <text class="latest-title-text" selectable="false" space="false" decode="false">
                人气演出
            </text>
            <view class="main-icon-container">
                <image class="main-icon"
                    src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/gengduo.png" />
            </view>
            <text class="latest-title-all" selectable="false" space="false" decode="false">
                全部
            </text>
        </view>
        <!-- 轮播 -->
        <swiper class="latest-swiper-container" next-margin="179rpx" autoplay="false" circular="true">
            <swiper-item v-for="(item,index) in latestList" :key="index" @click="targetDetails(item.id)">
                <view class="swiper-item uni-bg-red">
                    <image class="" :src="item.concert_detail.img_hot" />
                    <!-- 内容部分 -->
                    <view class="swiper-content">
                        <text class="swiper-content-text" selectable="false" space="false" decode="false">
                            {{item.name}}
                        </text>
                        <text class="swiper-content-time" selectable="false" space="false" decode="false">
                            {{item.start_at | formatTimes}} — {{item.end_at | formatTimes}}
                        </text>
                    </view>
                </view>
                <!-- 播放按钮 -->
                <view class="play" @click.stop="start(item.concert_detail.video)">
                    <image class=""
                        src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/bofang.png" />
                </view>
            </swiper-item>
        </swiper>
        <view class="video-container" v-if="videoOnff" @click="closeVideo">
            <video class="" :src="videoSrc" @click.stop="">

            </video>

        </view>

    </view>

</template>

<script>
    export default {
        name: "",
        data() {
            return {
                videoSrc: '',
                videoOnff: false
            }
        },
        props: {
            latestList: {
                type: Array,
                default: []
            }
        },
        onLoad() {

        },
        methods: {
            closeVideo() {
                this.videoOnff = false;
            },
            start(v) {
                console.log(v)
                this.videoOnff = true;
                this.videoSrc = v;
            },
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
    .latest-container {
        padding: 0 40upx;
        width: 100%;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;

        .video-container {
            z-index: 1000;
            position: fixed;
            top: 0rpx;
            left: 0rpx;
            width: 100%;
            height: 100vh;

            background: rgba(0, 0, 0, .9);

            video {
                position: absolute;
                top: 50%;
                margin-top: -225rpx;
                width: 100%;
                height: 450rpx;
            }
        }

        .latest-swiper-container {
            width: 100%;
            height: 430upx;
            background-color: white;
            border-radius: 5upx;
            position: relative;

            .play {
                width: 73upx;
                height: 73upx;
                border-radius: 50%;
                position: absolute;
                top: 253upx;
                left: 360upx;

                image {
                    width: 73upx;
                    height: 73upx;
                    border-radius: 50%;

                }
            }

            .swiper-content-text {
                display: block;
                font-size: 26upx;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                line-height: 36upx;
                margin-top: 36upx;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap
            }

            .swiper-content-time {
                display: block;
                font-size: 24upx;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                line-height: 36upx;
                margin-top: 23upx;

            }

            image {
                width: 453upx;
                height: 291upx;
                border-radius: 5upx;
            }

            .swiper-content {
                width: 453upx;
                height: 139upx;
                padding: 0 20upx;
                box-sizing: border-box;
                -webkit-box-sizing: border-box;
                overflow: hidden;
                border-radius: 0upx 5upx 5upx 0upx;
                background: rgba(34, 34, 34, 1);
                margin-top: -11upx;


            }
        }

        .latest-title {
            .main-icon-container {
                float: right;
                line-height: 112upx;
                margin-left: 12upx;

                .main-icon {
                    width: 10upx;
                    height: 18upx;
                    vertical-align: middle;
                }
            }

            .latest-title-text {
                font-size: 36upx;
                font-family: PingFangSC;
                font-weight: bold;
                color: rgba(34, 34, 34, 1);

            }

            .latest-title-all {
                font-size: 24upx;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(34, 34, 34, 1);
                float: right;
            }

            text {
                display: inline-block;
                line-height: 120upx;

            }
        }
    }
</style>