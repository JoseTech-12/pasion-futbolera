<script setup>
import Header from '../components/Header.vue';
import TableUsers from '../components/TableUsers.vue';

import { useClientsStore } from '../store/ClientsStore';
import { storeToRefs } from 'pinia';
import router from '../router';

const store = useClientsStore();
const { clients, headers } = storeToRefs(store)


const eliminarItem = async (item) => {

    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar a ${item.nombre}?`)
    if (clients.value.id === item.id) {
        alert('No se puede eliminar el usuario administrador')
        return
    }
    if (confirmacion) {
        try {
            await store.deleteClientData(item.id);
            store.getClientsData();
        } catch (error) {
            console.error('Error deleting client:', error);
        }
    }
}

const editarItem = (item) => {
    const id = item.id
    router.push({ name: 'editar-cliente', params: { id } })
}
</script>

<template>
    <Header titulo="Usuarios" />
    <div class="container-btn-agregar">
        <v-btn class="btn-agregar">
            <router-link :to="{ name: 'agregar-cliente' }">
                <v-icon>mdi-plus</v-icon>
                <span>Agregar Usuario</span>
            </router-link>
        </v-btn>

    </div>
    <div class="container">
        <div>
            <p>Lista de usuarios registrados en la tienda.</p>
        </div>

        <TableUsers :items="clients" :headers="headers" :eliminarItem="eliminarItem" :editarItem="editarItem" />
    </div>

</template>

<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    color: white;
    margin: 0 auto;
}

.container-btn-agregar {
    display: flex;
    justify-content: flex-end;

    margin-right: 30px;
}
</style>