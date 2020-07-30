import { myGet } from "./myGet.js"
// 关于我们
export const aboutUs = async () => {
    const url = '/api/operate/common_text';
    return await myGet(url);
}
