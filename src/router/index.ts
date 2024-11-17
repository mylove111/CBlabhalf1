import { createRouter, createWebHistory } from 'vue-router';
import MedalTable from '@/views/MedalTable.vue';
import CountryDetails from '@/views/CountryDetails.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MedalTable,
  },
  {
    path: '/detail/:countryName',
    name: 'CountryDetails',
    component: CountryDetails,
    props: true, // 启用 props 传参
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
