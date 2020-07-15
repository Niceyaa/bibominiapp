<template>
    <view>
        <!-- 头部 -->
        <childheader title="城市选择"></childheader>
        <view class="zhanwei">

        </view>

        <bazaarcitylist :citylist="citylist" :hotcity="hotList" v-if="citylist!=null && hotList!=null"></bazaarcitylist>
    </view>
</template>

<script>
    import bazaarcitylist from "@/components/bazaar-city_list"
    import childheader from "../../../components/childheader"
    import { citylist, hotcitylist } from "@/Api/common"


    export default {
        name: "",
        data() {
            return {
                citylist: null, //城市信息
                hotList: null, //热门城市信息
            }
        },
        components: {
            bazaarcitylist,
            childheader
        },
        mounted() {
            let that = this;
            // 请求全部城市
            citylist().then(function (data) {
                that.citylist = data[1].data.data
                console.log(data)
            })
            //请求热门城市
            hotcitylist().then(function (data) {
                console.log(data)
                that.hotList = data[1].data.data
            })
        },
        onLoad() {

        },
        methods: {

        }
    }
</script>

<style lang="less">
    .zhanwei {
        width: 100%;
        height: 140rpx;
    }
</style>