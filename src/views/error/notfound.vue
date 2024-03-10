<template>
    <div class="error-404">
        <div class="box">
            <img :src="NotFoundImg" alt="404" />
            <p>抱歉，您访问的页面不存在</p>
            <el-button @click="handlBack">
                返回
            </el-button>
        </div>
    </div>
</template>

<script setup lang='ts'>
import NotFoundImg from '@/assets/images/404.png'
import { router } from '@/router'
const handlBack = () => {
    router.back()
}
</script>

<style lang='scss' scoped>
.error-404 {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;

    .box {
        text-align: center;
    }

    h1 {
        font-size: 100px;
        color: #f56c6c;
    }

    p {
        font-size: 20px;
        color: #f56c6c;
    }

    img {
        width: 100%;
        max-width: 500px;
    }

    .el-button {
        margin-top: 20px;
        width: 300px;
    }

}
</style>
