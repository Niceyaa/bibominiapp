<template>
    <!-- 演出详情 -->
    <view class="yanchudetails-container" v-if="detailList!=null">
        <childheader title="演出详情"></childheader>
        <!-- 占位 -->
        <view class="placeholder">

        </view>
        <!-- 
        <scroll-view id="scroll" :class="onoff?'gundong':''" :scroll-y="scroll" @scroll.stop="scrolls"
            :scroll-into-view="maodianId" :style="{height:navHeight+'px'}"> -->
        <!-- 节目详情 -->
        <view :class="onoff?'jiemu-details-nav-default jiemu-details-nav-active':'jiemu-details-nav-default'"
            v-if="selectOnoff">
            <view :class="jiemu=='demo1'?'jiemu-details-title jiemu-details-title-active':'jiemu-details-title'"
                @click="maodianFn('demo1')">
                节目详情
                <view class="jiemu-details-title-icon" v-if="jiemu=='demo1'">

                </view>
            </view>
            <view :class="jiemu=='demo2'?'jiemu-details-title jiemu-details-title-active':'jiemu-details-title'"
                @click="maodianFn('demo2')">
                观演需知
                <view class="jiemu-details-title-icon" v-if="jiemu=='demo2'">

                </view>
            </view>
            <view :class="jiemu=='demo3'?'jiemu-details-title jiemu-details-title-active':'jiemu-details-title'"
                @click="maodianFn('demo3')">
                相关推荐
                <view class="jiemu-details-title-icon" v-if="jiemu=='demo3'">

                </view>
            </view>
        </view>
        <view class="demo0" id="demo0">
            <view class="haibao-hidden">
                <!-- 海报 -->
                <view class="yanchudetails-haibao">
                    <view class="haibao">
                        <image class="" :src="detailList.concert.poster" />
                    </view>
                    <view class="haibao-desc">
                        <view class="haibao-title">
                            【{{detailList.concert.city_name}}站】{{detailList.concert.name}}
                        </view>
                        <view class="haibao-time">
                            <image class=""
                                src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/indexImg/shijian.png" />
                            <text class="" selectable="false" space="false" decode="false">
                                {{detailList.concert.start_at | formatTimes}}
                            </text>

                        </view>
                        <view class="haibao-address">
                            <image class=""
                                src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/indexImg/dingwei.png" />
                            <text class="">
                                {{detailList.venue.addr}}
                            </text>
                            <view class="xian">

                            </view>
                            <view class="quna" @click="openAddress">
                                <image class=""
                                    src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/indexImg/daohang.png" />
                                <text class="" selectable="false" space="false" decode="false">
                                    {{juli}}
                                </text>
                            </view>

                        </view>
                    </view>
                </view>
                <!-- 海报模糊背景 -->
                <view class="yanchudetails-haibao-before"
                    :style="'background-image: url('+detailList.concert.poster+');'">
                </view>
            </view>
            <!-- 图表部分 -->
            <view class="yanchudetails-tubiao-container">
                <jindutiao :redu="redu" v-if="redu!=null"></jindutiao>
                <eachart :zoushixian="zoushixian" v-if="zoushixian!=null"></eachart>
            </view>
            <!-- 占位 -->
            <view class="zhanwei">

            </view>

            <!-- 演出内容及描述部分 -->
            <view class="yanchudetails-content">
                <!-- 明星信息 -->
                <view class="mingxin" @click="targetHomePage(item.id)" v-if="detailList!=null"
                    v-for="(item,index) in detailList.actors" :key="index">
                    <image class="" :src="item.img" />
                    <text class="name-max" selectable="false" space="false" decode="false">
                        {{item.name}}
                    </text>
                    <text class="name-min" selectable="false" space="false" decode="false">
                        {{item.desc}}
                    </text>
                    <!-- 关注按钮 -->
                    <view class="guanzhu-btn" @click.stop="addGuanzhu(item.id,index)" v-if="item.subscribe==0">
                        + 关注
                    </view>
                    <view class="guanzhu-btn yiguanzhu" @click.stop="deleteGuanzhu(item.id,index)"
                        v-if="item.subscribe==1">
                        已关注
                    </view>
                </view>
                <!-- <view class="mingxin">
                <image class="" :src="haibaoBg" />
                <text class="name-max" selectable="false" space="false" decode="false">
                    张国荣
                </text>
                <text class="name-min" selectable="false" space="false" decode="false">
                    【来自加拿大的电音王子】
                </text> -->
                <!-- 关注按钮 -->
                <!-- <view class="guanzhu-btn">
                    + 关注
                </view>
            </view> -->
            </view>
            <!-- 提示 -->
            <!-- yanchudetails-tips-active  -->
            <view class="yanchudetails-tips">
                <image class=""
                    src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/indexImg/yh.png" />
                考虑到因疫情期间演出不确定性，为给用户提供便利，平台将对物流配送事宜进行适当调整，具体详见首页公告！请大家放心购票！
            </view>
            <!-- 节目详情 -->
            <view :class="onoff?'jiemu-details-nav jiemu-details-nav-active':'jiemu-details-nav'">
                <view :class="jiemu=='demo1'?'jiemu-details-title jiemu-details-title-active':'jiemu-details-title'"
                    @click="maodianFn('demo1')">
                    节目详情
                    <view class="jiemu-details-title-icon" v-if="jiemu=='demo1'">

                    </view>
                </view>
                <view :class="jiemu=='demo2'?'jiemu-details-title jiemu-details-title-active':'jiemu-details-title'"
                    @click="maodianFn('demo2')">
                    观演需知
                    <view class="jiemu-details-title-icon" v-if="jiemu=='demo2'">

                    </view>
                </view>
                <view :class="jiemu=='demo3'?'jiemu-details-title jiemu-details-title-active':'jiemu-details-title'"
                    @click="maodianFn('demo3')">
                    相关推荐
                    <view class="jiemu-details-title-icon" v-if="jiemu=='demo3'">

                    </view>
                </view>
            </view>
        </view>

        <view id="demo1">
            <view class="jiemu-details">
                <!-- 明星信息 -->
                <view :class="statu=='no'?'mingxin-xinxi':'mingxin-xinxi mingxin-xinxi-active'"
                    v-html="detailList.concert.concert_detail.detail">
                </view>
                <!-- 查看全部 -->
                <view class="look-all" @click="look('all')" v-show="statu=='no'">
                    查看全部

                </view>

                <view class="look-all" @click="look('no')" v-show="statu=='all'">
                    收起
                </view>
            </view>
        </view>
        <view id="demo2">
            <view class="jiemu-details">
                <view class="guanyanxuzhi-container">
                    <view class="guanyanxuzhi">
                        观演需知
                        <text class="change-all">
                            全部说明
                        </text>
                    </view>
                    <view class="xiangouxuzhi">
                        限购须知
                    </view>
                    <view class="xiangou-desc">
                        本节目最多购买6张（如有多张票务需求请拨打12841904）
                    </view>
                    <view class="xiangouxuzhi">
                        演出时长
                    </view>
                    <view class="xiangou-desc">
                        具体演出时长，以现场演出时长为主
                    </view>
                    <view class="xiangouxuzhi">
                        发票须知
                    </view>
                    <view class="xiangou-desc">
                        如需开发票，演出观演结束后可致电1100010或者在线客服，工作时间：10点-19点
                    </view>
                </view>
                <view class="look-all">

                    <image class="go-index"
                        src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/indexImg/goIndex.png"
                        @click="goIndex"></image>
                </view>
            </view>
        </view>
        <view id="demo3" class="jiemu-details jiedian">
            <!-- 相关推荐 -->
            <minTitle title="相关推荐"></minTitle>
            <recommendations :recommends="detailList.recommends" v-if="detailList!=null"></recommendations>
        </view>
        <!-- </scroll-view> -->
        <view class="zhanwei-bottom"></view>
        <bottomBtn :detailsId="detailsId" :subscribe="detailList.subscribe" v-if="detailsId!=null && detailList!=null"
            @clearYanchu="clearYanchu" @changeAppAlertOnoff="changeAppAlertOnoff">
        </bottomBtn>
        <appAlert :appAlertOnoff="appAlertOnoff" @changeAppAlertOnoff="changeAppAlertOnoff"></appAlert>
    </view>

</template>

<script>
    import childheader from "../../../components/childheader"
    import eachart from "../../../components/EachertTongji"
    import jindutiao from "../../../components/jindutiao"
    import recommendations from "../../../components/recommendations"
    import minTitle from "../../../components/minTitle"
    import bottomBtn from "../../../components/bottomBtn"
    import { detail, favoractor, concertDetails } from "@/Api/common"

    export default {
        name: "",
        data() {
            return {
                demoTwo: null,
                demoOne: null,
                containerHeight: null,
                navHeight: 0,
                appAlertOnoff: false,
                resultLatitude: null,
                resultLongitude: null,
                selectOnoff: false,
                juli_top: null,
                head_height: null,
                jiemu: 'demo1',
                detailsId: null, //演出id
                fromLng: null, //经度
                fromLat: null,//纬度
                juli: "未知",
                maodianId: "demo0",
                scroll: true,
                decode: true,
                statu: 'no',
                redu: null, //票面热度
                zoushixian: null,//走势图
                detailList: null,
                onoff: false,
                top: 0,
                haibaoBg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591252624789&di=4a56b9120c9a508f38dc424da8b31430&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg",

            }
        },
        components: {
            childheader,
            eachart,
            jindutiao,
            recommendations,
            minTitle,
            bottomBtn,
        },
        onLoad(options) {
            let that = this;
            this.detailsId = options.id;
            if (options.cityCode != undefined) {
                this.$store.commit('changeCityCode', options.cityCode);
                detail({
                    city_code: options.cityCode,
                }, options.id).then(function (data) {
                    that.resultLongitude = parseFloat(data[1].data.data.venue.latitude);
                    that.resultLatitude = parseFloat(data[1].data.data.venue.longitude);
                    console.log(data[1].data.data)
                    that.detailList = data[1].data.data
                    console.log(that.detailList)
                    that.redu = that.detailList.concert_times[0].concert_tickets;
                    if (that.detailList.price_logs[0] != undefined) {
                        that.zoushixian = that.detailList.price_logs[0].concert_tickets;
                    } else {
                        console.log("没有值")
                    }
                    //拿经度和纬度
                    wx.getLocation({
                        success: function (res) {
                            that.fromLng = res.longitude;
                            that.fromLat = res.latitude;
                            that.juli = Math.ceil(that.getDistance(that.fromLat, that.fromLng, that.detailList.venue.latitude, that.detailList.venue.longitude)) + "km"
                        }
                    })
                });
            } else {
                detail({
                    city_code: this.$store.state.cityCode,
                }, options.id).then(function (data) {
                    that.resultLongitude = parseFloat(data[1].data.data.venue.latitude);
                    that.resultLatitude = parseFloat(data[1].data.data.venue.longitude);
                    console.log(data[1].data.data)
                    that.detailList = data[1].data.data
                    console.log(that.detailList)
                    that.redu = that.detailList.concert_times[0].concert_tickets;
                    if (that.detailList.price_logs[0] != undefined) {
                        that.zoushixian = that.detailList.price_logs[0].concert_tickets;
                    } else {
                        console.log("没有值")
                    }
                    //拿经度和纬度
                    wx.getLocation({
                        success: function (res) {
                            that.fromLng = res.longitude;
                            that.fromLat = res.latitude;
                            that.juli = Math.ceil(that.getDistance(that.fromLat, that.fromLng, that.detailList.venue.latitude, that.detailList.venue.longitude)) + "km"
                        }
                    })
                });
            }

        },
        onShow() {

        },
        mounted() {

        },
        onReady() {

        },

        onShareAppMessage(res) {
            if (res.from === 'button') {// 来自页面内分享按钮
                console.log(res.target)
            }
            return {
                title: '演出详情',
                path: '/pages/index/yanchudetails/yanchudetails?id=' + this.detailsId + '&cityCode=' + this.$store.state.cityCode
            }
        },
        methods: {
            changeAppAlertOnoff(status) {
                this.appAlertOnoff = status;
            },
            openAddress() {
                let that = this;

                uni.openLocation({
                    latitude: that.resultLongitude,
                    longitude: that.resultLatitude,
                    address: that.detailList.venue.addr,
                    name: that.detailList.venue.name,
                    success: function () {
                        console.log('success');
                    },
                    fail(res) {
                        console.log(res)
                        console.log(res)
                        console.log(that.resultLongitude, that.resultLatitude)
                    }

                });

            },

            onPageScroll(e) {
                let that = this;

                const query = uni.createSelectorQuery().in(this);
                query.select('.placeholder').boundingClientRect(data => {
                    that.head_height = data.height;
                }).exec();
                query.select('.jiemu-details-nav').boundingClientRect(data => {
                    that.navHeight = data.height;
                    that.juli_top = data.top
                    if (that.juli_top != null && that.head_height != null) {
                        if (that.juli_top <= that.head_height) {
                            that.selectOnoff = true;
                        } else {
                            that.selectOnoff = false;
                        }
                    }
                }).exec();
                if (that.containerHeight == null) {
                    query.select('#demo0').boundingClientRect(data => {
                        that.containerHeight = data.height;
                    }).exec();
                }

                query.select('#demo1').boundingClientRect(data => {
                    that.demoOne = data.height;
                    if (data.top - that.navHeight <= that.head_height && (data.top * -1) < (data.height - that.head_height)) {
                        that.jiemu = 'demo1'
                    }
                }).exec();
                query.select('#demo2').boundingClientRect(data => {
                    that.demoTwo = data.height;
                    if (data.top - that.navHeight <= that.head_height && (data.top * -1) < (data.height - that.head_height)) {
                        that.jiemu = 'demo2'
                    }
                }).exec();

                query.select('.jiedian').boundingClientRect(data => {
                    if (data.top - that.navHeight <= that.head_height) {
                        that.jiemu = 'demo3'
                    }

                }).exec();
            },
            //取消收藏当前演出
            clearYanchu(status) {
                this.detailList.subscribe = status;
            },
            // 取消关注
            deleteGuanzhu(id, index) {
                let that = this;
                favoractor({
                    id,
                }, 'delete').then(function (data) {
                    uni.showToast({
                        title: data[1].data.err_msg,
                        duration: 2000,
                        icon: "none"
                    });
                    if (data[1].data.err_code == "0") {
                        that.$set(that.detailList.actors[index], 'subscribe', 0)
                    }
                })
            },
            //添加关注
            addGuanzhu(id, index) {
                let that = this;
                favoractor({
                    id,
                }, 'add').then(function (data) {
                    uni.showToast({
                        title: data[1].data.err_msg,
                        duration: 2000,
                        icon: "none"
                    });
                    if (data[1].data.err_code == "0") {
                        that.$set(that.detailList.actors[index], 'subscribe', 1)
                    }
                })
            },
            // 计算距离
            getDistance: function (lat1, lng1, lat2, lng2) {
                lat1 = lat1 || 0;
                lng1 = lng1 || 0;
                lat2 = lat2 || 0;
                lng2 = lng2 || 0;

                var rad1 = lat1 * Math.PI / 180.0;
                var rad2 = lat2 * Math.PI / 180.0;
                var a = rad1 - rad2;
                var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
                var r = 6378.137;
                var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)));
                return distance;
            },
            maodianFn(name) {
                let that = this;
                console.log(that.demoOne)
                switch (name) {
                    case 'demo1':
                        uni.pageScrollTo({
                            scrollTop: (that.containerHeight - that.navHeight + 5),
                            duration: 300
                        });
                        break;
                    case 'demo2':
                        uni.pageScrollTo({
                            scrollTop: (that.containerHeight + that.demoOne - that.navHeight + 5),
                            duration: 300
                        });
                        break;
                    case 'demo3':
                        uni.pageScrollTo({
                            scrollTop: (that.containerHeight + that.demoTwo + that.demoOne - that.navHeight + 5),
                            duration: 300
                        });
                        break;
                }
            },
            goIndex() {
                uni.switchTab({
                    url: '/pages/index/index'
                });
            },
            look(status) {
                this.statu = status;
                let that = this;
                let query = uni.createSelectorQuery().in(this);
                setTimeout(function () {
                    query.select('#demo1').boundingClientRect(data => {
                        that.demoOne = data.height;
                    }).exec();
                }, 200)
                if (status == "all") {

                } else {
                    setTimeout(function () {
                        query.select('#demo2').boundingClientRect(data => {
                            that.demoTwo = data.height;
                        }).exec();
                    }, 200)
                    console.log(status)
                }
            },
            targetHomePage(id) {
                var pages = getCurrentPages();
                if (pages.length >= 10) {
                    uni.reLaunch({
                        url: '/pages/index/homepage/homepage?id=' + id
                    });
                } else {
                    uni.navigateTo({
                        url: '/pages/index/homepage/homepage?id=' + id
                    });
                }

            }
        }
    }
</script>

<style lang="less">
    .yanchudetails-container {
        #scroll {
            overflow-anchor: none;
        }

        .placeholder {
            width: 100%;
            height: 140rpx;
        }

        .zhanwei-bottom {
            height: 108rpx;
            width: 100%;
        }

        .zhanwei {
            width: 750rpx;
            height: 20rpx;

        }

        .jiemu-details-nav-active {
            top: 140rpx;
            width: 100%;
            z-index: 999;
        }

        .jiemu-details-nav-default {
            display: flex;
            justify-content: left;
            border-top: 1rpx solid rgba(238, 238, 238, 1);
            background-color: white;
            position: fixed;
            width: 100%;
            z-index: 999;



            .jiemu-details-title {
                width: 33.3333%;
                height: 80rpx;
                line-height: 80rpx;
                text-align: center;
                font-size: 36rpx;

                .jiemu-details-title-icon {
                    width: 50rpx;
                    height: 6rpx;
                    background: rgba(34, 34, 34, 1);
                    border-radius: 3rpx;
                    margin: -8rpx auto 0rpx auto;
                }
            }

            .jiemu-details-title-active {
                font-size: 36rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: rgba(34, 34, 34, 1);
            }
        }

        .jiemu-details-nav {
            display: flex;
            justify-content: left;
            border-top: 1rpx solid rgba(238, 238, 238, 1);
            background-color: white;

            .jiemu-details-title {
                width: 33.3333%;
                height: 80rpx;
                line-height: 80rpx;
                text-align: center;
                font-size: 36rpx;

                .jiemu-details-title-icon {
                    width: 50rpx;
                    height: 6rpx;
                    background: rgba(34, 34, 34, 1);
                    border-radius: 3rpx;
                    margin: -8rpx auto 0rpx auto;
                }
            }

            .jiemu-details-title-active {
                font-size: 36rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: rgba(34, 34, 34, 1);
            }
        }

        .jiemu-details {
            width: 100%;
            width: 750rpx;
            padding-top: 20rpx;

            .guanyanxuzhi-container {
                .xiangouxuzhi {
                    font-size: 28rpx;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: rgba(34, 34, 34, 1);
                    padding-left: 40rpx;
                    box-sizing: border-box;
                    -webkit-box-sizing: border-box;
                    margin-top: 47rpx;
                    line-height: 40rpx;

                }

                .guanyanxuzhi {
                    font-size: 36rpx;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: rgba(34, 34, 34, 1);
                    padding-left: 40rpx;
                    padding-right: 37rpx;
                    box-sizing: border-box;
                    -webkit-box-sizing: border-box;

                    .change-all {
                        font-size: 28rpx;
                        font-family: PingFang SC;
                        font-weight: 500;
                        color: rgba(46, 149, 254, 1);
                        float: right;
                    }
                }

                .xiangou-desc {
                    font-size: 28rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: rgba(102, 102, 102, 1);
                    line-height: 40rpx;
                    padding: 0 47rpx;
                    box-sizing: border-box;
                    -webkit-box-sizing: border-box;
                }
            }

            .go-index {
                position: absolute;
                width: 99rpx;
                height: 99rpx;
                border-radius: 50%;
                vertical-align: middle;
                right: 15rpx;
                top: 0rpx;
            }

            .look-all {
                font-size: 28rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(46, 149, 254, 1);
                line-height: 48rpx;
                text-align: center;
                position: relative;
                line-height: 99rpx;
                height: 99rpx;

            }

            .mingxin-xinxi {
                padding: 40rpx 73rpx 56rpx 47rpx;
                box-sizing: border-box;
                -webkit-box-sizing: border-box;
                height: 300rpx;
                overflow: hidden;
                font-size: 28rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(34, 34, 34, 1);
                line-height: 48rpx;

                image {
                    width: 600rpx;
                    height: 300rpx;
                    border-radius: 5rpx;
                    margin: 42rpx auto 99rpx auto;
                }
            }

            .mingxin-xinxi-active {
                height: 100% !important;
                overflow: visible !important;
            }
        }

        .yanchudetails-tips {
            width: 670rpx;
            background: rgba(246, 246, 246, 1);
            border-radius: 10rpx;
            margin: 0 auto;
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(34, 34, 34, 1);
            line-height: 48rpx;
            position: relative;
            padding: 29rpx 10rpx;

            image {
                width: 48rpx;
                height: 45rpx;
                margin-right: 10rpx;
            }
        }


        .mingxin {
            height: 183rpx;
            width: 100%;
            background-color: white;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            padding: 41rpx 31rpx;
            position: relative;

            .guanzhu-btn {
                position: absolute;
                top: 59rpx;
                right: 46rpx;
                width: 130rpx;
                height: 60rpx;
                border-radius: 30rpx;
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                text-align: center;
                line-height: 60rpx;
                background: rgba(255, 70, 87, 1);
            }

            .yiguanzhu {
                border: 2rpx solid rgba(178, 178, 178, 1);
                background-color: transparent;
                color: #B2B2B2;
            }

            .name-max {
                position: absolute;
                top: 54rpx;
                font-size: 32rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(0, 0, 0, 1);
                left: 158rpx;
                ;
            }

            .name-min {
                left: 158rpx;
                top: 101rpx;
                position: absolute;
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(178, 178, 178, 1);
                width: 405rpx;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            image {
                width: 90rpx;
                height: 90rpx;
                border-radius: 50%;
            }
        }
    }

    .yanchudetails-haibao {
        width: 750rpx;
        min-height: 391rpx;
        padding: 27rpx 37rpx;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        background-color: rgba(0, 0, 0, 0.6);


        .haibao-desc {
            width: 431rpx;
            float: right;

            .haibao-title {
                font-size: 32rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                line-height: 58rpx;
            }

            .haibao-time {

                image {
                    width: 20rpx;
                    height: 20rpx;
                    vertical-align: middle;

                }

                text {
                    margin-left: 20rpx;
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                }



            }

            .haibao-address {
                image {
                    width: 20rpx;
                    height: 25rpx;
                    vertical-align: middle;

                }

                text {
                    display: inline-block;
                    width: 263rpx;
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    margin-left: 20rpx;
                }

                .xian {
                    display: inline-block;
                    width: 2rpx;
                    height: 60rpx;
                    background: rgba(239, 239, 239, 1);
                    margin-left: 20rpx;
                }

                .quna {
                    display: inline-block;
                    position: relative;

                    text {
                        width: auto;
                    }

                    image {
                        position: absolute;
                        left: 40rpx;
                        top: -25rpx;
                        width: 30rpx;
                        height: 30rpx;
                    }
                }
            }
        }

        .haibao {
            width: 200rpx;
            height: 287rpx;
            border-radius: 10rpx;
            position: absolute;

            image {
                width: 200rpx;
                height: 287rpx;
                border-radius: 10rpx;
            }
        }
    }

    .yanchudetails-haibao-before {
        content: "";
        position: absolute;
        z-index: -1;
        left: 0;
        top: 140rpx;
        width: 750rpx;
        height: 391rpx;
        -webkit-filter: blur(30rpx);
        filter: blur(30rpx);
        overflow: hidden;
        background-size: 100% 391rpx;
        background-position: center;
        background-repeat: no-repeat;
    }
</style>