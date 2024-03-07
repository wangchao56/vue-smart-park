import { App } from 'vue';
import {createPinia,defineStore} from 'pinia';
export * from './modules/index';
export const pinia = createPinia();
export const useStore = defineStore('store', {
    state: () => ({
        count: 0
    }),
    actions: {
        increment() {
            this.count++;
        }
    }

});


export default {
    install: (app:App<Element> ) => {
        console.log('app: ', app);
        app.use(pinia);
    }
}


