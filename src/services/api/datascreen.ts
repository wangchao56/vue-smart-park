import request from "@/services/request";

/**
 * 园区大屏-查询楼宇概况 收入和产业信息
    /park/statistics/info
 */
export const GetParkStatisticsInfo = () => {
    return request({
        url: `/park/statistics/info`,
        method: 'get'
    }) as Promise<API.Response<API.ParkStatisticsInfo>>;
}


/**
 * 查看大屏中的区域详情
 * /parking/area/{id}
 * Path 参数 id  string  模型id 必需
 */

export const GetParkingAreaDetail = (id: number) => {
    return request({
        url: `/parking/area/${id}`,
        method: 'get'
    }) as Promise<API.Response<API.AreaStatistics>>;
}


/**
 * 查询楼宇
 * /park/statistics/building
 */

export const GetBuildingListScreen = () => {
    return request({
        url: `/park/statistics/building`,
        method: 'get'
    }) as Promise<API.Response<API.ResListType<API.BuildingInfo>>>;
}
