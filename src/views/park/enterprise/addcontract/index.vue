<template>
    <div class="contactForm-box">
        <el-form label-position="top" style="width: 100%;">
            <el-form-item label="租赁楼宇" prop="name">
                <el-select v-model="contactForm.name" clearable placeholder="请选择租赁楼宇">
                    <el-option v-for="item in rentbuildingoptions" :key="item.id" :label="item.name"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="租赁起止时间" prop="contact">
                <el-date-picker v-model="contactForm.time" type="daterange" range-separator="至" start-placeholder="开始日期"
                    end-placeholder="结束日期" clearable>
                </el-date-picker>
            </el-form-item>
            <el-form-item label="租赁合同">
                <UploadFile @file-upload-success="handleFileSucccess" type="contract" />
            </el-form-item>
        </el-form>
    </div>

</template>

<script setup lang='ts'>
import { GetRentBuilding, PostEnterpriseRent } from '@/services'
import UploadFile from '@/components/UploadFile.vue';


const contactForm = reactive({
    name: '',
    time: '',
    contactNumber: ''
})

const rentbuildingoptions = ref<{
    id: number;
    name: string;
}[]>([])

const getRentBuildingHandle = async () => {
    const res = await GetRentBuilding()
    rentbuildingoptions.value = res.data
}

onMounted(() => {
    getRentBuildingHandle()
})

watchEffect(() => {

})

const contactInfo = reactive<API.ContractInfo>({
    buildingId: 0,
    startTime: '',
    endTime: '',
    contractUrl: '',
    contractId: 0,
    type: 0, //添加合同
    enterpriseId: 0,
})

// 提交
// const submitForm = async () => {
//     const res = await PostEnterpriseRent(contactForm)
//      
// }

const handleFileSucccess = (data: API.UploadFileResInfo) => {
    ;
    // submitForm()
    if (!data) {
        return
    }
    const { id, url } = data
    contactInfo.contractId = id
    contactInfo.contractUrl = url
}

</script>

<style lang='scss' scoped>
.contactForm-box {
    width: 100%;
    padding: 20px 100px;
    box-sizing: border-box;
}
</style>
