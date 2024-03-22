<template>
    <BaseTable :dataSource="dataSource" :columns="columns" :showSearch="true" @batch-action="handleBatchAction">
        <template #actionbtn>
            <el-button type="primary">添加一体杆</el-button>
            <el-button type="danger">批量删除</el-button>
        </template>
        <template #action="{ row }">
            <el-button text type="primary" size="small">编辑</el-button>
            <el-button text type="primary" size="small">删除</el-button>
        </template>
    </BaseTable>
</template>

<script setup lang='ts'>
import BaseTable, { ColumnType } from '@/components/BaseTable.vue';
import { GetPoleInfoList } from '@/services';
import { addIndex } from '@/utils';

const dataSource = ref<API.PoleInfo[]>([]);
const params = reactive<API.PoleListQuery>({
    page: '1',
    pageSize: '10',
}); // 查询参数
//枚举值:entrance export center
const poleTypeOptions = {
    entrance: '入口',
    export: '出口',
    center: '中心',
};

const poleStatusOptions = [
    {
        label: '全部',
        value: 'all',
        default: true,
    },
    {
        label: '正常',
        value: 0,
    },
    {
        label: '故障',
        value: 1,
    },

]

//批量操作
const selectedRows = ref<API.PoleInfo[]>([]);

const handleBatchAction = (records: API.PoleInfo[]) => {
    selectedRows.value = records;
};

const initDataSource = async () => {
    const res = await GetPoleInfoList(params);
    dataSource.value = addIndex(res.data.rows);
};

onMounted(() => {
    initDataSource();
});

const columns: ColumnType[] = [
    {
        type: 'selection',
        width: 60,
        fixed: 'left',
    },
    {
        type: 'index',
        prop: 'index',
        label: '序号',
    },
    {
        label: '一体杆名称',
        prop: 'poleName',
        search: true,
    },
    {
        label: '一体杆编号',
        prop: 'poleNumber',
        search: true,
    },
    {
        label: '一体杆IP',
        prop: 'poleIp',
    },
    {
        label: '安装区域',
        prop: 'areaName',
    },
    {
        label: '一体杆类型',
        prop: 'poleType',
        render: (row: API.PoleInfo) => {
            return poleTypeOptions[row.poleType];
        },
    },
    {
        label: '运行状态',
        prop: 'poleStatus',
        formType: 'select',
        search: true,
        options: poleStatusOptions,
        render: (row: API.PoleInfo) => {
            return poleStatusOptions.find((item) => item.value === row.poleStatus)?.label || '--';
        },
    },
    {
        label: '操作',
        prop: 'action',
        type: 'action',
    },
];
</script>

<style lang='scss' scoped></style>
