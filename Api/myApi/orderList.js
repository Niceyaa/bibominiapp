import { MyRequest } from "../MyRequest.js"
// 订单列表
export const orderList = async (data) => {
    const url = '/api/order/status_list/{status}'
    return await MyRequest(url, data);
}
