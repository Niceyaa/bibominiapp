import { MyRequest } from "../MyRequest.js"
// 优惠券接口
export const couponList = async (data) => {
    const url = '/api/operate/coupon_list'
    return await MyRequest(url, data);
}
