import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

import TestA from "/package/index.ts";

// console.log(testa);


const app = createApp(App)

app.use(ElementPlus)
// app.use(testa)
app.use(TestA)
app.mount('#app')
