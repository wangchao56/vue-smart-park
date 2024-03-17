<template>
    <BaseTable :dataSource="dataSource" title="区域" :columns="columns" />
</template>

<script setup lang='ts'>
import BaseTable, { ColumnType } from '@/components/BaseTable.vue';
import { GetCarPaymentList } from '@/services';


const params: API.CarPaymentListQuery = {
    page: '1',
    pageSize: '10',

};

const dataSource = ref<API.CarPaymentInfo[]>([]);


const initDataSource = async () => {
    const res = await GetCarPaymentList(params);
    dataSource.value = res.data.rows;
};

onMounted(() => {
    initDataSource();
});


const columns: ColumnType[] = [
    {
        label: '车牌号码',
        prop: 'carNumber',
    },
    {
        label: '收费类型',
        prop: 'chargeType',
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
    },
    {
        label: '缴纳方式',
        prop: 'paymentMethod',
    },
    {
        label: '缴纳时间',
        prop: 'paymentTime',
    },
    {
        label: '操作',
        prop: 'action',
        type: 'action',
    },
];
</script>

<style lang='scss' scoped></style>
