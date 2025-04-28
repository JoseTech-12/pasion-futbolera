<script setup>
import { onMounted } from 'vue';
import Header from '../components/Header.vue';
import TableUsers from '../components/TableUsers.vue';
import { useUserStore } from '../store/UserStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const store = useUserStore();
const { users, headers } = storeToRefs(store)

onMounted(async () => {
    await store.fetchUsers()

})


const usersList = computed(() => users.value);
const headersList = computed(() => headers.value)

const item = usersList.value
const header = headersList.value

</script>

<template>
    <Header titulo="Administrar" />
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

        <TableUsers :items="usersList" :headers="headersList" />
    </div>
</template>

<style scoped></style>