<template>
    <div v-if="isExternal">
        <img :src="icon" alt="" srcset="">
    </div>
    <el-icon v-else>
        <component :is="icon" />
    </el-icon>
</template>

<script setup lang='ts'>
import { defineProps, computed } from 'vue';

const props = defineProps<{
    src: string;
}>();

//判断是否是外链 或者本地 svg  图片  ，还有是否以el-icon-开头
const isExternal = computed(() => {
    return /^(https?:|mailto:|tel:)/.test(props.src);
})

const isIcon = (path: string) => {
    return /^el-icon-/.test(path);
};

const isSvg = (path: string) => {
    return /\.svg$/.test(path);
};
const icon = computed(() => {
    if (isIcon(props.src)) {
        return props.src.replace(/el-icon-/, '');
    }
    return props.src;
});

</script>
<style lang='scss' scoped></style>
