import request from "@/services/request";

/**
 * 查看计费规则详情
 * /parking/rule/{id}
 */

export const GetCarRuleDetail = (id: number) => {
    return request({
        url: `/parking/rule/${id}`,
        method: 'get'
    })
}


/**
 * 获取编辑页月卡详情
 * /parking/card/detail/{id}
 */

export const GetCarCardDetail = (id: number) => {
    return request({
        url: `/parking/card/detail/${id}`,
        method: 'get'
    })
}


/**
 * 查看编辑页面月卡信息
 * /parking/card/edit/{id}
 */

export const GetCarCardEdit = (id: number) => {
    return request({
        url: `/parking/card/edit/${id}`,
        method: 'get'
    })
}

/**
 * 查看月卡信息列表 
 * /parking/card/list
 * query 
 */

export const GetCarCardList = (params: API.ShowCarMonthCard) => {
    return request({
        url: `/parking/card/list`,
        method: 'get',
        params
    })
}


/**
 * 查看月卡详情
    * /parking/card/{id}
 */

export const GetCarCard = (id: number) => {
    return request({
        url: `/parking/card/${id}`,
        method: 'get'
    })
}


/**
 * 获取月卡占有率
 * /parking/card/proportion

 */

export const GetCarCardProportion = () => {
    return request({
        url: `/parking/card/proportion`,
        method: 'get'
    })
}


/**
 * 添加月卡
 * /parking/card
 */


export const PostCarCard = (data: API.CarCardInfo) => {
    return request({
        url: `/parking/card`,
        method: 'post',
        data
    })
}



/**
 * 编辑月卡
 * /parking/card
 */


export const PutCarCard = (data: API.CarCardInfo) => {
    return request({
        url: `/parking/card`,
        method: 'put',
        data
    })
}


/**
 * 月卡续费
 * /parking/card/renew
 */


export const PostCarCardRenew = (data: API.RenewalInfo) => {
    return request({
        url: `/parking/card/renew`,
        method: 'post',
        data
    })
}


/**
 * 删除月卡（单个,批量）
 *  /parking/card/{ids}
 */


export const DeleteCarCard = (ids: number[]) => {
    return request({
        url: `/parking/card/${ids}`,
        method: 'delete'
    })
}


/**
 * 查看停车缴费列表
 * /parking/payment/list
 */

export const GetCarPaymentList = (params: API.CarPaymentListQuery) => {
    return request({
        url: `/parking/payment/list`,
        method: 'get',
        params
    })
}


/**
 * 添加停车计费规则
 * /parking/rule
 */

export const PostCarRule = (data: API.CarRuleInfo) => {
    return request({
        url: `/parking/rule`,
        method: 'post',
        data
    })
}


/**
 * 查看计费规则列表
 * /parking/rule/list
 */

export const GetCarRuleList = () => {
    return request({
        url: `/parking/rule/list`,
        method: 'get'
    })
}


/**
 * 编辑计费规则
 * /parking/rule
 */

export const PutCarRule = (data: API.CarRuleInfo) => {
    return request({
        url: `/parking/rule`,
        method: 'put',
        data
    })
}

/**
 * 删除计费规则 
 * /parking/rule/{id}
 */


export const DeleteCarRule = (id: number) => {
    return request({
        url: `/parking/rule/${id}`,
        method: 'delete'
    })
}


/**
 * 获取计费规则下拉列表
 * /parking/rule/dropList
 */
export const GetCarRuleDropList = () => {
    return request({
        url: `/parking/rule/dropList`,
        method: 'get'
    })
}


// ============================园区大屏==============================



/**
 * 查看大屏中的区域详情
 * /parking/area/{id}
 */


export const GetCarAreaDetail = (id: number) => {
    return request({
        url: `/parking/area/${id}`,
        method: 'get'
    })
}


/**
 * 查询楼宇
 * /park/statistics/building
 */

export const GetCarBuilding = (params: {
    id: string
}) => {
    return request({
        url: `/park/statistics/building`,
        method: 'get',
        params
    })
}


/**
 * 查询楼宇概况 收入和产业信息
 * /park/statistics/info
 */

export const GetCarBuildingInfo = () => {
    return request({
        url: `/park/statistics/info`,
        method: 'get',
    })
}


/**
 * 查看模拟车辆进出列表
 * /parking/simulation/list
 */

export const GetCarSimulationList = () => {
    return request({
        url: `/parking/simulation/list`,
        method: 'get'
    })
}


/**
 * 获取入场区域一体杆联动列表
 * /parking/area/entranceAreaPoleList
 */

export const GetCarEntranceAreaPoleList = () => {
    return request({
        url: `/parking/area/entranceAreaPoleList`,
        method: 'get'
    })
}


/**
 * 获取出场区域一体杆联动列表
 *  /parking/area/exportAreaPoleList
 */

export const GetCarExportAreaPoleList = () => {
    return request({
        url: `/parking/area/exportAreaPoleList`,
        method: 'get'
    })
}

/**
 * 车辆入场
 * /parking/simulation/entrance
 */

export const PostCarSimulationEntrance = (data: API.CarSimulationEntrance) => {
    return request({
        url: `/parking/simulation/entrance`,
        method: 'post',
        data
    })
}


/**
 * 车辆出场
 * /parking/simulation/export
 */

export const PostCarSimulationExport = (data: API.CarSimulationExport) => {
    return request({
        url: `/parking/simulation/export`,
        method: 'post',
        data
    })
}


/**
 * 获取故障类型下拉列表
 * /pole/simulation/errorList
 */

export const GetCarSimulationErrorList = () => {
    return request({
        url: `/pole/simulation/errorList`,
        method: 'get'
    })
}


/**
 * 小工具获取告警详情
 * /pole/simulation/warning/{id}
 */

export const GetCarSimulationWarning = (id: number) => {
    return request({
        url: `/pole/simulation/warning/${id}`,
        method: 'get'
    })
}


/**
 * 获取运行状态正常的一体杆编号下拉列表
 * /pole/simulation/normalList
 */

export const GetCarSimulationNormalList = () => {
    return request({
        url: `/pole/simulation/normalList`,
        method: 'get'
    })
}


/**
 * 接单
 * /pole/simulation/warning/receive/{id}
 */

export const PutCarSimulationWarningReceive = (id: number) => {
    return request({
        url: `/pole/simulation/warning/receive/${id}`,
        method: 'put'
    })
}


/**
 * 故障上报
 * /pole/simulation/warning/report
 */

export const PostCarSimulationWarningReport = (data: API.CarSimulationWarningReport) => {
    return request({
        url: `/pole/simulation/warning/report`,
        method: 'post',
        data
    })
}


/**
 * 维修完成
 * /pole/simulation/warning/finish
 */

export const PutCarSimulationWarningFinish = (data: API.CarSimulationWarningFinish) => {
    return request({
        url: `/pole/simulation/warning/finish`,
        method: 'put',
        data
    })
}


/**
 * 查询指派给当前登录用户的告警列表
 *  /pole/simulation/todoList
 */

export const GetCarSimulationTodoList = () => {
    return request({
        url: `/pole/simulation/todoList`,
        method: 'get'
    })
}


/**
 * 车辆入库
 * /parking/driveIn
 */

export const PostCarDriveIn = (data: API.CarDriveIn) => {
    return request({
        url: `/parking/driveIn`,
        method: 'post',
        data
    })
}


/**
 * 车辆出库
 * /parking/driveOut
 */

export const PostCarDriveOut = (data: API.CarDriveIn) => {
    return request({
        url: `/parking/driveOut`,
        method: 'post',
        data
    })
}


//=========================园区管理-楼宇管理========================


/**
 * 楼宇修改
 * /park/building
 */

export const PutBuilding = (data: API.BuildingInfo) => {
    return request({
        url: `/park/building`,
        method: 'put',
        data
    })
}


/**
 * 楼宇列表查询
 * /park/building
 */

export const GetBuildingList = (params: API.BuildingListQuery) => {
    return request({
        url: `/park/building`,
        method: 'get',
        params
    }) as Promise<API.Response<API.ResListType<API.BuildingInfo>>>
}


/**
 * 楼宇删除
 * /park/building/{id}
 * 租赁中的楼宇不能删除
 */

export const DeleteBuilding = (id: number) => {
    return request({
        url: `/park/building/${id}`,
        method: 'delete'
    })
}


/**
 * 楼宇新增
 * /park/building
 */

export const PostBuilding = (data: API.BuildingInfo) => {
    return request({
        url: `/park/building`,
        method: 'post',
        data
    })
}

/**
 * 楼宇详情查询
 * /park/building/{id}
 */

export const GetBuildingDetail = (id: number) => {
    return request({
        url: `/park/building/${id}`,
        method: 'get'
    })
}


/**
 * 查询可租赁楼宇
 * /park/rent/building
 */

export const GetRentBuilding = () => {
    return request({
        url: `/park/rent/building`,
        method: 'get'
    })
}



//=================================================一体杆管理=============================


/**
 * 删除一体杆
 * /pole/info/{ids}
 */

export const DetelePoleInfo = (ids: string) => {
    return request({
        url: `/pole/info/${ids}`,
        method: 'delete'
    })
}


/**
 * 查看一体杆列表
 */



//=========================告警========================

/**
 * 查看告警记录列表
 * /pole/warning/list
 */


export const GetPoleWarningList = (params: API.WarningQueryParams) => {
    return request({
        url: `/pole/warning/list`,
        method: 'get',
        params
    }) as Promise<API.Response<API.ResListType<API.WarningInfo>>>
}
