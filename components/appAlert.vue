<template>
    <!-- 前往app弹框 -->
    <cover-view class="alert-mask" v-if="appAlertOnoff">
        <cover-view class="content">
            <cover-image class=""
                src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/%E7%BB%84%2063.png">
            </cover-image>
            <cover-view class="tips">
                请前往哔啵app进行操作
            </cover-view>
            <cover-view class="confirm" @click="close">
                确认
            </cover-view>
        </cover-view>
    </cover-view>

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
            //参数控制弹框是否显示
            appAlertOnoff: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            //函数调用父级函数改变状态
            close() {
                this.$emit('changeAppAlertOnoff', false)
            }
        }
    }
</script>

<style lang="less">
    cover-view {
        overflow: visible;
    }

    .alert-mask {
        top: 0rpx;
        left: 0rpx;
        width: 100%;
        height: 100vh;
        position: fixed;
        z-index: 1000;
        background: rgba(34, 34, 34, 0.5);

        .content {
            width: 670rpx;
            height: 460rpx;
            background: rgba(255, 255, 255, 1);
            border-radius: 20rpx;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -335rpx;
            margin-top: -230rpx;

            .confirm {
                width: 500rpx;
                height: 80rpx;
                background: rgba(255, 70, 112, 1);
                border-radius: 40rpx;
                line-height: 80rpx;
                text-align: center;
                font-size: 32rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                position: absolute;
                left: 50%;
                bottom: 42rpx;
                margin-left: -250rpx;

            }

            .tips {
                font-size: 28rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
                line-height: 34rpx;
                text-align: center;
                margin-top: 242rpx;
            }

            cover-image {
                width: 141rpx;
                height: 145rpx;
                position: absolute;
                left: 50%;
                top: 38rpx;
                margin-left: -70.5rpx;
            }
        }
    }
</style>