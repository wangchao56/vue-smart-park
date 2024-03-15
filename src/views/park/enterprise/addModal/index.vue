<template>
    <div class="add-modal">
        <HeaderLayout />
    </div>



</template>

<script setup lang='ts'>
import HeaderLayout from '@/layout/headerLayout/index.vue';

</script>

<style lang='scss' scoped>
.add-modal {
    width: 100%;
    height: 100%;
    background-color: #f5f7fa;

    .el-header {
        height: 80px;
        max-height: 80px;
        background-color: var(--m-bg-color);
        text-align: center;
        line-height: 80px;
        color: #fff;
        font-size: 20px;
    }
}
</style>
