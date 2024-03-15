<template>
    <el-header>
        <el-row>
            <el-col :span="18" class="header-breadcrumb">
            </el-col>
            <el-col :span="6" class="header-dropdown">
                <el-dropdown>
                    <div class="header-avater">
                        <el-avatar shape="circle" :size="50" :src="squareUrl" />
                        <span>管理员</span>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item :icon="CirclePlusFilled" @click="handleLoginOut">
                                退出登录
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-col>
        </el-row>
    </el-header>

</template>

<script setup lang='ts'>
import squareUrl from '@/assets/images/logo-1.png';
import { useAuthStore } from '@/store';

const authStore = useAuthStore();

import {
    CirclePlusFilled,
} from '@element-plus/icons-vue';
const handleLoginOut = () => {
    authStore.loginOutAction();
};
</script>

<style lang='scss' scoped></style>
