import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import '@/styles/index.less'
import ErabbitUI from 'erabbit-ui'
import 'erabbit-ui/packages/theme/index.less'

createApp(App).use(store).use(router).use(ErabbitUI).mount('#app')
