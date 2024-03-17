<template>
    <BaseTable :dataSource="dataSource" title="区域" :columns="columns" />
</template>

<script setup lang='ts'>
import BaseTable, { ColumnType } from '@/components/BaseTable.vue';
import { GetCarCardList } from '@/services';


const params: API.ShowCarMonthCard = {
    page: '1',
    pageSize: '10',
};

const dataSource = ref<API.MonthCardInfo[]>([]);


const initDataSource = async () => {
    const res = await GetCarCardList(params);
    dataSource.value = res.data.rows;
};

onMounted(() => {
    initDataSource();
});


const columns: ColumnType[] = [
    {
        label: '车主名称',
        prop: 'personName',
    },
    {
        label: '联系方式',
        prop: 'phoneNumber',
    },
    {
        label: '车牌号码',
        prop: 'carNumber',
    },
    {
        label: '车辆品牌',
        prop: 'carBrand',
    },
    {
        label: '剩余有效天数',
        prop: 'totalEffectiveDate',
    },
    {
        label: '状态',
        prop: 'cardStatus',
    },
    {
        label: '操作',
        prop: 'action',
        type: 'action',
    },
];
</script>

<style lang='scss' scoped></style>
