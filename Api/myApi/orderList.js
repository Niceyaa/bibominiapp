import { myAnswer } from "./myAnswer.js"
// 订单列表
export const orderList = async (data) => {
    const url = '/api/order/status_list'
    return await myAnswer(url, data);
}
