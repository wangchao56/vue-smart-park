<template>
    <el-container>
        <el-header>
            <el-space>
                <el-button type="text" link :icon="ArrowLeft" @click="handleBack">返回</el-button>
                <span>|</span>
                <span>{{ title }}</span>
            </el-space>
        </el-header>
        <el-main>
            <el-card>
                <template #header>
                    <h4>车辆信息</h4>
                </template>
                <el-form ref="baseFormRef" label-position="right" :model="baseformModel" label-width="100px"
                    :rules="rules">
                    <el-row>
                        <template v-for="item  in baseFromItemOptions">
                            <el-col :span="12">
                                <el-form-item :label="item.label" :prop="item.prop">
                                    <el-input :size="item.size" v-model="baseformModel[item.prop]"
                                        :placeholder="item.placeholder" :disabled="item.disabled"></el-input>
                                </el-form-item>
                            </el-col>
                        </template>
                    </el-row>
                </el-form>
            </el-card>
            <el-card v-if="mode === 'carddetail'">
                <template #header>
                    <h4>月卡缴费记录</h4>
                </template>
                <el-table :data="rechargeList" stripe border>
                    <el-table-column prop="createTime" label="支付时间"></el-table-column>
                    <el-table-column prop="paymentAmount" label="支付金额"></el-table-column>
                    <el-table-column prop="paymentMethod" label="支付方式">
                        <template #default="{ row }">
                            <span>{{ paymentMethodOptions.find(item => item.value === row.paymentMethod)?.label ||
                    '--' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="有效日期">
                        <template #default="{ row }">
                            <span>{{ row.cardStartDate }} 至 {{ row.cardEndDate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createUser" label="创建人"></el-table-column>
                </el-table>
            </el-card>
            <el-card v-else>
                <template #header>
                    <h4>最近一次月卡缴费信息</h4>
                </template>
                <el-form ref="cardFormRef" :model="cardformModel" :rules="rules" label-position="right"
                    label-width="100px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="有效日期" :prop="['cardStartDate', 'cardEndDate']">
                                <el-date-picker size="large" v-model="dateRange" type="daterange"
                                    start-placeholder="开始日期" end-placeholder="结束日期" />
                            </el-form-item>
                            <el-form-item label="支付方式" prop="paymentMethod">
                                <el-select size="large" v-model="cardformModel.paymentMethod" placeholder="请选择支付方式">
                                    <el-option v-for="item in paymentMethodOptions" :key="item.value"
                                        :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="支付金额" prop="paymentAmount">
                                <el-input size="large" v-model="cardformModel.paymentAmount"
                                    placeholder="请输入支付金额"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>

        </el-main>
        <el-footer v-if="mode !== 'carddetail'">
            <el-button @click="handleActions('reset')">重置</el-button>
            <el-button type="primary" @click="handleActions(mode)">确定</el-button>
        </el-footer>
    </el-container>
</template>

<script setup lang='ts'>
import { ArrowLeft, } from '@element-plus/icons-vue';
import type { FormInstance, DateModelType } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { PostCarCard, PutCarCard, PostCarCardRenew, GetCarCard, GetCarCardEdit, GetCarCardDetail } from '@/services';
//模式 添加 编辑  查看 续费  四种模式
type ModeTypes = 'addcard' | 'editcard' | 'carddetail' | 'renewcard';
const mode = ref<ModeTypes>('addcard');
//车辆id
const carInfoId = ref<string>('');
const router = useRouter();
const route = useRoute();


//标题
const title = computed(() => {
    switch (mode.value) {
        case 'addcard':
            return '添加月卡';
        case 'editcard':
            return '编辑月卡';
        case 'carddetail':
            return '月卡详情';
        case 'renewcard':
            return '续费月卡';
    }
})
//表格数据
let rechargeList = ref<API.Recharge[]>([]);

//获取路由参数
onMounted(() => {
    const routeParams = route.params;
    mode.value = routeParams.mode as ModeTypes;
    carInfoId.value = routeParams.id as string || '';
    if (mode.value === 'carddetail') {
        getCarCardInfo();
    }
    console.log('routeParams: ', routeParams);
    if (mode.value === 'editcard') {
        getCarCardDetailhandler();
    }
})

//获取车辆信息
const getCarCardInfo = async () => {
    const res = await GetCarCard(unref(carInfoId));
    if (res.code === 10000) {
        const carInfo = res.data;
        console.log('carInfo: ', carInfo);
        baseformModel.carNumber = carInfo.carNumber;
        baseformModel.personName = carInfo.personName;
        baseformModel.phoneNumber = carInfo.phoneNumber;
        baseformModel.carBrand = carInfo.carBrand;
        rechargeList.value = carInfo.rechargeList;
    }
}

//获取编辑页月卡详情
const getCarCardDetailhandler = async () => {
    const res = await GetCarCardDetail(unref(carInfoId));
    if (res.code === 10000) {
        const carInfo = res.data;
        baseformModel.carNumber = carInfo.carNumber;
        baseformModel.personName = carInfo.personName;
        baseformModel.phoneNumber = carInfo.phoneNumber;
        baseformModel.carBrand = carInfo.carBrand;
        cardformModel.paymentAmount = carInfo.paymentAmount;
        cardformModel.paymentMethod = carInfo.paymentMethod;
        cardformModel.cardStartDate = carInfo.cardStartDate;
        cardformModel.cardEndDate = carInfo.cardEndDate;
    }
}



interface BaseFormItem {
    label: string;
    prop: string;
    size: 'large' | 'small';
    placeholder: string;
    disabled: boolean;
}


//formItem options 
const baseFromItemOptions = computed<BaseFormItem[]>(() => [
    {
        label: '车牌号码',
        prop: 'carNumber',
        size: 'large',
        placeholder: '请输入车牌号码',
        disabled: mode.value === 'carddetail' || mode.value === 'renewcard',
    },
    {
        label: '车主名称',
        prop: 'personName',
        size: 'large',
        placeholder: '请输入车主名称',
        disabled: mode.value === 'carddetail' || mode.value === 'renewcard',
    },
    {
        label: '联系方式',
        prop: 'phoneNumber',
        size: 'large',
        placeholder: '请输入联系方式',
        disabled: mode.value === 'carddetail' || mode.value === 'renewcard',
    },
    {
        label: '车辆品牌',
        prop: 'carBrand',
        size: 'large',
        placeholder: '请选择车辆品牌',
        disabled: mode.value === 'carddetail' || mode.value === 'renewcard',
    },
]);

const baseFormRef = ref<FormInstance>();
const cardFormRef = ref<FormInstance>();
const defaultTime = ref<[Date, Date]>([
    new Date(2000, 1, 1, 0, 0, 0),
    new Date(2000, 2, 1, 23, 59, 59),
])
const paymentMethodOptions = [
    {
        label: '现金',
        value: 'Cash',
    },
    {
        label: '微信',
        value: 'WeChat',
    },
    {
        label: '支付宝',
        value: 'Alipay',
        default: true,
    },
]
//创建表单数据
const baseformModel = reactive<API.BasicInfo>({
    carNumber: '',
    personName: '',
    phoneNumber: '',
    carBrand: '',
});
const cardformModel = reactive<Omit<API.CarCardInfo, 'carNumber' | 'personName' | 'phoneNumber' | 'carBrand'>>({
    paymentAmount: '',
    paymentMethod: paymentMethodOptions.find(item => item.default)?.value || 'cash',
    cardStartDate: defaultTime[0],
    cardEndDate: defaultTime[1],
});

const dateRange = computed({
    get: () => [cardformModel.cardStartDate, cardformModel.cardEndDate],
    set: (val: [DateModelType, DateModelType]) => {
        cardformModel.cardStartDate = val[0];
        cardformModel.cardEndDate = val[1];
    }
})

//车牌号码验证规则
const carNumberValidator = (_rule: any, value: string, callback: any) => {
    const plateNumberRegex = /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/
    if (plateNumberRegex.test(value)) {
        callback()
    } else {
        callback(new Error('请输入正确的车牌号'))
    }
}

const rules = {
    carNumber: [{ required: true, message: '请输入车牌号码', trigger: 'blur' }, {
        validator: carNumberValidator,
        trigger: 'blur'
    }],
    personName: [{ required: true, message: '请输入车主名称', trigger: 'blur' }],
    phoneNumber: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
    carBrand: [{ required: true, message: '请选择计费规则', trigger: 'blur' }],
    paymentAmount: [{ required: true, message: '请输入支付金额', trigger: 'blur' }],
    paymentMethod: [{ required: true, message: '请选择支付方式', trigger: 'change' }],
    cardStartDate: [{ required: true, message: '请选择有效日期', trigger: 'blur' }],
}

const handleBack = () => {
    router.back();
}
const handleActions = (type: string) => {
    switch (type) {
        case 'reset':
            nextTick(() => {
                unref(baseFormRef)?.resetFields();
                unref(cardFormRef)?.resetFields();
            });
            break;
        case 'addcard':
            handleAdd();
            break;
        case 'editcard':
            handleEdit();
            break;
        case 'renewcard':
            handleRenew();
            break;
    }

}
// 验证并提交表单
const validateAndSubmit = () => {
    return new Promise((resolve, reject) => {
        baseFormRef.value?.validate((valid) => {
            if (valid) {
                cardFormRef.value?.validate((valid) => {
                    if (valid) {
                        resolve(true);
                    } else {
                        reject();
                    }
                });
            } else {
                reject();
            }
        });
    });
}
// 添加月卡
const handleAdd = async () => {
    try {
        await validateAndSubmit();
        const tempParams: API.CarCardInfo = { ...baseformModel, ...cardformModel };
        const res = await PostCarCard(tempParams);
        if (res.code === 10000) {
            router.back();
        }
    } catch (error) {
        console.log('error: ', error);
    }
}
// 编辑月卡
const handleEdit = async () => {
    try {
        await validateAndSubmit();
        const tempParams: API.CarCardInfo = { ...baseformModel, ...cardformModel };
        const res = await PutCarCard(tempParams);
        if (res.code === 10000) {
            router.back();
        }
    } catch (error) {
        console.log('error: ', error);
    }
}
// 续费月卡
const handleRenew = async () => {
    const carInfoId = route.params.id as string;

    try {
        await validateAndSubmit();
        const tempParams: API.RenewalInfo = {
            carInfoId: carInfoId,
            paymentAmount: cardformModel.paymentAmount,
            paymentMethod: cardformModel.paymentMethod,
            cardStartDate: cardformModel.cardStartDate as string,
            cardEndDate: cardformModel.cardEndDate as string,
        };
        const res = await PostCarCardRenew(tempParams);
        if (res.code === 10000) {
            router.back();
        }
    } catch (error) {
        console.log('error: ', error);
    }
}
</script>

<style lang='scss' scoped>
:deep(.el-card__footer) {

    display: flex;
    justify-content: center;
    align-items: center;
}

.el-main {
    background: rgb(243, 246, 249);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.el-footer,
.el-header {
    background: #fff;
    padding: 10px 20px;
    display: flex;
    align-items: center;
}

.el-header {
    border-bottom: 1px solid #ebeef5;
}

.el-footer {
    border-top: 1px solid #ebeef5;
    justify-content: center;
}
</style>
