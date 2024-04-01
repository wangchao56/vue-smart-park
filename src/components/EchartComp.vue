<!-- echarts 图表 -->
<template>
    <div class="echart-comp">
        <div ref="echartDom" style="width: 100%; height: 100%;"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';

const echartDom = ref<HTMLElement>();
let myChart: echarts.ECharts;

const props = defineProps<{
    option: echarts.EChartsOption
}>()
//设置防抖，保证无论拖动窗口大小，只执行一次获取浏览器宽高的方法
const debounce = (fun: () => void, delay: number): () => void => {
    let timer: number | null;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fun();
        }, delay);
    }
};

const resizeHandler = () => {
    myChart.resize();
};
const cancalDebounce = debounce(resizeHandler, 500);
// 初始化图表
const initEchart = (echartDom: HTMLElement | undefined) => {
    if (!echartDom) return;
    myChart = echarts.init(echartDom);
    myChart.setOption(props.option);
    window.addEventListener('resize', cancalDebounce);
}
// 监听option变化 更新图表 使用watchEffect 还是watch?
watch(() => props.option, () => {
    // co nsole.log(3);
    if (myChart) {
        myChart.setOption(props.option, true);
    }
}, {
    deep: true, // 深度监听
});

onMounted(() => {
    //  ;
    initEchart(echartDom.value);
});
onUnmounted(() => {
    window.removeEventListener('resize', cancalDebounce);
    myChart.dispose();
});
</script>

<style lang="scss" scoped>
.echart-comp {
    width: 100%;
    height: 100%;
}
</style>
