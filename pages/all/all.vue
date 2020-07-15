<template>
    <view>
        <view>
            <publicHeader title="全部"></publicHeader>
            <view style="width: 100%;height: 200rpx;">

            </view>

        </view>
        <view class="content">
            <!--
            * 广告组件
            * timedown 倒计时时间
            * imageUrl 背景图
            * url 跳转链接
            *  -->
            <!-- #ifndef MP -->
            <!-- <mix-advert ref="mixAdvert" :timedown="8" imageUrl="/static/advert.jpg" :url="advertNavUrl"></mix-advert> -->
            <!-- #endif -->

            <!-- 顶部选项卡 -->
            <view class="box">
                <scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
                    <view v-for="(item,index) in tabBars" :key="item.id" class="nav-item"
                        :class="{current: index === tabCurrentIndex}" :id="'tab'+index" @click="changeTab(index)">
                        {{item.name}}
                    </view>


                </scroll-view>
                <!-- 更多 -->
                <view class="fenlei">
                    <image class="icon"
                        src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/fenlei.png"
                        @click="selectTypeShow" />
                </view>
            </view>

            <view class="hot" @click="maskShow(true)">
                {{showText}}
                <image class=""
                    src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/duobianxing.png"
                    @click="maskShow(true)" />
            </view>
            <view class="hot" @click="openRiLi">
                {{nowTime}}
                <image class=""
                    src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/duobianxing.png"
                    @click.stop="openRiLi" />
            </view>
            <!-- 选择分类弹框 -->
            <selectType :concerttypesData="concerttypesData" v-if="selectTypeOnoff" @selectTypeFn="selectTypeFn">
            </selectType>

            <!-- 下拉刷新组件 -->
            <mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="90" @refresh="onPulldownReresh"
                @setEnableScroll="setEnableScroll">
                <!-- 内容部分 -->
                <swiper id="swiper" class="swiper-box" :current="tabCurrentIndex" @change="changeTab(index,$event)">
                    <swiper-item v-for="(tabItem,indexss) in tabBars" :key="tabItem.id">
                        <scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadMore">
                            <tt :child="child" :allList="allList" :activeIndex="activeIndex" @changeData="changeData"
                                v-if="child!=null && allList!=[]" :current="indexss"></tt>


                            <!-- 
                                * 新闻列表 
                                * 和nvue的区别只是需要把uni标签转为weex标签而已
                                * class 和 style的绑定限制了一些语法，其他并没有不同
                            -->
                            <!-- <view v-for="(item, index) in tabItem.newsList" :key="index" class="news-item"
                                @click="navToDetails(item)">
                                <text :class="['title', 'title'+item.type]">{{item.title}}</text>
                                <view v-if="item.images.length > 0"
                                    :class="['img-list', 'img-list'+item.type, item.images.length === 1 && item.type===3 ? 'img-list-single': '']">
                                    <view v-for="(imgItem, imgIndex) in item.images" :key="imgIndex"
                                        :class="['img-wrapper', 'img-wrapper'+item.type, item.images.length === 1 && item.type===3 ? 'img-wrapper-single': '']">
                                        <image class="img" :src="imgItem"></image>
                                        <view class="video-tip" v-if="item.videoSrc">
                                            <image class="video-tip-icon"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAEC0lEQVRoQ+2ajVEVMRDHdzuwA6ACpQKxArECtQKxAqECoQKhAqECoQKxAqEDrWCdn7Nx8vJy+bp3T4YhM2+O8S7J/rO7//2IKo9k6CPBIU9Acpo0s10ReSkiPA8mtH0tIncicqOqPDcyZmvEhX8rIu8cQI9gtyJyKSIXc0ENA3EAnxxAj/BT356LyEdV/TWyWDcQM3smIgA4mtjwXkQ4aX4Mngj3QkSYy5PfTmb+laoeLg7EzBDga8aEEB4TOVfVAKAoj2sUc+QXQC0PxMzY8Esi3W8ROVbV05FTDHPMDC1AEBzEcqY1AeLMQQxtXANuZvjMa/cb/i6Oqo9kQKCFI1WtLl7bfOq9mUHd3/w9ND1F5f+WKAJxn/gebQiIg1Y/mAEEUsDX8J0zVZ0iljoQZydAYLuMrYCIwXOQrYc2qREzw4E/RAu/X9KcRrUX5mWBODX+jBY/UdXjuZuNznd5PnscepNjtikgODJpRzCp3VFaHBU+MTEOkSDMIJ0hFKyMNSAZbZA2NMUJn7ujqjebABDWyDDnXpqb5YDEvnGvqsHZi7I5CMgBxiHDxRx5bmSYGZlyyADWmCwHBN8IwjdRH5Im3B+En5UIJuYFBeMnjFtV3Y/frwDJmNV+K/1NAGEvIv+pqp7MUU1GthXzSoHE+VSzWRU0EsuOaUDhw+aWmNdKOEiBxOzQlYkWNJIqAiAI0V0dmhkZNvkXYyUkpEDYhFJ17cOaWXQACUtxaPhgc9JpZvFBr+Rg/xNI8B+0w0lXR0LDzUCIoE0bNPpISdC1uJD7uJQVlzTyEIFQgFGhMpo10pVfDfgIwlAiU9s0af4h+gglARkE8WURZ98G/V65Fhal3zgg3qnqXpVK/IMG0/rhAOYExDh9KgZEcqy4DtlEirKpTgutqLjsnk5RnEaLWeaUhiY0srFOS1KxrqVPtTS+2by8xsdsnkONNN5G0pDCQcVmtcaoLYVVV63e0zDo8L+0OVgvrNy84lIXemRiM022CtjynWsabVCwMdpKXQeSOlZXcGwRsPWbJAgyLZvOPOh2UKZWn6xYS0Dibl/IVF+1VoytJ15wbqyCtmkwKdIZGnZZE+9tmbLI4mC8VRuDAG8xpo00sQFDi2iRJrabU2jGBYVVmbMKxJ0/dzfSXeGVzM3ZiRZt2tGsgmDdJiAFMGiHNPxijk+YGV1NsuHgD82aCB82A4lomdohvf8jrQm3s61XbzgzAMJtVXwWOPZhD7F0AXEwnBrqjzv1sRCACnfp/HvIdsNlTbiDn+pgDuVn3UCCxN4wA1Bods+xrr8R26/yuuuULh8p8D0nSzsTE8ldOZcAhttgKsUhAEM+Ujty1xIm1PJfOK7nCh/LM2xaNVDbfv8EZNsnXtvvDyrmF1FIBKIwAAAAAElFTkSuQmCC">
                                            </image>
                                        </view>
                                    </view>
                                </view> -->
                            <!-- 空图片占位 -->
                            <!-- <view v-else class="img-empty"></view>
                                <view :class="['bot', 'bot'+item.type]">
                                    <text class="author">{{item.author}}</text>
                                    <text class="time">{{item.time}}</text>
                                </view>
                            </view> -->

                            <!-- 上滑加载更多组件 -->
                            <!-- <mix-load-more :status="tabItem.loadMoreStatus"></mix-load-more> -->
                        </scroll-view>
                    </swiper-item>
                </swiper>

            </mix-pulldown-refresh>

        </view>

        <!-- 近期热门弹框遮罩 -->
        <view class="mask" v-if="maskOnoff" @click="maskShow(false)">
            <view class="alter" @click.stop="">
                <view :class="index==check?'select-menu select-menu-active':'select-menu'"
                    v-for="(item,index) in selectMenu" :key="index"
                    @click.stop="changeCheck(index,item.title,item.name)">
                    {{item.title}}
                    <image v-if="index==check" class=""
                        src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/gouxuan.png" />
                    <image v-else class=""
                        src="https://novelsys.oss-cn-shenzhen.aliyuncs.com/ticket/static/image/componentImg/tuoyuan.png" />
                </view>
            </view>
        </view>
        <!-- 日历 -->
        <view class="rili" v-show="riliOnoff">
            <calendar mode="2" @callback="getDate" ref="childMethod" @chageTime="chageTime" />
            <view class="btn-container">
                <view class="rest" @click="restFn">
                    重置
                </view>
                <view class="ok" @click="closeAlert">
                    确认
                </view>
            </view>
        </view>
    </view>

</template>

<script>
    import mixAdvert from '@/components/mix-advert/vue/mix-advert';
    import mixPulldownRefresh from '@/components/mix-pulldown-refresh/mix-pulldown-refresh';
    import mixLoadMore from '@/components/mix-load-more/mix-load-more';
    import publicHeader from "../../components/public_header"
    import allBanner from "../../components/allBanner"
    import selectType from "../../components/selectType"
    import allSelect from "@/components/allSelect"
    import tt from "@/components/tt"
    import Calendar from '@/components/mobile-calendar-simple/Calendar.vue'

    import { concerttypes, allpage } from "@/Api/common"

    let windowWidth = 0, scrollTimer = false, tabBar;
    export default {
        components: {
            mixPulldownRefresh,
            mixLoadMore,
            mixAdvert,
            publicHeader,
            allBanner,
            selectType,
            allSelect,
            tt,
            Calendar


        },
        data() {
            return {
                nowTime: '全部时间', //当前时间
                duan: '',
                addWeek: 0,
                riliOnoff: false,
                maskOnoff: false,
                showText: "近期热门",
                check: 0,
                selectMenu: [{
                    title: "近期热门",
                    name: "recent"
                }, {
                    title: "最近开场",
                    name: "upcoming"
                }, {
                    title: "折扣最优",
                    name: "discount"
                }, {
                    title: "距离最近",
                    name: "distance"
                }],
                activeIndex: [['all'], ['all'], ['all'], ['all'], ['all'], ['all'], ['all'], ['all'], ['all'], ['all'], ['all'], ['all']],//控制标签样式
                page: 1, //默认页数
                currentChild: 0,
                allList: [],
                tabCurrentIndex: 0, //当前选项卡索引
                scrollLeft: 0, //顶部选项卡左滑距离
                enableScroll: true,
                tabBars: [],
                current: 0,
                zhuanpiaoguangchang: null,
                concerttypesData: null, //分类信息
                selectTypeOnoff: false,//选择分类弹框
                cityCode: null,
                child: null, //子标签
            }
        },
        computed: {
            advertNavUrl() {
                let data = {
                    title: '测试跳转新闻详情',
                    author: '测试作者',
                    time: '2019-04-26 21:21'
                }
                return `/pages/details/details?data=${JSON.stringify(data)}`;
            }
        },
        async onLoad() {
            this.tabCurrentIndex = this.$store.state.currentIndex;
            this.endDate = this.endDateFn();
            this.startDate = this.startDateFn();


            console.log(this.$store.state.cityCode)
            uni.showLoading({
                title: '加载中'
            });


            // 获取屏幕宽度
            windowWidth = uni.getSystemInfoSync().windowWidth;
            const that = this;
            // 分类信息
            concerttypes().then(function (data) {
                that.concerttypesData = data[1].data.data;
                console.log(that.concerttypesData)
                that.loadTabbars(that.concerttypesData);
                // that.child = that.tabBars[0].children
                that.child = [];
                that.tabBars.forEach(function (el, index) {
                    that.child.push(el.children);
                })
                //请求数据
                allpage({
                    city_code: that.$store.state.cityCode,
                    type_id: that.tabBars[that.tabCurrentIndex].id,
                    // type_sub_id: this.$store.state.typesubid,
                    sort: that.$store.state.type,
                    start_at_rang: that.$store.state.timeDuan

                }).then(function (data) {
                    that.$set(that.allList, that.tabCurrentIndex, data[1].data.data)
                    uni.hideLoading()
                })

            })
        },
        onReady() {
            // #ifndef MP
            this.$refs.mixAdvert.initAdvert();
            // #endif
        },
        onShow() {
            console.log(123)
            this.tabCurrentIndex = this.$store.state.currentIndex;

        },
        onTabItemTap: function (e) {
            console.log(e);
            // e的返回格式为json对象： {"index":0,"text":"首页","pagePath":"pages/index/index"}
        },
        watch: {
            "$store.state.timeDuan": function (newValue, older) {

                let that = this;
                that.allList = [];
                uni.showLoading({
                    title: '加载中'
                });
                allpage({
                    city_code: this.$store.state.cityCode,
                    type_id: this.tabBars[this.tabCurrentIndex].id,
                    type_sub_id: this.$store.state.typesubid,
                    sort: this.$store.state.type,
                    start_at_rang: this.$store.state.timeDuan
                }).then(function (data) {
                    that.$set(that.allList, that.currentChild, data[1].data.data)
                    console.log(data)
                    uni.hideLoading()
                })
            },
            "$store.state.cityCode": function (newValue, older) {
                uni.showLoading({
                    title: '加载中'
                });
                this.allList = [];
                this.loadNewsList('refresh');
                console.log("出发了额")
            },
            "$store.state.type": function (newValue, older) {
                let that = this;
                that.allList = [];
                uni.showLoading({
                    title: '加载中'
                });
                if (newValue == 'distance') {
                    allpage({
                        city_code: this.$store.state.cityCode,
                        type_id: this.tabBars[this.tabCurrentIndex].id,
                        type_sub_id: this.$store.state.typesubid,
                        sort: this.$store.state.type,
                        start_at_rang: this.$store.state.timeDuan
                    }).then(function (data) {
                        //拿经度和纬度
                        wx.getLocation({
                            success: function (res) {
                                data[1].data.data.forEach(function (el, index) {
                                    let juli = Math.ceil(that.getDistance(res.latitude, res.longitude, el.venue.latitude, el.venue.longitude))
                                    el["juli"] = juli;
                                })
                                data[1].data.data.sort(function (a, b) {
                                    if (a['juli'] < b['juli']) {
                                        return -1;
                                    } else if (a['juli'] == b['juli']) {
                                        return 0;
                                    } else {
                                        return 1;
                                    }
                                });
                                that.$set(that.allList, that.currentChild, data[1].data.data)
                            }
                        })
                        console.log(data)
                        uni.hideLoading()
                    })
                } else {
                    allpage({
                        city_code: this.$store.state.cityCode,
                        type_id: this.tabBars[this.tabCurrentIndex].id,
                        type_sub_id: this.$store.state.typesubid,
                        sort: this.$store.state.type,
                        start_at_rang: this.$store.state.timeDuan

                    }).then(function (data) {
                        that.$set(that.allList, that.currentChild, data[1].data.data)
                        console.log(data)
                        uni.hideLoading()
                    })
                }


            }
        },
        methods: {
            // 改变时间
            chageTime(newValue) {
                this.duan = newValue;
            },
            closeAlert() {
                this.$store.commit('changeTimeDuan', this.duan)
                if (this.duan == '') {
                    this.nowTime = '全部时间'
                } else {
                    this.nowTime = this.duan;
                }
                this.riliOnoff = false;
            },
            //清除时间 时 分 秒 毫秒
            resetTime(dateStr) {
                var date = new Date(dateStr.replace(/-/g, '/'))
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
                return date * 1;
            },
            // 结束时间
            endDateFn() {
                var temp = new Date().getTime() + 24 * 60 * 60 * 1000
                var date = new Date(temp)
                const year = date.getFullYear(),
                    month = date.getMonth() + 1,
                    day = date.getDate()
                return year + '/' + month + '/' + day
            },
            // 开始时间
            startDateFn() {
                const year = new Date().getFullYear(),
                    month = new Date().getMonth() + 1,
                    day = new Date().getDate()
                return year + '/' + month + '/' + day
            },
            //获取回调的日期数据
            getDate(date) {
                this.duan = date.startStr.dateStr + " - " + date.endStr.dateStr;
            },
            restFn() {
                this.$refs.childMethod.childMethod();
                this.duan = '';
                this.$store.commit('changeTimeDuan', '')
                // console.log(123)
                // this.startDate = this.resetTime(this.startDateFn());
                // this.endDate = this.resetTime(this.endDateFn());
            },
            // 关闭日历
            closeRiLi(status) {
                this.riliOnoff = status;
            },
            // 打开日历
            openRiLi() {
                this.riliOnoff = true;
            },
            datechange(e) {
                console.log(e);
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
            //显示近期热门弹框
            maskShow(status) {
                this.maskOnoff = status;
            },
            // 选择弹框
            changeCheck(index, text, name) {
                this.check = index;
                this.showText = text;
                this.maskOnoff = false;
                this.$store.commit("changeType", name)
            },
            changeData(id, index, indexs) {
                this.$store.commit("changeTypesubid", id)
                let that = this;
                uni.showLoading({
                    title: '加载中'
                });
                console.log("已经执行了")
                that.activeIndex[this.tabCurrentIndex] = indexs;
                console.log(that.activeIndex[this.tabCurrentIndex])
                // 标签请求数据
                allpage({
                    city_code: this.$store.state.cityCode,
                    type_id: this.tabBars[this.tabCurrentIndex].id,
                    type_sub_id: id,
                    sort: this.$store.state.type,
                    start_at_rang: this.$store.state.timeDuan

                }).then(function (data) {
                    that.$set(that.allList, that.currentChild, data[1].data.data)
                    uni.hideLoading()
                })
                // allpage({
                //     city_code: this.$store.state.cityCode,
                //     type_id: this.tabBars[this.tabCurrentIndex].id,
                //     type_sub_id: id,
                // }).then(function (data) {
                //     console.log(that.currentChild)
                //     console.log(data[1].data.data)
                //     that.$set(that.allList, that.currentChild, data[1].data.data)
                //     uni.hideLoading()
                // })
                console.log(id, index)
            },
            selectTypeShow() {
                this.selectTypeOnoff = true;
            },
            // 子组件调用父级函数控制选择分类弹框
            selectTypeFn(status, index) {
                this.selectTypeOnoff = status;
                if (index != undefined) {
                    this.tabCurrentIndex = index + 1;
                    this.$store.commit("changeCurrentIndex", this.tabCurrentIndex);

                }
            },
            // 轮播图显示位置
            currentIndex(index) {
                if (index == 'all') {
                    this.current = 0;
                } else {
                    this.current = index + 1;
                }
            },
			/**
			 * 数据处理方法在vue和nvue中通用，可以直接用mixin混合
			 * 这里直接写的
			 * mixin使用方法看index.nuve
			 */
            //获取分类
            loadTabbars(data) {
                let tabList = data;
                tabList.forEach(item => {
                    item.newsList = [];
                    item.loadMoreStatus = 0;  //加载更多 0加载前，1加载中，2没有更多了
                    item.refreshing = 0;
                })
                this.tabBars = [{
                    children: [],
                    icon: "",
                    id: "all",
                    index_icon: "",
                    level: "",
                    loadMoreStatus: 0,
                    name: "全部",
                }]
                this.tabBars = this.tabBars.concat(tabList);
                // this.loadNewsList('add');
            },
            //新闻列表
            loadNewsList(type) {
                let that = this;
                if (type == 'refresh') {
                    this.page = 1;
                    //请求数据
                    allpage({
                        city_code: this.$store.state.cityCode,
                        type_id: this.tabBars[this.tabCurrentIndex].id,
                        // type_sub_id: this.$store.state.typesubid,
                        sort: this.$store.state.type,
                        start_at_rang: this.$store.state.timeDuan

                    }).then(function (data) {
                        that.$set(that.allList, that.currentChild, data[1].data.data)
                        uni.hideLoading()
                        console.log(that.allList)
                    })
                }
                let tabItem = this.tabBars[this.tabCurrentIndex];
                //type add 加载更多 refresh下拉刷新
                if (type === 'add') {
                    console.log("加载更多")
                    let that = this;
                    //请求数据
                    if (this.$store.state.type == 'distance') {
                        allpage({
                            city_code: this.$store.state.cityCode,
                            type_id: this.tabBars[this.tabCurrentIndex].id,
                            // type_sub_id: this.$store.state.typesubid,
                            sort: this.$store.state.type,
                            start_at_rang: this.$store.state.timeDuan

                        }).then(function (data) {
                            if (data[1].data.data.length >= 1) {
                                that.allList[that.tabCurrentIndex] = data[1].data.data;
                            }
                        })
                    } else {
                        allpage({
                            city_code: this.$store.state.cityCode,
                            type_id: this.tabBars[this.tabCurrentIndex].id,
                            // type_sub_id: this.$store.state.typesubid,
                            sort: this.$store.state.type,
                            page: ++that.page,
                            start_at_rang: this.$store.state.timeDuan

                        }).then(function (data) {
                            if (data[1].data.data.length >= 1) {
                                that.allList[that.tabCurrentIndex] = that.allList[that.tabCurrentIndex].concat(data[1].data.data);
                            }
                        })
                    }

                }
                // #ifdef APP-PLUS
                else if (type === 'refresh') {
                    tabItem.refreshing = true;

                }
                // #endif

                //setTimeout模拟异步请求数据
                setTimeout(() => {
                    //下拉刷新 关闭刷新动画
                    if (type === 'refresh') {
                        this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
                        // #ifdef APP-PLUS
                        tabItem.refreshing = false;
                        // #endif
                        tabItem.loadMoreStatus = 0;
                    }
                    //上滑加载 处理状态
                    if (type === 'add') {
                        tabItem.loadMoreStatus = 2;
                    }
                }, 600)
            },
            //下拉刷新
            onPulldownReresh() {
                this.loadNewsList('refresh');
                console.log("我下拉执行的")
                this.activeIndex[this.tabCurrentIndex] = "all"
                this.$store.commit("changeType", "recent")
                this.showText = "近期热门";
                this.$store.commit("changeTypesubid", "");

            },
            //上滑加载
            loadMore() {
                this.loadNewsList('add');
            },
            //设置scroll-view是否允许滚动，在小程序里下拉刷新时避免列表可以滑动
            setEnableScroll(enable) {
                if (this.enableScroll !== enable) {
                    this.enableScroll = enable;
                }
            },

            //tab切换
            async changeTab(indexs, e) {
                let that = this;
                if (scrollTimer) {
                    //多次切换只执行最后一次
                    clearTimeout(scrollTimer);
                    scrollTimer = false;
                }
                let index = indexs;
                //e=number为点击切换，e=object为swiper滑动切换
                if (typeof e === 'object') {
                    index = e.detail.current
                }
                if (typeof tabBar !== 'object') {
                    tabBar = await this.getElSize("nav-bar")
                }
                //计算宽度相关
                let tabBarScrollLeft = tabBar.scrollLeft;
                let width = 0;
                let nowWidth = 0;
                //获取可滑动总宽度
                for (let i = 0; i <= index; i++) {
                    let result = await this.getElSize('tab' + i);
                    width += result.width;
                    if (i === index) {
                        nowWidth = result.width;
                    }
                }
                if (typeof indexs != "undefined") {
                    // 点击
                    //点击切换时先切换再滚动tabbar，避免同时切换视觉错位
                    this.tabCurrentIndex = index;
                    this.$store.commit("changeCurrentIndex", this.tabCurrentIndex);
                }
                if (typeof indexs == "undefined") {
                    this.currentChild = index;
                    console.log(indexs);
                    console.log(that.allList[index])
                    if (that.allList[index] == undefined) {
                        uni.showLoading({
                            title: '加载中'
                        });

                        //请求数据
                        allpage({
                            city_code: this.$store.state.cityCode,
                            type_id: that.tabBars[index].id,
                            // type_sub_id: this.$store.state.typesubid,
                            sort: this.$store.state.type,
                            start_at_rang: this.$store.state.timeDuan

                        }).then(function (data) {
                            that.$set(that.allList, that.currentChild, data[1].data.data)
                            console.log(that.allList)
                            uni.hideLoading()
                        })
                    }


                    // console.log("在滑动里面请求数据", indexs, index, that.tabBars[index])

                }
                //延迟300ms,等待swiper动画结束再修改tabbar
                scrollTimer = setTimeout(() => {
                    if (width - nowWidth / 2 > windowWidth / 2) {
                        //如果当前项越过中心点，将其放在屏幕中心
                        this.scrollLeft = width - nowWidth / 2 - windowWidth / 2;
                    } else {
                        this.scrollLeft = 0;
                    }
                    if (typeof e === 'object') {
                        //滑动
                        // console.log("我是滑动触发")
                        this.tabCurrentIndex = e.detail.current;
                        this.$store.commit("changeCurrentIndex", this.tabCurrentIndex);
                    }
                    // console.log(this.tabCurrentIndex)
                    //第一次切换tab，动画结束后需要加载数据
                    let tabItem = this.tabBars[this.tabCurrentIndex];
                    if (this.tabCurrentIndex !== 0 && tabItem.loaded !== true) {
                        // this.loadNewsList('add');
                        tabItem.loaded = true;
                    }
                }, 300)

            },
            //获得元素的size
            getElSize(id) {
                return new Promise((res, rej) => {
                    let el = uni.createSelectorQuery().select('#' + id);
                    el.fields({
                        size: true,
                        scrollOffset: true,
                        rect: true
                    }, (data) => {
                        res(data);
                    }).exec();
                });
            },
        }
    }
</script>

<style lang='scss'>
    page,
    .content {
        background-color: white;
        height: 100%;
        overflow: hidden;

        .placeholder {
            width: 100%;
            height: 200rpx;
        }
    }

    .rili {
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        position: fixed;
        top: 150rpx;
        padding-top: 50rpx;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        border-radius: 8rpx;

        .btn-container {
            width: 691rpx;
            height: 150rpx;
            background: white;
            padding: 20rpx 37rpx;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            margin: 0 auto;
            position: absolute;
            left: 50%;
            margin-left: -346rpx;
            top: 882rpx;

            .rest {
                line-height: 80rpx;
                width: 194rpx;
                text-align: center;
                display: inline-block;
                font-size: 26rpx;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(178, 178, 178, 1);
                background-color: white;
                border: 1rpx solid #d6d6d6;
                border-radius: 5rpx;
            }

            .ok {
                width: 400rpx;
                line-height: 80rpx;
                text-align: center;
                display: inline-block;
                font-size: 26rpx;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: white;
                border-radius: 5rpx;
                background-color: #FF4657;
                margin-left: 20rpx;
            }
        }
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

    .hot {
        font-size: 28rpx;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(34, 34, 34, 1);
        line-height: 73rpx;
        padding: 0 19rpx;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        background: white;
        display: inline-block;

        image {
            width: 13rpx;
            height: 9rpx;
            margin-left: 10rpx;
            vertical-align: middle;
        }
    }


    .box {
        overflow: hidden;
        position: relative;

        .fenlei {
            width: 70rpx;
            position: absolute;
            z-index: 11;
            right: 0rpx;
            background: white;
            height: 100%;
            top: 0rpx;
            line-height: 100rpx;
            padding-left: 15rpx;

            .icon {
                width: 36rpx;
                height: 27rpx;
                vertical-align: middle;
            }
        }
    }

    /* 顶部tabbar */
    .nav-bar {
        position: relative;
        z-index: 10;
        height: 90rpx;
        white-space: nowrap;
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, .06);
        background-color: #fff;
        padding-top: 25rpx;
        padding-right: 100rpx;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        overflow: hidden;



        .nav-item {
            display: inline-block;
            text-align: center;
            position: relative;
            font-size: 28rpx;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(137, 137, 137, 1);
            line-height: 56rpx;
            margin-left: 20rpx;
            overflow: hidden;

            &:after {
                content: '';
                width: 0;
                height: 0;
                border-bottom: 4rpx solid #FF4657;
                position: absolute;
                left: 50%;
                bottom: 0;
                transform: translateX(-50%);
                transition: .3s;
            }
        }

        .current {
            font-size: 36rpx;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: rgba(34, 34, 34, 1);
            line-height: 56rpx;

            &:after {
                width: 100%;
            }
        }
    }

    .swiper-box {
        background-color: white;
        height: 100%;
    }

    .panel-scroll-box {
        height: 100%;

        .panel-item {
            background: #fff;
            padding: 30px 0;
            border-bottom: 2px solid #000;
        }
    }

    /**
	 * 新闻列表 直接拿的nvue样式修改，,
	 * 一共需要修改不到10行代码, 另外px需要直接修改为rpx，只有单位不一样，计算都是一样的
	 * 吐槽：难道不能在编译的时候把nuve中的rpx转为px? 这样就不用修改单位了
	 */
    .video-wrapper {
        width: 100%;
        height: 440rpx;

        .video {
            width: 100%;
        }
    }

    view {}

    .img {
        width: 100%;
        height: 100%;
    }



    /* 修改结束 */


    .title {
        font-size: 32rpx;
        color: #303133;
        line-height: 46rpx;
    }

    .bot {
        flex-direction: row;
    }

    .author {
        font-size: 26rpx;
        color: #aaa;
    }

    .time {
        font-size: 26rpx;
        color: #aaa;
        margin-left: 20rpx;
    }

    .img-list {
        flex-shrink: 0;
        flex-direction: row;
        background-color: #fff;
        width: 220rpx;
        height: 140rpx;
    }

    .img-wrapper {
        flex: 1;
        flex-direction: row;
        height: 140rpx;
        position: relative;
        overflow: hidden;
    }

    .img {
        flex: 1;
    }

    .img-empty {
        height: 20rpx;
    }

    /* 图在左 */
    .img-list1 {
        position: absolute;
        left: 30rpx;
        top: 24rpx;
    }

    .title1 {
        padding-left: 240rpx;
    }

    .bot1 {
        padding-left: 240rpx;
        margin-top: 20rpx;
    }

    /* 图在右 */
    .img-list2 {
        position: absolute;
        right: 30rpx;
        top: 24rpx;
    }

    .title2 {
        padding-right: 210rpx;
    }

    .bot2 {
        margin-top: 20rpx;
    }

    /* 底部3图 */
    .img-list3 {
        width: 700rpx;
        margin: 16rpx 0rpx;
    }

    .img-wrapper3 {
        margin-right: 4rpx;
    }

    /* 底部大图 */
    .img-list-single {
        width: 690rpx;
        height: 240rpx;
        margin: 16rpx 0rpx;
    }

    .img-wrapper-single {
        height: 240rpx;
        margin-right: 0rpx;
    }

    .video-tip {
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .3);
    }

    .video-tip-icon {
        width: 60rpx;
        height: 60rpx;
    }
</style>