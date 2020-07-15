<template>
    <!-- 模板文件勿动 -->
    <view class="allBanner-container">
        <view class="allBanner-nav">
            <view class="allBanner-nav-text-container">
                <view :class="selectIndex=='all'?'allBanner-nav-text-active allBanner-nav-text':'allBanner-nav-text'"
                    @click="selectBar('all')">
                    全部
                </view>
                <view :class="index==selectIndex?'allBanner-nav-text-active allBanner-nav-text':'allBanner-nav-text'"
                    v-for="(item,index) in concerttypesData" :key="index" @click="selectBar(index)">
                    {{item.name}}
                </view>
            </view>
            <image class="fenlei"
                src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/fenlei.png"
                @click="selectTypeShow" />
        </view>
        <view class="swiper-container">
            <swiper class="swiper" :style="'height:'+swiperHeight" @change="bindchange" :current="current">
                <swiper-item>
                    <view class="swiper-item swiper-item-content" id="editor">
                        <!-- 近期热门 -->
                        <view class="hot">
                            <text class="" selectable="false" space="false" decode="false" @click="maskShow(true)">
                                {{showText}}
                            </text>
                            <image class="icon"
                                src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/duobianxing.png"
                                @click="maskShow(true)" />
                            <text class="" selectable="false" space="false" decode="false">
                                全部时间
                            </text>
                            <image class="icon"
                                src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/duobianxing.png" />
                            <text class="all" selectable="false" space="false" decode="false">
                                全部
                            </text>
                            <image class="icon" style="width: 9upx;height: 18upx;"
                                src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/gengduo.png" />
                        </view>

                        <allSelect :hotList="allBannerData"></allSelect>

                    </view>
                </swiper-item>
                <swiper-item v-for="(item,index) in concerttypesData" :key="index">
                    <view class="swiper-item swiper-item-content" id="editor">
                        <!-- 近期热门 -->
                        <view class="hot">
                            <text class="" selectable="false" space="false" decode="false" @click="maskShow(true)">
                                近期热门
                            </text>
                            <image class="icon"
                                src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/duobianxing.png"
                                @click="maskShow(true)" />
                            <text class="" selectable="false" space="false" decode="false">
                                全部时间
                            </text>
                            <image class="icon"
                                src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/duobianxing.png" />
                            <text class="all" selectable="false" space="false" decode="false">
                                全部
                            </text>
                            <image class="icon" style="width: 9upx;height: 18upx;"
                                src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/gengduo.png" />
                        </view>
                        <view class="min-title">
                            <view
                                :class="indexs == activeMinBtn?'min-title-text min-title-text-active':'min-title-text'"
                                v-for="(items,indexs) in item.children" :key="indexs"
                                @click="minTitle(items.id,item.id,indexs)">
                                {{items.name}}
                            </view>
                        </view>
                        <recommendations :recommends="yanchanghuiData"></recommendations>

                    </view>
                </swiper-item>
            </swiper>
        </view>



        <!-- 近期热门弹框遮罩 -->
        <view class="mask" v-if="maskOnoff" @click="maskShow(false)">
            <view class="alter" @click.stop="">
                <view :class="index==check?'select-menu select-menu-active':'select-menu'"
                    v-for="(item,index) in selectMenu" :key="index" @click.stop="changeCheck(index,item)">
                    {{item}}
                    <image v-if="index==check" class=""
                        src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/gouxuan.png" />
                    <image v-else class=""
                        src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/tuoyuan.png" />
                </view>
            </view>
        </view>

    </view>

</template>

<script>
    import recommendations from "../components/recommendations"
    import allSelect from "../components/allSelect"
    import { allpage } from "@/Api/common"

    export default {
        name: "allBanner",
        data() {
            return {
                activeMinBtn: null,
                showText: "近期热门",
                check: 0,
                selectMenu: ["近期热门", "最近开场", "则扣最优", "离我最近"],
                maskOnoff: false,
                selectIndex: 'all', //导航选择
                autoplay: false,
                // dataList: ["全部", "演唱会", "话剧歌剧", "体育赛事", "音乐会", "其他", "其他", "其他", "其他"],
                swiperHeight: 0, //轮播图高度
                yanchanghuiData: null,
            }
        },
        components: {
            recommendations,
            allSelect
        },
        mounted() {
            let that = this;
            const query = uni.createSelectorQuery().in(this);
            query.select('#editor').boundingClientRect(data => {
                that.swiperHeight = data.height + 72 + "px" //将元素高度赋值
            }).exec();

        },
        onLoad() {

        },
        props: {
            concerttypesData: {
                type: Array,
                default: null,
            },
            allBannerData: {
                type: Array,
            },
            current: {
                default: 1,
            },

        },
        methods: {
            minTitle(minid, maxid, index) {
                let that = this;
                that.activeMinBtn = index
                uni.showLoading({
                    title: '加载中'
                });
                allpage({
                    city_code: that.$store.state.cityCode,
                    type_id: maxid,
                    type_sub_id: minid
                }).then(function (data) {
                    that.yanchanghuiData = data[1].data.data
                    console.log(data[1].data.data)
                    uni.hideLoading()
                })
            },
            bindchange(e) {

                let that = this;
                that.activeMinBtn = null;
                //拖动轮播图控制样式
                if (e.detail.current - 1 >= 0) {
                    uni.showLoading({
                        title: '加载中'
                    });
                    allpage({
                        city_code: that.$store.state.cityCode,
                        type_id: that.concerttypesData[e.detail.current - 1].id,
                    }).then(function (data) {
                        that.yanchanghuiData = data[1].data.data
                        if ((data[1].data.data.length * 340 + 270) < 1035) {
                            that.swiperHeight = 1035 + "rpx"
                        } else {
                            that.swiperHeight = data[1].data.data.length * 340 + 270 + "rpx";
                        }
                        uni.hideLoading()
                    })
                } else {
                    const query = uni.createSelectorQuery().in(this);
                    query.select('#editor').boundingClientRect(data => {
                        that.swiperHeight = data.height + 72 + "px" //将元素高度赋值
                    }).exec();
                }
            },
            // 选择弹框
            changeCheck(index, text) {
                this.check = index;
                this.showText = text;
                this.maskOnoff = false;
            },
            //显示近期热门弹框
            maskShow(status) {
                this.maskOnoff = status;
            },
            // 点击控制样式
            selectBar(index) {
                console.log(index)
                this.selectIndex = index;
                this.$emit("currentIndex", index)

            },
            //调用父级函数改变分类组件状态
            selectTypeShow() {
                this.$emit("selectTypeFn", true)
            }

        }
    }
</script>

<style lang="less">
    .allBanner-container {
        .swiper-container {
            width: 100%;
            height: 100%;
        }

        .mask {
            position: fixed;

            top: 0rpx;
            background: rgba(0, 0, 0, 0.5);
            width: 100%;
            height: 100vh;
            z-index: 1000;

            .alter {
                width: 710rpx;
                padding-bottom: 50rpx;
                background-color: white;
                margin: 150rpx auto 0rpx auto;
                border-radius: 8rpx;


                .select-menu-active {
                    color: rgba(255, 70, 87, 1);
                }

                .select-menu {
                    padding: 50rpx 70rpx 0 50rpx;
                    font-size: 30rpx;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    position: relative;

                    image {
                        width: 30rpx;
                        height: 30rpx;
                        position: absolute;
                        bottom: 0rpx;
                        right: 50rpx;
                    }
                }
            }
        }

        .swiper {
            .swiper-item-content {
                width: 100%;
                /* height: 500upx; */
                background: rgba(25, 25, 25, 1);
                opacity: 0.95;
                background: white;
                margin: 72upx auto 0 auto;



                .min-title {
                    padding: 29rpx 0rpx 0rpx 0rpx;
                    box-sizing: border-box;
                    -webkit-box-sizing: border-box;

                    .first {
                        margin-left: 0rpx !important;
                    }



                    .min-title-text {
                        background: rgba(245, 245, 245, 1);
                        border-radius: 10rpx;
                        padding: 0rpx 18rpx;
                        line-height: 50rpx;
                        text-align: center;
                        display: inline-block;

                        font-size: 24rpx;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(34, 34, 34, 1);
                        margin-left: 20rpx;
                    }

                    .min-title-text-active {
                        background: rgba(255, 70, 87, 1);
                        color: white;
                    }
                }

                .hot {
                    font-size: 28upx;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: rgba(34, 34, 34, 1);
                    padding-top: 47upx;
                    padding-left: 40rpx;
                    box-sizing: border-box;
                    -webkit-box-sizing: border-box;

                    .all {
                        margin-left: 285upx;
                        font-size: 24upx;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(34, 34, 34, 1);
                    }

                    text:nth-of-type(2) {
                        margin-left: 48upx;
                    }
                }

                .icon {
                    margin-left: 10upx;
                    width: 13upx;
                    height: 9upx;
                    vertical-align: middle;
                }
            }
        }

        .allBanner-nav {
            width: 100%;
            height: 72upx;
            background: white;
            padding: 0 85upx 0upx 39upx;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            position: fixed;
            top: 200upx;
            z-index: 999;

            .fenlei {
                width: 36upx;
                height: 27upx;
                position: absolute;
                right: 45upx;
                top: 15upx;
            }

            .allBanner-nav-text-container::-webkit-scrollbar {
                display: none
            }

            .allBanner-nav-text-container {
                display: flex;
                overflow: auto;



                .allBanner-nav-text {
                    color: rgba(34, 34, 34, 1);
                    line-height: 60upx;
                    white-space: nowrap;
                    padding: 0 17upx;
                    font-size: 28upx;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(137, 137, 137, 1);
                }

                .allBanner-nav-text-active {
                    font-size: 36upx;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: #222222;
                    border-bottom: 6upx solid black;

                }
            }

        }
    }
</style>