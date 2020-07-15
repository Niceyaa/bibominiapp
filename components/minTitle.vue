<template>
    <!-- 小标题 -->
    <view class="min-container">
        <text class="min-title" selectable="false" space="false" decode="false">
            {{title}}
        </text>
        <view class="main-icon-container" v-if="all">
            <image class="main-icon"
                src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/gengduo.png" />
        </view>
        <text v-if="all" class="min-all" selectable="false" space="false" decode="false" @click="target">
            全部
        </text>
    </view>
</template>

<script>
    export default {
        name: "minTitle",
        data() {
            return {

            }
        },
        props: {
            title: {
                type: String,
                default: "近期热门"
            },
            all: {
                type: Boolean,
                default: true
            }
        },
        onLoad() {

        },
        methods: {
            target() {
                console.log(123)
                uni.switchTab({
                    url: '/pages/all/all'
                });
            }
        }
    }
</script>

<style lang="less">
    .min-container {
        padding: 40upx 37upx;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        overflow: hidden;

        .min-title {
            font-size: 36upx;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: rgba(34, 34, 34, 1);
            float: left;
            line-height: 73upx;
        }

        .min-all {
            font-size: 24upx;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(34, 34, 34, 1);
            line-height: 73upx;
            float: right;
        }

        .main-icon-container {
            float: right;
            line-height: 67upx;
            margin-left: 12upx;

            .main-icon {
                width: 10upx;
                height: 18upx;
                vertical-align: middle;
            }
        }
    }
</style>