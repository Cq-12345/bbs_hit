import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus, { paginationEmits } from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const pinia = createPinia();

app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.use(pinia)

app.mount('#app')
