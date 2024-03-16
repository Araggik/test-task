import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import { userService } from "../services/user";

import Login from '../views/Login.vue';
import Main from '../views/MainView.vue';
import NotFound from '../views/NotFound.vue';
import Register from '../views/Register.vue';

const routes = <Array<RouteRecordRaw>>[
    {
        path: '/',
        component: Main,
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    { 
        path: '/:pathMatch(.*)*',  
        component: NotFound 
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to) =>{
    if (to.path == '/' && !userService.isUser) {
        return '/login';
    }
});