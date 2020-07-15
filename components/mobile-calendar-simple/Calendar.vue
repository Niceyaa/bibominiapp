<template>
    <div class="calendar">
        <view class="select">
            <view :class="selectStatus==1?'select-content-active select-content':'select-content'" @click="weekNei">
                一周内
            </view>
            <view :class="selectStatus==2?'select-content-active select-content':'select-content'" @click="monthNei">
                一月内
            </view>
            <view :class="selectStatus==3?'select-content-active select-content':'select-content'" @click="weekMo">
                本周末
            </view>
        </view>
        <div class="header">
            <div class="week-number">
                <span v-for="(item,index) in weekList" :style="{color:(index==0||index==weekList.length-1)&&themeColor}"
                    :key="index">{{item}}</span>
            </div>
            <p class="tips" v-if="title">{{title}}</p>
        </div>
        <div class="content" v-for="(item,index) in calendar" :key="index">
            <h3 v-text="item.year + '年' + item.month + '月'"></h3>
            <ul class="each-month">
                <li class="each-day" v-for="(day,idx) in item.dayList" :key="idx"
                    :class="[addClassBg(day, item.month, item.year)]"
                    :style="{background:themeOpacityBg(day, item.month, item.year)}"
                    @click="chooseDate(day, item.month, item.year)">
                    <div :class="[addClassName(day, item.month, item.year),{'trip-time': isCurrent(day, item.month, item.year)},{'trip-times': isCurrents(day, item.month, item.year)},(startDatesTest?'defaultStyle':'')]"
                        :style="{background:themeBg(day, item.month, item.year)}">
                        <text v-if="day==days && years==item.year && months==item.month">
                            {{day==days?'今天':day}}
                        </text>
                        <text v-else>
                            {{day?day:''}}
                        </text>
                    </div>
                    <!-- <span class="recent" :style="{color:themeColor}" v-text="setTip(day, item.month, item.year)"></span> -->
                </li>
            </ul>
        </div>
        <slot>

        </slot>

    </div>
</template>

<script>
    import { allpage } from "@/Api/common"
    export default {
        props: {
            title: {
                type: [String, Object],
                default() {
                    return ''
                }
            },
            mode: {
                type: [String, Number],
                default() {
                    return 1
                }
            },
            startDate: { //开始日期
                type: [String, Object, Date],
                default() {
                    const year = new Date().getFullYear(),
                        month = new Date().getMonth() + 1,
                        day = new Date().getDate()
                    return year + '/' + month + '/' + day
                }
            },
            endDate: { //结束日期
                type: [String, Object, Date],
                default() {
                    var date = new Date()
                    const year = date.getFullYear(),
                        month = date.getMonth() + 1,
                        day = date.getDate()
                    return year + '/' + month + '/' + day
                }
            },
            betweenStart: { //日历可选范围开始
                type: [String, Object, Date],
                default() {
                    return ''
                }
            },
            betweenEnd: { //日历可选结束日期
                type: [String, Object, Date],
                default() {
                    return ''
                }
            },
            initMonth: {//初始化的月数
                type: [String, Number],
                default() {
                    return 12
                }
            },
            themeColor: {//主题色
                type: [String],
                default: ''
            }
        },
        data() {
            return {
                startDatesTest: '',
                selectStatus: '',
                startDates: '',
                endDates: '',
                test: "11",
                betweenStarts: '',
                betweenEnds: '',
                calendar: [],
                weekList: ['日', '一', '二', '三', '四', '五', '六'],
                days: null,
                years: null,
                months: null,
            }
        },
        mounted() {
            this.init();
            let timers = new Date();
            this.days = timers.getDate();
            this.years = timers.getFullYear();
            this.months = timers.getMonth() + 1;
            console.log(this.days)
        },
        computed: {
            //theme
            getBetweenColor() {
                if (!this.themeColor) return
                var hex = this.themeColor
                if (hex.length == 4) {
                    hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
                }
                var str = "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" +
                    hex.slice(5, 7)) + ",0.1)";
                return str
            },
        },
        methods: {
            // 传入时间段改变状态
            timerDuan(startDates, endDates) {
                let startTime = new Date(this.startDates)
                let endTime = new Date(this.endDates)
                let startYear = startTime.getFullYear();
                let startMonth = (startTime.getMonth() + 1) < 10 ? "0" + (startTime.getMonth() + 1) : (startTime.getMonth() + 1);
                let startDay = startTime.getDate() < 10 ? "0" + startTime.getDate() : startTime.getDate();

                let endYear = endTime.getFullYear();
                let endMonth = (endTime.getMonth() + 1) < 10 ? "0" + (endTime.getMonth() + 1) : (endTime.getMonth() + 1);
                let endDay = endTime.getDate() < 10 ? "0" + endTime.getDate() : endTime.getDate();
                let duan = startYear + "-" + startMonth + '-' + startDay + ' - ' + endYear + "-" + endMonth + '-' + endDay;
                this.$store.commit('changeTimeDuan', duan);
                this.$emit('chageTime', duan)
            },
            childMethod() {
                this.startDatesTest = true;
                const year = new Date().getFullYear(),
                    month = new Date().getMonth() + 1,
                    day = new Date().getDate()
                let starts = year + '/' + month + '/' + day
                let suns = year + '/' + month + '/' + day;
                this.startDates = this.resetTime(starts)
                this.endDates = this.resetTime(suns)
            },
            // 周末
            weekMo() {
                this.selectStatus = 3;
                let _date = new Date();
                let _nowTime = _date.getTime();
                let _week = _date.getDay();
                let _dayLongTime = 24 * 60 * 60 * 1000;
                let _furtureSundayTimes = _nowTime + (7 - _week) * _dayLongTime;
                let _furtureSaturdayTimes = _nowTime + (6 - _week) * _dayLongTime;
                _furtureSundayTimes = new Date(_furtureSundayTimes);
                _furtureSaturdayTimes = new Date(_furtureSaturdayTimes);
                // staurday
                let _satYear = _furtureSaturdayTimes.getFullYear();
                let _satMonth = _furtureSaturdayTimes.getMonth() + 1;
                let _satDay = _furtureSaturdayTimes.getDate();
                //sunday
                let _sunYear = _furtureSundayTimes.getFullYear();
                let _sunMonth = _furtureSundayTimes.getMonth() + 1;
                let _sunDay = _furtureSundayTimes.getDate();
                let starts = _satYear + "/" + _satMonth + "/" + _satDay
                let suns = _sunYear + "/" + _sunMonth + "/" + _sunDay


                this.startDates = this.resetTime(starts)
                this.endDates = this.resetTime(suns)
                this.timerDuan(this.startDates, this.endDates)
            },
            // 月内
            monthNei() {
                this.selectStatus = 2;
                this.selectedDate = '';
                let time = new Date();
                let year = time.getFullYear();
                let month = time.getMonth() + 1;
                let date = time.getDate();
                var maxDate = new Date(year, month, 0);
                let yuefen = maxDate.getFullYear() + "/" + (maxDate.getMonth() + 1) + "/" + maxDate.getDate()
                this.startDates = this.resetTime(year + '/' + month + '/' + date)
                this.endDates = this.resetTime(yuefen)
                this.timerDuan(this.startDates, this.endDates)
            },
            // 周内
            weekNei() {
                this.selectStatus = 1;
                let _date = new Date();
                let _nowTime = _date.getTime();
                let _week = _date.getDay();
                this.startDates = this.resetTime(_date.getFullYear() + '/' + (_date.getMonth() + 1) + '/' + _date.getDate());
                let _dayLongTime = 24 * 60 * 60 * 1000;
                let _furtureSundayTimes = _nowTime + (7 - _week) * _dayLongTime;
                let _furtureSaturdayTimes = _nowTime + (6 - _week) * _dayLongTime;
                _furtureSundayTimes = new Date(_furtureSundayTimes);
                _furtureSaturdayTimes = new Date(_furtureSaturdayTimes);
                // staurday
                let _satYear = _furtureSaturdayTimes.getFullYear();
                let _satMonth = _furtureSaturdayTimes.getMonth() + 1;
                let _satDay = _furtureSaturdayTimes.getDate();
                //sunday
                let _sunYear = _furtureSundayTimes.getFullYear();
                let _sunMonth = _furtureSundayTimes.getMonth() + 1;
                let _sunDay = _furtureSundayTimes.getDate();
                this.endDates = this.resetTime(_sunYear + '/' + _sunMonth + '/' + _sunDay)
                this.timerDuan(this.startDates, this.endDates)
            },
            init() {
                this.year = new Date().getFullYear()
                this.month = new Date().getMonth() + 1
                this.day = new Date().getDate()
                this.today = new Date(this.year + '/' + this.month + '/' + this.day) * 1
                if (this.mode == 1) {//普通模式不提供默认值，第一次让用户选择日期
                    this.startDates = ''
                    this.endDates = ''
                } else {//酒店和往返模式提供默认值
                    console.log(this.startDate)
                    this.startDates = this.resetTime(this.startDate)
                    this.endDates = this.resetTime(this.endDate)
                    console.log(this.startDates)
                }

                this.betweenStarts = this.resetTime(this.betweenStart)
                this.betweenEnds = this.resetTime(this.betweenEnd)
                this.startDatesTest = true;
                this.createClendar(); //创建日历数据
            },
            //创建每个月日历数据，传入月份1号前面用null填充
            createDayList(month, year) {
                const count = this.getDayNum(month, year),
                    _week = new Date(year + '/' + month + '/1').getDay();
                let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]

                for (let i = 29; i <= count; i++) {
                    list.push(i)
                }
                for (let i = 0; i < _week; i++) {
                    list.unshift(null)
                }
                return list;
            },
            //计算传入月份有多少天
            getDayNum(month, year) {
                let dayNum = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

                if ((year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0)) {
                    dayNum[1] = 29;
                }
                return dayNum[month - 1]
            },
            //根据当天和结束日期创建日历数据
            createClendar() {
                var yearTemp = this.year
                var monthTemp = this.month
                if (!!this.betweenStarts) {//如果有范围起始日期，可选范围从betweenStart开始
                    yearTemp = new Date(this.betweenStarts).getFullYear()
                    monthTemp = new Date(this.betweenStarts).getMonth() + 1
                }
                for (let i = 0; i < this.initMonth; i++) {
                    let year = yearTemp
                    let month = monthTemp + i
                    let _monthData = {
                        dayList: [],
                        month: '',
                        year: ''
                    };

                    var m = Math.ceil(month / 12)
                    if (m > 0) {
                        year += m - 1
                    } else {
                        year += m - 1
                    }
                    if (month > 12) {
                        month = month % 12 == 0 ? 12 : month % 12;
                    }
                    if (month <= 0) {
                        month = 12 + month % 12
                    }

                    _monthData.year = year;
                    _monthData.month = month;
                    _monthData.dayList = this.createDayList(month, year);
                    this.calendar.push(_monthData)
                }
            },
            //添加日历样式
            addClassName(day, month, year) {
                if (!day) return
                const _date = new Date(year + '/' + month + '/' + day)
                let className = []
                // if (_date.getDay() == 0 || _date.getDay() == 6) { //周末或周六样式
                //     className.push('weekend')
                // }
                if (_date * 1 == this.today) {
                    className.push('today');
                }
                if (this.betweenStarts) {
                    (_date * 1 < this.betweenStarts) && className.push('disabled')
                } else {
                    (_date * 1 < this.today) && className.push('disabled')  //当天和结束日期之外不可选
                }
                (_date * 1 > this.betweenEnds) && className.push('disabled')
                return className.join(' ');
            },
            //入住离开的区间背景色
            addClassBg(day, month, year) {
                if (!day) return
                const _date = this.resetTime(year + "/" + month + "/" + day);
                let className = [];
                if (_date - 1 >= this.startDates && _date + 1 <= this.endDates && this.mode > 1) {
                    className.push("between");
                }
                return className.join(" ");
            },
            //theme入住离开的区间背景色
            themeOpacityBg(day, month, year) {
                if (!this.themeColor) return
                if (!day) return
                const _date = this.resetTime(year + "/" + month + "/" + day);
                if (_date >= this.startDates && _date <= this.endDates && this.mode > 1) {
                    return this.getBetweenColor
                }
            },
            //theme获取普通日期选中样式背景
            themeBg(day, month, year) {
                if (!this.themeColor) return
                const _date = this.resetTime(year + '/' + month + '/' + day)
                //正常模式
                if (this.mode == 1) {
                    if (_date == this.startDates) {
                        return this.themeColor
                    }
                } else {//酒店和往返模式
                    if (_date == this.startDates || _date == this.endDates) {
                        return this.themeColor
                    }
                }
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
            //设置今天，明天，后天
            setTip(day, month, year) {
                if (!day) {
                    return;
                }
                const _date = this.resetTime(year + '/' + month + '/' + day)
                let tip = "";

                if (_date == this.today) {
                    tip = '今天'
                } else if (_date - this.today == 24 * 3600 * 1000) {
                    tip = '明天'
                } else if (_date - this.today == 2 * 24 * 3600 * 1000) {
                    tip = '后天'
                }
                if (this.mode == 2) {
                    if (_date == this.endDates) {
                        tip = "离开";
                    } else if (_date == this.startDates) {
                        tip = "入住";
                    }
                } else if (this.mode == 3) {
                    if (_date == this.startDates && !this.endDates) {
                        tip = '去/返'
                    } else {
                        if (_date == this.endDates) {
                            tip = '返程'
                        } else if (_date == this.startDates) {
                            tip = '去程'
                        }
                    }
                }
                return tip;
            },
            isCurrent(day, month, year) {
                if (!day) {
                    return false;
                }
                const _date = this.resetTime(year + '/' + month + '/' + day)

                //正常模式
                if (this.mode == 1) {
                    if (_date == this.startDates) {
                        return true
                    }
                } else {//酒店和往返模式
                    if (_date == this.startDates || _date == this.endDates) {
                        return true
                    }
                }

            },
            isCurrents(day, month, year) {
                if (!day) {
                    return false;
                }
                const _date = this.resetTime(year + '/' + month + '/' + day)


                if (_date == this.endDates) {
                    return true
                }
            },
            dateFormat(times) {
                let date = new Date(times);
                let recent = ''
                if (times == this.today) {
                    recent = '今天'
                } else if (times - this.today === 24 * 3600 * 1000) {
                    recent = '明天'
                } else if (times - this.today === 2 * 24 * 3600 * 1000) {
                    recent = '后天'
                }

                var year = date.getFullYear()
                var month = parseInt(date.getMonth() + 1) > 9 ? parseInt(date.getMonth() + 1) : '0' + parseInt(date.getMonth() + 1)
                var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
                return {
                    dateStr: year + '-' + month + '-' + day,
                    week: '周' + this.weekList[date.getDay()],
                    recent
                }
            },
            chooseDate(day, month, year) {
                const _date = this.resetTime(year + '/' + month + '/' + day)
                const week = this.weekList[new Date(_date).getDay()]
                //判断日期区域是否可点击
                if (!day) return
                if (this.betweenStarts) {
                    if (_date * 1 < this.betweenStarts) return
                } else {
                    if (_date < this.today) return
                }
                if (_date > this.betweenEnds) return

                //判断酒店或者往返模式的选择逻辑
                if (this.startDates && this.endDates && _date > this.endDates) {
                    this.startDates = _date;
                    this.endDates = "";
                } else if (this.endDates && _date > this.endDates) {
                    this.endDates = _date;
                } else if (_date >= this.startDates && _date <= this.endDates) {
                    this.startDates = _date;
                    this.endDates = "";
                } else if (_date < this.startDates) {
                    this.startDates = _date;
                    this.endDates = "";
                } else if (_date > this.startDates) {
                    if (this.mode == 1) {
                        this.startDates = _date
                    } else {
                        this.endDates = _date;
                    }
                }

                const choose = {
                    startStr: this.dateFormat(this.startDates)
                }

                if (this.mode == 1) {
                    this.$emit('callback', choose)
                } else if (this.mode == 2 && this.startDates && this.endDates) {
                    choose.dayCount = (this.endDates - this.startDates) / 24 / 3600 / 1000
                    choose.endStr = this.dateFormat(this.endDates)
                    this.$emit('callback', choose)
                } else if (this.mode == 3) {
                    if (this.startDates && this.endDates) {
                        choose.dayCount = (this.endDates - this.startDates) / 24 / 3600 / 1000
                        choose.endStr = this.dateFormat(this.endDates)
                    } else if (this.startDates && !this.endDates) {
                        choose.dayCount = 0
                        choose.endStr = this.dateFormat(this.startDates)
                    }
                    this.$emit('callback', choose)
                }
                if (choose.startStr != undefined && choose.endStr == undefined) {
                    this.startDatesTest = true;
                    console.log(this.startDatesTest)
                } else {
                    this.startDatesTest = false;
                    console.log(this.startDatesTest)
                }

            }
        }
    }
</script>

<style lang="less" scoped>
    @color: #FFE8EC;

    .calendar {
        position: relative;



        width: 691rpx;
        height: 840rpx;
        background: #fff;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        border-radius: 8rpx;
        padding-top: 34rpx;
        margin: 0 auto;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;

        .defaultStyle {
            border-radius: 50% !important;
        }

        .select {
            width: 100%;
            display: flex;
            justify-content: center;

            .select-content {
                padding: 0 59rpx;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                line-height: 60rpx;

                font-size: 24rpx;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(34, 34, 34, 1);
                background: rgba(246, 246, 247, 1);
                border-radius: 10rpx;
                margin-right: 20rpx;
            }

            .select-content-active {
                color: #ff0a31;
                background-color: #FFE8EC;
            }
        }

        .header {
            width: 100%;
            height: auto;

            .tips {
                padding: 6px 10px;
                background: #fff7dc;
                font-size: 12px;
                color: #9e8052;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                box-sizing: border-box;
                -webkit-box-sizing: border-box;

            }

            .week-number {
                background: #fff;
                padding: 0 1%;
                line-height: 102rpx;

                span {
                    display: inline-block;
                    text-align: center;
                    width: 14.28%;
                    font-size: 22rpx;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: rgba(33, 33, 33, 1);

                    &:first-child,
                    &:last-child {
                        color: #FF4657;
                    }
                }
            }
        }

        .content {
            position: relative;
            color: #000;
            height: auto;

            h3 {
                width: 100%;
                font-weight: bold;
                text-align: left;
                font-size: 28rpx;
                padding-left: 40rpx;
                padding-top: 34rpx;
                box-sizing: border-box;
                -webkit-box-sizing: border-box;
            }

            .each-month {
                display: block;
                width: 98%;
                font-size: 0;
                margin: 0 auto;
                padding-left: 0;
                padding-bottom: 10px;
                border-bottom: 1px solid #F4F4F4;

                .each-day {
                    position: relative;
                    display: inline-block;
                    text-align: center;
                    vertical-align: middle;
                    width: 96rpx;
                    font-size: 22rpx;
                    line-height: 96rpx;
                    margin-top: 4px;

                    div {
                        display: inline-block;
                        font-size: 22rpx;
                        width: 100%;
                    }

                    &.between {
                        background: #FFE8EC;
                        color: #ff0a31;
                    }

                    .disabled {
                        color: #ccc !important;

                        &.trip-time {
                            background: #e7e7e7;

                        }

                        &.today {
                            color: #ccc !important;
                            background: none;
                        }
                    }

                    .disabled+.recent {
                        color: #ccc;
                    }

                    .today {
                        border-radius: 50%;
                        color: #ff0a31;
                        border: 2rpx solid #F2F2F2;
                    }

                    .trip-time {
                        background: #FFE8EC !important;
                        color: #ff0a31 !important;
                        border-radius: 50% 0 0 50%;
                        height: 96rpx;
                        box-sizing: border-box;
                        -webkit-box-sizing: border-box;
                        border: none;
                    }

                    .trip-times {
                        border-radius: 0 50% 50% 0;
                        height: 96rpx;
                        box-sizing: border-box;
                        -webkit-box-sizing: border-box;

                    }

                    .defaultStyle {
                        border-radius: 50% !important;
                    }

                    .weekend {
                        color: @color;
                    }

                    .recent {
                        position: absolute;
                        font-size: 10px;
                        width: 100%;
                        text-align: center;
                        color: @color;
                        bottom: 0;
                        left: 0;
                    }
                }
            }
        }
    }
</style>