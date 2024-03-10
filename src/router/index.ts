import { App } from "vue";
import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import { StaticRoutes } from "./staticRoutes";
import { getTokenFromLocal } from "@/utils/auth";
import { useAuthStore, useRouteStore } from "@/store";
import { asyncRoutes } from './asyncRoutes';
//白名单
const WHITE_LIST = ['/login', '/404']

const customRouter = () => {
    return createRouter({
        history: createWebHashHistory(),
        //平滑滚动
        scrollBehavior: (to, from, savedPosition) => {
            return { top: 0 };
        },
        routes: StaticRoutes,
    })
}
const router = customRouter(); // Declare the router variable before using it
//路由守卫
router.beforeEach(async (to, from, next) => {
    //获取token
    const token = getTokenFromLocal();
    //白名单

    if (WHITE_LIST.includes(to.path)) {
        next();
    } else {
        if (token) {
            next();
            //TODO: 动态添加路由  获取用户信息
            const authStore = useAuthStore();
            if (!authStore.profile.id) {
                const routeStore = useRouteStore();
                const profile = await authStore.getUserPermissionAction();
                //获取一级路由权限
                const firstPerms = getFristRoutesPerms(profile.permissions);
                //获取二级路由权限
                const secondPerms = getSecondRoutesPerms(profile.permissions);
                //过滤动态路由
                const newRoutes = filterRoutesByPerms(firstPerms, secondPerms, asyncRoutes);
                //排序路由

                //动态添加路由
                newRoutes.forEach((route) => {
                    router.addRoute(route as any);
                });
                //设置路由到store
                routeStore.setRoutesAction(newRoutes as RouteRecordRaw[]);
            }
        } else {
            next('/login');
        }
    }
});

//处理一级路由权限数据
function getFristRoutesPerms(menus: string[]) {
    const newArr = menus.map((item) => {
        return item.split(':')[0];
    });
    return [...new Set(newArr)];
}


//处理二级路由权限数据
function getSecondRoutesPerms(menus: string[]) {
    const newArr = menus.map((item: any) => {
        const arr = item.split(':');
        return `${arr[0]}:${arr[1]}`;
    });
    return [...new Set(newArr)];
}

//根据菜单标识过滤动态路由表
function filterRoutesByPerms(firstPerms: string[], secondPerms: string[], asyncRoutes: RouteRecordRaw[]) {
    return asyncRoutes.filter((route) => {
        return firstPerms.includes(route.meta?.permission as string) || firstPerms.includes('*');
    }).map((item) => {
        return {
            ...item,
            children: item.children?.filter((sub) => {
                return secondPerms.includes(sub.meta?.permission as string) || secondPerms.includes('*:*');
            })
        }
    });
}






//重置路由
export function resetRouter() {
    const newRouter = customRouter();
    (router as any).matcher = (newRouter as any).matcher;
}

export { StaticRoutes, router }; //导出路由配置

export default {
    install: (app: App<Element>) => {
        //安装路由插件
        app.use(router);
    },
};
