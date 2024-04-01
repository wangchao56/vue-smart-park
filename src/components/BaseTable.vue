<template>
    <el-card style="width: 100%">
        <template #header>
            <!-- 搜索 -->
            <el-form :inline="true" action="#" @submit.native.prevent :model="searchModel" v-if="props.showSearch"
                class="custom-form-inline">
                <el-form-item v-for="item in searchOptions" :label="item.label" :key="item.prop">
                    <!-- 如果formType为select -->
                    <el-select v-if="item.formType && item.options" v-model="searchModel[item.prop]" value-key="value"
                        placeholder="请选择">
                        <el-option v-for="option in item.options" :key="option.value" :label="option.label"
                            :value="option.value" />
                    </el-select>
                    <el-input v-else v-model="searchModel[item.prop]" :type="item.formType"
                        :placeholder="`请输入${item.label}`" clearable />
                </el-form-item>

                <el-form-item type="submit">
                    <el-button type="primary" @click="searchAction">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- 新增 -->
            <el-space>
                <slot name="actionbtn"></slot>
            </el-space>
        </template>
        <!-- 表格 -->
        <el-table ref="baseTableRef" style="width: 100%" :header-cell-style="{ background: '#f4f6f8' }" border
            :data="dataSource" @expand-change="handleExpand" @selection-change="handleSelectionChange">
            <template v-for="col in columns" :key="col.prop">
                <!-- 操作 -->
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
                <!-- 多选 -->
                <el-table-column v-else-if="col.type === 'selection'" :type="col?.type" :width="col.width"
                    :fixed="col.fixed" />
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
        <el-dialog v-model="openModel" class="form-dialog" :title="dialogTitle" width="580" :before-close="handleClose">
            <!-- 表单接口 -->
            <slot v-if="slots.formContent" name="formContent"></slot>
            <!-- <el-form v-else ref="modelFormRef" :model="formModal" :rules="props.formRules" label-position="top"
                label-width="80px">
                <el-form-item v-for="item in formOptions" :label="item.label" :prop="item.prop" :rules="item.rules">
                    <el-input v-model="formModal[item.prop]" :type="item.formType" :placeholder="`请输入${item.label}`" />
                </el-form-item>
            </el-form> -->
            <template #footer>
                <el-button size="small" type="primary" @click="handleFormAction(formFlag)">确定</el-button>
                <el-button size="small" @click="handleClose">取 消</el-button>
            </template>
        </el-dialog>
    </el-card>
</template>


<script setup lang='ts' generic="T extends Record<string,any>">
import type { ElTable } from "element-plus";

export interface ColumnType {
    prop?: string;
    label?: string;
    width?: number;
    fixed?: string;
    type?: string;
    formType?: string;
    /**搜索 */
    search?: boolean;
    options?: {
        label: string;
        value: string | number;
        default?: boolean;
    }[];
    /**详情显示 */
    show?: boolean;
    rules?: any;
    render?: (row: any) => void;
}

export interface Handlers<U> {
    handleOpenModel: (title: string, type: 'add' | 'edit') => void;
    handleCloseModel: () => void;
    handleCloseDrawer: () => void;
    handleOpenDrawer: () => void;
    handleEdit: (params: U) => void;
    baseTableRef: any; // 请根据实际情况替换为正确的类型
}




const props = defineProps<{
    dataSource: T[];
    columns: ColumnType[];
    formRules?: any;
    total?: number;
    title?: string;
    addBtnTitle?: string;
    showSearch?: boolean;
}>();

// slot 传递
const slot = defineSlots<{
    default(props: any): any,
    action(props: Record<string, any>): any,
    formContent(): any,
    expand(props: Record<string, any>): any,
    actionbtn(): any
}>()

const slots = useSlots()
const baseTableRef = ref<InstanceType<typeof ElTable>>()

watch(() => baseTableRef.value, (val) => {
    ;
})

type Emits = {
    'searchAction': [Record<string, any>],
    'modelAction': ['add' | 'edit' | 'del', T | undefined],
    //展开
    'expandAction': [Record<string, any>]
    //表单弹窗确认操作
    'formAction': [UTIL.FormActionType]
    'batchAction': [T[]]
}

//表单编辑的标志 add  edit 
const formFlag = ref<UTIL.FormActionType>('add')
//emit 
const emit = defineEmits<Emits>()
const openDrawer = ref<boolean>(false)
const openModel = ref<boolean>(false)
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
        prev[current.prop] = '';
        //默认值
        if (current.options) {
            const defaultOption = current.options.find(item => item.default)
            if (defaultOption) {
                prev[current.prop] = defaultOption.value
            }
        }
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
const handleOpenModel = (title: string, type: UTIL.FormActionType) => {
    openModel.value = true
    dialogTitle.value = title
    formFlag.value = type
}
const handleCloseModel = () => {
    openModel.value = false
}
//打开详情
const handleOpenDrawer = () => {
    openDrawer.value = true
}
const handleFormAction = (type: UTIL.FormActionType) => {
    emit('formAction', type)
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
    handleFormAction('close')
}

const handleCurrentChange = (val: number) => {
    ;
    currentPage.value = val
}
const searchAction = () => {
    emit('searchAction', searchModel.value)
}

const pageChange = (val: number) => {
    params.page = val.toString()
}

const handlNextChange = () => {

}


const handlPrevChange = () => {

}


const handleExpand = (row: any, expandedRows: any[]) => {
    emit('expandAction', row)
}

const handleModel = (flag: 'add' | 'edit' | 'del') => {
    emit('modelAction', flag, undefined)
}


const handleSelectionChange = (val: T[]) => {
    ;
    emit('batchAction', val)
}


defineExpose<Handlers<T>>({
    handleOpenModel,
    handleOpenDrawer,
    handleCloseModel,
    handleCloseDrawer: () => {
        openDrawer.value = false
    },
    //编辑表单时传递数据
    handleEdit: (params: T) => {
        ;
        formModal = params
        handleOpenModel('编辑' + props.title, 'edit')
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

.custom-form-inline {
    .el-select {
        --el-select-width: 120px;
    }

}

:deep(.form-dialog) {
    .el-dialog__body {
        padding: 20px 100px !important;
    }
}
</style>
