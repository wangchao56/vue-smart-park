//引入 UTIL



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
        page?: string | number;
        pageSize?: string | number;
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

        /** 主键 */
        id?: string | numebr;
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
 * 基础信息接口，包含了人名、手机号、车牌号和车辆品牌
 */
    interface BasicInfo {
        /** 人名 */
        personName: string;
        /** 手机号 */
        phoneNumber: string;
        /** 车牌号 */
        carNumber: string;
        /** 车辆品牌 */
        carBrand: string;
    }

    /**
     * 月卡详情接口，继承了基础信息接口，并添加了月卡的详细信息
     */
    interface CarCardDetail extends BasicInfo {
        /** 卡开始日期 */
        cardStartDate: string;
        /** 卡结束日期 */
        cardEndDate: string;
        /** 支付方式 */
        paymentMethod: 'Alipay' | 'WeChat' | 'Cash' | string;
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
     * 充值信息接口，包含了充值的详细信息
     */
    interface Recharge {
        /** 充值ID */
        rechargeId: number;
        /** 卡开始日期 */
        cardStartDate: string;
        /** 卡结束日期 */
        cardEndDate: string;
        /** 支付方式 */
        paymentMethod: string;
        /** 支付金额 */
        paymentAmount: number;
        /** 创建时间 */
        createTime: string;
        /** 创建用户 */
        createUser: string;
    }

    /**
     * 获取卡详细信息接口，继承了基础信息接口，并添加了充值列表
     */
    interface GetCardDetallInfo extends BasicInfo {
        /** 车辆信息ID */
        carInfoId: number;
        /** 充值列表 */
        rechargeList: Recharge[];
    }
    /**
     * 月卡信息接口，继承了基础信息接口，并添加了月卡的基本信息
     */
    interface MonthCardInfo extends BasicInfo {
        /** ID */
        id: number;
        /** 总有效日期 */
        totalEffectiveDate: number;
        /** 卡状态 */
        cardStatus: number;
        /** 演示标志 */
        demoFlag: number;
    }
    /**
    * 车主信息
    */
    interface CarCardInfo extends BasicInfo {
        /** 有效时间开始 */
        cardStartDate: string | Date | number;
        /** 有效时间结束 */
        cardEndDate: string | Date | number;
        /** 支付金额 */
        paymentAmount: string;
        /** 支付方式 */
        paymentMethod: 'Alipay' | 'WeChat' | 'Cash' | string;
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
        paymentMethod: 'Alipay' | 'WeChat' | 'Cash' | string;
        /** 月卡车辆id */
        carInfoId: number | string;
    }


    /**
     * 查看月卡信息 参数
     */
    interface ShowCarMonthCard extends PageParams {
        /** 车牌号 */
        carNumber?: string;
        /** 车主姓名 */
        personName?: string;
        /** 状态 0:可用，1:已过期 */
        cardStatus?: number | string;
    }


    /**
     * 停车缴费 
     */

    interface CarPaymentInfo {
        /** 0:可删改，1:不可删改 */
        demoFlag: number;

        /** 缴费id */
        id: number;

        /** 车牌号 */
        carNumber: string;

        /** 收费类型:月卡card,临时停车:temp */
        chargeType: string;

        /** 停车时间 */
        parkingTime: string;

        /** 停车费 */
        actualCharge: number;

        /** 缴费状态 */
        paymentStatus: string;

        /** 缴费时间 */
        paymentTime: string | null;

        /** 缴费方式支付方式,支付宝:Alipay,微信:WeChat,线下:Cash */
        paymentMethod: string;
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
     * 停车缴费列表查询参数
     */
    interface CarPaymentListQuery extends PageParams {
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
        id?: number | string;

        /** 楼宇名称 */
        name: string;

        /** 层数 */
        floors: number | string;

        /** 在管面积 */
        area: number | string;

        /** 物业费单价 */
        propertyFeePrice: number | string;
        /** 状态 */
        status?: number;
    }


    interface BuildingListQuery extends PageParams {
        /**楼宇名称模糊 查询 */
        name?: string;
    }
    interface BaseDataType {
        annualIncome: number;
        enterpriseTotal: number;
        monthCardTotal: number;
        chargePoleTotal: number;
    }

    interface AnnualIncomeArrayType {
        xmonth: string[];
        ybuilding: number[];
        yparking: number[];
    }

    interface RentInfo {
        buildingId: number;
        buildingName: string;
        endTime: string;
        enterpriseId: number;
        enterpriseName: string;
        startTime: string;
        id: number;
    }

    interface ResListType<T> {
        rows: T[];
        total: number;
    }

    interface WarningQueryParams extends PageParams {
        poleNumber?: string;
        handleStatus?: string;
        poleName?: string;
    }

    interface WarningInfo {
        id?: number;
        poleNumber: string;
        poleName: string;
        errorType: string;
        handleStatus: string;
        warningTime: string;
    }


    interface PoleListQuery extends PageParams {
        /** 一体杆编号 */
        poleNumber?: string;
        /** 一体杆名称 */
        poleName?: string;
        /** 一体杆状态 0 正常 1：异常 */
        poleStatus?: string;
    }


    interface PoleInfo {
        /** 一体杆id */
        id?: number | string;
        /** 一体杆编号 */
        poleNumber: string;
        /** 一体杆名称 */
        poleName: string;
        /** 一体杆ip地址 */
        poleIp: string;
        /** 区域名称 */
        areaName: string;
        /** 区域id */
        areaId: number;
        /** 一体杆类型 */
        poleType: string;
        /** 一体杆状态 */
        poleStatus: string;
    }

    interface EnterpriseListQuery extends PageParams {
        /** 企业名称 */
        name?: string;
    }

    interface EnterpriseBaseInfo {
        /** 企业id */
        id?: number;

        /** 企业名称 */
        name: string;

        /** 联系人 */
        contact: string;

        /** 联系电话 */
        contactNumber: string;

        /**   */
        existContractFlag: number;

    }

    interface EnterpriseInfo {
        /** 企业id */
        id: number;

        /** 企业名称 */
        name: string;

        /** 企业法人 */
        legalPerson: string;

        /** 注册地址 */
        registeredAddress: string;

        /** 行业编号 */
        industryCode: number;

        /** 行业名称 */
        industryName: string;

        /** 上传文件url */
        businessLicenseUrl: string;

        /** 上传的营业执照名字 */
        businessLicenseName: string;

        /** 上传文件id */
        businessLicenseId: number;

        /** 企业联系人 */
        contact: string;

        /** 企业联系方式 */
        contactNumber: string;
    }

    interface EnterpriseRentInfo {
        /** 租赁楼宇id */
        buildingId: number;

        /** 开始日期 */
        startTime: string;

        /** 租赁结束日期 */
        endTime: string;

        /** 合同附件url */
        contractUrl: string;

        /** 合同附件id */
        contractId: number;
        /**操作类型，添加合同0，续签合同1 */
        type: number;
        /** 企业id */
        enterpriseId: number;
    }

    interface ContractInfo {
        /** 租赁楼宇id */
        buildingId: number;

        /** 开始日期 */
        startTime: string;

        /** 租赁结束日期 */
        endTime: string;

        /** 合同附件url */
        contractUrl: string;

        /** 合同附件id */
        contractId: number;
        /**操作类型，添加合同0，续签合同1 */
        type: number;
        /** 企业id */
        enterpriseId: number;
    }
    interface RentInfo {
        /** 租赁主键 */
        id: string;
        /** 企业id */
        buildingId: string;
        /** 楼宇名称 */
        buildingName: string;

        /** 租赁开始时间 */
        startTime: string;

        /** 租赁结束时间 */
        endTime: string;

        /** 合同的租赁状态0待生效1生效中2已到期3已退租 */
        status: number;

        /** 是否可以续租 */
        renewFlag: number;

        /** 是否可以退租 */
        exitFlag: number;

        status: number;
    }

    interface WarningHandle {
        /** 告警id */
        id: number;

        /** 用户id */
        userId: number;

        /** 处理状态 */
        handleStatus: string;
    }


    interface WarningSend {
        /**告警id */
        id: number;
        /**处理人id */
        userId: number;
    }

    interface BillInfo {
        /** 主键id */
        id: number;

        /** 账单编号 */
        billNumber: number;

        /** 企业名称 */
        enterpriseName: string;

        /** 企业id */
        enterpriseId: number;

        /** 楼宇id */
        buildingId: number;

        /** 楼宇名称 */
        buildingName: string;

        /** 物业费价格 */
        propertyFeePrice: number;

        /** 缴费周期开始时间 */
        startTime: string;

        /** 缴费周期-结束时间 */
        endTime: string;

        /** 支付金额 */
        paymentAmount: number;

        /** 支付方式1微信2支付宝3现金 */
        paymentMethod?: number;

        /** 支付方式值：1微信2支付宝3现金 */
        paymentMethodValue: string;

        /** 缴费时间 */
        createTime: string;
    }


    interface PropertyFeeInfo {
        /** 企业id */
        enterpriseId: number;

        /** 楼宇id */
        buildingId: number;

        /** 缴费周期-开始时间 */
        startTime: string;

        /** 缴费周期-结束时间 */
        endTime: string;

        /** 付款总额 */
        paymentAmount: number;

        /** 付款方式1微信2支付宝3现金 */
        paymentMethod: number;
    }

    interface PropertyFeeListQuery extends PageParams {
        enterpriseName: string;
        start: string;
        end: string;
    }



    interface PaymentInfoQuery {
        /** 楼宇id */
        buildingId: number;
        /**开始时间 */
        startTime: string;
        /**结束时间 */
        endTime: string;
    }


    interface ParkingAreaInfo {
        /** 区域id */
        id?: number | string;

        /** 区域名称 */
        areaName: string;

        /** 车位数 */
        spaceNumber: number | string;

        /** 面积 */
        areaProportion: number | string;

        /** 关联计费规则ID */
        ruleId: number | string;

        /** 备注 */
        remark?: string;
    }

    interface CarAreaInfo {
        areaId: number | string;
        areaName: string;
        areaProportion: number;
    }

    interface CarParkInfo {
        /** 总占用车位数量*/
        occupancySpaceNum: number;
        /**总空闲车位数量 */
        remainSpaceNum: number;
        /**实时车位占有率 */
        spaceProportion: number;
        /**车位总数量*/
        totalSpaceNum: number;
    }

    /**
     * 文件上传返回信息
     * @param {string} url 文件url
     */

    interface UploadFileResInfo {
        /** 主键id */
        id: number;

        /** 上传文件名称 */
        name: string;

        /** 上传附件url */
        url: string;
    }
    interface BaseInfo {
        buildingTotal: number;
        enterpriseTotal: number;
        chargePoleTotal: number;
        parkingTotal: number;
    }
    interface ParkIncomeData {
        xMonth: string[];
        yIncome: number[];
    }
    interface ParkIndustryItem {
        name: string;
        value: number;
    }
    /**
     * 楼宇概况 收入和产业信息
     */
    interface ParkStatisticsInfo {
        base: BaseInfo;
        parkIncome: ParkIncomeData;
        parkIndustry: ParkIndustryItem[];
    }

    interface AreaStatistics {
        id: number;
        areaName: string;
        totalSpaceNum: number;
        occupancySpaceNum: number;
        remainSpaceNum: number;
        spaceProportion: number;
        areaProportion: number;
    }

    interface CarMonthRevenue {
        cardRevenue: number;
        cardRevenueTrend: 'increase' | 'reduce';
        parkingRevenue: number;
        parkingRevenueTrend: 'increase' | 'reduce';
        totalRevenue: number;
    }

    interface CarTypeProportion {
        cardProportion: number;
        tempProportion: number;
    }

    interface CarYearRevenue {
        monthList: string[];
        revenueList: number[]
    }
    interface CarBuildingInfo {
        // 主键ID，必须存在且唯一
        id: number;
        // 楼宇名称，不能为空字符串
        name: string;
        // 楼宇总层数，必须为大于0的数字
        floors: number;
        // 在管总面积，必须为非负数字
        area: number;
        // 物业费单价，必须为有效数字
        propertyFeePrice: number;
        // 楼宇状态，必须为0（空置中）或1（租赁中）
        status: 0 | 1;
        // 承租单位名称，可为空字符串
        rentEnterpriseName?: string; // 使用问号表示可选字段
    }

    interface CarAreaDetail {
        // 区域ID，必填项
        id: number;
        // 区域名称，必填项
        areaName: string;
        // 总车位数，必填项
        totalSpaceNum: number;
        // 已占用车位数，必填项
        occupancySpaceNum: number;
        // 剩余车位数，必填项
        remainSpaceNum: number;
        // 车位占有率，即已占用车位数占总车位数的比例，必填项
        spaceProportion: number;
        // 区域面积，单位可根据实际情况定义（如平方米），必填项
        areaProportion: number; // 此处字段名与描述中的"areaProportion"不符，假设应为"area"
    }

}


namespace UTIL {
    interface ColumnType {
        prop?: string;
        label?: string;
        align?: string;
        unit?: string;
        width?: number;
        fixed?: string;
        type?: string;
        formType?: string;
        /**搜索 */
        search?: boolean;
        options?: {
            label: string;
            value: string | number;
            default?: boolean;
        }[];
        /**详情显示 */
        show?: boolean;
        rules?: any;
        render?: (row: any) => void;
    }


    type FormActionType = 'add' | 'edit' | 'detail' | 'close' | 'delete';

    interface CusOptions {
        top: {
            attr: string;
        };
        children: {
            attr: string;
            label: string;
            unit?: string;
            render?: (row: any) => string;
        }[];
        btn: {
            attr: string;
            render?: (row: any) => string;
        }
    }
}
