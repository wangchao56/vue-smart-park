<template>
    <div>
        <div class="header_img">
            <img :src="ImgSrc" alt="本月车行收入分析">
        </div>
    </div>

</template>

<script setup lang='ts'>
import ImgSrc from '@/assets/images/本月车行收入分析@2x.png';
import { GetCarMonthRevenue } from '@/services';
</script>

<style lang='scss' scoped></style>
