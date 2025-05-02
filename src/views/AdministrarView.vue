<script setup>
import { onMounted } from 'vue';
import Header from '../components/Header.vue';
import TableUsers from '../components/TableUsers.vue';
import { useUserStore } from '../store/UserStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useUsersLogStore } from '../store/UserLogStore';
import router from '../router';

const storeLog = useUsersLogStore()
const { user } = storeToRefs(storeLog)

const store = useUserStore();
const { users, headers } = storeToRefs(store)


onMounted(async () => {
    await store.fetchUsers()

})

const usersList = computed(() => users.value);
const headersList = computed(() => headers.value)


const eliminarItem = async (item) => {
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar a ${item.nombre}?`)
    if (user.value.id === item.id) {
        alert('No se puede eliminar el usuario administrador')
        return
    }
    if (confirmacion) {
        try {
            await store.deleteUserById(item.id)
            store.fetchUsers()
        } catch (error) {
            console.error('Error al eliminar el usuario:', error)
        }
    }
}

const editarItem = (item) => {

    router.push({ name: 'editar-usuario', params: { id: item.id } })

}

</script>

<template>
    <Header titulo="Administrar" />
    <div class="container-btn-agregar">
        <v-btn class="btn-agregar">
            <v-icon>mdi-plus</v-icon>
            <router-link class="links" :to="{ name: 'crear-usuario' }">
                <span>Agregar Usuario</span>
            </router-link>

        </v-btn>
    </div>
    <div class="container">
        <div>
            <p>Lista de usuarios registrados en la tienda.</p>
        </div>

        <TableUsers :eliminarItem="eliminarItem" :items="usersList" :headers="headersList" :editarItem="editarItem" />
    </div>
</template>

<style scoped>
.links {
    text-decoration: none;
}
</style>