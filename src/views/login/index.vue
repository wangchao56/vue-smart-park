<template>
    <el-row>
        <el-col :span="15">
            <div class="login-view">
                <img :src="viewSrc" alt="" srcset="">
            </div>
        </el-col>
        <el-col :span="5" class="login-form" :offset="2">
            <h2>智慧园区</h2>
            <el-form label-position="top" label-width="auto" ref="loginFormRef" :model="formModel" size="large"
                style="max-width: 600px">
                <el-form-item label="用户名" prop="username"
                    :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
                    <el-input v-model="formModel.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password"
                    :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
                    <el-input type="password" show-password v-model="formModel.password" />
                </el-form-item>
                <!-- 记住我 -->
                <el-form-item>
                    <el-checkbox v-model="authStore.rememberMe">记住我</el-checkbox>
                </el-form-item>

                <el-form-item>
                    <!-- 登录前验证 -->
                    <el-button class="login-btn" color="#222" size="large"
                        @click="verifyAndlogin(loginFormRef)">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
    <div class="login">

    </div>
</template>

<script setup lang='ts'>
import { reactive, ref, onMounted } from 'vue'
import { useAuthStore } from '@/store'
import type { FormInstance } from 'element-plus';
import viewSrc from '@/assets/images/login-view.jpg'
import message from '@/utils/message';
const authStore = useAuthStore()
const loginFormRef = ref<FormInstance>()
const formModel = reactive({
    username: '',
    password: '',
})
onMounted(() => {
    // 获取记住我的数据
    const remember = localStorage.getItem('REMEMBER_ME_KEY')
    if (remember && remember !== 'undefined') {
        const data = JSON.parse(remember)
        formModel.username = data.username
        formModel.password = data.password
    }
})

// 登录验证
const verifyAndlogin = (_form: FormInstance | undefined) => {
    if (!_form) return
    _form.validate((valid: boolean) => {
        if (valid) {
            // 登录
            authStore.loginAction(formModel);
        } else {
            message.error('请输入用户名和密码')
        }
    })
}
</script>

<style lang='scss' scoped>
.login-view {
    height: 100vh;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
}

.login-form {
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;

    h2 {
        font-size: 2em;
        margin-bottom: 20px;
        text-align: center;

    }
}

.login-btn {
    width: 100%;
}
</style>
