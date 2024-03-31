<template>
    <BaseTable ref="TableRef" :showSearch="true" :dataSource="dataSource" :columns="columns"
        @search-action="handleSearch" @form-action="handleFormAction">
        <template #actionbtn>
            <el-button type="primary" @click="handleAdd">添加员工</el-button>
        </template>
        <template #action="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" @click="handleDelete(row)">删除</el-button>
            <el-button type="text" @click="handleResetPassword(row)">重置密码</el-button>
        </template>
        <template #formContent>
            <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="80px">
                <el-form-item label="员工姓名" prop="name">
                    <el-input v-model="addForm.name" />
                </el-form-item>
                <el-form-item label="登录账号" prop="userName">
                    <el-input v-model="addForm.userName" />
                </el-form-item>
                <el-form-item label="联系方式" prop="phonenumber">
                    <el-input v-model="addForm.phonenumber" />
                </el-form-item>
                <el-form-item label="分配角色" prop="roleId">
                    <el-select v-model="addForm.roleId" placeholder="请选择角色">
                        <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName"
                            :value="item.roleId" />
                    </el-select>
                </el-form-item>
                <el-form-item label="员工状态" prop="status">
                    <el-radio-group v-model="addForm.status">
                        <el-radio :value="0">禁用</el-radio>
                        <el-radio :value="1">启用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </template>
    </BaseTable>
</template>

<script setup lang='ts'>
import { addIndex, message } from '@/utils';
import type { Handlers } from '@/components/BaseTable.vue';
import { GetUserListInfo, DeleteUser, GetRoleList, AddUser, UpdateUser } from '@/services'
import { type FormInstance } from 'element-plus';

const TableRef = ref<Handlers<API.EmployeeInfo> | null>(null)

const dataSource = ref<API.EmployeeInfo[]>([])
//角色列表
const roleList = ref<API.RoleInfo[]>([])
const statusOptions = [
    {
        label: '禁用',
        value: 0
    },
    {
        label: '启用',
        value: 1
    },
]

const columns: UTIL.ColumnType[] = [
    {
        type: 'index',
        label: '序号',
        prop: 'index',
        width: 70

    },
    {
        label: '员工姓名',
        prop: 'name',
        search: true,
    },
    {
        label: '登录账号',
        prop: 'userName',
    },
    {
        label: '联系方式',
        prop: 'phonenumber',
    },
    {
        label: '角色',
        prop: 'roleName',
    },
    {
        label: '状态',
        prop: 'status',
        render: (row) => {
            return statusOptions.find(item => item.value == row.status).label || '--'
        }
    },
    {
        label: '添加时间',
        prop: 'createTime',
    },
    {
        label: '操作',
        prop: 'action',
        type: 'action',
    }
]
//表单验证规则
const addFormRules = {
    name: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
    userName: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
    phonenumber: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
    roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
    status: [{ required: true, message: '请选择员工状态', trigger: 'change' }],
}
const addFormRef = ref<FormInstance>()

//创建表单数据
const createFormData = (record?: API.AddUserParams | API.EmployeeInfo & { index: number }) => {
    addForm.value = {
        id: record?.id || '',
        name: record?.name || '',
        userName: record?.userName || '',
        phonenumber: record?.phonenumber || '',
        roleId: record?.roleId || '',
        status: record?.status || 1
    }
}
//表单数据
let addForm = ref<API.AddUserParams>()

const params = reactive<API.PageParams & {
    name: string;
}>({
    page: '1',
    pageSize: '10',
    name: '',
})

// 获取员工列表
const initData = async () => {
    console.log('params: ', params);
    const res = await GetUserListInfo(params)
    dataSource.value = addIndex(res.data.rows)
}
//获取角色列表
const initRoleList = async () => {
    const res = await GetRoleList()
    roleList.value = res.data
}

const handleSearch = async (_params: any) => {
    Object.assign(params, {
        name: _params.name || '',
    })
    await initData()
}
const clearValidate = () => {
    console.log(addFormRef.value);
    if (!addFormRef.value) return;
    addFormRef.value.clearValidate();
}
const handleAdd = async () => {
    if (!TableRef.value) return;
    const { handleOpenModel } = unref(TableRef.value)
    if (roleList.value.length === 0) await initRoleList();
    handleOpenModel('添加员工', 'add')
    createFormData();
}
const handleEdit = async (row: API.EmployeeInfo & { index: number }) => {
    if (!TableRef.value) return;
    const { handleOpenModel } = unref(TableRef.value);
    if (roleList.value.length === 0) await initRoleList();
    handleOpenModel('编辑员工', 'edit');
    createFormData(row);
}
const handleDelete = async (row: API.EmployeeInfo & { index: number }) => {
    try {
        await message.reminder('确定删除该员工吗？');
        const res = await DeleteUser(row.id, {
            'Content-Type': 'application/json'
        });
        if (res.code === 10000) {
            message.success('删除成功');
        } else {
            message.error(res.msg);
        }
    } catch (error) {
        message.error('取消删除');
    }
}

const handleFormAction = async (type: UTIL.FormActionType) => {
    console.log(type);
    switch (type) {
        case 'add':
            handleAddAction();
            break;
        case 'edit':
            handleEditAction();
            break;
        case 'close':
            //清除表单验证
            clearValidate();
            createFormData()
            break;
        default:
            break;
    }
}

//表单验证
const validateForm = () => {
    return new Promise((resolve, reject) => {
        addFormRef.value.validate((valid: boolean) => {
            if (valid) {
                resolve(true)
            } else {
                reject(false)
            }
        })
    })
}

const handleAddAction = async () => {
    // 表单验证
    const isValid = await validateForm();
    if (!isValid) return;
    // 提交表单
    const { id, ...formData } = addForm.value
    console.log(formData);
    //去掉id
    const res = await AddUser(formData, {
        'Content-Type': 'application/json'
    });
    if (res.code === 10000) {
        message.success('添加成功');
        initData();
    } else {
        message.error(res.msg);
    }
    const { handleCloseModel } = TableRef.value;
    handleCloseModel();
}

const handleEditAction = async () => {
    // 表单验证
    const isValid = await validateForm();
    if (!isValid) return;
    // 提交表单
    const formData = addForm.value
    const res = await UpdateUser(formData, {
        'Content-Type': 'application/json'
    });
    if (res.code === 10000) {
        message.success('添加成功');
        initData();
    } else {
        message.error(res.msg);

    }
    const { handleCloseModel } = TableRef.value;
    handleCloseModel();
}

const handleResetPassword = async (record: API.UserProfile) => {
    console.log(record);
}

onMounted(() => {
    initData();
})


</script>

<style lang='scss' scoped>
:deep(.el-card__footer) {
    display: flex;
    justify-content: flex-end;
}
</style>
