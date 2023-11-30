import { createRouter, createWebHistory } from 'vue-router';
import layout from '../layout/IndexLayout.vue';

const dingscroll = () => import(/* webpackChunkName: "dingscroll" */ '../views/home/dingscroll.vue');
const infinitescroll = () => import(/* webpackChunkName: "infinitescroll" */ '../views/infinitescroll/index.vue');
const crosstable = () => import (/* webpackChunkName: "crosstable" */ '../views/crosslist/crosstable.vue');
const rotation = () => import (/* webpackChunkName: "rotation" */ '../views/3drotation/rotation.vue');
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
        {
            path: '/crosstable',
            component: layout,
            name: 'crosstable',
            redirect: '/crosstable',
            children: [
                {
                    path: '/crosstable',
                    name: 'crosstable',
                    component: crosstable
                }
            ]
        },
        {
            path: '/rotation',
            component: layout,
            name: 'rotation',
            redirect: '/rotation',
            children: [
                {
                    path: '/rotation',
                    name: 'rotation',
                    component: rotation
                }
            ]
        }
    ]
});

export default router;