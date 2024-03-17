<template>
    <BaseTable :dataSource="dataSource" title="区域" :columns="columns" />
</template>

<script setup lang='ts'>
import BaseTable, { ColumnType } from '@/components/BaseTable.vue';
import { GetPropertyFeeList } from '@/services';



const dataSource = ref<API.PropertyFeeInfo[]>([]);
const params = reactive<API.PropertyFeeListQuery>({
    page: '1',
    pageSize: '10',
    enterpriseName: '',
    start: '',
    end: ''
}); // 查询参数


const initDataSource = async () => {
    const res = await GetPropertyFeeList(params);
    dataSource.value = res.data.rows;
};

onMounted(() => {
    initDataSource();
});

const columns: ColumnType[] = [
    {
        label: '账单编号',
        prop: 'billNumber',
    },
    {
        label: '企业名称',
        prop: 'enterpriseName',
    },
    {
        label: '租赁楼宇',
        prop: 'buildingName',
    },
    {
        label: '物业费(元/m²)',
        prop: 'propertyFeePrice',
    },
    {
        label: '账单金额(元)',
        prop: 'paymentAmount',
    },
    {
        label: '缴费时间',
        prop: 'createTime',
    },
    {
        label: '操作',
        prop: 'action',
        type: 'action',
    },
];
</script>

<style lang='scss' scoped></style>
