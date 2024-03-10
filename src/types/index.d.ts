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
        roleId: number | string;
        /**用户角色名称 */
        roleName?: string;
        /**密码 */
        password?: string;
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
        rememberMe: boolean;
        profile: UserProfile;
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

    interface AddRoleInfo {
        /**角色id */
        id?: string;
        /**角色名称 */
        roleName: string;
        /**角色描述*/
        remark: string;
        /**菜单/功能点权限信息 */
        perms: number[];
    }

    /**
     * 计费规则详情
     */
    interface CarRuleDetail {
        /** 创建者ID */
        createBy: number;
        /** 创建时间 */
        createTime: string;
        /** 更新者ID */
        updateBy: number;
        /** 更新时间 */
        updateTime: string;
        /** 备注 */
        remark: null | string;
        /** 演示标志 */
        demoFlag: number;
        /** ID */
        id: number;
        /** 规则编号 */
        ruleNumber: string;
        /** 规则名称 */
        ruleName: string;
        /** 免费时长 */
        freeDuration: number;
        /** 收费上限 */
        chargeCeiling: number;
        /** 收费类型 */
        chargeType: string;
        /** 持续分钟时间 */
        durationMinuteTime: null | any;
        /** 持续分钟价格 */
        durationMinutePrice: null | any;
        /** 持续小时时间 */
        durationHourTime: null | any;
        /** 持续小时价格 */
        durationHourPrice: null | any;
        /** 转向价格 */
        turnPrice: null | any;
        /** 分区帧时间 */
        partitionFrameTime: number;
        /** 分区帧价格 */
        partitionFramePrice: number;
        /** 分区增加时间 */
        partitionIncreaseTime: number;
        /** 分区增加价格 */
        partitionIncreasePrice: number;
        /** 规则名称视图 */
        ruleNameView: string;
        /** 删除标志 */
        delFlag: number;
    }

    /**
     * 月卡详情
     */

    interface CarCardDetail {
        /** 人名 */
        personName: string;
        /** 手机号 */
        phoneNumber: string;
        /** 车牌号 */
        carNumber: string;
        /** 车辆品牌 */
        carBrand: string;
        /** 卡开始日期 */
        cardStartDate: string;
        /** 卡结束日期 */
        cardEndDate: string;
        /** 支付方式 */
        paymentMethod: string;
        /** 支付金额 */
        paymentAmount: number;
        /** 车辆信息ID */
        carInfoId: number;
        /** 充值ID */
        rechargeId: number;
        /** 卡状态 */
        cardStatus: number;
    }

    /**
     * 查看月卡信息 参数
     */
    interface ShowCarMonthCard {
        /** 页数 */
        page: string;
        /** 条数 */
        pageSize: string;
        /** 车牌号 */
        carNumber?: string;
        /** 车主姓名 */
        personName?: string;
        /** 状态 0:可用，1:已过期 */
        cardStatus?: number;
    }

    /**
     * 月卡信息
     */
    interface MonthCardInfo {
        /** ID */
        id: number;
        /** 人名 */
        personName: string;
        /** 手机号 */
        phoneNumber: string;
        /** 车牌号 */
        carNumber: string;
        /** 车辆品牌 */
        carBrand: string;
        /** 总有效日期 */
        totalEffectiveDate: number;
        /** 卡状态 */
        cardStatus: number;
        /** 演示标志 */
        demoFlag: number;
    }

    /**
 * 员工信息
 */
    interface EmployeeInfo {
        /** 员工ID */
        id?: number | string;

        /** 员工姓名 */
        name: string;

        /** 角色ID */
        roleId: number | string;

        /** 角色名称 */
        roleName?: string;

        /** 状态 */
        status: number;

        /** 用户名 */
        userName?: string;

        /** 电话号码 */
        phonenumber: string;

        /** 创建时间 */
        createTime?: string;
    }
    interface RoleInfo {
        /** 角色ID */
        roleId: number;

        /** 角色名称 */
        roleName: string;
        /** 角色描述 */
        remark: string;

    }

    /**
     * 车主信息
     */
    interface CarCardInfo {
        /** 车主姓名 */
        personName: string;

        /** 联系方式 */
        phoneNumber: string;

        /** 车牌号码 */
        carNumber: string;

        /** 车辆品牌 */
        carBrand: string;

        /** 有效时间开始 */
        cardStartDate: string;

        /** 有效时间结束 */
        cardEndDate: string;

        /** 支付金额 */
        paymentAmount: string;

        /** 支付方式 */
        paymentMethod: 'Alipay' | 'WeChat' | 'Cash';

        /** 月卡车辆id */
        carInfoId?: number;

        /** 缴费信息id */
        rechargeId?: number;
    }

    /**
     * 月卡续费信息
     */
    interface RenewalInfo {
        /** 起始有效时间 */
        cardStartDate: string;

        /** 截止有效时间 */
        cardEndDate: string;

        /** 支付金额 */
        paymentAmount: string;

        /** 支付方式 */
        paymentMethod: 'Alipay' | 'WeChat' | 'Cash';

        /** 月卡车辆id */
        carInfoId: number;
    }

    /**
     * 停车缴费列表查询参数
     */
    interface CarPaymentListQuery {
        /** 页数 */
        page: string;

        /** 条数 */
        pageSize: string;

        /** 车牌号 */
        carNumber?: string;

        /** 缴费状态，0未缴纳，1已缴纳 */
        paymentStatus?: '0' | '1';
    }
    /**
 * 计费规则信息
 */
    interface CarRuleInfo {
        /** 计费规则编号 */
        ruleNumber: string;

        /** 计费规则名称 */
        ruleName: string;

        /** 免费时长，单位:分钟 */
        freeDuration?: number;

        /** 收费上限 */
        chargeCeiling?: number;

        /** 收费类型，时长收费:duration,按次收费:turn,分段收费:partition */
        chargeType: 'duration' | 'turn' | 'partition';

        /** 时长计费单位时间 */
        durationTime?: number;

        /** 时长计费单位价格 */
        durationPrice?: number;

        /** 时长收费类型 minute:分钟，hour:小时 */
        durationType?: 'minute' | 'hour';

        /** 按次收费：每次价格 */
        turnPrice?: number;

        /** 分段收费:段内时间 */
        partitionFrameTime?: number;

        /** 分段收费:段内费用 */
        partitionFramePrice?: number;

        /** 分段收费:超出时间 */
        partitionIncreaseTime?: number;

        /** 分段收费:超出范围收费价钱 */
        partitionIncreasePrice?: number;
    }

    /**
 * 车辆入场信息
 */
    interface CarSimulationEntrance {
        /** 车牌号码 */
        carNumber: string;

        /** 区域id */
        areaId: number;

        /** 入场一体杆id */
        entrancePoleId: number;

        /** 入场时间 */
        entranceTime: string;
    }

    /**
 * 车辆出场信息
 */
    interface CarSimulationExport {
        /** 停车记录id */
        id: number;

        /** 车牌号码 */
        carNumber: string;

        /** 收费类型:月卡card,临时停车:temp */
        chargeType: 'card' | 'temp';

        /** 出场一体杆id */
        exportPoleId: number;

        /** 出场时间 */
        exportTime: string;

        /** 支付方式,支付宝:Alipay,微信:WeChat,线下:Cash */
        paymentMethod: 'Alipay' | 'WeChat' | 'Cash';
    }
    /**
 * 一体杆故障上报信息
 */
    interface CarSimulationWarningReport {
        /** 一体杆id */
        poleId: number;

        /** 故障编码 */
        errorTypeCode: number;
    }

    /**
 * 告警处理信息
 */
    interface CarSimulationWarningFinish {
        /** 告警id */
        id: number;

        /** 处理结果 */
        handleResult: string;
    }

    /**
 * 车辆规则信息
 */
    interface CarDriveIn {
        /** 车牌号 */
        carNumber: string;

        /** 规则编号 */
        ruleNumber?: string;
    }

    /**
 * 楼宇信息
 */
    interface BuildingInfo {
        /** id主键 */
        id: number;

        /** 楼宇名称 */
        name: string;

        /** 层数 */
        floors: number;

        /** 在管面积 */
        area: number;

        /** 物业费单价 */
        propertyFeePrice: number;
    }


    interface BuildingListQuery {
        /**当前页 */
        page: string;
        /**每页大小 */
        pageSize: string;
        /**楼宇名称模糊 查询 */
        name?: string;
    }
}
