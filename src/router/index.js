import { createRouter, createWebHistory } from 'vue-router';
import layout from '../layout/IndexLayout.vue';

const dingscroll = () => import(/* webpackChunkName: "dingscroll" */ '../views/home/dingscroll.vue');
const infinitescroll = () => import(/* webpackChunkName: "infinitescroll" */ '../views/infinitescroll/index.vue');
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: layout,
            name: '封面',
            redirect: '/dingscroll',
            children: [
                {
                    path: '/dingscroll',
                    name: 'dingscroll',
                    component: dingscroll
                }
            ]
        },
        {
            path: '/infinitescroll',
            component: layout,
            name: 'infinitescroll',
            redirect: '/infinitescroll',
            children: [
                {
                    path: '/infinitescroll',
                    name: 'infinitescroll',
                    component: infinitescroll
                }
            ]
        },
    ]
});

export default router;