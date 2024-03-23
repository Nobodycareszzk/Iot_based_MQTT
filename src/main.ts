import 'normalize.css'
import './assets/css/index.less'
import { createApp } from 'vue'
import pinia from './stores'
import App from './App.vue'
import router from './router'
import useLoginStore from '@/stores/login/login'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/el-message.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
const loginStore = useLoginStore()
loginStore.loadLocalCacheAction()
app.use(router)
app.mount('#app')
