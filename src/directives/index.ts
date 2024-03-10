
import { App } from 'vue';
import AuthBtn from './auth-btn';

export default {
    install(app: App<Element>) {
        app.directive('auth-btn', AuthBtn);
    }
} 
