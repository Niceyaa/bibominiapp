<template>
    <!-- 搜索 -->
    <view class="search-container">
        <!-- 头部 -->
        <childheader title="演出详情"></childheader>

        <!-- 搜索框 -->
        <view class="search-head">
            <input class="search-kuang" placeholder="周杰伦演唱会" value="" v-model.trim="inputValue" focus
                @confirm="searchFn">
            </input>
            <view class="search-icon-box" @click="startSearch()">
                <image class="search-icon"
                    src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/indexImg/sousuo-2.png" />
            </view>
            <text class="quxiao" @click="back">
                取消
            </text>
        </view>
        <!-- 关键字 -->
        <view class="keyWord-container" v-if="keywordsOnoff">
            <view class="keyWord-btn" v-for="(item,index) in keyWords" :key="index" @click="startSearch(item.keyword)">
                <text class="" class="keyWord-icon" v-if="item.icon!=null">
                    {{item.icon}}
                </text>
                <text class="text">
                    {{item.keyword}}
                </text>

            </view>

        </view>
        <!-- 没有相关演出 -->
        <view class="no-yanchu" v-if="tipsOnoff">
            暂时没有"{{keywordsactors}}"的相关演出
        </view>
        <!-- 有结果演员信息 -->
        <view class="yanyuan-box" v-if="actorsOnoff">
            <view class="yanyuan-container" v-for="(item,index) in actorsData" :key="index">
                <view class="yanyuan">
                    <image class="yanyuan-head" :src="item.img" />
                    <text class="yanyuan-name" selectable="false" space="false" decode="false">
                        {{item.name}}
                    </text>
                    <text class="yanchu-count" selectable="false" space="false" decode="false">
                        近期有{{item.concert_num}}场演出
                    </text>
                    <view class="guanzhu-btn" v-if="item.subscribe"
                        @click="$dianji(guanzhu,{add:'delete',id:item.id,'index':index})">
                        + 已关注
                    </view>
                    <view class="guanzhu-btn no-guanzhu" v-if="!item.subscribe"
                        @click="$dianji(guanzhu,{add:'add',id:item.id,'index':index})">
                        + 关注
                    </view>
                </view>

                <!-- 有演员和演唱会结果 -->
                <!-- <view class="have-yanyuan">
                    <text class="have-yanyuan-name">
                        {{item.name}}
                    </text>
                    <text class="have-yanyuan-other">
                        {{item.sub_num}}万粉丝丨{{item.concert_num}}场在售演出
                    </text>
                    <view class="have-yanyuan-btn" @click="targetHomePage(item.id)">
                        去主页
                    </view>
                    <image class="have-bg" :src="item.poster" />

                </view> -->

            </view>
        </view>
        <recommendations v-if="concertsOnoff" :recommends="concerts" :goupiaoOnoff="goupiaoOnoff">
        </recommendations>



        <!-- 相关推荐 -->
        <minTitle title="相关推荐" v-if="recommendsOnoff" :all="allOnoff"></minTitle>
        <recommendations v-if="recommendsOnoff" :recommends="recommendsList" :goupiaoOnoff="goupiaoOnoff">
        </recommendations>

        <!-- 有演出信息时候的推荐活动 -->
        <allselect v-if="showOnoff"></allselect>
    </view>


</template>

<script>
    import childheader from "../../../components/childheader"
    import recommendations from "@/components/recommendations"
    import minTitle from "@/components/minTitle"
    import allselect from "@/components/allSelect"
    import { searchkeyword, search, favoractor } from "@/Api/common"

    export default {
        name: "",
        data() {
            return {
                allOnoff: false, //是否显示全部
                onoff: true,//控制点击次数
                actorsData: null,
                actorsOnoff: false,//有演员信息显示
                recommendsOnoff: false, //相关推荐组件渲染
                keywordsOnoff: true, //关键字显示
                keyWords: null,
                showOnoff: false,
                tipsOnoff: false, //当没有搜索到演唱会信息的时候的提示
                keywordsactors: "",//当前搜索的关键字
                inputValue: "",
                recommendsList: null, //相关活动推荐列表数据
                goupiaoOnoff: false, //是否显示购票按钮
                concerts: null,
                concertsOnoff: false,
            }
        },
        components: {
            recommendations,
            minTitle,
            childheader,
            allselect
        },
        onLoad() {
            let that = this;
            // 获取热门的关键字
            searchkeyword({
                type: "hot",
            }).then(function (data) {
                console.log(data)
                that.keyWords = data[1].data.data
            })
        },
        methods: {
            searchFn() {
                this.startSearch();
            },
            targetHomePage(id) {
                uni.navigateTo({
                    url: '/pages/index/homepage/homepage?id=' + id
                });
            },
            //关注接口待登录接口完成后调试
            guanzhu(obj) {
                console.log(obj)
                let that = this;
                favoractor({
                    id: obj.id
                }, obj.add).then(function (data) {
                    console.log(data[1].data.err_code)
                    if (data[1].data.err_code == 800) {
                        uni.showToast({
                            title: '请前往个人中心登录',
                            duration: 2000,
                            icon: "none"
                        });
                    } else if (data[1].data.err_code == 0) {
                        uni.showToast({
                            title: data[1].data.err_msg,
                            duration: 2000,
                            icon: "none"
                        });
                        if (obj.add == 'add') {
                            that.$set(that.actorsData[obj.index], "subscribe", 1)
                        } else {
                            that.$set(that.actorsData[obj.index], "subscribe", 0)
                        }
                    }

                })
            },
            // 返回上一页函数
            back() {
                var pages = getCurrentPages();
                console.log("返回上一页", pages)
                if (pages.length <= 1) {
                    console.log("可能是分享页面")
                } else {
                    wx.navigateBack({
                        delta: 1
                    })
                }

            },
            // 开始搜索
            startSearch(keyword) {
                let that = this;
                uni.showLoading({
                    title: '搜索中'
                });
                console.log(keyword)
                if (keyword != undefined) {
                    // 按钮搜索触发
                    search({
                        city_code: this.$store.state.cityCode,
                        keyword: keyword
                    }).then(function (data) {
                        console.log(data[1].data.data.recommends)
                        if (data[1].data.data.actors.length < 1) {
                            that.keywordsactors = keyword
                            that.keywordsOnoff = false; //隐藏关键字
                            that.actorsOnoff = false; //隐藏演员信息
                        } else {
                            that.keywordsOnoff = false; //隐藏关键字
                            that.actorsOnoff = true; //显示演员信息
                        }
                        if (data[1].data.data.concerts.length >= 1) {
                            that.tipsOnoff = false; //隐藏提示框
                            that.concerts = data[1].data.data.concerts; //将收到的结果赋值
                            that.concertsOnoff = true; //显示搜到的结果
                        } else {
                            that.concertsOnoff = false; //隐藏上一次搜到的结果
                            that.tipsOnoff = true; //显示提示框
                        }
                        that.recommendsOnoff = true;
                        that.recommendsList = data[1].data.data.recommends
                        uni.hideLoading();
                    })
                } else {
                    // 通过关键字搜索演唱会情况
                    if (that.inputValue == "") {
                        uni.hideLoading();
                        console.log("请输入你要搜索的内容")
                        uni.showToast({
                            title: '请输入你要搜索的内容',
                            duration: 2000,
                            icon: "none"
                        });
                    } else {
                        search({
                            city_code: this.$store.state.cityCode,
                            keyword: that.inputValue
                        }).then(function (data) {
                            if (data[1].data.data.actors.length < 1) {
                                that.keywordsactors = that.inputValue
                                that.keywordsOnoff = false; //隐藏关键字
                                that.actorsOnoff = false; //隐藏演员信息
                                console.log(data)
                            } else {
                                that.actorsOnoff = true; //显示演员信息
                                that.keywordsOnoff = false; //隐藏关键字
                                that.actorsData = data[1].data.data.actors
                            }
                            if (data[1].data.data.concerts.length >= 1) {
                                that.tipsOnoff = false; //隐藏提示框
                                that.concerts = data[1].data.data.concerts; //将收到的结果赋值
                                that.concertsOnoff = true; //显示搜到的结果
                            } else {
                                that.concertsOnoff = false; //隐藏上一次搜到的结果
                                that.tipsOnoff = true; //显示提示框
                            }

                            that.recommendsOnoff = true;
                            that.recommendsList = data[1].data.data.recommends
                            uni.hideLoading();
                        })
                    }
                }


            }
        }
    }
</script>

<style lang="less">
    .search-container {
        width: 100%;
        overflow: hidden;

        .have-yanyuan {
            width: 670rpx;
            height: 220rpx;
            background: rgba(0, 0, 0, 1);
            border-radius: 10rpx;
            margin: 10px auto 0rpx auto;
            position: relative;

            .have-yanyuan-btn {
                width: 100rpx;
                height: 46rpx;
                background-image: url("https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/indexImg/btn-1.png");
                background-size: 100rpx 46rpx;
                border-radius: 10rpx;
                position: absolute;
                left: 30rpx;
                top: 152rpx;
                text-align: center;
                font-size: 24rpx;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(112, 112, 112, 1);
                line-height: 46rpx;
            }

            .have-bg {
                width: 240rpx;
                height: 220rpx;
                float: right;
            }

            .have-yanyuan-other {
                font-size: 22rpx;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                line-height: 73rpx;
                position: absolute;
                top: 90rpx;
                left: 31rpx;
            }

            .have-yanyuan-name {
                position: absolute;
                top: 40rpx;
                left: 30rpx;
                font-size: 30rpx;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                line-height: 73rpx;
            }
        }

        .yanyuan-container {
            width: 750rpx;
            background: rgba(255, 255, 255, 1);
            position: relative;

            .yanyuan {
                width: 690rpx;
                height: 100%;
                margin: 0 auto;
                border-bottom: 2rpx solid #EEEEEE;
                padding: 30rpx 0rpx;
                box-sizing: border-box;
                -webkit-box-sizing: border-box;

                .guanzhu-btn-active {
                    border: 2rpx solid rgba(255, 70, 87, 1);
                    border-radius: 10rpx;
                    font-size: 24rpx;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(255, 70, 87, 1);
                }

                .guanzhu-btn {
                    width: 144rpx;
                    height: 73rpx;
                    border: 2rpx solid rgba(178, 178, 178, 1);
                    border-radius: 10rpx;
                    line-height: 73rpx;
                    text-align: center;
                    position: absolute;
                    right: 50rpx;
                    top: 60rpx;

                    font-size: 24rpx;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(178, 178, 178, 1);
                }

                .no-guanzhu {
                    border: 2px solid rgba(255, 70, 87, 1);
                    color: rgba(255, 70, 87, 1);
                }

                .yanchu-count {
                    font-size: 24rpx;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(91, 91, 91, 1);
                    line-height: 73rpx;
                    width: 270rpx;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    position: absolute;
                    top: 114rpx;
                    left: 200rpx;
                    display: inline-block;
                }

                .yanyuan-name {
                    position: absolute;
                    left: 200rpx;
                    top: 64rpx;
                    font-size: 32rpx;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(34, 34, 34, 1);
                    line-height: 73rpx;
                }

                .yanyuan-head {
                    width: 140rpx;
                    height: 140rpx;
                    border-radius: 50%;


                }
            }
        }

        .no-yanchu {
            text-align: center;
            font-size: 24rpx;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(91, 91, 91, 1);
            line-height: 99rpx;
        }

        .keyWord-container {
            display: flex;
            padding: 22rpx 40rpx 0rpx 40rpx;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            flex-wrap: wrap;

            .keyWord-btn {
                display: inline-block;
                height: 62rpx;
                background: rgba(246, 246, 246, 1);
                border-radius: 6rpx;
                margin-top: 20rpx;
                text-align: center;
                padding: 0rpx 18rpx;
                margin-left: 20rpx;

                .keyWord-icon {
                    width: 26rpx;
                    height: 26rpx;
                    background: rgba(244, 35, 68, 1);
                    border-radius: 4rpx;
                    text-align: center;
                    line-height: 26rpx;
                    font-size: 18rpx;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(254, 254, 254, 1);
                    vertical-align: middle;
                    padding: 4rpx;
                    box-sizing: border-box;
                    -webkit-box-sizing: border-box;

                }

                .text {
                    font-size: 24rpx;
                    margin-left: 15rpx;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(34, 34, 34, 1);
                    line-height: 62rpx;
                    text-align: center;
                    vertical-align: middle;

                }
            }


        }

        .title {
            width: 750rpx;
            height: 128rpx;
            line-height: 128rpx;
            text-align: center;
            font-size: 30rpx;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #000000;

        }

        .search-head {
            margin-top: 140rpx;
            width: 100%;
            height: 128rpx;
            overflow: hidden;
            position: relative;
            border-bottom: 1rpx solid rgba(246, 246, 246, 1);

            .quxiao {
                font-size: 32rpx;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(34, 34, 34, 1);
                position: absolute;
                right: 39rpx;
                top: 60rpx;
            }

            .search-icon-box {
                width: 52rpx;
                height: 60rpx;
                padding-left: 17rpx;
                position: absolute;
                top: 53rpx;
                left: 40rpx;
                line-height: 60rpx;

                .search-icon {
                    width: 26rpx;
                    height: 26rpx;

                }
            }


            .search-kuang {
                width: 580rpx;
                height: 60rpx;
                background: rgba(235, 235, 235, 1);
                border-radius: 5rpx;
                margin-top: 53rpx;
                margin-left: 40rpx;
                padding-left: 52rpx;
                box-sizing: border-box;
                -webkit-box-sizing: border-box;
                font-size: 24rpx;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(91, 91, 91, 1);
            }
        }
    }
</style>