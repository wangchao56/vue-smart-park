<template>
    <!-- 3d模型渲染节点 -->
    <div class="model-container">
        <!-- 进度条 -->
        <LoadingComponent :loading="showLoading" />
        <!-- 准备3D渲染节点 -->
        <canvas class="canvas-3d" ref="ref3d" />

        <!-- 隔空投送 -->
        <Teleport to="body">
            <Transition name="fade" mode="out-in">
                <div class="model_bg" v-if="openModel" :style="{
            top: mouse.y + 'px',
            left: mouse.x + 'px'
        }">
                    <div class="top">
                        <span>{{ buildinginfo[options.top.attr] }}</span>
                        <button class="close" @click="closeModel"></button>
                    </div>
                    <div class="bottom">
                        <div class="left">
                            <p v-for="item in  options.children" :key="item.attr"><span>{{ item.label
                                    }}</span><span>{{ item.unit ? `(${item.unit})：` : '：' }}</span> <span>{{ item.render ? item.render(buildinginfo[item.attr]) : buildinginfo[item.attr]}}</span></p>
                        </div>
                        <button class="model_btn">
                            {{ options.btn.render ? options.btn.render(buildinginfo[options.btn.attr]) :
                            buildinginfo[options.btn.attr] }}
                        </button>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
// 导入模型解析构造函数
import { Application } from '@splinetool/runtime'
// 导入loading组件
import LoadingComponent from '@/components/LoadingComponent.vue'
import { GetCarAreaDetail, GetCarBuilding } from '@/services'
// import Worker from '@/worker/index.ts?worker';

// 调用接口拉取3d模型 渲染视图中
const publisPath = 'https://fe-hmzs.itheima.net'
const ref3d = ref(null)
const showLoading = ref(false)
// 模型太大耗时，需要异步加载
//使用webwork   创建一个worker线程

//实时存储鼠标的坐标
let mouse = reactive({
    x: 0,
    y: 0
})

//当前模型
let modelInfo = reactive({
    id: '',
    name: ''
})

const openModel = ref(false)
const closeModel = () => {
    // 移除div
    openModel.value = false
}

const buildinginfo = ref<API.CarBuildingInfo | API.CarAreaDetail>({
    id: 0,
    // 楼宇名称，不能为空字符串
    name: '',
    // 楼宇总层数，必须为大于0的数字
    floors: 0,
    // 在管总面积，必须为非负数字
    area: 0,
    // 物业费单价，必须为有效数字
    propertyFeePrice: 0,
    // 楼宇状态，必须为0（空置中）或1（租赁中）
    status: 0,
    // 承租单位名称，可为空字符串
    rentEnterpriseName: '', // 使用问号表示可选字段
})

const flag = ref<'work' | 'carpark'>('work')

const options = computed(() => {
    if (flag.value === 'work') {
        return {
            top: {
                attr: 'name',
            },
            children: [
                {
                    label: '楼层数',
                    attr: 'floors'
                },
                {
                    label: '总面积',
                    unit: 'm²',
                    attr: 'area'
                },
                {
                    label: '承租单位',
                    attr: 'rentEnterpriseName',
                    render: (val: string) => {
                        return val || '无'
                    }
                },
            ],
            btn: {
                attr: 'status',
                render: (val: string | number) => {
                    return val === 1 ? '租赁中' : '空置中' as string
                }
            }
        }
    }
    else if (flag.value === 'carpark') {
        return {
            top: {
                attr: 'areaName',
            },
            children: [
                {
                    label: '空闲车位',
                    attr: 'remainSpaceNum'
                },
                {
                    label: '占用车位',
                    attr: 'occupancySpaceNum'
                },
                {
                    label: '停车位数',
                    attr: 'totalSpaceNum'
                },
                {
                    label: '面积',
                    unit: 'm²',
                    attr: 'areaProportion'
                },
            ],
            btn: {
                attr: 'spaceProportion',
                render: (val: number | string) => {
                    return `占用率:${(val as number) * 100}%`
                }
            }
        }
    }


})

//更据id获取模型信息
const getModelInfoById = async (id: string) => {

    if (modelInfo.name.startsWith('办公')) {
        const res = await GetCarBuilding({
            id: id
        })
        const { data, code } = res;
        if (code === 10000) {
            buildinginfo.value = data;
            flag.value = 'work';
        }
    }
    else if (modelInfo.name.startsWith('停车场')) {
        const res = await GetCarAreaDetail(id)
        const { data, code } = res;
        if (code === 10000) {
            buildinginfo.value = data;
            flag.value = 'carpark';
        }
    }
}

const handlemouseHover = (e) => {
    // 模型渲染完毕之后后续的逻辑操作
    // 3. 拉取资源之后.then方法中可以做后续的逻辑操作
    modelInfo = e.target;
}

const handleMouseDown = async (e) => {
    console.log(e.target);
    if (modelInfo.id === e.target.id) {
        await getModelInfoById(e.target.id)
        openModel.value = true;
    }
}


const init3dModel = () => {
    // 开启loading 
    showLoading.value = true
    // 1. 实例解析器对象(传入模型将来渲染的节点对象)
    const spline = new Application(ref3d.value)
    // 2. 使用对象load方法去拉取3大模型资源
    spline.load(`${publisPath}/scene.splinecode`).then(() => {
        showLoading.value = false
        // 模型渲染完毕之后后续的逻辑操作
        // 3. 拉取资源之后.then方法中可以做后续的逻辑操作
    })
    spline.addEventListener('mouseHover', handlemouseHover);
    spline.addEventListener('mouseDown', handleMouseDown);
}

const handleMouseMove = (e) => {
    mouse = {
        x: e.clientX,
        y: e.clientY
    };
};

const handleContextMenu = (e) => {
    e.preventDefault();
    closeModel();
};

watchEffect(async () => {
    if (ref3d.value) {
        init3dModel();
    }
});

onMounted(async () => {
    // 获取原生的dom对象
    // 这个方法执行的时候 虽然在mounted中执行的 但是不能保证依赖的数据已经通过接口返回了
    // 解决方案：等到数据返回之后才进行初始化操作
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('contextmenu', handleContextMenu);
})

onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('contextmenu', handleContextMenu);

});
</script>

<style scoped>
.model_bg {
    position: fixed;
}
</style>
