<template>
    <BaseTable :showSearch="true" :dataSource="dataSource" :columns="columns">
        <template #action="{ row }">
            <el-button text :type="row.handleStatus === 0 ? 'primary' : 'info'" @click="handleModel('edit', row)"
                :disabled="row.handleStatus !== 0">派单</el-button>
            <el-button text type="primary" @click="handleModel('detail', row)">详情</el-button>
            <el-button text :type="row.handleStatus === 3 ? 'primary' : 'info'" @click="handleModel('delete', row)"
                :disabled="row.handleStatus !== 3">删除</el-button>
        </template>
    </BaseTable>
</template>

<script setup lang='ts'>
import BaseTable, { ColumnType } from '@/components/BaseTable.vue';
import { GetPoleWarningList } from '@/services';
import { addIndex } from '@/utils';

const dataSource = ref<API.WarningInfo[]>([]);

const params = reactive<API.WarningQueryParams>({
    page: '1',
    pageSize: '10',
}); // 查询参数

const initDataSource = async () => {
    const res = await GetPoleWarningList(params);
    dataSource.value = addIndex(res.data.rows);
};

onMounted(() => {
    initDataSource();
});


const statusOptions = [
    {
        label: '全部',
        value: 'all',
        default: true,
    },
    {
        label: '未派单',
        value: 0,
    },
    {
        label: '已派单',
        value: 1,
    },
    {
        label: '已接单',
        value: 2,
    },
    {
        label: '已完成',
        value: 3,
    },

]


const columns: ColumnType[] = [
    {
        type: 'index',
        prop: 'index',
        label: '序号',
        width: 80,
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
        label: '故障类型',
        prop: 'errorType',

    },
    {
        label: '处置状态',
        prop: 'handleStatus',
        formType: 'select',
        options: statusOptions,
        search: true,
        render: (row: API.WarningInfo) => {
            return statusOptions.find(item => item.value === row.handleStatus)?.label || '--';
        },
    },
    {
        label: '告警时间',
        prop: 'warningTime',
    },
    {
        label: '操作',
        prop: 'action',
        type: 'action',
    },
];

const handleModel = (type: 'edit' | 'detail' | 'delete', row: API.WarningInfo) => {
    console.log(type, row);
};





</script>

<style lang='scss' scoped></style>
