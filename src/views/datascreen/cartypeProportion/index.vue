<template>
    <div class="cartypeProportion-container">
        <div class="header_img">
            <img :src="ImgSrc" alt="本月车辆收费类型分布">
        </div>
        <!-- 饼图 -->
        <div class="content">
            <EchartsComp :option="options" />
        </div>

    </div>
</template>

<script setup lang='ts'>
import EchartsComp from '@/components/EchartComp.vue'
import ImgSrc from '@/assets/images/本月车辆收费类型分布@2x.png';
import { GetCartypeProportion } from '@/services';

const typeProportion = ref<API.CarTypeProportion>({
    cardProportion: 0,
    tempProportion: 0
});

const options = computed(() => {

    const data = [
        { value: unref(typeProportion)?.cardProportion * 100, name: '月卡车辆', color: '#00B2FF' },
        { value: unref(typeProportion)?.tempProportion * 100, name: '临时车辆', color: '#00B2FF' },
    ]

    return {
        tooltip: {
            trigger: 'item',
            formatter: '<h3>{a}</h3> <br/> {b} : {c}%'
        },
        legend: {
            orient: 'horizontal',
            bottom: 'bottom',
            itemGap: 16,
            textStyle: {
                color: '#fff',
                fontSize: 14,
            },
            formatter: (name) => {
                const value = data.find(item => item.name === name)?.value
                return `${name} : ${value}% `
            }
        },
        series: [
            {
                name: '本月车辆收费类型分布',
                type: 'pie',
                radius: '50%',
                data,
                label: {
                    show: false,
                },
            }
        ]
    }
})

onMounted(async () => {
    const res = await GetCartypeProportion();
    if (res.code === 10000) {
        typeProportion.value = res.data;
    }
})

</script>

<style lang='scss' scoped>
.cartypeProportion-container {
    width: 100%;

    .header_img {
        width: 100%;
    }
}

.content {
    width: 100%;
    height: 300px;
}
</style>
