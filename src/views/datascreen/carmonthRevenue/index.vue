<template>
    <div class="carRevenue_container">
        <div class="header_img">
            <img :src="ImgSrc" alt="本月车行收入分析">
        </div>

        <div class="content">
            <div class="totalRevenue-content">
                <p class="header_title">本月车行总收入</p>
                <p>{{ totalRevenue }}元</p>
            </div>
            <div class="cardRevenue-content">
                <p class="header_title"> <span>本月月卡总收入</span><span>{{ cardRevenue }}元</span>
                </p>
                <el-progress :percentage="(cardRevenue / totalRevenue) * 100 || 0" :color="cardCustomColors">
                    <el-icon v-if="cardRevenueTrend === 'reduce'" color="#FF5722">
                        <Bottom />
                    </el-icon>
                    <el-icon v-else-if="cardRevenueTrend === 'increase'" color="rgb(61, 118, 255)">
                        <Top />
                    </el-icon>
                </el-progress>
            </div>
            <div class="parkingRevenue-content">
                <p class="header_title"><span>本月停车总收入</span><span>{{ parkingRevenue }}元</span></p>
                <el-progress :percentage="(parkingRevenue / totalRevenue) * 100 || 0" :color="customColors">
                    <el-icon v-if="parkingRevenueTrend === 'reduce'" color="#FF5722">
                        <Bottom />
                    </el-icon>
                    <el-icon v-else-if="parkingRevenueTrend === 'increase'" color="rgb(61, 118, 255)">
                        <Top />
                    </el-icon>
                </el-progress>
            </div>

        </div>
    </div>

</template>

<script setup lang='ts'>
import ImgSrc from '@/assets/images/本月车行收入分析@2x.png';
import { GetCarMonthRevenue } from '@/services';

const cardRevenue = ref(0);
const parkingRevenue = ref(0);
const totalRevenue = ref(0);
const cardRevenueTrend = ref<'increase' | 'reduce'>('reduce')
const parkingRevenueTrend = ref<'increase' | 'reduce'>('increase')


const cardCustomColors = [{ color: 'rgb(89, 201, 255)', percentage: 20 },
{ color: 'rgb(61, 118, 255)', percentage: 20 },]

//渐变
const customColors = [
    {
        color: '#FFB800',
        percentage: 30,
    },
    {
        color: '#FF5722',
        percentage: 60,
    },
];

onMounted(async () => {
    const res = await GetCarMonthRevenue();
    ;
    if (res.code === 10000) {
        const { data } = res;
        cardRevenue.value = data.cardRevenue;
        totalRevenue.value = data.totalRevenue;
        parkingRevenue.value = data.parkingRevenue;
        parkingRevenueTrend.value = data.parkingRevenueTrend;
        cardRevenueTrend.value = data.cardRevenueTrend;
    }
})



</script>

<style lang='scss' scoped>
.header_title {
    color: #fff;
    display: flex;
    justify-content: space-between;
    padding-right: 50px;
}

.carRevenue_container {
    margin-bottom: 16px;
}

.content {
    display: flex;
    flex-direction: column;
    padding: 0px 32px;

    .totalRevenue-content {
        display: flex;
        justify-content: space-between;
        color: #fff;
        background-image: linear-gradient(90deg, rgb(13, 20, 38), rgb(14, 23, 50) 50%, rgb(13, 20, 38));
    }
}
</style>
