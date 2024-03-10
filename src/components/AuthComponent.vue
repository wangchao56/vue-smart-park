<script setup lang='ts'>
import { defineProps, computed, withDefaults } from 'vue'
import { useAuthStore } from '@/store'

const props = withDefaults(defineProps<{
    btnString: string;
}>(), {
    btnString: ''
})

const store = useAuthStore()

const isShow = computed(() => {
    const perms = store.profile.permissions
    return perms.includes(props.btnString) || perms.includes('*:*:*')
})

</script>

<template>
    <div v-if="isShow">
        <slot></slot>
    </div>
</template>
