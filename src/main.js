import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import elementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const pinia = createPinia()

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.config.globalProperties.$base_url = 'http://localhost:8080/forum'
app.config.globalProperties.$image_base_url = app.config.globalProperties.$base_url
app.use(pinia)
  .use(router)
  .use(elementPlus)
  .mount('#app')
