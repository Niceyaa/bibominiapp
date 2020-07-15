<template>
    <!-- 菜单选项 -->
    <view class="menu-container">
        <view class="menu-column" v-for="(item,index) in listMenu" :key="index" @click="targetAll(index)">
            <image style="width: 78upx;height: 61upx;" :src="item.icon"></image>
            <text class="menu-column-text" selectable="false" space="false" decode="false">
                {{item.name}}
            </text>
        </view>
    </view>
</template>

<script>
    export default {
        name: "menu",
        data() {
            return {

            }
        },
        props: {
            listMenu: {
                type: Array
            }
        },
        onLoad() {

        },
        methods: {
            targetAll(index) {
                this.$store.commit("changeCurrentIndex", index + 1);
                uni.switchTab({
                    url: '/pages/all/all'
                });
            }
        }
    }
</script>

<style lang="less">
    .menu-container {
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        padding-top: 54upx;

        .menu-column {
            width: 20%;
            text-align: center;

            .menu-column-text {
                font-size: 22upx;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(34, 34, 34, 1);
                line-height: 73upx;
                display: block;
            }
        }
    }
</style>