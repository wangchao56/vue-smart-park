<template>
    <BaseTable ref="TableRef" :total="10" :dataSource="dataSource" :columns="columns" :showSearch="true"
        @search-action="searchActionhandler" @batch-action="handleBatchAction">
        <template #actionbtn>
            <el-button type="primary" @click="handleActions('add', null)">添加月卡</el-button>
            <el-button type="primary" @click="handleOneOrBatchDel(selectedRows)"
                :disabled="!selectedRows.length">批量删除</el-button>
        </template>
        <template #action="{ row }">
            <el-button text type="primary" size="small" @click="handleActions('renew', row)">续费</el-button>
            <el-button text type="primary" size="small" @click="handleActions('detail', row)">查看</el-button>
            <el-button text type="primary" size="small" @click="handleActions('edit', row)">编辑</el-button>
            <el-button text type="primary" size="small" @click="handleActions('delete', row)">删除</el-button>
        </template>
    </BaseTable>
</template>

<script setup lang='ts'>
import BaseTable, { ColumnType } from '@/components/BaseTable.vue';
import { GetCarCardList, DeleteCarCard } from '@/services';
import { addIndex, message } from '@/utils';
import { useRouter } from 'vue-router';

const router = useRouter();
const TableRef = ref<any>();
let params = reactive<API.ShowCarMonthCard>({
    page: '1',
    pageSize: '10',
});

const dataSource = ref<API.MonthCardInfo[]>([]);
//多选数据
const selectedRows = ref<API.MonthCardInfo[]>([]);


const initDataSource = async (_params: API.ShowCarMonthCard) => {
    const res = await GetCarCardList(_params);
    dataSource.value = addIndex(res.data.rows);
};

onMounted(() => {
    initDataSource(params);
});

const cardStatusOptions = [
    {
        label: '已过期',
        value: 1,
    },
    {
        label: '可用',
        value: 0,
    },
    {
        label: '全部',
        value: 'all',
        default: true,
    }
]

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
        width: 60,
        fixed: 'left',
    },
    {
        label: '车主名称',
        prop: 'personName',
        search: true,
    },
    {
        label: '联系方式',
        prop: 'phoneNumber',
    },
    {
        label: '车牌号码',
        prop: 'carNumber',
        search: true,

    },
    {
        label: '车辆品牌',
        prop: 'carBrand',
        width: 200,
    },
    {
        label: '剩余有效天数',
        prop: 'totalEffectiveDate',
        width: 200,
    },
    {
        width: 100,
        search: true,
        label: '状态',
        formType: 'select',
        prop: 'cardStatus',
        options: cardStatusOptions,
        render: (row: API.MonthCardInfo) => {
            return cardStatusOptions.find((item) => item.value == row.cardStatus)?.label || '--';
        },
    },
    {
        width: 300,
        label: '操作',
        prop: 'action',
        type: 'action',
        fixed: 'right',
    },
];

const handleActions = (type: string, row: API.MonthCardInfo) => {
    ;
    switch (type) {
        case 'add':
            router.push('/car/addcard');
            break;
        case 'renew':
            router.push(`/car/renewcard/${row.id}`);
            break;
        case 'detail':
            router.push(`/car/carddetail/${row.id}`);
            break;
        case 'edit':
            router.push(`/car/editcard/${row.id}`);
            break;
        case 'delete':
            handleOneOrBatchDel([row]);
            break;
    }
};

const handleBatchAction = (records: API.MonthCardInfo[]) => {
    selectedRows.value = records;
};
//删除和批量删除 
const handleOneOrBatchDel = async (records: API.MonthCardInfo[]) => {
    ;
    const len = records.length;
    if (len === 0) {
        return;
    }
    const result = await message.reminder(len === 1 ? '是否删除该月卡信息?' : '是否删除选中的月卡?')
    if (result !== 'confirm') {
        return;
    }
    const ids = unref(records).map((item) => item.id);
    const res = await DeleteCarCard(ids);
    if (res.code === 10000) {
        message.success('批量删除成功');
        initDataSource(params);
    }
    else {
        message.error('批量删除失败');
    }
};

//从columns中获取search为true的字段，然后拼接成查询参数
const searchActionhandler = (_params: Omit<API.ShowCarMonthCard, 'page' | 'pageSize'>) => {
    let tempParams = {};
    columns.forEach((item) => {
        if (item.search) {
            tempParams[item.prop] = _params[item.prop];
        }
        if (item.formType === 'select') {
            tempParams[item.prop] = _params[item.prop] === 'all' ? '' : _params[item.prop];
        }
    });
    ;
    initDataSource({
        ...params,
        ...tempParams,
    });
};
</script>

<style lang='scss' scoped></style>
