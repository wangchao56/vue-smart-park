<template>
    <BaseTable :dataSource="dataSource" addBtnTitle="增加停车计费规则" :columns="columns">
        <template #actionbtn>
            <el-button type="primary" @click="handleAddAction()">增加停车计费规则</el-button>
        </template>
        <template #action="{ row }">
            <el-button text type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button text type="danger" size="small" @click="handleDel(row)">删除</el-button>
        </template>

    </BaseTable>
</template>

<script setup lang='ts'>
import BaseTable, { ColumnType } from '@/components/BaseTable.vue';
import { GetCarRuleList, PutCarRule, DeleteCarRule } from '@/services';
import { addIndex } from '@/utils';

const dataSource = ref<API.CarRuleDetail[]>([]);


const initDataSource = async () => {
    const res = await GetCarRuleList();
    dataSource.value = addIndex(res.data.rows);
};

onMounted(() => {
    initDataSource();
});

/**
 * chargeType
string 
必需
收费类型，时长收费:duration,按次收费:turn,分段收费:partition

枚举值:
duration
turn
partition
 */

const chargeTypeOptions = {
    duration: '时长收费',
    turn: '按次收费',
    partition: '分段收费',
};



const columns: ColumnType[] = [
    {
        type: 'index',
        prop: 'index',
        label: '序号',
    },
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
        prop: 'chargeType',
        render: (row: API.CarRuleDetail) => {
            return chargeTypeOptions[row.chargeType];
        },
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


//添加
const handleAddAction = () => {
    ;
};

//编辑
const handleEdit = async (row: API.CarRuleInfo) => {
    ;
    const flag = confirm('确认编辑吗？');
    if (!flag) {
        return;
    }
    const res = PutCarRule(row);
    ;
};
//删除
const handleDel = async (row: API.CarRuleDetail) => {
    ;


    const res = await DeleteCarRule(row.id);

};




</script>

<style lang='scss' scoped></style>
