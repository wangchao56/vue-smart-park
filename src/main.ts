import { createApp } from 'vue'
import 'normalize.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/es/components/message/style/css'
import App from './App.vue'

import installStore from './store' // 挂载store
import services from './services' // 挂载service
import router from './router'
const app = createApp(App)
app.use(services)
app.use(installStore)
app.use(router)
app.mount('#app')
