<template>
    <el-dialog v-model="dialogVisible" :title="props.title" width="500" :before-close="handleClose">
        <!-- 表单接口 -->
        <div class="form-container">
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
        </div>
        <template #footer>
            <el-button size="small" @click="handleClose">取 消</el-button>
            <el-button size="small" type="primary" @click="handleAction(addFormRef)">确 定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
//新增员工 和编辑员工 公用一个组件
//带默认参数的props visible默认为false
// 组件名称 EditModel 
import type { FormInstance } from 'element-plus';
import { UpdateUser, GetRoleList, AddUser } from '@/services'

const props = defineProps<{
    visible: boolean,
    title: string,
    flag: 'add' | 'edit',
    formData: API.EmployeeInfo

}>()

const emit = defineEmits(['update:visible'])
const handleClose = () => {
    //关闭弹窗
    emit('update:visible', false)
}
const addFormRef = ref<FormInstance>()

const dialogVisible = ref<boolean>(props.visible)

watch(() => props.visible, (val) => {
    dialogVisible.value = val
})
//表单数据
const addForm = reactive<API.AddUserParams>({
    name: '',
    userName: '',
    phonenumber: '',
    roleId: '',
    status: 1
})

watch(() => props.formData, (val) => {
    if (val) {
        addForm.name = val.name;
        addForm.userName = val.userName!;
        addForm.phonenumber = val.phonenumber;
        addForm.roleId = val.roleId;
        addForm.status = val.status;
    }
})


//角色列表
const roleList = ref<API.RoleInfo[]>([])

onMounted(async () => {
    //获取角色列表
    const res = await GetRoleList()
    roleList.value = res.data
})


//表单验证规则
const addFormRules = {
    name: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
    userName: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
    phonenumber: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
    roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
    status: [{ required: true, message: '请选择员工状态', trigger: 'change' }],
}

const handleAction = (_form: FormInstance | undefined) => {
    if (!_form) return
    _form?.validate(async (valid: boolean) => {
        if (valid) {
            //提交表单
            if (props.flag === 'add') {
                //新增员工
                const temp = confirm('是否新增员工')
                if (!temp) return;
                const res = await AddUser(addForm, {
                    'Content-Type': 'application/json'
                })
                //关闭弹窗
                if (res.code === 10000) {
                    emit('update:visible', false)
                }
            } else {
                //询问是否编辑员工
                const temp = confirm('是否编辑员工')
                if (!temp) return;
                //编辑员工
                const res = await UpdateUser(addForm, {
                    'Content-Type': 'application/json'
                })
            }
        } else {
            return false
        }
    })
}

</script>

<style lang="scss" scoped></style>
