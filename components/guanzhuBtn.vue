<template>
    <view>
        <button class="btn" :style="'background-color:'+bgColor" v-if="text==0" @click="addGuanzhu(optionsId)">
            + 关注
        </button>
        <button class="btn-guanzhu" v-else @click="deleteGuanzhu(optionsId)">
            已关注
        </button>
    </view>

</template>

<script>
    import { favoractor } from "@/Api/common"

    export default {
        name: "",
        data() {
            return {

            }
        },
        props: {
            text: {
                type: String,
                default: "关注"
            },
            bgColor: {
                type: String,
                default: "#FF4657"
            },
            optionsId: {

            }
        },
        onLoad() {

        },
        methods: {
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
                        that.$emit('changeStatus', 0)
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
                        that.$emit('changeStatus', 1)
                    }
                })
            },
        }
    }
</script>

<style lang="less">
    .btn {
        display: inline-block;
        height: 60upx;
        border-radius: 30upx;
        padding: 0 55upx;
        line-height: 60upx;
        font-size: 28upx;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
    }

    .btn-guanzhu {
        display: inline-block;
        height: 60upx;
        border-radius: 30upx;
        padding: 0 55upx;
        line-height: 60upx;
        font-size: 28upx;
        font-family: PingFang SC;
        font-weight: 500;
        color: white;
        background: rgba(255, 255, 255, 0.5);
    }
</style>