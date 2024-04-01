<template>
    <div class="carAreaInfo_container">
        <div class="header_img">
            <img :src="ImgSrc" alt="各停车区域车位使用情况">
        </div>
        <div class="content">
            <el-row :gutter="32">
                <el-col v-for="(item, index) in carAreaInfo" :span="12" :key="index" class="carAreaInfo_item">
                    <p class="title">{{ item.areaName }}</p>
                    <div class="content_item">
                        <el-progress :percentage="item.areaProportion || 0" :stroke-width="15" striped />
                    </div>
                </el-col>
            </el-row>
            <div class="carAreaInfo_footer">
                <el-pagination @current-change="handleCurrentChange || 0" small :page-size="pageSize"
                    layout="prev, pager, next" :total="total" />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import ImgSrc from '@/assets/images/各停车区域车位使用情况@2x.png';
import { GetCarAreaInfo } from '@/services';

const carAreaInfo = ref<API.CarAreaInfo[]>([]);
const page = ref(1);
const pageSize = ref(14);
const total = ref(0);
const params = computed(() => {
    return {
        page: page.value,
        pageSize: pageSize.value,
    }
})
const handleCurrentChange = async (val: number) => {
    page.value = val;
    await init()
}
const init = async () => {
    const res = await GetCarAreaInfo(params.value);
    const { code, data } = res;
    if (code === 10000) {
        carAreaInfo.value = data.rows;
        total.value = data.total;
    }
}

onMounted(() => {
    init()
});
</script>
<style lang='scss' scoped>
.carAreaInfo_container {
    width: 100%;
    height: 100%;
    color: #fff;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .content {
        width: 100%;
        flex: 1;
        box-sizing: border-box;
        padding: 0px 32px;
        display: flex;
        flex-direction: column;
        row-gap: 16px;

        .el-row {
            height: 620px;
            box-sizing: border-box;
            justify-content: flex-start;

            .carAreaInfo_item {
                width: 100%;
                box-sizing: border-box;
                margin-bottom: 16px;
            }
        }

        .carAreaInfo_footer {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;

        }
    }
}

:deep(.el-pagination) {
    background-color: transparent !important;

    button,
    ul,
    li {
        background-color: transparent !important;
        color: #3d76ff;
    }
}
</style>
