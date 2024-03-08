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
import { LoginAPi } from '@/services';

const useAuthStore  = defineStore('auth-store',{
    state: ():API.AuthStoreState => ({
        token: '',
        userInfo: {
            userName: '',
            age: 0
        },
    }),
    actions:{

        /**
         * 登录
         * @param {*} userInfo 
         */
        async loginAction(data:API.LoginParams){
            const res = await LoginAPi(data);
            console.log('res: ', res);
            if(res.code === 10000){
                this.setToken(res.data.token);
            }
        },

        /**
         * 退出登录
         */
        logout(){
            this.token = '';
            removeToken();
        },
        /**
         * 设置token
         */
        setToken(token: string){
            this.token = token;
            setTokenToLocal(token);
        }
    },
    getters: {
    },
}) 


export default useAuthStore;
