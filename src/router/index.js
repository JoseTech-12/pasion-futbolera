import { createRouter, createWebHistory } from 'vue-router'
import Homeview from '../views/Homeview.vue'
import UsuariosView from '../views/UsuariosView.vue'
import ProductosView from '../views/ProductosView.vue'
import VentasView from '../views/VentasView.vue'
import AdministrarView from '../views/AdministrarView.vue'
import NewUserView from '../views/NewUserView.vue'
import EditarUsuarios from '../views/EditarUsuarios.vue'
import NewProductView from '../views/NewProductView.vue'
import EditarProductoView from '../views/EditarProductoView.vue'
import CreateClientView from '../views/CreateClientView.vue'
import EditarClienteView from '../views/EditarClienteView.vue'
import CrearVentaView from '../views/CrearVentaView.vue'
import creditsView from '../views/CreditsView.vue'
import CreateCreditoView from '../views/CreateCreditoView.vue'
import EditarCretidoView from '../views/EditarCretidoView.vue'





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
    ,
    {
        path: '/pasion-futbolera/crear-usuario',
        name: 'crear-usuario',
        component: NewUserView,
        meta: { requiresAuth: true }
    },
    {
        path: '/pasion-futbolera/editar-usuario/:id',
        name: 'editar-usuario',
        component: EditarUsuarios,
        meta: { requiresAuth: true },
        props: true
    },
    {
        path: '/pasion-futbolera/agregar-producto/',
        name: 'agregar-producto',
        component: NewProductView,
        meta: { requiresAuth: true }
    },
    {
        path: '/pasion-futbolera/editar-producto/:id',
        name: 'editar-producto',
        component: EditarProductoView,
        meta: { requiresAuth: true },
        props: true
    },
    {
        path: '/pasion-futbolera/agregar-cliente/',
        name: 'agregar-cliente',
        component: CreateClientView,
        meta: { requiresAuth: true }
    },
    {
        path: '/pasion-futbolera/editar-cliente/:id',
        name: 'editar-cliente',
        component: EditarClienteView,
        meta: { requiresAuth: true },
        props: true
    },
    {
        path: '/pasion-futbolera/crear-venta/',
        name: 'crear-venta',
        component: CrearVentaView,
        meta: { requiresAuth: true }
    },
    {
        path: '/pasion-futbolera/creditos/',
        name: 'creditos',
        component: creditsView,
        meta: { requiresAuth: true }
    },
    {
        path: '/pasion-futbolera/crear-creditos/',
        name: 'crear-creditos',
        component: CreateCreditoView,
        meta: { requiresAuth: true }
    },
    {
        path: '/pasion-futbolera/editar-credito/:id',
        name: 'editar-credito',
        component: EditarCretidoView
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

