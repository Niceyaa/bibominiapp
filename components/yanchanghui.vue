<template>
    <!-- 演唱会banner图 -->
    <view class="vocalconcert-container">
        <view class="biaoqian">
            <view class="type" v-for="(item,index) in yanchanghuititle" :key="index" @click="getData(item.id)">
                {{item.name}}
            </view>
        </view>

        <view class="banner">
            <view class="banner-column" v-for="(item,index) in chosen" :key="index" @click="targetDetails(item.id)">
                <image class="" :src="item.poster" />
                <text class="banner-column-title">
                    {{item.name}}
                </text>
                <text class="banner-column-time">
                    {{item.start_at | formatTimes}}
                </text>
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
        methods: {
            getData(id) {
                this.$emit("childFn", id)
            },
            targetDetails(id) {
                console.log(id);
                uni.navigateTo({
                    url: '/pages/index/yanchudetails/yanchudetails?id=' + id,
                });
            }
        },
        props: {
            chosen: {
                type: Array
            },
            yanchanghuititle: {
                type: Array
            }
        }
    }
</script>

<style lang="less">
    .vocalconcert-container {
        width: 100%;
        background-color: white;

        .biaoqian {
            overflow: hidden;
            padding-bottom: 40rpx;

            .type {
                width: 80rpx;
                height: 40rpx;
                background: rgba(238, 238, 238, 1);
                border-radius: 2rpx;
                margin-left: 40rpx;
                font-size: 22rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
                line-height: 40rpx;
                text-align: center;
                float: left;
            }
        }

        .banner::-webkit-scrollbar {
            display: none;
        }

        .banner {
            overflow: auto;
            display: flex;
            width: 695rpx;
            margin: 0 auto;

            .banner-column {
                margin-left: 21upx;

                .banner-column-title {
                    width: 199upx;
                    font-size: 24upx;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(34, 34, 34, 1);
                    display: block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }



                .banner-column-time {
                    width: 199upx;
                    font-size: 22upx;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(153, 153, 153, 1);
                    display: block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                image {
                    width: 199upx;
                    height: 280upx;
                    border-radius: 5upx;
                }
            }
        }
    }
</style>