<template>
    <el-container id="datascreen">
        <el-header>
            <div class="screen-logo">
                <img :src="LogoSrc" />
            </div>
            <div class="right-menu">
                <button class="park-all" @click="switchPark('park')" :class="{ active: flag === 'park' }"></button>
                <button class="car-admin" @click="switchPark('car')" :class="{ active: flag === 'car' }"></button>
            </div>
        </el-header>
        <Transition name="fade">
            <el-main v-if="flag === 'park'">
                <el-row>
                    <el-col :span="6" class="park-overview-container">
                        <div class="park-overview_item">
                            <Parkoverview :data="parkoverviewData" />
                        </div>
                        <div class="park-overview_item">
                            <Parkyearincome :data="parkIncome" />
                        </div>
                        <div class="park-overview_item">
                            <Parkindustry :data="parkIndustry" />
                        </div>
                    </el-col>
                    <el-col :span="22" :offset="2">
                        <KeepAlive include="ModelRender">
                            <ModelRender />
                        </KeepAlive>
                    </el-col>
                </el-row>
            </el-main>
            <el-main v-else>
                <el-row :gutter="32">
                    <el-col :span="8" class="car-admin-container">
                        <div class="car-admin_item">
                            <Carsituation />
                        </div>
                        <div class="car-admin_item">
                            <Carspaceuse />
                        </div>
                    </el-col>
                    <el-col :span="8" class="car-admin-container">
                        <div class="car-admin_item">
                            <CarmonthRevenue />
                        </div>
                        <div class="car-admin_item">
                            <CartypeProportion />
                        </div>
                        <div class="car-admin_item">
                            <CaryearRevenue />
                        </div>
                    </el-col>
                    <el-col :span="8" class="car-admin-container">
                        <CarPaymentList />
                    </el-col>
                </el-row>
            </el-main>
        </Transition>
    </el-container>
</template>
<script setup lang='ts'>
import Parkoverview from './parkoverview/index.vue';
import Parkyearincome from './parkyearincome/index.vue';
import Parkindustry from './parkIndustry/index.vue';
import ModelRender from './ModelRender/index.vue';
import CarPaymentList from './carpaymentList/index.vue';
import CarmonthRevenue from './carmonthRevenue/index.vue';
import Carsituation from './carsituation/index.vue';
import Carspaceuse from './carspaceuse/index.vue';
import CartypeProportion from './cartypeProportion/index.vue';
import CaryearRevenue from './caryearRevenue/index.vue';

import autofit from 'autofit.js'
import LogoSrc from '@/assets/images/datascreen-logo.png'
import { GetParkStatisticsInfo } from '@/services'
//获取可视区域宽高


// 获取园区总览
const flag = ref('park');
const switchPark = (type: string) => {
    flag.value = type;
}
const parkoverviewData = ref({
    buildingTotal: 100,
    enterpriseTotal: 100,
    parkingTotal: 100,
    chargePoleTotal: 100
});

let parkIncome = reactive<API.ParkIncomeData>({
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
    ;
    parkoverviewData.value = data.base;
    parkIncome = data.parkIncome;
    parkIndustry.value = data.parkIndustry;
});


</script>

<style lang='scss' scoped>
.el-container {
    height: 100vh;
    overflow: hidden;
    background-color: #000;
    color: #fff;
}

.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding-top: 16px;
    margin-bottom: 16px;
}

.el-main {
    overflow: hidden;
    height: calc(100vh - 60px);
}

.park-all,
.car-admin {
    width: 128px;
    height: 32px;
    outline: none;
    border: none;
    border: 0;
    cursor: pointer;
    background-repeat: no-repeat !important;
    background-size: contain !important;
}

.right-menu {
    display: flex;
    align-items: center;
    justify-content: flex-end;

}

.park-all {
    background: #000 url(@/assets/images/park-default.png);

}

.park-all.active {
    background: #000 url(@/assets/images/park-active.png);


}

.car-admin {
    background: #000 url(@/assets/images/car-default.png);
}

.car-admin.active {
    background: #000 url(@/assets/images/car-active.png);
}

.screen-logo {
    width: 400px;
}

.park-overview-container {
    position: fixed;
    top: 64px;
    left: 30px;
    z-index: 999;
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    row-gap: 16px;
    // 背景高斯模糊
    background: rgba(0, 0, 0, 0.5);
    /* 背景色 */

    display: flex;
    flex-direction: column;

    .park-overview_item {
        width: 100%;
        margin-bottom: 16px;
        box-sizing: border-box;
        overflow: hidden;
    }
}

.el-row {
    height: 100% !important;
}

.car-admin-container {
    height: 100%;

    .car-admin_item {
        width: 100%;
        margin-bottom: 16px;
        box-sizing: border-box;
        overflow: hidden;
    }
}
</style>
