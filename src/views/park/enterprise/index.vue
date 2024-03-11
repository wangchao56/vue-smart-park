<template>
    <el-card>
        <el-table :data="enterpriseList" style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="name" label="楼宇名称"></el-table-column>
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
                    <el-button type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small">删除</el-button>
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

const enterpriseList = ref<API.EnterpriseInfo[]>([])

const initGetEnterpriseList = async () => {
    const params: API.EnterpriseListQuery = {
        page: '1',
        pageSize: '10'
    }
    const res = await GetEnterpriseList(params)

    console.log(res)
    enterpriseList.value = (res.data.rows || []).map((item: API.EnterpriseInfo, index) => {
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

</script>

<style lang='scss' scoped></style>
