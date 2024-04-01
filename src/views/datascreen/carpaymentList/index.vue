<template>
    <div class="carPayment-container">
        <div class="header_img">
            <img :src="ImgSrc" alt="车辆缴费记录">
        </div>
        <div class="content">
            <div class="content-header">
                <span>缴费时间</span>
                <span>车牌号</span>
                <span>收费类型</span>
                <span>收费金额(元)</span>
            </div>
            <!-- 无限滚动的列表 -->
            <vue3-seamless-scroll :list="carPaymentList" class="scroll" :hover="true" :limitScrollNum="10" :copyNum="2">
                <div class="item" v-for="(item, index) in carPaymentList" :key="index">
                    <span>{{ item.paymentTime }}</span>
                    <span>{{ item.carNumber }}</span>
                    <span>{{ chargeTypeOptions[item.chargeType] }}</span>
                    <span>{{ item.actualCharge }}</span>
                </div>
            </vue3-seamless-scroll>
        </div>
    </div>
</template>

<script setup lang='ts'>
import ImgSrc from '@/assets/images/车辆缴费记录@2x.png';
import { GetWorkbenchPaymentList } from '@/services';
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
const carPaymentList = ref<API.CarPaymentInfo[]>([]);

const chargeTypeOptions = {
    card: '月卡车辆',
    temp: '临时车辆',
}




onMounted(async () => {
    const res = await GetWorkbenchPaymentList();
    console.log(res);
    if (res.code === 10000) {
        carPaymentList.value = res.data.rows;
    }
})

</script>

<style lang='scss' scoped>
.header_img {
    width: 100%;
    margin-bottom: 16px;
}

.content {
    display: flex;
    flex-direction: column;
    color: #fff;
    height: 100%;

    .content-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 40px;
        background-image: linear-gradient(rgb(9, 20, 36), rgb(0, 85, 161));
        padding-left: 50px;


        span {
            width: calc(100% / 4);
            text-align: center;
        }

    }

    .scroll {
        overflow-y: hidden;
        overflow-x: visible;
        flex: 1;
        height: 100%;

        .item {

            height: 40px;
            line-height: 1.5;
            display: flex;
            align-items: center;
            margin: 8px 0px;
            position: relative;
            padding-left: 50px;

            span {
                width: calc(100% / 4);
                text-align: center;
            }

            border-bottom: 2px solid transparent;
            border-top: 2px solid transparent;

            // 鼠标移入
            &:hover {
                // 上下边从中间向两边渐变光环
                border-bottom: 2px solid;
                border-top: 2px solid;
                border-image: linear-gradient(90deg, rgba(54, 146, 255, 0), rgba(54, 146, 255, .86) 50%, rgba(54, 146, 255, 0)) 2 2;
                background-image: linear-gradient(90deg, rgba(20, 25, 34, 0), hsl(215, 45%, 19%) 50%, rgba(4, 7, 13, 0));
                cursor: pointer;
                // 文字颜色渐变 
                transition: opacity .3s ease-in-out;
                color: rgba(54, 146, 255, .86);

                // 左侧三角标
                &::before {
                    content: '';
                    position: absolute;
                    left: 0px;
                    top: 50%;
                    z-index: 99;
                    transform: translateY(-50%) translateX(10px);
                    width: 25px;
                    height: 15px;
                    background-color: rgb(0, 85, 161);
                    clip-path: polygon(0 0, 100% 48%, 1% 100%, 31% 49%);
                    background-image: linear-gradient(90deg, rgb(133, 172, 245), rgb(54, 144, 255) 30%, rgb(133, 172, 245));
                }
            }


        }
    }
}
</style>
