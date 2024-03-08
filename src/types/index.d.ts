// Path: src/typings/index.ts
namespace API {
   interface Response<T = any> {
        code: number;
        data: T;
        msg?: string;
    }
    interface User {
        userName: string;
        userId?: string;
        age?: number;
    }

    /**
     * @description: 登录参数
     * @param {string} username 用户名
     * @param {string} password 密码
     */
   interface LoginParams {
        username: string;
        password: string;
    }

    interface AuthStoreState {
        token: string;
        userInfo: User;
    }

 
}
