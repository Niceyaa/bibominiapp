import { MyRequest } from "../MyRequest.js"
// 订单详情
export const orderDesc = async (data) => {
    const url = '/api/order/detail/{order_id}'
    return await MyRequest(url, data);
}
