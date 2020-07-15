import { MyRequest } from "../MyRequest.js"
// 订单转票接口
export const orderTurn = async (data) => {
    const url = '/api/resale/order_resale'
    return await MyRequest(url, data);
}
