<template>
    <!-- 模板文件勿动 -->
    <cover-view class="bottomBtn-container">
        <cover-view class="kefu">
            <button class="kefu-btn" open-type="contact">
                <cover-image class="kefu-icon"
                    src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/kefu-2.png"
                    bindload="" binderror="">
                </cover-image>
            </button>
            <cover-view class="kefu-text" scroll-top="0">
                <button class="kefu-btn" open-type="contact">
                    客服
                </button>
            </cover-view>
        </cover-view>
        <cover-view class="shoucang" v-if="subscribe==0" @click="shouchang">
            <cover-image class="shoucang-icon"
                src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/indexImg/shoucang.png"
                bindload="" binderror="">
            </cover-image>
            <cover-view class="shoucang-text" scroll-top="0">
                收藏
            </cover-view>
        </cover-view>
        <cover-view class="shoucang" v-if="subscribe==1" @click="clearShouChang">
            <cover-image class="shoucang-icon"
                src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/shoucang%20%E6%8B%B7%E8%B4%9D%202.png"
                bindload="" binderror="">
            </cover-image>
            <cover-view class="shoucang-text" scroll-top="0">
                收藏
            </cover-view>
        </cover-view>
        <!-- 按钮 -->
        <cover-view class="cover-btn" scroll-top="0" @click="tips">
            <button class="btn-goupiao btn">
                我要购票
            </button>
        </cover-view>
        <cover-view class="cover-btn" scroll-top="0" @click="tips">
            <button class="btn-zhuanpiao btn">
                立即转票
            </button>
        </cover-view>
    </cover-view>
</template>

<script>
    import { concertDetails } from "@/Api/common"
    export default {
        name: "bottomBtn",
        data() {
            return {

            }
        },
        onLoad() {

        },
        props: {
            detailsId: {
                type: Number,
            },
            subscribe: {
                type: Number,

            }

        },
        methods: {

            tips() {
                this.$emit('changeAppAlertOnoff', true)
            },
            clearShouChang() {
                let that = this;
                concertDetails({
                    id: that.detailsId,
                }, 'delete').then(function (data) {
                    console.log(data)
                    if (data[1].data.err_code == 0) {
                        that.$emit('clearYanchu', 0)
                    }
                    uni.showToast({
                        title: data[1].data.err_msg,
                        duration: 2000,
                        icon: "none"
                    });
                })
            },
            // 收藏
            shouchang() {
                let that = this;
                concertDetails({
                    id: that.detailsId,
                }, 'add').then(function (data) {
                    console.log(data)
                    if (data[1].data.err_code == 0) {
                        that.$emit('clearYanchu', 1)
                    }
                    uni.showToast({
                        title: data[1].data.err_msg,
                        duration: 2000,
                        icon: "none"
                    });
                })
            }
        }
    }
</script>

<style lang="less">
    .bottomBtn-container {
        width: 750rpx;
        height: 108rpx;
        background: white;
        position: fixed;
        bottom: 0rpx;
        padding: 14rpx 40rpx;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;

        .cover-btn {
            display: inline-block;
        }

        .btn {
            border-radius: 5rpx;
            float: left;
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            margin-left: 40rpx;
            width: 220rpx;
            line-height: 80rpx;
            text-align: center;
        }

        .btn-goupiao {
            background: rgba(34, 34, 34, 1);
        }

        .btn-zhuanpiao {
            background: rgba(255, 70, 112, 1);
        }


        .shoucang {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            float: left;
            text-align: center;
            margin-left: 30rpx;

            .shoucang-icon {
                display: inline-block;
                width: 37rpx;
                height: 36rpx;
                margin-bottom: 11rpx;
            }

            .shoucang-text {
                width: 100%;
                text-align: center;
                display: block;
            }
        }

        .kefu {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            float: left;
            text-align: center;

            button {

                margin: 0;
                padding: 0;
                outline: none;
                border-radius: 0;
                background-color: transparent;
                line-height: inherit;
                width: max-content;
            }

            button:after {
                border: none;
            }

            .kefu-btn {
                background: none !important;
                border: none !important;
                line-height: 18rpx;
                font-size: 24rpx;
                outline: none;
                color: #999999;
                display: inline-block;
                height: 36rpx;
                margin-bottom: 11rpx;

            }

            .kefu-icon {
                display: inline-block;
                width: 37rpx;
                height: 36rpx;
                margin-bottom: 11rpx;
            }

            .kefu-text {
                width: 100%;
                text-align: center;
                display: block;

                .kefu-btn {
                    /* background: none !important;
                    border: none !important;
                    line-height: 32rpx;
                    font-size: 24rpx;
                    outline: none;
                    color: #999999; */

                    color: #999999;
                    display: block;
                    line-height: 1.2;
                    overflow: hidden;
                    white-space: nowrap;
                    pointer-events: auto;
                    font-family: -apple-system;
                    margin-bottom: 0rpx;


                }
            }
        }
    }
</style>