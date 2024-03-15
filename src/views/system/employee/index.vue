<template>
    <el-card>
        <template #header>
            <el-form :inline="true" :model="params">
                <el-form-item label="员工姓名">
                    <el-input v-model="params.name" placeholder="请输入员工姓名" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="pageChange(1)">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleModel('add')">新增</el-button>
                </el-form-item>
            </el-form>
        </template>
        <el-table style="width: 100%" :data="employeeList">
            <el-table-column fixed type="index" label="序号" width="auto" />
            <el-table-column label="详情" width="80">
                <template #default="{ row }">
                    <el-link type="primary" :underline="false" @click="handleSHowDetail(row)">详情</el-link>
                </template>

            </el-table-column>
            <el-table-column label="员工姓名" width="180" prop="name" />
            <el-table-column label="登录账号" width="180" prop="userName" />
            <el-table-column label="联系方式" width="120" prop="phonenumber" />
            <el-table-column label="角色" width="120" prop="roleName" />
            <el-table-column label="状态">
                <template #default="scope">
                    {{ scope.row.status }}
                </template>
            </el-table-column>
            <el-table-column label="添加时间" prop="createTime" />
            <el-table-column label="操作" fixed="right" width="210">
                <template #default="scope">
                    <el-button-group>
                        <el-button size="small" type="success" @click="handleModel('edit', scope.row)">编辑</el-button>
                        <el-popconfirm width="220" confirm-button-text="删了它" cancel-button-text="取消" :icon="InfoFilled"
                            icon-color="#626AEF" title="确认删除吗?" @confirm="handleRemove(scope.row)"
                            @cancel="cancelEvent">
                            <template #reference>
                                <el-button size="small" type="danger">删除</el-button>
                            </template>
                        </el-popconfirm>

                        <el-button size="small">重置密码</el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
        <template #footer>
            <el-pagination layout="total, prev, pager, next" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize"
                :total="total" @current-change="pageChange" @next-click="handlNextChange"
                @prev-click="handlPrevChange" />
        </template>
        <edit-model :visible="visibleModel" :title="flag ? '新增员工' : '编辑员工'" :flag="flag" :formData="formData"
            @update:visible="handleCloseAction" />
        <DetailModule />
    </el-card>
</template>

<script setup lang='ts'>
import { message } from '@/utils';
import EditModel from './editmodel/index.vue'
import DetailModule from './detailmodule/index.vue'
import { GetUserListInfo, DeleteUser, GetUserDetail } from '@/services'
import { InfoFilled } from '@element-plus/icons-vue'

const visibleModel = ref<boolean>(false)
const total = ref<number>(0)
const params = reactive<API.PageParams & {
    name: string;
}>({
    page: '1',
    pageSize: '10',
    name: '',
})
const pageSize = computed(() => {
    return parseInt(params.pageSize as string) || 10
})

const flag = ref<'add' | 'edit'>('add')
const employeeList = ref<API.EmployeeInfo[]>([])

// 获取员工列表
const initData = async () => {
    console.log('params: ', params);
    const res = await GetUserListInfo(params)
    employeeList.value = res.data.rows
    total.value = res.data.total
}


onMounted(() => {
    initData();
})

const pageChange = (val: number) => {
    params.page = val.toString()
    initData()
}

const createFormData = () => {
    return {
        name: '',
        userName: '',
        phonenumber: '',
        roleId: '',
        status: 1,
    } as API.EmployeeInfo
}

let formData = reactive<API.EmployeeInfo>(createFormData())
const handleModel = (_flag: 'add' | 'edit', data?: API.EmployeeInfo) => {
    visibleModel.value = true
    flag.value = _flag
    if (_flag === 'edit') {
        formData = data as API.EmployeeInfo
    } else {
        // 新增员工
        formData = createFormData()
    }
}

const handleCloseAction = (val: boolean) => {
    visibleModel.value = val;
    // 关闭弹窗后重新获取数据
    initData();
}

const cancelEvent = () => {
    message.error('取消删除', {
        showClose: true,
        duration: 2000
    })
}

const handleRemove = async (data: API.EmployeeInfo) => {
    return
    const res = await DeleteUser(data.id as number, {
        'Content-Type': 'application/json'
    })
    if (res.code === 10000) {
        //提示删除成功
        initData();
    }
}

const handleSHowDetail = async (data: API.EmployeeInfo) => {
    const res = await GetUserDetail(data.id as number)
    formData = res.data
}


const handlNextChange = () => {
    console.log('下一页')
    params.page = (Number(params.page) + 1) > Math.ceil(total.value / pageSize.value) ? Math.ceil(total.value / pageSize.value).toString() : (Number(params.page) + 1).toString()
    initData()
}
const handlPrevChange = () => {
    console.log('上一页')
    params.page = (Number(params.page) - 1) > 0 ? (Number(params.page) - 1).toString() : '1'
    initData()
}
</script>

<style lang='scss' scoped>
:deep(.el-card__footer) {
    display: flex;
    justify-content: flex-end;
}
</style>
