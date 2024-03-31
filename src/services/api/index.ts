import request from "../request"

export * from './carManagement'
export * from './datascreen'

/**
 *  登录接口
 * @param data  登录参数 
 * @returns  Promise    
 */
export const LoginAPi = (data: API.LoginParams) => {
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
    }) as Promise<API.Response<API.UserProfile>>
}

/**
 * 登录成功后获取路由信息
 */

export const getCurrentUserRoutes = () => {
    return request({
        url: '/park/user/router',
        method: 'get'
    }) as Promise<API.Response<API.UserRouteInfo>>
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

export const GetWorkbenchPaymentList = () => {
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
    }) as Promise<API.Response<API.ResListType<API.RentInfo>>>
}


/**
 * 修改密码
 * /park/profile/updatePwd
 * headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
 * body参数
 * @param data { oldPassword: string, newPassword: string }
 */



export const UpdatePassword = (data: API.UpdatePasswordParams, headers: API.ResquestHeaders) => {
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
    }) as Promise<API.Response<API.BaseDataType & {
        annualIncomeArray: API.AnnualIncomeArrayType,
    }>>
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

export const GetUserDetail = (id: string | number) => {
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
    }) as Promise<API.Response<null>>
}


/**
 * 系统管理-用户管理-编辑用户
 * /park/sys/user
 */

export const UpdateUser = (data: API.AddUserParams, headers: API.ResquestHeaders) => {
    return request({
        url: '/park/sys/user',
        method: 'put',
        data,
        headers
    }) as Promise<API.Response<null>>
}

/**
 * 系统管理-用户管理-删除用户
 * /park/sys/user/{id}
 * 
 */

export const DeleteUser = (id: number | string, headers: API.ResquestHeaders) => {
    return request({
        url: `/park/sys/user/${id}`,
        method: 'delete',
        headers
    }) as Promise<API.Response>
}

/**
 * 系统管理-角色管理-删除角色
 * /park/sys/role/{id}
 *  @param id 角色id
 */

export const DeleteRole = (id: string, headers: API.ResquestHeaders) => {
    return request({
        url: `/park/sys/role/${id}`,
        method: 'delete',
        headers
    })
}

/**
 * 系统管理-角色管理-查询所有角色
 * /park/sys/role
 * @param params { page: string, pageSize: string }
 */

export const GetRoleList = () => {
    return request({
        url: '/park/sys/role',
        method: 'get',
    })
}

/**
 * 系统管理-角色管理-添加角色
 *  /park/sys/role
 */

export const AddRole = (data: API.AddRoleInfo, headers: API.ResquestHeaders) => {
    return request({
        url: '/park/sys/role',
        method: 'post',
        data,
        headers
    })
}

/**
 * 系统管理-角色管理-查询当前角色详情-权限和分配人数
 * /park/sys/role/{roleId}
 * path 参数 roleId 角色id
 * @param roleId 角色id
 */

export const GetRoleDetail = (roleId: string) => {
    return request({
        url: `/park/sys/role/${roleId}`,
        method: 'get'
    })
}


/**
 * 系统管理-角色管理-修改角色
 * /park/sys/role
 * 
 */

export const UpdateRole = (data: API.AddRoleInfo, headers: API.ResquestHeaders) => {
    return request({
        url: '/park/sys/role',
        method: 'put',
        data,
        headers
    })
}

/**
 * 系统管理-角色管理-查询所有功能权限(树形)
 * /park/sys/permision/all/tree
 */

export const GetAllPermission = () => {
    return request({
        url: '/park/sys/permision/all/tree',
        method: 'get'
    })
}

/**
 * 系统管理-角色管理-角色关联的用户列表
 * /park/sys/roleUser/{roleId}
 * @param roleId 角色id
 * query 参数 page  pageSize
 *  @param  parmas { page: string, pageSize: string }
 */

export const GetRoleUserList = (roleId: string | number, params: API.PageParams) => {
    return request({
        url: `/park/sys/roleUser/${roleId}`,
        method: 'get',
        params
    }) as Promise<API.Response<API.ResListType<API.UserProfile>>>
}



/**
 * 文件上传
 * /upload
 * body参数  
 *     file 文件       
 * type 参数  1:图片 2:文件 1、企业营业执照businessLicense2、租赁合同附件contract
 */
export const UploadFile = (data: FormData) => {
    return request({
        url: '/upload',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    }) as Promise<API.Response<API.UploadFileResInfo>>
}
