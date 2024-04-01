<template>
    <BaseTable ref="tableRef" :data-source="enterpriseList" title="企业" :columns="columns" :show-search="true"
        :total="total" :currentPage="currentPage" @searchAction="searchActionHandler" @modelAction="modelActionHandler"
        @expandAction="expandActionHandler">
        >
        <template #actionbtn>
            <el-button type="primary" @click="modelActionHandler('add')">添加企业</el-button>
        </template>
        <template #action="{ row }">
            <el-button text type="primary" size="small" @click="modelActionHandler('contract', row)">添加合同</el-button>
            <el-button text type="primary" size="small" @click="modelActionHandler('detail', row)">查看</el-button>
            <el-button text type="primary" size="small" @click="modelActionHandler('edit', row)">编辑</el-button>
            <el-button text type="primary" size="small" @click="modelActionHandler('del', row)">删除</el-button>
        </template>
        <template #expand="{ row }">
            <el-table row-class-name="cus-row" :data="row.rentList" :header-cell-style="{
        background: '#f4f6f8'
    }">
                <el-table-column prop="buildingName" label="租赁楼宇">
                </el-table-column>
                <el-table-column label="租赁起止时间">
                    <template #default="{ row }">
                        {{ row.startTime }} 至 {{ row.endTime }}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="合同状态">
                    <template #default="{ row }">
                        <el-tag v-if="row.status === 1" type="success">生效中</el-tag>
                        <el-tag v-else type="primary">待生效</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button text size="small" @click="handleRelet">续租</el-button>
                        <el-button text size="small" @click="hanleOffLease">退租</el-button>
                        <el-button text size="small" disabled @click="handleDelRent">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!-- 表单 -->
        <template #formContent>
            <AddContract />
        </template>
    </BaseTable>
</template>

<script setup lang='tsx'>
import {
    GetEnterpriseList,
    PutEnterprise,
    GetEnterpriseDetail,
    GetEnterpriseRent
} from '@/services'
import BaseTable, { Handlers, type ColumnType } from '@/components/BaseTable.vue';
import AddContract from './addcontract/index.vue'

interface EnterpriseInfo extends API.EnterpriseBaseInfo {
    index: number;
    rentList: API.RentInfo[];
}
const enterpriseList = ref<EnterpriseInfo[]>([])
const tableRef = ref<Handlers<EnterpriseInfo>>()

watch(
    () => tableRef.value,
    (value) => {
        ;
    }

)

const columns: ColumnType[] = [
    {
        type: 'expand',
        prop: 'expand',
        label: '展开',
    },
    {
        label: '序号',
        type: 'index',
        prop: 'index',
        width: 80
    },
    {
        label: '企业名称',
        formType: 'input',
        rules: [
            { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        prop: 'name',
        search: true
    },
    {
        label: '联系人',
        prop: 'contact',
        formType: 'input',
    },
    {
        label: '联系电话',
        prop: 'contactNumber',
        formType: 'input',
        render: (row: API.EnterpriseBaseInfo) => {
            return row.contactNumber
        }
    },
    {
        label: '操作',
        prop: 'action',
    }

]

const total = ref(0)

const params = reactive<Record<string, any>>({
    page: '1',
    pageSize: '10',
    name: ''
})

const contactForm = reactive<Record<string, any>>({
    name: '',
    contact: '',
    contactNumber: ''
})


const initGetEnterpriseList = async () => {
    const res = await GetEnterpriseList(params)

    enterpriseList.value = (res.data.rows || []).map((item: API.EnterpriseBaseInfo, index) => {
        return {
            ...item,
            index: index + 1,
            rentList: []
        }
    })
}


watchEffect(() => {
    initGetEnterpriseList()
})

const currentPage = ref(1)

const handleSizeChange = (val: number) => {

}
const handleCurrentChange = (val: number) => {

}

const searchActionHandler = (_params: Record<string, any>) => {
    params.name = _params.name
}
//租赁信息数据
const rentList = ref<API.RentInfo[]>([])


//***需要优化
const expandActionHandler = async (row: EnterpriseInfo) => {

    ;
    //如果有租赁信息则不再请求
    if (row.rentList && row.rentList.length) {
        rentList.value = row.rentList
        return
    }
    //获取租赁信息
    const res = await GetEnterpriseRent(row.id)
    rentList.value = res.data || []
    //找到baseTableRef
    enterpriseList.value = enterpriseList.value.map((item) => {
        if (item.id === row.id) {
            item.rentList = rentList.value
        }
        return item
    })
}

const modelActionHandler = (flag: string, params?: API.EnterpriseBaseInfo) => {

    const { handleOpenModel, handleOpenDrawer } = unref(tableRef)
    switch (flag) {
        case 'add':

            handleOpenModel('添加企业', 'add')
            break;
        case 'edit':

            handleOpenModel('编辑企业', 'add')
            handleEdit(params)
            break;
        case 'delete':

            handleDel(params)
            break;
        case 'detail':

            handleDetail(params)
            handleOpenDrawer()
            break;
        case 'contract':

            handleContract(params)
            break;
    }
}
//续租
const handleRelet = () => {

}

//退租
const hanleOffLease = () => {

}

//删除租赁信息
const handleDelRent = () => {

}


//删除 
const handleDel = async (row: API.EnterpriseBaseInfo) => {

}

//编辑

const handleEdit = async (row: API.EnterpriseBaseInfo) => {

    ;
}

//添加合同
const handleContract = async (row: API.EnterpriseBaseInfo) => {
    tableRef.value.handleOpenModel('添加合同')

}


//查看
const handleDetail = async (row: API.EnterpriseBaseInfo) => {
    if (!tableRef.value) return
    tableRef.value.handleOpenDrawer()
    const res = await GetEnterpriseDetail(row.id)

}

</script>

<style lang='scss' scoped>
:deep(.el-table__expanded-cell) {
    padding-top: 0;
    position: relative;
    padding-left: 48px;
    background: '#f4f6f8';
    background-clip: padding-box
}




:deep(.el-table__expanded-cell::before) {
    position: absolute;
    top: 0;
    left: 0;
    width: 48px;
    height: 100%;
    content: '';
    background-color: #f4f6f8;
}
</style>
