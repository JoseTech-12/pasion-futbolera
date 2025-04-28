<script setup>
import Header from '@/components/Header.vue'
import TableUsers from '../components/TableUsers.vue';
import { useSaleStore } from '../store/SaleStore';
import { storeToRefs } from 'pinia';

const store = useSaleStore()

const { headers, sales } = storeToRefs(store)

</script>

<template>
    <Header titulo="Ventas" />

    <div class="container-btn-agregar">
        <v-btn class="btn-agregar">
            <v-icon>mdi-plus</v-icon>
            <span>Agregar Usuario</span>
        </v-btn>

    </div>
    <div class="container">
        <div>
            <p>Lista de Ventas registrados en la tienda.</p>
        </div>

        <TableUsers :items="sales" :headers="headers" />
    </div>

</template>

<style scoped></style>