import { myAnswer } from "./myAnswer.js"
// 订单详情
export const orderDesc = async (data) => {
    const url = '/api/order/detail'
    return await myAnswer(url, data);
}
