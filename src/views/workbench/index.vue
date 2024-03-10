<template>
    <div>
        <h1>工作台</h1>
        <ParkOverView />
    </div>

</template>

<script setup lang='ts'>
import ParkOverView from './parkoverview/index.vue';
import { ref } from 'vue'

const activeName = ref('1')
</script>

<style lang='scss' scoped></style>
