
import { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/home/index.vue')
    }
];



const router = createRouter({
    history: createWebHistory(),
    routes
});

//路由守卫
router.beforeEach((to, from, next) => {

    //没有登录 且不是登录页面 则跳转到登录页面
    if (!localStorage.getItem('token') && to.path !== '/login') {
        next('/login');
    }

    next();
});


export default {
    install: (app: App<Element>) => { //安装路由插件
        app.use(router);
    }
}
