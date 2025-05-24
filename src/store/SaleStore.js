import { defineStore } from "pinia";
import { ref } from "vue";
import { getSales, createSale, deleteSale } from "../services/saleService";


export const useSaleStore = defineStore('sale', () => {

    const sales = ref([])
    const headers = ref([
        { title: 'ID', value: 'id', sortable: false },
        { title: 'Total', value: 'total', sortable: false },
        { title: 'Fecha', value: 'fecha', sortable: false },
        { title: 'Cliente', value: 'cliente', sortable: false },
        { title: 'Producto', value: 'producto', sortable: false },
        { title: 'Acciones', value: 'acciones', sortable: false, align: 'end' }
    ]);

    const getSalesall = async () => {
        try {
            const response = await getSales()
            sales.value = response.ventas.map(venta => ({
                id: venta.id,
                total: venta.total,
                fecha: venta.fecha,
                cliente: venta.cliente.nombre,
                producto: venta.productos.map(p => p.nombre).join(', ')
            }))
        } catch (error) {
            console.error('Error al obtener las ventas:', error.response?.data || error.message);
        }
    }
    const createSaleAll = async (saleData) => {
        try {
            const response = await createSale(saleData)
            return response.data
        } catch (error) {
            console.error('Error al crear la venta:', error.response?.data || error.message);
        }
    }
    const deleteSaleAll = async (id) => {
        try {
            const response = await deleteSale(id)
            return response.data
        } catch (error) {
            console.error('Error al eliminar la venta:', error.response?.data || error.message);
        }
    }
    getSalesall()

    return {
        sales,
        headers,
        createSaleAll,
        getSalesall,
        deleteSaleAll

    }


})