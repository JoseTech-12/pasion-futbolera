<script setup>
import Header from '../components/Header.vue';
import CardInventario from '../components/CardInventario.vue';
import GestionVenta from '../components/GestionVenta.vue';
import CardResumen from '../components/CardResumen.vue';
import { storeToRefs } from 'pinia';
import { useProductStore } from '../store/ProductStore';
import { useClientsStore } from '../store/ClientsStore';

const store = useProductStore();
const storeClients = useClientsStore()
const { clients } = storeToRefs(storeClients)
const { products } = storeToRefs(store);

const valor = clients.value.length
const valor2 = products.value.reduce((total, producto) => total + producto.stock, 0);


const headersProductos = [
    { text: 'Nombre', value: 'nombre', icon: 'mdi-tshirt-crew', iconColor: 'text-green' },
    { text: 'Precio', value: 'precio' },
    { text: 'Stock', value: 'stock' }]

const headersusers = [
    { text: 'Nombre', value: 'nombre', icon: 'mdi-account', iconColor: 'text-green' },
    { text: 'Email', value: 'email' },
    { text: 'telefono', value: 'telefono' }]

</script>

<template>
    <Header titulo="Pasion Futbolera" />
    <div class="container-card">
        <router-link class="links">
            <CardResumen titulo="Venta" valor="$20.000" descripcion="Resumen de ventas" />
        </router-link>

        <router-link class="links" :to="{ name: 'productos' }">
            <CardResumen titulo="Inventario" :valor="valor2" descripcion="Camisas en stock" />
        </router-link>

        <router-link class="links" :to="{ name: 'usuarios' }">
            <CardResumen titulo="Usuarios" :valor="valor" descripcion="Usuarios Registrados" />
        </router-link>

        <GestionVenta />

    </div>
    <div class="container-card">
        <router-link class="links" :to="{ name: 'productos' }">
            <CardInventario :headers="headersProductos" :items="products.slice(0, 5)" />
        </router-link>


        <router-link class="links" :to="{ name: 'productos' }">
            <CardInventario :headers="headersusers" :items="clients.slice(0, 5)" />
        </router-link>


        <router-link :to="{ name: 'ventas' }">
            <v-btn class="btn-historial">
                <v-icon>mdi-account</v-icon>
                <span>Registrar Usuario</span>
            </v-btn>
        </router-link>
    </div>


</template>

<style scoped>
.container-card {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    padding: 30px;


}

.links {
    text-decoration: none;
}
</style>