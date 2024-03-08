<template>
    <el-menu @select="handleSelect" class="el-menu-vertical-demo">
        <template v-for="item in menuList">
            <template v-if="item?.children && item.children?.length">
                <el-sub-menu :index="item?.path" :key="item.path">
                    <template #title>
                        <CustomIcon :src="item.meta?.icon" />
                        {{ item.meta?.title }}
                    </template>
                    <el-menu-item v-for="child in item.children" :index="child.path"
                        :key="`${item.path}-${child.path}`">
                        {{ child.meta?.title }}
                    </el-menu-item>
                </el-sub-menu>
            </template>
            <template v-else>
                <el-menu-item :index="item?.path" :key="item.path">
                    <CustomIcon :src="item.meta?.icon" /> {{ item.meta?.title }}
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</template>
<script setup lang="ts">
import { defineProps, computed } from "vue";
import type { RouteRecordRaw } from "vue-router";
import { useRouter } from "vue-router";

const props = defineProps<{
    routesList: RouteRecordRaw[];
}>();

const router = useRouter();

const menuList = computed(() => {
    if (!props.routesList) return [];

    const temp1 = props.routesList.filter((item) => item.meta || item.children);
    const menu1 = [] as RouteRecordRaw[];

    temp1.forEach((item) => {
        if (!item.meta && item.children) {
            item.children.forEach((child) => {
                menu1.push({
                    ...child,
                    path: `${item.path}/${child.path}`,
                });
            });
        }
        if (item.meta && item.children) {
            menu1.push({
                ...item,
                children: item.children.map((child) => {
                    return {
                        ...child,
                        path: `${item.path}/${child.path}`,
                    };
                }),
            });
        }
    });
    console.log(menu1);
    return menu1;
});

const handleSelect = (index: string) => {
    router.push(index);
};
</script>

<style lang="scss" scoped></style>
