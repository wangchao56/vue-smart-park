<template>
    <div>
        <h1>Home</h1>
        <el-button @click="toggleDark()">Toggle Dark Mode</el-button>
    </div>

</template>

<script setup lang='ts'>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style lang='scss' scoped></style>
