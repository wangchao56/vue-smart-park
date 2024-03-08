import Layout from "@/layout/index.vue";
import { RouteRecordRaw } from "vue-router";


const StaticRoutes: RouteRecordRaw[] = [
    {
        path: "/",
        component: Layout,
        //重定向
        redirect: "/workbench/index",
        children: []
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/login/index.vue"),
        meta:{
            title: "登录",
            icon: "s-home",
            hidden: true
        }
    },
    {
        path: "/workbench",
        component: Layout,
        children: [
            {
                path: "index",
                component: () => import("@/views/workbench/index.vue"),
                meta: {
                    title: "工作台",
                    icon: "data-board",
                },
            },
        ],
    },
    {
        path: "/park",
        component: Layout,
        meta: {
            title: "园区管理",
            permissions: "park",
            icon: "el-icon-office-building",
        },
        children: [
            {
                path: "building",
                name: "ParkList",
                component: () => import("@/views/park/building/index.vue"),
                meta: {
                    title: "楼宇管理",
                    icon: "el-icon-",
                    permissions: "park:building",
                },
            },
            {
                path: "enterprise",
                name: "ParkDetail",
                component: () => import("@/views/park/enterprise/index.vue"),
                meta: {
                    title: "企业管理",
                    icon: "el-icon-s-home",
                    permissions: "park:enterprise",
                },
            },
        ],
    },
];



export { StaticRoutes };
