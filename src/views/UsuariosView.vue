<script setup>
import Header from '../components/Header.vue';
import TableUsers from '../components/TableUsers.vue';
import SearchBar from '../components/SearchBar.vue';
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

        <TableUsers />
    </div>

</template>

<style scoped>
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