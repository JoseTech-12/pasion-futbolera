<script setup>
import Header from '../components/Header.vue';
import TableUsers from '../components/TableUsers.vue';
import { useProductStore } from '../store/ProductStore';
import { storeToRefs } from 'pinia';
import router from '../router';



const store = useProductStore();
const { headers, products } = storeToRefs(store)

const deleteProduct = async (item) => {
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar a ${item.nombre}?`)
    if (confirmacion) {
        try {
            await store.deleteProduct(item.id)
            store.fetchProducts()
        } catch (error) {
            console.error('Error al eliminar el producto:', error)
        }
    }
}

const editarItem = (item) => {

    router.push({ name: 'editar-producto', params: { id: item.id } })

}

</script>

<template>
    <Header titulo="Productos" />
    <div class="container-btn-agregar">

        <v-btn class="btn-agregar">
            <router-link class="links" :to="{ name: 'agregar-producto' }">
                <v-icon>mdi-plus</v-icon>
                <span>Agregar Producto</span>
            </router-link>
        </v-btn>

    </div>

    <div class="container">
        <div>
            <p>Lista de productos registrados en la tienda.</p>
        </div>

        <TableUsers :items="products" :eliminarItem="deleteProduct" :headers="headers" :editarItem="editarItem" />
    </div>

</template>

<style>
.links {
    text-decoration: none;
}
</style>