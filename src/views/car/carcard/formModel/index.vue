<template>
    <el-container>
        <el-header>
            <el-space>
                <el-button type="text" link :icon="ArrowLeft" @click="handleBack">返回</el-button>
                <span>|</span>
                <span>添加月卡</span>
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
                        <template v-for="(item, idx)  in baseFromItemOptions">
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
            <el-card>
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
                                    placeholder="请输入联系电话"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
        </el-main>
        <el-footer>
            <el-button @click="handleActions('reset')">重置</el-button>
            <el-button type="primary" @click="handleActions(mode)">确定</el-button>
        </el-footer>
    </el-container>
</template>

<script setup lang='ts'>
import { ArrowLeft, } from '@element-plus/icons-vue';
import { FormInstance } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { PostCarCard, PutCarCard, PostCarCardRenew, GetCarCard } from '@/services';
//模式 添加 编辑  查看 续费  四种模式
type ModeTypes = 'addcard' | 'editcard' | 'carddetail' | 'renewcard';
const mode = ref<ModeTypes>('addcard');
const router = useRouter();
const route = useRoute();
//获取路由参数
onMounted(() => {
    const routeParams = route.params;
    mode.value = routeParams.mode as ModeTypes;
    console.log('routeParams: ', routeParams);
})

//formItem options 
const baseFromItemOptions = computed(() => [
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
        value: 'cash',
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
const createFormData = () => {
    return {
        carNumber: '',
        personName: '',
        phoneNumber: '',
        carBrand: '',
        paymentAmount: '',
        paymentMethod: paymentMethodOptions.find(item => item.default)?.value || 'cash',
        cardStartDate: defaultTime[0],
        cardEndDate: defaultTime[1],
    }
}

const baseformModel = reactive<Omit<API.CarCardInfo, 'paymentMethod' | 'cardStartDate' | 'cardEndDate' | 'paymentAmount'>>({
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
    set: (val: [Date, Date]) => {
        cardformModel.cardStartDate = val[0];
        cardformModel.cardEndDate = val[1];
    }
})

const rules = {
    carNumber: [{ required: true, message: '请输入车牌号码', trigger: 'blur' }],
    personName: [{ required: true, message: '请输入车主名称', trigger: 'blur' }],
    phoneNumber: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
    carBrand: [{ required: true, message: '请选择计费规则', trigger: 'blur' }],
    paymentAmount: [{ required: true, message: '请输入支付金额', trigger: 'blur' }],
    paymentMethod: [{ required: true, message: '请选择支付方式', trigger: 'blur' }],
    cardStartDate: [{ required: true, message: '请选择有效日期', trigger: 'blur' }],
}

const handleBack = () => {
    router.back();
}
const handleActions = (type: string) => {
    console.log(type);
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
    const tempParams: API.CarCardInfo = { ...baseformModel, ...cardformModel };

}

// 添加月卡
const handleAdd = () => {
    baseFormRef.value?.validate((valid) => {
        if (valid) {
            cardFormRef.value?.validate((valid) => {
                if (valid) {
                    console.log('submit!');
                }
            });
        }
    });
}

// 编辑月卡
const handleEdit = () => {
    baseFormRef.value?.validate((valid) => {
        if (valid) {
            cardFormRef.value?.validate((valid) => {
                if (valid) {
                    console.log('submit!');
                }
            });
        }
    });
}

// 续费月卡
const handleRenew = () => {
    baseFormRef.value?.validate((valid) => {
        if (valid) {
            cardFormRef.value?.validate((valid) => {
                if (valid) {
                    console.log('submit!');
                }
            });
        }
    });
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
