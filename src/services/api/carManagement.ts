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
    })}


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

export const GetCarCardList = (params:API.CarMonthCard) => {
    return request({
        url: `/parking/card/list`,
        method: 'get',
        params
    })
}
