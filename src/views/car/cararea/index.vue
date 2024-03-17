<template>
    <BaseTable :dataSource="dataSource" title="区域" :columns="columns" />
</template>

<script setup lang='ts'>
import BaseTable, { ColumnType } from '@/components/BaseTable.vue';
import { GetParkingAreaList } from '@/services';


const params: API.PageParams = {
    page: '1',
    pageSize: '10',
};

const dataSource = ref<API.ParkingAreaInfo[]>([]);


const columns: ColumnType[] = [
    {
        label: '区域名称',
        prop: 'areaName',
    },
    {
        label: '车位数（个）',
        prop: 'spaceNumber',
    },
    {
        label: '面积（㎡）',
        prop: 'areaProportion',
    },
    {
        label: '计费规则',
        prop: 'ruleId',
    },
    {
        label: '备注',
        prop: 'remark',
    },
    {
        label: '操作',
        prop: 'action',
        type: 'action',
    },
];








const initDataSource = async () => {
    const res = await GetParkingAreaList(params);
    console.log(res);
    dataSource.value = res.data.rows;
};


onMounted(() => {
    initDataSource();
});


</script>

<style lang='scss' scoped></style>
