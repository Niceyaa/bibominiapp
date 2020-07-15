<template>
    <!-- 选择分类 -->
    <view class="selectType-container" @click="selectTypeNone">
        <!-- 取消按钮 -->
        <image class="quxiao-icon"
            src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/quxiao.png"
            @click="selectTypeNone" />
        <view class="selectType" @click.stop="show">
            <view class="title">
                选择分类
            </view>
            <view class="type-content">
                <view class="content" v-for="(item,index) in concerttypesData" :key="index" @click="xuanze(index)">
                    <image class="icon" :src="item.icon" />
                    <view class="text">
                        {{item.name}}
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

            }
        },
        props: {
            concerttypesData: {
                type: Array
            }
        },
        onLoad() {

        },
        methods: {
            xuanze(index) {
                this.$emit("selectTypeFn", false, index)
            },
            show() {
            },
            //调用父级函数改变分类组件状态
            selectTypeNone() {
                this.$emit("selectTypeFn", false)
            }
        }
    }
</script>

<style lang="less">
    .selectType-container {
        width: 100%;
        position: fixed;
        height: 100vh;
        top: 0;
        background-image: url("https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/selectbg.png");
        background-size: 100% 100vh;
        z-index: 1000;

        .quxiao-icon {
            position: absolute;
            width: 30rpx;
            height: 30rpx;
            top: 61rpx;
            left: 40rpx;
        }

        .selectType {
            width: 100%;
            background-color: white;
            border-radius: 0rpx 0rpx 20rpx 20rpx;
            padding-bottom: 90rpx;

            .type-content {
                display: flex;
                justify-content: left;
                flex-wrap: wrap;

                .content {
                    padding-top: 58rpx;
                    text-align: center;
                    width: 33.333%;

                    .icon {
                        width: 70rpx;
                        height: 56rpx;
                    }

                    .text {
                        margin-top: 22rpx;
                        text-align: center;
                        font-size: 24rpx;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(100, 100, 100, 1);
                    }
                }
            }

            .title {
                padding-top: 58rpx;
                font-size: 28rpx;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(0, 0, 0, 1);
                text-align: center;

            }
        }

    }
</style>