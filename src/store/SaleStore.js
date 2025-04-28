import { defineStore } from "pinia";
import { ref } from "vue";


export const useSaleStore = defineStore('sale', () => {

    const sales = ref([

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
        sales,
        headers

    }


})