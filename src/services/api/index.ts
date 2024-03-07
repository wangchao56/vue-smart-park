import request from "../request"


/**
 *  登录接口
 * @param data  登录参数 
 * @returns  Promise    
 */
export const LoginAPi = (data: API.LoginParams) =>  {
    return request({
        url: '/park/login',
        method: 'post',
        data
    }) as Promise<API.Response>
}

/**
 * 获取用户下拉列表
 */

export const GetUserList = () => {
    return request({
        url: '/system/user/dropList',
        method: 'get'
    })  
}
