import { App } from "vue";
import request from "./request";
export * from "./api/index"; // 导出api

export default{
    install: (app:App<Element>) => {
        app.config.globalProperties.$request = request;
    }
}
