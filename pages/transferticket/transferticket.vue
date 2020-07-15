<template>
    <!-- 转票 -->
    <view class="zhuanpiao-container">
        <publicHeader title="转票"></publicHeader>
        <!-- 占位 -->
        <view class="placeholder">

        </view>
        <!-- 轮播图广告 -->
        <swiper class="swiper mar-top">
            <!-- <swiper-item v-for="(item,index) in bannerList" :key="index">
                <view class="swiper-item index-swiper-item">
                    <image class="image-width" :src="item.iconPath" mode="" alt="加载中"></image>
                </view>
            </swiper-item> -->
            <swiper-item>
                <view class="swiper-item index-swiper-item">
                    <image class="image-width" :src="resale_square" v-if="resale_square!=null" mode="widthFix"
                        alt="加载中">
                    </image>
                </view>
            </swiper-item>
        </swiper>
        <!-- 转票和求票 -->
        <view class="zhuanpiao-btn-container">
            <view class="zhuanpiao-btn" @click="qiupiao">
                <image class="" src="../../static/image/zhuanpiaoImg/qiupiao.png" />
                我要求票
            </view>
            <view class="qiupiao-btn" @click="qiupiao">
                <image class="" src="../../static/image/zhuanpiaoImg/zhuanpiao.png" />
                我要转票
            </view>
        </view>
        <!-- 广场内容 -->
        <transferticketBanner v-if="zhuanpiaoguangchang!=null" :qiupiaoguangchang="qiupiaoguangchang"
            :zhuanpiaoguangchang="zhuanpiaoguangchang">
        </transferticketBanner>
		<appAlert @changeAppAlertOnoff="changeOnOff" :appAlertOnoff="onoff"></appAlert>

    </view>

</template>

<script>
    import publicHeader from "../../components/public_header"
    import transferticketBanner from "../../components/transferticketBanner"
    import { resalesquare, needsquare } from "../../Api/transferTicket"
    import { guanggao } from "../../Api/common"

    export default {
        name: "zhuanpiao",
        data() {
            return {
				onoff:false,
                resale_square: null,
                swiperHeight: 0,//初始化swiper的高度
                bannerList: [{
                    iconPath: "https://novelsys.oss-cn-shenzhen.aliyuncs.com/actprize/draw/index/%E9%A1%B6%E9%83%A8%E8%83%8C%E6%99%AF.png",
                    text: "演唱会"
                }, {
                    iconPath: "https://novelsys.oss-cn-shenzhen.aliyuncs.com/actprize/draw/index/%E9%A1%B6%E9%83%A8%E8%83%8C%E6%99%AF.png",
                    text: "话剧歌剧"
                }, {
                    iconPath: "https://novelsys.oss-cn-shenzhen.aliyuncs.com/actprize/draw/index/%E9%A1%B6%E9%83%A8%E8%83%8C%E6%99%AF.png",
                    text: "音乐会"
                }, {
                    iconPath: "https://novelsys.oss-cn-shenzhen.aliyuncs.com/actprize/draw/index/%E9%A1%B6%E9%83%A8%E8%83%8C%E6%99%AF.png",
                    text: "全部"
                }],
                zhuanpiaoguangchang: null, //转票广场
                qiupiaoguangchang: null, //求票广场
            }
        },
        components: {
            publicHeader,
            transferticketBanner,
        },
        mounted() {



        },
        onLoad() {
            // 获取转票广场的数据
            const that = this;
            resalesquare({
                page: 1,
            }).then(function (data) {
                that.zhuanpiaoguangchang = data[1].data.data
                console.log(that.zhuanpiaoguangchang)
            });
            //获取求票广场的数据
            needsquare({
                page: 1,
            }).then(function (data) {
                that.qiupiaoguangchang = data[1].data.data
            })
            //转票广告
            guanggao({

            }, 'resale_square').then(function (data) {
                that.resale_square = data[1].data.data.img;
                console.log(data[1].data.data)
            })

        },
        onShareAppMessage(res) {
            if (res.from === 'button') {// 来自页面内分享按钮
                console.log(res.target)
            }
            return {
                title: '转票',
                path: '/pages/transferticket/transferticket'
            }
        },
        methods: {
			changeOnOff(i) {
				this.onoff = i;
			},
            qiupiao() {
               this.onoff = true;
            }
        }
    }
</script>

<style lang="less">
    .placeholder {
        width: 100%;
        height: 200upx;
    }

    .zhuanpiao-container {


        .mar-top {

            padding-top: 41upx;
            height: 170upx;

            .index-swiper-item {
                padding: 0 40upx;

                .image-width {
                    width: 670upx;
                    height: 170upx;
                    border-radius: 10upx;
                }
            }

        }

        .zhuanpiao-btn-container {
            width: 100%;
            padding: 0 38upx;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            display: flex;
            margin-top: 62upx;
            justify-content: center;

            image {
                width: 41upx;
                height: 30upx;
                vertical-align: middle;
                margin-right: 15upx;
                margin-top: -5rpx;
            }

            .zhuanpiao-btn {
                width: 325upx;
                height: 120upx;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 0px 27px 0px rgba(0, 0, 0, 0.13);
                border-radius: 10upx;
                text-align: center;
                line-height: 120upx;
                font-size: 32upx;
                font-family: PingFang SC;
                font-weight: bold;
                color: rgba(34, 34, 34, 1);
            }

            .qiupiao-btn {
                width: 325upx;
                height: 120upx;
                margin-left: 18upx;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 0px 27px 0px rgba(0, 0, 0, 0.13);
                border-radius: 10upx;
                text-align: center;
                line-height: 120upx;
                font-size: 32upx;
                font-family: PingFang SC;
                font-weight: bold;
                color: rgba(34, 34, 34, 1);
            }
        }

    }
</style>