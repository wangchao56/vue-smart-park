<template>
    <BaseTable :dataSource="dataSource" title="区域" :showSearch="true" :columns="columns" />
</template>

<script setup lang='ts'>
import BaseTable, { ColumnType } from '@/components/BaseTable.vue';
import { GetCarPaymentList } from '@/services';
import { addIndex } from '@/utils';


const params: API.CarPaymentListQuery = {
    page: '1',
    pageSize: '10',

};

const dataSource = ref<API.CarPaymentInfo[]>([]);


const initDataSource = async () => {
    const res = await GetCarPaymentList(params);
    dataSource.value = addIndex(res.data.rows);
};

onMounted(() => {
    initDataSource();
});

const paymentMethodoptions = {
    Alipay: '支付宝',
    WeChat: '微信',
}

const chargeTypeoptions = {
    temp: '临时停车',
    card: '月卡停车',
}

const paymentStatusoptions = [
    {
        label: '全部',
        value: 'all',
        default: true,
    },
    {
        label: '已缴费',
        value: 1,
    },
    {
        label: '未缴费',
        value: 0,
    },
]


const columns: ColumnType[] = [
    {
        type: 'index',
        prop: 'index',
        label: '序号',
    },
    {
        label: '车牌号码',
        prop: 'carNumber',
        search: true,
        formType: 'input',
    },
    {
        label: '收费类型',
        prop: 'chargeType',
        render: (row: API.CarPaymentInfo) => {
            return chargeTypeoptions[row.chargeType] || '--';
        },
    },
    {
        label: '停车总时长',
        prop: 'parkingTime',
    },
    {
        label: '缴纳费用（元）',
        prop: 'actualCharge',
    },
    {
        label: '缴纳状态',
        prop: 'paymentStatus',
        formType: 'select',
        options: paymentStatusoptions,
        search: true,
        render: (row: API.CarPaymentInfo) => {
            return paymentStatusoptions.find((item) => item.value === row.paymentStatus)?.label || '--';
        },
    },
    {
        label: '缴纳方式',
        prop: 'paymentMethod',
        render: (row: API.CarPaymentInfo) => {
            return paymentMethodoptions[row.paymentMethod] || '--';
        },
    },
    {
        label: '缴纳时间',
        prop: 'paymentTime',
    },
];
</script>

<style lang='scss' scoped></style>
