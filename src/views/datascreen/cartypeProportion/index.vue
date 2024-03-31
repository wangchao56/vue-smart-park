<template>
    <div class="cartypeProportion-container">
        <div class="header_img">
            <img :src="ImgSrc" alt="本月车辆收费类型分布">
        </div>
    </div>
</template>

<script setup lang='ts'>
import ImgSrc from '@/assets/images/本月车辆收费类型分布@2x.png';
import { GetCartypeProportion } from '@/services';

</script>

<style lang='scss' scoped>
.cartypeProportion-container {
    width: 100%;

    .header_img {
        width: 100%;
    }
}
</style>
