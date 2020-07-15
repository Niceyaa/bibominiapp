import { MyRequest } from "./MyRequest"
// 小程序登录接口
function loginApi(data) {
    const url = '/api/miniapp/code2sesslogin'
    return MyRequest(url, data);
}


export {
    loginApi
}