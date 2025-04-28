import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore('products', () => {

    const products = ref([
        {
            id: 1,
            nombre: 'Camiseta de Futbol',
            precio: 29.99,
            descripcion: 'Camiseta de futbol de alta calidad',
            stock: 100
        },
        {
            id: 2,
            nombre: 'Balón de Futbol',
            precio: 19.99,
            descripcion: 'Balón de futbol oficial',
            stock: 50
        },
        {
            id: 1,
            nombre: 'Camiseta de Futbol',
            precio: 29.99,
            descripcion: 'Camiseta de futbol de alta calidad',
            stock: 100
        },
        {
            id: 1,
            nombre: 'Camiseta de Futbol',
            precio: 29.99,
            descripcion: 'Camiseta de futbol de alta calidad',
            stock: 100
        },

    ])
    const headers = ref([
        { title: 'ID', value: 'id', sortable: false },
        { title: 'Nombre', value: 'nombre', sortable: false },
        { title: 'Precio', value: 'precio', sortable: false },
        { title: 'Descripción', value: 'descripcion', sortable: false },
        { title: 'Stock', value: 'stock', sortable: false },
        { title: 'Acciones', value: 'acciones', sortable: false, align: 'end' }
    ])


    return {
        products,
        headers
    }
})