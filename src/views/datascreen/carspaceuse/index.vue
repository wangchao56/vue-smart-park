<template>
    <div>
        <div class="header_img">
            <img :src="ImgSrc" alt="各停车区域车位使用情况">
        </div>
    </div>
</template>

<script setup lang='ts'>
import ImgSrc from '@/assets/images/各停车区域车位使用情况@2x.png';
import { GetCarAreaInfo } from '@/services';
</script>

<style lang='scss' scoped></style>
