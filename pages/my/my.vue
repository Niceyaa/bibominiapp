<template>
    <view class="my-container">
        <view class="header" @click="cl">
            个人中心
        </view>
        <view class="bg">
            <!-- 登录按钮 -->
            <button class="my-user-name login-btn" open-type="getUserInfo" @getuserinfo="dianji(bindgetuserinfo)"
                @click="goToLogin">
                请登录
            </button>
            <!-- 用户名 -->
            <text class="my-user-name" selectable="false" space="false" decode="false" v-show="false">
                用户名
            </text>
            <image class="my-edit"
                src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/huaban.png" />
            <!-- 用户信息 -->
            <view class="my-user-information">
                <!-- 用户头像 -->
                <image @click="goToUserInfo" class="my-user-head" :src="headImg" />
                <!-- 用户余额 -->
                <view class="my-user-balance">
                    <image class="my-money-icon"
                        src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/02wodexiaofei.png" />
                    <text class="" selectable="false" space="false" decode="false">
                        账户余额：232445
                    </text>
                </view>
                <!-- 订单和转票 -->
                <view class="my-order-container">
                    <view class="my-order" @click="goToMyOrder">
                        <image class=""
                            src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/dingdan.png" />
                        <text class="" selectable="false" space="false" decode="false">
                            我的订单
                        </text>
                    </view>
                    <view class="my-zhuanpiao" @click="goToMyTurnOrder">
                        <image class=""
                            src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/zhaunpiao.png" />
                        <text class="" selectable="false" space="false" decode="false">
                            我的转票
                        </text>
                    </view>
                </view>
            </view>
        </view>
        <!-- 会员 -->
        <view class="my-member">
            <view class="my-member-bg">
                <view class="my-member-icon">
                    <image class=""
                        src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/huiyuan.png" />
                    <text class="my-member-icon-text" selectable="false" space="false" decode="false">
                        开通会员
                    </text>
                </view>
                <view class="my-tips">
                    会员优先出票，享受超值折扣价格
                </view>
                <button class="my-open-member">
                    开通会员
                </button>
            </view>
        </view>
        <!-- 个人中心菜单 -->
        <myMenu :listMenu="listMenu"></myMenu>

    </view>
</template>

<script>
    import myMenu from "../../components/myMenu"
    import { loginApi } from "../../Api/userApi"
    import { dianji } from "../../tool/globalPul"
    export default {
        data() {
            return {
                onoff: true,
                appid: "wxf78a781eb12c53c9",
                // 用户头像
                headImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591079014819&di=11933c0b48403bb5b92138b25b4c6711&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg",
                listMenu: [{
                    iconPath: "https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/yanchu.png",
                    text: "想看的演出",
                    goToUrl: "/pages/my/wantToSee/wantToSee"
                }, {
                    iconPath: "https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/gaunzhu.png",
                    text: "关注的艺人",
                    goToUrl: "/pages/my/concertArtist/concertArtist"
                }, {
                    iconPath: "https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/qianbao.png",
                    text: "我的钱包",
                    goToUrl: "/pages/my/myWallet/myWallet"
                }, {
                    iconPath: "https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/dizhi-2.png",
                    text: "地址管理",
                    goToUrl: "/pages/my/addressManage/addressManage"
                }, {
                    iconPath: "https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/youhuijuan.png",
                    text: "我的优惠券",
                    goToUrl: "/pages/my/myCoupon/myCoupon"
                }, {
                    iconPath: "https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/kefu-3.png",
                    text: "联系客服",
                    goToUrl: "/pages/my/relateService/relateService"
                }, {
                    iconPath: "https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/hezuowoshouyouyihexiehepinggongyingxianxing.png",
                    text: "商务合作",
                    goToUrl: "/pages/my/coopration/coopration"
                }, {
                    iconPath: "https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/changjianwenti.png",
                    text: "常见问题",
                    goToUrl: "/pages/my/commonQuestion/commonQuestion"
                }, {
                    iconPath: "https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/myImg/shezhi.png",
                    text: "设置",
                    goToUrl: "/pages/my/setting/setting"
                }],
            }
        },
        components: {
            myMenu,
        },
        onShareAppMessage(res) {
            if (res.from === 'button') {// 来自页面内分享按钮
                console.log(res.target)
            }
            return {
                title: '我的',
                path: '/pages/my/my'
            }
        },
        onLoad() {
        },
        methods: {
            goToMyTurnOrder() {
                uni.navigateTo({
                    url: "/pages/my/myTurnOrder/myTurnOrder"
                })
            },
            // 进入修改信息
            goToUserInfo() {
                uni.navigateTo({
                    url: "/pages/my/changeUserInfo/changeUserInfo"
                })
            },
            // 模拟进入登录，操作应该是在getuserinfo中
            goToLogin() {
                uni.navigateTo({
                    url: "/pages/my/login/login"
                })
            },
            // 防止用户多次点击
            dianji,
            // 获取用户信息后登录
            bindgetuserinfo(e) {
                let that = this;
                console.log(111)
                uni.getUserInfo({
                    lang: "zh_CN",
                    success: function (res) {
                        uni.login({
                            provider: 'weixin',
                            success: function (loginRes) {
                                // console.log("code:" + loginRes.code);
                                // console.log("nickname:" + res.userInfo.nickName)
                                // console.log("sex:" + res.userInfo.gender)
                                // console.log("img:" + res.userInfo.avatarUrl)
                                // console.log("city_name:" + res.userInfo.city)
                                loginApi({
                                    appid: that.appid,
                                    code: loginRes.code,
                                    nickname: res.userInfo.nickName,
                                    img: res.userInfo.avatarUrl,
                                    sex: res.userInfo.gender,
                                    city_name: res.userInfo.city
                                }).then(function (data) {
                                    console.log(data)
                                })
                            }
                        });
                    }
                })

            },
            goToMyOrder() {
                uni.navigateTo({
                    url: "/pages/my/myOrder/myOrder"
                })
            }
        }
    }
</script>

<style lang="less">
    .my-container {
        background-color: #F6F6F6;

        .my-member {
            width: 100%;
            height: 246upx;
            background: rgba(246, 246, 246, 1);
            margin-top: 55upx;
            padding-top: 52upx;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;

            .my-member-bg {
                width: 670upx;
                height: 150upx;
                background: rgba(34, 34, 34, 1);
                box-shadow: 0px 0px 27upx 0px rgba(42, 42, 42, 0.49);
                border-radius: 10upx;
                margin: 0 auto;
                position: relative;

                .my-member-icon {
                    width: 100%;
                    box-sizing: border-box;
                    -webkit-box-sizing: border-box;
                    padding-left: 65upx;
                    padding-top: 22upx;

                    image {
                        width: 30upx;
                        height: 27upx;
                        margin-right: 17upx;
                        vertical-align: middle;
                    }

                    .my-member-icon-text {
                        font-size: 28upx;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: rgba(235, 208, 149, 1);
                    }
                }

                .my-tips {
                    font-size: 24upx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    box-sizing: border-box;
                    -webkit-box-sizing: border-box;
                    padding-left: 65upx;
                    padding-top: 22upx;

                }

                .my-open-member {
                    position: absolute;
                    top: 45upx;
                    right: 17upx;
                    width: 165upx;
                    height: 60upx;
                    background: rgba(235, 208, 149, 1);
                    border: 1upx solid rgba(235, 208, 149, 1);
                    border-radius: 30upx;
                    font-size: 24upx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                }
            }
        }

        .header {
            width: 750upx;
            height: 117upx;
            padding-top: 57upx;
            text-align: center;
            font-size: 30upx;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(34, 34, 34, 1);
            position: fixed;
            top: 0upx;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;

        }

        .bg {
            margin-top: 117upx;
            width: 750upx;
            height: 351upx;
            background: rgba(34, 34, 34, 1);
            position: relative;

            .login-btn {
                padding: 0;
                background: none;
                line-height: normal;
            }

            .my-user-information {
                position: absolute;
                width: 750upx;
                height: 260upx;
                background: rgba(255, 255, 255, 1);
                border-radius: 30upx;
                top: 166upx;
                box-shadow: 0upx 10upx 10upx #d6d6d6;

                .my-order-container {
                    display: flex;
                    padding-top: 86upx;

                    .my-order {
                        width: 50%;
                        line-height: 60upx;
                        text-align: center;
                        border-right: 1upx solid rgba(238, 238, 238, 0.6);
                        border-radius: 1upx;

                        image {
                            width: 35upx;
                            height: 43upx;
                            margin-right: 15upx;
                            vertical-align: middle;
                        }
                    }

                    .my-zhuanpiao {
                        width: 50%;
                        line-height: 60upx;
                        text-align: center;

                        image {
                            width: 43upx;
                            height: 35upx;
                            margin-right: 15upx;
                            vertical-align: middle;
                        }
                    }
                }

                .my-user-balance {
                    width: 100%;
                    font-size: 32upx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: rgba(34, 34, 34, 1);
                    padding-top: 39upx;
                    padding-left: 253upx;
                    box-sizing: border-box;
                    -webkit-box-sizing: border-box;

                    .my-money-icon {
                        width: 26upx;
                        height: 26upx;
                        margin-right: 10upx;
                    }
                }

                .my-user-head {
                    width: 180upx;
                    height: 180upx;
                    border-radius: 50%;
                    position: absolute;
                    top: -90upx;
                    left: 50upx;
                }
            }

            .my-user-name {
                font-size: 36upx;
                font-family: PingFang SC;
                font-weight: 600;
                color: rgba(255, 255, 255, 1);
                position: absolute;
                top: 102upx;
                left: 252upx;
            }

            .my-edit {
                width: 34upx;
                height: 34upx;
                position: absolute;
                top: 110upx;
                left: 382upx;
            }
        }

    }
</style>