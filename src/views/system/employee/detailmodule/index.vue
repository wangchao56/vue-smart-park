<template>
    <el-drawer v-model="drawer" title="I am the title" :direction="direction" :before-close="handleClose">
        <el-descriptions class="margin-top" title="With border" :column="3" :size="size" border>
            <template #extra>
                <el-button type="primary">Operation</el-button>
            </template>
            <el-descriptions-item v-for="item in labelOptions">
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <user />
                        </el-icon>
                        {{ item.label }}
                    </div>
                </template>
                {{ detilData[item.value] }}
            </el-descriptions-item>

        </el-descriptions>
    </el-drawer>

</template>

<script setup lang='ts'>

const drawer = ref(false)
const direction = ref<'rtl' | 'ltr' | 'ttb' | 'btt' | undefined>('rtl')
const size = ref<"default" | "small" | "large" | undefined>('default')
const iconStyle = computed(() => {
    const marginMap: {
        [key: string]: string
    } = {
        large: '8px',
        default: '6px',
        small: '4px',
    }
    return {
        marginRight: marginMap[size.value as string] || marginMap.default,
    }
})


const handleClose = () => {
    drawer.value = false
}

const detilData = reactive<API.EmployeeInfo>({
    id: 1,
    name: '',
    roleId: '',
    roleName: '',
    phonenumber: '',
    userName: '',
    createTime: '',
    status: 1
})
interface LabelOptions {
    label: string;
    value: keyof API.EmployeeInfo
}

const labelOptions: LabelOptions[] = [
    {
        label: '员工名称',
        value: 'name'
    },
    {
        label: '角色名称',
        value: 'roleName'
    },
    {
        label: '电话号码',
        value: 'phonenumber'
    },
    {
        label: '用户名',
        value: 'userName'
    },
    {
        label: '创建时间',
        value: 'createTime'
    },
    {
        label: '状态',
        value: 'status'
    }
]


</script>

<style lang='scss' scoped></style>
