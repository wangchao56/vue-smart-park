import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'element-plus/es/components/message/style/css';
import 'element-plus/theme-chalk/el-message-box.css'
import installStore from './store' // 挂载store
import services from './services' // 挂载service
import router from './router'
import * as ELIcons from '@element-plus/icons-vue';
import components from './components';
import directives from './directives';

const app = createApp(App)

// 注册element-plus的图标
for (const key in ELIcons) {
  app.component(key, (ELIcons as any)[key])
}
for (const key in components) {
  app.component(key, components[key])
}
app.use(router) // 挂载路由
app.use(installStore) // 挂载store
app.use(services) // 挂载service
app.use(directives) // 挂载directive

app.mount('#app')
