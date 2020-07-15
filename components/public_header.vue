<template>
    <!-- 注意：header层级为最高的999，不能有其他组件的层级高过999 -->
    <!-- 公共头部组件 -->
    <view class="public-header-container">
        <view class="public-header-title">
            {{title}}
        </view>
        <view class="public-header-search">
            <text class="address" @click="$dianji(targetAddr)">
                {{addressDefault}}
            </text>
            <image class="search-xiala" mode="widthFix" @click="$dianji(targetAddr)"
                src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20200703100455.png" />
            </image>
            <image class="search-icon"
                src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/search.png" />
            </image>
            <input @click="targetSearch" class="search" placeholder-class="place-holder" type="text"
                placeholder="搜索明星、演出、场馆" @focus="targetSearch" disabled />

        </view>
    </view>
</template>

<script>
    var QQMapWX = require('@/common/qqmap-wx-jssdk.min.js');
    var qqmapsdk;
    import { citynamecode } from "@/Api/common"
    export default {
        name: "public-header",
        data() {
            return {
                onoff: true,//防止多次点击
                addressDefault: "定位中的的",
            }
        },
        props: {
            title: {
                type: String
            }
        },
        mounted() {
            qqmapsdk = new QQMapWX({
                key: 'A5BBZ-UZHKW-NPQRW-RHBJU-KA5RQ-NNBXZ' //key
            });
            let that = this;
            console.log(this.$store.state.addressDefault)
            if (this.$store.state.addressDefault == "定位中") {
                console.log("继续请求了")
                this.getUserLocation();
            }
            this.addressDefault = this.$store.state.addressDefault;

        },
        onShow: function () {
            // let that = this;
            // that.getUserLocation();
        },
        methods: {
            // 微信获得经纬度
            getLocation: function () {
                let that = this;
                wx.getLocation({
                    type: 'wgs84',
                    success: function (res) {
                        // console.log(res)
                        var latitude = res.latitude
                        var longitude = res.longitude
                        var speed = res.speed
                        var accuracy = res.accuracy;
                        that.getLocal(latitude, longitude)
                    },
                    fail: function (res) {
                        that.$store.commit("changeCityCode", 110000000000);
                        that.$store.commit("changeAddressDefault", '北京');

                        console.log('fail' + JSON.stringify(res))
                    }
                })
            },
            // 获取当前地理位置
            getLocal: function (latitude, longitude) {
                let that = this;
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: latitude,
                        longitude: longitude
                    },
                    success: function (res) {
                        that.addressDefault = res.result.ad_info.city
                        citynamecode({
                            city_name: that.addressDefault
                        }).then(function (data) {
                            console.log("请求了")
                            that.$store.commit("changeCityCode", data[1].data.data.code);
                        })
                        that.$store.commit("changeAddressDefault", res.result.ad_info.city);
                    },
                    fail: function (res) {
                        console.log(res);
                    },
                    complete: function (res) {
                        // console.log(res);
                    }
                });
            },
            getUserLocation: function () {
                let that = this;
                wx.getSetting({
                    success: (res) => {
                        console.log(JSON.stringify(res))
                        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
                        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
                        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
                        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
                            wx.showModal({
                                title: '请求授权当前位置',
                                content: '需要获取您的地理位置，请确认授权',
                                success: function (res) {
                                    if (res.cancel) {
                                        wx.showToast({
                                            title: '拒绝授权',
                                            icon: 'none',
                                            duration: 1000
                                        })
                                    } else if (res.confirm) {
                                        wx.openSetting({
                                            success: function (dataAu) {
                                                if (dataAu.authSetting["scope.userLocation"] == true) {
                                                    wx.showToast({
                                                        title: '授权成功',
                                                        icon: 'success',
                                                        duration: 1000
                                                    })
                                                    //再次授权，调用wx.getLocation的API
                                                    that.getLocation();
                                                } else {
                                                    wx.showToast({
                                                        title: '授权失败',
                                                        icon: 'none',
                                                        duration: 1000
                                                    })
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        } else if (res.authSetting['scope.userLocation'] == undefined) {
                            //调用wx.getLocation的API
                            that.getLocation();
                        }
                        else {
                            //调用wx.getLocation的API
                            that.getLocation();
                        }
                    }
                })
            },
            targetAddr() {
                uni.navigateTo({
                    url: '/pages/index/weizhi/weizhi'
                });

            }
            ,
            targetSearch(ev) {
                uni.navigateTo({
                    url: '/pages/index/search/search'
                });
            },
        },
        watch: {
            "$store.state.addressDefault": function (newValue) {
                this.addressDefault = newValue
            }
        }
    }
</script>

<style lang="less">
    .public-header-container {
        width: 750rpx;
        background: white;
        position: fixed;
        z-index: 999;
        height: 200rpx;

        .public-header-title {
            width: 750rpx;
            height: 140rpx;
            line-height: 185rpx;
            text-align: center;
            font-size: 30rpx;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: rgba(0, 0, 0, 1);
        }

        .public-header-search {
            width: 100%;
            padding: 20rpx 42rpx 18rpx 39rpx;
            height: 60rpx;
            position: relative;
            background-color: white;

            .address {
                padding-right: 8rpx;
                line-height: 60rpx;
                display: inline-block;
                font-size: 28rpx;
                float: left;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .search-xiala {
                width: 24rpx;
                height: auto;
                float: left;
                margin-top: 18rpx;
            }

            .search-icon {
                width: 35rpx;
                height: 35rpx;
                position: absolute;
                left: 188rpx;
                top: 33rpx;
            }

            .search {
                width: 510rpx;
                height: 60rpx;
                background: rgba(250, 250, 250, 1);
                border-radius: 6rpx;
                margin-left: 16rpx;
                display: inline-block;
                float: left;
                padding-left: 96rpx;
                box-sizing: border-box;
                -webkit-box-sizing: border-box;
                font-size: 26rpx;
                font-family: Microsoft YaHei;
                font-weight: 400;

            }

            .place-holder {
                font-size: 26rpx;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(178, 178, 178, 1);
            }
        }


    }
</style>