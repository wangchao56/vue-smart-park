<template>
    <el-card>
        <template #header>
            <el-row>
                <el-col :span="12">
                    <h2>楼宇管理</h2>
                </el-col>
                <el-col :span="12" style="text-align: right">
                    <el-button type="primary">新增楼宇</el-button>
                </el-col>
            </el-row>
        </template>
        <el-table :data="buildingList" style="width: 100%">
            <el-table-column type="index" label="序号">
            </el-table-column>
            <el-table-column prop="name" label="楼宇名称"></el-table-column>
            <el-table-column prop="floors" label="楼层"></el-table-column>
            <el-table-column prop="area" label="在管面积(m²)"></el-table-column>
            <el-table-column prop="propertyFeePrice" label="物业费(元/m²)"></el-table-column>
            <el-table-column prop="status" label="状态">

                <template #default="{ row }">
                    <el-tag v-if="row.status === 1" type="danger">租赁中</el-tag>
                    <el-tag v-else type="success">空置中</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button type="text" size="small" @click="handleAction('edit', row)">编辑</el-button>
                    <el-button type="text" size="small" @click="handleAction('edit', row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <template #footer>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10"
                layout="total, sizes, prev, pager, next, jumper" :total="1000"></el-pagination>
        </template>
    </el-card>
</template>

<script setup lang='ts'>
import { GetBuildingList } from '@/services'

const buildingList = ref<API.BuildingInfo[]>([])
const initGetBuildingList = async () => {
    const params: API.BuildingListQuery = {
        page: '1',
        pageSize: '10'
    }
    const res = await GetBuildingList(params)

    console.log(res)
    buildingList.value = (res.data.rows || []).map((item: API.BuildingInfo, index) => {
        return {
            ...item,
            index: index + 1
        }
    })


}
const currentPage = ref(1)
const handleSizeChange = (val: number) => {
    console.log(`每页 ${val} 条`)
}
const handleCurrentChange = (val: number) => {
    console.log(`当前页: ${val}`)
}

const handleAction = (flag: 'edit' | 'add', row: API.BuildingInfo) => {
    console.log('row: ', row);
    console.log(flag)
}



onMounted(() => {
    initGetBuildingList()
})

</script>

<style lang='scss' scoped></style>
