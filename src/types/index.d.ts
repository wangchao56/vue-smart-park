// Path: src/typings/index.ts
namespace API {
    interface Response<T = any> {
        code: number;
        data: T;
        msg?: string;
    }
    /** 下拉菜单用户信息 */
    interface DropDownUserInfo {
        userName: string;
        userId?: string;
        age?: number;
    }
    interface PageParams {
        page?: string;
        pageSize?: string;
    }
    /** 用户信息(角色 ) */
    interface UserProfile {
        /** 主键 */
        id: string;
        /**员工姓名 */
        name: string;
        /**用户的角色id */
        roleId: number;
        /**用户角色名称 */
        roleName: string;
        /**用户权限集合 */
        permissions: string[];
        menus: string[];
    }

    /** 添加用户 */
    interface AddUserParams {
        /**用户名 */
        name: string;
        /**用户角色id */
        userName: string;
        /**用户角色id */
        roleId: number;
        /**用户角色名称 */
        roleName: string;
        /**密码 */
        password: string;
        /**手机号 */
        phonenumber: string;
        /**停用状态 0未启用 1启用 */
        status: number;
    }

    interface UpdatePasswordParams {
        oldPassword: string;
        newPassword: string;
    }

    interface ResquestHeaders extends Record<string, string> {
        'Content-Type': string;
    }
    /**
     * @description: 登录参数
     * @param {string} username 用户名
     * @param {string} password 密码
     */
    interface LoginParams {
        /**用户名 */
        username: string;
        /**密码 */
        password: string;
    }

    interface AuthStoreState {
        token: string;
        userInfo: User;
    }
    interface SubRouteInfo {
        /**路由显示信息 */
        title: string;
        /**路由名称 */
        name: string;
        /**路由图标，只有目录有图标，#表示没有图标 */
        icon: string;
        /**路由组件地址 */
        component: string;
        /**包含子路由标志，true表示嵌套子路由，false表示没有 */
        alwaysShow: boolean;
        chilren: SubRouteBtn[];
    }
    interface SubRouteBtn {
        /**路由显示信息 */
        title: string;
        /**路由名称 */
        name: string;
        /**路由图标，只有目录有图标，#表示没有图标 */
        icon: string;
        /**路由地址 */
        path: string;
        /**路由组件地址 */
        component: string;

    }

    // 登录人的路由信息
    interface UserRouteInfo {
        /**路由id */
        id: number;
        /**路由显示信息 */
        title: string;
        /**路由名称 */
        name: string;
        /**路由图标，只有目录有图标，#表示没有图标 */
        icon: string;
        /**路由组件地址 */
        component: string;
        /**包含子路由标志，true表示嵌套子路由，false表示没有 */
        alwaysShow: boolean;
        chilren: SubRouteInfo[];
    }
    /**车辆分布 */
    interface CarArea {
        /**临时停车占比*/
        tempProportion: number;
        /**月卡车辆占比 */
        cardProportion: number;
    }

}
