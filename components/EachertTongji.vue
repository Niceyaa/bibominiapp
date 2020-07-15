<template>
    <!-- 折线图 -->
    <view class="qiun-columns">

        <view class="qiun-charts">
            <view class="title">
                <view class="xian">
                </view>
                票面走势
            </view>
            <view class="nav">
                <view :class="activeIndex==index?'select active':'select'" @click="change(index)"
                    v-for="(item,index) in zoushixian" :key="index">
                    {{item.name}}
                    <view :class="activeIndex==index?'border':''">

                    </view>
                </view>
            </view>
            <canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"
                @touchmove="moveLineA"></canvas>
        </view>
    </view>
</template>

<script>
    import uCharts from '../u-charts/u-charts.min.js';
    var _self;
    var canvaLineA = null;
    export default {
        data() {
            return {

                cWidth: '',
                cHeight: '',
                pixelRatio: 1,
                serverData: '',
                arrs: [],
                prices: [],
                max: 0,
                activeIndex: 0,
            }
        },
        mounted() {
            let that = this;
            this.zoushixian.forEach(function (el, index) {
                that.arrs[index] = [];
                that.prices[index] = [];

                el.price_logs.forEach(function (els, indexs) {

                    if (that.max < (els.price / 100)) {
                        that.max = els.price / 100
                    }
                    that.prices[index].push(els.price / 100);
                    that.arrs[index].push(that.timers(els.created_at));
                    console.log(that.max)
                })
                if (el.price_logs.length == 1) {
                    that.prices[index].push(el.price_logs[0].price / 100);
                    that.arrs[index].push(that.timers(el.price_logs[0].created_at));
                }
            })


            _self = this;
            this.cWidth = uni.upx2px(750);
            this.cHeight = uni.upx2px(500);
            this.getServerData({
                categories: that.arrs[0],
                series: [{
                    color: '#ED1829',
                    legendShape: "triangle",
                    pointShape: "circle",
                    show: true,
                    type: "area",
                    name: '票面走势',
                    data: that.prices[0]
                }]
            });
        },
        props: {
            zoushixian: {
                type: Array
            }
        },
        methods: {
            //格式化时间
            timers(value) {
                let time = new Date(value * 1000)
                let year = time.getFullYear();
                let month = time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1;
                let date = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
                let hour = time.getHours();
                let fen = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
                let second = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
                return month + "-" + date
            },
            change(index) {
                let that = this;
                that.activeIndex = index;
                let LineA = {
                    categories: that.arrs[index],
                    series: [{
                        color: '#ED1829',
                        legendShape: "triangle",
                        pointShape: "circle",
                        show: true,
                        type: "area",
                        name: '票面走势',
                        data: that.prices[index],
                    }]
                };
                this.getServerData(LineA)
            },
            getServerData(data) {
                _self.showLineA("canvasLineA", data);

            },
            showLineA(canvasId, chartData) {
                let that = this;
                canvaLineA = new uCharts({
                    $this: _self,
                    canvasId: canvasId,
                    type: 'area',
                    fontSize: 11,
                    legend: {
                        show: false,
                        itemGap: 2
                    },
                    dataLabel: false,
                    dataPointShape: false,
                    background: '#222222',
                    pixelRatio: _self.pixelRatio,
                    categories: chartData.categories,
                    series: chartData.series,
                    animation: true,
                    enableScroll: true,
                    padding: [-10, 20, 0, 10],
                    xAxis: {
                        boundaryGap: "0",
                        disableGrid: true,
                        type: 'grid',
                        dashLength: 8,
                        gridColor: '#222222',
                        itemCount: 4,//x轴单屏显示数据的数量，默认为5个
                        scrollShow: false,//新增是否显示滚动条，默认false
                        scrollAlign: 'left',//滚动条初始位置
                        scrollBackgroundColor: '#222222',//默认为 #EFEBEF
                        scrollColor: '#222222',//默认为 #A6A6A6
                        axisLine: false

                    },
                    yAxis: {
                        disableGrid: true,
                        data: [
                            {
                                axisLine: false,
                                gridColor: '#222222',
                                dashLength: 0,
                                splitNumber: 6,
                                min: 0,
                                max: that.max * 2,
                                format: (val) => { return "￥" + val },
                            }

                        ],

                    },
                    width: _self.cWidth * _self.pixelRatio,
                    height: _self.cHeight * _self.pixelRatio,
                    extra: {
                        area: {
                            type: 'curve',
                            opacity: 0.5,
                            addLine: true,
                            width: 2,
                            gradient: true
                        }
                    }
                });

            },
            touchLineA(e) {
                e.stopPropagation();
                e.cancelBubble = true
                canvaLineA.scrollStart(e);
            },
            moveLineA(e) {
                canvaLineA.scroll(e);
            },
            touchEndCandle(e) {
                //下面是toolTip事件，如果滚动后不需要显示，可不填写
                canvaLineA.showToolTip(e, {
                    format: function (item, category) {
                        return category + ' ' + item.name + ':' + item.data
                    }
                });
            },
        }
    }
</script>

<style lang="less">
    /*样式的width和height一定要与定义的cWidth和cHeight相对应*/
    .qiun-charts {
        width: 670upx;
        margin: 60upx auto 0 auto;
        height: 725rpx;
        background-color: #222222;
        overflow: hidden;
        border-radius: 10px;

        .xian {
            display: inline-block;
            width: 5upx;
            height: 37upx;
            background: rgba(255, 255, 255, 1);
            margin: 0 27upx;
        }

        .nav {
            display: flex;
            justify-content: left;
            height: 58upx;
            padding-left: 65upx;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;

            .active {
                font-size: 28upx;
                font-family: PingFang SC;
                font-weight: 500;
                color: white !important;
            }

            .select {
                width: auto;
                padding: 0 30rpx;
                height: 21upx;
                font-size: 24upx;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                line-height: 52upx;
            }

            .border {
                width: 45upx;
                height: 18upx;
                background: linear-gradient(90deg, rgba(237, 24, 41, 1) 0%, rgba(34, 34, 34, 1) 100%);
                margin-left: 50rpx;
                margin-top: -20rpx;

            }
        }

        .title {
            height: 136upx;
            width: 100%;
            font-size: 36upx;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 136upx;
        }
    }

    .charts {
        margin-top: 58upx;
        width: 670upx;
        margin: 0 auto;
        height: 591upx;
    }
</style>