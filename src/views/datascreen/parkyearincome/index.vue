<template>
    <div class="parkyear-container">
        <div class="header">
            <img :src="HeaderSrc" />
        </div>
        <div class="content">
            <EchartsComp :option="barOptions" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import EchartsComp from '@/components/EchartComp.vue'
import * as echarts from 'echarts';
import HeaderSrc from '@/assets/images/园区年度收入分析@2x.png'

const props = defineProps<{
    data: API.ParkIncomeData
}>()

const barOptions = ref({})

watch(() => props.data, () => {

    barOptions.value = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        grid: {
            // 让图表占满容器
            top: '10px',
            left: '0px',
            right: '0px',
            bottom: '0px',
            containLabel: true,
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true,
                    show: false,
                },
                data: props.data?.xMonth || [],
            },
        ],
        yAxis: [
            {
                type: 'value',
                splitLine: {
                    show: false,
                },
            },
        ],
        series: [
            {
                name: '园区年度收入',
                type: 'bar',
                barWidth: '10px',
                data: (props.data?.yIncome || []).map((item, index) => {
                    const color =
                        index % 2 === 0
                            ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0.23, color: '#74c0f8' },
                                { offset: 1, color: 'rgba(116,192,248,0.00)' },
                            ])
                            : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0.23, color: '#ff7152' },
                                { offset: 1, color: 'rgba(255,113,82,0.00)' },
                            ])
                    return { value: item, itemStyle: { color } }
                }),
            },
        ],
        textStyle: {
            color: '#B4C0CC',
        },
    }
}, {
    deep: true,
})


</script>

<style lang='scss' scoped>
.parkyear-container {
    width: 100%;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
            width: 100%;
        }

        margin-bottom: 16px;
    }

    .content {
        height: 300px;
    }
}
</style>
