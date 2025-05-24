<script setup>
import Header from '@/components/Header.vue'
import TableUsers from '../components/TableUsers.vue';
import { useCreditStore } from '../store/CreditStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'

const router = useRouter();

const store = useCreditStore()
const { headers, credits } = storeToRefs(store)

const pagarItem = async (item) => {
    const confirm = window.confirm('¿Está seguro de que desea pagar este credito?');
    if (confirm) {
        try {
            await store.payCredits(item.id);
            store.getCredits();
        } catch (error) {
            console.error('Error deleting sale:', error);
        }
    }
}

const deleteCredit = async (item) => {
    const confirm = window.confirm('¿Está seguro de que desea eliminar este credito?');
    if (confirm) {
        try {
            await store.deleteCredit(item.id);
            store.getCredits();
        } catch (error) {
            console.error('Error deleting sale:', error);
        }
    }
}

const editarItem = (item) => {

    router.push({ name: 'editar-credito', params: { id: item.cliente_id } })

}

</script>

<template>
    <Header titulo="Creditos" />

    <div class="container-btn-agregar">
        <v-btn class="btn-agregar">
            <router-link :to="{ name: 'crear-creditos' }">
                <v-icon>mdi-plus</v-icon>
                <span>crear credito</span>
            </router-link>
        </v-btn>

    </div>
    <div class="container">
        <div>
            <p>Lista de Ventas registrados en la tienda.</p>
        </div>

        <TableUsers :items="credits" :headers="headers" :eliminarItem="deleteCredit" :pagarItem="pagarItem"
            :editarItem="editarItem" />
    </div>

</template>

<style scoped></style>