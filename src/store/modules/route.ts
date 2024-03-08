/**
 * 路由模块
 *  1. 路由权限控制
 * 2. 路由信息
 * 3. 路由状态
 */
import { defineStore } from 'pinia';
import {StaticRoutes } from '@/router/index';
import { RouteRecordRaw } from 'vue-router';

interface RouteState {
    routes: RouteRecordRaw[];
}


const useRouteStore = defineStore('route-store', {
    state: ():RouteState => ({
        routes: [...StaticRoutes], 
    }),
    actions: {

    },
    getters: {
      
    }
})


export default useRouteStore;
