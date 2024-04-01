<template>
    <div class="caryearRevenue-container">
        <div class="header_img">
            <img :src="ImgSrc" alt="车行年度收入分析">
        </div>
        <div class="content">
            <div class="content-header">
                <h5>单位(元)</h5>
                <div class="right">
                    <span class="color"></span>
                    <span class="color"></span>
                    <span>收入情况</span>
                </div>
            </div>
            <EchartsComp :option="options" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import ImgSrc from '@/assets/images/车行年度收入分析@2x.png';
import EchartsComp from '@/components/EchartComp.vue'
import { GetCarYearRevenue } from '@/services';

const carYearRevenue = ref<API.CarYearRevenue>({
    monthList: [],
    revenueList: []
})
const options = computed(() => {
    const xData = unref(carYearRevenue)?.monthList;
    const yData = unref(carYearRevenue)?.revenueList.map((item, idx) => {
        return {
            value: item,
            itemStyle: {
                color: idx % 2 == 0 ? '#72d5ff' : '#ff7b5d'
            }
        }
    })
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: xData
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false
            }
        },
        series: [
            {
                name: '月收入',
                data: yData,
                type: 'bar',
                barWidth: 16,
            }
        ]
    }
})

onMounted(async () => {
    const res = await GetCarYearRevenue();
    const { code, data } = res;
    if (code === 10000) {
        ;
        carYearRevenue.value = data;
    }
})

</script>

<style lang='scss' scoped>
.caryearRevenue-container {
    width: 100%;
}

.content {
    width: 100%;
    height: 300px;

    .content-header {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        padding: 0 64px 0 16px;
        margin-top: 16px;

        .right {
            .color {
                width: 16px;
                height: 8px;
            }

            display: flex;
            align-items: center;

            // 第一个.color元素
            &>.color:nth-of-type(1) {
                background-color: #72d5ff;
            }

            &>.color:nth-of-type(2) {
                background-color: #ff7b5d;
                margin-right: 16px;
            }
        }
    }
}
</style>
