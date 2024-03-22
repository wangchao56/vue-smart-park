<template>
    <div class="workbench-box">
        <el-row :gutter="16">
            <el-col :span="18" class="top">
                <el-card>
                    <template #header>
                        园区数据
                    </template>
                    <div class="park-data-box">
                        <div v-for="item in parkEntry" :key="item.label" class="park-data-item">
                            <p class="label">
                                <span>{{ item.label }}</span>
                                <span>（{{ item.unit }}）</span>
                            </p>
                            <span class="value">{{ item.value }}</span>
                        </div>
                    </div>

                </el-card>
            </el-col>
            <el-col :span="6" class="top">
                <el-card>
                    <template #header>
                        快捷入口
                    </template>
                    <div class="quick-entry-box">
                        <div v-for="item in quickEntry" :key="item.name" class="quick-entry-item">
                            <router-link :to="item.path">
                                <img :src="item.icon" alt="" />
                                <p>{{ item.name }}</p>
                            </router-link>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="16">
            <el-col :span="18">
                <el-space direction="vertical" :size="20" fill
                    style="width:100%;display:flex;flex-direction:column;row-gap:1.25rem">
                    <el-card body-class="year-box">
                        <template #header>
                            年度收入统计
                        </template>
                        <EchartComp :option="annualIncomeOption" />
                    </el-card>
                    <el-card>
                        <template #header>
                            临期合同提醒
                        </template>
                        <el-table :data="tableData">
                            <el-table-column v-for="item in tableColumns" :key="item.title" :label="item.title"
                                :prop="item.key">
                                <template #default="{ row }">
                                    <span v-if="item.dataIndex === 'operation'">
                                        <el-button text type="primary" size="small">编辑</el-button>
                                        <el-button text type="primary" size="small">删除</el-button>
                                    </span>
                                    <span v-else>{{ row[item.dataIndex] }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
                </el-space>

            </el-col>
            <el-col :span="6">
                <el-card>
                    <template #header>
                        设备告警派单
                    </template>
                    <!---时间线-->
                    <el-timeline>
                        <el-timeline-item v-for="item in poleWarningListData" :key="item.id"
                            :color="item.handleStatus == '1' ? 'green' : 'red'" :timestamp="item.warningTime"
                            placement="top">
                            <el-card>
                                <template #header>
                                    {{ item.poleName }}
                                </template>

                                <el-space :size="24">
                                    <p>{{ item.errorType }} </p>
                                    <el-button text type="primary" size="small">编辑
                                        <el-icon>
                                            <DArrowRight />
                                        </el-icon>
                                    </el-button>
                                </el-space>

                                <template #footer>
                                    <p>{{ item.handleStatus == '1' ? '已处理' : '未处理' }}</p>

                                </template>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script setup lang='ts'>
import { GetCarBuildingInfo, GetWorkbenchInfo, GetWorkbenchRentInfo, GetPoleWarningList } from '@/services';
import { ref } from 'vue'
import { EChartsOption } from 'echarts';

import carIcon from '@/assets/images/1.png'
import buildingIcon from '@/assets/images/2.png'
import enterpriseIcon from '@/assets/images/3.png'
import parkingIcon from '@/assets/images/4.png'




let baseData = ref<API.BaseDataType>({
    annualIncome: 0,
    enterpriseTotal: 0,
    monthCardTotal: 0,
    chargePoleTotal: 0
})

let annualIncomeArrayData = reactive<API.AnnualIncomeArrayType>({
    xmonth: [],
    ybuilding: [],
    yparking: []
})

// 年度收入统计  柱状图
const annualIncomeOption = reactive<EChartsOption>({

    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        // 显示总和
        formatter: (params) => {
            //总收入
            let total = params!.reduce((prev, cur) => {
                return prev + cur.value
            }, 0)
            let label = params[0].axisValue;
            return `${label} <br/>` + params.map((item) => {
                return `${item.seriesName}:${item.value}元`
            }).join('<br/>') + `<br/>总收入:${total}元` //显示总和 
        }
    },
    legend: {
        data: ['物业费', '停车费'],
        bottom: 0,
        right: 0,
        // 纵向排列
        orient: 'vertical',
        top: 20 // 距离顶部20px
    },

    xAxis: {
        type: 'category',
        data: []
    },
    yAxis: {
        type: 'value',


    },
    series: [
        {
            name: '物业费',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
                focus: 'series'
            },
            data: []
        },
        {
            name: '停车费',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
                focus: 'series'
            },
            data: []
        }
    ],
    color: ['#FFA500', '#87CEFA']
})



const initGetWorkbenchInfo = async () => {
    const res = await GetWorkbenchInfo()
    const { annualIncomeArray, ...newData } = res.data
    baseData.value = newData   //园区数据
    annualIncomeArrayData = annualIncomeArray
    annualIncomeOption.xAxis.data = annualIncomeArray.xmonth
    annualIncomeOption.series[0].data = annualIncomeArray.ybuilding //物业费
    annualIncomeOption.series[1].data = annualIncomeArray.yparking //停车费
}


//获取合同数据
const initGetWorkbenchRentInfo = async () => {
    const res = await GetWorkbenchRentInfo({
        page: '1',
        pageSize: '10'
    })
    tableData.value = res.data.rows.map((item, index) => {
        return {
            ...item,
            index: index + 1,
            leaseTime: `${item.startTime}至${item.endTime}`
        }
    })
}

//获取告警派单数据
const initGetPoleWarningList = async () => {
    const params = {
        page: '1',
        pageSize: '10'
    }
    const res = await GetPoleWarningList(params)
    console.log('res: ', res);
    poleWarningListData.value = res.data.rows
}

onMounted(() => {
    initGetWorkbenchInfo();
    initGetWorkbenchRentInfo();
    initGetPoleWarningList();
})

//告警派单数据label  序号		一体杆编号	故障类型	处置状态	告警时间	操作
let poleWarningListLabel = reactive([{
    label: '一体杆名称',
    attr: 'poleName'
}, {
    label: '故障类型',
    attr: 'errorType'
}, {
    label: '处置状态',
    attr: 'handleStatus'
}, {
    label: '告警时间',
    attr: 'warningTime'
}])

//告警派单数据
let poleWarningListData = ref<API.WarningInfo[]>([])


const tableData = ref<API.RentInfo[]>([])


//园区数据

const parkEntry = reactive([
    {
        label: '年度累计收费',
        attr: 'annualIncome',
        value: baseData.value.annualIncome,
        unit: '元',
    },
    {
        label: '入驻企业总数',
        attr: 'enterpriseTotal',
        value: baseData.value.enterpriseTotal,
        unit: '个',
    },
    {
        label: '月卡车辆总数',
        attr: 'monthCardTotal',
        value: baseData.value.monthCardTotal,
        unit: '辆',
    },
    {
        label: '一体杆总数',
        attr: 'chargePoleTotal',
        value: baseData.value.chargePoleTotal,
        unit: '台',
    }
])

watch(() => baseData.value, (newVal) => {
    console.log('newVal: ', newVal);
    parkEntry.forEach(item => {
        item.value = newVal[item.attr as keyof typeof newVal]
    })
})

//快捷入口  
const quickEntry = [
    {
        name: '添加企业',
        icon: carIcon,
        path: '/car'
    },
    {
        name: '员工管理',
        icon: buildingIcon,
        path: '/sys/user'
    },
    {
        name: '添加账单',
        icon: enterpriseIcon,
        path: '/enterprise'
    },
    {
        name: '数据大屏',
        icon: parkingIcon,
        path: '/parking'
    },
]


const tableColumns = [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
    },
    {
        title: '企业名称',
        dataIndex: 'enterpriseName',
        key: 'enterpriseName',
    },
    {
        title: '租赁楼宇',
        dataIndex: 'buildingName',
        key: 'buildingName',
    },
    {
        title: '租赁时间',
        dataIndex: 'leaseTime',
        key: 'leaseTime',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        scopedSlots: { customRender: 'operation' },
    },
];


</script>

<style lang='scss' scoped>
//深度选择器

:deep(.year-box) {
    height: 350px !important;
}

.workbench-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 1.25rem;
}

.park-chart-box {
    width: 600px;
    height: 400px;
}

.parkIndustry-box {
    width: 600px;
    height: 600px;
}

.top {
    // max-height: 150px;
    overflow: hidden;
}

h3 {
    padding: 0;
    padding: none;
    margin: 0;
}

.quick-entry-box {
    display: flex;
    justify-content: space-around;
}

.quick-entry-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
        width: 50px;
        height: 50px;
    }

    p {
        margin-top: 10px;
    }

    a {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #000;
        text-decoration: none;
        font-size: 0.8rem;
    }
}

.park-data-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 15px;

    .park-data-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: 20px;

        span {
            margin-top: 10px;
        }

        .label {
            font-size: 0.8rem;
            font-weight: 600;
            color: #909399;
        }

        .value {
            font-size: 1.2rem;
            font-weight: 700;
        }
    }
}
</style>
