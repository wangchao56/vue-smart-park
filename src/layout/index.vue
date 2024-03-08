<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <!-- logo区 -->
                <div class="logo">
                    <img src="@/assets/logo-white.png" alt="logo" />
                </div>
                <!-- 菜单区 -->
                <asidemenu :routesList="routeStore.routes" />
            </el-aside>
            <el-container>
                <el-header>
                    <el-row>
                        <el-col :span="18" class="header-breadcrumb">
                            <el-breadcrumb separator-class="el-icon-arrow-right">
                                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                            </el-breadcrumb>
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
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang='ts'>
import { RouterView } from 'vue-router';
import {
    CirclePlusFilled,
} from '@element-plus/icons-vue';
import squareUrl from '@/assets/logo-1.png';
import { useRouteStore } from '@/store';
import asidemenu from './asidemenu/index.vue';
// 侧边栏菜单 
//获取当前路由routes
const routeStore = useRouteStore();

const handleLoginOut = () => {
    console.log('退出登录');
}; 
</script>

<style lang='scss' scoped>
.common-layout {

    .el-aside {
        width: 300px;
        background-color: var(--m-bg-color);
        height: 100vh;
        overflow-y: hidden;

    }

    .el-header {
        height: 90px;
        max-height: 90px;
        background-color: var(--m-bg-color);
        text-align: center;
        line-height: 60px;
        font-size: 16px;

        .header-breadcrumb {
            height: 90px;
            display: flex;
            align-items: center;
            padding: 0 20px;
        }

        .header-dropdown {
            height: 90px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0 20px;
        }

        .header-avater {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 0 20px;

            span {
                margin-left: 10px;
            }
        }
    }

    .el-main {
        background-color: #f3f3f3;
    }

    .el-menu-vertical-demo {
        height: 100%;
    }

    .logo {
        width: 100%;
        height: 90px;
        will-change: filter; // 提前告诉浏览器这个元素会有变化
        transition: filter 300ms;
        // 不可选 
        user-select: none;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 270px;
            height: 100%;
            //比例
            aspect-ratio: 3 / 1;

            user-select: none;
            // 不可拖拽
            -webkit-user-drag: none;
        }
    }


}
</style>
