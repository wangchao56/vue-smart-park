<template>
    <!-- 园区概况 -->
    <el-card class="box-card">
        <el-row>
            <el-col :span="6" v-for="item in dataList" :key="item.label">
                <div class="grid-content bg-purple">
                    <span>{{ item.label }}</span>
                    <span>{{ item.value }}</span>
                </div>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup lang='ts'>
// 数据结构
const dataList = [
    {
        label: '楼宇总数',
        value: 100,
        unit: '栋',
        icon: '@/assets/images/building-icon.png'
    },
    {
        label: '入驻企业总数',
        value: 100,
        unit: '家',
        icon: '@/assets/images/enterprise-icon.png'
    },
    {
        label: '车位总数',
        value: 100,
        unit: '个',
        icon: '@/assets/images/car-icon.png'
    },
    {
        label: '一体杆总数',
        value: 100,
        unit: '个',
        icon: '@/assets/images/rod-icon.png'
    }
]

</script>

<style lang='scss' scoped></style>
