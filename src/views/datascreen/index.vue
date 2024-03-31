<template>
    <div id="datascreen">
        <el-container>
            <el-header>
                <img :src="LogoSrc" />

                <div class="right-menu">
                    <button class="park-all"></button>
                    <button class="car-admin"></button>
                </div>
            </el-header>
            <el-main>
                <el-row>
                    <el-col :span="6">
                        <Parkoverview :data="parkoverviewData" />
                        <Parkyearincome :data="parkIncome" />
                        <Parkindustry :data="parkIndustry" />
                    </el-col>
                    <el-col :span="18">
                    </el-col>
                </el-row>
            </el-main>
        </el-container>

    </div>
</template>
<script setup lang='ts'>
import Parkoverview from './parkoverview/index.vue';
import Parkyearincome from './parkyearincome/index.vue';
import Parkindustry from './parkIndustry/index.vue';
import autofit from 'autofit.js'
import LogoSrc from '@/assets/images/datascreen-logo.png'
import { GetParkStatisticsInfo } from '@/services'
const parkoverviewData = ref({
    buildingTotal: 100,
    enterpriseTotal: 100,
    parkingTotal: 100,
    chargePoleTotal: 100
});

const parkIncome = ref<API.ParkIncomeData>({
    xMonth: [],
    yIncome: []
})

const parkIndustry = ref<API.ParkIndustryItem[]>([])

onMounted(async () => {
    autofit.init({
        dw: 1920,
        dh: 1080,
        el: '#datascreen',
        resize: true
    });
    const { data } = await GetParkStatisticsInfo();
    console.log(data);
    parkoverviewData.value = data.base;
    parkIncome.value = data.parkIncome;
    parkIndustry.value = data.parkIndustry;
});


</script>

<style lang='scss' scoped>
.el-container {
    height: 100vh;
    overflow: hidden;
    background-color: #000;
}

.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.park-all,
.car-admin {
    width: 192px;
    height: 60px;
    outline: none;
    border: none;
    border: 0;
    cursor: pointer;
}

.right-menu {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.park-all {
    background: #000 url(@/assets/images/park-active.png);
}

.car-admin {
    background: #000 url(@/assets/images/car-default.png);
}
</style>
