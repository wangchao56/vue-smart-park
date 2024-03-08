import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'element-plus/es/components/message/style/css';
import './styles/index.scss'
import installStore from './store' // 挂载store
import services from './services' // 挂载service
import router from './router'
import * as ELIcons from '@element-plus/icons-vue';
import components from './components';

const app = createApp(App)

// 注册element-plus的图标
for (const key in ELIcons) {
  app.component(key,(ELIcons as any)[key])
}
for (const key in components) {
  app.component(key,components[key])
}
app.use(router)
app.use(installStore)
app.use(services)

app.mount('#app')
