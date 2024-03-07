<template>
    <div class="login">
        <el-form ref="loginFormRef" :model="formModel" label-width="80px">
            <el-form-item label="用户名" prop="username" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
                <el-input v-model="formModel.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
                <el-input type="password" v-model="formModel.password" />
            </el-form-item>
            <el-form-item>
                <!-- 登录前验证 -->
                <el-button type="success" @click="verifyAndlogin(loginFormRef)">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/store'
import type { FormInstance } from 'element-plus';

const authStore = useAuthStore()
const loginFormRef = ref<FormInstance>()
const formModel = reactive({
    username: '',
    password: ''
})

const verifyAndlogin = (_form: FormInstance | undefined) => {
    if (!_form) return
    _form.validate((valid: boolean) => {
        if (valid) {
            authStore.loginAction(formModel)
        } else {
            console.log('验证失败')
        }
    })
}
</script>

<style lang='scss' scoped></style>
