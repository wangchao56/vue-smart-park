<template>
    <el-row justify="end" :gutter="23" align="top">
        <!-- 搜索区 -->
        <el-col :span="24">
            <el-form :inline="true" :model="params" class="demo-form-inline">
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
        </el-col>
        <el-col :span="24">
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
                            <el-button size="small" type="success"
                                @click="handleModel('edit', scope.row)">编辑</el-button>

                            <el-popconfirm width="220" confirm-button-text="删了它" cancel-button-text="取消"
                                :icon="InfoFilled" icon-color="#626AEF" title="确认删除吗?"
                                @confirm="handleRemove(scope.row)" @cancel="cancelEvent">
                                <template #reference>
                                    <el-button size="small" type="danger">删除</el-button>
                                </template>
                            </el-popconfirm>

                            <el-button size="small">重置密码</el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="12" class="row-pagination">
            <el-pagination layout="total, prev, pager, next" :page-size="pageSize" :total="total"
                @current-change="pageChange" />
        </el-col>
        <edit-model :visible="visibleModel" :title="flag ? '新增员工' : '编辑员工'" :flag="flag" :formData="formData"
            @update:visible="handleCloseAction" />
    </el-row>
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
    pageSize: '990',
    name: '',
})
const pageSize = computed(() => {
    return parseInt(params.pageSize as string) || 10
})

const flag = ref<'add' | 'edit'>('add')
const employeeList = ref<API.EmployeeInfo[]>([])

// 获取员工列表
const initData = async () => {
    const res = await GetUserListInfo(params)
    employeeList.value = res.data.rows
    total.value = res.data.total
}


onMounted(() => {
    initData();
})

const pageChange = (val: number) => {
    params.page = val.toString()
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
</script>

<style lang='scss' scoped>
.row-pagination {
    margin-top: 20px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
}
</style>
