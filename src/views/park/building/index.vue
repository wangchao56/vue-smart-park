<template>
    <BaseTable ref="tableRef" :dataSource="dataSource" :showSearch="true" :columns="columns"
        @form-action="formActionHandler" @search-action="handleSearch">
        <template #actionbtn>
            <el-button type="primary" @click="handleAction('add', undefined)">添加楼宇</el-button>
        </template>
        <template #action="{ row }">
            <el-button text type="primary" size="small" @click="handleAction('edit', row)">编辑</el-button>
            <el-button text type="primary" :disabled="row.status === 1" size="small"
                @click="handleAction('delete', row)">删除</el-button>
        </template>
        <template #formContent>
            <el-form ref="FormRef" :model="formData" :rules="formRules" label-position="top" label-width="80px">
                <el-form-item label="楼宇名称" prop="name">
                    <el-input v-model="formData.name" size="large" type="input" :placeholder="`请输入楼宇名称`" />
                </el-form-item>
                <el-form-item label="楼宇层数" prop="floors">
                    <el-input v-model="formData.floors" :min="1" :max="10" controls-position="right" size="large"
                        prop="floors" type="number" :placeholder="`请输入楼宇层数`" />
                </el-form-item>
                <el-form-item label="在管面积" prop="area">
                    <el-input v-model="formData.area" @blur="blurhandler" type="input" size="large"
                        :formatter="formatterHandler" :placeholder="`请输入在管面积`">
                        <template #append>
                            <span>㎡</span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="物业费" prop="propertyFeePrice">
                    <el-input v-model="formData.propertyFeePrice" @blur="blurhandler" type="input" size="large"
                        :formatter="formatterHandler" :placeholder="`请输入物业费`">
                        <template #append>
                            <span>元/㎡</span>
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
        </template>
    </BaseTable>
</template>

<script setup lang='ts'>
import type { Handlers } from '@/components/BaseTable.vue';
import { GetBuildingList, DeleteBuilding, PostBuilding, PutBuilding } from '@/services'
import { addIndex, message } from '@/utils';
import { FormInstance } from 'element-plus';
const params: API.BuildingListQuery = {
    page: '1',
    pageSize: '10'
}

const tableRef = ref<Handlers<API.BuildingInfo>>()
const FormRef = ref<FormInstance>()
const dataSource = ref<API.BuildingInfo[]>([])

const formData = ref<API.BuildingInfo>({
    name: '',
    floors: '',
    area: '',
    propertyFeePrice: ''
})
const createFormData = (record?: API.BuildingInfo) => {
    formData.value = {
        id: record?.id || '',
        name: record?.name || '',
        floors: record?.floors || '',
        area: record?.area || '',
        propertyFeePrice: record?.propertyFeePrice || ''
    }
}

const statusOptions = [
    {
        value: 1,
        label: '租赁中'
    },
    {
        value: 0,
        label: '空置中'
    }
]

const columns: UTIL.ColumnType[] = [
    {
        label: '序号',
        prop: 'index',
        type: 'index'

    },
    {
        label: '楼宇名称',
        prop: 'name',
        search: true,
        formType: 'input'
    },
    {
        label: '楼层',
        prop: 'floors',
    },
    {
        label: '在管面积(m²)',
        prop: 'area',
    },
    {
        label: '物业费(元/m²)',
        prop: 'propertyFeePrice',
    },
    {
        label: '状态',
        prop: 'status',
        render: (row: API.BuildingInfo) => {
            return statusOptions.find((item) => item.value === row.status)?.label || '--';
        },
    },
    {
        label: '操作',
        prop: 'action',
        type: 'action'
    }

]

const formRules = {
    name: [{ required: true, message: '请输入楼宇名称', trigger: 'blur' }],
    floors: [{ required: true, message: '请输入楼层数', trigger: 'blur' }],
    area: [{ required: true, message: '请输入面积', trigger: 'blur' }],
    propertyFeePrice: [{ required: true, message: '请输入物业费', trigger: 'blur' }],
}

const initGetBuildingList = async () => {
    const res = await GetBuildingList(params)
    console.log(res)
    dataSource.value = addIndex(res.data.rows)
}

const handleSearch = async (record: API.BuildingInfo) => {
    console.log(record);
    Object.assign(params, record)
    await initGetBuildingList()

}

const formatterHandler = (value: string | number) => {
    //只允许输入0-9数字,保留两位小数 可以输入小数点
    value = value.toString() //转成字符串
    // 只允许输入数字 和 .
    value = value.replace(/[^\d.]/g, '')
    return value
}

const blurhandler = (e: any) => {
    if (e.target.value) {
        e.target.value = Number(e.target.value).toFixed(2)
    }
}

const handleAction = (flag: UTIL.FormActionType, row: API.BuildingInfo) => {
    console.log('row: ', row);
    console.log(flag)
    const { handleOpenModel, handleOpenDrawer } = unref(tableRef)
    switch (flag) {
        case 'add':
            createFormData()
            handleOpenModel('新增楼宇', 'add')
            break;
        case 'edit':
            createFormData(row)
            handleOpenModel('编辑楼宇', 'edit');
            break;
        case 'detail':
            handleOpenDrawer();
            break;
        case 'delete':
            console.log('删除')
            handleDelete(row)
            break;
        default:
            break;
    }
}

const formActionHandler = async (type: UTIL.FormActionType) => {

    if (type === 'close') {
        //清除表单验证
        unref(FormRef).clearValidate();
        return;
    }
    try {
        //表单验证
        const valid = await unref(FormRef).validate();
        if (!valid) return;
        switch (type) {
            case 'add':
                const { id, ...data } = formData.value;
                handleAdd(data);
                break;
            case 'edit':
                handleEdit(formData.value);
                break;
        }
    } catch (error) {
        console.log('error: ', error);
        //表单验证失败 提示错误信息
        message.error('表单验证失败');
    }

}
//增加
const handleAdd = async (record: API.BuildingInfo) => {
    const res = await PostBuilding(record);
    console.log('res: ', res);
    if (res.code === 10000) {
        message.success('添加成功');
        // 关闭弹窗
        unref(tableRef).handleCloseModel();
        await initGetBuildingList();
    } else {
        message.error(`添加失败：${res.msg}`);
    }
}

//编辑
const handleEdit = async (record: API.BuildingInfo) => {
    const res = await PutBuilding(record);
    console.log('res: ', res);
    if (res.code === 10000) {
        message.success('编辑成功');
        // 关闭弹窗
        unref(tableRef).handleCloseModel();
        await initGetBuildingList();
    } else {
        message.error(`编辑失败：${res.msg}`);
    }
}
//删除
const handleDelete = async (row: API.BuildingInfo) => {
    try {
        await message.reminder('确定删除吗?')
        const res = await DeleteBuilding(row.id)
        if (res.code === 10000) {
            message.success('删除成功')
            await initGetBuildingList();
        } else {
            message.error(res.msg)
        }
    } catch (error) {
        console.log(error)
        message.info('取消删除')
    }

}

onMounted(() => {
    initGetBuildingList()
})

</script>

<style lang='scss' scoped></style>
