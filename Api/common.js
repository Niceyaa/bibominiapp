import { MyRequest } from "./MyRequest"
// 常用数据接口

// 关键字接口
export const searchkeyword = async (data) => {
    const url = '/api/operate/search_keyword'
    return await MyRequest(url, data);
}
//搜索演唱会接口

export const search = async (data) => {
    const url = '/api/concert/search'
    return await MyRequest(url, data);
}
//关注接口
export const favoractor = async (data, status) => {
    const url = '/api/operate/favor/actor/' + status
    return await MyRequest(url, data);
}
// 分类信息接口
export const concerttypes = async (data) => {
    const url = '/api/concert/types'
    return await MyRequest(url, data);
}
//全部页接口

export const allpage = async (data) => {
    const url = '/api/concert/allpage'
    return await MyRequest(url, data);
}
// 首页分类数据

export const indexlist = async (data) => {
    const url = '/api/concert/index_list'
    return await MyRequest(url, data);
}
//
export const indexcategory = async (data) => {
    const url = '/api/concert/index_category'
    return await MyRequest(url, data);
}
// 演出详情

export const detail = async (data, id) => {
    const url = '/api/concert/detail/' + id
    return await MyRequest(url, data);
}


// 市区
export const citylist = async (data) => {
    const url = '/api/operate/city_list'
    return await MyRequest(url, data);
}
// 热门城市
export const hotcitylist = async (data) => {
    const url = '/api/operate/city_list/hot'
    return await MyRequest(url, data);
}
//城市名称换取code

export const citynamecode = async (data) => {
    const url = '/api/operate/city_name2code'
    return await MyRequest(url, data);
}

//演员信息
export const actorinfo = async (data, id) => {
    const url = '/api/operate/actor_info/' + id
    return await MyRequest(url, data);
}

//获取广告位
export const guanggao = async (data, position) => {
    const url = '/api/operate/ad_config/' + position
    return await MyRequest(url, data);
}
//演出收藏
export const concertDetails = async (data, id) => {
    const url = '/api/operate/favor/concert/' + id
    return await MyRequest(url, data);
}
