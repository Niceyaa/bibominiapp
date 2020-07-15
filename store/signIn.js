import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        addressDefault: "定位中",
        cityCode: null,
        type: "recent",
        typesubid: "",
        currentIndex: 0,
        timeDuan: '',
    },
    mutations: {
        changeTimeDuan(state, newChangeTimeDuan) {
            state.timeDuan = newChangeTimeDuan;
        },
        changeCurrentIndex(state, newChangeCurrentIndex) {
            state.currentIndex = newChangeCurrentIndex
        },
        changeTypesubid(state, newChangeTypesubid) {
            state.typesubid = newChangeTypesubid
        },
        //改变类型
        changeType(state, newaddressType) {
            state.type = newaddressType
        },
        // 改变地理位置
        changeAddressDefault(state, newaddressDefault) {
            state.addressDefault = newaddressDefault
        },
        // 改变城市编码
        changeCityCode(state, newCityCode) {
            state.cityCode = newCityCode
        }
    },
    actions: {}
})
export default store