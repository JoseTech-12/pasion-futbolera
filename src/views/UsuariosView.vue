<script setup>
import Header from '../components/Header.vue';
import TableUsers from '../components/TableUsers.vue';

import { useUsersStore } from '../store/UsersStore';
import { storeToRefs } from 'pinia';

const store = useUsersStore();
const { users, headers } = storeToRefs(store)
</script>

<template>
    <Header titulo="Usuarios" />
    <div class="container-btn-agregar">
        <v-btn class="btn-agregar">
            <v-icon>mdi-plus</v-icon>
            <span>Agregar Usuario</span>
        </v-btn>

    </div>
    <div class="container">
        <div>
            <p>Lista de usuarios registrados en la tienda.</p>
        </div>

        <TableUsers :items="users" :headers="headers" />
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