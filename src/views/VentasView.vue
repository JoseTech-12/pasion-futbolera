<script setup>
import Header from '@/components/Header.vue'
import TableUsers from '../components/TableUsers.vue';
import { useSaleStore } from '../store/SaleStore';
import { storeToRefs } from 'pinia';

const store = useSaleStore()

const { headers, sales } = storeToRefs(store)

const deletesales = async (item) => {
    const confirm = window.confirm('¿Está seguro de que desea eliminar este registro?');
    if (confirm) {
        try {
            await store.deleteSaleAll(item.id);
            store.getSalesall();
        } catch (error) {
            console.error('Error deleting sale:', error);
        }
    }
}

</script>

<template>
    <Header titulo="Ventas" />

    <div class="container-btn-agregar">
        <v-btn class="btn-agregar">
            <router-link :to="{ name: 'crear-venta' }">
                <v-icon>mdi-plus</v-icon>
                <span>Agregar Usuario</span>
            </router-link>
        </v-btn>

    </div>
    <div class="container">
        <div>
            <p>Lista de Ventas registrados en la tienda.</p>
        </div>

        <TableUsers :items="sales" :headers="headers" :eliminarItem="deletesales" />
    </div>

</template>

<style scoped></style>