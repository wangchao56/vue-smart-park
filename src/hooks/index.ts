/**
 * 表格获取数据的钩子
 * @param params 请求参数 
 * @param api 请求接口的函数名称
 * 
 */
import * as ApiTrigger from '@/services';
import { ref, onMounted, onUnmounted } from 'vue';
import { addIndex } from '@/utils';


type ApiTriggerType = typeof ApiTrigger; // 获取ApiTrigger的类型

//剔除掉default属性
type FinalApiTrigger = Omit<ApiTriggerType, 'default'>;

function useTableData<T>(params: any, api: keyof FinalApiTrigger) {
    const tableData = ref<T[]>([]);
    const loading = ref(false);
    const fetchTableData = async () => {
        loading.value = true;
        try {
            const res = await ApiTrigger[api](params, {});
            tableData.value = res.data;
        } catch (error) {
            console.log(error);
        } finally {
            loading.value = false;
        }
    };
    onMounted(() => {
        fetchTableData();
    });
    onUnmounted(() => {
        tableData.value = [];
    });
    return {
        tableData,
        loading,
        fetchTableData,
    };
}
export { useTableData }
