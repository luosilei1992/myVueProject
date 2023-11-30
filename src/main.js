import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js';
import { debounce } from "@/api/common.js";
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
const app = createApp(App).use(router).use(ElementPlus, { locale: zhCn });
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app');

// 解决页面报错"ResizeObserver loop limit exceeded"问题
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}
