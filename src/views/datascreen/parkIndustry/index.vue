<template>
    <div class="parkIndustry-container">
        <div class="header">
            <img :src="HeaderSrc" />
        </div>
        <div class="content">
            <EchartsComp :option="options" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import EchartsComp from '@/components/EchartComp.vue'
import { computed } from 'vue';
import HeaderSrc from '@/assets/images/园区产业分布@2x.png'

const props = defineProps<{
    data: API.ParkIndustryItem[]
}>()

const options = computed(() => {
    return {
        color: [
            '#00B2FF', '#2CF2FF', '#892CFF', '#FF624D', '#FFCF54', '#86ECA2'],
        legend: {
            itemGap: 20,
            bottom: '0',
            icon: 'rect',
            itemHeight: 10, // 图例icon高度
            itemWidth: 10, // 图例icon宽度
            textStyle: {
                color: '#c6d1db',
            },
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: '园区产业分析',
                type: 'pie',
                radius: ['55%', '60%'], // 设置内圈与外圈的半径使其呈现为环形
                center: ['50%', '40%'], // 圆心位置， 用于调整整个图的位置
                tooltip: {
                    trigger: 'item',
                    formatter: (params) => {
                        return `${params.seriesName}</br><div style='display:flex;justify-content: space-between;'><div>${params.marker}${params.name}</div><div>${params.percent}%</div></div>`
                    }
                },
                label: {
                    show: false,
                    position: 'center',
                },
                data: props.data,
            },
        ],

    }
}) 
</script>

<style lang='scss' scoped>
.parkIndustry-container {
    width: 100%;
    height: 100%;

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
        width: inherit;
        height: 240px;
    }
}
</style>
