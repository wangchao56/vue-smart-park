/**
 * 用户模块 
 * 1. 用户登录
 * 2. 用户退出
 * 3. 用户信息
 * 4. 用户权限
 * 5. 用户角色
 * 使用pinia进行状态管理 
 * 
 */
import { defineStore } from 'pinia'
import { setTokenToLocal, removeToken } from '@/utils/auth.ts'
import { GetUserInfoAndProfile, LoginAPi } from '@/services';
import { resetRouter, router } from '@/router/index';
import message from '@/utils/message';
import useRouteStore from './route';

const useAuthStore = defineStore('auth-store', {
    state: (): API.AuthStoreState => ({
        token: '',
        rememberMe: false,
        userInfo: {
            userName: '',
            age: 0,
        },
        profile: {
            id: '',
            name: '',
            roleId: 0,
            roleName: '',
            permissions: [],
            menus: []
        }
    }),
    actions: {

        /**
         * 登录
         * @param {*} userInfo 
         */
        async loginAction(data: API.LoginParams) {
            const routeStroe = useRouteStore();
            const res = await LoginAPi(data);
            if (res.code === 10000) {
                this.setToken(res.data.token);
                this.rememberMeAction(data);
                message.success('登录成功');
                //获取用户路由信息
                routeStroe.getCurrentUserRoutesAction();
                //如果地址栏有redirect 跳转对应值的页面 否之到首页
                const redirect = router.currentRoute.value.query.redirect as string;
                if (redirect) {
                    router.push(redirect);
                } else {
                    router.push('/');
                }
            } else {
                message.error(res.msg!);
            }
        },

        /**
         * 获取用户角色权限
         * 
         */
        async getUserPermissionAction() {
            const res = await GetUserInfoAndProfile();
            this.profile = res.data;
            return res.data;
        },
        /**
         * 记住我
         */
        rememberMeAction(data: API.LoginParams) {
            if (this.rememberMe) {
                localStorage.setItem('REMEMBER_ME_KEY', JSON.stringify(data));
            } else {
                localStorage.removeItem('REMEMBER_ME_KEY');
            }
        },
        /**
         * 清空state
         */
        clearState() {
            this.token = '';
            this.userInfo = {
                userName: '',
                age: 0
            }
        },
        /**
         * 清除用户信息
         * 
         */
        clearUserInfo() {
            this.userInfo = {
                userName: '',
                age: 0
            }
        },
        /**
         * 退出登录
         */
        loginOutAction() {
            this.token = ''; //清空token
            removeToken(); //删除token
            resetRouter();  //重置路由
            this.clearState(); //清空state
            //当前页面的路由路径
            const currentPath = router.currentRoute.value.path;
            //跳转到登录页面
            router.push(`/login?redirect=${currentPath}`);
        },
        /**
         * 设置token
         */
        setToken(token: string) {
            this.token = token;
            setTokenToLocal(token);
        }
    },
    getters: {
    },
})


export default useAuthStore;
