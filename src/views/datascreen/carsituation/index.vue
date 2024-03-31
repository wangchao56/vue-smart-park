<template>
    <div>
        <div class="header_img">
            <img :src="ImgSrc" alt="停车场实时情况">
        </div>

    </div>

</template>

<script setup lang='ts'>
import ImgSrc from '@/assets/images/停车场实时情况@2x.png';
import { GetCarParkInfo } from '@/services';
</script>

<style lang='scss' scoped></style>
