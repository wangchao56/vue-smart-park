<template>
    <!-- 园区概况 -->
    <el-card class="box-card" body-style="padding-bottom: 50px;">
        <el-row>
            <el-col :span="6" v-for="item in  dataList" :key="item.label">
                <div class="grid-conten">
                    <div class="icon" :data-val="item.value" :style="`background-image: url(${item.icon})`"></div>
                    <span>{{ item.label }}</span>
                    <span>({{ item.unit }})</span>
                </div>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup lang='ts'>
import buildingIcon from '@/assets/images/building-icon.png'
import enterpriseicon from '@/assets/images/enterprise-icon.png'
import caricon from '@/assets/images/car-icon.png'
import rodicon from '@/assets/images/rod-icon.png'

const props = defineProps<{
    data: {
        buildingTotal: number,
        enterpriseTotal: number,
        parkingTotal: number,
        chargePoleTotal: number
    }
}>();

// 数据结构
const dataList = [
    {
        label: '楼宇总数',
        attr: 'buildingTotal',
        value: 100,
        unit: '栋',
        icon: buildingIcon
    },
    {
        label: '入驻企业总数',
        attr: 'enterpriseTotal',
        value: 100,
        unit: '家',
        icon: enterpriseicon
    },
    {
        label: '车位总数',
        attr: 'parkingTotal',
        value: 100,
        unit: '个',
        icon: caricon
    },
    {
        label: '一体杆总数',
        attr: 'chargePoleTotal',
        value: 100,
        unit: '个',
        icon: rodicon
    }
]

watchEffect(() => {
    dataList.forEach(item => {
        item.value = props.data[item.attr as keyof typeof props.data]
    })
})
</script>

<style lang='scss' scoped>
.box-card {
    background: #000000;
    color: #fff;
}

.box-card::before {
    content: '';
    display: block;
    width: inherit;
    height: 68px;
    background-image: url('@/assets/images/园区概况@2x.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: top left;
}

.grid-conten {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1rem;
    line-height: 1.5;

    .icon {
        width: 104px;
        height: 104px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        margin-bottom: 20px;
        display: flex;
        align-items: center;

        &::before {
            content: attr(data-val);
            width: 100%;
            height: 100%;
            z-index: 1;
            color: #fff;
            font-size: 1.2rem;
            font-weight: 600;
            line-height: 1.5;
            text-align: center;
            padding-top: 0.5rem;
        }
    }
}
</style>
