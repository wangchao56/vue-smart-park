<template>
    <el-card style="width: 100%">
        <template #header>
            <!-- 搜索 -->
            <el-form :inline="true" :model="searchModel">
                <el-form-item v-for="item in searchOptions" :label="item.label" :key="item.prop">
                    <el-input v-model="searchModel[item.prop]" :type="item.formType" :placeholder="`请输入${item.label}`"
                        clearable />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchAction">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- 新增 -->
            <el-button type="primary" @click="handleModel('add')">新增{{ props.title }}</el-button>
        </template>
        <!-- 表格 -->
        <el-table ref="baseTableRef" style="width: 100%" :header-cell-style="{
                background: '#f4f6f8'
            }" border :data="dataSource" @expand-change="handleExpand">

            <template v-for="col in columns" :key="col.prop">
                <el-table-column v-if="col.prop === 'action'" label="操作" fixed="right">
                    <template #default="{ row }">
                        <slot name="action" :row="row"></slot>
                    </template>
                </el-table-column>
                <!--展开-->
                <el-table-column v-else-if="col.type === 'expand'" :type="col?.type" :key="col.prop" :width="col.width"
                    :fixed="col.fixed">
                    <template #default="{ row }">
                        <slot name="expand" :row="row"></slot>
                    </template>
                </el-table-column>
                <el-table-column v-else :type="col?.type" :prop="col.prop" :label="col.label" :width="col.width"
                    :fixed="col.fixed">
                    <template #default="{ row }">
                        {{ col.render ? col.render(row) : row[col.prop] }}
                    </template>
                </el-table-column>
            </template>
        </el-table>

        <template #footer>
            <!-- 分页 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="1000"></el-pagination>
        </template>
        <!-- 详情 -->
        <el-drawer v-model="openDrawer" title="I am the title" :with-header="false">
            详情显示
            <!--
            <el-descriptions class="margin-top" title="Without border" :column="3">
                <el-descriptions-item v-for="row in columns" :key="row.prop" :label="row.label">
                    {{ descriptionData[row.prop as string] }}
                </el-descriptions-item>
            </el-descriptions>-->
        </el-drawer>
        <!-- 新增/编辑 -->
        <el-dialog v-model="openModel" :title="dialogTitle" width="580" :before-close="handleClose">
            <!-- 表单接口 -->
            <slot v-if="slots.formContent" name="formContent"></slot>
            <el-form v-else ref="modelFormRef" :model="formModal" :rules="props.formRules" label-width="80px">
                <el-form-item v-for="item in formOptions" :label="item.label" :prop="item.prop" :rules="item.rules">
                    <el-input v-model="formModal[item.prop]" :type="item.formType" :placeholder="`请输入${item.label}`" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button size="small" type="primary" @click="handleFormAction(modelFormRef)">确 定</el-button>
                <el-button size="small" @click="handleClose">取 消</el-button>
            </template>
        </el-dialog>
    </el-card>
</template>


<script setup lang='ts' generic="T extends Record<string,any>">
import { FormInstance } from 'element-plus';

export interface ColumnType {
    prop?: string;
    label?: string;
    width?: number;
    fixed?: string;
    type?: string;
    formType?: string;
    /**搜索 */
    search?: boolean;
    /**详情显示 */
    show?: boolean;
    rules?: any;
    render?: (row: any) => void;
}

const props = defineProps<{
    dataSource: T[];
    columns: ColumnType[];
    formRules?: any;
    total: number;
    title: string;
}>();

// slot 传递
const slot = defineSlots<{
    default(props: any): any,
    action(props: Record<string, any>): any,
    formContent(props: any): any,
    expand(props: Record<string, any>): any
}>()

const slots = useSlots()
const baseTableRef = ref<any>()

type Emits = {
    'searchAction': [Record<string, any>],
    'modelAction': ['add' | 'edit' | 'del', T | undefined],
    //展开
    'expandAction': [Record<string, any>]
}

//emit 
const emit = defineEmits<Emits>()
const openDrawer = ref<boolean>(false)
const openModel = ref<boolean>(false)
const modelFormRef = ref<FormInstance>(null)
let pageSize = ref<number>(10)

const descriptionData = reactive<T>(Object({}))

const handleSizeChange = (val: number) => {
    pageSize.value = val
}
const searchModel = ref<Record<string, any>>({})
//search 搜索配置
const searchOptions = computed(() => {
    const temp = props.columns.filter((item: ColumnType) => item.search)
    //提取出搜索项 
    searchModel.value = temp.reduce((prev: Record<string, any>, current: ColumnType) => {
        prev[current.prop] = ''
        return prev
    }, {})
    return temp
})
let formModal = reactive<T | Record<string, any>>({})
//表单配置
const formOptions = computed(() => {

    //提取出表单项
    const temp = props.columns.filter((item: ColumnType) => item.formType) || []
    formModal = temp.reduce((prev: Record<string, any>, current: ColumnType) => {
        prev[current.prop] = ''
        return prev
    }, {})
    return temp
})

const dialogTitle = ref<string>(props.title)
const total = ref<number>(0)

const currentPage = ref<number>(1)

//打开model表单
const handleOpenModel = (title: string) => {
    openModel.value = true
    dialogTitle.value = title

}

//打开详情
const handleOpenDrawer = () => {
    openDrawer.value = true
}

const handleFormAction = (formRef: FormInstance) => {
    formRef.validate((valid: boolean) => {
        if (valid) {
            console.log('submit!');
        } else {
            console.log('error submit!!');
            return false;
        }
    });
}

const params = reactive<API.PageParams & {
    name: string;
}>({
    page: '1',
    pageSize: '10',
    name: '',
})

const handleClose = () => {
    openModel.value = false
}

const handleCurrentChange = (val: number) => {
    console.log('当前页: ' + val);
    currentPage.value = val
}
const searchAction = () => {
    emit('searchAction', searchModel.value)
}


const pageChange = (val: number) => {
    params.page = val.toString()
}

const handlNextChange = () => {
    console.log('下一页')
}


const handlPrevChange = () => {
    console.log('上一页')
}


const handleExpand = (row: any, expandedRows: any[]) => {
    emit('expandAction', row)
}

const handleModel = (flag: 'add' | 'edit' | 'del') => {
    emit('modelAction', flag, undefined)
}

defineExpose({
    handleOpenModel,
    handleOpenDrawer,
    //编辑表单时传递数据
    handleEdit: <U>(params: U) => {
        console.log(params);
        formModal = params
        handleOpenModel('编辑' + props.title)
    },
    baseTableRef
})
</script>

<style lang='scss' scoped>
:deep(.el-card__footer) {
    padding: 10px 20px;
    display: flex;
    justify-content: flex-end;

}

/* /deeep/样式穿透*/
/*1.取消原本展开的旋转动效*/
:deep(.el-table__expand-icon) {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
}

:deep(.el-table__expand-icon >.el-icon >svg) {
    display: none;
}

/*2.展开按钮未点击的样式是加号带边框*/
:deep(.el-table__expand-icon>.el-icon::before) {
    content: url('@/assets/images/plus-square.png');
    padding: 1px;
    transition: all 0.3s;

    &:hover {
        content: url('@/assets/images/plus-square-on.png');
    }
}

/*2.按钮已点击展开之后的样式是减号带边框*/
:deep(.el-table__expand-icon--expanded>.el-icon::before) {
    content: url('@/assets/images/subtract-on.png');
}
</style>
