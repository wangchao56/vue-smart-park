<template>
    <!-- 3d模型渲染节点 -->
    <div class="model-container">
        <!-- 进度条 -->
        <LoadingComponent :loading="showLoading" />
        <!-- 准备3D渲染节点 -->
        <canvas class="canvas-3d" ref="ref3d" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
// 导入模型解析构造函数
import { Application } from '@splinetool/runtime'
// 导入loading组件
import LoadingComponent from '@/components/LoadingComponent.vue'


// 调用接口拉取3d模型 渲染视图中
const publisPath = 'https://fe-hmzs.itheima.net'
const ref3d = ref(null)
const showLoading = ref(false)

const init3dModel = () => {
    // 开启loading 
    if (!ref3d.value) return;
    showLoading.value = true
    // 1. 实例解析器对象(传入模型将来渲染的节点对象)
    const spline = new Application(ref3d.value)
    // 2. 使用对象load方法去拉取3大模型资源
    spline.load(`${publisPath}/scene.splinecode`).then(() => {
        showLoading.value = false
        // 模型渲染完毕之后后续的逻辑操作
        // 3. 拉取资源之后.then方法中可以做后续的逻辑操作
    })
}

onMounted(async () => {
    // 获取原生的dom对象
    // 这个方法执行的时候 虽然在mounted中执行的 但是不能保证依赖的数据已经通过接口返回了
    // 解决方案：等到数据返回之后才进行初始化操作
    init3dModel()
})

</script>
