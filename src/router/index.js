import { createRouter, createWebHistory } from 'vue-router'
import Homeview from '../views/Homeview.vue'
import UsuariosView from '../views/UsuariosView.vue'
import ProductosView from '../views/ProductosView.vue'
import VentasView from '../views/VentasView.vue'
import AdministrarView from '../views/AdministrarView.vue'





const routes = [
    {
        path: '/',
        redirect: '/pasion-futbolera/login'
    },
    {
        path: '/pasion-futbolera/login',
        name: 'pasion-futbolera-login',
        component: () => import('../views/LoginView.vue')
    },
    {
        path: '/pasion-futbolera/home',
        name: 'pasion-futbolera',
        component: Homeview,
        meta: { requiresAuth: true }
    },

    {
        path: '/pasion-futbolera/usuarios',
        name: 'usuarios',
        component: UsuariosView,
        meta: { requiresAuth: true }
    },
    {
        path: '/pasion-futbolera/inventario',
        name: 'productos',
        component: ProductosView,
        meta: { requiresAuth: true }
    },
    {
        path: '/pasion-futbolera/ventas',
        name: 'ventas',
        component: VentasView,
        meta: { requiresAuth: true }
    },
    {
        path: '/pasion-futbolera/administrar-usuarios',
        name: 'administrar-usuarios',
        component: AdministrarView,
        meta: { requiresAuth: true }
    }

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');

    if (to.meta.requiresAuth && !token) {

        next('/pasion-futbolera/login');
    } else if (to.path === '/pasion-futbolera/login' && token) {
        next('/pasion-futbolera/home');

    } else if (to.meta.requiresAdmin && user?.rol !== 'admin') {
        next('/pasion-futbolera/home');
    }
    else {

        next();
    }
});


export default router

