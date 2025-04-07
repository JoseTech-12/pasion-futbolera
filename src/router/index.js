import { createRouter, createWebHistory } from 'vue-router'
import Homeview from '../views/Homeview.vue'
import UsuariosView from '../views/UsuariosView.vue'
import ProductosView from '../views/ProductosView.vue'


const routes = [

    {
        path: '/',
        name: 'home',
        component: Homeview
    },

    {
        path: '/usuarios',
        name: 'usuarios',
        component: UsuariosView
    },
    {
        path: '/productos',
        name: 'productos',
        component: ProductosView
    }


]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})


export default router

