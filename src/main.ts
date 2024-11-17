import { createApp } from 'vue';
import { createPinia } from 'pinia';
import  router  from './router';
import App from './App.vue';
import './assets/styles.css'; // 确保这个文件包含 Tailwind 的基础样式

createApp(App).use(createPinia()).use(router).mount('#app');
