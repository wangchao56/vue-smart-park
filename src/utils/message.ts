import { ElMessage, ElMessageBox } from 'element-plus'



interface Options {
    showClose?: boolean,
    duration: number | undefined,
}
// 封装消息提示
/**
 * 可设置提示关闭时间
 * 
 * @description: 消息提示
 * @param {string} message 消息内容 
 */
class Message {

    //成功提示
    success(message: string) {
        ElMessage.success(message)
    }


    error(message: string, _options?: Options) {
        const options: Options = {
            showClose: true,
            duration: 2000 // Change the duration type to number
        };
        ElMessage({
            message,
            type: 'error',
            ...options,
            ..._options
        })
    }

    //弹窗提示
    info(message: string) {
        ElMessage.info(message)
    }


    //关闭所有消息提示
    closeAll() {
        ElMessage.closeAll()
    }

    //警告提示
    warning(message: string) {
        ElMessage.warning(message)
    }

    //操作提示
    async reminder(message: string) {
        const result = await ElMessageBox.confirm(
            message,
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
        return result;
    }

}


export default new Message()
