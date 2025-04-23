<script setup>
import Header from '../components/Header.vue';
import TableUsers from '../components/TableUsers.vue';
import { useProductStore } from '../store/ProductStore';
import { storeToRefs } from 'pinia';

const store = useProductStore();
const { headers, products } = storeToRefs(store)

</script>

<template>
    <Header titulo="Productos" />
    <div class="container-btn-agregar">
        <v-btn class="btn-agregar">
            <v-icon>mdi-plus</v-icon>
            <span>Agregar Producto</span>
        </v-btn>
    </div>

    <div class="container">
        <div>
            <p>Lista de productos registrados en la tienda.</p>
        </div>

        <TableUsers :items="products" :headers="headers" />
    </div>

</template>

<style></style>