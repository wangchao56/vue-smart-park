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


/**
 * 登录成功后获取用户信息 角色 权限
 * 
 */

export const GetUserInfoAndProfile = () => {
    return request({
        url: '/park/user/profile',
        method: 'get'
    })
}

/**
 * 登录成功后获取路由信息
 */

export const getCurrentUserRoutes = () => {
    return request({
        url: '/park/user/router',
        method: 'get'
    })
}






/**获取本月缴费车辆分布
 * /parking/statistics/charge/typeProportion
 */

export const GetCarPayInfo = () => {
    return request({
        url: '/parking/statistics/charge/typeProportion',
        method: 'get'
    })
}

/**
 * 获取停车场实时停车情况
 * /parking/statistics/current
 */

export const GetCarParkInfo = () => {
    return request({
        url: '/parking/statistics/current',
        method: 'get'
    })
}


/**
 * 获取各停车区域使用情况(带分页)
 * /parking/statistics/space
 */


export const GetCarAreaInfo = (params: API.PageParams) => {
    return request({
        url: '/parking/statistics/space',
        method: 'get',
        params
    })
}


/**
 *  获取本月车行收入
 * /parking/statistics/monthRevenue
 */

export const GetCarMonthRevenue = () => {
    return request({
        url: '/parking/statistics/monthRevenue',
        method: 'get'
    })
}

/**
 * 获取车行过去一年收入
 * /parking/statistics/yearRevenue
 */

export const GetCarYearRevenue = () => {
    return request({
        url: '/parking/statistics/yearRevenue',
        method: 'get'
    })
}

/**
 * 
首页大屏缴费记录(不分页)
/parking/statistics/paymentList
 */
export const GetCarPaymentList = () => {
    return request({
        url: '/parking/statistics/paymentList',
        method: 'get'
    })
}


/**
 * 首页-工作台-临期合同查询
 * /home/workbench/rentInfo
 * @param params { page: string, pageSize: string }
 */

export const GetWorkbenchRentInfo = (params: API.PageParams) => {
    return request({
        url: '/home/workbench/rentInfo',
        method: 'get',
        params
    })
}


/**
 * 修改密码
 * /park/profile/updatePwd
 * headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
 * body参数
 * @param data { oldPassword: string, newPassword: string }
 */



export const UpdatePassword = (data: API.UpdatePasswordParams ,headers:API.ResquestHeaders ) => {
    return request({
        url: '/park/profile/updatePwd',
        method: 'put',
        data,
        headers 
    })
}


/**
 * 首页-工作台-基础信息查询
/home/workbench/info
 */
export const GetWorkbenchInfo = () => {
    return request({
        url: '/home/workbench/info',
        method: 'get'
    })
}


/**
 * 系统管理-用户管理-用户列表
 * /park/sys/user
 * 
 * @param params { page: string, pageSize: string ,name?: string }
 * 
 */

export const GetUserListInfo = (params: API.PageParams & { name?: string }) => {
    return request({
        url: '/park/sys/user',
        method: 'get',
        params
    })
}

/**
 * 系统管理-用户管理-用户详情
 * /park/sys/user/{id}
 * Path 参数 id 用户id
 * @param id 用户id 
 */

export const GetUserDetail = (id: string) => {
    return request({
        url: `/park/sys/user/${id}`,
        method: 'get'
    })
}

/**
 * 系统管理-用户管理-重置密码
 * /park/sys/user/resetPwd
 * Header 参数
 * Content-Type application/x-www-form-urlencoded
 * @param data { id: string }
 * 
 */

export const ResetUserPassword = (data: { id: string }, headers: API.ResquestHeaders) => {
    return request({
        url: '/park/sys/user/resetPwd',
        method: 'put',
        data,
        headers
    })
}

/**
 * 系统管理-用户管理-添加用户
 * /park/sys/user
 * 
 * headers { 'Content-Type': 'application/json' }
 * 
 * @param data  { name: string, userName: string, roleId: number, roleName: string, password: string, phonenumber: string, status: number }
 */
 
export const AddUser = (data: API.AddUserParams, headers: API.ResquestHeaders) => {
    return request({
        url: '/park/sys/user',
        method: 'post',
        data,
        headers
    })}
