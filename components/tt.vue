<template>
    <!-- 相关推荐 -->
    <view class="recommendations-container">
        <view class="biaoqian" v-if="child[current].length>=1">
            <view :class="activeIndex[current] == index?'min-title min-title-active':'min-title'"
                v-for="(item,index) in child[current]" :key="index" @click="changeData(item.id,current,index)">
                {{item.name}}
            </view>
        </view>
        <view class="recommendations-content-container" v-for="(item,index) in allList[current]"
            v-if="allList[current].length>=1 && current!=0" :key="index" @click="targetDetails(item.id)">
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
        <allSelect :hotList="allList[current]" v-if="current==0"></allSelect>
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
        <view class="no-content" v-if="allList[current]<1">
            <image class=""
                src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/no-content.png"
                mode="widthFix" />
            <view class="text" selectable="false" space="false" decode="false">
                暂无相关内容,请尝试下拉刷新
            </view>

        </view>

    </view>

</template>

<script>
    import allSelect from "@/components/allSelect"
    export default {
        name: "recommendations",
        data() {
            return {
            }
        },

        onLoad() {

        },
        components: {
            allSelect
        },
        props: {
            current: {
                type: Number
            },
            allList: {
                type: Array,
                default: []
            },
            goupiaoOnoff: {
                type: Boolean,
                default: true
            },
            child: {
                type: Array
            },
            activeIndex: {
                type: Array,
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
            changeData(name, index, indexs) {
                this.$emit('changeData', name, index, indexs)
                console.log("子组件的标签触发了")
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
    .recommendations-container {
        width: 100%;
        background-color: white;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        padding: 0rpx 40rpx 280rpx 40rpx;

        .biaoqian {
            padding: 31rpx 0rpx;

            .min-title {
                background: rgba(245, 245, 245, 1);
                border-radius: 10rpx;
                margin-left: 20rpx;
                display: inline-block;
                text-align: center;
                font-size: 24rpx;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(34, 34, 34, 1);
                line-height: 50rpx;
                padding: 0 10rpx;
            }

            .min-title-active {
                background: rgba(255, 70, 87, 1);
                color: rgba(255, 255, 255, 1);
            }
        }

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
                position: absolute;
                left: 50%;
                margin-left: -196rpx;
                top: 159rpx;
            }
        }

        .recommendations-content-container {
            margin-top: 10rpx;
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
                height: 19rpx;
                font-size: 24rpx;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                line-height: 36rpx;
                display: block;
                margin-top: 21rpx;

            }

            .recommendations-content-name {
                height: 19rpx;
                font-size: 24rpx;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                line-height: 36rpx;
                display: block;
                margin-top: 15rpx;

            }

            .price {
                font-size: 36rpx;
                font-family: Microsoft YaHei;
                font-weight: bold;
                position: absolute;
                bottom: 0rpx;
                color: #ff4657;

                .min-text {
                    font-size: 20rpx;
                    color: #B2B2B2;
                    margin-left: 5rpx;
                    font-weight: normal !important;

                }
            }

            /* .price {
                font-size: 40rpx;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(34, 34, 34, 1);
                padding-top: 45rpx;

                .min-text {
                    font-size: 32rpx;
                }
            } */
        }
    }
</style>