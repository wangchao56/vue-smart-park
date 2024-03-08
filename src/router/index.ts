import { App } from "vue";
import { createRouter, createWebHashHistory  } from "vue-router";
import { StaticRoutes } from "./staticRoutes";


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

const router =  customRouter();

//路由守卫
router.beforeEach((to, from, next) => {
    //没有登录 且不是登录页面 则跳转到登录页面
    // if (!localStorage.getItem('token') && to.path !== '/login') {
    //     next('/login');
    // }
    next();
});


//重置路由
export function resetRouter() {
    const newRouter = customRouter();
    (router as any).matcher =   (newRouter as any).matcher;
}


export { StaticRoutes, router }; //导出路由配置

export default {
    install: (app: App<Element>) => {
        //安装路由插件
        app.use(router);
    },
};
