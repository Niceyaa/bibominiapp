<template>
    <!-- 演唱会banner图 -->
    <view class="vocalconcert-container">
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
            }
        }
    }
</script>

<style lang="less">
    .vocalconcert-container {
        width: 100%;
        height: 346upx;
        background-color: white;

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