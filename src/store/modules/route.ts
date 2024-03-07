/**
 * 路由模块
 *  1. 路由权限控制
 * 2. 路由信息
 * 3. 路由状态
 */

import { defineStore } from 'pinia'

const useRouteStore = defineStore('route-store', {
    state: () => ({
        routes: [],
        addRoutes: []
    }),
    actions: {
    },
    getters: {

    }
})


export default useRouteStore;
