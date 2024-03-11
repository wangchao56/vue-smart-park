/**
 * 路由模块
 *  1. 路由权限控制
 * 2. 路由信息
 * 3. 路由状态
 */
import { defineStore } from 'pinia';
import { StaticRoutes } from '@/router/index';
import { RouteRecordRaw } from 'vue-router';
import { getCurrentUserRoutes } from '@/services';
interface RouteState {
    routes: RouteRecordRaw[];
}


const useRouteStore = defineStore('route-store', {
    state: (): RouteState => ({
        routes: [...StaticRoutes],
    }),
    actions: {
        /**
         * 获取当前用户路由信息
         */
        async getCurrentUserRoutesAction() {
            const res = await getCurrentUserRoutes();
            //TODO: 根据后台返回的路由信息动态添加路由 
            //处理
            return res.data;
        },
        /**
         * 设置路由
         */
        async setRoutesAction(routes: RouteRecordRaw[]) {
            let newRoutes = [...routes, ...StaticRoutes];
            //排序
            const userRoutes = await this.getCurrentUserRoutesAction();
            this.routes = newRoutes;
        }
    },
    getters: {

    }
})


export default useRouteStore;
