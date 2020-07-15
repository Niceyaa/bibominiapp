import { myFile } from "./myFile.js"
// 文件上传
export const fileUpload = async (data) => {
    const url = '/api/operate/comm_upload/file';
    return await myFile(url, data);
}