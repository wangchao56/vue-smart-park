<template>
    <div class="carParkInfo_container">
        <div class="header_img">
            <img :src="ImgSrc" alt="停车场实时情况">
        </div>
        <div class="content">
            <div class="top">
                <p>车位总数量</p> <span>{{ carParkInfo.totalSpaceNum }}</span>
            </div>
            <div class="bottom">
                <div class="left">
                    <EchartsComp :option="options" />
                </div>
                <div class="right">
                    <div class="item" v-for="(item) in labelOptions">
                        <div class="color" :style="{ background: item.color }"></div>
                        <p class="item_content"><span>{{ item.label }} </span> <span class="value">{{
                carParkInfo[item.attr] }}</span></p>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script setup lang='ts'>
import EchartsComp from '@/components/EchartComp.vue'

import ImgSrc from '@/assets/images/停车场实时情况@2x.png';
import { GetCarParkInfo } from '@/services';

const labelOptions = [
    {
        label: '总占用车位数量',
        attr: 'occupancySpaceNum',
        order: 3,
        color: '#FFA500'
    },
    {
        label: '总空闲车位数量',
        attr: 'remainSpaceNum',
        order: 1,
        color: '#00C0FF'
    },
    {
        label: '实时车位占有率',
        attr: 'spaceProportion',
        order: 2,
        color: '#00C853'
    }
].sort((a, b) => a.order - b.order)

const carParkInfo = ref<API.CarParkInfo>({
    occupancySpaceNum: 0,
    remainSpaceNum: 0,
    spaceProportion: 0,
    totalSpaceNum: 0
})

const options = computed(() => {

    const data = [
        {
            value: unref(carParkInfo)?.remainSpaceNum * 100, name: '总空闲车位数量', itemStyle: {
                color: '#00C0FF'
            }
        },
        {
            value: unref(carParkInfo)?.occupancySpaceNum * 100, name: '总占用车位数量',
            itemStyle: {
                color: '#FFA500'
            }
        },
    ]

    return {
        series: [
            {
                type: 'pie',
                radius: ['50%', '70%'],
                data,
                label: {
                    show: false,
                },
            }
        ]
    }
})

onMounted(async () => {
    const res = await GetCarParkInfo();
    ;

});

</script>

<style lang='scss' scoped>
.carParkInfo_container {
    width: 100%;
    color: #fff;


    .content {
        width: 100%;
        box-sizing: border-box;
        padding: 0 32px;
        display: flex;
        flex-direction: column;

        .top {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            background-image: linear-gradient(90deg, rgb(13, 20, 38), rgb(14, 23, 50) 50%, rgb(13, 20, 38));
        }

        .bottom {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            .left {
                width: 150px;
                height: 150px;
            }

            .right {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                column-gap: 64px;

                .item {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    gap: 16px;

                    .color {
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                    }

                    .item_content {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        column-gap: 16px;
                    }

                }
            }
        }
    }
}
</style>
