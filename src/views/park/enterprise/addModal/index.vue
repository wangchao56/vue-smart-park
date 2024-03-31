<template>
    <el-container>
        <el-header>
            <el-space>
                <el-button type="text" link :icon="ArrowLeft" @click="handleBack">返回</el-button>
                <span>|</span>
                <span>{{ title }}</span>
            </el-space>
        </el-header>
        <el-main>
            <el-card>
                <template #header>
                    <h4>企业信息</h4>
                </template>
                <el-form ref="baseFormRef" label-position="right" :model="enterpriseInfoModel" label-width="100px"
                    :rules="rules">
                    <el-row>
                        <template v-for="item  in enterpriseInfoFromItemOptions">
                            <el-col :span="12">
                                <el-form-item :label="item.label" :prop="item.prop">
                                    <el-input :size="item.size" v-model="baseformModel[item.prop]"
                                        :placeholder="item.placeholder" :disabled="item.disabled"></el-input>
                                </el-form-item>
                            </el-col>
                        </template>
                    </el-row>
                </el-form>
            </el-card>
            <el-card>
                <template #header>
                    <h4>联系人信息 </h4>
                </template>

                <el-form ref="contactFormRef" label-position="right" :model="enterpriseInfoModel" label-width="100px"
                    :rules="rules">
                    <el-row>
                        <template v-for="item  in contactFromItemOptions">
                            <el-col :span="12">
                                <el-form-item :label="item.label" :prop="item.prop">
                                    <el-input :size="item.size" v-model="baseformModel[item.prop]"
                                        :placeholder="item.placeholder" :disabled="item.disabled"></el-input>
                                </el-form-item>
                            </el-col>
                        </template>
                    </el-row>
                </el-form>


            </el-card>
            <el-card v-if="mode === 'detail'">
                <template #header>
                    <h4>租赁记录</h4>
                </template>

                <el-table :data="contractList" stripe border>
                    <el-table-column prop="createTime" label="租赁楼宇"></el-table-column>
                    <el-table-column prop="paymentAmount" label="合同状态	"></el-table-column>
                    <el-table-column prop="paymentMethod" label="租赁起止时间">
                    </el-table-column>
                    <el-table-column label="有效日期">
                        <template #default="{ row }">
                            <span>{{ row.cardStartDate }} 至 {{ row.cardEndDate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createUser" label="创建人"></el-table-column>
                </el-table>
            </el-card>
        </el-main>
        <el-footer v-if="mode !== 'detail'">
            <el-button @click="handleActions('reset')">重置</el-button>
            <el-button type="primary" @click="handleActions(mode)">确定</el-button>
        </el-footer>
    </el-container>


</template>

<script setup lang='ts'>
import { ArrowLeft, } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

type ModeType = 'add' | 'edit' | 'detail';
const mode = ref<ModeType>('add');

const contractList = []

const enterpriseInfoModel = ref({

})

interface BaseFormItem {
    label: string;
    prop: string;
    size: 'large' | 'small';
    placeholder: string;
    disabled: boolean;
}

const enterpriseInfoFromItemOptions: BaseFormItem[] = [
    {
        label: '企业名称',
        prop: 'name',
        size: 'large',
        placeholder: '请输入企业名称',
        disabled: false
    },
    {
        label: '法人',
        prop: 'legalPerson',
        size: 'large',
        placeholder: '请输入企业地址',
        disabled: false
    },
    {
        label: '注册地址',
        prop: 'registeredAddress',
        size: 'large',
        placeholder: '请输入企业电话',
        disabled: false
    },
    {
        label: '所在行业',
        prop: 'industryName',
        size: 'large',
        placeholder: '请输入企业邮箱',
        disabled: false
    },
    {
        label: '营业执照',
        prop: 'businessLicenseUrl',
        size: 'large',
        placeholder: '请输入企业简介',
        disabled: false
    }
]


const contactFromItemOptions: BaseFormItem[] = [
    {
        label: '企业联系人',
        prop: 'contact',
        size: 'large',
        placeholder: '请输入企业联系人',
        disabled: false
    },
    {
        label: '联系电话',
        prop: 'contactNumber',
        size: 'large',
        placeholder: '请输入联系电话',
        disabled: false
    },
]

const handleBack = () => {
    router.back()
}

const handleActions = (type: 'add' | 'edit' | 'reset') => {
    console.log(type);
}


</script>

<style lang='scss' scoped>
.add-modal {
    width: 100%;
    height: 100%;
    background-color: #f5f7fa;

    .el-header {
        height: 80px;
        max-height: 80px;
        background-color: var(--m-bg-color);
        text-align: center;
        line-height: 80px;
        color: #fff;
        font-size: 20px;
    }
}
</style>
