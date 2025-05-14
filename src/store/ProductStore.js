import { defineStore } from "pinia";
import { ref } from "vue";
import { getProducts, deleteProductById, getProductById, updateProduct } from "../services/productService";

export const useProductStore = defineStore('products', () => {


    const products = ref([])
    const error = ref(null)
    const fetchProducts = async () => {
        try {
            const response = await getProducts()
            products.value = response.productos
        } catch (error) {
            console.error('Error al obtener los productos:', error.response?.data || error.message);
        }
    }

    fetchProducts()


    const headers = ref([
        { title: 'ID', value: 'id', sortable: false },
        { title: 'Nombre', value: 'nombre', sortable: false },
        { title: 'Precio', value: 'precio', sortable: false },
        { title: 'Descripción', value: 'descripcion', sortable: false },
        { title: 'Stock', value: 'stock', sortable: false },
        { title: 'Talla', value: 'talla', sortable: false },
        { title: 'Acciones', value: 'acciones', sortable: false, align: 'end' }
    ])

    const deleteProduct = async (id) => {
        error.value = null;
        try {
            await deleteProductById(id);
            products.value = products.value.filter(product => product.id !== id);
        } catch (err) {
            error.value = err.message || 'Error deleting user';
        }

    }

    const getProduct = async (id) => {
        error.value = null;
        try {
            const response = await getProductById(id);
            return response;
        } catch (err) {
            error.value = err.message || 'Error fetching product';
        }
    }

    const updateProductDetails = async (id, product) => {
        error.value = null;
        try {
            const response = await updateProduct(id, product);
            products.value = products.value.map(p => p.id === id ? response.producto : p);
        } catch (err) {
            error.value = err.message || 'Error updating product';
        }
    }

    return {
        products,
        headers,
        deleteProduct,
        fetchProducts,
        getProduct,
        updateProductDetails,
    }
})