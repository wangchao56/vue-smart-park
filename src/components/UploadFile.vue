<template>
    <el-upload v-model:file-list="fileList" class="upload-demo" :auto-upload="false" :on-change="handleChange">
        <el-button type="primary">点击上传</el-button>
        <template #tip>
            <div class="el-upload__tip">
                支持扩展名：.doc .docx .pdf, 文件大小不得超过5M
            </div>
        </template>
    </el-upload>

</template>

<script setup lang='ts'>
import { UploadFile } from '@/services'
const props = defineProps<
    {
        type: 'contract' | 'businessLicense';
    }>()

//文件上传完成
const emit = defineEmits<{
    'file-upload-success': [API.UploadFileResInfo];
}>()

const fileList = ref<any[]>([])
const handleChange = (file: any, fileList: any) => {
    console.log('file: ', file);
    uploadFile(file);
}

const uploadFile = async (file: any) => {
    console.log(file);
    const formData = new FormData();
    formData.append('file', file.raw);
    if (props.type) {
        formData.append('type', props.type);
    }
    const res = await UploadFile(formData);
    if (res.code === 10000) {
        emit('file-upload-success', res.data);
    }
}




</script>

<style lang='scss' scoped></style>
