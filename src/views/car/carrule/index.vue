<template>
    <BaseTable :dataSource="dataSource" title="区域" :columns="columns" />
</template>

<script setup lang='ts'>
import BaseTable, { ColumnType } from '@/components/BaseTable.vue';
import { GetCarRuleList } from '@/services';



const dataSource = ref<API.CarRuleDetail[]>([]);


const initDataSource = async () => {
    const res = await GetCarRuleList();
    dataSource.value = res.data.rows;
};

onMounted(() => {
    initDataSource();
});


const columns: ColumnType[] = [
    {
        label: '计费规则编号',
        prop: 'ruleNumber',
    },
    {
        label: '计费规则名称',
        prop: 'ruleName',
    },
    {
        label: '免费时长（分钟）',
        prop: 'freeDuration',
    },
    {
        label: '收费上限（元）',
        prop: 'chargeCeiling',
    },
    {
        label: '计费方式',
        prop: 'durationType',
    },
    {
        label: '计费规则',
        prop: 'ruleNameView',
    },
    {
        label: '操作',
        prop: 'action',
        type: 'action',
    },
];
</script>

<style lang='scss' scoped></style>
