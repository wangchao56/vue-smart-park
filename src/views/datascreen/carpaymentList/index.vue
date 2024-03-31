<template>
    <div>
        <div class="header_img">
             <img :src="ImgSrc" alt="车辆缴费记录">
        </div>
    </div>

</template>

<script setup lang='ts'>
import ImgSrc from '@/assets/images/车辆缴费记录@2x.png';
import { GetWorkbenchPaymentList } from '@/services';
</script>

<style lang='scss' scoped>
.header_img{
    width: 100%;
    
}</style>
