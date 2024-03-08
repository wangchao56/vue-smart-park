import { App } from 'vue';
import {createPinia,defineStore} from 'pinia';


const pinia = createPinia();
export * from './modules/index';
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
        app.use(pinia);
    }
}


