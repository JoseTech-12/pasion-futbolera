import { createRouter, createWebHistory } from 'vue-router'
import Homeview from '../views/Homeview.vue'
import UsuariosView from '../views/UsuariosView.vue'
import ProductosView from '../views/ProductosView.vue'
import VentasView from '../views/VentasView.vue'


const routes = [
    {
        path: '/',
        redirect: '/pasion-futbolera'
    },

    {
        path: '/pasion-futbolera',
        name: 'pasion-futbolera',
        component: Homeview
    },

    {
        path: '/pasion-futbolera/usuarios',
        name: 'usuarios',
        component: UsuariosView
    },
    {
        path: '/pasion-futbolera/productos',
        name: 'productos',
        component: ProductosView
    },
    {
        path: '/pasion-futbolera/ventas',
        name: 'ventas',
        component: VentasView
    }


]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})


export default router

