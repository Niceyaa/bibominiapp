const dfilters = {
    // 保留小数点2位小数
    baoliu(value, num) {
        function isInteger(obj) {
            return Math.floor(obj) === obj
        }
        let newValue = ''
        if (isInteger(value)) {
            newValue = value;
        } else {
            newValue = value.toFixed(num);
        }
        return newValue;
    },
    //格式化时间戳
    formatTime: function (value) {
        let time = new Date(value * 1000)
        let year = time.getFullYear();
        let month = time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1;
        let date = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
        let hour = time.getHours();
        let fen = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
        let second = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
        return year + "-" + month + "-" + date + "    " + hour + ":" + fen + ":" + second + "    "
    },
    //格式化时间戳无小时
    formatTimes: function (value) {
        if (value == null) {

        } else {
            let time = new Date(value * 1000)
            let year = time.getFullYear();
            let month = time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1;
            let date = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
            let hour = time.getHours();
            let fen = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
            let second = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
            return year + "." + month + "." + date + "    "
        }

    },
    // 计算红包份数
    hongBaoCount: function (value) {
        let hongBaoNum = 0;
        value.forEach(function (el, index) {
            hongBaoNum += el.num;
        })
        return hongBaoNum;
    },
    //计算红包总金额
    hongBaoMoney: function (value) {
        let hongBao = 0;
        value.forEach(function (el, index) {
            hongBao += el.money / 100;
        })
        return hongBao;
    },
    // 全局过滤器,奖品等级
    levels: function (value) {
        if (value != null) {
            switch (value.level) {
                case 1:
                    return "一等奖";
                case 2:
                    return "二等奖";
                case 3:
                    return "三等奖";
                case 4:
                    return "四等奖";
                case 5:
                    return "五等奖";
                case 6:
                    return "六等奖";
            }
        }
    }
}
export default dfilters;
