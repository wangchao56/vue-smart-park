<template>
    <div class="caryearRevenue-container">
        <div class="header_img">
            <img :src="ImgSrc" alt="车行年度收入分析">
        </div>
    </div>
</template>

<script setup lang='ts'>
import ImgSrc from '@/assets/images/车行年度收入分析@2x.png';
import { GetCarYearRevenue } from '@/services';
</script>

<style lang='scss' scoped>
.caryearRevenue-container {
    width: 100%;
}
</style>
