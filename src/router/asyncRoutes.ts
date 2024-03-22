import Layout from '@/layout/index.vue'
import { RouteRecordRaw } from 'vue-router';
// 1. 动态路由: 需要做权限控制 可以根据不同的权限 数量上的变化
// 2. 静态路由: 不需要做权限控制 每一个用户都可以看到 初始化的时候初始化一次

// 动态路由表
export const asyncRoutes: RouteRecordRaw[] = [
    {
        path: '/park',
        component: Layout,
        meta: { order: 2, permission: 'park', title: '园区管理', icon: 'el-icon-office-building' },
        children: [{
            path: 'building',
            meta: { permission: 'park:building', title: '楼宇管理' },
            component: () => import('@/views/park/building/index.vue')
        },
        {
            path: 'enterprise',
            meta: { permission: 'park:enterprise', title: '企业管理' },
            component: () => import('@/views/park/enterprise/index.vue')
        }]
    },
    {
        path: '/car',
        component: Layout,
        meta: { order: 3, permission: 'parking', title: '行车管理', icon: 'el-icon-guide' },
        children: [{
            path: 'area',
            component: () => import('@/views/car/cararea/index.vue'),
            meta: { permission: 'parking:area', title: '区域管理' }
        }, {
            path: 'card',
            component: () => import('@/views/car/carcard/index.vue'),
            meta: { permission: 'parking:card', title: '月卡管理' }
        }, {
            path: 'pay',
            component: () => import('@/views/car/carpay/index.vue'),
            meta: { permission: 'parking:payment', title: '停车缴费管理' }
        },
        {
            path: 'rule',
            component: () => import('@/views/car/carrule/index.vue'),
            meta: { permission: 'parking:rule', title: '计费规则管理' }
        }]
    },
    {
        path: '/pole',
        component: Layout,
        meta: { order: 4, permission: 'pole', title: '一体杆管理', icon: 'el-icon-refrigerator' },
        children: [{
            path: 'info',
            component: () => import('@/views/rod/rodmanage/index.vue'),
            meta: { permission: 'pole:info', title: '一体杆管理' }
        }, {
            path: 'waring',
            component: () => import('@/views/rod/rodwarn/index.vue'),
            meta: { permission: 'pole:warning', title: '告警记录' }
        }]
    },
    {
        path: '/sys',
        component: Layout,
        meta: { order: 5, permission: 'sys', title: '系统管理', icon: 'el-icon-setting' },
        children: [{
            path: 'role',
            component: () => import('@/views/system/role/index.vue'),
            meta: { permission: 'sys:role', title: '角色管理' }
        }, {
            path: 'user',
            component: () => import('@/views/system/employee/index.vue'),
            meta: { permission: 'sys:user', title: '员工管理' }
        }]
    },
    {
        path: '/car/:mode', // 动态路由 
        component: () => import('@/views/car/carcard/formModel/index.vue'),
        meta: { permission: 'parking:card', title: '添加月卡' }
    },
    {
        path: '/car/:mode/:id', // 动态路由 
        component: () => import('@/views/car/carcard/formModel/index.vue'),
        meta: { permission: 'parking:card', title: '编辑月卡' }
    }
]
