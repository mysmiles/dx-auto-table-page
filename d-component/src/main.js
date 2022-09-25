import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

import DComponents from "/package/index.ts";



const app = createApp(App)

app.use(ElementPlus)
app.use(DComponents)
app.mount('#app')
