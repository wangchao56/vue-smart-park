<template>
    <BaseTable :dataSource="dataSource" :columns="columns" :showSearch="true" @batch-action="handleBatchAction">
        <template #actionbtn>
            <el-button type="primary">添加一体杆</el-button>
            <el-button type="danger" @click="handleBatchDel">批量删除</el-button>
        </template>
        <template #action="{ row }">
            <el-button text type="primary" size="small" @click="hanleActions('edit', row)">编辑</el-button>
            <el-button text type="primary" size="small" @click="hanleActions('delete', row)">删除</el-button>
        </template>
        <!-- form表单 -->
        <template #formContent>
            <el-form>
                <el-form-item label="一体杆名称" prop="poleName">
                    <el-input v-model="params.poleName" placeholder="请输入一体杆名称" />
                </el-form-item>
                <el-form-item label="一体杆编号" prop="poleNumber">
                    <el-input v-model="params.poleNumber" placeholder="请输入一体杆编号" />
                </el-form-item>
                <el-form-item label="运行状态" prop="poleStatus">
                    <el-select v-model="params.poleStatus" placeholder="请选择运行状态">
                        <el-option v-for="item in poleStatusOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
            </el-form>
        </template>
    </BaseTable>
</template>

<script setup lang='ts'>
import BaseTable, { ColumnType } from '@/components/BaseTable.vue';
import { GetPoleInfoList, DetelePoleInfo } from '@/services';
import { addIndex, message } from '@/utils';

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

//批量删除
const handleBatchDel = async () => {
    console.log('selectedRows: ', selectedRows.value);
    if (selectedRows.value.length === 0) {
        message.warning('请选择要删除的数据');
        return;
    }
    const ids = selectedRows.value.map((item) => item.id).join(',');
    await handleDeleteAndBatchDel(ids);
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


//操作
const hanleActions = (type: string, row: API.PoleInfo) => {
    switch (type) {
        case 'edit':
            console.log('编辑', row);
            handleEdit(row);
            break;
        case 'delete':
            console.log('删除', row);
            handleDelete(row);
            break;
        default:
            break;
    }
};

//编辑
const handleEdit = (row: API.PoleInfo) => {
    console.log('编辑', row);
};

//删除
const handleDelete = async (row: API.PoleInfo) => {
    await handleDeleteAndBatchDel(row.id as string);
    initDataSource();
};

//删除和批量删除
const handleDeleteAndBatchDel = async (ids: string) => {
    try {
        await message.reminder('是否确认删除该数据');
        const res = await DetelePoleInfo(ids);
        console.log('res: ', res);
        message.success('删除成功');
    } catch (err) {
        console.log('err: ', err);
    }
};

</script>

<style lang='scss' scoped></style>
