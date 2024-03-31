<template>
    <BaseTable ref="tableRef" :dataSource="dataSource" :columns="columns" @form-action="formActionHandler">
        <template #actionbtn>
            <el-button type="primary" @click="handleAction('add', undefined)">添加区域</el-button>
        </template>
        <template #action="{ row }">
            <el-button text type="primary" size="small" @click="handleAction('edit', row)">编辑</el-button>
            <el-button text type="primary" size="small" @click="handleAction('delete', row)">删除</el-button>
        </template>
        <template #formContent>
            <el-form ref="modelFormRef" :model="formModal" :rules="formRules" label-position="top" label-width="80px">
                <el-form-item label="区域名称" prop="areaName">
                    <el-input v-model="formModal.areaName" size="large" type="input" :placeholder="`请输入区域名称`" />
                </el-form-item>
                <el-form-item label="车位数（个）" prop="areaName">
                    <el-input v-model="formModal.spaceNumber" :min="1" :max="10" controls-position="right" size="large"
                        prop="spaceNumber" type="number" :placeholder="`请输入车位个数`" />
                </el-form-item>
                <el-form-item label="面积（㎡）" prop="areaProportion">
                    <el-input v-model="formModal.areaProportion" type="input" size="large" :placeholder="`请输入面积`">
                        <template #suffix>
                            <span>㎡</span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="关联计费规则" prop="ruleId">
                    <el-select v-model="formModal.ruleId" placeholder="请选择计费规则" size="large">
                        <el-option v-for="item in ruleOptions" :key="item.ruleId" :label="item.ruleName"
                            :value="item.ruleId" />
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="formModal.remark" size="large" type="textarea" />
                </el-form-item>
            </el-form>
        </template>
    </BaseTable>
</template>

<script setup lang='ts'>
import BaseTable, { Handlers } from '@/components/BaseTable.vue';
import { GetParkingAreaList, PostParkingAreaApi, DeleteParkingArea, PutParkingAreaApi } from '@/services';
import { addIndex } from '@/utils';
import { FormInstance } from 'element-plus';
import { message } from '@/utils';

const params: API.PageParams = {
    page: '1',
    pageSize: '10',
};

const dataSource = ref<API.ParkingAreaInfo[]>([]);

const tableRef = ref<Handlers<Record<string, any>>>();

const columns: UTIL.ColumnType[] = [
    {
        type: 'index',
        prop: 'index',
        label: '序号',
        width: 60,
        fixed: 'left',
    },
    {
        label: '区域名称',
        prop: 'areaName',
        formType: 'input',
    },
    {
        label: '车位数（个）',
        prop: 'spaceNumber',
        formType: 'digit',
    },
    {
        label: '面积（㎡）',
        prop: 'areaProportion',
        formType: 'input',
    },
    {
        label: '计费规则',
        prop: 'ruleName',
        formType: 'select',
    },
    {
        label: '备注',
        prop: 'remark',
        formType: 'textarea',
    },
    {
        label: '操作',
        prop: 'action',
        type: 'action',
    },
];

const modelFormRef = ref<FormInstance>();
let formModal = ref<API.ParkingAreaInfo>({
    areaName: '',
    spaceNumber: '',
    areaProportion: '',
    ruleId: '',
    remark: '',
});

const createFormData = (params?: API.ParkingAreaInfo) => {
    formModal.value = {
        id: params.id || '',
        areaName: params.areaName || '',
        remark: params.remark || '',
        areaProportion: params.areaProportion || '',
        ruleId: params.ruleId || '',
        spaceNumber: params.spaceNumber || '',
    };

};

const ruleOptions = [
    { ruleId: 1, ruleName: '按分钟计费' },
    { ruleId: 2, ruleName: '按小时计费' },
    { ruleId: 3, ruleName: '按次收费' },
    { ruleId: 4, ruleName: '分段计费' },
]
const formRules = reactive({
    areaName: [{ required: true, message: '请输入区域名称', trigger: 'blur' }],
    spaceNumber: [{ required: true, message: '请输入车位数', trigger: 'blur' }],
    areaProportion: [{ required: true, message: '请输入面积', trigger: 'blur' }],
    ruleId: [{ required: true, message: '请选择计费规则', trigger: 'blur' }],
    remark: [{ required: true, message: '请输入备注', trigger: 'blur' }],
});
const initDataSource = async () => {
    const res = await GetParkingAreaList(params);
    dataSource.value = addIndex(res.data.rows);
};

onMounted(() => {
    initDataSource();
});

const handleAction = (type: string, row: API.ParkingAreaInfo) => {
    console.log(type, row);
    switch (type) {
        case 'add':
            unref(tableRef).handleOpenModel('添加区域', type);
            createFormData()
            break;
        case 'edit':
            unref(tableRef).handleOpenModel('编辑区域', type);
            createFormData(row)
            break;
        case 'delete':
            handleDelete(row);
            break;
    }
};

const formActionHandler = async (type: string) => {
    if (type === 'close') {
        //清除表单验证
        unref(modelFormRef).clearValidate();
        return;
    }
    try {
        //表单验证
        const valid = await unref(modelFormRef).validate();
        if (!valid) return;
        switch (type) {
            case 'add':
                handleAdd(formModal.value);
                break;
            case 'edit':
                handleEdit(formModal.value);
                break;
        }
    } catch (error) {
        console.log('error: ', error);
        //表单验证失败 提示错误信息
        message.error('表单验证失败');
    }
};

//添加操作
const handleAdd = async (record: API.ParkingAreaInfo) => {
    const { id, ..._params } = record;
    const res = await PostParkingAreaApi(_params);
    console.log('res: ', res);
    if (res.code === 10000) {
        message.success('添加成功');
        // 关闭弹窗
        unref(tableRef).handleCloseModel();
        initDataSource();
    } else {
        message.error(`添加失败：${res.msg}`);
    }
};

//编辑操作
const handleEdit = async (params: API.ParkingAreaInfo) => {
    const res = await PutParkingAreaApi(params);
    console.log('res: ', res);
    if (res.code === 10000) {
        message.success('编辑成功');
        // 关闭弹窗
        unref(tableRef).handleCloseModel();
        initDataSource();
    } else {
        message.error(`编辑失败：${res.msg}`);
    }
};

//删除操作
const handleDelete = async (row: API.ParkingAreaInfo) => {
    //弹窗确认
    try {
        const result = await message.reminder('是否确认删除该区域？');
        if (result === 'confirm') {
            const res = await DeleteParkingArea(row.id);
            console.log('res: ', res);
            if (res.code === 10000) {
                message.success('删除成功');
            } else {
                message.error(`删除失败：${res.msg}`);
            }
        }
    }
    catch (error) {
        message.info('取消删除');

    }
    finally {
        initDataSource();
    }
};

</script>

<style lang='scss' scoped></style>
